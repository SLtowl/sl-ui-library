(() => {
  'use strict';
  function mount(root, options = {}) {
    if (!root?.matches('.sl-component')) throw new TypeError('Expected a .sl-component root.');
    const view = root.ownerDocument.defaultView;
    root.dispatchEvent(new view.Event('sl:buttons-remount'));
    const life = new view.AbortController();
    const button = root.querySelector('[data-action]'), label = root.querySelector('[data-label]'), status = root.querySelector('[data-status]');
    const initial = false;
    let visible = initial, destroyed = false;
    const listen = (target, type, fn) => target.addEventListener(type, fn, { signal: life.signal });
    const activeElement = () => root.getRootNode().activeElement;
    function render() {
      root.dataset.active = String(visible);
      button.setAttribute('aria-pressed', String(visible));
      button.setAttribute('aria-label', visible ? "Hide" : "Show");
      label.textContent = visible ? "Hide" : "Show";
      status.textContent = visible ? "Content is visible. Activate again to hide it." : "Content is hidden.";
    }
    function setVisible(value, emit = false) {
      const next = Boolean(value);
      if (destroyed || next === visible) return false;
      visible = next; render();
      if (emit) {
        options.onChange?.({ visible });
        root.dispatchEvent(new view.CustomEvent('sl:action', { bubbles: true, composed: true, detail: { kind: root.dataset.kind, visible } }));
      }
      return true;
    }
    function toggle() { if (activeElement() !== button) button.focus(); return setVisible(!visible, true); }
    function reset() { if (!destroyed) { visible = initial; render(); } }
    function destroy() { if (destroyed) return; reset(); destroyed = true; life.abort(); }
    listen(button, 'click', toggle); listen(root, 'sl:buttons-remount', destroy); reset();
    return { toggle, setVisible: value => setVisible(value), reset, destroy, get state() { return { visible }; } };
  }
  function mountPreview(root) { return mount(root); }
  window.SLComponent = { mount, mountPreview };
})();
