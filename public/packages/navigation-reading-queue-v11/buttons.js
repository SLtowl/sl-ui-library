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

    const documents = [["Project brief","Audience and goals","Build a compact navigator for project material. Keep every route easy to identify."],["Keyboard guide","Focus and return","Reach all controls by keyboard. After a local jump, return focus to the original link."],["Review notes","Local review","Check small widths and reduced motion. This reading state is stored only in this preview."]];
    const buttons = all('[data-document]'), backButton = q('[data-back]'), completeButton = q('[data-complete]'), undoButton = q('[data-undo]');
    let selected = 0, read = [false, false, false], trail = [0], undo = [];
    function remember() {
      undo.push({ selected, read: [...read], trail: [...trail] });
      if (undo.length > 20) undo.shift();
    }
    function paint() {
      current(buttons, buttons[selected]);
      buttons.forEach((button, i) => { button.querySelector('[data-read-status]').textContent = read[i] ? 'Read' : 'Unread'; });
      put('[data-title]', documents[selected][1]); put('[data-copy]', documents[selected][2]); put('[data-meta]', 'Document ' + (selected + 1) + ' of 3');
      put('[data-progress]', read.filter(Boolean).length + ' of 3 read');
      completeButton.disabled = false; completeButton.textContent = read[selected] ? 'Mark unread' : 'Read & next';
      backButton.disabled = trail.length < 2; undoButton.disabled = undo.length === 0;
      undoButton.setAttribute('aria-label', 'Undo last reading change' + (undo.length ? ' (' + undo.length + ' available)' : ''));
    }
    function navigate(index) {
      if (!alive || !Number.isInteger(index) || !documents[index] || selected === index) return false;
      selected = index; trail.push(index); if (trail.length > 20) trail.shift(); paint(); emit(); return true;
    }
    function back() {
      if (!alive || trail.length < 2) return false;
      trail.pop(); selected = trail.at(-1); paint(); focus(buttons[selected]); emit(); return true;
    }
    function complete() {
      if (!alive || read[selected]) return false;
      remember(); read[selected] = true;
      const next = [1, 2].map(n => (selected + n) % 3).find(index => !read[index]);
      if (next !== undefined) { selected = next; trail.push(next); if (trail.length > 20) trail.shift(); }
      paint(); if (completeButton.disabled && active() === completeButton) focus(undoButton); emit(); return true;
    }
    function undoRead() {
      if (!alive || undo.length === 0) return false;
      const previous = undo.pop();
      selected = previous.selected; read = [...previous.read]; trail = [...previous.trail];
      paint(); focus(completeButton); emit(); return true;
    }
    function markUnread() {
      if (!alive || !read[selected]) return false;
      remember(); read[selected] = false; paint(); emit(); return true;
    }
    buttons.forEach((button, i) => on(button, 'click', () => navigate(i)));
    on(q('nav'), 'keydown', event => moveFocus(event, buttons));
    on(backButton, 'click', back); on(completeButton, 'click', () => read[selected] ? markUnread() : complete()); on(undoButton, 'click', undoRead);
    on(root, 'keydown', event => { if (event.altKey && event.key === 'ArrowLeft') { event.preventDefault(); back(); } });
    function resetView() { selected = 0; read = [false, false, false]; trail = [0]; undo = []; paint(); }
    const readState = () => ({ selected, read: [...read], trail: [...trail], canUndo: undo.length > 0, undoCount: undo.length });
    const actions = { navigate, back, complete, markUnread, undo: undoRead };

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
