(() => {
  'use strict';
  // Each export owns this small picker shell: no portals or document-wide dialog.
  function createPicker(root, title, on, disabled) {
    const doc = root.ownerDocument;
    const panel = doc.createElement('div'), header = doc.createElement('div'), heading = doc.createElement('strong'), dismiss = doc.createElement('button');
    panel.className = 'sl-picker-panel'; panel.id = 'picker-' + doc.defaultView.crypto.randomUUID();
    panel.setAttribute('role', 'dialog'); panel.setAttribute('aria-label', title); panel.setAttribute('aria-hidden', 'true'); panel.inert = true;
    header.className = 'sl-picker-header'; heading.textContent = title;
    dismiss.type = 'button'; dismiss.textContent = '×'; dismiss.setAttribute('aria-label', 'Close picker');
    header.append(heading, dismiss);
    const body = doc.createElement('div'), footer = doc.createElement('div');
    body.className = 'sl-picker-body'; footer.className = 'sl-picker-footer'; panel.append(header, body, footer); root.append(panel);
    let opened = false, trigger = null, siblings = [];
    const triggers = new Set();
    function close(focus = true) {
      if (!opened) return;
      opened = false; panel.dataset.open = 'false'; panel.inert = true; panel.setAttribute('aria-hidden', 'true');
      siblings.forEach(([node, inert]) => { node.inert = inert; }); siblings = [];
      trigger?.setAttribute('aria-expanded', 'false');
      if (focus && trigger?.isConnected && !trigger.disabled) trigger.focus();
    }
    function bind(button) { triggers.add(button); button.setAttribute('aria-haspopup', 'dialog'); button.setAttribute('aria-expanded', 'false'); button.setAttribute('aria-controls', panel.id); }
    function open(button, focusNode) {
      if (disabled || button.disabled) return;
      close(false); trigger = button; bind(button); opened = true;
      panel.dataset.open = 'true'; panel.inert = false; panel.setAttribute('aria-hidden', 'false'); button.setAttribute('aria-expanded', 'true');
      (focusNode || dismiss).focus({ preventScroll: true });
      siblings = [...root.children].filter(node => node !== panel).map(node => [node, node.inert]);
      siblings.forEach(([node]) => { node.inert = true; });
    }
    on(dismiss, 'click', () => close());
    on(panel, 'keydown', event => {
      if (event.key === 'Escape') { event.preventDefault(); event.stopPropagation(); close(); }
      if (event.key !== 'Tab') return;
      const all = [...panel.querySelectorAll('button, input, [tabindex]')].filter(node => !node.disabled && node.tabIndex >= 0 && node.checkVisibility());
      const first = all[0], last = all[all.length - 1], active = root.getRootNode().activeElement;
      if (event.shiftKey && active === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && active === last) { event.preventDefault(); first?.focus(); }
    });
    on(doc, 'pointerdown', event => { if (opened && !event.composedPath().includes(root)) close(false); });
    return { body, footer, panel, heading, bind, open, close, get isOpen() { return opened; },
      destroy() { close(); triggers.forEach(button => { button.removeAttribute('aria-controls'); button.setAttribute('aria-expanded', 'false'); }); panel.remove(); } };
  }
  function mount(root, options = {}) {
    if (!root || !root.matches('.sl-component')) throw new TypeError('A .sl-component root is required.');
    const doc = root.ownerDocument, view = doc.defaultView;
    root.dispatchEvent(new view.Event('sl:inputs-remount'));
    const lifecycle = new view.AbortController();
    let destroyed = false, composing = false;
    const q = selector => root.querySelector(selector);
    const qa = selector => [...root.querySelectorAll(selector)];
    const on = (target, type, handler) => target.addEventListener(type, handler, { signal: lifecycle.signal });
    const active = () => root.getRootNode().activeElement;
    const writable = element => !destroyed && !options.disabled && !element?.disabled && !element?.readOnly;
    const initialDisabled = qa('input, select, button').map(element => [element, element.disabled]);
    const initialValidity = qa('input, select').map(element => [element, element.validity.customError ? element.validationMessage : '']);
    const ids = new Map();
    qa('[id]').forEach(element => { const original = element.dataset.slId || element.id; element.dataset.slId = original; const id = original + '-' + view.crypto.randomUUID(); ids.set(element.id, id); element.id = id; });
    qa('[for], [aria-describedby], [aria-controls], [aria-labelledby]').forEach(element => {
      ['for', 'aria-describedby', 'aria-controls', 'aria-labelledby'].forEach(name => {
        if (element.hasAttribute(name)) element.setAttribute(name, element.getAttribute(name).split(' ').map(id => ids.get(id) || id).join(' '));
      });
    });
    const status = q('.sl-status');
    function message(text, invalid = false) { status.textContent = text; root.dataset.invalid = String(invalid); }
    let lastEmission, lastFile;
    function checkpoint() { const state = read(); lastEmission = JSON.stringify(state); lastFile = state.file; }
    function emit() {
      const state = read();
      const signature = JSON.stringify(state);
      if (signature === lastEmission && state.file === lastFile) return;
      lastEmission = signature; lastFile = state.file;
      root.dispatchEvent(new view.CustomEvent('sl:change', { bubbles: true, composed: true, detail: state }));
      if (typeof options.onChange === 'function') options.onChange(state);
    }
    function finish(reset, cleanup = () => {}) {
      function destroy() {
        if (destroyed) return;
        destroyed = true; lifecycle.abort(); cleanup();
        initialValidity.forEach(([element, message]) => element.setCustomValidity(message));
        initialDisabled.forEach(([element, disabled]) => { element.disabled = disabled; });
      }
      on(root, 'sl:inputs-remount', destroy);
      on(root, 'compositionstart', () => { composing = true; });
      on(root, 'compositionend', () => { composing = false; });
      const form = root.closest('form');
      if (form) on(form, 'reset', event => view.queueMicrotask(() => { if (!destroyed && !event.defaultPrevented) { composing = false; reset(); checkpoint(); } }));
      reset(); checkpoint();
      if (options.disabled) qa('input, select, button').forEach(element => { element.disabled = true; });
      return { reset() { if (!destroyed) { composing = false; reset(); checkpoint(); if (options.disabled) qa('input, select, button').forEach(element => { element.disabled = true; }); } }, destroy, get state() { return read(); } };
    }
    const input = q('input'), remove = q('.sl-remove-file'), name = q('.sl-file-name'), size = q('.sl-file-size');
    const demo = options.demo === true, trigger = q('.sl-demo-choose'), realControl = q('.sl-real-file'), demoControl = q('.sl-demo-file');
    realControl.hidden = demo; demoControl.hidden = !demo;
    const picker = createPicker(root, 'Demo files', on, options.disabled); picker.bind(trigger);
    const samples = [
      { name: 'Project brief.txt', type: 'text/plain', content: 'Sample project brief. This document exists only in memory.' },
      { name: 'Research notes.md', type: 'text/markdown', content: '# Sample research notes\n\nNo files from your computer are used.' },
      { name: 'Release checklist.txt', type: 'text/plain', content: 'Sample checklist\nReview components\nCheck keyboard controls' }
    ];
    const list = doc.createElement('div'); list.className = 'sl-demo-files';
    samples.forEach((sample, index) => { const button = doc.createElement('button'), label = doc.createElement('span'), description = doc.createElement('small'); button.type = 'button'; button.dataset.sample = String(index); label.textContent = sample.name; description.textContent = 'Sample · stored in memory'; button.append(label, description); list.append(button); });
    picker.body.append(list);
    let file = null, valid = true;
    function read() { return { file, valid, value: file ? { name: file.name, size: file.size, type: file.type, lastModified: file.lastModified } : null }; }
    function clear(focus = false) { input.value = ''; file = null; valid = true; input.removeAttribute('aria-invalid'); input.setCustomValidity(''); remove.disabled = true; name.textContent = 'No file selected'; size.textContent = demo ? 'Built-in samples. No computer files.' : 'PDF, TXT or MD · up to 5 MiB'; message(demo ? 'Demo only. Choose a sample document.' : 'Local selection only. Nothing is uploaded or read.'); if (focus) (demo ? trigger : input).focus(); }
    on(input, 'change', () => { file = input.files[0] ?? null; if (!file) { clear(); emit(); return; } valid = /\.(pdf|txt|md)$/i.test(file.name) && file.size <= 5 * 1024 * 1024; input.setAttribute('aria-invalid', String(!valid)); input.setCustomValidity(valid ? '' : 'Choose a PDF, TXT or MD file no larger than 5 MiB.'); name.textContent = file.name; size.textContent = file.size.toLocaleString('en-US') + ' bytes'; remove.disabled = Boolean(options.disabled); message(valid ? 'Selected locally. Nothing is uploaded or read.' : 'Choose a PDF, TXT or MD file no larger than 5 MiB.', !valid); emit(); });
    on(remove, 'click', () => { if (!writable(input)) return; clear(true); emit(); });
    on(trigger, 'click', () => { if (demo && writable(trigger)) picker.open(trigger, list.querySelector('button')); });
    on(list, 'click', event => {
      const button = event.target.closest('[data-sample]'); if (!demo || !button || !writable(trigger)) return;
      const sample = samples[Number(button.dataset.sample)];
      file = new view.File([sample.content], sample.name, { type: sample.type, lastModified: 0 }); valid = true;
      name.textContent = file.name; size.textContent = file.size.toLocaleString('en-US') + ' bytes';
      remove.disabled = Boolean(options.disabled); message('Demo file selected. Nothing is read or uploaded.'); emit(); picker.close();
    });
    on(input, 'click', event => { if (demo) event.preventDefault(); });
    return finish(() => { picker.close(); clear(); }, () => { file = null; picker.destroy(); realControl.hidden = false; demoControl.hidden = true; });
  }
  function mountPreview(root) {
    return mount(root, { demo: true });
  }
  window.SLComponent = { mount, mountPreview };
})();
