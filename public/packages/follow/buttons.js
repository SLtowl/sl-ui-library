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
  const suffix = label?.querySelector('.sl-follow__suffix');
  if (!label || !mark || !suffix) throw new TypeError('The Follow button needs its persistent label, suffix and mark elements.');
  const view = button.ownerDocument.defaultView;
  const motion = view.matchMedia('(prefers-reduced-motion: reduce)');
  let following = button.getAttribute('aria-pressed') === 'true';
  let destroyed = false;

  // CSS owns only the suffix width/opacity. The persistent word never fades.
  function settleLabel() {
    button.setAttribute('aria-pressed', String(following));
  }

  function changeLabel() { settleLabel(); }

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
  settleLabel();
  button.disabled = false;
  button.addEventListener('click', toggle);
  motion.addEventListener('change', onMotionChange);

  const controller = {
    setFollowing: value => setFollowing(value),
    reset() {
      if (destroyed) return;
      following = false;
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
