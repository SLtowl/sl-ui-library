// Explicit local demonstration. Replace this call for application integration.
const controller = SLComponent.mountPreview(document.querySelector('.sl-component'));

// Application API: Options: durationSeconds (1–86400; default 90) and onAction("renew", { signal }). Renewal must return { expiresAt } with a future Unix timestamp in milliseconds. renew() returns Promise<boolean>. state exposes { status, expiresAt, expired }. The clock continues during pending renewal and uses wall time after a suspended tab. reset() creates a fresh local duration; destroy() clears the interval.
// Use SLComponent.mount(root, options). mount() never simulates remote success.
// controller.reset() restores the initial view; controller.destroy() releases its listeners and work.
