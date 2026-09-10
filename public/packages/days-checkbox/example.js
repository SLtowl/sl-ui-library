const root = document.querySelector('.sl-check-card');
const selection = MatteCheckboxes.mount(root, {
  onChange(values) {
    // Connect selected input names to your application.
  }
});
// selection.values reads the selected names.
// selection.reset() restores defaults; selection.destroy() removes listeners.
