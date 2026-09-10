const button = document.querySelector('.sl-bookmark');

const bookmark = MatteBookmark.mount(button, {
  feedback: document.querySelector('.bookmark-feedback')
});

button.addEventListener('bookmarkchange', event => {
  // event.detail.pressed is the new local state.
  // Connect your storage here; setPressed(value) can restore saved state.
});
