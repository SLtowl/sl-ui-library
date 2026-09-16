// Explicit local demonstration. No document, image or application data is changed.
const controller = SLComponent.mountPreview(document.querySelector('.sl-component'));

// Application usage: call controller.toggle() or controller.setMirrored(value).
// Listen for sl:action or pass onChange({ mirrored }).
// Replace mountPreview with SLComponent.mount(root, options) in an application.
// Call controller.destroy() before removing or replacing the root.
