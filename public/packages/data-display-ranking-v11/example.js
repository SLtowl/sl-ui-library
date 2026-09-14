// Honest local demonstration: selections do not save, fetch or submit data.
SLComponent.mountPreview(document.querySelector('.sl-component'));

// Application usage: mount a separate root with SLComponent.mount(root, { onChange(detail) {} }).
// detail = { kind, action, state }; also emitted as bubbling, composed "displaychange".
// select(index) uses stable channel IDs 0 Direct, 1 Search, 2 Referral, 3 Social. setMode("visits" | "conversion") sorts descending with stable ties. state contains selected and mode.
// reset() restores default visuals and ARIA. destroy() removes listeners; repeated calls are safe.
// Call destroy() before removing the root. A later mount starts with defaults.
// Each controller owns its state. CSS-only motion responds to live reduced-motion changes.
// Replace sample text with textContent and keep numeric labels/scales synchronized.
// Bind --dd-surface, --dd-text, --dd-muted, --dd-accent, --dd-selected, --dd-edge and --dd-focus to your palette.
