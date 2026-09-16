// Explicit local demonstration. No document, image or application data is changed.
const controller = SLComponent.mountPreview(document.querySelector('.sl-component'));

// Application usage: call controller.cycle() or controller.setRotation(value).
// Listen for sl:action or pass onChange({ rotation }).
// Replace mountPreview with SLComponent.mount(root, options) in an application.
// Call controller.destroy() before removing or replacing the root.
