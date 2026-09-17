# Basic animated buttons — batch 5 review

Status: local owner review required. These nine packages are excluded from the released catalog until approval.

## Components

1. Close item — Close or reopen one local item as a clean cross gives way to a return arrow.
2. Open externally — Move a local preview out of its frame and return it with one continuous diagonal gesture.
3. Read status — Mark one local message read or unread with a centered check inside the envelope.
4. Flag item — Flag or clear one local item as the empty fabric contour fills without an inner badge.
5. Snooze item — Snooze or resume one local item as alarm-clock hands resolve into a pause mark.
6. Publish item — Move one local draft into a published state while its arrow resolves into a check.
7. Sync item — Include or remove one local item from sync with two continuous opposing arrows.
8. Report issue — Select or cancel one local report draft as an alert resolves into confirmation.
9. Power control — Turn one local control on or off with a stable power-button glyph.

## Owner feedback refinement

- Removed the rejected Redo component completely; the batch now contains nine packages with no replacement.
- Removed the detached unread dot and kept read confirmation inside the envelope.
- Removed the check from the flag fabric and made state visible through the cloth fill alone.
- Rebuilt Snooze as an alarm clock whose hands resolve into pause bars.
- Kept Power as a button action: a stable power glyph with a restrained pulse, never a nested switch.
- Kept a source-level regression gate that forbids switch-track markup inside Power.

## Contract

- All nine packages are standalone, offline and self-contained.
- Every interaction changes local preview state only; application persistence must be connected through onChange or sl:action.
- Native buttons retain visible focus, centered labels, live status, forced-colors support and reduced-motion fallbacks.
- Motion is reversible from intermediate frames and does not use delayed icon loading or stacked outlines.

## Verification

- Static package, source, offline, isolated-manifest and reviewed-glyph contract: passed (3/3 targeted tests; browser-enabled run).
- Targeted real-browser interaction, lifecycle, 226 px fit, rapid reversal and reduced motion: passed in Chromium.
- Full npm run check: passed (167 passed, 97 skipped, 0 failed).
