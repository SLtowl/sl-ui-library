// Explicit local demonstration. No document or application data is changed.
const controller = SLComponent.mountPreview(document.querySelector('.sl-component'));

// Application usage: call controller.toggle() or controller.setGroupState(value).
// Listen for sl:action or pass onChange({ groupState }).
// Replace mountPreview with SLComponent.mount(root, options) in an application.
// Call controller.destroy() before removing or replacing the root.
