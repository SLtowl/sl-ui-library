// mount(root, { onChange(selected) }) → { state, reset(), destroy() }
function mount(root, { onChange = () => {} } = {}) {
  root.__pb?.destroy();
  pbPrepare(root);
  const levels = [...root.querySelectorAll('input')], rows = [...root.querySelectorAll('.ck-row')], start = levels.map(level => level.checked);
  const read = () => levels.filter(level => level.checked).map(level => level.closest('label').textContent.trim());
  const off = new AbortController();
  levels.forEach((level, i) => level.addEventListener('change', () => {
    levels.forEach((other, j) => {
      rows[j].style.setProperty('--d', Math.abs(j - i) * 70 + 'ms');
      if (level.checked && j < i) other.checked = true;
      if (!level.checked && j > i) other.checked = false;
    });
    onChange(read());
  }, { signal: off.signal }));
  const api = {
    get state() { return { selected: read() }; },
    reset() { levels.forEach((level, i) => { level.checked = start[i]; }); },
    destroy() { off.abort(); delete root.__pb; },
  };
  root.__pb = api;
  return api;
}
// The catalog preview needs nothing extra.
const demo = {};
