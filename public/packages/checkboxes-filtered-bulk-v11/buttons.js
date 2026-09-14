(() => {
  'use strict';
  const mounted = new WeakMap();
  function mount(root, options = {}) {
    if (mounted.has(root)) return mounted.get(root);
    if (options.onChange !== undefined && typeof options.onChange !== 'function') throw new TypeError('onChange must be a function.');
    const inputs = [...root.querySelectorAll('[data-choice]')];
    const status = root.querySelector('[data-status]');
    const clear = root.querySelector('[data-clear]');
    const defaults = inputs.filter(input => input.defaultChecked).map(input => input.value);
    const available = new Set(inputs.map(input => input.value));
    const listeners = [];
    let destroyed = false;
    let selected = new Set(defaults);
    const filter = root.querySelector('[data-filter]');
    const master = root.querySelector('[data-master]');
    let query = '';
    const visible = () => inputs.filter(input => input.closest('.choice').textContent.toLocaleLowerCase().includes(query.toLocaleLowerCase()));
    function valid(next) { return true; }
    function readValues(values) {
      if (!Array.isArray(values) || values.some(value => !available.has(value)) || new Set(values).size !== values.length || !valid(values)) throw new TypeError('Invalid selection for checkboxes-filtered-bulk.');
      return [...values];
    }
    if (options.values !== undefined) selected = new Set(readValues(options.values));
    function state() { return { kind: 'checkboxes-filtered-bulk', values: [...selected], query, visible: visible().map(input => input.value) }; }
    function sync() {
      for (const input of inputs) { input.checked = selected.has(input.value); input.indeterminate = false; input.disabled = false; }
      const shown = visible();
      for (const input of inputs) input.closest('.choice').hidden = !shown.includes(input);
      const count = shown.filter(input => selected.has(input.value)).length;
      master.checked = shown.length > 0 && count === shown.length;
      master.indeterminate = count > 0 && count < shown.length;
      master.disabled = shown.length === 0;
      root.querySelector('[data-empty]').hidden = shown.length > 0;
      status.textContent = selected.size + ' selected · ' + shown.length + ' visible';
      const empty = selected.size === 0;
      if (empty && root.getRootNode().activeElement === clear) (inputs.find(input => !input.disabled && !input.closest('.choice').hidden) || root.querySelector('[data-filter]'))?.focus();
      clear.disabled = empty;
    }
    function apply(next, action) {
      if (destroyed) return false;
      const values = readValues(next);
      if (values.length === selected.size && values.every((value, index) => value === [...selected][index])) { sync(); return false; }
      selected = new Set(values); sync();
      if (action) {
        root.dispatchEvent(new CustomEvent('selectionchange', { bubbles: true, composed: true, detail: { action, ...state() } }));
        options.onChange?.({ action, ...state() });
      }
      return true;
    }
    function change(event) {
      if (event.target === master) {
        const next = new Set(selected);
        for (const input of visible()) { if (master.checked) next.add(input.value); else next.delete(input.value); }
        apply([...next], 'bulk'); return;
      }
      const input = event.target;
      if (!inputs.includes(input)) return;
      if (input.disabled) { sync(); return; }
      const next = new Set(selected);
      if (input.checked) next.add(input.value); else next.delete(input.value);

      if (!valid([...next])) { sync(); return; }
      apply([...next], 'select');
    }
    function click(event) {
      const button = event.target.closest('[data-clear]');
      if (button === clear && !clear.disabled) apply([], 'clear');

    }
    function listen(element, name, listener) { element.addEventListener(name, listener); listeners.push(() => element.removeEventListener(name, listener)); }
    function reset() {
      if (destroyed) return;
      selected = new Set(defaults);
      query = ''; filter.value = '';
      sync();
    }
    listen(root, 'change', change);
    listen(root, 'click', click);
    listen(root, 'submit', event => event.preventDefault());
    listen(root, 'reset', event => { event.preventDefault(); reset(); });
    listen(filter, 'input', () => { query = filter.value; sync(); });
    const controller = {
      get state() { return state(); },
      setValues(values) { return apply(values); },
      setFilter(value) { if (destroyed) return false; query = String(value ?? ''); filter.value = query; sync(); return true; },
      reset,
      destroy() { if (destroyed) return; destroyed = true; for (const remove of listeners) remove(); mounted.delete(root); }
    };
    sync(); mounted.set(root, controller); return controller;
  }
  function mountPreview(root) { return mount(root); }
  window.SLComponent = { mount, mountPreview };
})();
