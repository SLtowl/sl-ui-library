// Pass onConfirm for the real deletion. Pass resetAfter in milliseconds if the form should return afterwards.
SLConfirmDelete.mount(document.querySelector('.pb-confirmdelete'), {
  onConfirm: () => deleteProject(),
});
