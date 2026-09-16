(() => {
  'use strict';
  function mount(root, options = {}) {
    if (!root?.matches('.sl-component')) throw new TypeError('Expected a .sl-component root.');
    const view = root.ownerDocument.defaultView;
    root.dispatchEvent(new view.Event('sl:buttons-remount'));
    const life = new view.AbortController();
    const button = root.querySelector('[data-action]'), label = root.querySelector('[data-label]'), status = root.querySelector('[data-status]');
    const initial = false;
    let muted = initial, destroyed = false;
    const listen = (target, type, fn) => target.addEventListener(type, fn, { signal: life.signal });
    const activeElement = () => root.getRootNode().activeElement;
    function render() {
      root.dataset.active = String(muted);
      button.setAttribute('aria-pressed', String(muted));
      button.setAttribute('aria-label', muted ? "Unmute" : "Mute");
      label.textContent = muted ? "Unmute" : "Mute";
      status.textContent = muted ? "Sound is muted. Activate again to restore it." : "Sound is on.";
    }
    function setMuted(value, emit = false) {
      const next = Boolean(value);
      if (destroyed || next === muted) return false;
      muted = next; render();
      if (emit) {
        options.onChange?.({ muted });
        root.dispatchEvent(new view.CustomEvent('sl:action', { bubbles: true, composed: true, detail: { kind: root.dataset.kind, muted } }));
      }
      return true;
    }
    function toggle() { if (activeElement() !== button) button.focus(); return setMuted(!muted, true); }
    function reset() { if (!destroyed) { muted = initial; render(); } }
    function destroy() { if (destroyed) return; reset(); destroyed = true; life.abort(); }
    listen(button, 'click', toggle); listen(root, 'sl:buttons-remount', destroy); reset();
    return { toggle, setMuted: value => setMuted(value), reset, destroy, get state() { return { muted }; } };
  }
  function mountPreview(root) { return mount(root); }
  window.SLComponent = { mount, mountPreview };
})();
