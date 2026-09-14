// Local preview only. No purchases, network requests or saved settings.
SLComponent.mountPreview(document.querySelector('.sl-component'));
// values is [quantity], an integer from 1 to 20. state.quantity mirrors it; state.unitPriceCents is the fixed demonstration price 1200 and subtotalCents is quantity × 1200, currency USD. Use your own prices and real checkout separately. No order is submitted.
// const controller = SLComponent.mount(root, { values: [2], onChange(state) {
//   // Apply the value to your own app after validating application constraints.
// } });
// controller.state is a fresh snapshot; setValues(array) is silent.
// setDisabled(boolean), reset() and destroy() follow the library lifecycle.
// User edits emit a bubbling, composed sliderchange event.
