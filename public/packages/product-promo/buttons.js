// Promo code · SL UI Library. Adds window.SLPromo with mount(root, options).
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
    const width = probe.getBoundingClientRect().width;
    probe.remove();
    return Math.ceil(width);
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

  // mount(root, { onApply(code, { signal }) → { label }, onRemove(code), maxWidth }) → { state, reset(), destroy() }
  function mount(root, { onApply = async () => ({ label: 'Applied' }), onRemove = () => {}, maxWidth = 340 } = {}) {
    root.__pb?.destroy();
    pbPrepare(root);
    const field = root.querySelector('.pb-field'), button = root.querySelector('.pb-btn'), status = root.querySelector('[data-status]'), done = root.querySelector('[data-label=done]');
    const text = key => root.querySelector(`[data-label=${key}]`).textContent;
    const host = root.parentElement, off = new AbortController(), on = (target, type, fn) => target.addEventListener(type, fn, { signal: off.signal });
    let request = null, code = '';
    const state = next => { if (next) root.dataset.state = next; return root.dataset.state; };
    const fit = () => {
      root.style.setProperty('--w0', pbMeasure(button, text('idle')) + 48 + 'px');
      root.style.setProperty('--wa', pbMeasure(button, text('apply')) + 40 + 'px');
      root.style.setProperty('--w1', Math.max(240, Math.min(maxWidth, (host?.clientWidth || maxWidth + 40) - 40)) + 'px');
      root.style.setProperty('--w3', pbMeasure(button, text('remove')) + 48 + 'px');
    };
    fit(); document.fonts?.ready.then(fit);

    const open = () => { state('open'); button.setAttribute('aria-expanded', 'true'); field.tabIndex = 0; setTimeout(() => field.focus({ preventScroll: true }), 60); };
    const close = focusButton => {
      root.classList.remove('pb-error', 'pb-fresh'); state('idle'); button.setAttribute('aria-expanded', 'false'); button.removeAttribute('aria-label'); field.tabIndex = -1;
      if (focusButton) button.focus({ preventScroll: true });
    };
    const refuse = message => { root.classList.add('pb-error'); status.textContent = message; field.focus({ preventScroll: true }); pbShake(root); };

    on(root, 'submit', async event => {
      event.preventDefault();
      if (state() === 'idle') return open();
      // An applied code: the button now removes it.
      if (state() === 'done') { onRemove(code); code = ''; field.value = ''; status.textContent = 'Code removed'; return close(true); }
      if (state() !== 'open') return;
      const typed = field.value.trim().toUpperCase();
      if (!typed) return refuse('Enter a code');
      root.classList.remove('pb-error'); state('busy'); field.tabIndex = -1; button.setAttribute('aria-expanded', 'false'); button.focus({ preventScroll: true }); status.textContent = 'Checking code';
      request = new AbortController();
      try {
        const [result] = await Promise.all([onApply(typed, { signal: request.signal }), pbWait(pbCalm() ? 0 : 800, request.signal)]);
        code = typed;
        const off = document.createElement('span'); off.className = 'pb-off'; off.textContent = result?.label || 'Applied';
        done.replaceChildren(typed, off);
        root.style.setProperty('--w2', pbMeasure(button, typed) + pbMeasure(button, off.textContent) + 18 + 8 + 48 + 'px');
        // Fresh: right after applying, hovering keeps showing the discount instead of jumping to Remove.
        root.classList.add('pb-fresh'); state('done'); button.setAttribute('aria-label', `${typed}, ${off.textContent}. Press to remove`); status.textContent = `${typed} applied, ${off.textContent}`;
        root.dispatchEvent(new CustomEvent('pb:promo', { detail: { code: typed, result }, bubbles: true }));
      } catch {
        if (request.signal.aborted) return;
        open(); setTimeout(() => refuse("That code doesn't work"), 120);
      } finally { request = null; }
    });
    on(field, 'input', () => root.classList.remove('pb-error'));
    on(field, 'keydown', event => { if (event.key === 'Escape') { event.preventDefault(); close(true); } });
    on(button, 'pointerleave', () => root.classList.remove('pb-fresh'));
    on(button, 'blur', () => root.classList.remove('pb-fresh'));
    on(root, 'focusout', () => setTimeout(() => { if (state() === 'open' && !root.contains(pbActive(root)) && !field.value.trim()) close(false); }, 0));

    const api = {
      get state() { return { phase: state(), code }; },
      reset() { request?.abort(); code = ''; field.value = ''; status.textContent = ''; close(false); },
      destroy() { request?.abort(); off.abort(); delete root.__pb; },
    };
    root.__pb = api;
    return api;
  }
  globalThis.SLPromo = { mount };
})();
