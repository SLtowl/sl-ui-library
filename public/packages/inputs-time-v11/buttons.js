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
    const input = q('input'), output = q('output');
    function minutes(value) { if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(value)) return null; const [h, m] = value.split(':').map(Number); return m % 5 ? null : h * 60 + m; }
    const initial = options.value ?? '09:00';
    if (typeof initial !== 'string' || minutes(initial) === null) throw new TypeError('value must be HH:MM in five-minute steps.');
    function read() { const value = minutes(input.value); return { value: input.value, valid: value !== null, minutes: value }; }
    function render() { const state = read(); input.setAttribute('aria-invalid', String(!state.valid)); input.setCustomValidity(state.valid ? '' : 'Choose a time in five-minute steps.'); qa('[data-time]').forEach(button => { button.setAttribute('aria-pressed', String(button.dataset.time === input.value)); }); output.textContent = state.valid ? input.value + ' · local time' : 'Choose a five-minute time'; message(state.valid ? 'Five-minute steps. No date or time zone is attached.' : 'Use a time from 00:00 to 23:55 in five-minute steps.', !state.valid); }
    on(input, 'input', () => { render(); emit(); });
    qa('[data-time]').forEach(button => on(button, 'click', () => { if (!writable(input)) return; input.value = button.dataset.time; render(); emit(); }));
    const picker = createPicker(root, 'Choose time', on, options.disabled), trigger = q('.sl-open-time');
    picker.bind(trigger); let draft = initial;
    const columns = doc.createElement('div'); columns.className = 'sl-time-columns';
    const lists = ['Hours', 'Minutes'].map((name, index) => {
      const column = doc.createElement('div'), label = doc.createElement('span'), list = doc.createElement('div');
      label.textContent = name; list.className = 'sl-time-list'; list.setAttribute('role', 'listbox'); list.setAttribute('aria-label', name);
      for (let i = 0; i < (index ? 12 : 24); i++) {
        const button = doc.createElement('button'); button.type = 'button'; button.setAttribute('role', 'option');
        button.dataset.part = String(index); button.dataset.number = String(i * (index ? 5 : 1)).padStart(2, '0'); button.textContent = button.dataset.number; list.append(button);
      }
      column.append(label, list); columns.append(column); return list;
    });
    picker.body.append(columns);
    const summary = doc.createElement('span'), apply = doc.createElement('button'); summary.className = 'sl-time-draft'; summary.setAttribute('aria-live', 'polite');
    apply.type = 'button'; apply.className = 'sl-primary'; apply.textContent = 'Apply time'; picker.footer.append(summary, apply);
    function sync(focusPart) {
      const values = draft.split(':'); summary.textContent = draft;
      lists.forEach((list, index) => {
        [...list.children].forEach(button => { const selected = button.dataset.number === values[index]; button.setAttribute('aria-selected', String(selected)); button.tabIndex = selected ? 0 : -1; });
        const selected = list.querySelector('[aria-selected="true"]');
        if (focusPart === index) selected.focus({ preventScroll: true });
        list.scrollTop = selected.offsetTop - list.clientHeight / 2 + selected.clientHeight / 2;
      });
    }
    function openTime() { if (!writable(input)) return; draft = minutes(input.value) === null ? initial : input.value; sync(); picker.open(trigger, lists[0].querySelector('[aria-selected="true"]')); sync(); }
    on(trigger, 'click', openTime);
    on(input, 'keydown', event => { if (event.altKey && event.key === 'ArrowDown') { event.preventDefault(); openTime(); } });
    lists.forEach((list, index) => {
      function select(button) { if (!writable(input) || !button || button.disabled) return; const parts = draft.split(':'); parts[index] = button.dataset.number; draft = parts.join(':'); sync(index); }
      on(list, 'click', event => select(event.target.closest('[data-number]')));
      on(list, 'keydown', event => {
        const current = [...list.children].indexOf(event.target); if (current < 0) return;
        const next = event.key === 'Home' ? 0 : event.key === 'End' ? list.children.length - 1 : event.key === 'ArrowUp' ? Math.max(0, current - 1) : event.key === 'ArrowDown' ? Math.min(list.children.length - 1, current + 1) : null;
        if (next !== null) { event.preventDefault(); select(list.children[next]); }
      });
    });
    on(apply, 'click', () => { if (!writable(input)) return; input.value = draft; render(); emit(); picker.close(); });
    return finish(() => { picker.close(); input.value = initial; draft = initial; render(); sync(); }, () => picker.destroy());
  }
  function mountPreview(root) {
    return mount(root);
  }
  window.SLComponent = { mount, mountPreview };
})();
