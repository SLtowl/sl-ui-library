// Pass onUpload(file, { signal, progress }); call progress(0…1) while sending and resolve when the server has it. Set accept to limit file types.
SLUpload.mount(document.querySelector('.pb-upload'), {
  accept: 'image/*,.pdf',
  // Send the file; report progress as it goes. Throw to show Upload failed.
  onUpload: (file, { signal, progress }) => new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.upload.onprogress = event => event.lengthComputable && progress(event.loaded / event.total);
    xhr.onload = () => (xhr.status < 300 ? resolve() : reject(new Error('Upload failed')));
    xhr.onerror = () => reject(new Error('Upload failed'));
    signal.addEventListener('abort', () => xhr.abort());
    xhr.open('POST', '/api/upload'); xhr.send(file);
  }),
});
