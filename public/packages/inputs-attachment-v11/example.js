// This example changes local field state only. It makes no external request.
// In application code: const field = SLComponent.mount(root, { onChange(state) {} });
// Read field.state, call field.reset(), and call field.destroy() before removing the root.
// state = { file: File|null, value: { name, size, type, lastModified }|null, valid }. Validates the .pdf/.txt/.md extension and a 5 MiB byte limit only; this is not content validation. No file bytes are read. Pass state.file to your own operation only when state.valid is true. Normal mount uses the native file chooser. mountPreview uses built-in in-memory sample files and never opens the system chooser. options.demo=true selects that explicit demo mode; demo File objects are samples, not user documents.
SLComponent.mountPreview(document.querySelector('.sl-component'));
