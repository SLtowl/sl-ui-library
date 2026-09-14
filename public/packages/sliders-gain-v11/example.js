// Local selection demo. No network requests or audio/device operations occur.
SLComponent.mountPreview(document.querySelector('.sl-component'));
// Application integration: keep the returned controller in your own scope.
// const controller = SLComponent.mount(root, { values: [-6],
//   onChange(state) { /* Apply the numeric state to your real application. */ }
// });
// values is [gainDb], from −60 to +12 in 0.1 dB steps. state.amplitude is 10^(gainDb/20), or zero when state.muted is true. Mute preserves the chosen gain; no audio engine is included.
// controller.state returns a fresh snapshot. setValues(array) updates silently.
// setDisabled(boolean) affects every control. reset() restores mount options.
// destroy() removes listeners; calling mount again replaces an earlier mount.
// User changes emit a bubbling, composed sliderchange event with state in detail.
