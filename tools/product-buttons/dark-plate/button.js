// mount(root, { target, on, onChange(on) }) → { state, set(on), toggle(), destroy() }
// target is the surface the night spreads over; it defaults to the element around the switch.
function mount(root, { target = root.parentElement, on: startOn = false, onChange = () => {} } = {}) {
  root.__pb?.destroy();
  pbPrepare(root);
  const button = root.querySelector('.ld-switch'), surface = target || root;
  const sky = document.createElement('span'), night = document.createElement('span');
  sky.className = 'ld-sky'; sky.setAttribute('aria-hidden', 'true'); night.className = 'ld-night'; sky.append(night);
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
  let isOn = false;
  const set = next => {
    if (next === isOn) return;
    isOn = next; root.dataset.on = String(isOn); button.setAttribute('aria-checked', String(isOn)); night.classList.toggle('on', isOn);
    onChange(isOn);
  };
  const off = new AbortController();
  button.addEventListener('click', () => set(!isOn), { signal: off.signal });
  if (startOn) { night.style.transition = 'none'; set(true); void night.offsetWidth; night.style.transition = ''; }
  const api = {
    get state() { return { on: isOn }; },
    set,
    toggle: () => set(!isOn),
    destroy() { off.abort(); resize?.disconnect(); sky.remove(); delete root.__pb; },
  };
  root.__pb = api;
  return api;
}
// The catalog preview darkens only its own card.
const demo = {};
