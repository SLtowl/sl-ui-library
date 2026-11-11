const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
// mount(root, { onSubscribe(email, { signal }), maxWidth, resetAfter }) → { state, reset(), destroy() }
function mount(root, { onSubscribe = async () => {}, maxWidth = 380, resetAfter = 0 } = {}) {
  root.__pb?.destroy();
  pbPrepare(root);
  const field = root.querySelector('.pb-field'), button = root.querySelector('.pb-btn'), status = root.querySelector('[data-status]');
  const idleText = root.querySelector('[data-label=idle]').textContent, doneText = root.querySelector('[data-label=done]').textContent;
  const host = root.parentElement, off = new AbortController(), on = (target, type, fn) => target.addEventListener(type, fn, { signal: off.signal });
  let request = null, timer = 0;
  const state = next => { if (next) root.dataset.state = next; return root.dataset.state; };
  // Widths in pixels so they can animate: at rest, open (fits its container), and done.
  const fit = () => {
    root.style.setProperty('--w0', pbMeasure(button, idleText) + 52 + 'px');
    root.style.setProperty('--w2', pbMeasure(button, doneText) + 52 + 'px');
    root.style.setProperty('--w1', Math.max(240, Math.min(maxWidth, (host?.clientWidth || maxWidth + 40) - 40)) + 'px');
  };
  fit(); document.fonts?.ready.then(fit);
  const resize = typeof ResizeObserver === 'function' && host ? new ResizeObserver(fit) : null;
  resize?.observe(host);

  const open = () => { state('open'); button.setAttribute('aria-expanded', 'true'); field.tabIndex = 0; setTimeout(() => field.focus({ preventScroll: true }), 60); };
  const close = focusButton => { root.classList.remove('pb-error'); state('idle'); button.setAttribute('aria-expanded', 'false'); field.tabIndex = -1; if (focusButton) button.focus({ preventScroll: true }); };
  const refuse = message => { root.classList.add('pb-error'); status.textContent = message; field.focus({ preventScroll: true }); pbShake(root); };

  on(root, 'submit', async event => {
    event.preventDefault();
    if (state() === 'idle') return open();
    if (state() !== 'open') return;
    const email = field.value.trim();
    if (!EMAIL.test(email)) return refuse('Enter a full email address');
    // Sending: the field folds into the button, which shows it is working, then lands as "You're in".
    root.classList.remove('pb-error'); state('busy'); field.tabIndex = -1;
    button.setAttribute('aria-expanded', 'false'); button.setAttribute('aria-disabled', 'true'); button.focus({ preventScroll: true }); status.textContent = 'Subscribing';
    request = new AbortController();
    try {
      await Promise.all([onSubscribe(email, { signal: request.signal }), pbWait(pbCalm() ? 0 : 900, request.signal)]);
      state('done'); status.textContent = doneText;
      root.dispatchEvent(new CustomEvent('pb:subscribe', { detail: { email }, bubbles: true }));
      if (resetAfter) timer = setTimeout(() => api.reset(), resetAfter);
    } catch (error) {
      if (request.signal.aborted) return;
      button.removeAttribute('aria-disabled'); open(); setTimeout(() => refuse('Could not subscribe. Try again'), 120);
    } finally { request = null; }
  });
  on(field, 'input', () => root.classList.remove('pb-error'));
  on(field, 'keydown', event => { if (event.key === 'Escape') { event.preventDefault(); close(true); } });
  // Leaving an empty field closes it; a typed address stays.
  on(root, 'focusout', () => setTimeout(() => { if (state() === 'open' && !root.contains(pbActive(root)) && !field.value.trim()) close(false); }, 0));

  const api = {
    get state() { return { phase: state(), email: field.value.trim() }; },
    reset() { clearTimeout(timer); request?.abort(); field.value = ''; status.textContent = ''; button.removeAttribute('aria-disabled'); close(false); },
    destroy() { clearTimeout(timer); request?.abort(); off.abort(); resize?.disconnect(); delete root.__pb; },
  };
  root.__pb = api;
  return api;
}
// The catalog preview: no network, a short pretend request, and it resets itself so it can be tried again.
const demo = { onSubscribe: () => new Promise(resolve => setTimeout(resolve, 500)), resetAfter: 2600 };
