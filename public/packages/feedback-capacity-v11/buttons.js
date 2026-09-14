/* Offline component controller. Remote outcomes require the supplied callback. */
(() => {
  'use strict';
  // Styled listbox with a hidden native value carrier for form/controller compatibility.
  function bindChoice(root, select, on) {
    const wrap = select.closest('.sl-choice'), trigger = wrap.querySelector('.sl-choice-trigger'), label = wrap.querySelector('.sl-choice-value');
    const list = wrap.querySelector('.sl-choice-list'), buttons = [...wrap.querySelectorAll('[data-choice]')];
    let opened = false;
    function sync() {
      const selected = buttons.find(button => button.dataset.choice === select.value);
      if (selected) label.textContent = selected.textContent;
      trigger.disabled = select.disabled;
      buttons.forEach(button => { const active = button === selected; button.setAttribute('aria-selected', String(active)); button.tabIndex = active ? 0 : -1; });
      if (select.disabled) close(false);
    }
    function close(focus = true) {
      if (!opened) return; opened = false; trigger.setAttribute('aria-expanded', 'false');
      if (focus) trigger.focus({ preventScroll: true });
      wrap.dataset.expanded = 'false'; list.inert = true; list.setAttribute('aria-hidden', 'true');
    }
    function open() {
      if (select.disabled || opened) return; sync(); opened = true;
      wrap.dataset.expanded = 'true'; list.inert = false; list.setAttribute('aria-hidden', 'false'); trigger.setAttribute('aria-expanded', 'true');
      const boundary = select.closest('.ov-body') || root, bounds = boundary.getBoundingClientRect(), anchor = trigger.getBoundingClientRect();
      const below = bounds.bottom - anchor.bottom - 8, above = anchor.top - bounds.top - 8;
      wrap.dataset.up = String(below < Math.min(164, list.scrollHeight) && above > below);
      list.style.maxHeight = Math.max(48, Math.min(164, wrap.dataset.up === 'true' ? above : below)) + 'px';
      const selected = buttons.find(button => button.dataset.choice === select.value) || buttons.find(button => !button.disabled);
      selected?.focus({ preventScroll: true }); if (selected) list.scrollTop = Math.max(0, selected.offsetTop - list.clientHeight / 2);
    }
    on(trigger, 'click', () => opened ? close() : open());
    on(trigger, 'keydown', event => { if (['ArrowDown', 'ArrowUp'].includes(event.key)) { event.preventDefault(); event.stopPropagation(); open(); } });
    buttons.forEach(button => on(button, 'click', event => {
      event.preventDefault(); if (select.disabled || button.disabled) return;
      const changed = select.value !== button.dataset.choice; select.value = button.dataset.choice; sync(); close();
      if (changed) select.dispatchEvent(new select.ownerDocument.defaultView.Event('change', { bubbles: true, composed: true }));
    }));
    on(wrap, 'keydown', event => {
      if (!opened) return;
      if (event.key === 'Escape') { event.preventDefault(); event.stopPropagation(); close(); return; }
      if (event.key === 'Tab') { close(false); return; }
      if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault(); event.stopPropagation();
      const enabled = buttons.filter(button => !button.disabled), current = enabled.indexOf(root.getRootNode().activeElement);
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? enabled.length - 1 : (current + (event.key === 'ArrowDown' ? 1 : enabled.length - 1)) % enabled.length;
      enabled.forEach((button, i) => { button.tabIndex = i === next ? 0 : -1; }); enabled[next]?.focus({ preventScroll: true }); if (enabled[next]) list.scrollTop = Math.max(0, enabled[next].offsetTop - list.clientHeight / 2);
    });
    on(select, 'change', sync);
    on(root.ownerDocument, 'pointerdown', event => { if (opened && !event.composedPath().includes(wrap)) close(false); });
    on(wrap, 'focusout', event => { if (opened && event.relatedTarget && !wrap.contains(event.relatedTarget)) close(false); });
    sync(); list.inert = true; list.setAttribute('aria-hidden', 'true');
    return { sync, close, destroy() { close(false); } };
  }
  function mount(root, options = {}) {

    if (!root?.matches('.sl-component')) throw new TypeError('A .sl-component root is required.');
    if (options.onAction !== undefined && typeof options.onAction !== 'function') throw new TypeError('onAction must be a function.');
    const view = root.ownerDocument.defaultView;
    root.dispatchEvent(new view.CustomEvent('sl-feedback-remount'));
    const lifecycle = new view.AbortController();
    const q = selector => root.querySelector(selector);
    const all = selector => [...root.querySelectorAll(selector)];
    const on = (node, event, handler) => node.addEventListener(event, handler, { signal: lifecycle.signal });
    const choiceUI = bindChoice(root, q('[data-size]'), on);
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
      stop(); cleanup(); choiceUI.close(false); state = 'idle';
      for (const checkbox of all('[data-demo-fail]')) checkbox.checked = false;
      resetView(); sync(); return true;
    }
    function destroy() {
      if (destroyed) return;
      stop(); cleanup(); choiceUI.destroy(); destroyed = true; lifecycle.abort();
      for (const button of all('[data-cancel]')) button.disabled = true;
      for (const button of all('[data-lock]')) { button.setAttribute('aria-busy','false'); button.setAttribute('aria-disabled','false'); }
      root.dataset.state = 'destroyed';
    }
    on(root, 'sl-feedback-remount', destroy);
    on(root, 'keydown', event => { if (event.key === 'Escape' && pending) { event.preventDefault(); cancel(); } });
    for (const button of all('[data-cancel]')) on(button, 'click', cancel);
    for (const control of all('[data-demo-only]')) control.hidden = true;
    q('[data-caption]').textContent = 'Sample workspace feedback.';

    let base = 86, staged = 0, cacheCleared = false;
    render = () => {
      choiceUI.sync();
      const used = base + staged;
      q('[data-used]').textContent = String(used); q('[data-remaining]').textContent = (100-used)+' MB available';
      q('[data-staged]').textContent = staged ? staged+' MB staged' : 'No staged files';
      q('[role="meter"]').setAttribute('aria-valuenow',String(used)); q('[role="meter"]').setAttribute('aria-valuetext',used+' of 100 MB used');
      q('.fb-fill').style.transform = 'scaleX('+(used/100)+')';
      q('[data-action="release"]').disabled = cacheCleared; q('[data-action="remove"]').disabled = staged === 0;
    };
    function stage() {
      if (destroyed) return false;
      const size = Number(q('[data-size]').value);
      if (![4,8,18].includes(size)) return false;
      if (base + staged + size > 100) { state = 'error'; say('This file needs '+(base+staged+size-100)+' MB more space. Clear the sample cache or choose a smaller file.'); sync(); return false; }
      staged += size; state = 'ready'; say('Staged '+size+' MB locally. No file has been uploaded.'); sync(); return true;
    }
    function release() { if (destroyed || cacheCleared) return false; base -= 20; cacheCleared = true; state = 'ready'; say('20 MB freed in the local capacity model.'); sync(); return true; }
    function remove() { if (destroyed || !staged) return false; staged = 0; state = 'idle'; say('All staged files removed from this preview.'); sync(); return true; }
    on(q('[data-action="stage"]'),'click',stage); on(q('[data-action="release"]'),'click',release); on(q('[data-action="remove"]'),'click',remove);
    resetView = () => { base = 86; staged = 0; cacheCleared = false; q('[data-size]').value = '18'; say('Local capacity model. Storage is not changed.'); };
    reset();
    return { stage, release, remove, reset, destroy, get state() { return { status: state, used: base+staged, staged, available: 100-base-staged }; } };

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
