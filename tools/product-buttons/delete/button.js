// mount(root, { onDelete({ signal }), confirmFor, resetAfter }) → { state, reset(), destroy() }
function mount(root, { onDelete = async () => {}, confirmFor = 4000, resetAfter = 0 } = {}) {
  root.__pb?.destroy();
  pbPrepare(root);
  const button = root.querySelector('.pb-btn'), cancel = root.querySelector('.pb-cancel'), status = root.querySelector('[data-status]');
  const text = key => root.querySelector(`[data-label=${key}]`).textContent;
  const off = new AbortController(), on = (target, type, fn) => target.addEventListener(type, fn, { signal: off.signal });
  let request = null, timer = 0;
  const state = next => { if (next) root.dataset.state = next; return root.dataset.state; };
  const fit = () => {
    root.style.setProperty('--w0', pbMeasure(button, text('idle')) + 52 + 'px');
    root.style.setProperty('--w1', pbMeasure(button, text('confirm')) + 48 + 'px');
    root.style.setProperty('--wc', pbMeasure(button, cancel.textContent) + 40 + 'px');
    root.style.setProperty('--w2', pbMeasure(button, text('done')) + 52 + 'px');
  };
  fit(); document.fonts?.ready.then(fit);

  const ask = () => {
    state('confirm'); cancel.tabIndex = 0; cancel.removeAttribute('aria-hidden'); button.setAttribute('aria-label', text('confirm'));
    status.textContent = `${text('confirm')} or ${cancel.textContent}`;
    // An unanswered question closes by itself, so a stray click never stays armed.
    clearTimeout(timer); timer = setTimeout(() => back(false), confirmFor);
  };
  const back = focusButton => {
    clearTimeout(timer); state('idle'); cancel.tabIndex = -1; cancel.setAttribute('aria-hidden', 'true'); button.removeAttribute('aria-label'); button.removeAttribute('aria-disabled'); status.textContent = '';
    if (focusButton) button.focus({ preventScroll: true });
  };
  on(button, 'click', async () => {
    if (state() === 'idle') return ask();
    if (state() !== 'confirm') return;
    clearTimeout(timer); state('busy'); cancel.tabIndex = -1; cancel.setAttribute('aria-hidden', 'true'); button.setAttribute('aria-disabled', 'true'); status.textContent = 'Deleting';
    request = new AbortController();
    try {
      await Promise.all([onDelete({ signal: request.signal }), pbWait(pbCalm() ? 0 : 800, request.signal)]);
      state('done'); button.setAttribute('aria-label', text('done')); status.textContent = text('done');
      root.dispatchEvent(new CustomEvent('pb:delete', { bubbles: true }));
      if (resetAfter) timer = setTimeout(() => api.reset(), resetAfter);
    } catch {
      if (request.signal.aborted) return;
      back(true); status.textContent = 'Could not delete. Try again'; pbShake(button);
    } finally { request = null; }
  });
  on(cancel, 'click', () => back(true));
  on(root, 'keydown', event => { if (event.key === 'Escape' && state() === 'confirm') { event.preventDefault(); back(true); } });
  on(root, 'focusout', () => setTimeout(() => { if (state() === 'confirm' && !root.contains(pbActive(root))) back(false); }, 0));

  const api = {
    get state() { return { phase: state() }; },
    reset() { request?.abort(); back(false); },
    destroy() { clearTimeout(timer); request?.abort(); off.abort(); delete root.__pb; },
  };
  root.__pb = api;
  return api;
}
// The catalog preview deletes nothing and comes back after a moment.
const demo = { onDelete: () => new Promise(resolve => setTimeout(resolve, 400)), resetAfter: 2400 };
