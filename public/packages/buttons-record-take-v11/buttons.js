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
    let recording = false, elapsed = 0, startedAt = 0, clock = null, session = null, sessionAbort = null, operation = null;
    const action = $('[data-run]');
    function updateTime() {
      if (recording) elapsed = Math.max(0, Math.floor((view.performance.now() - startedAt) / 1000));
      const minutes = Math.floor(elapsed / 60);
      $('[data-time]').textContent = String(minutes).padStart(2, '0') + ':' + String(elapsed % 60).padStart(2, '0');
    }
    function cleanupSession() {
      clearInterval(clock); clock = null; sessionAbort?.abort(); sessionAbort = null;
      const resource = session; session = null;
      try { resource?.dispose(); } catch { /* Cleanup must not prevent lifecycle teardown. */ }
    }
    function render() {
      reflect(); const busy = phase === 'pending';
      root.dataset.recording = String(recording);
      action.hidden = recording; action.setAttribute('aria-disabled', String(busy));
      $('[data-run-label]').textContent = busy && operation === 'start' ? 'Starting…' : 'Start recording';
      $('[data-stop]').hidden = !recording; $('[data-stop]').setAttribute('aria-disabled', String(busy));
      $('[data-cancel]').hidden = !busy;
      $('[data-session]').textContent = recording ? 'Recording' : busy ? 'Starting' : elapsed ? 'Stopped' : 'Ready';
      updateTime();
    }
    function start() {
      if (destroyed || recording || phase === 'pending') return Promise.resolve(false);
      if (typeof options.onStop !== 'function') { announce('Connect onStart and onStop before recording.'); return Promise.resolve(false); }
      operation = 'start'; elapsed = 0;
      return run(typeof options.onStart === 'function' ? async ({ signal }) => {
        const token = revision;
        const resource = await options.onStart({ signal });
        if (resource?.status === 'canceled') return resource;
        if (!resource || typeof resource.dispose !== 'function') throw new TypeError('onStart must return a session with dispose().');
        if (signal.aborted || token !== revision || destroyed) { resource.dispose(); return { status: 'canceled' }; }
        // Keep the start signal alive for the lifetime of the session.
        sessionAbort = request; return resource;
      } : undefined, {}, resource => {
        session = resource; recording = true; startedAt = view.performance.now();
        clock = setInterval(updateTime, 250); $('[data-stop]').hidden = false; $('[data-stop]').focus();
      }, 'Starting recorder…', 'Recording started.');
    }
    function stop() {
      if (destroyed || !recording || phase === 'pending') return Promise.resolve(false);
      operation = 'stop';
      return run(options.onStop, { session }, () => {
        updateTime(); recording = false; cleanupSession(); action.hidden = false; action.focus();
      }, 'Stopping recorder…', 'Recording stopped.');
    }
    listen(action, 'click', start); listen($('[data-stop]'), 'click', stop);
    listen($('[data-cancel]'), 'click', () => { cancel(); (recording ? $('[data-stop]') : action).focus(); });
    function resetLocal() { recording = false; cleanupSession(); elapsed = 0; operation = null; if (active() === $('[data-stop]') || active() === $('[data-cancel]')) { action.hidden = false; action.focus(); } }
    const methods = { start, stop };
    const snapshot = () => ({ recording, elapsed });
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
    const controller = mount(root, {
      onStart: context => demoTask(context, { dispose() {} }, 400),
      onStop: context => demoTask(context, undefined, 500)
    });
    root.querySelector('[data-note]').textContent = 'Local demo · no microphone or media access.';
    return controller;
  }
  window.SLComponent = { mount, mountPreview };
})();
