const button = document.querySelector('.sl-playback');

const playback = MattePlayback.mount(button, {
  feedback: document.querySelector('.playback-feedback'),
  onChange: ({ playing }) => {
    // Connect your player here. This sample changes local state only.
    // If media.play() rejects, call playback.setPlaying(false).
  }
});
