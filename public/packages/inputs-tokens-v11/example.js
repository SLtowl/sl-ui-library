// This example changes local field state only. It makes no external request.
// In application code: const field = SLComponent.mount(root, { onChange(state) {} });
// Read field.state, call field.reset(), and call field.destroy() before removing the root.
// options.value is an array of up to six unique strings (1–40 characters each). state = { value: string[], draft: string }. Enter commits one whole tag; remove buttons delete a tag and return focus to the input.
SLComponent.mountPreview(document.querySelector('.sl-component'));
