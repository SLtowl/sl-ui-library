// Honest local demonstration: selections do not save, fetch or submit data.
SLComponent.mountPreview(document.querySelector('.sl-component'));

// Application usage: mount a separate root with SLComponent.mount(root, { onChange(detail) {} }).
// detail = { kind, action, state }; also emitted as bubbling, composed "displaychange".
// select(index) accepts funnel stages 0–3. setMode("entry" | "previous") changes percentage denominators. First-stage conversion remains 100%; bar widths and labels use the selected denominator. state contains selected and mode.
// reset() restores default visuals and ARIA. destroy() removes listeners; repeated calls are safe.
// Call destroy() before removing the root. A later mount starts with defaults.
// Each controller owns its state. CSS-only motion responds to live reduced-motion changes.
// Replace sample text with textContent and keep numeric labels/scales synchronized.
// Bind --dd-surface, --dd-text, --dd-muted, --dd-accent, --dd-selected, --dd-edge and --dd-focus to your palette.
