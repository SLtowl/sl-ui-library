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
    let decision = null, previous = null;
    function render() {
      reflect(); root.dataset.decision = decision ?? 'none';
      $('[data-approve]').setAttribute('aria-pressed', String(decision === 'approve'));
      $('[data-reject]').setAttribute('aria-pressed', String(decision === 'reject'));
      $('[data-decision]').textContent = decision === 'approve' ? 'Approved locally' : decision === 'reject' ? 'Rejected locally' : 'Awaiting review';
      $('[data-approval]').style.opacity = decision === 'reject' ? '0' : '1';
      $('[data-rejection]').style.opacity = decision === 'reject' ? '1' : '0';
      $('[data-undo]').disabled = decision === null && previous === null;
    }
    function choose(value) {
      if (destroyed || !['approve','reject'].includes(value) || value === decision) return false;
      previous = decision; decision = value; phase = 'complete'; render();
      announce(decision === 'approve' ? 'Approval selected. You can undo.' : 'Rejection selected. You can undo.'); emit({ decision }); return true;
    }
    function undo() {
      if (destroyed || (decision === null && previous === null)) return false;
      decision = previous; previous = null; phase = decision ? 'complete' : 'idle';
      if (active() === $('[data-undo]') && decision === null) $('[data-approve]').focus();
      render(); announce(decision ? 'Previous decision restored.' : 'Decision cleared.'); emit({ decision }); return true;
    }
    function setDecision(value) {
      if (destroyed || ![null,'approve','reject'].includes(value)) return false;
      decision = value; previous = null; phase = value ? 'complete' : 'idle'; render();
      announce(value ? 'Decision restored locally.' : idleStatus); return true;
    }
    listen($('[data-approve]'), 'click', () => choose('approve')); listen($('[data-reject]'), 'click', () => choose('reject')); listen($('[data-undo]'), 'click', undo);
    function resetLocal() { decision = previous = null; if (active() === $('[data-undo]')) $('[data-approve]').focus(); }
    const methods = { choose, undo, setDecision };
    const snapshot = () => ({ decision });
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
  function mountPreview(root) {
    return mount(root);
  }
  window.SLComponent = { mount, mountPreview };
})();
