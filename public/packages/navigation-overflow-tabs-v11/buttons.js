(() => {
  'use strict';
  function mount(root, options = {}) {
    if (!root?.matches('.sl-component')) throw new TypeError('A .sl-component root is required.');
    root.dispatchEvent(new CustomEvent('sl-navigation:remount'));
    const life = new AbortController();
    let alive = true, selected = 0;
    const q = selector => root.querySelector(selector);
    const tabs = [...root.querySelectorAll('[data-tab]')];
    const panel = q('[role=tabpanel]');
    const on = (node, type, handler) => node.addEventListener(type, handler, { signal: life.signal });
    const active = () => root.getRootNode().activeElement;
    const focus = node => node.focus({ preventScroll: true });
    const token = 'nav-' + crypto.randomUUID();
    panel.id = token + '-panel';
    tabs.forEach((tab, i) => { tab.id = token + '-' + i; tab.setAttribute('aria-controls', panel.id); });
    const pages = [
      ['Project overview', 'Three active milestones. The interface review is next.'],
      ['Project files', 'Brief.pdf, Interface.fig and Handoff.md are ready to review.'],
      ['Working notes', 'Keep the search visible. Restore the last open section.'],
      ['Project people', 'Alex leads design. Sam handles engineering. Jules reviews content.'],
      ['Recent activity', 'Sam added the handoff notes. Alex updated the navigation study.'],
      ['Project settings', 'This project uses a private workspace and a weekly review cycle.']
    ];
    const readState = () => ({ selected });
    function paint() {
      tabs.forEach((tab, i) => {
        tab.setAttribute('aria-selected', String(selected === i));
        tab.tabIndex = selected === i ? 0 : -1;
      });
      panel.setAttribute('aria-labelledby', tabs[selected].id);
      q('[data-meta]').textContent = 'Section ' + (selected + 1) + ' of 6';
      q('[data-title]').textContent = pages[selected][0];
      q('[data-copy]').textContent = pages[selected][1];
    }
    function navigate(index) {
      if (!alive || !Number.isInteger(index) || !pages[index]) return false;
      const changed = selected !== index;
      selected = index; paint();
      if (changed) {
        const detail = { kind: root.dataset.kind, ...readState() };
        root.dispatchEvent(new CustomEvent('sl-navigate', { detail, bubbles: true, composed: true }));
        options.onNavigate?.(detail);
      }
      return true;
    }
    tabs.forEach((tab, i) => on(tab, 'click', () => navigate(i)));
    on(q('[role=tablist]'), 'keydown', event => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      navigate(event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1
        : (selected + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length);
      focus(tabs[selected]);
    });
    function reset() {
      if (!alive) return;
      const restoreFocus = tabs.includes(active());
      selected = 0; paint();
      if (restoreFocus) focus(tabs[0]);
    }
    function destroy() {
      if (!alive) return;
      alive = false; life.abort();
    }
    on(root, 'sl-navigation:remount', destroy);
    reset();
    return { navigate, reset, destroy, get state() { return readState(); } };
  }
  function mountPreview(root) { return mount(root); }
  window.SLComponent = { mount, mountPreview };
})();
