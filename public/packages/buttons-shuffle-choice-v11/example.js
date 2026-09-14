// Explicit local demonstration. No network or device operation is performed.
SLComponent.mountPreview(document.querySelector('.sl-component'));

// Application integration:
// Pass 2–20 distinct non-empty choices. All values render as literal text, including Unicode. Optional random() must return a finite number in [0, 1). The algorithm always picks a different index, then offers one-level undo.
// shuffle() and undo() return booleans; reset(), destroy(). state is { phase, index, choice, canUndo }. sl:action reports index and choice. No requests or content generation occur.
// Replace mountPreview above with SLComponent.mount(root, options).
// Call controller.destroy() before removing or replacing the component.
// reset() restores the control only; it cannot undo completed external work.
