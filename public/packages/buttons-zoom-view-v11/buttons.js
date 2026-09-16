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
    const levels = Object.freeze([100, 125, 150]);
    let index = 0;
    let destroyed = false;
    const listen = (target, type, fn) => target.addEventListener(type, fn, { signal: life.signal });
    const activeElement = () => root.getRootNode().activeElement;

    function render() {
      const zoom = levels[index];
      const atMaximum = index === levels.length - 1;
      root.dataset.zoom = String(zoom);
      label.textContent = atMaximum ? 'Reset zoom' : 'Zoom in';
      button.setAttribute('aria-label', atMaximum ? 'Reset zoom to 100%' : `Zoom in from ${zoom}%`);
      status.textContent = `View zoom: ${zoom}%.`;
    }

    function setZoom(value, emit = false) {
      const next = levels.indexOf(Number(value));
      if (destroyed || next < 0 || next === index) return false;
      index = next;
      render();
      if (emit) {
        const zoom = levels[index];
        options.onChange?.({ zoom });
        root.dispatchEvent(new view.CustomEvent('sl:action', { bubbles: true, composed: true, detail: { kind: root.dataset.kind, zoom } }));
      }
      return true;
    }

    function step() {
      if (activeElement() !== button) button.focus();
      return setZoom(levels[(index + 1) % levels.length], true);
    }

    function reset() {
      if (destroyed) return;
      index = 0;
      render();
    }

    function destroy() {
      if (destroyed) return;
      reset();
      destroyed = true;
      life.abort();
    }

    listen(button, 'click', step);
    listen(root, 'sl:buttons-remount', destroy);
    reset();
    return { step, setZoom: value => setZoom(value), reset, destroy, get state() { return { zoom: levels[index], index }; } };
  }
  function mountPreview(root) { return mount(root); }
  window.SLComponent = { mount, mountPreview };
})();
