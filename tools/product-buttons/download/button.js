// mount(root, { onDownload({ signal, progress }), onOpen(controller), maxWidth, resetAfter }) → { state, reset(), destroy() }
function mount(root, { onDownload = async () => {}, onOpen = () => {}, maxWidth = 260, resetAfter = 0 } = {}) {
  root.__pb?.destroy();
  pbPrepare(root);
  const button = root.querySelector('.pb-btn'), status = root.querySelector('[data-status]'), pct = root.querySelector('[data-label=pct]');
  const text = key => root.querySelector(`[data-label=${key}]`).textContent;
  const host = root.parentElement, off = new AbortController(), on = (target, type, fn) => target.addEventListener(type, fn, { signal: off.signal });
  let request = null, timer = 0;
  const state = next => { if (next) root.dataset.state = next; return root.dataset.state; };
  const fit = () => {
    root.style.setProperty('--w0', pbMeasure(button, text('idle')) + 52 + 'px');
    root.style.setProperty('--w1', Math.max(180, Math.min(maxWidth, (host?.clientWidth || maxWidth + 40) - 40)) + 'px');
    root.style.setProperty('--w2', pbMeasure(button, text('done')) + 52 + 'px');
  };
  fit(); document.fonts?.ready.then(fit);
  const bar = pbProgress(p => { root.style.setProperty('--p', p.toFixed(4)); pct.textContent = Math.round(p * 100) + '%'; });
  const idle = () => { clearTimeout(timer); bar.reset(); button.removeAttribute('aria-label'); state('idle'); };

  on(button, 'click', async () => {
    if (state() === 'done') { onOpen(api); return; }
    // A click on the moving bar cancels it.
    if (state() === 'busy') { request?.abort(); idle(); status.textContent = 'Download canceled'; return; }
    state('busy'); button.setAttribute('aria-label', 'Downloading. Press to cancel'); status.textContent = 'Downloading';
    request = new AbortController();
    const signal = request.signal;
    try {
      await onDownload({ signal, progress: value => { if (!signal.aborted) bar.to(value); } });
      await bar.finish();
      if (signal.aborted) return;
      state('done'); button.setAttribute('aria-label', text('done')); status.textContent = 'Download complete';
      root.dispatchEvent(new CustomEvent('pb:download', { bubbles: true }));
      if (resetAfter) timer = setTimeout(idle, resetAfter);
    } catch {
      if (signal.aborted) return;
      idle(); status.textContent = 'Download failed. Try again'; pbShake(button);
    } finally { if (request?.signal === signal) request = null; }
  });

  const api = {
    get state() { return { phase: state() }; },
    reset() { request?.abort(); status.textContent = ''; idle(); },
    destroy() { clearTimeout(timer); request?.abort(); bar.reset(); off.abort(); delete root.__pb; },
  };
  root.__pb = api;
  return api;
}
// The catalog preview downloads nothing: pretend progress, and Open file just starts over.
const demo = { onDownload: pbDemoTransfer, onOpen: api => api.reset(), resetAfter: 4000 };
