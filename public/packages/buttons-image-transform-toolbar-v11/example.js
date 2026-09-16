// Local preview: both controls transform only the image sample in this component.
const previewRoot = document.querySelector('.sl-component');
const previewController = SLComponent.mountPreview(previewRoot);

// Application integration:
// const controller = SLComponent.mount(root, {
//   onChange: ({ action, state }) => imageEditor.applyTransform(action, state),
// });
// Call controller.destroy() before removing or replacing the component.
