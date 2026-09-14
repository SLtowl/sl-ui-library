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
    const trigger = $('[data-toggle]'), panel = $('[data-panel]'), choices = $$('[data-format]'), action = $('[data-run]');
    let format = 'SVG', open = false;
    function render() {
      reflect(); const busy = phase === 'pending';
      action.setAttribute('aria-disabled', String(busy)); trigger.disabled = busy;
      $('[data-run-label]').textContent = busy ? 'Exporting ' + format : 'Export ' + format;
      $('[data-cancel]').hidden = !busy;
      trigger.setAttribute('aria-expanded', String(open)); panel.dataset.open = String(open);
      panel.inert = !open; panel.setAttribute('aria-hidden', String(!open));
      choices.forEach(button => button.setAttribute('aria-checked', String(button.dataset.format === format)));
    }
    function close(restore = false) { if (destroyed) return; open = false; render(); if (restore) trigger.focus(); }
    function show(last = false) {
      if (destroyed || phase === 'pending') return;
      open = true; render(); (last ? choices.at(-1) : choices.find(b => b.dataset.format === format)).focus();
    }
    function start() {
      if (destroyed || phase === 'pending') return Promise.resolve(false);
      close();
      return run(options.onExport, { format }, () => {}, 'Preparing ' + format + '…', format + ' export completed.');
    }
    listen(trigger, 'click', () => open ? close(true) : show());
    listen(trigger, 'keydown', e => { if (['ArrowDown','ArrowUp'].includes(e.key)) { e.preventDefault(); show(e.key === 'ArrowUp'); } });
    choices.forEach(button => listen(button, 'click', () => {
      format = button.dataset.format; phase = 'idle'; close(true); announce(format + ' selected.'); emit({ format });
    }));
    listen(panel, 'keydown', e => {
      const index = choices.indexOf(active());
      if (['ArrowDown','ArrowUp','Home','End'].includes(e.key)) {
        e.preventDefault();
        const next = e.key === 'Home' ? 0 : e.key === 'End' ? choices.length - 1 : (index + (e.key === 'ArrowDown' ? 1 : -1) + choices.length) % choices.length;
        choices[next].focus();
      }
      if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); close(true); }
    });
    listen(root, 'focusout', e => { if (open && !root.contains(e.relatedTarget)) close(); });
    listen(action, 'click', start); listen($('[data-cancel]'), 'click', () => { cancel(); action.focus(); });
    function resetLocal() { const restore = open && panel.contains(active()); format = 'SVG'; open = false; if (restore) trigger.focus(); }
    const methods = { start, open: show, close: () => close(true) };
    const snapshot = () => ({ format, open });
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
    const controller = mount(root, { onExport: context => demoTask(context) });
    root.querySelector('[data-note]').textContent = 'Local demo · no file is created.';
    return controller;
  }
  window.SLComponent = { mount, mountPreview };
})();
