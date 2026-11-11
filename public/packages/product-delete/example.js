// Pass onDelete({ signal }); resolve once the item is gone, reject to put the button back. The confirmation closes by itself after a few seconds.
SLDelete.mount(document.querySelector('.pb-delete'), {
  // Delete for real. Resolve when it is done, throw to show the error.
  onDelete: async ({ signal }) => {
    const response = await fetch('/api/projects/42', { method: 'DELETE', signal });
    if (!response.ok) throw new Error('Delete failed');
  },
});
