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
    let items = [], nextId = 1, completed = 0, activeId = null;
    const rows = $$('[data-row]'), action = $('[data-run]');
    function render() {
      reflect(); const busy = phase === 'pending'; if (!busy) activeId = null;
      $('[data-add]').disabled = items.length >= 3;
      action.disabled = !items.length; action.setAttribute('aria-disabled', String(busy));
      $('[data-run-label]').textContent = busy ? 'Running…' : 'Run queue';
      if (!busy && !items.length && active() === $('[data-cancel]')) $('[data-add]').focus();
      $('[data-cancel]').hidden = !busy; $('[data-empty]').hidden = items.length > 0;
      $('[data-count]').textContent = items.length + ' / 3';
      rows.forEach((row, index) => {
        const job = items[index]; row.hidden = !job;
        row.querySelector('[data-job-label]').textContent = job?.label ?? '';
        row.querySelector('[data-job-state]').textContent = job?.id === activeId ? 'Rendering' : 'Waiting';
        const remove = row.querySelector('[data-remove]');
        remove.disabled = job?.id === activeId; remove.setAttribute('aria-label', job ? 'Remove ' + job.label : 'Remove queued take');
      });
    }
    function add(label) {
      if (destroyed || items.length >= 3) return false;
      const id = nextId++; items.push({ id, label: label === undefined ? 'Take ' + String(id).padStart(2, '0') : String(label) });
      if (phase !== 'pending') phase = 'idle'; render(); announce('Take added. ' + items.length + ' queued.'); emit({ items: items.map(item => ({ ...item })) }); return true;
    }
    function remove(index) {
      if (destroyed || !Number.isInteger(index) || !items[index] || items[index].id === activeId) return false;
      const removed = items.splice(index, 1)[0]; $('[data-add]').focus(); render(); announce(removed.label + ' removed.'); emit(); return true;
    }
    function start() {
      if (destroyed || phase === 'pending' || !items.length) return Promise.resolve(false);
      return run(typeof options.onRun === 'function' ? async ({ signal }) => {
        const token = revision;
        while (items.length && !signal.aborted && token === revision && !destroyed) {
          const job = items[0]; activeId = job.id; render(); announce('Rendering ' + job.label + '…');
          const result = await options.onRun({ ...job, signal });
          if (signal.aborted || token !== revision || destroyed) return { status: 'canceled' };
          if (result?.status === 'canceled') return result;
          items.shift(); completed++; render();
        }
      } : undefined, {}, () => {}, 'Starting queue…', 'All queued takes completed.');
    }
    listen($('[data-add]'), 'click', () => add());
    $$('[data-remove]').forEach(button => listen(button, 'click', () => remove(Number(button.dataset.remove))));
    listen(action, 'click', start); listen($('[data-cancel]'), 'click', () => { cancel(); action.focus(); });
    function resetLocal() { items = []; nextId = 1; completed = 0; activeId = null; if (rows.some(row => row.contains(active())) || active() === $('[data-cancel]') || active() === action) $('[data-add]').focus(); }
    const methods = { add, remove, start };
    const snapshot = () => ({ items: items.map(item => ({ ...item })), completed, activeId });
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
    const controller = mount(root, { onRun: context => demoTask(context, undefined, 1000) });
    root.querySelector('[data-note]').textContent = 'Local demo · takes are not rendered.';
    return controller;
  }
  window.SLComponent = { mount, mountPreview };
})();
