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
    let active = initial, destroyed = false;
    const listen = (target, type, fn) => target.addEventListener(type, fn, { signal: life.signal });
    const activeElement = () => root.getRootNode().activeElement;
    function render() {
      root.dataset.active = String(active);
      button.setAttribute('aria-pressed', String(active));
      button.setAttribute('aria-label', active ? "Clear filter" : "Apply filter");
      label.textContent = active ? "Clear filter" : "Apply filter";
      status.textContent = active ? "Filter is active. Activate again to clear it." : "Filter is off.";
    }
    function setActive(value, emit = false) {
      const next = Boolean(value);
      if (destroyed || next === active) return false;
      active = next; render();
      if (emit) {
        options.onChange?.({ active });
        root.dispatchEvent(new view.CustomEvent('sl:action', { bubbles: true, composed: true, detail: { kind: root.dataset.kind, active } }));
      }
      return true;
    }
    function toggle() { if (activeElement() !== button) button.focus(); return setActive(!active, true); }
    function reset() { if (!destroyed) { active = initial; render(); } }
    function destroy() { if (destroyed) return; reset(); destroyed = true; life.abort(); }
    listen(button, 'click', toggle);
    listen(root, 'sl:buttons-remount', destroy);
    reset();
    return { toggle, setActive: value => setActive(value), reset, destroy, get state() { return { active }; } };
  }
  function mountPreview(root) { return mount(root); }
  window.SLComponent = { mount, mountPreview };
})();
