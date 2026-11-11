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
// The catalog preview needs nothing extra.
const demo = {};
