// Local selection demo. No network requests or audio/device operations occur.
SLComponent.mountPreview(document.querySelector('.sl-component'));
// Application integration: keep the returned controller in your own scope.
// const controller = SLComponent.mount(root, { values: [50,2,51.4],
//   onChange(state) { /* Apply the numeric state to your real application. */ }
// });
// values is [nominalMm, toleranceMm, sampleMm] in 0.1 mm steps. User edits preserve the tolerance while clamping the nominal; setValues clamps the requested tolerance to the new nominal. state.lower, upper, deviation and accepted describe the inclusive test.
// controller.state returns a fresh snapshot. setValues(array) updates silently.
// setDisabled(boolean) affects every control. reset() restores mount options.
// destroy() removes listeners; calling mount again replaces an earlier mount.
// User changes emit a bubbling, composed sliderchange event with state in detail.
