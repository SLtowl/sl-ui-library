// This demonstration changes local state only and makes no requests.
const root = document.querySelector('.sl-component');
const controller = SLComponent.mountPreview(root);
// Application usage: SLComponent.mount(root, { onChange(state) { /* Read local state. */ } });
// Call controller.destroy() before remounting with different options.
// controller.open(), controller.close(), controller.reset(), controller.state and controller.destroy() are available.
// Listen for the bubbling, composed sl-menu-change event to read event.detail.
// value is a branch or tag ID. tab and query control browsing, while compare displays fixed sample ahead/behind counts. No checkout or repository operation is performed.
