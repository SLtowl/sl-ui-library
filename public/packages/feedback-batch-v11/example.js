// Explicit local demonstration. Replace this call for application integration.
const controller = SLComponent.mountPreview(document.querySelector('.sl-component'));

// Application API: Options: results mapping notes, map and interview to "done", "failed" or "skipped"; onAction("retry", { id, signal }) performs one unfinished item. retry() processes those items sequentially and stops at the first error or cancellation, retaining confirmed successes. dismiss() marks the receipt reviewed locally. state is { status, results, reviewed }. reset() restores supplied results.
// Use SLComponent.mount(root, options). mount() never simulates remote success.
// controller.reset() restores the initial view; controller.destroy() releases its listeners and work.
