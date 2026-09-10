const button = document.querySelector('.sl-delete');

const deletion = MatteDelete.mount(button, {
  feedback: document.querySelector('.delete-feedback'),
  onDelete: async ({ signal }) => {
    if (signal.aborted) throw new DOMException('Canceled', 'AbortError');
    // Working local example: remove only the sample text in index.html.
    // Replace this action with your own deletion and await its result.
    document.querySelector('[data-delete-example]')?.remove();
  }
});

// A single click starts onDelete immediately. Your application is responsible
// for confirmation or undo when appropriate.
// reset() resets the control; it does not restore deleted data.
// Call deletion.destroy() before removing the button.
