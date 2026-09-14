// This example changes local state only and makes no remote requests.
// Application use: SLComponent.mount(root, { onChange(detail) { /* consume detail.value */ } }).
// onChange is a local notification, never a server success callback.
// Keep the controller in application scope; call destroy() before removing the root.
(() => {
  const root = document.querySelector('.sl-component');
  const controller = SLComponent.mountPreview(root);
  window.addEventListener('pagehide', event => { if (!event.persisted) controller.destroy(); });
})();
