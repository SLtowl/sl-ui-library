const button = document.querySelector('.sl-upload');
const input = document.querySelector('input[type="file"]');

// Replace undefined with your async function:
// onUpload(file, { signal, onProgress })
// Resolve only after your upload succeeds, reject on failure, and report
// progress as a fraction from 0 to 1. Pass signal to your request.
// No endpoint is assumed. Without a handler, this example selects a local
// file without reading or uploading its contents.
const onUpload = undefined;

const upload = MatteUpload.mount(button, {
  input,
  feedback: document.querySelector('.upload-feedback'),
  onUpload
});

// upload.select(file) accepts an existing File from your application.
// upload.reset() aborts pending work; destroy() also removes listeners.
