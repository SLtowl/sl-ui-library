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

    const destinations = [["Project brief","Projects / Product","Audience, goals and constraints for the product navigation."],["Interface study","Projects / Design","Compact controls and a complete keyboard route through every state."],["Content guide","Studio / Writing","Use short destination names and explain the result of each local action."],["Motion notes","Studio / Motion","Keep transitions reversible and stop optional movement when motion is reduced."],["Release review","Projects / Review","This batch is under local review and has not been published."]];
    const input = q('[data-search]'), buttons = all('[data-route]'), searchView = q('[data-search-view]'), detailView = q('[data-detail-view]');
    let selected = null, query = '';
    function filter() {
      const needle = query.trim().toLocaleLowerCase();
      buttons.forEach((button, i) => { button.hidden = !destinations[i].slice(0, 2).join(' ').toLocaleLowerCase().includes(needle); });
      const count = buttons.filter(button => !button.hidden).length;
      put('[data-count]', count + (count === 1 ? ' destination' : ' destinations'));
      q('[data-empty]').hidden = count > 0;
    }
    function navigate(index) {
      if (!alive || !Number.isInteger(index) || !destinations[index]) return false;
      selected = index; searchView.hidden = true; detailView.hidden = false;
      put('[data-title]', destinations[index][0]); put('[data-copy]', destinations[index][2]); put('[data-meta]', destinations[index][1]);
      focus(q('[data-back]')); emit(); return true;
    }
    function back() {
      if (!alive || selected === null) return false;
      const previous = selected; selected = null; searchView.hidden = false; detailView.hidden = true;
      focus(buttons[previous].hidden ? input : buttons[previous]); emit(); return true;
    }
    function setQuery(value) {
      if (!alive) return false;
      query = String(value); input.value = query; filter(); return true;
    }
    on(input, 'input', () => setQuery(input.value));
    on(input, 'keydown', event => {
      if (event.key === 'ArrowDown') { event.preventDefault(); focus(buttons.find(button => !button.hidden)); }
      if (event.key === 'Escape' && query) { event.preventDefault(); setQuery(''); }
    });
    on(q('[aria-label="Search results"]'), 'keydown', event => {
      moveFocus(event, buttons.filter(button => !button.hidden));
      if (event.key === 'Escape') { event.preventDefault(); focus(input); }
    });
    buttons.forEach((button, i) => on(button, 'click', () => navigate(i)));
    on(q('[data-back]'), 'click', back);
    on(detailView, 'keydown', event => { if (event.key === 'Escape' || (event.altKey && event.key === 'ArrowLeft')) { event.preventDefault(); back(); } });
    function resetView() { selected = null; query = ''; input.value = ''; searchView.hidden = false; detailView.hidden = true; filter(); q('.nv-results').scrollTop = 0; }
    const readState = () => ({ selected, query, results: buttons.filter(button => !button.hidden).map(button => Number(button.dataset.route)) });
    const actions = { navigate, back, setQuery };

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
