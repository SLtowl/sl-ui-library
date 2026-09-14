// Explicit local demonstration. No network or device operation is performed.
SLComponent.mountPreview(document.querySelector('.sl-component'));

// Application integration:
// Pass onExport({ format, signal }); resolve only after export creation or handoff succeeds. Reject on failure. The preview creates no file.
// start() returns Promise<boolean>; open(), close(), cancel(), reset(), destroy(). state is { phase, format, open }. sl:action reports format selection and action outcomes.
// Replace mountPreview above with SLComponent.mount(root, options).
// Call controller.destroy() before removing or replacing the component.
// reset() restores the control only; it cannot undo completed external work.
