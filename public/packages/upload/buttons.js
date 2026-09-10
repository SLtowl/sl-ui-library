/* Standalone controller. No runtime dependencies. */
(() => {
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

window.MatteUpload = { mount: mountUploadButton };
})();
