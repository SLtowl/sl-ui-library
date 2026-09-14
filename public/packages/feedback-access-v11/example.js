// Explicit local demonstration. Replace this call for application integration.
const controller = SLComponent.mountPreview(document.querySelector('.sl-component'));

// Application API: Provide onAction("request"|"check", { reason, signal }) returning { status: "pending"|"denied"|"granted" }. request() validates a nonempty reason and switches to checking once pending. Rejection preserves access state; cancel() aborts work. state is { status, access, reason }. reset() returns to access required. No browser or operating-system permission is requested automatically.
// Use SLComponent.mount(root, options). mount() never simulates remote success.
// controller.reset() restores the initial view; controller.destroy() releases its listeners and work.
