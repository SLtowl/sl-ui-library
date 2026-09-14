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
    const hold = $('[data-hold]'), opener = $('[data-confirm-open]'), panel = $('[data-panel]');
    const holdMs = options.holdMs ?? 1200;
    if (!Number.isFinite(holdMs) || holdMs < 500 || holdMs > 5000) throw new RangeError('holdMs must be 500–5000.');
    const motion = view.matchMedia('(prefers-reduced-motion: reduce)');
    let open = false, holding = false, timer = null, frame = null, startedAt = 0, pointerId = null, suppressClick = false;
    function render() {
      reflect(); const busy = phase === 'pending';
      hold.setAttribute('aria-disabled', String(busy)); opener.disabled = busy;
      $('[data-label]').textContent = busy ? 'Archiving…' : holding ? 'Keep holding…' : 'Hold to archive';
      opener.setAttribute('aria-expanded', String(open)); panel.dataset.open = String(open);
      panel.inert = !open; panel.setAttribute('aria-hidden', String(!open)); $('[data-cancel]').hidden = !busy;
      root.dataset.holding = String(holding);
    }
    function stopHold() {
      clearTimeout(timer); view.cancelAnimationFrame(frame); timer = frame = null; holding = false;
      if (pointerId !== null && hold.hasPointerCapture?.(pointerId)) hold.releasePointerCapture(pointerId);
      pointerId = null; $('[data-fill]').style.transform = 'scaleX(0)'; render();
    }
    function tick() {
      if (!holding || destroyed || motion.matches) return;
      $('[data-fill]').style.transform = 'scaleX(' + Math.min(1, (view.performance.now() - startedAt) / holdMs) + ')';
      frame = view.requestAnimationFrame(tick);
    }
    function show() {
      if (destroyed || phase === 'pending') return;
      stopHold(); open = true; render(); $('[data-confirm]').focus(); announce('Choose Yes, archive to confirm.');
    }
    function close() { if (destroyed) return; open = false; render(); opener.focus(); announce('Confirmation closed. Nothing was archived.'); }
    function start() {
      if (destroyed || phase === 'pending') return Promise.resolve(false);
      stopHold(); open = false; hold.focus();
      return run(options.onConfirm, {}, () => {}, 'Archiving draft…', 'Draft archived.');
    }
    listen(hold, 'pointerdown', e => {
      if (destroyed || phase === 'pending' || e.button !== 0 || !e.isPrimary) return;
      e.preventDefault(); hold.focus(); stopHold(); open = false; holding = true; suppressClick = false;
      pointerId = e.pointerId; hold.setPointerCapture?.(pointerId); startedAt = view.performance.now(); render(); tick();
      timer = setTimeout(() => { suppressClick = true; start(); }, holdMs);
    });
    listen(hold, 'pointerup', () => { if (holding) { suppressClick = true; stopHold(); announce('Released early. Nothing was archived.'); } });
    listen(hold, 'pointercancel', stopHold);
    listen(hold, 'lostpointercapture', () => { if (holding) stopHold(); });
    listen(hold, 'pointermove', e => { if (!holding) return; const box = hold.getBoundingClientRect(); if (e.clientX < box.left || e.clientX > box.right || e.clientY < box.top || e.clientY > box.bottom) stopHold(); });
    listen(hold, 'click', e => { if (suppressClick && e.detail !== 0) { suppressClick = false; return; } show(); });
    listen(hold, 'blur', () => { if (holding) stopHold(); });
    listen(root, 'keydown', e => { if (e.key === 'Escape' && (open || holding)) { e.preventDefault(); e.stopPropagation(); stopHold(); close(); } });
    listen(panel, 'focusout', e => { if (open && !panel.contains(e.relatedTarget)) { open = false; render(); announce('Confirmation closed. Nothing was archived.'); } });
    listen(motion, 'change', () => { view.cancelAnimationFrame(frame); if (motion.matches) $('[data-fill]').style.transform = 'scaleX(0)'; else tick(); });
    listen(opener, 'click', show); listen($('[data-confirm]'), 'click', start); listen($('[data-back]'), 'click', close);
    listen($('[data-cancel]'), 'click', () => { cancel(); hold.focus(); });
    function resetLocal() { const restore = panel.contains(active()) || active() === $('[data-cancel]'); stopHold(); open = false; suppressClick = false; if (restore) hold.focus(); }
    const methods = { confirm: start, open: show, close };
    const snapshot = () => ({ open, holding });
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
    const controller = mount(root, { onConfirm: context => demoTask(context) });
    root.querySelector('[data-note]').textContent = 'Local demo · no draft is archived.';
    return controller;
  }
  window.SLComponent = { mount, mountPreview };
})();
