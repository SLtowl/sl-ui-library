# Basic animated buttons — batch 5 review

Status: local owner review required. These ten packages are excluded from the released catalog until approval.

## Components

1. Redo action — Repeat one local preview action with a familiar forward redo arrow and a short continuous turn.
2. Close item — Close or reopen one local item as a clean cross gives way to a return arrow.
3. Open externally — Move a local preview out of its frame and return it with one continuous diagonal gesture.
4. Read status — Mark one local message read or unread with a centered check inside the envelope.
5. Flag item — Flag or clear one local item as the empty fabric contour fills without an inner badge.
6. Snooze item — Snooze or resume one local item as alarm-clock hands resolve into a pause mark.
7. Publish item — Move one local draft into a published state while its arrow resolves into a check.
8. Sync item — Include or remove one local item from sync with two continuous opposing arrows.
9. Report issue — Select or cancel one local report draft as an alert resolves into confirmation.
10. Power control — Turn one local control on or off with a compact sliding switch.

## Owner feedback refinement

- Replaced the ambiguous reverse-looking redo glyph with a conventional forward arrow.
- Removed the detached unread dot and kept read confirmation inside the envelope.
- Removed the check from the flag fabric and made state visible through the cloth fill alone.
- Rebuilt Snooze as an alarm clock whose hands resolve into pause bars.
- Replaced the ambiguous power-ring drawing with a direct off/on switch.

## Contract

- All ten packages are standalone, offline and self-contained.
- Every interaction changes local preview state only; application persistence must be connected through onChange or sl:action.
- Native buttons retain visible focus, centered labels, live status, forced-colors support and reduced-motion fallbacks.
- Motion is reversible from intermediate frames and does not use delayed icon loading or stacked outlines.

## Verification

- Static package, source, offline and isolated-manifest contract: passed (2/2 targeted tests; browser-enabled run).
- Targeted real-browser interaction, lifecycle, 226 px fit, rapid reversal and reduced motion: passed in Chromium.
- Full npm run check: passed (166 passed, 97 skipped, 0 failed).
