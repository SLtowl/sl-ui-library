// mount(root, { on, onChange(on) }) → { state, set(on), toggle(), destroy() }
function mount(root, { on: start = true, onChange = () => {} } = {}) {
  root.__pb?.destroy();
  pbPrepare(root);
  const row = root.querySelector('.sr-row'), ring = row.querySelector('.sr-ring');
  const still = matchMedia('(prefers-reduced-motion:reduce)').matches;
  // One decaying swing; turning off mid-swing eases back from wherever the bell is.
  const swing = Array.from({ length: 41 }, (_, i) => { const t = i / 40; return { rotate: (16 * Math.exp(-3.2 * t) * Math.sin(t * Math.PI * 6) * (1 - t ** 8)).toFixed(2) + 'deg' }; });
  let current = Boolean(start), ringing;
  const paint = () => row.setAttribute('aria-checked', String(current));
  const set = next => {
    next = Boolean(next); if (next === current) return;
    const from = parseFloat(getComputedStyle(ring).rotate) || 0;
    current = next; paint(); ringing?.cancel();
    if (!still) ringing = current ? ring.animate(swing, { duration: 950 }) : ring.animate([{ rotate: from + 'deg' }, { rotate: '0deg' }], { duration: 240, easing: 'ease-out' });
    onChange(current);
  };
  const off = new AbortController();
  row.addEventListener('click', () => set(!current), { signal: off.signal });
  paint();
  const api = { get state() { return { on: current }; }, set, toggle: () => set(!current), destroy() { off.abort(); ringing?.cancel(); delete root.__pb; } };
  root.__pb = api;
  return api;
}
// The catalog preview needs nothing extra.
const demo = {};
