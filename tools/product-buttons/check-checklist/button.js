// mount(root, { onChange({ done, total }) }) → { state, reset(), destroy() }
function mount(root, { onChange = () => {} } = {}) {
  root.__pb?.destroy();
  pbPrepare(root);
  const tasks = [...root.querySelectorAll('input')], slots = [...root.querySelectorAll('.ck-swap>span')], start = tasks.map(task => task.checked);
  const count = () => tasks.filter(task => task.checked).length;
  const paint = () => { const n = count(); root.style.setProperty('--n', n); slots.forEach((slot, i) => slot.classList.toggle('on', i === n)); };
  const off = new AbortController();
  root.style.setProperty('--total', tasks.length);
  tasks.forEach(task => task.addEventListener('change', () => { paint(); onChange({ done: count(), total: tasks.length }); }, { signal: off.signal }));
  paint();
  const api = {
    get state() { return { done: count(), total: tasks.length }; },
    reset() { tasks.forEach((task, i) => { task.checked = start[i]; }); paint(); },
    destroy() { off.abort(); delete root.__pb; },
  };
  root.__pb = api;
  return api;
}
// The catalog preview needs nothing extra.
const demo = {};
