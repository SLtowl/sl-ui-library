# Gallery and workbench review — 2026-09-15

Scope: the 234 approved components / 236 export variants in version 1.1.0.
No component package, controller, palette, interface language or release scope
was changed by this repair. Promotional-video styling is local-only.

## Root causes and changes

- CSS Grid stretched short gallery cards to their tallest neighbour. Follow and
  Auto save each had about 265 px of empty card below the preview. Cards now
  align at their natural height.
- Workbench child minimum heights exceeded the fixed parent height. Output
  priority lost about 128 px behind the parent's clipping. The parent now
  reserves the complete component canvas and a separate 64 px heading row.
- Absolute heading offsets could overlap tall legacy controls, or push narrow
  feedback beyond its canvas. Heading space now belongs to page layout rather
  than the shared preview runtime.
- Gallery reset controls could overlap tall legacy checkbox cards. A separate
  44 px control strip leaves the component canvas unobstructed.
- Entry pages and the navigation module use new asset query versions so cached
  CSS/runtime cannot retain the previous geometry after deployment.

## Verification

- `npm run build`: 234 components, 236 exports and the offline plugin rebuilt.
- `verify.mjs`: 1,101 source files, ZIP contents, local references and English
  public UI verified.
- Expanded `npm run check` with Chrome and Playwright enabled: 300 of 301 tests
  passed. The remaining navigation test assumed the removed internal 52 px
  heading offset. Its bare-host assertion was updated to test the actual host
  bounds; all 26 navigation tests then passed on a targeted rerun. Actual page
  heading separation is independently asserted by the new gallery suite.
- All four new gallery tests passed in that full browser run: all 234 cards
  and all 236 workbench variants at widths 320, 768, 1024 and 1440 px; no
  horizontal overflow, panel clipping, heading/reset intersections, stretched
  cards or JavaScript page errors in those checks.
- Every workbench HTML/CSS/example-JavaScript tab and full controller was
  compared byte-for-byte with its package source. Every ZIP returned HTTP 200
  and a ZIP signature; reset was exercised for every variant.
- Visual contact sheets reviewed across all ten categories. Focused visual
  review covered Output priority at 1440 px, Linear progress at 320 px and an
  expanded Workspace settings panel at 320 px.
- Additional real-input checks: Follow on/off/reset, Auto save on/off/reset,
  Output priority swap/reset, Workspace settings inside clicks, checkbox
  changes, Cancel restoration and close after resizing while open.
- Copy-code handlers passed for HTML, CSS and JavaScript using a test clipboard
  sink; the user's operating-system clipboard was not overwritten.

This is Chromium/Chrome desktop and viewport-emulation evidence, not a claim
that every interaction was manually exercised in Safari, Firefox or on physical
mobile devices. Demo actions still change only local preview state.
