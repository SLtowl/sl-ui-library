(() => {
  'use strict';
  function mount(root, options = {}) {
    if (!root?.matches('.sl-component')) throw new TypeError('Expected a .sl-component root.');
    const view = root.ownerDocument.defaultView;
    root.dispatchEvent(new view.Event('sl:buttons-remount'));
    const life = new view.AbortController();
    const button = root.querySelector('[data-action]'), label = root.querySelector('[data-label]'), status = root.querySelector('[data-status]');
    let mode = 'grid', destroyed = false;
    const listen = (target, type, fn) => target.addEventListener(type, fn, { signal: life.signal });
    const activeElement = () => root.getRootNode().activeElement;
    function render() {
      const list = mode === 'list'; root.dataset.active = String(list); button.setAttribute('aria-pressed', String(list));
      label.textContent = list ? 'Grid view' : 'List view'; button.setAttribute('aria-label', list ? 'Switch to grid view' : 'Switch to list view');
      status.textContent = list ? 'List view is active.' : 'Grid view is active.';
    }
    function setView(value, emit = false) {
      if (destroyed || !['grid','list'].includes(value) || value === mode) return false;
      mode = value; render();
      if (emit) { options.onChange?.({ view: mode }); root.dispatchEvent(new view.CustomEvent('sl:action', { bubbles: true, composed: true, detail: { kind: root.dataset.kind, view: mode } })); }
      return true;
    }
    function toggle() { if (activeElement() !== button) button.focus(); return setView(mode === 'grid' ? 'list' : 'grid', true); }
    function reset() { if (!destroyed) { mode = 'grid'; render(); } }
    function destroy() { if (destroyed) return; reset(); destroyed = true; life.abort(); }
    listen(button, 'click', toggle); listen(root, 'sl:buttons-remount', destroy); reset();
    return { toggle, setView: value => setView(value), reset, destroy, get state() { return { view: mode }; } };
  }
  function mountPreview(root) { return mount(root); }
  window.SLComponent = { mount, mountPreview };
})();
