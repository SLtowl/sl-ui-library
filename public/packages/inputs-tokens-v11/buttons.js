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
    const input = q('input'), list = q('.sl-tags'), add = q('.sl-add');
    const initial = options.value === undefined ? ['Design', 'Prototype'] : options.value;
    if (!Array.isArray(initial) || initial.length > 6 || initial.some(value => typeof value !== 'string' || !value.trim() || value.trim().length > 40) || new Set(initial.map(value => value.trim())).size !== initial.length) throw new TypeError('value must contain up to six unique nonempty strings of at most 40 characters.');
    const defaults = initial.map(value => value.trim());
    let tags = [];
    function read() { return { value: [...tags], draft: input.value }; }
    function render() {
      list.replaceChildren(...tags.map((tag, index) => {
        const li = doc.createElement('li'), text = doc.createElement('span'), remove = doc.createElement('button');
        text.textContent = tag; remove.type = 'button'; remove.textContent = '×'; remove.dataset.index = String(index);
        remove.setAttribute('aria-label', 'Remove ' + tag); remove.disabled = Boolean(options.disabled);
        li.append(text, remove); return li;
      }));
      q('.sl-count').textContent = tags.length + ' / 6'; add.disabled = Boolean(options.disabled) || tags.length === 6;
    }
    function commit() {
      if (!writable(input) || composing) return;
      const value = input.value.trim();
      if (!value || value.length > 40 || tags.includes(value) || tags.length >= 6) { input.setAttribute('aria-invalid', 'true'); input.setCustomValidity('Enter a new tag of 1–40 characters, with at most six tags.'); message(tags.includes(value) ? 'This tag is already in the list.' : tags.length >= 6 ? 'Remove a tag before adding another.' : 'Enter a tag of 1 to 40 characters.', true); return; }
      tags.push(value); input.value = ''; input.removeAttribute('aria-invalid'); input.setCustomValidity(''); render(); message(value + ' added.'); input.focus(); emit();
    }
    on(add, 'click', commit);
    on(input, 'keydown', event => { if (event.key === 'Enter' && !event.isComposing && event.keyCode !== 229 && !composing) { event.preventDefault(); commit(); } });
    on(input, 'input', () => { input.removeAttribute('aria-invalid'); input.setCustomValidity(''); });
    on(list, 'click', event => { const button = event.target.closest('button[data-index]'); if (!button || !writable(input)) return; const [removed] = tags.splice(Number(button.dataset.index), 1); render(); input.focus(); message(removed + ' removed.'); emit(); });
    return finish(() => { tags = [...defaults]; input.value = ''; input.removeAttribute('aria-invalid'); input.setCustomValidity(''); render(); message('Enter adds one tag. Each tag can be removed.'); });
  }
  function mountPreview(root) {
    return mount(root);
  }
  window.SLComponent = { mount, mountPreview };
})();
