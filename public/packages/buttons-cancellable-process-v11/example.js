// Explicit local demonstration. No network or device operation is performed.
SLComponent.mountPreview(document.querySelector('.sl-component'));

// Application integration:
// Pass onProcess({ signal, onProgress }). Report finite fractions from 0 to 1. Progress is clamped, monotonic within one request and ignores stale reports after cancellation. The preview simulates progress.
// start() returns Promise<boolean>; cancel(), reset(), destroy(). state is { phase, progress } where progress is 0–100. sl:action reports completion, failure or cancellation.
// Replace mountPreview above with SLComponent.mount(root, options).
// Call controller.destroy() before removing or replacing the component.
// reset() restores the control only; it cannot undo completed external work.
