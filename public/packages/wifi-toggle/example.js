const root = document.querySelector('.sl-toggle');
const toggle = MatteToggle.mount(root, {
  onChange(checked) {
    // Connect this boolean to your application's setting.
  }
});
// toggle.setChecked(value) updates state silently.
// toggle.reset() restores the default; toggle.destroy() removes listeners.
