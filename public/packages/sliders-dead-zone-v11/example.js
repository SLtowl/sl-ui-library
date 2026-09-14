// Local selection demo. No network requests or audio/device operations occur.
SLComponent.mountPreview(document.querySelector('.sl-component'));
// Application integration: keep the returned controller in your own scope.
// const controller = SLComponent.mount(root, { values: [12,90,35],
//   onChange(state) { /* Apply the numeric state to your real application. */ }
// });
// values is [innerPercent, outerPercent, signedTestPercent]. Inner is 0–40%, outer 60–100%, test −100–100%. state.response is signed output from −1 to 1 after dead-zone removal and rescaling; integration with a device is application-owned.
// controller.state returns a fresh snapshot. setValues(array) updates silently.
// setDisabled(boolean) affects every control. reset() restores mount options.
// destroy() removes listeners; calling mount again replaces an earlier mount.
// User changes emit a bubbling, composed sliderchange event with state in detail.
