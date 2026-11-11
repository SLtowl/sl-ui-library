// mount(root, { private, text, onChange(isPrivate) }) → { state, set(isPrivate), toggle(), destroy() }
// text is { public, private }. Without it the words in the markup stay.
function mount(root, { private: start = false, text, onChange = () => {} } = {}) {
  root.__pb?.destroy();
  pbPrepare(root);
  const button = root.querySelector('.lk-btn'), pub = root.querySelector('.v-pub'), prv = root.querySelector('.v-prv');
  if (text) { pub.textContent = text.public; prv.textContent = text.private; }
  let current = Boolean(start);
  const paint = () => {
    root.dataset.private = String(current); button.setAttribute('aria-checked', String(current));
    pub.setAttribute('aria-hidden', String(current)); prv.setAttribute('aria-hidden', String(!current));
  };
  const set = next => { next = Boolean(next); if (next === current) return; current = next; paint(); onChange(current); };
  const off = new AbortController();
  button.addEventListener('click', () => set(!current), { signal: off.signal });
  paint();
  const api = { get state() { return { private: current }; }, set, toggle: () => set(!current), destroy() { off.abort(); delete root.__pb; } };
  root.__pb = api;
  return api;
}
// The catalog preview needs nothing extra.
const demo = {};
