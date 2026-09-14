// Explicit local demonstration. No network or device operation is performed.
SLComponent.mountPreview(document.querySelector('.sl-component'));

// Application integration:
// This component selects a local decision only. Listen for sl:action and read event.detail.decision (approve, reject or null) to connect the next workflow step. setDecision(value) silently restores application state.
// choose(value), undo(), setDecision(value) return booleans; reset(), destroy(). state is { phase, decision }. Approve and Reject are native buttons with aria-pressed. Undo restores one previous decision.
// Replace mountPreview above with SLComponent.mount(root, options).
// Call controller.destroy() before removing or replacing the component.
// reset() restores the control only; it cannot undo completed external work.
