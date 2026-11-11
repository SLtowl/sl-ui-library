// mount(root, { onChange(days) }) → { state, reset(), destroy() }
function mount(root, { onChange = () => {} } = {}) {
  root.__pb?.destroy();
  pbPrepare(root);
  const days = [...root.querySelectorAll('input')], slots = [...root.querySelectorAll('.ck-swap>span')], start = days.map(day => day.checked);
  const read = () => days.filter(day => day.checked).map(day => day.getAttribute('aria-label'));
  let live = 0;
  const say = () => {
    const on = days.map(day => day.checked), n = on.filter(Boolean).length;
    const work = on.slice(0, 5).every(Boolean) && !on[5] && !on[6], rest = on[5] && on[6] && n === 2;
    const text = n === 7 ? 'Every day' : n === 0 ? 'No days yet' : work ? 'Every weekday' : rest ? 'Weekends' : n === 1 ? 'Once a week' : n + ' days a week';
    if (text === slots[live].textContent) return;
    live = 1 - live; slots[live].textContent = text;
    slots.forEach((slot, i) => slot.classList.toggle('on', i === live));
  };
  const off = new AbortController();
  days.forEach(day => day.addEventListener('change', () => { say(); onChange(read()); }, { signal: off.signal }));
  say();
  const api = {
    get state() { return { days: read() }; },
    reset() { days.forEach((day, i) => { day.checked = start[i]; }); say(); },
    destroy() { off.abort(); delete root.__pb; },
  };
  root.__pb = api;
  return api;
}
// The catalog preview needs nothing extra.
const demo = {};
