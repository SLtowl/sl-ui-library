// Local selection demo. No network requests or audio/device operations occur.
SLComponent.mountPreview(document.querySelector('.sl-component'));
// Application integration: keep the returned controller in your own scope.
// const controller = SLComponent.mount(root, { values: [10,50,90],
//   onChange(state) { /* Apply the numeric state to your real application. */ }
// });
// values contains the three ordered percentages. Stops retain a 5% gap. state.gradient is a CSS linear-gradient referencing --sl-stop-shade, --sl-stop-sage and --sl-stop-light; define the same variables wherever the gradient is used.
// controller.state returns a fresh snapshot. setValues(array) updates silently.
// setDisabled(boolean) affects every control. reset() restores mount options.
// destroy() removes listeners; calling mount again replaces an earlier mount.
// User changes emit a bubbling, composed sliderchange event with state in detail.
