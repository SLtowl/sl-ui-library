// mount(root, { onChange(quantity), quantity, max }) → { state, reset(), destroy() }
function mount(root, { onChange = () => {}, quantity = 0, max = 9 } = {}) {
  root.__pb?.destroy();
  pbPrepare(root);
  const add = root.querySelector('.pb-add'), [minus, plus] = root.querySelectorAll('.pb-step'), number = root.querySelector('.pb-n'), status = root.querySelector('[data-status]');
  const qty = root.querySelector('.pb-qty'), rest = qty.lastChild.textContent;
  const off = new AbortController(), on = (target, type, fn) => target.addEventListener(type, fn, { signal: off.signal });
  let count = 0;
  const fit = () => {
    root.style.setProperty('--w0', pbMeasure(add, add.textContent.trim()) + 52 + 'px');
    root.style.setProperty('--w1', pbMeasure(add, max + rest) + 40 * 2 + 12 + 34 + 'px');
  };
  fit(); document.fonts?.ready.then(fit);

  const set = (value, direction, focus) => {
    const before = count; count = value;
    const open = count > 0;
    root.dataset.state = open ? 'in' : 'idle';
    add.tabIndex = open ? -1 : 0; minus.tabIndex = plus.tabIndex = open ? 0 : -1;
    plus.setAttribute('aria-disabled', String(count >= max));
    if (open) pbRoll(number, count, before ? direction : 0);
    status.textContent = open ? `${count}${rest}` : before ? 'Removed from cart' : '';
    if (focus) (open ? (direction < 0 ? minus : plus) : add).focus({ preventScroll: true });
    if (before !== count) { onChange(count); root.dispatchEvent(new CustomEvent('pb:cart', { detail: { quantity: count }, bubbles: true })); }
  };
  set(Math.min(max, Math.max(0, quantity)), 0, false);

  on(add, 'click', () => set(1, 1, true));
  for (const step of [minus, plus]) on(step, 'click', () => {
    const d = Number(step.dataset.step);
    if (count + d > max) { status.textContent = `Up to ${max}`; pbShake(root); return; }
    set(count + d, d, true);
  });

  const api = {
    get state() { return { quantity: count, max }; },
    reset() { set(0, 0, false); status.textContent = ''; },
    destroy() { off.abort(); delete root.__pb; },
  };
  root.__pb = api;
  return api;
}
// The catalog preview changes no cart.
const demo = {};
