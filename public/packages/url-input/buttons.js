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

function mountUrlField(root) {
  return mountField(root, 'url', ({ root, input, view, on, resets, cleanups, alive }) => {
    const helper = root.querySelector('.sl-field__helper');
    const globe = root.querySelector('.sl-field__globe');
    if (!helper || !globe) throw new TypeError('URL needs a globe icon and helper.');
    const initialHelper = helper.textContent;
    const motion = view.matchMedia('(prefers-reduced-motion: reduce)');
    let validationTimer = null, globeAnimation = null, composing = false;
    function cancelCheck() { view.clearTimeout(validationTimer); validationTimer = null; }
    function settleGlobe() { globeAnimation?.cancel(); globeAnimation = null; }
    function turnGlobe() {
      if (motion.matches || !globe.animate || globeAnimation?.playState === 'running') return;
      settleGlobe();
      globeAnimation = globe.animate([
        { transform: 'scale(1) rotate(0)' },
        { transform: 'scale(.95) rotate(-10deg)', offset: .3 },
        { transform: 'scale(1.04) rotate(7deg)', offset: .66 },
        { transform: 'scale(1) rotate(0)' },
      ], { duration: 620, easing: 'cubic-bezier(.4,0,.2,1)' });
      const animation = globeAnimation;
      animation.onfinish = () => { if (globeAnimation === animation) settleGlobe(); };
    }
    function clear() { cancelCheck(); root.dataset.validation = 'neutral'; input.removeAttribute('aria-invalid'); helper.textContent = initialHelper; }
    function validate() {
      cancelCheck();
      if (!alive()) return input.validity.valid;
      if (input.disabled || input.readOnly || composing) { clear(); return input.validity.valid; }
      if (!input.value && !input.required) { clear(); return true; }
      const valid = input.validity.valid && /^https?:\/\//i.test(input.value.trim());
      root.dataset.validation = valid ? 'valid' : 'invalid';
      input.setAttribute('aria-invalid', String(!valid));
      helper.textContent = valid ? 'The link format looks right.' : 'Start with http:// or https:// and include a complete address.';
      return valid;
    }
    function schedule(event) {
      clear();
      if (input.value && !composing && !event?.isComposing) validationTimer = view.setTimeout(validate, 650);
    }
    on(input, 'focus', turnGlobe);
    on(input, 'pointerdown', event => { if (event.button === 0) turnGlobe(); });
    on(input, 'input', schedule);
    on(input, 'blur', validate);
    on(input, 'compositionstart', () => { composing = true; clear(); });
    on(input, 'compositionend', () => { composing = false; schedule(); });
    on(motion, 'change', () => { if (motion.matches) settleGlobe(); });
    resets.push(() => { composing = false; settleGlobe(); clear(); });
    cleanups.push(() => { settleGlobe(); clear(); });
    clear();
    return { validate };
  });
}


window.MatteUrlInput = { mount: mountUrlField };
})();
