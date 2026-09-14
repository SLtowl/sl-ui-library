// Explicit local demonstration. No network or device operation is performed.
SLComponent.mountPreview(document.querySelector('.sl-component'));

// Application integration:
// Pass integer min, max and value. Defaults are 1, 12 and 3; range limits are 0–999. Listen for sl:action and read event.detail.value. Holding begins repetition after 400 ms and stops on release, leaving the button, blur or a boundary.
// setValue(integer, notify = false) clamps to the range and returns whether the value changed. reset(), destroy(). state is { phase, value, min, max }. Native keyboard clicks change once; arrows change by one, Home/End reach limits, Escape stops repeat.
// Replace mountPreview above with SLComponent.mount(root, options).
// Call controller.destroy() before removing or replacing the component.
// reset() restores the control only; it cannot undo completed external work.
