(() => {
  'use strict';
  function mount(root, options = {}) {
    if (!root?.matches('.sl-component')) throw new TypeError('Expected a .sl-component root.');
    const view = root.ownerDocument.defaultView;
    // Remounting disposes only the previous controller on this exact root.
    root.dispatchEvent(new view.Event('sl:buttons-remount'));
    const life = new view.AbortController();
    const $ = selector => root.querySelector(selector);
    const $$ = selector => [...root.querySelectorAll(selector)];
    const listen = (target, type, fn) => target.addEventListener(type, fn, { signal: life.signal });
    const active = () => root.getRootNode().activeElement;
    const status = $('[data-status]');
    const idleStatus = status.textContent;
    const note = $('[data-note]');
    const initialNote = note.textContent;
    let destroyed = false, phase = 'idle', revision = 0, request = null;
    function announce(message) { status.textContent = String(message); }
    function emit(detail = {}) {
      root.dispatchEvent(new view.CustomEvent('sl:action', { bubbles: true, composed: true, detail: { kind: root.dataset.kind, phase, ...detail } }));
    }
    function reflect() { root.dataset.phase = phase; root.setAttribute('aria-busy', String(phase === 'pending')); }
    function abortWork() { revision++; const pending = request; request = null; pending?.abort(); }
    function returnFocus() {
      ['[data-run]', '[data-hold]', '[data-stop]', '[data-add]'].map($).find(button => button && !button.hidden && !button.disabled)?.focus();
    }
    function cancel() {
      if (destroyed || phase !== 'pending') return false;
      const restore = active() === $('[data-cancel]');
      abortWork(); phase = 'canceled'; render(); if (restore) returnFocus();
      announce('Action canceled.'); emit(); return true;
    }
    async function run(callback, payload, commit, pendingText, completeText) {
      if (destroyed || phase === 'pending') return false;
      if (typeof callback !== 'function') {
        phase = 'error'; render(); announce('Connect the action callback before running this control.'); return false;
      }
      const token = ++revision; request = new view.AbortController();
      const signal = request.signal;
      phase = 'pending'; render(); announce(pendingText);
      try {
        const result = await callback({ ...payload, signal });
        if (destroyed || token !== revision) return false;
        if (result?.status === 'canceled') { cancel(); return false; }
        commit(result);
        if (destroyed || token !== revision) return false;
        const restore = active() === $('[data-cancel]');
        request = null; phase = 'complete'; render(); if (restore) returnFocus();
        announce(completeText); emit({ result }); return true;
      } catch (error) {
        if (destroyed || token !== revision) return false;
        const restore = active() === $('[data-cancel]');
        request = null; phase = error?.name === 'AbortError' ? 'canceled' : 'error'; render(); if (restore) returnFocus();
        announce(phase === 'canceled' ? 'Action canceled.' : 'Could not complete the action. Try again.');
        emit({ error }); return false;
      }
    }
    const initialCount = options.initialCount ?? 24;
    if (!Number.isSafeInteger(initialCount) || initialCount < 0) throw new RangeError('initialCount must be a non-negative safe integer.');
    let count = initialCount, version = 0, updatedAt = null, label = '';
    const action = $('[data-run]');
    function render() {
      reflect(); const busy = phase === 'pending';
      action.setAttribute('aria-disabled', String(busy)); $('[data-cancel]').hidden = !busy;
      $('[data-run-label]').textContent = busy ? 'Refreshing…' : phase === 'error' ? 'Retry refresh' : 'Refresh snapshot';
      $('[data-count]').textContent = String(count);
      $('[data-revision]').textContent = version ? 'Revision ' + version : 'Initial snapshot';
      $('[data-updated]').textContent = updatedAt ? new Date(updatedAt).toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit' }) : 'Not refreshed';
    }
    function start() {
      return run(options.onRefresh, { count, version }, result => {
        if (!Number.isSafeInteger(result?.count) || result.count < 0) throw new TypeError('onRefresh must return a non-negative safe integer count.');
        count = result.count; label = result.label == null ? '' : String(result.label);
        version++; updatedAt = Date.now();
      }, 'Reading latest snapshot…', 'Snapshot refreshed.').then(ok => {
        if (ok && !destroyed && phase === 'complete' && label) announce(label);
        return ok;
      });
    }
    listen(action, 'click', start); listen($('[data-cancel]'), 'click', () => { cancel(); action.focus(); });
    function resetLocal() { count = initialCount; version = 0; updatedAt = null; label = ''; if (active() === $('[data-cancel]')) action.focus(); }
    const methods = { start };
    const snapshot = () => ({ count, version, updatedAt });
    function reset() {
      if (destroyed) return;
      abortWork(); phase = 'idle'; resetLocal(); render(); announce(idleStatus);
    }
    function destroy() {
      if (destroyed) return;
      reset(); destroyed = true; life.abort(); note.textContent = initialNote;
    }
    listen(root, 'sl:buttons-remount', destroy);
    listen(root, 'keydown', event => {
      if (event.key === 'Escape' && phase === 'pending') { event.preventDefault(); event.stopPropagation(); cancel(); }
    });
    reset();
    return { reset, destroy, cancel, ...methods, get state() { return { phase, ...snapshot() }; } };
  }
  // This helper is used only by mountPreview. No request or device access occurs.
  function demoTask({ signal, onProgress }, result, duration = 900) {
    return new Promise((resolve, reject) => {
      if (signal.aborted) { reject(new DOMException('Canceled', 'AbortError')); return; }
      let step = 0;
      const stop = () => { clearInterval(timer); signal.removeEventListener('abort', abort); };
      const abort = () => { stop(); reject(new DOMException('Canceled', 'AbortError')); };
      const timer = setInterval(() => {
        step++; onProgress?.(step / 4);
        if (step >= 4) { stop(); resolve(result); }
      }, duration / 4);
      signal.addEventListener('abort', abort, { once: true });
    });
  }
  function mountPreview(root) {
    const controller = mount(root, { onRefresh: context => demoTask(context, { count: context.count + 2, label: 'Demo snapshot updated locally.' }, 1200) });
    root.querySelector('[data-note]').textContent = 'Local demo · no server is contacted.';
    return controller;
  }
  window.SLComponent = { mount, mountPreview };
})();
