// Explicit local demonstration. Replace this call for application integration.
const controller = SLComponent.mountPreview(document.querySelector('.sl-component'));

// Application API: Provide onAction("check", { id, signal }) for details, access and storage; return { ok: boolean }. check() runs checks sequentially and returns Promise<boolean> for all passed. A blocked check remains visible while the remaining checks run; rejection or cancellation stops the sequence. state is { status, checks }. cancel() keeps finished results; reset() clears all checks. No sharing operation occurs.
// Use SLComponent.mount(root, options). mount() never simulates remote success.
// controller.reset() restores the initial view; controller.destroy() releases its listeners and work.
