// Local selection only. This example makes no requests or persistent changes.
const selection = SLComponent.mountPreview(document.querySelector('.sl-component'));
// Application usage: SLComponent.mount(root, { values: [...], onChange(detail) { ... } }).
// Keep the form root; do not nest it inside another form. Native radio names are isolated by this form.
// detail contains action, kind and a copied values array. selectionchange carries the same fields.
// setValues(values) validates and updates silently; state returns a fresh snapshot.
// reset() restores HTML defaults silently; destroy() removes every listener and permits remounting.
// Costs come from data-cost. The fixed budget is eight points. An option is disabled when its cost exceeds the remaining budget; selected options remain removable. state includes budget and used.
