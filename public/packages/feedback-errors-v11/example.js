// Explicit local demonstration. Replace this call for application integration.
const controller = SLComponent.mountPreview(document.querySelector('.sl-component'));

// Application API: validate() checks a nonblank name and an email with a dotted domain.
// It returns true on format success, otherwise focuses the first error link.
// state is { status, errors }; editing clears ready until the next explicit check.
// reset() empties both fields. This checks format, not mailbox existence; nothing is sent.
// Use SLComponent.mount(root, options). mount() never simulates remote success.
// controller.reset() restores the initial view; controller.destroy() releases its listeners and work.
