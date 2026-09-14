// This example changes local field state only. It makes no external request.
// In application code: const field = SLComponent.mount(root, { onChange(state) {} });
// Read field.state, call field.reset(), and call field.destroy() before removing the root.
// options.value is integer total minutes (0–1439). state = { value: number|null, valid, hours: string, minutes: string }. Quarter-hour actions clamp to the boundaries and carry between units; invalid drafts stay editable and disable adjustments.
SLComponent.mountPreview(document.querySelector('.sl-component'));
