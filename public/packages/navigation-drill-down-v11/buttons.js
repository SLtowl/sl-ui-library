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

    const screens = all('[data-screen]'), backButton = q('[data-back]');
    const parents = [null, 0, 0, 1, 1, 2];
    let trail = [0];
    function paint() {
      const selected = trail.at(-1);
      screens.forEach((screen, i) => { screen.hidden = i !== selected; });
      backButton.disabled = trail.length === 1;
      put('[data-depth]', 'Level ' + trail.length);
    }
    function navigate(index) {
      if (!alive || !Number.isInteger(index) || parents[index] !== trail.at(-1)) return false;
      trail.push(index); paint();
      focus(screens[index].querySelector('[data-go]') || screens[index].querySelector('h3')); emit(); return true;
    }
    function back() {
      if (!alive || trail.length === 1) return false;
      const previous = trail.pop(); paint();
      focus(screens[trail.at(-1)].querySelector('[data-go="' + previous + '"]')); emit(); return true;
    }
    all('[data-go]').forEach(button => on(button, 'click', () => navigate(Number(button.dataset.go))));
    on(backButton, 'click', back);
    on(root, 'keydown', event => {
      if ((event.altKey && event.key === 'ArrowLeft') || event.key === 'Escape') {
        if (trail.length > 1) { event.preventDefault(); back(); }
      } else moveFocus(event, [...screens[trail.at(-1)].querySelectorAll('[data-go]')]);
    });
    function resetView() { trail = [0]; paint(); }
    const readState = () => ({ selected: trail.at(-1), trail: [...trail] });
    const actions = { navigate, back };

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
