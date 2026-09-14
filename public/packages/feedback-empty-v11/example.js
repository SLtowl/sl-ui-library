// Explicit local demonstration. Replace this call for application integration.
const controller = SLComponent.mountPreview(document.querySelector('.sl-component'));

// Application API: This component searches three bundled sample files entirely locally. clear() removes the text constraint and widen() includes active files, with focus returned to the search field. Native search and checkbox controls support keyboard input. state exposes { status, query, archivedOnly, matches }. Adapt the local files array to your data or wire real search explicitly. reset() restores the zero-results example.
// Use SLComponent.mount(root, options). mount() never simulates remote success.
// controller.reset() restores the initial view; controller.destroy() releases its listeners and work.
