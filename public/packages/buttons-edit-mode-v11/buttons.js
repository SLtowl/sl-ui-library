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
    let editing = initial, destroyed = false;
    const listen = (target, type, fn) => target.addEventListener(type, fn, { signal: life.signal });
    const activeElement = () => root.getRootNode().activeElement;
    function render() {
      root.dataset.active = String(editing);
      button.setAttribute('aria-pressed', String(editing));
      button.setAttribute('aria-label', editing ? "Done" : "Edit");
      label.textContent = editing ? "Done" : "Edit";
      status.textContent = editing ? "Editing is on. Activate Done to leave it." : "Editing is off.";
    }
    function setEditing(value, emit = false) {
      const next = Boolean(value);
      if (destroyed || next === editing) return false;
      editing = next; render();
      if (emit) {
        options.onChange?.({ editing });
        root.dispatchEvent(new view.CustomEvent('sl:action', { bubbles: true, composed: true, detail: { kind: root.dataset.kind, editing } }));
      }
      return true;
    }
    function toggle() { if (activeElement() !== button) button.focus(); return setEditing(!editing, true); }
    function reset() { if (!destroyed) { editing = initial; render(); } }
    function destroy() { if (destroyed) return; reset(); destroyed = true; life.abort(); }
    listen(button, 'click', toggle);
    listen(root, 'sl:buttons-remount', destroy);
    reset();
    return { toggle, setEditing: value => setEditing(value), reset, destroy, get state() { return { editing }; } };
  }
  function mountPreview(root) { return mount(root); }
  window.SLComponent = { mount, mountPreview };
})();
