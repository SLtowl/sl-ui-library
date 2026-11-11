// mount(root, { on, onChange(on) }) → { state, set(on), toggle(), destroy() }
function mount(root, { on: start = false, onChange = () => {} } = {}) {
  root.__pb?.destroy();
  pbPrepare(root);
  const row = root.querySelector('.sr-row');
  let current = Boolean(start);
  const paint = () => row.setAttribute('aria-checked', String(current));
  const set = next => { next = Boolean(next); if (next === current) return; current = next; paint(); onChange(current); };
  const off = new AbortController();
  row.addEventListener('click', () => set(!current), { signal: off.signal });
  paint();
  const api = { get state() { return { on: current }; }, set, toggle: () => set(!current), destroy() { off.abort(); delete root.__pb; } };
  root.__pb = api;
  return api;
}
// The catalog preview needs nothing extra.
const demo = {};
