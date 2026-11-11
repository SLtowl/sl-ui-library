// mount(root, { base, currency, onChange({ total, selected }) }) → { state, reset(), destroy() }
function mount(root, { base = 15, currency = '$', onChange = () => {} } = {}) {
  root.__pb?.destroy();
  pbPrepare(root);
  const inputs = [...root.querySelectorAll('input')], out = root.querySelector('.ck-total b'), start = inputs.map(input => input.checked);
  const still = matchMedia('(prefers-reduced-motion:reduce)').matches;
  const total = () => base + inputs.reduce((sum, input) => sum + (input.checked ? Number(input.dataset.price) : 0), 0);
  const read = () => inputs.filter(input => input.checked).map(input => input.closest('label').querySelector('.ck-text').textContent);
  let shown = total(), frame;
  const write = value => { out.textContent = currency + Math.round(value); };
  // Counts from whatever is showing, so a press in the middle of a count just turns it around.
  const count = target => {
    const from = shown, began = performance.now();
    cancelAnimationFrame(frame);
    if (still) { shown = target; write(target); return; }
    const step = now => { const t = Math.min(1, (now - began) / 420); shown = from + (target - from) * (1 - (1 - t) ** 3); write(shown); if (t < 1) frame = requestAnimationFrame(step); };
    frame = requestAnimationFrame(step);
  };
  const off = new AbortController();
  inputs.forEach(input => input.addEventListener('change', () => { count(total()); onChange({ total: total(), selected: read() }); }, { signal: off.signal }));
  write(shown);
  const api = {
    get state() { return { total: total(), selected: read() }; },
    reset() { inputs.forEach((input, i) => { input.checked = start[i]; }); cancelAnimationFrame(frame); shown = total(); write(shown); },
    destroy() { off.abort(); cancelAnimationFrame(frame); delete root.__pb; },
  };
  root.__pb = api;
  return api;
}
// The catalog preview needs nothing extra.
const demo = {};
