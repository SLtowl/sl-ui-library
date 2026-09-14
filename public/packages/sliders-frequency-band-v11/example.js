// Local selection demo. No network requests or audio/device operations occur.
SLComponent.mountPreview(document.querySelector('.sl-component'));
// Application integration: keep the returned controller in your own scope.
// const controller = SLComponent.mount(root, { values: [40,80],
//   onChange(state) { /* Apply the numeric state to your real application. */ }
// });
// values contains logarithmic positions 0–120, in steps of 1. Frequency in Hz is 20 × 1000^(position/120); state.frequenciesHz exposes unrounded frequencies and state.octaves the interval. Native accessible value text always announces Hz. Cutoffs retain one logarithmic step of separation.
// controller.state returns a fresh snapshot. setValues(array) updates silently.
// setDisabled(boolean) affects every control. reset() restores mount options.
// destroy() removes listeners; calling mount again replaces an earlier mount.
// User changes emit a bubbling, composed sliderchange event with state in detail.
