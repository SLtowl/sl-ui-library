// Price range · SL UI Library. Adds window.SLPriceRange with mount(root, options).
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

  // Follows the finger closely while held and glides when released or moved by a press.
  function sdGlide(draw, start) {
    const still = matchMedia('(prefers-reduced-motion:reduce)').matches;
    let current = start, target = start, held = false, frame = 0, last = 0;
    const tick = now => {
      const dt = Math.min(.05, (now - last) / 1000); last = now;
      current += (target - current) * (1 - Math.exp(-dt * (held ? 36 : 15)));
      if (Math.abs(target - current) < .0007) current = target;
      draw(current);
      frame = current === target ? 0 : requestAnimationFrame(tick);
    };
    return {
      to(next, isHeld = false) {
        target = next; held = isHeld;
        if (still) { current = next; draw(next); return; }
        if (!frame) { last = performance.now(); frame = requestAnimationFrame(tick); }
      },
      stop() { cancelAnimationFrame(frame); frame = 0; },
    };
  }
  // Reports the pointer as a fraction of the rail, measured between the centres of the thumb's two end positions.
  function sdDrag(rail, report, signal, inset = 12) {
    const at = event => { const box = rail.getBoundingClientRect(); return Math.min(1, Math.max(0, (event.clientX - box.left - inset) / (box.width - inset * 2))); };
    rail.addEventListener('pointerdown', event => {
      if (event.button) return;
      event.preventDefault();
      rail.setPointerCapture(event.pointerId); rail.dataset.held = '';
      report(at(event), 'down');
    }, { signal });
    rail.addEventListener('pointermove', event => { if (rail.hasPointerCapture(event.pointerId)) report(at(event), 'move'); }, { signal });
    const end = () => { if ('held' in rail.dataset) { delete rail.dataset.held; report(null, 'up'); } };
    rail.addEventListener('pointerup', end, { signal });
    rail.addEventListener('pointercancel', end, { signal });
  }
  // One value on one rail: dragging, keys, and a glide between stops.
  function sdSlider(root, { min, max, step, value, big = step * 10, inset = 12, show = () => {}, onChange = () => {} }) {
    pbPrepare(root);
    const rail = root.querySelector('.sd-rail'), first = value, off = new AbortController();
    const span = max - min, snap = raw => Math.min(max, Math.max(min, Math.round((raw - min) / step) * step + min));
    const place = amount => (amount - min) / span;
    const glide = sdGlide(p => root.style.setProperty('--p', p.toFixed(4)), place(value));
    let current = value;
    const put = (next, held, quiet) => {
      next = snap(next); glide.to(place(next), held);
      if (next === current) return;
      current = next; rail.setAttribute('aria-valuenow', current); show(current);
      if (!quiet) onChange(current);
    };
    rail.setAttribute('aria-valuemin', min); rail.setAttribute('aria-valuemax', max); rail.setAttribute('aria-valuenow', value);
    root.style.setProperty('--p', place(value).toFixed(4)); show(value);
    sdDrag(rail, (fraction, kind) => {
      if (fraction === null) { glide.to(place(current), false); return; }
      put(min + fraction * span, true);
    }, off.signal, inset);
    rail.addEventListener('keydown', event => {
      const move = { ArrowLeft: -step, ArrowDown: -step, ArrowRight: step, ArrowUp: step, PageDown: -big, PageUp: big }[event.key];
      if (event.key === 'Home') put(min); else if (event.key === 'End') put(max); else if (move) put(current + move); else return;
      event.preventDefault();
    }, { signal: off.signal });
    const api = {
      get state() { return { value: current }; },
      set: next => put(next),
      reset: () => put(first, false, true),
      destroy() { off.abort(); glide.stop(); delete root.__pb; },
    };
    root.__pb = api;
    return api;
  }
  // mount(root, options) → { state, set(), reset(), destroy() }
  // mount(root, { from, to, min, max, step, gap, onChange({ from, to }) }) → { state, set(from, to), reset(), destroy() }
  function mount(root, { from = 20, to = 80, min = 0, max = 200, step = 5, gap = 10, onChange = () => {} } = {}) {
    root.__pb?.destroy();
    pbPrepare(root);
    const rail = root.querySelector('.sd-rail'), label = root.querySelector('.sd-num'), thumbs = [...root.querySelectorAll('.sd-thumb')], off = new AbortController();
    const first = [from, to], span = max - min, place = amount => (amount - min) / span;
    const glideA = sdGlide(p => root.style.setProperty('--a', p.toFixed(4)), place(from)), glideB = sdGlide(p => root.style.setProperty('--b', p.toFixed(4)), place(to));
    const snap = raw => Math.round((raw - min) / step) * step + min;
    let low = from, high = to, grabbed = 0;
    const show = () => { label.textContent = '$' + low + ' to $' + high; thumbs[0].setAttribute('aria-valuenow', low); thumbs[1].setAttribute('aria-valuenow', high); };
    const put = (which, raw, held, quiet) => {
      const next = which ? Math.min(max, Math.max(low + gap, snap(raw))) : Math.max(min, Math.min(high - gap, snap(raw)));
      (which ? glideB : glideA).to(place(next), held);
      if (next === (which ? high : low)) return;
      if (which) high = next; else low = next;
      show(); if (!quiet) onChange({ from: low, to: high });
    };
    thumbs.forEach(thumb => { thumb.setAttribute('aria-valuemin', min); thumb.setAttribute('aria-valuemax', max); });
    root.style.setProperty('--a', place(from).toFixed(4)); root.style.setProperty('--b', place(to).toFixed(4)); show();
    sdDrag(rail, (fraction, kind) => {
      if (kind === 'up') { put(grabbed, grabbed ? high : low); return; }
      const raw = min + fraction * span;
      if (kind === 'down') grabbed = Math.abs(raw - low) <= Math.abs(raw - high) ? 0 : 1;
      put(grabbed, raw, true);
    }, off.signal);
    thumbs.forEach((thumb, which) => thumb.addEventListener('keydown', event => {
      const move = { ArrowLeft: -step, ArrowDown: -step, ArrowRight: step, ArrowUp: step }[event.key];
      if (!move) return;
      event.preventDefault(); put(which, (which ? high : low) + move);
    }, { signal: off.signal }));
    const api = {
      get state() { return { from: low, to: high }; },
      set(a, b) { put(0, a); put(1, b); },
      reset() { put(0, first[0], false, true); put(1, first[1], false, true); },
      destroy() { off.abort(); glideA.stop(); glideB.stop(); delete root.__pb; },
    };
    root.__pb = api;
    return api;
  }
  globalThis.SLPriceRange = { mount };
})();
