// Explicit local demonstration. No network, file or application operation is performed.
const controller = SLComponent.mountPreview(document.querySelector('.sl-component'));

// Application usage: pass onUndo({ signal }) and resolve only after the real undo action succeeds. Escape cancels pending work.
// Replace mountPreview with SLComponent.mount(root, options) in an application.
// Call controller.destroy() before removing or replacing the root.
