// Explicit local demonstration. No network, file or application operation is performed.
const controller = SLComponent.mountPreview(document.querySelector('.sl-component'));

// Application usage: pass literal items, then use open(), close(), setQuery(value) or the native field.
// Listen for sl:action / sl:search-select, or pass onChange(state) and onSelect({ value }).
// Replace mountPreview with SLComponent.mount(root, options) in an application.
// Call controller.destroy() before removing or replacing the root.
