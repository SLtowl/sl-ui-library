(() => {
  'use strict';
  const states = Object.freeze([
    Object.freeze({ value: 'separate', label: 'Group items', aria: 'Group the local items', status: 'Items are separate.' }),
    Object.freeze({ value: 'grouped', label: 'Ungroup items', aria: 'Ungroup the local items', status: 'Items are grouped.' })
  ]);
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
      root.dataset.active = String(index > 0);
      label.textContent = state.label;
      button.setAttribute('aria-label', state.aria);
      button.title = state.aria;
      button.setAttribute('aria-pressed', String(index > 0));
      status.textContent = state.status;
    }
    function setValue(value, emit = false) {
      const next = states.findIndex(state => state.value === String(value));
      if (destroyed || next < 0 || next === index) return false;
      index = next;
      render();
      if (emit) {
        const detail = { kind: root.dataset.kind, groupState: states[index].value };
        options.onChange?.({ groupState: states[index].value });
        root.dispatchEvent(new view.CustomEvent('sl:action', { bubbles: true, composed: true, detail }));
      }
      return true;
    }
    function toggle() {
      if (activeElement() !== button) button.focus();
      return setValue(states[(index + 1) % states.length].value, true);
    }
    function reset() { if (!destroyed) { index = 0; render(); } }
    function destroy() { if (destroyed) return; reset(); destroyed = true; life.abort(); }
    listen(button, 'click', toggle);
    listen(root, 'sl:buttons-remount', destroy);
    reset();
    return { toggle, setGroupState: value => setValue(value), reset, destroy, get state() { return { groupState: states[index].value, index }; } };
  }
  function mountPreview(root) { return mount(root); }
  window.SLComponent = { mount, mountPreview };
})();
