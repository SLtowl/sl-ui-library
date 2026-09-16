(() => {
  'use strict';
  function mount(root, options = {}) {
    if (!root?.matches('.sl-component')) throw new TypeError('Expected a .sl-component root.');
    const view = root.ownerDocument.defaultView;
    root.dispatchEvent(new view.Event('sl:buttons-remount'));
    const life = new view.AbortController();
    const button = root.querySelector('[data-action]'), label = root.querySelector('[data-label]'), status = root.querySelector('[data-status]');
    let phase = 'idle', request = null, revision = 0, destroyed = false, resetTimer = 0;
    const listen = (target, type, fn) => target.addEventListener(type, fn, { signal: life.signal });
    const activeElement = () => root.getRootNode().activeElement;
    function render() {
      const labels = ["Move item","Moving","Moved","Try again"];
      const index = phase === 'pending' ? 1 : phase === 'complete' ? 2 : phase === 'error' ? 3 : 0;
      root.dataset.phase = phase; root.setAttribute('aria-busy', String(phase === 'pending'));
      button.setAttribute('aria-busy', String(phase === 'pending')); button.setAttribute('aria-disabled', String(phase === 'pending'));
      label.textContent = labels[index]; button.setAttribute('aria-label', labels[index]);
    }
    function abortWork() { revision++; request?.abort(); request = null; clearTimeout(resetTimer); }
    async function start() {
      if (destroyed || phase === 'pending') return false;
      if (typeof options.onMove !== 'function') { phase = 'error'; render(); status.textContent = 'Connect onMove before using this button.'; return false; }
      const token = ++revision; request = new view.AbortController(); phase = 'pending'; render(); status.textContent = "Moving item.";
      try {
        const result = await options.onMove({ signal: request.signal });
        if (destroyed || token !== revision || request.signal.aborted) return false;
        request = null; phase = 'complete'; render(); status.textContent = options.preview ? "Demo finished locally. No item was moved." : "Item moved.";
        root.dispatchEvent(new view.CustomEvent('sl:action', { bubbles: true, composed: true, detail: { kind: root.dataset.kind, phase, result } }));
        resetTimer = view.setTimeout(() => { if (!destroyed && phase === 'complete') { phase = 'idle'; render(); status.textContent = "Ready to move."; } }, 1800);
        return true;
      } catch (error) {
        if (destroyed || token !== revision) return false;
        request = null; phase = error?.name === 'AbortError' ? 'idle' : 'error'; render(); status.textContent = phase === 'idle' ? "Ready to move." : "Could not move the item. Try again."; return false;
      }
    }
    function cancel() { if (destroyed || phase !== 'pending') return false; abortWork(); phase = 'idle'; render(); status.textContent = "Ready to move."; if (activeElement() !== button) button.focus(); return true; }
    function reset() { if (destroyed) return; abortWork(); phase = 'idle'; render(); status.textContent = "Ready to move."; }
    function destroy() { if (destroyed) return; reset(); destroyed = true; life.abort(); }
    listen(button, 'click', start); listen(root, 'keydown', event => { if (event.key === 'Escape' && phase === 'pending') { event.preventDefault(); cancel(); } }); listen(root, 'sl:buttons-remount', destroy); reset();
    return { start, cancel, reset, destroy, get state() { return { phase }; } };
  }
  function mountPreview(root) {
    return mount(root, { preview: true, onMove: ({ signal }) => new Promise((resolve, reject) => { const timer = setTimeout(resolve, 700); signal.addEventListener('abort', () => { clearTimeout(timer); reject(new DOMException('Canceled','AbortError')); }, { once: true }); }) });
  }
  window.SLComponent = { mount, mountPreview };
})();
