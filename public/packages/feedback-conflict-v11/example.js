// Explicit local demonstration. Replace this call for application integration.
const controller = SLComponent.mountPreview(document.querySelector('.sl-component'));

// Application API: Options: localText, remoteText and onAction("resolve", { choice, text, signal }). User text is rendered literally. choose("local"|"remote") selects a version; resolve() returns Promise<boolean> and freezes the choice only after callback fulfillment. cancel() leaves both versions intact. state exposes { status, choice, resolved, localText, remoteText }; reset() reopens the original conflict.
// Use SLComponent.mount(root, options). mount() never simulates remote success.
// controller.reset() restores the initial view; controller.destroy() releases its listeners and work.
