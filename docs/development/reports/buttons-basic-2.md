# Basic animated buttons — batch 2 review

Status: local owner review required. This batch is intentionally excluded from `public/catalog-data.js` and the released 1.1 catalog until approval.

## Components

11. `buttons-search-toggle-v11` — reversible search/close state.
12. `buttons-visibility-toggle-v11` — reversible show/hide state.
13. `buttons-sound-toggle-v11` — reversible sound/mute state.
14. `buttons-expand-toggle-v11` — reversible expand/collapse state.
15. `buttons-view-switch-v11` — reversible grid/list state.
16. `buttons-sidebar-toggle-v11` — reversible sidebar state.
17. `buttons-notifications-toggle-v11` — reversible notification state.
18. `buttons-attachment-toggle-v11` — reversible local draft attachment state.
19. `buttons-undo-action-v11` — callback-backed undo action; the preview is a local no-op.
20. `buttons-move-item-v11` — callback-backed move action; the preview is a local no-op.

## Interaction contract

- Labels stay geometrically centered across every state.
- Icons use project-owned inline SVG and animate without replacing the button element.
- Toggle actions expose `aria-pressed`, reversible labels, status text, keyboard activation, `reset()` and `destroy()`.
- Undo and Move require an application callback, support cancellation with Escape, and never report success before that callback resolves.
- Re-mounting destroys prior listeners and aborts pending work.
- Reduced-motion and forced-colors fallbacks are included.

## Verification

- Static package contract and manifest checks: passed.
- Browser interaction suite covering keyboard reversibility, stable label centering, callback requirements, cancellation, remount cleanup and 226 px fit: passed (7/7).
- Manual local review at `http://127.0.0.1:4338/`: all ten previews load and respond; final owner decision pending.
