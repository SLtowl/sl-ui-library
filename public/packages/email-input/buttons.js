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

function mountEmailField(root) {
  return mountField(root, 'email', ({ root, input, view, on, resets, cleanups, alive }) => {
    const helper = root.querySelector('.sl-field__helper');
    if (!helper) throw new TypeError('Email needs a helper.');
    const initialHelper = helper.textContent;
    let validationTimer = null, composing = false;
    function cancelCheck() { view.clearTimeout(validationTimer); validationTimer = null; }
    function clear() { cancelCheck(); root.dataset.validation = 'neutral'; input.removeAttribute('aria-invalid'); helper.textContent = initialHelper; }
    function validate() {
      cancelCheck();
      if (!alive()) return input.validity.valid;
      if (input.disabled || input.readOnly || composing) { clear(); return input.validity.valid; }
      if (!input.value && !input.required) { clear(); return true; }
      const valid = input.validity.valid;
      root.dataset.validation = valid ? 'valid' : 'invalid'; input.setAttribute('aria-invalid', String(!valid));
      helper.textContent = valid ? 'Email format looks right.' : input.validity.valueMissing ? 'Enter an email address.' : 'Enter an address such as name@example.com.';
      return valid;
    }
    function scheduleCheck(event) {
      clear();
      if (input.value && !composing && !event?.isComposing) validationTimer = view.setTimeout(validate, 650);
    }
    on(input, 'blur', validate); on(input, 'input', scheduleCheck);
    on(input, 'compositionstart', () => { composing = true; clear(); });
    on(input, 'compositionend', () => { composing = false; scheduleCheck(); });
    resets.push(() => { composing = false; clear(); }); cleanups.push(clear); clear();
    return { validate };
  });
}


window.MatteEmailInput = { mount: mountEmailField };
})();
