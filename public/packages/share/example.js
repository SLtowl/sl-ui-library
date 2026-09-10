const share = MatteShare.mount(document.querySelector('.sl-share-control'), {
  getUrl: () => 'https://example.com/article',
  feedback: document.querySelector('.share-feedback'),
  labels: {
    idle: 'Share', copy: 'Copy link', copied: 'Link copied',
    sharing: 'Sharing', shared: 'Shared', error: 'Try again', send: 'Share…'
  }
});

// This working example uses the browser's native Web Share API when available.
// Copy link remains a separate clipboard action.
// To connect your own sharing service, supply onShare({ url, signal }).
// Resolve after the action succeeds. Return { label: 'Sent' } to confirm
// a completed send, or { status: 'canceled' } when the user cancels.
// The library's simulated sharing handler is not included in this example.
// Call share.destroy() before removing the component.
