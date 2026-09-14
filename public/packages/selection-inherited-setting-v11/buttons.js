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
    const defaults = {"source":"workspace","workspace":true,"custom":false};
    let state = copy(defaults);
    function validate(next) {
      return { source: enumValue(next.source, ['workspace', 'custom']), workspace: booleanValue(next.workspace), custom: booleanValue(next.custom) };
    }
    function render() {
      radios('source', state.source);
      text('[data-workspace]', state.workspace ? 'On' : 'Off');
      toggle('custom', state.custom, state.source === 'workspace');
      text('[data-effective]', (state.source === 'workspace' ? state.workspace : state.custom) ? 'On' : 'Off');
      text('[data-status]', state.source === 'workspace' ? 'Following workspace default' : 'Using your personal choice');
    }
    function action(name, button) {
      // All controls use direct selections.
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
