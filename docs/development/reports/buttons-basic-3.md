# Basic animated buttons — batch 3 review

Status: local owner review required. These ten packages are intentionally excluded from `public/catalog-data.js` and generated plugin data until approval.

## Components

21. `buttons-text-bold-v11` — regular/bold text with matching icon weight.
22. `buttons-text-italic-v11` — upright/italic text with a reversible glyph lean.
23. `buttons-text-case-v11` — sentence, uppercase and lowercase cycle.
24. `buttons-text-strike-v11` — reversible strikethrough draw.
25. `buttons-text-align-v11` — left, center and right alignment cycle.
26. `buttons-list-style-v11` — bullets, numbers and checks cycle.
27. `buttons-indent-level-v11` — four exact local indentation levels.
28. `buttons-rotate-item-v11` — four exact quarter-turn orientations.
29. `buttons-mirror-item-v11` — reversible horizontal mirror.
30. `buttons-crop-mode-v11` — reversible local crop handles and image inset.

## Interaction contract

- Every action updates a visible local sample as well as its animated inline SVG icon.
- Labels remain geometrically centered; icons keep a fixed anchor through state changes.
- Native buttons support keyboard activation and visible focus.
- Setters are silent; one user action emits one `sl:action` event and one optional `onChange` callback.
- Controllers support repeat-safe `reset()` and `destroy()` and cleanly replace an earlier mount.
- Motion stays between 180 and 360 ms and has reduced-motion and forced-colors fallbacks.

## Owner feedback refinement

- Bold, Italic, Text case, Strikethrough, Text alignment, List style, Indent level, Rotate item and Mirror item now use 36 px icon-only controls inside a small editor toolbar instead of full-width CTA buttons.
- Strikethrough no longer shows a checkbox-like square before its text sample.
- List style uses matching bullet, number and check states in both the preview and button icon.
- Rotate and Mirror use a recognizable image sample; Rotate has a clear clockwise arrow and Mirror has two shapes split by a vertical axis.
- Crop mode keeps the accepted full-width action treatment.

## Verification

- Static package, source, offline and isolated-manifest contract: passed.
- Real browser coverage for all state cycles, visible sample changes, keyboard reversal, event counts, remount cleanup, icon-only geometry, reduced motion and 226 px fit: passed (6/6).
- Main catalog remains at 254 components and 256 export variants; this unapproved batch is not included.
