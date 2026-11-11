// Card · SL UI Library. Adds window.SLCardPlate with mount(root, options).
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

  // Network by the first digits. Mir comes before Mastercard, whose 2xxx range would otherwise claim it.
  const BRANDS = [['Mir', /^220[0-4]/], ['Amex', /^3[47]/], ['Visa', /^4/], ['Mastercard', /^(5[1-5]|2[2-7])/], ['Discover', /^6(011|5)/]];
  const brandOf = digits => (BRANDS.find(([, test]) => test.test(digits)) || [''])[0];
  const luhn = digits => [...digits].reverse().reduce((sum, c, i) => { let n = +c; if (i % 2) { n *= 2; if (n > 9) n -= 9; } return sum + n; }, 0) % 10 === 0;
  // mount(root, { onLink({ number, expiry, cvc, brand, last4 }, { signal }), resetAfter }) → { state, reset(), destroy() }
  function mount(root, { onLink = async () => {}, resetAfter = 0 } = {}) {
    root.__pb?.destroy();
    pbPrepare(root);
    const $ = selector => root.querySelector(selector);
    const plate = $('.cp-plate'), num = $('.cp-num'), exp = $('.cp-exp'), cvc = $('.cp-cvc'), edit = $('.cp-edit'), say = $('[data-status]'), brandBox = $('.cp-brand');
    const inputs = [num, exp, cvc], host = root.parentElement;
    const off = new AbortController(), on = (target, type, fn) => target.addEventListener(type, fn, { signal: off.signal });
    let brand = '', request = null, timer = 0;
    const step = next => { if (next) root.dataset.step = next; return root.dataset.step; };
    const digits = el => el.value.replace(/\D/g, ''), numSize = () => brand === 'Amex' ? 15 : 16, cvcSize = () => brand === 'Amex' ? 4 : 3;
    const groups = d => brand === 'Amex' ? [d.slice(0, 4), d.slice(4, 10), d.slice(10)].filter(Boolean).join(' ') : (d.match(/.{1,4}/g) || []).join(' ');
    const numOk = () => digits(num).length === numSize() && luhn(digits(num));
    const expOk = () => {
      const d = digits(exp);
      if (d.length < 4) return false;
      const mm = +d.slice(0, 2), yy = +d.slice(2), now = new Date(), year = now.getFullYear() % 100;
      return mm >= 1 && mm <= 12 && (yy > year || (yy === year && mm >= now.getMonth() + 1));
    };
    // Reformat without losing the caret: count digits to its left, then put it back after the same digit.
    const reformat = (el, text) => {
      const left = el.value.slice(0, el.selectionStart).replace(/\D/g, '').length;
      el.value = text;
      let at = 0, seen = 0;
      while (at < text.length && seen < left) { if (/\d/.test(text[at])) seen++; at++; }
      el.setSelectionRange(at, at);
    };
    const go = input => { input.focus({ preventScroll: true }); const n = input.value.length; input.setSelectionRange(n, n); };
    const clear = () => { root.classList.remove('cp-bad'); root.querySelectorAll('.wrong').forEach(c => c.classList.remove('wrong')); };
    const fail = (text, input) => { clear(); root.classList.add('cp-bad'); input.classList.add('wrong'); say.textContent = text; pbShake(plate); };
    // Moves on by itself, always to the first thing still missing.
    const advance = () => { if (!numOk()) return go(num); if (!expOk()) return go(exp); if (cvc.value.length < cvcSize()) return go(cvc); link(); };

    const link = async () => {
      const d = digits(num), e = digits(exp);
      const name = document.createElement('i');
      name.className = 'cp-name'; name.textContent = `${brand || 'Card'} `;
      $('.cp-line b').replaceChildren(name, `•••• ${d.slice(-4)}`);
      step('checking'); clear(); inputs.forEach(i => i.blur()); say.textContent = 'Linking the card';
      request = new AbortController();
      try {
        await Promise.all([onLink({ number: d, expiry: `${e.slice(0, 2)}/${e.slice(2)}`, cvc: cvc.value, brand, last4: d.slice(-4) }, { signal: request.signal }), pbWait(pbCalm() ? 0 : 1300, request.signal)]);
        inputs.forEach(i => { i.tabIndex = -1; }); edit.tabIndex = 0; step('done'); say.textContent = 'Card linked';
        root.dispatchEvent(new CustomEvent('pb:card', { detail: { brand, last4: d.slice(-4) }, bubbles: true }));
        if (resetAfter) timer = setTimeout(() => api.reset(), resetAfter);
      } catch {
        if (request.signal.aborted) return;
        step('details'); go(cvc); fail('This card was refused', cvc);
        timer = setTimeout(() => { clear(); cvc.value = ''; go(cvc); }, 460);
      } finally { request = null; }
    };

    on(num, 'input', () => {
      let d = digits(num);
      const b = brandOf(d);
      if (b !== brand) { brand = b; pbRoll(brandBox, b, 1); cvc.value = cvc.value.slice(0, cvcSize()); }
      d = d.slice(0, numSize()); reformat(num, groups(d)); clear(); step(numOk() ? 'details' : 'number');
      if (d.length === numSize()) { if (luhn(d)) { say.textContent = `${brand || 'Card'} number accepted`; advance(); } else fail('This card number has a typo', num); }
    });
    on(exp, 'input', () => {
      let d = digits(exp).slice(0, 4);
      if (d.length === 1 && +d > 1) d = '0' + d;
      reformat(exp, d.length > 2 ? `${d.slice(0, 2)} / ${d.slice(2)}` : d); clear();
      if (d.length < 4) return;
      if (expOk()) advance(); else fail('This date has passed', exp);
    });
    on(cvc, 'input', () => { cvc.value = digits(cvc).slice(0, cvcSize()); clear(); if (cvc.value.length === cvcSize()) advance(); });
    on(exp, 'keydown', event => { if (event.key === 'Backspace' && !exp.value) { event.preventDefault(); go(num); } });
    on(cvc, 'keydown', event => { if (event.key === 'Backspace' && !cvc.value) { event.preventDefault(); go(exp); } });
    // The whole form sits in one label-free plate, so Enter must never submit a page.
    on(root, 'submit', event => event.preventDefault());
    on(edit, 'click', event => { event.preventDefault(); clearTimeout(timer); exp.value = cvc.value = ''; inputs.forEach(i => { i.tabIndex = 0; }); edit.tabIndex = -1; step('details'); say.textContent = 'Change the card'; go(num); });

    // Never wider than its container, with a little air on both sides.
    const fit = () => { if (host) root.style.width = Math.min(380, host.clientWidth - 36) + 'px'; };
    fit();
    const resize = typeof ResizeObserver === 'function' && host ? new ResizeObserver(fit) : null;
    resize?.observe(host);

    const api = {
      get state() { return { phase: step(), brand, last4: digits(num).slice(-4) }; },
      reset() { clearTimeout(timer); request?.abort(); inputs.forEach(i => { i.value = ''; i.tabIndex = 0; }); brand = ''; pbRoll(brandBox, '', 0); edit.tabIndex = -1; clear(); step('number'); say.textContent = ''; },
      destroy() { clearTimeout(timer); request?.abort(); off.abort(); resize?.disconnect(); delete root.__pb; },
    };
    root.__pb = api;
    return api;
  }
  globalThis.SLCardPlate = { mount };
})();
