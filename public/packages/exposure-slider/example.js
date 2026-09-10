const root = document.querySelector('.mixer-group, .sl-slider');
const slider = MatteSlider.mount(root, {
  onChange(values) {
    // Connect numeric values to your application.
  }
});
// slider.values reads the current values.
// slider.reset() restores defaults; slider.destroy() removes listeners.
