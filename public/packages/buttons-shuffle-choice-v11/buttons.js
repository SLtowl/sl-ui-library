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
    const choices = options.choices ?? ['Quiet geometry', 'Warm contrast', 'Open space', 'Rhythmic lines'];
    if (!Array.isArray(choices) || choices.length < 2 || choices.length > 20 || choices.some(text => typeof text !== 'string' || !text.trim()) || new Set(choices).size !== choices.length) throw new TypeError('Provide 2–20 distinct non-empty choice strings.');
    const labels = [...choices], random = options.random ?? Math.random;
    if (typeof random !== 'function') throw new TypeError('random must be a function returning a number in [0, 1).');
    let index = 0, previous = null;
    function render() {
      reflect(); $('[data-choice]').textContent = labels[index];
      $('[data-number]').textContent = String(index + 1).padStart(2, '0') + ' / ' + String(labels.length).padStart(2, '0');
      $('[data-undo]').disabled = previous === null; root.dataset.alternate = String(index % 2 === 1);
    }
    function shuffle() {
      if (destroyed) return false;
      const number = random();
      if (!Number.isFinite(number) || number < 0 || number >= 1) { phase = 'error'; render(); announce('The random source must return a number from 0 up to 1.'); return false; }
      previous = index; const candidate = Math.floor(number * (labels.length - 1)); index = candidate >= index ? candidate + 1 : candidate;
      phase = 'complete'; render(); announce(labels[index] + ' selected.'); emit({ index, choice: labels[index] }); return true;
    }
    function undo() {
      if (destroyed || previous === null) return false;
      index = previous; previous = null; phase = 'idle';
      if (active() === $('[data-undo]')) $('[data-shuffle]').focus();
      render(); announce('Restored ' + labels[index] + '.'); emit({ index, choice: labels[index] }); return true;
    }
    listen($('[data-shuffle]'), 'click', shuffle); listen($('[data-undo]'), 'click', undo);
    function resetLocal() { index = 0; previous = null; if (active() === $('[data-undo]')) $('[data-shuffle]').focus(); }
    const methods = { shuffle, undo };
    const snapshot = () => ({ index, choice: labels[index], canUndo: previous !== null });
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
