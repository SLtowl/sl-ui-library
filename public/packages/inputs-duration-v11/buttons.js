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
    const hours = q('.sl-hours'), minutes = q('.sl-minutes'), output = q('output');
    const initial = options.value ?? 90;
    if (!Number.isInteger(initial) || initial < 0 || initial > 1439) throw new TypeError('value must be integer minutes from 0 to 1439.');
    function part(input, max) { return /^\d+$/.test(input.value) && Number(input.value) <= max ? Number(input.value) : null; }
    function read() { const h = part(hours, 23), m = part(minutes, 59); return { value: h !== null && m !== null ? h * 60 + m : null, valid: h !== null && m !== null, hours: hours.value, minutes: minutes.value }; }
    function render() { const state = read(); hours.setAttribute('aria-invalid', String(part(hours, 23) === null)); minutes.setAttribute('aria-invalid', String(part(minutes, 59) === null)); hours.setCustomValidity(part(hours, 23) === null ? 'Enter whole hours from 0 to 23.' : ''); minutes.setCustomValidity(part(minutes, 59) === null ? 'Enter whole minutes from 0 to 59.' : ''); output.textContent = state.valid ? state.value + (state.value === 1 ? ' minute total' : ' minutes total') : 'Enter a valid duration'; qa('[data-step]').forEach(button => { button.disabled = Boolean(options.disabled) || !state.valid || (Number(button.dataset.step) < 0 ? state.value === 0 : state.value === 1439); }); message(state.valid ? 'Up to 23 hours and 59 minutes.' : 'Hours: 0–23. Minutes: 0–59. Use whole numbers.', !state.valid); }
    function set(value) { hours.value = String(Math.floor(value / 60)); minutes.value = String(value % 60); render(); }
    [hours, minutes].forEach(input => on(input, 'input', () => { render(); emit(); }));
    qa('[data-step]').forEach(button => on(button, 'click', () => { const state = read(); if (!writable(hours) || !writable(minutes) || !state.valid) return; set(Math.min(1439, Math.max(0, state.value + Number(button.dataset.step)))); emit(); }));
    return finish(() => set(initial));
  }
  function mountPreview(root) {
    return mount(root);
  }
  window.SLComponent = { mount, mountPreview };
})();
