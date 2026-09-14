// This example changes local field state only. It makes no external request.
// In application code: const field = SLComponent.mount(root, { onChange(state) {} });
// Read field.state, call field.reset(), and call field.destroy() before removing the root.
// options.value = [{ key, value }] with up to three pairs; keys are unique, nonblank and at most 32 characters; values are at most 80 characters. state = { value: pair[], valid }. An array preserves arbitrary Unicode keys (including __proto__) as literal data. Draft input is not rebuilt while typing.
SLComponent.mountPreview(document.querySelector('.sl-component'));
