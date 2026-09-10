(() => {
const mounted = new WeakMap();

function mountToggle(root, { onChange } = {}) {
  if (mounted.has(root)) return mounted.get(root);
  if (typeof onChange !== 'undefined' && typeof onChange !== 'function') throw new TypeError('onChange must be a function.');
  const input = root?.querySelector('input[type="checkbox"]');
  const status = root?.querySelector('[data-status]');
  if (!input || !status) throw new TypeError('A native checkbox and visible status are required.');
  const view = root.ownerDocument.defaultView;
  const lifecycle = new view.AbortController();
  const motion = view.matchMedia('(prefers-reduced-motion: reduce)');
  let feedbackAnimation = null, destroyed = false;
  const on = (target, type, callback) => target.addEventListener(type, callback, { signal: lifecycle.signal });

  function settle() { feedbackAnimation?.cancel(); feedbackAnimation = null; }
  function feedback() {
    if (motion.matches) return;
    settle();
    const variant = [...root.classList].find(name => name.startsWith('sl-toggle--'))?.slice(11);
    if (variant === 'theme') return;
    if (variant === 'glide') {
      if (!input.checked) return;
      const bell = root.querySelector('.sl-bell__body');
      if (!bell?.animate) return;
      feedbackAnimation = bell.animate([
        { transform: 'rotate(0deg)' },
        { transform: 'rotate(-12deg)', offset: .2 },
        { transform: 'rotate(9deg)', offset: .43 },
        { transform: 'rotate(-5deg)', offset: .65 },
        { transform: 'rotate(2deg)', offset: .83 },
        { transform: 'rotate(0deg)' },
      ], { duration: 820, easing: 'ease-in-out' });
      const animation = feedbackAnimation;
      animation.onfinish = () => { if (feedbackAnimation === animation) settle(); };
      return;
    }
    const target = variant === 'sync' ? root.querySelector('.sl-sync__orbit') : root.querySelector('.sl-toggle__emblem');
    if (!target?.animate) return;
    const frames = variant === 'sync'
      ? [{ rotate: '0deg' }, { rotate: input.checked ? '360deg' : '-360deg' }]
      : [{ transform: 'scale(1)' }, { transform: 'scale(.96)', offset: .36 }, { transform: 'scale(1)' }];
    feedbackAnimation = target.animate(frames, { duration: variant === 'sync' ? 680 : 420, easing: 'cubic-bezier(.4,0,.2,1)' });
    const animation = feedbackAnimation;
    animation.onfinish = () => { if (feedbackAnimation === animation) settle(); };
  }
  function render({ animate = false, emit = false } = {}) {
    if (destroyed) return;
    root.dataset.checked = String(input.checked);
    status.textContent = input.checked ? input.dataset.on || 'On' : input.dataset.off || 'Off';
    status.setAttribute('aria-live', 'polite');
    if (animate) feedback();
    else settle();
    if (emit) {
      onChange?.(input.checked);
      root.dispatchEvent(new view.CustomEvent('togglechange', { bubbles: true, composed: true, detail: { checked: input.checked } }));
    }
  }
  function setChecked(value, { emit = false, animate = true } = {}) {
    if (destroyed) return;
    input.checked = Boolean(value);
    render({ animate, emit });
  }

  on(input, 'change', () => render({ animate: true, emit: true }));
  on(motion, 'change', () => { if (motion.matches) settle(); });
  if (input.form) on(input.form, 'reset', () => queueMicrotask(() => setChecked(input.defaultChecked, { animate: false })));
  render();

  const controller = {
    setChecked,
    reset() { setChecked(input.defaultChecked, { animate: false }); },
    destroy() { if (destroyed) return; destroyed = true; settle(); lifecycle.abort(); mounted.delete(root); },
    get checked() { return input.checked; },
  };
  mounted.set(root, controller);
  return controller;
}

window.MatteToggle = { mount: mountToggle };
})();
