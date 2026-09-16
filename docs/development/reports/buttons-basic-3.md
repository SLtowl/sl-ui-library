# Basic animated buttons — batch 3 review

Status: local owner review required. These four packages are intentionally excluded from `public/catalog-data.js` and generated plugin data until approval.

## Components

21. `buttons-text-editor-toolbar-v11` — one editable panel with Bold, Italic, Case, Strike, Align, List and Indent controls.
22. `buttons-rotate-item-v11` — four exact quarter-turn orientations.
23. `buttons-mirror-item-v11` — reversible horizontal mirror.
24. `buttons-crop-mode-v11` — reversible local crop handles and image inset.

## Interaction contract

- Every action updates a visible local sample as well as its animated inline SVG icon.
- The text toolbar uses roving arrow-key focus and keeps its editable Unicode text literal.
- Labels remain geometrically centered; icons keep a fixed anchor through state changes.
- Native buttons support keyboard activation and visible focus.
- Setters are silent; one user action emits one `sl:action` event and one optional `onChange` callback.
- Controllers support repeat-safe `reset()` and `destroy()` and cleanly replace an earlier mount.
- Motion stays between 180 and 360 ms and has reduced-motion and forced-colors fallbacks.

## Owner feedback refinement

- Bold, Italic, Text case, Strikethrough, Text alignment, List style and Indent level are now one coordinated text-editor panel instead of seven separate cards.
- The text sample is directly editable; formatting remains reversible and all seven controls share one state model.
- Rotate and Mirror use a recognizable image sample; Rotate has a clear clockwise arrow and Mirror has two shapes split by a vertical axis.
- Crop mode keeps the accepted full-width action treatment.

## Verification

- Static package, source, offline and isolated-manifest contract: passed.
- Real browser coverage for all seven toolbar actions, literal Unicode text input, keyboard navigation, event counts, remount cleanup, the three media actions, reduced motion and 226 px fit: passed (7/7).
- Main catalog remains at 254 components and 256 export variants; this unapproved batch is not included.
