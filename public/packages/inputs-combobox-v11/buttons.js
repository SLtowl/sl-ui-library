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
    const input = q('.sl-combo'), popup = q('.sl-popup'), list = q('.sl-options'), browse = q('.sl-browse'), clear = q('.sl-clear');
    const supplied = options.items ?? [{ id: 'ada', label: 'Ada Morgan' }, { id: 'leo', label: 'Leo Chen' }, { id: 'mina', label: 'Mina Patel', disabled: true }, { id: 'noah', label: 'Noah Williams' }];
    if (!Array.isArray(supplied) || supplied.some(item => !item || typeof item.id !== 'string' || !item.id || typeof item.label !== 'string' || !item.label) || new Set(supplied.map(item => item.id)).size !== supplied.length) throw new TypeError('items require unique nonempty string IDs and labels.');
    const items = supplied.map(item => ({ id: item.id, label: item.label, disabled: Boolean(item.disabled) }));
    const initial = options.value ?? null;
    if (initial !== null && !items.some(item => item.id === initial && !item.disabled)) throw new TypeError('value must identify an available item.');
    let selected = null, results = [], highlighted = -1, open = false;
    function read() { return { value: selected?.id ?? null, label: selected?.label ?? '', query: input.value, open }; }
    function close(restore = false) { open = false; root.dataset.open = 'false'; popup.inert = true; popup.setAttribute('aria-hidden', 'true'); input.setAttribute('aria-expanded', 'false'); browse.setAttribute('aria-expanded', 'false'); browse.textContent = 'Show people'; input.removeAttribute('aria-activedescendant'); if (restore) input.value = selected?.label ?? ''; }
    function highlight(index) { highlighted = index; [...list.children].forEach((node, i) => { node.dataset.active = String(i === index); }); if (index < 0) input.removeAttribute('aria-activedescendant'); else { input.setAttribute('aria-activedescendant', list.children[index].id); list.children[index].scrollIntoView({ block: 'nearest' }); } }
    function show(all = false) {
      if (!writable(input)) return;
      const query = all ? '' : input.value.toLocaleLowerCase();
      results = items.filter(item => item.label.toLocaleLowerCase().includes(query));
      list.replaceChildren(...results.map((item, index) => { const node = doc.createElement('li'); node.id = list.id + '-' + index; node.dataset.index = String(index); node.setAttribute('role', 'option'); node.setAttribute('aria-selected', String(item.id === selected?.id)); node.setAttribute('aria-disabled', String(item.disabled)); node.textContent = item.label + (item.disabled ? ' · unavailable' : ''); return node; }));
      q('.sl-empty').hidden = results.length > 0; highlight(-1); open = true; root.dataset.open = 'true'; popup.inert = false; popup.setAttribute('aria-hidden', 'false'); input.setAttribute('aria-expanded', 'true'); browse.setAttribute('aria-expanded', 'true'); browse.textContent = 'Hide people'; message(results.length + ' matches. Use arrows and Enter.');
    }
    function choose(index) { const item = results[index]; if (!writable(input) || !item || item.disabled) return; selected = item; input.value = item.label; input.focus(); close(); message(item.label + ' selected.'); emit(); }
    on(input, 'input', event => { if (!event.isComposing && event.keyCode !== 229 && !composing) show(); });
    on(input, 'compositionend', () => show());
    on(input, 'keydown', event => {
      if (event.isComposing || event.keyCode === 229 || composing || !writable(input)) return;
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') { event.preventDefault(); if (!open) show(true); const available = results.map((item, i) => item.disabled ? -1 : i).filter(i => i >= 0); if (!available.length) return; let next = available.indexOf(highlighted) + (event.key === 'ArrowDown' ? 1 : -1); if (highlighted < 0) next = event.key === 'ArrowDown' ? 0 : available.length - 1; highlight(available[(next + available.length) % available.length]); }
      else if (event.key === 'Enter' && open) { event.preventDefault(); choose(highlighted); }
      else if (event.key === 'Escape' && open) { event.preventDefault(); close(true); message('Selection unchanged.'); }
    });
    on(browse, 'click', () => { if (!writable(input)) return; input.focus(); if (open) close(true); else show(true); });
    on(clear, 'click', () => { if (!writable(input)) return; selected = null; input.value = ''; close(); input.focus(); message('No person selected.'); emit(); });
    on(list, 'pointerdown', event => event.preventDefault());
    on(list, 'click', event => { const node = event.target.closest('[data-index]'); if (node) choose(Number(node.dataset.index)); });
    on(root, 'focusout', event => { if (event.relatedTarget && root.contains(event.relatedTarget)) return; view.queueMicrotask(() => { if (!destroyed && !root.contains(active())) close(true); }); });
    on(doc, 'pointerdown', event => { if (!event.composedPath().includes(root)) close(true); });
    return finish(() => { selected = items.find(item => item.id === initial) ?? null; input.value = selected?.label ?? ''; list.replaceChildren(); q('.sl-empty').hidden = true; close(); message('Choose a person. Unavailable people are disabled.'); }, () => close(true));
  }
  function mountPreview(root) {
    return mount(root);
  }
  window.SLComponent = { mount, mountPreview };
})();
