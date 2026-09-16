(() => {
  'use strict';
  const previewItems = ['Project brief', 'Review notes', 'Release checklist'];

  function mount(root, options = {}) {
    if (!root?.matches('.sl-component')) throw new TypeError('Expected a .sl-component root.');
    const view = root.ownerDocument.defaultView;
    root.dispatchEvent(new view.Event('sl:buttons-remount'));
    const life = new view.AbortController();
    const button = root.querySelector('[data-action]');
    const input = root.querySelector('[data-search]');
    const clear = root.querySelector('[data-clear]');
    const results = root.querySelector('[data-results]');
    const panel = root.querySelector('[data-panel]');
    const status = root.querySelector('[data-status]');
    const items = Object.freeze((options.items ?? previewItems).map(value => String(value)));
    let open = false;
    let query = '';
    let matches = [...items];
    let destroyed = false;
    const listen = (target, type, fn) => target.addEventListener(type, fn, { signal: life.signal });
    const activeElement = () => root.getRootNode().activeElement;
    const snapshot = () => Object.freeze({ open, query, matches: Object.freeze([...matches]) });

    function renderResults() {
      results.replaceChildren();
      for (const value of matches) {
        const row = root.ownerDocument.createElement('li');
        const choice = root.ownerDocument.createElement('button');
        choice.type = 'button';
        choice.className = 'search-result';
        choice.dataset.result = value;
        choice.textContent = value;
        row.append(choice);
        results.append(row);
      }
      if (!matches.length) {
        const empty = root.ownerDocument.createElement('li');
        empty.className = 'search-empty';
        empty.textContent = 'No matches';
        results.append(empty);
      }
    }

    function updateMatches() {
      const needle = query.trim().toLocaleLowerCase();
      matches = items.filter(value => value.toLocaleLowerCase().includes(needle));
      renderResults();
      clear.hidden = query.length === 0;
      if (open) status.textContent = `${matches.length} ${matches.length === 1 ? 'result' : 'results'}.`;
    }

    function renderOpen() {
      root.dataset.active = String(open);
      button.setAttribute('aria-expanded', String(open));
      button.setAttribute('aria-label', open ? 'Close search' : 'Open search');
      panel.setAttribute('aria-hidden', String(!open));
      panel.inert = !open;
      if (!open) status.textContent = 'Search is closed.';
      else updateMatches();
    }

    function emitChange() {
      const state = snapshot();
      options.onChange?.(state);
      root.dispatchEvent(new view.CustomEvent('sl:action', { bubbles: true, composed: true, detail: { kind: root.dataset.kind, ...state } }));
    }

    function setOpen(value, emit = false, focus = false) {
      const next = Boolean(value);
      if (destroyed || next === open) return false;
      open = next;
      renderOpen();
      if (open && focus) input.focus();
      if (!open && activeElement() !== button) button.focus();
      if (emit) emitChange();
      return true;
    }

    function setQuery(value, emit = false) {
      if (destroyed) return false;
      const next = String(value);
      if (next === query) return false;
      query = next;
      input.value = query;
      updateMatches();
      if (emit) emitChange();
      return true;
    }

    function choose(value) {
      if (destroyed || !items.includes(value)) return false;
      query = value;
      input.value = value;
      updateMatches();
      status.textContent = `Selected ${value}.`;
      input.focus();
      options.onSelect?.({ value });
      root.dispatchEvent(new view.CustomEvent('sl:search-select', { bubbles: true, composed: true, detail: { value } }));
      return true;
    }

    function reset() {
      if (destroyed) return;
      open = false;
      query = '';
      input.value = '';
      matches = [...items];
      clear.hidden = true;
      renderResults();
      renderOpen();
    }

    function destroy() {
      if (destroyed) return;
      reset();
      destroyed = true;
      life.abort();
    }

    listen(button, 'click', () => setOpen(!open, true, !open));
    listen(input, 'input', () => { query = input.value; updateMatches(); emitChange(); });
    listen(clear, 'click', () => { setQuery('', true); input.focus(); });
    listen(results, 'click', event => {
      const choice = event.target.closest('[data-result]');
      if (choice && results.contains(choice)) choose(choice.dataset.result);
    });
    listen(root, 'keydown', event => {
      if (event.key === 'Escape' && open) {
        event.preventDefault();
        setOpen(false, true);
      }
    });
    listen(root, 'sl:buttons-remount', destroy);
    reset();
    return {
      open: () => setOpen(true),
      close: () => setOpen(false),
      toggle: () => setOpen(!open),
      setQuery: value => setQuery(value),
      choose,
      reset,
      destroy,
      get state() { return snapshot(); },
    };
  }

  function mountPreview(root) { return mount(root, { items: previewItems }); }
  window.SLComponent = { mount, mountPreview };
})();
