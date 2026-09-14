// Explicit local demonstration. No network or device operation is performed.
SLComponent.mountPreview(document.querySelector('.sl-component'));

// Application integration:
// Pass onRun({ id, label, signal }) for each job. Jobs run serially; successful jobs leave the queue. Cancellation or failure retains the current and waiting jobs for retry. Additions during processing are appended. Preview jobs are simulated.
// add(label?) and remove(zeroBasedIndex) return booleans. Labels are literal text. start() returns Promise<boolean>; cancel(), reset(), destroy(). state contains phase, a copied items array, completed and activeId. The queue holds at most three jobs.
// Replace mountPreview above with SLComponent.mount(root, options).
// Call controller.destroy() before removing or replacing the component.
// reset() restores the control only; it cannot undo completed external work.
