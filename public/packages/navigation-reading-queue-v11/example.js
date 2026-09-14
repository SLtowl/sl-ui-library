// All navigation in this example changes local content only.
// For an application, call SLComponent.mount(root, { onNavigate(detail) { ... } }).
// Use the event detail to connect your router explicitly; no URL or server is changed here.
// Listen for "sl-navigate" on root instead of onNavigate if event delegation is preferred.
// complete() marks the current unread document read and advances. markUnread() marks the selected read document unread.
// undo() restores up to twenty reading changes in reverse order; ordinary navigation keeps that history.
(() => {
  const root = document.querySelector('.sl-component');
  const controller = SLComponent.mountPreview(root);
  window.addEventListener('pagehide', event => {
    if (!event.persisted) controller.destroy();
  }, { once: true });
})();
