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

function mountCodeField(root, { expectedCode = '482731' } = {}) {
  if (!/^\d{6}$/.test(expectedCode)) throw new TypeError('Expected code must contain exactly six digits.');
  return mountField(root, 'text', ({ root, input, view, on, resets, cleanups }) => {
    const cellGroup = root.querySelector('.sl-code__cells');
    const control = root.querySelector('.sl-code__control');
    const cells = [...root.querySelectorAll('.sl-code__cells span')];
    const helper = root.querySelector('.sl-field__helper');
    if (!cellGroup || !control || cells.length !== 6 || !helper) throw new TypeError('Verification code needs six cells and a helper.');
    const initialHelper = helper.textContent;
    const motion = view.matchMedia('(prefers-reduced-motion: reduce)');
    const entryAnimations = new Map();
    const resultAnimations = new Set();
    let finishAnimation = null;
    let previousLength = 0, previousCode = '';
    function settleEntries() { entryAnimations.forEach(animation => animation.cancel()); entryAnimations.clear(); }
    function settleResult() {
      resultAnimations.forEach(animation => animation.cancel()); resultAnimations.clear();
      finishAnimation?.cancel(); finishAnimation = null;
    }
    function settle() { settleEntries(); settleResult(); }
    function animateEntry(cell) {
      entryAnimations.get(cell)?.cancel();
      const animation = cell.animate([
        { transform: 'translateY(3px) scale(.9)', opacity: .55 },
        { transform: 'translateY(0) scale(1)', opacity: 1 },
      ], { duration: 300, easing: 'cubic-bezier(.2,.7,.25,1)' });
      entryAnimations.set(cell, animation);
      animation.onfinish = () => { if (entryAnimations.get(cell) === animation) { animation.cancel(); entryAnimations.delete(cell); } };
    }
    function animateResult(valid) {
      settle();
      root.dataset.result = valid ? 'success' : 'error';
      if (motion.matches) return;
      const target = valid
        ? { color: '#eaf8ef', borderColor: '#4f8d72', backgroundColor: '#234b3a', boxShadow: 'inset 0 1px rgba(255,255,255,.09), 0 0 0 2px rgba(79,141,114,.09)', transform: 'translateY(-2px)' }
        : { color: '#fff0f0', borderColor: '#a85e63', backgroundColor: '#543134', boxShadow: 'inset 0 1px rgba(255,255,255,.07), 0 0 0 2px rgba(168,94,99,.08)', transform: 'translateY(1px)' };
      cells.forEach((cell, index) => {
        const animation = cell.animate([
          { color: '#f8f9f8', borderColor: 'rgba(0,0,0,0)', backgroundColor: '#202222', boxShadow: 'inset 0 1px rgba(255,255,255,.07), 0 1px 2px rgba(0,0,0,.05)', transform: 'translateY(0)' },
          target,
        ], { duration: 360, delay: index * 95, easing: 'cubic-bezier(.4,0,.2,1)', fill: 'both' });
        resultAnimations.add(animation);
        if (index === cells.length - 1) animation.onfinish = () => {
          if (!resultAnimations.has(animation)) return;
          resultAnimations.forEach(item => item.cancel()); resultAnimations.clear();
          finishAnimation = cellGroup.animate([
            { transform: 'scale(1)' },
            { transform: 'scale(1.018)', offset: .45 },
            { transform: 'scale(1)' },
          ], { duration: 340, easing: 'cubic-bezier(.2,.7,.25,1)' });
          const finishing = finishAnimation;
          finishing.onfinish = () => { if (finishAnimation === finishing) { finishing.cancel(); finishAnimation = null; } };
        };
      });
    }
    function update(animate = true) {
      const digits = input.value.replace(/\D/g, '').slice(0, cells.length);
      if (input.value !== digits) input.value = digits;
      const focused = input.matches(':focus');
      cells.forEach((cell, index) => {
        cell.textContent = digits[index] || '';
        cell.classList.toggle('is-filled', index < digits.length);
        cell.classList.toggle('is-active', focused && index === Math.min(digits.length, cells.length - 1) && digits.length < cells.length);
      });
      root.dataset.length = String(digits.length);
      root.dataset.complete = String(digits.length === cells.length);
      const complete = digits.length === cells.length;
      const valid = complete && digits === expectedCode;
      if (!complete) {
        if (root.dataset.result !== 'neutral') settle();
        root.dataset.result = 'neutral';
      } else if (digits !== previousCode) {
        if (animate) animateResult(valid);
        else { settle(); root.dataset.result = valid ? 'success' : 'error'; }
      }
      input.setCustomValidity(complete && !valid ? 'Code does not match.' : '');
      if (complete) input.setAttribute('aria-invalid', String(!valid));
      else input.removeAttribute('aria-invalid');
      helper.textContent = digits.length === 0 ? initialHelper : !complete ? `${digits.length} of ${cells.length} digits entered.` : valid ? 'Code accepted.' : `Code does not match. Try ${expectedCode}.`;
      if (animate && !complete && digits.length > previousLength && !motion.matches) animateEntry(cells[digits.length - 1]);
      if (complete && digits !== previousCode) input.dispatchEvent(new view.CustomEvent('codecomplete', { bubbles: true, composed: true, detail: { code: digits, valid } }));
      previousCode = digits; previousLength = digits.length;
    }
    on(input, 'input', event => { if (!event.isComposing) update(); });
    on(input, 'compositionend', () => update());
    on(input, 'focus', () => update(false));
    on(input, 'blur', () => update(false));
    on(motion, 'change', () => { if (motion.matches) settle(); });
    resets.push(() => { settle(); previousLength = 0; previousCode = ''; update(false); });
    cleanups.push(settle); update(false);
    return { validate: () => { update(false); return input.value === expectedCode; }, get code() { return input.value; }, get complete() { return input.value.length === cells.length; } };
  });
}

window.MatteCodeInput = { mount: mountCodeField };
})();
