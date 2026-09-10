/* Standalone controller. No runtime dependencies. */
(() => {
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

window.MatteDownload = { mount: mountDownloadButton };
})();
