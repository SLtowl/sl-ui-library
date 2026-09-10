# Release verification — 2026-09-10

## Scope

All 110 catalog components and 112 export variants. The latest pass exercises every isolated export and every catalog/detail mini-preview at desktop and narrow widths. Earlier checks below remain useful historical evidence. This is bounded automated and visual verification, not a guarantee that every possible browser/device issue has been eliminated.

## Fixed in this pass

- Zoom and Level slider catalog cards reserve 320px only where their taller content needs it; their panels no longer extend beyond the card's clipped preview surface.
- New Project now uses an ordinary short open/close transition instead of the removed Genie distortion. Compact overlay spacing keeps actions usable in small embedded viewports.
- Quick edit no longer replaces its action label with a user-entered project name. The English result is `Project renamed`; the exact name is preserved as text in the field and feedback.
- Project-name fields select their content when opened, avoiding accidental appending when renaming.
- Mobile component-detail previews reserve enough height for overlays and navigation.
- Preview readiness is cleared before a new preview loads.
- Extra palette/document/tour handlers and animations are stopped by `destroy()`.
- Ten approved Navigation components and ten Overlays now have catalog entries, isolated previews, source views and standalone ZIPs.

## Passed checks

- All 112 isolated exports: live local CSS and font loading, 857 button/input/keyboard actions with native or DOM state changes, SVG geometry checks, 390px layout and reduced-motion reloads; no script errors or external requests. Clipboard, sharing, downloads and file-picker actions were stubbed; upload selection used an in-memory fixture.
- All 110 components in both category and component-detail mini-previews at 1440, 390 and 320px page widths: 660 preview contexts, each exercised through two open/select/reset cycles. Bounds cover direct preview content, opened menu/overlay panels and overlay action footers, not only standalone pages.
- All 440 displayed HTML, CSS, integration JavaScript and full-controller source views match their actual exported files exactly.
- 110 unique components, 112 unique variants; category counts match README.
- 595 package HTML/CSS/JavaScript files: no hard-coded Cyrillic UI strings or replacement-character encoding damage. Catalog search keywords are English.
- User-entered Unicode and HTML-looking names remain literal text, never translated or rendered as markup.
- 90 earlier components: 720 rapid interaction cycles, reset, valid SVG geometry, no script/resource errors or downloads. Clipboard/share adapters were stubbed during the audit.
- All 20 new packages initialize alone without borrowing icons or DOM from sibling review cards.
- Overlays: keyboard/focus, Escape, outside dismissal, reset, repeat actions, tour replay, Pin, sheet gesture, reduced motion and viewport bounds. The former Genie checks are historical; the current simpler transition is checked separately, including compact 256/320/390px frames at 300/350/430/450px heights.
- Catalog and individual package smoke checks; mobile component source tabs and ZIP response.
- All 112 ZIPs match their corresponding packaged files byte-for-byte; referenced local package assets/modules exist.
- Standalone GitHub snapshot works under `/sl-ui-library/`, including route navigation, framed overlays and downloads.
- Feedback and Data display both remain `Nothing added yet`.

## Environment and remaining decisions

### Loading regression follow-up

Current first-paint architecture: Navigation no longer uses frames in the catalog; it mounts synchronously in the same shared shadow-root runtime as Menus. Overlay launch controls render synchronously in the parent preview and forward interaction to an isolated dialog frame prepared in the background. Tests inspect real button bounds in the same JavaScript task as insertion, before any frame-load event can run. All 20 pass. Additional checks confirm identical launcher geometry before/after handoff, retention of a click before initialization, navigation keyboard/reset behavior and overlay interactions. The older frame-loading mitigations below are retained only for the isolated overlay document, not for the visible initial card.

Visibility hardening: preview documents now use complete `srcdoc` markup, mounted after their load event, instead of writing into the initial `about:blank` document. FontFace transfer is optional and falls back to the shared font URL if unavailable. Readiness is set only after mounting. Tests verify actual content and controls after loading, SPA navigation and rapid reset, including deliberately failed FontFace transfer. The embedded Codex browser could not be inspected directly because its automation runtime failed to initialize; visual verification used Chrome screenshots.

Navigation previously requested 50 package assets on category entry, and Overlays requested 86 (including ten font URLs per category). Their previews now use precompiled content and controllers in in-memory frames with a shared FontFace. Category entry and Reset request zero additional assets after the common library runtime is loaded. The isolated native-dialog viewport is retained; no `eval`, inline script execution or relaxed script CSP is needed. Additional tests cover the compiled runtime's Genie reversal, forms, Pin, cross-frame focus, action palette, tour, tree keyboard handling, reduced motion and mobile bounds.

Automated UI checks ran in installed Chrome on Windows using Playwright. Firefox, Safari and real touch devices were not tested. The repository is public. Check the Pages workflow for deployment status; private repositories remain blocked by its safeguard. A project-code license remains an owner decision. Check the repository's Actions tab for the current remote CI result.

## Repository and agent toolkit

The self-contained build regenerates catalog previews, route/source templates, all ZIP exports and the offline plugin bundle. Node tests check discovery, reserved categories, invalid IDs and paths, SHA-256/content equality for every bundled source, complete installation, refusal to overwrite existing files and refusal of symlink parents. Plugin and skill metadata are checked with the Codex scaffold validators.

The repository includes actual Chrome screenshots and a cursor-free studio interaction film on a light, perspective-transformed surface. Generated cover/studio/table imagery is promotional rather than presented as screenshots. The agent CLI works outside the repository when the complete plugin folder is copied; no repository-relative source dependency is required.

## Plugin package compatibility

The downloadable plugin includes a portable Agent Plugins manifest, Claude and Codex compatibility manifests, one provider-neutral skill, the offline catalog and all component sources. Thirteen Node tests pass, including exact ZIP-to-source comparison and discovery, source reading, palette inventory and export from a freshly extracted archive outside this repository.

The Claude repository marketplace points to the self-contained plugin directory. No MCP endpoint, hook, account credential or automatic host configuration is added. Local package checks do not certify installation or semantic skill selection inside ChatGPT or Claude; those host acceptance checks and OpenAI public-directory submission remain outstanding.

## Privacy review

The final local release/template snapshot was scanned across 1,038 files, including 791 text files. No supported credential-token patterns, private-key blocks, personal machine paths or non-example email addresses were found. The PNG files contain no EXIF or embedded text metadata. The studio MP4 metadata contains format/encoder information, not personal identifiers. The public author identity and fictional demo names are intentional.

Component browser tests made no external requests. Plugin update endpoints and deliberately invalid URLs in security tests are separate from component behavior; no telemetry or download tracking has been activated. This is a local-content review, not a guarantee about historical remote Git objects, every possible secret encoding or external account access. Remote publication, hosting and release/update activation remain owner-controlled.
