// Local selection demo. No network requests or audio/device operations occur.
SLComponent.mountPreview(document.querySelector('.sl-component'));
// Application integration: keep the returned controller in your own scope.
// const controller = SLComponent.mount(root, { values: [40,35],
//   onChange(state) { /* Apply the numeric state to your real application. */ }
// });
// values is [designHours, engineeringHours] in 1-hour steps. Each discipline and the remaining QA allocation keep at least 10 hours. state.hours contains all three allocations and state.total is always 100.
// controller.state returns a fresh snapshot. setValues(array) updates silently.
// setDisabled(boolean) affects every control. reset() restores mount options.
// destroy() removes listeners; calling mount again replaces an earlier mount.
// User changes emit a bubbling, composed sliderchange event with state in detail.
