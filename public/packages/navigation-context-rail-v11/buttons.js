(() => {
  'use strict';
  // Styled listbox with a hidden native value carrier for form/controller compatibility.
  function bindChoice(root, select, on) {
    const wrap = select.closest('.sl-choice'), trigger = wrap.querySelector('.sl-choice-trigger'), label = wrap.querySelector('.sl-choice-value');
    const list = wrap.querySelector('.sl-choice-list'), buttons = [...wrap.querySelectorAll('[data-choice]')];
    let opened = false;
    function sync() {
      const selected = buttons.find(button => button.dataset.choice === select.value);
      if (selected) label.textContent = selected.textContent;
      trigger.disabled = select.disabled;
      buttons.forEach(button => { const active = button === selected; button.setAttribute('aria-selected', String(active)); button.tabIndex = active ? 0 : -1; });
      if (select.disabled) close(false);
    }
    function close(focus = true) {
      if (!opened) return; opened = false; trigger.setAttribute('aria-expanded', 'false');
      if (focus) trigger.focus({ preventScroll: true });
      wrap.dataset.expanded = 'false'; list.inert = true; list.setAttribute('aria-hidden', 'true');
    }
    function open() {
      if (select.disabled || opened) return; sync(); opened = true;
      wrap.dataset.expanded = 'true'; list.inert = false; list.setAttribute('aria-hidden', 'false'); trigger.setAttribute('aria-expanded', 'true');
      const boundary = select.closest('.ov-body') || root, bounds = boundary.getBoundingClientRect(), anchor = trigger.getBoundingClientRect();
      const below = bounds.bottom - anchor.bottom - 8, above = anchor.top - bounds.top - 8;
      wrap.dataset.up = String(below < Math.min(164, list.scrollHeight) && above > below);
      list.style.maxHeight = Math.max(48, Math.min(164, wrap.dataset.up === 'true' ? above : below)) + 'px';
      const selected = buttons.find(button => button.dataset.choice === select.value) || buttons.find(button => !button.disabled);
      selected?.focus({ preventScroll: true }); if (selected) list.scrollTop = Math.max(0, selected.offsetTop - list.clientHeight / 2);
    }
    on(trigger, 'click', () => opened ? close() : open());
    on(trigger, 'keydown', event => { if (['ArrowDown', 'ArrowUp'].includes(event.key)) { event.preventDefault(); event.stopPropagation(); open(); } });
    buttons.forEach(button => on(button, 'click', event => {
      event.preventDefault(); if (select.disabled || button.disabled) return;
      const changed = select.value !== button.dataset.choice; select.value = button.dataset.choice; sync(); close();
      if (changed) select.dispatchEvent(new select.ownerDocument.defaultView.Event('change', { bubbles: true, composed: true }));
    }));
    on(wrap, 'keydown', event => {
      if (!opened) return;
      if (event.key === 'Escape') { event.preventDefault(); event.stopPropagation(); close(); return; }
      if (event.key === 'Tab') { close(false); return; }
      if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault(); event.stopPropagation();
      const enabled = buttons.filter(button => !button.disabled), current = enabled.indexOf(root.getRootNode().activeElement);
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? enabled.length - 1 : (current + (event.key === 'ArrowDown' ? 1 : enabled.length - 1)) % enabled.length;
      enabled.forEach((button, i) => { button.tabIndex = i === next ? 0 : -1; }); enabled[next]?.focus({ preventScroll: true }); if (enabled[next]) list.scrollTop = Math.max(0, enabled[next].offsetTop - list.clientHeight / 2);
    });
    on(select, 'change', sync);
    on(root.ownerDocument, 'pointerdown', event => { if (opened && !event.composedPath().includes(wrap)) close(false); });
    on(wrap, 'focusout', event => { if (opened && event.relatedTarget && !wrap.contains(event.relatedTarget)) close(false); });
    sync(); list.inert = true; list.setAttribute('aria-hidden', 'true');
    return { sync, close, destroy() { close(false); } };
  }
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

    const contexts = [{"name":"Document","items":[["Text","Project brief","The brief describes the audience, constraints and navigation goals."],["Outline","Document outline","Purpose / User routes / Keyboard behavior / Review checklist."],["Links","Document links","Two related resources: Interface study and Content guide."]]},{"name":"Collection","items":[["Items","Design collection","Three items: Brand guide, Interface study and Motion notes."],["Members","Collection members","Alex and Sam maintain this shared collection."],["Activity","Collection activity","Motion notes joined the collection in the latest local review."]]}];
    const picker = q('[data-context]'), buttons = all('[data-section]');
    const choiceUI = bindChoice(root, picker, on); cleanup = () => choiceUI.destroy();
    let context = 0, selected = [0, 0];
    function paint() {
      picker.value = String(context);
      choiceUI.sync();
      buttons.forEach((button, i) => { button.querySelector('[data-section-label]').textContent = contexts[context].items[i][0]; });
      current(buttons, buttons[selected[context]]);
      const item = contexts[context].items[selected[context]];
      put('[data-meta]', contexts[context].name); put('[data-title]', item[1]); put('[data-copy]', item[2]);
    }
    function setContext(index) {
      if (!alive || !Number.isInteger(index) || !contexts[index] || index === context) return false;
      context = index; paint(); emit(); return true;
    }
    function navigate(index) {
      if (!alive || !Number.isInteger(index) || !contexts[context].items[index] || selected[context] === index) return false;
      selected[context] = index; paint(); emit(); return true;
    }
    on(picker, 'change', () => setContext(Number(picker.value)));
    buttons.forEach((button, i) => on(button, 'click', () => navigate(i)));
    on(q('nav'), 'keydown', event => moveFocus(event, buttons));
    function resetView() { choiceUI.close(false); context = 0; selected = [0, 0]; paint(); }
    const readState = () => ({ context, selected: selected[context], remembered: [...selected] });
    const actions = { navigate, setContext };

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
