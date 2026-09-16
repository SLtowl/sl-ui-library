// Local preview: all actions format only the editable sample in this component.
const previewRoot = document.querySelector('.sl-component');
const previewController = SLComponent.mountPreview(previewRoot);

// Application integration:
// const controller = SLComponent.mount(root, {
//   lines: ['First item', 'Second item'],
//   onChange: ({ action, state }) => editor.applyFormatting(action, state),
//   onInput: ({ text }) => editor.updateDraft(text),
// });
// Call controller.destroy() before removing or replacing the component.
