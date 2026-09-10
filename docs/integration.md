# Use a component

1. Start the library with `npm start` and choose a category.
2. Open a component, try its states and read Usage.
3. Download its ZIP, or use the agent CLI to copy a complete variant.
4. Serve the extracted example over HTTP. Keep supporting JavaScript, fonts and `OFL.txt` together.
5. Adapt the markup, CSS variables and the controller initialization in `example.js` to your app.

Each package is an independent HTML/CSS/JavaScript example, not a framework-specific component. In React, Vue or similar frameworks, mount the controller after its DOM exists and call `destroy()` when removing it. Inspect the package's actual API; controllers are not all interchangeable.

## Example: project dialog

The `modal-overlay` package includes `index.html`, `buttons.css`, the entry scripts, `overlays.js`, `genie.js`, `pin.js`, preview support and the local font/license. `example.js` exposes the controller as `SLOverlayInstance`.

Use its `open()`, `close()`, `reset()` and `destroy()` methods. Listen for `overlaycommit` and read `event.detail`. Do not treat the demo's local confirmation as evidence of a successful server request. Connect your actual operation and show success only after it succeeds.

## Before shipping an integration

- Keep semantic controls, keyboard focus, labels and reduced-motion behavior.
- Verify repeat activation, cancellation and cleanup rather than just the first click.
- Render user-entered text as text, not HTML.
- Keep SVG icons and supporting modules; removing them can break motion or layout.
- Test your target viewport and browser. The release's automated browser evidence is from Chrome; it is not a cross-browser certification.
- Read the component's usage notes for clipboard, sharing, file and permission behavior.

The preview runtime (`preview-runtime.js`) is for the catalog showcase. You usually want the standalone package controller in an application, not the entire catalog renderer.
