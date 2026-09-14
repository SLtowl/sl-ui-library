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

    const pane = q('[data-pane]'), groups = all('[data-group]'), buttons = all('[data-letter]'), backButton = q('[data-back]');
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    let selected = 0, previous = null;
    const offset = node => node.getBoundingClientRect().top - pane.getBoundingClientRect().top + pane.scrollTop;
    function paint() { current(buttons, buttons[selected], 'aria-current', 'location'); put('[data-current]', 'Group ' + groups[selected].querySelector('h3').textContent); backButton.disabled = previous === null; }
    function jump(index) {
      if (!alive || !Number.isInteger(index) || !groups[index]) return false;
      previous = { position: pane.scrollTop, selected };
      selected = index; paint(); focus(groups[index].querySelector('h3'));
      pane.scrollTo({ top: offset(groups[index]), behavior: motion.matches ? 'instant' : 'smooth' }); emit(); return true;
    }
    function back() {
      if (!alive || previous === null) return false;
      const destination = previous; previous = null; selected = destination.selected; paint(); focus(buttons[selected]);
      pane.scrollTo({ top: destination.position, behavior: motion.matches ? 'instant' : 'smooth' }); emit(); return true;
    }
    buttons.forEach((button, i) => on(button, 'click', () => jump(i)));
    on(q('nav'), 'keydown', event => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      const at = buttons.indexOf(active());
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? 3 : (at + (event.key === 'ArrowRight' ? 1 : -1) + 4) % 4;
      jump(next); focus(buttons[next]);
    });
    on(pane, 'scroll', () => { let index = 0; groups.forEach((group, i) => { if (offset(group) <= pane.scrollTop + 12) index = i; }); if (index !== selected) { selected = index; paint(); } });
    on(backButton, 'click', back);
    on(root, 'keydown', event => { if (event.key === 'Escape' && previous) { event.preventDefault(); back(); } });
    on(motion, 'change', () => { if (motion.matches) pane.scrollTo({ top: pane.scrollTop, behavior: 'instant' }); });
    function resetView() { selected = 0; previous = null; pane.scrollTo({ top: 0, behavior: 'instant' }); paint(); }
    const readState = () => ({ selected, previous: previous ? { ...previous } : null });
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
