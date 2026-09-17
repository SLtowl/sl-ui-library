// This example changes local input state only and makes no external request.
// In application code: const field = SLComponent.mount(root, { onChange(state) {} });
// Read field.state, call field.reset(), and call field.destroy() before removing the root.
SLComponent.mountPreview(document.querySelector('.sl-component'));
