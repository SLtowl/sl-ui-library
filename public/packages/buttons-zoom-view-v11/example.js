// Explicit local demonstration. No browser zoom or application layout is changed.
const controller = SLComponent.mountPreview(document.querySelector('.sl-component'));

// Application usage: call step() or setZoom(100 | 125 | 150), or pass onChange({ zoom }).
// Apply the reported zoom to your own view; the bundled preview scales only its Aa sample.
// Replace mountPreview with SLComponent.mount(root, options) in an application.
// Call controller.destroy() before removing or replacing the root.
