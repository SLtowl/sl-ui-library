// Explicit local demonstration. No network, file or application operation is performed.
const controller = SLComponent.mountPreview(document.querySelector('.sl-component'));

// Application usage: toggle() or setEnabled(value). Listen for sl:action or pass onChange({ enabled }).
// Replace mountPreview with SLComponent.mount(root, options) in an application.
// Call controller.destroy() before removing or replacing the root.
