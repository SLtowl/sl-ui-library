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

function mountSearchField(root, { items = ['Buttons', 'Inputs', 'Toggles', 'Checkboxes', 'Sliders', 'Menus', 'Navigation', 'Overlays', 'Feedback', 'Data display'] } = {}) {
  if (!Array.isArray(items) || items.some(item => typeof item !== 'string')) throw new TypeError('Search items must be strings.');
  const choices = [...new Set(items)];
  return mountField(root, 'search', ({ root, input, doc, view, on, resets, cleanups, alive }) => {
    const popup = root.querySelector('.sl-field__popup'), list = root.querySelector('.sl-field__options');
    const clear = root.querySelector('.sl-field__clear'), empty = root.querySelector('.sl-field__empty'), helper = root.querySelector('.sl-field__helper');
    if (!popup || !list || !clear || !empty || !helper) throw new TypeError('Search needs its list, clear action and helper.');
    if (!list.id) list.id = 'sl-field-options-' + (++nextListId);
    input.setAttribute('aria-controls', list.id);
    const initialHelper = helper.textContent;
    const lens = root.querySelector('.sl-field__leading');
    const motion = view.matchMedia('(prefers-reduced-motion: reduce)');
    let lensAnimation = null;
    function settleLens() { lensAnimation?.cancel(); lensAnimation = null; }
    function liftLens() {
      if (motion.matches || !lens?.animate || lensAnimation?.playState === 'running') return;
      settleLens();
      lensAnimation = lens.animate([
        { transform: 'translateY(0) rotate(0) scale(1)', easing: 'ease-in-out' },
        { transform: 'translateY(1px) rotate(3deg) scale(.96)', offset: .14, easing: 'cubic-bezier(.25, .1, .25, 1)' },
        { transform: 'translateY(-6px) rotate(-16deg) scale(1.08)', offset: .46, easing: 'cubic-bezier(.35, 0, .3, 1)' },
        { transform: 'translateY(.7px) rotate(2deg) scale(1)', offset: .78, easing: 'ease-out' },
        { transform: 'translateY(0) rotate(0) scale(1)' },
      ], { duration: 700 });
      const animation = lensAnimation;
      animation.onfinish = () => { if (lensAnimation === animation) settleLens(); };
    }
    let results = [], active = -1, open = false;
    function close() {
      open = false; active = -1; root.dataset.searchOpen = 'false'; popup.inert = true;
      popup.setAttribute('aria-hidden', 'true'); input.setAttribute('aria-expanded', 'false'); input.removeAttribute('aria-activedescendant');
    }
    function highlight(index) {
      active = index;
      [...list.children].forEach((option, position) => option.setAttribute('aria-selected', String(position === active)));
      if (active >= 0) input.setAttribute('aria-activedescendant', list.children[active].id);
      else input.removeAttribute('aria-activedescendant');
    }
    function render(show = true) {
      const query = input.value.trim().toLocaleLowerCase();
      results = choices.filter(choice => choice.toLocaleLowerCase().includes(query)).slice(0, 4);
      list.replaceChildren(...results.map((value, index) => {
        const option = doc.createElement('li'); option.className = 'sl-field__option'; option.id = list.id + '-' + index;
        option.setAttribute('role', 'option'); option.setAttribute('aria-selected', 'false'); option.dataset.index = String(index); option.textContent = value;
        return option;
      }));
      clear.hidden = !input.value; empty.hidden = results.length > 0; highlight(-1);
      if (!show || input.disabled || input.readOnly) { close(); return; }
      open = true; root.dataset.searchOpen = 'true'; popup.inert = false; popup.setAttribute('aria-hidden', 'false'); input.setAttribute('aria-expanded', 'true');
      helper.textContent = results.length ? `${results.length} suggestions. Use the arrow keys to choose.` : 'No matching components.';
    }
    function choose(index) {
      if (!alive() || !results[index]) return;
      input.value = results[index];
      input.dispatchEvent(new view.Event('input', { bubbles: true, composed: true }));
      input.dispatchEvent(new view.Event('change', { bubbles: true, composed: true }));
      input.focus({ preventScroll: true }); close(); helper.textContent = `${input.value} selected.`;
      input.dispatchEvent(new view.CustomEvent('searchselect', { bubbles: true, composed: true, detail: { value: input.value } }));
    }
    on(input, 'focus', () => { render(); liftLens(); });
    on(input, 'pointerdown', event => {
      if (event.button === 0 && (doc.activeElement === input || root.getRootNode().activeElement === input)) liftLens();
    });
    on(input, 'input', event => { if (!event.isComposing) render(); });
    on(input, 'compositionend', () => render());
    on(input, 'keydown', event => {
      if (event.isComposing) return;
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault(); if (!open) render(); if (!results.length) return;
        highlight(event.key === 'ArrowDown' ? (active + 1) % results.length : active <= 0 ? results.length - 1 : active - 1);
      } else if (event.key === 'Enter' && open) { event.preventDefault(); if (active >= 0) choose(active); }
      else if (event.key === 'Escape' && open) { event.preventDefault(); close(); helper.textContent = initialHelper; }
    });
    on(list, 'pointerdown', event => event.preventDefault());
    on(list, 'click', event => { const option = event.target.closest('[role="option"]'); if (option && list.contains(option)) choose(Number(option.dataset.index)); });
    on(clear, 'click', () => {
      if (input.disabled || input.readOnly) return;
      input.value = ''; input.dispatchEvent(new view.Event('input', { bubbles: true, composed: true }));
      input.dispatchEvent(new view.Event('change', { bubbles: true, composed: true }));
      input.focus({ preventScroll: true }); close(); helper.textContent = initialHelper;
    });
    on(root, 'focusout', event => {
      if (event.relatedTarget) { if (!root.contains(event.relatedTarget)) close(); return; }
      queueMicrotask(() => { if (alive() && !root.contains(root.getRootNode().activeElement || doc.activeElement)) close(); });
    });
    on(doc, 'pointerdown', event => { if (open && !event.composedPath().includes(root)) close(); });
    on(motion, 'change', () => { if (motion.matches) settleLens(); });
    resets.push(() => { settleLens(); render(false); helper.textContent = initialHelper; });
    cleanups.push(() => { settleLens(); close(); clear.hidden = true; });
    render(false);
    return { close: () => { if (alive()) close(); }, get isOpen() { return open; } };
  });
}


window.MatteSearchInput = { mount: mountSearchField };
})();
