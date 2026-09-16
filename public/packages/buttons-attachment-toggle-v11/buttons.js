(() => {
  'use strict';
  function mount(root, options = {}) {
    if (!root?.matches('.sl-component')) throw new TypeError('Expected a .sl-component root.');
    const view = root.ownerDocument.defaultView;
    root.dispatchEvent(new view.Event('sl:buttons-remount'));
    const life = new view.AbortController();
    const button = root.querySelector('[data-action]'), label = root.querySelector('[data-label]'), status = root.querySelector('[data-status]');
    const initial = false;
    let attached = initial, destroyed = false;
    const listen = (target, type, fn) => target.addEventListener(type, fn, { signal: life.signal });
    const activeElement = () => root.getRootNode().activeElement;
    function render() {
      root.dataset.active = String(attached);
      button.setAttribute('aria-pressed', String(attached));
      button.setAttribute('aria-label', attached ? "Remove file" : "Attach file");
      label.textContent = attached ? "Remove file" : "Attach file";
      status.textContent = attached ? "A local draft file is attached. Activate again to remove it." : "No file is attached.";
    }
    function setAttached(value, emit = false) {
      const next = Boolean(value);
      if (destroyed || next === attached) return false;
      attached = next; render();
      if (emit) {
        options.onChange?.({ attached });
        root.dispatchEvent(new view.CustomEvent('sl:action', { bubbles: true, composed: true, detail: { kind: root.dataset.kind, attached } }));
      }
      return true;
    }
    function toggle() { if (activeElement() !== button) button.focus(); return setAttached(!attached, true); }
    function reset() { if (!destroyed) { attached = initial; render(); } }
    function destroy() { if (destroyed) return; reset(); destroyed = true; life.abort(); }
    listen(button, 'click', toggle); listen(root, 'sl:buttons-remount', destroy); reset();
    return { toggle, setAttached: value => setAttached(value), reset, destroy, get state() { return { attached }; } };
  }
  function mountPreview(root) { return mount(root); }
  window.SLComponent = { mount, mountPreview };
})();
