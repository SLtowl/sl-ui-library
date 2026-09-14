// Local selection only. This example makes no requests or persistent changes.
const selection = SLComponent.mountPreview(document.querySelector('.sl-component'));
// Application usage: SLComponent.mount(root, { values: [...], onChange(detail) { ... } }).
// Keep the form root; do not nest it inside another form. Native radio names are isolated by this form.
// detail contains action, kind and a copied values array. selectionchange carries the same fields.
// setValues(values) validates and updates silently; state returns a fresh snapshot.
// reset() restores HTML defaults silently; destroy() removes every listener and permits remounting.
// state.values preserves priority order. Checking appends a priority; unchecking removes its rank. moveEarlier(value) swaps it with the preceding item and emits a rank action. The first rank cannot move earlier.
// state.limit is 3. moveEarlier returns true for a move; otherwise it returns false.
