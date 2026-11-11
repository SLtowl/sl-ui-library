// Dark mode · SL UI Library. Adds window.SLDarkMode with mount(root, options).
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

  const TRAVEL = 70;
  // mount(root, { target, on, onChange(on) }) → { state, set(on), toggle(), destroy() }
  // target is the surface the night spreads over; it defaults to the element around the switch.
  function mount(root, { target = root.parentElement, on: startOn = false, onChange = () => {} } = {}) {
    root.__pb?.destroy();
    pbPrepare(root);
    const button = root.querySelector('.dk-switch'), surface = target || root;
    const sky = document.createElement('span'), night = document.createElement('span');
    sky.className = 'dk-sky'; sky.setAttribute('aria-hidden', 'true'); night.className = 'dk-night'; sky.append(night);
    if (getComputedStyle(surface).position === 'static') surface.style.position = 'relative';
    surface.style.isolation = 'isolate';
    surface.prepend(sky);
    // Reaches the farthest corner of the surface from the middle of the switch.
    const place = () => {
      const t = surface.getBoundingClientRect(), s = button.getBoundingClientRect(), x = s.left + s.width / 2 - t.left, y = s.top + s.height / 2 - t.top;
      const r = Math.ceil(Math.hypot(Math.max(x, t.width - x), Math.max(y, t.height - y))) + 2;
      night.style.width = night.style.height = r * 2 + 'px'; night.style.left = x - r + 'px'; night.style.top = y - r + 'px';
    };
    place();
    const resize = typeof ResizeObserver === 'function' ? new ResizeObserver(place) : null;
    resize?.observe(surface);
    // p chases its goal on a spring damped just enough never to overshoot, so a release carries on from the hand's own speed.
    let p = startOn ? 1 : 0, v = 0, goal = p, isOn = startOn, grab = null, frame = 0, last = 0;
    const paint = () => surface.style.setProperty('--p', p.toFixed(4));
    const tick = now => {
      let t = Math.min(.05, (now - last) / 1000); last = now;
      const k = grab ? 620 : 110, d = 2 * Math.sqrt(k);
      while (t > 0) { const dt = Math.min(t, 1 / 240); v += (-k * (p - goal) - d * v) * dt; p += v * dt; t -= dt; }
      if (p < 0) { p = 0; v = 0; } if (p > 1) { p = 1; v = 0; }
      paint();
      if (grab || Math.abs(p - goal) > .0008 || Math.abs(v) > .003) frame = requestAnimationFrame(tick);
      else { p = goal; v = 0; paint(); frame = 0; }
    };
    const wake = () => { if (pbCalm()) { p = goal; v = 0; paint(); return; } if (!frame) { last = performance.now(); frame = requestAnimationFrame(tick); } };
    const set = next => { const changed = next !== isOn; isOn = next; goal = isOn ? 1 : 0; button.setAttribute('aria-checked', String(isOn)); wake(); if (changed) onChange(isOn); };
    const off = new AbortController(), on = (el, type, fn) => el.addEventListener(type, fn, { signal: off.signal });
    on(button, 'pointerdown', e => { if (e.button) return; button.setPointerCapture(e.pointerId); grab = { px: e.clientX, from: goal, moved: false }; root.classList.add('held'); wake(); });
    on(button, 'pointermove', e => { if (!grab) return; const dx = e.clientX - grab.px; if (Math.abs(dx) > 3) grab.moved = true; if (grab.moved) { goal = Math.max(0, Math.min(1, grab.from + dx / TRAVEL)); wake(); } });
    const end = e => { if (!grab) return; const g = grab; grab = null; root.classList.remove('held'); if (e.type === 'pointercancel') return set(isOn); set(g.moved ? goal > .5 : !isOn); };
    on(button, 'pointerup', end);
    on(button, 'pointercancel', end);
    // Only the keyboard arrives here; pointer presses are handled above.
    on(button, 'click', e => { if (!e.detail) set(!isOn); });
    on(button, 'keydown', e => { if (e.key === 'ArrowRight') { e.preventDefault(); set(true); } if (e.key === 'ArrowLeft') { e.preventDefault(); set(false); } });
    button.setAttribute('aria-checked', String(isOn));
    paint();
    const api = {
      get state() { return { on: isOn }; },
      set,
      toggle: () => set(!isOn),
      destroy() { cancelAnimationFrame(frame); off.abort(); resize?.disconnect(); sky.remove(); surface.style.removeProperty('--p'); delete root.__pb; },
    };
    root.__pb = api;
    return api;
  }
  globalThis.SLDarkMode = { mount };
})();
