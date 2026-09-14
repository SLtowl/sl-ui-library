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
    const start = q('.sl-start'), end = q('.sl-end'), output = q('output');
    const initial = options.value ?? { start: '2026-09-14', end: '2026-09-18' };
    function day(value) { if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return NaN; const timestamp = Date.parse(value + 'T00:00:00Z'); return Number.isFinite(timestamp) && new Date(timestamp).toISOString().slice(0, 10) === value ? timestamp / 86400000 : NaN; }
    function validDate(value) { return typeof value === 'string' && Number.isFinite(day(value)) && value >= '2000-01-01' && value <= '2100-12-31'; }
    if (!initial || !validDate(initial.start) || !validDate(initial.end) || initial.end < initial.start) throw new TypeError('value needs ordered ISO dates between 2000 and 2100.');
    const defaults = { ...initial };
    function read() { const valid = validDate(start.value) && validDate(end.value) && end.value >= start.value; return { value: { start: start.value, end: end.value }, valid, days: valid ? day(end.value) - day(start.value) + 1 : null }; }
    function render() { const state = read(); start.setAttribute('aria-invalid', String(!validDate(start.value))); end.setAttribute('aria-invalid', String(!state.valid)); start.setCustomValidity(validDate(start.value) ? '' : 'Choose a date from 2000 to 2100.'); end.setCustomValidity(state.valid ? '' : 'Choose an end date on or after the start, within 2000–2100.'); output.textContent = state.valid ? state.days + (state.days === 1 ? ' day' : ' days') + ' · inclusive' : 'Choose a valid date range'; message(state.valid ? 'Both the first and last day are included.' : 'Use dates from 2000 to 2100. End must be on or after start.', !state.valid); }
    [start, end].forEach(input => on(input, 'input', () => { render(); emit(); }));
    const picker = createPicker(root, 'Calendar', on, options.disabled);
    const locale = root.lang || doc.documentElement.lang || 'en';
    const monthFormat = new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric', timeZone: 'UTC' });
    const dateFormat = new Intl.DateTimeFormat(locale, { dateStyle: 'full', timeZone: 'UTC' });
    const weekdayFormat = new Intl.DateTimeFormat(locale, { weekday: 'short', timeZone: 'UTC' });
    const navigation = doc.createElement('div'), previous = doc.createElement('button'), next = doc.createElement('button'), caption = doc.createElement('strong');
    navigation.className = 'sl-month-nav'; caption.className = 'sl-month-name'; caption.setAttribute('aria-live', 'polite');
    previous.type = next.type = 'button'; previous.textContent = '‹'; next.textContent = '›';
    previous.setAttribute('aria-label', 'Previous month'); next.setAttribute('aria-label', 'Next month');
    navigation.append(previous, caption, next);
    const weekdays = doc.createElement('div'), grid = doc.createElement('div');
    weekdays.className = 'sl-weekdays'; weekdays.setAttribute('aria-hidden', 'true');
    for (let i = 0; i < 7; i++) { const label = doc.createElement('span'); label.textContent = weekdayFormat.format(new Date(Date.UTC(2024, 0, 1 + i))); weekdays.append(label); }
    grid.className = 'sl-calendar-grid'; grid.setAttribute('role', 'grid'); grid.setAttribute('aria-label', 'Choose date');
    picker.body.append(navigation, weekdays, grid);
    const todayButton = doc.createElement('button'), clearButton = doc.createElement('button');
    todayButton.type = clearButton.type = 'button'; todayButton.textContent = 'Today'; clearButton.textContent = 'Clear date'; picker.footer.append(clearButton, todayButton);
    let target = start, cursor = defaults.start, month = cursor.slice(0, 7);
    const iso = date => date.toISOString().slice(0, 10);
    const allowed = value => validDate(value) && (target !== end || !validDate(start.value) || value >= start.value);
    function today() { const date = new Date(); return [date.getFullYear(), String(date.getMonth() + 1).padStart(2, '0'), String(date.getDate()).padStart(2, '0')].join('-'); }
    function calendar(focus = false) {
      const first = new Date(month + '-01T00:00:00Z'), offset = (first.getUTCDay() + 6) % 7;
      caption.textContent = monthFormat.format(first);
      previous.disabled = Boolean(options.disabled) || month <= '2000-01'; next.disabled = Boolean(options.disabled) || month >= '2100-12';
      todayButton.disabled = Boolean(options.disabled) || !allowed(today()); grid.replaceChildren();
      let focused;
      for (let rowIndex = 0; rowIndex < 6; rowIndex++) {
        const row = doc.createElement('div'); row.setAttribute('role', 'row'); row.className = 'sl-calendar-week';
        for (let column = 0; column < 7; column++) {
          const date = new Date(first); date.setUTCDate(1 - offset + rowIndex * 7 + column);
          const value = iso(date), button = doc.createElement('button');
          button.type = 'button'; button.dataset.date = value; button.textContent = String(date.getUTCDate()); button.setAttribute('role', 'gridcell');
          button.setAttribute('aria-label', dateFormat.format(date)); button.setAttribute('aria-selected', String(value === target.value));
          button.dataset.outside = String(value.slice(0, 7) !== month); button.dataset.range = String(read().valid && value >= start.value && value <= end.value);
          if (value === today()) button.setAttribute('aria-current', 'date');
          button.disabled = Boolean(options.disabled) || !allowed(value); button.tabIndex = value === cursor && !button.disabled ? 0 : -1;
          if (button.tabIndex === 0) focused = button; row.append(button);
        }
        grid.append(row);
      }
      if (!focused) { focused = grid.querySelector('button:not(:disabled)'); if (focused) { focused.tabIndex = 0; cursor = focused.dataset.date; } }
      if (focus) (focused || next).focus({ preventScroll: true });
      return focused;
    }
    function moveMonth(delta) {
      const current = new Date(cursor + 'T00:00:00Z'), destination = new Date(month + '-01T00:00:00Z');
      destination.setUTCMonth(destination.getUTCMonth() + delta); const proposed = iso(destination).slice(0, 7);
      if (proposed < '2000-01' || proposed > '2100-12') return;
      const days = new Date(Date.UTC(destination.getUTCFullYear(), destination.getUTCMonth() + 1, 0)).getUTCDate();
      destination.setUTCDate(Math.min(current.getUTCDate(), days)); cursor = iso(destination); month = proposed; calendar(true);
    }
    function choose(value) { if (!writable(target) || (value && !allowed(value))) return; target.value = value; render(); emit(); picker.close(); }
    on(previous, 'click', () => moveMonth(-1)); on(next, 'click', () => moveMonth(1));
    on(todayButton, 'click', () => choose(today())); on(clearButton, 'click', () => choose(''));
    on(grid, 'click', event => { const button = event.target.closest('[data-date]'); if (button && !button.disabled) choose(button.dataset.date); });
    on(grid, 'keydown', event => {
      const button = event.target.closest('[data-date]'); if (!button) return;
      if (event.key === 'PageUp' || event.key === 'PageDown') { event.preventDefault(); moveMonth((event.key === 'PageUp' ? -1 : 1) * (event.shiftKey ? 12 : 1)); return; }
      const date = new Date(button.dataset.date + 'T00:00:00Z'), weekday = (date.getUTCDay() + 6) % 7;
      const delta = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7, Home: -weekday, End: 6 - weekday }[event.key];
      if (delta === undefined) return; event.preventDefault(); date.setUTCDate(date.getUTCDate() + delta);
      if (!allowed(iso(date))) return; cursor = iso(date); month = cursor.slice(0, 7); calendar(true);
    });
    qa('[data-calendar]').forEach(button => {
      picker.bind(button);
      const input = button.dataset.calendar === 'start' ? start : end;
      function openCalendar() {
        if (!writable(input)) return; target = input;
        cursor = validDate(input.value) && allowed(input.value) ? input.value : (target === end && validDate(start.value) ? start.value : defaults.start);
        month = cursor.slice(0, 7); picker.heading.textContent = target === start ? 'Start date' : 'End date';
        picker.open(button, calendar());
      }
      on(button, 'click', openCalendar);
      on(input, 'keydown', event => { if (event.altKey && event.key === 'ArrowDown') { event.preventDefault(); openCalendar(); } });
    });
    return finish(() => { picker.close(); start.value = defaults.start; end.value = defaults.end; render(); }, () => picker.destroy());
  }
  function mountPreview(root) {
    return mount(root);
  }
  window.SLComponent = { mount, mountPreview };
})();
