(() => {
  'use strict';
  const mounted = new WeakMap();
  function mount(root, options = {}) {
    if (!root || !root.matches('.sl-component')) throw new TypeError('A .sl-component root is required.');
    if (mounted.has(root)) return mounted.get(root);
    if (options.onChange !== undefined && typeof options.onChange !== 'function') throw new TypeError('onChange must be a function.');
    const view = root.ownerDocument.defaultView;
    const lifecycle = new view.AbortController();
    const switchControl = root.querySelector('[role="switch"][data-field]');
    const radioGroup = root.querySelector('[role="radiogroup"][data-field]');
    if (!switchControl && !radioGroup) throw new TypeError('A switch or radio group is required.');
    const field = (switchControl || radioGroup).dataset.field;
    const type = switchControl ? 'boolean' : 'enum';
    const allowed = radioGroup ? [...radioGroup.querySelectorAll('[role="radio"]')].map(button => button.dataset.value) : [];
    const defaults = { [field]: type === 'boolean' ? switchControl.getAttribute('aria-checked') === 'true' : radioGroup.dataset.default };
    let state = { ...defaults };
    let destroyed = false;
    delete root.dataset.destroyed;
    const copy = value => JSON.parse(JSON.stringify(value));
    function validate(value) {
      if (type === 'boolean') { if (typeof value !== 'boolean') throw new TypeError(field + ' must be a boolean.'); }
      else if (!allowed.includes(value)) throw new RangeError('Unsupported ' + field + ': ' + String(value));
      return value;
    }
    function render() {
      const value = state[field];
      root.dataset.state = String(value);
      let message = '';
      if (switchControl) {
        switchControl.setAttribute('aria-checked', String(value));
        switchControl.querySelector('.sl-toggle-word').textContent = value ? 'On' : 'Off';
        message = value ? switchControl.dataset.statusOn : switchControl.dataset.statusOff;
      } else {
        [...radioGroup.querySelectorAll('[role="radio"]')].forEach(button => {
          const checked = button.dataset.value === value;
          button.setAttribute('aria-checked', String(checked));
          button.tabIndex = checked ? 0 : -1;
          if (checked) message = button.dataset.status;
        });
      }
      root.querySelector('[data-live-status]').textContent = message;
    }
    function emit() {
      const detail = { state: copy(state) };
      root.dispatchEvent(new view.CustomEvent('selectionchange', { bubbles: true, composed: true, detail }));
      options.onChange?.(copy(state));
    }
    function setState(patch, { emit: shouldEmit = false } = {}) {
      if (destroyed) return;
      if (!patch || typeof patch !== 'object' || Array.isArray(patch)) throw new TypeError('Expected a state patch.');
      for (const key of Object.keys(patch)) if (key !== field) throw new TypeError('Unknown state field: ' + key);
      const next = validate(Object.hasOwn(patch, field) ? patch[field] : state[field]);
      if (next === state[field]) return;
      state = { [field]: next };
      render();
      if (shouldEmit) emit();
    }
    function click(event) {
      const button = event.target.closest('button');
      if (!button || !root.contains(button) || button.disabled) return;
      if (button === switchControl) setState({ [field]: !state[field] }, { emit: true });
      else if (radioGroup?.contains(button) && button.matches('[role="radio"]')) setState({ [field]: button.dataset.value }, { emit: true });
    }
    function keydown(event) {
      const button = event.target.closest('[role="radio"]');
      if (!button || !radioGroup?.contains(button) || event.altKey || event.ctrlKey || event.metaKey) return;
      const buttons = [...radioGroup.querySelectorAll('[role="radio"]')];
      const index = buttons.indexOf(button);
      let next;
      if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = buttons.length - 1;
      else if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % buttons.length;
      else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index - 1 + buttons.length) % buttons.length;
      else return;
      event.preventDefault();
      buttons[next].focus();
      buttons[next].click();
    }
    root.addEventListener('click', click, { signal: lifecycle.signal });
    root.addEventListener('keydown', keydown, { signal: lifecycle.signal });
    const controller = {
      setState,
      reset() { if (destroyed) return; state = { ...defaults }; render(); },
      destroy() { if (destroyed) return; destroyed = true; lifecycle.abort(); root.dataset.destroyed = 'true'; mounted.delete(root); },
      get state() { return copy(state); }
    };
    render();
    mounted.set(root, controller);
    return controller;
  }
  function mountPreview(root) { return mount(root); }
  window.SLComponent = { mount, mountPreview };
})();
