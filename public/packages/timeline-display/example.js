// Local sample data. No network requests, uploads or account changes.
const root = document.querySelector('.dd-demo');
const display = MatteDataDisplay.mount(root, {
  onChange(detail) {
    // Connect selection to your application here.
    // detail.kind, detail.action and state fields describe the change.
  }
});

// Optional programmatic interaction:
// display.toggle(true);

// display.state returns a read-only snapshot.
// display.reset() restores the example; display.destroy() removes listeners.
// Replace sample records in index.html and the datasets in buttons.js.
// Change --dd-* variables in buttons.css to match your palette.
// Preserve table headers, calendar grid roles, labels and keyboard handling.
