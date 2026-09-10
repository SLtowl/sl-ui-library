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

function mountNumberField(root) {
  return mountField(root, 'number', ({ root, input, doc, view, on, resets, cleanups, alive }) => {
    const down = root.querySelector('[data-step="-1"]'), up = root.querySelector('[data-step="1"]'), helper = root.querySelector('.sl-field__helper');
    if (!down || !up || !helper) throw new TypeError('Number needs two step buttons and a helper.');
    const initialHelper = helper.textContent;
    const motion = view.matchMedia('(prefers-reduced-motion: reduce)');
    const stepAnimations = new Map();
    function settleSteps() { stepAnimations.forEach(animation => animation.cancel()); stepAnimations.clear(); }
    function showStep(direction) {
      const icon = (direction > 0 ? up : down).querySelector('svg');
      if (motion.matches || !icon?.animate || stepAnimations.get(icon)?.playState === 'running') return;
      // The value stays fixed. Repeated clicks never postpone the icon's return.
      const animation = icon.animate([
        { transform: 'scale(1)', easing: 'ease-out' },
        { transform: 'scale(.84)', offset: .25, easing: 'cubic-bezier(.2, .7, .25, 1)' },
        { transform: 'scale(1)' },
      ], { duration: 300 });
      stepAnimations.set(icon, animation);
      animation.onfinish = () => { if (stepAnimations.get(icon) === animation) { animation.cancel(); stepAnimations.delete(icon); } };
    }
    function update() {
      const value = input.valueAsNumber, blocked = input.disabled || input.readOnly;
      down.disabled = blocked || (input.min !== '' && Number.isFinite(value) && value <= Number(input.min));
      up.disabled = blocked || (input.max !== '' && Number.isFinite(value) && value >= Number(input.max));
    }
    function clear() { root.dataset.validation = 'neutral'; input.removeAttribute('aria-invalid'); helper.textContent = initialHelper; update(); }
    function validate() {
      if (!alive()) return input.validity.valid;
      const valid = input.validity.valid; root.dataset.validation = valid ? 'neutral' : 'invalid'; input.setAttribute('aria-invalid', String(!valid));
      helper.textContent = valid ? initialHelper : input.validity.rangeUnderflow ? `Enter ${input.min} or more.` : input.validity.rangeOverflow ? `Enter ${input.max} or less.` : input.validity.stepMismatch ? `Use steps of ${input.step || '1'}.` : 'Enter a number.';
      update(); return valid;
    }
    function step(direction) {
      if (!alive() || input.disabled || input.readOnly) return;
      const before = input.value;
      try { input.stepUp(direction); }
      catch { helper.textContent = 'This field does not have a fixed step.'; return; }
      if (before !== input.value) {
        input.dispatchEvent(new view.Event('input', { bubbles: true, composed: true }));
        input.dispatchEvent(new view.Event('change', { bubbles: true, composed: true }));
        showStep(direction);
      }
      validate();
    }
    for (const button of [down, up]) {
      on(button, 'pointerdown', event => { if (event.button === 0 && (doc.activeElement === input || root.getRootNode().activeElement === input)) event.preventDefault(); });
      on(button, 'click', () => step(Number(button.dataset.step)));
    }
    on(input, 'keydown', event => {
      if (!event.isComposing && !event.altKey && !event.ctrlKey && !event.metaKey && (event.key === 'ArrowUp' || event.key === 'ArrowDown')) {
        event.preventDefault(); step(event.key === 'ArrowUp' ? 1 : -1);
      }
    });
    on(input, 'input', event => { if (event.isTrusted) settleSteps(); clear(); }); on(input, 'change', update); on(input, 'blur', validate);
    on(motion, 'change', () => { if (motion.matches) settleSteps(); });
    resets.push(() => { settleSteps(); clear(); }); cleanups.push(() => { settleSteps(); down.disabled = true; up.disabled = true; }); clear();
    return { stepUp: () => step(1), stepDown: () => step(-1), validate };
  });
}

// Draft input controllers below this marker are not included in approved packages.

window.MatteNumberInput = { mount: mountNumberField };
})();
