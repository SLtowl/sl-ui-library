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

    const local = String(options.localText ?? q('[data-local]').textContent), remote = String(options.remoteText ?? q('[data-remote]').textContent);
    let choice = 'local', resolved = false;
    q('[data-local]').textContent = local; q('[data-remote]').textContent = remote;
    render = () => {
      for (const key of ['local','remote']) {
        q('[data-action="'+key+'"]').setAttribute('aria-pressed',String(key === choice));
        q('[data-action="'+key+'"]').disabled = Boolean(pending) || resolved;
        q('[data-version="'+key+'"]').dataset.selected = String(key === choice);
      }
      q('[data-action="resolve"]').setAttribute('aria-disabled',String(Boolean(pending) || resolved));
    };
    function choose(value) { if (destroyed || pending || resolved || !['local','remote'].includes(value)) return false; choice = value; state = 'idle'; say((value === 'local' ? 'Your draft' : 'The shared version')+' is selected.'); sync(); return true; }
    async function resolve() {
      if (resolved) return false;
      const result = await run('resolve',{ choice, text: choice === 'local' ? local : remote });
      if (!result.ok) return false;
      resolved = true; state = 'resolved'; say('The selected version has been saved.'); sync(); return true;
    }
    for (const value of ['local','remote']) on(q('[data-action="'+value+'"]'),'click',()=>choose(value));
    on(q('[data-action="resolve"]'),'click',resolve);
    resetView = () => { choice = 'local'; resolved = false; say('Compare both versions before resolving.'); };
    reset();
    return { choose, resolve, cancel, reset, destroy, get state() { return { status: state, choice, resolved, localText: local, remoteText: remote }; } };

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
