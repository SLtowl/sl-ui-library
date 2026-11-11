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
function mount(root, { value = 64, onChange = () => {} } = {}) {
  root.__pb?.destroy();
  const labels = root.querySelectorAll('.sd-val');
  return sdSlider(root, { min: 0, max: 100, step: 1, value, inset: 0, show: next => labels.forEach(label => { label.textContent = next + '%'; }), onChange });
}
// The catalog preview needs nothing extra.
const demo = {};
