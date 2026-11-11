// mount(root, { onConfirm(), resetAfter }) → { state, reset(), destroy() }
function mount(root, { onConfirm = () => {}, resetAfter = 0 } = {}) {
  root.__pb?.destroy();
  pbPrepare(root);
  const input = root.querySelector('input'), go = root.querySelector('.ck-go');
  let timer;
  const reset = () => { clearTimeout(timer); root.dataset.done = 'false'; input.disabled = false; input.checked = false; go.disabled = true; };
  const off = new AbortController();
  input.addEventListener('change', () => { go.disabled = !input.checked; }, { signal: off.signal });
  go.addEventListener('click', () => {
    root.dataset.done = 'true'; go.disabled = true; input.disabled = true;
    onConfirm();
    if (resetAfter) timer = setTimeout(reset, resetAfter);
  }, { signal: off.signal });
  const api = { get state() { return { checked: input.checked, done: root.dataset.done === 'true' }; }, reset, destroy() { off.abort(); clearTimeout(timer); delete root.__pb; } };
  root.__pb = api;
  return api;
}
// The catalog preview puts itself back so it can be tried again.
const demo = { resetAfter: 1500 };
