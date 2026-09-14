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
    const list = q('.sl-pairs'), add = q('.sl-add-pair');
    const initial = options.value ?? [{ key: 'team', value: 'Design' }];
    if (!Array.isArray(initial) || initial.length > 3 || initial.some(pair => !pair || typeof pair.key !== 'string' || !pair.key.trim() || pair.key.length > 32 || typeof pair.value !== 'string' || pair.value.length > 80) || new Set(initial.map(pair => pair.key)).size !== initial.length) throw new TypeError('value needs up to three unique nonblank keys (32 characters) and text values (80 characters).');
    const defaults = initial.map(pair => ({ ...pair }));
    function rows() { return [...list.children]; }
    function values() { return rows().map(row => ({ key: row.querySelector('[data-key]').value, value: row.querySelector('[data-value]').value })); }
    function read() { const value = values(); return { value, valid: value.every(pair => Boolean(pair.key.trim()) && pair.key.length <= 32 && pair.value.length <= 80 && value.filter(other => other.key === pair.key).length === 1) }; }
    function row(pair) { const node = doc.createElement('div'); node.className = 'sl-pair'; ['key', 'value'].forEach(name => { const label = doc.createElement('label'), text = doc.createElement('span'), input = doc.createElement('input'); input.type = 'text'; input.value = pair[name]; input.dataset[name] = ''; input.maxLength = name === 'key' ? 32 : 80; input.disabled = Boolean(options.disabled); input.setAttribute('aria-describedby', status.id); label.append(text, input); node.append(label); }); const remove = doc.createElement('button'); remove.type = 'button'; remove.textContent = '×'; remove.dataset.remove = ''; remove.disabled = Boolean(options.disabled); node.append(remove); return node; }
    function render() { const state = read(); rows().forEach((node, index) => { const key = node.querySelector('[data-key]'); node.querySelectorAll('label span').forEach((text, i) => { text.textContent = (i ? 'Value ' : 'Key ') + (index + 1); }); node.querySelector('button').setAttribute('aria-label', 'Remove pair ' + (index + 1)); const invalidKey = !key.value.trim() || key.value.length > 32 || state.value.filter(pair => pair.key === key.value).length > 1; key.setAttribute('aria-invalid', String(invalidKey)); key.setCustomValidity(invalidKey ? 'Enter a unique, nonblank key of at most 32 characters.' : ''); const value = node.querySelector('[data-value]'); value.setAttribute('aria-invalid', String(value.value.length > 80)); value.setCustomValidity(value.value.length > 80 ? 'Use at most 80 characters.' : ''); }); add.disabled = Boolean(options.disabled) || rows().length >= 3; q('.sl-count').textContent = rows().length + ' / 3'; message(state.valid ? 'Keys must be unique. Values can be empty.' : 'Use unique nonblank keys (up to 32 characters) and values up to 80 characters.', !state.valid); }
    on(add, 'click', () => { if (!writable(add) || rows().length >= 3) return; const node = row({ key: '', value: '' }); list.append(node); render(); node.querySelector('input').focus(); emit(); });
    on(list, 'input', event => { if (!event.isComposing && !composing) { render(); emit(); } });
    on(list, 'compositionend', () => { render(); emit(); });
    on(list, 'click', event => { const button = event.target.closest('[data-remove]'); if (!button || !writable(button)) return; const node = button.parentElement, next = node.nextElementSibling || node.previousElementSibling; node.remove(); render(); (next?.querySelector('input') || add).focus(); emit(); });
    return finish(() => { list.replaceChildren(...defaults.map(row)); render(); });
  }
  function mountPreview(root) {
    return mount(root);
  }
  window.SLComponent = { mount, mountPreview };
})();
