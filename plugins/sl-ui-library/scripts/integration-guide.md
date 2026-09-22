# Source-faithful integration

An export is source code, not a visual prompt. Keep the chosen component's HTML,
scoped CSS, inline SVGs, state hooks and controller together. Framework conversion
may change attribute syntax and lifecycle wiring; it must not silently replace
icons with font characters or redesign the control.

Using a component with similar behavior is not source integration. In particular,
rebuilding an SL UI checkbox with shadcn/Radix markup, a framework checkbox or a
native control is a replacement even when the labels and state rules match.

## Before adapting

1. Inspect and export the actual variant. Open its standalone example as a baseline.
2. Record the component ID, variant and SHA-256 values returned by `read`. This is
   the source receipt; without it, do not claim that SL UI source was used.
3. Preserve SVG `viewBox`, shape coordinates, paths, stroke rules and animation
   classes. A Unicode magnifier such as `⌕` is a font glyph, not the library icon;
   its size, baseline and shape depend on the host font.
4. Retain the scoped classes and wrapper relationships. Do not copy the demo's
   page-level `body` layout, global resets or preview-only controls into the app.
5. Map colors through component variables or local overrides. Preserve font assets
   and their URL resolution, or explicitly review the requested host-font change.

## Diagnose in the host app

Compare the rendered component subtree, loaded styles and computed geometry with
the export. Check host rules for `button`, `input`, `svg`, `path`, `:focus-visible`
and inherited fonts. A missing source class or substituted icon is an integration
deviation, not evidence that the source export is corrupt.

Compound inputs need one deliberate focus treatment. If the wrapper draws it,
avoid another outline/ring on the inner input. Do not remove focus globally:
keyboard focus must remain visible on the field, clear button and other controls.
Check border, outline, outline-offset and box-shadow separately: an offset outline
around an existing border can look like two nested frames even without a CSS
conflict. Give flex inputs `min-width: 0` and keep icon geometry from shrinking.

## Static check, then visual check

Serialize only the integrated component's rendered DOM subtree to an HTML file
using the host's available browser/debugging tools. Do not pass JSX, a screenshot,
or an entire app containing unrelated duplicate components.

```sh
node "<plugin>/scripts/library.mjs" audit <variant> <rendered-html-file>
```

The offline audit reports missing `sl-*` class names and unmatched inline SVG
geometry. It reads files without executing code or contacting the website.
`needs-review` requests investigation, not automatic overwriting. Intentional class
renames and equivalent path syntax can produce differences; compare them manually.
Runtime-generated icons need additional snapshots of their states. The command
prints its JSON findings and exits nonzero for `needs-review`, so automated agent
workflows cannot silently treat a mismatch as success.

`source-markers-present` is NOT a visual, accessibility or behavior pass. Styles
can still be missing or overridden, and a hidden copy can contain those markers.
Compare the real app at desktop and mobile widths, empty and filled, focused and
unfocused, disabled, long localized text, repeated open/close, keyboard navigation
and reduced motion. Review screenshots before claiming the transfer is fixed.

If only a deployed site is available, report the observed DOM/CSS evidence and
provide a scoped patch. Do not claim to have changed production without editing
and deploying its actual source. Library/plugin updates do not rewrite components
already integrated into another application.
