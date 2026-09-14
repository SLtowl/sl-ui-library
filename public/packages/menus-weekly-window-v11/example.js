// This demonstration changes local state only and makes no requests.
const root = document.querySelector('.sl-component');
const controller = SLComponent.mountPreview(root);
// Application usage: SLComponent.mount(root, { onChange(state) { /* Read local state. */ } });
// Call controller.destroy() before remounting with different options.
// controller.open(), controller.close(), controller.reset(), controller.state and controller.destroy() are available.
// Listen for the bubbling, composed sl-menu-change event to read event.detail.
// days contains Monday-based indices 0–6 and time is HH:MM in local 24-hour time. Apply requires at least one day and a valid time. Dismissal discards draftDays and draftTime; scheduling remains the host application’s responsibility.
