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
    const hex = q('.sl-hex'), picker = q('.sl-picker'), output = q('output');
    const initial = options.value ?? '#b6cbbb';
    const valid = value => /^#[0-9a-f]{6}$/i.test(value);
    if (typeof initial !== 'string' || !valid(initial)) throw new TypeError('value must be a six-digit hex color with a leading #.');
    let color = initial.toLowerCase();
    function read() { return { value: valid(hex.value) ? color : null, draft: hex.value, valid: valid(hex.value) }; }
    function render() { const state = read(); picker.style.setProperty('--chosen-color', color); hex.setAttribute('aria-invalid', String(!state.valid)); hex.setCustomValidity(state.valid ? '' : 'Enter # followed by six hexadecimal digits.'); output.textContent = state.valid ? color.toUpperCase() : 'Incomplete hex color'; qa('[data-color]').forEach(button => button.setAttribute('aria-pressed', String(state.valid && button.dataset.color === color))); message(state.valid ? 'Use # followed by six hexadecimal digits.' : 'Enter a complete color, such as #B6CBBB.', !state.valid); }
    on(hex, 'input', event => { if (event.isComposing || composing) return; if (valid(hex.value)) { color = hex.value.toLowerCase(); picker.value = color; } render(); emit(); });
    on(hex, 'compositionend', () => { if (valid(hex.value)) { color = hex.value.toLowerCase(); picker.value = color; } render(); emit(); });
    function set(value) { color = value.toLowerCase(); hex.value = color; picker.value = color; render(); }
    qa('[data-color]').forEach(button => on(button, 'click', () => { if (!writable(hex) || !writable(picker)) return; set(button.dataset.color); emit(); }));
    const dialog = createPicker(root, 'Color palette', on, options.disabled); dialog.bind(picker);
    const plane = doc.createElement('div'), thumb = doc.createElement('span');
    plane.className = 'sl-color-plane'; thumb.className = 'sl-color-thumb'; plane.append(thumb);
    plane.setAttribute('role', 'img'); plane.setAttribute('aria-label', 'Saturation and brightness. Keyboard controls are below.');
    const sliders = doc.createElement('div'); sliders.className = 'sl-color-sliders';
    const ranges = ['Hue', 'Saturation', 'Brightness'].map((name, index) => {
      const label = doc.createElement('label'), caption = doc.createElement('span'), range = doc.createElement('input');
      caption.textContent = name; range.type = 'range'; range.min = '0'; range.max = index ? '100' : '360'; range.step = '1'; range.dataset.channel = String(index); range.setAttribute('aria-label', name);
      label.append(caption, range); sliders.append(label); return range;
    });
    dialog.body.append(plane, sliders);
    const sample = doc.createElement('span'), apply = doc.createElement('button'); sample.className = 'sl-color-sample'; sample.setAttribute('aria-live', 'polite');
    apply.type = 'button'; apply.className = 'sl-primary'; apply.textContent = 'Apply color'; dialog.footer.append(sample, apply);
    let hsv = [0, 0, 0], draft = color, pointer = null;
    function fromHex(value) {
      const rgb = [1, 3, 5].map(offset => parseInt(value.slice(offset, offset + 2), 16) / 255), max = Math.max(...rgb), min = Math.min(...rgb), delta = max - min;
      let h = 0;
      if (delta) { const [r, g, b] = rgb; h = max === r ? ((g - b) / delta) % 6 : max === g ? (b - r) / delta + 2 : (r - g) / delta + 4; h = (h * 60 + 360) % 360; }
      return [h, max ? delta / max * 100 : 0, max * 100];
    }
    function toHex([h, s, v]) {
      s /= 100; v /= 100;
      const channel = n => { const k = (n + h / 60) % 6; return Math.round(255 * (v - v * s * Math.max(0, Math.min(k, 4 - k, 1)))).toString(16).padStart(2, '0'); };
      return '#' + channel(5) + channel(3) + channel(1);
    }
    function sync() {
      draft = toHex(hsv); sample.textContent = draft.toUpperCase(); sample.style.setProperty('--chosen-color', draft);
      plane.style.setProperty('--hue', String(hsv[0])); thumb.style.left = hsv[1] + '%'; thumb.style.top = (100 - hsv[2]) + '%';
      ranges.forEach((range, index) => { range.value = String(Math.round(hsv[index])); range.setAttribute('aria-valuetext', String(Math.round(hsv[index])) + (index ? '%' : '°')); });
    }
    on(picker, 'click', () => { if (!writable(hex)) return; hsv = fromHex(color); sync(); dialog.open(picker, ranges[0]); });
    ranges.forEach((range, index) => on(range, 'input', () => { if (!writable(range)) return; hsv[index] = Number(range.value); sync(); }));
    function position(event) { const r = plane.getBoundingClientRect(); hsv[1] = Math.max(0, Math.min(100, (event.clientX - r.left) / r.width * 100)); hsv[2] = Math.max(0, Math.min(100, 100 - (event.clientY - r.top) / r.height * 100)); sync(); }
    on(plane, 'pointerdown', event => { if (!writable(hex) || event.button !== 0 || pointer !== null) return; event.preventDefault(); pointer = event.pointerId; plane.setPointerCapture(pointer); position(event); });
    on(plane, 'pointermove', event => { if (event.pointerId === pointer) position(event); });
    function release() { if (pointer !== null && plane.hasPointerCapture(pointer)) plane.releasePointerCapture(pointer); pointer = null; }
    on(plane, 'pointerup', release); on(plane, 'pointercancel', release); on(plane, 'lostpointercapture', () => { pointer = null; });
    on(apply, 'click', () => { if (!writable(hex)) return; set(draft); emit(); dialog.close(); });
    return finish(() => { release(); dialog.close(); set(initial); hsv = fromHex(initial); sync(); }, () => { release(); dialog.destroy(); });
  }
  function mountPreview(root) {
    return mount(root);
  }
  window.SLComponent = { mount, mountPreview };
})();
