/* Standalone version of the approved controller. No runtime dependencies. */
(() => {
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

window.MatteLike = { mount: mountLikeButton };
})();
