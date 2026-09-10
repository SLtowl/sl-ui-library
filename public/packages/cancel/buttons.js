/* No runtime dependencies. Each mount has its own state. */
(() => {
const duration = {
  "short-2": 100,
  "medium-4": 400
};
const easing = {
  "ease-in-out-gentle": "cubic-bezier(0.4,0,0.2,1)"
};
// Standalone Cancel keeps the approved motion without shipping Save machinery.
const matteButtonInstances = new WeakMap();

function mountMatteButtons(root, { onCancel = () => {}, confirmationMs = 1400 } = {}) {
  if (matteButtonInstances.has(root)) return matteButtonInstances.get(root);
  const cancel = root.querySelector('[data-action="cancel"]');
  if (!cancel) throw new TypeError('The component needs a Cancel button.');
  const wash = cancel.querySelector('.bk-wash');
  const feedback = root.querySelector('[data-feedback]');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const events = new AbortController();
  const pressTimers = new Set();
  let cancelReset, washAnimation;
  let destroyed = false;

  function state(value, name) {
    cancel.dataset.state = value;
    cancel.setAttribute('aria-label', name);
  }
  function cancelAction() {
    if (destroyed || cancel.disabled || cancel.getAttribute('aria-disabled') === 'true') return;
    clearTimeout(cancelReset);
    state('cancelled', 'Cancelled');
    washAnimation?.cancel();
    if (wash && !reduced.matches) {
      washAnimation = wash.animate([{ opacity: 0 }, { opacity: 0.35, offset: 0.5 }, { opacity: 0 }], {
        duration: duration['medium-4'], easing: easing['ease-in-out-gentle'],
      });
      const active = washAnimation;
      active.onfinish = () => { if (washAnimation === active) washAnimation = null; active.cancel(); };
    }
    if (feedback) feedback.textContent = 'Cancelled.';
    cancelReset = setTimeout(() => state('idle', 'Cancel'), confirmationMs);
    onCancel({ wasSaving: false });
  }
  cancel.addEventListener('click', cancelAction, { signal: events.signal });
  cancel.addEventListener('keydown', event => {
    if (event.key !== 'Enter' || event.repeat || cancel.getAttribute('aria-disabled') === 'true') return;
    cancel.classList.add('is-pressed');
    const timer = setTimeout(() => { cancel.classList.remove('is-pressed'); pressTimers.delete(timer); }, duration['short-2']);
    pressTimers.add(timer);
  }, { signal: events.signal });
  cancel.addEventListener('blur', () => cancel.classList.remove('is-pressed'), { signal: events.signal });
  reduced.addEventListener('change', () => { if (reduced.matches) washAnimation?.cancel(); }, { signal: events.signal });
  cancel.disabled = false;
  const controller = {
    destroy() {
      if (destroyed) return;
      destroyed = true;
      events.abort();
      clearTimeout(cancelReset);
      pressTimers.forEach(clearTimeout);
      pressTimers.clear();
      washAnimation?.cancel();
      washAnimation = null;
      cancel.classList.remove('is-pressed');
      cancel.disabled = true;
      matteButtonInstances.delete(root);
    },
  };
  matteButtonInstances.set(root, controller);
  return controller;
}

window.MatteButtons = { mount: mountMatteButtons };
})();
