// Explicit local demonstration. Replace this call for application integration.
const controller = SLComponent.mountPreview(document.querySelector('.sl-component'));

// Application API: Pure local capacity model: stage() adds the selected 4, 8 or 18 MB file only when it fits within 100 MB; release() frees the fixed 20 MB cache once; remove() clears all staged files. Each returns boolean. state is { status, used, staged, available }. No storage API or upload is implied. reset() restores the 86 MB baseline.
// Use SLComponent.mount(root, options). mount() never simulates remote success.
// controller.reset() restores the initial view; controller.destroy() releases its listeners and work.
