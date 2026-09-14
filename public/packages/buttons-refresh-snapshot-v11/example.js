// Explicit local demonstration. No network or device operation is performed.
SLComponent.mountPreview(document.querySelector('.sl-component'));

// Application integration:
// Pass onRefresh({ count, version, signal }) returning { count, label? }. count must be a non-negative safe integer; label is literal status text. initialCount defaults to 24. A failed or canceled refresh retains the previous snapshot.
// start() returns Promise<boolean>; cancel(), reset(), destroy(). state is { phase, count, version, updatedAt }; updatedAt is a local success timestamp in milliseconds or null. sl:action reports outcomes.
// Replace mountPreview above with SLComponent.mount(root, options).
// Call controller.destroy() before removing or replacing the component.
// reset() restores the control only; it cannot undo completed external work.
