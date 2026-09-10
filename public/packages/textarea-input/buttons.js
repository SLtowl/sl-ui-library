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

function mountTextareaField(root) {
  return mountField(root, 'textarea', ({ input, root, view, on, resets, cleanups }) => {
    const control = root.querySelector('.sl-field__control');
    const count = root.querySelector('[data-count]');
    const helper = root.querySelector('.sl-field__helper');
    if (!control || !count || !helper) throw new TypeError('Textarea needs a control, counter and helper.');
    const initialHelper = helper.textContent;
    const limit = input.maxLength > 0 ? input.maxLength : null;
    function resize() {
      input.style.height = '0px';
      const contentHeight = input.scrollHeight;
      const height = input.value ? Math.max(60, Math.min(180, contentHeight)) : 60;
      input.style.height = '100%';
      input.style.overflowY = contentHeight > 180 ? 'auto' : 'hidden';
      control.style.height = `${height}px`;
    }
    function update() {
      const length = [...input.value].length;
      count.textContent = String(length);
      helper.textContent = limit && length >= limit ? `Character limit reached: ${limit}.` : initialHelper;
      resize();
    }
    on(input, 'input', event => { if (!event.isComposing) update(); });
    on(input, 'compositionend', () => update());
    on(view, 'resize', resize);
    resets.push(update);
    cleanups.push(() => { control.style.removeProperty('height'); input.style.removeProperty('height'); input.style.removeProperty('overflow-y'); });
    update();
    return { get length() { return [...input.value].length; } };
  });
}


window.MatteTextareaInput = { mount: mountTextareaField };
})();
