/* Standalone controller. No runtime dependencies. */
(() => {
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

window.MatteDelete = { mount: mountDeleteButton };
})();
