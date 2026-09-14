// This example changes local field state only. It makes no external request.
// In application code: const field = SLComponent.mount(root, { onChange(state) {} });
// Read field.state, call field.reset(), and call field.destroy() before removing the root.
// options.value is HH:MM from 00:00 to 23:55 in five-minute steps. state = { value, valid, minutes: number|null }. Presets update the local field; this component does not schedule notifications or convert time zones.
SLComponent.mountPreview(document.querySelector('.sl-component'));
