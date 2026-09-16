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
    let added = initial, destroyed = false;
    const listen = (target, type, fn) => target.addEventListener(type, fn, { signal: life.signal });
    const activeElement = () => root.getRootNode().activeElement;
    function render() {
      root.dataset.active = String(added);
      button.setAttribute('aria-pressed', String(added));
      button.setAttribute('aria-label', added ? "Added" : "Add item");
      label.textContent = added ? "Added" : "Add item";
      status.textContent = added ? "Item added. Activate again to remove it." : "Item is not added.";
    }
    function setAdded(value, emit = false) {
      const next = Boolean(value);
      if (destroyed || next === added) return false;
      added = next; render();
      if (emit) {
        options.onChange?.({ added });
        root.dispatchEvent(new view.CustomEvent('sl:action', { bubbles: true, composed: true, detail: { kind: root.dataset.kind, added } }));
      }
      return true;
    }
    function toggle() { if (activeElement() !== button) button.focus(); return setAdded(!added, true); }
    function reset() { if (!destroyed) { added = initial; render(); } }
    function destroy() { if (destroyed) return; reset(); destroyed = true; life.abort(); }
    listen(button, 'click', toggle);
    listen(root, 'sl:buttons-remount', destroy);
    reset();
    return { toggle, setAdded: value => setAdded(value), reset, destroy, get state() { return { added }; } };
  }
  function mountPreview(root) { return mount(root); }
  window.SLComponent = { mount, mountPreview };
})();
