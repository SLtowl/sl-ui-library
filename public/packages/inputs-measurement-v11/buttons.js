(() => {
  'use strict';
  // Each export owns this small picker shell: no portals or document-wide dialog.
  function createPicker(root, title, on, disabled) {
    const doc = root.ownerDocument;
    const panel = doc.createElement('div'), header = doc.createElement('div'), heading = doc.createElement('strong'), dismiss = doc.createElement('button');
    panel.className = 'sl-picker-panel'; panel.id = 'picker-' + doc.defaultView.crypto.randomUUID();
    panel.setAttribute('role', 'dialog'); panel.setAttribute('aria-label', title); panel.setAttribute('aria-hidden', 'true'); panel.inert = true;
    header.className = 'sl-picker-header'; heading.textContent = title;
    dismiss.type = 'button'; dismiss.textContent = '×'; dismiss.setAttribute('aria-label', 'Close picker');
    header.append(heading, dismiss);
    const body = doc.createElement('div'), footer = doc.createElement('div');
    body.className = 'sl-picker-body'; footer.className = 'sl-picker-footer'; panel.append(header, body, footer); root.append(panel);
    let opened = false, trigger = null, siblings = [];
    const triggers = new Set();
    function close(focus = true) {
      if (!opened) return;
      opened = false; panel.dataset.open = 'false'; panel.inert = true; panel.setAttribute('aria-hidden', 'true');
      siblings.forEach(([node, inert]) => { node.inert = inert; }); siblings = [];
      trigger?.setAttribute('aria-expanded', 'false');
      if (focus && trigger?.isConnected && !trigger.disabled) trigger.focus();
    }
    function bind(button) { triggers.add(button); button.setAttribute('aria-haspopup', 'dialog'); button.setAttribute('aria-expanded', 'false'); button.setAttribute('aria-controls', panel.id); }
    function open(button, focusNode) {
      if (disabled || button.disabled) return;
      close(false); trigger = button; bind(button); opened = true;
      panel.dataset.open = 'true'; panel.inert = false; panel.setAttribute('aria-hidden', 'false'); button.setAttribute('aria-expanded', 'true');
      (focusNode || dismiss).focus({ preventScroll: true });
      siblings = [...root.children].filter(node => node !== panel).map(node => [node, node.inert]);
      siblings.forEach(([node]) => { node.inert = true; });
    }
    on(dismiss, 'click', () => close());
    on(panel, 'keydown', event => {
      if (event.key === 'Escape') { event.preventDefault(); event.stopPropagation(); close(); }
      if (event.key !== 'Tab') return;
      const all = [...panel.querySelectorAll('button, input, [tabindex]')].filter(node => !node.disabled && node.tabIndex >= 0 && node.checkVisibility());
      const first = all[0], last = all[all.length - 1], active = root.getRootNode().activeElement;
      if (event.shiftKey && active === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && active === last) { event.preventDefault(); first?.focus(); }
    });
    on(doc, 'pointerdown', event => { if (opened && !event.composedPath().includes(root)) close(false); });
    return { body, footer, panel, heading, bind, open, close, get isOpen() { return opened; },
      destroy() { close(); triggers.forEach(button => { button.removeAttribute('aria-controls'); button.setAttribute('aria-expanded', 'false'); }); panel.remove(); } };
  }
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
    const input = q('.sl-measure'), unit = q('.sl-unit'), output = q('output'), trigger = q('.sl-unit-trigger');
    const picker = createPicker(root, 'Display unit', on, options.disabled); picker.bind(trigger);
    const choices = [{ value: 'cm', label: 'Centimetres (cm)' }, { value: 'in', label: 'Inches (in)' }];
    const list = doc.createElement('div'); list.className = 'sl-unit-list'; list.setAttribute('role', 'listbox'); list.setAttribute('aria-label', 'Display unit');
    choices.forEach(choice => { const button = doc.createElement('button'); button.type = 'button'; button.dataset.unit = choice.value; button.setAttribute('role', 'option'); button.textContent = choice.label; list.append(button); }); picker.body.append(list);
    const initial = options.value ?? 210, initialUnit = options.unit ?? 'cm';
    if (!Number.isFinite(initial) || initial < 0 || initial > 10000 || !['cm', 'in'].includes(initialUnit)) throw new TypeError('value must be millimetres from 0 to 10000; unit is cm or in.');
    let millimetres = initial;
    const factor = () => unit.value === 'cm' ? 10 : 25.4;
    const format = value => String(Number(value.toFixed(8)));
    function read() { return { value: millimetres, unit: unit.value, draft: input.value, valid: millimetres !== null }; }
    function render() { const valid = millimetres !== null; input.setAttribute('aria-invalid', String(!valid)); input.setCustomValidity(valid ? '' : 'Enter a length from 0 to 10,000 mm.'); input.max = String(10000 / factor()); unit.disabled = trigger.disabled = Boolean(options.disabled) || !valid; trigger.querySelector('span').textContent = choices.find(choice => choice.value === unit.value).label; [...list.children].forEach(button => { button.setAttribute('aria-selected', String(button.dataset.unit === unit.value)); button.tabIndex = button.dataset.unit === unit.value ? 0 : -1; }); output.textContent = valid ? format(millimetres) + ' mm' : 'Enter a valid length'; message(valid ? 'Range: 0–10,000 mm. Unit changes keep the same length.' : 'Enter a number within the range before switching units.', !valid); }
    on(input, 'input', () => { const value = input.value.trim() === '' ? NaN : Number(input.value) * factor(); millimetres = Number.isFinite(value) && value >= 0 && value <= 10000 ? value : null; render(); emit(); });
    on(unit, 'change', () => { if (!writable(input) || millimetres === null) return; input.value = format(millimetres / factor()); render(); emit(); });
    function openUnits() { if (!writable(trigger)) return; picker.open(trigger, list.querySelector('[aria-selected="true"]')); }
    on(trigger, 'click', openUnits);
    on(trigger, 'keydown', event => { if (event.key === 'ArrowDown' || event.key === 'ArrowUp') { event.preventDefault(); openUnits(); } });
    on(list, 'click', event => { const button = event.target.closest('[data-unit]'); if (!button || !writable(input) || millimetres === null) return; unit.value = button.dataset.unit; input.value = format(millimetres / factor()); render(); emit(); picker.close(); });
    on(list, 'keydown', event => {
      const buttons = [...list.children], current = buttons.indexOf(event.target);
      if (current < 0 || !['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault(); const index = event.key === 'Home' ? 0 : event.key === 'End' ? buttons.length - 1 : (current + (event.key === 'ArrowDown' ? 1 : buttons.length - 1)) % buttons.length;
      buttons.forEach((button, i) => { button.tabIndex = index === i ? 0 : -1; }); buttons[index].focus();
    });
    return finish(() => { picker.close(); millimetres = initial; unit.value = initialUnit; input.value = format(initial / factor()); render(); }, () => picker.destroy());
  }
  function mountPreview(root) {
    return mount(root);
  }
  window.SLComponent = { mount, mountPreview };
})();
