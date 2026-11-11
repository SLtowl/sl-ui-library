// Put the address in data-link or pass link. The button writes it to the clipboard on click and shows Copy failed if the browser refuses.
SLCopyLink.mount(document.querySelector('.pb-copy'), {
  // The address to copy. data-link on the element works too.
  link: 'https://example.com/invite/8fK2',
});
