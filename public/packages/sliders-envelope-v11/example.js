// Local selection demo. No network requests or audio/device operations occur.
SLComponent.mountPreview(document.querySelector('.sl-component'));
// Application integration: keep the returned controller in your own scope.
// const controller = SLComponent.mount(root, { values: [100,250,60,500],
//   onChange(state) { /* Apply the numeric state to your real application. */ }
// });
// values is [attackMs, decayMs, sustainPercent, releaseMs]. Time stages step by 10 ms. state.sustain is the 0–1 amplitude. The graph includes a fixed, explicitly labelled 500 ms hold; no audio or playback timer is included.
// controller.state returns a fresh snapshot. setValues(array) updates silently.
// setDisabled(boolean) affects every control. reset() restores mount options.
// destroy() removes listeners; calling mount again replaces an earlier mount.
// User changes emit a bubbling, composed sliderchange event with state in detail.
