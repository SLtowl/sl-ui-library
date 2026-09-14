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
    let idleStatus = status.textContent;
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
    const minimum = options.min ?? 1, maximum = options.max ?? 12, initial = options.value ?? 3;
    if (![minimum, maximum, initial].every(Number.isSafeInteger) || minimum < 0 || maximum > 999 || maximum <= minimum || initial < minimum || initial > maximum) throw new RangeError('Use integer min < max between 0 and 999, with value in range.');
    idleStatus = initial + (initial === 1 ? ' copy selected.' : ' copies selected.');
    let value = initial, timer = null, held = null, pointerId = null;
    function render() {
      reflect(); $('[data-value]').textContent = String(value); $('[data-min]').textContent = String(minimum); $('[data-max]').textContent = String(maximum);
      // aria-disabled retains keyboard focus at a boundary for immediate reversal.
      $('[data-minus]').setAttribute('aria-disabled', String(value <= minimum)); $('[data-plus]').setAttribute('aria-disabled', String(value >= maximum));
      $('[data-fill]').style.transform = 'scaleX(' + (value - minimum) / (maximum - minimum) + ')';
    }
    function setValue(next, notify = false) {
      if (destroyed || !Number.isSafeInteger(next)) return false;
      const clamped = Math.min(maximum, Math.max(minimum, next)); if (clamped === value) return false;
      value = clamped; phase = 'complete'; render();
      announce(value + (value === 1 ? ' copy selected.' : ' copies selected.'));
      if (notify) emit({ value }); return true;
    }
    function endHold() {
      clearTimeout(timer); timer = null;
      const button = held, id = pointerId; held = null; pointerId = null;
      if (button?.hasPointerCapture?.(id)) button.releasePointerCapture(id);
    }
    function repeat(delta) {
      if (!held || destroyed || !setValue(value + delta, true)) { endHold(); return; }
      timer = setTimeout(() => repeat(delta), 100);
    }
    [[$('[data-minus]'), -1], [$('[data-plus]'), 1]].forEach(([button, delta]) => {
      listen(button, 'pointerdown', e => {
        if (e.button !== 0 || !e.isPrimary || destroyed) return;
        e.preventDefault(); button.focus(); endHold();
        if (!setValue(value + delta, true)) return;
        held = button; pointerId = e.pointerId; button.setPointerCapture?.(pointerId);
        timer = setTimeout(() => repeat(delta), 400);
      });
      listen(button, 'click', e => { if (e.detail === 0) setValue(value + delta, true); });
      ['pointerup','pointercancel','lostpointercapture','blur'].forEach(type => listen(button, type, endHold));
      listen(button, 'pointermove', e => { if (held !== button) return; const box = button.getBoundingClientRect(); if (e.clientX < box.left || e.clientX > box.right || e.clientY < box.top || e.clientY > box.bottom) endHold(); });
    });
    listen(root, 'keydown', e => {
      const next = { ArrowRight: value + 1, ArrowUp: value + 1, ArrowLeft: value - 1, ArrowDown: value - 1, Home: minimum, End: maximum }[e.key];
      if (next !== undefined) { e.preventDefault(); endHold(); setValue(next, true); }
      if (e.key === 'Escape') endHold();
    });
    function resetLocal() { endHold(); value = initial; }
    const methods = { setValue };
    const snapshot = () => ({ value, min: minimum, max: maximum });
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
