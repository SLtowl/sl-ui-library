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

    const rooms = [["Entrance","Arrival point","The entrance connects the shared library and the design studio."],["Studio","Design studio","Six workspaces and a large review table. Enter through the central corridor."],["Library","Reference library","Material samples and printed guides. Return to the entrance through the corridor."]], buttons = all('[data-room]'), shapes = all('[data-room-shape]'), backButton = q('[data-back]');
    let selected = 0, trail = [0];
    function paint() {
      current(buttons, buttons[selected], 'aria-current', 'location');
      shapes.forEach((shape, i) => { shape.dataset.current = String(i === selected); });
      put('[data-meta]', rooms[selected][0]); put('[data-title]', rooms[selected][1]); put('[data-copy]', rooms[selected][2]);
      backButton.disabled = trail.length === 1;
    }
    function navigate(index) {
      if (!alive || !Number.isInteger(index) || !rooms[index] || selected === index) return false;
      selected = index; trail.push(index); if (trail.length > 20) trail.shift(); paint(); emit(); return true;
    }
    function back() {
      if (!alive || trail.length === 1) return false;
      trail.pop(); selected = trail.at(-1); paint(); focus(buttons[selected]); emit(); return true;
    }
    const neighbors = [{ ArrowRight: 1, ArrowUp: 1, ArrowDown: 2 }, { ArrowLeft: 0, ArrowDown: 2 }, { ArrowLeft: 0, ArrowUp: 1 }];
    buttons.forEach((button, i) => {
      on(button, 'click', () => navigate(i));
      on(button, 'keydown', event => {
        if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'].includes(event.key)) return;
        event.preventDefault(); const next = event.key === 'Home' ? 0 : event.key === 'End' ? 2 : neighbors[i][event.key] ?? i;
        navigate(next); focus(buttons[next]);
      });
    });
    on(backButton, 'click', back);
    on(root, 'keydown', event => { if (event.key === 'Escape' && trail.length > 1) { event.preventDefault(); back(); } });
    function resetView() { selected = 0; trail = [0]; paint(); }
    const readState = () => ({ selected, trail: [...trail] });
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
