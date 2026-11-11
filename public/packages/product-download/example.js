// Pass onDownload({ signal, progress }); call progress(0…1) as bytes arrive and resolve when the file is saved. Clicking during the download aborts the signal. onOpen() runs from Open file.
SLDownload.mount(document.querySelector('.pb-download'), {
  // Report progress as it arrives; the bar eases toward it. The signal aborts when the person cancels.
  onDownload: async ({ signal, progress }) => {
    const response = await fetch('/files/report.pdf', { signal });
    const total = Number(response.headers.get('content-length')) || 0, reader = response.body.getReader(), parts = [];
    for (let got = 0; ;) { const { done, value } = await reader.read(); if (done) break; parts.push(value); got += value.length; if (total) progress(got / total); }
    window.lastFile = URL.createObjectURL(new Blob(parts));
  },
  onOpen: () => window.open(window.lastFile),
});
