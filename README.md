# SL UI Library

Handcrafted controls. Considered motion. Ready for people and agents.

![Graphite SL UI Library controls in a warm studio composition](docs/media/cover.png)

**110 interactive components** in HTML, CSS and JavaScript. No runtime dependencies, remote fonts or stock icon libraries. Try the controls, inspect their actual source and bring them into your project — or let your agent do it.

[Install the plugin](#install-once-describe-what-you-need) · [The collection](#the-collection) · [Integration guide](docs/integration.md) · [Quality notes](QA.md)

## Small details. Real interactions.

[![Cursor-free 3D studio film of real component interactions](docs/media/studio-motion.gif)](docs/media/studio-motion.mp4)

Buttons press themselves, switches change state and stars fill smoothly. Actual library controllers, presented on raised graphite surfaces with CSS 3D perspective. No cursor.

[Watch / download MP4](docs/media/studio-motion.mp4) · [WebM](docs/media/studio-motion.webm) · [Live 3D scene](http://127.0.0.1:4321/studio-motion.html) · [Interactive showcase](http://127.0.0.1:4321/showcase.html)

The localhost links work after starting your own copy. A public demo is not deployed during private review. Studio photography is generated artwork; the film uses real controls with a presentation-only 3D treatment.

## The collection

<p align="center"><img src="docs/media/collection.png" width="240" alt="Buttons 10, Inputs 10, Toggles 10, Checkboxes 25, Sliders 20, Menus 15, Navigation 10, Overlays 10"></p>



110 components, 112 export variants. Save & Cancel is available together or separately. Feedback and Data display are reserved for later versions: **Nothing added yet**.

## Install once. Describe what you need.

From a downloaded, reviewed checkout, with Node.js 22+ and Codex CLI available:

```sh
node install.mjs
```

Then ask normally:

> Add a project-creation dialog from SL UI Library. Match my app’s midnight-blue palette, keep the soft motion and connect it to my create-project action.

The agent reads the catalog, chooses a component by purpose, retrieves its actual HTML, CSS and JavaScript, and adapts the colors. Command-line details stay behind the scenes. Integration and contrast still need verification in your application.

<details>
<summary>Only need one component?</summary>

```sh
node component.mjs like ./my-button
```

This exports one complete example to a new folder. Its parent must exist; existing destinations and symlink parents are refused. Source files are verified before writing.

</details>

The complete initial catalog works offline. Other coding agents can use the same portable source tools. See the [agent guide](docs/agents.md) for host setup, palette handling and internals.

### Fresh components, without overwriting your work

An opt-in data updater is prepared for the release channel. Once published and enabled by the user, it checks for a newer catalog on use, at most once per day, with an offline fallback. Existing components in your app are never silently replaced. Plugin code and skill updates remain host-managed.

**Private review:** the public update channel is not live. No telemetry is enabled. Owner-only release-download reporting is provided as a local tool, not a tracker; asset downloads are not unique installations. See the [update and metrics details](docs/agents.md).

## Real source. Your application.

Each export includes its HTML, CSS, JavaScript controller, an integration example and local assets. Try the behavior, read its Usage notes, then connect actions to your application.

Archive, rename and creation demos only change preview state. In production, show success after your own operation succeeds. User-entered names remain literal text, including Unicode; action labels stay English.

## The library is a website, too

This repository contains the complete static library. GitHub stores the source; GitHub Pages can serve it as a website after deployment. Visitors to a hosted version will not need terminal commands or Node.js.

**No public demo has been deployed.** The prepared Pages workflow is manual and refuses to run while this repository is private. Hosting and the final demo URL will be configured after review.

<details>
<summary>For developers: run a local copy</summary>

Requires Node.js 22 or newer. From the repository:

```sh
npm start
```

This builds the exports and starts [the local library](http://127.0.0.1:4321/). No dependency installation is required. Use HTTP, not a double-clicked HTML file.

</details>

## One repository, two ways to build

```text
public/                 Interactive site and component source
  packages/             Self-contained component examples
plugins/sl-ui-library/  Agent skill, catalog and source tools
docs/                   Guides, studio photography and film
tests/                  Automated checks
install.mjs             Whole-plugin setup
component.mjs           Optional single-component export
```

Edit component sources in `public/packages/` and metadata in `public/catalog-data.js`, then run `npm run build` and `npm run check`. Commit source and tracked generated data together. ZIP exports are regenerated by build/start rather than duplicated in Git history. See [contributing](CONTRIBUTING.md).

## Care, down to the details

- Project-owned SVG icons and bundled fonts.
- Keyboard interaction, visible focus and reduced-motion support.
- Repeated interaction and reset checks.
- Source, ZIP export and agent bundle consistency checks.
- No analytics scripts or tracking pixels.

See [QA evidence and limitations](QA.md). Chrome is the current automated browser target; Firefox, Safari and physical touch devices still need a separate release check.

![Graphite rating, topic chips, pin and volume studio composition](docs/media/studio.png)

Cover, collection table and closing image: generated studio artwork. Film: actual controls with a 3D presentation layer. [Media provenance](docs/media.md).

## Release status and licensing

[SLtowl/sl-ui-library](https://github.com/SLtowl/sl-ui-library) is in private review. No public site, marketplace publication or analytics collection has been enabled. Publication requires the owner's approval.

No code license has been selected; private access is not an open-source license. Instrument Sans includes its OFL license.
