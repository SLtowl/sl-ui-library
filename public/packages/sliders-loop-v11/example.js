// Local selection demo. No network requests or audio/device operations occur.
SLComponent.mountPreview(document.querySelector('.sl-component'));
// Application integration: keep the returned controller in your own scope.
// const controller = SLComponent.mount(root, { values: [24,48],
//   onChange(state) { /* Apply the numeric state to your real application. */ }
// });
// values are [start, end] in seconds, rounded to 0.5 s, within 0–120 s and at least 1 s apart. state.duration and state.locked report the interval. Lock length keeps duration fixed during user edits; setValues replaces the interval explicitly.
// controller.state returns a fresh snapshot. setValues(array) updates silently.
// setDisabled(boolean) affects every control. reset() restores mount options.
// destroy() removes listeners; calling mount again replaces an earlier mount.
// User changes emit a bubbling, composed sliderchange event with state in detail.
