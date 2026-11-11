// mount(root, { checked, onChange(checked) }) → { state, set(checked), reset(), destroy() }
function mount(root, { checked: start = false, onChange = () => {} } = {}) {
  root.__pb?.destroy();
  pbPrepare(root);
  const input = root.querySelector('input');
  input.checked = Boolean(start);
  const off = new AbortController();
  input.addEventListener('change', () => onChange(input.checked), { signal: off.signal });
  const api = {
    get state() { return { checked: input.checked }; },
    set(next) { input.checked = Boolean(next); onChange(input.checked); },
    reset() { input.checked = Boolean(start); },
    destroy() { off.abort(); delete root.__pb; },
  };
  root.__pb = api;
  return api;
}
// The catalog preview needs nothing extra.
const demo = {};
