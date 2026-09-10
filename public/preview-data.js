// Generated from the standalone packages by build-previews.mjs.
const style0 = "/* Matte buttons. Scoped styles and editable color and motion tokens. */\n\n.button-kit {\n  --unit: 1px;\n  --ink: #202222;\n  --secondary: #e4e3e0;\n  --save-feedback: #3d4040;\n  --primary-hover: #2c2e2e;\n  --primary-foreground: #fafaf9;\n  --secondary-hover: #dcdcd8;\n  --secondary-feedback: #ccceca;\n  --secondary-foreground: var(--ink);\n  --focus-ring: #565b5b;\n  --motion-duration-short-2: 100ms;\n  --motion-duration-short-3: 150ms;\n  --motion-duration-short-4: 200ms;\n  --motion-duration-medium-1: 250ms;\n  --motion-duration-medium-2: 300ms;\n  --motion-duration-medium-3: 350ms;\n  --motion-easing-standard: cubic-bezier(0.2,0,0,1);\n  --motion-easing-emphasized-decelerate: cubic-bezier(0.05,0.7,0.1,1);\n  --motion-easing-ease-in-out-gentle: cubic-bezier(0.4,0,0.2,1);\n  font-family: 'Instrument Sans', sans-serif;\n  font-synthesis: none;\n  -webkit-font-smoothing: antialiased;\n  display: flex; flex-direction: column; align-items: center; gap: calc(20 * var(--unit));\n}\n.button-kit *, .button-kit *::before, .button-kit *::after { box-sizing: border-box; }\n.bk-button {\n  appearance: none;\n  -webkit-tap-highlight-color: transparent;\n  position: relative;\n  display: block;\n  border: 0;\n  padding: 0;\n  background: transparent;\n  font: inherit;\n  font-weight: 550;\n  letter-spacing: -0.02em;\n  cursor: pointer;\n  touch-action: manipulation;\n  user-select: none;\n  border-radius: calc(13 * var(--unit));\n  outline-offset: 6px;\n}\n.bk-button:focus-visible { outline: 2px solid var(--focus-ring); }\n.bk-button--save {\n  width: calc(220 * var(--unit));\n  height: calc(52 * var(--unit));\n  font-size: calc(19 * var(--unit));\n  color: var(--primary-foreground);\n}\n.bk-button--cancel {\n  width: calc(140 * var(--unit));\n  height: calc(46 * var(--unit));\n  font-size: calc(16 * var(--unit));\n  color: var(--secondary-foreground);\n}\n.bk-surface {\n  position: absolute;\n  inset: 0;\n  overflow: hidden;\n  isolation: isolate;\n  display: grid;\n  place-items: center;\n  border-radius: inherit;\n  transition:\n    transform var(--motion-duration-medium-3) var(--motion-easing-emphasized-decelerate),\n    background-color var(--motion-duration-short-4) var(--motion-easing-standard),\n    box-shadow var(--motion-duration-medium-2) var(--motion-easing-standard);\n}\n.bk-button--save .bk-surface {\n  background-color: var(--secondary-foreground);\n  background-image: linear-gradient(155deg, rgb(255 255 255 / 2.5%), transparent 68%);\n  box-shadow: inset 0 1px 0 rgb(255 255 255 / 7%), 0 1px 2px rgb(0 0 0 / 5%);\n}\n.bk-button--cancel .bk-surface {\n  background-color: var(--secondary);\n  box-shadow: inset 0 1px 0 rgb(255 255 255 / 18%);\n}\n@media (hover: hover) {\n  .bk-button:not([aria-disabled=\"true\"]):hover .bk-surface { transform: translateY(-2px); }\n  .bk-button--save:not([aria-disabled=\"true\"]):hover .bk-surface {\n    background-color: var(--primary-hover);\n    box-shadow: inset 0 1px 0 rgb(255 255 255 / 9%), 0 6px 12px -8px rgb(0 0 0 / 28%);\n  }\n  .bk-button--cancel:hover .bk-surface { background-color: var(--secondary-hover); }\n}\n.bk-button:not([aria-disabled=\"true\"]):active .bk-surface,\n.bk-button.is-pressed .bk-surface {\n  transform: translateY(1px) scale(0.98);\n  transition-duration: var(--motion-duration-short-2);\n  transition-timing-function: var(--motion-easing-standard);\n}\n.bk-button[aria-disabled=\"true\"] { cursor: default; }\n.bk-label {\n  position: absolute;\n  inset: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.3em;\n  line-height: 1.1;\n  white-space: nowrap;\n  opacity: 0;\n  transition: opacity var(--motion-duration-short-3) var(--motion-easing-standard);\n}\n[data-state=\"idle\"] .bk-label-idle,\n[data-state=\"saving\"] .bk-label-saving,\n[data-state=\"saved\"] .bk-label-saved,\n[data-state=\"cancelled\"] .bk-label-cancelled { opacity: 1; }\n/* M3 fade-through: finish the outgoing label before revealing its replacement. */\n.bk-button[data-state=\"idle\"] .bk-label-idle,\n.bk-button[data-state=\"saving\"] .bk-label-saving,\n.bk-button[data-state=\"saved\"] .bk-label-saved,\n.bk-button[data-state=\"cancelled\"] .bk-label-cancelled {\n  transition-duration: var(--motion-duration-short-4);\n  transition-delay: var(--motion-duration-short-3);\n}\n/* A gentler, 600ms return after success; other state changes keep their timing. */\n.bk-button--save[data-transition=\"return\"] .bk-label-saved {\n  transition-duration: var(--motion-duration-medium-1);\n  transition-timing-function: var(--motion-easing-ease-in-out-gentle);\n}\n.bk-button--save[data-transition=\"return\"] .bk-label-idle {\n  transition-duration: var(--motion-duration-medium-3);\n  transition-delay: var(--motion-duration-medium-1);\n  transition-timing-function: var(--motion-easing-ease-in-out-gentle);\n}\n.bk-ellipsis { margin-left: -0.3em; }\n.bk-progress {\n  position: absolute;\n  inset: 0;\n  background: var(--save-feedback);\n  transform: scaleX(0);\n  transform-origin: left center;\n}\n.bk-wash { position: absolute; inset: 0; background: var(--secondary-feedback); opacity: 0; }\n.bk-label-saved {\n  display: grid;\n  grid-template-columns: 1fr auto 1fr;\n  gap: 0.24em;\n}\n.bk-label-saved .bk-check { justify-self: end; }\n.bk-saved-text { grid-column: 2; }\n.bk-check { width: 1em; height: 1em; flex: 0 0 auto; overflow: visible; }\n.bk-check path {\n  stroke: currentColor;\n  stroke-width: 2.5;\n  stroke-linecap: round;\n  stroke-linejoin: round;\n  stroke-dasharray: 1;\n  stroke-dashoffset: 0;\n}\n[data-state=\"saved\"] .bk-check path {\n  animation: bk-check-draw var(--motion-duration-medium-3) var(--motion-easing-standard) var(--motion-duration-short-2) backwards;\n}\n@keyframes bk-check-draw {\n  from { stroke-dashoffset: 1; opacity: 0; }\n  15% { opacity: 1; }\n  to { stroke-dashoffset: 0; opacity: 1; }\n}\n\n.bk-sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; border: 0; }\n@media (prefers-reduced-motion: reduce) {\n  .bk-button .bk-surface, .bk-button .bk-label, .bk-check path { transition: none; }\n  .bk-button[data-state] .bk-label { transition: none; }\n  [data-state=\"saved\"] .bk-check path { animation: none; }\n  .bk-button .bk-surface, .bk-button:hover .bk-surface, .bk-button:active .bk-surface,\n  .bk-button.is-pressed .bk-surface, .bk-button .bk-label { transform: none; }\n  .bk-button:active .bk-surface { opacity: 0.88; }\n  .bk-progress { display: none; }\n}\n@media (forced-colors: active) {\n  .bk-surface { border: 1px solid ButtonText; }\n  .bk-progress, .bk-wash { display: none; }\n}\n\n";
const api0 = (() => {
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

return { mount: mountMatteButtons };
})();

const style1 = "\n.button-kit {\n  --unit: 1px;\n  --ink: #202222;\n  --save-feedback: #3d4040;\n  --primary-hover: #2c2e2e;\n  --primary-foreground: #fafaf9;\n  --secondary-foreground: var(--ink);\n  --focus-ring: #565b5b;\n  --motion-duration-short-2: 100ms;\n  --motion-duration-short-3: 150ms;\n  --motion-duration-short-4: 200ms;\n  --motion-duration-medium-1: 250ms;\n  --motion-duration-medium-2: 300ms;\n  --motion-duration-medium-3: 350ms;\n  --motion-easing-standard: cubic-bezier(0.2,0,0,1);\n  --motion-easing-emphasized-decelerate: cubic-bezier(0.05,0.7,0.1,1);\n  --motion-easing-ease-in-out-gentle: cubic-bezier(0.4,0,0.2,1);\n  font-family: 'Instrument Sans', sans-serif;\n  font-synthesis: none;\n  -webkit-font-smoothing: antialiased;\n  display: flex; flex-direction: column; align-items: center; gap: calc(20 * var(--unit));\n}\n.button-kit *,\n.button-kit *::before,\n.button-kit *::after { box-sizing: border-box; }\n.bk-button {\n  appearance: none;\n  -webkit-tap-highlight-color: transparent;\n  position: relative;\n  display: block;\n  border: 0;\n  padding: 0;\n  background: transparent;\n  font: inherit;\n  font-weight: 550;\n  letter-spacing: -0.02em;\n  cursor: pointer;\n  touch-action: manipulation;\n  user-select: none;\n  border-radius: calc(13 * var(--unit));\n  outline-offset: 6px;\n}\n.bk-button:focus-visible { outline: 2px solid var(--focus-ring); }\n.bk-button--save {\n  width: calc(220 * var(--unit));\n  height: calc(52 * var(--unit));\n  font-size: calc(19 * var(--unit));\n  color: var(--primary-foreground);\n}\n.bk-surface {\n  position: absolute;\n  inset: 0;\n  overflow: hidden;\n  isolation: isolate;\n  display: grid;\n  place-items: center;\n  border-radius: inherit;\n  transition:\n    transform var(--motion-duration-medium-3) var(--motion-easing-emphasized-decelerate),\n    background-color var(--motion-duration-short-4) var(--motion-easing-standard),\n    box-shadow var(--motion-duration-medium-2) var(--motion-easing-standard);\n}\n.bk-button--save .bk-surface {\n  background-color: var(--secondary-foreground);\n  background-image: linear-gradient(155deg, rgb(255 255 255 / 2.5%), transparent 68%);\n  box-shadow: inset 0 1px 0 rgb(255 255 255 / 7%), 0 1px 2px rgb(0 0 0 / 5%);\n}\n@media (hover: hover) {\n.bk-button:not([aria-disabled=\"true\"]):hover .bk-surface { transform: translateY(-2px); }\n.bk-button--save:not([aria-disabled=\"true\"]):hover .bk-surface {\n    background-color: var(--primary-hover);\n    box-shadow: inset 0 1px 0 rgb(255 255 255 / 9%), 0 6px 12px -8px rgb(0 0 0 / 28%);\n  }\n}\n.bk-button:not([aria-disabled=\"true\"]):active .bk-surface,\n.bk-button.is-pressed .bk-surface {\n  transform: translateY(1px) scale(0.98);\n  transition-duration: var(--motion-duration-short-2);\n  transition-timing-function: var(--motion-easing-standard);\n}\n.bk-button[aria-disabled=\"true\"] { cursor: default; }\n.bk-label {\n  position: absolute;\n  inset: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.3em;\n  line-height: 1.1;\n  white-space: nowrap;\n  opacity: 0;\n  transition: opacity var(--motion-duration-short-3) var(--motion-easing-standard);\n}\n[data-state=\"idle\"] .bk-label-idle,\n[data-state=\"saving\"] .bk-label-saving,\n[data-state=\"saved\"] .bk-label-saved { opacity: 1; }\n.bk-button[data-state=\"idle\"] .bk-label-idle,\n.bk-button[data-state=\"saving\"] .bk-label-saving,\n.bk-button[data-state=\"saved\"] .bk-label-saved {\n  transition-duration: var(--motion-duration-short-4);\n  transition-delay: var(--motion-duration-short-3);\n}\n.bk-button--save[data-transition=\"return\"] .bk-label-saved {\n  transition-duration: var(--motion-duration-medium-1);\n  transition-timing-function: var(--motion-easing-ease-in-out-gentle);\n}\n.bk-button--save[data-transition=\"return\"] .bk-label-idle {\n  transition-duration: var(--motion-duration-medium-3);\n  transition-delay: var(--motion-duration-medium-1);\n  transition-timing-function: var(--motion-easing-ease-in-out-gentle);\n}\n.bk-ellipsis { margin-left: -0.3em; }\n.bk-progress {\n  position: absolute;\n  inset: 0;\n  background: var(--save-feedback);\n  transform: scaleX(0);\n  transform-origin: left center;\n}\n.bk-label-saved {\n  display: grid;\n  grid-template-columns: 1fr auto 1fr;\n  gap: 0.24em;\n}\n.bk-label-saved .bk-check { justify-self: end; }\n.bk-saved-text { grid-column: 2; }\n.bk-check { width: 1em; height: 1em; flex: 0 0 auto; overflow: visible; }\n.bk-check path {\n  stroke: currentColor;\n  stroke-width: 2.5;\n  stroke-linecap: round;\n  stroke-linejoin: round;\n  stroke-dasharray: 1;\n  stroke-dashoffset: 0;\n}\n[data-state=\"saved\"] .bk-check path {\n  animation: bk-check-draw var(--motion-duration-medium-3) var(--motion-easing-standard) var(--motion-duration-short-2) backwards;\n}\n@keyframes bk-check-draw {\n  from { stroke-dashoffset: 1; opacity: 0; }\n  15% { opacity: 1; }\n  to { stroke-dashoffset: 0; opacity: 1; }\n}\n.bk-sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; border: 0; }\n@media (prefers-reduced-motion: reduce) {\n.bk-button .bk-surface,\n.bk-button .bk-label,\n.bk-check path { transition: none; }\n.bk-button[data-state] .bk-label { transition: none; }\n[data-state=\"saved\"] .bk-check path { animation: none; }\n.bk-button .bk-surface,\n.bk-button:hover .bk-surface,\n.bk-button:active .bk-surface,\n.bk-button.is-pressed .bk-surface,\n.bk-button .bk-label { transform: none; }\n.bk-button:active .bk-surface { opacity: 0.88; }\n.bk-progress { display: none; }\n}\n@media (forced-colors: active) {\n.bk-surface { border: 1px solid ButtonText; }\n.bk-progress { display: none; }\n}\n";
const style2 = "\n.button-kit {\n  --unit: 1px;\n  --ink: #202222;\n  --secondary: #e4e3e0;\n  --secondary-hover: #dcdcd8;\n  --secondary-feedback: #ccceca;\n  --secondary-foreground: var(--ink);\n  --focus-ring: #565b5b;\n  --motion-duration-short-2: 100ms;\n  --motion-duration-short-3: 150ms;\n  --motion-duration-short-4: 200ms;\n  --motion-duration-medium-2: 300ms;\n  --motion-duration-medium-3: 350ms;\n  --motion-easing-standard: cubic-bezier(0.2,0,0,1);\n  --motion-easing-emphasized-decelerate: cubic-bezier(0.05,0.7,0.1,1);\n  font-family: 'Instrument Sans', sans-serif;\n  font-synthesis: none;\n  -webkit-font-smoothing: antialiased;\n  display: flex; flex-direction: column; align-items: center; gap: calc(20 * var(--unit));\n}\n.button-kit *,\n.button-kit *::before,\n.button-kit *::after { box-sizing: border-box; }\n.bk-button {\n  appearance: none;\n  -webkit-tap-highlight-color: transparent;\n  position: relative;\n  display: block;\n  border: 0;\n  padding: 0;\n  background: transparent;\n  font: inherit;\n  font-weight: 550;\n  letter-spacing: -0.02em;\n  cursor: pointer;\n  touch-action: manipulation;\n  user-select: none;\n  border-radius: calc(13 * var(--unit));\n  outline-offset: 6px;\n}\n.bk-button:focus-visible { outline: 2px solid var(--focus-ring); }\n.bk-button--cancel {\n  width: calc(140 * var(--unit));\n  height: calc(46 * var(--unit));\n  font-size: calc(16 * var(--unit));\n  color: var(--secondary-foreground);\n}\n.bk-surface {\n  position: absolute;\n  inset: 0;\n  overflow: hidden;\n  isolation: isolate;\n  display: grid;\n  place-items: center;\n  border-radius: inherit;\n  transition:\n    transform var(--motion-duration-medium-3) var(--motion-easing-emphasized-decelerate),\n    background-color var(--motion-duration-short-4) var(--motion-easing-standard),\n    box-shadow var(--motion-duration-medium-2) var(--motion-easing-standard);\n}\n.bk-button--cancel .bk-surface {\n  background-color: var(--secondary);\n  box-shadow: inset 0 1px 0 rgb(255 255 255 / 18%);\n}\n@media (hover: hover) {\n.bk-button:not([aria-disabled=\"true\"]):hover .bk-surface { transform: translateY(-2px); }\n.bk-button--cancel:hover .bk-surface { background-color: var(--secondary-hover); }\n}\n.bk-button:not([aria-disabled=\"true\"]):active .bk-surface,\n.bk-button.is-pressed .bk-surface {\n  transform: translateY(1px) scale(0.98);\n  transition-duration: var(--motion-duration-short-2);\n  transition-timing-function: var(--motion-easing-standard);\n}\n.bk-button[aria-disabled=\"true\"] { cursor: default; }\n.bk-label {\n  position: absolute;\n  inset: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.3em;\n  line-height: 1.1;\n  white-space: nowrap;\n  opacity: 0;\n  transition: opacity var(--motion-duration-short-3) var(--motion-easing-standard);\n}\n[data-state=\"idle\"] .bk-label-idle,\n[data-state=\"cancelled\"] .bk-label-cancelled { opacity: 1; }\n.bk-button[data-state=\"idle\"] .bk-label-idle,\n.bk-button[data-state=\"cancelled\"] .bk-label-cancelled {\n  transition-duration: var(--motion-duration-short-4);\n  transition-delay: var(--motion-duration-short-3);\n}\n.bk-wash { position: absolute; inset: 0; background: var(--secondary-feedback); opacity: 0; }\n.bk-sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; border: 0; }\n@media (prefers-reduced-motion: reduce) {\n.bk-button .bk-surface,\n.bk-button .bk-label { transition: none; }\n.bk-button[data-state] .bk-label { transition: none; }\n.bk-button .bk-surface,\n.bk-button:hover .bk-surface,\n.bk-button:active .bk-surface,\n.bk-button.is-pressed .bk-surface,\n.bk-button .bk-label { transform: none; }\n.bk-button:active .bk-surface { opacity: 0.88; }\n}\n@media (forced-colors: active) {\n.bk-surface { border: 1px solid ButtonText; }\n.bk-wash { display: none; }\n}\n";
const api1 = (() => {
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

return { mount: mountMatteButtons };
})();

const style3 = "\n/* Independent button styles. Colors and preview scale are editable tokens. */\n.sl-copy {\n  --copy-unit: 1px;\n  --copy-ink: #202222;\n  --copy-hover: #2c2e2e;\n  --copy-feedback: #3d4040;\n  --copy-text: #fafaf9;\n  --copy-focus: #565b5b;\n  --copy-ease: cubic-bezier(.22, 1, .36, 1);\n  position: relative;\n  display: block;\n  width: calc(184 * var(--copy-unit));\n  height: calc(52 * var(--copy-unit));\n  padding: 0;\n  border: 0;\n  border-radius: calc(13 * var(--copy-unit));\n  appearance: none;\n  background: transparent;\n  color: var(--copy-text);\n  font: 550 calc(19 * var(--copy-unit))/1.1 'Instrument Sans', sans-serif;\n  letter-spacing: -.02em;\n  font-synthesis: none;\n  cursor: pointer;\n  touch-action: manipulation;\n  user-select: none;\n  -webkit-tap-highlight-color: transparent;\n}\n.sl-copy *, .sl-copy *::before, .sl-copy *::after { box-sizing: border-box; }\n.sl-copy:focus-visible { outline: 2px solid var(--copy-focus); outline-offset: 6px; }\n.sl-copy[aria-disabled=\"true\"] { cursor: wait; }\n.sl-copy:disabled { cursor: not-allowed; opacity: .5; }\n.sl-copy__surface {\n  position: absolute;\n  inset: 0;\n  display: grid;\n  place-items: center;\n  overflow: hidden;\n  isolation: isolate;\n  border-radius: inherit;\n  background-color: var(--copy-ink);\n  background-image: linear-gradient(155deg, #ffffff06, transparent 68%);\n  box-shadow: inset 0 1px #ffffff12, 0 1px 2px #0000000d;\n  transition: transform 350ms var(--copy-ease), background-color 350ms ease, box-shadow 350ms ease;\n}\n@media (hover: hover) {\n  .sl-copy:not(:disabled):not([aria-disabled=\"true\"]):hover .sl-copy__surface { transform: translateY(-2px); background-color: var(--copy-hover); box-shadow: inset 0 1px #ffffff17, 0 6px 12px -8px #00000047; }\n}\n.sl-copy:not(:disabled):not([aria-disabled=\"true\"]):active .sl-copy__surface { transform: translateY(1px) scale(.98); transition-duration: 120ms; }\n.sl-copy__wash { position: absolute; inset: 0; z-index: -1; background: var(--copy-feedback); opacity: 0; transition: opacity 650ms cubic-bezier(.4, 0, .2, 1); }\n.sl-copy[data-state=\"copied\"] .sl-copy__wash { opacity: 1; }\n.sl-copy__label { position: relative; display: block; white-space: nowrap; }\n.sl-copy__icon { position: absolute; left: calc(25 * var(--copy-unit)); top: 50%; width: calc(21 * var(--copy-unit)); height: calc(24 * var(--copy-unit)); transform: translateY(-50%); }\n.sl-copy__icon svg { position: absolute; inset: 0; display: block; width: 100%; height: 100%; fill: none; stroke: currentColor; stroke-width: 1.7; stroke-linecap: round; stroke-linejoin: round; }\n.sl-copy__sheets { opacity: 1; transition: opacity 240ms ease 240ms; }\n.sl-copy__back { transition: transform 460ms var(--copy-ease); }\n.sl-copy__front { fill: var(--copy-ink); transition: transform 460ms var(--copy-ease), fill 350ms ease; }\n@media (hover: hover) {\n  .sl-copy:hover .sl-copy__front { fill: var(--copy-hover); }\n}\n.sl-copy__check { opacity: 0; transition: opacity 200ms ease; }\n.sl-copy__check path { stroke-width: 2.5; stroke-dasharray: 1; stroke-dashoffset: 1; transition: stroke-dashoffset 400ms var(--copy-ease); }\n.sl-copy[data-state=\"copied\"] .sl-copy__back { transform: translate(2.5px, 2px); }\n.sl-copy[data-state=\"copied\"] .sl-copy__front { transform: translate(-2.5px, -2px); fill: var(--copy-feedback); }\n.sl-copy[data-state=\"copied\"] .sl-copy__sheets { opacity: 0; transition-delay: 200ms; }\n.sl-copy[data-state=\"copied\"] .sl-copy__check { opacity: 1; transition-delay: 440ms; }\n.sl-copy[data-state=\"copied\"] .sl-copy__check path { stroke-dashoffset: 0; transition-delay: 440ms; }\n.sl-copy[data-state=\"idle\"] .sl-copy__check path { transition-delay: 0ms; }\n@media (prefers-reduced-motion: reduce) {\n  .sl-copy .sl-copy__surface, .sl-copy:hover .sl-copy__surface, .sl-copy:active .sl-copy__surface { transform: none; }\n  .sl-copy *, .sl-copy svg, .sl-copy path, .sl-copy rect { transition: none !important; animation: none !important; }\n  .sl-copy:active .sl-copy__surface { opacity: .9; }\n}\n@media (forced-colors: active) {\n  .sl-copy__surface { border: 1px solid ButtonText; background: ButtonFace; color: ButtonText; }\n  .sl-copy__wash { display: none; }\n  .sl-copy__front { fill: ButtonFace !important; }\n  .sl-copy:focus-visible { outline-color: Highlight; }\n}\n";
const api2 = (() => {
const instances = new WeakMap();

/** Copy immediately on activation; show confirmation only after a successful write. */
function mountCopyButton(button, { getText, feedback, holdMs = 1700, writeText } = {}) {
  if (instances.has(button)) return instances.get(button);
  if (!button || typeof getText !== 'function') throw new TypeError('A button and getText callback are required.');
  const label = button.querySelector('.sl-copy__label');
  if (!label) throw new TypeError('The button needs a .sl-copy__label element.');
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const write = writeText || (text => {
    if (!navigator.clipboard?.writeText) throw new Error('Clipboard access is unavailable.');
    return navigator.clipboard.writeText(text);
  });
  const confirmationMs = Number.isFinite(holdMs) ? Math.max(800, holdMs) : 1700;
  let version = 0;
  let labelVersion = 0;
  let animation;
  let busy = false;
  let destroyed = false;
  let pendingTimer;
  let returnTimer;
  let currentLabel = 'Copy';

  function say(message) { if (feedback) feedback.textContent = message; }
  function unlock() { busy = false; button.removeAttribute('aria-busy'); button.removeAttribute('aria-disabled'); }
  function clearTimers() { clearTimeout(pendingTimer); clearTimeout(returnTimer); }
  function settleLabel() {
    labelVersion++;
    animation?.cancel();
    animation = null;
    label.textContent = currentLabel;
    label.style.removeProperty('opacity');
  }
  async function setLabel(text) {
    if (text === currentLabel) return;
    currentLabel = text;
    const turn = ++labelVersion;
    // Only an interrupted fade needs its current rendered opacity.
    const from = animation ? getComputedStyle(label).opacity : 1;
    animation?.cancel();
    if (motion.matches || !label.animate) { settleLabel(); return; }
    try {
      // One text node: the outgoing and incoming words can never overlap.
      animation = label.animate([{ opacity: from }, { opacity: 0 }], { duration: 240, easing: 'cubic-bezier(.4,0,.2,1)', fill: 'forwards' });
      await animation.finished;
      if (turn !== labelVersion || destroyed) return;
      label.style.opacity = '0';
      animation.cancel();
      label.textContent = text;
      animation = label.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 360, easing: 'cubic-bezier(.4,0,.2,1)', fill: 'forwards' });
      await animation.finished;
      if (turn !== labelVersion || destroyed) return;
      label.style.removeProperty('opacity');
      animation.cancel();
      animation = null;
    } catch (error) {
      if (error.name !== 'AbortError') { if (turn === labelVersion) settleLabel(); }
    }
  }
  function reset() {
    if (destroyed) return;
    version++;
    clearTimers();
    unlock();
    button.dataset.state = 'idle';
    setLabel('Copy');
    say('');
  }
  async function copy() {
    if (destroyed || busy || button.disabled || button.getAttribute('aria-disabled') === 'true') return;
    const request = ++version;
    clearTimers();
    busy = true;
    button.setAttribute('aria-busy', 'true');
    button.setAttribute('aria-disabled', 'true');
    say('');
    pendingTimer = setTimeout(() => {
      if (request === version && !destroyed) { setLabel('Copying'); say('Waiting for clipboard permission.'); }
    }, 700);
    try {
      const text = getText();
      if (typeof text !== 'string') throw new TypeError('getText must return a string.');
      // Keep the clipboard call within the original user activation.
      await write(text);
      if (request !== version || destroyed) return;
      clearTimeout(pendingTimer);
      unlock();
      button.dataset.state = 'copied';
      setLabel('Copied');
      say('Copied to clipboard.');
      returnTimer = setTimeout(() => {
        if (request !== version || destroyed) return;
        button.dataset.state = 'idle';
        setLabel('Copy');
      }, confirmationMs);
    } catch {
      if (request !== version || destroyed) return;
      clearTimeout(pendingTimer);
      unlock();
      button.dataset.state = 'error';
      setLabel('Try again');
      say('Clipboard access was blocked. Select the text and copy it manually, or try again.');
    }
  }
  function onMotionChange() { if (motion.matches) settleLabel(); }
  button.addEventListener('click', copy);
  motion.addEventListener('change', onMotionChange);
  button.disabled = false;
  const controller = {
    reset,
    destroy() {
      if (destroyed) return;
      destroyed = true;
      version++;
      clearTimers();
      currentLabel = 'Copy';
      settleLabel();
      unlock();
      button.dataset.state = 'idle';
      button.disabled = true;
      button.removeEventListener('click', copy);
      motion.removeEventListener('change', onMotionChange);
      instances.delete(button);
    },
  };
  instances.set(button, controller);
  return controller;
}

return { mount: mountCopyButton };
})();

const style4 = "\n.sl-like {\n  --like-unit: 1px;\n  --like-ink: #202222;\n  --like-hover: #2c2e2e;\n  --like-active: #3d4040;\n  --like-text: #fafaf9;\n  --like-focus: #565b5b;\n  --like-ease: cubic-bezier(.22,1,.36,1);\n  display: block;\n  position: relative;\n  width: calc(184 * var(--like-unit));\n  height: calc(52 * var(--like-unit));\n  padding: 0;\n  border: 0;\n  border-radius: calc(13 * var(--like-unit));\n  appearance: none;\n  background: transparent;\n  color: var(--like-text);\n  font: 550 calc(19 * var(--like-unit))/1.1 'Instrument Sans', sans-serif;\n  letter-spacing: -.02em;\n  cursor: pointer;\n  touch-action: manipulation;\n  user-select: none;\n  -webkit-tap-highlight-color: transparent;\n}\n.sl-like *, .sl-like *::before, .sl-like *::after { box-sizing: border-box; }\n.sl-like:disabled, .sl-like[aria-disabled=\"true\"] { opacity: .5; cursor: not-allowed; }\n.sl-like:focus-visible { outline: 2px solid var(--like-focus); outline-offset: 6px; }\n.sl-like__surface { position: absolute; inset: 0; display: grid; place-items: center; overflow: hidden; isolation: isolate; border-radius: inherit; background-color: var(--like-ink); background-image: linear-gradient(155deg,#ffffff06,transparent 68%); box-shadow: inset 0 1px #ffffff12,0 1px 2px #0000000d; transition: transform 350ms var(--like-ease),background-color 350ms ease,box-shadow 350ms ease; }\n@media (hover: hover) {\n  .sl-like:not(:disabled):not([aria-disabled=\"true\"]):hover .sl-like__surface { transform: translateY(-2px); background-color: var(--like-hover); box-shadow: inset 0 1px #ffffff17,0 6px 12px -8px #00000047; }\n}\n.sl-like:not(:disabled):not([aria-disabled=\"true\"]):active .sl-like__surface { transform: translateY(1px) scale(.98); transition-duration: 120ms; }\n.sl-like__wash { position: absolute; inset: 0; z-index: -1; background: var(--like-active); opacity: 0; transition: opacity 650ms cubic-bezier(.4,0,.2,1); }\n.sl-like[aria-pressed=\"true\"] .sl-like__wash { opacity: 1; }\n.sl-like__label { display: block; position: relative; white-space: nowrap; }\n.sl-like__icon { position: absolute; left: calc(25 * var(--like-unit)); top: 50%; width: calc(23 * var(--like-unit)); height: calc(24 * var(--like-unit)); transform: translateY(-50%); }\n.sl-like__heart { display: block; width: 100%; height: 100%; overflow: visible; transform-origin: center; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }\n.sl-like__fill { fill: currentColor; stroke: none; clip-path: inset(100% 0 0 0); transition: clip-path 480ms cubic-bezier(.4,0,.2,1); }\n.sl-like[aria-pressed=\"true\"] .sl-like__fill { clip-path: inset(0 0 0 0); }\n@media (prefers-reduced-motion: reduce) {\n  .sl-like *, .sl-like svg, .sl-like path { transition: none !important; animation: none !important; }\n  .sl-like .sl-like__surface, .sl-like:hover .sl-like__surface, .sl-like:active .sl-like__surface { transform: none; }\n  .sl-like:active .sl-like__surface { opacity: .9; }\n}\n@media (forced-colors: active) {\n  .sl-like__surface { border: 1px solid ButtonText; background: ButtonFace; color: ButtonText; }\n  .sl-like__wash { display: none; }\n  .sl-like:focus-visible { outline-color: Highlight; }\n}\n";
const api3 = (() => {
const mounted = new WeakMap();

// Local toggle state. Listen for likechange to connect your own persistence.
function mountLikeButton(button, { feedback } = {}) {
  if (mounted.has(button)) return mounted.get(button);
  if (!button?.querySelector) throw new TypeError('A Like button is required.');
  const label = button.querySelector('.sl-like__label');
  const heart = button.querySelector('.sl-like__heart');
  if (!label || !heart) throw new TypeError('The Like button needs its label and heart elements.');
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  let pressed = button.getAttribute('aria-pressed') === 'true';
  let targetLabel = pressed ? 'Liked' : 'Like';
  let labelAnimation;
  let heartbeat;
  let revision = 0;
  let destroyed = false;

  function settle() {
    revision++;
    labelAnimation?.cancel();
    heartbeat?.cancel();
    labelAnimation = heartbeat = null;
    label.textContent = targetLabel;
    label.style.removeProperty('opacity');
  }
  async function changeLabel(text, opacity = 1) {
    if (text === targetLabel) return;
    targetLabel = text;
    const id = ++revision;
    labelAnimation?.cancel();
    if (motion.matches || !label.animate) { settle(); return; }
    try {
      labelAnimation = label.animate([{ opacity }, { opacity: 0 }], { duration: 180, easing: 'cubic-bezier(.4,0,.2,1)', fill: 'forwards' });
      await labelAnimation.finished;
      if (id !== revision || destroyed) return;
      label.style.opacity = '0';
      labelAnimation.cancel();
      label.textContent = text;
      labelAnimation = label.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 300, easing: 'cubic-bezier(.4,0,.2,1)', fill: 'forwards' });
      await labelAnimation.finished;
      if (id !== revision || destroyed) return;
      label.style.removeProperty('opacity');
      labelAnimation.cancel();
      labelAnimation = null;
    } catch (error) {
      if (error.name !== 'AbortError' && id === revision) settle();
    }
  }
  function pulse(next, from = 'none') {
    heartbeat?.cancel();
    if (motion.matches || !heart.animate) return;
    const frames = next
      ? [{ transform: from }, { transform: 'scale(.9)', offset: .18 }, { transform: 'scale(1.14)', offset: .5 }, { transform: 'scale(.985)', offset: .8 }, { transform: 'scale(1)' }]
      : [{ transform: from }, { transform: 'scale(.94)', offset: .4 }, { transform: 'scale(1)' }];
    heartbeat = heart.animate(frames, { duration: next ? 620 : 420, easing: 'cubic-bezier(.4,0,.2,1)' });
    const active = heartbeat;
    active.onfinish = () => {
      if (heartbeat === active) heartbeat = null;
      active.cancel();
    };
  }
  function setPressed(next, notify = false) {
    if (destroyed || pressed === Boolean(next)) return;
    // Read only interrupted motion, and do it before the state/style write.
    const opacity = labelAnimation ? getComputedStyle(label).opacity : 1;
    const transform = heartbeat ? getComputedStyle(heart).transform : 'none';
    pressed = Boolean(next);
    button.setAttribute('aria-pressed', String(pressed));
    changeLabel(pressed ? 'Liked' : 'Like', opacity);
    pulse(pressed, transform);
    if (feedback) feedback.textContent = pressed ? 'Liked. Click again to undo.' : 'Like removed.';
    if (notify) button.dispatchEvent(new CustomEvent('likechange', { bubbles: true, detail: { pressed } }));
  }
  function toggle() {
    if (!button.disabled && button.getAttribute('aria-disabled') !== 'true') setPressed(!pressed, true);
  }
  function onMotionChange() { if (motion.matches) settle(); }
  label.textContent = targetLabel;
  button.disabled = false;
  button.addEventListener('click', toggle);
  motion.addEventListener('change', onMotionChange);
  const controller = {
    setPressed: value => setPressed(value),
    reset() { if (destroyed) return; setPressed(false); if (feedback) feedback.textContent = 'Try the button. Your selection stays until you undo it.'; },
    destroy() {
      if (destroyed) return;
      destroyed = true;
      settle();
      button.disabled = true;
      button.removeEventListener('click', toggle);
      motion.removeEventListener('change', onMotionChange);
      mounted.delete(button);
    },
  };
  mounted.set(button, controller);
  return controller;
}

return { mount: mountLikeButton };
})();

const style5 = "\n.sl-download {\n  --download-unit: 1px;\n  --download-ink: #202222;\n  --download-hover: #2c2e2e;\n  --download-active: #3d4040;\n  --download-text: #fafaf9;\n  --download-focus: #565b5b;\n  --download-ease: cubic-bezier(.22,1,.36,1);\n  display: block;\n  position: relative;\n  width: calc(208 * var(--download-unit));\n  height: calc(52 * var(--download-unit));\n  padding: 0;\n  border: 0;\n  border-radius: calc(13 * var(--download-unit));\n  appearance: none;\n  background: transparent;\n  color: var(--download-text);\n  font: 550 calc(19 * var(--download-unit))/1.1 'Instrument Sans', sans-serif;\n  letter-spacing: -.02em;\n  cursor: pointer;\n  touch-action: manipulation;\n  user-select: none;\n  -webkit-tap-highlight-color: transparent;\n}\n.sl-download *, .sl-download *::before, .sl-download *::after { box-sizing: border-box; }\n.sl-download:disabled { opacity: .5; cursor: not-allowed; }\n.sl-download[aria-disabled=\"true\"] { cursor: wait; }\n.sl-download:focus-visible { outline: 2px solid var(--download-focus); outline-offset: 6px; }\n.sl-download__surface { position: absolute; inset: 0; display: grid; place-items: center; overflow: hidden; isolation: isolate; border-radius: inherit; background: var(--download-ink); box-shadow: inset 0 1px #ffffff12,0 1px 2px #0000000d; transition: transform 350ms var(--download-ease),background-color 350ms ease,box-shadow 350ms ease; }\n@media (hover: hover) {\n  .sl-download:not(:disabled):not([aria-disabled=\"true\"]):hover .sl-download__surface { transform: translateY(-2px); background: var(--download-hover); box-shadow: inset 0 1px #ffffff17,0 6px 12px -8px #00000047; }\n}\n.sl-download:not(:disabled):not([aria-disabled=\"true\"]):active .sl-download__surface { transform: translateY(1px) scale(.98); transition-duration: 120ms; }\n.sl-download__wash { position: absolute; inset: 0; z-index: -1; background: var(--download-active); opacity: 0; transition: opacity 550ms cubic-bezier(.4,0,.2,1); }\n.sl-download[data-download-state=\"ready\"] .sl-download__wash { opacity: 1; }\n.sl-download__label { display: block; position: relative; white-space: nowrap; }\n.sl-download__icon { position: absolute; left: calc(23 * var(--download-unit)); top: 50%; width: calc(23 * var(--download-unit)); height: calc(24 * var(--download-unit)); transform: translateY(-50%); }\n.sl-download__icon svg { display: block; width: 100%; height: 100%; overflow: visible; fill: none; stroke: currentColor; stroke-width: 1.7; stroke-linecap: round; stroke-linejoin: round; }\n.sl-download__arrow { transform-box: view-box; transform-origin: 12px 17px; transition: transform 420ms cubic-bezier(.32,0,.16,1) 180ms,opacity 220ms ease 220ms; }\n.sl-download__tray { transform-box: view-box; transform-origin: 12px 17px; transform: translate(0,0) scale(1); transition: transform 520ms cubic-bezier(.22,1,.36,1); }\n.sl-download__tray-left, .sl-download__tray-right { transform-box: view-box; transform-origin: 9px 20.5px; transition: transform 520ms cubic-bezier(.22,1,.36,1); }\n.sl-download__rim-left, .sl-download__rim-right { transform-box: view-box; transition: transform 260ms ease,opacity 180ms ease; }\n.sl-download__rim-left { transform-origin: 4.5px 20.5px; }\n.sl-download__rim-right { transform-origin: 19.5px 20.5px; }\n.sl-download[data-download-icon=\"pending\"] .sl-download__arrow,\n.sl-download[data-download-icon=\"ready\"] .sl-download__arrow { transform: translateY(3.5px) scale(.18); opacity: 0; transition-delay: 0ms,130ms; }\n.sl-download[data-download-icon=\"ready\"] .sl-download__tray { transform: translate(1.5px,-4.7px) scale(1.5); transition-delay: 60ms; }\n.sl-download[data-download-icon=\"ready\"] .sl-download__tray-left { transform: rotate(45deg); transition-delay: 60ms; }\n.sl-download[data-download-icon=\"ready\"] .sl-download__tray-right { transform: rotate(-45deg); transition-delay: 60ms; }\n.sl-download[data-download-icon=\"ready\"] .sl-download__rim-left,\n.sl-download[data-download-icon=\"ready\"] .sl-download__rim-right { transform: scaleY(.15); opacity: 0; }\n.sl-download[data-download-static] .sl-download__icon * { transition: none !important; }\n@media (prefers-reduced-motion: reduce) {\n  .sl-download *, .sl-download svg, .sl-download path { transition: none !important; animation: none !important; }\n  .sl-download .sl-download__surface, .sl-download:hover .sl-download__surface, .sl-download:active .sl-download__surface { transform: none; }\n  .sl-download:active .sl-download__surface { opacity: .9; }\n}\n@media (forced-colors: active) {\n  .sl-download__surface { border: 1px solid ButtonText; background: ButtonFace; color: ButtonText; }\n  .sl-download__wash { display: none; }\n  .sl-download:focus-visible { outline-color: Highlight; }\n}\n";
const api4 = (() => {
const mounted = new WeakMap();

// By default, getFile({ signal }) returns a Blob or { blob, filename }, sync or async.
// An optional handoff(file, { signal, filename }) replaces the native download entirely.
// With handoff, getFile may return application data instead of a Blob.
function mountDownloadButton(button, {
  getFile,
  handoff,
  feedback,
  messages = {},
  filename = 'download.txt',
  idleMessage = 'Choose Download to get the file.',
} = {}) {
  if (mounted.has(button)) return mounted.get(button);
  if (button?.tagName !== 'BUTTON') throw new TypeError('A Download button is required.');
  if (typeof getFile !== 'function') throw new TypeError('Download needs a getFile callback.');
  if (handoff !== undefined && typeof handoff !== 'function') throw new TypeError('handoff must be a function.');
  const label = button.querySelector('.sl-download__label');
  const arrow = button.querySelector('.sl-download__arrow');
  const tray = button.querySelector('.sl-download__tray');
  if (!label || !arrow || !tray) throw new TypeError('The Download button needs its label, arrow, and tray.');
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  let state = 'idle';
  let revision = 0;
  let labelRevision = 0;
  let destroyed = false;
  let request;
  let labelAnimation;
  let labelTimer;
  let returnTimer;
  let targetLabel = 'Download';

  function setState(next) {
    state = next;
    button.dataset.downloadState = next;
    button.setAttribute('aria-busy', String(next === 'pending'));
    if (next === 'pending') button.setAttribute('aria-disabled', 'true');
    else button.removeAttribute('aria-disabled');
  }
  function settleLabel(text = targetLabel) {
    labelRevision++;
    labelAnimation?.cancel();
    labelAnimation = null;
    label.textContent = targetLabel = text;
    label.style.removeProperty('opacity');
  }
  async function changeLabel(text) {
    if (text === targetLabel) return;
    const opacity = labelAnimation ? getComputedStyle(label).opacity : 1;
    const id = ++labelRevision;
    targetLabel = text;
    labelAnimation?.cancel();
    if (motion.matches || !label.animate) { settleLabel(); return; }
    try {
      labelAnimation = label.animate([{ opacity }, { opacity: 0 }], { duration: 160, easing: 'ease', fill: 'forwards' });
      await labelAnimation.finished;
      if (id !== labelRevision || destroyed) return;
      label.style.opacity = '0';
      labelAnimation.cancel();
      label.textContent = text;
      labelAnimation = label.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 280, easing: 'ease', fill: 'forwards' });
      await labelAnimation.finished;
      if (id === labelRevision && !destroyed) settleLabel();
    } catch (error) {
      if (error.name !== 'AbortError' && id === labelRevision) settleLabel();
    }
  }
  function setIcon(next, immediate = false) {
    button.toggleAttribute('data-download-static', immediate);
    button.dataset.downloadIcon = next;
  }
  function clearTimers() {
    clearTimeout(labelTimer);
    clearTimeout(returnTimer);
  }
  function sendFile(blob, name) {
    const url = URL.createObjectURL(blob);
    const link = button.ownerDocument.createElement('a');
    link.href = url;
    link.download = name;
    link.hidden = true;
    try {
      button.ownerDocument.body.append(link);
      link.click();
    } finally {
      link.remove();
      // Let the browser consume the URL. This cleanup also runs after unmounting.
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    }
  }
  async function start() {
    if (destroyed || button.disabled || state === 'pending' || button.getAttribute('aria-disabled') === 'true') return false;
    const id = ++revision;
    const startedAt = performance.now();
    request = new AbortController();
    clearTimers();
    setState('pending');
    changeLabel('Download');
    setIcon('pending');
    if (feedback) feedback.textContent = messages?.pending ?? 'Preparing file…';
    try {
      const file = await getFile({ signal: request.signal });
      if (destroyed || id !== revision) return false;
      const blob = file instanceof Blob ? file : file?.blob;
      const name = file instanceof Blob ? filename : file?.filename || filename;
      if (handoff) {
        await handoff(file, { signal: request.signal, filename: String(name) });
        if (destroyed || id !== revision) return false;
      } else {
        if (!(blob instanceof Blob)) throw new TypeError('getFile must return a Blob or { blob, filename }.');
        sendFile(blob, String(name));
        // The anchor click may synchronously reset or unmount its containing view.
        if (destroyed || id !== revision) return true;
      }
      request = null;
      setState('ready');
      if (feedback) feedback.textContent = messages?.complete ?? 'Download started.';
      // Only the visual confirmation waits for the arrow; the handoff has finished.
      labelTimer = setTimeout(() => {
        if (id !== revision || destroyed) return;
        setIcon('ready');
        changeLabel('Complete');
      }, motion.matches ? 0 : Math.max(0, 380 - (performance.now() - startedAt)));
      returnTimer = setTimeout(() => {
        if (id !== revision || destroyed) return;
        setState('idle');
        setIcon('idle');
        changeLabel('Download');
      }, 2200);
      button.dispatchEvent(new CustomEvent(handoff ? 'downloadhandoff' : 'downloadstart', { bubbles: true, detail: { filename: String(name) } }));
      return true;
    } catch (error) {
      if (destroyed || id !== revision) return false;
      request = null;
      setState('error');
      setIcon('idle');
      changeLabel('Try again');
      if (feedback) feedback.textContent = messages?.error ?? 'The download could not start. Try again.';
      button.dispatchEvent(new CustomEvent('downloaderror', { bubbles: true, detail: { error } }));
      return false;
    }
  }
  function onClick() { void start(); }
  function onMotionChange() {
    if (!motion.matches) return;
    clearTimeout(labelTimer);
    setIcon(state === 'ready' ? 'ready' : state === 'pending' ? 'pending' : 'idle');
    settleLabel(state === 'ready' ? 'Complete' : state === 'error' ? 'Try again' : 'Download');
  }
  function reset() {
    if (destroyed) return;
    revision++;
    request?.abort();
    request = null;
    clearTimers();
    setIcon('idle', true);
    settleLabel('Download');
    setState('idle');
    if (feedback) feedback.textContent = idleMessage;
  }
  reset();
  button.disabled = false;
  button.addEventListener('click', onClick);
  motion.addEventListener('change', onMotionChange);
  const controller = {
    start,
    reset,
    get state() { return state; },
    destroy() {
      if (destroyed) return;
      reset();
      destroyed = true;
      button.disabled = true;
      button.removeEventListener('click', onClick);
      motion.removeEventListener('change', onMotionChange);
      mounted.delete(button);
    },
  };
  mounted.set(button, controller);
  return controller;
}

return { mount: mountDownloadButton };
})();

const downloadDemo = (() => {
const mountDownloadButton = api4.mount;
// Library-only simulation. It creates no files or URLs and never opens a download.
function mountDownloadDemo(button, { feedback } = {}) {
  button.setAttribute('aria-label', 'Preview Download animation');
  return mountDownloadButton(button, {
    feedback,
    idleMessage: 'Demo only. No file is downloaded.',
    messages: {
      pending: 'Demo only. Previewing Download…',
      complete: 'Preview complete. No file was downloaded.',
      error: 'Preview interrupted. Try again.',
    },
    getFile: ({ signal }) => new Promise((resolve, reject) => {
      if (signal.aborted) { reject(new DOMException('Canceled', 'AbortError')); return; }
      const abort = () => { clearTimeout(timer); reject(new DOMException('Canceled', 'AbortError')); };
      const timer = setTimeout(() => {
        signal.removeEventListener('abort', abort);
        resolve({ filename: 'preview' });
      }, 850);
      signal.addEventListener('abort', abort, { once: true });
    }),
    handoff: () => {},
  });
}

return mountDownloadDemo;
})();
const style6 = "\n.sl-bookmark {\n  --bookmark-unit: 1px;\n  --bookmark-ink: #202222;\n  --bookmark-hover: #2c2e2e;\n  --bookmark-active: #3d4040;\n  --bookmark-text: #fafaf9;\n  --bookmark-focus: #565b5b;\n  --bookmark-ease: cubic-bezier(.4, 0, .2, 1);\n  display: block;\n  position: relative;\n  flex: none;\n  width: calc(236 * var(--bookmark-unit));\n  height: calc(52 * var(--bookmark-unit));\n  padding: 0;\n  border: 0;\n  border-radius: calc(13 * var(--bookmark-unit));\n  appearance: none;\n  background: transparent;\n  color: var(--bookmark-text);\n  font: 550 calc(19 * var(--bookmark-unit))/1.1 'Instrument Sans', sans-serif;\n  letter-spacing: -.02em;\n  text-align: center;\n  cursor: pointer;\n  touch-action: manipulation;\n  user-select: none;\n  -webkit-tap-highlight-color: transparent;\n}\n.sl-bookmark *, .sl-bookmark *::before, .sl-bookmark *::after { box-sizing: border-box; }\n.sl-bookmark:disabled, .sl-bookmark[aria-disabled=\"true\"] { opacity: .5; cursor: not-allowed; }\n.sl-bookmark:focus-visible { outline: 2px solid var(--bookmark-focus); outline-offset: 6px; }\n.sl-bookmark .sl-bookmark__surface {\n  position: absolute;\n  inset: 0;\n  display: grid;\n  place-items: center;\n  overflow: hidden;\n  isolation: isolate;\n  border-radius: inherit;\n  background: var(--bookmark-ink);\n  box-shadow: inset 0 1px #ffffff12, 0 1px 2px #0000000d;\n  transition: transform 350ms cubic-bezier(.22, 1, .36, 1), background-color 350ms ease, box-shadow 350ms ease;\n}\n@media (hover: hover) and (forced-colors: none) {\n  .sl-bookmark:not(:disabled):not([aria-disabled=\"true\"]):hover .sl-bookmark__surface {\n    transform: translateY(-2px);\n    background-color: var(--bookmark-hover);\n    box-shadow: inset 0 1px #ffffff17, 0 6px 12px -8px #00000047;\n  }\n}\n.sl-bookmark:not(:disabled):not([aria-disabled=\"true\"]):active .sl-bookmark__surface { transform: translateY(1px) scale(.98); transition-duration: 120ms; }\n.sl-bookmark .sl-bookmark__wash { position: absolute; inset: 0; z-index: -1; background: var(--bookmark-active); opacity: 0; transition: opacity 540ms var(--bookmark-ease); }\n.sl-bookmark[aria-pressed=\"true\"] .sl-bookmark__wash { opacity: 1; }\n.sl-bookmark .sl-bookmark__label { position: absolute; inset: 0 calc(56 * var(--bookmark-unit)); display: grid; place-items: center; text-align: center; white-space: nowrap; }\n.sl-bookmark .sl-bookmark__icon { position: absolute; left: calc(18 * var(--bookmark-unit)); top: 50%; width: calc(22 * var(--bookmark-unit)); height: calc(24 * var(--bookmark-unit)); transform: translateY(-50%); }\n.sl-bookmark .sl-bookmark__ribbon {\n  display: block;\n  width: 100%;\n  height: 100%;\n  overflow: visible;\n  fill: none;\n  stroke: currentColor;\n  stroke-width: 1.8;\n  stroke-linecap: round;\n  stroke-linejoin: round;\n  transform-box: view-box;\n  transform-origin: 50% 12.5%;\n  transform: translateY(0) scaleY(1);\n  transition: transform 540ms var(--bookmark-ease);\n}\n.sl-bookmark[aria-pressed=\"true\"] .sl-bookmark__ribbon { transform: translateY(calc(-1.2 * var(--bookmark-unit))) scaleY(.88); }\n.sl-bookmark .sl-bookmark__fill { fill: currentColor; stroke: none; clip-path: inset(0 0 100% 0); transition: clip-path 540ms var(--bookmark-ease); }\n.sl-bookmark[aria-pressed=\"true\"] .sl-bookmark__fill { clip-path: inset(0); }\n@media (prefers-reduced-motion: reduce) {\n  .sl-bookmark *, .sl-bookmark *::before, .sl-bookmark *::after { transition: none !important; animation: none !important; }\n  .sl-bookmark .sl-bookmark__surface, .sl-bookmark:hover .sl-bookmark__surface, .sl-bookmark:active .sl-bookmark__surface, .sl-bookmark[aria-pressed] .sl-bookmark__ribbon { transform: none !important; }\n  .sl-bookmark:active .sl-bookmark__surface { opacity: .9; }\n}\n@media (forced-colors: active) {\n  .sl-bookmark .sl-bookmark__surface { forced-color-adjust: none; border: 1px solid ButtonText; background: ButtonFace; color: ButtonText; box-shadow: none; }\n  .sl-bookmark[aria-pressed=\"true\"] .sl-bookmark__surface { background: Highlight; color: HighlightText; border-color: Highlight; }\n  .sl-bookmark .sl-bookmark__wash { display: none; }\n  .sl-bookmark:focus-visible { outline-color: Highlight; }\n}\n";
const api5 = (() => {
const mounted = new WeakMap();
const initialFeedback = 'Try the button. Your selection stays until you undo it.';

// This component holds local state. Connect bookmarkchange to your own data layer.
function mountBookmarkButton(button, { feedback } = {}) {
  if (mounted.has(button)) return mounted.get(button);
  if (button?.tagName !== 'BUTTON') throw new TypeError('A native Bookmark button is required.');
  const label = button.querySelector('.sl-bookmark__label');
  const ribbon = button.querySelector('.sl-bookmark__ribbon');
  if (!label || !ribbon) throw new TypeError('The Bookmark button needs its label and ribbon elements.');
  const view = button.ownerDocument.defaultView;
  const motion = view.matchMedia('(prefers-reduced-motion: reduce)');
  let pressed = button.getAttribute('aria-pressed') === 'true';
  let targetLabel = pressed ? 'Bookmarked' : 'Bookmark';
  let labelAnimation = null;
  let revision = 0;
  let destroyed = false;

  function settleLabel() {
    revision++;
    labelAnimation?.cancel();
    labelAnimation = null;
    label.textContent = targetLabel;
    label.style.removeProperty('opacity');
  }

  async function changeLabel(text) {
    if (text === targetLabel) return;
    const opacity = labelAnimation ? view.getComputedStyle(label).opacity : '1';
    targetLabel = text;
    const id = ++revision;
    // Keep the currently rendered opacity when an unfinished fade reverses.
    label.style.opacity = opacity;
    labelAnimation?.cancel();
    if (motion.matches || !label.animate) { settleLabel(); return; }
    try {
      if (label.textContent !== text) {
        labelAnimation = label.animate([{ opacity }, { opacity: 0 }], {
          duration: 180, easing: 'cubic-bezier(.4,0,.2,1)', fill: 'forwards',
        });
        await labelAnimation.finished;
        if (id !== revision || destroyed) return;
        label.style.opacity = '0';
        labelAnimation.cancel();
        label.textContent = text;
      }
      labelAnimation = label.animate([{ opacity: label.style.opacity }, { opacity: 1 }], {
        duration: 300, easing: 'cubic-bezier(.4,0,.2,1)', fill: 'forwards',
      });
      await labelAnimation.finished;
      if (id !== revision || destroyed) return;
      label.style.removeProperty('opacity');
      labelAnimation.cancel();
      labelAnimation = null;
    } catch (error) {
      if (error.name !== 'AbortError' && id === revision) settleLabel();
    }
  }

  function setPressed(value, notify = false) {
    const next = Boolean(value);
    if (destroyed || pressed === next) return;
    pressed = next;
    button.setAttribute('aria-pressed', String(pressed));
    changeLabel(pressed ? 'Bookmarked' : 'Bookmark');
    if (feedback) feedback.textContent = pressed ? 'Bookmarked. Click again to undo.' : 'Bookmark removed.';
    if (notify) button.dispatchEvent(new view.CustomEvent('bookmarkchange', { bubbles: true, detail: { pressed } }));
  }

  function toggle() {
    if (!button.disabled && button.getAttribute('aria-disabled') !== 'true') setPressed(!pressed, true);
  }
  function onMotionChange() { if (motion.matches) settleLabel(); }

  button.type = 'button';
  if (!button.hasAttribute('aria-label') && !button.hasAttribute('aria-labelledby')) button.setAttribute('aria-label', 'Bookmark');
  button.setAttribute('aria-pressed', String(pressed));
  label.textContent = targetLabel;
  button.disabled = false;
  button.addEventListener('click', toggle);
  motion.addEventListener('change', onMotionChange);

  const controller = {
    setPressed: value => setPressed(value),
    reset() {
      if (destroyed) return;
      setPressed(false);
      settleLabel();
      if (feedback) feedback.textContent = initialFeedback;
    },
    destroy() {
      if (destroyed) return;
      destroyed = true;
      settleLabel();
      button.disabled = true;
      button.removeEventListener('click', toggle);
      motion.removeEventListener('change', onMotionChange);
      mounted.delete(button);
    },
  };
  mounted.set(button, controller);
  return controller;
}

return { mount: mountBookmarkButton };
})();

const style7 = "\n.sl-playback {\n  --playback-unit: 1px;\n  --playback-ink: #202222;\n  --playback-hover: #2c2e2e;\n  --playback-active: #3d4040;\n  --playback-text: #fafaf9;\n  --playback-focus: #565b5b;\n  --playback-ease: cubic-bezier(.22, 1, .36, 1);\n  box-sizing: border-box;\n  display: block;\n  position: relative;\n  width: calc(184 * var(--playback-unit));\n  height: calc(52 * var(--playback-unit));\n  padding: 0;\n  border: 0;\n  border-radius: calc(13 * var(--playback-unit));\n  appearance: none;\n  background: transparent;\n  color: var(--playback-text);\n  font: 550 calc(19 * var(--playback-unit))/1.1 'Instrument Sans', sans-serif;\n  letter-spacing: -.02em;\n  cursor: pointer;\n  touch-action: manipulation;\n  user-select: none;\n  -webkit-tap-highlight-color: transparent;\n}\n.sl-playback *, .sl-playback *::before, .sl-playback *::after { box-sizing: border-box; }\n.sl-playback:disabled, .sl-playback[aria-disabled=\"true\"] { opacity: .5; cursor: not-allowed; }\n.sl-playback:focus-visible { outline: 2px solid var(--playback-focus); outline-offset: 6px; }\n.sl-playback__surface { position: absolute; inset: 0; display: grid; place-items: center; overflow: hidden; border-radius: inherit; background: var(--playback-ink); box-shadow: inset 0 1px #ffffff12, 0 1px 2px #0000000d; transition: transform 350ms var(--playback-ease), background-color 350ms ease, box-shadow 350ms ease; }\n.sl-playback[data-playing=\"true\"] .sl-playback__surface { background-color: var(--playback-active); }\n@media (hover: hover) {\n  .sl-playback:not(:disabled):not([aria-disabled=\"true\"]):hover .sl-playback__surface { transform: translateY(-2px); box-shadow: inset 0 1px #ffffff17, 0 6px 12px -8px #00000047; }\n  .sl-playback:not(:disabled):not([aria-disabled=\"true\"]):not([data-playing=\"true\"]):hover .sl-playback__surface { background-color: var(--playback-hover); }\n}\n.sl-playback:not(:disabled):not([aria-disabled=\"true\"]):active .sl-playback__surface { transform: translateY(1px) scale(.98); transition-duration: 120ms; }\n.sl-playback__label { position: relative; display: block; text-align: center; white-space: nowrap; }\n.sl-playback__icon { position: absolute; left: calc(25 * var(--playback-unit)); top: 50%; width: calc(24 * var(--playback-unit)); height: calc(24 * var(--playback-unit)); transform: translateY(-50%); }\n.sl-playback__piece { position: absolute; inset: 0; display: block; background: currentColor; transition: clip-path 420ms cubic-bezier(.4, 0, .2, 1); }\n/* Two adjoining pieces form one triangle, then open into pause bars. */\n.sl-playback__piece--left { clip-path: polygon(29.1667% 20.8333%, 46% 31.5455%, 46% 68.4545%, 29.1667% 79.1667%); }\n.sl-playback__piece--right { clip-path: polygon(45.8333% 31.4394%, 75% 50%, 75% 50%, 45.8333% 68.5606%); }\n.sl-playback[data-playing=\"true\"] .sl-playback__piece--left { clip-path: polygon(25% 20.8333%, 41.6667% 20.8333%, 41.6667% 79.1667%, 25% 79.1667%); }\n.sl-playback[data-playing=\"true\"] .sl-playback__piece--right { clip-path: polygon(58.3333% 20.8333%, 75% 20.8333%, 75% 79.1667%, 58.3333% 79.1667%); }\n@media (prefers-reduced-motion: reduce) {\n  .sl-playback * { transition: none !important; animation: none !important; }\n  .sl-playback .sl-playback__surface { transform: none !important; }\n  .sl-playback:active .sl-playback__surface { opacity: .9; }\n}\n@media (forced-colors: active) {\n  .sl-playback .sl-playback__surface { border: 1px solid ButtonText; background: ButtonFace !important; color: ButtonText; box-shadow: none !important; }\n  .sl-playback__piece { forced-color-adjust: none; background: ButtonText; }\n  .sl-playback:focus-visible { outline-color: Highlight; }\n}\n";
const api6 = (() => {
const mounted = new WeakMap();
const initialFeedback = 'Try Play, then Pause. This preview does not play media.';

// Clicks update local state and emit playbackchange. onChange receives { playing }.
// Use setPlaying(mediaIsPlaying) to reflect your media's real state without re-emitting.
function mountPlaybackButton(button, { feedback, onChange } = {}) {
  if (!button || button.tagName !== 'BUTTON') throw new TypeError('A Play / Pause button is required.');
  if (mounted.has(button)) return mounted.get(button);
  const label = button.querySelector('.sl-playback__label');
  const icon = button.querySelector('.sl-playback__icon');
  if (!label || !icon) throw new TypeError('The Play / Pause button needs its label and icon elements.');
  if (onChange !== undefined && typeof onChange !== 'function') throw new TypeError('onChange must be a function.');

  const view = button.ownerDocument.defaultView;
  const motion = view.matchMedia('(prefers-reduced-motion: reduce)');
  let playing = button.dataset.playing === 'true';
  let targetLabel = playing ? 'Pause' : 'Play';
  let labelAnimation = null;
  let revision = 0;
  let destroyed = false;

  function settleLabel() {
    revision++;
    labelAnimation?.cancel();
    labelAnimation = null;
    label.textContent = targetLabel;
    label.style.removeProperty('opacity');
  }

  async function changeLabel(text) {
    if (text === targetLabel) return;
    const opacity = labelAnimation ? Number(view.getComputedStyle(label).opacity) : 1;
    const id = ++revision;
    targetLabel = text;
    labelAnimation?.cancel();
    labelAnimation = null;
    if (motion.matches || !label.animate) { settleLabel(); return; }
    label.style.opacity = String(opacity);

    try {
      // If a quick reversal returns to the visible word, brighten it in place.
      if (label.textContent !== text) {
        if (opacity > .001) {
          labelAnimation = label.animate([{ opacity }, { opacity: 0 }], {
            duration: 140 * opacity,
            easing: 'cubic-bezier(.4, 0, .2, 1)',
            fill: 'forwards',
          });
          await labelAnimation.finished;
          if (id !== revision || destroyed) return;
        }
        label.style.opacity = '0';
        labelAnimation?.cancel();
        label.textContent = text;
      }
      const from = Number(label.style.opacity);
      labelAnimation = label.animate([{ opacity: from }, { opacity: 1 }], {
        duration: 240 * (1 - from),
        easing: 'cubic-bezier(.4, 0, .2, 1)',
        fill: 'forwards',
      });
      await labelAnimation.finished;
      if (id !== revision || destroyed) return;
      label.style.removeProperty('opacity');
      labelAnimation.cancel();
      labelAnimation = null;
    } catch (error) {
      if (error.name !== 'AbortError' && id === revision && !destroyed) settleLabel();
    }
  }

  function setPlaying(value, notify = false) {
    const next = Boolean(value);
    if (destroyed || next === playing) return;
    playing = next;
    button.dataset.playing = String(playing);
    button.setAttribute('aria-label', playing ? 'Pause' : 'Play');
    changeLabel(playing ? 'Pause' : 'Play');
    if (feedback) feedback.textContent = playing
      ? 'Preview set to playing. Choose Pause to switch back. No media is playing.'
      : 'Preview paused. Choose Play to switch back.';
    // State and notifications change immediately, independently of the label fade.
    if (notify) {
      const detail = { playing };
      button.dispatchEvent(new view.CustomEvent('playbackchange', { bubbles: true, detail }));
      onChange?.(detail);
    }
  }

  function toggle() {
    if (!button.disabled && button.getAttribute('aria-disabled') !== 'true') setPlaying(!playing, true);
  }
  function onMotionChange() { if (motion.matches) settleLabel(); }

  button.type = 'button';
  button.removeAttribute('aria-pressed');
  button.dataset.playing = String(playing);
  button.setAttribute('aria-label', targetLabel);
  label.textContent = targetLabel;
  button.disabled = false;
  button.addEventListener('click', toggle);
  motion.addEventListener('change', onMotionChange);

  const controller = {
    setPlaying: value => setPlaying(value),
    reset() {
      if (destroyed) return;
      setPlaying(false);
      settleLabel();
      if (feedback) feedback.textContent = initialFeedback;
    },
    destroy() {
      if (destroyed) return;
      destroyed = true;
      settleLabel();
      button.disabled = true;
      button.removeEventListener('click', toggle);
      motion.removeEventListener('change', onMotionChange);
      mounted.delete(button);
    },
  };
  mounted.set(button, controller);
  return controller;
}

return { mount: mountPlaybackButton };
})();

const style8 = "\n.sl-delete {\n  --delete-unit: 1px;\n  --delete-ink: #202222;\n  --delete-hover: #2c2e2e;\n  --delete-active: #3d4040;\n  --delete-text: #fafaf9;\n  --delete-focus: #565b5b;\n  --delete-ease: cubic-bezier(.4, 0, .2, 1);\n  box-sizing: border-box;\n  display: block;\n  position: relative;\n  flex: none;\n  width: calc(248 * var(--delete-unit));\n  height: calc(52 * var(--delete-unit));\n  padding: 0;\n  border: 0;\n  border-radius: calc(13 * var(--delete-unit));\n  appearance: none;\n  background: transparent;\n  color: var(--delete-text);\n  font: 550 calc(19 * var(--delete-unit))/1.1 'Instrument Sans', sans-serif;\n  letter-spacing: -.02em;\n  text-align: center;\n  cursor: pointer;\n  touch-action: manipulation;\n  user-select: none;\n  -webkit-tap-highlight-color: transparent;\n}\n.sl-delete *, .sl-delete *::before, .sl-delete *::after { box-sizing: border-box; }\n.sl-delete:disabled { opacity: .5; cursor: not-allowed; }\n.sl-delete[aria-disabled=\"true\"] { cursor: default; }\n.sl-delete[data-state=\"pending\"] { cursor: progress; }\n.sl-delete:focus-visible { outline: 2px solid var(--delete-focus); outline-offset: 6px; }\n.sl-delete .sl-delete__surface { --delete-face: var(--delete-ink); position: absolute; inset: 0; display: grid; place-items: center; overflow: hidden; border-radius: inherit; background: var(--delete-face); box-shadow: inset 0 1px #ffffff12, 0 1px 2px #0000000d; transition: transform 350ms cubic-bezier(.22, 1, .36, 1), background-color 350ms ease, box-shadow 350ms ease; }\n.sl-delete:is([data-state=\"pending\"], [data-state=\"deleted\"]) .sl-delete__surface { --delete-face: var(--delete-active); }\n@media (hover: hover) and (forced-colors: none) {\n  .sl-delete:not(:disabled):not([aria-disabled=\"true\"]):hover .sl-delete__surface { transform: translateY(-2px); box-shadow: inset 0 1px #ffffff17, 0 6px 12px -8px #00000047; }\n  .sl-delete:not(:disabled):not([aria-disabled=\"true\"]):hover .sl-delete__surface { --delete-face: var(--delete-hover); }\n}\n.sl-delete:not(:disabled):not([aria-disabled=\"true\"]):active .sl-delete__surface { transform: translateY(1px) scale(.98); transition-duration: 120ms; }\n.sl-delete .sl-delete__label { position: absolute; inset: 0 calc(56 * var(--delete-unit)); display: grid; place-items: center; white-space: nowrap; text-align: center; }\n.sl-delete .sl-delete__icon { position: absolute; left: calc(18 * var(--delete-unit)); top: 50%; width: calc(24 * var(--delete-unit)); height: calc(24 * var(--delete-unit)); transform: translateY(-50%); }\n.sl-delete .sl-delete__trash { display: block; width: 100%; height: 100%; overflow: visible; fill: none; stroke: currentColor; stroke-width: 1.7; stroke-linecap: round; stroke-linejoin: round; }\n.sl-delete .sl-delete__lid { transform-box: view-box; transform-origin: 75% 25%; }\n/* One quiet open/close gesture, independent of the action's completion time. */\n.sl-delete[data-delete-motion] .sl-delete__lid { animation: sl-delete-lid-cycle 620ms var(--delete-ease); }\n.sl-delete:disabled .sl-delete__lid { animation: none !important; }\n@keyframes sl-delete-lid-cycle {\n  0%, 100% { transform: translateY(0) rotate(0deg); }\n  42% { transform: translateY(-1px) rotate(18deg); }\n}\n@media (prefers-reduced-motion: reduce) {\n  .sl-delete *, .sl-delete *::before, .sl-delete *::after { transition: none !important; animation: none !important; }\n  .sl-delete .sl-delete__surface, .sl-delete .sl-delete__lid { transform: none !important; }\n  .sl-delete:active .sl-delete__surface { opacity: .9; }\n}\n@media (forced-colors: active) {\n  .sl-delete .sl-delete__surface { --delete-face: ButtonFace; forced-color-adjust: none; border: 1px solid ButtonText; background: var(--delete-face); color: ButtonText; box-shadow: none; }\n  .sl-delete:is([data-state=\"pending\"], [data-state=\"deleted\"]) .sl-delete__surface { --delete-face: Highlight; color: HighlightText; border-color: Highlight; }\n  .sl-delete:focus-visible { outline-color: Highlight; }\n}\n";
const api7 = (() => {
const mounted = new WeakMap();
const labels = { idle: 'Delete', pending: 'Deleting', deleted: 'Deleted', error: 'Try again' };

// onDelete({ signal }) resolves only when the host action succeeds.
// The host application owns confirmation or undo when appropriate.
// reset() resets the control and aborts its request; it cannot restore deleted data.
function mountDeleteButton(button, { onDelete, feedback } = {}) {
  if (button?.tagName !== 'BUTTON') throw new TypeError('A native Delete button is required.');
  if (mounted.has(button)) return mounted.get(button);
  if (typeof onDelete !== 'function') throw new TypeError('Delete needs an onDelete({ signal }) action.');
  const label = button.querySelector('.sl-delete__label');
  if (!label || !button.querySelector('.sl-delete__trash')) throw new TypeError('Delete needs its label and trash icon.');
  const view = button.ownerDocument.defaultView;
  const motion = view.matchMedia('(prefers-reduced-motion: reduce)');
  let state = button.dataset.state === 'deleted' ? 'deleted' : 'idle';
  let destroyed = false;
  let operation = null;
  let operationRevision = 0;
  let labelAnimation = null;
  let labelRevision = 0;
  let targetLabel = labels[state];
  const report = text => { if (feedback) feedback.textContent = text; };

  function settleLabel() {
    labelRevision++;
    labelAnimation?.cancel();
    labelAnimation = null;
    label.textContent = targetLabel;
    label.style.removeProperty('opacity');
  }
  async function changeLabel(text) {
    if (text === targetLabel) return;
    const opacity = labelAnimation ? Number(view.getComputedStyle(label).opacity) : 1;
    const id = ++labelRevision;
    targetLabel = text;
    labelAnimation?.cancel();
    labelAnimation = null;
    if (motion.matches || !label.animate) { settleLabel(); return; }
    label.style.opacity = String(opacity);
    try {
      if (label.textContent !== text) {
        if (opacity > .001) {
          labelAnimation = label.animate([{ opacity }, { opacity: 0 }], { duration: 140 * opacity, easing: 'cubic-bezier(.4,0,.2,1)', fill: 'forwards' });
          await labelAnimation.finished;
          if (id !== labelRevision || destroyed) return;
        }
        label.style.opacity = '0';
        labelAnimation?.cancel();
        label.textContent = text;
      }
      const from = Number(label.style.opacity);
      labelAnimation = label.animate([{ opacity: from }, { opacity: 1 }], { duration: 240 * (1 - from), easing: 'cubic-bezier(.4,0,.2,1)', fill: 'forwards' });
      await labelAnimation.finished;
      if (id !== labelRevision || destroyed) return;
      label.style.removeProperty('opacity');
      labelAnimation.cancel();
      labelAnimation = null;
    } catch (error) {
      if (error.name !== 'AbortError' && id === labelRevision && !destroyed) settleLabel();
    }
  }
  function setState(next, message) {
    state = next;
    if (state !== 'pending' && state !== 'deleted') button.removeAttribute('data-delete-motion');
    button.dataset.state = state;
    button.setAttribute('aria-label', labels[state]);
    button.setAttribute('aria-disabled', String(state === 'pending' || state === 'deleted'));
    button.setAttribute('aria-busy', String(state === 'pending'));
    changeLabel(labels[state]);
    if (message) report(message);
  }
  async function performDelete() {
    const id = ++operationRevision;
    const request = new view.AbortController();
    operation = request;
    setState('pending', 'Deleting. Wait for the request to finish.');
    if (!motion.matches) button.setAttribute('data-delete-motion', '');
    try {
      await onDelete({ signal: request.signal });
      if (destroyed || id !== operationRevision || request.signal.aborted) return;
      operation = null;
      setState('deleted', 'Deleted.');
    } catch {
      if (destroyed || id !== operationRevision || request.signal.aborted) return;
      operation = null;
      setState('error', 'Could not delete. Choose Try again to retry.');
    }
  }
  function activate() {
    if (destroyed || button.disabled || button.getAttribute('aria-disabled') === 'true') return;
    if (state === 'idle' || state === 'error') performDelete();
  }
  function onKeyDown(event) {
    if (event.repeat && (event.key === 'Enter' || event.key === ' ')) event.preventDefault();
  }
  function onMotionEnd(event) {
    if (event.animationName === 'sl-delete-lid-cycle') button.removeAttribute('data-delete-motion');
  }
  function onMotionChange() {
    if (motion.matches) { settleLabel(); button.removeAttribute('data-delete-motion'); }
  }
  function abortRequest() {
    operationRevision++;
    const request = operation;
    operation = null;
    request?.abort();
  }

  button.type = 'button';
  button.removeAttribute('aria-pressed');
  button.removeAttribute('data-delete-motion');
  setState(state);
  settleLabel();
  button.disabled = false;
  button.addEventListener('click', activate);
  button.addEventListener('keydown', onKeyDown);
  button.addEventListener('animationend', onMotionEnd);
  motion.addEventListener('change', onMotionChange);
  const controller = {
    get state() { return destroyed ? 'destroyed' : state; },
    reset() {
      if (destroyed) return;
      abortRequest();
      setState('idle', 'Control reset. Click Delete to try again.');
      settleLabel();
    },
    destroy() {
      if (destroyed) return;
      destroyed = true;
      abortRequest();
      settleLabel();
      button.removeAttribute('data-delete-motion');
      button.disabled = true;
      button.setAttribute('aria-busy', 'false');
      button.removeEventListener('click', activate);
      button.removeEventListener('keydown', onKeyDown);
      button.removeEventListener('animationend', onMotionEnd);
      motion.removeEventListener('change', onMotionChange);
      mounted.delete(button);
    },
  };
  mounted.set(button, controller);
  return controller;
}

return { mount: mountDeleteButton };
})();

const style9 = "\n.sl-upload {\n  --upload-unit: 1px;\n  --upload-ink: #202222;\n  --upload-hover: #2c2e2e;\n  --upload-active: #3d4040;\n  --upload-text: #fafaf9;\n  --upload-focus: #565b5b;\n  --upload-ease: cubic-bezier(.22,1,.36,1);\n  display: block;\n  position: relative;\n  width: calc(224 * var(--upload-unit));\n  height: calc(52 * var(--upload-unit));\n  padding: 0;\n  border: 0;\n  border-radius: calc(13 * var(--upload-unit));\n  appearance: none;\n  background: transparent;\n  color: var(--upload-text);\n  font: 550 calc(19 * var(--upload-unit))/1.1 'Instrument Sans', sans-serif;\n  letter-spacing: -.02em;\n  cursor: pointer;\n  touch-action: manipulation;\n  user-select: none;\n  -webkit-tap-highlight-color: transparent;\n}\n.sl-upload *, .sl-upload *::before, .sl-upload *::after { box-sizing: border-box; }\n.sl-upload:disabled { opacity: .5; cursor: not-allowed; }\n.sl-upload[aria-disabled=\"true\"] { cursor: wait; }\n.sl-upload:focus-visible { outline: 2px solid var(--upload-focus); outline-offset: 6px; }\n.sl-upload__surface { position: absolute; inset: 0; display: grid; place-items: center; overflow: hidden; isolation: isolate; border-radius: inherit; background: var(--upload-ink); box-shadow: inset 0 1px #ffffff12,0 1px 2px #0000000d; transition: transform 350ms var(--upload-ease),background-color 350ms ease,box-shadow 350ms ease; }\n@media (hover: hover) {\n  .sl-upload:not(:disabled):not([aria-disabled=\"true\"]):hover .sl-upload__surface { transform: translateY(-2px); background: var(--upload-hover); box-shadow: inset 0 1px #ffffff17,0 6px 12px -8px #00000047; }\n}\n.sl-upload:not(:disabled):not([aria-disabled=\"true\"]):active .sl-upload__surface { transform: translateY(1px) scale(.98); transition-duration: 120ms; }\n.sl-upload__wash { position: absolute; inset: 0; z-index: -1; background: var(--upload-active); opacity: 0; transition: opacity 550ms cubic-bezier(.4,0,.2,1); }\n.sl-upload[data-upload-state=\"complete\"] .sl-upload__wash { opacity: 1; }\n.sl-upload__label { display: block; position: relative; white-space: nowrap; }\n.sl-upload__icon { position: absolute; left: calc(24 * var(--upload-unit)); top: 50%; width: calc(24 * var(--upload-unit)); height: calc(24 * var(--upload-unit)); transform: translateY(-50%); }\n.sl-upload__icon svg { display: block; width: 100%; height: 100%; overflow: visible; fill: none; stroke: currentColor; stroke-width: 1.7; stroke-linecap: round; stroke-linejoin: round; }\n.sl-upload__arrow { transform-box: view-box; transform-origin: 12px 12px; transition: transform 500ms cubic-bezier(.32,0,.16,1) 180ms,opacity 280ms ease 180ms; }\n.sl-upload__tray { transform-box: view-box; transform-origin: 12px 20px; transition: transform 480ms var(--upload-ease),opacity 260ms ease; }\n.sl-upload__progress { transform-box: view-box; transform-origin: 4.5px 20.5px; transform: scaleX(var(--upload-progress,0)); opacity: 0; transition: transform 180ms ease,opacity 180ms ease; }\n.sl-upload__check { transform-box: view-box; transform-origin: 12px 12px; transform: translateY(3px) scale(.85); opacity: 0; stroke-dasharray: 1; stroke-dashoffset: 1; transition: transform 500ms var(--upload-ease),opacity 180ms ease,stroke-dashoffset 400ms ease; }\n.sl-upload[data-upload-icon=\"pending\"] .sl-upload__arrow,\n.sl-upload[data-upload-icon=\"complete\"] .sl-upload__arrow { transform: translateY(-8px) scale(.82); opacity: 0; transition-delay: 0ms,100ms; }\n.sl-upload[data-upload-state=\"pending\"][data-upload-progress] .sl-upload__tray { opacity: .35; }\n.sl-upload[data-upload-state=\"pending\"][data-upload-progress] .sl-upload__progress { opacity: 1; }\n.sl-upload[data-upload-icon=\"complete\"] .sl-upload__tray { transform: translateY(-3px) scaleX(.35); opacity: 0; }\n.sl-upload[data-upload-icon=\"complete\"] .sl-upload__check { transform: translateY(0) scale(1); opacity: 1; stroke-dashoffset: 0; transition-delay: 140ms,140ms,140ms; }\n.sl-upload[data-upload-static] .sl-upload__icon * { transition: none !important; }\n@media (prefers-reduced-motion: reduce) {\n  .sl-upload *, .sl-upload svg, .sl-upload path { transition: none !important; animation: none !important; }\n  .sl-upload .sl-upload__surface, .sl-upload:hover .sl-upload__surface, .sl-upload:active .sl-upload__surface { transform: none; }\n  .sl-upload:active .sl-upload__surface { opacity: .9; }\n}\n@media (forced-colors: active) {\n  .sl-upload__surface { border: 1px solid ButtonText; background: ButtonFace; color: ButtonText; }\n  .sl-upload__wash { display: none; }\n  .sl-upload:focus-visible { outline-color: Highlight; }\n}\n";
const api8 = (() => {
const mounted = new WeakMap();

// onUpload(file, { signal, onProgress }) may be async; progress is a fraction from 0 to 1.
// Without onUpload, this controller confirms a local selection and never reads the file.
function mountUploadButton(button, { input, onUpload, feedback } = {}) {
  if (mounted.has(button)) return mounted.get(button);
  if (button?.tagName !== 'BUTTON' || input?.tagName !== 'INPUT' || input.type !== 'file') throw new TypeError('Upload needs a button and a file input.');
  if (onUpload !== undefined && typeof onUpload !== 'function') throw new TypeError('onUpload must be a function.');
  const label = button.querySelector('.sl-upload__label');
  if (!label || !button.querySelector('.sl-upload__icon')) throw new TypeError('The Upload button needs its label and icon.');
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const initialMessage = feedback?.textContent || (onUpload ? 'Choose a file to upload.' : 'Choose a file. Its contents stay on your device.');
  let state = 'idle', revision = 0, labelRevision = 0;
  let destroyed = false, pickerOpen = false, discardPicker = false;
  let request, labelAnimation, confirmationTimer, returnTimer;
  let targetLabel = 'Upload';

  function setState(next) {
    state = next;
    button.dataset.uploadState = next;
    button.setAttribute('aria-label', next === 'complete' ? 'Complete. Choose another file' : next === 'pending' ? 'Uploading file' : 'Upload file');
    button.setAttribute('aria-busy', String(next === 'pending'));
    if (next === 'pending') button.setAttribute('aria-disabled', 'true');
    else button.removeAttribute('aria-disabled');
  }
  function setIcon(next, immediate = false) {
    button.toggleAttribute('data-upload-static', immediate);
    button.dataset.uploadIcon = next;
  }
  function settleLabel(text = targetLabel) {
    labelRevision++;
    labelAnimation?.cancel();
    labelAnimation = null;
    label.textContent = targetLabel = text;
    label.style.removeProperty('opacity');
  }
  async function changeLabel(text) {
    if (text === targetLabel) return;
    const opacity = labelAnimation ? getComputedStyle(label).opacity : 1;
    const id = ++labelRevision;
    targetLabel = text;
    labelAnimation?.cancel();
    if (motion.matches || !label.animate) { settleLabel(); return; }
    try {
      labelAnimation = label.animate([{ opacity }, { opacity: 0 }], { duration: 160, easing: 'ease', fill: 'forwards' });
      await labelAnimation.finished;
      if (id !== labelRevision || destroyed) return;
      label.style.opacity = '0';
      labelAnimation.cancel();
      label.textContent = text;
      labelAnimation = label.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 280, easing: 'ease', fill: 'forwards' });
      await labelAnimation.finished;
      if (id === labelRevision && !destroyed) settleLabel();
    } catch (error) {
      if (error.name !== 'AbortError' && id === labelRevision) settleLabel();
    }
  }
  function clearTimers() { clearTimeout(confirmationTimer); clearTimeout(returnTimer); }
  function clearProgress() { button.removeAttribute('data-upload-progress'); button.style.removeProperty('--upload-progress'); }
  function accepts(file) {
    const types = input.accept.toLowerCase().split(',').map(type => type.trim()).filter(Boolean);
    return !types.length || types.some(type => type.startsWith('.') ? file.name.toLowerCase().endsWith(type) : type.endsWith('/*') ? file.type.toLowerCase().startsWith(type.slice(0,-1)) : file.type.toLowerCase() === type);
  }
  function fail(error, message) {
    setState(error?.name === 'AbortError' ? 'idle' : 'error');
    setIcon('idle');
    changeLabel('Upload');
    if (feedback) feedback.textContent = message;
    button.dispatchEvent(new CustomEvent('uploaderror', { bubbles: true, detail: { error } }));
  }
  async function select(file) {
    if (destroyed || button.disabled || state === 'pending' || button.getAttribute('aria-disabled') === 'true') return false;
    if (pickerOpen) return false;
    clearTimers();
    clearProgress();
    const id = ++revision;
    const FileType = input.ownerDocument.defaultView?.File || File;
    if (!(file instanceof FileType) || !accepts(file)) {
      fail(new TypeError('Unsupported file selection.'), 'Choose a file of an allowed type and try again.');
      return false;
    }
    const startedAt = performance.now();
    request = new AbortController();
    let progress = 0, announced = -1;
    setState('pending');
    setIcon('pending');
    changeLabel('Uploading');
    if (feedback) feedback.textContent = onUpload ? `Uploading ${file.name}…` : `Selecting ${file.name}…`;
    try {
      if (onUpload) await onUpload(file, {
        signal: request.signal,
        onProgress(value) {
          if (destroyed || id !== revision || state !== 'pending' || !Number.isFinite(value)) return;
          progress = Math.max(progress, Math.min(1, Math.max(0, value)));
          button.setAttribute('data-upload-progress', '');
          button.style.setProperty('--upload-progress', String(progress));
          const percent = Math.floor(progress * 10) * 10;
          if (feedback && percent !== announced) { feedback.textContent = `Uploading ${file.name}. ${percent}%.`; announced = percent; }
        },
      });
      if (destroyed || id !== revision) return false;
      request = null;
      setState('complete');
      if (feedback) feedback.textContent = onUpload ? `${file.name}: upload complete.` : `${file.name} selected. This demo does not read or upload your file.`;
      confirmationTimer = setTimeout(() => {
        if (destroyed || id !== revision) return;
        setIcon('complete');
        changeLabel('Complete');
      }, motion.matches ? 0 : Math.max(0, 420 - (performance.now() - startedAt)));
      returnTimer = setTimeout(() => {
        if (destroyed || id !== revision) return;
        setState('idle');
        setIcon('idle');
        changeLabel('Upload');
        clearProgress();
      }, 2400);
      button.dispatchEvent(new CustomEvent('uploadcomplete', { bubbles: true, detail: { file, uploaded: Boolean(onUpload) } }));
      return true;
    } catch (error) {
      if (destroyed || id !== revision) return false;
      request = null;
      clearProgress();
      fail(error, error?.name === 'AbortError' ? 'Upload canceled. Choose a file to try again.' : 'The upload could not complete. Choose the file to try again.');
      return false;
    }
  }
  function chooseFile() {
    if (destroyed || pickerOpen || button.disabled || input.disabled || state === 'pending' || button.getAttribute('aria-disabled') === 'true') return false;
    pickerOpen = true;
    input.value = '';
    try { input.click(); return true; }
    catch (error) { pickerOpen = false; reset(); fail(error, 'The file chooser could not open. Try again.'); return false; }
  }
  function onChange() {
    const file = input.files?.[0];
    pickerOpen = false;
    input.value = '';
    if (discardPicker) { discardPicker = false; return; }
    if (file) void select(file);
    else onCancel();
  }
  function onCancel() {
    pickerOpen = false;
    if (discardPicker) { discardPicker = false; return; }
    if (state === 'pending') return;
    reset();
    if (feedback) feedback.textContent = 'No file selected. Nothing was uploaded.';
  }
  function onMotionChange() {
    if (!motion.matches) return;
    clearTimeout(confirmationTimer);
    setIcon(state === 'complete' ? 'complete' : state === 'pending' ? 'pending' : 'idle');
    settleLabel(state === 'complete' ? 'Complete' : state === 'pending' ? 'Uploading' : 'Upload');
  }
  function reset() {
    if (destroyed) return;
    revision++;
    request?.abort();
    request = null;
    if (pickerOpen) discardPicker = true;
    input.value = '';
    clearTimers();
    clearProgress();
    setState('idle');
    setIcon('idle', true);
    settleLabel('Upload');
    if (feedback) feedback.textContent = initialMessage;
  }
  reset();
  button.disabled = false;
  button.addEventListener('click', chooseFile);
  input.addEventListener('change', onChange);
  input.addEventListener('cancel', onCancel);
  motion.addEventListener('change', onMotionChange);
  const controller = {
    chooseFile, select, reset,
    get state() { return state; },
    destroy() {
      if (destroyed) return;
      reset();
      destroyed = true;
      button.disabled = true;
      button.removeEventListener('click', chooseFile);
      input.removeEventListener('change', onChange);
      input.removeEventListener('cancel', onCancel);
      motion.removeEventListener('change', onMotionChange);
      mounted.delete(button);
    },
  };
  mounted.set(button, controller);
  return controller;
}

return { mount: mountUploadButton };
})();

const uploadDemo = (() => {
const mountUploadButton = api8.mount;
// Preview adapter only. Do not use this simulated upload in a real integration.
function mountUploadDemo(button, { input, feedback } = {}) {
  if (feedback) feedback.textContent = 'Try a sample upload. No files are selected or sent.';
  const controller = mountUploadButton(button, {
    input,
    feedback,
    onUpload: (_file, { signal, onProgress }) => new Promise((resolve, reject) => {
      let timer, step = 0;
      const abort = () => {
        clearTimeout(timer);
        signal.removeEventListener('abort', abort);
        reject(new DOMException('Canceled', 'AbortError'));
      };
      if (signal.aborted) { abort(); return; }
      signal.addEventListener('abort', abort, { once: true });
      onProgress(0);
      const advance = () => {
        if (signal.aborted) return;
        if (++step <= 10) {
          onProgress(step / 10);
          timer = setTimeout(advance, 140);
        } else {
          signal.removeEventListener('abort', abort);
          resolve();
        }
      };
      timer = setTimeout(advance, 140);
    }),
  });
  const sample = new File([], 'sample-file.txt', { type: 'text/plain' });
  const previewClick = event => {
    // Capture prevents the reusable component's real file chooser from opening.
    event.preventDefault();
    event.stopImmediatePropagation();
    void controller.select(sample);
  };
  button.addEventListener('click', previewClick, true);
  return {
    reset: () => controller.reset(),
    destroy() {
      button.removeEventListener('click', previewClick, true);
      controller.destroy();
    },
  };
}

return mountUploadDemo;
})();
const style10 = "\n.sl-share-control { --share-unit: 1px; --share-width: 240; --share-ink: #202222; --share-hover: #2c2e2e; --share-active: #3d4040; --share-text: #fafaf9; position: relative; width: calc(var(--share-width) * var(--share-unit)); height: calc(52 * var(--share-unit)); isolation: isolate; }\n.sl-share-control *, .sl-share-control *::before, .sl-share-control *::after { box-sizing: border-box; }\n.sl-share { position: relative; display: block; width: 100%; height: 100%; padding: 0; border: 0; border-radius: calc(13 * var(--share-unit)); background: transparent; color: var(--share-text); font: 550 calc(19 * var(--share-unit))/1.1 'Instrument Sans', sans-serif; letter-spacing: -.02em; cursor: pointer; touch-action: manipulation; -webkit-tap-highlight-color: transparent; }\n.sl-share:disabled { opacity: .5; cursor: not-allowed; }\n.sl-share:focus-visible { outline: 2px solid #565b5b; outline-offset: 6px; }\n.sl-share__surface { position: absolute; inset: 0; display: grid; place-items: center; border-radius: inherit; background: var(--share-ink); box-shadow: inset 0 1px #ffffff12, 0 1px 2px #0000000d; transition: transform 350ms cubic-bezier(.22,1,.36,1), background-color 450ms ease, box-shadow 350ms ease; }\n.sl-share-control[data-share-open=\"true\"] .sl-share__surface, .sl-share-control[data-share-copied=\"true\"] .sl-share__surface { background: var(--share-active); }\n@media (hover: hover) and (forced-colors: none) {\n  .sl-share:not(:disabled):hover .sl-share__surface { transform: translateY(-2px); box-shadow: inset 0 1px #ffffff17, 0 6px 12px -8px #00000047; }\n  .sl-share-control:not([data-share-open=\"true\"]):not([data-share-copied=\"true\"]) .sl-share:not(:disabled):hover .sl-share__surface { background: var(--share-hover); }\n}\n.sl-share:not(:disabled):active .sl-share__surface { transform: translateY(1px) scale(.98); transition-duration: 120ms; }\n.sl-share__label { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; white-space: nowrap; text-align: center; }\n.sl-share__icon { position: absolute; top: 50%; left: calc(18 * var(--share-unit)); width: calc(24 * var(--share-unit)); height: calc(24 * var(--share-unit)); transform: translateY(-50%); }\n.sl-share__icon svg { display: block; width: 100%; height: 100%; overflow: visible; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }\n.sl-share__upper, .sl-share__lower { transform-box: view-box; transform-origin: 6px 12px; transition: transform 480ms cubic-bezier(.22,1,.36,1); }\n.sl-share-control[data-share-open=\"true\"] .sl-share__upper { transform: rotate(-9deg); }\n.sl-share-control[data-share-open=\"true\"] .sl-share__lower { transform: rotate(9deg); }\n.sl-share__popover { position: absolute; z-index: 5; bottom: calc(100% + 10px); left: 50%; width: min(268px, calc(100vw - 80px)); padding: 12px; display: grid; gap: 8px; border: 1px solid #4d5152; border-radius: 14px; background: #202323; box-shadow: 0 12px 28px #0004, inset 0 1px #ffffff0c; opacity: 0; visibility: hidden; pointer-events: none; transform: translate(-50%, 7px) scale(.97); transform-origin: 50% 100%; transition: opacity 180ms ease, transform 300ms cubic-bezier(.22,1,.36,1), visibility 0s 300ms; }\n.sl-share-control[data-share-open=\"true\"] .sl-share__popover { opacity: 1; visibility: visible; pointer-events: auto; transform: translate(-50%, 0) scale(1); transition-delay: 0s; }\n.sl-share__popover:has(.sl-share__send:not([hidden])) { grid-template-columns: 1fr 1fr; }\n.sl-share__url { grid-column: 1 / -1; }\n.sl-share__url { width: 100%; min-width: 0; padding: 4px 8px; height: 28px; border: 0; border-radius: 6px; background: #111414; color: #b9c0c1; font: 12px/1.5 'Instrument Sans', sans-serif; text-overflow: ellipsis; }\n.sl-share__copy, .sl-share__send { display: block; width: 100%; min-height: 36px; padding: 8px 12px; border: 1px solid #ffffff24; border-radius: 8px; background: #363b3c; color: #fafaf9; font: 550 14px/1.2 'Instrument Sans', sans-serif; cursor: pointer; }\n.sl-share__copy:hover, .sl-share__send:hover { background: #44494a; }\n.sl-share__copy[aria-disabled=\"true\"], .sl-share__send[aria-disabled=\"true\"] { opacity: .6; cursor: wait; }\n.sl-share__copy:focus-visible, .sl-share__send:focus-visible, .sl-share__url:focus-visible { outline: 2px solid #edf1f2; outline-offset: 3px; }\n.sl-share__send[hidden] { display: none; }\n.sl-share[aria-busy=\"true\"] { cursor: wait; }\n@media (prefers-reduced-motion: reduce) {\n  .sl-share-control * { transition: none !important; animation: none !important; }\n  .sl-share__surface, .sl-share__upper, .sl-share__lower { transform: none !important; }\n  .sl-share__popover { transform: translate(-50%, 0) !important; }\n}\n@media (forced-colors: active) {\n  .sl-share__surface, .sl-share__popover, .sl-share__copy, .sl-share__send, .sl-share__url { forced-color-adjust: none; color: ButtonText; background: ButtonFace !important; border: 1px solid ButtonText; box-shadow: none !important; }\n  .sl-share:focus-visible, .sl-share__copy:focus-visible, .sl-share__send:focus-visible, .sl-share__url:focus-visible { outline-color: Highlight; }\n}\n";
const api9 = (() => {
const mounted = new WeakMap();
let nextId = 0;

// onShare({ url, signal }) may return { label: 'Sent' } or { status: 'canceled' }.
// Without onShare, sharing uses the system share sheet when supported.
function mountShareButton(root, { getUrl, onShare, labels = {}, holdMs = 1900, feedback } = {}) {
  if (mounted.has(root)) return mounted.get(root);
  const button = root?.querySelector('.sl-share');
  const popover = root?.querySelector('.sl-share__popover');
  const field = root?.querySelector('.sl-share__url');
  const copy = root?.querySelector('.sl-share__copy');
  const send = root?.querySelector('.sl-share__send');
  const label = root?.querySelector('.sl-share__label');
  if (!button || !popover || !field || !copy || !label) throw new TypeError('Share needs its button, panel, URL field and copy action.');
  if (typeof getUrl !== 'function') throw new TypeError('Share needs a getUrl callback.');
  if (onShare !== undefined && typeof onShare !== 'function') throw new TypeError('onShare must be a function.');
  const text = { idle: 'Share', copy: 'Copy link', copied: 'Link copied', send: 'Share…', sharing: 'Sharing', shared: 'Shared', error: 'Try again', ...labels };
  if (Object.values(text).some(value => typeof value !== 'string' || !value.trim())) throw new TypeError('Share labels must be non-empty strings.');
  if (!Number.isFinite(holdMs) || holdMs < 0) throw new TypeError('holdMs must be a non-negative number.');
  const doc = root.ownerDocument, view = doc.defaultView;
  const lifecycle = new AbortController();
  const motion = view.matchMedia('(prefers-reduced-motion: reduce)');
  let open = false, destroyed = false, busy = false, revision = 0, labelRevision = 0;
  let labelAnimation, resetTimer, request, targetLabel = text.idle;
  copy.textContent = text.copy;
  if (send) { send.textContent = text.send; send.hidden = !onShare && typeof view.navigator.share !== 'function'; }

  function settleLabel() {
    labelRevision++; labelAnimation?.cancel(); labelAnimation = null;
    label.textContent = targetLabel; label.style.removeProperty('opacity');
  }
  async function setLabel(text) {
    if (text === targetLabel) return;
    const opacity = Number(view.getComputedStyle(label).opacity);
    targetLabel = text; const id = ++labelRevision;
    label.style.opacity = String(opacity); labelAnimation?.cancel();
    if (motion.matches || !label.animate) { settleLabel(); return; }
    try {
      if (label.textContent !== text) {
        labelAnimation = label.animate([{ opacity }, { opacity: 0 }], { duration: 150 * opacity, easing: 'ease', fill: 'forwards' });
        await labelAnimation.finished;
        if (destroyed || id !== labelRevision) return;
        label.style.opacity = '0'; labelAnimation.cancel(); label.textContent = text;
      }
      const from = Number(label.style.opacity);
      labelAnimation = label.animate([{ opacity: from }, { opacity: 1 }], { duration: 280 * (1 - from), easing: 'ease', fill: 'forwards' });
      await labelAnimation.finished;
      if (id === labelRevision && !destroyed) settleLabel();
    } catch (error) { if (error.name !== 'AbortError' && id === labelRevision && !destroyed) settleLabel(); }
  }
  function setBusy(value) {
    busy = value;
    button.setAttribute('aria-busy', String(value));
    for (const action of [copy, send]) {
      if (!action) continue;
      if (value) action.setAttribute('aria-disabled', 'true');
      else action.removeAttribute('aria-disabled');
    }
  }
  function close(restoreFocus = false) {
    if (destroyed) return;
    if (request) { setLabel(text.idle); button.setAttribute('aria-label', text.idle); }
    revision++; request?.abort(); request = null; setBusy(false);
    open = false; root.dataset.shareOpen = 'false'; button.setAttribute('aria-expanded', 'false');
    popover.inert = true; popover.setAttribute('aria-hidden', 'true');
    if (restoreFocus) button.focus({ preventScroll: true });
  }
  function show() {
    if (destroyed || button.disabled || busy) return;
    try {
      const url = new URL(String(getUrl()));
      if (!['http:', 'https:'].includes(url.protocol)) throw new TypeError('Use an HTTP or HTTPS link.');
      field.value = url.href;
    } catch {
      if (feedback) feedback.textContent = 'A valid link is not available.';
      return;
    }
    clearTimeout(resetTimer); root.dataset.shareCopied = 'false'; setLabel(text.idle); button.setAttribute('aria-label', text.idle);
    if (feedback) feedback.textContent = '';
    open = true; root.dataset.shareOpen = 'true'; button.setAttribute('aria-expanded', 'true');
    popover.inert = false; popover.setAttribute('aria-hidden', 'false'); copy.focus({ preventScroll: true });
  }
  function confirm(caption, action, url) {
    request = null;
    close(true); root.dataset.shareCopied = 'true'; setLabel(caption);
    button.setAttribute('aria-label', caption);
    if (feedback) feedback.textContent = action === 'copy' ? `${caption}. Nothing was sent to another person.` : `${caption}.`;
    resetTimer = setTimeout(() => { root.dataset.shareCopied = 'false'; setLabel(text.idle); button.setAttribute('aria-label', text.idle); }, holdMs);
    button.dispatchEvent(new view.CustomEvent(action === 'copy' ? 'sharecopy' : 'sharecomplete', { bubbles: true, composed: true, detail: { url, action, label: caption } }));
  }
  async function copyLink() {
    if (destroyed || busy || !open) return;
    setBusy(true); const id = ++revision, url = field.value;
    try {
      await view.navigator.clipboard.writeText(url);
      if (destroyed || id !== revision) return;
      confirm(text.copied, 'copy', url);
    } catch {
      if (destroyed || id !== revision) return;
      field.focus(); field.select();
      if (feedback) feedback.textContent = 'Link selected. Press Ctrl+C or Command+C to copy.';
    } finally { if (!destroyed && id === revision) setBusy(false); }
  }
  async function shareLink() {
    if (destroyed || busy || !open || send?.hidden) return;
    const url = field.value;
    // Hide the panel before calling native share, without losing user activation.
    close(true); setBusy(true); request = new AbortController();
    const id = ++revision;
    setLabel(text.sharing); button.setAttribute('aria-label', text.sharing);
    try {
      const result = onShare ? await onShare({ url, signal: request.signal }) : await view.navigator.share({ url });
      if (destroyed || id !== revision) return;
      if (result?.status === 'canceled') {
        setLabel(text.idle); button.setAttribute('aria-label', text.idle);
        if (feedback) feedback.textContent = 'Sharing canceled.';
      } else {
        const caption = typeof result?.label === 'string' && result.label.trim() ? result.label : text.shared;
        confirm(caption, 'share', url);
      }
    } catch (error) {
      if (destroyed || id !== revision) return;
      const canceled = error?.name === 'AbortError';
      setLabel(canceled ? text.idle : text.error);
      button.setAttribute('aria-label', canceled ? text.idle : text.error);
      if (feedback) feedback.textContent = canceled ? 'Sharing canceled.' : 'Could not share. Try again or copy the link.';
    } finally { if (!destroyed && id === revision) { request = null; setBusy(false); } }
  }
  button.type = 'button'; button.disabled = false;
  if (!popover.id) popover.id = 'sl-share-panel-' + (++nextId);
  button.setAttribute('aria-controls', popover.id);
  const listen = (target, type, callback) => target.addEventListener(type, callback, { signal: lifecycle.signal });
  listen(button, 'click', () => open ? close(true) : show());
  listen(copy, 'click', copyLink);
  if (send) listen(send, 'click', shareLink);
  listen(root, 'keydown', event => { if (event.key === 'Escape' && open) { event.preventDefault(); event.stopPropagation(); close(true); } });
  listen(root, 'focusout', event => {
    // During blur, activeElement can briefly be <body> before the next control focuses.
    if (root.contains(event.relatedTarget)) return;
    queueMicrotask(() => { if (!destroyed && open && !root.contains(root.getRootNode().activeElement || doc.activeElement)) close(); });
  });
  listen(doc, 'pointerdown', event => { if (open && !event.composedPath().includes(root)) close(); });
  listen(motion, 'change', () => { if (motion.matches) settleLabel(); });
  const controller = {
    open: show, close: () => close(true),
    reset() { if (destroyed) return; close(); clearTimeout(resetTimer); root.dataset.shareCopied = 'false'; targetLabel = text.idle; settleLabel(); button.setAttribute('aria-label', text.idle); if (feedback) feedback.textContent = ''; },
    destroy() { if (destroyed) return; controller.reset(); destroyed = true; button.disabled = true; lifecycle.abort(); mounted.delete(root); },
  };
  controller.reset(); mounted.set(root, controller); return controller;
}

return { mount: mountShareButton };
})();

const style11 = "\n.sl-follow {\n  --follow-unit: 1px;\n  --follow-ink: #202222;\n  --follow-hover: #2c2e2e;\n  --follow-active: #3d4040;\n  --follow-text: #fafaf9;\n  --follow-focus: #565b5b;\n  --follow-ease: cubic-bezier(.4, 0, .2, 1);\n  display: block;\n  position: relative;\n  flex: none;\n  width: calc(236 * var(--follow-unit));\n  height: calc(52 * var(--follow-unit));\n  padding: 0;\n  border: 0;\n  border-radius: calc(13 * var(--follow-unit));\n  appearance: none;\n  background: transparent;\n  color: var(--follow-text);\n  font: 550 calc(19 * var(--follow-unit))/1.1 'Instrument Sans', sans-serif;\n  letter-spacing: -.02em;\n  text-align: center;\n  cursor: pointer;\n  touch-action: manipulation;\n  user-select: none;\n  -webkit-tap-highlight-color: transparent;\n}\n.sl-follow *, .sl-follow *::before, .sl-follow *::after { box-sizing: border-box; }\n.sl-follow:disabled, .sl-follow[aria-disabled=\"true\"] { opacity: .5; cursor: not-allowed; }\n.sl-follow:focus-visible { outline: 2px solid var(--follow-focus); outline-offset: 6px; }\n.sl-follow .sl-follow__surface {\n  position: absolute;\n  inset: 0;\n  display: grid;\n  place-items: center;\n  overflow: hidden;\n  isolation: isolate;\n  border-radius: inherit;\n  background: var(--follow-ink);\n  box-shadow: inset 0 1px #ffffff12, 0 1px 2px #0000000d;\n  transition: transform 350ms cubic-bezier(.22, 1, .36, 1), background-color 350ms ease, box-shadow 350ms ease;\n}\n@media (hover: hover) and (forced-colors: none) {\n  .sl-follow:not(:disabled):not([aria-disabled=\"true\"]):hover .sl-follow__surface { transform: translateY(-2px); background-color: var(--follow-hover); box-shadow: inset 0 1px #ffffff17, 0 6px 12px -8px #00000047; }\n}\n.sl-follow:not(:disabled):not([aria-disabled=\"true\"]):active .sl-follow__surface { transform: translateY(1px) scale(.98); transition-duration: 120ms; }\n.sl-follow .sl-follow__wash { position: absolute; inset: 0; z-index: -1; background: var(--follow-active); opacity: 0; transition: opacity 480ms var(--follow-ease); }\n.sl-follow[aria-pressed=\"true\"] .sl-follow__wash { opacity: 1; }\n.sl-follow .sl-follow__label { position: absolute; inset: 0 calc(56 * var(--follow-unit)); display: grid; place-items: center; text-align: center; white-space: nowrap; }\n.sl-follow .sl-follow__icon { position: absolute; left: calc(18 * var(--follow-unit)); top: 50%; width: calc(28 * var(--follow-unit)); height: calc(24 * var(--follow-unit)); transform: translateY(-50%); }\n.sl-follow .sl-follow__person { display: block; width: 100%; height: 100%; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }\n.sl-follow .sl-follow__mark { position: absolute; left: calc(18 * var(--follow-unit)); top: calc(11 * var(--follow-unit)); width: calc(8 * var(--follow-unit)); height: calc(8 * var(--follow-unit)); }\n.sl-follow .sl-follow__mark-short, .sl-follow .sl-follow__mark-long {\n  position: absolute;\n  left: 0;\n  top: calc(3.1 * var(--follow-unit));\n  width: calc(8 * var(--follow-unit));\n  height: calc(1.8 * var(--follow-unit));\n  border-radius: calc(.9 * var(--follow-unit));\n  background: currentColor;\n  transform-origin: center;\n  transition: transform 480ms var(--follow-ease);\n}\n.sl-follow .sl-follow__mark-short { transform: translate(0, 0) rotate(0) scaleX(1); }\n.sl-follow .sl-follow__mark-long { transform: translate(0, 0) rotate(90deg) scaleX(1); }\n.sl-follow[aria-pressed=\"true\"] .sl-follow__mark-short { transform: translate(calc(-1 * var(--follow-unit)), calc(1.3 * var(--follow-unit))) rotate(45deg) scaleX(.58); }\n.sl-follow[aria-pressed=\"true\"] .sl-follow__mark-long { transform: translate(calc(2.65 * var(--follow-unit)), calc(-.2 * var(--follow-unit))) rotate(-48deg) scaleX(1.07); }\n@media (prefers-reduced-motion: reduce) {\n  .sl-follow *, .sl-follow *::before, .sl-follow *::after { transition: none !important; animation: none !important; }\n  .sl-follow .sl-follow__surface { transform: none !important; }\n  .sl-follow:active .sl-follow__surface { opacity: .9; }\n}\n@media (forced-colors: active) {\n  .sl-follow .sl-follow__surface { forced-color-adjust: none; border: 1px solid ButtonText; background: ButtonFace; color: ButtonText; box-shadow: none; }\n  .sl-follow[aria-pressed=\"true\"] .sl-follow__surface { background: Highlight; color: HighlightText; border-color: Highlight; }\n  .sl-follow .sl-follow__wash { display: none; }\n  .sl-follow:focus-visible { outline-color: Highlight; }\n}\n";
const api10 = (() => {
const mounted = new WeakMap();
const initialFeedback = 'Try the button. Click again to unfollow.';

// Local state only. onChange and followchange report user changes to the host.
function mountFollowButton(button, { feedback, onChange } = {}) {
  if (mounted.has(button)) return mounted.get(button);
  if (button?.tagName !== 'BUTTON') throw new TypeError('A native Follow button is required.');
  if (onChange != null && typeof onChange !== 'function') throw new TypeError('onChange must be a function.');
  const label = button.querySelector('.sl-follow__label');
  const mark = button.querySelector('.sl-follow__mark');
  if (!label || !mark) throw new TypeError('The Follow button needs its label and mark elements.');
  const view = button.ownerDocument.defaultView;
  const motion = view.matchMedia('(prefers-reduced-motion: reduce)');
  let following = button.getAttribute('aria-pressed') === 'true';
  let targetLabel = following ? 'Following' : 'Follow';
  let labelAnimation = null;
  let revision = 0;
  let destroyed = false;

  function settleLabel() {
    revision++;
    labelAnimation?.cancel();
    labelAnimation = null;
    label.textContent = targetLabel;
    label.style.removeProperty('opacity');
  }

  async function changeLabel(text) {
    if (text === targetLabel) return;
    const opacity = labelAnimation ? view.getComputedStyle(label).opacity : '1';
    targetLabel = text;
    const id = ++revision;
    // Preserve the rendered opacity when a click reverses an unfinished fade.
    label.style.opacity = opacity;
    labelAnimation?.cancel();
    if (motion.matches || !label.animate) { settleLabel(); return; }
    try {
      if (label.textContent !== text) {
        labelAnimation = label.animate([{ opacity }, { opacity: 0 }], {
          duration: 180, easing: 'cubic-bezier(.4,0,.2,1)', fill: 'forwards',
        });
        await labelAnimation.finished;
        if (id !== revision || destroyed) return;
        label.style.opacity = '0';
        labelAnimation.cancel();
        label.textContent = text;
      }
      labelAnimation = label.animate([{ opacity: label.style.opacity }, { opacity: 1 }], {
        duration: 300, easing: 'cubic-bezier(.4,0,.2,1)', fill: 'forwards',
      });
      await labelAnimation.finished;
      if (id !== revision || destroyed) return;
      label.style.removeProperty('opacity');
      labelAnimation.cancel();
      labelAnimation = null;
    } catch (error) {
      if (error.name !== 'AbortError' && id === revision) settleLabel();
    }
  }

  function setFollowing(value, notify = false) {
    const next = Boolean(value);
    if (destroyed || following === next) return;
    following = next;
    button.setAttribute('aria-pressed', String(following));
    changeLabel(following ? 'Following' : 'Follow');
    if (feedback) feedback.textContent = following ? 'Following in this preview. Click again to unfollow.' : 'No longer following in this preview.';
    if (notify) {
      button.dispatchEvent(new view.CustomEvent('followchange', { bubbles: true, detail: { following: next } }));
      onChange?.(next);
    }
  }

  function toggle() {
    if (!button.disabled && button.getAttribute('aria-disabled') !== 'true') setFollowing(!following, true);
  }
  function onMotionChange() { if (motion.matches) settleLabel(); }

  button.type = 'button';
  if (!button.hasAttribute('aria-label') && !button.hasAttribute('aria-labelledby')) button.setAttribute('aria-label', 'Follow');
  button.setAttribute('aria-pressed', String(following));
  label.textContent = targetLabel;
  button.disabled = false;
  button.addEventListener('click', toggle);
  motion.addEventListener('change', onMotionChange);

  const controller = {
    setFollowing: value => setFollowing(value),
    reset() {
      if (destroyed) return;
      following = false;
      targetLabel = 'Follow';
      button.setAttribute('aria-pressed', 'false');
      settleLabel();
      if (feedback) feedback.textContent = initialFeedback;
    },
    destroy() {
      if (destroyed) return;
      destroyed = true;
      settleLabel();
      button.disabled = true;
      button.removeEventListener('click', toggle);
      motion.removeEventListener('change', onMotionChange);
      mounted.delete(button);
    },
  };
  mounted.set(button, controller);
  return controller;
}

return { mount: mountFollowButton };
})();

const style12 = "\n.sl-field {\n  --field-ink: #202222;\n  --field-hover: #2c2e2e;\n  --field-active: #3d4040;\n  --field-text: #fafaf9;\n  --field-muted: #b6bdbb;\n  --field-focus: #626969;\n  --field-ease: cubic-bezier(.4, 0, .2, 1);\n  position: relative;\n  width: min(300px, 100%);\n  color: var(--field-text);\n  font-family: 'Instrument Sans', sans-serif;\n  text-align: left;\n}\n.sl-field *, .sl-field *::before, .sl-field *::after { box-sizing: border-box; }\n.sl-field [hidden] { display: none !important; }\n.sl-field .sl-field__control { position: relative; height: 60px; border: 1px solid transparent; border-radius: 13px; background: var(--field-ink); box-shadow: inset 0 1px #ffffff12, 0 1px 2px #0000000d; transition: background-color 360ms ease, border-color 360ms ease, box-shadow 420ms var(--field-ease); }\n.sl-field .sl-field__control:hover { background: var(--field-hover); }\n.sl-field .sl-field__control:focus-within { border-color: #aab2af; box-shadow: 0 0 0 3px #545e5e24, inset 0 1px #ffffff12; }\n.sl-field .sl-field__input { display: block; width: 100%; height: 100%; margin: 0; padding: 24px 16px 7px; border: 0; border-radius: inherit; outline: none; background: transparent; color: var(--field-text); caret-color: var(--field-text); font: 450 16px/1.25 'Instrument Sans', sans-serif; letter-spacing: -.01em; }\n.sl-field .sl-field__input::placeholder { color: transparent; }\n.sl-field .sl-field__input:focus-visible { outline: none; }\n.sl-field .sl-field__label { position: absolute; top: 19px; left: 16px; max-width: calc(100% - 32px); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; pointer-events: none; color: var(--field-muted); font: 450 16px/20px 'Instrument Sans', sans-serif; letter-spacing: -.01em; transform-origin: left top; transition: transform 460ms var(--field-ease), color 360ms ease; }\n.sl-field .sl-field__input:focus ~ .sl-field__label, .sl-field .sl-field__input:not(:placeholder-shown) ~ .sl-field__label { transform: translateY(-10px) scale(.8); color: #c9cfcc; }\n.sl-field .sl-field__input:disabled { opacity: .55; cursor: not-allowed; }\n.sl-field .sl-field__helper { min-height: 36px; margin: 10px 2px 0; color: #596060; font: 400 12px/1.5 'Instrument Sans', sans-serif; transition: opacity 300ms ease; }\n.sl-field .sl-field__action, .sl-field .sl-field__step { display: grid; place-items: center; flex: none; padding: 0; border: 0; border-radius: 8px; background: transparent; color: #cbd1ce; cursor: pointer; touch-action: manipulation; transition: background-color 180ms ease, color 180ms ease; }\n.sl-field .sl-field__action { position: absolute; right: 7px; top: 11px; width: 36px; height: 36px; }\n.sl-field .sl-field__action:hover, .sl-field .sl-field__step:hover { background: var(--field-active); color: var(--field-text); }\n.sl-field .sl-field__action:focus-visible, .sl-field .sl-field__step:focus-visible { outline: 2px solid #d7ddd9; outline-offset: -2px; }\n.sl-field .sl-field__action:disabled, .sl-field .sl-field__step:disabled { opacity: .35; background: transparent; cursor: not-allowed; }\n.sl-field .sl-field__action svg, .sl-field .sl-field__step svg, .sl-field .sl-field__leading, .sl-field .sl-field__validation { display: block; width: 20px; height: 20px; fill: none; stroke: currentColor; stroke-width: 1.6; stroke-linecap: round; stroke-linejoin: round; }\n.sl-field.sl-field--search .sl-field__input { padding-left: 52px; padding-right: 44px; }\n.sl-field.sl-field--search .sl-field__label { left: 52px; max-width: calc(100% - 96px); }\n.sl-field .sl-field__leading { position: absolute; top: 15px; left: 13px; width: 28px; height: 28px; stroke-width: 1.9; color: #e0e5e2; pointer-events: none; transform-origin: center; }\n.sl-field.sl-field--search input::-webkit-search-cancel-button, .sl-field.sl-field--search input::-webkit-search-decoration { -webkit-appearance: none; }\n.sl-field .sl-field__popup { position: absolute; z-index: 5; top: 68px; left: 0; right: 0; padding: 6px; border: 1px solid #525958; border-radius: 13px; background: var(--field-ink); box-shadow: 0 8px 20px #0000001f; opacity: 0; visibility: hidden; pointer-events: none; transform: translateY(-6px); transition: opacity 300ms ease, transform 420ms var(--field-ease), visibility 0s 420ms; }\n.sl-field[data-search-open=\"true\"] .sl-field__popup { opacity: 1; visibility: visible; pointer-events: auto; transform: translateY(0); transition-delay: 0s; }\n.sl-field[data-search-open=\"true\"] .sl-field__helper { opacity: 0; }\n.sl-field .sl-field__options { list-style: none; margin: 0; padding: 0; }\n.sl-field .sl-field__option { display: flex; align-items: center; min-height: 34px; padding: 7px 10px; border-radius: 7px; color: var(--field-text); font-size: 14px; line-height: 20px; cursor: pointer; }\n.sl-field .sl-field__option:hover, .sl-field .sl-field__option[aria-selected=\"true\"] { background: var(--field-active); }\n.sl-field .sl-field__empty { margin: 0; padding: 9px 10px; color: #c3cac6; font-size: 13px; line-height: 1.5; }\n.sl-field.sl-field--email .sl-field__input, .sl-field.sl-field--password .sl-field__input { padding-right: 48px; }\n.sl-field.sl-field--email .sl-field__label, .sl-field.sl-field--password .sl-field__label { max-width: calc(100% - 68px); }\n.sl-field .sl-field__validation { position: absolute; top: 16px; right: 12px; width: 26px; height: 26px; border-radius: 50%; background: #ffffff09; stroke-width: 1.15; color: var(--field-text); opacity: 0; pointer-events: none; transition: opacity 300ms ease; }\n.sl-field .sl-field__valid-icon, .sl-field .sl-field__invalid-icon { opacity: 0; transition: opacity 140ms ease; }\n.sl-field .sl-field__invalid-icon { stroke-width: 1.05; }\n.sl-field .sl-field__validation path { stroke-dasharray: 1; stroke-dashoffset: 1; transition: opacity 140ms ease, stroke-dashoffset 0s 140ms; }\n.sl-field[data-validation=\"invalid\"] .sl-field__validation, .sl-field[data-validation=\"valid\"] .sl-field__validation { opacity: 1; }\n.sl-field[data-validation=\"valid\"] .sl-field__valid-icon, .sl-field[data-validation=\"invalid\"] .sl-field__invalid-icon { opacity: 1; transition: opacity 220ms ease 140ms; }\n.sl-field[data-validation=\"valid\"] .sl-field__valid-icon { stroke-dashoffset: 0; transition: opacity 220ms ease 140ms, stroke-dashoffset 440ms var(--field-ease) 140ms; }\n.sl-field[data-validation=\"invalid\"] .sl-field__invalid-icon path { stroke-dashoffset: 0; transition: stroke-dashoffset 360ms var(--field-ease) 140ms; }\n.sl-field[data-validation=\"invalid\"] .sl-field__invalid-icon path + path { transition-delay: 240ms; }\n.sl-field[data-validation=\"invalid\"] .sl-field__control { border-color: #c0c7c3; }\n.sl-field[data-validation=\"invalid\"] .sl-field__helper { color: #353e3b; }\n.sl-field.sl-field--password .sl-field__input { padding-right: 58px; }\n.sl-field .sl-field__reveal { top: 7px; right: 5px; width: 44px; height: 44px; border-radius: 10px; }\n.sl-field .sl-field__reveal svg { width: 32px; height: 24px; overflow: visible; stroke: currentColor; stroke-width: 1.35; }\n.sl-field .sl-field__eyes-open, .sl-field .sl-field__eyes-closed { transform-box: fill-box; transform-origin: center; transition: opacity 220ms ease, transform 440ms var(--field-ease); }\n.sl-field .sl-field__eyes-open { opacity: 0; transform: scaleY(.25); }\n.sl-field .sl-field__eyes-open circle { fill: currentColor; stroke: none; transform-box: fill-box; transform-origin: center; transform: scale(.3); transition: transform 380ms var(--field-ease); }\n.sl-field .sl-field__eyes-closed { opacity: 1; transform: scaleY(1); }\n.sl-field[data-visible=\"true\"] .sl-field__eyes-open { opacity: 1; transform: scaleY(1); transition-delay: 120ms, 0s; }\n.sl-field[data-visible=\"true\"] .sl-field__eyes-open circle { transform: scale(1); transition-delay: 180ms; }\n.sl-field[data-visible=\"true\"] .sl-field__eyes-closed { opacity: 0; transform: scaleY(.2); }\n.sl-field.sl-field--number .sl-field__input { padding-right: 92px; appearance: textfield; -moz-appearance: textfield; }\n.sl-field.sl-field--number .sl-field__input::-webkit-inner-spin-button, .sl-field.sl-field--number .sl-field__input::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }\n.sl-field.sl-field--number .sl-field__label { max-width: calc(100% - 108px); }\n.sl-field .sl-field__steps { position: absolute; top: 11px; right: 7px; display: flex; gap: 2px; }\n.sl-field .sl-field__step { width: 36px; height: 36px; }\n@media (prefers-reduced-motion: reduce) {\n  .sl-field *, .sl-field *::before, .sl-field *::after { transition: none !important; animation: none !important; }\n  .sl-field .sl-field__popup { transform: none !important; }\n}\n@media (forced-colors: active) {\n  .sl-field .sl-field__control, .sl-field .sl-field__popup { forced-color-adjust: none; background: Field !important; border-color: FieldText; color: FieldText; box-shadow: none; }\n  .sl-field .sl-field__input, .sl-field .sl-field__label, .sl-field .sl-field__leading, .sl-field .sl-field__validation, .sl-field .sl-field__option, .sl-field .sl-field__action, .sl-field .sl-field__step, .sl-field .sl-field__empty { color: FieldText !important; caret-color: FieldText; }\n  .sl-field .sl-field__control:focus-within { outline: 2px solid Highlight; outline-offset: 3px; }\n  .sl-field .sl-field__option[aria-selected=\"true\"], .sl-field .sl-field__option:hover, .sl-field .sl-field__action:hover, .sl-field .sl-field__step:hover { background: Highlight; color: HighlightText !important; }\n  .sl-field .sl-field__helper { color: CanvasText; }\n}\n\n/* Draft input styles below this marker are not included in approved packages. */\n.sl-field.sl-field--textarea .sl-field__control { height: 60px; min-height: 60px; max-height: 180px; transition: height 420ms var(--field-ease), background-color 360ms ease, border-color 360ms ease, box-shadow 420ms var(--field-ease); }\n.sl-field.sl-field--textarea .sl-field__input { min-height: 0; padding: 30px 16px 24px; resize: none; overflow: hidden; line-height: 1.45; scrollbar-width: none; }\n.sl-field.sl-field--textarea .sl-field__input::-webkit-scrollbar { display: none; width: 0; height: 0; }\n.sl-field.sl-field--textarea .sl-field__label { top: 18px; }\n.sl-field .sl-field__counter { position: absolute; right: 13px; bottom: 7px; display: flex; gap: 2px; color: #89918e; font-size: 11px; line-height: 16px; font-variant-numeric: tabular-nums; pointer-events: none; }\n.sl-field.sl-field--textarea .sl-field__input:focus ~ .sl-field__label, .sl-field.sl-field--textarea .sl-field__input:not(:placeholder-shown) ~ .sl-field__label { transform: translateY(-13px) scale(.76); }\n\n.sl-field.sl-field--url .sl-field__input { padding-left: 50px; padding-right: 48px; }\n.sl-field.sl-field--url .sl-field__label { left: 50px; max-width: calc(100% - 100px); }\n.sl-field .sl-field__globe { top: 16px; left: 13px; width: 26px; height: 26px; overflow: visible; stroke-width: 1.35; }\n.sl-field .sl-field__globe-axis { transform-box: fill-box; transform-origin: center; transition: transform 520ms var(--field-ease), opacity 320ms ease; }\n.sl-field.sl-field--url[data-validation=\"valid\"] .sl-field__globe { color: #f3f5f4; }\n.sl-field.sl-field--url[data-validation=\"valid\"] .sl-field__globe-axis { transform: scaleX(.92); }\n\n.sl-field.sl-field--phone .sl-field__input { padding-left: 52px; }\n.sl-field.sl-field--phone .sl-field__label { left: 52px; max-width: calc(100% - 70px); }\n.sl-field .sl-field__phone { top: 15px; left: 12px; width: 29px; height: 29px; overflow: visible; stroke-width: 1.4; }\n.sl-field .sl-field__phone-body { transform-box: fill-box; transform-origin: 54% 58%; }\n.sl-field .sl-field__phone-ring { opacity: 0; stroke-dasharray: 1; stroke-dashoffset: 1; }\n.sl-field[data-ringing=\"true\"] .sl-field__phone-ring { opacity: 1; stroke-dashoffset: 0; transition: opacity 160ms ease, stroke-dashoffset 320ms var(--field-ease); }\n.sl-field[data-ringing=\"true\"] .sl-field__phone-ring--two { transition-delay: 90ms; }\n\n.sl-field.sl-field--amount .sl-field__input { padding-left: 37px; padding-right: 58px; font-variant-numeric: tabular-nums; }\n.sl-field.sl-field--amount .sl-field__label { left: 37px; max-width: calc(100% - 100px); }\n.sl-field .sl-field__currency, .sl-field .sl-field__currency-code { position: absolute; z-index: 1; pointer-events: none; color: #cbd1ce; transition: transform 440ms var(--field-ease), color 300ms ease, opacity 300ms ease; }\n.sl-field .sl-field__currency { top: 19px; left: 15px; font-size: 18px; font-weight: 520; line-height: 22px; }\n.sl-field .sl-field__currency-code { top: 23px; right: 14px; font-size: 11px; line-height: 16px; letter-spacing: .04em; }\n.sl-field.sl-field--amount .sl-field__control:focus-within .sl-field__currency { color: #f5f6f5; transform: translateX(-2px); }\n.sl-field.sl-field--amount .sl-field__control:focus-within .sl-field__currency-code { color: #f5f6f5; transform: translateX(2px); }\n.sl-field.sl-field--amount[data-amount-state=\"invalid\"] .sl-field__control { border-color: #c0c7c3; }\n.sl-field.sl-field--amount[data-amount-state=\"invalid\"] .sl-field__helper { color: #353e3b; }\n\n.sl-field.sl-field--code { width: min(300px, 100%); }\n.sl-code__label { display: block; margin: 0 0 10px 2px; color: #596060; font: 500 12px/1.4 'Instrument Sans', sans-serif; }\n.sl-code__control { position: relative; height: 46px; }\n.sl-code__input { position: absolute; z-index: 2; inset: 0; width: 100%; height: 100%; padding: 0; border: 0; outline: 0; opacity: 0; cursor: text; caret-color: transparent; }\n.sl-code__cells { position: absolute; inset: 0; display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); gap: 7px; pointer-events: none; }\n.sl-code__cells span { display: grid; place-items: center; min-width: 0; border: 1px solid transparent; border-radius: 11px; color: #f8f9f8; background: var(--field-ink); box-shadow: inset 0 1px #ffffff12, 0 1px 2px #0000000d; font: 600 18px/1 'Instrument Sans', sans-serif; font-variant-numeric: tabular-nums; transition: border-color 300ms ease, background-color 300ms ease, box-shadow 380ms var(--field-ease), transform 380ms var(--field-ease); }\n.sl-code__input:focus-visible + .sl-code__cells span.is-active { border-color: #aab2af; background: var(--field-hover); box-shadow: 0 0 0 3px #545e5e24, inset 0 1px #ffffff12; transform: translateY(-2px); }\n.sl-field[data-result=\"success\"] .sl-code__cells span { color: #eaf8ef; border-color: #4f8d72; background: #234b3a; box-shadow: inset 0 1px #ffffff17, 0 0 0 2px #4f8d7218; transform: translateY(-2px); }\n.sl-field[data-result=\"error\"] .sl-code__cells span { color: #fff0f0; border-color: #a85e63; background: #543134; box-shadow: inset 0 1px #ffffff12, 0 0 0 2px #a85e6315; transform: translateY(1px); }\n.sl-field[data-result]:not([data-result=\"neutral\"]) .sl-code__cells span:nth-child(1) { transition-delay: 0ms; }\n.sl-field[data-result]:not([data-result=\"neutral\"]) .sl-code__cells span:nth-child(2) { transition-delay: 80ms; }\n.sl-field[data-result]:not([data-result=\"neutral\"]) .sl-code__cells span:nth-child(3) { transition-delay: 160ms; }\n.sl-field[data-result]:not([data-result=\"neutral\"]) .sl-code__cells span:nth-child(4) { transition-delay: 240ms; }\n.sl-field[data-result]:not([data-result=\"neutral\"]) .sl-code__cells span:nth-child(5) { transition-delay: 320ms; }\n.sl-field[data-result]:not([data-result=\"neutral\"]) .sl-code__cells span:nth-child(6) { transition-delay: 400ms; }\n\n@media (max-width: 420px) {\n  .sl-code__cells { gap: 5px; }\n}\n@media (prefers-reduced-motion: reduce) {\n  .sl-field .sl-field__counter, .sl-field .sl-field__phone-ring, .sl-field .sl-code__cells span { transition: none !important; animation: none !important; transform: none !important; }\n}\n@media (forced-colors: active) {\n  .sl-field .sl-code__cells span { forced-color-adjust: none; background: Field; border-color: FieldText; color: FieldText; box-shadow: none; }\n  .sl-field .sl-code__input:focus-visible + .sl-code__cells span.is-active { outline: 2px solid Highlight; outline-offset: 2px; }\n}\n";
const api11 = (() => {
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

function mountTextField(root) { return mountField(root, 'text'); }


return { mount: mountTextField };
})();

const api12 = (() => {
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


return { mount: mountSearchField };
})();

const api13 = (() => {
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

function mountEmailField(root) {
  return mountField(root, 'email', ({ root, input, view, on, resets, cleanups, alive }) => {
    const helper = root.querySelector('.sl-field__helper');
    if (!helper) throw new TypeError('Email needs a helper.');
    const initialHelper = helper.textContent;
    let validationTimer = null, composing = false;
    function cancelCheck() { view.clearTimeout(validationTimer); validationTimer = null; }
    function clear() { cancelCheck(); root.dataset.validation = 'neutral'; input.removeAttribute('aria-invalid'); helper.textContent = initialHelper; }
    function validate() {
      cancelCheck();
      if (!alive()) return input.validity.valid;
      if (input.disabled || input.readOnly || composing) { clear(); return input.validity.valid; }
      if (!input.value && !input.required) { clear(); return true; }
      const valid = input.validity.valid;
      root.dataset.validation = valid ? 'valid' : 'invalid'; input.setAttribute('aria-invalid', String(!valid));
      helper.textContent = valid ? 'Email format looks right.' : input.validity.valueMissing ? 'Enter an email address.' : 'Enter an address such as name@example.com.';
      return valid;
    }
    function scheduleCheck(event) {
      clear();
      if (input.value && !composing && !event?.isComposing) validationTimer = view.setTimeout(validate, 650);
    }
    on(input, 'blur', validate); on(input, 'input', scheduleCheck);
    on(input, 'compositionstart', () => { composing = true; clear(); });
    on(input, 'compositionend', () => { composing = false; scheduleCheck(); });
    resets.push(() => { composing = false; clear(); }); cleanups.push(clear); clear();
    return { validate };
  });
}


return { mount: mountEmailField };
})();

const api14 = (() => {
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

function mountPasswordField(root) {
  return mountField(root, 'password', ({ root, input, doc, on, resets, cleanups, alive }) => {
    const reveal = root.querySelector('.sl-field__reveal');
    if (!reveal) throw new TypeError('Password needs its reveal button.');
    let visible = false;
    function setVisible(value) {
      if (!alive()) return;
      const focused = doc.activeElement === input || root.getRootNode().activeElement === input;
      const start = input.selectionStart, end = input.selectionEnd, direction = input.selectionDirection, scroll = input.scrollLeft;
      visible = Boolean(value); input.type = visible ? 'text' : 'password'; root.dataset.visible = String(visible);
      reveal.setAttribute('aria-pressed', String(visible)); reveal.setAttribute('aria-label', visible ? 'Hide password' : 'Show password');
      if (focused) input.focus({ preventScroll: true });
      if (start !== null && end !== null) input.setSelectionRange(start, end, direction);
      input.scrollLeft = scroll;
    }
    on(reveal, 'pointerdown', event => { if (event.button === 0 && (doc.activeElement === input || root.getRootNode().activeElement === input)) event.preventDefault(); });
    on(reveal, 'click', () => { if (!input.disabled) setVisible(!visible); });
    reveal.disabled = input.disabled;
    resets.push(() => setVisible(false));
    cleanups.push(() => { visible = false; input.type = 'password'; root.dataset.visible = 'false'; reveal.setAttribute('aria-pressed', 'false'); reveal.setAttribute('aria-label', 'Show password'); reveal.disabled = true; });
    return { setVisible, get isVisible() { return visible; } };
  });
}


return { mount: mountPasswordField };
})();

const api15 = (() => {
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

return { mount: mountNumberField };
})();

const api16 = (() => {
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

function mountTextareaField(root) {
  return mountField(root, 'textarea', ({ input, root, view, on, resets, cleanups }) => {
    const control = root.querySelector('.sl-field__control');
    const count = root.querySelector('[data-count]');
    const helper = root.querySelector('.sl-field__helper');
    if (!control || !count || !helper) throw new TypeError('Textarea needs a control, counter and helper.');
    const initialHelper = helper.textContent;
    const limit = input.maxLength > 0 ? input.maxLength : null;
    function resize() {
      input.style.height = '0px';
      const contentHeight = input.scrollHeight;
      const height = input.value ? Math.max(60, Math.min(180, contentHeight)) : 60;
      input.style.height = '100%';
      input.style.overflowY = contentHeight > 180 ? 'auto' : 'hidden';
      control.style.height = `${height}px`;
    }
    function update() {
      const length = [...input.value].length;
      count.textContent = String(length);
      helper.textContent = limit && length >= limit ? `Character limit reached: ${limit}.` : initialHelper;
      resize();
    }
    on(input, 'input', event => { if (!event.isComposing) update(); });
    on(input, 'compositionend', () => update());
    on(view, 'resize', resize);
    resets.push(update);
    cleanups.push(() => { control.style.removeProperty('height'); input.style.removeProperty('height'); input.style.removeProperty('overflow-y'); });
    update();
    return { get length() { return [...input.value].length; } };
  });
}


return { mount: mountTextareaField };
})();

const api17 = (() => {
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


return { mount: mountUrlField };
})();

const api18 = (() => {
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


return { mount: mountPhoneField };
})();

const api19 = (() => {
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


return { mount: mountAmountField };
})();

const api20 = (() => {
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

return { mount: mountCodeField };
})();

const style13 = "\n.sl-toggle {\n  --toggle-ink: #202222;\n  --toggle-hover: #292c2b;\n  --toggle-track: #0f1010;\n  --toggle-track-on: #454b49;\n  --toggle-thumb: #eef0ef;\n  --toggle-text: #f7f8f7;\n  --toggle-muted: #aeb5b2;\n  --toggle-ease: cubic-bezier(.4, 0, .2, 1);\n  width: min(320px, 100%);\n  min-height: 82px;\n  padding: 14px;\n  box-sizing: border-box;\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  border: 1px solid #ffffff0b;\n  border-radius: 14px;\n  color: var(--toggle-text);\n  background: var(--toggle-ink);\n  box-shadow: inset 0 1px #ffffff0d, 0 2px 5px #00000010;\n  font-family: 'Instrument Sans', sans-serif;\n  text-align: left;\n  transition: background-color 300ms ease, border-color 300ms ease, box-shadow 380ms var(--toggle-ease);\n}\n.sl-toggle *, .sl-toggle *::before, .sl-toggle *::after { box-sizing: border-box; }\n.sl-toggle:hover { background: var(--toggle-hover); }\n.sl-toggle__label { min-width: 0; flex: 1; display: block; cursor: pointer; }\n.sl-toggle__copy { min-width: 0; display: grid; gap: 4px; }\n.sl-toggle__title { overflow: hidden; text-overflow: ellipsis; color: var(--toggle-text); font-size: 15px; font-weight: 540; line-height: 20px; letter-spacing: -.01em; white-space: nowrap; }\n.sl-toggle__status { color: var(--toggle-muted); font-size: 12px; line-height: 16px; font-variant-numeric: tabular-nums; transition: color 300ms ease, opacity 240ms ease; }\n.sl-toggle[data-checked=\"true\"] .sl-toggle__status { color: #e2e6e4; }\n.sl-toggle__switch { position: relative; display: block; flex: none; width: 64px; height: 36px; }\n.sl-toggle__input { position: absolute; z-index: 2; inset: 0; width: 100%; height: 100%; margin: 0; opacity: 0; cursor: pointer; }\n.sl-toggle__track { position: absolute; inset: 0; display: block; overflow: hidden; border: 1px solid #5b615f; border-radius: 12px; background: var(--toggle-track); box-shadow: inset 0 1px 3px #0008, 0 1px #ffffff0b; transition: background-color 360ms ease, border-color 360ms ease, box-shadow 420ms var(--toggle-ease), transform 260ms var(--toggle-ease); }\n.sl-toggle__thumb { position: absolute; top: 3px; left: 3px; width: 28px; height: 28px; display: grid; place-items: center; border-radius: 9px; color: #1f2221; background: var(--toggle-thumb); box-shadow: 0 2px 5px #0006, inset 0 1px #fff; transform: translateX(0); transform-origin: center; transition: transform 460ms var(--toggle-ease), width 220ms var(--toggle-ease), border-radius 320ms ease, background-color 320ms ease; }\n.sl-toggle__input:checked + .sl-toggle__track { border-color: #7b8480; background: var(--toggle-track-on); box-shadow: inset 0 1px 3px #0004, 0 1px #ffffff12; }\n.sl-toggle__input:checked + .sl-toggle__track .sl-toggle__thumb { transform: translateX(30px); }\n.sl-toggle__input:focus-visible + .sl-toggle__track { outline: 2px solid #1d201f; outline-offset: 3px; box-shadow: 0 0 0 5px #68716d2b, inset 0 1px 3px #0006; }\n.sl-toggle__input:active + .sl-toggle__track .sl-toggle__thumb { width: 32px; }\n.sl-toggle__input:checked:active + .sl-toggle__track .sl-toggle__thumb { transform: translateX(26px); }\n.sl-toggle__input:disabled { cursor: not-allowed; }\n.sl-toggle:has(.sl-toggle__input:disabled) { opacity: .55; }\n.sl-toggle__dot { width: 7px; height: 7px; border-radius: 3px; background: #7a817e; box-shadow: inset 0 1px #fff6; transition: width 380ms var(--toggle-ease), background-color 300ms ease; }\n.sl-toggle__input:checked + .sl-toggle__track .sl-toggle__dot { width: 13px; background: #373b39; }\n\n.sl-toggle__emblem { flex: none; width: 44px; height: 44px; display: grid; place-items: center; border: 1px solid #555b59; border-radius: 12px; color: #cbd1ce; background: #161818; box-shadow: inset 0 1px #ffffff0b; transition: color 300ms ease, background-color 300ms ease, border-color 300ms ease; }\n.sl-toggle__emblem svg { display: block; width: 29px; height: 29px; overflow: visible; stroke: currentColor; stroke-width: 1.45; stroke-linecap: round; stroke-linejoin: round; }\n.sl-toggle[data-checked=\"true\"] .sl-toggle__emblem { color: #f0f2f1; border-color: #69716e; background: #303432; }\n\n.sl-bell__body { transform-origin: 16px 8px; }\n.sl-bell__waves { opacity: 1; transition: opacity 340ms ease 140ms; }\n.sl-bell__slash { stroke-dasharray: 1; stroke-dashoffset: 1; opacity: 0; transition: stroke-dashoffset 420ms var(--toggle-ease), opacity 260ms ease; }\n.sl-toggle--glide[data-checked=\"false\"] .sl-bell__waves { opacity: 0; transition-delay: 0ms; }\n.sl-toggle--glide[data-checked=\"false\"] .sl-bell__slash { opacity: 1; stroke-dashoffset: 0; transition-delay: 100ms; }\n\n.sl-toggle--theme .sl-toggle__thumb { transition: transform 580ms cubic-bezier(.22,.61,.36,1), background-color 320ms ease; }\n.sl-toggle--theme .sl-toggle__input:active + .sl-toggle__track .sl-toggle__thumb { width: 28px; }\n.sl-toggle--theme .sl-toggle__input:checked:active + .sl-toggle__track .sl-toggle__thumb { transform: translateX(30px); }\n.sl-toggle--theme .sl-toggle__thumb svg { position: absolute; width: 18px; height: 18px; stroke: currentColor; stroke-width: 1.4; stroke-linecap: round; stroke-linejoin: round; transition: opacity 220ms ease; }\n.sl-toggle--theme .sl-toggle__sun { opacity: 1; transition-delay: 150ms; }\n.sl-toggle--theme .sl-toggle__moon { opacity: 0; }\n.sl-toggle--theme .sl-toggle__input:checked + .sl-toggle__track .sl-toggle__sun { opacity: 0; transition-delay: 0ms; }\n.sl-toggle--theme .sl-toggle__input:checked + .sl-toggle__track .sl-toggle__moon { opacity: 1; transition-delay: 150ms; }\n\n.sl-sound__wave, .sl-sound__mute { transform-box: fill-box; transform-origin: center; transition: opacity 240ms ease, transform 420ms var(--toggle-ease), stroke-dashoffset 420ms var(--toggle-ease); }\n.sl-sound__wave { stroke-dasharray: 1; stroke-dashoffset: 0; }\n.sl-sound__wave--two { transition-delay: 70ms; }\n.sl-sound__mute { opacity: 0; transform: scale(.65) rotate(-12deg); }\n.sl-toggle--sound[data-checked=\"false\"] .sl-sound__wave { opacity: 0; stroke-dashoffset: 1; transform: translateX(-2px); transition-delay: 0ms; }\n.sl-toggle--sound[data-checked=\"false\"] .sl-sound__mute { opacity: 1; transform: scale(1) rotate(0); transition-delay: 120ms; }\n\n.sl-lock__shackle { transform-box: fill-box; transform-origin: 26% 80%; transition: transform 520ms var(--toggle-ease); }\n.sl-lock__body { transition: fill 300ms ease; }\n.sl-toggle--privacy[data-checked=\"false\"] .sl-lock__shackle { transform: translate(3px, -2px) rotate(24deg); }\n.sl-toggle--privacy[data-checked=\"true\"] .sl-lock__shackle { transform: translate(0) rotate(0); }\n.sl-lock__key { stroke-dasharray: 1; stroke-dashoffset: 1; transition: stroke-dashoffset 360ms var(--toggle-ease) 150ms; }\n.sl-toggle--privacy[data-checked=\"true\"] .sl-lock__key { stroke-dashoffset: 0; }\n\n.sl-sync__orbit { transform-origin: center; }\n.sl-toggle--sync[data-checked=\"false\"] .sl-sync__orbit { opacity: .72; }\n.sl-toggle--sync[data-checked=\"true\"] .sl-sync__orbit { opacity: 1; }\n\n@media (max-width: 420px) {\n  .sl-toggle { padding: 12px; gap: 10px; }\n  .sl-toggle__emblem { width: 40px; height: 40px; }\n  .sl-toggle__title { font-size: 14px; }\n}\n@media (prefers-reduced-motion: reduce) {\n  .sl-toggle, .sl-toggle *, .sl-toggle *::before, .sl-toggle *::after { transition: none !important; animation: none !important; }\n}\n@media (forced-colors: active) {\n  .sl-toggle, .sl-toggle__emblem, .sl-toggle__track, .sl-toggle__thumb { forced-color-adjust: none; color: FieldText; background: Field; border-color: FieldText; box-shadow: none; }\n  .sl-toggle__status, .sl-toggle__title { color: FieldText; }\n  .sl-toggle__input:checked + .sl-toggle__track { background: Highlight; border-color: Highlight; }\n  .sl-toggle__input:checked + .sl-toggle__track .sl-toggle__thumb { color: Highlight; background: HighlightText; }\n  .sl-toggle__input:focus-visible + .sl-toggle__track { outline-color: Highlight; box-shadow: none; }\n}\n";
const api21 = (() => {
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

return { mount: mountToggle };
})();

const style14 = "\n.sl-toggle {\n  --toggle-ink: #202222;\n  --toggle-hover: #292c2b;\n  --toggle-track: #0f1010;\n  --toggle-track-on: #454b49;\n  --toggle-thumb: #eef0ef;\n  --toggle-text: #f7f8f7;\n  --toggle-muted: #aeb5b2;\n  --toggle-ease: cubic-bezier(.4, 0, .2, 1);\n  width: min(320px, 100%);\n  min-height: 82px;\n  padding: 14px;\n  box-sizing: border-box;\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  border: 1px solid #ffffff0b;\n  border-radius: 14px;\n  color: var(--toggle-text);\n  background: var(--toggle-ink);\n  box-shadow: inset 0 1px #ffffff0d, 0 2px 5px #00000010;\n  font-family: 'Instrument Sans', sans-serif;\n  text-align: left;\n  transition: background-color 300ms ease, border-color 300ms ease, box-shadow 380ms var(--toggle-ease);\n}\n.sl-toggle *, .sl-toggle *::before, .sl-toggle *::after { box-sizing: border-box; }\n.sl-toggle:hover { background: var(--toggle-hover); }\n.sl-toggle__label { min-width: 0; flex: 1; display: block; cursor: pointer; }\n.sl-toggle__copy { min-width: 0; display: grid; gap: 4px; }\n.sl-toggle__title { overflow: hidden; text-overflow: ellipsis; color: var(--toggle-text); font-size: 15px; font-weight: 540; line-height: 20px; letter-spacing: -.01em; white-space: nowrap; }\n.sl-toggle__status { color: var(--toggle-muted); font-size: 12px; line-height: 16px; font-variant-numeric: tabular-nums; transition: color 300ms ease, opacity 240ms ease; }\n.sl-toggle[data-checked=\"true\"] .sl-toggle__status { color: #e2e6e4; }\n.sl-toggle__switch { position: relative; display: block; flex: none; width: 64px; height: 36px; }\n.sl-toggle__input { position: absolute; z-index: 2; inset: 0; width: 100%; height: 100%; margin: 0; opacity: 0; cursor: pointer; }\n.sl-toggle__track { position: absolute; inset: 0; display: block; overflow: hidden; border: 1px solid #5b615f; border-radius: 12px; background: var(--toggle-track); box-shadow: inset 0 1px 3px #0008, 0 1px #ffffff0b; transition: background-color 360ms ease, border-color 360ms ease, box-shadow 420ms var(--toggle-ease), transform 260ms var(--toggle-ease); }\n.sl-toggle__thumb { position: absolute; top: 3px; left: 3px; width: 28px; height: 28px; display: grid; place-items: center; border-radius: 9px; color: #1f2221; background: var(--toggle-thumb); box-shadow: 0 2px 5px #0006, inset 0 1px #fff; transform: translateX(0); transform-origin: center; transition: transform 460ms var(--toggle-ease), width 220ms var(--toggle-ease), border-radius 320ms ease, background-color 320ms ease; }\n.sl-toggle__input:checked + .sl-toggle__track { border-color: #7b8480; background: var(--toggle-track-on); box-shadow: inset 0 1px 3px #0004, 0 1px #ffffff12; }\n.sl-toggle__input:checked + .sl-toggle__track .sl-toggle__thumb { transform: translateX(30px); }\n.sl-toggle__input:focus-visible + .sl-toggle__track { outline: 2px solid #1d201f; outline-offset: 3px; box-shadow: 0 0 0 5px #68716d2b, inset 0 1px 3px #0006; }\n.sl-toggle__input:active + .sl-toggle__track .sl-toggle__thumb { width: 32px; }\n.sl-toggle__input:checked:active + .sl-toggle__track .sl-toggle__thumb { transform: translateX(26px); }\n.sl-toggle__input:disabled { cursor: not-allowed; }\n.sl-toggle:has(.sl-toggle__input:disabled) { opacity: .55; }\n.sl-toggle__dot { width: 7px; height: 7px; border-radius: 3px; background: #7a817e; box-shadow: inset 0 1px #fff6; transition: width 380ms var(--toggle-ease), background-color 300ms ease; }\n.sl-toggle__input:checked + .sl-toggle__track .sl-toggle__dot { width: 13px; background: #373b39; }\n\n.sl-toggle__emblem { flex: none; width: 44px; height: 44px; display: grid; place-items: center; border: 1px solid #555b59; border-radius: 12px; color: #cbd1ce; background: #161818; box-shadow: inset 0 1px #ffffff0b; transition: color 300ms ease, background-color 300ms ease, border-color 300ms ease; }\n.sl-toggle__emblem svg { display: block; width: 29px; height: 29px; overflow: visible; stroke: currentColor; stroke-width: 1.45; stroke-linecap: round; stroke-linejoin: round; }\n.sl-toggle[data-checked=\"true\"] .sl-toggle__emblem { color: #f0f2f1; border-color: #69716e; background: #303432; }\n\n.sl-bell__body { transform-origin: 16px 8px; }\n.sl-bell__waves { opacity: 1; transition: opacity 340ms ease 140ms; }\n.sl-bell__slash { stroke-dasharray: 1; stroke-dashoffset: 1; opacity: 0; transition: stroke-dashoffset 420ms var(--toggle-ease), opacity 260ms ease; }\n.sl-toggle--glide[data-checked=\"false\"] .sl-bell__waves { opacity: 0; transition-delay: 0ms; }\n.sl-toggle--glide[data-checked=\"false\"] .sl-bell__slash { opacity: 1; stroke-dashoffset: 0; transition-delay: 100ms; }\n\n.sl-toggle--theme .sl-toggle__thumb { transition: transform 580ms cubic-bezier(.22,.61,.36,1), background-color 320ms ease; }\n.sl-toggle--theme .sl-toggle__input:active + .sl-toggle__track .sl-toggle__thumb { width: 28px; }\n.sl-toggle--theme .sl-toggle__input:checked:active + .sl-toggle__track .sl-toggle__thumb { transform: translateX(30px); }\n.sl-toggle--theme .sl-toggle__thumb svg { position: absolute; width: 18px; height: 18px; stroke: currentColor; stroke-width: 1.4; stroke-linecap: round; stroke-linejoin: round; transition: opacity 220ms ease; }\n.sl-toggle--theme .sl-toggle__sun { opacity: 1; transition-delay: 150ms; }\n.sl-toggle--theme .sl-toggle__moon { opacity: 0; }\n.sl-toggle--theme .sl-toggle__input:checked + .sl-toggle__track .sl-toggle__sun { opacity: 0; transition-delay: 0ms; }\n.sl-toggle--theme .sl-toggle__input:checked + .sl-toggle__track .sl-toggle__moon { opacity: 1; transition-delay: 150ms; }\n\n.sl-sound__wave, .sl-sound__mute { transform-box: fill-box; transform-origin: center; transition: opacity 240ms ease, transform 420ms var(--toggle-ease), stroke-dashoffset 420ms var(--toggle-ease); }\n.sl-sound__wave { stroke-dasharray: 1; stroke-dashoffset: 0; }\n.sl-sound__wave--two { transition-delay: 70ms; }\n.sl-sound__mute { opacity: 0; transform: scale(.65) rotate(-12deg); }\n.sl-toggle--sound[data-checked=\"false\"] .sl-sound__wave { opacity: 0; stroke-dashoffset: 1; transform: translateX(-2px); transition-delay: 0ms; }\n.sl-toggle--sound[data-checked=\"false\"] .sl-sound__mute { opacity: 1; transform: scale(1) rotate(0); transition-delay: 120ms; }\n\n.sl-lock__shackle { transform-box: fill-box; transform-origin: 26% 80%; transition: transform 520ms var(--toggle-ease); }\n.sl-lock__body { transition: fill 300ms ease; }\n.sl-toggle--privacy[data-checked=\"false\"] .sl-lock__shackle { transform: translate(3px, -2px) rotate(24deg); }\n.sl-toggle--privacy[data-checked=\"true\"] .sl-lock__shackle { transform: translate(0) rotate(0); }\n.sl-lock__key { stroke-dasharray: 1; stroke-dashoffset: 1; transition: stroke-dashoffset 360ms var(--toggle-ease) 150ms; }\n.sl-toggle--privacy[data-checked=\"true\"] .sl-lock__key { stroke-dashoffset: 0; }\n\n.sl-sync__orbit { transform-origin: center; }\n.sl-toggle--sync[data-checked=\"false\"] .sl-sync__orbit { opacity: .72; }\n.sl-toggle--sync[data-checked=\"true\"] .sl-sync__orbit { opacity: 1; }\n\n@media (max-width: 420px) {\n  .sl-toggle { padding: 12px; gap: 10px; }\n  .sl-toggle__emblem { width: 40px; height: 40px; }\n  .sl-toggle__title { font-size: 14px; }\n}\n@media (prefers-reduced-motion: reduce) {\n  .sl-toggle, .sl-toggle *, .sl-toggle *::before, .sl-toggle *::after { transition: none !important; animation: none !important; }\n}\n@media (forced-colors: active) {\n  .sl-toggle, .sl-toggle__emblem, .sl-toggle__track, .sl-toggle__thumb { forced-color-adjust: none; color: FieldText; background: Field; border-color: FieldText; box-shadow: none; }\n  .sl-toggle__status, .sl-toggle__title { color: FieldText; }\n  .sl-toggle__input:checked + .sl-toggle__track { background: Highlight; border-color: Highlight; }\n  .sl-toggle__input:checked + .sl-toggle__track .sl-toggle__thumb { color: Highlight; background: HighlightText; }\n  .sl-toggle__input:focus-visible + .sl-toggle__track { outline-color: Highlight; box-shadow: none; }\n}\n\n/* State transitions can reverse immediately, even during rapid input. */\n.wifi-arc { opacity: .16; transform-origin: 16px 25px; transform: scale(.86); transition: opacity 420ms ease, transform 580ms var(--toggle-ease); }\n.sl-toggle--wifi[data-checked=\"true\"] .wifi-arc { opacity: 1; transform: scale(1); }\n.sl-toggle--wifi[data-checked=\"true\"] .a2 { transition-delay: 75ms; }\n.sl-toggle--wifi[data-checked=\"true\"] .a3 { transition-delay: 150ms; }\n\n.location-pin { transform: translateY(-3px); opacity: .6; transition: transform 620ms var(--toggle-ease), opacity 420ms ease; }\n.location-base { opacity: .15; transform-origin: 16px 27px; transform: scaleX(.65); transition: opacity 500ms ease, transform 620ms var(--toggle-ease); }\n.location-dot { fill: transparent; transition: fill 420ms ease; }\n.sl-toggle--location[data-checked=\"true\"] .location-pin { transform: translateY(0); opacity: 1; }\n.sl-toggle--location[data-checked=\"true\"] .location-base { opacity: .7; transform: scaleX(1); }\n.sl-toggle--location[data-checked=\"true\"] .location-dot { fill: currentColor; }\n\n.battery-bars, .battery-leaf { transform-origin: 16px 16px; transition: opacity 240ms ease, transform 540ms var(--toggle-ease); }\n.battery-bars { opacity: 1; transition-delay: 120ms; }\n.battery-leaf { opacity: 0; transform: rotate(-18deg) scale(.8); }\n.sl-toggle--battery[data-checked=\"true\"] .battery-bars { opacity: 0; transition-delay: 0ms; }\n.sl-toggle--battery[data-checked=\"true\"] .battery-leaf { opacity: 1; transform: rotate(0) scale(1); transition-delay: 170ms; }\n\n.mic-waves { opacity: 1; transition: opacity 380ms ease 100ms; }\n.mic-slash { stroke-dasharray: 1; stroke-dashoffset: 1; opacity: 0; transition: stroke-dashoffset 560ms var(--toggle-ease), opacity 300ms ease; }\n.sl-toggle--microphone[data-checked=\"false\"] .mic-waves { opacity: 0; transition-delay: 0ms; }\n.sl-toggle--microphone[data-checked=\"false\"] .mic-slash { stroke-dashoffset: 0; opacity: 1; }\n\n.save-line { opacity: 1; transition: opacity 240ms ease 180ms; }\n.save-check { stroke-dasharray: 1; stroke-dashoffset: 1; opacity: 0; transition: stroke-dashoffset 580ms var(--toggle-ease), opacity 260ms ease; }\n.save-slot { transform: translateY(0); transition: transform 520ms var(--toggle-ease); }\n.sl-toggle--autosave[data-checked=\"true\"] .save-line { opacity: 0; transition-delay: 0ms; }\n.sl-toggle--autosave[data-checked=\"true\"] .save-check { stroke-dashoffset: 0; opacity: 1; transition-delay: 130ms; }\n.sl-toggle--autosave[data-checked=\"true\"] .save-slot { transform: translateY(-1px); }\n";
const style15 = "\n.sl-check-card {\n  --check-ink: #202222;\n  --check-paper: #eef0ee;\n  --check-muted: #aeb5b2;\n  --check-ease: cubic-bezier(.22,.61,.36,1);\n  width: min(320px,100%); min-width: 0; margin: 0; padding: 6px;\n  border: 1px solid #ffffff0b; border-radius: 14px;\n  color: #f7f8f7; background: var(--check-ink);\n  box-shadow: inset 0 1px #ffffff0d, 0 2px 5px #00000010;\n  font-family: 'Instrument Sans',sans-serif; text-align: left;\n}\n.sl-check-card, .sl-check-card * { box-sizing: border-box; }\n.sl-check { position: relative; display: flex; align-items: center; gap: 16px; min-height: 68px; padding: 12px; border-radius: 9px; cursor: pointer; transition: background-color 300ms ease; }\n.sl-check:hover { background: #ffffff06; }\n.sl-check__input { position: absolute; width: 1px; height: 1px; margin: 0; opacity: 0; }\n.sl-check__box { position: relative; isolation: isolate; display: grid; place-items: center; flex: none; width: 28px; height: 28px; overflow: hidden; border: 1px solid #737b77; border-radius: 8px; background: #121414; box-shadow: inset 0 1px 2px #0004; transition: border-color 350ms ease, transform 260ms var(--check-ease); }\n.sl-check__box::before { content: \"\"; position: absolute; inset: -1px; z-index: -1; background: var(--check-paper); opacity: 0; transition: opacity 380ms ease, transform 520ms var(--check-ease); }\n.sl-check__box svg { display: block; width: 23px; height: 23px; stroke: var(--check-ink); stroke-width: 1.65; stroke-linecap: round; stroke-linejoin: round; }\n.sl-check__tick { stroke-dasharray: 1; stroke-dashoffset: 1; opacity: 0; transition: stroke-dashoffset 480ms var(--check-ease), opacity 240ms ease; }\n.sl-check__dash { opacity: 0; transition: opacity 220ms ease; }\n.sl-check__input:checked + .sl-check__box, .sl-check__input:indeterminate + .sl-check__box { border-color: var(--check-paper); }\n.sl-check__input:checked + .sl-check__box::before, .sl-check__input:indeterminate + .sl-check__box::before { opacity: 1; }\n.sl-check__input:checked + .sl-check__box .sl-check__tick { opacity: 1; stroke-dashoffset: 0; transition-delay: 70ms; }\n.sl-check__input:indeterminate + .sl-check__box .sl-check__tick { opacity: 0; }\n.sl-check__input:indeterminate + .sl-check__box .sl-check__dash { opacity: 1; }\n.sl-check__input:focus-visible + .sl-check__box { outline: 2px solid var(--check-paper); outline-offset: 4px; }\n.sl-check:active .sl-check__box { transform: scale(.94); }\n.sl-check:has(.sl-check__input:disabled) { opacity: .5; cursor: not-allowed; }\n.sl-check__copy { display: grid; gap: 4px; min-width: 0; }\n.sl-check__title { position: relative; width: fit-content; font-size: 15px; font-weight: 540; line-height: 20px; }\n.sl-check__hint { color: var(--check-muted); font-size: 12px; line-height: 17px; }\n/* Short, coordinated fill: no delayed second beat after the surface settles. */\n.sl-check--fill .sl-check__box { border-radius: 4px; transition: border-color 240ms ease, transform 220ms var(--check-ease); }\n.sl-check--fill .sl-check__box::before { transform: scale(.65); border-radius: 3px; transition: opacity 200ms ease, transform 280ms var(--check-ease); }\n.sl-check--fill .sl-check__tick { stroke-dashoffset: 0; transform: scale(.9); transform-origin: 12px 12px; transition: opacity 180ms ease, transform 260ms var(--check-ease); }\n.sl-check--fill .sl-check__input:checked + .sl-check__box::before { transform: scale(1); }\n.sl-check--fill .sl-check__input:checked + .sl-check__box .sl-check__tick { transform: scale(1); transition-delay: 20ms; }\n/* Circular checkbox, not a radio: selections remain independent. */\n.sl-check--outline .sl-check__box { width: 30px; height: 30px; border-radius: 50%; }\n.sl-check--outline .sl-check__box::before { border-radius: 50%; transform: scale(.65); transition: opacity 200ms ease, transform 280ms var(--check-ease); }\n.sl-check--outline .sl-check__input:checked + .sl-check__box::before { transform: scale(1); }\n.sl-check--outline .sl-check__tick { stroke-dashoffset: 0; transform: scale(.9); transform-origin: 12px 12px; transition: opacity 180ms ease, transform 260ms var(--check-ease); }\n.sl-check--outline .sl-check__input:checked + .sl-check__box .sl-check__tick { transform: scale(1); transition-delay: 20ms; }\n.sl-check--task .sl-check__title { transition: color 440ms ease; }\n.sl-check--task .sl-check__title::after { content: \"\"; position: absolute; left: 0; right: 0; top: 52%; height: 1px; background: #b8c0bb; transform: scaleX(0); transform-origin: left; transition: transform 600ms var(--check-ease); }\n.sl-check--task .sl-check__input:checked ~ .sl-check__copy .sl-check__title { color: #aeb5b2; }\n.sl-check--task .sl-check__input:checked ~ .sl-check__copy .sl-check__title::after { transform: scaleX(1); transition-delay: 90ms; }\n.sl-check-group__children { margin: 0 12px 5px; padding-top: 7px; border-top: 1px solid #ffffff12; }\n.sl-check-group__children .sl-check { min-height: 45px; padding: 7px 0; }\n.sl-check-group__children .sl-check__box { width: 24px; height: 24px; border-radius: 7px; }\n.sl-check-group__children .sl-check__box svg { width: 21px; height: 21px; }\n.sl-check-group__children .sl-check__title { font-size: 14px; font-weight: 450; }\n.visually-hidden { position: absolute; width: 1px; height: 1px; padding: 0; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }\n@media (max-width:420px) { .sl-check { gap: 12px; padding-inline: 10px; } .sl-check__title { font-size: 14px; } }\n@media (prefers-reduced-motion:reduce) { .sl-check-card *, .sl-check-card *::before, .sl-check-card *::after { transition: none !important; animation: none !important; } .sl-check:active .sl-check__box { transform: none; } }\n@media (forced-colors:active) {\n  .sl-check-card { color: CanvasText; background: Canvas; border-color: CanvasText; }\n  .sl-check__hint { color: CanvasText; }\n  .sl-check__box { forced-color-adjust: none; background: Canvas; border-color: CanvasText; }\n  .sl-check__box::before { background: Highlight; }\n  .sl-check__box svg { stroke: HighlightText; }\n  .sl-check--outline .sl-check__box svg { stroke: HighlightText; }\n  .sl-check--outline .sl-check__input:checked + .sl-check__box { border-color: Highlight; }\n  .sl-check__input:focus-visible + .sl-check__box { outline-color: Highlight; }\n}\n\n/* Only the twenty new studies; the original five keep their own motion. */\n.check-jumps { display: flex; flex-wrap: wrap; gap: 10px 22px; margin-top: 28px; }\n.check-jumps a { color: #b8bebb; font-size: 14px; text-decoration: none; border-bottom: 1px solid #626966; padding-block: 8px; }\n.check-jumps a:hover { color: #fff; }\n.check-jumps a:focus-visible { outline: 2px solid #ddd; outline-offset: 4px; }\n.check-section { grid-column: 1 / -1; padding-top: 26px; scroll-margin-top: 30px; }\n.check-section h2 { margin: 0 0 4px; font-size: 28px; letter-spacing: -.03em; }\n[data-variation] .toggle-heading h2 { font-size: 21px; }\n[data-variation] .sl-check__title { line-height: 1.4; }\n.sl-check--round .sl-check__box { border-radius: 50%; width: 30px; height: 30px; }\n.sl-check--sharp .sl-check__box { border-radius: 4px; }\n.mark-stroke { opacity: 0; stroke-dasharray: 1; stroke-dashoffset: 1; transition: stroke-dashoffset 360ms var(--check-ease), opacity 240ms ease; }\n.sl-check__input:checked + .sl-check__box .mark-stroke { opacity: 1; stroke-dashoffset: 0; }\n.sl-check--cross .stroke-two { transition-delay: 0ms; }\n.sl-check--cross .sl-check__input:checked + .sl-check__box .stroke-two { transition-delay: 75ms; }\n.sl-check--cross-turn .mark-stroke { stroke-dashoffset: 0; transform-origin: 12px 12px; transform: rotate(-35deg) scale(.7); transition: transform 400ms var(--check-ease), opacity 240ms ease; }\n.sl-check--cross-turn .sl-check__input:checked + .sl-check__box .mark-stroke { transform: rotate(0) scale(1); transition-delay: 0ms; }\n.sl-check--icon .sl-check__box { width: 36px; height: 36px; }\n.sl-check--icon .sl-check__box svg { stroke: #adb6b0; transition: stroke 320ms ease; }\n.sl-check--icon .sl-check__input:checked + .sl-check__box svg { stroke: var(--check-ink); }\n.mark-icon { transform-origin: 12px 12px; fill: transparent; transition: fill 360ms ease, transform 460ms var(--check-ease); }\n.sl-check--star .sl-check__input:checked + .sl-check__box .mark-icon { fill: var(--check-ink); transform: rotate(12deg) scale(.93); }\n.sl-check--heart .mark-icon { transform: scale(.88); }\n.sl-check--heart .sl-check__input:checked + .sl-check__box .mark-icon { fill: var(--check-ink); transform: scale(1); }\n.sl-check--bookmark .mark-icon { transform: translateY(-2px); }\n.sl-check--bookmark .sl-check__input:checked + .sl-check__box .mark-icon { transform: translateY(0); fill: var(--check-ink); }\n.sl-check--shield .sl-check__box::before { border-radius: 7px; transform: scale(.5); }\n.sl-check--shield .sl-check__input:checked + .sl-check__box::before { transform: scale(1); }\n.sl-check--shield .sl-check__input:checked + .sl-check__box .mark-stroke { transition-delay: 80ms; }\n.sl-check--pin .mark-icon { transform: translateY(-1px) rotate(-15deg); transform-origin: 12px 12px; }\n.sl-check--pin .sl-check__input:checked + .sl-check__box .mark-icon { transform: translateY(0) rotate(0); }\n.sl-check--bell .mark-icon { transform: rotate(-10deg); transform-origin: 12px 4px; }\n.sl-check--bell .sl-check__input:checked + .sl-check__box .mark-icon { transform: rotate(0); }\n.sl-check--bell .sl-check__input:checked + .sl-check__box .mark-stroke { transition-delay: 120ms; }\n.sl-check--ring .sl-check__box { border-color: #647069; }\n.sl-check--ring .sl-check__box::before, .sl-check--corner .sl-check__box::before { display: none; }\n.sl-check--ring .sl-check__box svg, .sl-check--corner .sl-check__box svg { stroke: var(--check-paper); }\n.check-ring { stroke-dasharray: 1; stroke-dashoffset: 1; transform: rotate(-90deg); transform-origin: 12px 12px; transition: stroke-dashoffset 520ms var(--check-ease); }\n.sl-check--ring .sl-check__input:checked + .sl-check__box .check-ring { stroke-dashoffset: 0; }\n.sl-check--ring .sl-check__input:checked + .sl-check__box { border-color: #647069; }\n.sl-check--corner .sl-check__box { overflow: visible; border: 0; background: transparent; box-shadow: none; }\n.check-corners { transform-origin: 12px 12px; transform: scale(1.08); opacity: .45; transition: transform 400ms var(--check-ease), opacity 320ms ease; }\n.sl-check--corner .sl-check__input:checked + .sl-check__box .check-corners { transform: scale(.9); opacity: 1; }\n\n.check-caption { margin: 12px 12px 14px; color: #c3cbc6; font-size: 13px; line-height: 1.4; }\n.check-chips { display: flex; flex-wrap: wrap; justify-content: center; gap: 8px; padding: 0 10px 12px; }\n.sl-check--chip { min-height: 40px; padding: 8px 28px; justify-content: center; gap: 0; background: #111313; border: 1px solid #525a55; border-radius: 30px; transition: background-color 320ms ease, border-color 320ms ease; }\n.sl-check--chip .sl-check__copy { transform: translateX(0); transition: transform 360ms var(--check-ease); }\n.sl-check--chip:has(:checked) .sl-check__copy { transform: translateX(12px); }\n.sl-check--chip .sl-check__title { font-size: 13px; }\n.sl-check--chip .sl-check__box { position: absolute; left: 16px; top: calc(50% - 9px); width: 18px; height: 18px; border: 0; background: transparent; box-shadow: none; opacity: 0; transition: opacity 180ms ease; }\n.sl-check--chip:has(:checked) .sl-check__box { opacity: 1; }\n.sl-check--chip .sl-check__box::before { display: none; }\n.sl-check--chip .sl-check__box svg { width: 18px; height: 18px; stroke: var(--check-paper); }\n.sl-check--chip:has(:checked) { background: #3b423d; border-color: #afb8b1; }\n.sl-check--chip .sl-check__tick { stroke-dashoffset: 1; transition: opacity 180ms ease, stroke-dashoffset 360ms var(--check-ease); }\n.sl-check--chip .sl-check__input:checked + .sl-check__box .sl-check__tick { stroke-dashoffset: 0; transition-delay: 70ms; }\n.sl-check--chip:has(:focus-visible) { outline: 2px solid var(--check-paper); outline-offset: 3px; }\n.sl-check--chip .sl-check__input:focus-visible + .sl-check__box { outline: none; }\n.check-days { display: grid; grid-template-columns: repeat(7,minmax(0,1fr)); gap: 3px; padding: 0 9px 12px; }\n.check-day { position: relative; min-width: 0; cursor: pointer; }\n.check-day > span { position: relative; display: grid; place-content: center; height: 44px; border: 1px solid #555e58; border-radius: 20px; color: #b6bfb9; font-size: 12px; transition: color 300ms ease, background-color 300ms ease, border-color 300ms ease; }\n.check-day i { position: absolute; bottom: 5px; left: calc(50% - 2px); width: 4px; height: 4px; background: #232724; border-radius: 50%; transform: scale(0); transition: transform 340ms var(--check-ease); }\n.check-day input:checked + span { background: var(--check-paper); color: var(--check-ink); border-color: var(--check-paper); }\n.check-day input:checked + span i { transform: scale(1); }\n.check-day input:focus-visible + span, .check-tile input:focus-visible + span, .check-swatch input:focus-visible + span { outline: 2px solid var(--check-paper); outline-offset: 3px; }\n.check-tiles { display: grid; grid-template-columns: repeat(2,minmax(0,1fr)); gap: 10px; padding: 8px; }\n.check-tile { position: relative; min-width: 0; cursor: pointer; }\n.check-tile__face { display: flex; min-height: 128px; flex-direction: column; align-items: center; justify-content: center; gap: 10px; border: 1px solid #626a65; border-radius: 10px; background: #161917; color: #b7c0b9; transition: border-color 340ms ease, background-color 340ms ease, color 340ms ease; font-size: 12px; }\n.tile-art { width: 29px; height: 29px; transition: transform 420ms var(--check-ease); }\n.check-tile svg, .row-art { stroke: currentColor; stroke-width: 1.4; stroke-linecap: round; stroke-linejoin: round; }\n.tile-check { position: absolute; width: 17px; height: 17px; right: 8px; top: 8px; }\n.check-tile input:checked + span { border-color: #c2cbc5; background: #363d38; color: #f1f4f2; }\n.check-tile input:checked + span .tile-art { transform: translateY(-2px); }\n.check-tile input:checked + span .sl-check__tick { stroke-dashoffset: 0; opacity: 1; }\n.check-swatches { display: grid; grid-template-columns: repeat(3,minmax(0,1fr)); gap: 10px; padding: 0 10px 12px; }\n.check-swatch { position: relative; display: grid; justify-items: center; gap: 9px; cursor: pointer; }\n.swatch-face { position: relative; display: grid; place-content: center; width: 60px; height: 60px; border: 1px solid #707a73; border-radius: 50%; box-shadow: 0 0 0 3px transparent; transition: box-shadow 350ms ease, border-color 350ms ease; }\n.texture-0 { background: #414944; }\n.texture-1 { background: repeating-linear-gradient(45deg,#2b312d 0 4px,#535e56 4px 5px); }\n.texture-2 { background: radial-gradient(#748078 1px,transparent 1.5px) 0 0 / 7px 7px,#2d342f; }\n.swatch-face svg { width: 24px; height: 24px; stroke: #202222; stroke-width: 1.6; stroke-linecap: round; stroke-linejoin: round; background: #f0f3f1; border-radius: 50%; opacity: 0; transform: scale(.65); transition: transform 380ms var(--check-ease), opacity 240ms ease; }\n.check-swatch input:checked + span { border-color: #e2e8e4; box-shadow: 0 0 0 3px #77867c; }\n.check-swatch input:checked + span svg { opacity: 1; transform: scale(1); }\n.check-swatch input:checked + span .sl-check__tick { stroke-dashoffset: 0; opacity: 1; }\n.swatch-label { font-size: 12px; color: #bcc5bf; }\n\n.check-list .sl-check { min-height: 52px; padding: 10px 12px; gap: 12px; }\n.check-list .sl-check__title { font-size: 13px; }\n.check-list .sl-check__box { width: 24px; height: 24px; }\n.check-list .sl-check__box svg { width: 20px; height: 20px; }\n.check-list .sl-check + .sl-check { border-top: 1px solid #ffffff0a; }\n.check-exclusions .sl-check__title { transition: opacity 300ms ease; }\n.check-exclusions .sl-check:has(:checked) .sl-check__title { opacity: .55; text-decoration: line-through; text-decoration-thickness: 1px; }\n.sl-check--right .sl-check__box { order: 3; margin-left: auto; }\n.sl-check--right .sl-check__copy { flex: 1; }\n.row-art { width: 22px; height: 22px; color: #bcc5bf; flex: none; }\n.check-filelist .sl-check:has(:checked) { background: #373e38; }\n.check-filelist .sl-check { transition: background-color 400ms ease; }\n.check-table-head { display: flex; justify-content: space-between; margin: 10px 12px 6px 48px; color: #a3ada6; font-size: 11px; }\n.check-table .sl-check { border-radius: 0; min-height: 45px; }\n.check-table .sl-check__copy { display: flex; flex: 1; align-items: center; justify-content: space-between; gap: 8px; }\n.check-table .sl-check__hint { font-size: 11px; }\n.check-table .sl-check:has(:checked) { background: #303832; }\n.check-tree { margin: 0 8px 10px 23px; border-left: 1px solid #546159; padding-left: 10px; }\n.check-tree .sl-check { position: relative; min-height: 43px; border: 0; padding-right: 4px; }\n.check-tree .sl-check::before { content: \"\"; position: absolute; left: -10px; width: 12px; height: 1px; background: #546159; }\n.check-nested > .sl-check { min-height: 65px; }\n@media (max-width:420px) {\n  .swatch-face { width: 49px; height: 49px; }\n  .check-swatches { gap: 7px; padding-inline: 6px; }\n  .check-list .sl-check { padding-inline: 8px; gap: 9px; }\n  .check-list .sl-check__title { font-size: 12px; }\n  .check-days { padding-inline: 4px; }\n}\n@media (prefers-reduced-motion: reduce) {\n  .sl-check-card *, .sl-check-card *::before, .sl-check-card *::after { animation: none !important; transition: none !important; }\n}\n@media (forced-colors:active) {\n  .sl-check--icon .sl-check__box svg { stroke: CanvasText; }\n  .sl-check--icon .sl-check__input:checked + .sl-check__box svg { stroke: HighlightText; }\n  .sl-check--icon .sl-check__input:checked + .sl-check__box .mark-icon { fill: transparent; }\n  .sl-check--ring .sl-check__box svg, .sl-check--corner .sl-check__box svg, .sl-check--chip .sl-check__box svg { stroke: CanvasText; }\n  .check-day > span, .check-tile__face, .swatch-face { forced-color-adjust: none; color: CanvasText; background: Canvas; border-color: CanvasText; }\n  .check-day input:checked + span, .check-tile input:checked + span, .check-swatch input:checked + span { background: Highlight; color: HighlightText; border-color: HighlightText; }\n  .check-day input:checked + span i { background: HighlightText; }\n}\n";
const api22 = (() => {
const mounted = new WeakMap();

function mountCheckboxes(root, { onChange } = {}) {
  if (mounted.has(root)) return mounted.get(root);
  if (onChange !== undefined && typeof onChange !== 'function') throw new TypeError('onChange must be a function.');
  const inputs = [...root.querySelectorAll('input[type="checkbox"]')];
  if (!inputs.length) throw new TypeError('Native checkboxes are required.');
  const parent = root.querySelector('[data-parent]');
  const children = [...root.querySelectorAll('[data-child]')];
  const lifecycle = new AbortController();
  let destroyed = false;
  const values = () => inputs.filter(input => input !== parent && input.checked).map(input => input.name);
  function syncParent() {
    if (!parent || !children.length) return;
    const count = children.filter(input => input.checked).length;
    parent.checked = count === children.length;
    parent.indeterminate = count > 0 && count < children.length;
  }
  function change(event) {
    if (!inputs.includes(event.target)) return;
    if (event.target === parent) for (const child of children) { if (!child.disabled) child.checked = parent.checked; }
    syncParent();
    onChange?.(values());
    root.dispatchEvent(new CustomEvent('selectionchange', { bubbles: true, detail: { values: values() } }));
  }
  const reset = () => {
    if (destroyed) return;
    for (const input of inputs) input.checked = input.defaultChecked;
    syncParent();
  };
  root.addEventListener('change', change, { signal: lifecycle.signal });
  const form = inputs[0].form;
  form?.addEventListener('reset', () => queueMicrotask(reset), { signal: lifecycle.signal });
  syncParent();
  const controller = { reset, get values() { return values(); }, destroy() { destroyed = true; lifecycle.abort(); mounted.delete(root); } };
  mounted.set(root, controller);
  return controller;
}

return { mount: mountCheckboxes };
})();

const style16 = "\n.sl-slider {\n  --slider-ink: #202222; --slider-light: #eef0ee; --slider-muted: #aeb5b2;\n  --slider-ease: cubic-bezier(.22,.61,.36,1); --low: 0%; --high: 50%;\n  width: min(320px,100%); min-width: 0; margin: 0; padding: 20px;\n  border: 1px solid #ffffff0b; border-radius: 14px;\n  background: var(--slider-ink); color: var(--slider-light);\n  box-shadow: inset 0 1px #ffffff0d,0 2px 5px #00000010;\n  font-family: 'Instrument Sans',sans-serif; text-align: left;\n}\n.sl-slider, .sl-slider * { box-sizing: border-box; }\n.slider-header { display: flex; justify-content: space-between; align-items: center; gap: 12px; min-height: 26px; font-size: 14px; }\n.slider-header label { display: flex; align-items: center; gap: 10px; cursor: pointer; }\n.slider-header svg { width: 24px; height: 24px; flex: none; stroke: currentColor; stroke-width: 1.4; stroke-linecap: round; stroke-linejoin: round; }\n.slider-header output { font-size: 13px; font-variant-numeric: tabular-nums; white-space: nowrap; color: #c7d0ca; }\n.slider-track { position: relative; height: 46px; margin-top: 18px; }\n.slider-rail { position: absolute; left: 12px; right: 12px; height: 4px; top: 21px; background: #59615c; border-radius: 3px; pointer-events: none; }\n.slider-fill { position: absolute; top: 0; bottom: 0; left: var(--low); right: calc(100% - var(--high)); border-radius: inherit; background: var(--slider-light); }\n.slider-input { position: absolute; inset: 0; margin: 0; width: 100%; height: 46px; appearance: none; -webkit-appearance: none; border: 0; background: transparent; cursor: pointer; touch-action: pan-y; }\n.slider-input::-webkit-slider-runnable-track { height: 4px; background: transparent; border: 0; }\n.slider-input::-webkit-slider-thumb { appearance: none; -webkit-appearance: none; width: 24px; height: 24px; margin-top: -10px; border: 1px solid #fcfdfc; border-radius: 8px; background: var(--slider-light); box-shadow: 0 2px 5px #0007; transition: box-shadow 220ms ease, border-radius 280ms var(--slider-ease); }\n.slider-input::-moz-range-track { height: 4px; background: transparent; border: 0; }\n.slider-input::-moz-range-thumb { width: 22px; height: 22px; border: 1px solid #fcfdfc; border-radius: 8px; background: var(--slider-light); box-shadow: 0 2px 5px #0007; transition: box-shadow 220ms ease; }\n.slider-input:active::-webkit-slider-thumb { box-shadow: 0 0 0 5px #f0f4f019,0 2px 5px #0007; border-radius: 7px; }\n.slider-input:active::-moz-range-thumb { box-shadow: 0 0 0 5px #f0f4f019,0 2px 5px #0007; }\n.slider-input:focus-visible { outline: 1px solid #cbd5ce; outline-offset: 3px; border-radius: 8px; }\n.slider-input:disabled { cursor: not-allowed; opacity: .5; }\n.slider-ends { display: flex; justify-content: space-between; padding-inline: 8px; color: var(--slider-muted); font-size: 11px; }\n.sl-slider--volume .slider-header svg { width: 28px; height: 28px; }\n.volume-wave { stroke-dasharray: 1; transform-origin: 12px 12px; transition: opacity 180ms ease, stroke-dashoffset 200ms var(--slider-ease), transform 200ms var(--slider-ease); }\n.volume-wave.one { opacity: var(--wave-one,1); stroke-dashoffset: calc(1 - var(--wave-one,1)); transform: scaleX(calc(.85 + var(--wave-one,1) * .15)); }\n.volume-wave.two { opacity: var(--wave-two,.7); stroke-dashoffset: calc(1 - var(--wave-two,.7)); transform: scaleX(calc(.85 + var(--wave-two,.7) * .15)); }\n.volume-mute { opacity: 0; stroke-dasharray: 1; stroke-dashoffset: 1; transition: opacity 180ms ease, stroke-dashoffset 300ms var(--slider-ease); }\n.sl-slider--volume[data-zero=\"true\"] .volume-mute { opacity: 1; stroke-dashoffset: 0; }\n.sun-rays { transform-origin: 12px 12px; transform: rotate(var(--sun-angle,0deg)); opacity: var(--sun-opacity,.7); transition: transform 100ms linear, opacity 100ms linear; }\n.sl-slider--brightness .slider-input::-webkit-slider-thumb { border-radius: 50%; }\n.sl-slider--brightness .slider-input::-moz-range-thumb { border-radius: 50%; }\n.slider-step-labels { display: flex; justify-content: space-between; color: var(--slider-muted); font-size: 10px; }\n.slider-step-labels span { position: relative; transition: color 220ms ease; }\n.slider-step-labels span::before { content: \"\"; display: block; width: 3px; height: 5px; background: #79857c; border-radius: 2px; margin: 0 auto 6px; transition: background-color 220ms ease; }\n.slider-step-labels span.is-current { color: #f1f4f2; }\n.slider-step-labels span.is-current::before { background: #f1f4f2; }\n.sl-slider--steps .slider-header { gap: 6px; }\n.sl-slider--steps output { font-size: 12px; }\n.slider-track--dual { touch-action: none; cursor: pointer; }\n.slider-track--dual .slider-input { pointer-events: none; }\n.slider-track--dual .slider-input::-webkit-slider-thumb { pointer-events: auto; }\n.slider-track--dual .slider-input::-moz-range-thumb { pointer-events: auto; }\n.slider-track--dual .slider-input:focus { z-index: 2; }\n.sl-slider--vertical { width: 178px; }\n.sl-slider--vertical .slider-header { font-size: 13px; gap: 6px; }\n.slider-vertical-body { display: flex; justify-content: center; gap: 18px; margin-top: 12px; }\n.sl-slider--vertical .slider-track { width: 46px; height: 172px; margin-top: 0; }\n.sl-slider--vertical .slider-rail { top: 12px; bottom: 12px; height: auto; left: 21px; width: 4px; }\n.sl-slider--vertical .slider-fill { left: 0; right: 0; top: calc(100% - var(--high)); bottom: 0; }\n.sl-slider--vertical .slider-input { writing-mode: vertical-lr; direction: rtl; width: 46px; height: 172px; touch-action: pan-x; }\n.sl-slider--vertical .slider-input::-webkit-slider-runnable-track { width: 4px; height: 100%; }\n.sl-slider--vertical .slider-input::-webkit-slider-thumb { margin-top: 0; margin-left: -10px; }\n.sl-slider--vertical .slider-input::-moz-range-track { width: 4px; height: 100%; }\n.slider-scale { display: flex; flex-direction: column; justify-content: space-between; padding-block: 4px; color: #c7d0ca; font-size: 14px; line-height: 16px; font-variant-numeric: tabular-nums; }\n.sl-slider--vertical .slider-header output { font-size: 14px; }\n.slider-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }\n@media(max-width:420px) { .sl-slider { padding: 16px; } .slider-header { font-size: 13px; } .slider-step-labels { font-size: 9px; } }\n@media(prefers-reduced-motion:reduce) { .sl-slider * { transition: none !important; } .slider-input::-webkit-slider-thumb { transition: none !important; } .slider-input::-moz-range-thumb { transition: none !important; } }\n@media(forced-colors:active) { .sl-slider { border-color: CanvasText; } .slider-rail { background: GrayText; } .slider-fill { background: Highlight; } .slider-input { forced-color-adjust: none; } .slider-input::-webkit-slider-thumb { background: Highlight; border-color: Canvas; } .slider-input::-moz-range-thumb { background: Highlight; border-color: Canvas; } }\n";
const api23 = (() => {
const mounted = new WeakMap();
function mountSlider(root, { onChange, formatValue } = {}) {
  if (mounted.has(root)) return mounted.get(root);
  if (onChange !== undefined && typeof onChange !== 'function') throw new TypeError('onChange must be a function.');
  if (formatValue !== undefined && typeof formatValue !== 'function') throw new TypeError('formatValue must be a function.');
  const inputs = [...root.querySelectorAll('input[type="range"]')];
  const output = root.querySelector('[data-output]');
  if (!inputs.length || !output) throw new TypeError('A native range and output are required.');
  const lifecycle = new AbortController();
  const view = root.ownerDocument.defaultView;
  const dual = inputs.length === 2;
  const labels = root.dataset.labels?.split(',');
  const format = value => formatValue ? String(formatValue(value)) : dual ? '$' + value : value + '%';
  const track = root.querySelector('.slider-track');
  let dragging = null, destroyed = false;
  const values = () => inputs.map(input => input.valueAsNumber);
  const percent = input => (input.valueAsNumber - Number(input.min)) / (Number(input.max) - Number(input.min)) * 100;
  function render(changed, emit = false) {
    if (destroyed) return;
    if (dual) {
      if (inputs[0].valueAsNumber > inputs[1].valueAsNumber) {
        if (changed === inputs[0]) inputs[0].value = inputs[1].value;
        else inputs[1].value = inputs[0].value;
      }
      root.style.setProperty('--low', percent(inputs[0]) + '%');
      root.style.setProperty('--high', percent(inputs[1]) + '%');
      inputs[0].setAttribute('aria-valuemax', inputs[1].value);
      inputs[1].setAttribute('aria-valuemin', inputs[0].value);
      for (const input of inputs) input.setAttribute('aria-valuetext', format(input.valueAsNumber));
      output.textContent = format(inputs[0].valueAsNumber) + ' – ' + format(inputs[1].valueAsNumber);
    } else {
      const p = percent(inputs[0]);
      root.style.setProperty('--high', p + '%');
      root.style.setProperty('--position', p + '%');
      if (root.hasAttribute('data-centered')) {
        const center = (0 - Number(inputs[0].min)) / (Number(inputs[0].max) - Number(inputs[0].min)) * 100;
        root.style.setProperty('--low', Math.min(p, center) + '%');
        root.style.setProperty('--high', Math.max(p, center) + '%');
      }
      root.style.setProperty('--sun-angle', (p * .9) + 'deg');
      root.style.setProperty('--sun-opacity', String(.25 + p * .0075));
      root.dataset.zero = String(p === 0);
      root.dataset.quiet = String(p <= 50);
      if (root.dataset.slider === 'volume') {
        // Only the emblem eases; the thumb and filled track always follow input.
        root.style.setProperty('--wave-one', String(Math.min(1, p / 35)));
        root.style.setProperty('--wave-two', String(Math.max(0, Math.min(1, (p - 20) / 80))));
      }
      output.textContent = labels ? labels[inputs[0].valueAsNumber] : format(inputs[0].valueAsNumber);
      inputs[0].setAttribute('aria-valuetext', output.textContent);
      for (const marker of root.querySelectorAll('[data-step]')) marker.classList.toggle('is-current', Number(marker.dataset.step) === inputs[0].valueAsNumber);
    }
    if (emit) {
      onChange?.(values());
      root.dispatchEvent(new view.CustomEvent('sliderchange', { bubbles: true, detail: { values: values() } }));
    }
  }
  root.addEventListener('input', event => { if (inputs.includes(event.target)) render(event.target, true); }, { signal: lifecycle.signal });
  // In the dual control, native thumbs drag normally. Empty-track dragging uses
  // the nearest thumb, with pointer capture, while both inputs remain focusable.
  if (dual) {
    const updatePointer = event => {
      const rect = track.getBoundingClientRect();
      const ratio = Math.max(0, Math.min(1, (event.clientX - rect.left - 12) / (rect.width - 24)));
      const min = Number(dragging.min), max = Number(dragging.max), step = Number(dragging.step) || 1;
      dragging.value = String(min + Math.round(ratio * (max - min) / step) * step);
      dragging.dispatchEvent(new view.Event('input', { bubbles: true }));
    };
    track.addEventListener('pointerdown', event => {
      if (event.button !== 0 || inputs.includes(event.target) || dragging) return;
      const candidates = inputs.filter(input => !input.disabled);
      if (!candidates.length) return;
      const rect = track.getBoundingClientRect();
      const p = (event.clientX - rect.left - 12) / (rect.width - 24) * 100;
      dragging = candidates.reduce((nearest, input) => Math.abs(percent(input)-p) < Math.abs(percent(nearest)-p) ? input : nearest);
      dragging.focus({ preventScroll: true });
      track.setPointerCapture(event.pointerId);
      updatePointer(event);
      event.preventDefault();
    }, { signal: lifecycle.signal });
    track.addEventListener('pointermove', event => { if (dragging && track.hasPointerCapture(event.pointerId)) updatePointer(event); }, { signal: lifecycle.signal });
    const finish = () => { const input = dragging; dragging = null; input?.dispatchEvent(new view.Event('change', { bubbles: true })); };
    track.addEventListener('pointerup', finish, { signal: lifecycle.signal });
    track.addEventListener('pointercancel', finish, { signal: lifecycle.signal });
    track.addEventListener('lostpointercapture', finish, { signal: lifecycle.signal });
  }
  function reset() {
    if (destroyed) return;
    inputs.forEach(input => { input.value = input.defaultValue; });
    render();
  }
  inputs[0].form?.addEventListener('reset', () => queueMicrotask(reset), { signal: lifecycle.signal });
  // History restoration can replace native values after module initialization.
  // Reconcile the visual state without emitting a user change or resetting it.
  view.addEventListener('pageshow', () => render(), { signal: lifecycle.signal });
  render();
  const controller = { reset, get values() { return values(); }, destroy() { destroyed = true; dragging = null; lifecycle.abort(); mounted.delete(root); } };
  mounted.set(root, controller);
  return controller;
}

return { mount: mountSlider };
})();

const style17 = "\n.sl-slider {\n  --slider-ink: #202222; --slider-light: #eef0ee; --slider-muted: #aeb5b2;\n  --slider-ease: cubic-bezier(.22,.61,.36,1); --low: 0%; --high: 50%;\n  width: min(320px,100%); min-width: 0; margin: 0; padding: 20px;\n  border: 1px solid #ffffff0b; border-radius: 14px;\n  background: var(--slider-ink); color: var(--slider-light);\n  box-shadow: inset 0 1px #ffffff0d,0 2px 5px #00000010;\n  font-family: 'Instrument Sans',sans-serif; text-align: left;\n}\n.sl-slider, .sl-slider * { box-sizing: border-box; }\n.slider-header { display: flex; justify-content: space-between; align-items: center; gap: 12px; min-height: 26px; font-size: 14px; }\n.slider-header label { display: flex; align-items: center; gap: 10px; cursor: pointer; }\n.slider-header svg { width: 24px; height: 24px; flex: none; stroke: currentColor; stroke-width: 1.4; stroke-linecap: round; stroke-linejoin: round; }\n.slider-header output { font-size: 13px; font-variant-numeric: tabular-nums; white-space: nowrap; color: #c7d0ca; }\n.slider-track { position: relative; height: 46px; margin-top: 18px; }\n.slider-rail { position: absolute; left: 12px; right: 12px; height: 4px; top: 21px; background: #59615c; border-radius: 3px; pointer-events: none; }\n.slider-fill { position: absolute; top: 0; bottom: 0; left: var(--low); right: calc(100% - var(--high)); border-radius: inherit; background: var(--slider-light); }\n.slider-input { position: absolute; inset: 0; margin: 0; width: 100%; height: 46px; appearance: none; -webkit-appearance: none; border: 0; background: transparent; cursor: pointer; touch-action: pan-y; }\n.slider-input::-webkit-slider-runnable-track { height: 4px; background: transparent; border: 0; }\n.slider-input::-webkit-slider-thumb { appearance: none; -webkit-appearance: none; width: 24px; height: 24px; margin-top: -10px; border: 1px solid #fcfdfc; border-radius: 8px; background: var(--slider-light); box-shadow: 0 2px 5px #0007; transition: box-shadow 220ms ease, border-radius 280ms var(--slider-ease); }\n.slider-input::-moz-range-track { height: 4px; background: transparent; border: 0; }\n.slider-input::-moz-range-thumb { width: 22px; height: 22px; border: 1px solid #fcfdfc; border-radius: 8px; background: var(--slider-light); box-shadow: 0 2px 5px #0007; transition: box-shadow 220ms ease; }\n.slider-input:active::-webkit-slider-thumb { box-shadow: 0 0 0 5px #f0f4f019,0 2px 5px #0007; border-radius: 7px; }\n.slider-input:active::-moz-range-thumb { box-shadow: 0 0 0 5px #f0f4f019,0 2px 5px #0007; }\n.slider-input:focus-visible { outline: 1px solid #cbd5ce; outline-offset: 3px; border-radius: 8px; }\n.slider-input:disabled { cursor: not-allowed; opacity: .5; }\n.slider-ends { display: flex; justify-content: space-between; padding-inline: 8px; color: var(--slider-muted); font-size: 11px; }\n.sl-slider--volume .slider-header svg { width: 28px; height: 28px; }\n.volume-wave { stroke-dasharray: 1; transform-origin: 12px 12px; transition: opacity 180ms ease, stroke-dashoffset 200ms var(--slider-ease), transform 200ms var(--slider-ease); }\n.volume-wave.one { opacity: var(--wave-one,1); stroke-dashoffset: calc(1 - var(--wave-one,1)); transform: scaleX(calc(.85 + var(--wave-one,1) * .15)); }\n.volume-wave.two { opacity: var(--wave-two,.7); stroke-dashoffset: calc(1 - var(--wave-two,.7)); transform: scaleX(calc(.85 + var(--wave-two,.7) * .15)); }\n.volume-mute { opacity: 0; stroke-dasharray: 1; stroke-dashoffset: 1; transition: opacity 180ms ease, stroke-dashoffset 300ms var(--slider-ease); }\n.sl-slider--volume[data-zero=\"true\"] .volume-mute { opacity: 1; stroke-dashoffset: 0; }\n.sun-rays { transform-origin: 12px 12px; transform: rotate(var(--sun-angle,0deg)); opacity: var(--sun-opacity,.7); transition: transform 100ms linear, opacity 100ms linear; }\n.sl-slider--brightness .slider-input::-webkit-slider-thumb { border-radius: 50%; }\n.sl-slider--brightness .slider-input::-moz-range-thumb { border-radius: 50%; }\n.slider-step-labels { display: flex; justify-content: space-between; color: var(--slider-muted); font-size: 10px; }\n.slider-step-labels span { position: relative; transition: color 220ms ease; }\n.slider-step-labels span::before { content: \"\"; display: block; width: 3px; height: 5px; background: #79857c; border-radius: 2px; margin: 0 auto 6px; transition: background-color 220ms ease; }\n.slider-step-labels span.is-current { color: #f1f4f2; }\n.slider-step-labels span.is-current::before { background: #f1f4f2; }\n.sl-slider--steps .slider-header { gap: 6px; }\n.sl-slider--steps output { font-size: 12px; }\n.slider-track--dual { touch-action: none; cursor: pointer; }\n.slider-track--dual .slider-input { pointer-events: none; }\n.slider-track--dual .slider-input::-webkit-slider-thumb { pointer-events: auto; }\n.slider-track--dual .slider-input::-moz-range-thumb { pointer-events: auto; }\n.slider-track--dual .slider-input:focus { z-index: 2; }\n.sl-slider--vertical { width: 178px; }\n.sl-slider--vertical .slider-header { font-size: 13px; gap: 6px; }\n.slider-vertical-body { display: flex; justify-content: center; gap: 18px; margin-top: 12px; }\n.sl-slider--vertical .slider-track { width: 46px; height: 172px; margin-top: 0; }\n.sl-slider--vertical .slider-rail { top: 12px; bottom: 12px; height: auto; left: 21px; width: 4px; }\n.sl-slider--vertical .slider-fill { left: 0; right: 0; top: calc(100% - var(--high)); bottom: 0; }\n.sl-slider--vertical .slider-input { writing-mode: vertical-lr; direction: rtl; width: 46px; height: 172px; touch-action: pan-x; }\n.sl-slider--vertical .slider-input::-webkit-slider-runnable-track { width: 4px; height: 100%; }\n.sl-slider--vertical .slider-input::-webkit-slider-thumb { margin-top: 0; margin-left: -10px; }\n.sl-slider--vertical .slider-input::-moz-range-track { width: 4px; height: 100%; }\n.slider-scale { display: flex; flex-direction: column; justify-content: space-between; padding-block: 4px; color: #c7d0ca; font-size: 14px; line-height: 16px; font-variant-numeric: tabular-nums; }\n.sl-slider--vertical .slider-header output { font-size: 14px; }\n.slider-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }\n@media(max-width:420px) { .sl-slider { padding: 16px; } .slider-header { font-size: 13px; } .slider-step-labels { font-size: 9px; } }\n@media(prefers-reduced-motion:reduce) { .sl-slider * { transition: none !important; } .slider-input::-webkit-slider-thumb { transition: none !important; } .slider-input::-moz-range-thumb { transition: none !important; } }\n@media(forced-colors:active) { .sl-slider { border-color: CanvasText; } .slider-rail { background: GrayText; } .slider-fill { background: Highlight; } .slider-input { forced-color-adjust: none; } .slider-input::-webkit-slider-thumb { background: Highlight; border-color: Canvas; } .slider-input::-moz-range-thumb { background: Highlight; border-color: Canvas; } }\n\n/* Additional studies. Base slider mechanics are shared with the approved set. */\n[data-study] .toggle-heading h2 { font-size: 21px; }\n.slider-scrub .slider-track { height: 70px; margin-top: 18px; }\n.slider-scrub .slider-input { height: 70px; }\n.slider-scrub .slider-input::-webkit-slider-thumb { width: 4px; height: 52px; margin-top: -24px; border-radius: 2px; }\n.slider-scrub .slider-input::-moz-range-thumb { width: 2px; height: 50px; border-radius: 2px; }\n.slider-scrub .slider-input::-webkit-slider-thumb { background: transparent; border-color: transparent; box-shadow: none; }\n.slider-scrub .slider-input::-moz-range-thumb { background: transparent; border-color: transparent; box-shadow: none; }\n.slider-scrub .slider-input:active::-webkit-slider-thumb { box-shadow: none; }\n.slider-scrub .slider-input:active::-moz-range-thumb { box-shadow: none; }\n.scrub-playhead { position: absolute; inset: 0; pointer-events: none; transform: translateX(calc(var(--fraction,0) * (100% - 4px))); }\n.scrub-playhead::before { content: \"\"; position: absolute; left: 0; top: 9px; width: 4px; height: 52px; border-radius: 2px; background: var(--slider-light); }\n.slider-scrub[data-playing=\"true\"] .scrub-playhead { will-change: transform; }\n.slider-scrub .slider-rail { display: none; }\n.scrub-art { position: absolute; inset: 8px 2px; display: flex; align-items: center; gap: 3px; pointer-events: none; }\n.scrub-art span { flex: 1; min-width: 0; height: var(--bar); border-radius: 8px; background: #555959; transition: background-color 220ms ease; }\n.scrub-art span.is-played { background: #d9dfdc; }\n.scrub-footer { display: flex; align-items: center; justify-content: space-between; margin-top: 10px; color: var(--slider-muted); font-size: 12px; font-variant-numeric: tabular-nums; }\n.scrub-caption { color: #979f9c; }\n.scrub-play { display: flex; align-items: center; justify-content: center; gap: 7px; min-width: 86px; min-height: 36px; padding: 6px 12px; border: 1px solid #ffffff14; border-radius: 18px; background: #303333; color: #eef0ee; font: inherit; cursor: pointer; transition: background-color 220ms ease, transform 220ms var(--slider-ease); }\n.scrub-play svg { width: 18px; height: 18px; overflow: visible; }\n.play-symbol { fill: currentColor; stroke: currentColor; stroke-linejoin: round; transition: opacity 160ms ease; }\n.pause-symbol { fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; opacity: 0; transition: opacity 160ms ease; }\n[data-playing=\"true\"] .play-symbol { opacity: 0; }\n[data-playing=\"true\"] .pause-symbol { opacity: 1; }\n.scrub-play:hover { background: #3b3e3e; }\n.scrub-play:active { transform: scale(.97); }\n.scrub-play:focus-visible, .rating-choice:focus-visible, .speed-stops button:focus-visible { outline: 2px solid #dce1de; outline-offset: 3px; }\n.speed-stops { display: flex; justify-content: space-between; gap: 4px; color: #aeb8b1; font-size: 12px; }\n.speed-stops button { flex: 1; min-width: 0; }\n.speed-stops button { min-height: 36px; padding: 5px 7px; border: 0; font: inherit; color: inherit; background: transparent; cursor: pointer; border-radius: 10px; transition: background-color 240ms ease, color 240ms ease; }\n.speed-stops button.is-current { background: #dbe3dd; color: #202222; }\n.slider-speed .slider-input::-webkit-slider-thumb { border-radius: 8px; }\n.slider-speed .slider-input::-moz-range-thumb { border-radius: 8px; }\n.zoom-preview { display: grid; place-items: center; height: 112px; margin-top: 15px; overflow: hidden; background: #171a19; border-radius: 10px; }\n.zoom-frame { position: relative; display: grid; place-items: center; width: 48px; height: 48px; transform: scale(var(--zoom,1)); border: 1px solid #707a74; border-radius: 50%; background: #ffffff03; transition: transform 120ms var(--slider-ease); }\n.zoom-frame::before { content: \"\"; position: absolute; inset: 8px; border: 1px solid #a9b5ad; border-radius: 50%; }\n.zoom-frame::after { content: \"\"; width: 12px; height: 12px; border-radius: 50%; background: #dce5df; }\n.temperature-meter { position: relative; height: 12px; margin: 26px 6px 10px 8px; border: 0; border-radius: 12px; background: #424847; box-shadow: inset 0 1px 2px #0003; }\n.temperature-meter span { position: absolute; inset: 3px 4px; transform: scaleX(var(--fraction,.6)); transform-origin: left; border-radius: inherit; background: #dce5df; transition: transform 200ms var(--slider-ease); }\n.temperature-meter i { position: absolute; width: 22px; height: 22px; border: 5px solid #424847; background: #dce5df; border-radius: 50%; left: -6px; top: -5px; }\n.slider-temperature .slider-input::-webkit-slider-thumb { border-radius: 50%; }\n.slider-temperature .slider-input::-moz-range-thumb { border-radius: 50%; }\n.slider-bipolar .slider-rail::after { content: \"\"; position: absolute; top: -5px; left: 50%; height: 14px; width: 1px; background: #aeb8b1; }\n.balance-symbol { display: flex; align-items: center; justify-content: center; gap: 12px; margin-top: 24px; color: #bfcac2; font-size: 12px; }\n.balance-symbol i { position: relative; width: 92px; height: 4px; background: #69786e; border-radius: 6px; }\n.balance-symbol i::after { content: \"\"; position: absolute; width: 16px; height: 16px; border: 1px solid #e7ece9; background: #303931; border-radius: 50%; top: -6px; left: calc(var(--fraction,.5) * 76px); transition: left 200ms var(--slider-ease); }\n.exposure-scale, .hour-marks { display: flex; justify-content: space-between; color: #b5bfb8; font-size: 11px; }\n.exposure-scale { border-top: 8px solid transparent; border-image: repeating-linear-gradient(90deg,#849087 0 1px,transparent 1px 8px) 8; padding-top: 6px; }\n.slider-exposure .slider-input::-webkit-slider-thumb { width: 12px; border-radius: 6px; }\n.slider-exposure .slider-input::-moz-range-thumb { width: 10px; border-radius: 6px; }\n.slider-exposure .slider-rail { left: 6px; right: 6px; }\n.slider-segments .slider-rail { height: 12px; top: 17px; border-radius: 2px; }\n.slider-segments .slider-rail::after { content: \"\"; position: absolute; inset: 0; background: repeating-linear-gradient(90deg,transparent 0 calc(10% - 3px),#202222 calc(10% - 3px) 10%); }\n.slider-segments .slider-input::-webkit-slider-thumb { border-radius: 8px; height: 28px; margin-top: -12px; }\n.slider-segments .slider-input::-moz-range-thumb { border-radius: 8px; height: 26px; }\n.rating-stars { display: flex; justify-content: space-between; gap: 2px; margin-top: 18px; }\n.rating-choice { display: grid; place-items: center; flex: 1; min-width: 0; min-height: 44px; padding: 4px; background: transparent; color: inherit; border: 0; border-radius: 12px; cursor: pointer; transition: background-color 220ms ease; }\n.rating-choice:hover { background: #ffffff08; }\n.rating-choice:hover .rating-star { transform: translateY(-2px); }\n.rating-choice:active .rating-star { transform: scale(.94); }\n.rating-star { width: 28px; height: 28px; stroke: #a9b4ac; stroke-width: 1.2; stroke-linejoin: round; fill: none; transition: transform 220ms var(--slider-ease); }\n.star-solid { fill: #e4ebe6; stroke: #e4ebe6; clip-path: inset(0 calc(90% - var(--star-fill,0) * 80%) 0 0); }\n.sl-slider .slider-input:focus-visible { outline-offset: -2px; }\n.slider-rating .slider-input::-webkit-slider-thumb { border-radius: 50%; }\n.slider-rating .slider-input::-moz-range-thumb { border-radius: 50%; }\n.hour-marks { padding-inline: 6px; }\n.hour-marks span::before { content: \"\"; display: block; width: 1px; height: 6px; margin: 0 auto 8px; background: #78867c; }\n.slider-hours .slider-input::-webkit-slider-thumb { border-radius: 8px; }\n.slider-hours .slider-input::-moz-range-thumb { border-radius: 8px; }\n.slider-distance .slider-track { margin-top: 45px; }\n.distance-bubble { position: absolute; left: calc(12px + (100% - 24px) * var(--fraction,.35)); bottom: 44px; transform: translateX(-50%); padding: 5px 8px; min-width: 40px; font-size: 11px; text-align: center; white-space: nowrap; color: #202222; background: #e1e9e3; border-radius: 7px; pointer-events: none; }\n.distance-bubble::after { content: \"\"; position: absolute; bottom: -3px; left: calc(50% - 3px); width: 6px; height: 6px; transform: rotate(45deg); background: inherit; }\n.slider-meter .slider-track { margin: 18px auto 6px; }\n.slider-meter .slider-rail { width: 22px; left: 12px; border-radius: 20px; background: #4d5a51; }\n.slider-meter .slider-fill { background: #becbc2; }\n.slider-meter .slider-input::-webkit-slider-thumb { width: 32px; height: 24px; margin-left: -14px; border-radius: 12px; }\n.slider-meter .slider-input::-moz-range-thumb { width: 30px; height: 22px; border-radius: 12px; }\n.meter-endpoints { display: flex; justify-content: space-between; color: #b6c2b9; font-size: 12px; }\n.mixer-group { box-sizing: border-box; width: min(320px,100%); min-width: 0; padding: 16px; margin: 0; border: 1px solid #ffffff0b; border-radius: 14px; background: #202222; color: #edf1ee; font-family: 'Instrument Sans',sans-serif; box-shadow: inset 0 1px #ffffff0d,0 2px 5px #00000010; }\n.mixer-title { margin: 0 0 14px; font-size: 14px; }\n.mixer-channels { display: flex; gap: 8px; }\n.slider-channel { flex: 1; width: 0; padding: 8px 3px; border-radius: 8px; background: #171b18; box-shadow: none; }\n.slider-channel .slider-header { flex-direction: column; gap: 5px; font-size: 12px; }\n.slider-channel .slider-header output { font-size: 11px; color: #b8c5bc; }\n.slider-channel .slider-track { width: 40px; height: 132px; margin: 12px auto 0; }\n.slider-channel .slider-input { width: 40px; height: 132px; }\n.slider-channel .slider-rail { left: 18px; }\n.slider-channel .slider-ends { display: none; }\n.type-preview { height: 80px; display: grid; place-items: center; margin-top: 12px; background: #161a17; border-radius: 8px; overflow: hidden; }\n.type-preview span { font-size: var(--preview-value,28px); line-height: 1; transition: font-size 200ms var(--slider-ease); }\n.radius-preview { display: grid; place-items: center; margin-top: 18px; height: 84px; }\n.radius-preview span { width: 80px; height: 80px; background: #d3dfd6; border-radius: var(--preview-value,16px); box-shadow: inset 0 0 0 1px #f1f5f2; }\n.opacity-preview { height: 80px; margin-top: 20px; border-radius: 8px; overflow: hidden; background: conic-gradient(#4b574e 25%,#26302a 0 50%,#4b574e 0 75%,#26302a 0) 0 0/16px 16px; }\n.opacity-preview span { display: block; height: 100%; background: #e5ede7; opacity: var(--fraction,.7); transition: opacity 200ms var(--slider-ease); }\n.slider-temperature .slider-input:active::-webkit-slider-thumb, .slider-rating .slider-input:active::-webkit-slider-thumb { border-radius: 50%; }\n.slider-scrub .slider-input:active::-webkit-slider-thumb { border-radius: 2px; }\n.slider-exposure .slider-input:active::-webkit-slider-thumb { border-radius: 6px; }\n.speed-stops button:hover:not(.is-current) { background: #ffffff0a; }\n[data-study] .sl-slider:not([data-interacted]) .zoom-frame,\n[data-study] .sl-slider:not([data-interacted]) .temperature-meter span,\n[data-study] .sl-slider:not([data-interacted]) .rating-star { transition: none; }\n@media(max-width:420px) { .speed-stops { font-size: 10px; } .speed-stops button { padding-inline: 4px; } .mixer-group { padding: 12px; } .slider-channel { padding: 8px 2px; } .mixer-channels { gap: 6px; } .slider-channel .slider-header { font-size: 11px; } }\n@media(prefers-reduced-motion:reduce) { .sl-slider *, .sl-slider *::before, .sl-slider *::after { transition: none !important; } }\n";
const api24 = (() => {
const mounted = new WeakMap();
function mountSlider(root, { onChange, formatValue } = {}) {
  if (mounted.has(root)) return mounted.get(root);
  if (onChange !== undefined && typeof onChange !== 'function') throw new TypeError('onChange must be a function.');
  if (formatValue !== undefined && typeof formatValue !== 'function') throw new TypeError('formatValue must be a function.');
  const inputs = [...root.querySelectorAll('input[type="range"]')];
  const output = root.querySelector('[data-output]');
  if (!inputs.length || !output) throw new TypeError('A native range and output are required.');
  const lifecycle = new AbortController();
  const view = root.ownerDocument.defaultView;
  const dual = inputs.length === 2;
  const labels = root.dataset.labels?.split(',');
  const format = value => formatValue ? String(formatValue(value)) : dual ? '$' + value : value + '%';
  const track = root.querySelector('.slider-track');
  let dragging = null, destroyed = false;
  const values = () => inputs.map(input => input.valueAsNumber);
  const percent = input => (input.valueAsNumber - Number(input.min)) / (Number(input.max) - Number(input.min)) * 100;
  function render(changed, emit = false) {
    if (destroyed) return;
    if (dual) {
      if (inputs[0].valueAsNumber > inputs[1].valueAsNumber) {
        if (changed === inputs[0]) inputs[0].value = inputs[1].value;
        else inputs[1].value = inputs[0].value;
      }
      root.style.setProperty('--low', percent(inputs[0]) + '%');
      root.style.setProperty('--high', percent(inputs[1]) + '%');
      inputs[0].setAttribute('aria-valuemax', inputs[1].value);
      inputs[1].setAttribute('aria-valuemin', inputs[0].value);
      for (const input of inputs) input.setAttribute('aria-valuetext', format(input.valueAsNumber));
      output.textContent = format(inputs[0].valueAsNumber) + ' – ' + format(inputs[1].valueAsNumber);
    } else {
      const p = percent(inputs[0]);
      root.style.setProperty('--high', p + '%');
      root.style.setProperty('--position', p + '%');
      if (root.hasAttribute('data-centered')) {
        const center = (0 - Number(inputs[0].min)) / (Number(inputs[0].max) - Number(inputs[0].min)) * 100;
        root.style.setProperty('--low', Math.min(p, center) + '%');
        root.style.setProperty('--high', Math.max(p, center) + '%');
      }
      root.style.setProperty('--sun-angle', (p * .9) + 'deg');
      root.style.setProperty('--sun-opacity', String(.25 + p * .0075));
      root.dataset.zero = String(p === 0);
      root.dataset.quiet = String(p <= 50);
      if (root.dataset.slider === 'volume') {
        // Only the emblem eases; the thumb and filled track always follow input.
        root.style.setProperty('--wave-one', String(Math.min(1, p / 35)));
        root.style.setProperty('--wave-two', String(Math.max(0, Math.min(1, (p - 20) / 80))));
      }
      output.textContent = labels ? labels[inputs[0].valueAsNumber] : format(inputs[0].valueAsNumber);
      inputs[0].setAttribute('aria-valuetext', output.textContent);
      for (const marker of root.querySelectorAll('[data-step]')) marker.classList.toggle('is-current', Number(marker.dataset.step) === inputs[0].valueAsNumber);
    }
    if (emit) {
      onChange?.(values());
      root.dispatchEvent(new view.CustomEvent('sliderchange', { bubbles: true, detail: { values: values() } }));
    }
  }
  root.addEventListener('input', event => { if (inputs.includes(event.target)) render(event.target, true); }, { signal: lifecycle.signal });
  // In the dual control, native thumbs drag normally. Empty-track dragging uses
  // the nearest thumb, with pointer capture, while both inputs remain focusable.
  if (dual) {
    const updatePointer = event => {
      const rect = track.getBoundingClientRect();
      const ratio = Math.max(0, Math.min(1, (event.clientX - rect.left - 12) / (rect.width - 24)));
      const min = Number(dragging.min), max = Number(dragging.max), step = Number(dragging.step) || 1;
      dragging.value = String(min + Math.round(ratio * (max - min) / step) * step);
      dragging.dispatchEvent(new view.Event('input', { bubbles: true }));
    };
    track.addEventListener('pointerdown', event => {
      if (event.button !== 0 || inputs.includes(event.target) || dragging) return;
      const candidates = inputs.filter(input => !input.disabled);
      if (!candidates.length) return;
      const rect = track.getBoundingClientRect();
      const p = (event.clientX - rect.left - 12) / (rect.width - 24) * 100;
      dragging = candidates.reduce((nearest, input) => Math.abs(percent(input)-p) < Math.abs(percent(nearest)-p) ? input : nearest);
      dragging.focus({ preventScroll: true });
      track.setPointerCapture(event.pointerId);
      updatePointer(event);
      event.preventDefault();
    }, { signal: lifecycle.signal });
    track.addEventListener('pointermove', event => { if (dragging && track.hasPointerCapture(event.pointerId)) updatePointer(event); }, { signal: lifecycle.signal });
    const finish = () => { const input = dragging; dragging = null; input?.dispatchEvent(new view.Event('change', { bubbles: true })); };
    track.addEventListener('pointerup', finish, { signal: lifecycle.signal });
    track.addEventListener('pointercancel', finish, { signal: lifecycle.signal });
    track.addEventListener('lostpointercapture', finish, { signal: lifecycle.signal });
  }
  function reset() {
    if (destroyed) return;
    inputs.forEach(input => { input.value = input.defaultValue; });
    render();
  }
  inputs[0].form?.addEventListener('reset', () => queueMicrotask(reset), { signal: lifecycle.signal });
  // History restoration can replace native values after module initialization.
  // Reconcile the visual state without emitting a user change or resetting it.
  view.addEventListener('pageshow', () => render(), { signal: lifecycle.signal });
  render();
  const controller = { reset, get values() { return values(); }, destroy() { destroyed = true; dragging = null; lifecycle.abort(); mounted.delete(root); } };
  mounted.set(root, controller);
  return controller;
}

function formatter(root) {
  return value => {
    switch (root.dataset.format) {
      case 'time': return Math.floor(value / 60) + ':' + String(Math.floor(value) % 60).padStart(2,'0');
      case 'hours': return String(value).padStart(2,'0') + ':00';
      case 'temperature': return value + ' °C';
      case 'balance': return value === 0 ? 'Center' : Math.abs(value) + '% ' + (value < 0 ? 'L' : 'R');
      case 'exposure': return (value > 0 ? '+' : '') + value.toFixed(1) + ' EV';
      case 'rating': return value + ' / 5';
      case 'distance': return value + ' km';
      case 'pixels': return value + ' px';
      default: return value + '%';
    }
  };
}

function mountSliderStudy(root, { onChange } = {}) {
  if (onChange !== undefined && typeof onChange !== 'function') throw new TypeError('onChange must be a function.');
  const lifecycle = new AbortController();
  const roots = root.matches('.sl-slider') ? [root] : [...root.querySelectorAll('.sl-slider')];
  const instances = roots.map(root => {
    const input = root.querySelector('input'), format = formatter(root);
    root.addEventListener('input', () => { root.dataset.interacted = 'true'; }, { signal: lifecycle.signal });
    const choices = [...root.querySelectorAll('[data-rating],button[data-step]')];
    const waveform = [...root.querySelectorAll('.scrub-art span')];
    let playedBars = -1;
    const update = values => {
      const value = values[0], fraction = (value - Number(input.min)) / (Number(input.max) - Number(input.min));
      root.style.setProperty('--fraction', String(fraction));
      root.style.setProperty('--preview-value', value + 'px');
      root.style.setProperty('--zoom', String(value / 100));
      root.querySelector('[data-bubble]')?.replaceChildren(format(value));
      for (const choice of choices) {
        const n = Number(choice.dataset.rating ?? choice.dataset.step);
        if (choice.hasAttribute('data-rating')) {
          const star = choice.querySelector('svg');
          star.classList.toggle('is-filled', n <= value);
          star.style.setProperty('--star-fill', String(Math.max(0, Math.min(1, value - n + 1))));
          choice.setAttribute('aria-checked', String(n === value));
          choice.tabIndex = n === Math.round(value) ? 0 : -1;
        } else choice.setAttribute('aria-pressed', String(n === value));
      }
      const count = Math.round(fraction * waveform.length);
      if (count !== playedBars) {
        waveform.forEach((bar, index) => bar.classList.toggle('is-played', index < count));
        playedBars = count;
      }
    };
    const controller = mountSlider(root, { formatValue: format, onChange: values => { update(values); onChange?.(values); } });
    const setValue = value => {
      if (input.disabled) return;
      input.value = String(value);
      input.dispatchEvent(new Event('input', { bubbles: true }));
      input.dispatchEvent(new Event('change', { bubbles: true }));
    };
    for (const choice of choices) {
      choice.addEventListener('click', () => setValue(Number(choice.dataset.rating ?? choice.dataset.step)), { signal: lifecycle.signal });
      if (!choice.hasAttribute('data-rating')) continue;
      choice.addEventListener('keydown', event => {
        const offset = { ArrowRight: 1, ArrowUp: 1, ArrowLeft: -1, ArrowDown: -1 }[event.key];
        if (offset === undefined && !['Home','End'].includes(event.key)) return;
        event.preventDefault();
        const index = choices.indexOf(choice);
        const next = event.key === 'Home' ? 0 : event.key === 'End' ? choices.length - 1 : (index + offset + choices.length) % choices.length;
        choices[next].focus(); choices[next].click();
      }, { signal: lifecycle.signal });
    }
    const play = root.querySelector('[data-play]');
    let timer = null, startedAt = 0, startValue = 0;
    const pause = () => {
      cancelAnimationFrame(timer); timer = null;
      if (!play) return;
      root.dataset.playing = 'false';
      play.setAttribute('aria-label', 'Play preview');
      play.querySelector('[data-play-label]').textContent = 'Play';
    };
    if (play) {
      play.addEventListener('click', () => {
        if (timer !== null) { pause(); return; }
        if (input.valueAsNumber >= Number(input.max)) setValue(Number(input.min));
        startedAt = performance.now(); startValue = input.valueAsNumber;
        root.dataset.playing = 'true'; play.setAttribute('aria-label','Pause preview');
        play.querySelector('[data-play-label]').textContent = 'Pause';
        // Use elapsed time, not accumulated steps; render once per display frame.
        // No animation loop remains active on pause, reset or a hidden page.
        const tick = now => {
          const value = Math.min(Number(input.max), startValue + (now - startedAt) / 1000);
          if (value !== input.valueAsNumber) {
            input.value = String(value);
            input.dispatchEvent(new Event('input', { bubbles: true }));
          }
          if (value >= Number(input.max)) pause();
          else timer = requestAnimationFrame(tick);
        };
        timer = requestAnimationFrame(tick);
      }, { signal: lifecycle.signal });
      input.addEventListener('input', event => {
        if (event.isTrusted && timer !== null) { startedAt = performance.now(); startValue = input.valueAsNumber; }
      }, { signal: lifecycle.signal });
      input.addEventListener('keydown', event => {
        const direction = { ArrowRight: 1, ArrowUp: 1, ArrowLeft: -1, ArrowDown: -1 }[event.key];
        if (direction === undefined) return;
        event.preventDefault();
        // Fine playback precision must not make keyboard seeking impractical.
        setValue(Math.max(Number(input.min), Math.min(Number(input.max), input.valueAsNumber + direction)));
        if (timer !== null) { startedAt = performance.now(); startValue = input.valueAsNumber; }
      }, { signal: lifecycle.signal });
      document.addEventListener('visibilitychange', () => { if (document.hidden) pause(); }, { signal: lifecycle.signal });
    }
    update(controller.values);
    return { get values() { return controller.values; }, sync() { update(controller.values); }, pause, reset() { pause(); controller.reset(); update(controller.values); }, destroy() { pause(); controller.destroy(); } };
  });
  const sync = () => instances.forEach(instance => instance.sync());
  window.addEventListener('pageshow', sync, { signal: lifecycle.signal });
  window.addEventListener('pagehide', () => instances.forEach(instance => instance.pause()), { signal: lifecycle.signal });
  return {
    get values() { return instances.flatMap(instance => instance.values); },
    reset() { instances.forEach(instance => instance.reset()); },
    destroy() { lifecycle.abort(); instances.forEach(instance => instance.destroy()); }
  };
}


return { mount: mountSliderStudy };
})();

const style18 = "\n.menu-demo {\n  --menu-ink: #202222; --menu-panel: #262929; --menu-text: #eef0ee; --menu-muted: #afb7b3;\n  --menu-ease: cubic-bezier(.22,.61,.36,1);\n  position: relative; width: min(288px,100%); height: 326px; padding-top: 24px;\n  color: var(--menu-text); font-family: 'Instrument Sans',sans-serif; text-align: left;\n}\n.menu-demo, .menu-demo * { box-sizing: border-box; }\n.menu-demo button, .menu-demo input { font: inherit; }\n.menu-demo button { cursor: pointer; }\n.menu-demo svg { width: 20px; height: 20px; flex: none; fill: none; stroke: currentColor; stroke-width: 1.4; stroke-linecap: round; stroke-linejoin: round; }\n.menu-trigger { display: flex; align-items: center; gap: 12px; width: 100%; min-height: 52px; padding: 14px 16px; border: 1px solid #ffffff10; border-radius: 14px; background: var(--menu-ink); color: var(--menu-text); box-shadow: inset 0 1px #ffffff0c,0 2px 4px #0001; transition: background-color 180ms ease; }\n.menu-trigger { transition: background-color 180ms ease,border-radius 280ms var(--menu-ease),border-color 220ms ease; }\n.menu-trigger:hover { background: #2c2f2e; }\n.menu-trigger-label { flex: 1; text-align: left; font-size: 14px; }\n.menu-chevron { width: 16px !important; height: 16px !important; color: var(--menu-muted); transition: transform 240ms var(--menu-ease); }\n[data-open=\"true\"] .menu-chevron { transform: rotate(180deg); }\n.menu-panel { position: absolute; top: 86px; left: 0; width: 100%; padding: 7px; border: 1px solid #ffffff13; border-radius: 16px; background: var(--menu-panel); box-shadow: 0 8px 20px #0002,inset 0 1px #ffffff08; opacity: 0; visibility: hidden; transform: translateY(-6px) scale(.985); transform-origin: top center; pointer-events: none; transition: opacity 170ms ease,transform 240ms var(--menu-ease),visibility 0s 240ms; }\n[data-open=\"true\"] .menu-panel { opacity: 1; visibility: visible; transform: none; pointer-events: auto; transition-delay: 0s; }\n.menu-overline { padding: 8px 10px 10px; color: var(--menu-muted); font-size: 11px; letter-spacing: .025em; }\n.menu-item { display: flex; align-items: center; gap: 10px; width: 100%; min-height: 39px; padding: 9px 10px; border: 0; border-radius: 9px; background: transparent; color: var(--menu-text); text-align: left; font-size: 13px !important; transition: background-color 160ms ease; }\n.menu-item:hover, .menu-item:focus-visible { background: #ffffff0a; }\n.menu-item > span:not(.menu-dot) { flex: 1; }\n.menu-item svg { color: #c0c9c3; width: 18px; height: 18px; }\n.menu-rule { height: 1px; margin: 5px 9px; background: #ffffff12; }\n.menu-check { opacity: 0; transition: opacity 180ms ease; }\n[aria-checked=\"true\"] .menu-check { opacity: 1; }\n[aria-checked=\"true\"] { color: #f5f7f5; }\n.menu-hint { margin: 16px 4px 0; color: #58625d; font-size: 12px; line-height: 1.5; }\n.menu-feedback { position: absolute; bottom: 0; left: 4px; right: 4px; margin: 0; min-height: 18px; color: #48524c; font-size: 12px; line-height: 1.5; }\n[data-open=\"true\"] .menu-feedback { visibility: hidden; }\n.menu-trigger kbd { font: 11px 'Instrument Sans',sans-serif; padding: 3px 7px; border: 1px solid #ffffff22; border-radius: 5px; color: var(--menu-muted); }\n.menu-badge { display: grid; place-items: center; min-width: 22px; height: 22px; padding-inline: 5px; border-radius: 7px; background: #ffffff13; color: #e6ece7; font-size: 11px; font-variant-numeric: tabular-nums; }\n.menu-dot { width: 8px; height: 8px; border-radius: 50%; background: #ccd4cf; box-shadow: 0 0 0 4px #ffffff06; margin: 0 6px 0 4px; }\n.menu-item:nth-of-type(2) .menu-dot { background: #a8b7af; }\n.menu-item:nth-of-type(3) .menu-dot { background: #80938a; }\n.menu-done { justify-content: center; background: #e5ebe7; color: #202222; margin-top: 4px; min-height: 34px; }\n.menu-done:hover, .menu-done:focus-visible { background: #f1f5f2; }\n.context-target { display: flex; align-items: center; gap: 12px; padding: 20px 14px; background: var(--menu-ink); border: 1px solid #ffffff10; border-radius: 15px; }\n.context-target > svg { width: 28px; height: 32px; color: #c8d1cb; }\n.context-title { flex: 1; min-width: 0; }\n.context-title strong { font-size: 14px; font-weight: 500; display: block; }\n.context-title small { display: block; margin-top: 5px; color: var(--menu-muted); font-size: 11px; }\n.context-target .menu-trigger { width: 32px; min-height: 32px; padding: 6px; border: 0; border-radius: 8px; box-shadow: none; }\n[data-menu=\"context\"] .menu-panel { width: min(232px,100%); top: var(--menu-y,116px); left: clamp(0px,var(--menu-x,28px),max(0px,calc(100% - 232px))); }\n.menu-search { display: flex; align-items: center; gap: 9px; margin: 3px 4px 7px; padding: 8px 6px 11px; border-bottom: 1px solid #ffffff15; color: #aeb9b1; }\n.menu-search svg { width: 18px; height: 18px; }\n.menu-search input { width: 100%; min-width: 0; padding: 0; border: 0; outline: 0; color: var(--menu-text); background: transparent; font-size: 13px; }\n.menu-search:focus-within { border-bottom-color: #a6b5ac; }\n.menu-search input::placeholder { color: #aeb9b1; opacity: 1; }\n.command-list { max-height: 144px; overflow: auto; scrollbar-width: thin; scrollbar-color: #6b7870 transparent; }\n.command-list .menu-item { min-height: 36px; padding-block: 7px; }\n.command-empty { margin: 0; padding: 18px 10px; color: var(--menu-muted); font-size: 12px; }\n.command-foot { margin: 4px 5px 0; padding: 6px 4px 2px; color: #a7b3ab; font-size: 10px; line-height: 14px; border-top: 1px solid #ffffff10; }\n.menu-demo button:focus-visible { outline: 2px solid #aebdb3; outline-offset: 2px; }\n.menu-demo [hidden] { display: none !important; }\n.menu-review .toggle-stage { min-height: 402px; }\n.menu-review .toggle-heading h2 { font-size: 21px; }\n/* Each menu has its own opening structure, rather than one shared popover. */\n/* Actions: a translated sheet passes under the fixed trigger.\n   The clipping window and all corner radii remain static during motion. */\n.action-surface { border-radius: 14px; isolation: isolate; }\n.action-reveal { overflow: hidden; border-radius: 0 0 14px 14px; margin-top: -14px; }\n[data-menu=\"actions\"] .menu-trigger { position: relative; z-index: 1; height: 52px; border-radius: 14px; border-bottom-color: transparent; box-shadow: inset 0 1px #ffffff0c; transition: background-color 180ms ease; }\n[data-menu=\"actions\"] .menu-trigger:focus-visible { outline: none; }\n[data-menu=\"actions\"] .menu-trigger:focus-visible::after { content: \"\"; position: absolute; inset: 3px; border: 2px solid #aebdb3; border-radius: 11px; pointer-events: none; }\n[data-menu=\"actions\"] .menu-panel { position: relative; top: auto; padding-top: 21px; border-top: 0; border-radius: 0 0 14px 14px; background: var(--menu-ink); box-shadow: none; transform: translateY(-100%); opacity: 1; visibility: hidden; transition: transform 280ms var(--menu-ease),visibility 0s 280ms; }\n[data-menu=\"actions\"][data-open=\"true\"] .menu-panel { transform: none; visibility: visible; transition-delay: 0s; }\n/* Sort: a small separate sheet rises into place. */\n[data-menu=\"sort\"] .menu-panel { transform: translateY(16px); transition: transform 280ms var(--menu-ease),opacity 200ms ease,visibility 0s 280ms; }\n[data-menu=\"sort\"][data-open=\"true\"] .menu-panel { transform: none; transition-delay: 0s; }\n/* Labels: stationary surface, with choices entering left to right in sequence. */\n[data-menu=\"labels\"] .menu-panel { transform: none; transition: opacity 180ms ease,visibility 0s 280ms; }\n[data-menu=\"labels\"][data-open=\"true\"] .menu-panel { transition-delay: 0s; }\n[data-menu=\"labels\"] .menu-item { opacity: 0; transform: translateX(-12px); transition: transform 280ms var(--menu-ease),opacity 180ms ease,background-color 160ms ease; }\n[data-menu=\"labels\"][data-open=\"true\"] .menu-item { opacity: 1; transform: none; }\n[data-menu=\"labels\"][data-open=\"true\"] .menu-item:nth-of-type(2) { transition-delay: 35ms,35ms,0s; }\n[data-menu=\"labels\"][data-open=\"true\"] .menu-item:nth-of-type(3) { transition-delay: 70ms,70ms,0s; }\n[data-menu=\"labels\"][data-open=\"true\"] .menu-done { transition-delay: 100ms,100ms,0s; }\n/* Context: expands from the point where the user opened it. */\n[data-menu=\"context\"] .menu-panel { transform: scale(.82); transform-origin: var(--origin-x,85%) 0; transition: transform 270ms var(--menu-ease),opacity 160ms ease,visibility 0s 270ms; }\n[data-menu=\"context\"][data-open=\"true\"] .menu-panel { transform: none; transition-delay: 0s; }\n/* Commands: trigger and search expand as one connected container. */\n[data-menu=\"commands\"][data-open=\"true\"] .menu-trigger { border-radius: 14px 14px 0 0; border-bottom-color: transparent; box-shadow: inset 0 1px #ffffff0c; }\n[data-menu=\"commands\"] .menu-panel { display: grid; grid-template-rows: 0fr; top: 75px; padding: 0; border-top: 0; border-radius: 0 0 14px 14px; background: var(--menu-ink); transform: none; transition: grid-template-rows 340ms var(--menu-ease),opacity 200ms ease,visibility 0s 340ms; }\n[data-menu=\"commands\"][data-open=\"true\"] .menu-panel { grid-template-rows: 1fr; transition-delay: 0s; }\n.command-body { min-height: 0; overflow: hidden; }\n.command-content { padding: 7px; }\n/* Inline project-owned contours: no bitmap decoding, masks or backdrop blending. */\n.menu-glyph { display: inline-flex; flex: 0 0 auto; width: 28px; height: 28px; align-items: center; justify-content: center; vertical-align: middle; pointer-events: none; }\n.menu-glyph > svg { display: block; width: 100%; height: 100%; flex: none; fill: none; stroke: currentColor; stroke-width: 1.5; stroke-linecap: round; stroke-linejoin: round; overflow: visible; }\n.menu-item .menu-glyph { width: 24px; height: 24px; margin-block: -3px; }\n.menu-trigger .menu-glyph:not(.menu-chevron) { margin-block: -3px; }\n.menu-glyph.menu-chevron { width: 20px !important; height: 20px !important; }\n.menu-glyph.menu-check { transition: opacity 160ms ease; }\n.context-target > .menu-glyph { width: 36px; height: 36px; }\n.context-target .menu-trigger .menu-glyph { width: 22px; height: 22px; }\n.menu-search .menu-glyph { width: 24px; height: 24px; margin-block: -3px; }\n.menu-review .toggle-reset .menu-glyph { width: 27px; height: 27px; }\n.menu-review .navigation .menu-glyph { width: 22px; height: 22px; }\n@media(prefers-reduced-motion:reduce) { .menu-demo *, .menu-demo *::before, .menu-demo *::after { transition: none !important; } }\n@media(forced-colors:active) { .menu-trigger,.menu-panel,.context-target { border: 1px solid CanvasText; } .menu-item[aria-checked=\"true\"] { outline: 1px solid Highlight; } }\n";
const api25 = (() => {
const mounted = new WeakMap();
function mountMenu(root, { onSelect } = {}) {
  if (mounted.has(root)) return mounted.get(root);
  if (onSelect !== undefined && typeof onSelect !== 'function') throw new TypeError('onSelect must be a function.');
  const lifecycle = new AbortController(), signal = lifecycle.signal;
  const trigger = root.querySelector('[data-trigger]'), panel = root.querySelector('.menu-panel');
  const items = [...root.querySelectorAll('[data-value]')], search = root.querySelector('input[type="search"]');
  const feedback = root.querySelector('[data-feedback]'), label = root.querySelector('[data-trigger-label]');
  const defaults = items.map(item => item.getAttribute('aria-checked'));
  const initialLabel = label?.textContent, initialFeedback = feedback.textContent;
  const doc = root.ownerDocument, view = doc.defaultView;
  const kind = root.dataset.menu;
  let opened = false, destroyed = false, typeBuffer = '', typeTimer;
  const visible = () => items.filter(item => !item.hidden && !item.disabled);
  function close(restore = false) {
    opened = false; root.dataset.open = 'false'; trigger.setAttribute('aria-expanded','false');
    panel.inert = true; panel.setAttribute('aria-hidden','true');
    if (restore) trigger.focus({preventScroll:true});
  }
  function open(focus = false, last = false) {
    if (destroyed || trigger.disabled) return;
    root.dataset.open = 'true'; opened = true; trigger.setAttribute('aria-expanded','true');
    panel.inert = false; panel.setAttribute('aria-hidden','false');
    if (focus) (search || (last ? visible().at(-1) : visible()[0]))?.focus({preventScroll:true});
  }
  function report(item) {
    const value = item.dataset.value;
    if (kind === 'sort') {
      items.forEach(option => option.setAttribute('aria-checked', String(option === item)));
      label.textContent = item.querySelector('span').textContent;
      feedback.textContent = 'Sorted by ' + label.textContent.toLowerCase() + '.';
    } else if (kind === 'labels') {
      item.setAttribute('aria-checked',String(item.getAttribute('aria-checked') !== 'true'));
      const selected = items.filter(option => option.getAttribute('aria-checked') === 'true');
      root.querySelector('[data-count]').textContent = String(selected.length);
      feedback.textContent = selected.length ? selected.map(option => option.querySelector('[data-label]').textContent).join(' · ') : 'No labels selected.';
    } else feedback.textContent = item.dataset.result;
    const values = kind === 'labels' ? items.filter(option => option.getAttribute('aria-checked') === 'true').map(option => option.dataset.value) : [value];
    onSelect?.(values);
    root.dispatchEvent(new view.CustomEvent('menuselect', {bubbles:true,detail:{value,values}}));
    if (kind !== 'labels') close(true);
  }
  trigger.addEventListener('click', event => opened ? close() : open(event.detail === 0 || !!search), {signal});
  trigger.addEventListener('keydown', event => {
    if (!['ArrowDown','ArrowUp'].includes(event.key)) return;
    event.preventDefault();open(true,event.key === 'ArrowUp');
  }, {signal});
  for (const item of items) item.addEventListener('click', () => report(item), {signal});
  root.querySelector('[data-done]')?.addEventListener('click',()=>close(true),{signal});
  root.addEventListener('keydown',event=>{
    if (!opened) return;
    if (event.target === trigger && event.key !== 'Escape') return;
    if (event.key === 'Escape') { event.preventDefault();event.stopPropagation();close(true);return; }
    const options=visible();
    if (event.target === search && !['ArrowDown','Enter'].includes(event.key)) return;
    if (event.target === search && event.key === 'Enter') { event.preventDefault();options[0]?.click();return; }
    if (['ArrowDown','ArrowUp','Home','End'].includes(event.key)) {
      event.preventDefault();const index=options.indexOf(event.target);
      const next=event.key==='Home'?0:event.key==='End'?options.length-1:(index+(event.key==='ArrowDown'?1:-1)+options.length)%options.length;
      options[next]?.focus();
    } else if (!search && event.key.length===1 && event.key!==' ' && !event.ctrlKey && !event.metaKey) {
      typeBuffer+=event.key.toLowerCase();clearTimeout(typeTimer);
      options.find(option=>option.textContent.trim().toLowerCase().startsWith(typeBuffer))?.focus();
      typeTimer=setTimeout(()=>{typeBuffer='';},600);
    }
  },{signal});
  search?.addEventListener('input',()=>{
    const query=search.value.trim().toLowerCase();
    items.forEach(item=>{item.hidden=!item.textContent.toLowerCase().includes(query);});
    root.querySelector('[data-empty]').hidden=visible().length>0;
  },{signal});
  doc.addEventListener('pointerdown',event=>{if(opened&&!event.composedPath().includes(root))close();},{signal});
  root.addEventListener('focusout',()=>queueMicrotask(()=>{if(opened&&!root.matches(':focus-within'))close();}),{signal});
  root.querySelector('[data-context]')?.addEventListener('contextmenu',event=>{
    event.preventDefault();const rect=root.getBoundingClientRect();
    root.style.setProperty('--menu-x',Math.max(0,Math.min(rect.width-232,event.clientX-rect.left))+'px');
    root.style.setProperty('--menu-y',Math.max(76,Math.min(112,event.clientY-rect.top))+'px');
    root.style.setProperty('--origin-x',Math.max(0,Math.min(232,event.clientX-rect.left-parseFloat(root.style.getPropertyValue('--menu-x'))))+'px');
    open(true);
  },{signal});
  function reset() {
    close(root.matches(':focus-within'));clearTimeout(typeTimer);typeBuffer='';
    items.forEach((item,index)=>{if(defaults[index]!==null)item.setAttribute('aria-checked',defaults[index]);item.hidden=false;});
    if(label)label.textContent=initialLabel;
    if(search){search.value='';root.querySelector('[data-empty]').hidden=true;}
    const count=root.querySelector('[data-count]');if(count)count.textContent=String(defaults.filter(value=>value==='true').length);
    feedback.textContent=initialFeedback;root.style.removeProperty('--menu-x');root.style.removeProperty('--menu-y');root.style.removeProperty('--origin-x');
  }
  close();
  const controller={open,close,reset,destroy(){destroyed=true;close();clearTimeout(typeTimer);lifecycle.abort();mounted.delete(root);}};
  mounted.set(root,controller);return controller;
}

return { mount: mountMenu };
})();

const style19 = "\n.menu-demo {\n  --menu-ink: #202222; --menu-panel: #262929; --menu-text: #eef0ee; --menu-muted: #afb7b3;\n  --menu-ease: cubic-bezier(.22,.61,.36,1);\n  position: relative; width: min(288px,100%); height: 326px; padding-top: 24px;\n  color: var(--menu-text); font-family: 'Instrument Sans',sans-serif; text-align: left;\n}\n.menu-demo, .menu-demo * { box-sizing: border-box; }\n.menu-demo button, .menu-demo input { font: inherit; }\n.menu-demo button { cursor: pointer; }\n.menu-demo svg { width: 20px; height: 20px; flex: none; fill: none; stroke: currentColor; stroke-width: 1.4; stroke-linecap: round; stroke-linejoin: round; }\n.menu-trigger { display: flex; align-items: center; gap: 12px; width: 100%; min-height: 52px; padding: 14px 16px; border: 1px solid #ffffff10; border-radius: 14px; background: var(--menu-ink); color: var(--menu-text); box-shadow: inset 0 1px #ffffff0c,0 2px 4px #0001; transition: background-color 180ms ease; }\n.menu-trigger { transition: background-color 180ms ease,border-radius 280ms var(--menu-ease),border-color 220ms ease; }\n.menu-trigger:hover { background: #2c2f2e; }\n.menu-trigger-label { flex: 1; text-align: left; font-size: 14px; }\n.menu-chevron { width: 16px !important; height: 16px !important; color: var(--menu-muted); transition: transform 240ms var(--menu-ease); }\n[data-open=\"true\"] .menu-chevron { transform: rotate(180deg); }\n.menu-panel { position: absolute; top: 86px; left: 0; width: 100%; padding: 7px; border: 1px solid #ffffff13; border-radius: 16px; background: var(--menu-panel); box-shadow: 0 8px 20px #0002,inset 0 1px #ffffff08; opacity: 0; visibility: hidden; transform: translateY(-6px) scale(.985); transform-origin: top center; pointer-events: none; transition: opacity 170ms ease,transform 240ms var(--menu-ease),visibility 0s 240ms; }\n[data-open=\"true\"] .menu-panel { opacity: 1; visibility: visible; transform: none; pointer-events: auto; transition-delay: 0s; }\n.menu-overline { padding: 8px 10px 10px; color: var(--menu-muted); font-size: 11px; letter-spacing: .025em; }\n.menu-item { display: flex; align-items: center; gap: 10px; width: 100%; min-height: 39px; padding: 9px 10px; border: 0; border-radius: 9px; background: transparent; color: var(--menu-text); text-align: left; font-size: 13px !important; transition: background-color 160ms ease; }\n.menu-item:hover, .menu-item:focus-visible { background: #ffffff0a; }\n.menu-item > span:not(.menu-dot) { flex: 1; }\n.menu-item svg { color: #c0c9c3; width: 18px; height: 18px; }\n.menu-rule { height: 1px; margin: 5px 9px; background: #ffffff12; }\n.menu-check { opacity: 0; transition: opacity 180ms ease; }\n[aria-checked=\"true\"] .menu-check { opacity: 1; }\n[aria-checked=\"true\"] { color: #f5f7f5; }\n.menu-hint { margin: 16px 4px 0; color: #58625d; font-size: 12px; line-height: 1.5; }\n.menu-feedback { position: absolute; bottom: 0; left: 4px; right: 4px; margin: 0; min-height: 18px; color: #48524c; font-size: 12px; line-height: 1.5; }\n[data-open=\"true\"] .menu-feedback { visibility: hidden; }\n.menu-trigger kbd { font: 11px 'Instrument Sans',sans-serif; padding: 3px 7px; border: 1px solid #ffffff22; border-radius: 5px; color: var(--menu-muted); }\n.menu-badge { display: grid; place-items: center; min-width: 22px; height: 22px; padding-inline: 5px; border-radius: 7px; background: #ffffff13; color: #e6ece7; font-size: 11px; font-variant-numeric: tabular-nums; }\n.menu-dot { width: 8px; height: 8px; border-radius: 50%; background: #ccd4cf; box-shadow: 0 0 0 4px #ffffff06; margin: 0 6px 0 4px; }\n.menu-item:nth-of-type(2) .menu-dot { background: #a8b7af; }\n.menu-item:nth-of-type(3) .menu-dot { background: #80938a; }\n.menu-done { justify-content: center; background: #e5ebe7; color: #202222; margin-top: 4px; min-height: 34px; }\n.menu-done:hover, .menu-done:focus-visible { background: #f1f5f2; }\n.context-target { display: flex; align-items: center; gap: 12px; padding: 20px 14px; background: var(--menu-ink); border: 1px solid #ffffff10; border-radius: 15px; }\n.context-target > svg { width: 28px; height: 32px; color: #c8d1cb; }\n.context-title { flex: 1; min-width: 0; }\n.context-title strong { font-size: 14px; font-weight: 500; display: block; }\n.context-title small { display: block; margin-top: 5px; color: var(--menu-muted); font-size: 11px; }\n.context-target .menu-trigger { width: 32px; min-height: 32px; padding: 6px; border: 0; border-radius: 8px; box-shadow: none; }\n[data-menu=\"context\"] .menu-panel { width: min(232px,100%); top: var(--menu-y,116px); left: clamp(0px,var(--menu-x,28px),max(0px,calc(100% - 232px))); }\n.menu-search { display: flex; align-items: center; gap: 9px; margin: 3px 4px 7px; padding: 8px 6px 11px; border-bottom: 1px solid #ffffff15; color: #aeb9b1; }\n.menu-search svg { width: 18px; height: 18px; }\n.menu-search input { width: 100%; min-width: 0; padding: 0; border: 0; outline: 0; color: var(--menu-text); background: transparent; font-size: 13px; }\n.menu-search:focus-within { border-bottom-color: #a6b5ac; }\n.menu-search input::placeholder { color: #aeb9b1; opacity: 1; }\n.command-list { max-height: 144px; overflow: auto; scrollbar-width: thin; scrollbar-color: #6b7870 transparent; }\n.command-list .menu-item { min-height: 36px; padding-block: 7px; }\n.command-empty { margin: 0; padding: 18px 10px; color: var(--menu-muted); font-size: 12px; }\n.command-foot { margin: 4px 5px 0; padding: 6px 4px 2px; color: #a7b3ab; font-size: 10px; line-height: 14px; border-top: 1px solid #ffffff10; }\n.menu-demo button:focus-visible { outline: 2px solid #aebdb3; outline-offset: 2px; }\n.menu-demo [hidden] { display: none !important; }\n.menu-review .toggle-stage { min-height: 402px; }\n.menu-review .toggle-heading h2 { font-size: 21px; }\n/* Each menu has its own opening structure, rather than one shared popover. */\n/* Actions: a translated sheet passes under the fixed trigger.\n   The clipping window and all corner radii remain static during motion. */\n.action-surface { border-radius: 14px; isolation: isolate; }\n.action-reveal { overflow: hidden; border-radius: 0 0 14px 14px; margin-top: -14px; }\n[data-menu=\"actions\"] .menu-trigger { position: relative; z-index: 1; height: 52px; border-radius: 14px; border-bottom-color: transparent; box-shadow: inset 0 1px #ffffff0c; transition: background-color 180ms ease; }\n[data-menu=\"actions\"] .menu-trigger:focus-visible { outline: none; }\n[data-menu=\"actions\"] .menu-trigger:focus-visible::after { content: \"\"; position: absolute; inset: 3px; border: 2px solid #aebdb3; border-radius: 11px; pointer-events: none; }\n[data-menu=\"actions\"] .menu-panel { position: relative; top: auto; padding-top: 21px; border-top: 0; border-radius: 0 0 14px 14px; background: var(--menu-ink); box-shadow: none; transform: translateY(-100%); opacity: 1; visibility: hidden; transition: transform 280ms var(--menu-ease),visibility 0s 280ms; }\n[data-menu=\"actions\"][data-open=\"true\"] .menu-panel { transform: none; visibility: visible; transition-delay: 0s; }\n/* Sort: a small separate sheet rises into place. */\n[data-menu=\"sort\"] .menu-panel { transform: translateY(16px); transition: transform 280ms var(--menu-ease),opacity 200ms ease,visibility 0s 280ms; }\n[data-menu=\"sort\"][data-open=\"true\"] .menu-panel { transform: none; transition-delay: 0s; }\n/* Labels: stationary surface, with choices entering left to right in sequence. */\n[data-menu=\"labels\"] .menu-panel { transform: none; transition: opacity 180ms ease,visibility 0s 280ms; }\n[data-menu=\"labels\"][data-open=\"true\"] .menu-panel { transition-delay: 0s; }\n[data-menu=\"labels\"] .menu-item { opacity: 0; transform: translateX(-12px); transition: transform 280ms var(--menu-ease),opacity 180ms ease,background-color 160ms ease; }\n[data-menu=\"labels\"][data-open=\"true\"] .menu-item { opacity: 1; transform: none; }\n[data-menu=\"labels\"][data-open=\"true\"] .menu-item:nth-of-type(2) { transition-delay: 35ms,35ms,0s; }\n[data-menu=\"labels\"][data-open=\"true\"] .menu-item:nth-of-type(3) { transition-delay: 70ms,70ms,0s; }\n[data-menu=\"labels\"][data-open=\"true\"] .menu-done { transition-delay: 100ms,100ms,0s; }\n/* Context: expands from the point where the user opened it. */\n[data-menu=\"context\"] .menu-panel { transform: scale(.82); transform-origin: var(--origin-x,85%) 0; transition: transform 270ms var(--menu-ease),opacity 160ms ease,visibility 0s 270ms; }\n[data-menu=\"context\"][data-open=\"true\"] .menu-panel { transform: none; transition-delay: 0s; }\n/* Commands: trigger and search expand as one connected container. */\n[data-menu=\"commands\"][data-open=\"true\"] .menu-trigger { border-radius: 14px 14px 0 0; border-bottom-color: transparent; box-shadow: inset 0 1px #ffffff0c; }\n[data-menu=\"commands\"] .menu-panel { display: grid; grid-template-rows: 0fr; top: 75px; padding: 0; border-top: 0; border-radius: 0 0 14px 14px; background: var(--menu-ink); transform: none; transition: grid-template-rows 340ms var(--menu-ease),opacity 200ms ease,visibility 0s 340ms; }\n[data-menu=\"commands\"][data-open=\"true\"] .menu-panel { grid-template-rows: 1fr; transition-delay: 0s; }\n.command-body { min-height: 0; overflow: hidden; }\n.command-content { padding: 7px; }\n/* Inline project-owned contours: no bitmap decoding, masks or backdrop blending. */\n.menu-glyph { display: inline-flex; flex: 0 0 auto; width: 28px; height: 28px; align-items: center; justify-content: center; vertical-align: middle; pointer-events: none; }\n.menu-glyph > svg { display: block; width: 100%; height: 100%; flex: none; fill: none; stroke: currentColor; stroke-width: 1.5; stroke-linecap: round; stroke-linejoin: round; overflow: visible; }\n.menu-item .menu-glyph { width: 24px; height: 24px; margin-block: -3px; }\n.menu-trigger .menu-glyph:not(.menu-chevron) { margin-block: -3px; }\n.menu-glyph.menu-chevron { width: 20px !important; height: 20px !important; }\n.menu-glyph.menu-check { transition: opacity 160ms ease; }\n.context-target > .menu-glyph { width: 36px; height: 36px; }\n.context-target .menu-trigger .menu-glyph { width: 22px; height: 22px; }\n.menu-search .menu-glyph { width: 24px; height: 24px; margin-block: -3px; }\n.menu-review .toggle-reset .menu-glyph { width: 27px; height: 27px; }\n.menu-review .navigation .menu-glyph { width: 22px; height: 22px; }\n@media(prefers-reduced-motion:reduce) { .menu-demo *, .menu-demo *::before, .menu-demo *::after { transition: none !important; } }\n@media(forced-colors:active) { .menu-trigger,.menu-panel,.context-target { border: 1px solid CanvasText; } .menu-item[aria-checked=\"true\"] { outline: 1px solid Highlight; } }\n\n.menu-study { height: 366px; --study-ease: cubic-bezier(.22,.61,.36,1); }\n.menu-review:has(.menu-study) .toggle-stage { min-height: 440px; }\n.menu-study .menu-trigger-label { font-size: 14px; }\n.menu-study .menu-panel { z-index: 2; }\n.choice-copy strong { display: block; font-weight: 450; font-size: 13px; }\n.choice-copy small { display: block; margin-top: 4px; color: var(--menu-muted); font-size: 11px; line-height: 1.4; }\n.menu-study .menu-item { min-height: 41px; }\n.menu-study .menu-item:has(small) { min-height: 57px; }\n.menu-study .menu-panel { transform: none; transition: opacity 180ms ease,visibility 0s 280ms; }\n.menu-study[data-open=\"true\"] .menu-panel { transition-delay: 0s; }\n.menu-study[data-motion=\"rise\"] .menu-panel { transform: translateY(12px); transition: transform 260ms var(--study-ease),opacity 170ms ease,visibility 0s 260ms; }\n.menu-study[data-motion=\"corner\"] .menu-panel { left: auto; right: 0; width: min(228px,100%); transform: scale(.94); transform-origin: top right; transition: transform 220ms var(--study-ease),opacity 160ms ease,visibility 0s 220ms; }\n.menu-study[data-motion=\"sequence\"] .menu-item { transform: translateY(7px); opacity: 0; transition: transform 240ms var(--study-ease),opacity 150ms ease,background-color 160ms ease; }\n.menu-study[data-motion=\"sequence\"][data-open=\"true\"] .menu-item { transform: none; opacity: 1; }\n.menu-study[data-motion=\"sequence\"][data-open=\"true\"] .menu-item:nth-child(2) { transition-delay: 25ms,25ms,0s; }\n.menu-study[data-motion=\"sequence\"][data-open=\"true\"] .menu-item:nth-child(3) { transition-delay: 50ms,50ms,0s; }\n.menu-study[data-motion=\"sequence\"][data-open=\"true\"] .menu-item:nth-child(4) { transition-delay: 75ms,75ms,0s; }\n.study-scroll { max-height: 244px; overflow: auto; scrollbar-width: thin; scrollbar-color: #75817a transparent; }\n.menu-study[data-motion=\"side\"] .menu-panel { transform: translateX(14px); transition: transform 260ms var(--study-ease),opacity 180ms ease,visibility 0s 260ms; }\n.menu-study[data-motion=\"up\"],.menu-study[data-motion=\"lift\"] { padding-top: 278px; }\n.menu-study[data-motion=\"up\"] .menu-panel { top: auto; bottom: 100px; transform: translateY(12px); transition: transform 250ms var(--study-ease),opacity 180ms ease,visibility 0s 250ms; }\n.menu-study[data-motion=\"lift\"] .menu-panel { top: auto; bottom: 100px; transform: translateY(8px) scale(.98); transform-origin: bottom center; transition: transform 280ms var(--study-ease),opacity 190ms ease,visibility 0s 280ms; }\n.menu-study[data-motion=\"hinge\"] .menu-panel { transform: translateX(-8px) scale(.98); transform-origin: top left; transition: transform 250ms var(--study-ease),opacity 180ms ease,visibility 0s 250ms; }\n.menu-study[data-motion=\"drill\"] .menu-panel { transform: translateY(-8px); transition: transform 230ms var(--study-ease),opacity 180ms ease,visibility 0s 230ms; }\n.menu-study[data-motion=\"fan\"] .menu-panel { transform: translateY(10px) scale(.96); transform-origin: top center; transition: transform 260ms var(--study-ease),opacity 160ms ease,visibility 0s 260ms; }\n.menu-study[data-open=\"true\"] .menu-panel { transform: none; transition-delay: 0s; }\n.study-joined { isolation: isolate; }\n.study-joined .menu-trigger { position: relative; z-index: 3; height: 52px; transition: background-color 180ms ease; }\n.study-reveal { overflow: hidden; border-radius: 0 0 14px 14px; margin-top: -14px; }\n.menu-study[data-motion=\"joined\"] .menu-panel { position: relative; top: auto; padding-top: 21px; opacity: 1; border-top: 0; border-radius: 0 0 14px 14px; box-shadow: none; transform: translateY(-100%); transition: transform 280ms var(--study-ease),visibility 0s 280ms; }\n.menu-study[data-motion=\"joined\"][data-open=\"true\"] .menu-panel { transform: none; transition-delay: 0s; }\n.surface-options { display: grid; grid-template-columns: repeat(3,1fr); gap: 6px; padding: 3px; }\n.surface-option { display: grid; grid-template-rows: 53px 18px 20px; align-content: start; align-items: center; gap: 8px; min-width: 0; }\n.surface-option,.format-option,.insert-option { position: relative; border: 1px solid transparent; color: var(--menu-text); background: transparent; border-radius: 10px; padding: 10px 5px; cursor: pointer; font-size: 12px!important; }\n.surface-option:hover,.format-option:hover,.insert-option:hover { background: transparent; }\n.surface-option[aria-checked=\"true\"],.format-option[aria-checked=\"true\"],.insert-option[aria-current=\"true\"] { border-color: #b9c7bf66; background: transparent; }\n.surface-sample { display: block; width: 100%; height: 53px; border-radius: 9px; background: #343938; }\n.sample-outline { border: 1px solid #9eaaa4; background: transparent; }\n.sample-raised { box-shadow: inset 0 1px #ffffff30,0 4px 6px #0005; background: linear-gradient(#454b48,#272c2a); }\n.surface-option .menu-check { display: block; margin: 0 auto; width: 20px; height: 20px; }\n[data-appearance=\"outline\"] > .menu-trigger { background: #171a19; border-color: #9eaaa4; }\n[data-appearance=\"raised\"] > .menu-trigger { background: linear-gradient(#414643,#252a27); box-shadow: inset 0 1px #ffffff30,0 5px 8px #0003; }\n.density-sample { width: 29px; display: grid; gap: 3px; margin-right: 8px; }\n.menu-item > .density-sample { flex: none; }\n.density-sample b { height: 2px; background: #c8d1cd; border-radius: 2px; }\n.spacing-1 { gap: 5px; }.spacing-2 { gap: 7px; }\n.format-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 5px; padding: 0 3px; }\n.format-option { display: grid; justify-items: start; padding: 9px 13px; gap: 4px; }\n.format-option .menu-check { position: absolute; top: 10px; right: 7px; width: 20px; height: 20px; }\n.format-option strong { font-size: 13px; font-weight: 500; }.format-option small { color: var(--menu-muted); font-size: 10px; }\n.custom-time { padding: 9px 10px; }\n.custom-time > label { font-size: 11px; color: var(--menu-muted); }\n.custom-time > div { display: flex; gap: 8px; margin-top: 8px; }\n.custom-time input { min-width: 0; width: 100%; border: 1px solid #ffffff22; border-radius: 8px; color: #eef0ee; background: #1a1d1c; padding: 9px; color-scheme: dark; font-size: 13px; }\n.custom-time button,.folder-toolbar button { display: grid; place-items: center; flex: none; border: 0; border-radius: 8px; background: transparent; color: #eef0ee; padding: 5px; }\n.folder-toolbar { display: flex; align-items: center; min-height: 41px; gap: 8px; padding: 2px 9px 8px; border-bottom: 1px solid #ffffff10; }\n.folder-toolbar strong { font-size: 12px; font-weight: 450; }\n.folder-toolbar button .menu-glyph { width: 21px; height: 21px; transform: rotate(90deg); }\n.folder-next { transform: rotate(-90deg); width: 18px; height: 18px; }\n.folder-pages { position: relative; height: 176px; overflow: hidden; margin-top: 6px; }\n.folder-pages > div { position: absolute; inset: 0; transition: transform 260ms var(--study-ease),opacity 180ms ease,visibility 0s 260ms; }\n[data-folder-child] { transform: translateX(24px); opacity: 0; visibility: hidden; }\n[data-depth=\"child\"] [data-folder-child] { transform: none; opacity: 1; visibility: visible; transition-delay: 0s; }\n[data-depth=\"child\"] [data-folder-root] { transform: translateX(-24px); opacity: 0; visibility: hidden; }\n[data-depth=\"root\"] [data-folder-root] { visibility: visible; transition-delay: 0s; }\n.folder-description { display: grid; justify-items: center; padding: 8px 0 13px; gap: 7px; }\n.folder-description > .menu-glyph { width: 38px; height: 38px; }\n.folder-description strong { font-size: 14px; font-weight: 450; }.folder-description small { color: var(--menu-muted); font-size: 11px; }\n.insert-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 4px; }\n.insert-option { display: grid; justify-items: center; gap: 9px; padding: 13px 5px; }\n.insert-option:active { border-color: #b9c7bf66; }\n.menu-study button:focus-visible { outline: 2px solid #b5c3bc; outline-offset: -2px; }\n.menu-study button { -webkit-tap-highlight-color: transparent; }\n.menu-study .menu-item:not(.menu-done):is(:hover,:active,:focus-visible) { background: transparent; }\n.menu-study .menu-item:not(.menu-done):hover { color: #ffffff; }\n.menu-item > .person-initials { display: grid; place-items: center; flex: none!important; width: 29px; height: 29px; border: 1px solid #c4cec52b; border-radius: 50%; color: #cbd4ce; font: 10px/1 'Instrument Sans',sans-serif; letter-spacing: .02em; }\n@media(prefers-reduced-motion:reduce) { .menu-study *, .menu-study *::before,.menu-study *::after { transition: none!important; } }\n";
const api26 = (() => {
const mounted=new WeakMap();
function mountMenuStudy(root,{onSelect}={}){
 if(mounted.has(root))return mounted.get(root);
 const life=new AbortController(),signal=life.signal,doc=root.ownerDocument,view=doc.defaultView;
 const trigger=root.querySelector('[data-trigger]'),panel=root.querySelector('.menu-panel'),feedback=root.querySelector('[data-feedback]'),label=root.querySelector('[data-trigger-label]'),search=root.querySelector('input[type="search"]');
 const kind=root.dataset.menu,choices=[...root.querySelectorAll('[data-value]')],initialLabel=label.textContent,initialFeedback=feedback.textContent;
 const defaults=choices.map(n=>n.getAttribute('aria-checked'));
 const initialValues=choices.filter(n=>n.getAttribute('aria-checked')==='true').map(n=>n.dataset.value);
 let committed=[...initialValues],opened=false,destroyed=false,typeTimer,buffer='';
 const active=()=>[...panel.querySelectorAll('button')].filter(n=>!n.disabled&&!n.hidden&&!n.closest('[inert],[hidden]'));
 function mark(values){choices.forEach(n=>{if(n.hasAttribute('aria-checked'))n.setAttribute('aria-checked',String(values.includes(n.dataset.value)));});}
 function close(focus=false){opened=false;root.dataset.open='false';trigger.setAttribute('aria-expanded','false');panel.inert=true;panel.setAttribute('aria-hidden','true');if(root.dataset.confirm)mark(committed);if(focus)trigger.focus({preventScroll:true});}
 function open(focus=false,last=false){if(destroyed||trigger.disabled)return;opened=true;root.dataset.open='true';trigger.setAttribute('aria-expanded','true');panel.inert=false;panel.setAttribute('aria-hidden','false');if(focus)(search||(last?active().at(-1):active()[0]))?.focus({preventScroll:true});}
 function finish(value,name,message,closeMenu=false){
  committed=[value];mark(committed);
  if(kind==='appearance')root.dataset.appearance=value;
  if(!['move','snooze','insert','export'].includes(kind))label.textContent=name;
  feedback.textContent=message||name+' selected in this preview.';
  if(kind==='insert'){
   choices.forEach(n=>n.setAttribute('aria-current',String(n.dataset.value===value)));
   label.textContent='Insert '+name.toLowerCase();
  }
  if(closeMenu)close(true);
  root.dispatchEvent(new view.CustomEvent('menuselect',{bubbles:true,detail:{value,values:[value]}}));
  onSelect?.([value]);
 }
 trigger.addEventListener('click',e=>opened?close():open(e.detail===0||!!search),{signal});
 trigger.addEventListener('keydown',e=>{if(['ArrowDown','ArrowUp'].includes(e.key)){e.preventDefault();open(true,e.key==='ArrowUp');}},{signal});
 choices.forEach(n=>n.addEventListener('click',()=>{
  const value=n.dataset.value,name=n.dataset.label;
  if(root.dataset.confirm){mark([value]);return;}
  finish(value,name,kind==='insert'?name+' block inserted in this preview.':kind==='snooze'?name+' selected. No reminder is scheduled.':undefined);
 },{signal}));
 root.querySelector('[data-apply]')?.addEventListener('click',()=>{
  const chosen=choices.find(n=>n.getAttribute('aria-checked')==='true');if(!chosen)return;
  finish(chosen.dataset.value,chosen.dataset.label,kind==='export'?chosen.dataset.label+' export preview complete. Nothing downloaded.':chosen.dataset.label+' applied in this preview only.',true);
 },{signal});
 search?.addEventListener('input',()=>{const q=search.value.trim().toLowerCase();choices.forEach(n=>n.hidden=!n.textContent.toLowerCase().includes(q));root.querySelector('[data-empty]').hidden=choices.some(n=>!n.hidden);},{signal});
 const folderRoot=root.querySelector('[data-folder-root]'),folderChild=root.querySelector('[data-folder-child]'),back=root.querySelector('[data-back]');
 function showFolder(name,focus=true){
  const child=Boolean(name);root.dataset.depth=child?'child':'root';
  folderRoot.inert=child;folderRoot.setAttribute('aria-hidden',String(child));folderChild.inert=!child;folderChild.setAttribute('aria-hidden',String(!child));back.hidden=!child;
  root.querySelector('[data-path]').textContent=child?'Projects / '+name:'Projects';
  if(child)root.querySelector('[data-folder-name]').textContent=name;
  if(focus)(child?back:folderRoot.querySelector('button')).focus({preventScroll:true});
 }
 root.querySelectorAll('[data-folder]').forEach(n=>n.addEventListener('click',()=>showFolder(n.dataset.folder),{signal}));
 back?.addEventListener('click',()=>showFolder(null),{signal});
 root.querySelector('[data-move]')?.addEventListener('click',()=>{const name=root.querySelector('[data-folder-name]').textContent;finish(name.toLowerCase(),name,'Sample moved to '+name+'. No real file changed.',true);},{signal});
 const time=root.querySelector('input[type="time"]');
 root.querySelector('[data-time-apply]')?.addEventListener('click',()=>{if(!time.reportValidity())return;finish(time.value,time.value,'Time set to '+time.value+' in this preview. No reminder is scheduled.',true);},{signal});
 root.addEventListener('keydown',e=>{
  if(!opened)return;
  if(e.key==='Escape'){e.preventDefault();e.stopPropagation();close(true);return;}
  if(e.target===trigger)return;
  if(e.key==='ArrowLeft'&&kind==='move'&&root.dataset.depth==='child'&&e.target.tagName!=='INPUT'){e.preventDefault();showFolder(null);return;}
  if(e.target===time)return;
  if(e.target===search&&!['ArrowDown','Enter'].includes(e.key))return;
  const options=active();if(!options.length)return;
  if(e.target===search&&e.key==='Enter'){e.preventDefault();options[0].click();return;}
  if(['ArrowDown','ArrowUp','Home','End'].includes(e.key)){
   e.preventDefault();const i=options.indexOf(e.target),next=e.key==='Home'?0:e.key==='End'?options.length-1:(i+(e.key==='ArrowDown'?1:-1)+options.length)%options.length;options[next]?.focus({preventScroll:true});
  }else if(!search&&e.key.length===1&&e.key!==' '&&!e.ctrlKey&&!e.metaKey){
   buffer+=e.key.toLowerCase();clearTimeout(typeTimer);options.find(n=>n.textContent.trim().toLowerCase().startsWith(buffer))?.focus({preventScroll:true});typeTimer=setTimeout(()=>buffer='',600);
  }
 },{signal});
 doc.addEventListener('pointerdown',e=>{if(opened&&!e.composedPath().includes(root))close();},{signal});
 root.addEventListener('focusout',()=>queueMicrotask(()=>{if(opened&&!root.matches(':focus-within'))close();}),{signal});
 function reset(){close(root.matches(':focus-within'));committed=[...initialValues];choices.forEach((n,i)=>{n.hidden=false;n.removeAttribute('aria-current');if(defaults[i]!==null)n.setAttribute('aria-checked',defaults[i]);});label.textContent=initialLabel;feedback.textContent=initialFeedback;delete root.dataset.appearance;if(search){search.value='';root.querySelector('[data-empty]').hidden=true;}if(time)time.value='15:00';if(folderRoot)showFolder(null,false);clearTimeout(typeTimer);buffer='';}
 close();
 const control={open,close,reset,destroy(){close();destroyed=true;clearTimeout(typeTimer);life.abort();mounted.delete(root);}};
 mounted.set(root,control);return control;
}

return { mount: mountMenuStudy };
})();

const style20 = "\n.nav-demo{width:min(320px,100%);min-width:0;--nav-ease:cubic-bezier(.22,.61,.36,1);color:#eef1ee;font-family:'Instrument Sans',sans-serif;font-size:13px}\n.navigation-review .skip-link:not(:focus){clip-path:inset(100%)}\n@media(max-width:420px){.navigation-review .header-inner{padding-inline:16px;gap:10px}.navigation-review .wordmark{font-size:18px;white-space:nowrap}.navigation-review .navigation{gap:2px}.navigation-review .nav-item{padding-inline:5px;font-size:11px;gap:4px}}\n.nav-demo *{box-sizing:border-box}.nav-demo [hidden]{display:none!important}\n.nav-surface{border:1px solid #ffffff16;border-radius:17px;background:#202423;box-shadow:inset 0 1px #ffffff08,0 3px 6px #00000015;overflow:hidden}\n.nav-demo button{font:inherit;color:inherit;cursor:pointer;border:0;background:transparent;-webkit-tap-highlight-color:transparent}\n.nav-demo button:focus-visible,.nav-content:focus-visible{outline:2px solid #becdc5;outline-offset:-3px;border-radius:7px}\n.nav-demo button:disabled{opacity:.3;cursor:default}\n.menu-glyph{display:inline-flex;flex:none;align-items:center;justify-content:center;width:24px;height:24px;pointer-events:none;vertical-align:middle}\n.menu-glyph>svg{display:block;width:100%;height:100%;fill:none;stroke:currentColor;stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round}\n.nav-demo .arrow-left{transform:rotate(90deg)}.nav-demo .arrow-right{transform:rotate(-90deg)}\n.nav-track{position:relative;display:flex;isolation:isolate}\n.nav-track button{position:relative;z-index:1;flex:1;min-width:0;min-height:48px;padding:8px 3px;color:#aebbb4;transition:color 160ms ease;white-space:nowrap}\n.nav-track button[aria-selected=true]{color:#f2f5f2}\n.nav-track button:hover{color:#fff}\n.nav-indicator{position:absolute;left:0;bottom:0;width:var(--indicator-width,33.333%);transform:translateX(var(--indicator-x,0px));background:#d5dfd8;pointer-events:none}\n[data-ready=true] .nav-indicator,[data-ready=true] .page-indicator{transition:transform 260ms var(--nav-ease),width 260ms var(--nav-ease)}\n.underline-track{margin:0 16px;border-bottom:1px solid #ffffff13}\n.underline-track .nav-indicator{height:2px;border-radius:3px;bottom:-1px}\n.nav-content{min-height:181px;padding:23px 20px}\n.nav-eyebrow{font-size:9px;letter-spacing:.1em;color:#9badA3}\n.nav-content h3{margin:12px 0 8px;font-size:19px;font-weight:500;letter-spacing:-.025em}\n.nav-content p{font-size:12px;color:#b6c1bb;line-height:1.6;margin:0;max-width:225px}\n.project-meta{display:flex;align-items:center;gap:6px;font-size:9px;color:#a6b6ac;margin-top:20px;white-space:nowrap}\n.status-dot{width:5px;height:5px;border-radius:50%;background:#b7cdbd}.meta-line{width:1px;height:10px;background:#ffffff25;margin:0 4px}\n.document-row{display:flex;align-items:center;gap:10px;min-height:48px}.document-row+.document-row{border-top:1px solid #ffffff0e}\n.document-row>.menu-glyph{color:#b9c8bf}.document-row strong,.activity-line strong{font-size:12px;font-weight:450;display:block}\n.document-row small,.activity-line small{display:block;font-size:10px;color:#a7b6ad;margin-top:4px}\n.activity-line{display:flex;position:relative;align-items:center;gap:14px;min-height:58px}.activity-line>span{width:7px;height:7px;border-radius:50%;border:1px solid #b8c9be}.activity-line:first-child:after{content:'';position:absolute;top:34px;left:3px;height:47px;width:1px;background:#9aafa13a}\n.segment-track{margin:12px;padding:3px;border:1px solid #ffffff0c;border-radius:12px;background:#161a18}\n.segment-track button{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:5px;min-height:57px;font-size:11px}\n.segment-track .menu-glyph{width:22px;height:22px}\n.segment-track .nav-indicator{top:3px;bottom:3px;border-radius:9px;background:#363e39;box-shadow:inset 0 1px #ffffff0e}\n.view-surface .nav-content{min-height:173px;padding:0 18px 18px}\n.mini-board{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:6px;padding-top:10px;min-height:150px}\n.mini-board>div{background:#171c19;border:1px solid #ffffff07;border-radius:8px;padding:10px 5px}\n.mini-board small{font-size:7px;color:#a8b9ae;letter-spacing:.025em}.mini-board span{display:block;font-size:10px;padding:12px 3px;margin-top:10px;border-radius:5px;background:#354039}\n.mini-timeline{padding-top:10px}.mini-timeline>div{position:relative;height:39px;display:grid;grid-template-columns:60px 1fr;align-items:center;border-bottom:1px solid #ffffff08;gap:8px}.mini-timeline span{font-size:10px;color:#c0cdc4}.mini-timeline b{display:block;height:14px;width:48%;border-radius:5px;background:#b9c9bd}.mini-timeline>div:nth-child(2) b{margin-left:26%;background:#859b8d}.mini-timeline>div:nth-child(3) b{margin-left:65%;width:35%;background:#52695c}.mini-timeline footer{display:flex;justify-content:space-between;margin-left:68px;padding-top:10px}.mini-timeline footer span{font-size:8px;color:#8fa597}\n.trail-surface{padding:18px 16px}.folder-trail{display:flex;align-items:center;gap:4px;list-style:none;margin:0;padding:0 0 16px;border-bottom:1px solid #ffffff15;min-height:44px}.folder-trail li{display:flex;align-items:center;gap:3px;min-width:0}.folder-trail button,.folder-trail [aria-current]{font-size:11px;white-space:nowrap;padding:6px 2px}.folder-trail button{color:#9eb2a5}.folder-trail .menu-glyph{width:12px;height:12px;transform:rotate(-90deg);color:#819589}.trail-body{min-height:145px;padding-top:10px}.trail-folder{display:flex;gap:10px;align-items:center;text-align:left;width:100%;min-height:44px;border-radius:8px}.trail-folder .menu-glyph{color:#c1cec5}.trail-folder span{flex:1}.trail-folder:hover span{color:#c4d8cc}.trail-folder>.arrow-right{width:16px;height:16px;color:#8fa396}.trail-note{margin:10px 0 0;color:#9fafA5;font-size:10px;line-height:1.5;min-height:15px}\n.pages-surface{padding:20px 16px 15px}.collection-heading{display:flex;justify-content:space-between;align-items:center;gap:10px;margin-bottom:13px}.collection-heading strong{font-size:13px;font-weight:500}.collection-heading>span{font-size:10px;color:#a6b8ab;font-variant-numeric:tabular-nums}.page-files{min-height:112px}.page-files .document-row{min-height:53px}.pagination{display:flex;align-items:center;gap:6px;justify-content:space-between;padding-top:13px;border-top:1px solid #ffffff12}.pagination>button{width:28px;height:36px;display:grid;place-items:center;padding:0}.pagination .menu-glyph{width:20px;height:20px}.page-numbers{display:flex;position:relative;isolation:isolate;flex:1;max-width:190px}.page-numbers button{position:relative;flex:1;min-width:0;height:34px;font-size:12px;z-index:1}.page-indicator{position:absolute;top:0;bottom:0;left:0;width:20%;border:1px solid #b0c4b955;background:#c6d5cb0c;border-radius:50%;transform:translateX(var(--page-x,0px))}\n.sidebar-surface{display:grid;grid-template-columns:116px minmax(0,1fr);min-height:242px;transition:grid-template-columns 260ms var(--nav-ease)}\n.side-rail{padding:12px 6px;border-right:1px solid #ffffff12;min-width:0;overflow:hidden}.rail-toggle{display:grid;place-items:center;width:40px;height:36px;margin:0 0 13px 3px}.rail-toggle .menu-glyph{width:20px;height:20px;transition:transform 240ms var(--nav-ease)}\n.side-links{position:relative}.side-links button{display:flex;align-items:center;gap:9px;width:100%;height:44px;padding:0 7px;color:#a6b9ad}.side-links button .menu-glyph{width:23px;height:23px}.side-links button span{font-size:11px;transition:opacity 130ms ease;white-space:nowrap}.side-links button[aria-current]{color:#f3f6f4}.side-marker{position:absolute;left:-6px;top:11px;width:2px;height:22px;border-radius:3px;background:#c4d7ca;transform:translateY(var(--side-y,0px));transition:transform 240ms var(--nav-ease)}\n.side-content{padding:24px 14px;min-width:0}.side-content>.menu-glyph{width:28px;height:28px;color:#b8ccbf}.side-content h3{font-weight:500;font-size:15px;margin:18px 0 10px}.side-content p{font-size:11px;line-height:1.6;color:#aabcb0;margin:0}.side-content small{display:block;margin-top:24px;font-size:9px;color:#a2b6a9}\n[data-collapsed=true] .sidebar-surface{grid-template-columns:53px minmax(0,1fr)}[data-collapsed=true] .side-links button span{opacity:0;pointer-events:none}[data-collapsed=true] .rail-toggle .menu-glyph{transform:rotate(-90deg)}\n@media(max-width:420px){.nav-content{padding-inline:14px}.project-meta{font-size:8px;gap:4px}.sidebar-surface{grid-template-columns:104px minmax(0,1fr)}.side-content{padding-inline:10px}.folder-trail{gap:1px}.folder-trail button,.folder-trail [aria-current]{font-size:10px}.pagination{gap:2px}}\n@media(prefers-reduced-motion:reduce){.nav-demo *,.nav-demo *::after{transition:none!important;animation:none!important}}\n\n\nbody{margin:0;min-height:100svh;display:grid;place-items:center;background:#edf0f1}.nav-demo{width:min(320px,calc(100vw - 32px))}.sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%)}";
const api27 = (() => {
function mount(element){
const life=new AbortController(),signal=life.signal;
const motion=matchMedia('(prefers-reduced-motion: reduce)');
const animations=new Map(),controls=new Map(),observers=[];
function reveal(node){
 animations.get(node)?.cancel();
 if(motion.matches)return;
 const animation=node.animate([{opacity:.5,transform:'translateY(4px)'},{opacity:1,transform:'translateY(0)'}],{duration:180,easing:'cubic-bezier(.22,.61,.36,1)'});
 animations.set(node,animation);animation.onfinish=()=>animations.delete(node);
}
// Reuse our embedded contours; there is no remote icon request or stock library.
const icons={"file":"<i class=\"menu-glyph \" data-icon=\"file\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"M7 4h10l6 6v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm10 0v6h6\"/></svg></i>","folder":"<i class=\"menu-glyph \" data-icon=\"folder\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"M4.5 9a2 2 0 0 1 2-2h5l2.5 3h7.5a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-15a2 2 0 0 1-2-2Z\"/></svg></i>","chevron":"<i class=\"menu-glyph \" data-icon=\"chevron\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"m8 11 6 6 6-6\"/></svg></i>","pin":"<i class=\"menu-glyph \" data-icon=\"pin\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"m17 4 7 7c-4 0-6 2-7 7l-3-3-5 1-4-4c5-1 7-3 7-7l5-1ZM10 18l-6 6\"/></svg></i>"};
const row=(name,sub)=>'<div class="document-row">'+icons.file+'<div><strong>'+name+'</strong><small>'+sub+'</small></div></div>';
for(const root of [element]){
 const kind=root.dataset.navigation;
 if(['tabs','views'].includes(kind)){
  const track=root.querySelector('.nav-track'),buttons=[...track.querySelectorAll('[role=tab]')],panels=[...root.querySelectorAll('[role=tabpanel]')];let selected=0;
  function position(){const b=buttons[selected];track.style.setProperty('--indicator-x',b.offsetLeft+'px');track.style.setProperty('--indicator-width',b.offsetWidth+'px');}
  function select(i,animate=true){selected=i;buttons.forEach((b,j)=>{b.setAttribute('aria-selected',String(i===j));b.tabIndex=i===j?0:-1;panels[j].hidden=i!==j;animations.get(panels[j])?.cancel();});position();if(animate)reveal(panels[i]);}
  buttons.forEach((b,i)=>b.addEventListener('click',()=>{if(i!==selected)select(i);},{signal}));
  track.addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;e.preventDefault();const i=e.key==='Home'?0:e.key==='End'?buttons.length-1:(selected+(e.key==='ArrowRight'?1:-1)+buttons.length)%buttons.length;select(i);buttons[i].focus();},{signal});
  const observer=new ResizeObserver(position);observer.observe(track);observers.push(observer);select(0,false);controls.set(kind,()=>select(0));
 }else if(kind==='breadcrumbs'){
  const trail=root.querySelector('[data-trail]'),body=root.querySelector('[data-folder-content]'),note=root.querySelector('[data-folder-note]');let depth=1;
  const paths=['Studio','Projects','Design'];
  function paint(focus=false){
   trail.innerHTML=paths.slice(0,depth+1).map((name,i)=>'<li>'+(i?icons.chevron:'')+(i===depth?'<span aria-current="page">'+name+'</span>':'<button type="button" data-depth="'+i+'">'+name+'</button>')+'</li>').join('');
   body.innerHTML=depth===0?'<button type="button" class="trail-folder" data-drill>'+icons.folder+'<span>Projects</span>'+icons.chevron+'</button>':depth===1?'<button type="button" class="trail-folder" data-drill>'+icons.folder+'<span>Design</span>'+icons.chevron+'</button>'+row('Project brief','Document'):row('Color palette','Design document')+row('Components','Design document');
   note.textContent=depth===2?'Two files in Design.':'Open a folder to explore.';reveal(body);
   if(focus){const target=body.querySelector('button')||[...trail.querySelectorAll('button')].at(-1);target?.focus({preventScroll:true});}
  }
  root.addEventListener('click',e=>{const parent=e.target.closest('[data-depth]'),child=e.target.closest('[data-drill]');if(parent)depth=Number(parent.dataset.depth);else if(child)depth=Math.min(2,depth+1);else return;paint(true);},{signal});
  paint();controls.set(kind,()=>{depth=1;paint();});
 }else if(kind==='pages'){
  const buttons=[...root.querySelectorAll('[data-page]')],track=root.querySelector('.page-numbers'),previous=root.querySelector('[data-previous]'),next=root.querySelector('[data-next]'),files=root.querySelector('[data-page-files]');let page=1;
  const names=['Project brief','Research notes','Color palette','Typography','Components','Wireframes','Prototype','Motion study','Review notes','Final handoff'];
  function position(){track.style.setProperty('--page-x',buttons[page-1].offsetLeft+'px');}
  function select(n,animate=true){page=Math.max(1,Math.min(5,n));buttons.forEach((b,i)=>{if(i+1===page)b.setAttribute('aria-current','page');else b.removeAttribute('aria-current');});previous.disabled=page===1;next.disabled=page===5;root.querySelector('[data-page-summary]').textContent=(page*2-1)+'–'+(page*2)+' of 10';files.innerHTML=names.slice((page-1)*2,page*2).map(name=>row(name,'Studio project')).join('');position();if(animate)reveal(files);}
  buttons.forEach((b,i)=>b.addEventListener('click',()=>{if(page!==i+1)select(i+1);},{signal}));previous.addEventListener('click',()=>{select(page-1);if(previous.disabled)buttons[0].focus();},{signal});next.addEventListener('click',()=>{select(page+1);if(next.disabled)buttons[4].focus();},{signal});
  const observer=new ResizeObserver(position);observer.observe(track);observers.push(observer);select(1,false);controls.set(kind,()=>select(1));
 }else if(kind==='sidebar'){
  const buttons=[...root.querySelectorAll('[data-section]')],content=root.querySelector('[data-side-content]'),toggle=root.querySelector('[data-collapse]');let selected=0;
  const sections=[['Projects','A place for your next idea.','Three active projects','folder'],['Files','Everything you need, together.','Ten project files','file'],['Saved','Keep the details that matter.','Four saved items','pin']];
  function select(i,animate=true){selected=i;buttons.forEach((b,j)=>{if(i===j)b.setAttribute('aria-current','page');else b.removeAttribute('aria-current');});root.style.setProperty('--side-y',i*44+'px');const [title,desc,count,icon]=sections[i];content.innerHTML=icons[icon]+'<h3>'+title+'</h3><p>'+desc+'</p><small>'+count+'</small>';if(animate)reveal(content);}
  function collapse(value){root.dataset.collapsed=String(value);toggle.setAttribute('aria-expanded',String(!value));toggle.setAttribute('aria-label',value?'Expand navigation':'Collapse navigation');}
  buttons.forEach((b,i)=>b.addEventListener('click',()=>{if(i!==selected)select(i);},{signal}));toggle.addEventListener('click',()=>collapse(root.dataset.collapsed!=='true'),{signal});select(0,false);controls.set(kind,()=>{collapse(false);select(0);});
 }
 const frame=requestAnimationFrame(()=>root.dataset.ready='true');signal.addEventListener('abort',()=>cancelAnimationFrame(frame),{once:true});
}

motion.addEventListener('change',()=>{if(motion.matches){animations.forEach(a=>a.cancel());animations.clear();}},{signal});
return {reset(){controls.get(element.dataset.navigation)?.();},destroy(){life.abort();observers.forEach(o=>o.disconnect());animations.forEach(a=>a.cancel());animations.clear();}};
}
return { mount };
})();

const style21 = "\n.nav-demo{width:min(320px,100%);min-width:0;--nav-ease:cubic-bezier(.22,.61,.36,1);color:#eef1ee;font-family:'Instrument Sans',sans-serif;font-size:13px}\n.navigation-review .skip-link:not(:focus){clip-path:inset(100%)}\n@media(max-width:420px){.navigation-review .header-inner{padding-inline:16px;gap:10px}.navigation-review .wordmark{font-size:18px;white-space:nowrap}.navigation-review .navigation{gap:2px}.navigation-review .nav-item{padding-inline:5px;font-size:11px;gap:4px}}\n.nav-demo *{box-sizing:border-box}.nav-demo [hidden]{display:none!important}\n.nav-surface{border:1px solid #ffffff16;border-radius:17px;background:#202423;box-shadow:inset 0 1px #ffffff08,0 3px 6px #00000015;overflow:hidden}\n.nav-demo button{font:inherit;color:inherit;cursor:pointer;border:0;background:transparent;-webkit-tap-highlight-color:transparent}\n.nav-demo button:focus-visible,.nav-content:focus-visible{outline:2px solid #becdc5;outline-offset:-3px;border-radius:7px}\n.nav-demo button:disabled{opacity:.3;cursor:default}\n.menu-glyph{display:inline-flex;flex:none;align-items:center;justify-content:center;width:24px;height:24px;pointer-events:none;vertical-align:middle}\n.menu-glyph>svg{display:block;width:100%;height:100%;fill:none;stroke:currentColor;stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round}\n.nav-demo .arrow-left{transform:rotate(90deg)}.nav-demo .arrow-right{transform:rotate(-90deg)}\n.nav-track{position:relative;display:flex;isolation:isolate}\n.nav-track button{position:relative;z-index:1;flex:1;min-width:0;min-height:48px;padding:8px 3px;color:#aebbb4;transition:color 160ms ease;white-space:nowrap}\n.nav-track button[aria-selected=true]{color:#f2f5f2}\n.nav-track button:hover{color:#fff}\n.nav-indicator{position:absolute;left:0;bottom:0;width:var(--indicator-width,33.333%);transform:translateX(var(--indicator-x,0px));background:#d5dfd8;pointer-events:none}\n[data-ready=true] .nav-indicator,[data-ready=true] .page-indicator{transition:transform 260ms var(--nav-ease),width 260ms var(--nav-ease)}\n.underline-track{margin:0 16px;border-bottom:1px solid #ffffff13}\n.underline-track .nav-indicator{height:2px;border-radius:3px;bottom:-1px}\n.nav-content{min-height:181px;padding:23px 20px}\n.nav-eyebrow{font-size:9px;letter-spacing:.1em;color:#9badA3}\n.nav-content h3{margin:12px 0 8px;font-size:19px;font-weight:500;letter-spacing:-.025em}\n.nav-content p{font-size:12px;color:#b6c1bb;line-height:1.6;margin:0;max-width:225px}\n.project-meta{display:flex;align-items:center;gap:6px;font-size:9px;color:#a6b6ac;margin-top:20px;white-space:nowrap}\n.status-dot{width:5px;height:5px;border-radius:50%;background:#b7cdbd}.meta-line{width:1px;height:10px;background:#ffffff25;margin:0 4px}\n.document-row{display:flex;align-items:center;gap:10px;min-height:48px}.document-row+.document-row{border-top:1px solid #ffffff0e}\n.document-row>.menu-glyph{color:#b9c8bf}.document-row strong,.activity-line strong{font-size:12px;font-weight:450;display:block}\n.document-row small,.activity-line small{display:block;font-size:10px;color:#a7b6ad;margin-top:4px}\n.activity-line{display:flex;position:relative;align-items:center;gap:14px;min-height:58px}.activity-line>span{width:7px;height:7px;border-radius:50%;border:1px solid #b8c9be}.activity-line:first-child:after{content:'';position:absolute;top:34px;left:3px;height:47px;width:1px;background:#9aafa13a}\n.segment-track{margin:12px;padding:3px;border:1px solid #ffffff0c;border-radius:12px;background:#161a18}\n.segment-track button{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:5px;min-height:57px;font-size:11px}\n.segment-track .menu-glyph{width:22px;height:22px}\n.segment-track .nav-indicator{top:3px;bottom:3px;border-radius:9px;background:#363e39;box-shadow:inset 0 1px #ffffff0e}\n.view-surface .nav-content{min-height:173px;padding:0 18px 18px}\n.mini-board{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:6px;padding-top:10px;min-height:150px}\n.mini-board>div{background:#171c19;border:1px solid #ffffff07;border-radius:8px;padding:10px 5px}\n.mini-board small{font-size:7px;color:#a8b9ae;letter-spacing:.025em}.mini-board span{display:block;font-size:10px;padding:12px 3px;margin-top:10px;border-radius:5px;background:#354039}\n.mini-timeline{padding-top:10px}.mini-timeline>div{position:relative;height:39px;display:grid;grid-template-columns:60px 1fr;align-items:center;border-bottom:1px solid #ffffff08;gap:8px}.mini-timeline span{font-size:10px;color:#c0cdc4}.mini-timeline b{display:block;height:14px;width:48%;border-radius:5px;background:#b9c9bd}.mini-timeline>div:nth-child(2) b{margin-left:26%;background:#859b8d}.mini-timeline>div:nth-child(3) b{margin-left:65%;width:35%;background:#52695c}.mini-timeline footer{display:flex;justify-content:space-between;margin-left:68px;padding-top:10px}.mini-timeline footer span{font-size:8px;color:#8fa597}\n.trail-surface{padding:18px 16px}.folder-trail{display:flex;align-items:center;gap:4px;list-style:none;margin:0;padding:0 0 16px;border-bottom:1px solid #ffffff15;min-height:44px}.folder-trail li{display:flex;align-items:center;gap:3px;min-width:0}.folder-trail button,.folder-trail [aria-current]{font-size:11px;white-space:nowrap;padding:6px 2px}.folder-trail button{color:#9eb2a5}.folder-trail .menu-glyph{width:12px;height:12px;transform:rotate(-90deg);color:#819589}.trail-body{min-height:145px;padding-top:10px}.trail-folder{display:flex;gap:10px;align-items:center;text-align:left;width:100%;min-height:44px;border-radius:8px}.trail-folder .menu-glyph{color:#c1cec5}.trail-folder span{flex:1}.trail-folder:hover span{color:#c4d8cc}.trail-folder>.arrow-right{width:16px;height:16px;color:#8fa396}.trail-note{margin:10px 0 0;color:#9fafA5;font-size:10px;line-height:1.5;min-height:15px}\n.pages-surface{padding:20px 16px 15px}.collection-heading{display:flex;justify-content:space-between;align-items:center;gap:10px;margin-bottom:13px}.collection-heading strong{font-size:13px;font-weight:500}.collection-heading>span{font-size:10px;color:#a6b8ab;font-variant-numeric:tabular-nums}.page-files{min-height:112px}.page-files .document-row{min-height:53px}.pagination{display:flex;align-items:center;gap:6px;justify-content:space-between;padding-top:13px;border-top:1px solid #ffffff12}.pagination>button{width:28px;height:36px;display:grid;place-items:center;padding:0}.pagination .menu-glyph{width:20px;height:20px}.page-numbers{display:flex;position:relative;isolation:isolate;flex:1;max-width:190px}.page-numbers button{position:relative;flex:1;min-width:0;height:34px;font-size:12px;z-index:1}.page-indicator{position:absolute;top:0;bottom:0;left:0;width:20%;border:1px solid #b0c4b955;background:#c6d5cb0c;border-radius:50%;transform:translateX(var(--page-x,0px))}\n.sidebar-surface{display:grid;grid-template-columns:116px minmax(0,1fr);min-height:242px;transition:grid-template-columns 260ms var(--nav-ease)}\n.side-rail{padding:12px 6px;border-right:1px solid #ffffff12;min-width:0;overflow:hidden}.rail-toggle{display:grid;place-items:center;width:40px;height:36px;margin:0 0 13px 3px}.rail-toggle .menu-glyph{width:20px;height:20px;transition:transform 240ms var(--nav-ease)}\n.side-links{position:relative}.side-links button{display:flex;align-items:center;gap:9px;width:100%;height:44px;padding:0 7px;color:#a6b9ad}.side-links button .menu-glyph{width:23px;height:23px}.side-links button span{font-size:11px;transition:opacity 130ms ease;white-space:nowrap}.side-links button[aria-current]{color:#f3f6f4}.side-marker{position:absolute;left:-6px;top:11px;width:2px;height:22px;border-radius:3px;background:#c4d7ca;transform:translateY(var(--side-y,0px));transition:transform 240ms var(--nav-ease)}\n.side-content{padding:24px 14px;min-width:0}.side-content>.menu-glyph{width:28px;height:28px;color:#b8ccbf}.side-content h3{font-weight:500;font-size:15px;margin:18px 0 10px}.side-content p{font-size:11px;line-height:1.6;color:#aabcb0;margin:0}.side-content small{display:block;margin-top:24px;font-size:9px;color:#a2b6a9}\n[data-collapsed=true] .sidebar-surface{grid-template-columns:53px minmax(0,1fr)}[data-collapsed=true] .side-links button span{opacity:0;pointer-events:none}[data-collapsed=true] .rail-toggle .menu-glyph{transform:rotate(-90deg)}\n@media(max-width:420px){.nav-content{padding-inline:14px}.project-meta{font-size:8px;gap:4px}.sidebar-surface{grid-template-columns:104px minmax(0,1fr)}.side-content{padding-inline:10px}.folder-trail{gap:1px}.folder-trail button,.folder-trail [aria-current]{font-size:10px}.pagination{gap:2px}}\n@media(prefers-reduced-motion:reduce){.nav-demo *,.nav-demo *::after{transition:none!important;animation:none!important}}\n\n.previous-studies{text-decoration:underline;text-underline-offset:4px;font-size:14px;white-space:nowrap}\n.nav-next h3{font-size:19px;letter-spacing:-.025em;font-weight:500;margin:12px 0 9px}.nav-next p{font-size:12px;line-height:1.65;color:#b2c2b8;margin:0}.nav-next .sr-only{position:absolute;width:1px;height:1px;clip-path:inset(50%);overflow:hidden;white-space:nowrap}\n.steps-surface{padding:22px 18px 16px}.step-track{display:flex;position:relative;isolation:isolate;justify-content:space-between}.step-track:before,.step-line{position:absolute;content:'';top:18px;left:16.666%;right:16.666%;height:1px;background:#63776a;z-index:-1}.step-line{background:#d1e2d6;transform:scaleX(var(--step-progress,0));transform-origin:left;transition:transform 280ms var(--nav-ease)}.step-track button{display:grid;justify-items:center;gap:9px;width:33.333%;font-size:10px;color:#9fb2a5;padding:0}.step-circle{display:grid;place-items:center;width:37px;height:37px;border-radius:50%;border:1px solid #607469;background:#202423;transition:background-color 200ms ease,border-color 200ms ease,color 200ms ease}.step-circle .menu-glyph{width:20px;height:20px}.step-track [aria-current] .step-circle{border-color:#d3e1d7;background:#d3e1d7;color:#28372d}.step-track [data-complete=true] .step-circle{border-color:#b4cbbc;color:#d5e5d9}.step-track [aria-current]{color:#e8f0e9}.step-copy{min-height:149px;padding:18px 0}.step-copy h3{font-size:18px}.step-actions{display:flex;align-items:center;justify-content:space-between;border-top:1px solid #ffffff14;padding-top:11px;gap:8px}.step-actions button{min-height:36px;font-size:12px;padding:5px 8px}.step-actions [data-forward]{display:flex;align-items:center;gap:6px;border:1px solid #c0d2c638;border-radius:9px;padding-inline:12px}.step-actions .menu-glyph{width:16px;height:16px}\n.dock-surface{padding:22px 13px 12px}.dock-content{padding:6px 12px 18px;min-height:185px}.dock-content>.menu-glyph{width:32px;height:32px;color:#bdcec2}.dock-content h3{margin-top:20px}.bottom-dock{position:relative;display:flex;padding:5px;border-radius:15px;background:#151b17;border:1px solid #ffffff0c;isolation:isolate}.bottom-dock button{display:grid;place-items:center;gap:7px;min-width:0;flex:1;padding:10px 3px;font-size:10px;color:#9ab19f;z-index:1;transition:color 180ms ease}.bottom-dock [aria-current]{color:#edf4ed}.dock-indicator{position:absolute;top:5px;bottom:5px;left:0;width:var(--dock-width,33.333%);background:#354039;border-radius:11px;transform:translateX(var(--dock-x,5px));pointer-events:none}[data-ready=true] .dock-indicator{transition:transform 260ms var(--nav-ease),width 260ms var(--nav-ease)}\n.index-surface{padding:20px 15px}.index-heading,.tree-heading{font-size:13px;font-weight:500;padding-bottom:16px;border-bottom:1px solid #ffffff14}.index-layout{display:grid;grid-template-columns:65px minmax(0,1fr);gap:8px;padding-top:15px}.section-index{border-right:1px solid #ffffff10;padding-right:5px}.section-index button{display:flex;align-items:center;gap:6px;width:100%;text-align:left;min-height:39px;font-size:10px;color:#95aa9b;padding:4px 0}.section-index i{width:3px;height:3px;border-radius:3px;background:#799181;transition:height 200ms var(--nav-ease),background-color 200ms ease}.section-index [aria-current]{color:#ebf2ed}.section-index [aria-current] i{height:15px;background:#c7dccd}.reading-pane{height:210px;overflow-y:auto;overscroll-behavior:contain;scrollbar-width:thin;scrollbar-color:#5b7062 transparent;scroll-padding:0;padding:0 7px 0 5px;outline-offset:-2px}.reading-pane section{min-height:210px;padding:5px 0 20px}.reading-pane h3{font-size:17px}.reading-pane p{font-size:11px;line-height:1.7}.reading-pane small{display:block;font-size:10px;line-height:1.6;color:#90a998;padding-top:15px}.reading-pane section:last-child{min-height:210px}\n.collection-window{overflow:hidden;touch-action:pan-y;cursor:grab;outline-offset:-4px}.collection-window:active{cursor:grabbing}.collection-track{display:flex;transform:translateX(calc(var(--slide,0)*-100%));transition:transform 320ms var(--nav-ease);will-change:transform}.collection-slide{flex:0 0 100%;min-width:0;padding:24px 23px 20px;min-height:236px;user-select:none}.slide-emblem{display:grid;place-items:center;width:48px;height:48px;border:1px solid #bdd2c42a;border-radius:14px;margin-bottom:25px;color:#c4d8cb}.slide-emblem .menu-glyph{width:28px;height:28px}.collection-slide h3{font-size:21px}.collection-controls{display:flex;align-items:center;justify-content:space-between;padding:0 16px 14px}.collection-controls>button{display:grid;place-items:center;width:36px;height:36px;border:1px solid #bdd2c424;border-radius:50%}.collection-controls .menu-glyph{width:18px;height:18px}.collection-dots{display:flex;gap:0;align-items:center}.collection-dots button{width:30px;height:34px;display:grid;place-items:center;padding:0}.collection-dots span{width:5px;height:5px;border-radius:6px;background:#607867;transition:width 220ms var(--nav-ease),background-color 220ms ease}.collection-dots [aria-current] span{width:18px;background:#d1e2d6}\n.tree-surface{padding:20px 16px 16px;user-select:none;-webkit-user-select:none}\n.file-tree,.file-tree ul{list-style:none;padding:0;margin:0}\n.file-tree{padding:12px 0;min-height:174px}\n.tree-row{display:flex;align-items:center;gap:8px;min-height:36px;font-size:12px;cursor:pointer;position:relative}\n.tree-row>.menu-glyph{width:20px;height:20px;color:#a6bcad}\n.tree-row>.tree-chevron{width:13px;height:13px;transform:rotate(-90deg);transition:transform 320ms var(--nav-ease)}\n[aria-expanded=true]>.tree-row>.tree-chevron{transform:none}\n.file-tree [role=group]{padding-left:23px;border-left:1px solid #91ab9830;margin-left:6px}\n.file-tree [data-file] .tree-row{gap:8px;font-size:11px;color:#adbfB3;padding-left:4px}\n.file-tree [aria-selected=true]>.tree-row{color:#eef5f0}\n.file-tree [aria-selected=true]>.tree-row:before{content:'';position:absolute;left:-24px;width:2px;height:16px;border-radius:2px;background:#caddcf}\n.file-tree [role=treeitem]:focus{outline:none}\n.file-tree [role=treeitem]:focus-visible>.tree-row{outline:1px solid #c2d7c9;outline-offset:1px;border-radius:6px}\n.tree-detail{padding:13px 2px 0;border-top:1px solid #ffffff14;min-height:57px}\n.tree-detail strong{font-weight:450;font-size:12px;display:block}\n.tree-detail small{display:block;color:#9db2a4;font-size:10px;margin-top:5px}\n@media(max-width:420px){.steps-surface{padding-inline:13px}.step-copy h3{font-size:17px}.index-surface{padding-inline:12px}.index-layout{grid-template-columns:54px minmax(0,1fr);gap:5px}.reading-pane{padding-inline:3px}.reading-pane h3{font-size:15px}.collection-slide{padding-inline:18px}.tree-surface{padding-inline:12px}}\n@media(prefers-reduced-motion:reduce){.nav-next *{transition:none!important;animation:none!important}}\n\nbody{margin:0;min-height:100svh;display:grid;place-items:center;background:#edf0f1}.nav-demo{width:min(320px,calc(100vw - 32px))}.sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%)}";
const api28 = (() => {
function mount(element){
const life=new AbortController(),signal=life.signal,controls=new Map(),observers=[],animations=new Map();
const motion=matchMedia('(prefers-reduced-motion: reduce)');
function reveal(node){animations.get(node)?.cancel();if(motion.matches)return;const a=node.animate([{opacity:.55},{opacity:1}],{duration:180,easing:'ease-out'});animations.set(node,a);a.onfinish=()=>animations.delete(node);}
function current(buttons,index,token){buttons.forEach((b,i)=>{if(i===index)b.setAttribute('aria-current',token);else b.removeAttribute('aria-current');});}
for(const root of [element]){
 const kind=root.dataset.navigation;
 if(kind==='steps'){
  const buttons=[...root.querySelectorAll('[data-step]')],copy=root.querySelector('[data-step-copy]'),back=root.querySelector('[data-back]'),forward=root.querySelector('[data-forward]'),initialForward=forward.innerHTML;let step=0;
  const text=[['Give your idea a home.','Start with a clear project brief and a little room to explore.'],['Make it feel like you.','Choose the details that give your project its own character.'],['Ready for a closer look.','Take a final pass through your work before the next chapter.']];
  function select(i,animate=true){step=Math.max(0,Math.min(2,i));current(buttons,step,'step');root.style.setProperty('--step-progress',step/2);buttons.forEach((b,j)=>b.dataset.complete=String(j<step));back.disabled=step===0;forward.innerHTML=step===2?'Start again':initialForward;copy.innerHTML='<h3>'+text[step][0]+'</h3><p>'+text[step][1]+'</p>';if(animate)reveal(copy);}
  buttons.forEach((b,i)=>b.addEventListener('click',()=>{if(i!==step)select(i);},{signal}));back.addEventListener('click',()=>{select(step-1);if(back.disabled)buttons[0].focus();},{signal});forward.addEventListener('click',()=>select(step===2?0:step+1),{signal});select(0,false);controls.set(kind,()=>select(0));
 }else if(kind==='dock'){
  const buttons=[...root.querySelectorAll('[data-dock]')],dock=root.querySelector('.bottom-dock'),content=root.querySelector('[data-dock-content]');let selected=0;
  const text=[['Your workspace','A quiet place for your next project.'],['Pick up where you left off','Your latest work, always close at hand.'],['Worth keeping','The ideas you want to come back to.']];
  function position(){dock.style.setProperty('--dock-x',buttons[selected].offsetLeft+'px');dock.style.setProperty('--dock-width',buttons[selected].offsetWidth+'px');}
  function select(i,animate=true){selected=i;current(buttons,i,'page');position();content.innerHTML=buttons[i].querySelector('.menu-glyph').outerHTML+'<h3>'+text[i][0]+'</h3><p>'+text[i][1]+'</p>';if(animate)reveal(content);}
  buttons.forEach((b,i)=>b.addEventListener('click',()=>{if(i!==selected)select(i);},{signal}));const o=new ResizeObserver(position);o.observe(dock);observers.push(o);select(0,false);controls.set(kind,()=>select(0));
 }else if(kind==='sections'){
  const buttons=[...root.querySelectorAll('[data-jump]')],pane=root.querySelector('.reading-pane'),sections=[...pane.querySelectorAll('section')];
  const offset=i=>sections[i].getBoundingClientRect().top-pane.getBoundingClientRect().top+pane.scrollTop;
  function sync(){let active=0;sections.forEach((s,i)=>{if(offset(i)<=pane.scrollTop+35)active=i;});current(buttons,active,'location');}
  buttons.forEach((b,i)=>b.addEventListener('click',()=>pane.scrollTo({top:offset(i),behavior:motion.matches?'instant':'smooth'}),{signal}));pane.addEventListener('scroll',sync,{signal,passive:true});const o=new ResizeObserver(sync);o.observe(pane);observers.push(o);sync();controls.set(kind,()=>{pane.scrollTo({top:0,behavior:'instant'});current(buttons,0,'location');});
 }else if(kind==='carousel'){
  const buttons=[...root.querySelectorAll('[data-slide]')],slides=[...root.querySelectorAll('.collection-slide')],window=root.querySelector('.collection-window'),prev=root.querySelector('[data-prev-slide]'),next=root.querySelector('[data-next-slide]');let slide=0,start=null;
  function select(i){slide=Math.max(0,Math.min(2,i));root.style.setProperty('--slide',slide);current(buttons,slide,'true');slides.forEach((s,j)=>{s.inert=j!==slide;s.setAttribute('aria-hidden',String(j!==slide));});prev.disabled=slide===0;next.disabled=slide===2;root.querySelector('[data-slide-status]').textContent=slides[slide].querySelector('h3').textContent+', '+(slide+1)+' of 3';}
  buttons.forEach((b,i)=>b.addEventListener('click',()=>select(i),{signal}));prev.addEventListener('click',()=>{select(slide-1);if(prev.disabled)window.focus();},{signal});next.addEventListener('click',()=>{select(slide+1);if(next.disabled)window.focus();},{signal});
  window.addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;e.preventDefault();select(e.key==='Home'?0:e.key==='End'?2:slide+(e.key==='ArrowRight'?1:-1));},{signal});
  window.addEventListener('pointerdown',e=>{if(!e.isPrimary||e.button!==0)return;start={x:e.clientX,y:e.clientY,id:e.pointerId};window.setPointerCapture(e.pointerId);},{signal});
  window.addEventListener('pointerup',e=>{if(!start||start.id!==e.pointerId)return;const dx=e.clientX-start.x,dy=e.clientY-start.y;start=null;if(Math.abs(dx)>35&&Math.abs(dx)>Math.abs(dy)*1.25)select(slide+(dx<0?1:-1));},{signal});
  window.addEventListener('pointercancel',()=>start=null,{signal});window.addEventListener('lostpointercapture',()=>start=null,{signal});controls.set(kind,()=>{start=null;select(0);});
 }else if(kind==='tree'){
  const tree=root.querySelector('[role=tree]'),items=[...tree.querySelectorAll('[role=treeitem]')],branches=[...tree.querySelectorAll('[data-branch]')],files=[...tree.querySelectorAll('[data-file]')];
  function focus(item){items.forEach(n=>n.tabIndex=n===item?0:-1);item.focus({preventScroll:true});}
  function expand(branch,value,animate=true){
   const group=branch.querySelector('[role=group]');
   // Read the displayed frame before cancelling, so reversing a transition never jumps.
   const height=group.hidden?0:group.getBoundingClientRect().height;
   const opacity=group.hidden?0:Number(getComputedStyle(group).opacity);
   animations.get(group)?.cancel();animations.delete(group);
   if(!value&&group.contains(element.getRootNode().activeElement))focus(branch);
   branch.setAttribute('aria-expanded',String(value));
   group.inert=!value;group.setAttribute('aria-hidden',String(!value));group.hidden=false;
   const target=value?group.scrollHeight:0;
   const settle=()=>{group.hidden=!value;group.style.removeProperty('overflow');};
   if(!animate||motion.matches||Math.abs(height-target)<.1){settle();return;}
   group.style.overflow='hidden';
   const a=group.animate([{height:height+'px',opacity},{height:target+'px',opacity:value?1:0}],{duration:320,easing:'cubic-bezier(.22,.61,.36,1)',fill:'both'});
   animations.set(group,a);
   a.onfinish=()=>{if(animations.get(group)!==a)return;settle();a.cancel();animations.delete(group);};
  }
  branches.forEach(b=>expand(b,b.getAttribute('aria-expanded')==='true',false));
  motion.addEventListener('change',()=>{if(motion.matches)branches.forEach(b=>expand(b,b.getAttribute('aria-expanded')==='true',false));},{signal});
  function choose(item){files.forEach(n=>n.setAttribute('aria-selected',String(n===item)));root.querySelector('[data-file-name]').textContent=item.getAttribute('aria-label');root.querySelector('[data-file-description]').textContent=item.dataset.description;reveal(root.querySelector('.tree-detail'));}
  tree.addEventListener('click',e=>{const item=e.target.closest('[role=treeitem]');if(!item)return;focus(item);if(item.hasAttribute('data-branch'))expand(item,item.getAttribute('aria-expanded')!=='true');else choose(item);},{signal});
  tree.addEventListener('keydown',e=>{const item=e.target.closest('[role=treeitem]');if(!item)return;const visible=items.filter(n=>!n.closest('[hidden],[inert]')),i=visible.indexOf(item),branch=item.hasAttribute('data-branch');
   if(['ArrowDown','ArrowUp','Home','End'].includes(e.key)){e.preventDefault();focus(visible[e.key==='Home'?0:e.key==='End'?visible.length-1:Math.max(0,Math.min(visible.length-1,i+(e.key==='ArrowDown'?1:-1)))]);}
   else if(e.key==='ArrowRight'){e.preventDefault();if(branch){if(item.getAttribute('aria-expanded')==='true')focus(item.querySelector('[data-file]'));else expand(item,true);}}
   else if(e.key==='ArrowLeft'){e.preventDefault();if(branch)expand(item,false);else focus(item.parentElement.closest('[data-branch]'));}
   else if(['Enter',' '].includes(e.key)){e.preventDefault();if(branch)expand(item,item.getAttribute('aria-expanded')!=='true');else choose(item);}
  },{signal});
  controls.set(kind,()=>{branches.forEach((b,i)=>expand(b,i===0,false));items.forEach((n,i)=>n.tabIndex=i===0?0:-1);files.forEach(n=>n.setAttribute('aria-selected','false'));root.querySelector('[data-file-name]').textContent='Select a file';root.querySelector('[data-file-description]').textContent='Explore a folder above.';});
 }
 const frame=requestAnimationFrame(()=>root.dataset.ready='true');signal.addEventListener('abort',()=>cancelAnimationFrame(frame),{once:true});
}

motion.addEventListener('change',()=>{if(motion.matches){animations.forEach(a=>a.cancel());animations.clear();}},{signal});
return {reset(){controls.get(element.dataset.navigation)?.();},destroy(){life.abort();observers.forEach(o=>o.disconnect());animations.forEach(a=>a.cancel());animations.clear();}};
}
return { mount };
})();

const style22 = "\n*{box-sizing:border-box}html,body{margin:0;min-height:100%;font-family:'Instrument Sans',sans-serif;color:#e9efeb;color-scheme:light;background:#edf0f1}body{background:radial-gradient(ellipse at 25% 0%,#f7f8f9,transparent 95%),linear-gradient(145deg,#eef0f2,#e4e7eb)}\nbutton,input{font:inherit}button{cursor:pointer;-webkit-tap-highlight-color:transparent;touch-action:manipulation}button:disabled{cursor:default;opacity:.4}button:focus-visible,input:focus-visible{outline:2px solid #9eb4a6;outline-offset:3px}button{color:inherit}svg{display:block;fill:none;stroke:currentColor;stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round}.menu-glyph{display:inline-flex;width:25px;height:25px;align-items:center;justify-content:center;flex:none;pointer-events:none}.menu-glyph>svg{width:100%;height:100%}\n.overlay-demo{min-height:100svh;position:relative;display:grid;place-items:center;--overlay-ease:cubic-bezier(.22,.61,.36,1)}\n.overlay-launch{width:min(288px,calc(100% - 40px));position:relative;text-align:center}.overlay-trigger{display:flex;justify-content:center;align-items:center;gap:12px;min-height:54px;width:100%;border:1px solid #ffffff16;border-radius:14px;padding:14px 16px;background:#222725;box-shadow:inset 0 1px #ffffff0c,0 3px 6px #0001;font-size:14px;color:#edf2ee;transition:background-color 180ms ease,border-color 180ms ease}.overlay-trigger:hover{background:#2c3430;border-color:#738b7d}.overlay-feedback{position:absolute;left:0;right:0;margin:14px 0 0;color:#556a5e;font-size:11px;line-height:1.6;text-wrap:balance}\n.overlay-panel{margin:0;color:#edf2ee;background:#222725;border:1px solid #eef5ef20;border-radius:18px;box-shadow:inset 0 1px #ffffff09,0 14px 32px #10201724;padding:24px;max-width:none;max-height:calc(100svh - 24px);overflow-y:auto;scrollbar-width:thin;scrollbar-color:#677d70 transparent;font-size:13px;opacity:0;transition:transform 280ms var(--overlay-ease),opacity 180ms ease}\n.overlay-panel h2{font-size:22px;line-height:1.18;font-weight:500;letter-spacing:-.035em;margin:14px 0 10px;padding-right:12px}.overlay-panel p{color:#b4c4ba;line-height:1.6;font-size:12px;margin:0}.overlay-panel::backdrop{background:#17241d45;opacity:0;transition:opacity 220ms ease}\n[data-open=true] .overlay-panel{opacity:1;transform:none}[data-open=true] .overlay-panel::backdrop{opacity:1}\n.overlay-close{display:grid;place-items:center;position:absolute;right:12px;top:12px;width:30px;height:30px;border:0;border-radius:8px;background:transparent;color:#bbcbbf}.overlay-close svg{width:24px;height:24px}.overlay-close:hover{color:white;background:#ffffff08}\n.overlay-emblem{display:grid;place-items:center;width:40px;height:40px;border:1px solid #a3beaf33;border-radius:12px;color:#bdd1c3}.overlay-emblem .menu-glyph{width:25px;height:25px}.overlay-eyebrow{font-size:9px;letter-spacing:.08em;color:#99b3a2;margin:4px 0 19px}\n.overlay-field{display:block;margin-top:24px;color:#b8cabe;font-size:11px}.overlay-field input{display:block;width:100%;min-width:0;min-height:42px;border:1px solid #738d7d6b;border-radius:9px;background:#171e1a;color:#ecf4ed;padding:10px 12px;font-size:13px;margin-top:8px;transition:border-color 160ms ease}.overlay-field input:focus{border-color:#a9c4b2}\n.overlay-actions{display:flex;justify-content:flex-end;align-items:center;gap:8px;margin-top:24px}.overlay-actions button,.overlay-primary{border:1px solid transparent;border-radius:9px;padding:10px 12px;min-height:39px;font-size:12px;background:transparent}.overlay-actions .overlay-primary,.overlay-primary{background:#d3e0d7;color:#23352a;border-color:#e4ece7;transition:background-color 160ms ease}.overlay-primary:hover{background:#e7f0e9}\n[data-overlay=modal] .overlay-panel{position:fixed;inset:0;margin:auto;width:min(310px,calc(100% - 28px));height:fit-content;transform:none;transition:none}\n[data-overlay=modal][data-open=true] .overlay-panel{transform:none;transition:none}\n.genie-layer{position:fixed;inset:0;width:100vw;height:100svh;max-width:none;max-height:none;margin:0;padding:0;border:0;background:transparent;overflow:hidden;pointer-events:none}\n.genie-copy{pointer-events:none;backface-visibility:hidden;contain:layout paint}\n.genie-copy>*{opacity:var(--genie-content,1)}\n.overlay-field input:focus,.overlay-field input:focus-visible{outline:0;box-shadow:none;border-color:#afc7b8}\n.overlay-field input:focus-visible{border-color:#d2e5d9}\n[data-overlay=drawer] .overlay-panel{position:fixed;inset:0 0 0 auto;width:min(300px,calc(100% - 22px));height:100svh;max-height:100svh;border-radius:18px 0 0 18px;transform:translateX(102%);transition:transform 340ms var(--overlay-ease),opacity 220ms ease;padding-top:29px}[data-overlay=drawer][data-open=true] .overlay-panel{transform:none}[data-overlay=drawer] .overlay-panel h2{font-size:23px;margin-top:0}.status-choices{border:0;padding:0;margin:23px 0 0;display:flex;gap:5px}.status-choices legend{padding:0;margin-bottom:9px;font-size:11px;color:#b8cabe}.status-choices label{position:relative;flex:1}.status-choices input,.collection-choices input{position:absolute;opacity:0;width:1px;height:1px}.status-choices label>span{display:block;font-size:10px;text-align:center;border:1px solid #afc6b733;border-radius:8px;padding:10px 2px;cursor:pointer;transition:background-color 160ms ease,border-color 160ms ease}.status-choices input:checked+span{background:#b4cdbb17;border-color:#b4cdbb8a}.status-choices input:focus-visible+span{outline:2px solid #c0d3c5;outline-offset:2px}.drawer-note{display:flex;gap:8px;align-items:center;color:#93ab9c;font-size:10px;margin-top:28px}.drawer-note .menu-glyph{width:17px;height:17px}\n[data-overlay=sheet] .overlay-panel{position:fixed;inset:auto 0 0;width:100%;max-height:calc(100svh - 18px);border-radius:21px 21px 0 0;padding:30px 23px 22px;transform:translateY(102%);transition:transform 340ms var(--overlay-ease),opacity 190ms ease}[data-overlay=sheet][data-open=true] .overlay-panel{transform:translateY(var(--drag-y,0px))}.sheet-handle{position:absolute;top:0;left:calc(50% - 36px);width:72px;height:27px;display:grid;place-items:center;touch-action:none;cursor:grab}.sheet-handle span{width:33px;height:3px;border-radius:4px;background:#a9bfb175}.sheet-handle:active{cursor:grabbing}[data-dragging=true] .overlay-panel{transition:none!important}.collection-choices{border:0;padding:0;margin:18px 0}.collection-choices label{position:relative;display:flex;align-items:center;gap:12px;min-height:57px;padding:10px 0;cursor:pointer}.collection-choices label+label{border-top:1px solid #ffffff0c}.collection-choices label>.menu-glyph{color:#b4caba;width:23px;height:23px}.collection-choices label>span:not(.choice-ring){flex:1}.collection-choices strong{display:block;font-size:12px;font-weight:450}.collection-choices small{display:block;font-size:10px;margin-top:4px;color:#a2b8aa}.choice-ring{width:15px;height:15px;border:1px solid #799282;border-radius:50%;position:relative}.choice-ring:after{content:'';position:absolute;inset:3px;background:#c7dccd;border-radius:50%;opacity:0;transition:opacity 170ms ease}.collection-choices input:checked+.choice-ring:after{opacity:1}.collection-choices input:focus-visible+.choice-ring{outline:2px solid #c0d3c5;outline-offset:3px}.sheet-confirm{width:100%}\n[data-overlay=popover] .overlay-launch{align-self:start;margin-top:64px}\n[data-overlay=popover] .overlay-panel,[data-overlay=tooltip] .overlay-panel{position:absolute;width:min(286px,calc(100% - 28px));left:14px;top:14px;opacity:0;visibility:hidden;transform:translateY(6px);transition:transform 220ms var(--overlay-ease),opacity 160ms ease,visibility 0s 220ms;overflow:visible}\n[data-overlay=popover][data-open=true] .overlay-panel,[data-overlay=tooltip][data-open=true] .overlay-panel{visibility:visible;opacity:1;transform:none;transition-delay:0s}\n[data-overlay=popover] .overlay-panel{padding:23px 20px 14px}[data-overlay=popover] .overlay-panel h2{font-size:18px;margin:0 0 10px}[data-overlay=popover] .overlay-eyebrow{margin-bottom:14px}.popover-footer{display:flex;justify-content:space-between;align-items:center;gap:8px;border-top:1px solid #ffffff14;margin-top:17px;padding-top:11px}.popover-footer>span{font-size:10px;color:#9db6a6}.popover-footer button{display:flex;align-items:center;gap:5px;background:transparent;border:1px solid #9fbcab40;border-radius:8px;padding:6px 9px;font-size:11px}.popover-footer button[aria-pressed=true]{border-color:#bed5c6;color:#dcece1}.popover-footer .menu-glyph{width:17px;height:17px}\n[data-overlay=tooltip] .overlay-panel{width:min(224px,calc(100% - 34px));padding:16px 18px;border-radius:12px;box-shadow:0 6px 16px #15281d1f;transform:translateY(3px);transition:opacity 140ms ease,transform 180ms var(--overlay-ease),visibility 0s 180ms}[data-overlay=tooltip] .overlay-panel strong{display:block;font-size:12px;font-weight:500;margin-bottom:6px}[data-overlay=tooltip] .overlay-panel span{display:block;font-size:11px;line-height:1.55;color:#b4c8ba}[data-overlay=tooltip] .overlay-panel:after{content:'';position:absolute;left:calc(var(--arrow-x,50%) - 5px);bottom:-5px;width:9px;height:9px;background:#222725;border-right:1px solid #eef5ef20;border-bottom:1px solid #eef5ef20;transform:rotate(45deg)}[data-overlay=tooltip] [data-placement=below]:after{bottom:auto;top:-5px;transform:rotate(225deg)}\n.sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}\n[data-overlay=sheet] .overlay-panel{inset:auto 0 12px;margin-inline:auto;width:min(304px,calc(100% - 24px));border-radius:18px;padding:24px 18px 16px}\n[data-overlay=sheet] .overlay-panel h2{font-size:20px;margin:9px 0 7px}\n[data-overlay=sheet] .collection-choices{margin:10px 0 12px}\n[data-overlay=sheet] .collection-choices label{min-height:47px;padding:7px 0;gap:10px}\n[data-overlay=sheet] .sheet-confirm{min-height:39px;padding-block:8px}\n.popover-footer .popover-pin{width:auto;padding:0;margin:0;border:0;background:transparent;box-shadow:none;--check-ink:#222725;--check-paper:#d3e0d7}\n.popover-pin .sl-check{min-height:34px;padding:6px 9px;gap:5px;user-select:none;background:transparent;border:1px solid #9fbcab55;border-radius:8px;transition:border-color 220ms ease}\n.popover-pin .sl-check:has(:checked){border-color:#bed5c6}\n.popover-pin .sl-check__box{width:20px;height:20px;background:transparent;box-shadow:none;border:0;border-radius:0;overflow:visible}\n.popover-pin .sl-check__box::before{display:none}\n.popover-pin .sl-check__input:checked+.sl-check__box svg{stroke:#d3e0d7}\n.popover-pin .sl-check__input:checked+.sl-check__box .mark-icon{fill:#d3e0d733}\n.popover-pin .sl-check__input:focus-visible+.sl-check__box{outline:none}\n.popover-pin .sl-check:has(:focus-visible){outline:1px solid #c0d3c5;outline-offset:2px}\n.popover-pin .sl-check__box svg{width:20px;height:20px}\n.popover-pin .sl-check__title{display:grid;width:40px;line-height:17px;font-size:11px;font-weight:450}\n.popover-pin .sl-check__title>span{grid-area:1/1;transition:opacity 180ms ease,transform 260ms var(--check-ease)}\n.popover-pin .pin-on{opacity:0;transform:translateY(4px)}\n.popover-pin .sl-check__input:checked~.sl-check__copy .pin-on{opacity:1;transform:none}\n.popover-pin .sl-check__input:checked~.sl-check__copy .pin-off{opacity:0;transform:translateY(-4px)}\n@media(max-width:290px){.overlay-panel{padding:21px 17px}.overlay-panel h2{font-size:20px}.overlay-actions{gap:4px}.overlay-actions button{padding-inline:8px;font-size:11px}[data-overlay=drawer] .overlay-panel{padding-inline:17px}[data-overlay=sheet] .overlay-panel{padding-inline:17px}.overlay-trigger{font-size:13px;gap:8px}.overlay-feedback{font-size:10px}}\n@media(prefers-reduced-motion:reduce){*,*::before,*::after,*::backdrop{transition:none!important;animation:none!important}}\n/* Short embedded cards are real viewports too: keep every primary action in view. */\n@media(max-height:450px){\n .overlay-panel{padding:18px;max-height:calc(100svh - 24px)}\n .overlay-panel h2{font-size:20px;margin:10px 0 8px}\n .overlay-emblem{width:32px;height:32px;border-radius:10px}\n .overlay-emblem .menu-glyph{width:22px;height:22px}\n .overlay-field{margin-top:16px}\n .overlay-field input{min-height:38px;padding:8px 10px;margin-top:6px}\n .overlay-actions{margin-top:16px}\n .overlay-actions button,.overlay-primary{min-height:36px;padding:8px 10px}\n [data-overlay=drawer] .overlay-panel{padding:20px 18px 16px}\n [data-overlay=drawer] .overlay-eyebrow{margin:0 0 12px}\n [data-overlay=drawer] .overlay-panel h2{font-size:20px;margin-top:0}\n .status-choices{margin-top:16px}\n .status-choices label>span{padding:8px 2px}\n .drawer-note{margin-top:16px}\n [data-overlay=popover] .overlay-panel{max-height:calc(100svh - 24px);overflow-y:auto}\n}\n@media(max-height:350px){\n [data-overlay=modal] .overlay-panel{padding:16px}\n [data-overlay=modal] .overlay-panel>p{display:none}\n [data-overlay=drawer] .overlay-panel{padding:15px 17px}\n [data-overlay=drawer] .overlay-panel>p,.drawer-note{display:none}\n [data-overlay=drawer] .overlay-eyebrow{margin-bottom:8px}\n [data-overlay=drawer] .overlay-field{margin-top:12px}\n [data-overlay=drawer] .status-choices{margin-top:12px}\n [data-overlay=drawer] .overlay-actions{margin-top:14px}\n [data-overlay=sheet] .overlay-panel{padding:22px 16px 14px}\n [data-overlay=sheet] .collection-choices{margin:8px 0}\n [data-overlay=sheet] .collection-choices label{min-height:43px;padding:5px 0}\n [data-overlay=sheet] .sheet-confirm{min-height:36px}\n}\n\n";
function frameApi0(document,window){
const {AbortController,CustomEvent,ResizeObserver}=window;
const matchMedia=window.matchMedia.bind(window),requestAnimationFrame=window.requestAnimationFrame.bind(window),cancelAnimationFrame=window.cancelAnimationFrame.bind(window);
(() => {
const mounted = new WeakMap();

function mountCheckboxes(root, { onChange } = {}) {
  if (mounted.has(root)) return mounted.get(root);
  if (onChange !== undefined && typeof onChange !== 'function') throw new TypeError('onChange must be a function.');
  const inputs = [...root.querySelectorAll('input[type="checkbox"]')];
  if (!inputs.length) throw new TypeError('Native checkboxes are required.');
  const parent = root.querySelector('[data-parent]');
  const children = [...root.querySelectorAll('[data-child]')];
  const lifecycle = new AbortController();
  let destroyed = false;
  const values = () => inputs.filter(input => input !== parent && input.checked).map(input => input.name);
  function syncParent() {
    if (!parent || !children.length) return;
    const count = children.filter(input => input.checked).length;
    parent.checked = count === children.length;
    parent.indeterminate = count > 0 && count < children.length;
  }
  function change(event) {
    if (!inputs.includes(event.target)) return;
    if (event.target === parent) for (const child of children) { if (!child.disabled) child.checked = parent.checked; }
    syncParent();
    onChange?.(values());
    root.dispatchEvent(new CustomEvent('selectionchange', { bubbles: true, detail: { values: values() } }));
  }
  const reset = () => {
    if (destroyed) return;
    for (const input of inputs) input.checked = input.defaultChecked;
    syncParent();
  };
  root.addEventListener('change', change, { signal: lifecycle.signal });
  const form = inputs[0].form;
  form?.addEventListener('reset', () => queueMicrotask(reset), { signal: lifecycle.signal });
  syncParent();
  const controller = { reset, get values() { return values(); }, destroy() { destroyed = true; lifecycle.abort(); mounted.delete(root); } };
  mounted.set(root, controller);
  return controller;
}

window.MatteCheckboxes = { mount: mountCheckboxes };
})();

// Compatibility export for existing packages; the former Genie effect is removed.
// A native dialog now opens with a small, ordinary scale/translate and opacity.
function createGenie(root,panel,trigger,media){
 const view=root.ownerDocument.defaultView,closed='translateY(12px) scale(.96)';
 let animation=null,state=0,targetState=0,pending=Promise.resolve(),resolveRun=null;
 function settle(target){
  state=target;animation?.cancel();animation=null;
  panel.style.opacity=String(target);panel.style.transform=target?'none':closed;
 }
 function run(target,instant=false){
  if(animation&&target===targetState&&!instant&&!media.matches)return pending;
  const current=animation?view.getComputedStyle(panel):null;
  const from={opacity:current?current.opacity:String(state),transform:current?current.transform:(state?'none':closed)};
  resolveRun?.();resolveRun=null;animation?.cancel();animation=null;targetState=target;
  if(instant||media.matches){settle(target);return Promise.resolve();}
  panel.style.opacity=from.opacity;panel.style.transform=from.transform;
  animation=panel.animate([from,{opacity:String(target),transform:target?'none':closed}],{duration:220,easing:'cubic-bezier(.22,.61,.36,1)',fill:'forwards'});
  const active=animation;
  pending=new Promise(resolve=>{resolveRun=resolve;active.finished.then(()=>{
   if(animation!==active)return;settle(target);resolveRun=null;resolve();
  }).catch(()=>{});});
  return pending;
 }
 return {run,get progress(){return state;},destroy(){resolveRun?.();resolveRun=null;animation?.cancel();animation=null;panel.style.removeProperty('opacity');panel.style.removeProperty('transform');}};
}

const mounted=new WeakMap();
function mountOverlay(root,{onCommit}={}){
 if(mounted.has(root))return mounted.get(root);
 const doc=root.ownerDocument,view=doc.defaultView,life=new AbortController(),signal=life.signal;
 const trigger=root.querySelector('[data-trigger]'),panel=root.querySelector('.overlay-panel'),feedback=root.querySelector('[data-feedback]'),form=root.querySelector('form'),kind=root.dataset.overlay;
 const modal=panel.tagName==='DIALOG',tip=kind==='tooltip',initialFeedback=feedback.textContent,media=view.matchMedia('(prefers-reduced-motion: reduce)');
 const genie=kind==='modal'?createGenie(root,panel,trigger,media):null;
 let opened=false,destroyed=false,revision=0,hoverTrigger=false,hoverTip=false,focused=false,pinned=false,dismissed=false,showTimer,hideTimer,drag=null,backdropDown=false;
 function clearTimers(){view.clearTimeout(showTimer);view.clearTimeout(hideTimer);}
 function position(){
  if(kind==='modal'&&panel.open){
   const button=trigger.getBoundingClientRect();
   panel.style.setProperty('--window-origin-x',(button.left+button.width/2-panel.offsetLeft)+'px');
   panel.style.setProperty('--window-origin-y',(button.top+button.height/2-panel.offsetTop)+'px');
  }
  if(modal)return;
  const r=root.getBoundingClientRect(),b=trigger.getBoundingClientRect(),p=panel.getBoundingClientRect();
  const left=Math.max(12,Math.min(b.x-r.x+(b.width-p.width)/2,r.width-p.width-12));
  const above=b.top-r.top-p.height-12,below=b.bottom-r.top+12;
  const top=above>=12?above:Math.min(below,r.height-p.height-12);
  panel.dataset.placement=above>=12?'above':'below';panel.style.left=left+'px';panel.style.top=Math.max(12,top)+'px';panel.style.setProperty('--arrow-x',Math.max(14,Math.min(p.width-14,b.x-r.x+b.width/2-left))+'px');
 }
 function open(){
  if(destroyed)return;clearTimers();revision++;opened=true;
  if(modal&&!panel.open){panel.inert=false;panel.showModal();panel.getBoundingClientRect();}
  panel.inert=false;panel.removeAttribute('aria-hidden');position();root.dataset.open='true';
  genie?.run(1);
  if(!tip)trigger.setAttribute('aria-expanded','true');
  if(!tip){
   const field=panel.querySelector('input');
   (field||panel.querySelector('[data-close]'))?.focus({preventScroll:true});
   if(field?.name==='project')field.select();
  }
 }
 function close({restoreFocus=true,instant=false}={}){
  clearTimers();const token=++revision;opened=false;root.dataset.open='false';
  if(!tip)trigger.setAttribute('aria-expanded','false');
  if(modal){
   if(!panel.open)return;
   panel.inert=true;
   const finish=()=>{
    if(destroyed||opened||revision!==token)return;
    const returnFocus=restoreFocus&&doc.hasFocus(),disabled=trigger.disabled;
    // Native close() restores the opener even after the user moved to another iframe.
    // Temporarily make it unfocusable, then explicitly restore only in the active preview.
    trigger.disabled=true;panel.close();trigger.disabled=disabled;panel.inert=false;
    if(returnFocus&&!disabled)trigger.focus({preventScroll:true});
   };
   if(genie){genie.run(0,instant).then(finish);}else if(instant||media.matches)finish();else Promise.allSettled(panel.getAnimations().map(a=>a.finished)).then(finish);
  }else{
   if(!tip&&panel.contains(doc.activeElement)&&restoreFocus)trigger.focus({preventScroll:true});
   panel.inert=!tip;panel.setAttribute('aria-hidden','true');
  }
 }
 trigger.addEventListener('click',()=>{
  if(tip){pinned=!pinned;dismissed=!pinned;pinned?open():close();return;}
  if(opened)close();else open();
 },{signal});
 panel.querySelectorAll('[data-close]').forEach(b=>b.addEventListener('click',()=>close(),{signal}));
 if(modal){
  const outside=e=>{const r=panel.getBoundingClientRect();return e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom;};
  panel.addEventListener('cancel',e=>{e.preventDefault();close();},{signal});
  panel.addEventListener('keydown',e=>{
   if(e.key!=='Tab'||!opened)return;
   const stops=[...panel.querySelectorAll('button,input,select,textarea,[tabindex]')].filter(n=>!n.disabled&&n.tabIndex>=0&&n.getClientRects().length);
   const first=stops[0],last=stops.at(-1);
   if((e.shiftKey&&doc.activeElement===first)||(!e.shiftKey&&doc.activeElement===last)){e.preventDefault();(e.shiftKey?last:first)?.focus({preventScroll:true});}
  },{signal});
  panel.addEventListener('pointerdown',e=>backdropDown=e.target===panel&&outside(e),{signal});
  panel.addEventListener('click',e=>{if(backdropDown&&e.target===panel&&outside(e))close();backdropDown=false;},{signal});
  panel.addEventListener('close',()=>{if(panel.open||!opened)return;opened=false;root.dataset.open='false';trigger.setAttribute('aria-expanded','false');},{signal});
 }else{
  doc.addEventListener('pointerdown',e=>{if(opened&&!panel.contains(e.target)&&!trigger.contains(e.target)){pinned=false;dismissed=true;close({restoreFocus:false});}},{signal});
  doc.addEventListener('keydown',e=>{if(e.key==='Escape'&&opened){e.preventDefault();pinned=false;dismissed=true;close();}},{signal});
  if(!tip){
   root.addEventListener('focusout',e=>{if(opened&&e.relatedTarget&&!root.contains(e.relatedTarget))close({restoreFocus:false});},{signal});
   view.addEventListener('blur',()=>{if(opened)close({restoreFocus:false});},{signal});
  }
 }
 if(tip){
  const hideIfAway=()=>{view.clearTimeout(hideTimer);hideTimer=view.setTimeout(()=>{if(!hoverTrigger&&!hoverTip&&!focused&&!pinned)close({restoreFocus:false});},140);};
  trigger.addEventListener('pointerenter',e=>{if(e.pointerType==='touch')return;hoverTrigger=true;dismissed=false;view.clearTimeout(hideTimer);showTimer=view.setTimeout(()=>{if(hoverTrigger&&!dismissed)open();},180);},{signal});
  trigger.addEventListener('pointerleave',()=>{hoverTrigger=false;view.clearTimeout(showTimer);hideIfAway();},{signal});
  trigger.addEventListener('focus',()=>{focused=true;dismissed=false;open();},{signal});
  trigger.addEventListener('blur',()=>{focused=false;hideIfAway();},{signal});
  panel.addEventListener('pointerenter',()=>{hoverTip=true;view.clearTimeout(hideTimer);},{signal});
  panel.addEventListener('pointerleave',()=>{hoverTip=false;hideIfAway();},{signal});
 }
 form?.addEventListener('submit',e=>{
  e.preventDefault();const project=form.elements.namedItem('project');
  if(project){project.value=project.value.trim();if(!project.reportValidity())return;}
  const values=Object.fromEntries(new view.FormData(form));
  feedback.textContent=kind==='modal'?values.project+' created in this preview.':kind==='drawer'?values.project+' · '+values.status+' · Saved locally.':values.collection+' selected in this preview.';
  if(root.dataset.success)feedback.textContent=root.dataset.success.replace(/\{(\w+)\}/g,(_,key)=>values[key]||'');
  root.dispatchEvent(new view.CustomEvent('overlaycommit',{bubbles:true,detail:values}));onCommit?.(values);close();
 },{signal});
 const pin=root.querySelector('[data-pin]');
 const pinControl=pin?view.MatteCheckboxes.mount(pin):null;
 const handle=root.querySelector('[data-drag-handle]');
 if(handle){
  function resetDrag(){drag=null;delete root.dataset.dragging;root.style.removeProperty('--drag-y');}
  handle.addEventListener('pointerdown',e=>{if(!e.isPrimary||e.button!==0||!opened)return;drag={id:e.pointerId,y:e.clientY,dy:0};root.dataset.dragging='true';handle.setPointerCapture(e.pointerId);},{signal});
  handle.addEventListener('pointermove',e=>{if(!drag||drag.id!==e.pointerId)return;drag.dy=Math.max(0,e.clientY-drag.y);root.style.setProperty('--drag-y',drag.dy+'px');},{signal});
  handle.addEventListener('pointerup',()=>{if(!drag)return;const dismiss=drag.dy>55;resetDrag();if(dismiss)close();},{signal});
  handle.addEventListener('pointercancel',resetDrag,{signal});handle.addEventListener('lostpointercapture',resetDrag,{signal});
 }
 const observer=new view.ResizeObserver(()=>{if(opened)position();});observer.observe(root);observer.observe(panel);
 media.addEventListener('change',()=>{if(!media.matches)return;if(genie&&opened)genie.run(1,true);if(!opened&&modal&&panel.open)close({instant:true});},{signal});
 function reset(){pinned=false;dismissed=true;hoverTrigger=hoverTip=focused=false;drag=null;delete root.dataset.dragging;root.style.removeProperty('--drag-y');close({instant:true,restoreFocus:root.contains(doc.activeElement)});form?.reset();feedback.textContent=initialFeedback;pinControl?.reset();}
 const controller={open,close,reset,destroy(){reset();if(modal&&panel.open)panel.close();genie?.destroy();pinControl?.destroy();destroyed=true;revision++;clearTimers();observer.disconnect();life.abort();mounted.delete(root);}};
 mounted.set(root,controller);return controller;
}
window.SLOverlayInstance=mountOverlay(document.querySelector('.overlay-demo'));
window.addEventListener('pagehide',e=>{if(!e.persisted)window.SLOverlayInstance.destroy();});

return window.SLOverlayInstance;
}
const style23 = "\n*{box-sizing:border-box}html,body{margin:0;min-height:100%;font-family:'Instrument Sans',sans-serif;color:#e9efeb;color-scheme:light;background:#edf0f1}body{background:radial-gradient(ellipse at 25% 0%,#f7f8f9,transparent 95%),linear-gradient(145deg,#eef0f2,#e4e7eb)}\nbutton,input{font:inherit}button{cursor:pointer;-webkit-tap-highlight-color:transparent;touch-action:manipulation}button:disabled{cursor:default;opacity:.4}button:focus-visible,input:focus-visible{outline:2px solid #9eb4a6;outline-offset:3px}button{color:inherit}svg{display:block;fill:none;stroke:currentColor;stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round}.menu-glyph{display:inline-flex;width:25px;height:25px;align-items:center;justify-content:center;flex:none;pointer-events:none}.menu-glyph>svg{width:100%;height:100%}\n.overlay-demo{min-height:100svh;position:relative;display:grid;place-items:center;--overlay-ease:cubic-bezier(.22,.61,.36,1)}\n.overlay-launch{width:min(288px,calc(100% - 40px));position:relative;text-align:center}.overlay-trigger{display:flex;justify-content:center;align-items:center;gap:12px;min-height:54px;width:100%;border:1px solid #ffffff16;border-radius:14px;padding:14px 16px;background:#222725;box-shadow:inset 0 1px #ffffff0c,0 3px 6px #0001;font-size:14px;color:#edf2ee;transition:background-color 180ms ease,border-color 180ms ease}.overlay-trigger:hover{background:#2c3430;border-color:#738b7d}.overlay-feedback{position:absolute;left:0;right:0;margin:14px 0 0;color:#556a5e;font-size:11px;line-height:1.6;text-wrap:balance}\n.overlay-panel{margin:0;color:#edf2ee;background:#222725;border:1px solid #eef5ef20;border-radius:18px;box-shadow:inset 0 1px #ffffff09,0 14px 32px #10201724;padding:24px;max-width:none;max-height:calc(100svh - 24px);overflow-y:auto;scrollbar-width:thin;scrollbar-color:#677d70 transparent;font-size:13px;opacity:0;transition:transform 280ms var(--overlay-ease),opacity 180ms ease}\n.overlay-panel h2{font-size:22px;line-height:1.18;font-weight:500;letter-spacing:-.035em;margin:14px 0 10px;padding-right:12px}.overlay-panel p{color:#b4c4ba;line-height:1.6;font-size:12px;margin:0}.overlay-panel::backdrop{background:#17241d45;opacity:0;transition:opacity 220ms ease}\n[data-open=true] .overlay-panel{opacity:1;transform:none}[data-open=true] .overlay-panel::backdrop{opacity:1}\n.overlay-close{display:grid;place-items:center;position:absolute;right:12px;top:12px;width:30px;height:30px;border:0;border-radius:8px;background:transparent;color:#bbcbbf}.overlay-close svg{width:24px;height:24px}.overlay-close:hover{color:white;background:#ffffff08}\n.overlay-emblem{display:grid;place-items:center;width:40px;height:40px;border:1px solid #a3beaf33;border-radius:12px;color:#bdd1c3}.overlay-emblem .menu-glyph{width:25px;height:25px}.overlay-eyebrow{font-size:9px;letter-spacing:.08em;color:#99b3a2;margin:4px 0 19px}\n.overlay-field{display:block;margin-top:24px;color:#b8cabe;font-size:11px}.overlay-field input{display:block;width:100%;min-width:0;min-height:42px;border:1px solid #738d7d6b;border-radius:9px;background:#171e1a;color:#ecf4ed;padding:10px 12px;font-size:13px;margin-top:8px;transition:border-color 160ms ease}.overlay-field input:focus{border-color:#a9c4b2}\n.overlay-actions{display:flex;justify-content:flex-end;align-items:center;gap:8px;margin-top:24px}.overlay-actions button,.overlay-primary{border:1px solid transparent;border-radius:9px;padding:10px 12px;min-height:39px;font-size:12px;background:transparent}.overlay-actions .overlay-primary,.overlay-primary{background:#d3e0d7;color:#23352a;border-color:#e4ece7;transition:background-color 160ms ease}.overlay-primary:hover{background:#e7f0e9}\n[data-overlay=modal] .overlay-panel{position:fixed;inset:0;margin:auto;width:min(310px,calc(100% - 28px));height:fit-content;transform:none;transition:none}\n[data-overlay=modal][data-open=true] .overlay-panel{transform:none;transition:none}\n.genie-layer{position:fixed;inset:0;width:100vw;height:100svh;max-width:none;max-height:none;margin:0;padding:0;border:0;background:transparent;overflow:hidden;pointer-events:none}\n.genie-copy{pointer-events:none;backface-visibility:hidden;contain:layout paint}\n.genie-copy>*{opacity:var(--genie-content,1)}\n.overlay-field input:focus,.overlay-field input:focus-visible{outline:0;box-shadow:none;border-color:#afc7b8}\n.overlay-field input:focus-visible{border-color:#d2e5d9}\n[data-overlay=drawer] .overlay-panel{position:fixed;inset:0 0 0 auto;width:min(300px,calc(100% - 22px));height:100svh;max-height:100svh;border-radius:18px 0 0 18px;transform:translateX(102%);transition:transform 340ms var(--overlay-ease),opacity 220ms ease;padding-top:29px}[data-overlay=drawer][data-open=true] .overlay-panel{transform:none}[data-overlay=drawer] .overlay-panel h2{font-size:23px;margin-top:0}.status-choices{border:0;padding:0;margin:23px 0 0;display:flex;gap:5px}.status-choices legend{padding:0;margin-bottom:9px;font-size:11px;color:#b8cabe}.status-choices label{position:relative;flex:1}.status-choices input,.collection-choices input{position:absolute;opacity:0;width:1px;height:1px}.status-choices label>span{display:block;font-size:10px;text-align:center;border:1px solid #afc6b733;border-radius:8px;padding:10px 2px;cursor:pointer;transition:background-color 160ms ease,border-color 160ms ease}.status-choices input:checked+span{background:#b4cdbb17;border-color:#b4cdbb8a}.status-choices input:focus-visible+span{outline:2px solid #c0d3c5;outline-offset:2px}.drawer-note{display:flex;gap:8px;align-items:center;color:#93ab9c;font-size:10px;margin-top:28px}.drawer-note .menu-glyph{width:17px;height:17px}\n[data-overlay=sheet] .overlay-panel{position:fixed;inset:auto 0 0;width:100%;max-height:calc(100svh - 18px);border-radius:21px 21px 0 0;padding:30px 23px 22px;transform:translateY(102%);transition:transform 340ms var(--overlay-ease),opacity 190ms ease}[data-overlay=sheet][data-open=true] .overlay-panel{transform:translateY(var(--drag-y,0px))}.sheet-handle{position:absolute;top:0;left:calc(50% - 36px);width:72px;height:27px;display:grid;place-items:center;touch-action:none;cursor:grab}.sheet-handle span{width:33px;height:3px;border-radius:4px;background:#a9bfb175}.sheet-handle:active{cursor:grabbing}[data-dragging=true] .overlay-panel{transition:none!important}.collection-choices{border:0;padding:0;margin:18px 0}.collection-choices label{position:relative;display:flex;align-items:center;gap:12px;min-height:57px;padding:10px 0;cursor:pointer}.collection-choices label+label{border-top:1px solid #ffffff0c}.collection-choices label>.menu-glyph{color:#b4caba;width:23px;height:23px}.collection-choices label>span:not(.choice-ring){flex:1}.collection-choices strong{display:block;font-size:12px;font-weight:450}.collection-choices small{display:block;font-size:10px;margin-top:4px;color:#a2b8aa}.choice-ring{width:15px;height:15px;border:1px solid #799282;border-radius:50%;position:relative}.choice-ring:after{content:'';position:absolute;inset:3px;background:#c7dccd;border-radius:50%;opacity:0;transition:opacity 170ms ease}.collection-choices input:checked+.choice-ring:after{opacity:1}.collection-choices input:focus-visible+.choice-ring{outline:2px solid #c0d3c5;outline-offset:3px}.sheet-confirm{width:100%}\n[data-overlay=popover] .overlay-launch{align-self:start;margin-top:64px}\n[data-overlay=popover] .overlay-panel,[data-overlay=tooltip] .overlay-panel{position:absolute;width:min(286px,calc(100% - 28px));left:14px;top:14px;opacity:0;visibility:hidden;transform:translateY(6px);transition:transform 220ms var(--overlay-ease),opacity 160ms ease,visibility 0s 220ms;overflow:visible}\n[data-overlay=popover][data-open=true] .overlay-panel,[data-overlay=tooltip][data-open=true] .overlay-panel{visibility:visible;opacity:1;transform:none;transition-delay:0s}\n[data-overlay=popover] .overlay-panel{padding:23px 20px 14px}[data-overlay=popover] .overlay-panel h2{font-size:18px;margin:0 0 10px}[data-overlay=popover] .overlay-eyebrow{margin-bottom:14px}.popover-footer{display:flex;justify-content:space-between;align-items:center;gap:8px;border-top:1px solid #ffffff14;margin-top:17px;padding-top:11px}.popover-footer>span{font-size:10px;color:#9db6a6}.popover-footer button{display:flex;align-items:center;gap:5px;background:transparent;border:1px solid #9fbcab40;border-radius:8px;padding:6px 9px;font-size:11px}.popover-footer button[aria-pressed=true]{border-color:#bed5c6;color:#dcece1}.popover-footer .menu-glyph{width:17px;height:17px}\n[data-overlay=tooltip] .overlay-panel{width:min(224px,calc(100% - 34px));padding:16px 18px;border-radius:12px;box-shadow:0 6px 16px #15281d1f;transform:translateY(3px);transition:opacity 140ms ease,transform 180ms var(--overlay-ease),visibility 0s 180ms}[data-overlay=tooltip] .overlay-panel strong{display:block;font-size:12px;font-weight:500;margin-bottom:6px}[data-overlay=tooltip] .overlay-panel span{display:block;font-size:11px;line-height:1.55;color:#b4c8ba}[data-overlay=tooltip] .overlay-panel:after{content:'';position:absolute;left:calc(var(--arrow-x,50%) - 5px);bottom:-5px;width:9px;height:9px;background:#222725;border-right:1px solid #eef5ef20;border-bottom:1px solid #eef5ef20;transform:rotate(45deg)}[data-overlay=tooltip] [data-placement=below]:after{bottom:auto;top:-5px;transform:rotate(225deg)}\n.sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}\n[data-overlay=sheet] .overlay-panel{inset:auto 0 12px;margin-inline:auto;width:min(304px,calc(100% - 24px));border-radius:18px;padding:24px 18px 16px}\n[data-overlay=sheet] .overlay-panel h2{font-size:20px;margin:9px 0 7px}\n[data-overlay=sheet] .collection-choices{margin:10px 0 12px}\n[data-overlay=sheet] .collection-choices label{min-height:47px;padding:7px 0;gap:10px}\n[data-overlay=sheet] .sheet-confirm{min-height:39px;padding-block:8px}\n.popover-footer .popover-pin{width:auto;padding:0;margin:0;border:0;background:transparent;box-shadow:none;--check-ink:#222725;--check-paper:#d3e0d7}\n.popover-pin .sl-check{min-height:34px;padding:6px 9px;gap:5px;user-select:none;background:transparent;border:1px solid #9fbcab55;border-radius:8px;transition:border-color 220ms ease}\n.popover-pin .sl-check:has(:checked){border-color:#bed5c6}\n.popover-pin .sl-check__box{width:20px;height:20px;background:transparent;box-shadow:none;border:0;border-radius:0;overflow:visible}\n.popover-pin .sl-check__box::before{display:none}\n.popover-pin .sl-check__input:checked+.sl-check__box svg{stroke:#d3e0d7}\n.popover-pin .sl-check__input:checked+.sl-check__box .mark-icon{fill:#d3e0d733}\n.popover-pin .sl-check__input:focus-visible+.sl-check__box{outline:none}\n.popover-pin .sl-check:has(:focus-visible){outline:1px solid #c0d3c5;outline-offset:2px}\n.popover-pin .sl-check__box svg{width:20px;height:20px}\n.popover-pin .sl-check__title{display:grid;width:40px;line-height:17px;font-size:11px;font-weight:450}\n.popover-pin .sl-check__title>span{grid-area:1/1;transition:opacity 180ms ease,transform 260ms var(--check-ease)}\n.popover-pin .pin-on{opacity:0;transform:translateY(4px)}\n.popover-pin .sl-check__input:checked~.sl-check__copy .pin-on{opacity:1;transform:none}\n.popover-pin .sl-check__input:checked~.sl-check__copy .pin-off{opacity:0;transform:translateY(-4px)}\n@media(max-width:290px){.overlay-panel{padding:21px 17px}.overlay-panel h2{font-size:20px}.overlay-actions{gap:4px}.overlay-actions button{padding-inline:8px;font-size:11px}[data-overlay=drawer] .overlay-panel{padding-inline:17px}[data-overlay=sheet] .overlay-panel{padding-inline:17px}.overlay-trigger{font-size:13px;gap:8px}.overlay-feedback{font-size:10px}}\n@media(prefers-reduced-motion:reduce){*,*::before,*::after,*::backdrop{transition:none!important;animation:none!important}}\n/* Short embedded cards are real viewports too: keep every primary action in view. */\n@media(max-height:450px){\n .overlay-panel{padding:18px;max-height:calc(100svh - 24px)}\n .overlay-panel h2{font-size:20px;margin:10px 0 8px}\n .overlay-emblem{width:32px;height:32px;border-radius:10px}\n .overlay-emblem .menu-glyph{width:22px;height:22px}\n .overlay-field{margin-top:16px}\n .overlay-field input{min-height:38px;padding:8px 10px;margin-top:6px}\n .overlay-actions{margin-top:16px}\n .overlay-actions button,.overlay-primary{min-height:36px;padding:8px 10px}\n [data-overlay=drawer] .overlay-panel{padding:20px 18px 16px}\n [data-overlay=drawer] .overlay-eyebrow{margin:0 0 12px}\n [data-overlay=drawer] .overlay-panel h2{font-size:20px;margin-top:0}\n .status-choices{margin-top:16px}\n .status-choices label>span{padding:8px 2px}\n .drawer-note{margin-top:16px}\n [data-overlay=popover] .overlay-panel{max-height:calc(100svh - 24px);overflow-y:auto}\n}\n@media(max-height:350px){\n [data-overlay=modal] .overlay-panel{padding:16px}\n [data-overlay=modal] .overlay-panel>p{display:none}\n [data-overlay=drawer] .overlay-panel{padding:15px 17px}\n [data-overlay=drawer] .overlay-panel>p,.drawer-note{display:none}\n [data-overlay=drawer] .overlay-eyebrow{margin-bottom:8px}\n [data-overlay=drawer] .overlay-field{margin-top:12px}\n [data-overlay=drawer] .status-choices{margin-top:12px}\n [data-overlay=drawer] .overlay-actions{margin-top:14px}\n [data-overlay=sheet] .overlay-panel{padding:22px 16px 14px}\n [data-overlay=sheet] .collection-choices{margin:8px 0}\n [data-overlay=sheet] .collection-choices label{min-height:43px;padding:5px 0}\n [data-overlay=sheet] .sheet-confirm{min-height:36px}\n}\n\n[data-overlay=confirm] .overlay-panel,[data-overlay=tour] .overlay-panel{position:fixed;inset:0;margin:auto;width:min(310px,calc(100% - 28px));height:fit-content;transform:translateY(12px)}\n[data-overlay=confirm][data-open=true] .overlay-panel,[data-overlay=tour][data-open=true] .overlay-panel{transform:none}\n.confirm-summary{display:flex;align-items:center;gap:12px;border:1px solid #9bb7a527;border-radius:11px;margin-top:20px;padding:12px;font-size:12px}.confirm-summary>.menu-glyph{color:#bcd0c3}.confirm-summary small{display:block;font-size:10px;color:#97b1a1;margin-top:5px}\n[data-overlay=palette] .overlay-panel{position:fixed;inset:30px 0 auto;margin-inline:auto;width:min(330px,calc(100% - 24px));padding:12px;transform:translateY(-16px);transition:transform 300ms var(--overlay-ease),opacity 180ms ease}\n[data-overlay=palette][data-open=true] .overlay-panel{transform:none}.command-search{display:flex;align-items:center;gap:9px;margin:4px 30px 10px 4px;min-height:38px}.command-search .menu-glyph{width:20px;height:20px}.command-search input{width:100%;min-width:0;background:transparent;border:0;border-bottom:1px solid transparent;border-radius:0;color:#edf2ee;padding:7px 0;font-size:13px;outline:0;box-shadow:none}.command-search input:focus{border-bottom-color:#a6c3b255}.command-search input::placeholder{color:#a7bcb0}.command-results{border-top:1px solid #9cb8a52a;padding-top:8px;min-height:210px}.command-results button{display:flex;align-items:center;width:100%;gap:10px;text-align:left;background:transparent;border:1px solid transparent;border-radius:8px;padding:9px 8px;min-height:49px}.command-results button[data-active=true]{border-color:#acc7b655;background:#bed2c70a}.command-results button>span{flex:1;font-size:12px}.command-results small{display:block;font-size:10px;margin-top:4px;color:#9fb9a9}.command-results .menu-glyph{width:22px;height:22px}.command-results .command-arrow{width:14px;height:14px;transform:rotate(-90deg)}.command-results [data-empty]{text-align:center;padding:52px 10px}.command-footnote{border-top:1px solid #9cb8a51a;padding:10px 8px 0;font-size:9px;color:#8ea997}\n[data-overlay=document] .overlay-panel{position:fixed;inset:10px;margin:0;width:calc(100% - 20px);height:calc(100svh - 20px);max-height:none;padding:14px;transform:scale(.93);transform-origin:50% 80%;display:none}\n[data-overlay=document] .overlay-panel[open]{display:flex;flex-direction:column}[data-overlay=document][data-open=true] .overlay-panel{transform:none}.document-toolbar{display:flex;gap:9px;align-items:center;padding:4px 28px 16px 2px}.document-toolbar h2{margin:0;font-size:14px;font-weight:450}.document-toolbar .menu-glyph{width:21px;height:21px}.preview-paper{background:#e6ece7;color:#263b2d;border-radius:8px;padding:23px 20px;flex:1;min-height:0;overflow-y:auto;scrollbar-width:thin;scrollbar-color:#8ca693 transparent}.preview-paper>span{font-size:8px;letter-spacing:.07em;color:#5c7767}.preview-paper h3{font-size:23px;letter-spacing:-.04em;font-weight:550;line-height:1.1;margin:18px 0 13px}.preview-paper h4{font-size:12px;margin:22px 0 8px}.preview-paper p{font-size:11px;line-height:1.6;color:#476351}.document-pages{display:flex;justify-content:center;align-items:center;gap:25px;padding-top:12px}.document-pages button{display:grid;place-items:center;width:30px;height:30px;border:1px solid #a0bda935;background:transparent;border-radius:8px}.document-pages .menu-glyph{width:17px;height:17px}.arrow-left{transform:rotate(90deg)}.arrow-right{transform:rotate(-90deg)}.document-pages span{font-size:11px;font-variant-numeric:tabular-nums}\n[data-overlay=quickedit] .overlay-launch{align-self:start;margin-top:65px}[data-overlay=quickedit] .overlay-panel{position:absolute;width:min(300px,calc(100% - 28px));padding:22px 18px;left:14px;top:135px;visibility:hidden;transform:translateY(-6px);transition:opacity 160ms ease,transform 240ms var(--overlay-ease),visibility 0s 240ms}\n[data-overlay=quickedit][data-open=true] .overlay-panel{visibility:visible;transform:none;transition-delay:0s}[data-overlay=quickedit] h2{font-size:20px;margin:0}[data-overlay=quickedit] .overlay-eyebrow{margin-bottom:13px}[data-overlay=quickedit] .overlay-field{margin-top:17px}[data-overlay=quickedit] .overlay-actions{margin-top:18px}\n[data-overlay=tour] .overlay-panel{padding:17px 18px}.tour-preview{padding:22px 12px 12px;border:1px solid #a6bbaa17;border-radius:11px;background:#171f1a;margin:10px 14px 20px 0;display:grid;gap:6px}.tour-preview>div{display:flex;align-items:center;gap:9px;font-size:11px;padding:8px;border:1px solid transparent;border-radius:6px;color:#748c7d;transition:border-color 230ms ease,color 230ms ease,background-color 230ms ease}.tour-preview [data-highlight=true]{border-color:#c7dfcf88;background:#9fbcab12;color:#d5e7db}.tour-preview .menu-glyph{width:20px;height:20px}.tour-copy{min-height:110px}.tour-copy .overlay-eyebrow{display:block;margin:0 0 10px;font-size:9px}.tour-copy h2{font-size:20px;margin:0 0 10px}[data-overlay=tour] .overlay-actions{margin-top:10px;justify-content:space-between}\n.overlay-demo:not([data-overlay=document]){grid-template-columns:minmax(0,1fr)}\n[data-overlay=quickedit] .overlay-feedback{overflow-wrap:anywhere}\n.trigger-icon-stack{position:relative;display:block;flex:0 0 25px;width:25px;height:25px;font-style:normal}\n.trigger-icon-stack>.menu-glyph,.trigger-result-check{position:absolute;inset:0;width:25px;height:25px;transition:opacity 180ms ease,transform 260ms var(--overlay-ease)}\n.trigger-result-check{opacity:0;transform:scale(.85);stroke-width:1.8;pointer-events:none}.trigger-result-check path{stroke-dasharray:1;stroke-dashoffset:1;transition:stroke-dashoffset 300ms var(--overlay-ease)}\n.trigger-result-label{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;line-height:25px}\n.overlay-trigger[data-result=true]{background:#2b3931;border-color:#9cbaa573;color:#dcece1}\n.overlay-trigger[data-result=true]:hover{background:#34443a;border-color:#b4cebd}\n.overlay-trigger[data-result=true] .menu-glyph{opacity:0;transform:scale(.85)}\n.overlay-trigger[data-result=true] .trigger-result-check{opacity:1;transform:none}\n.overlay-trigger[data-result=true] .trigger-result-check path{stroke-dashoffset:0}\n[hidden]{display:none!important}@media(max-width:290px){.preview-paper{padding:19px 14px}.preview-paper h3{font-size:21px}.tour-preview{margin-bottom:15px}.tour-copy{min-height:130px}}\n@media(prefers-reduced-motion:reduce){*,*::before,*::after,*::backdrop{transition:none!important;animation:none!important}}\n@media(max-height:450px){\n [data-overlay=palette] .overlay-panel{top:12px;max-height:calc(100svh - 24px);display:flex;flex-direction:column;overflow:hidden}\n [data-overlay=palette] .overlay-panel:not([open]){display:none}\n .command-search,.command-footnote{flex-shrink:0}\n .command-results{min-height:0;overflow-y:auto;scrollbar-width:thin;scrollbar-color:#677d70 transparent}\n .tour-preview{padding:10px;margin:8px 14px 14px 0;gap:3px}\n .tour-preview>div{padding:5px 8px}\n .tour-copy{min-height:0}\n [data-overlay=tour] .overlay-panel{padding:16px}\n [data-overlay=tour] .overlay-actions{margin-top:14px}\n [data-overlay=quickedit] .overlay-panel{padding:16px;max-height:calc(100svh - 24px);overflow-y:auto}\n .confirm-summary{margin-top:14px;padding:10px}\n}\n@media(max-height:350px){\n [data-overlay=confirm] .overlay-emblem{display:none}\n [data-overlay=confirm] .overlay-panel h2{padding-right:24px;margin-top:0}\n .tour-preview{display:flex;padding:6px;margin-bottom:12px;gap:4px}\n .tour-preview>div{flex:1;justify-content:center;padding:6px 0}\n .tour-preview>div>span{display:none}\n .tour-copy .overlay-eyebrow{margin-bottom:7px}\n .tour-copy h2{font-size:19px;margin-bottom:8px}\n}\n";
function frameApi1(document,window){
const {AbortController,CustomEvent,ResizeObserver}=window;
const matchMedia=window.matchMedia.bind(window),requestAnimationFrame=window.requestAnimationFrame.bind(window),cancelAnimationFrame=window.cancelAnimationFrame.bind(window);
(() => {
const mounted = new WeakMap();

function mountCheckboxes(root, { onChange } = {}) {
  if (mounted.has(root)) return mounted.get(root);
  if (onChange !== undefined && typeof onChange !== 'function') throw new TypeError('onChange must be a function.');
  const inputs = [...root.querySelectorAll('input[type="checkbox"]')];
  if (!inputs.length) throw new TypeError('Native checkboxes are required.');
  const parent = root.querySelector('[data-parent]');
  const children = [...root.querySelectorAll('[data-child]')];
  const lifecycle = new AbortController();
  let destroyed = false;
  const values = () => inputs.filter(input => input !== parent && input.checked).map(input => input.name);
  function syncParent() {
    if (!parent || !children.length) return;
    const count = children.filter(input => input.checked).length;
    parent.checked = count === children.length;
    parent.indeterminate = count > 0 && count < children.length;
  }
  function change(event) {
    if (!inputs.includes(event.target)) return;
    if (event.target === parent) for (const child of children) { if (!child.disabled) child.checked = parent.checked; }
    syncParent();
    onChange?.(values());
    root.dispatchEvent(new CustomEvent('selectionchange', { bubbles: true, detail: { values: values() } }));
  }
  const reset = () => {
    if (destroyed) return;
    for (const input of inputs) input.checked = input.defaultChecked;
    syncParent();
  };
  root.addEventListener('change', change, { signal: lifecycle.signal });
  const form = inputs[0].form;
  form?.addEventListener('reset', () => queueMicrotask(reset), { signal: lifecycle.signal });
  syncParent();
  const controller = { reset, get values() { return values(); }, destroy() { destroyed = true; lifecycle.abort(); mounted.delete(root); } };
  mounted.set(root, controller);
  return controller;
}

window.MatteCheckboxes = { mount: mountCheckboxes };
})();

// Compatibility export for existing packages; the former Genie effect is removed.
// A native dialog now opens with a small, ordinary scale/translate and opacity.
function createGenie(root,panel,trigger,media){
 const view=root.ownerDocument.defaultView,closed='translateY(12px) scale(.96)';
 let animation=null,state=0,targetState=0,pending=Promise.resolve(),resolveRun=null;
 function settle(target){
  state=target;animation?.cancel();animation=null;
  panel.style.opacity=String(target);panel.style.transform=target?'none':closed;
 }
 function run(target,instant=false){
  if(animation&&target===targetState&&!instant&&!media.matches)return pending;
  const current=animation?view.getComputedStyle(panel):null;
  const from={opacity:current?current.opacity:String(state),transform:current?current.transform:(state?'none':closed)};
  resolveRun?.();resolveRun=null;animation?.cancel();animation=null;targetState=target;
  if(instant||media.matches){settle(target);return Promise.resolve();}
  panel.style.opacity=from.opacity;panel.style.transform=from.transform;
  animation=panel.animate([from,{opacity:String(target),transform:target?'none':closed}],{duration:220,easing:'cubic-bezier(.22,.61,.36,1)',fill:'forwards'});
  const active=animation;
  pending=new Promise(resolve=>{resolveRun=resolve;active.finished.then(()=>{
   if(animation!==active)return;settle(target);resolveRun=null;resolve();
  }).catch(()=>{});});
  return pending;
 }
 return {run,get progress(){return state;},destroy(){resolveRun?.();resolveRun=null;animation?.cancel();animation=null;panel.style.removeProperty('opacity');panel.style.removeProperty('transform');}};
}

const mounted=new WeakMap();
function mountOverlay(root,{onCommit}={}){
 if(mounted.has(root))return mounted.get(root);
 const doc=root.ownerDocument,view=doc.defaultView,life=new AbortController(),signal=life.signal;
 const trigger=root.querySelector('[data-trigger]'),panel=root.querySelector('.overlay-panel'),feedback=root.querySelector('[data-feedback]'),form=root.querySelector('form'),kind=root.dataset.overlay;
 const modal=panel.tagName==='DIALOG',tip=kind==='tooltip',initialFeedback=feedback.textContent,media=view.matchMedia('(prefers-reduced-motion: reduce)');
 const genie=kind==='modal'?createGenie(root,panel,trigger,media):null;
 let opened=false,destroyed=false,revision=0,hoverTrigger=false,hoverTip=false,focused=false,pinned=false,dismissed=false,showTimer,hideTimer,drag=null,backdropDown=false;
 function clearTimers(){view.clearTimeout(showTimer);view.clearTimeout(hideTimer);}
 function position(){
  if(kind==='modal'&&panel.open){
   const button=trigger.getBoundingClientRect();
   panel.style.setProperty('--window-origin-x',(button.left+button.width/2-panel.offsetLeft)+'px');
   panel.style.setProperty('--window-origin-y',(button.top+button.height/2-panel.offsetTop)+'px');
  }
  if(modal)return;
  const r=root.getBoundingClientRect(),b=trigger.getBoundingClientRect(),p=panel.getBoundingClientRect();
  const left=Math.max(12,Math.min(b.x-r.x+(b.width-p.width)/2,r.width-p.width-12));
  const above=b.top-r.top-p.height-12,below=b.bottom-r.top+12;
  const top=above>=12?above:Math.min(below,r.height-p.height-12);
  panel.dataset.placement=above>=12?'above':'below';panel.style.left=left+'px';panel.style.top=Math.max(12,top)+'px';panel.style.setProperty('--arrow-x',Math.max(14,Math.min(p.width-14,b.x-r.x+b.width/2-left))+'px');
 }
 function open(){
  if(destroyed)return;clearTimers();revision++;opened=true;
  if(modal&&!panel.open){panel.inert=false;panel.showModal();panel.getBoundingClientRect();}
  panel.inert=false;panel.removeAttribute('aria-hidden');position();root.dataset.open='true';
  genie?.run(1);
  if(!tip)trigger.setAttribute('aria-expanded','true');
  if(!tip){
   const field=panel.querySelector('input');
   (field||panel.querySelector('[data-close]'))?.focus({preventScroll:true});
   if(field?.name==='project')field.select();
  }
 }
 function close({restoreFocus=true,instant=false}={}){
  clearTimers();const token=++revision;opened=false;root.dataset.open='false';
  if(!tip)trigger.setAttribute('aria-expanded','false');
  if(modal){
   if(!panel.open)return;
   panel.inert=true;
   const finish=()=>{
    if(destroyed||opened||revision!==token)return;
    const returnFocus=restoreFocus&&doc.hasFocus(),disabled=trigger.disabled;
    // Native close() restores the opener even after the user moved to another iframe.
    // Temporarily make it unfocusable, then explicitly restore only in the active preview.
    trigger.disabled=true;panel.close();trigger.disabled=disabled;panel.inert=false;
    if(returnFocus&&!disabled)trigger.focus({preventScroll:true});
   };
   if(genie){genie.run(0,instant).then(finish);}else if(instant||media.matches)finish();else Promise.allSettled(panel.getAnimations().map(a=>a.finished)).then(finish);
  }else{
   if(!tip&&panel.contains(doc.activeElement)&&restoreFocus)trigger.focus({preventScroll:true});
   panel.inert=!tip;panel.setAttribute('aria-hidden','true');
  }
 }
 trigger.addEventListener('click',()=>{
  if(tip){pinned=!pinned;dismissed=!pinned;pinned?open():close();return;}
  if(opened)close();else open();
 },{signal});
 panel.querySelectorAll('[data-close]').forEach(b=>b.addEventListener('click',()=>close(),{signal}));
 if(modal){
  const outside=e=>{const r=panel.getBoundingClientRect();return e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom;};
  panel.addEventListener('cancel',e=>{e.preventDefault();close();},{signal});
  panel.addEventListener('keydown',e=>{
   if(e.key!=='Tab'||!opened)return;
   const stops=[...panel.querySelectorAll('button,input,select,textarea,[tabindex]')].filter(n=>!n.disabled&&n.tabIndex>=0&&n.getClientRects().length);
   const first=stops[0],last=stops.at(-1);
   if((e.shiftKey&&doc.activeElement===first)||(!e.shiftKey&&doc.activeElement===last)){e.preventDefault();(e.shiftKey?last:first)?.focus({preventScroll:true});}
  },{signal});
  panel.addEventListener('pointerdown',e=>backdropDown=e.target===panel&&outside(e),{signal});
  panel.addEventListener('click',e=>{if(backdropDown&&e.target===panel&&outside(e))close();backdropDown=false;},{signal});
  panel.addEventListener('close',()=>{if(panel.open||!opened)return;opened=false;root.dataset.open='false';trigger.setAttribute('aria-expanded','false');},{signal});
 }else{
  doc.addEventListener('pointerdown',e=>{if(opened&&!panel.contains(e.target)&&!trigger.contains(e.target)){pinned=false;dismissed=true;close({restoreFocus:false});}},{signal});
  doc.addEventListener('keydown',e=>{if(e.key==='Escape'&&opened){e.preventDefault();pinned=false;dismissed=true;close();}},{signal});
  if(!tip){
   root.addEventListener('focusout',e=>{if(opened&&e.relatedTarget&&!root.contains(e.relatedTarget))close({restoreFocus:false});},{signal});
   view.addEventListener('blur',()=>{if(opened)close({restoreFocus:false});},{signal});
  }
 }
 if(tip){
  const hideIfAway=()=>{view.clearTimeout(hideTimer);hideTimer=view.setTimeout(()=>{if(!hoverTrigger&&!hoverTip&&!focused&&!pinned)close({restoreFocus:false});},140);};
  trigger.addEventListener('pointerenter',e=>{if(e.pointerType==='touch')return;hoverTrigger=true;dismissed=false;view.clearTimeout(hideTimer);showTimer=view.setTimeout(()=>{if(hoverTrigger&&!dismissed)open();},180);},{signal});
  trigger.addEventListener('pointerleave',()=>{hoverTrigger=false;view.clearTimeout(showTimer);hideIfAway();},{signal});
  trigger.addEventListener('focus',()=>{focused=true;dismissed=false;open();},{signal});
  trigger.addEventListener('blur',()=>{focused=false;hideIfAway();},{signal});
  panel.addEventListener('pointerenter',()=>{hoverTip=true;view.clearTimeout(hideTimer);},{signal});
  panel.addEventListener('pointerleave',()=>{hoverTip=false;hideIfAway();},{signal});
 }
 form?.addEventListener('submit',e=>{
  e.preventDefault();const project=form.elements.namedItem('project');
  if(project){project.value=project.value.trim();if(!project.reportValidity())return;}
  const values=Object.fromEntries(new view.FormData(form));
  feedback.textContent=kind==='modal'?values.project+' created in this preview.':kind==='drawer'?values.project+' · '+values.status+' · Saved locally.':values.collection+' selected in this preview.';
  if(root.dataset.success)feedback.textContent=root.dataset.success.replace(/\{(\w+)\}/g,(_,key)=>values[key]||'');
  root.dispatchEvent(new view.CustomEvent('overlaycommit',{bubbles:true,detail:values}));onCommit?.(values);close();
 },{signal});
 const pin=root.querySelector('[data-pin]');
 const pinControl=pin?view.MatteCheckboxes.mount(pin):null;
 const handle=root.querySelector('[data-drag-handle]');
 if(handle){
  function resetDrag(){drag=null;delete root.dataset.dragging;root.style.removeProperty('--drag-y');}
  handle.addEventListener('pointerdown',e=>{if(!e.isPrimary||e.button!==0||!opened)return;drag={id:e.pointerId,y:e.clientY,dy:0};root.dataset.dragging='true';handle.setPointerCapture(e.pointerId);},{signal});
  handle.addEventListener('pointermove',e=>{if(!drag||drag.id!==e.pointerId)return;drag.dy=Math.max(0,e.clientY-drag.y);root.style.setProperty('--drag-y',drag.dy+'px');},{signal});
  handle.addEventListener('pointerup',()=>{if(!drag)return;const dismiss=drag.dy>55;resetDrag();if(dismiss)close();},{signal});
  handle.addEventListener('pointercancel',resetDrag,{signal});handle.addEventListener('lostpointercapture',resetDrag,{signal});
 }
 const observer=new view.ResizeObserver(()=>{if(opened)position();});observer.observe(root);observer.observe(panel);
 media.addEventListener('change',()=>{if(!media.matches)return;if(genie&&opened)genie.run(1,true);if(!opened&&modal&&panel.open)close({instant:true});},{signal});
 function reset(){pinned=false;dismissed=true;hoverTrigger=hoverTip=focused=false;drag=null;delete root.dataset.dragging;root.style.removeProperty('--drag-y');close({instant:true,restoreFocus:root.contains(doc.activeElement)});form?.reset();feedback.textContent=initialFeedback;pinControl?.reset();}
 const controller={open,close,reset,destroy(){reset();if(modal&&panel.open)panel.close();genie?.destroy();pinControl?.destroy();destroyed=true;revision++;clearTimers();observer.disconnect();life.abort();mounted.delete(root);}};
 mounted.set(root,controller);return controller;
}
window.SLOverlayInstance=mountOverlay(document.querySelector('.overlay-demo'));
window.addEventListener('pagehide',e=>{if(!e.persisted)window.SLOverlayInstance.destroy();});

const root=document.querySelector('.overlay-demo'),kind=root.dataset.overlay,control=window.SLOverlayInstance,life=new AbortController(),signal=life.signal;
let extraReset=()=>{},animation=null;
const motion=matchMedia('(prefers-reduced-motion:reduce)'),trigger=root.querySelector('[data-trigger]');
let resultAnimation=null,resetResult=()=>{};
// Keep the original icon mounted: no reloads or geometry changes on confirmation.
let presentResult=()=>{};
if(kind!=='document'){
 const label=trigger.querySelector('span'),original=label.textContent,icon=trigger.querySelector('.menu-glyph');
 const stack=document.createElement('i'),check=document.createElementNS('http://www.w3.org/2000/svg','svg'),path=document.createElementNS('http://www.w3.org/2000/svg','path');
 stack.className='trigger-icon-stack';stack.setAttribute('aria-hidden','true');
 check.setAttribute('viewBox','0 0 28 28');check.setAttribute('focusable','false');check.classList.add('trigger-result-check');
 path.setAttribute('d','m6 14 5 5L22 8');path.setAttribute('pathLength','1');check.append(path);
 icon.before(stack);stack.append(icon,check);label.classList.add('trigger-result-label');
 presentResult=(text)=>{
  resultAnimation?.cancel();label.textContent=text;trigger.title=text;
  trigger.dataset.result='true';
  if(!motion.matches)resultAnimation=label.animate([{opacity:.3,transform:'translateY(3px)'},{opacity:1,transform:'translateY(0)'}],{duration:240,easing:'cubic-bezier(.2,.7,.2,1)'});
 };
 resetResult=()=>{resultAnimation?.cancel();label.textContent=original;trigger.removeAttribute('title');delete trigger.dataset.result;};
 root.addEventListener('overlaycommit',e=>{
  if(kind==='confirm')presentResult('Project archived');
  else if(kind==='quickedit')presentResult('Project renamed');
 },{signal});
}
function fade(node){animation?.cancel();if(matchMedia('(prefers-reduced-motion:reduce)').matches)return;animation=node.animate([{opacity:.55},{opacity:1}],{duration:180,easing:'ease-out'});}
if(kind==='palette'){
 const search=root.querySelector('[data-search]'),items=[...root.querySelectorAll('[data-command]')],empty=root.querySelector('[data-empty]');let selected=0;
 const visible=()=>items.filter(n=>!n.hidden);
 function mark(i){const list=visible();selected=Math.max(0,Math.min(list.length-1,i));items.forEach(n=>n.dataset.active=String(n===list[selected]));}
 function filter(){const query=search.value.trim().toLowerCase();items.forEach(n=>n.hidden=!n.textContent.toLowerCase().includes(query));empty.hidden=visible().length>0;mark(0);}
 search.addEventListener('input',filter,{signal});
 items.forEach((b,i)=>{b.addEventListener('click',()=>{root.querySelector('[data-feedback]').textContent=b.dataset.command+' selected in this preview.';presentResult(b.dataset.command);root.dispatchEvent(new CustomEvent('overlayaction',{bubbles:true,detail:{value:b.dataset.command}}));control.close();},{signal});b.addEventListener('focus',()=>mark(visible().indexOf(b)),{signal});});
 root.addEventListener('keydown',e=>{if(root.dataset.open!=='true')return;const list=visible();if(!list.length)return;if(['ArrowDown','ArrowUp','Home','End'].includes(e.key)){e.preventDefault();mark(e.key==='Home'?0:e.key==='End'?list.length-1:(selected+(e.key==='ArrowDown'?1:-1)+list.length)%list.length);list[selected].focus();}else if(e.key==='Enter'&&e.target===search){e.preventDefault();list[selected].click();}},{signal});
 extraReset=()=>{search.value='';filter();};filter();
}else if(kind==='document'){
 const paper=root.querySelector('[data-paper]'),first=paper.innerHTML,previous=root.querySelector('[data-page-back]'),next=root.querySelector('[data-page-next]');let page=0;
 const second='<span>STUDIO / NEXT STEPS</span><h3>Build with intention.</h3><p>Keep the path clear. Start with the smallest useful version and refine it through real interaction.</p><h4>What comes next</h4><p>Explore the prototype, share your observations and make the next detail a little better.</p>';
 function paint(value){page=value;paper.innerHTML=page?second:first;paper.scrollTop=0;previous.disabled=!page;next.disabled=Boolean(page);root.querySelector('[data-page-count]').textContent=(page+1)+' / 2';fade(paper);}
 previous.addEventListener('click',()=>{paint(0);next.focus();},{signal});next.addEventListener('click',()=>{paint(1);previous.focus();},{signal});extraReset=()=>paint(0);
}else if(kind==='tour'){
 const text=[['A place for your work.','Switch between projects and keep your ideas together.'],['Keep files close.','Open a brief without losing your place in the workspace.'],['Return to what matters.','Pin useful details and come back whenever you need them.']];let step=0,completed=false;
 const back=root.querySelector('[data-tour-back]'),next=root.querySelector('[data-tour-next]');
 function paint(i){step=i;root.querySelectorAll('[data-tour-target]').forEach((n,j)=>n.dataset.highlight=String(i===j));root.querySelector('[data-tour-title]').textContent=text[i][0];root.querySelector('[data-tour-description]').textContent=text[i][1];root.querySelector('[data-tour-count]').textContent='STEP '+(i+1)+' OF 3';back.disabled=!i;next.textContent=i===2?'Finish':'Next';fade(root.querySelector('.tour-copy'));}
 const open=control.open.bind(control);
 control.open=()=>{if(signal.aborted)return;if(completed){completed=false;paint(0);}return open();};
 // The shared click handler owns its own open closure; reset before that handler runs.
 trigger.addEventListener('click',()=>{if(completed){completed=false;paint(0);}},{signal,capture:true});
 back.addEventListener('click',()=>{paint(Math.max(0,step-1));if(!step)next.focus();},{signal});next.addEventListener('click',()=>{if(step===2){completed=true;root.querySelector('[data-feedback]').textContent='Tour complete. Click again to replay.';presentResult('Tour complete');root.dispatchEvent(new CustomEvent('overlaytourcomplete',{bubbles:true}));control.close();}else paint(step+1);},{signal});extraReset=()=>{completed=false;paint(0);};paint(0);
}
const reset=control.reset.bind(control);control.reset=()=>{reset();extraReset();resetResult();animation?.cancel();};
const destroy=control.destroy.bind(control);
control.destroy=()=>{life.abort();animation?.cancel();resultAnimation?.cancel();destroy();};
motion.addEventListener('change',e=>{if(e.matches){animation?.cancel();resultAnimation?.cancel();}},{signal});
window.addEventListener('pagehide',e=>{if(!e.persisted){life.abort();animation?.cancel();resultAnimation?.cancel();}});

return window.SLOverlayInstance;
}
export const previews = {
"pair": { markup: "<div class=\"button-kit\">\n<button class=\"bk-button bk-button--save\" data-action=\"save\" type=\"button\" data-state=\"idle\" disabled>\n        <span class=\"bk-surface\" aria-hidden=\"true\">\n          <span class=\"bk-progress\"></span>\n          <span class=\"bk-label bk-label-idle\">Save changes</span>\n          <span class=\"bk-label bk-label-saving\">Saving<span class=\"bk-ellipsis\">…</span></span>\n          <span class=\"bk-label bk-label-saved\">\n            <svg class=\"bk-check\" viewBox=\"0 0 24 24\" fill=\"none\" focusable=\"false\"><path d=\"M4 12.5 9.2 17.5 20 6.5\" pathLength=\"1\"/></svg>\n            <span class=\"bk-saved-text\">Saved</span>\n          </span>\n        </span>\n        <span class=\"bk-sr-only\">Save changes</span>\n      </button>\n<button class=\"bk-button bk-button--cancel\" data-action=\"cancel\" type=\"button\" data-state=\"idle\" disabled>\n        <span class=\"bk-surface\" aria-hidden=\"true\">\n          <span class=\"bk-wash\"></span>\n          <span class=\"bk-label bk-label-idle\">Cancel</span>\n          <span class=\"bk-label bk-label-cancelled\">Cancelled</span>\n        </span>\n        <span class=\"bk-sr-only\">Cancel</span>\n      </button>\n    <span class=\"bk-sr-only\" data-feedback role=\"status\" aria-live=\"polite\" aria-atomic=\"true\"></span>\n  </div>", css: style0, mount: api0.mount },
"save": { markup: "<div class=\"button-kit\">\n<button class=\"bk-button bk-button--save\" data-action=\"save\" type=\"button\" data-state=\"idle\" disabled>\n        <span class=\"bk-surface\" aria-hidden=\"true\">\n          <span class=\"bk-progress\"></span>\n          <span class=\"bk-label bk-label-idle\">Save changes</span>\n          <span class=\"bk-label bk-label-saving\">Saving<span class=\"bk-ellipsis\">…</span></span>\n          <span class=\"bk-label bk-label-saved\">\n            <svg class=\"bk-check\" viewBox=\"0 0 24 24\" fill=\"none\" focusable=\"false\"><path d=\"M4 12.5 9.2 17.5 20 6.5\" pathLength=\"1\"/></svg>\n            <span class=\"bk-saved-text\">Saved</span>\n          </span>\n        </span>\n        <span class=\"bk-sr-only\">Save changes</span>\n      </button>\n\n    <span class=\"bk-sr-only\" data-feedback role=\"status\" aria-live=\"polite\" aria-atomic=\"true\"></span>\n  </div>", css: style1, mount: api0.mount },
"cancel": { markup: "<div class=\"button-kit\">\n\n<button class=\"bk-button bk-button--cancel\" data-action=\"cancel\" type=\"button\" data-state=\"idle\" disabled>\n        <span class=\"bk-surface\" aria-hidden=\"true\">\n          <span class=\"bk-wash\"></span>\n          <span class=\"bk-label bk-label-idle\">Cancel</span>\n          <span class=\"bk-label bk-label-cancelled\">Cancelled</span>\n        </span>\n        <span class=\"bk-sr-only\">Cancel</span>\n      </button>\n    <span class=\"bk-sr-only\" data-feedback role=\"status\" aria-live=\"polite\" aria-atomic=\"true\"></span>\n  </div>", css: style2, mount: api1.mount },
"copy": { markup: "<button class=\"sl-copy\" id=\"copy-button\" type=\"button\" aria-label=\"Copy text\" data-state=\"idle\" disabled>\n          <span class=\"sl-copy__surface\" aria-hidden=\"true\">\n            <span class=\"sl-copy__wash\"></span>\n            <span class=\"sl-copy__icon\">\n              <svg class=\"sl-copy__sheets\" viewBox=\"0 0 24 24\" fill=\"none\" focusable=\"false\"><rect class=\"sl-copy__back\" x=\"3.5\" y=\"3.5\" width=\"12\" height=\"14\" rx=\"3\"/><rect class=\"sl-copy__front\" x=\"8.5\" y=\"7.5\" width=\"12\" height=\"14\" rx=\"3\"/></svg>\n              <svg class=\"sl-copy__check\" viewBox=\"0 0 24 24\" fill=\"none\" focusable=\"false\"><path d=\"M4 12.5 9.2 17.5 20 6.5\" pathLength=\"1\"/></svg>\n            </span>\n            <span class=\"sl-copy__label\">Copy</span>\n          </span>\n        </button>\n  <p class=\"copy-feedback\" role=\"status\" aria-live=\"polite\" aria-atomic=\"true\"></p>", css: style3, mount: api2.mount },
"like": { markup: "<button class=\"sl-like\" id=\"like-button\" type=\"button\" aria-label=\"Like\" aria-pressed=\"false\" disabled>\n          <span class=\"sl-like__surface\" aria-hidden=\"true\">\n            <span class=\"sl-like__wash\"></span>\n            <span class=\"sl-like__icon\">\n              <svg class=\"sl-like__heart\" viewBox=\"0 0 24 24\" fill=\"none\" focusable=\"false\">\n                <path class=\"sl-like__outline\" d=\"M12 20S3 14.5 3 8.5a4.6 4.6 0 0 1 9-1.4 4.6 4.6 0 0 1 9 1.4C21 14.5 12 20 12 20Z\"/>\n                <path class=\"sl-like__fill\" d=\"M12 20S3 14.5 3 8.5a4.6 4.6 0 0 1 9-1.4 4.6 4.6 0 0 1 9 1.4C21 14.5 12 20 12 20Z\"/>\n              </svg>\n            </span>\n            <span class=\"sl-like__label\">Like</span>\n          </span>\n        </button>\n  <p class=\"like-feedback\" role=\"status\" aria-live=\"polite\" aria-atomic=\"true\"></p>", css: style4, mount: api3.mount },
"download": { markup: "<button class=\"sl-download\" id=\"download-button\" type=\"button\" aria-label=\"Download file\" data-download-state=\"idle\" disabled>\n          <span class=\"sl-download__surface\" aria-hidden=\"true\">\n            <span class=\"sl-download__wash\"></span>\n            <span class=\"sl-download__icon\">\n              <svg viewBox=\"0 0 24 24\" fill=\"none\" focusable=\"false\">\n                <path class=\"sl-download__arrow\" d=\"M12 3.5v10m-3.5-3.5 3.5 3.5 3.5-3.5\"/>\n                <g class=\"sl-download__tray\">\n                  <path class=\"sl-download__tray-left\" d=\"M4.5 20.5H9\"/>\n                  <path class=\"sl-download__tray-right\" d=\"M9 20.5H19.5\"/>\n                  <path class=\"sl-download__rim-left\" d=\"M4.5 16.5v4\"/>\n                  <path class=\"sl-download__rim-right\" d=\"M19.5 20.5v-4\"/>\n                </g>\n              </svg>\n            </span>\n            <span class=\"sl-download__label\">Download</span>\n          </span>\n        </button>\n  <p class=\"download-feedback\" role=\"status\" aria-live=\"polite\" aria-atomic=\"true\"></p>", css: style5, mount: api4.mount, demoMount: downloadDemo },
"bookmark": { markup: "<button class=\"sl-bookmark\" id=\"bookmark-button\" type=\"button\" aria-label=\"Bookmark\" aria-pressed=\"false\" disabled>\n          <span class=\"sl-bookmark__surface\" aria-hidden=\"true\">\n            <span class=\"sl-bookmark__wash\"></span>\n            <span class=\"sl-bookmark__icon\">\n              <svg class=\"sl-bookmark__ribbon\" viewBox=\"0 0 24 24\" fill=\"none\" focusable=\"false\">\n                <path class=\"sl-bookmark__outline\" d=\"M6 20V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v15l-6-4-6 4Z\"/>\n                <path class=\"sl-bookmark__fill\" d=\"M6 20V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v15l-6-4-6 4Z\"/>\n              </svg>\n            </span>\n            <span class=\"sl-bookmark__label\">Bookmark</span>\n          </span>\n        </button>\n  <p class=\"bookmark-feedback\" role=\"status\" aria-live=\"polite\" aria-atomic=\"true\"></p>", css: style6, mount: api5.mount },
"playback": { markup: "<button class=\"sl-playback\" id=\"playback-button\" type=\"button\" data-playing=\"false\" aria-label=\"Play\" disabled>\n          <span class=\"sl-playback__surface\" aria-hidden=\"true\">\n            <span class=\"sl-playback__icon\">\n              <span class=\"sl-playback__piece sl-playback__piece--left\"></span>\n              <span class=\"sl-playback__piece sl-playback__piece--right\"></span>\n            </span>\n            <span class=\"sl-playback__label\">Play</span>\n          </span>\n        </button>\n  <p class=\"playback-feedback\" role=\"status\" aria-live=\"polite\" aria-atomic=\"true\"></p>", css: style7, mount: api6.mount },
"delete": { markup: "<button class=\"sl-delete\" id=\"delete-button\" type=\"button\" data-state=\"idle\" aria-label=\"Delete\" disabled>\n          <span class=\"sl-delete__surface\" aria-hidden=\"true\">\n            <span class=\"sl-delete__icon\">\n              <svg class=\"sl-delete__trash\" viewBox=\"0 0 24 24\" fill=\"none\" focusable=\"false\">\n                <path class=\"sl-delete__bin\" d=\"m7 8 .8 12h8.4L17 8M10 11l.3 6M14 11l-.3 6\"/>\n                <g class=\"sl-delete__lid\"><path d=\"M5 6h14M9 6V4h6v2\"/></g>\n              </svg>\n            </span>\n            <span class=\"sl-delete__label\">Delete</span>\n          </span>\n        </button>\n  <p class=\"delete-feedback\" role=\"status\" aria-live=\"polite\" aria-atomic=\"true\"></p>", css: style8, mount: api7.mount },
"upload": { markup: "<button class=\"sl-upload\" id=\"upload-button\" type=\"button\" aria-label=\"Upload file\" data-upload-state=\"idle\" disabled>\n          <span class=\"sl-upload__surface\" aria-hidden=\"true\">\n            <span class=\"sl-upload__wash\"></span>\n            <span class=\"sl-upload__icon\">\n              <svg viewBox=\"0 0 24 24\" fill=\"none\" focusable=\"false\">\n                <path class=\"sl-upload__arrow\" d=\"M12 15.5V4m-4 4 4-4 4 4\"/>\n                <path class=\"sl-upload__tray\" d=\"M4.5 16.5v4h15v-4\"/>\n                <path class=\"sl-upload__progress\" d=\"M4.5 20.5h15\"/>\n                <path class=\"sl-upload__check\" d=\"m4 12.5 5 5L20 6.5\" pathLength=\"1\"/>\n              </svg>\n            </span>\n            <span class=\"sl-upload__label\">Upload</span>\n          </span>\n        </button>\n  <input id=\"upload-input\" type=\"file\" hidden aria-label=\"Choose a file\">\n  <p class=\"upload-feedback\" role=\"status\" aria-live=\"polite\" aria-atomic=\"true\"></p>", css: style9, mount: api8.mount, demoMount: uploadDemo },
"share": { markup: "<div class=\"sl-share-control\">\n          <button class=\"sl-share\" type=\"button\" aria-label=\"Share link\" aria-expanded=\"false\" disabled>\n            <span class=\"sl-share__surface\" aria-hidden=\"true\"><span class=\"sl-share__icon\"><svg viewBox=\"0 0 24 24\" fill=\"none\" focusable=\"false\"><circle cx=\"6\" cy=\"12\" r=\"2.6\"/><g class=\"sl-share__upper\"><path d=\"m8.4 10.7 7.2-4\"/><circle cx=\"18\" cy=\"5.4\" r=\"2.6\"/></g><g class=\"sl-share__lower\"><path d=\"m8.4 13.3 7.2 4\"/><circle cx=\"18\" cy=\"18.6\" r=\"2.6\"/></g></svg></span><span class=\"sl-share__label\">Share</span></span>\n          </button>\n          <div class=\"sl-share__popover\" role=\"group\" aria-label=\"Share link options\" aria-hidden=\"true\" inert>\n            <input class=\"sl-share__url\" type=\"text\" readonly aria-label=\"Link to share\" spellcheck=\"false\">\n            <button class=\"sl-share__copy\" type=\"button\">Copy link</button>\n            <button class=\"sl-share__send\" type=\"button\" hidden>Share…</button>\n          </div>\n        </div>\n  <p class=\"share-feedback\" role=\"status\" aria-live=\"polite\" aria-atomic=\"true\"></p>", css: style10, mount: api9.mount },
"follow": { markup: "<button class=\"sl-follow\" id=\"follow-button\" type=\"button\" aria-label=\"Follow\" aria-pressed=\"false\" disabled>\n          <span class=\"sl-follow__surface\" aria-hidden=\"true\">\n            <span class=\"sl-follow__wash\"></span>\n            <span class=\"sl-follow__icon\">\n              <svg class=\"sl-follow__person\" viewBox=\"0 0 28 24\" fill=\"none\" focusable=\"false\"><circle cx=\"8\" cy=\"7\" r=\"3\"/><path d=\"M2 20v-1a6 6 0 0 1 12 0v1\"/></svg>\n              <span class=\"sl-follow__mark\"><span class=\"sl-follow__mark-short\"></span><span class=\"sl-follow__mark-long\"></span></span>\n            </span>\n            <span class=\"sl-follow__label\">Follow</span>\n          </span>\n        </button>\n  <p class=\"follow-feedback\" role=\"status\" aria-live=\"polite\" aria-atomic=\"true\"></p>", css: style11, mount: api10.mount },
"text-input": { markup: "<div class=\"sl-field\" id=\"text-field\">\n            <div class=\"sl-field__control\"><input class=\"sl-field__input\" id=\"demo-text\" type=\"text\" placeholder=\" \" autocomplete=\"off\" aria-describedby=\"text-help\"><label class=\"sl-field__label\" for=\"demo-text\">Project name</label></div>\n            <p class=\"sl-field__helper\" id=\"text-help\">Try a name for your next project.</p>\n          </div>", css: style12, mount: api11.mount },
"search-input": { markup: "<div class=\"sl-field sl-field--search\" id=\"search-field\" data-search-open=\"false\">\n            <div class=\"sl-field__control\">\n              <svg class=\"sl-field__leading\" viewBox=\"0 0 24 24\" fill=\"none\" aria-hidden=\"true\"><circle cx=\"10.5\" cy=\"10.5\" r=\"6.5\"/><path d=\"m16 16 4.5 4.5\"/></svg>\n              <input class=\"sl-field__input\" id=\"demo-search\" type=\"search\" placeholder=\" \" autocomplete=\"off\" spellcheck=\"false\" role=\"combobox\" aria-autocomplete=\"list\" aria-controls=\"search-options\" aria-expanded=\"false\" aria-describedby=\"search-help\">\n              <label class=\"sl-field__label\" for=\"demo-search\">Find a component</label>\n              <button class=\"sl-field__action sl-field__clear\" type=\"button\" aria-label=\"Clear search\" aria-controls=\"demo-search\" hidden><svg viewBox=\"0 0 24 24\" fill=\"none\" aria-hidden=\"true\"><path d=\"m7 7 10 10M17 7 7 17\"/></svg></button>\n            </div>\n            <div class=\"sl-field__popup\" aria-hidden=\"true\" inert><ul class=\"sl-field__options\" id=\"search-options\" role=\"listbox\" aria-label=\"Component suggestions\"></ul><p class=\"sl-field__empty\" hidden>No matches. Try another word.</p></div>\n            <p class=\"sl-field__helper\" id=\"search-help\" role=\"status\" aria-live=\"polite\">Search the local component list.</p>\n          </div>", css: style12, mount: api12.mount },
"email-input": { markup: "<div class=\"sl-field sl-field--email\" id=\"email-field\" data-validation=\"neutral\">\n            <div class=\"sl-field__control\">\n              <input class=\"sl-field__input\" id=\"demo-email\" type=\"email\" placeholder=\" \" autocomplete=\"off\" spellcheck=\"false\" aria-describedby=\"email-help\">\n              <label class=\"sl-field__label\" for=\"demo-email\">Email address</label>\n              <svg class=\"sl-field__validation\" viewBox=\"0 0 24 24\" fill=\"none\" aria-hidden=\"true\"><g class=\"sl-field__invalid-icon\"><path pathLength=\"1\" d=\"m8.25 8.25 7.5 7.5\"/><path pathLength=\"1\" d=\"m15.75 8.25-7.5 7.5\"/></g><path class=\"sl-field__valid-icon\" pathLength=\"1\" d=\"m5.5 12 4 4 9-9\"/></svg>\n            </div>\n            <p class=\"sl-field__helper\" id=\"email-help\" role=\"status\" aria-live=\"polite\">Use an address such as name@example.com.</p>\n          </div>", css: style12, mount: api13.mount },
"password-input": { markup: "<div class=\"sl-field sl-field--password\" id=\"password-field\" data-visible=\"false\">\n            <div class=\"sl-field__control\">\n              <input class=\"sl-field__input\" id=\"demo-password\" type=\"password\" placeholder=\" \" value=\"sample-word\" autocomplete=\"off\" spellcheck=\"false\" autocapitalize=\"off\" data-1p-ignore data-lpignore=\"true\" data-bwignore aria-describedby=\"password-help\">\n              <label class=\"sl-field__label\" for=\"demo-password\">Demo password</label>\n              <button class=\"sl-field__action sl-field__reveal\" type=\"button\" aria-label=\"Show password\" aria-pressed=\"false\" aria-controls=\"demo-password\">\n                <svg class=\"sl-field__eyes\" viewBox=\"0 0 32 24\" fill=\"none\" aria-hidden=\"true\">\n                  <g class=\"sl-field__eyes-open\">\n                    <path d=\"M2.5 12s2.2-3.5 6-3.5 6 3.5 6 3.5-2.2 3.5-6 3.5-6-3.5-6-3.5Zm15 0s2.2-3.5 6-3.5 6 3.5 6 3.5-2.2 3.5-6 3.5-6-3.5-6-3.5Z\"/>\n                    <circle cx=\"8.5\" cy=\"12\" r=\"1.5\"/><circle cx=\"23.5\" cy=\"12\" r=\"1.5\"/>\n                  </g>\n                  <g class=\"sl-field__eyes-closed\">\n                    <path d=\"M2.5 12.5c1.7 2.7 4 3.7 6 3.7s4.3-1 6-3.7M17.5 12.5c1.7 2.7 4 3.7 6 3.7s4.3-1 6-3.7\"/>\n                  </g>\n                </svg>\n              </button>\n            </div>\n            <p class=\"sl-field__helper\" id=\"password-help\">Sample text only. There is no sign-in.</p>\n          </div>", css: style12, mount: api14.mount },
"number-input": { markup: "<div class=\"sl-field sl-field--number\" id=\"number-field\" data-validation=\"neutral\">\n            <div class=\"sl-field__control\">\n              <input class=\"sl-field__input\" id=\"demo-number\" type=\"number\" placeholder=\" \" value=\"3\" min=\"0\" max=\"12\" step=\"1\" required inputmode=\"numeric\" aria-describedby=\"number-help\">\n              <label class=\"sl-field__label\" for=\"demo-number\">Quantity</label>\n              <div class=\"sl-field__steps\"><button class=\"sl-field__step\" type=\"button\" data-step=\"-1\" aria-label=\"Decrease quantity\" aria-controls=\"demo-number\"><svg viewBox=\"0 0 24 24\" fill=\"none\" aria-hidden=\"true\"><path d=\"M6 12h12\"/></svg></button><button class=\"sl-field__step\" type=\"button\" data-step=\"1\" aria-label=\"Increase quantity\" aria-controls=\"demo-number\"><svg viewBox=\"0 0 24 24\" fill=\"none\" aria-hidden=\"true\"><path d=\"M6 12h12M12 6v12\"/></svg></button></div>\n            </div>\n            <p class=\"sl-field__helper\" id=\"number-help\" role=\"status\" aria-live=\"polite\">Choose 0 to 12 in steps of 1.</p>\n          </div>", css: style12, mount: api15.mount },
"textarea-input": { markup: "<div class=\"sl-field sl-field--textarea\" id=\"textarea-field\">\n            <div class=\"sl-field__control\">\n              <textarea class=\"sl-field__input\" id=\"demo-textarea\" placeholder=\" \" maxlength=\"180\" rows=\"1\" aria-describedby=\"textarea-help\"></textarea>\n              <label class=\"sl-field__label\" for=\"demo-textarea\">Project notes</label>\n              <span class=\"sl-field__counter\" aria-hidden=\"true\"><span data-count>0</span><span>/180</span></span>\n            </div>\n            <p class=\"sl-field__helper\" id=\"textarea-help\" role=\"status\" aria-live=\"polite\">Add a short note for your team.</p>\n          </div>", css: style12, mount: api16.mount },
"url-input": { markup: "<div class=\"sl-field sl-field--url\" id=\"url-field\" data-validation=\"neutral\">\n            <div class=\"sl-field__control\">\n              <svg class=\"sl-field__leading sl-field__globe\" viewBox=\"0 0 24 24\" fill=\"none\" aria-hidden=\"true\"><circle cx=\"12\" cy=\"12\" r=\"8.25\"/><path class=\"sl-field__globe-axis\" d=\"M3.9 12h16.2M12 3.75c2.35 2.2 3.55 4.95 3.55 8.25S14.35 18.05 12 20.25M12 3.75C9.65 5.95 8.45 8.7 8.45 12S9.65 18.05 12 20.25\"/></svg>\n              <input class=\"sl-field__input\" id=\"demo-url\" type=\"url\" placeholder=\" \" autocomplete=\"url\" spellcheck=\"false\" required aria-describedby=\"url-help\">\n              <label class=\"sl-field__label\" for=\"demo-url\">Website URL</label>\n              <svg class=\"sl-field__validation\" viewBox=\"0 0 24 24\" fill=\"none\" aria-hidden=\"true\"><g class=\"sl-field__invalid-icon\"><path pathLength=\"1\" d=\"m8.25 8.25 7.5 7.5\"/><path pathLength=\"1\" d=\"m15.75 8.25-7.5 7.5\"/></g><path class=\"sl-field__valid-icon\" pathLength=\"1\" d=\"m5.5 12 4 4 9-9\"/></svg>\n            </div>\n            <p class=\"sl-field__helper\" id=\"url-help\" role=\"status\" aria-live=\"polite\">Use a complete address such as https://example.com.</p>\n          </div>", css: style12, mount: api17.mount },
"phone-input": { markup: "<div class=\"sl-field sl-field--phone\" id=\"phone-field\">\n            <div class=\"sl-field__control\">\n              <svg class=\"sl-field__leading sl-field__phone\" viewBox=\"0 0 28 28\" fill=\"none\" aria-hidden=\"true\"><path class=\"sl-field__phone-body\" d=\"M8.3 5.8 11 9.9l-2.1 2c1.2 2.7 3.3 4.8 6 6l2-2.1 4.2 2.7-.9 3c-.3 1-1.3 1.7-2.4 1.5C10.7 21.9 5.1 16.3 4 9.2c-.2-1.1.5-2.1 1.5-2.4l2.8-1Z\"/><path class=\"sl-field__phone-ring sl-field__phone-ring--one\" d=\"M17.2 5.5c2.7.6 4.7 2.6 5.3 5.3\"/><path class=\"sl-field__phone-ring sl-field__phone-ring--two\" d=\"M17.7 1.9c4.2.8 7.5 4.2 8.4 8.4\"/></svg>\n              <input class=\"sl-field__input\" id=\"demo-phone\" type=\"tel\" placeholder=\" \" autocomplete=\"tel\" inputmode=\"tel\" maxlength=\"20\" aria-describedby=\"phone-help\">\n              <label class=\"sl-field__label\" for=\"demo-phone\">Phone number</label>\n            </div>\n            <p class=\"sl-field__helper\" id=\"phone-help\">Formatted as +1 (415) 555-0132 while you type.</p>\n          </div>", css: style12, mount: api18.mount },
"amount-input": { markup: "<div class=\"sl-field sl-field--amount\" id=\"amount-field\" data-amount-state=\"formatted\">\n            <div class=\"sl-field__control\">\n              <span class=\"sl-field__currency\" aria-hidden=\"true\">$</span>\n              <input class=\"sl-field__input\" id=\"demo-amount\" type=\"text\" placeholder=\" \" value=\"1,250\" autocomplete=\"off\" inputmode=\"decimal\" aria-describedby=\"amount-help\">\n              <label class=\"sl-field__label\" for=\"demo-amount\">Amount</label>\n              <span class=\"sl-field__currency-code\" aria-hidden=\"true\">USD</span>\n            </div>\n            <p class=\"sl-field__helper\" id=\"amount-help\" role=\"status\" aria-live=\"polite\">Formatting is applied when you leave the field.</p>\n          </div>", css: style12, mount: api19.mount },
"code-input": { markup: "<div class=\"sl-field sl-field--code\" id=\"code-field\" data-length=\"0\" data-complete=\"false\" data-result=\"neutral\">\n            <label class=\"sl-code__label\" for=\"demo-code\">Verification code</label>\n            <div class=\"sl-code__control\">\n              <input class=\"sl-code__input\" id=\"demo-code\" type=\"text\" inputmode=\"numeric\" autocomplete=\"one-time-code\" data-code-length=\"6\" pattern=\"[0-9]{6}\" aria-describedby=\"code-help\">\n              <div class=\"sl-code__cells\" aria-hidden=\"true\"><span></span><span></span><span></span><span></span><span></span><span></span></div>\n            </div>\n            <p class=\"sl-field__helper\" id=\"code-help\" role=\"status\" aria-live=\"polite\">Enter 482731 to see the accepted state.</p>\n          </div>", css: style12, mount: api20.mount },
"glide-toggle": { markup: "<div class=\"sl-toggle sl-toggle--glide\" id=\"glide-toggle\" data-checked=\"true\">\n            <span class=\"sl-toggle__emblem\" aria-hidden=\"true\"><svg viewBox=\"0 0 32 32\" fill=\"none\"><g class=\"sl-bell__body\"><path d=\"M10 14a6 6 0 0 1 12 0v4l2 4H8l2-4v-4ZM14 26a2.5 2.5 0 0 0 4 0M16 5v3\"/></g><g class=\"sl-bell__waves\"><path d=\"M6.5 9.5A11 11 0 0 0 4 16M25.5 9.5A11 11 0 0 1 28 16\"/></g><path class=\"sl-bell__slash\" pathLength=\"1\" d=\"m7 6 18 21\"/></svg></span>\n            <label class=\"sl-toggle__label\" for=\"demo-glide\"><span class=\"sl-toggle__copy\"><span class=\"sl-toggle__title\">Notifications</span><span class=\"sl-toggle__status\" data-status>On</span></span></label>\n            <span class=\"sl-toggle__switch\"><input class=\"sl-toggle__input\" id=\"demo-glide\" type=\"checkbox\" checked data-on=\"On\" data-off=\"Off\"><span class=\"sl-toggle__track\" aria-hidden=\"true\"><span class=\"sl-toggle__thumb\"></span></span></span>\n          </div>", css: style13, mount: api21.mount },
"theme-toggle": { markup: "<div class=\"sl-toggle sl-toggle--theme\" id=\"theme-toggle\" data-checked=\"false\">\n            <label class=\"sl-toggle__label\" for=\"demo-theme\"><span class=\"sl-toggle__copy\"><span class=\"sl-toggle__title\">Appearance</span><span class=\"sl-toggle__status\" data-status>Light</span></span></label>\n            <span class=\"sl-toggle__switch\"><input class=\"sl-toggle__input\" id=\"demo-theme\" type=\"checkbox\" data-on=\"Dark\" data-off=\"Light\"><span class=\"sl-toggle__track\" aria-hidden=\"true\"><span class=\"sl-toggle__thumb\"><svg class=\"sl-toggle__sun\" viewBox=\"0 0 24 24\" fill=\"none\"><circle cx=\"12\" cy=\"12\" r=\"3.5\"/><path d=\"M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6 7 7M17 17l1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4\"/></svg><svg class=\"sl-toggle__moon\" viewBox=\"0 0 24 24\" fill=\"none\"><path d=\"M18.5 16.3A7 7 0 0 1 7.7 5.5 7.5 7.5 0 1 0 18.5 16.3Z\"/></svg></span></span></span>\n          </div>", css: style13, mount: api21.mount },
"sound-toggle": { markup: "<div class=\"sl-toggle sl-toggle--sound\" id=\"sound-toggle\" data-checked=\"true\">\n            <span class=\"sl-toggle__emblem\" aria-hidden=\"true\"><svg viewBox=\"0 0 32 32\" fill=\"none\"><path class=\"sl-sound__speaker\" d=\"M6 13h5l6-5v16l-6-5H6v-6Z\"/><path class=\"sl-sound__wave sl-sound__wave--one\" d=\"M21 12.5a5 5 0 0 1 0 7\"/><path class=\"sl-sound__wave sl-sound__wave--two\" d=\"M24 9a10 10 0 0 1 0 14\"/><path class=\"sl-sound__mute\" d=\"m21 13 6 6M27 13l-6 6\"/></svg></span>\n            <label class=\"sl-toggle__label\" for=\"demo-sound\"><span class=\"sl-toggle__copy\"><span class=\"sl-toggle__title\">Interface sounds</span><span class=\"sl-toggle__status\" data-status>Playing</span></span></label>\n            <span class=\"sl-toggle__switch\"><input class=\"sl-toggle__input\" id=\"demo-sound\" type=\"checkbox\" checked data-on=\"Playing\" data-off=\"Muted\"><span class=\"sl-toggle__track\" aria-hidden=\"true\"><span class=\"sl-toggle__thumb\"></span></span></span>\n          </div>", css: style13, mount: api21.mount },
"privacy-toggle": { markup: "<div class=\"sl-toggle sl-toggle--privacy\" id=\"privacy-toggle\" data-checked=\"false\">\n            <span class=\"sl-toggle__emblem\" aria-hidden=\"true\"><svg viewBox=\"0 0 32 32\" fill=\"none\"><path class=\"sl-lock__shackle\" d=\"M10 14V10a6 6 0 0 1 12 0v4\"/><rect class=\"sl-lock__body\" x=\"7\" y=\"13\" width=\"18\" height=\"14\" rx=\"4\"/><path class=\"sl-lock__key\" d=\"M16 19v3\"/></svg></span>\n            <label class=\"sl-toggle__label\" for=\"demo-privacy\"><span class=\"sl-toggle__copy\"><span class=\"sl-toggle__title\">Private profile</span><span class=\"sl-toggle__status\" data-status>Public</span></span></label>\n            <span class=\"sl-toggle__switch\"><input class=\"sl-toggle__input\" id=\"demo-privacy\" type=\"checkbox\" data-on=\"Private\" data-off=\"Public\"><span class=\"sl-toggle__track\" aria-hidden=\"true\"><span class=\"sl-toggle__thumb\"></span></span></span>\n          </div>", css: style13, mount: api21.mount },
"sync-toggle": { markup: "<div class=\"sl-toggle sl-toggle--sync\" id=\"sync-toggle\" data-checked=\"false\">\n            <span class=\"sl-toggle__emblem\" aria-hidden=\"true\"><svg class=\"sl-sync__orbit\" viewBox=\"0 0 32 32\" fill=\"none\"><path d=\"M25 11a10 10 0 0 0-16-2l-2 2\"/><path d=\"M7 6v5h5M7 21a10 10 0 0 0 16 2l2-2\"/><path d=\"M25 26v-5h-5\"/></svg></span>\n            <label class=\"sl-toggle__label\" for=\"demo-sync\"><span class=\"sl-toggle__copy\"><span class=\"sl-toggle__title\">Automatic sync</span><span class=\"sl-toggle__status\" data-status>Manual</span></span></label>\n            <span class=\"sl-toggle__switch\"><input class=\"sl-toggle__input\" id=\"demo-sync\" type=\"checkbox\" data-on=\"Automatic\" data-off=\"Manual\"><span class=\"sl-toggle__track\" aria-hidden=\"true\"><span class=\"sl-toggle__thumb\"></span></span></span>\n          </div>", css: style13, mount: api21.mount },
"wifi-toggle": { markup: "<div class=\"sl-toggle sl-toggle--wifi\" id=\"wifi-toggle\" data-checked=\"true\">\n            <span class=\"sl-toggle__emblem\" aria-hidden=\"true\"><svg viewBox=\"0 0 32 32\" fill=\"none\"><circle cx=\"16\" cy=\"25\" r=\"1\" fill=\"currentColor\"/><path class=\"wifi-arc a1\" d=\"M12 20a6 6 0 0 1 8 0\"/><path class=\"wifi-arc a2\" d=\"M8 15a12 12 0 0 1 16 0\"/><path class=\"wifi-arc a3\" d=\"M4 10a18 18 0 0 1 24 0\"/></svg></span>\n            <label class=\"sl-toggle__label\" for=\"demo-wifi\"><span class=\"sl-toggle__copy\"><span class=\"sl-toggle__title\">Wi-Fi</span><span class=\"sl-toggle__status\" data-status>Connected</span></span></label>\n            <span class=\"sl-toggle__switch\"><input class=\"sl-toggle__input\" id=\"demo-wifi\" type=\"checkbox\" checked data-on=\"Connected\" data-off=\"Offline\"><span class=\"sl-toggle__track\" aria-hidden=\"true\"><span class=\"sl-toggle__thumb\"></span></span></span>\n          </div>", css: style14, mount: api21.mount },
"location-toggle": { markup: "<div class=\"sl-toggle sl-toggle--location\" id=\"location-toggle\" data-checked=\"false\">\n            <span class=\"sl-toggle__emblem\" aria-hidden=\"true\"><svg viewBox=\"0 0 32 32\" fill=\"none\"><ellipse class=\"location-base\" cx=\"16\" cy=\"27\" rx=\"7\" ry=\"2\"/><g class=\"location-pin\"><path d=\"M24 13c0 6-8 12-8 12S8 19 8 13a8 8 0 1 1 16 0Z\"/><circle class=\"location-dot\" cx=\"16\" cy=\"13\" r=\"2.5\"/></g></svg></span>\n            <label class=\"sl-toggle__label\" for=\"demo-location\"><span class=\"sl-toggle__copy\"><span class=\"sl-toggle__title\">Location</span><span class=\"sl-toggle__status\" data-status>Paused</span></span></label>\n            <span class=\"sl-toggle__switch\"><input class=\"sl-toggle__input\" id=\"demo-location\" type=\"checkbox\" data-on=\"Enabled\" data-off=\"Paused\"><span class=\"sl-toggle__track\" aria-hidden=\"true\"><span class=\"sl-toggle__thumb\"></span></span></span>\n          </div>", css: style14, mount: api21.mount },
"battery-toggle": { markup: "<div class=\"sl-toggle sl-toggle--battery\" id=\"battery-toggle\" data-checked=\"false\">\n            <span class=\"sl-toggle__emblem\" aria-hidden=\"true\"><svg viewBox=\"0 0 32 32\" fill=\"none\"><rect x=\"3\" y=\"8\" width=\"24\" height=\"16\" rx=\"4\"/><path d=\"M30 13v6\"/><g class=\"battery-bars\"><path d=\"M8 13v6M13 13v6M18 13v6M23 13v6\"/></g><g class=\"battery-leaf\"><path d=\"M11 20c-5-8 4-9 10-9 0 8-4 12-10 9Z\"/><path d=\"m10 22 8-8\"/></g></svg></span>\n            <label class=\"sl-toggle__label\" for=\"demo-battery\"><span class=\"sl-toggle__copy\"><span class=\"sl-toggle__title\">Battery saver</span><span class=\"sl-toggle__status\" data-status>Standard</span></span></label>\n            <span class=\"sl-toggle__switch\"><input class=\"sl-toggle__input\" id=\"demo-battery\" type=\"checkbox\" data-on=\"Saving energy\" data-off=\"Standard\"><span class=\"sl-toggle__track\" aria-hidden=\"true\"><span class=\"sl-toggle__thumb\"></span></span></span>\n          </div>", css: style14, mount: api21.mount },
"microphone-toggle": { markup: "<div class=\"sl-toggle sl-toggle--microphone\" id=\"microphone-toggle\" data-checked=\"true\">\n            <span class=\"sl-toggle__emblem\" aria-hidden=\"true\"><svg viewBox=\"0 0 32 32\" fill=\"none\"><rect x=\"12\" y=\"4\" width=\"8\" height=\"15\" rx=\"4\"/><path d=\"M8 14v2a8 8 0 0 0 16 0v-2M16 24v4M12 28h8\"/><g class=\"mic-waves\"><path d=\"M4 11v7M28 11v7\"/></g><path class=\"mic-slash\" pathLength=\"1\" d=\"m5 5 22 22\"/></svg></span>\n            <label class=\"sl-toggle__label\" for=\"demo-microphone\"><span class=\"sl-toggle__copy\"><span class=\"sl-toggle__title\">Microphone</span><span class=\"sl-toggle__status\" data-status>Unmuted</span></span></label>\n            <span class=\"sl-toggle__switch\"><input class=\"sl-toggle__input\" id=\"demo-microphone\" type=\"checkbox\" checked data-on=\"Unmuted\" data-off=\"Muted\"><span class=\"sl-toggle__track\" aria-hidden=\"true\"><span class=\"sl-toggle__thumb\"></span></span></span>\n          </div>", css: style14, mount: api21.mount },
"autosave-toggle": { markup: "<div class=\"sl-toggle sl-toggle--autosave\" id=\"autosave-toggle\" data-checked=\"false\">\n            <span class=\"sl-toggle__emblem\" aria-hidden=\"true\"><svg viewBox=\"0 0 32 32\" fill=\"none\"><path d=\"M7 5h16l4 4v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z\"/><path class=\"save-slot\" d=\"M11 5v7h10V5\"/><path class=\"save-line\" d=\"M11 21h10\"/><path class=\"save-check\" pathLength=\"1\" d=\"m10 20 4 4 8-8\"/></svg></span>\n            <label class=\"sl-toggle__label\" for=\"demo-autosave\"><span class=\"sl-toggle__copy\"><span class=\"sl-toggle__title\">Auto save</span><span class=\"sl-toggle__status\" data-status>Manual</span></span></label>\n            <span class=\"sl-toggle__switch\"><input class=\"sl-toggle__input\" id=\"demo-autosave\" type=\"checkbox\" data-on=\"Automatic\" data-off=\"Manual\"><span class=\"sl-toggle__track\" aria-hidden=\"true\"><span class=\"sl-toggle__thumb\"></span></span></span>\n          </div>", css: style14, mount: api21.mount },
"draw-checkbox": { markup: "<div class=\"sl-check-card\" data-demo=\"draw\"><label class=\"sl-check sl-check--draw\"><input class=\"sl-check__input\" id=\"demo-draw\" name=\"demo-draw\" type=\"checkbox\" ><span class=\"sl-check__box\" aria-hidden=\"true\"><svg viewBox=\"0 0 24 24\" fill=\"none\"><path class=\"sl-check__tick\" pathLength=\"1\" d=\"m5 12 4.5 4.5L19 7\"/><path class=\"sl-check__dash\" d=\"M6 12h12\"/></svg></span><span class=\"sl-check__copy\"><span class=\"sl-check__title\">Accept terms</span><span class=\"sl-check__hint\">A deliberate choice.</span></span></label></div>", css: style15, mount: api22.mount },
"fill-checkbox": { markup: "<div class=\"sl-check-card\" data-demo=\"fill\"><label class=\"sl-check sl-check--fill\"><input class=\"sl-check__input\" id=\"demo-fill\" name=\"demo-fill\" type=\"checkbox\" ><span class=\"sl-check__box\" aria-hidden=\"true\"><svg viewBox=\"0 0 24 24\" fill=\"none\"><path class=\"sl-check__tick\" pathLength=\"1\" d=\"m5 12 4.5 4.5L19 7\"/><path class=\"sl-check__dash\" d=\"M6 12h12\"/></svg></span><span class=\"sl-check__copy\"><span class=\"sl-check__title\">Include attachments</span><span class=\"sl-check__hint\">Keep everything together.</span></span></label></div>", css: style15, mount: api22.mount },
"sweep-checkbox": { markup: "<div class=\"sl-check-card\" data-demo=\"sweep\"><label class=\"sl-check sl-check--outline\"><input class=\"sl-check__input\" id=\"demo-sweep\" name=\"demo-sweep\" type=\"checkbox\" ><span class=\"sl-check__box\" aria-hidden=\"true\"><svg viewBox=\"0 0 24 24\" fill=\"none\"><path class=\"sl-check__tick\" pathLength=\"1\" d=\"m5 12 4.5 4.5L19 7\"/><path class=\"sl-check__dash\" d=\"M6 12h12\"/></svg></span><span class=\"sl-check__copy\"><span class=\"sl-check__title\">Remember choice</span><span class=\"sl-check__hint\">Ready for next time.</span></span></label></div>", css: style15, mount: api22.mount },
"task-checkbox": { markup: "<div class=\"sl-check-card\" data-demo=\"task\"><label class=\"sl-check sl-check--task\"><input class=\"sl-check__input\" id=\"demo-task\" name=\"demo-task\" type=\"checkbox\" ><span class=\"sl-check__box\" aria-hidden=\"true\"><svg viewBox=\"0 0 24 24\" fill=\"none\"><path class=\"sl-check__tick\" pathLength=\"1\" d=\"m5 12 4.5 4.5L19 7\"/><path class=\"sl-check__dash\" d=\"M6 12h12\"/></svg></span><span class=\"sl-check__copy\"><span class=\"sl-check__title\">Review the design</span><span class=\"sl-check__hint\">One less thing to do.</span></span></label></div>", css: style15, mount: api22.mount },
"group-checkbox": { markup: "<fieldset class=\"sl-check-card sl-check-group\" data-demo=\"group\"><legend class=\"visually-hidden\">Export assets</legend>\n<label class=\"sl-check sl-check--draw\"><input class=\"sl-check__input\" id=\"demo-all\" name=\"demo-all\" type=\"checkbox\" data-parent><span class=\"sl-check__box\" aria-hidden=\"true\"><svg viewBox=\"0 0 24 24\" fill=\"none\"><path class=\"sl-check__tick\" pathLength=\"1\" d=\"m5 12 4.5 4.5L19 7\"/><path class=\"sl-check__dash\" d=\"M6 12h12\"/></svg></span><span class=\"sl-check__copy\"><span class=\"sl-check__title\">Select all</span><span class=\"sl-check__hint\">Export assets</span></span></label>\n<div class=\"sl-check-group__children\">\n<label class=\"sl-check sl-check--draw\"><input class=\"sl-check__input\" id=\"demo-icons\" name=\"demo-icons\" type=\"checkbox\" data-child checked><span class=\"sl-check__box\" aria-hidden=\"true\"><svg viewBox=\"0 0 24 24\" fill=\"none\"><path class=\"sl-check__tick\" pathLength=\"1\" d=\"m5 12 4.5 4.5L19 7\"/><path class=\"sl-check__dash\" d=\"M6 12h12\"/></svg></span><span class=\"sl-check__copy\"><span class=\"sl-check__title\">Icons</span></span></label>\n<label class=\"sl-check sl-check--draw\"><input class=\"sl-check__input\" id=\"demo-images\" name=\"demo-images\" type=\"checkbox\" data-child><span class=\"sl-check__box\" aria-hidden=\"true\"><svg viewBox=\"0 0 24 24\" fill=\"none\"><path class=\"sl-check__tick\" pathLength=\"1\" d=\"m5 12 4.5 4.5L19 7\"/><path class=\"sl-check__dash\" d=\"M6 12h12\"/></svg></span><span class=\"sl-check__copy\"><span class=\"sl-check__title\">Images</span></span></label>\n<label class=\"sl-check sl-check--draw\"><input class=\"sl-check__input\" id=\"demo-fonts\" name=\"demo-fonts\" type=\"checkbox\" data-child><span class=\"sl-check__box\" aria-hidden=\"true\"><svg viewBox=\"0 0 24 24\" fill=\"none\"><path class=\"sl-check__tick\" pathLength=\"1\" d=\"m5 12 4.5 4.5L19 7\"/><path class=\"sl-check__dash\" d=\"M6 12h12\"/></svg></span><span class=\"sl-check__copy\"><span class=\"sl-check__title\">Fonts</span></span></label>\n</div></fieldset>", css: style15, mount: api22.mount },
"cross-square-checkbox": { markup: "<div class=\"sl-check-card \" data-demo=\"cross-square\"><label class=\"sl-check sl-check--cross sl-check--sharp\"><input class=\"sl-check__input\" type=\"checkbox\" id=\"demo-cross-square\" name=\"demo-cross-square\" ><span class=\"sl-check__box\" aria-hidden=\"true\"><svg viewBox=\"0 0 24 24\" fill=\"none\"><path class=\"mark-stroke stroke-one\" pathLength=\"1\" d=\"m7 7 10 10\"/><path class=\"mark-stroke stroke-two\" pathLength=\"1\" d=\"M17 7 7 17\"/><path class=\"sl-check__dash\" d=\"M6 12h12\"/></svg></span><span class=\"sl-check__copy\"><span class=\"sl-check__title\">Exclude archive</span><span class=\"sl-check__hint\">A cross means excluded</span></span></label></div>", css: style15, mount: api22.mount },
"cross-circle-checkbox": { markup: "<div class=\"sl-check-card \" data-demo=\"cross-circle\"><label class=\"sl-check sl-check--cross sl-check--round sl-check--cross-turn\"><input class=\"sl-check__input\" type=\"checkbox\" id=\"demo-cross-circle\" name=\"demo-cross-circle\" ><span class=\"sl-check__box\" aria-hidden=\"true\"><svg viewBox=\"0 0 24 24\" fill=\"none\"><path class=\"mark-stroke stroke-one\" pathLength=\"1\" d=\"m7 7 10 10\"/><path class=\"mark-stroke stroke-two\" pathLength=\"1\" d=\"M17 7 7 17\"/><path class=\"sl-check__dash\" d=\"M6 12h12\"/></svg></span><span class=\"sl-check__copy\"><span class=\"sl-check__title\">Hide from collection</span><span class=\"sl-check__hint\">Nothing is deleted</span></span></label></div>", css: style15, mount: api22.mount },
"star-checkbox": { markup: "<div class=\"sl-check-card \" data-demo=\"star\"><label class=\"sl-check sl-check--icon sl-check--star\"><input class=\"sl-check__input\" type=\"checkbox\" id=\"demo-star\" name=\"demo-star\" ><span class=\"sl-check__box\" aria-hidden=\"true\"><svg viewBox=\"0 0 24 24\" fill=\"none\"><path class=\"mark-icon\" d=\"m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3Z\"/><path class=\"sl-check__dash\" d=\"M6 12h12\"/></svg></span><span class=\"sl-check__copy\"><span class=\"sl-check__title\">Add to favorites</span><span class=\"sl-check__hint\">Mark what matters</span></span></label></div>", css: style15, mount: api22.mount },
"heart-checkbox": { markup: "<div class=\"sl-check-card \" data-demo=\"heart\"><label class=\"sl-check sl-check--icon sl-check--round sl-check--heart\"><input class=\"sl-check__input\" type=\"checkbox\" id=\"demo-heart\" name=\"demo-heart\" ><span class=\"sl-check__box\" aria-hidden=\"true\"><svg viewBox=\"0 0 24 24\" fill=\"none\"><path class=\"mark-icon\" d=\"M12 20 4.7 13C-.5 7.5 6.5 1.5 12 7c5.5-5.5 12.5.5 7.3 6L12 20Z\"/><path class=\"sl-check__dash\" d=\"M6 12h12\"/></svg></span><span class=\"sl-check__copy\"><span class=\"sl-check__title\">Like this</span><span class=\"sl-check__hint\">Save to collection</span></span></label></div>", css: style15, mount: api22.mount },
"bookmark-checkbox": { markup: "<div class=\"sl-check-card \" data-demo=\"bookmark\"><label class=\"sl-check sl-check--icon sl-check--bookmark\"><input class=\"sl-check__input\" type=\"checkbox\" id=\"demo-bookmark\" name=\"demo-bookmark\" ><span class=\"sl-check__box\" aria-hidden=\"true\"><svg viewBox=\"0 0 24 24\" fill=\"none\"><path class=\"mark-icon\" d=\"M6 4h12v17l-6-4-6 4V4Z\"/><path class=\"sl-check__dash\" d=\"M6 12h12\"/></svg></span><span class=\"sl-check__copy\"><span class=\"sl-check__title\">Read later</span><span class=\"sl-check__hint\">Add to reading list</span></span></label></div>", css: style15, mount: api22.mount },
"shield-checkbox": { markup: "<div class=\"sl-check-card \" data-demo=\"shield\"><label class=\"sl-check sl-check--icon sl-check--shield\"><input class=\"sl-check__input\" type=\"checkbox\" id=\"demo-shield\" name=\"demo-shield\" ><span class=\"sl-check__box\" aria-hidden=\"true\"><svg viewBox=\"0 0 24 24\" fill=\"none\"><path class=\"mark-icon\" d=\"M12 3 4 6v6c0 5 8 9 8 9s8-4 8-9V6l-8-3Z\"/><path class=\"mark-stroke\" pathLength=\"1\" d=\"m8 12 3 3 5-6\"/><path class=\"sl-check__dash\" d=\"M6 12h12\"/></svg></span><span class=\"sl-check__copy\"><span class=\"sl-check__title\">Protect entry</span><span class=\"sl-check__hint\">Local selection preview</span></span></label></div>", css: style15, mount: api22.mount },
"pin-checkbox": { markup: "<div class=\"sl-check-card \" data-demo=\"pin\"><label class=\"sl-check sl-check--icon sl-check--round sl-check--pin\"><input class=\"sl-check__input\" type=\"checkbox\" id=\"demo-pin\" name=\"demo-pin\" ><span class=\"sl-check__box\" aria-hidden=\"true\"><svg viewBox=\"0 0 24 24\" fill=\"none\"><g class=\"mark-icon\"><path d=\"M8 3h8v3l-1 1v5l3 3v2H6v-2l3-3V7L8 6V3ZM12 17v5\"/></g><path class=\"sl-check__dash\" d=\"M6 12h12\"/></svg></span><span class=\"sl-check__copy\"><span class=\"sl-check__title\">Pin to top</span><span class=\"sl-check__hint\">Keep at the top of the list</span></span></label></div>", css: style15, mount: api22.mount },
"bell-checkbox": { markup: "<div class=\"sl-check-card \" data-demo=\"bell\"><label class=\"sl-check sl-check--icon sl-check--bell\"><input class=\"sl-check__input\" type=\"checkbox\" id=\"demo-bell\" name=\"demo-bell\" ><span class=\"sl-check__box\" aria-hidden=\"true\"><svg viewBox=\"0 0 24 24\" fill=\"none\"><g class=\"mark-icon\"><path d=\"M7 10a5 5 0 0 1 10 0v5l2 3H5l2-3v-5ZM10 21h4\"/></g><path class=\"mark-stroke\" pathLength=\"1\" d=\"M3 8v5M21 8v5\"/><path class=\"sl-check__dash\" d=\"M6 12h12\"/></svg></span><span class=\"sl-check__copy\"><span class=\"sl-check__title\">Follow topic</span><span class=\"sl-check__hint\">Add to followed topics</span></span></label></div>", css: style15, mount: api22.mount },
"ring-checkbox": { markup: "<div class=\"sl-check-card \" data-demo=\"ring\"><label class=\"sl-check sl-check--round sl-check--ring\"><input class=\"sl-check__input\" type=\"checkbox\" id=\"demo-ring\" name=\"demo-ring\" ><span class=\"sl-check__box\" aria-hidden=\"true\"><svg viewBox=\"0 0 24 24\" fill=\"none\"><path class=\"sl-check__tick\" pathLength=\"1\" d=\"m5 12 4.5 4.5L19 7\"/><path class=\"sl-check__dash\" d=\"M6 12h12\"/><circle class=\"check-ring\" cx=\"12\" cy=\"12\" r=\"10\" pathLength=\"1\"/></svg></span><span class=\"sl-check__copy\"><span class=\"sl-check__title\">Select option</span><span class=\"sl-check__hint\">A fine outline, without a fill</span></span></label></div>", css: style15, mount: api22.mount },
"corner-checkbox": { markup: "<div class=\"sl-check-card \" data-demo=\"corner\"><label class=\"sl-check sl-check--corner\"><input class=\"sl-check__input\" type=\"checkbox\" id=\"demo-corner\" name=\"demo-corner\" ><span class=\"sl-check__box\" aria-hidden=\"true\"><svg viewBox=\"0 0 24 24\" fill=\"none\"><path class=\"sl-check__tick\" pathLength=\"1\" d=\"m5 12 4.5 4.5L19 7\"/><path class=\"sl-check__dash\" d=\"M6 12h12\"/><path class=\"check-corners\" d=\"M8 2H2v6M16 2h6v6M22 16v6h-6M8 22H2v-6\"/></svg></span><span class=\"sl-check__copy\"><span class=\"sl-check__title\">Select area</span><span class=\"sl-check__hint\">A geometric alternative</span></span></label></div>", css: style15, mount: api22.mount },
"chips-checkbox": { markup: "<fieldset class=\"sl-check-card check-chipset\" data-demo=\"chips\"><legend class=\"visually-hidden\">Topics</legend><p class=\"check-caption\">Choose topics</p><div class=\"check-chips\"><label class=\"sl-check sl-check--chip sl-check--round\"><input class=\"sl-check__input\" type=\"checkbox\" id=\"chip-0\" name=\"chip-0\"><span class=\"sl-check__box\" aria-hidden=\"true\"><svg viewBox=\"0 0 24 24\" fill=\"none\"><path class=\"sl-check__tick\" pathLength=\"1\" d=\"m5 12 4.5 4.5L19 7\"/><path class=\"sl-check__dash\" d=\"M6 12h12\"/></svg></span><span class=\"sl-check__copy\"><span class=\"sl-check__title\">Design</span></span></label><label class=\"sl-check sl-check--chip sl-check--round\"><input class=\"sl-check__input\" type=\"checkbox\" id=\"chip-1\" name=\"chip-1\" ><span class=\"sl-check__box\" aria-hidden=\"true\"><svg viewBox=\"0 0 24 24\" fill=\"none\"><path class=\"sl-check__tick\" pathLength=\"1\" d=\"m5 12 4.5 4.5L19 7\"/><path class=\"sl-check__dash\" d=\"M6 12h12\"/></svg></span><span class=\"sl-check__copy\"><span class=\"sl-check__title\">Code</span></span></label><label class=\"sl-check sl-check--chip sl-check--round\"><input class=\"sl-check__input\" type=\"checkbox\" id=\"chip-2\" name=\"chip-2\" ><span class=\"sl-check__box\" aria-hidden=\"true\"><svg viewBox=\"0 0 24 24\" fill=\"none\"><path class=\"sl-check__tick\" pathLength=\"1\" d=\"m5 12 4.5 4.5L19 7\"/><path class=\"sl-check__dash\" d=\"M6 12h12\"/></svg></span><span class=\"sl-check__copy\"><span class=\"sl-check__title\">Motion</span></span></label></div></fieldset>", css: style15, mount: api22.mount },
"days-checkbox": { markup: "<fieldset class=\"sl-check-card \" data-demo=\"days\"><legend class=\"visually-hidden\">Reminder days</legend><p class=\"check-caption\">Remind me on</p><div class=\"check-days\"><label class=\"check-day\"><input class=\"sl-check__input\" type=\"checkbox\" name=\"day-0\" aria-label=\"Monday\" checked><span>Mo<i aria-hidden=\"true\"></i></span></label><label class=\"check-day\"><input class=\"sl-check__input\" type=\"checkbox\" name=\"day-1\" aria-label=\"Tuesday\" ><span>Tu<i aria-hidden=\"true\"></i></span></label><label class=\"check-day\"><input class=\"sl-check__input\" type=\"checkbox\" name=\"day-2\" aria-label=\"Wednesday\" checked><span>We<i aria-hidden=\"true\"></i></span></label><label class=\"check-day\"><input class=\"sl-check__input\" type=\"checkbox\" name=\"day-3\" aria-label=\"Thursday\" ><span>Th<i aria-hidden=\"true\"></i></span></label><label class=\"check-day\"><input class=\"sl-check__input\" type=\"checkbox\" name=\"day-4\" aria-label=\"Friday\" ><span>Fr<i aria-hidden=\"true\"></i></span></label><label class=\"check-day\"><input class=\"sl-check__input\" type=\"checkbox\" name=\"day-5\" aria-label=\"Saturday\" ><span>Sa<i aria-hidden=\"true\"></i></span></label><label class=\"check-day\"><input class=\"sl-check__input\" type=\"checkbox\" name=\"day-6\" aria-label=\"Sunday\" ><span>Su<i aria-hidden=\"true\"></i></span></label></div></fieldset>", css: style15, mount: api22.mount },
"tiles-checkbox": { markup: "<fieldset class=\"sl-check-card check-tilegroup\" data-demo=\"tiles\"><legend class=\"visually-hidden\">Formats</legend><div class=\"check-tiles\"><label class=\"check-tile\"><input class=\"sl-check__input\" type=\"checkbox\" name=\"format-0\"><span class=\"check-tile__face\"><svg class=\"tile-art\" viewBox=\"0 0 24 24\" fill=\"none\" aria-hidden=\"true\"><path d=\"M6 3h8l4 4v14H6V3ZM14 3v5h4M9 12h6M9 16h5\"/></svg><span>Text</span><svg class=\"tile-check\" viewBox=\"0 0 24 24\" fill=\"none\" aria-hidden=\"true\"><path class=\"sl-check__tick\" pathLength=\"1\" d=\"m5 12 4.5 4.5L19 7\"/></svg></span></label><label class=\"check-tile\"><input class=\"sl-check__input\" type=\"checkbox\" name=\"format-1\"><span class=\"check-tile__face\"><svg class=\"tile-art\" viewBox=\"0 0 24 24\" fill=\"none\" aria-hidden=\"true\"><rect x=\"3\" y=\"4\" width=\"18\" height=\"16\" rx=\"3\"/><circle cx=\"8\" cy=\"9\" r=\"1.5\"/><path d=\"m4 18 6-6 4 4 3-3 4 4\"/></svg><span>Images</span><svg class=\"tile-check\" viewBox=\"0 0 24 24\" fill=\"none\" aria-hidden=\"true\"><path class=\"sl-check__tick\" pathLength=\"1\" d=\"m5 12 4.5 4.5L19 7\"/></svg></span></label></div></fieldset>", css: style15, mount: api22.mount },
"swatches-checkbox": { markup: "<fieldset class=\"sl-check-card \" data-demo=\"swatches\"><legend class=\"visually-hidden\">Textures</legend><p class=\"check-caption\">Add textures</p><div class=\"check-swatches\"><label class=\"check-swatch\"><input class=\"sl-check__input\" type=\"checkbox\" name=\"texture-0\"><span class=\"swatch-face texture-0\"><svg viewBox=\"0 0 24 24\" fill=\"none\" aria-hidden=\"true\"><path class=\"sl-check__tick\" pathLength=\"1\" d=\"m5 12 4.5 4.5L19 7\"/></svg></span><span class=\"swatch-label\">Matte</span></label><label class=\"check-swatch\"><input class=\"sl-check__input\" type=\"checkbox\" name=\"texture-1\"><span class=\"swatch-face texture-1\"><svg viewBox=\"0 0 24 24\" fill=\"none\" aria-hidden=\"true\"><path class=\"sl-check__tick\" pathLength=\"1\" d=\"m5 12 4.5 4.5L19 7\"/></svg></span><span class=\"swatch-label\">Stripes</span></label><label class=\"check-swatch\"><input class=\"sl-check__input\" type=\"checkbox\" name=\"texture-2\"><span class=\"swatch-face texture-2\"><svg viewBox=\"0 0 24 24\" fill=\"none\" aria-hidden=\"true\"><path class=\"sl-check__tick\" pathLength=\"1\" d=\"m5 12 4.5 4.5L19 7\"/></svg></span><span class=\"swatch-label\">Dots</span></label></div></fieldset>", css: style15, mount: api22.mount },
"round-list-checkbox": { markup: "<fieldset class=\"sl-check-card check-list\" data-demo=\"round-list\"><legend class=\"visually-hidden\">Preparation</legend><p class=\"check-caption\">Before publishing</p><label class=\"sl-check sl-check--outline sl-check--task\"><input class=\"sl-check__input\" type=\"checkbox\" id=\"round-task-0\" name=\"round-task-0\" checked><span class=\"sl-check__box\" aria-hidden=\"true\"><svg viewBox=\"0 0 24 24\" fill=\"none\"><path class=\"sl-check__tick\" pathLength=\"1\" d=\"m5 12 4.5 4.5L19 7\"/><path class=\"sl-check__dash\" d=\"M6 12h12\"/></svg></span><span class=\"sl-check__copy\"><span class=\"sl-check__title\">Review copy</span></span></label><label class=\"sl-check sl-check--outline sl-check--task\"><input class=\"sl-check__input\" type=\"checkbox\" id=\"round-task-1\" name=\"round-task-1\" ><span class=\"sl-check__box\" aria-hidden=\"true\"><svg viewBox=\"0 0 24 24\" fill=\"none\"><path class=\"sl-check__tick\" pathLength=\"1\" d=\"m5 12 4.5 4.5L19 7\"/><path class=\"sl-check__dash\" d=\"M6 12h12\"/></svg></span><span class=\"sl-check__copy\"><span class=\"sl-check__title\">Add cover</span></span></label><label class=\"sl-check sl-check--outline sl-check--task\"><input class=\"sl-check__input\" type=\"checkbox\" id=\"round-task-2\" name=\"round-task-2\" ><span class=\"sl-check__box\" aria-hidden=\"true\"><svg viewBox=\"0 0 24 24\" fill=\"none\"><path class=\"sl-check__tick\" pathLength=\"1\" d=\"m5 12 4.5 4.5L19 7\"/><path class=\"sl-check__dash\" d=\"M6 12h12\"/></svg></span><span class=\"sl-check__copy\"><span class=\"sl-check__title\">Prepare links</span></span></label></fieldset>", css: style15, mount: api22.mount },
"exclude-list-checkbox": { markup: "<fieldset class=\"sl-check-card check-list check-exclusions\" data-demo=\"exclude-list\"><legend class=\"visually-hidden\">Exclude from export</legend><p class=\"check-caption\">Exclude from export</p><label class=\"sl-check sl-check--cross sl-check--sharp\"><input class=\"sl-check__input\" type=\"checkbox\" id=\"exclude-0\" name=\"exclude-0\" ><span class=\"sl-check__box\" aria-hidden=\"true\"><svg viewBox=\"0 0 24 24\" fill=\"none\"><path class=\"mark-stroke stroke-one\" pathLength=\"1\" d=\"m7 7 10 10\"/><path class=\"mark-stroke stroke-two\" pathLength=\"1\" d=\"M17 7 7 17\"/><path class=\"sl-check__dash\" d=\"M6 12h12\"/></svg></span><span class=\"sl-check__copy\"><span class=\"sl-check__title\">Drafts</span></span></label><label class=\"sl-check sl-check--cross sl-check--sharp\"><input class=\"sl-check__input\" type=\"checkbox\" id=\"exclude-1\" name=\"exclude-1\" checked><span class=\"sl-check__box\" aria-hidden=\"true\"><svg viewBox=\"0 0 24 24\" fill=\"none\"><path class=\"mark-stroke stroke-one\" pathLength=\"1\" d=\"m7 7 10 10\"/><path class=\"mark-stroke stroke-two\" pathLength=\"1\" d=\"M17 7 7 17\"/><path class=\"sl-check__dash\" d=\"M6 12h12\"/></svg></span><span class=\"sl-check__copy\"><span class=\"sl-check__title\">Hidden layers</span></span></label><label class=\"sl-check sl-check--cross sl-check--sharp\"><input class=\"sl-check__input\" type=\"checkbox\" id=\"exclude-2\" name=\"exclude-2\" ><span class=\"sl-check__box\" aria-hidden=\"true\"><svg viewBox=\"0 0 24 24\" fill=\"none\"><path class=\"mark-stroke stroke-one\" pathLength=\"1\" d=\"m7 7 10 10\"/><path class=\"mark-stroke stroke-two\" pathLength=\"1\" d=\"M17 7 7 17\"/><path class=\"sl-check__dash\" d=\"M6 12h12\"/></svg></span><span class=\"sl-check__copy\"><span class=\"sl-check__title\">Comments</span></span></label></fieldset>", css: style15, mount: api22.mount },
"feature-list-checkbox": { markup: "<fieldset class=\"sl-check-card check-list\" data-demo=\"feature-list\"><legend class=\"visually-hidden\">Features</legend><p class=\"check-caption\">Add features</p><label class=\"sl-check sl-check--outline sl-check--right\"><input class=\"sl-check__input\" type=\"checkbox\" id=\"feature-0\" name=\"feature-0\" ><span class=\"sl-check__box\" aria-hidden=\"true\"><svg viewBox=\"0 0 24 24\" fill=\"none\"><path class=\"sl-check__tick\" pathLength=\"1\" d=\"m5 12 4.5 4.5L19 7\"/><path class=\"sl-check__dash\" d=\"M6 12h12\"/></svg></span><svg class=\"row-art\" viewBox=\"0 0 24 24\" fill=\"none\" aria-hidden=\"true\"><rect x=\"3\" y=\"3\" width=\"7\" height=\"7\" rx=\"2\"/><rect x=\"14\" y=\"3\" width=\"7\" height=\"7\" rx=\"2\"/><rect x=\"3\" y=\"14\" width=\"7\" height=\"7\" rx=\"2\"/><rect x=\"14\" y=\"14\" width=\"7\" height=\"7\" rx=\"2\"/></svg><span class=\"sl-check__copy\"><span class=\"sl-check__title\">Components</span></span></label><label class=\"sl-check sl-check--outline sl-check--right\"><input class=\"sl-check__input\" type=\"checkbox\" id=\"feature-1\" name=\"feature-1\" ><span class=\"sl-check__box\" aria-hidden=\"true\"><svg viewBox=\"0 0 24 24\" fill=\"none\"><path class=\"sl-check__tick\" pathLength=\"1\" d=\"m5 12 4.5 4.5L19 7\"/><path class=\"sl-check__dash\" d=\"M6 12h12\"/></svg></span><svg class=\"row-art\" viewBox=\"0 0 24 24\" fill=\"none\" aria-hidden=\"true\"><rect x=\"3\" y=\"4\" width=\"18\" height=\"16\" rx=\"3\"/><circle cx=\"8\" cy=\"9\" r=\"1.5\"/><path d=\"m4 18 6-6 4 4 3-3 4 4\"/></svg><span class=\"sl-check__copy\"><span class=\"sl-check__title\">Gallery</span></span></label><label class=\"sl-check sl-check--outline sl-check--right\"><input class=\"sl-check__input\" type=\"checkbox\" id=\"feature-2\" name=\"feature-2\" ><span class=\"sl-check__box\" aria-hidden=\"true\"><svg viewBox=\"0 0 24 24\" fill=\"none\"><path class=\"sl-check__tick\" pathLength=\"1\" d=\"m5 12 4.5 4.5L19 7\"/><path class=\"sl-check__dash\" d=\"M6 12h12\"/></svg></span><svg class=\"row-art\" viewBox=\"0 0 24 24\" fill=\"none\" aria-hidden=\"true\"><path d=\"M6 3h8l4 4v14H6V3ZM14 3v5h4M9 12h6M9 16h5\"/></svg><span class=\"sl-check__copy\"><span class=\"sl-check__title\">Documents</span></span></label></fieldset>", css: style15, mount: api22.mount },
"file-list-checkbox": { markup: "<fieldset class=\"sl-check-card check-list check-filelist\" data-demo=\"file-list\"><legend class=\"visually-hidden\">Files</legend><p class=\"check-caption\">Choose files</p><label class=\"sl-check sl-check--fill sl-check--right\"><input class=\"sl-check__input\" type=\"checkbox\" id=\"file-0\" name=\"file-0\" ><span class=\"sl-check__box\" aria-hidden=\"true\"><svg viewBox=\"0 0 24 24\" fill=\"none\"><path class=\"sl-check__tick\" pathLength=\"1\" d=\"m5 12 4.5 4.5L19 7\"/><path class=\"sl-check__dash\" d=\"M6 12h12\"/></svg></span><span class=\"sl-check__copy\"><span class=\"sl-check__title\">Brand guidelines</span><span class=\"sl-check__hint\">PDF · 2.4 MB</span></span></label><label class=\"sl-check sl-check--fill sl-check--right\"><input class=\"sl-check__input\" type=\"checkbox\" id=\"file-1\" name=\"file-1\" ><span class=\"sl-check__box\" aria-hidden=\"true\"><svg viewBox=\"0 0 24 24\" fill=\"none\"><path class=\"sl-check__tick\" pathLength=\"1\" d=\"m5 12 4.5 4.5L19 7\"/><path class=\"sl-check__dash\" d=\"M6 12h12\"/></svg></span><span class=\"sl-check__copy\"><span class=\"sl-check__title\">UI assets</span><span class=\"sl-check__hint\">ZIP · 8.1 MB</span></span></label><label class=\"sl-check sl-check--fill sl-check--right\"><input class=\"sl-check__input\" type=\"checkbox\" id=\"file-2\" name=\"file-2\" ><span class=\"sl-check__box\" aria-hidden=\"true\"><svg viewBox=\"0 0 24 24\" fill=\"none\"><path class=\"sl-check__tick\" pathLength=\"1\" d=\"m5 12 4.5 4.5L19 7\"/><path class=\"sl-check__dash\" d=\"M6 12h12\"/></svg></span><span class=\"sl-check__copy\"><span class=\"sl-check__title\">Release notes</span><span class=\"sl-check__hint\">TXT · 12 KB</span></span></label></fieldset>", css: style15, mount: api22.mount },
"table-checkbox": { markup: "<fieldset class=\"sl-check-card check-list check-table\" data-demo=\"table\"><legend class=\"visually-hidden\">Layers</legend><div class=\"check-table-head\"><span>Layer</span><span>Type</span></div><label class=\"sl-check sl-check--fill\"><input class=\"sl-check__input\" type=\"checkbox\" id=\"layer-0\" name=\"layer-0\" ><span class=\"sl-check__box\" aria-hidden=\"true\"><svg viewBox=\"0 0 24 24\" fill=\"none\"><path class=\"sl-check__tick\" pathLength=\"1\" d=\"m5 12 4.5 4.5L19 7\"/><path class=\"sl-check__dash\" d=\"M6 12h12\"/></svg></span><span class=\"sl-check__copy\"><span class=\"sl-check__title\">Header</span><span class=\"sl-check__hint\">Group</span></span></label><label class=\"sl-check sl-check--fill\"><input class=\"sl-check__input\" type=\"checkbox\" id=\"layer-1\" name=\"layer-1\" ><span class=\"sl-check__box\" aria-hidden=\"true\"><svg viewBox=\"0 0 24 24\" fill=\"none\"><path class=\"sl-check__tick\" pathLength=\"1\" d=\"m5 12 4.5 4.5L19 7\"/><path class=\"sl-check__dash\" d=\"M6 12h12\"/></svg></span><span class=\"sl-check__copy\"><span class=\"sl-check__title\">Cover</span><span class=\"sl-check__hint\">Photo</span></span></label><label class=\"sl-check sl-check--fill\"><input class=\"sl-check__input\" type=\"checkbox\" id=\"layer-2\" name=\"layer-2\" ><span class=\"sl-check__box\" aria-hidden=\"true\"><svg viewBox=\"0 0 24 24\" fill=\"none\"><path class=\"sl-check__tick\" pathLength=\"1\" d=\"m5 12 4.5 4.5L19 7\"/><path class=\"sl-check__dash\" d=\"M6 12h12\"/></svg></span><span class=\"sl-check__copy\"><span class=\"sl-check__title\">Footer</span><span class=\"sl-check__hint\">Group</span></span></label></fieldset>", css: style15, mount: api22.mount },
"nested-checkbox": { markup: "<fieldset class=\"sl-check-card check-list check-nested\" data-demo=\"nested\"><legend class=\"visually-hidden\">Project assets</legend><label class=\"sl-check sl-check--outline\"><input class=\"sl-check__input\" type=\"checkbox\" id=\"nested-all\" name=\"nested-all\" data-parent><span class=\"sl-check__box\" aria-hidden=\"true\"><svg viewBox=\"0 0 24 24\" fill=\"none\"><path class=\"sl-check__tick\" pathLength=\"1\" d=\"m5 12 4.5 4.5L19 7\"/><path class=\"sl-check__dash\" d=\"M6 12h12\"/></svg></span><span class=\"sl-check__copy\"><span class=\"sl-check__title\">Project assets</span><span class=\"sl-check__hint\">Select all</span></span></label><div class=\"check-tree\"><label class=\"sl-check sl-check--outline\"><input class=\"sl-check__input\" type=\"checkbox\" id=\"nested-0\" name=\"nested-0\" data-child checked><span class=\"sl-check__box\" aria-hidden=\"true\"><svg viewBox=\"0 0 24 24\" fill=\"none\"><path class=\"sl-check__tick\" pathLength=\"1\" d=\"m5 12 4.5 4.5L19 7\"/><path class=\"sl-check__dash\" d=\"M6 12h12\"/></svg></span><span class=\"sl-check__copy\"><span class=\"sl-check__title\">Icons</span></span></label><label class=\"sl-check sl-check--outline\"><input class=\"sl-check__input\" type=\"checkbox\" id=\"nested-1\" name=\"nested-1\" data-child><span class=\"sl-check__box\" aria-hidden=\"true\"><svg viewBox=\"0 0 24 24\" fill=\"none\"><path class=\"sl-check__tick\" pathLength=\"1\" d=\"m5 12 4.5 4.5L19 7\"/><path class=\"sl-check__dash\" d=\"M6 12h12\"/></svg></span><span class=\"sl-check__copy\"><span class=\"sl-check__title\">Illustrations</span></span></label><label class=\"sl-check sl-check--outline\"><input class=\"sl-check__input\" type=\"checkbox\" id=\"nested-2\" name=\"nested-2\" data-child><span class=\"sl-check__box\" aria-hidden=\"true\"><svg viewBox=\"0 0 24 24\" fill=\"none\"><path class=\"sl-check__tick\" pathLength=\"1\" d=\"m5 12 4.5 4.5L19 7\"/><path class=\"sl-check__dash\" d=\"M6 12h12\"/></svg></span><span class=\"sl-check__copy\"><span class=\"sl-check__title\">Fonts</span></span></label></div></fieldset>", css: style15, mount: api22.mount },
"volume-slider": { markup: "<div class=\"sl-slider sl-slider--volume\" data-slider=\"volume\"><div class=\"slider-header\"><label for=\"slider-volume\"><svg viewBox=\"0 0 24 24\" fill=\"none\" aria-hidden=\"true\"><path d=\"M3 9h4l5-4v14l-5-4H3V9Z\"/><path class=\"volume-wave one\" pathLength=\"1\" d=\"M16 8a6 6 0 0 1 0 8\"/><path class=\"volume-wave two\" pathLength=\"1\" d=\"M19 5a10 10 0 0 1 0 14\"/><path class=\"volume-mute\" pathLength=\"1\" d=\"m3 3 18 18\"/></svg><span>Volume</span></label><output for=\"slider-volume\" data-output>64%</output></div><div class=\"slider-track\"><span class=\"slider-rail\" aria-hidden=\"true\"><span class=\"slider-fill\"></span></span><input class=\"slider-input\" id=\"slider-volume\" name=\"slider-volume\" type=\"range\" min=\"0\" max=\"100\" value=\"64\" ></div><div class=\"slider-ends\"><span>0</span><span>100</span></div></div>", css: style16, mount: api23.mount },
"brightness-slider": { markup: "<div class=\"sl-slider sl-slider--brightness\" data-slider=\"brightness\"><div class=\"slider-header\"><label for=\"slider-brightness\"><svg class=\"slider-sun\" viewBox=\"0 0 24 24\" fill=\"none\" aria-hidden=\"true\"><circle cx=\"12\" cy=\"12\" r=\"3.5\"/><g class=\"sun-rays\"><path d=\"M12 2v3m0 14v3M2 12h3m14 0h3M5 5l2 2m10 10 2 2M5 19l2-2M17 7l2-2\"/></g></svg><span>Brightness</span></label><output for=\"slider-brightness\" data-output>48%</output></div><div class=\"slider-track\"><span class=\"slider-rail\" aria-hidden=\"true\"><span class=\"slider-fill\"></span></span><input class=\"slider-input\" id=\"slider-brightness\" name=\"slider-brightness\" type=\"range\" min=\"0\" max=\"100\" value=\"48\" ></div><div class=\"slider-ends\"><span>0</span><span>100</span></div></div>", css: style16, mount: api23.mount },
"steps-slider": { markup: "<div class=\"sl-slider sl-slider--steps\" data-slider=\"steps\" data-labels=\"Compact,Comfortable,Spacious\"><div class=\"slider-header\"><label for=\"slider-steps\">Density</label><output for=\"slider-steps\" data-output>Comfortable</output></div><div class=\"slider-track\"><span class=\"slider-rail\" aria-hidden=\"true\"><span class=\"slider-fill\"></span></span><input class=\"slider-input\" id=\"slider-steps\" name=\"density\" type=\"range\" min=\"0\" max=\"2\" step=\"1\" value=\"1\"></div><div class=\"slider-step-labels\" aria-hidden=\"true\"><span data-step=\"0\">Compact</span><span data-step=\"1\">Comfortable</span><span data-step=\"2\">Spacious</span></div></div>", css: style16, mount: api23.mount },
"range-slider": { markup: "<fieldset class=\"sl-slider sl-slider--range\" data-slider=\"range\"><legend class=\"slider-sr\">Price range</legend><div class=\"slider-header\"><span>Price range</span><output for=\"slider-min slider-max\" data-output>$25 – $75</output></div><div class=\"slider-track slider-track--dual\"><span class=\"slider-rail\" aria-hidden=\"true\"><span class=\"slider-fill\"></span></span><input class=\"slider-input\" id=\"slider-min\" name=\"slider-min\" type=\"range\" min=\"0\" max=\"100\" value=\"25\" aria-label=\"Minimum price\" data-low><input class=\"slider-input\" id=\"slider-max\" name=\"slider-max\" type=\"range\" min=\"0\" max=\"100\" value=\"75\" aria-label=\"Maximum price\" data-high></div><div class=\"slider-ends\"><span>$0</span><span>$100</span></div></fieldset>", css: style16, mount: api23.mount },
"vertical-slider": { markup: "<div class=\"sl-slider sl-slider--vertical\" data-slider=\"vertical\"><div class=\"slider-header\"><label for=\"slider-vertical\">Intensity</label><output for=\"slider-vertical\" data-output>70%</output></div><div class=\"slider-vertical-body\"><div class=\"slider-track\"><span class=\"slider-rail\" aria-hidden=\"true\"><span class=\"slider-fill\"></span></span><input class=\"slider-input\" id=\"slider-vertical\" name=\"slider-vertical\" type=\"range\" min=\"0\" max=\"100\" value=\"70\" aria-orientation=\"vertical\"></div><div class=\"slider-scale\" aria-hidden=\"true\"><span>100</span><span>75</span><span>50</span><span>25</span><span>0</span></div></div></div>", css: style16, mount: api23.mount },
"scrub-slider": { markup: "<div class=\"sl-slider slider-scrub\" data-slider=\"scrub\" data-format=\"time\"   style=\"--low:0%;--high:0%;--position:0%;--fraction:0;--zoom:0;--preview-value:0px\"><div class=\"slider-header\"><label for=\"next-scrub\">Playback</label><output for=\"next-scrub\" data-output>0:00</output></div><div class=\"slider-track\"><div class=\"scrub-art\" aria-hidden=\"true\"><span style=\"--bar:16px\"></span><span style=\"--bar:24px\"></span><span style=\"--bar:34px\"></span><span style=\"--bar:22px\"></span><span style=\"--bar:42px\"></span><span style=\"--bar:30px\"></span><span style=\"--bar:18px\"></span><span style=\"--bar:36px\"></span><span style=\"--bar:46px\"></span><span style=\"--bar:28px\"></span><span style=\"--bar:20px\"></span><span style=\"--bar:38px\"></span><span style=\"--bar:26px\"></span><span style=\"--bar:44px\"></span><span style=\"--bar:32px\"></span><span style=\"--bar:18px\"></span><span style=\"--bar:24px\"></span><span style=\"--bar:40px\"></span><span style=\"--bar:28px\"></span><span style=\"--bar:20px\"></span><span style=\"--bar:16px\"></span><span style=\"--bar:24px\"></span><span style=\"--bar:34px\"></span><span style=\"--bar:22px\"></span><span style=\"--bar:42px\"></span><span style=\"--bar:30px\"></span><span style=\"--bar:18px\"></span><span style=\"--bar:36px\"></span><span style=\"--bar:46px\"></span><span style=\"--bar:28px\"></span><span style=\"--bar:20px\"></span><span style=\"--bar:38px\"></span><span style=\"--bar:26px\"></span><span style=\"--bar:44px\"></span><span style=\"--bar:32px\"></span><span style=\"--bar:18px\"></span><span style=\"--bar:24px\"></span><span style=\"--bar:40px\"></span><span style=\"--bar:28px\"></span><span style=\"--bar:20px\"></span></div><span class=\"slider-rail\" aria-hidden=\"true\"><span class=\"slider-fill\"></span></span><input class=\"slider-input\" id=\"next-scrub\" name=\"scrub\" type=\"range\" min=\"0\" max=\"20\" step=\"0.001\" value=\"0\" ><span class=\"scrub-playhead\" aria-hidden=\"true\"></span></div><div class=\"scrub-footer\"><button type=\"button\" class=\"scrub-play\" data-play aria-label=\"Play preview\"><svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path class=\"play-symbol\" d=\"m9 6 9 6-9 6Z\"/><path class=\"pause-symbol\" d=\"M8 6v12M16 6v12\"/></svg><span data-play-label>Play</span></button><span>0:20 <span class=\"scrub-caption\">· Preview</span></span></div></div>", css: style17, mount: api24.mount },
"speed-slider": { markup: "<div class=\"sl-slider slider-speed\" data-slider=\"speed\" data-format=\"percent\"  data-labels=\"0.5×,1×,1.5×,2×,3×\" style=\"--low:0%;--high:25%;--position:25%;--fraction:0.25;--zoom:0.01;--preview-value:1px\"><div class=\"slider-header\"><label for=\"next-speed\">Speed</label><output for=\"next-speed\" data-output>1×</output></div><div class=\"slider-track\"><span class=\"slider-rail\" aria-hidden=\"true\"><span class=\"slider-fill\"></span></span><input class=\"slider-input\" id=\"next-speed\" name=\"speed\" type=\"range\" min=\"0\" max=\"4\" step=\"1\" value=\"1\" ></div><div class=\"speed-stops\" role=\"group\" aria-label=\"Choose playback speed\"><button type=\"button\" data-step=\"0\" aria-label=\"Set speed to 0.5×\" aria-pressed=\"false\">0.5×</button><button type=\"button\" data-step=\"1\" aria-label=\"Set speed to 1×\" aria-pressed=\"true\" class=\"is-current\">1×</button><button type=\"button\" data-step=\"2\" aria-label=\"Set speed to 1.5×\" aria-pressed=\"false\">1.5×</button><button type=\"button\" data-step=\"3\" aria-label=\"Set speed to 2×\" aria-pressed=\"false\">2×</button><button type=\"button\" data-step=\"4\" aria-label=\"Set speed to 3×\" aria-pressed=\"false\">3×</button></div></div>", css: style17, mount: api24.mount },
"zoom-slider": { markup: "<div class=\"sl-slider slider-zoom\" data-slider=\"zoom\" data-format=\"percent\"   style=\"--low:0%;--high:33.33333333333333%;--position:33.33333333333333%;--fraction:0.33333333333333326;--zoom:1;--preview-value:100px\"><div class=\"slider-header\"><label for=\"next-zoom\">Zoom</label><output for=\"next-zoom\" data-output>100%</output></div><div class=\"zoom-preview\" aria-hidden=\"true\"><span class=\"zoom-frame\"></span></div><div class=\"slider-track\"><span class=\"slider-rail\" aria-hidden=\"true\"><span class=\"slider-fill\"></span></span><input class=\"slider-input\" id=\"next-zoom\" name=\"zoom\" type=\"range\" min=\"50\" max=\"200\" step=\"5\" value=\"100\" ></div><div class=\"slider-ends\"><span>50%</span><span>200%</span></div></div>", css: style17, mount: api24.mount },
"temperature-slider": { markup: "<div class=\"sl-slider slider-temperature\" data-slider=\"temperature\" data-format=\"temperature\"   style=\"--low:0%;--high:62%;--position:62%;--fraction:0.62;--zoom:0.21;--preview-value:21px\"><div class=\"slider-header\"><label for=\"next-temperature\">Temperature</label><output for=\"next-temperature\" data-output>21 °C</output></div><div class=\"temperature-meter\" aria-hidden=\"true\"><span></span><i></i></div><div class=\"slider-track\"><span class=\"slider-rail\" aria-hidden=\"true\"><span class=\"slider-fill\"></span></span><input class=\"slider-input\" id=\"next-temperature\" name=\"temperature\" type=\"range\" min=\"-10\" max=\"40\" step=\"1\" value=\"21\" ></div><div class=\"slider-ends\"><span>−10°</span><span>40°</span></div></div>", css: style17, mount: api24.mount },
"balance-slider": { markup: "<div class=\"sl-slider slider-bipolar\" data-slider=\"balance\" data-format=\"balance\" data-centered  style=\"--low:50%;--high:50%;--position:50%;--fraction:0.5;--zoom:0;--preview-value:0px\"><div class=\"slider-header\"><label for=\"next-balance\">Balance</label><output for=\"next-balance\" data-output>Center</output></div><div class=\"balance-symbol\" aria-hidden=\"true\"><span>L</span><i></i><span>R</span></div><div class=\"slider-track\"><span class=\"slider-rail\" aria-hidden=\"true\"><span class=\"slider-fill\"></span></span><input class=\"slider-input\" id=\"next-balance\" name=\"balance\" type=\"range\" min=\"-100\" max=\"100\" step=\"1\" value=\"0\" ></div><div class=\"slider-ends\"><span>Left</span><span>Right</span></div></div>", css: style17, mount: api24.mount },
"exposure-slider": { markup: "<div class=\"sl-slider slider-bipolar slider-exposure\" data-slider=\"exposure\" data-format=\"exposure\" data-centered  style=\"--low:50%;--high:56.666666666666664%;--position:56.666666666666664%;--fraction:0.5666666666666667;--zoom:0.004;--preview-value:0.4px\"><div class=\"slider-header\"><label for=\"next-exposure\">Exposure</label><output for=\"next-exposure\" data-output>+0.4 EV</output></div><div class=\"slider-track\"><span class=\"slider-rail\" aria-hidden=\"true\"><span class=\"slider-fill\"></span></span><input class=\"slider-input\" id=\"next-exposure\" name=\"exposure\" type=\"range\" min=\"-3\" max=\"3\" step=\"0.1\" value=\"0.4\" ></div><div class=\"exposure-scale\" aria-hidden=\"true\"><span>−3</span><span>−2</span><span>−1</span><span>0</span><span>+1</span><span>+2</span><span>+3</span></div></div>", css: style17, mount: api24.mount },
"segments-slider": { markup: "<div class=\"sl-slider slider-segments\" data-slider=\"segments\" data-format=\"percent\"   style=\"--low:0%;--high:60%;--position:60%;--fraction:0.6;--zoom:0.6;--preview-value:60px\"><div class=\"slider-header\"><label for=\"next-segments\">Strength</label><output for=\"next-segments\" data-output>60%</output></div><div class=\"slider-track\"><span class=\"slider-rail\" aria-hidden=\"true\"><span class=\"slider-fill\"></span></span><input class=\"slider-input\" id=\"next-segments\" name=\"segments\" type=\"range\" min=\"0\" max=\"100\" step=\"5\" value=\"60\" ></div><div class=\"slider-ends\"><span>Subtle</span><span>Strong</span></div></div>", css: style17, mount: api24.mount },
"rating-slider": { markup: "<div class=\"sl-slider slider-rating\" data-slider=\"rating\" data-format=\"rating\"   style=\"--low:0%;--high:50%;--position:50%;--fraction:0.5;--zoom:0.03;--preview-value:3px\"><div class=\"slider-header\"><label for=\"next-rating\">Rating</label><output for=\"next-rating\" data-output>3 / 5</output></div><div class=\"rating-stars\" role=\"radiogroup\" aria-label=\"Choose a rating\"><button type=\"button\" class=\"rating-choice\" data-rating=\"1\" role=\"radio\" aria-label=\"1 star\" aria-checked=\"false\" tabindex=\"-1\"><svg class=\"rating-star is-filled\" viewBox=\"0 0 24 24\" fill=\"none\" aria-hidden=\"true\" style=\"--star-fill:1\"><path d=\"m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3Z\"/><path class=\"star-solid\" d=\"m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3Z\"/></svg></button><button type=\"button\" class=\"rating-choice\" data-rating=\"2\" role=\"radio\" aria-label=\"2 stars\" aria-checked=\"false\" tabindex=\"-1\"><svg class=\"rating-star is-filled\" viewBox=\"0 0 24 24\" fill=\"none\" aria-hidden=\"true\" style=\"--star-fill:1\"><path d=\"m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3Z\"/><path class=\"star-solid\" d=\"m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3Z\"/></svg></button><button type=\"button\" class=\"rating-choice\" data-rating=\"3\" role=\"radio\" aria-label=\"3 stars\" aria-checked=\"true\" tabindex=\"0\"><svg class=\"rating-star is-filled\" viewBox=\"0 0 24 24\" fill=\"none\" aria-hidden=\"true\" style=\"--star-fill:1\"><path d=\"m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3Z\"/><path class=\"star-solid\" d=\"m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3Z\"/></svg></button><button type=\"button\" class=\"rating-choice\" data-rating=\"4\" role=\"radio\" aria-label=\"4 stars\" aria-checked=\"false\" tabindex=\"-1\"><svg class=\"rating-star\" viewBox=\"0 0 24 24\" fill=\"none\" aria-hidden=\"true\" style=\"--star-fill:0\"><path d=\"m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3Z\"/><path class=\"star-solid\" d=\"m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3Z\"/></svg></button><button type=\"button\" class=\"rating-choice\" data-rating=\"5\" role=\"radio\" aria-label=\"5 stars\" aria-checked=\"false\" tabindex=\"-1\"><svg class=\"rating-star\" viewBox=\"0 0 24 24\" fill=\"none\" aria-hidden=\"true\" style=\"--star-fill:0\"><path d=\"m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3Z\"/><path class=\"star-solid\" d=\"m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3Z\"/></svg></button></div><div class=\"slider-track\"><span class=\"slider-rail\" aria-hidden=\"true\"><span class=\"slider-fill\"></span></span><input class=\"slider-input\" id=\"next-rating\" name=\"rating\" type=\"range\" min=\"1\" max=\"5\" step=\"0.1\" value=\"3\" ></div><div class=\"slider-ends\"><span>1 star</span><span>5 stars</span></div></div>", css: style17, mount: api24.mount },
"hours-slider": { markup: "<fieldset class=\"sl-slider sl-slider--range slider-hours\" data-slider=\"hours\" data-format=\"hours\" style=\"--low:37.5%;--high:75%;--position:37.5%;--fraction:0.375;--zoom:0.09;--preview-value:9px\"><legend class=\"slider-sr\">Time window</legend><div class=\"slider-header\"><span>Time window</span><output for=\"next-hours-min next-hours-max\" data-output>09:00 – 18:00</output></div><div class=\"slider-track slider-track--dual\"><span class=\"slider-rail\" aria-hidden=\"true\"><span class=\"slider-fill\"></span></span><input class=\"slider-input\" id=\"next-hours-min\" name=\"hours-min\" type=\"range\" min=\"0\" max=\"24\" step=\"1\" value=\"9\" aria-label=\"Start time\" data-low><input class=\"slider-input\" id=\"next-hours-max\" name=\"hours-max\" type=\"range\" min=\"0\" max=\"24\" step=\"1\" value=\"18\" aria-label=\"End time\" data-high></div><div class=\"hour-marks\" aria-hidden=\"true\"><span>00</span><span>06</span><span>12</span><span>18</span><span>24</span></div></fieldset>", css: style17, mount: api24.mount },
"distance-slider": { markup: "<div class=\"sl-slider slider-distance\" data-slider=\"distance\" data-format=\"distance\"   style=\"--low:0%;--high:35%;--position:35%;--fraction:0.35;--zoom:0.35;--preview-value:35px\"><div class=\"slider-header\"><label for=\"next-distance\">Search radius</label><output for=\"next-distance\" data-output>35 km</output></div><div class=\"slider-track\"><span class=\"slider-rail\" aria-hidden=\"true\"><span class=\"slider-fill\"></span></span><input class=\"slider-input\" id=\"next-distance\" name=\"distance\" type=\"range\" min=\"0\" max=\"100\" step=\"1\" value=\"35\" ><span class=\"distance-bubble\" data-bubble aria-hidden=\"true\">35 km</span></div><div class=\"slider-ends\"><span>Nearby</span><span>100 km</span></div></div>", css: style17, mount: api24.mount },
"meter-slider": { markup: "<div class=\"sl-slider sl-slider--vertical slider-meter\" data-slider=\"meter\" data-format=\"percent\"   style=\"--low:0%;--high:65%;--position:65%;--fraction:0.65;--zoom:0.65;--preview-value:65px\"><div class=\"slider-header\"><label for=\"next-meter\">Level</label><output for=\"next-meter\" data-output>65%</output></div><div class=\"slider-track\"><span class=\"slider-rail\" aria-hidden=\"true\"><span class=\"slider-fill\"></span></span><input class=\"slider-input\" id=\"next-meter\" name=\"meter\" type=\"range\" min=\"0\" max=\"100\" step=\"1\" value=\"65\" aria-orientation=\"vertical\"></div><div class=\"meter-endpoints\" aria-hidden=\"true\"><span>0</span><span>100</span></div></div>", css: style17, mount: api24.mount },
"mixer-slider": { markup: "<fieldset class=\"mixer-group\"><legend class=\"slider-sr\">Audio mixer</legend><p class=\"mixer-title\">Channel levels</p><div class=\"mixer-channels\"><div class=\"sl-slider sl-slider--vertical slider-channel\" data-slider=\"voice\" data-format=\"percent\"   style=\"--low:0%;--high:72%;--position:72%;--fraction:0.72\"><div class=\"slider-header\"><label for=\"next-voice\">Voice</label><output for=\"next-voice\" data-output>72%</output></div><div class=\"slider-track\"><span class=\"slider-rail\" aria-hidden=\"true\"><span class=\"slider-fill\"></span></span><input class=\"slider-input\" id=\"next-voice\" name=\"voice\" type=\"range\" min=\"0\" max=\"100\" step=\"1\" value=\"72\" aria-orientation=\"vertical\"></div><div class=\"slider-ends\"><span>0</span><span>100</span></div></div><div class=\"sl-slider sl-slider--vertical slider-channel\" data-slider=\"music\" data-format=\"percent\"   style=\"--low:0%;--high:48%;--position:48%;--fraction:0.48\"><div class=\"slider-header\"><label for=\"next-music\">Music</label><output for=\"next-music\" data-output>48%</output></div><div class=\"slider-track\"><span class=\"slider-rail\" aria-hidden=\"true\"><span class=\"slider-fill\"></span></span><input class=\"slider-input\" id=\"next-music\" name=\"music\" type=\"range\" min=\"0\" max=\"100\" step=\"1\" value=\"48\" aria-orientation=\"vertical\"></div><div class=\"slider-ends\"><span>0</span><span>100</span></div></div><div class=\"sl-slider sl-slider--vertical slider-channel\" data-slider=\"effects\" data-format=\"percent\"   style=\"--low:0%;--high:32%;--position:32%;--fraction:0.32\"><div class=\"slider-header\"><label for=\"next-effects\">FX</label><output for=\"next-effects\" data-output>32%</output></div><div class=\"slider-track\"><span class=\"slider-rail\" aria-hidden=\"true\"><span class=\"slider-fill\"></span></span><input class=\"slider-input\" id=\"next-effects\" name=\"effects\" type=\"range\" min=\"0\" max=\"100\" step=\"1\" value=\"32\" aria-orientation=\"vertical\"></div><div class=\"slider-ends\"><span>0</span><span>100</span></div></div></div></fieldset>", css: style17, mount: api24.mount },
"type-size-slider": { markup: "<div class=\"sl-slider slider-type\" data-slider=\"type-size\" data-format=\"pixels\"   style=\"--low:0%;--high:37.5%;--position:37.5%;--fraction:0.375;--zoom:0.28;--preview-value:28px\"><div class=\"slider-header\"><label for=\"next-type-size\">Type size</label><output for=\"next-type-size\" data-output>28 px</output></div><div class=\"type-preview\" aria-hidden=\"true\"><span>Aa</span></div><div class=\"slider-track\"><span class=\"slider-rail\" aria-hidden=\"true\"><span class=\"slider-fill\"></span></span><input class=\"slider-input\" id=\"next-type-size\" name=\"type-size\" type=\"range\" min=\"16\" max=\"48\" step=\"1\" value=\"28\" ></div><div class=\"slider-ends\"><span>16 px</span><span>48 px</span></div></div>", css: style17, mount: api24.mount },
"radius-slider": { markup: "<div class=\"sl-slider slider-radius\" data-slider=\"radius\" data-format=\"pixels\"   style=\"--low:0%;--high:40%;--position:40%;--fraction:0.4;--zoom:0.16;--preview-value:16px\"><div class=\"slider-header\"><label for=\"next-radius\">Corner radius</label><output for=\"next-radius\" data-output>16 px</output></div><div class=\"radius-preview\" aria-hidden=\"true\"><span></span></div><div class=\"slider-track\"><span class=\"slider-rail\" aria-hidden=\"true\"><span class=\"slider-fill\"></span></span><input class=\"slider-input\" id=\"next-radius\" name=\"radius\" type=\"range\" min=\"0\" max=\"40\" step=\"1\" value=\"16\" ></div><div class=\"slider-ends\"><span>Square</span><span>Rounded</span></div></div>", css: style17, mount: api24.mount },
"opacity-slider": { markup: "<div class=\"sl-slider slider-opacity\" data-slider=\"opacity\" data-format=\"percent\"   style=\"--low:0%;--high:70%;--position:70%;--fraction:0.7;--zoom:0.7;--preview-value:70px\"><div class=\"slider-header\"><label for=\"next-opacity\">Opacity</label><output for=\"next-opacity\" data-output>70%</output></div><div class=\"opacity-preview\" aria-hidden=\"true\"><span></span></div><div class=\"slider-track\"><span class=\"slider-rail\" aria-hidden=\"true\"><span class=\"slider-fill\"></span></span><input class=\"slider-input\" id=\"next-opacity\" name=\"opacity\" type=\"range\" min=\"0\" max=\"100\" step=\"1\" value=\"70\" ></div><div class=\"slider-ends\"><span>Transparent</span><span>Solid</span></div></div>", css: style17, mount: api24.mount },
"actions-menu": { markup: "<div class=\"menu-demo\" data-menu=\"actions\"><div class=\"action-surface\"><button type=\"button\" class=\"menu-trigger\" data-trigger aria-expanded=\"false\" aria-haspopup=\"menu\" aria-controls=\"menu-actions\"><i class=\"menu-glyph \" data-icon=\"folder\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"M4.5 9a2 2 0 0 1 2-2h5l2.5 3h7.5a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-15a2 2 0 0 1-2-2Z\"/></svg></i><span class=\"menu-trigger-label\" data-trigger-label>Project actions</span><i class=\"menu-glyph menu-chevron\" data-icon=\"chevron\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"m8 11 6 6 6-6\"/></svg></i></button><div class=\"action-reveal\"><div id=\"menu-actions\" class=\"menu-panel\" role=\"menu\" aria-label=\"actions options\" aria-hidden=\"true\" inert><div class=\"menu-overline\">PROJECT BRIEF</div><button type=\"button\" class=\"menu-item\" role=\"menuitem\" tabindex=\"-1\" data-value=\"rename\" data-result=\"Project renamed. Preview only.\"><i class=\"menu-glyph \" data-icon=\"edit\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"m5 23 1.5-5.5L19 5a2.8 2.8 0 0 1 4 4L10.5 21.5 5 23ZM16.5 7.5l4 4M6.5 17.5l4 4\"/></svg></i><span>Rename project</span></button><button type=\"button\" class=\"menu-item\" role=\"menuitem\" tabindex=\"-1\" data-value=\"duplicate\" data-result=\"A project copy was created in this preview.\"><i class=\"menu-glyph \" data-icon=\"copy\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><rect x=\"5\" y=\"8\" width=\"13\" height=\"16\" rx=\"2.5\"/><path d=\"M10 8V6.5A2.5 2.5 0 0 1 12.5 4h8A2.5 2.5 0 0 1 23 6.5v11a2.5 2.5 0 0 1-2.5 2.5H18\"/></svg></i><span>Duplicate</span></button><div class=\"menu-rule\" role=\"separator\"></div><button type=\"button\" class=\"menu-item\" role=\"menuitem\" tabindex=\"-1\" data-value=\"archive\" data-result=\"Project archived in this preview. Reset to undo.\"><i class=\"menu-glyph \" data-icon=\"archive\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><rect x=\"4\" y=\"5\" width=\"20\" height=\"5\" rx=\"1.5\"/><path d=\"M6 10v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10M11 15h6\"/></svg></i><span>Archive</span></button></div></div></div><p class=\"menu-feedback\" data-feedback role=\"status\" aria-live=\"polite\">Choose an action. Nothing leaves this preview.</p></div>", css: style18, mount: api25.mount },
"sort-menu": { markup: "<div class=\"menu-demo\" data-menu=\"sort\"><button type=\"button\" class=\"menu-trigger\" data-trigger aria-expanded=\"false\" aria-haspopup=\"menu\" aria-controls=\"menu-sort\"><i class=\"menu-glyph \" data-icon=\"sort\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"M4 7h12M4 13h9M4 19h6M22 7v15m-3-3 3 3 3-3\"/></svg></i><span class=\"menu-trigger-label\" data-trigger-label>Last updated</span><i class=\"menu-glyph menu-chevron\" data-icon=\"chevron\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"m8 11 6 6 6-6\"/></svg></i></button><div id=\"menu-sort\" class=\"menu-panel\" role=\"menu\" aria-label=\"sort options\" aria-hidden=\"true\" inert><div class=\"menu-overline\">SORT BY</div><button type=\"button\" class=\"menu-item\" role=\"menuitemradio\" tabindex=\"-1\" data-value=\"updated\" aria-checked=\"true\"><i class=\"menu-glyph \" data-icon=\"clock\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><circle cx=\"14\" cy=\"14\" r=\"9\"/><path d=\"M14 8v6l4 3\"/></svg></i><span>Last updated</span><i class=\"menu-glyph menu-check\" data-icon=\"check\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"m5 14 6 6L23 8\"/></svg></i></button><button type=\"button\" class=\"menu-item\" role=\"menuitemradio\" tabindex=\"-1\" data-value=\"name\" aria-checked=\"false\"><i class=\"menu-glyph \" data-icon=\"az\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"m5 13 3.5-9 3.5 9M6.5 9h4M5 17h7l-7 7h7M21 5v18m-3-3 3 3 3-3\"/></svg></i><span>Name A–Z</span><i class=\"menu-glyph menu-check\" data-icon=\"check\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"m5 14 6 6L23 8\"/></svg></i></button><button type=\"button\" class=\"menu-item\" role=\"menuitemradio\" tabindex=\"-1\" data-value=\"priority\" aria-checked=\"false\"><i class=\"menu-glyph \" data-icon=\"flag\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"M6 24V5m0 3c5-5 11 4 16-1v11c-5 5-11-4-16 1\"/></svg></i><span>Priority</span><i class=\"menu-glyph menu-check\" data-icon=\"check\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"m5 14 6 6L23 8\"/></svg></i></button></div><p class=\"menu-feedback\" data-feedback role=\"status\" aria-live=\"polite\">Last updated is selected.</p></div>", css: style18, mount: api25.mount },
"labels-menu": { markup: "<div class=\"menu-demo\" data-menu=\"labels\"><button type=\"button\" class=\"menu-trigger\" data-trigger aria-expanded=\"false\" aria-haspopup=\"menu\" aria-controls=\"menu-labels\"><i class=\"menu-glyph \" data-icon=\"tag\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"M5 5h8l10 10a2 2 0 0 1 0 3l-5 5a2 2 0 0 1-3 0L5 13Z\"/><circle cx=\"10\" cy=\"10\" r=\"1.7\"/></svg></i><span class=\"menu-trigger-label\" data-trigger-label>Labels</span><span class=\"menu-badge\" data-count>1</span><i class=\"menu-glyph menu-chevron\" data-icon=\"chevron\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"m8 11 6 6 6-6\"/></svg></i></button><div id=\"menu-labels\" class=\"menu-panel\" role=\"menu\" aria-label=\"labels options\" aria-hidden=\"true\" inert><div class=\"menu-overline\">FILTER BY LABEL</div><button type=\"button\" class=\"menu-item\" role=\"menuitemcheckbox\" aria-checked=\"true\" tabindex=\"-1\" data-value=\"design\"><span class=\"menu-dot\" aria-hidden=\"true\"></span><span data-label>Design</span><i class=\"menu-glyph menu-check\" data-icon=\"check\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"m5 14 6 6L23 8\"/></svg></i></button><button type=\"button\" class=\"menu-item\" role=\"menuitemcheckbox\" aria-checked=\"false\" tabindex=\"-1\" data-value=\"development\"><span class=\"menu-dot\" aria-hidden=\"true\"></span><span data-label>Development</span><i class=\"menu-glyph menu-check\" data-icon=\"check\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"m5 14 6 6L23 8\"/></svg></i></button><button type=\"button\" class=\"menu-item\" role=\"menuitemcheckbox\" aria-checked=\"false\" tabindex=\"-1\" data-value=\"motion\"><span class=\"menu-dot\" aria-hidden=\"true\"></span><span data-label>Motion</span><i class=\"menu-glyph menu-check\" data-icon=\"check\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"m5 14 6 6L23 8\"/></svg></i></button><div class=\"menu-rule\" role=\"separator\"></div><button type=\"button\" class=\"menu-item menu-done\" data-done>Done</button></div><p class=\"menu-feedback\" data-feedback role=\"status\" aria-live=\"polite\">Design</p></div>", css: style18, mount: api25.mount },
"context-menu": { markup: "<div class=\"menu-demo\" data-menu=\"context\"><div class=\"context-target\" data-context><i class=\"menu-glyph \" data-icon=\"file\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"M7 4h10l6 6v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm10 0v6h6\"/></svg></i><div class=\"context-title\"><strong>Project brief</strong><small>Document · Local preview</small></div><button type=\"button\" class=\"menu-trigger\" data-trigger aria-expanded=\"false\" aria-haspopup=\"menu\" aria-controls=\"menu-context\" aria-label=\"Open file actions\"><i class=\"menu-glyph \" data-icon=\"dots\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><circle cx=\"7\" cy=\"14\" r=\"1\" fill=\"currentColor\"/><circle cx=\"14\" cy=\"14\" r=\"1\" fill=\"currentColor\"/><circle cx=\"21\" cy=\"14\" r=\"1\" fill=\"currentColor\"/></svg></i></button></div><div id=\"menu-context\" class=\"menu-panel\" role=\"menu\" aria-label=\"context options\" aria-hidden=\"true\" inert><button type=\"button\" class=\"menu-item\" role=\"menuitem\" tabindex=\"-1\" data-value=\"open\" data-result=\"Document opened in this preview.\"><i class=\"menu-glyph \" data-icon=\"file\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"M7 4h10l6 6v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm10 0v6h6\"/></svg></i><span>Open document</span></button><button type=\"button\" class=\"menu-item\" role=\"menuitem\" tabindex=\"-1\" data-value=\"pin\" data-result=\"Document pinned in this preview.\"><i class=\"menu-glyph \" data-icon=\"pin\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"m17 4 7 7c-4 0-6 2-7 7l-3-3-5 1-4-4c5-1 7-3 7-7l5-1ZM10 18l-6 6\"/></svg></i><span>Pin to top</span></button><button type=\"button\" class=\"menu-item\" role=\"menuitem\" tabindex=\"-1\" data-value=\"duplicate\" data-result=\"Document duplicated in this preview.\"><i class=\"menu-glyph \" data-icon=\"copy\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><rect x=\"5\" y=\"8\" width=\"13\" height=\"16\" rx=\"2.5\"/><path d=\"M10 8V6.5A2.5 2.5 0 0 1 12.5 4h8A2.5 2.5 0 0 1 23 6.5v11a2.5 2.5 0 0 1-2.5 2.5H18\"/></svg></i><span>Duplicate</span></button></div><p class=\"menu-feedback\" data-feedback role=\"status\" aria-live=\"polite\">Right-click works here. No real files are changed.</p></div>", css: style18, mount: api25.mount },
"commands-menu": { markup: "<div class=\"menu-demo\" data-menu=\"commands\"><button type=\"button\" class=\"menu-trigger\" data-trigger aria-expanded=\"false\" aria-haspopup=\"dialog\" aria-controls=\"menu-commands\"><i class=\"menu-glyph \" data-icon=\"command\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"M4 10h7M4 18h7m5-13 9 9-9 9Z\"/></svg></i><span class=\"menu-trigger-label\" data-trigger-label>Quick commands</span><i class=\"menu-glyph menu-chevron\" data-icon=\"chevron\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"m8 11 6 6 6-6\"/></svg></i></button><div id=\"menu-commands\" class=\"menu-panel\" role=\"dialog\" aria-label=\"Quick commands\" aria-hidden=\"true\" inert><div class=\"command-body\"><div class=\"command-content\"><label class=\"menu-search\"><i class=\"menu-glyph \" data-icon=\"search\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><circle cx=\"12\" cy=\"12\" r=\"7.5\"/><path d=\"m17.5 17.5 6 6\"/></svg></i><input type=\"search\" aria-label=\"Search commands\" placeholder=\"Find a command…\" autocomplete=\"off\" spellcheck=\"false\"></label><div class=\"command-list\"><button type=\"button\" class=\"menu-item\" role=\"button\" tabindex=\"-1\" data-value=\"new-project\" data-result=\"New project created in this preview.\"><i class=\"menu-glyph \" data-icon=\"plus\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"M14 5v18M5 14h18\"/></svg></i><span>New project</span></button><button type=\"button\" class=\"menu-item\" role=\"button\" tabindex=\"-1\" data-value=\"browse\" data-result=\"Component browser selected in this preview.\"><i class=\"menu-glyph \" data-icon=\"folder\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"M4.5 9a2 2 0 0 1 2-2h5l2.5 3h7.5a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-15a2 2 0 0 1-2-2Z\"/></svg></i><span>Browse components</span></button><button type=\"button\" class=\"menu-item\" role=\"button\" tabindex=\"-1\" data-value=\"duplicate\" data-result=\"Page duplicated in this preview.\"><i class=\"menu-glyph \" data-icon=\"copy\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><rect x=\"5\" y=\"8\" width=\"13\" height=\"16\" rx=\"2.5\"/><path d=\"M10 8V6.5A2.5 2.5 0 0 1 12.5 4h8A2.5 2.5 0 0 1 23 6.5v11a2.5 2.5 0 0 1-2.5 2.5H18\"/></svg></i><span>Duplicate page</span></button><button type=\"button\" class=\"menu-item\" role=\"button\" tabindex=\"-1\" data-value=\"rename\" data-result=\"Workspace renamed in this preview.\"><i class=\"menu-glyph \" data-icon=\"edit\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"m5 23 1.5-5.5L19 5a2.8 2.8 0 0 1 4 4L10.5 21.5 5 23ZM16.5 7.5l4 4M6.5 17.5l4 4\"/></svg></i><span>Rename workspace</span></button><p class=\"command-empty\" data-empty hidden>No matching commands.</p></div></div></div></div><p class=\"menu-feedback\" data-feedback role=\"status\" aria-live=\"polite\">Search locally. No requests or navigation.</p></div>", css: style18, mount: api25.mount },
"workspace-menu": { markup: "<div class=\"menu-demo menu-study\" data-menu=\"workspace\" data-motion=\"rise\"><button type=\"button\" class=\"menu-trigger\" data-trigger aria-expanded=\"false\" aria-haspopup=\"menu\" aria-controls=\"study-workspace\"><i class=\"menu-glyph \" data-icon=\"folder\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"M4.5 9a2 2 0 0 1 2-2h5l2.5 3h7.5a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-15a2 2 0 0 1-2-2Z\"/></svg></i><span class=\"menu-trigger-label\" data-trigger-label>Studio workspace</span><i class=\"menu-glyph menu-chevron\" data-icon=\"chevron\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"m8 11 6 6 6-6\"/></svg></i></button><div class=\"menu-panel\" id=\"study-workspace\" role=\"menu\" aria-label=\"Workspace switcher\" aria-hidden=\"true\" inert><div class=\"menu-overline\">YOUR SPACES</div><button type=\"button\" class=\"menu-item\" data-value=\"studio\" data-label=\"Studio workspace\" role=\"menuitemradio\" aria-checked=\"true\" tabindex=\"-1\" ><i class=\"menu-glyph \" data-icon=\"folder\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"M4.5 9a2 2 0 0 1 2-2h5l2.5 3h7.5a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-15a2 2 0 0 1-2-2Z\"/></svg></i><span class=\"choice-copy\"><strong>Studio workspace</strong><small>Design and prototyping</small></span><i class=\"menu-glyph menu-check\" data-icon=\"check\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"m5 14 6 6L23 8\"/></svg></i></button><button type=\"button\" class=\"menu-item\" data-value=\"personal\" data-label=\"Personal space\" role=\"menuitemradio\" aria-checked=\"false\" tabindex=\"-1\" ><i class=\"menu-glyph \" data-icon=\"folder\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"M4.5 9a2 2 0 0 1 2-2h5l2.5 3h7.5a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-15a2 2 0 0 1-2-2Z\"/></svg></i><span class=\"choice-copy\"><strong>Personal space</strong><small>Your private projects</small></span><i class=\"menu-glyph menu-check\" data-icon=\"check\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"m5 14 6 6L23 8\"/></svg></i></button><button type=\"button\" class=\"menu-item\" data-value=\"shared\" data-label=\"Shared projects\" role=\"menuitemradio\" aria-checked=\"false\" tabindex=\"-1\" ><i class=\"menu-glyph \" data-icon=\"copy\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><rect x=\"5\" y=\"8\" width=\"13\" height=\"16\" rx=\"2.5\"/><path d=\"M10 8V6.5A2.5 2.5 0 0 1 12.5 4h8A2.5 2.5 0 0 1 23 6.5v11a2.5 2.5 0 0 1-2.5 2.5H18\"/></svg></i><span class=\"choice-copy\"><strong>Shared projects</strong><small>Work together</small></span><i class=\"menu-glyph menu-check\" data-icon=\"check\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"m5 14 6 6L23 8\"/></svg></i></button></div><p class=\"menu-feedback\" data-feedback role=\"status\" aria-live=\"polite\">Choose a workspace. This preview stays on the page.</p></div>", css: style19, mount: api26.mount },
"status-menu": { markup: "<div class=\"menu-demo menu-study\" data-menu=\"status\" data-motion=\"corner\"><button type=\"button\" class=\"menu-trigger\" data-trigger aria-expanded=\"false\" aria-haspopup=\"menu\" aria-controls=\"study-status\"><i class=\"menu-glyph \" data-icon=\"flag\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"M6 24V5m0 3c5-5 11 4 16-1v11c-5 5-11-4-16 1\"/></svg></i><span class=\"menu-trigger-label\" data-trigger-label>In progress</span><i class=\"menu-glyph menu-chevron\" data-icon=\"chevron\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"m8 11 6 6 6-6\"/></svg></i></button><div class=\"menu-panel\" id=\"study-status\" role=\"menu\" aria-label=\"Status picker\" aria-hidden=\"true\" inert><div class=\"menu-overline\">PROJECT STATUS</div><button type=\"button\" class=\"menu-item\" data-value=\"planned\" data-label=\"Planned\" role=\"menuitemradio\" aria-checked=\"false\" tabindex=\"-1\" ><i class=\"menu-glyph \" data-icon=\"clock\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><circle cx=\"14\" cy=\"14\" r=\"9\"/><path d=\"M14 8v6l4 3\"/></svg></i><span class=\"choice-copy\"><strong>Planned</strong></span><i class=\"menu-glyph menu-check\" data-icon=\"check\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"m5 14 6 6L23 8\"/></svg></i></button><button type=\"button\" class=\"menu-item\" data-value=\"active\" data-label=\"In progress\" role=\"menuitemradio\" aria-checked=\"true\" tabindex=\"-1\" ><i class=\"menu-glyph \" data-icon=\"edit\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"m5 23 1.5-5.5L19 5a2.8 2.8 0 0 1 4 4L10.5 21.5 5 23ZM16.5 7.5l4 4M6.5 17.5l4 4\"/></svg></i><span class=\"choice-copy\"><strong>In progress</strong></span><i class=\"menu-glyph menu-check\" data-icon=\"check\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"m5 14 6 6L23 8\"/></svg></i></button><button type=\"button\" class=\"menu-item\" data-value=\"review\" data-label=\"In review\" role=\"menuitemradio\" aria-checked=\"false\" tabindex=\"-1\" ><i class=\"menu-glyph \" data-icon=\"search\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><circle cx=\"12\" cy=\"12\" r=\"7.5\"/><path d=\"m17.5 17.5 6 6\"/></svg></i><span class=\"choice-copy\"><strong>In review</strong></span><i class=\"menu-glyph menu-check\" data-icon=\"check\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"m5 14 6 6L23 8\"/></svg></i></button><button type=\"button\" class=\"menu-item\" data-value=\"complete\" data-label=\"Complete\" role=\"menuitemradio\" aria-checked=\"false\" tabindex=\"-1\" ><i class=\"menu-glyph \" data-icon=\"check\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"m5 14 6 6L23 8\"/></svg></i><span class=\"choice-copy\"><strong>Complete</strong></span><i class=\"menu-glyph menu-check\" data-icon=\"check\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"m5 14 6 6L23 8\"/></svg></i></button></div><p class=\"menu-feedback\" data-feedback role=\"status\" aria-live=\"polite\">Choose a state for this sample project.</p></div>", css: style19, mount: api26.mount },
"assignee-menu": { markup: "<div class=\"menu-demo menu-study\" data-menu=\"assignee\" data-motion=\"sequence\"><button type=\"button\" class=\"menu-trigger\" data-trigger aria-expanded=\"false\" aria-haspopup=\"dialog\" aria-controls=\"study-assignee\"><i class=\"menu-glyph \" data-icon=\"search\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><circle cx=\"12\" cy=\"12\" r=\"7.5\"/><path d=\"m17.5 17.5 6 6\"/></svg></i><span class=\"menu-trigger-label\" data-trigger-label>Assign someone</span><i class=\"menu-glyph menu-chevron\" data-icon=\"chevron\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"m8 11 6 6 6-6\"/></svg></i></button><div class=\"menu-panel\" id=\"study-assignee\" role=\"dialog\" aria-label=\"Assignee menu\" aria-hidden=\"true\" inert><label class=\"menu-search\"><i class=\"menu-glyph \" data-icon=\"search\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><circle cx=\"12\" cy=\"12\" r=\"7.5\"/><path d=\"m17.5 17.5 6 6\"/></svg></i><input type=\"search\" aria-label=\"Find a teammate\" placeholder=\"Find a teammate\" autocomplete=\"off\" spellcheck=\"false\"></label><div class=\"study-scroll\"><button type=\"button\" class=\"menu-item\" data-value=\"alex\" data-label=\"Alex Morgan\" role=\"menuitemradio\" aria-checked=\"false\" tabindex=\"-1\" ><span class=\"person-initials\" aria-hidden=\"true\">AM</span><span class=\"choice-copy\"><strong>Alex Morgan</strong><small>Product design</small></span><i class=\"menu-glyph menu-check\" data-icon=\"check\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"m5 14 6 6L23 8\"/></svg></i></button><button type=\"button\" class=\"menu-item\" data-value=\"jules\" data-label=\"Jules Parker\" role=\"menuitemradio\" aria-checked=\"false\" tabindex=\"-1\" ><span class=\"person-initials\" aria-hidden=\"true\">JP</span><span class=\"choice-copy\"><strong>Jules Parker</strong><small>Development</small></span><i class=\"menu-glyph menu-check\" data-icon=\"check\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"m5 14 6 6L23 8\"/></svg></i></button><button type=\"button\" class=\"menu-item\" data-value=\"sam\" data-label=\"Sam Rivera\" role=\"menuitemradio\" aria-checked=\"false\" tabindex=\"-1\" ><span class=\"person-initials\" aria-hidden=\"true\">SR</span><span class=\"choice-copy\"><strong>Sam Rivera</strong><small>Project lead</small></span><i class=\"menu-glyph menu-check\" data-icon=\"check\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"m5 14 6 6L23 8\"/></svg></i></button><button type=\"button\" class=\"menu-item\" data-value=\"none\" data-label=\"Unassigned\" role=\"menuitemradio\" aria-checked=\"true\" tabindex=\"-1\" ><i class=\"menu-glyph \" data-icon=\"dash\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"M6 14h16\"/></svg></i><span class=\"choice-copy\"><strong>Unassigned</strong><small>No owner</small></span><i class=\"menu-glyph menu-check\" data-icon=\"check\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"m5 14 6 6L23 8\"/></svg></i></button></div><p class=\"command-empty\" data-empty hidden>No matches found.</p></div><p class=\"menu-feedback\" data-feedback role=\"status\" aria-live=\"polite\">Search by name or role.</p></div>", css: style19, mount: api26.mount },
"appearance-menu": { markup: "<div class=\"menu-demo menu-study\" data-menu=\"appearance\" data-motion=\"side\"><button type=\"button\" class=\"menu-trigger\" data-trigger aria-expanded=\"false\" aria-haspopup=\"menu\" aria-controls=\"study-appearance\"><i class=\"menu-glyph \" data-icon=\"edit\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"m5 23 1.5-5.5L19 5a2.8 2.8 0 0 1 4 4L10.5 21.5 5 23ZM16.5 7.5l4 4M6.5 17.5l4 4\"/></svg></i><span class=\"menu-trigger-label\" data-trigger-label>Matte</span><i class=\"menu-glyph menu-chevron\" data-icon=\"chevron\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"m8 11 6 6 6-6\"/></svg></i></button><div class=\"menu-panel\" id=\"study-appearance\" role=\"menu\" aria-label=\"Appearance menu\" aria-hidden=\"true\" inert><div class=\"menu-overline\">SURFACE</div><div class=\"surface-options\" role=\"group\" aria-label=\"Surface treatment\"><button type=\"button\" class=\"surface-option\" role=\"menuitemradio\" data-value=\"matte\" data-label=\"Matte\" aria-checked=\"true\" tabindex=\"-1\"><span class=\"surface-sample sample-matte\" aria-hidden=\"true\"></span><span>Matte</span><i class=\"menu-glyph menu-check\" data-icon=\"check\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"m5 14 6 6L23 8\"/></svg></i></button><button type=\"button\" class=\"surface-option\" role=\"menuitemradio\" data-value=\"outline\" data-label=\"Outline\" aria-checked=\"false\" tabindex=\"-1\"><span class=\"surface-sample sample-outline\" aria-hidden=\"true\"></span><span>Outline</span><i class=\"menu-glyph menu-check\" data-icon=\"check\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"m5 14 6 6L23 8\"/></svg></i></button><button type=\"button\" class=\"surface-option\" role=\"menuitemradio\" data-value=\"raised\" data-label=\"Raised\" aria-checked=\"false\" tabindex=\"-1\"><span class=\"surface-sample sample-raised\" aria-hidden=\"true\"></span><span>Raised</span><i class=\"menu-glyph menu-check\" data-icon=\"check\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"m5 14 6 6L23 8\"/></svg></i></button></div></div><p class=\"menu-feedback\" data-feedback role=\"status\" aria-live=\"polite\">The trigger previews the selected surface.</p></div>", css: style19, mount: api26.mount },
"density-menu": { markup: "<div class=\"menu-demo menu-study\" data-menu=\"density\" data-motion=\"up\"><button type=\"button\" class=\"menu-trigger\" data-trigger aria-expanded=\"false\" aria-haspopup=\"menu\" aria-controls=\"study-density\"><i class=\"menu-glyph \" data-icon=\"sort\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"M4 7h12M4 13h9M4 19h6M22 7v15m-3-3 3 3 3-3\"/></svg></i><span class=\"menu-trigger-label\" data-trigger-label>Comfortable</span><i class=\"menu-glyph menu-chevron\" data-icon=\"chevron\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"m8 11 6 6 6-6\"/></svg></i></button><div class=\"menu-panel\" id=\"study-density\" role=\"menu\" aria-label=\"Density menu\" aria-hidden=\"true\" inert><div class=\"menu-overline\">LIST SPACING</div><button type=\"button\" class=\"menu-item density-option\" role=\"menuitemradio\" data-value=\"compact\" data-label=\"Compact\" aria-checked=\"false\" tabindex=\"-1\"><span class=\"density-sample spacing-0\" aria-hidden=\"true\"><b></b><b></b><b></b></span><span>Compact</span><i class=\"menu-glyph menu-check\" data-icon=\"check\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"m5 14 6 6L23 8\"/></svg></i></button><button type=\"button\" class=\"menu-item density-option\" role=\"menuitemradio\" data-value=\"comfortable\" data-label=\"Comfortable\" aria-checked=\"true\" tabindex=\"-1\"><span class=\"density-sample spacing-1\" aria-hidden=\"true\"><b></b><b></b><b></b></span><span>Comfortable</span><i class=\"menu-glyph menu-check\" data-icon=\"check\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"m5 14 6 6L23 8\"/></svg></i></button><button type=\"button\" class=\"menu-item density-option\" role=\"menuitemradio\" data-value=\"spacious\" data-label=\"Spacious\" aria-checked=\"false\" tabindex=\"-1\"><span class=\"density-sample spacing-2\" aria-hidden=\"true\"><b></b><b></b><b></b></span><span>Spacious</span><i class=\"menu-glyph menu-check\" data-icon=\"check\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"m5 14 6 6L23 8\"/></svg></i></button></div><p class=\"menu-feedback\" data-feedback role=\"status\" aria-live=\"polite\">Open upward, then choose your preferred spacing.</p></div>", css: style19, mount: api26.mount },
"export-menu": { markup: "<div class=\"menu-demo menu-study\" data-menu=\"export\" data-motion=\"joined\" data-confirm=\"true\"><div class=\"study-joined\"><button type=\"button\" class=\"menu-trigger\" data-trigger aria-expanded=\"false\" aria-haspopup=\"menu\" aria-controls=\"study-export\"><i class=\"menu-glyph \" data-icon=\"file\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"M7 4h10l6 6v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm10 0v6h6\"/></svg></i><span class=\"menu-trigger-label\" data-trigger-label>Export file</span><i class=\"menu-glyph menu-chevron\" data-icon=\"chevron\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"m8 11 6 6 6-6\"/></svg></i></button><div class=\"study-reveal\"><div class=\"menu-panel\" id=\"study-export\" role=\"menu\" aria-label=\"Export menu\" aria-hidden=\"true\" inert><div class=\"menu-overline\">CHOOSE A FORMAT</div><div class=\"format-grid\"><button type=\"button\" class=\"format-option\" role=\"menuitemradio\" data-value=\"pdf\" data-label=\"PDF\" aria-checked=\"true\" tabindex=\"-1\"><i class=\"menu-glyph \" data-icon=\"file\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"M7 4h10l6 6v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm10 0v6h6\"/></svg></i><strong>PDF</strong><small>Document</small><i class=\"menu-glyph menu-check\" data-icon=\"check\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"m5 14 6 6L23 8\"/></svg></i></button><button type=\"button\" class=\"format-option\" role=\"menuitemradio\" data-value=\"png\" data-label=\"PNG\" aria-checked=\"false\" tabindex=\"-1\"><i class=\"menu-glyph \" data-icon=\"file\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"M7 4h10l6 6v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm10 0v6h6\"/></svg></i><strong>PNG</strong><small>Image</small><i class=\"menu-glyph menu-check\" data-icon=\"check\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"m5 14 6 6L23 8\"/></svg></i></button><button type=\"button\" class=\"format-option\" role=\"menuitemradio\" data-value=\"svg\" data-label=\"SVG\" aria-checked=\"false\" tabindex=\"-1\"><i class=\"menu-glyph \" data-icon=\"file\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"M7 4h10l6 6v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm10 0v6h6\"/></svg></i><strong>SVG</strong><small>Vector</small><i class=\"menu-glyph menu-check\" data-icon=\"check\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"m5 14 6 6L23 8\"/></svg></i></button><button type=\"button\" class=\"format-option\" role=\"menuitemradio\" data-value=\"html\" data-label=\"HTML\" aria-checked=\"false\" tabindex=\"-1\"><i class=\"menu-glyph \" data-icon=\"file\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"M7 4h10l6 6v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm10 0v6h6\"/></svg></i><strong>HTML</strong><small>Markup</small><i class=\"menu-glyph menu-check\" data-icon=\"check\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"m5 14 6 6L23 8\"/></svg></i></button></div><div class=\"menu-rule\"></div><button type=\"button\" class=\"menu-item menu-done\" data-apply>Preview export</button></div></div></div><p class=\"menu-feedback\" data-feedback role=\"status\" aria-live=\"polite\">Demo only. No file will be downloaded.</p></div>", css: style19, mount: api26.mount },
"permissions-menu": { markup: "<div class=\"menu-demo menu-study\" data-menu=\"permissions\" data-motion=\"hinge\" data-confirm=\"true\"><button type=\"button\" class=\"menu-trigger\" data-trigger aria-expanded=\"false\" aria-haspopup=\"menu\" aria-controls=\"study-permissions\"><i class=\"menu-glyph \" data-icon=\"tag\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"M5 5h8l10 10a2 2 0 0 1 0 3l-5 5a2 2 0 0 1-3 0L5 13Z\"/><circle cx=\"10\" cy=\"10\" r=\"1.7\"/></svg></i><span class=\"menu-trigger-label\" data-trigger-label>Can view</span><i class=\"menu-glyph menu-chevron\" data-icon=\"chevron\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"m8 11 6 6 6-6\"/></svg></i></button><div class=\"menu-panel\" id=\"study-permissions\" role=\"menu\" aria-label=\"Access menu\" aria-hidden=\"true\" inert><div class=\"menu-overline\">LINK ACCESS</div><button type=\"button\" class=\"menu-item\" data-value=\"view\" data-label=\"Can view\" role=\"menuitemradio\" aria-checked=\"true\" tabindex=\"-1\" ><i class=\"menu-glyph \" data-icon=\"file\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"M7 4h10l6 6v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm10 0v6h6\"/></svg></i><span class=\"choice-copy\"><strong>Can view</strong><small>Read without making changes</small></span><i class=\"menu-glyph menu-check\" data-icon=\"check\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"m5 14 6 6L23 8\"/></svg></i></button><button type=\"button\" class=\"menu-item\" data-value=\"comment\" data-label=\"Can comment\" role=\"menuitemradio\" aria-checked=\"false\" tabindex=\"-1\" ><i class=\"menu-glyph \" data-icon=\"edit\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"m5 23 1.5-5.5L19 5a2.8 2.8 0 0 1 4 4L10.5 21.5 5 23ZM16.5 7.5l4 4M6.5 17.5l4 4\"/></svg></i><span class=\"choice-copy\"><strong>Can comment</strong><small>Leave feedback on the project</small></span><i class=\"menu-glyph menu-check\" data-icon=\"check\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"m5 14 6 6L23 8\"/></svg></i></button><button type=\"button\" class=\"menu-item\" data-value=\"edit\" data-label=\"Can edit\" role=\"menuitemradio\" aria-checked=\"false\" tabindex=\"-1\" ><i class=\"menu-glyph \" data-icon=\"edit\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"m5 23 1.5-5.5L19 5a2.8 2.8 0 0 1 4 4L10.5 21.5 5 23ZM16.5 7.5l4 4M6.5 17.5l4 4\"/></svg></i><span class=\"choice-copy\"><strong>Can edit</strong><small>Make changes to the project</small></span><i class=\"menu-glyph menu-check\" data-icon=\"check\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"m5 14 6 6L23 8\"/></svg></i></button><div class=\"menu-rule\"></div><button type=\"button\" class=\"menu-item menu-done\" data-apply>Apply access</button></div><p class=\"menu-feedback\" data-feedback role=\"status\" aria-live=\"polite\">This demo does not change real sharing permissions.</p></div>", css: style19, mount: api26.mount },
"snooze-menu": { markup: "<div class=\"menu-demo menu-study\" data-menu=\"snooze\" data-motion=\"lift\"><button type=\"button\" class=\"menu-trigger\" data-trigger aria-expanded=\"false\" aria-haspopup=\"dialog\" aria-controls=\"study-snooze\"><i class=\"menu-glyph \" data-icon=\"clock\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><circle cx=\"14\" cy=\"14\" r=\"9\"/><path d=\"M14 8v6l4 3\"/></svg></i><span class=\"menu-trigger-label\" data-trigger-label>Remind me</span><i class=\"menu-glyph menu-chevron\" data-icon=\"chevron\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"m8 11 6 6 6-6\"/></svg></i></button><div class=\"menu-panel\" id=\"study-snooze\" role=\"dialog\" aria-label=\"Reminder menu\" aria-hidden=\"true\" inert><div class=\"menu-overline\">REMIND ME LATER</div><button type=\"button\" class=\"menu-item\" data-value=\"hour\" data-label=\"In one hour\" role=\"menuitemradio\" aria-checked=\"false\" tabindex=\"-1\" ><i class=\"menu-glyph \" data-icon=\"clock\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><circle cx=\"14\" cy=\"14\" r=\"9\"/><path d=\"M14 8v6l4 3\"/></svg></i><span class=\"choice-copy\"><strong>In one hour</strong></span><i class=\"menu-glyph menu-check\" data-icon=\"check\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"m5 14 6 6L23 8\"/></svg></i></button><button type=\"button\" class=\"menu-item\" data-value=\"tomorrow\" data-label=\"Tomorrow morning\" role=\"menuitemradio\" aria-checked=\"false\" tabindex=\"-1\" ><i class=\"menu-glyph \" data-icon=\"flag\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"M6 24V5m0 3c5-5 11 4 16-1v11c-5 5-11-4-16 1\"/></svg></i><span class=\"choice-copy\"><strong>Tomorrow morning</strong></span><i class=\"menu-glyph menu-check\" data-icon=\"check\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"m5 14 6 6L23 8\"/></svg></i></button><div class=\"menu-rule\"></div><div class=\"custom-time\"><label for=\"reminder-time\">Choose a time</label><div><input type=\"time\" id=\"reminder-time\" value=\"15:00\" required><button type=\"button\" data-time-apply aria-label=\"Use selected time\"><i class=\"menu-glyph \" data-icon=\"check\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"m5 14 6 6L23 8\"/></svg></i></button></div></div></div><p class=\"menu-feedback\" data-feedback role=\"status\" aria-live=\"polite\">Preview only. No notification is scheduled.</p></div>", css: style19, mount: api26.mount },
"move-menu": { markup: "<div class=\"menu-demo menu-study\" data-menu=\"move\" data-motion=\"drill\"><button type=\"button\" class=\"menu-trigger\" data-trigger aria-expanded=\"false\" aria-haspopup=\"dialog\" aria-controls=\"study-move\"><i class=\"menu-glyph \" data-icon=\"folder\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"M4.5 9a2 2 0 0 1 2-2h5l2.5 3h7.5a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-15a2 2 0 0 1-2-2Z\"/></svg></i><span class=\"menu-trigger-label\" data-trigger-label>Move to folder</span><i class=\"menu-glyph menu-chevron\" data-icon=\"chevron\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"m8 11 6 6 6-6\"/></svg></i></button><div class=\"menu-panel\" id=\"study-move\" role=\"dialog\" aria-label=\"Folder menu\" aria-hidden=\"true\" inert><div class=\"folder-toolbar\"><button type=\"button\" data-back aria-label=\"Back to folders\" hidden><i class=\"menu-glyph \" data-icon=\"chevron\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"m8 11 6 6 6-6\"/></svg></i></button><strong data-path>Projects</strong></div><div class=\"folder-pages\"><div data-folder-root><button type=\"button\" class=\"menu-item\" data-folder=\"Design\" tabindex=\"-1\"><i class=\"menu-glyph \" data-icon=\"folder\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"M4.5 9a2 2 0 0 1 2-2h5l2.5 3h7.5a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-15a2 2 0 0 1-2-2Z\"/></svg></i><span>Design</span><i class=\"menu-glyph folder-next\" data-icon=\"chevron\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"m8 11 6 6 6-6\"/></svg></i></button><button type=\"button\" class=\"menu-item\" data-folder=\"Development\" tabindex=\"-1\"><i class=\"menu-glyph \" data-icon=\"folder\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"M4.5 9a2 2 0 0 1 2-2h5l2.5 3h7.5a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-15a2 2 0 0 1-2-2Z\"/></svg></i><span>Development</span><i class=\"menu-glyph folder-next\" data-icon=\"chevron\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"m8 11 6 6 6-6\"/></svg></i></button><button type=\"button\" class=\"menu-item\" data-folder=\"Archive\" tabindex=\"-1\"><i class=\"menu-glyph \" data-icon=\"archive\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><rect x=\"4\" y=\"5\" width=\"20\" height=\"5\" rx=\"1.5\"/><path d=\"M6 10v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10M11 15h6\"/></svg></i><span>Archive</span><i class=\"menu-glyph folder-next\" data-icon=\"chevron\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"m8 11 6 6 6-6\"/></svg></i></button></div><div data-folder-child inert aria-hidden=\"true\"><div class=\"folder-description\"><i class=\"menu-glyph \" data-icon=\"folder\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"M4.5 9a2 2 0 0 1 2-2h5l2.5 3h7.5a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-15a2 2 0 0 1-2-2Z\"/></svg></i><strong data-folder-name>Design</strong><small>Move your sample document here.</small></div><button type=\"button\" class=\"menu-item menu-done\" data-move>Move here</button></div></div></div><p class=\"menu-feedback\" data-feedback role=\"status\" aria-live=\"polite\">Browse folders. No real document is moved.</p></div>", css: style19, mount: api26.mount },
"insert-menu": { markup: "<div class=\"menu-demo menu-study\" data-menu=\"insert\" data-motion=\"fan\"><button type=\"button\" class=\"menu-trigger\" data-trigger aria-expanded=\"false\" aria-haspopup=\"menu\" aria-controls=\"study-insert\"><i class=\"menu-glyph \" data-icon=\"plus\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"M14 5v18M5 14h18\"/></svg></i><span class=\"menu-trigger-label\" data-trigger-label>Insert block</span><i class=\"menu-glyph menu-chevron\" data-icon=\"chevron\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"m8 11 6 6 6-6\"/></svg></i></button><div class=\"menu-panel\" id=\"study-insert\" role=\"menu\" aria-label=\"Insert menu\" aria-hidden=\"true\" inert><div class=\"menu-overline\">CONTENT BLOCKS</div><div class=\"insert-grid\"><button type=\"button\" class=\"insert-option\" data-value=\"text\" data-label=\"Text\" role=\"menuitem\" tabindex=\"-1\"><i class=\"menu-glyph \" data-icon=\"edit\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"m5 23 1.5-5.5L19 5a2.8 2.8 0 0 1 4 4L10.5 21.5 5 23ZM16.5 7.5l4 4M6.5 17.5l4 4\"/></svg></i><span>Text</span></button><button type=\"button\" class=\"insert-option\" data-value=\"image\" data-label=\"Image\" role=\"menuitem\" tabindex=\"-1\"><i class=\"menu-glyph \" data-icon=\"file\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"M7 4h10l6 6v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm10 0v6h6\"/></svg></i><span>Image</span></button><button type=\"button\" class=\"insert-option\" data-value=\"file\" data-label=\"File\" role=\"menuitem\" tabindex=\"-1\"><i class=\"menu-glyph \" data-icon=\"file\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"M7 4h10l6 6v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm10 0v6h6\"/></svg></i><span>File</span></button><button type=\"button\" class=\"insert-option\" data-value=\"list\" data-label=\"List\" role=\"menuitem\" tabindex=\"-1\"><i class=\"menu-glyph \" data-icon=\"sort\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"M4 7h12M4 13h9M4 19h6M22 7v15m-3-3 3 3 3-3\"/></svg></i><span>List</span></button><button type=\"button\" class=\"insert-option\" data-value=\"quote\" data-label=\"Quote\" role=\"menuitem\" tabindex=\"-1\"><i class=\"menu-glyph \" data-icon=\"copy\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><rect x=\"5\" y=\"8\" width=\"13\" height=\"16\" rx=\"2.5\"/><path d=\"M10 8V6.5A2.5 2.5 0 0 1 12.5 4h8A2.5 2.5 0 0 1 23 6.5v11a2.5 2.5 0 0 1-2.5 2.5H18\"/></svg></i><span>Quote</span></button><button type=\"button\" class=\"insert-option\" data-value=\"section\" data-label=\"Section\" role=\"menuitem\" tabindex=\"-1\"><i class=\"menu-glyph \" data-icon=\"folder\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"M4.5 9a2 2 0 0 1 2-2h5l2.5 3h7.5a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-15a2 2 0 0 1-2-2Z\"/></svg></i><span>Section</span></button></div></div><p class=\"menu-feedback\" data-feedback role=\"status\" aria-live=\"polite\">Select a block to insert into the local preview.</p></div>", css: style19, mount: api26.mount },
"tabs-navigation": { markup: "<div class=\"nav-demo\" data-navigation=\"tabs\"><div class=\"nav-surface tabs-surface\"><div class=\"nav-track underline-track\" role=\"tablist\" aria-label=\"Project sections\"><span class=\"nav-indicator\" aria-hidden=\"true\"></span><button type=\"button\" role=\"tab\" id=\"tabs-tab-0\" aria-controls=\"tabs-panel-0\" aria-selected=\"true\" tabindex=\"0\" data-choice=\"0\"><span>Overview</span></button><button type=\"button\" role=\"tab\" id=\"tabs-tab-1\" aria-controls=\"tabs-panel-1\" aria-selected=\"false\" tabindex=\"-1\" data-choice=\"1\"><span>Files</span></button><button type=\"button\" role=\"tab\" id=\"tabs-tab-2\" aria-controls=\"tabs-panel-2\" aria-selected=\"false\" tabindex=\"-1\" data-choice=\"2\"><span>Activity</span></button></div><div class=\"nav-content\" role=\"tabpanel\" id=\"tabs-panel-0\" aria-labelledby=\"tabs-tab-0\" tabindex=\"0\" ><span class=\"nav-eyebrow\">STUDIO PROJECT</span><h3>A little more clarity.</h3><p>Your ideas, files and progress in one place.</p><div class=\"project-meta\"><span class=\"status-dot\"></span>In progress<span class=\"meta-line\"></span>Updated today</div></div><div class=\"nav-content\" role=\"tabpanel\" id=\"tabs-panel-1\" aria-labelledby=\"tabs-tab-1\" tabindex=\"0\" hidden><div class=\"document-row\"><i class=\"menu-glyph \" data-icon=\"file\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"M7 4h10l6 6v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm10 0v6h6\"/></svg></i><div><strong>Project brief</strong><small>Document · Updated today</small></div></div><div class=\"document-row\"><i class=\"menu-glyph \" data-icon=\"folder\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"M4.5 9a2 2 0 0 1 2-2h5l2.5 3h7.5a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-15a2 2 0 0 1-2-2Z\"/></svg></i><div><strong>Design assets</strong><small>Folder · Three files</small></div></div></div><div class=\"nav-content\" role=\"tabpanel\" id=\"tabs-panel-2\" aria-labelledby=\"tabs-tab-2\" tabindex=\"0\" hidden><div class=\"activity-line\"><span></span><div><strong>Brief updated</strong><small>Alex · Just now</small></div></div><div class=\"activity-line\"><span></span><div><strong>Assets added</strong><small>Sam · Earlier today</small></div></div></div></div></div>", css: style20, mount: api27.mount },
"views-navigation": { markup: "<div class=\"nav-demo\" data-navigation=\"views\"><div class=\"nav-surface view-surface\"><div class=\"nav-track segment-track\" role=\"tablist\" aria-label=\"Collection view\"><span class=\"nav-indicator\" aria-hidden=\"true\"></span><button type=\"button\" role=\"tab\" id=\"views-tab-0\" aria-controls=\"views-panel-0\" aria-selected=\"true\" tabindex=\"0\" data-choice=\"0\"><i class=\"menu-glyph \" data-icon=\"sort\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"M4 7h12M4 13h9M4 19h6M22 7v15m-3-3 3 3 3-3\"/></svg></i><span>List</span></button><button type=\"button\" role=\"tab\" id=\"views-tab-1\" aria-controls=\"views-panel-1\" aria-selected=\"false\" tabindex=\"-1\" data-choice=\"1\"><i class=\"menu-glyph \" data-icon=\"folder\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"M4.5 9a2 2 0 0 1 2-2h5l2.5 3h7.5a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-15a2 2 0 0 1-2-2Z\"/></svg></i><span>Board</span></button><button type=\"button\" role=\"tab\" id=\"views-tab-2\" aria-controls=\"views-panel-2\" aria-selected=\"false\" tabindex=\"-1\" data-choice=\"2\"><i class=\"menu-glyph \" data-icon=\"clock\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><circle cx=\"14\" cy=\"14\" r=\"9\"/><path d=\"M14 8v6l4 3\"/></svg></i><span>Timeline</span></button></div><div class=\"nav-content\" role=\"tabpanel\" id=\"views-panel-0\" aria-labelledby=\"views-tab-0\" tabindex=\"0\" ><div class=\"document-row\"><i class=\"menu-glyph \" data-icon=\"file\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"M7 4h10l6 6v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm10 0v6h6\"/></svg></i><div><strong>Research</strong><small>Gather ideas</small></div></div><div class=\"document-row\"><i class=\"menu-glyph \" data-icon=\"edit\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"m5 23 1.5-5.5L19 5a2.8 2.8 0 0 1 4 4L10.5 21.5 5 23ZM16.5 7.5l4 4M6.5 17.5l4 4\"/></svg></i><div><strong>Design</strong><small>Shape the details</small></div></div><div class=\"document-row\"><i class=\"menu-glyph \" data-icon=\"check\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"m5 14 6 6L23 8\"/></svg></i><div><strong>Review</strong><small>Bring it together</small></div></div></div><div class=\"nav-content\" role=\"tabpanel\" id=\"views-panel-1\" aria-labelledby=\"views-tab-1\" tabindex=\"0\" hidden><div class=\"mini-board\"><div><small>PLANNED</small><span>Research</span></div><div><small>ACTIVE</small><span>Design</span></div><div><small>DONE</small><span>Review</span></div></div></div><div class=\"nav-content\" role=\"tabpanel\" id=\"views-panel-2\" aria-labelledby=\"views-tab-2\" tabindex=\"0\" hidden><div class=\"mini-timeline\"><div><span>Research</span><b></b></div><div><span>Design</span><b></b></div><div><span>Review</span><b></b></div><footer><span>MON</span><span>WED</span><span>FRI</span></footer></div></div></div></div>", css: style20, mount: api27.mount },
"breadcrumbs-navigation": { markup: "<div class=\"nav-demo\" data-navigation=\"breadcrumbs\"><div class=\"nav-surface trail-surface\"><nav aria-label=\"Folder location\"><ol class=\"folder-trail\" data-trail></ol></nav><div class=\"trail-body\" data-folder-content></div><p class=\"trail-note\" data-folder-note role=\"status\"></p></div></div>", css: style20, mount: api27.mount },
"pages-navigation": { markup: "<div class=\"nav-demo\" data-navigation=\"pages\"><div class=\"nav-surface pages-surface\"><div class=\"collection-heading\"><strong>Project files</strong><span data-page-summary role=\"status\">1–2 of 10</span></div><div class=\"page-files\" data-page-files></div><nav class=\"pagination\" aria-label=\"Collection pages\"><button type=\"button\" data-previous aria-label=\"Previous page\"><i class=\"menu-glyph arrow-left\" data-icon=\"chevron\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"m8 11 6 6 6-6\"/></svg></i></button><div class=\"page-numbers\"><span class=\"page-indicator\" aria-hidden=\"true\"></span><button type=\"button\" data-page=\"1\" aria-label=\"Page 1\" aria-current=\"page\">1</button><button type=\"button\" data-page=\"2\" aria-label=\"Page 2\" >2</button><button type=\"button\" data-page=\"3\" aria-label=\"Page 3\" >3</button><button type=\"button\" data-page=\"4\" aria-label=\"Page 4\" >4</button><button type=\"button\" data-page=\"5\" aria-label=\"Page 5\" >5</button></div><button type=\"button\" data-next aria-label=\"Next page\"><i class=\"menu-glyph arrow-right\" data-icon=\"chevron\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"m8 11 6 6 6-6\"/></svg></i></button></nav></div></div>", css: style20, mount: api27.mount },
"sidebar-navigation": { markup: "<div class=\"nav-demo\" data-navigation=\"sidebar\"><div class=\"nav-surface sidebar-surface\"><nav class=\"side-rail\" aria-label=\"Workspace sections\"><button type=\"button\" class=\"rail-toggle\" data-collapse aria-label=\"Collapse navigation\" aria-expanded=\"true\"><i class=\"menu-glyph arrow-left\" data-icon=\"chevron\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"m8 11 6 6 6-6\"/></svg></i></button><div class=\"side-links\"><span class=\"side-marker\" aria-hidden=\"true\"></span><button type=\"button\" data-section=\"0\" aria-label=\"Projects\" aria-current=\"page\"><i class=\"menu-glyph \" data-icon=\"folder\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"M4.5 9a2 2 0 0 1 2-2h5l2.5 3h7.5a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-15a2 2 0 0 1-2-2Z\"/></svg></i><span>Projects</span></button><button type=\"button\" data-section=\"1\" aria-label=\"Files\" ><i class=\"menu-glyph \" data-icon=\"file\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"M7 4h10l6 6v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm10 0v6h6\"/></svg></i><span>Files</span></button><button type=\"button\" data-section=\"2\" aria-label=\"Saved\" ><i class=\"menu-glyph \" data-icon=\"pin\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"m17 4 7 7c-4 0-6 2-7 7l-3-3-5 1-4-4c5-1 7-3 7-7l5-1ZM10 18l-6 6\"/></svg></i><span>Saved</span></button></div></nav><section class=\"side-content\" data-side-content aria-live=\"polite\"></section></div></div>", css: style20, mount: api27.mount },
"steps-navigation": { markup: "<div class=\"nav-demo nav-next\" data-navigation=\"steps\"><div class=\"nav-surface steps-surface\"><nav class=\"step-track\" aria-label=\"Project setup\"><span class=\"step-line\" aria-hidden=\"true\"></span><button type=\"button\" data-step=\"0\" aria-current=\"step\"><span class=\"step-circle\"><i class=\"menu-glyph \" data-icon=\"file\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"M7 4h10l6 6v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm10 0v6h6\"/></svg></i></span><span>Details</span></button><button type=\"button\" data-step=\"1\" ><span class=\"step-circle\"><i class=\"menu-glyph \" data-icon=\"edit\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"m5 23 1.5-5.5L19 5a2.8 2.8 0 0 1 4 4L10.5 21.5 5 23ZM16.5 7.5l4 4M6.5 17.5l4 4\"/></svg></i></span><span>Style</span></button><button type=\"button\" data-step=\"2\" ><span class=\"step-circle\"><i class=\"menu-glyph \" data-icon=\"check\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"m5 14 6 6L23 8\"/></svg></i></span><span>Review</span></button></nav><section class=\"step-copy\" data-step-copy aria-live=\"polite\"><h3>Give your idea a home.</h3><p>Start with a clear project brief and a little room to explore.</p></section><div class=\"step-actions\"><button type=\"button\" data-back disabled>Back</button><button type=\"button\" data-forward>Continue <i class=\"menu-glyph arrow-right\" data-icon=\"chevron\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"m8 11 6 6 6-6\"/></svg></i></button></div></div></div>", css: style21, mount: api28.mount },
"dock-navigation": { markup: "<div class=\"nav-demo nav-next\" data-navigation=\"dock\"><div class=\"nav-surface dock-surface\"><div class=\"dock-content\" data-dock-content aria-live=\"polite\"><i class=\"menu-glyph \" data-icon=\"folder\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"M4.5 9a2 2 0 0 1 2-2h5l2.5 3h7.5a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-15a2 2 0 0 1-2-2Z\"/></svg></i><h3>Your workspace</h3><p>A quiet place for your next project.</p></div><nav class=\"bottom-dock\" aria-label=\"App sections\"><span class=\"dock-indicator\" aria-hidden=\"true\"></span><button type=\"button\" data-dock=\"0\" aria-current=\"page\"><i class=\"menu-glyph \" data-icon=\"folder\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"M4.5 9a2 2 0 0 1 2-2h5l2.5 3h7.5a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-15a2 2 0 0 1-2-2Z\"/></svg></i><span>Projects</span></button><button type=\"button\" data-dock=\"1\" ><i class=\"menu-glyph \" data-icon=\"clock\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><circle cx=\"14\" cy=\"14\" r=\"9\"/><path d=\"M14 8v6l4 3\"/></svg></i><span>Recent</span></button><button type=\"button\" data-dock=\"2\" ><i class=\"menu-glyph \" data-icon=\"pin\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"m17 4 7 7c-4 0-6 2-7 7l-3-3-5 1-4-4c5-1 7-3 7-7l5-1ZM10 18l-6 6\"/></svg></i><span>Saved</span></button></nav></div></div>", css: style21, mount: api28.mount },
"sections-navigation": { markup: "<div class=\"nav-demo nav-next\" data-navigation=\"sections\"><div class=\"nav-surface index-surface\"><div class=\"index-heading\">Project guide</div><div class=\"index-layout\"><nav class=\"section-index\" aria-label=\"Guide sections\"><button type=\"button\" data-jump=\"0\" aria-current=\"location\"><i aria-hidden=\"true\"></i>Brief</button><button type=\"button\" data-jump=\"1\" ><i aria-hidden=\"true\"></i>Style</button><button type=\"button\" data-jump=\"2\" ><i aria-hidden=\"true\"></i>Motion</button></nav><div class=\"reading-pane\" tabindex=\"0\" aria-label=\"Scrollable project guide\"><section data-reading=\"0\" aria-label=\"Brief\"><span class=\"nav-eyebrow\">BRIEF</span><h3>The starting point</h3><p>Great work begins with a clear intention. Keep the purpose close and leave space for discovery.</p><small>Start simple. Make the important things easy to find.</small></section><section data-reading=\"1\" aria-label=\"Style\"><span class=\"nav-eyebrow\">STYLE</span><h3>A familiar feeling</h3><p>Quiet surfaces, thoughtful spacing and a consistent visual language make a product feel connected.</p><small>Give every detail a reason to be there.</small></section><section data-reading=\"2\" aria-label=\"Motion\"><span class=\"nav-eyebrow\">MOTION</span><h3>Move with purpose</h3><p>Movement helps explain what changed and where to look next. Keep it responsive to every interaction.</p><small>A small gesture is often enough.</small></section></div></div></div></div>", css: style21, mount: api28.mount },
"carousel-navigation": { markup: "<div class=\"nav-demo nav-next\" data-navigation=\"carousel\"><div class=\"nav-surface collection-surface\"><div class=\"collection-window\" tabindex=\"0\" role=\"region\" aria-roledescription=\"carousel\" aria-label=\"Project collection\"><div class=\"collection-track\"><section class=\"collection-slide\" role=\"group\" aria-roledescription=\"slide\" aria-label=\"1 of 3\" ><span class=\"slide-emblem\"><i class=\"menu-glyph \" data-icon=\"folder\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"M4.5 9a2 2 0 0 1 2-2h5l2.5 3h7.5a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-15a2 2 0 0 1-2-2Z\"/></svg></i></span><span class=\"nav-eyebrow\">STUDIO COLLECTION</span><h3>Brand system</h3><p>A shared language for every detail.</p></section><section class=\"collection-slide\" role=\"group\" aria-roledescription=\"slide\" aria-label=\"2 of 3\" inert aria-hidden=\"true\"><span class=\"slide-emblem\"><i class=\"menu-glyph \" data-icon=\"file\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"M7 4h10l6 6v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm10 0v6h6\"/></svg></i></span><span class=\"nav-eyebrow\">STUDIO COLLECTION</span><h3>Product flow</h3><p>A clear path from idea to interaction.</p></section><section class=\"collection-slide\" role=\"group\" aria-roledescription=\"slide\" aria-label=\"3 of 3\" inert aria-hidden=\"true\"><span class=\"slide-emblem\"><i class=\"menu-glyph \" data-icon=\"edit\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"m5 23 1.5-5.5L19 5a2.8 2.8 0 0 1 4 4L10.5 21.5 5 23ZM16.5 7.5l4 4M6.5 17.5l4 4\"/></svg></i></span><span class=\"nav-eyebrow\">STUDIO COLLECTION</span><h3>Motion notes</h3><p>Small movements with a little meaning.</p></section></div></div><div class=\"collection-controls\"><button type=\"button\" data-prev-slide aria-label=\"Previous project\" disabled><i class=\"menu-glyph arrow-left\" data-icon=\"chevron\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"m8 11 6 6 6-6\"/></svg></i></button><nav class=\"collection-dots\" aria-label=\"Choose project\"><button type=\"button\" data-slide=\"0\" aria-label=\"Brand system\" aria-current=\"true\"><span></span></button><button type=\"button\" data-slide=\"1\" aria-label=\"Product flow\" ><span></span></button><button type=\"button\" data-slide=\"2\" aria-label=\"Motion notes\" ><span></span></button></nav><button type=\"button\" data-next-slide aria-label=\"Next project\"><i class=\"menu-glyph arrow-right\" data-icon=\"chevron\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"m8 11 6 6 6-6\"/></svg></i></button></div><p class=\"sr-only\" data-slide-status role=\"status\">Brand system, 1 of 3</p></div></div>", css: style21, mount: api28.mount },
"tree-navigation": { markup: "<div class=\"nav-demo nav-next\" data-navigation=\"tree\"><div class=\"nav-surface tree-surface\"><div class=\"tree-heading\">Workspace files</div><ul class=\"file-tree\" role=\"tree\" aria-label=\"Workspace files\"><li role=\"treeitem\" aria-label=\"Design\" aria-expanded=\"true\" tabindex=\"0\" data-branch=\"0\"><div class=\"tree-row\"><i class=\"menu-glyph tree-chevron\" data-icon=\"chevron\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"m8 11 6 6 6-6\"/></svg></i><i class=\"menu-glyph \" data-icon=\"folder\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"M4.5 9a2 2 0 0 1 2-2h5l2.5 3h7.5a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-15a2 2 0 0 1-2-2Z\"/></svg></i><span>Design</span></div><ul role=\"group\" ><li role=\"treeitem\" aria-label=\"Brand guide\" aria-selected=\"false\" tabindex=\"-1\" data-file=\"0-0\" data-description=\"Visual direction\"><div class=\"tree-row\"><i class=\"menu-glyph \" data-icon=\"file\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"M7 4h10l6 6v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm10 0v6h6\"/></svg></i><span>Brand guide</span></div></li><li role=\"treeitem\" aria-label=\"Components\" aria-selected=\"false\" tabindex=\"-1\" data-file=\"0-1\" data-description=\"Interface building blocks\"><div class=\"tree-row\"><i class=\"menu-glyph \" data-icon=\"file\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"M7 4h10l6 6v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm10 0v6h6\"/></svg></i><span>Components</span></div></li></ul></li><li role=\"treeitem\" aria-label=\"Development\" aria-expanded=\"false\" tabindex=\"-1\" data-branch=\"1\"><div class=\"tree-row\"><i class=\"menu-glyph tree-chevron\" data-icon=\"chevron\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"m8 11 6 6 6-6\"/></svg></i><i class=\"menu-glyph \" data-icon=\"folder\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"M4.5 9a2 2 0 0 1 2-2h5l2.5 3h7.5a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-15a2 2 0 0 1-2-2Z\"/></svg></i><span>Development</span></div><ul role=\"group\" hidden><li role=\"treeitem\" aria-label=\"App shell\" aria-selected=\"false\" tabindex=\"-1\" data-file=\"1-0\" data-description=\"Navigation structure\"><div class=\"tree-row\"><i class=\"menu-glyph \" data-icon=\"file\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"M7 4h10l6 6v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm10 0v6h6\"/></svg></i><span>App shell</span></div></li><li role=\"treeitem\" aria-label=\"Release notes\" aria-selected=\"false\" tabindex=\"-1\" data-file=\"1-1\" data-description=\"Latest project updates\"><div class=\"tree-row\"><i class=\"menu-glyph \" data-icon=\"file\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"M7 4h10l6 6v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm10 0v6h6\"/></svg></i><span>Release notes</span></div></li></ul></li></ul><div class=\"tree-detail\" aria-live=\"polite\"><strong data-file-name>Select a file</strong><small data-file-description>Explore a folder above.</small></div></div></div>", css: style21, mount: api28.mount },
"modal-overlay": { markup: "<div class=\"overlay-demo\" data-overlay=\"modal\" data-open=\"false\"><div class=\"overlay-launch\"><button class=\"overlay-trigger\" type=\"button\" data-trigger aria-haspopup=\"dialog\" aria-expanded=\"false\"><i class=\"menu-glyph \" data-icon=\"plus\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"M14 5v18M5 14h18\"/></svg></i><span>New project</span></button><p class=\"overlay-feedback\" data-feedback role=\"status\">Try it here. Nothing leaves this preview.</p></div><dialog class=\"overlay-panel\" aria-labelledby=\"panel-title\" aria-describedby=\"panel-description\"><button class=\"overlay-close\" type=\"button\" data-close aria-label=\"Close\"><svg viewBox=\"0 0 28 28\" aria-hidden=\"true\"><path d=\"m8 8 12 12M20 8 8 20\"/></svg></button><div class=\"overlay-emblem\"><i class=\"menu-glyph \" data-icon=\"folder\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"M4.5 9a2 2 0 0 1 2-2h5l2.5 3h7.5a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-15a2 2 0 0 1-2-2Z\"/></svg></i></div><h2 id=\"panel-title\">A fresh start</h2><p id=\"panel-description\">Give your next idea a place to grow.</p><form data-form><label class=\"overlay-field\">Project name<input name=\"project\" value=\"Studio project\" required maxlength=\"48\" autocomplete=\"off\"></label><div class=\"overlay-actions\"><button type=\"button\" data-close>Cancel</button><button class=\"overlay-primary\" type=\"submit\">Create project</button></div></form></dialog></div>", css: style22, frameMount: frameApi0 },
"drawer-overlay": { markup: "<div class=\"overlay-demo\" data-overlay=\"drawer\" data-open=\"false\"><div class=\"overlay-launch\"><button class=\"overlay-trigger\" type=\"button\" data-trigger aria-haspopup=\"dialog\" aria-expanded=\"false\"><i class=\"menu-glyph \" data-icon=\"file\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"M7 4h10l6 6v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm10 0v6h6\"/></svg></i><span>Project details</span></button><p class=\"overlay-feedback\" data-feedback role=\"status\">Try it here. Nothing leaves this preview.</p></div><dialog class=\"overlay-panel\" aria-labelledby=\"panel-title\"><button class=\"overlay-close\" type=\"button\" data-close aria-label=\"Close\"><svg viewBox=\"0 0 28 28\" aria-hidden=\"true\"><path d=\"m8 8 12 12M20 8 8 20\"/></svg></button><div class=\"overlay-eyebrow\">WORKSPACE</div><h2 id=\"panel-title\">Project details</h2><p>Keep the important things together.</p><form data-form><label class=\"overlay-field\">Project name<input name=\"project\" value=\"Studio project\" required maxlength=\"48\" autocomplete=\"off\"></label><fieldset class=\"status-choices\"><legend>Project status</legend><label><input type=\"radio\" name=\"status\" value=\"Planned\" ><span>Planned</span></label><label><input type=\"radio\" name=\"status\" value=\"Active\" checked><span>Active</span></label><label><input type=\"radio\" name=\"status\" value=\"Done\" ><span>Done</span></label></fieldset><div class=\"drawer-note\"><i class=\"menu-glyph \" data-icon=\"clock\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><circle cx=\"14\" cy=\"14\" r=\"9\"/><path d=\"M14 8v6l4 3\"/></svg></i><span>Changes stay in this preview.</span></div><div class=\"overlay-actions\"><button type=\"button\" data-close>Cancel</button><button class=\"overlay-primary\" type=\"submit\">Save changes</button></div></form></dialog></div>", css: style22, frameMount: frameApi0 },
"sheet-overlay": { markup: "<div class=\"overlay-demo\" data-overlay=\"sheet\" data-open=\"false\"><div class=\"overlay-launch\"><button class=\"overlay-trigger\" type=\"button\" data-trigger aria-haspopup=\"dialog\" aria-expanded=\"false\"><i class=\"menu-glyph \" data-icon=\"folder\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"M4.5 9a2 2 0 0 1 2-2h5l2.5 3h7.5a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-15a2 2 0 0 1-2-2Z\"/></svg></i><span>Choose collection</span></button><p class=\"overlay-feedback\" data-feedback role=\"status\">Try it here. Nothing leaves this preview.</p></div><dialog class=\"overlay-panel\" aria-labelledby=\"panel-title\"><div class=\"sheet-handle\" data-drag-handle aria-hidden=\"true\"><span></span></div><button class=\"overlay-close\" type=\"button\" data-close aria-label=\"Close\"><svg viewBox=\"0 0 28 28\" aria-hidden=\"true\"><path d=\"m8 8 12 12M20 8 8 20\"/></svg></button><h2 id=\"panel-title\">Keep it together</h2><p>Choose a home for this project.</p><form data-form><fieldset class=\"collection-choices\"><legend class=\"sr-only\">Collection</legend><label><i class=\"menu-glyph \" data-icon=\"folder\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"M4.5 9a2 2 0 0 1 2-2h5l2.5 3h7.5a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-15a2 2 0 0 1-2-2Z\"/></svg></i><span><strong>Personal</strong><small>Just for you</small></span><input type=\"radio\" name=\"collection\" value=\"Personal\" checked><span class=\"choice-ring\" aria-hidden=\"true\"></span></label><label><i class=\"menu-glyph \" data-icon=\"copy\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><rect x=\"5\" y=\"8\" width=\"13\" height=\"16\" rx=\"2.5\"/><path d=\"M10 8V6.5A2.5 2.5 0 0 1 12.5 4h8A2.5 2.5 0 0 1 23 6.5v11a2.5 2.5 0 0 1-2.5 2.5H18\"/></svg></i><span><strong>Team space</strong><small>Made for working together</small></span><input type=\"radio\" name=\"collection\" value=\"Team space\" ><span class=\"choice-ring\" aria-hidden=\"true\"></span></label><label><i class=\"menu-glyph \" data-icon=\"archive\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><rect x=\"4\" y=\"5\" width=\"20\" height=\"5\" rx=\"1.5\"/><path d=\"M6 10v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10M11 15h6\"/></svg></i><span><strong>Archive</strong><small>Keep it for later</small></span><input type=\"radio\" name=\"collection\" value=\"Archive\" ><span class=\"choice-ring\" aria-hidden=\"true\"></span></label></fieldset><button class=\"overlay-primary sheet-confirm\" type=\"submit\">Use collection</button></form></dialog></div>", css: style22, frameMount: frameApi0 },
"popover-overlay": { markup: "<div class=\"overlay-demo\" data-overlay=\"popover\" data-open=\"false\"><div class=\"overlay-launch\"><button class=\"overlay-trigger\" type=\"button\" data-trigger aria-haspopup=\"dialog\" aria-expanded=\"false\" aria-controls=\"overlay-popover\"><i class=\"menu-glyph \" data-icon=\"file\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"M7 4h10l6 6v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm10 0v6h6\"/></svg></i><span>Project info</span></button><p class=\"overlay-feedback\" data-feedback role=\"status\">Try it here. Nothing leaves this preview.</p></div><section class=\"overlay-panel\" role=\"dialog\" id=\"overlay-popover\" aria-labelledby=\"panel-title\" aria-hidden=\"true\" inert><button class=\"overlay-close\" type=\"button\" data-close aria-label=\"Close\"><svg viewBox=\"0 0 28 28\" aria-hidden=\"true\"><path d=\"m8 8 12 12M20 8 8 20\"/></svg></button><div class=\"overlay-eyebrow\">PROJECT BRIEF</div><h2 id=\"panel-title\">The details, nearby.</h2><p>A small space for context without leaving your work.</p><div class=\"popover-footer\"><span>Updated today</span><div class=\"sl-check-card popover-pin\" data-pin><label class=\"sl-check sl-check--icon sl-check--round sl-check--pin\"><input class=\"sl-check__input\" type=\"checkbox\" id=\"popover-pin\" name=\"pinned\" aria-label=\"Pin project info\" ><span class=\"sl-check__box\" aria-hidden=\"true\"><svg viewBox=\"0 0 24 24\" fill=\"none\"><g class=\"mark-icon\"><path d=\"M8 3h8v3l-1 1v5l3 3v2H6v-2l3-3V7L8 6V3ZM12 17v5\"/></g><path class=\"sl-check__dash\" d=\"M6 12h12\"/></svg></span><span class=\"sl-check__copy\"><span class=\"sl-check__title\" aria-hidden=\"true\"><span class=\"pin-off\">Pin</span><span class=\"pin-on\">Pinned</span></span></span></label></div></div></section></div>", css: style22, frameMount: frameApi0 },
"tooltip-overlay": { markup: "<div class=\"overlay-demo\" data-overlay=\"tooltip\" data-open=\"false\"><div class=\"overlay-launch\"><button class=\"overlay-trigger\" type=\"button\" data-trigger aria-describedby=\"overlay-tooltip\"><i class=\"menu-glyph \" data-icon=\"clock\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><circle cx=\"14\" cy=\"14\" r=\"9\"/><path d=\"M14 8v6l4 3\"/></svg></i><span>Version history</span></button><p class=\"overlay-feedback\" data-feedback role=\"status\">Hover, focus or tap for a hint.</p></div><div class=\"overlay-panel\" id=\"overlay-tooltip\" role=\"tooltip\" aria-hidden=\"true\"><strong>Room to explore.</strong><span>Every saved change stays in your version history.</span></div></div>", css: style22, frameMount: frameApi0 },
"confirm-overlay": { markup: "<div class=\"overlay-demo\" data-overlay=\"confirm\" data-open=\"false\" data-success=\"Studio project archived in this preview. Reset to restore.\"><div class=\"overlay-launch\"><button class=\"overlay-trigger\" type=\"button\" data-trigger aria-haspopup=\"dialog\" aria-expanded=\"false\" ><i class=\"menu-glyph \" data-icon=\"archive\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><rect x=\"4\" y=\"5\" width=\"20\" height=\"5\" rx=\"1.5\"/><path d=\"M6 10v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10M11 15h6\"/></svg></i><span>Archive project</span></button><p class=\"overlay-feedback\" data-feedback role=\"status\">Try it here. Nothing leaves this preview.</p></div><dialog class=\"overlay-panel\" role=\"alertdialog\" aria-labelledby=\"panel-title\" aria-describedby=\"panel-description\"><button class=\"overlay-close\" type=\"button\" data-close aria-label=\"Close\"><svg viewBox=\"0 0 28 28\" aria-hidden=\"true\"><path d=\"m8 8 12 12M20 8 8 20\"/></svg></button><div class=\"overlay-emblem\"><i class=\"menu-glyph \" data-icon=\"archive\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><rect x=\"4\" y=\"5\" width=\"20\" height=\"5\" rx=\"1.5\"/><path d=\"M6 10v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10M11 15h6\"/></svg></i></div><h2 id=\"panel-title\">Keep it for later?</h2><p id=\"panel-description\">Move Studio project out of your active workspace. You can restore it later.</p><div class=\"confirm-summary\"><i class=\"menu-glyph \" data-icon=\"folder\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"M4.5 9a2 2 0 0 1 2-2h5l2.5 3h7.5a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-15a2 2 0 0 1-2-2Z\"/></svg></i><span>Studio project<small>Nothing is deleted in this demo.</small></span></div><form data-form><div class=\"overlay-actions\"><button type=\"button\" data-close autofocus>Keep project</button><button class=\"overlay-primary\" type=\"submit\">Archive</button></div></form></dialog></div>", css: style23, frameMount: frameApi1 },
"palette-overlay": { markup: "<div class=\"overlay-demo\" data-overlay=\"palette\" data-open=\"false\" ><div class=\"overlay-launch\"><button class=\"overlay-trigger\" type=\"button\" data-trigger aria-haspopup=\"dialog\" aria-expanded=\"false\" ><i class=\"menu-glyph \" data-icon=\"search\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><circle cx=\"12\" cy=\"12\" r=\"7.5\"/><path d=\"m17.5 17.5 6 6\"/></svg></i><span>Find an action</span></button><p class=\"overlay-feedback\" data-feedback role=\"status\">Try it here. Nothing leaves this preview.</p></div><dialog class=\"overlay-panel\" aria-labelledby=\"panel-title\"><button class=\"overlay-close\" type=\"button\" data-close aria-label=\"Close\"><svg viewBox=\"0 0 28 28\" aria-hidden=\"true\"><path d=\"m8 8 12 12M20 8 8 20\"/></svg></button><h2 id=\"panel-title\" class=\"sr-only\">Find an action</h2><label class=\"command-search\"><i class=\"menu-glyph \" data-icon=\"search\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><circle cx=\"12\" cy=\"12\" r=\"7.5\"/><path d=\"m17.5 17.5 6 6\"/></svg></i><input type=\"search\" data-search placeholder=\"Find an action…\" aria-label=\"Find an action\" autocomplete=\"off\"></label><div class=\"command-results\"><button type=\"button\" data-command=\"Projects\"><i class=\"menu-glyph \" data-icon=\"folder\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"M4.5 9a2 2 0 0 1 2-2h5l2.5 3h7.5a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-15a2 2 0 0 1-2-2Z\"/></svg></i><span>Projects<small>Open your workspace</small></span><i class=\"menu-glyph command-arrow\" data-icon=\"chevron\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"m8 11 6 6 6-6\"/></svg></i></button><button type=\"button\" data-command=\"Recent files\"><i class=\"menu-glyph \" data-icon=\"clock\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><circle cx=\"14\" cy=\"14\" r=\"9\"/><path d=\"M14 8v6l4 3\"/></svg></i><span>Recent files<small>Pick up where you left off</small></span><i class=\"menu-glyph command-arrow\" data-icon=\"chevron\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"m8 11 6 6 6-6\"/></svg></i></button><button type=\"button\" data-command=\"Saved items\"><i class=\"menu-glyph \" data-icon=\"pin\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"m17 4 7 7c-4 0-6 2-7 7l-3-3-5 1-4-4c5-1 7-3 7-7l5-1ZM10 18l-6 6\"/></svg></i><span>Saved items<small>Return to your favorites</small></span><i class=\"menu-glyph command-arrow\" data-icon=\"chevron\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"m8 11 6 6 6-6\"/></svg></i></button><button type=\"button\" data-command=\"Project settings\"><i class=\"menu-glyph \" data-icon=\"edit\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"m5 23 1.5-5.5L19 5a2.8 2.8 0 0 1 4 4L10.5 21.5 5 23ZM16.5 7.5l4 4M6.5 17.5l4 4\"/></svg></i><span>Project settings<small>Adjust this workspace</small></span><i class=\"menu-glyph command-arrow\" data-icon=\"chevron\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"m8 11 6 6 6-6\"/></svg></i></button><p data-empty hidden>No matching actions.</p></div><div class=\"command-footnote\">Local preview · no page navigation</div></dialog></div>", css: style23, frameMount: frameApi1 },
"document-overlay": { markup: "<div class=\"overlay-demo\" data-overlay=\"document\" data-open=\"false\" ><div class=\"overlay-launch\"><button class=\"overlay-trigger\" type=\"button\" data-trigger aria-haspopup=\"dialog\" aria-expanded=\"false\" ><i class=\"menu-glyph \" data-icon=\"file\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"M7 4h10l6 6v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm10 0v6h6\"/></svg></i><span>Preview document</span></button><p class=\"overlay-feedback\" data-feedback role=\"status\">Try it here. Nothing leaves this preview.</p></div><dialog class=\"overlay-panel\" aria-labelledby=\"panel-title\"><button class=\"overlay-close\" type=\"button\" data-close aria-label=\"Close\"><svg viewBox=\"0 0 28 28\" aria-hidden=\"true\"><path d=\"m8 8 12 12M20 8 8 20\"/></svg></button><div class=\"document-toolbar\"><i class=\"menu-glyph \" data-icon=\"file\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"M7 4h10l6 6v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm10 0v6h6\"/></svg></i><h2 id=\"panel-title\">Project brief</h2></div><article class=\"preview-paper\" tabindex=\"0\" data-paper><span>STUDIO / PROJECT BRIEF</span><h3>A clear starting point.</h3><p>Build a quiet, useful interface. Give every detail a reason to be there.</p><h4>The direction</h4><p>Thoughtful spacing, familiar controls and movement that explains what changed.</p></article><div class=\"document-pages\"><button type=\"button\" data-page-back aria-label=\"Previous page\" disabled><i class=\"menu-glyph arrow-left\" data-icon=\"chevron\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"m8 11 6 6 6-6\"/></svg></i></button><span data-page-count role=\"status\">1 / 2</span><button type=\"button\" data-page-next aria-label=\"Next page\"><i class=\"menu-glyph arrow-right\" data-icon=\"chevron\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"m8 11 6 6 6-6\"/></svg></i></button></div></dialog></div>", css: style23, frameMount: frameApi1 },
"quickedit-overlay": { markup: "<div class=\"overlay-demo\" data-overlay=\"quickedit\" data-open=\"false\" data-success=\"Renamed to {project} in this preview.\"><div class=\"overlay-launch\"><button class=\"overlay-trigger\" type=\"button\" data-trigger aria-haspopup=\"dialog\" aria-expanded=\"false\" aria-controls=\"quick-editor\"><i class=\"menu-glyph \" data-icon=\"edit\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"m5 23 1.5-5.5L19 5a2.8 2.8 0 0 1 4 4L10.5 21.5 5 23ZM16.5 7.5l4 4M6.5 17.5l4 4\"/></svg></i><span>Rename project</span></button><p class=\"overlay-feedback\" data-feedback role=\"status\">Try it here. Nothing leaves this preview.</p></div><section class=\"overlay-panel\" role=\"dialog\" id=\"quick-editor\" aria-labelledby=\"panel-title\" aria-hidden=\"true\" inert><button class=\"overlay-close\" type=\"button\" data-close aria-label=\"Close\"><svg viewBox=\"0 0 28 28\" aria-hidden=\"true\"><path d=\"m8 8 12 12M20 8 8 20\"/></svg></button><div class=\"overlay-eyebrow\">QUICK EDIT</div><h2 id=\"panel-title\">A better name.</h2><form data-form><label class=\"overlay-field\">Project name<input name=\"project\" value=\"Studio project\" required maxlength=\"48\" autocomplete=\"off\"></label><div class=\"overlay-actions\"><button type=\"button\" data-close>Cancel</button><button class=\"overlay-primary\" type=\"submit\">Save name</button></div></form></section></div>", css: style23, frameMount: frameApi1 },
"tour-overlay": { markup: "<div class=\"overlay-demo\" data-overlay=\"tour\" data-open=\"false\" ><div class=\"overlay-launch\"><button class=\"overlay-trigger\" type=\"button\" data-trigger aria-haspopup=\"dialog\" aria-expanded=\"false\" ><i class=\"menu-glyph \" data-icon=\"flag\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"M6 24V5m0 3c5-5 11 4 16-1v11c-5 5-11-4-16 1\"/></svg></i><span>Take a quick tour</span></button><p class=\"overlay-feedback\" data-feedback role=\"status\">Try it here. Nothing leaves this preview.</p></div><dialog class=\"overlay-panel\" aria-labelledby=\"panel-title\"><button class=\"overlay-close\" type=\"button\" data-close aria-label=\"Close\"><svg viewBox=\"0 0 28 28\" aria-hidden=\"true\"><path d=\"m8 8 12 12M20 8 8 20\"/></svg></button><div class=\"tour-preview\" aria-hidden=\"true\"><div class=\"tour-mini-nav\" data-tour-target=\"0\"><i class=\"menu-glyph \" data-icon=\"folder\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"M4.5 9a2 2 0 0 1 2-2h5l2.5 3h7.5a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-15a2 2 0 0 1-2-2Z\"/></svg></i><span>Your workspace</span></div><div class=\"tour-mini-files\" data-tour-target=\"1\"><i class=\"menu-glyph \" data-icon=\"file\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"M7 4h10l6 6v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm10 0v6h6\"/></svg></i><span>Project brief</span></div><div class=\"tour-mini-save\" data-tour-target=\"2\"><i class=\"menu-glyph \" data-icon=\"pin\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"m17 4 7 7c-4 0-6 2-7 7l-3-3-5 1-4-4c5-1 7-3 7-7l5-1ZM10 18l-6 6\"/></svg></i><span>Saved for later</span></div></div><div class=\"tour-copy\"><span class=\"overlay-eyebrow\" data-tour-count>STEP 1 OF 3</span><h2 id=\"panel-title\" data-tour-title>A place for your work.</h2><p data-tour-description>Switch between projects and keep your ideas together.</p></div><div class=\"overlay-actions\"><button type=\"button\" data-tour-back disabled>Back</button><button type=\"button\" class=\"overlay-primary\" data-tour-next>Next</button></div></dialog></div>", css: style23, frameMount: frameApi1 }
};
