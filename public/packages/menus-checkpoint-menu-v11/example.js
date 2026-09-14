// This demonstration changes local state only and makes no requests.
const root = document.querySelector('.sl-component');
const controller = SLComponent.mountPreview(root);
// Application usage: SLComponent.mount(root, { onChange(state) { /* Read local state. */ } });
// Call controller.destroy() before remounting with different options.
// controller.open(), controller.close(), controller.reset(), controller.state and controller.destroy() are available.
// Listen for the bubbling, composed sl-menu-change event to read event.detail.
// current and draft identify v1, v2 or v3; previous supports one undo. Choosing a checkpoint only previews it. Use version changes the sample text and Undo restore reverses that change.
