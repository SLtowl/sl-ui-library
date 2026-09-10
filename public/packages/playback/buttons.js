/* Standalone controller. No runtime dependencies. */
(() => {
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

window.MattePlayback = { mount: mountPlaybackButton };
})();
