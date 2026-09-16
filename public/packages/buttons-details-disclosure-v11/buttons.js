(() => {
  'use strict';
  function mount(root, options = {}) {
    if (!root?.matches('.sl-component')) throw new TypeError('Expected a .sl-component root.');
    const view = root.ownerDocument.defaultView;
    root.dispatchEvent(new view.Event('sl:buttons-remount'));
    const life = new view.AbortController();
    const button = root.querySelector('[data-action]'), label = root.querySelector('[data-label]'), status = root.querySelector('[data-status]'), panel = root.querySelector('[data-panel]');
    let expanded = false, destroyed = false;
    const listen = (target, type, fn) => target.addEventListener(type, fn, { signal: life.signal });
    const activeElement = () => root.getRootNode().activeElement;
    function render() {
      root.dataset.active = String(expanded); button.setAttribute('aria-expanded', String(expanded));
      button.setAttribute('aria-label', expanded ? 'Hide details' : 'Show details');
      label.textContent = expanded ? 'Hide details' : 'Show details';
      panel.dataset.open = String(expanded); panel.setAttribute('aria-hidden', String(!expanded)); panel.inert = !expanded;
      status.textContent = expanded ? 'Details are visible.' : 'Details are hidden.';
    }
    function setExpanded(value, emit = false) {
      const next = Boolean(value); if (destroyed || next === expanded) return false;
      expanded = next; render();
      if (emit) {
        options.onChange?.({ expanded });
        root.dispatchEvent(new view.CustomEvent('sl:action', { bubbles: true, composed: true, detail: { kind: root.dataset.kind, expanded } }));
      }
      return true;
    }
    function toggle() { if (activeElement() !== button) button.focus(); return setExpanded(!expanded, true); }
    function reset() { if (!destroyed) { expanded = false; render(); } }
    function destroy() { if (destroyed) return; reset(); destroyed = true; life.abort(); }
    listen(button, 'click', toggle);
    listen(root, 'keydown', event => { if (event.key === 'Escape' && expanded) { event.preventDefault(); setExpanded(false, true); button.focus(); } });
    listen(root, 'sl:buttons-remount', destroy); reset();
    return { toggle, setExpanded: value => setExpanded(value), reset, destroy, get state() { return { expanded }; } };
  }
  function mountPreview(root) { return mount(root); }
  window.SLComponent = { mount, mountPreview };
})();
