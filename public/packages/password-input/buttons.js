/* Standalone controller. No runtime dependencies. */
(() => {
const mounted = new WeakMap();
let nextListId = 0;

function mountField(root, expectedType, enhance = () => ({})) {
  if (mounted.has(root)) return mounted.get(root);
  const input = root?.querySelector('input, textarea');
  const nativeType = input?.tagName === 'TEXTAREA' ? 'textarea' : input?.type;
  if (!input || nativeType !== expectedType) throw new TypeError(`A native ${expectedType} control is required.`);
  const doc = root.ownerDocument, view = doc.defaultView;
  const lifecycle = new view.AbortController();
  const resets = [], cleanups = [];
  let destroyed = false;
  const on = (target, type, callback, options = {}) => target.addEventListener(type, callback, { ...options, signal: lifecycle.signal });
  const enhancement = enhance({ root, input, doc, view, on, resets, cleanups, alive: () => !destroyed });
  if (input.form) on(input.form, 'reset', event => queueMicrotask(() => { if (!destroyed && !event.defaultPrevented) resets.forEach(reset => reset()); }));
  const controller = {
    reset() { if (destroyed) return; input.value = input.defaultValue; resets.forEach(reset => reset()); },
    destroy() { if (destroyed) return; destroyed = true; lifecycle.abort(); cleanups.forEach(cleanup => cleanup()); mounted.delete(root); },
  };
  Object.defineProperties(controller, Object.getOwnPropertyDescriptors(enhancement));
  mounted.set(root, controller);
  return controller;
}

function mountPasswordField(root) {
  return mountField(root, 'password', ({ root, input, doc, on, resets, cleanups, alive }) => {
    const reveal = root.querySelector('.sl-field__reveal');
    if (!reveal) throw new TypeError('Password needs its reveal button.');
    let visible = false;
    function setVisible(value) {
      if (!alive()) return;
      const focused = doc.activeElement === input || root.getRootNode().activeElement === input;
      const start = input.selectionStart, end = input.selectionEnd, direction = input.selectionDirection, scroll = input.scrollLeft;
      visible = Boolean(value); input.type = visible ? 'text' : 'password'; root.dataset.visible = String(visible);
      reveal.setAttribute('aria-pressed', String(visible)); reveal.setAttribute('aria-label', visible ? 'Hide password' : 'Show password');
      if (focused) input.focus({ preventScroll: true });
      if (start !== null && end !== null) input.setSelectionRange(start, end, direction);
      input.scrollLeft = scroll;
    }
    on(reveal, 'pointerdown', event => { if (event.button === 0 && (doc.activeElement === input || root.getRootNode().activeElement === input)) event.preventDefault(); });
    on(reveal, 'click', () => { if (!input.disabled) setVisible(!visible); });
    reveal.disabled = input.disabled;
    resets.push(() => setVisible(false));
    cleanups.push(() => { visible = false; input.type = 'password'; root.dataset.visible = 'false'; reveal.setAttribute('aria-pressed', 'false'); reveal.setAttribute('aria-label', 'Show password'); reveal.disabled = true; });
    return { setVisible, get isVisible() { return visible; } };
  });
}


window.MattePasswordInput = { mount: mountPasswordField };
})();
