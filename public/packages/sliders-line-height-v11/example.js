// Local preview only. No purchases, network requests or saved settings.
SLComponent.mountPreview(document.querySelector('.sl-component'));
// values is [lineHeight], a unitless CSS line-height from 1.2 to 2 in 0.1 steps. state.lineHeight is directly usable on the target paragraph; typography outside this component is not changed. The paragraph is ordinary text, not an image.
// const controller = SLComponent.mount(root, { values: [1.5], onChange(state) {
//   // Apply the value to your own app after validating application constraints.
// } });
// controller.state is a fresh snapshot; setValues(array) is silent.
// setDisabled(boolean), reset() and destroy() follow the library lifecycle.
// User edits emit a bubbling, composed sliderchange event.
