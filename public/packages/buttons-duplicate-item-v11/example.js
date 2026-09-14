// Explicit local demonstration. No file, clipboard or network operation occurs.
SLComponent.mountPreview(document.querySelector('.sl-component'));

// Application integration: replace the line above with
// const controller = SLComponent.mount(root, {
//   item: { id: 'note-1', label: 'Project brief' },
//   onDuplicate: ({ source, signal }) => duplicateInYourApp(source.id, { signal })
// });
// Resolve onDuplicate only after the copy exists. Return { id, label } with a new
// id; reject on failure. id and label are non-empty strings up to 160 characters.
// copyNumber is a local count, not a globally unique identifier for your backend.
// Labels render as literal text. sl:action reports confirmed results and failures.
// start() returns Promise<boolean>; cancel() returns boolean. Escape cancels.
// reset() clears this preview state, not copies already created in your app.
// destroy() aborts pending work, removes listeners and ignores late results.
// Cancellation is best-effort: the application owns rollback/reconciliation if
// its operation completed despite abort. Remounting disposes the old controller.
