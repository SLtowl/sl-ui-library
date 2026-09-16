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
    let locked = initial, destroyed = false;
    const listen = (target, type, fn) => target.addEventListener(type, fn, { signal: life.signal });
    const activeElement = () => root.getRootNode().activeElement;
    function render() {
      root.dataset.active = String(locked);
      button.setAttribute('aria-pressed', String(locked));
      button.setAttribute('aria-label', locked ? "Unlock" : "Lock");
      label.textContent = locked ? "Unlock" : "Lock";
      status.textContent = locked ? "Locked. Activate again to unlock." : "Unlocked.";
    }
    function setLocked(value, emit = false) {
      const next = Boolean(value);
      if (destroyed || next === locked) return false;
      locked = next; render();
      if (emit) {
        options.onChange?.({ locked });
        root.dispatchEvent(new view.CustomEvent('sl:action', { bubbles: true, composed: true, detail: { kind: root.dataset.kind, locked } }));
      }
      return true;
    }
    function toggle() { if (activeElement() !== button) button.focus(); return setLocked(!locked, true); }
    function reset() { if (!destroyed) { locked = initial; render(); } }
    function destroy() { if (destroyed) return; reset(); destroyed = true; life.abort(); }
    listen(button, 'click', toggle);
    listen(root, 'sl:buttons-remount', destroy);
    reset();
    return { toggle, setLocked: value => setLocked(value), reset, destroy, get state() { return { locked }; } };
  }
  function mountPreview(root) { return mount(root); }
  window.SLComponent = { mount, mountPreview };
})();
