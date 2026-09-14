(() => {
  'use strict';
  function mount(root, options = {}) {
    if (!root?.matches('.sl-component')) throw new TypeError('A .sl-component root is required.');
    // Replacing a mount on this root cleans up its previous instance.
    root.dispatchEvent(new CustomEvent('sl-navigation:remount'));
    const life = new AbortController();
    let alive = true;
    const q = selector => root.querySelector(selector);
    const all = selector => [...root.querySelectorAll(selector)];
    const on = (node, type, handler) => node.addEventListener(type, handler, { signal: life.signal });
    const active = () => root.getRootNode().activeElement;
    const focus = node => node?.focus({ preventScroll: true });
    const put = (selector, value) => { q(selector).textContent = value; };
    const current = (nodes, selected, attr = 'aria-current', token = 'page') => nodes.forEach(node => {
      if (node === selected) node.setAttribute(attr, token);
      else if (attr === 'aria-current') node.removeAttribute(attr);
      else node.setAttribute(attr, 'false');
    });
    const emit = () => {
      if (!alive) return;
      const detail = { kind: root.dataset.kind, ...readState() };
      root.dispatchEvent(new CustomEvent('sl-navigate', { detail, bubbles: true, composed: true }));
      options.onNavigate?.(detail);
    };
    const moveFocus = (event, nodes) => {
      if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key) || !nodes.length) return;
      event.preventDefault();
      const at = nodes.indexOf(active());
      focus(nodes[event.key === 'Home' ? 0 : event.key === 'End' ? nodes.length - 1 : (at + (event.key === 'ArrowDown' ? 1 : -1) + nodes.length) % nodes.length]);
    };
    let cleanup = () => {};

    const pane = q('[data-pane]'), sources = all('[data-reference]'), notes = all('[data-note]'), backButton = q('[data-back]');
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    let selected = null, sourceIndex = null, returnPosition = null;
    const offset = node => node.getBoundingClientRect().top - pane.getBoundingClientRect().top + pane.scrollTop;
    function jump(index) {
      if (!alive || !Number.isInteger(index) || !sources[index]) return false;
      sourceIndex = index; selected = Number(sources[index].dataset.reference); returnPosition = pane.scrollTop;
      put('[data-location]', 'Reference ' + (selected + 1)); backButton.disabled = false;
      focus(notes[selected].querySelector('h3'));
      pane.scrollTo({ top: offset(notes[selected]), behavior: motion.matches ? 'instant' : 'smooth' }); emit(); return true;
    }
    function back() {
      if (!alive || sourceIndex === null) return false;
      const source = sources[sourceIndex], position = returnPosition;
      selected = null; sourceIndex = null; returnPosition = null; put('[data-location]', 'Article'); backButton.disabled = true;
      focus(source); pane.scrollTo({ top: position, behavior: motion.matches ? 'instant' : 'smooth' }); emit(); return true;
    }
    sources.forEach((button, i) => on(button, 'click', () => jump(i)));
    on(backButton, 'click', back);
    on(root, 'keydown', event => { if (event.key === 'Escape' && sourceIndex !== null) { event.preventDefault(); back(); } });
    on(motion, 'change', () => { if (motion.matches) pane.scrollTo({ top: pane.scrollTop, behavior: 'instant' }); });
    function resetView() { selected = null; sourceIndex = null; returnPosition = null; put('[data-location]', 'Article'); backButton.disabled = true; pane.scrollTo({ top: 0, behavior: 'instant' }); }
    const readState = () => ({ selected, sourceIndex, returnPosition });
    const actions = { jump, back };
    cleanup = () => pane.scrollTo({ top: pane.scrollTop, behavior: 'instant' });

    function reset() {
      if (!alive) return;
      const contained = root.contains(active());
      resetView();
      if (contained && (!root.contains(active()) || active()?.closest('[hidden],[inert]') || active()?.disabled)) {
        focus(all('button,input,select').find(node => !node.disabled && !node.closest('[hidden],[inert]')));
      }
    }
    function destroy() {
      if (!alive) return;
      alive = false;
      life.abort();
      cleanup();
    }
    on(root, 'sl-navigation:remount', destroy);
    resetView();
    return { ...actions, reset, destroy, get state() { return readState(); } };
  }
  function mountPreview(root) { return mount(root); }
  window.SLComponent = { mount, mountPreview };
})();
