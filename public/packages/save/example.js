const root = document.querySelector('.button-kit');

MatteButtons.mount(root, {
  onSave: saveChanges,
  previewDuration: 1900
});
