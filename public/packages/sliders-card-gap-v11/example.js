// Local preview only. No purchases, network requests or saved settings.
SLComponent.mountPreview(document.querySelector('.sl-component'));
// values is [gapPx], from 4 to 24 in steps of 2. state.gapCss is a CSS gap value for a grid or flex container. Each preview card keeps its own padding and font size; only space between cards changes.
// const controller = SLComponent.mount(root, { values: [12], onChange(state) {
//   // Apply the value to your own app after validating application constraints.
// } });
// controller.state is a fresh snapshot; setValues(array) is silent.
// setDisabled(boolean), reset() and destroy() follow the library lifecycle.
// User edits emit a bubbling, composed sliderchange event.
