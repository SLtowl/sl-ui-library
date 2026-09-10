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

function mountAmountField(root, { locale = 'en-US', minimumFractionDigits = 0, maximumFractionDigits = 2 } = {}) {
  return mountField(root, 'text', ({ root, input, view, on, resets, alive }) => {
    const helper = root.querySelector('.sl-field__helper');
    if (!helper) throw new TypeError('Amount needs a helper.');
    const initialHelper = helper.textContent;
    const formatter = new Intl.NumberFormat(locale, { useGrouping: true, minimumFractionDigits, maximumFractionDigits });
    function parse(value) {
      const normalized = value.replace(/\s/g, '').replace(/,/g, '');
      if (!normalized || !/^-?(?:\d+\.?\d*|\.\d+)$/.test(normalized)) return Number.NaN;
      return Number(normalized);
    }
    function setState(valid) {
      root.dataset.amountState = valid ? 'formatted' : 'invalid';
      input.setAttribute('aria-invalid', String(!valid));
      helper.textContent = valid ? initialHelper : 'Enter a valid numeric amount.';
    }
    function format() {
      if (!alive()) return Number.NaN;
      const amount = parse(input.value);
      if (!Number.isFinite(amount)) { setState(false); return amount; }
      input.value = formatter.format(amount); setState(true);
      input.dispatchEvent(new view.CustomEvent('amountchange', { bubbles: true, composed: true, detail: { amount } }));
      return amount;
    }
    function edit() {
      const amount = parse(input.value);
      if (Number.isFinite(amount)) input.value = String(amount);
      root.dataset.amountState = 'editing'; input.removeAttribute('aria-invalid'); helper.textContent = initialHelper;
      queueMicrotask(() => input.select());
    }
    on(input, 'focus', edit);
    on(input, 'input', () => { root.dataset.amountState = 'editing'; input.removeAttribute('aria-invalid'); helper.textContent = initialHelper; });
    on(input, 'blur', format);
    resets.push(() => { const amount = parse(input.value); if (Number.isFinite(amount)) input.value = formatter.format(amount); setState(true); });
    setState(true);
    return { format, parse: () => parse(input.value) };
  });
}


window.MatteAmountInput = { mount: mountAmountField };
})();
