// Email sign-in · SL UI Library. Adds window.SLSignIn with mount(root, options).
(() => {
  // A damped spring sampled into a CSS linear() curve: every width change overshoots a touch and settles like a real object.
  const pbSpringCurve = (stiffness, damping) => {
    if (typeof CSS === 'undefined' || !CSS.supports('transition-timing-function', 'linear(0, 1)')) return null;
    const dt = 1 / 240, points = [0];
    let x = 0, v = 0, t = 0;
    while (t < 2) {
      v += (-stiffness * (x - 1) - damping * v) * dt; x += v * dt; t += dt; points.push(x);
      if (t > .25 && Math.abs(x - 1) < 5e-4 && Math.abs(v) < 5e-3) break;
    }
    const step = Math.max(1, Math.round(points.length / 60)), out = points.filter((_, i) => i % step === 0);
    out.push(1);
    return { easing: `linear(${out.map(p => +p.toFixed(4)).join(',')})`, time: Math.round(t * 1000) + 'ms' };
  };
  const pbSpring = pbSpringCurve(180, 19);
  const pbCalm = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
  let pbCount = 0;
  function pbPrepare(root) {
    // Several copies on one page must not share ids: give this one its own suffix and keep labels pointing at it.
    const suffix = '-' + (++pbCount);
    for (const element of root.querySelectorAll('[id^="pb-"]')) {
      const id = element.id;
      if (element.dataset.pbSuffix) continue;
      element.id = id + suffix; element.dataset.pbSuffix = suffix;
      for (const ref of root.querySelectorAll(`[for="${id}"]`)) ref.htmlFor = id + suffix;
      for (const name of ['aria-describedby', 'aria-labelledby', 'aria-controls']) for (const ref of root.querySelectorAll(`[${name}="${id}"]`)) ref.setAttribute(name, id + suffix);
    }
    if (pbSpring && !root.classList.contains('pb-f')) { root.style.setProperty('--pb-spring', pbSpring.easing); root.style.setProperty('--pb-spring-time', pbSpring.time); }
  }
  // Text width in the button's own font, so widths can animate in pixels.
  function pbMeasure(button, text) {
    const probe = document.createElement('span');
    probe.className = 'pb-t'; probe.style.cssText = 'position:absolute;visibility:hidden'; probe.textContent = text;
    button.append(probe);
    // Layout width stays in CSS pixels even while a preview or its ancestors scale.
    const width = probe.offsetWidth;
    probe.remove();
    return width;
  }
  function pbShake(element) {
    if (pbCalm()) return;
    element.animate([{ translate: '0' }, { translate: '-8px' }, { translate: '7px' }, { translate: '-4px' }, { translate: '2px' }, { translate: '0' }], { duration: 440, easing: 'cubic-bezier(.3,.7,.4,1)' });
  }
  function pbWait(ms, signal) {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(resolve, ms);
      signal?.addEventListener('abort', () => { clearTimeout(timer); reject(new DOMException('Canceled', 'AbortError')); }, { once: true });
    });
  }
  function pbActive(root) { return root.getRootNode().activeElement; }
  // Shown progress eases toward the reported value instead of jumping, and never runs backwards.
  function pbProgress(paint) {
    let target = 0, shown = 0, frame = 0, full = null;
    const tick = () => {
      shown += (target - shown) * .14;
      if (Math.abs(target - shown) < .002) shown = target;
      paint(shown);
      if (shown === 1 && full) { full(); full = null; }
      frame = shown === target ? 0 : requestAnimationFrame(tick);
    };
    return {
      to(value) { target = Math.max(target, Math.min(1, value)); if (!frame) frame = requestAnimationFrame(tick); },
      // Ends at 100% even when the page is in the background and frames are paused.
      finish() {
        this.to(1);
        if (shown === 1) return Promise.resolve();
        return new Promise(resolve => {
          full = resolve;
          setTimeout(() => { if (full === resolve) { cancelAnimationFrame(frame); frame = 0; shown = target = 1; paint(1); full = null; resolve(); } }, 500);
        });
      },
      reset() { cancelAnimationFrame(frame); frame = 0; target = shown = 0; full = null; paint(0); },
    };
  }
  // Catalog demos only: uneven pretend progress, the way real transfers arrive in bursts.
  function pbDemoTransfer({ progress, signal }, ms = 2400) {
    return new Promise((resolve, reject) => {
      let done = 0;
      const step = () => {
        if (signal.aborted) return reject(new DOMException('Canceled', 'AbortError'));
        done = Math.min(1, done + .06 + Math.random() * .16);
        progress(done);
        if (done >= 1) resolve(); else timer = setTimeout(step, ms / 9 * (.5 + Math.random()));
      };
      let timer = setTimeout(step, 200);
      signal.addEventListener('abort', () => { clearTimeout(timer); reject(new DOMException('Canceled', 'AbortError')); }, { once: true });
    });
  }
  // Roll a value inside a small window: the new one comes in from below (or above), the old one leaves.
  // Fast repeated presses drop whatever is still leaving, so digits never pile up.
  function pbRoll(box, value, direction) {
    const spans = [...box.children], current = spans.at(-1);
    spans.slice(0, -1).forEach(span => span.remove());
    if (current.textContent === String(value)) return;
    const next = document.createElement('span');
    next.textContent = value; box.append(next);
    if (pbCalm() || !direction) { current.remove(); return; }
    const motion = { duration: 200, easing: 'cubic-bezier(.2,.9,.3,1)' };
    current.animate([{ translate: '0 0', opacity: 1 }, { translate: `0 ${-direction * 100}%`, opacity: 0 }], { ...motion, fill: 'forwards' });
    setTimeout(() => current.remove(), motion.duration + 20);
    next.animate([{ translate: `0 ${direction * 100}%`, opacity: 0 }, { translate: '0 0', opacity: 1 }], motion);
  }
  // The line under a field. Tone 'error' turns the field red; the text lifts in when it changes.
  function pbNote(root, text, tone = '') {
    const note = root.querySelector('.pb-note');
    root.classList.toggle('pb-error', tone === 'error');
    if (!note || note.textContent === text) return;
    note.textContent = text;
    note.classList.remove('pb-swap'); void note.offsetWidth; note.classList.add('pb-swap');
  }
  // Fields that are not logins: keep password managers' icons out of them.
  function pbNoManagers(input) {
    for (const [name, value] of [['data-bwignore', 'true'], ['data-1p-ignore', 'true'], ['data-lpignore', 'true'], ['data-form-type', 'other']]) input.setAttribute(name, value);
  }
  // Floating labels: the label rises when the field has a value or focus. Call after setting a value from code.
  function pbSync(root) {
    const field = root.querySelector('.pb-box .pb-input');
    if (field) root.classList.toggle('pb-has', !!field.value || root.classList.contains('pb-keep'));
  }
  // A layer exactly over the input's text, in the same font, so single letters can be animated. Returns the layer.
  function pbMirror(input) {
    const layer = document.createElement('span'), box = input.parentElement, style = getComputedStyle(input);
    layer.className = 'pb-mirror'; layer.setAttribute('aria-hidden', 'true');
    layer.style.cssText = `left:${input.offsetLeft + parseFloat(style.paddingLeft)}px;top:${input.offsetTop}px;height:${input.offsetHeight}px;font:${style.font};letter-spacing:${style.letterSpacing};color:${style.color}`;
    box.append(layer);
    return layer;
  }

  const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  // mount(root, { onSend(email, { signal }), onVerify(code, { signal }), resendAfter, resetAfter }) → { state, reset(), destroy() }
  function mount(root, { onSend = async () => {}, onVerify = async () => {}, resendAfter = 20000, resetAfter = 0 } = {}) {
    root.__pb?.destroy();
    pbPrepare(root);
    const $ = selector => root.querySelector(selector);
    const input = $('.si-input'), go = $('.si-go'), chip = $('.si-chip'), change = $('.si-change'), resend = $('.si-resend'), say = $('[data-status]'), group = $('.si-cells'), box = $('.si-box');
    const cells = [...root.querySelectorAll('.si-cell')];
    const off = new AbortController(), on = (target, type, fn) => target.addEventListener(type, fn, { signal: off.signal });
    let request = null, resendTimer = 0, resetTimer = 0, mail = '';
    const state = next => { if (next) root.dataset.state = next; return root.dataset.state; };
    go.style.setProperty('--wg', pbMeasure(go, $('.si-go .go').textContent) + 44 + 'px');

    const ready = () => { const ok = EMAIL.test(input.value.trim()); root.classList.toggle('si-ready', ok); go.tabIndex = ok ? 0 : -1; root.classList.remove('si-error'); };
    // One focus ring follows whichever cell is next.
    const aim = cell => { group.style.setProperty('--cw', cell.offsetWidth + 'px'); group.style.setProperty('--cx', cell.offsetLeft + 'px'); };
    const to = cell => { aim(cell); cell.focus({ preventScroll: true }); };
    const code = () => cells.map(c => c.value).join('');
    const put = (cell, digit, delay = 0) => {
      cell.value = digit; cell.classList.toggle('filled', !!digit);
      if (digit && !pbCalm()) cell.animate([{ color: 'transparent' }, {}], { duration: 150, delay, easing: 'ease-out', fill: 'backwards' });
    };
    const controls = active => { cells.forEach(c => { c.tabIndex = active ? 0 : -1; }); change.tabIndex = resend.tabIndex = active ? 0 : -1; };
    const startResend = () => { clearTimeout(resendTimer); resend.disabled = true; resendTimer = setTimeout(() => { resend.disabled = false; }, resendAfter); };

    // The address leaves the field and settles into the chip above it.
    const fly = async text => {
      chip.textContent = text;
      if (pbCalm()) return;
      const probe = document.createElement('span');
      probe.className = 'si-fly'; probe.textContent = text; root.append(probe);
      const base = root.getBoundingClientRect(), from = input.getBoundingClientRect(), target = chip.getBoundingClientRect(), scale = 13.5 / 16;
      const x0 = from.left - base.left + 18, y0 = from.top - base.top + (from.height - probe.offsetHeight) / 2;
      const x1 = target.left - base.left + 10, y1 = target.top - base.top + (target.height - probe.offsetHeight * scale) / 2;
      chip.style.color = 'transparent';
      // A long address is cut on its way, so it lands already the width of the chip.
      const room = (target.width - 20) / scale, cut = Math.max(0, probe.offsetWidth - room);
      const flight = probe.animate([{ translate: `${x0}px ${y0}px`, scale: 1, clipPath: 'inset(-4px 0px -4px 0px)' }, { translate: `${x1}px ${y1}px`, scale, clipPath: `inset(-4px ${cut}px -4px 0px)` }], { duration: 520, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'forwards' });
      await Promise.race([flight.finished.catch(() => {}), pbWait(600)]);
      chip.style.color = ''; probe.remove();
    };

    on(root, 'submit', async event => {
      event.preventDefault();
      if (state() !== 'email') return;
      const address = input.value.trim();
      if (!EMAIL.test(address)) { root.classList.add('si-error'); say.textContent = 'Enter a full email address'; pbShake(box); return; }
      state('sending'); go.tabIndex = -1; say.textContent = 'Sending a code';
      request = new AbortController();
      try { await Promise.all([onSend(address, { signal: request.signal }), pbWait(pbCalm() ? 0 : 900, request.signal)]); }
      catch { if (request.signal.aborted) return; state('email'); ready(); root.classList.add('si-error'); say.textContent = 'Could not send the code. Try again'; pbShake(box); return; }
      // Split: the six cells first cover the field exactly, then pull apart.
      mail = address; input.blur(); fly(address); state('split'); void group.offsetWidth;
      setTimeout(() => {
        if (state() !== 'split') return;
        state('code'); controls(true); aim(cells[0]);
        setTimeout(() => { if (state() === 'code') to(cells[0]); }, pbCalm() ? 0 : 380);
      }, 40);
      startResend(); say.textContent = `We sent a 6-digit code to ${address}`;
    });
    on(input, 'input', ready);

    const verify = async () => {
      state('checking'); say.textContent = 'Checking the code'; cells.forEach(c => c.blur());
      request = new AbortController();
      try {
        await Promise.all([onVerify(code(), { signal: request.signal }), pbWait(pbCalm() ? 0 : 600, request.signal)]);
        clearTimeout(resendTimer); controls(false); state('done'); say.textContent = 'Signed in';
        root.dispatchEvent(new CustomEvent('pb:signin', { detail: { email: mail }, bubbles: true }));
        if (resetAfter) resetTimer = setTimeout(() => api.reset(), resetAfter);
      } catch {
        if (request.signal.aborted) return;
        // Wrong: shake, then clear back to the first cell.
        state('code'); root.classList.add('si-error'); say.textContent = "That code doesn't match"; pbShake(group);
        setTimeout(() => { root.classList.remove('si-error'); cells.forEach(c => put(c, '')); to(cells[0]); }, 460);
      }
    };
    // Several digits at once (paste or SMS autofill) drop into the cells in a wave.
    const fill = (from, digits) => { digits.slice(0, 6 - from).split('').forEach((d, k) => put(cells[from + k], d, k * 40)); to(cells[Math.min(5, from + digits.length)]); if (code().length === 6) verify(); };
    cells.forEach((cell, i) => {
      on(cell, 'input', () => {
        if (state() !== 'code') return;
        root.classList.remove('si-error');
        const digits = cell.value.replace(/\D/g, '');
        if (!digits) { put(cell, ''); return; }
        if (digits.length > 1) { put(cell, ''); fill(i, digits); return; }
        put(cell, digits); if (i < 5) to(cells[i + 1]); if (code().length === 6) verify();
      });
      on(cell, 'keydown', event => {
        if (event.key === 'Backspace' && !cell.value && i > 0) { event.preventDefault(); put(cells[i - 1], ''); to(cells[i - 1]); }
        if (event.key === 'ArrowLeft' && i > 0) { event.preventDefault(); to(cells[i - 1]); }
        if (event.key === 'ArrowRight' && i < 5) { event.preventDefault(); to(cells[i + 1]); }
      });
      on(cell, 'paste', event => { const digits = (event.clipboardData?.getData('text') || '').replace(/\D/g, ''); if (!digits || state() !== 'code') return; event.preventDefault(); fill(i, digits); });
      on(cell, 'focus', () => { aim(cell); cell.select(); });
    });
    // Change: the cells join back into the field, with the address ready to edit.
    on(change, 'click', () => {
      clearTimeout(resendTimer); request?.abort(); cells.forEach(c => put(c, '')); controls(false); root.classList.remove('si-error'); state('split'); say.textContent = 'Change your email';
      setTimeout(() => { state('email'); ready(); input.focus({ preventScroll: true }); input.setSelectionRange(input.value.length, input.value.length); }, pbCalm() ? 0 : 380);
    });
    on(resend, 'click', async () => {
      startResend(); cells.forEach(c => put(c, '')); to(cells[0]); say.textContent = 'A new code is on its way';
      if (!pbCalm()) chip.animate([{ scale: 1 }, { scale: 1.05 }, { scale: 1 }], { duration: 320, easing: 'cubic-bezier(.22,1,.36,1)' });
      try { await onSend(mail, { signal: off.signal }); } catch { if (!off.signal.aborted) say.textContent = 'Could not send the code. Try again'; }
    });
    // Never wider than its container, with a little air on both sides.
    const host = root.parentElement;
    const fit = () => { if (host) root.style.width = Math.min(380, host.clientWidth - 36) + 'px'; };
    fit();
    const resize = typeof ResizeObserver === 'function' ? new ResizeObserver(() => { fit(); if (state() === 'code') aim(cells.find(c => c === pbActive(root)) || cells[0]); }) : null;
    resize?.observe(group);
    if (host) resize?.observe(host);

    const api = {
      get state() { return { phase: state(), email: mail }; },
      reset() { clearTimeout(resendTimer); clearTimeout(resetTimer); request?.abort(); input.value = ''; mail = ''; chip.textContent = ''; cells.forEach(c => put(c, '')); controls(false); state('email'); ready(); say.textContent = ''; },
      destroy() { clearTimeout(resendTimer); clearTimeout(resetTimer); request?.abort(); off.abort(); resize?.disconnect(); delete root.__pb; },
    };
    root.__pb = api;
    return api;
  }
  globalThis.SLSignIn = { mount };
})();
