// mount(root, { value, onChange(value) }) → { state, set(value), toggle(), destroy() }
// value is 'public' or 'private'.
function mount(root, { value: start = 'public', onChange = () => {} } = {}) {
  root.__pb?.destroy();
  pbPrepare(root);
  const options = [...root.querySelectorAll('.vp-opt')];
  let current = start === 'private' ? 'private' : 'public';
  const paint = () => {
    root.dataset.value = current;
    options.forEach(option => { const on = option.dataset.value === current; option.setAttribute('aria-checked', String(on)); option.tabIndex = on ? 0 : -1; });
  };
  const set = next => { if (next === current || (next !== 'public' && next !== 'private')) return; current = next; paint(); onChange(current); };
  const toggle = () => set(current === 'public' ? 'private' : 'public');
  const off = new AbortController();
  options.forEach(option => {
    option.addEventListener('click', () => set(option.dataset.value), { signal: off.signal });
    option.addEventListener('keydown', event => {
      if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) return;
      event.preventDefault(); toggle(); options.find(item => item.dataset.value === current).focus();
    }, { signal: off.signal });
  });
  paint();
  const api = { get state() { return { value: current }; }, set, toggle, destroy() { off.abort(); delete root.__pb; } };
  root.__pb = api;
  return api;
}
// The catalog preview needs nothing extra.
const demo = {};
