(() => {
  'use strict';
  const mounted = new WeakMap();
  function mount(root, options = {}) {
    if (!root || !root.matches('.sl-component')) throw new TypeError('A .sl-component root is required.');
    if (mounted.has(root)) return mounted.get(root);
    if (options.onChange !== undefined && typeof options.onChange !== 'function') throw new TypeError('onChange must be a function.');
    const view = root.ownerDocument.defaultView;
    const lifecycle = new view.AbortController();
    const q = selector => root.querySelector(selector);
    const qa = selector => [...root.querySelectorAll(selector)];
    const copy = value => JSON.parse(JSON.stringify(value));
    let destroyed = false;
    delete root.dataset.destroyed;
    function text(selector, value) { q(selector).textContent = value; }
    function radios(field, value) {
      qa('[data-field="' + field + '"] [data-choice]').forEach(button => {
        const checked = button.dataset.choice === value;
        button.setAttribute('aria-checked', String(checked));
        button.tabIndex = checked ? 0 : -1;
      });
    }
    function toggle(field, checked, disabled = false) {
      const button = q('[data-toggle="' + field + '"]');
      button.setAttribute('aria-checked', String(checked));
      button.disabled = disabled;
      button.querySelector('.sl-toggle-word').textContent = checked ? 'On' : 'Off';
    }
    function enumValue(value, values) {
      if (!values.includes(value)) throw new RangeError('Unsupported selection: ' + String(value));
      return value;
    }
    function booleanValue(value) {
      if (typeof value !== 'boolean') throw new TypeError('Expected a boolean.');
      return value;
    }
    const defaults = {"days":["mon","tue","wed","thu","fri"]};
    let state = copy(defaults);
    function validate(next) {
      const order = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
      if (!Array.isArray(next.days) || next.days.some(day => !order.includes(day))) throw new RangeError('Expected valid day keys.');
      return { days: order.filter(day => next.days.includes(day)) };
    }
    function render() {
      qa('[data-day]').forEach(button => button.setAttribute('aria-pressed', String(state.days.includes(button.dataset.day))));
      q('[data-action="clear"]').disabled = state.days.length === 0;
      text('[data-status]', state.days.length === 0 ? 'No active days' : state.days.length + (state.days.length === 1 ? ' active day' : ' active days'));
    }
    function action(name, button) {
      if (name === 'day') {
        const day = button.dataset.day;
        setState({ days: state.days.includes(day) ? state.days.filter(value => value !== day) : [...state.days, day] }, { emit: true });
      } else if (name === 'weekdays') setState({ days: ['mon', 'tue', 'wed', 'thu', 'fri'] }, { emit: true });
      else if (name === 'weekend') setState({ days: ['sat', 'sun'] }, { emit: true });
      else if (name === 'clear') setState({ days: [] }, { emit: true });
    }
    function setState(patch, { emit = false } = {}) {
      if (destroyed) return;
      if (!patch || typeof patch !== 'object' || Array.isArray(patch)) throw new TypeError('Expected a state patch.');
      for (const key of Object.keys(patch)) if (!Object.hasOwn(defaults, key)) throw new TypeError('Unknown state field: ' + key);
      const next = validate({ ...state, ...patch });
      if (JSON.stringify(next) === JSON.stringify(state)) return;
      const focused = root.getRootNode().activeElement;
      state = next;
      render();
      repairFocus(focused);
      if (emit) {
        root.dispatchEvent(new view.CustomEvent('selectionchange', { bubbles: true, composed: true, detail: { state: copy(state) } }));
        options.onChange?.(copy(state));
      }
    }
    function repairFocus(active) {
      if (active && root.contains(active) && active.disabled) q('button:not(:disabled)')?.focus();
    }
    function click(event) {
      const button = event.target.closest('button');
      if (!button || !root.contains(button) || button.disabled) return;
      if (button.hasAttribute('data-choice')) {
        setState({ [button.closest('[data-field]').dataset.field]: button.dataset.choice }, { emit: true });
      } else if (button.hasAttribute('data-toggle')) {
        setState({ [button.dataset.toggle]: !state[button.dataset.toggle] }, { emit: true });
      } else action(button.dataset.action, button);
    }
    function keydown(event) {
      const button = event.target.closest('[role="radio"]');
      if (!button || !root.contains(button) || button.disabled || event.altKey || event.ctrlKey || event.metaKey) return;
      const group = button.closest('[role="radiogroup"]');
      const buttons = [...group.querySelectorAll('[role="radio"]')].filter(item => !item.disabled);
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
      reset() { if (destroyed) return; const focused = root.getRootNode().activeElement; state = copy(defaults); render(); repairFocus(focused); },
      destroy() {
        if (destroyed) return;
        destroyed = true;
        lifecycle.abort();
        root.dataset.destroyed = 'true';
        mounted.delete(root);
      },
      get state() { return copy(state); }
    };
    render();
    mounted.set(root, controller);
    return controller;
  }
  function mountPreview(root) { return mount(root); }
  window.SLComponent = { mount, mountPreview };
})();
