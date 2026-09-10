import { mountUploadButton } from './upload-button.js';

// Preview adapter only. Do not use this simulated upload in a real integration.
export function mountUploadDemo(button, { input, feedback } = {}) {
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
