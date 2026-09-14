// This example changes local field state only. It makes no external request.
// In application code: const field = SLComponent.mount(root, { onChange(state) {} });
// Read field.state, call field.reset(), and call field.destroy() before removing the root.
// options.items = [{ id, label, disabled? }]; options.value is an available ID or null. state = { value: ID|null, label, query, open }. Arrow keys skip disabled items, Enter commits, Escape and blur restore the selected label. Free text never becomes a selected ID.
SLComponent.mountPreview(document.querySelector('.sl-component'));
