/* No runtime dependencies. Each mount has its own state. */
(() => {
const duration = {
  "short-2": 100,
  "short-4": 200,
  "medium-3": 350,
  "medium-4": 400,
  "long-4": 600
};
const easing = {
  "linear": "cubic-bezier(0,0,1,1)",
  "ease-in-out-gentle": "cubic-bezier(0.4,0,0.2,1)"
};
// The original approved motion, scoped to one component instance.
const matteButtonInstances = new WeakMap();
function mountMatteButtons(root, { onSave, onCancel = () => {}, previewDuration = 0, confirmationMs = 1400 } = {}) {
  if (matteButtonInstances.has(root)) return matteButtonInstances.get(root);
  const save = root.querySelector('[data-action="save"]');
  const cancel = root.querySelector('[data-action="cancel"]');
  const fill = save?.querySelector('.bk-progress');
  const wash = cancel?.querySelector('.bk-wash');
  const feedback = root.querySelector('[data-feedback]');
  if (save && typeof onSave !== 'function') throw new TypeError('Pass your async onSave function.');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const events = new AbortController();
  const retiringFills = new Map();
  const pressTimers = new Set();
  let operation, saveReset, cancelReset, progressAnimation, washAnimation;
  let destroyed = false;

  function state(button, value, name) {
    if (!button) return;
    if (button === save && button.dataset.state !== value) {
      button.dataset.transition = button.dataset.state === 'saved' && value === 'idle' ? 'return' : 'default';
    }
    button.dataset.state = value;
    button.setAttribute('aria-label', name);
  }
  function announce(message) { if (feedback) feedback.textContent = message; }
  function unlock() {
    save?.setAttribute('aria-disabled', 'false');
    save?.setAttribute('aria-busy', 'false');
  }
  function resetProgress(animate = false) {
    if (!fill) return;
    // Only sample a visible animation that actually needs a fade-out.
    // Idle/reset/destroy must not force a style calculation.
    const style = animate && !reduced.matches && progressAnimation ? getComputedStyle(fill) : null;
    const transform = style?.transform || 'none';
    const opacity = style ? Number(style.opacity) : 0;
    const width = transform === 'none' ? 0 : new DOMMatrixReadOnly(transform).a;
    if (animate && !reduced.matches && width > 0.001 && opacity > 0) {
      const retiring = fill.cloneNode(false);
      retiring.classList.add('bk-retiring');
      retiring.style.transform = transform;
      retiring.style.opacity = String(opacity);
      fill.before(retiring);
      const animation = retiring.animate([{ opacity }, { opacity: 0 }], {
        duration: save.dataset.transition === 'return' ? duration['long-4'] : duration['medium-4'],
        easing: easing['ease-in-out-gentle'], fill: 'forwards',
      });
      retiringFills.set(retiring, animation);
      animation.onfinish = () => {
        retiring.remove(); retiringFills.delete(retiring); animation.cancel();
      };
    }
    progressAnimation?.cancel();
    progressAnimation = null;
    if (!animate || reduced.matches) {
      for (const [node, animation] of retiringFills) { animation.cancel(); node.remove(); }
      retiringFills.clear();
    }
  }
  async function startSave() {
    if (destroyed || save.disabled || save.getAttribute('aria-disabled') === 'true') return;
    clearTimeout(saveReset); clearTimeout(cancelReset);
    washAnimation?.cancel();
    state(cancel, 'idle', 'Cancel');
    resetProgress(true);
    const current = new AbortController();
    operation = current;
    state(save, 'saving', 'Saving changes');
    save.setAttribute('aria-disabled', 'true');
    save.setAttribute('aria-busy', 'true');
    announce('Saving changes.');
    // Optional determinate animation for a demo with a known duration.
    // Leave previewDuration at zero for a real request of unknown length.
    if (!reduced.matches && previewDuration > duration['short-4']) {
      const start = duration['short-4'] / previewDuration;
      progressAnimation = fill.animate([
        { transform: 'scaleX(0)', opacity: 0 },
        { transform: `scaleX(${start})`, opacity: 1, offset: start },
        { transform: 'scaleX(1)', opacity: 1 },
      ], { duration: previewDuration, easing: easing.linear, fill: 'forwards' });
    }
    try {
      await onSave({ signal: current.signal });
      if (operation !== current || current.signal.aborted) return;
      operation = null;
      if (!progressAnimation && !reduced.matches) {
        progressAnimation = fill.animate([{ transform: 'scaleX(1)', opacity: 0 }, { transform: 'scaleX(1)', opacity: 1 }], {
          duration: duration['medium-3'], easing: easing['ease-in-out-gentle'], fill: 'forwards',
        });
      }
      state(save, 'saved', 'Changes saved');
      save.setAttribute('aria-busy', 'false');
      announce('Changes saved.');
      saveReset = setTimeout(() => {
        state(save, 'idle', 'Save changes'); unlock(); resetProgress(true);
      }, confirmationMs);
    } catch (error) {
      if (operation !== current) return;
      operation = null;
      state(save, 'idle', 'Save changes'); unlock(); resetProgress(true);
      announce(error?.name === 'AbortError' ? 'Saving cancelled.' : 'Could not save. Please try again.');
    }
  }
  function cancelSave() {
    if (destroyed || cancel.disabled || cancel.getAttribute('aria-disabled') === 'true') return;
    const wasSaving = Boolean(operation);
    operation?.abort(); operation = null;
    clearTimeout(saveReset); clearTimeout(cancelReset);
    state(save, 'idle', 'Save changes'); unlock(); resetProgress(true);
    state(cancel, 'cancelled', 'Cancelled');
    washAnimation?.cancel();
    if (wash && !reduced.matches) {
      washAnimation = wash.animate([{ opacity: 0 }, { opacity: 0.35, offset: 0.5 }, { opacity: 0 }], {
        duration: duration['medium-4'], easing: easing['ease-in-out-gentle'],
      });
      const active = washAnimation;
      active.onfinish = () => { if (washAnimation === active) washAnimation = null; active.cancel(); };
    }
    announce(wasSaving ? 'Saving cancelled.' : 'Cancelled.');
    cancelReset = setTimeout(() => state(cancel, 'idle', 'Cancel'), confirmationMs);
    onCancel({ wasSaving });
  }
  save?.addEventListener('click', startSave, { signal: events.signal });
  cancel?.addEventListener('click', cancelSave, { signal: events.signal });
  for (const button of [save, cancel].filter(Boolean)) {
    button.disabled = false;
    button.addEventListener('keydown', event => {
      if (event.key !== 'Enter' || event.repeat || button.getAttribute('aria-disabled') === 'true') return;
      button.classList.add('is-pressed');
      const timer = setTimeout(() => { button.classList.remove('is-pressed'); pressTimers.delete(timer); }, duration['short-2']);
      pressTimers.add(timer);
    }, { signal: events.signal });
    button.addEventListener('blur', () => button.classList.remove('is-pressed'), { signal: events.signal });
  }
  reduced.addEventListener('change', () => {
    if (reduced.matches) { resetProgress(); washAnimation?.cancel(); }
  }, { signal: events.signal });
  const controller = {
    destroy() {
      if (destroyed) return;
      destroyed = true;
      events.abort(); operation?.abort(); operation = null;
      clearTimeout(saveReset); clearTimeout(cancelReset);
      pressTimers.forEach(clearTimeout); pressTimers.clear();
      resetProgress(); washAnimation?.cancel();
      for (const button of [save, cancel].filter(Boolean)) { button.classList.remove('is-pressed'); button.disabled = true; }
      matteButtonInstances.delete(root);
    },
  };
  matteButtonInstances.set(root, controller);
  return controller;
}

window.MatteButtons = { mount: mountMatteButtons };
})();
