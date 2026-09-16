(() => {
  'use strict';
  function mount(root, options = {}) {
    if (!root?.matches('.sl-component')) throw new TypeError('Expected a .sl-component root.');
    const view = root.ownerDocument.defaultView;
    root.dispatchEvent(new view.Event('sl:buttons-remount'));
    const life = new view.AbortController();
    const button = root.querySelector('[data-action]'), label = root.querySelector('[data-label]'), status = root.querySelector('[data-status]');
    const initial = false;
    let open = initial, destroyed = false;
    const listen = (target, type, fn) => target.addEventListener(type, fn, { signal: life.signal });
    const activeElement = () => root.getRootNode().activeElement;
    function render() {
      root.dataset.active = String(open);
      button.setAttribute('aria-pressed', String(open));
      button.setAttribute('aria-label', open ? "Close" : "Search");
      label.textContent = open ? "Close" : "Search";
      status.textContent = open ? "Search is open. Activate again to close it." : "Search is closed.";
    }
    function setOpen(value, emit = false) {
      const next = Boolean(value);
      if (destroyed || next === open) return false;
      open = next; render();
      if (emit) {
        options.onChange?.({ open });
        root.dispatchEvent(new view.CustomEvent('sl:action', { bubbles: true, composed: true, detail: { kind: root.dataset.kind, open } }));
      }
      return true;
    }
    function toggle() { if (activeElement() !== button) button.focus(); return setOpen(!open, true); }
    function reset() { if (!destroyed) { open = initial; render(); } }
    function destroy() { if (destroyed) return; reset(); destroyed = true; life.abort(); }
    listen(button, 'click', toggle); listen(root, 'sl:buttons-remount', destroy); reset();
    return { toggle, setOpen: value => setOpen(value), reset, destroy, get state() { return { open }; } };
  }
  function mountPreview(root) { return mount(root); }
  window.SLComponent = { mount, mountPreview };
})();
