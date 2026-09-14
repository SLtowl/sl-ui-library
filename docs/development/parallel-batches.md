# Parallel component batches

## Scope and ownership

The owner approved the existing 130 components, including Feedback and Data display. Add ten new, distinct components in your assigned category for local review. Do not merely rename or recolor existing components. Inspect the existing category before selecting ten useful interaction patterns. Keep neutral charcoal surfaces and gray highlights, Instrument Sans typography, fine inline SVG outlines and restrained, reversible motion. The owner's September 15 review replaces the original sage theme; meaningful status, chart and color-picker sample colors are separate from UI theme colors.

Each category task owns only:

- New folders matching `public/packages/<category>-<purpose>-v11/` (use `selection` for Toggles and `data-display` for Data display).
- Its `public/catalog-batches/<category>.js` manifest.
- Its `tests/batches/<category>.test.mjs` tests and `docs/development/reports/<category>.md` handoff.

Do not edit existing packages, other manifests, shared catalog/runtime/build files, generated bundles, root documentation, configuration or version numbers. Report shared problems to the coordinator. Work in the task's isolated worktree. Do not create further tasks, publish, push, install personal plugins or change model/speed settings. The coordinator builds generated data, integrates commits and performs final browser QA.

## Export and preview contract

Every new package is self-contained, offline and framework-free. Include `index.html`, `buttons.css`, `buttons.js`, `example.js`, `instrument-sans-variable.woff2`, `OFL.txt` and `LICENSE`. Copy the existing font and license from an approved package; use the repository MIT license. Do not import files outside the package or use external icon libraries, remote fonts, tracking, dynamic script loading or image-based glyphs.

`index.html` must have `lang="en"`, viewport metadata, stylesheet and deferred scripts in the head. The body contains one `.sl-component` root with a unique `data-kind` and its complete, immediately visible markup. Head-only page centering styles may style `body`; exported `buttons.css` scopes component rules under `.sl-component` or a category-specific class. No global `button`, `input`, `svg`, `:root` or `*` styling that could affect a host app. Place font-face in `buttons.css`; the compiler removes and shares it in the library.

The compiler expects the controller wrapper below. Put all helpers inside the IIFE. Avoid module imports/exports or extra trailing executable code in `buttons.js`.

```js
(() => {
  'use strict';
  function mount(root, options = {}) {
    // Resolve elements relative to root. Keep state private to this instance.
    // Return the documented controller with reset(), destroy() and state.
  }
  function mountPreview(root) {
    // Explicit local demonstration; delegates to mount().
    return mount(root);
  }
  window.SLComponent = { mount, mountPreview };
})();
```

`example.js` calls `SLComponent.mountPreview(document.querySelector('.sl-component'))` and explains how application code uses `mount(root, options)`. Normal `mount()` must never fake an external operation's success. For asynchronous operations accept a real callback with an AbortSignal, handle success/rejection/cancellation and implement only the demo callback in `mountPreview()`. Label the demonstration honestly. Use no network requests in the preview. Pure local selections need no fake promises.

Use root-relative queries and `root.getRootNode().activeElement` so multiple Shadow DOM previews work. Do not store controllers, mutable state or document-wide IDs globally. Lifecycle methods must be repeat-safe: reset restores every visual/ARIA value, destroy removes listeners, timers, RAF and observers. Fast repeat activation must not stack animations, leak listeners, duplicate work or leave stale success states. Avoid arbitrary delays before useful content appears.

The new preview adapter mounts `.sl-component` directly into the card's Shadow DOM. It calls `mountPreview()` when supplied and `mount()` otherwise. The preview is 510px tall. Account for the reset button at the upper right and the separate component-page title in the first 52px. Root width is at most 320px and can shrink to 226px at a 320px browser viewport. Keep all essential controls and expanded states within the preview; use intentional inner scrolling for long content. Do not hide overflow to conceal unreachable buttons. Overlay components must stay within their own root, never cover the entire library or trap focus in another card. Use local backdrops, accessible focus management and Escape/return-focus behavior; no legacy genie effect or viewport-wide native dialog. The standalone example must remain fully usable too.

## Manifest

Export an array of ten complete catalog objects from your category module. Use literal data, not runtime DOM code. Follow the existing catalog fields:

```js
export default [{
  id: 'matte-buttons-example-v11', category: 'buttons', name: 'Example action',
  description: 'A concise factual description of the interaction.',
  motions: ['Soft press'], variants: ['buttons-example-v11'],
  keywords: ['action', 'example'],
  page: './component.html?component=matte-buttons-example-v11',
  preview: './packages/buttons-example-v11/index.html?embed=1',
  packageRoot: './packages/',
  downloads: { 'buttons-example-v11': './downloads/matte-buttons-example-v11.zip' },
  usage: [
    { title: 'Use the component', paragraphs: ['Specific integration instructions.'] },
    { title: 'Controller', paragraphs: ['Exact methods, options, events and return values.'] },
    { title: 'Appearance', paragraphs: ['The actual CSS variables and accessibility behavior.'] }
  ]
}];
```

## Quality requirements

- All public code, labels, examples, descriptions and handoff documentation are English. Runtime user text may be Unicode and must remain literal via text-safe DOM APIs. Do not inject user values using innerHTML.
- Reuse the real design language: neutral gray highlights, charcoal surfaces, fine borders and small shadows, readable labels. Do not tint general text, controls or surfaces green. Preserve semantic colors only where they communicate data or status. No marketing slogans, oversized headings, gratuitous cards, stock grid-of-four icons, raster glyphs or thick hover outlines.
- Expose semantic palette CSS variables. Check text, icons, focus, disabled and selected states after recoloring. Do not rely on color alone.
- Use semantic buttons and inputs, associated labels, correct expanded/pressed/selected/checked values and visible focus. Implement keyboard patterns appropriate to the widget, including Escape where relevant. Closed controls must be unfocusable. Do not disable text selection inside editable fields or useful copyable data.
- Smooth both directions; rapid reversal must continue from the current state. Prefer transform/opacity and bounded layout animation. No delayed icon loading, black icon backgrounds, flashing on repeated clicks or stacked outlines.
- Respect prefers-reduced-motion in CSS and JavaScript, including changes while mounted. Keep actions immediate when motion is reduced. Never use decorative perpetual motion.
- Keep numerical values and displayed units accurate; enforce boundaries, min/max and disabled cases. Data examples must have coherent totals and labeled scales.
- Test isolated instances, reset, repeated mount/destroy, repeat activation, keyboard, expanded content, narrow width and reduced motion. Include a palette adaptation check. Do not claim browser testing if unavailable; provide exact limitations.

## Local verification and handoff

Run syntax checks on every added JavaScript file and `node --test tests/batches/<category>.test.mjs`. Add meaningful automated tests for the ten package contracts and important controller behavior. Browser checks are strongly preferred when an approved tool/runtime is available; the coordinator will independently test all mini-previews.

`npm run build` may be used to preview your work in your worktree, but do not commit generated bundles; shared legacy tests still contain baseline count assertions and the coordinator updates them only after integration. Never weaken or remove tests to get a pass. Restrict staged changes to your owned paths.

Finish by committing only your owned source, manifest, tests and handoff files. Report commit SHA, the ten component names, tests and their actual results, known limitations, and any integration issues. The report must describe meaningful interaction behavior, not just that files exist. Do not call work complete with known broken primary interactions.
