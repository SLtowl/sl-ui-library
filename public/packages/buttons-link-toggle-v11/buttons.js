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
    let linked = initial, destroyed = false;
    const listen = (target, type, fn) => target.addEventListener(type, fn, { signal: life.signal });
    const activeElement = () => root.getRootNode().activeElement;
    function render() {
      root.dataset.active = String(linked);
      button.setAttribute('aria-pressed', String(linked));
      button.setAttribute('aria-label', linked ? "Unlink" : "Link items");
      label.textContent = linked ? "Unlink" : "Link items";
      status.textContent = linked ? "Items are linked. Activate again to unlink." : "Items are separate.";
    }
    function setLinked(value, emit = false) {
      const next = Boolean(value);
      if (destroyed || next === linked) return false;
      linked = next; render();
      if (emit) {
        options.onChange?.({ linked });
        root.dispatchEvent(new view.CustomEvent('sl:action', { bubbles: true, composed: true, detail: { kind: root.dataset.kind, linked } }));
      }
      return true;
    }
    function toggle() { if (activeElement() !== button) button.focus(); return setLinked(!linked, true); }
    function reset() { if (!destroyed) { linked = initial; render(); } }
    function destroy() { if (destroyed) return; reset(); destroyed = true; life.abort(); }
    listen(button, 'click', toggle);
    listen(root, 'sl:buttons-remount', destroy);
    reset();
    return { toggle, setLinked: value => setLinked(value), reset, destroy, get state() { return { linked }; } };
  }
  function mountPreview(root) { return mount(root); }
  window.SLComponent = { mount, mountPreview };
})();
