// This example changes local field state only. It makes no external request.
// In application code: const field = SLComponent.mount(root, { onChange(state) {} });
// Read field.state, call field.reset(), and call field.destroy() before removing the root.
// options.value is a nonblank string of at most 80 characters. state = { value, draft, editing }. Apply commits the exact text locally and emits sl:change; Cancel/Escape discard the draft. Enter respects IME composition. No server persistence is implied.
SLComponent.mountPreview(document.querySelector('.sl-component'));
