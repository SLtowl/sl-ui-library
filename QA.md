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

Automated UI checks ran in installed Chrome on Windows using Playwright. Firefox, Safari and real touch devices were not tested. The repository is public. Check the Pages workflow for deployment status; private repositories remain blocked by its safeguard. Project code is licensed under MIT; bundled fonts retain their separate licenses. Check the repository's Actions tab for the current remote CI result.

## Repository and agent toolkit

The self-contained build regenerates catalog previews, route/source templates, all ZIP exports and the offline plugin bundle. Node tests check discovery, reserved categories, invalid IDs and paths, SHA-256/content equality for every bundled source, complete installation, refusal to overwrite existing files and refusal of symlink parents. Plugin and skill metadata are checked with the Codex scaffold validators.

The repository includes actual Chrome screenshots and a cursor-free studio interaction film on a light, perspective-transformed surface. Generated cover/studio/table imagery is promotional rather than presented as screenshots. The agent CLI works outside the repository when the complete plugin folder is copied; no repository-relative source dependency is required.

## Plugin package compatibility

The downloadable plugin includes a portable Agent Plugins manifest, Claude and Codex compatibility manifests, one provider-neutral skill, the offline catalog and all component sources. Thirteen Node tests pass, including exact ZIP-to-source comparison and discovery, source reading, palette inventory and export from a freshly extracted archive outside this repository.

The shared repository marketplace points to the self-contained plugin directory. No MCP endpoint, hook or account credential is included. Installation changes host configuration only when explicitly requested through the application's plugin manager.

## Native installation check — 2026-09-11

Both one-line README commands were executed on Windows against the public GitHub repository. Codex and Claude Code 2.1.207 reported `sl-ui-library@sl-ui-library` version 1.0.0 installed and enabled in user scope. Codex also passed a repeat installation. Claude's native manifest validator passed. No official-directory submission was made.

Checks used each application's installed cache, not the development checkout:

- Catalog discovery returned 110 components; all 824 source-file entries across 112 variants passed SHA-256 verification.
- Searching for a like interaction returned `matte-like`; its actual HTML, CSS, controller and integration example were read.
- Both installed copies exported the Like button with a five-color violet palette. The two exports matched byte-for-byte.
- The six non-CSS files were unchanged, including JavaScript and the font. The original library CSS remained unchanged.
- Violet text contrast was 13.24:1 at rest, 10.76:1 on hover and 7.67:1 when selected, using the specified solid color tokens.
- Browser checks covered Like → Liked → Like, Enter, Space, twelve repeated clicks, settled labels, visible keyboard focus and a 390px viewport. No console warnings or errors were observed.

The browser interaction was performed on the exported example. The installed skill was read explicitly by the testing agent. Automatic selection from a fresh natural-language chat, ordinary ChatGPT web installation, platform certification and other browsers remain separate checks. Start a new task after installation to load the plugin.

## Privacy review

The final local release/template snapshot was scanned across 1,038 files, including 791 text files. No supported credential-token patterns, private-key blocks, personal machine paths or non-example email addresses were found. The PNG files contain no EXIF or embedded text metadata. The studio MP4 metadata contains format/encoder information, not personal identifiers. The public author identity and fictional demo names are intentional.

Component browser tests made no external requests. Plugin update endpoints and deliberately invalid URLs in security tests are separate from component behavior; no telemetry or download tracking has been activated. This is a local-content review, not a guarantee about historical remote Git objects, every possible secret encoding or external account access. Remote publication, hosting and release/update activation remain owner-controlled.
