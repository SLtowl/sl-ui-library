/* Standalone controller. No runtime dependencies. */
(() => {
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

window.MatteBookmark = { mount: mountBookmarkButton };
})();
