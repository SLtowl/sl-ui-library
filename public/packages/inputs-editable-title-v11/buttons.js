(() => {
  'use strict';
  function mount(root, options = {}) {
    if (!root || !root.matches('.sl-component')) throw new TypeError('A .sl-component root is required.');
    const doc = root.ownerDocument, view = doc.defaultView;
    root.dispatchEvent(new view.Event('sl:inputs-remount'));
    const lifecycle = new view.AbortController();
    let destroyed = false, composing = false;
    const q = selector => root.querySelector(selector);
    const qa = selector => [...root.querySelectorAll(selector)];
    const on = (target, type, handler) => target.addEventListener(type, handler, { signal: lifecycle.signal });
    const active = () => root.getRootNode().activeElement;
    const writable = element => !destroyed && !options.disabled && !element?.disabled && !element?.readOnly;
    const initialDisabled = qa('input, select, button').map(element => [element, element.disabled]);
    const initialValidity = qa('input, select').map(element => [element, element.validity.customError ? element.validationMessage : '']);
    const ids = new Map();
    qa('[id]').forEach(element => { const original = element.dataset.slId || element.id; element.dataset.slId = original; const id = original + '-' + view.crypto.randomUUID(); ids.set(element.id, id); element.id = id; });
    qa('[for], [aria-describedby], [aria-controls], [aria-labelledby]').forEach(element => {
      ['for', 'aria-describedby', 'aria-controls', 'aria-labelledby'].forEach(name => {
        if (element.hasAttribute(name)) element.setAttribute(name, element.getAttribute(name).split(' ').map(id => ids.get(id) || id).join(' '));
      });
    });
    const status = q('.sl-status');
    function message(text, invalid = false) { status.textContent = text; root.dataset.invalid = String(invalid); }
    let lastEmission, lastFile;
    function checkpoint() { const state = read(); lastEmission = JSON.stringify(state); lastFile = state.file; }
    function emit() {
      const state = read();
      const signature = JSON.stringify(state);
      if (signature === lastEmission && state.file === lastFile) return;
      lastEmission = signature; lastFile = state.file;
      root.dispatchEvent(new view.CustomEvent('sl:change', { bubbles: true, composed: true, detail: state }));
      if (typeof options.onChange === 'function') options.onChange(state);
    }
    function finish(reset, cleanup = () => {}) {
      function destroy() {
        if (destroyed) return;
        destroyed = true; lifecycle.abort(); cleanup();
        initialValidity.forEach(([element, message]) => element.setCustomValidity(message));
        initialDisabled.forEach(([element, disabled]) => { element.disabled = disabled; });
      }
      on(root, 'sl:inputs-remount', destroy);
      on(root, 'compositionstart', () => { composing = true; });
      on(root, 'compositionend', () => { composing = false; });
      const form = root.closest('form');
      if (form) on(form, 'reset', event => view.queueMicrotask(() => { if (!destroyed && !event.defaultPrevented) { composing = false; reset(); checkpoint(); } }));
      reset(); checkpoint();
      if (options.disabled) qa('input, select, button').forEach(element => { element.disabled = true; });
      return { reset() { if (!destroyed) { composing = false; reset(); checkpoint(); if (options.disabled) qa('input, select, button').forEach(element => { element.disabled = true; }); } }, destroy, get state() { return read(); } };
    }
    const input = q('input'), editor = q('.sl-title-editor'), display = q('.sl-title-view'), title = q('.sl-title-text'), edit = q('.sl-edit');
    const initial = options.value ?? 'Autumn research notes';
    if (typeof initial !== 'string' || !initial.trim() || initial.length > 80) throw new TypeError('value must be a nonblank title of at most 80 characters.');
    let value = initial, editing = false;
    function read() { return { value, draft: input.value, editing }; }
    function close(focus = false) { editing = false; editor.hidden = true; display.hidden = false; input.value = value; title.textContent = value; input.removeAttribute('aria-invalid'); input.setCustomValidity(''); if (focus) edit.focus(); }
    function cancel() { close(true); message('Title unchanged.'); }
    function apply() { if (!writable(input) || composing) return; if (!input.value.trim() || input.value.length > 80) { input.setAttribute('aria-invalid', 'true'); input.setCustomValidity('Enter a nonblank title of at most 80 characters.'); message('Enter a title of 1–80 characters.', true); return; } value = input.value; close(true); message('Title applied locally.'); emit(); }
    on(edit, 'click', () => { if (!writable(input)) return; editing = true; display.hidden = true; editor.hidden = false; input.value = value; input.focus(); input.select(); message('Enter applies. Escape cancels.'); });
    on(q('.sl-apply'), 'click', apply); on(q('.sl-cancel'), 'click', cancel);
    on(input, 'keydown', event => { if (event.isComposing || event.keyCode === 229 || composing) return; if (event.key === 'Enter') { event.preventDefault(); apply(); } else if (event.key === 'Escape') { event.preventDefault(); cancel(); } });
    return finish(() => { value = initial; close(root.contains(active())); message('Edits apply to this local example.'); }, () => close());
  }
  function mountPreview(root) {
    return mount(root);
  }
  window.SLComponent = { mount, mountPreview };
})();
