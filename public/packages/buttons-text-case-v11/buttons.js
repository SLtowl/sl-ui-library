(() => {
  'use strict';
  const states = Object.freeze([{"value":"sentence","label":"Uppercase","aria":"Change text to uppercase","status":"Sentence case."},{"value":"upper","label":"Lowercase","aria":"Change text to lowercase","status":"Uppercase text."},{"value":"lower","label":"Sentence case","aria":"Change text to sentence case","status":"Lowercase text."}].map(Object.freeze));
  function mount(root, options = {}) {
    if (!root?.matches('.sl-component')) throw new TypeError('Expected a .sl-component root.');
    const view = root.ownerDocument.defaultView;
    root.dispatchEvent(new view.Event('sl:buttons-remount'));
    const life = new view.AbortController();
    const button = root.querySelector('[data-action]');
    const label = root.querySelector('[data-label]');
    const status = root.querySelector('[data-status]');
    let index = 0;
    let destroyed = false;
    const listen = (target, type, fn) => target.addEventListener(type, fn, { signal: life.signal });
    const activeElement = () => root.getRootNode().activeElement;
    function render() {
      const state = states[index];
      root.dataset.state = state.value;
      label.textContent = state.label;
      button.setAttribute('aria-label', state.aria);
      button.removeAttribute('aria-pressed');
      status.textContent = state.status;
    }
    function setValue(value, emit = false) {
      const next = states.findIndex(state => state.value === String(value));
      if (destroyed || next < 0 || next === index) return false;
      index = next;
      render();
      if (emit) {
        const detail = { kind: root.dataset.kind, case: states[index].value };
        options.onChange?.({ case: states[index].value });
        root.dispatchEvent(new view.CustomEvent('sl:action', { bubbles: true, composed: true, detail }));
      }
      return true;
    }
    function activate() {
      if (activeElement() !== button) button.focus();
      return setValue(states[(index + 1) % states.length].value, true);
    }
    function reset() { if (!destroyed) { index = 0; render(); } }
    function destroy() { if (destroyed) return; reset(); destroyed = true; life.abort(); }
    listen(button, 'click', activate);
    listen(root, 'sl:buttons-remount', destroy);
    reset();
    return { cycle: activate, setCase: value => setValue(value), reset, destroy, get state() { return { case: states[index].value, index }; } };
  }
  function mountPreview(root) { return mount(root); }
  window.SLComponent = { mount, mountPreview };
})();
