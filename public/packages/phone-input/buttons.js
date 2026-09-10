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

function mountPhoneField(root) {
  return mountField(root, 'tel', ({ root, input, view, on, resets, cleanups }) => {
    const phone = root.querySelector('.sl-field__phone');
    const body = root.querySelector('.sl-field__phone-body');
    const helper = root.querySelector('.sl-field__helper');
    if (!phone || !body || !helper) throw new TypeError('Phone needs its handset icon and helper.');
    const initialHelper = helper.textContent;
    const motion = view.matchMedia('(prefers-reduced-motion: reduce)');
    let animation = null;
    function settle() { animation?.cancel(); animation = null; root.dataset.ringing = 'false'; }
    function ring() {
      if (motion.matches || !body.animate || animation?.playState === 'running') return;
      settle(); root.dataset.ringing = 'true';
      animation = body.animate([
        { transform: 'rotate(0)' },
        { transform: 'rotate(-7deg)', offset: .2 },
        { transform: 'rotate(6deg)', offset: .42 },
        { transform: 'rotate(-4deg)', offset: .64 },
        { transform: 'rotate(2deg)', offset: .82 },
        { transform: 'rotate(0)' },
      ], { duration: 720, easing: 'cubic-bezier(.4,0,.2,1)' });
      const current = animation;
      animation.onfinish = () => { if (animation === current) settle(); };
    }
    on(input, 'focus', ring);
    on(input, 'pointerdown', event => { if (event.button === 0) ring(); });
    const masks = new Map([
      ['1', { area: 3, groups: [3, 4] }],
      ['7', { area: 3, groups: [3, 2, 2] }],
      ['44', { area: 2, groups: [4, 4] }],
      ['49', { area: 3, groups: [3, 4] }],
      ['33', { area: 1, groups: [2, 2, 2, 2] }],
    ]);
    const knownCodes = [...masks.keys()].sort((a, b) => b.length - a.length);
    function caretAfterDigits(value, count) {
      if (count <= 0) return value.startsWith('+') ? 1 : 0;
      let seen = 0;
      for (let index = 0; index < value.length; index += 1) {
        if (/\d/.test(value[index]) && ++seen >= count) return index + 1;
      }
      return value.length;
    }
    function resolve(raw) {
      let digits = raw.replace(/\D/g, '').slice(0, 15);
      if (!digits) return { value: raw.trim().startsWith('+') ? '+' : '', added: 0, code: '' };
      const explicit = raw.trim().startsWith('+');
      let code = knownCodes.find(candidate => digits.startsWith(candidate));
      let added = 0;
      if (!explicit && !code) { code = '1'; digits = code + digits; added = code.length; }
      if (!code) {
        const length = digits.length > 12 ? 3 : digits.length > 11 ? 2 : 1;
        code = digits.slice(0, length);
      }
      const mask = masks.get(code) || { area: 3, groups: [3, 4] };
      const capacity = mask.area + mask.groups.reduce((sum, size) => sum + size, 0);
      const national = digits.slice(code.length, code.length + capacity);
      let value = `+${code}`;
      if (national) {
        const area = national.slice(0, mask.area);
        value += ` (${area}${area.length === mask.area ? ')' : ''}`;
        let offset = mask.area;
        mask.groups.forEach((size, index) => {
          const part = national.slice(offset, offset + size);
          if (part) value += `${index === 0 ? ' ' : '-'}${part}`;
          offset += size;
        });
      }
      return { value, added, code };
    }
    function format() {
      const selection = input.selectionStart ?? input.value.length;
      const wasAtEnd = selection >= input.value.length;
      const digitCursor = (input.value.slice(0, selection).match(/\d/g) || []).length;
      const formatted = resolve(input.value);
      input.value = formatted.value;
      helper.textContent = formatted.code ? `Formatting international number +${formatted.code}.` : initialHelper;
      const caret = wasAtEnd ? formatted.value.length : caretAfterDigits(formatted.value, digitCursor + formatted.added);
      input.setSelectionRange(caret, caret);
      return formatted.value;
    }
    on(input, 'input', event => { if (!event.isComposing) format(); });
    on(input, 'compositionend', format);
    on(input, 'keydown', event => {
      if (event.key !== 'Backspace' || event.isComposing || input.selectionStart !== input.selectionEnd) return;
      const caret = input.selectionStart ?? 0;
      if (caret <= 0 || /\d/.test(input.value[caret - 1])) return;
      let digit = caret - 1;
      while (digit >= 0 && !/\d/.test(input.value[digit])) digit -= 1;
      if (digit < 0) return;
      event.preventDefault();
      input.value = input.value.slice(0, digit) + input.value.slice(digit + 1);
      input.setSelectionRange(digit, digit);
      input.dispatchEvent(new view.InputEvent('input', { bubbles: true, composed: true, inputType: 'deleteContentBackward' }));
    });
    on(motion, 'change', () => { if (motion.matches) settle(); });
    resets.push(() => { settle(); helper.textContent = initialHelper; });
    cleanups.push(settle); root.dataset.ringing = 'false';
    return { ring, format };
  });
}


window.MattePhoneInput = { mount: mountPhoneField };
})();
