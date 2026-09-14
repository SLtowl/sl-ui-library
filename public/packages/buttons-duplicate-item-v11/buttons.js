(() => {
  'use strict';
  function mount(root, options = {}) {
    if (!root?.matches('.sl-component')) throw new TypeError('Expected a .sl-component root.');
    function validItem(item) {
      return item && ['id', 'label'].every(key => typeof item[key] === 'string' && item[key].trim().length > 0 && item[key].length <= 160);
    }
    const initial = options.item ?? { id: 'project-brief', label: 'Project brief' };
    if (!validItem(initial)) throw new TypeError('item needs a non-empty id and label, each up to 160 characters.');
    const source = { id: initial.id, label: initial.label };
    const view = root.ownerDocument.defaultView;
    root.dispatchEvent(new view.Event('sl:buttons-remount'));
    const life = new view.AbortController();
    const $ = selector => root.querySelector(selector);
    const listen = (target, type, fn) => target.addEventListener(type, fn, { signal: life.signal });
    const active = () => root.getRootNode().activeElement;
    const button = $('[data-run]'), status = $('[data-status]'), note = $('[data-note]');
    const originalNote = note.textContent;
    let phase = 'idle', copies = 0, lastCreated = null, request = null, revision = 0, destroyed = false;
    function announce(message) { status.textContent = message; }
    function emit() {
      root.dispatchEvent(new view.CustomEvent('sl:action', { bubbles: true, composed: true, detail: { kind: root.dataset.kind, phase, copies, item: lastCreated ? { ...lastCreated } : null } }));
    }
    function render() {
      root.dataset.phase = phase; root.setAttribute('aria-busy', String(phase === 'pending'));
      button.setAttribute('aria-disabled', String(phase === 'pending'));
      $('[data-run-label]').textContent = phase === 'pending' ? 'Duplicating…' : phase === 'error' ? 'Try again' : phase === 'complete' ? 'Duplicate again' : 'Duplicate';
      $('[data-cancel]').hidden = phase !== 'pending';
      $('[data-source]').textContent = source.label;
      $('[data-created]').textContent = lastCreated?.label ?? '';
      $('[data-result]').dataset.open = String(!!lastCreated);
      $('[data-result]').setAttribute('aria-hidden', String(!lastCreated));
      $('[data-result]').inert = !lastCreated;
    }
    function abortWork() { revision++; const pending = request; request = null; pending?.abort(); }
    function settle(next, message) {
      const restore = active() === $('[data-cancel]');
      phase = next; render(); if (restore) button.focus(); announce(message);
    }
    function cancel() {
      if (destroyed || phase !== 'pending') return false;
      abortWork(); settle('canceled', copies ? 'Request canceled. The last confirmed copy is kept.' : 'Request canceled. No copy confirmed.'); emit(); return true;
    }
    async function start() {
      if (destroyed || phase === 'pending') return false;
      if (typeof options.onDuplicate !== 'function') {
        settle('error', 'Connect onDuplicate before creating a copy.'); return false;
      }
      const token = ++revision;
      request = new view.AbortController();
      const signal = request.signal;
      settle('pending', 'Creating a copy…');
      try {
        const item = await options.onDuplicate({ source: { ...source }, copyNumber: copies + 1, signal });
        if (destroyed || token !== revision) return false;
        if (item?.status === 'canceled') { cancel(); return false; }
        if (!validItem(item) || item.id === source.id || item.id === lastCreated?.id) throw new TypeError('Return a new item with its own id and label.');
        lastCreated = { id: item.id, label: item.label }; copies++; request = null;
        settle('complete', copies === 1 ? '1 copy created. Original unchanged.' : copies + ' copies created. Showing the latest.');
        emit(); return true;
      } catch (error) {
        if (destroyed || token !== revision) return false;
        request = null;
        settle(error?.name === 'AbortError' ? 'canceled' : 'error', error?.name === 'AbortError' ? 'Request canceled.' : 'Could not create a copy. Try again.');
        emit(); return false;
      }
    }
    function reset() {
      if (destroyed) return;
      abortWork(); copies = 0; lastCreated = null;
      settle('idle', 'Create a copy. Keep the original.');
    }
    function destroy() {
      if (destroyed) return;
      reset(); destroyed = true; life.abort(); note.textContent = originalNote;
    }
    listen(button, 'click', start);
    listen($('[data-cancel]'), 'click', cancel);
    listen(root, 'keydown', event => {
      if (event.key === 'Escape' && phase === 'pending') { event.preventDefault(); event.stopPropagation(); cancel(); }
    });
    listen(root, 'sl:buttons-remount', destroy);
    reset();
    note.textContent = 'Connect this button to your own duplicate operation.';
    return { start, cancel, reset, destroy, get state() { return { phase, copies, source: { ...source }, lastCreated: lastCreated ? { ...lastCreated } : null }; } };
  }
  function mountPreview(root) {
    const controller = mount(root, {
      onDuplicate: ({ source, copyNumber, signal }) => new Promise((resolve, reject) => {
        const view = root.ownerDocument.defaultView;
        const abort = () => { view.clearTimeout(timer); reject(new view.DOMException('Canceled', 'AbortError')); };
        const timer = view.setTimeout(() => {
          signal.removeEventListener('abort', abort);
          resolve({ id: source.id + '-copy-' + copyNumber, label: source.label + ' — copy ' + copyNumber });
        }, 260);
        if (signal.aborted) abort(); else signal.addEventListener('abort', abort, { once: true });
      })
    });
    root.querySelector('[data-note]').textContent = 'Local demo · no files are created.';
    return controller;
  }
  window.SLComponent = { mount, mountPreview };
})();
