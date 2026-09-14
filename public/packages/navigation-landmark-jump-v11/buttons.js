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

    const pane = q('[data-pane]'), sections = all('[data-landmark]'), buttons = all('[data-jump]');
    const trigger = q('[data-toggle]'), returnButton = q('[data-return]'), menu = q('[data-menu]');
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    let open = false, selected = null, bookmark = null;
    const position = node => node.getBoundingClientRect().top - pane.getBoundingClientRect().top + pane.scrollTop;
    function disclose(value) {
      open = value; menu.dataset.open = String(value); menu.inert = !value;
      menu.setAttribute('aria-hidden', String(!value)); trigger.setAttribute('aria-expanded', String(value));
    }
    function jump(index) {
      if (!alive || !Number.isInteger(index) || !sections[index]) return false;
      bookmark = pane.scrollTop; selected = index; disclose(false); returnButton.disabled = false;
      current(buttons, buttons[index], 'aria-current', 'location');
      focus(sections[index].querySelector('h3'));
      pane.scrollTo({ top: position(sections[index]), behavior: motion.matches ? 'instant' : 'smooth' });
      emit(); return true;
    }
    function back() {
      if (!alive || bookmark === null) return false;
      pane.scrollTo({ top: bookmark, behavior: motion.matches ? 'instant' : 'smooth' });
      bookmark = null; selected = null; returnButton.disabled = true;
      current(buttons, null); focus(trigger); emit(); return true;
    }
    on(trigger, 'click', () => disclose(!open));
    on(trigger, 'keydown', event => { if (event.key === 'ArrowDown') { event.preventDefault(); disclose(true); focus(buttons[0]); } });
    buttons.forEach((button, i) => on(button, 'click', () => jump(i)));
    on(menu, 'keydown', event => moveFocus(event, buttons));
    on(returnButton, 'click', back);
    on(root, 'keydown', event => {
      if (event.key === 'Escape') {
        if (open) { event.preventDefault(); disclose(false); focus(trigger); }
        else if (bookmark !== null) { event.preventDefault(); back(); }
      }
    });
    on(root, 'focusout', event => { if (!root.contains(event.relatedTarget)) disclose(false); });
    on(motion, 'change', () => { if (motion.matches) pane.scrollTo({ top: pane.scrollTop, behavior: 'instant' }); });
    function resetView() { open = false; selected = null; bookmark = null; disclose(false); returnButton.disabled = true; current(buttons, null); pane.scrollTo({ top: 0, behavior: 'instant' }); }
    const readState = () => ({ selected, open, returnPosition: bookmark });
    const actions = { jump, back };
    cleanup = () => { disclose(false); pane.scrollTo({ top: pane.scrollTop, behavior: 'instant' }); };

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
