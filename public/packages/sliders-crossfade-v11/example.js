// Local selection demo. No network requests or audio/device operations occur.
SLComponent.mountPreview(document.querySelector('.sl-component'));
// Application integration: keep the returned controller in your own scope.
// const controller = SLComponent.mount(root, { values: [50],
//   onChange(state) { /* Apply the numeric state to your real application. */ }
// });
// values is [mixPercent], from 0 (source A) to 100 (source B). state.gains contains linear amplitude factors; state.equalPower selects sine/cosine or linear interpolation. Connect gains to your own audio graph.
// controller.state returns a fresh snapshot. setValues(array) updates silently.
// setDisabled(boolean) affects every control. reset() restores mount options.
// destroy() removes listeners; calling mount again replaces an earlier mount.
// User changes emit a bubbling, composed sliderchange event with state in detail.
