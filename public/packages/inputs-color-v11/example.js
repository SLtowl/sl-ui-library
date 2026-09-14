// This example changes local field state only. It makes no external request.
// In application code: const field = SLComponent.mount(root, { onChange(state) {} });
// Read field.state, call field.reset(), and call field.destroy() before removing the root.
// options.value is a six-digit #RRGGBB color. state = { value: lowercase hex|null, draft, valid }. Hex typing preserves case and caret. The project palette provides a pointer-controlled saturation/brightness plane and keyboard-accessible hue, saturation and brightness sliders. Apply commits the draft; Escape cancels. Presets apply immediately. The value is opaque sRGB; no alpha or color-space conversion is claimed.
SLComponent.mountPreview(document.querySelector('.sl-component'));
