// mount(root, { onChange(selected) }) → { state, reset(), destroy() }
function mount(root, { onChange = () => {} } = {}) {
  root.__pb?.destroy();
  pbPrepare(root);
  const inputs = [...root.querySelectorAll('input')], start = inputs.map(input => input.checked);
  const read = () => inputs.filter(input => input.checked).map(input => input.closest('label').textContent.trim());
  const off = new AbortController();
  inputs.forEach(input => input.addEventListener('change', () => onChange(read()), { signal: off.signal }));
  const api = {
    get state() { return { selected: read() }; },
    reset() { inputs.forEach((input, i) => { input.checked = start[i]; }); },
    destroy() { off.abort(); delete root.__pb; },
  };
  root.__pb = api;
  return api;
}
// The catalog preview needs nothing extra.
const demo = {};
