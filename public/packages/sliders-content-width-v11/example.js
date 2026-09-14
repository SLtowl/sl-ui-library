// Local preview only. No purchases, network requests or saved settings.
SLComponent.mountPreview(document.querySelector('.sl-component'));
// values is [widthPercent], 50–100 in steps of 5. state.widthCss is a percentage width for a centered column in its own parent. The demo changes an actual text column without changing font size. Apply margin-inline:auto to your target column.
// const controller = SLComponent.mount(root, { values: [80], onChange(state) {
//   // Apply the value to your own app after validating application constraints.
// } });
// controller.state is a fresh snapshot; setValues(array) is silent.
// setDisabled(boolean), reset() and destroy() follow the library lifecycle.
// User edits emit a bubbling, composed sliderchange event.
