(() => {
  'use strict';
  function mount(root, options = {}) {
    if (!root?.matches('.sl-component')) throw new TypeError('Expected a .sl-component root.');
    const view = root.ownerDocument.defaultView;
    root.dispatchEvent(new view.Event('sl:buttons-remount'));
    const life = new view.AbortController();
    const button = root.querySelector('[data-action]'), label = root.querySelector('[data-label]'), status = root.querySelector('[data-status]');
    const initial = false;
    let enabled = initial, destroyed = false;
    const listen = (target, type, fn) => target.addEventListener(type, fn, { signal: life.signal });
    const activeElement = () => root.getRootNode().activeElement;
    function render() {
      root.dataset.active = String(enabled);
      button.setAttribute('aria-pressed', String(enabled));
      button.setAttribute('aria-label', enabled ? "Mute alerts" : "Enable alerts");
      label.textContent = enabled ? "Mute alerts" : "Enable alerts";
      status.textContent = enabled ? "Notifications are on. Activate again to mute them." : "Notifications are off.";
    }
    function setEnabled(value, emit = false) {
      const next = Boolean(value);
      if (destroyed || next === enabled) return false;
      enabled = next; render();
      if (emit) {
        options.onChange?.({ enabled });
        root.dispatchEvent(new view.CustomEvent('sl:action', { bubbles: true, composed: true, detail: { kind: root.dataset.kind, enabled } }));
      }
      return true;
    }
    function toggle() { if (activeElement() !== button) button.focus(); return setEnabled(!enabled, true); }
    function reset() { if (!destroyed) { enabled = initial; render(); } }
    function destroy() { if (destroyed) return; reset(); destroyed = true; life.abort(); }
    listen(button, 'click', toggle); listen(root, 'sl:buttons-remount', destroy); reset();
    return { toggle, setEnabled: value => setEnabled(value), reset, destroy, get state() { return { enabled }; } };
  }
  function mountPreview(root) { return mount(root); }
  window.SLComponent = { mount, mountPreview };
})();
