// This example changes local field state only. It makes no external request.
// In application code: const field = SLComponent.mount(root, { onChange(state) {} });
// Read field.state, call field.reset(), and call field.destroy() before removing the root.
// options.value = { start: YYYY-MM-DD, end: YYYY-MM-DD }, ordered and within 2000–2100. state = { value: { start, end }, valid, days: number|null }. Inclusive day arithmetic uses UTC calendar days and is independent of daylight-saving transitions. The project calendar uses the root language (English by default), a Monday-first keyboard grid and previous/next month navigation. Arrow keys move by day/week; Home/End move within a week; PageUp/PageDown change month (Shift changes year). ISO text entry remains available. Escape closes without selecting.
SLComponent.mountPreview(document.querySelector('.sl-component'));
