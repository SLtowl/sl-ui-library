// This example changes local field state only. It makes no external request.
// In application code: const field = SLComponent.mount(root, { onChange(state) {} });
// Read field.state, call field.reset(), and call field.destroy() before removing the root.
// options.value is millimetres (0–10000); options.unit is cm or in. state = { value: millimetres|null, unit, draft, valid }. Unit toggles retain the canonical millimetres; display rounds to eight decimals. Editing updates the canonical value. Invalid drafts disable the unit switch.
SLComponent.mountPreview(document.querySelector('.sl-component'));
