// mount(root, { onApply(code, { signal }) → { label }, onRemove(code), maxWidth }) → { state, reset(), destroy() }
function mount(root, { onApply = async () => ({ label: 'Applied' }), onRemove = () => {}, maxWidth = 340 } = {}) {
  root.__pb?.destroy();
  pbPrepare(root);
  const field = root.querySelector('.pb-field'), button = root.querySelector('.pb-btn'), status = root.querySelector('[data-status]'), done = root.querySelector('[data-label=done]');
  const text = key => root.querySelector(`[data-label=${key}]`).textContent;
  const host = root.parentElement, off = new AbortController(), on = (target, type, fn) => target.addEventListener(type, fn, { signal: off.signal });
  let request = null, code = '';
  const state = next => { if (next) root.dataset.state = next; return root.dataset.state; };
  const fit = () => {
    root.style.setProperty('--w0', pbMeasure(button, text('idle')) + 48 + 'px');
    root.style.setProperty('--wa', pbMeasure(button, text('apply')) + 40 + 'px');
    root.style.setProperty('--w1', Math.max(240, Math.min(maxWidth, (host?.clientWidth || maxWidth + 40) - 40)) + 'px');
    root.style.setProperty('--w3', pbMeasure(button, text('remove')) + 48 + 'px');
  };
  fit(); document.fonts?.ready.then(fit);

  const open = () => { state('open'); button.setAttribute('aria-expanded', 'true'); field.tabIndex = 0; setTimeout(() => field.focus({ preventScroll: true }), 60); };
  const close = focusButton => {
    root.classList.remove('pb-error', 'pb-fresh'); state('idle'); button.setAttribute('aria-expanded', 'false'); button.removeAttribute('aria-label'); field.tabIndex = -1;
    if (focusButton) button.focus({ preventScroll: true });
  };
  const refuse = message => { root.classList.add('pb-error'); status.textContent = message; field.focus({ preventScroll: true }); pbShake(root); };

  on(root, 'submit', async event => {
    event.preventDefault();
    if (state() === 'idle') return open();
    // An applied code: the button now removes it.
    if (state() === 'done') { onRemove(code); code = ''; field.value = ''; status.textContent = 'Code removed'; return close(true); }
    if (state() !== 'open') return;
    const typed = field.value.trim().toUpperCase();
    if (!typed) return refuse('Enter a code');
    root.classList.remove('pb-error'); state('busy'); field.tabIndex = -1; button.setAttribute('aria-expanded', 'false'); button.focus({ preventScroll: true }); status.textContent = 'Checking code';
    request = new AbortController();
    try {
      const [result] = await Promise.all([onApply(typed, { signal: request.signal }), pbWait(pbCalm() ? 0 : 800, request.signal)]);
      code = typed;
      const off = document.createElement('span'); off.className = 'pb-off'; off.textContent = result?.label || 'Applied';
      done.replaceChildren(typed, off);
      root.style.setProperty('--w2', pbMeasure(button, typed) + pbMeasure(button, off.textContent) + 18 + 8 + 48 + 'px');
      // Fresh: right after applying, hovering keeps showing the discount instead of jumping to Remove.
      root.classList.add('pb-fresh'); state('done'); button.setAttribute('aria-label', `${typed}, ${off.textContent}. Press to remove`); status.textContent = `${typed} applied, ${off.textContent}`;
      root.dispatchEvent(new CustomEvent('pb:promo', { detail: { code: typed, result }, bubbles: true }));
    } catch {
      if (request.signal.aborted) return;
      open(); setTimeout(() => refuse("That code doesn't work"), 120);
    } finally { request = null; }
  });
  on(field, 'input', () => root.classList.remove('pb-error'));
  on(field, 'keydown', event => { if (event.key === 'Escape') { event.preventDefault(); close(true); } });
  on(button, 'pointerleave', () => root.classList.remove('pb-fresh'));
  on(button, 'blur', () => root.classList.remove('pb-fresh'));
  on(root, 'focusout', () => setTimeout(() => { if (state() === 'open' && !root.contains(pbActive(root)) && !field.value.trim()) close(false); }, 0));

  const api = {
    get state() { return { phase: state(), code }; },
    reset() { request?.abort(); code = ''; field.value = ''; status.textContent = ''; close(false); },
    destroy() { request?.abort(); off.abort(); delete root.__pb; },
  };
  root.__pb = api;
  return api;
}
// The catalog preview checks nothing online: SPRING20 works, anything else is refused.
const demo = { onApply: code => new Promise((resolve, reject) => setTimeout(() => code === 'SPRING20' ? resolve({ label: '−20%' }) : reject(new Error('Unknown code')), 400)) };
