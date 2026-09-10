const root = document.querySelector('.button-kit');

MatteButtons.mount(root, {
  onSave: saveChanges,
  onCancel: closeEditor,
  previewDuration: 1900
});
