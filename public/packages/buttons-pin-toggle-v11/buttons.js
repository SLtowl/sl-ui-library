(() => {
  'use strict';
  function mount(root, options = {}) {
    if (!root?.matches('.sl-component')) throw new TypeError('Expected a .sl-component root.');
    const view = root.ownerDocument.defaultView;
    root.dispatchEvent(new view.Event('sl:buttons-remount'));
    const life = new view.AbortController();
    const button = root.querySelector('[data-action]');
    const label = root.querySelector('[data-label]');
    const status = root.querySelector('[data-status]');
    const initial = false;
    let pinned = initial, destroyed = false;
    const listen = (target, type, fn) => target.addEventListener(type, fn, { signal: life.signal });
    const activeElement = () => root.getRootNode().activeElement;
    function render() {
      root.dataset.active = String(pinned);
      button.setAttribute('aria-pressed', String(pinned));
      button.setAttribute('aria-label', pinned ? "Unpin" : "Pin item");
      label.textContent = pinned ? "Unpin" : "Pin item";
      status.textContent = pinned ? "Item is pinned. Activate again to unpin." : "Item is not pinned.";
    }
    function setPinned(value, emit = false) {
      const next = Boolean(value);
      if (destroyed || next === pinned) return false;
      pinned = next; render();
      if (emit) {
        options.onChange?.({ pinned });
        root.dispatchEvent(new view.CustomEvent('sl:action', { bubbles: true, composed: true, detail: { kind: root.dataset.kind, pinned } }));
      }
      return true;
    }
    function toggle() { if (activeElement() !== button) button.focus(); return setPinned(!pinned, true); }
    function reset() { if (!destroyed) { pinned = initial; render(); } }
    function destroy() { if (destroyed) return; reset(); destroyed = true; life.abort(); }
    listen(button, 'click', toggle);
    listen(root, 'sl:buttons-remount', destroy);
    reset();
    return { toggle, setPinned: value => setPinned(value), reset, destroy, get state() { return { pinned }; } };
  }
  function mountPreview(root) { return mount(root); }
  window.SLComponent = { mount, mountPreview };
})();
