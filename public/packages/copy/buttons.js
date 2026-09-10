/* Standalone version of the approved controller. No runtime dependencies. */
(() => {
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

window.MatteCopy = { mount: mountCopyButton };
})();
