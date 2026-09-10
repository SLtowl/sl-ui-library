const button = document.querySelector('.sl-like');

const like = MatteLike.mount(button, {
  feedback: document.querySelector('.like-feedback')
});

button.addEventListener('likechange', event => {
  // event.detail.pressed is the new local state.
  // Connect your own persistence here if your project needs it.
});
