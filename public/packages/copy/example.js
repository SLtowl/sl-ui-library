const button = document.querySelector('.sl-copy');

MatteCopy.mount(button, {
  getText: () => 'SL UI Library', // Return your own text here.
  feedback: document.querySelector('.copy-feedback'),
  holdMs: 1700
});
