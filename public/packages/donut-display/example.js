// Local sample data. No network requests, uploads or account changes.
const root = document.querySelector('.dd-demo');
const display = MatteDataDisplay.mount(root, {
  onChange(detail) {
    // Connect selection to your application here.
    // detail.kind, detail.action and state fields describe the change.
  }
});

// Optional programmatic interaction:
// display.select(1); // Assets = 0, Documents = 1, Exports = 2, Free = 3
// display.select(null); // return to total usage

// display.state returns a read-only snapshot.
// display.reset() restores the example; display.destroy() removes listeners.
// Replace sample records in index.html and the datasets in buttons.js.
// Change --dd-* variables in buttons.css to match your palette.
// Preserve table headers, calendar grid roles, labels and keyboard handling.
