// mount(root, { period, prices, notes, onChange(period) }) → { state, set(period), toggle(), destroy() }
// period is 'monthly' or 'yearly'. Without prices or notes the text already in the markup stays.
function mount(root, { period: start = 'monthly', prices, notes, onChange = () => {} } = {}) {
  root.__pb?.destroy();
  pbPrepare(root);
  const mo = [...root.querySelectorAll('.bl-num>.mo,.bl-note>.mo')], yr = [...root.querySelectorAll('.bl-num>.yr,.bl-note>.yr')], options = [...root.querySelectorAll('.bl-opt')];
  if (prices) { mo[0].textContent = prices.monthly; yr[0].textContent = prices.yearly; }
  if (notes) { mo[1].textContent = notes.monthly; yr[1].textContent = notes.yearly; }
  let current = start === 'yearly' ? 'yearly' : 'monthly';
  const paint = () => {
    root.dataset.period = current;
    mo.forEach(node => node.setAttribute('aria-hidden', String(current !== 'monthly')));
    yr.forEach(node => node.setAttribute('aria-hidden', String(current !== 'yearly')));
    options.forEach(option => { const on = option.dataset.period === current; option.setAttribute('aria-checked', String(on)); option.tabIndex = on ? 0 : -1; });
  };
  const set = next => { if (next === current || (next !== 'monthly' && next !== 'yearly')) return; current = next; paint(); onChange(current); };
  const toggle = () => set(current === 'monthly' ? 'yearly' : 'monthly');
  const off = new AbortController();
  options.forEach(option => {
    option.addEventListener('click', () => set(option.dataset.period), { signal: off.signal });
    option.addEventListener('keydown', event => {
      if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) return;
      event.preventDefault(); toggle(); options.find(item => item.dataset.period === current).focus();
    }, { signal: off.signal });
  });
  paint();
  const api = { get state() { return { period: current }; }, set, toggle, destroy() { off.abort(); delete root.__pb; } };
  root.__pb = api;
  return api;
}
// The catalog preview needs nothing extra.
const demo = {};
