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

    const pages = [["Home","Your studio links and recent project destinations."],["Brief","The navigation brief calls for clear labels and predictable return paths."],["Design","The current study explores compact navigation in a 320 pixel preview."],["Review","Review keyboard access, focus restoration and narrow layouts."]];
    const buttons = all('[data-route]'), previous = q('[data-back]'), next = q('[data-forward]');
    let entries = [0], cursor = 0;
    function paint() {
      current(buttons, buttons[entries[cursor]]);
      put('[data-title]', pages[entries[cursor]][0]); put('[data-copy]', pages[entries[cursor]][1]);
      put('[data-meta]', 'Visit ' + (cursor + 1) + ' of ' + entries.length);
      put('[data-history]', entries.map((id, i) => (i === cursor ? '[' + pages[id][0] + ']' : pages[id][0])).join(' / '));
      previous.disabled = cursor === 0; next.disabled = cursor === entries.length - 1;
    }
    function navigate(index) {
      if (!alive || !Number.isInteger(index) || !pages[index] || entries[cursor] === index) return false;
      entries = entries.slice(0, cursor + 1); entries.push(index);
      if (entries.length > 20) entries.shift();
      cursor = entries.length - 1; paint(); emit(); return true;
    }
    function travel(delta) {
      if (!alive || cursor + delta < 0 || cursor + delta >= entries.length) return false;
      cursor += delta; paint();
      if (active()?.disabled) focus(buttons[entries[cursor]]);
      emit(); return true;
    }
    buttons.forEach((button, i) => on(button, 'click', () => navigate(i)));
    on(previous, 'click', () => travel(-1)); on(next, 'click', () => travel(1));
    on(root, 'keydown', event => {
      if (event.altKey && ['ArrowLeft', 'ArrowRight'].includes(event.key)) {
        event.preventDefault(); travel(event.key === 'ArrowLeft' ? -1 : 1);
      }
    });
    function resetView() { entries = [0]; cursor = 0; paint(); }
    const readState = () => ({ selected: entries[cursor], entries: [...entries], cursor });
    const actions = { navigate, back: () => travel(-1), forward: () => travel(1) };

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
