// Explicit local demonstration. Replace this call for application integration.
const controller = SLComponent.mountPreview(document.querySelector('.sl-component'));

// Application API: update({ phase, title, detail, label, time }) accepts investigating, identified or resolved and keeps the three latest history entries. Supply actual incident data from your application; this view never polls. acknowledge() toggles a local acknowledgement, disclosure(boolean) controls affected-service details, and Escape closes them. state exposes { status, phase, acknowledged, expanded, history }. reset() restores the sample incident.
// Use SLComponent.mount(root, options). mount() never simulates remote success.
// controller.reset() restores the initial view; controller.destroy() releases its listeners and work.
