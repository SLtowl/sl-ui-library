(() => {
  'use strict';
  const states = Object.freeze([{"value":"left","label":"Align center","aria":"Align text to the center","status":"Text is aligned left."},{"value":"center","label":"Align right","aria":"Align text to the right","status":"Text is centered."},{"value":"right","label":"Align left","aria":"Align text to the left","status":"Text is aligned right."}].map(Object.freeze));
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
      button.title = state.aria;
      button.removeAttribute('aria-pressed');
      status.textContent = state.status;
    }
    function setValue(value, emit = false) {
      const next = states.findIndex(state => state.value === String(value));
      if (destroyed || next < 0 || next === index) return false;
      index = next;
      render();
      if (emit) {
        const detail = { kind: root.dataset.kind, alignment: states[index].value };
        options.onChange?.({ alignment: states[index].value });
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
    return { cycle: activate, setAlignment: value => setValue(value), reset, destroy, get state() { return { alignment: states[index].value, index }; } };
  }
  function mountPreview(root) { return mount(root); }
  window.SLComponent = { mount, mountPreview };
})();
