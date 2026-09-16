// Explicit local demonstration. No server or application data is changed.
const controller = SLComponent.mountPreview(document.querySelector('.sl-component'));

// Application usage: call controller.toggle() or controller.setSyncState(value).
// Listen for sl:action or pass onChange({ syncState }).
// Replace mountPreview with SLComponent.mount(root, options) in an application.
// Call controller.destroy() before removing or replacing the root.
