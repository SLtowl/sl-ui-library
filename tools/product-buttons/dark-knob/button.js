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
// The catalog preview darkens only its own card.
const demo = {};
