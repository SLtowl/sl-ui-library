// Explicit local demonstration. Replace this call for application integration.
const controller = SLComponent.mountPreview(document.querySelector('.sl-component'));

// Application API: Options: initialText and onAction("save", { text, signal }). Resolve only after persistence succeeds; reject on failure. save() returns Promise<boolean>; discard() restores the last confirmed checkpoint, cancel() aborts the callback, and state exposes { status, dirty, text, saved }. reset() returns to initialText; destroy() aborts and detaches.
// Use SLComponent.mount(root, options). mount() never simulates remote success.
// controller.reset() restores the initial view; controller.destroy() releases its listeners and work.
