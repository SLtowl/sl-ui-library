(() => {
  'use strict';
  function mount(root, options = {}) {
    if (!root?.matches('.sl-component')) throw new TypeError('Expected a .sl-component root.');
    const view = root.ownerDocument.defaultView;
    root.dispatchEvent(new view.Event('sl:buttons-remount'));
    const life = new view.AbortController();
    const button = root.querySelector('[data-action]'), label = root.querySelector('[data-label]'), status = root.querySelector('[data-status]');
    let direction = 'ascending', destroyed = false;
    const listen = (target, type, fn) => target.addEventListener(type, fn, { signal: life.signal });
    const activeElement = () => root.getRootNode().activeElement;
    function render() {
      const descending = direction === 'descending';
      root.dataset.active = String(descending); button.setAttribute('aria-pressed', String(descending));
      label.textContent = descending ? 'Descending' : 'Ascending'; button.setAttribute('aria-label', 'Sort ' + direction);
      status.textContent = descending ? 'Sorted in descending order.' : 'Sorted in ascending order.';
    }
    function setDirection(value, emit = false) {
      if (destroyed || !['ascending','descending'].includes(value) || value === direction) return false;
      direction = value; render();
      if (emit) {
        options.onChange?.({ direction });
        root.dispatchEvent(new view.CustomEvent('sl:action', { bubbles: true, composed: true, detail: { kind: root.dataset.kind, direction } }));
      }
      return true;
    }
    function toggle() { if (activeElement() !== button) button.focus(); return setDirection(direction === 'ascending' ? 'descending' : 'ascending', true); }
    function reset() { if (!destroyed) { direction = 'ascending'; render(); } }
    function destroy() { if (destroyed) return; reset(); destroyed = true; life.abort(); }
    listen(button, 'click', toggle); listen(root, 'sl:buttons-remount', destroy); reset();
    return { toggle, setDirection: value => setDirection(value), reset, destroy, get state() { return { direction }; } };
  }
  function mountPreview(root) { return mount(root); }
  window.SLComponent = { mount, mountPreview };
})();
