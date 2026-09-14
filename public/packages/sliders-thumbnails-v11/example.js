// Local preview only. No purchases, network requests or saved settings.
SLComponent.mountPreview(document.querySelector('.sl-component'));
// values is [thumbnailPx], from 48 to 88 in steps of 4. state.thumbnailCss is a CSS width. The local gallery keeps a 4:3 aspect ratio and wraps using flexbox; the sample illustrations are inline SVG. Replace them with your own images and meaningful alt text.
// const controller = SLComponent.mount(root, { values: [64], onChange(state) {
//   // Apply the value to your own app after validating application constraints.
// } });
// controller.state is a fresh snapshot; setValues(array) is silent.
// setDisabled(boolean), reset() and destroy() follow the library lifecycle.
// User edits emit a bubbling, composed sliderchange event.
