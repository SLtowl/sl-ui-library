/* Standalone controller. No runtime dependencies. */
(() => {
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

window.MatteFollow = { mount: mountFollowButton };
})();
