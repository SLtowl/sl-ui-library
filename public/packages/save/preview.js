// Preview setup, not part of the button controller.
// For your project, supply your own callbacks in example.js and remove
// previewDuration. Saved appears only after your onSave promise resolves.
const previewRoot = document.querySelector('.button-kit');
const previewParams = new URLSearchParams(location.search);
previewRoot.style.setProperty('--unit', Number(previewParams.get('scale')) === 2 ? '2px' : '1px');
if (previewParams.get('embed') === '1') document.body.classList.add('embedded');

// Simulated request for the standalone example. Nothing is sent anywhere.
function saveChanges({ signal }) {
  return new Promise((resolve, reject) => {
    if (signal.aborted) { reject(new DOMException('Cancelled', 'AbortError')); return; }
    const abort = () => {
      clearTimeout(timer);
      reject(new DOMException('Cancelled', 'AbortError'));
    };
    const timer = setTimeout(() => {
      signal.removeEventListener('abort', abort);
      resolve();
    }, 1900);
    signal.addEventListener('abort', abort, { once: true });
  });
}

function closeEditor() {
  // Connect your close, discard or navigation action here.
}
