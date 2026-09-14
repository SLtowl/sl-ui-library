// Explicit local demonstration. No network or device operation is performed.
SLComponent.mountPreview(document.querySelector('.sl-component'));

// Application integration:
// Pass onConfirm({ signal }); resolve only after the archive succeeds. holdMs defaults to 1200 and accepts 500–5000 ms. Releasing early or leaving the button cancels the hold. Keyboard activation opens an untimed confirmation.
// confirm() returns Promise<boolean> and bypasses the UI confirmation for trusted application code; open(), close(), cancel(), reset(), destroy(). state is { phase, open, holding }. sl:action reports operation outcomes.
// Replace mountPreview above with SLComponent.mount(root, options).
// Call controller.destroy() before removing or replacing the component.
// reset() restores the control only; it cannot undo completed external work.
