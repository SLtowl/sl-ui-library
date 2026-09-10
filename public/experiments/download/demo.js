import { mountDownloadButton } from './download-button.js';

// Library-only simulation. It creates no files or URLs and never opens a download.
export function mountDownloadDemo(button, { feedback } = {}) {
  button.setAttribute('aria-label', 'Preview Download animation');
  return mountDownloadButton(button, {
    feedback,
    idleMessage: 'Demo only. No file is downloaded.',
    messages: {
      pending: 'Demo only. Previewing Download…',
      complete: 'Preview complete. No file was downloaded.',
      error: 'Preview interrupted. Try again.',
    },
    getFile: ({ signal }) => new Promise((resolve, reject) => {
      if (signal.aborted) { reject(new DOMException('Canceled', 'AbortError')); return; }
      const abort = () => { clearTimeout(timer); reject(new DOMException('Canceled', 'AbortError')); };
      const timer = setTimeout(() => {
        signal.removeEventListener('abort', abort);
        resolve({ filename: 'preview' });
      }, 850);
      signal.addEventListener('abort', abort, { once: true });
    }),
    handoff: () => {},
  });
}
