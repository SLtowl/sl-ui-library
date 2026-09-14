/* Offline component controller. Remote outcomes require the supplied callback. */
(() => {
  'use strict';
  function mount(root, options = {}) {

    if (!root?.matches('.sl-component')) throw new TypeError('A .sl-component root is required.');
    if (options.onAction !== undefined && typeof options.onAction !== 'function') throw new TypeError('onAction must be a function.');
    const view = root.ownerDocument.defaultView;
    root.dispatchEvent(new view.CustomEvent('sl-feedback-remount'));
    const lifecycle = new view.AbortController();
    const q = selector => root.querySelector(selector);
    const all = selector => [...root.querySelectorAll(selector)];
    const on = (node, event, handler) => node.addEventListener(event, handler, { signal: lifecycle.signal });
    let destroyed = false, pending = null, revision = 0, state = 'idle', message = '';
    let render = () => {}, resetView = () => {}, cleanup = () => {};
    const focus = node => node?.focus({ preventScroll: true });
    const active = () => root.getRootNode().activeElement;
    const say = text => { message = String(text); q('[data-status]').textContent = message; };
    function sync() {
      root.dataset.state = state;
      for (const button of all('[data-lock]')) {
        button.setAttribute('aria-disabled', String(Boolean(pending)));
        button.setAttribute('aria-busy', String(Boolean(pending)));
      }
      for (const button of all('[data-cancel]')) button.disabled = !pending;
      render();
    }
    function stop() { revision++; pending?.abort(); pending = null; }
    function cancel() {
      if (destroyed || !pending) return false;
      stop(); state = 'canceled'; say('Canceled. You can try again.'); sync(); return true;
    }
    async function run(action, payload = {}) {
      if (destroyed || pending) return { ok: false };
      if (!options.onAction) { state = 'error'; say('Connect onAction to use this operation.'); sync(); return { ok: false }; }
      const request = new view.AbortController(), token = ++revision;
      pending = request; state = 'pending'; say('Waiting for the operation…'); sync();
      try {
        const value = await options.onAction(action, { ...payload, signal: request.signal });
        if (destroyed || request.signal.aborted || token !== revision) return { ok: false };
        pending = null; state = 'ready'; return { ok: true, value };
      } catch (error) {
        if (destroyed || token !== revision) return { ok: false };
        pending = null; state = error?.name === 'AbortError' ? 'canceled' : 'error';
        say(state === 'canceled' ? 'Canceled. You can try again.' : error?.message || 'The operation failed. Try again.');
        sync(); return { ok: false };
      }
    }
    function reset() {
      if (destroyed) return false;
      stop(); cleanup(); state = 'idle';
      for (const checkbox of all('[data-demo-fail]')) checkbox.checked = false;
      resetView(); sync(); return true;
    }
    function destroy() {
      if (destroyed) return;
      stop(); cleanup(); destroyed = true; lifecycle.abort();
      for (const button of all('[data-cancel]')) button.disabled = true;
      for (const button of all('[data-lock]')) { button.setAttribute('aria-busy','false'); button.setAttribute('aria-disabled','false'); }
      root.dataset.state = 'destroyed';
    }
    on(root, 'sl-feedback-remount', destroy);
    on(root, 'keydown', event => { if (event.key === 'Escape' && pending) { event.preventDefault(); cancel(); } });
    for (const button of all('[data-cancel]')) on(button, 'click', cancel);
    for (const control of all('[data-demo-only]')) control.hidden = true;
    q('[data-caption]').textContent = 'Sample workspace feedback.';

    let checks = { details:'unchecked', access:'unchecked', storage:'unchecked' }, current = null, checking = false, generation = 0;
    render = () => {
      for (const [id,value] of Object.entries(checks)) {
        const label = q('[data-check="'+id+'"]'); label.textContent = pending && current === id ? 'Checking' : { unchecked:'Not checked', passed:'Passed', blocked:'Blocked' }[value];
        label.dataset.tone = value === 'blocked' ? 'error' : '';
      }
      q('[data-action="check"]').textContent = Object.values(checks).every(value=>value==='unchecked') ? 'Run checks' : 'Check again';
    };
    async function check() {
      if (destroyed || checking || pending) return false;
      checking = true; const token = ++generation;
      checks = { details:'unchecked', access:'unchecked', storage:'unchecked' };
      for (const id of Object.keys(checks)) {
        current = id;
        const result = await run('check',{ id });
        if (token !== generation) return false;
        if (!result.ok) { current = null; checking = false; sync(); return false; }
        if (typeof result.value?.ok !== 'boolean') { state = 'error'; say('Each check must return { ok: boolean }.'); current = null; checking = false; sync(); return false; }
        checks[id] = result.value.ok ? 'passed' : 'blocked'; sync();
      }
      current = null; checking = false;
      const blocked = Object.values(checks).filter(value=>value==='blocked').length;
      state = blocked ? 'blocked' : 'ready'; say(blocked ? blocked+' requirement needs attention. Fix it and check again.' : 'All requirements passed. Nothing has been shared.'); sync(); return !blocked;
    }
    on(q('[data-action="check"]'),'click',check);
    cleanup = () => { generation++; checking = false; current = null; };
    resetView = () => { checks = { details:'unchecked', access:'unchecked', storage:'unchecked' }; say('Checks report readiness; they do not publish or share.'); };
    reset();
    return { check, cancel, reset, destroy, get state() { return { status: state, checks: { ...checks } }; } };

  }

  function mountPreview(root) {
    // This adapter alone simulates remote outcomes, always on explicit activation.
    const view = root.ownerDocument.defaultView;
    const controller = mount(root, {
      onAction: (action, { signal, id }) => new Promise((resolve, reject) => {
        const finish = () => {
          signal.removeEventListener('abort', abort);
          if (root.querySelector('[data-demo-fail]')?.checked) { reject(new Error('Simulated failure. Clear the failure option and try again.')); return; }
          if (root.dataset.kind === 'feedback-access') resolve({ status: root.querySelector('[data-demo-deny]')?.checked ? 'denied' : action === 'check' ? 'granted' : 'pending' });
          else if (root.dataset.kind === 'feedback-session') resolve({ expiresAt: Date.now()+120000 });
          else if (root.dataset.kind === 'feedback-readiness') resolve({ ok: !(id === 'access' && root.querySelector('[data-demo-block]')?.checked) });
          else resolve();
        };
        const timer = view.setTimeout(finish, 650);
        function abort() { view.clearTimeout(timer); signal.removeEventListener('abort', abort); reject(new view.DOMException('Canceled','AbortError')); }
        signal.addEventListener('abort', abort, { once:true });
        if (signal.aborted) abort();
      })
    });
    root.querySelector('[data-caption]').textContent = 'Local demo · no server requests.';
    for (const control of root.querySelectorAll('[data-demo-only]')) control.hidden = false;
    const demoScope = new view.AbortController(), originalDestroy = controller.destroy, originalReset = controller.reset;
    let step = 0;
    root.querySelector('[data-demo-update]')?.addEventListener('click', () => {
      const changes = [
        { phase:'identified', title:'Cause identified', detail:'A document worker is being restarted.', time:'09:28' },
        { phase:'resolved', title:'Exports recovered', detail:'The sample incident is resolved.', time:'09:36' },
        { phase:'investigating', title:'New export delay', detail:'A new sample incident is being investigated.', time:'09:45' }
      ];
      controller.update(changes[step++ % changes.length]);
    }, { signal:demoScope.signal });
    root.addEventListener('sl-feedback-remount',()=>demoScope.abort(),{signal:demoScope.signal,once:true});
    controller.reset = () => {
      const changed = originalReset(); if (!changed) return false;
      step = 0; for (const input of root.querySelectorAll('[data-demo-only] input')) input.checked = false;
      return true;
    };
    controller.destroy = () => { demoScope.abort(); originalDestroy(); };
    return controller;
  }
  window.SLComponent = { mount, mountPreview };
})();
