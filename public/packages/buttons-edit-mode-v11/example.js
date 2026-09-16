// Explicit local demonstration. No network, file, print or message operation is performed.
const controller = SLComponent.mountPreview(document.querySelector('.sl-component'));

// Application usage: setEditing(value), toggle(), reset() and destroy(). Listen for sl:action or pass onChange({ editing }).
// Replace mountPreview with SLComponent.mount(root, options) in an application.
// Call controller.destroy() before removing or replacing the root.
