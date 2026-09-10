const button = document.querySelector('.sl-download');

// This transferable example starts a real browser download.
// The library uses a separate animation-only demo with no downloaded file.
const download = MatteDownload.mount(button, {
  feedback: document.querySelector('.download-feedback'),
  getFile: ({ signal }) => {
    if (signal.aborted) throw new DOMException('Cancelled', 'AbortError');
    // Replace this sample with your Blob or async file request.
    return {
      blob: new Blob(['SL UI Library sample'], { type: 'text/plain;charset=utf-8' }),
      filename: 'sl-ui-sample.txt'
    };
  }
});
