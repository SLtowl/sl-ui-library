# SL UI Library

An AI plugin for finding and integrating UI components, with a browsable HTML, CSS and JavaScript library.

![Graphite SL UI Library controls in a warm studio composition](docs/media/cover.png)

**110 interactive components** in HTML, CSS and JavaScript. No runtime dependencies, remote fonts or stock icon libraries. Preview components and download their source files. The plugin helps a coding agent find and integrate components.

[Open the library](https://sltowl.github.io/sl-ui-library/) · [Install the plugin](#plugin-installation) · [Components](#components) · [Integration guide](docs/integration.md) · [Quality notes](QA.md) · [MIT License](LICENSE)

## Component demos

[![Cursor-free 3D studio film of real component interactions](docs/media/studio-motion.gif)](https://sltowl.github.io/sl-ui-library/media/studio-motion.mp4)

The demo shows saving, liking, theme switching, rating and tab navigation. It uses the library's components with CSS 3D styling. No cursor.

[Watch / download MP4](https://sltowl.github.io/sl-ui-library/media/studio-motion.mp4) · [WebM](https://sltowl.github.io/sl-ui-library/media/studio-motion.webm) · [Live 3D scene](https://sltowl.github.io/sl-ui-library/studio-motion.html) · [Interactive showcase](https://sltowl.github.io/sl-ui-library/showcase.html)

Studio photography is generated artwork; the film uses library components with CSS 3D styling.

## Components

<p align="center"><img src="docs/media/collection.png" width="240" alt="Buttons 10, Inputs 10, Toggles 10, Checkboxes 25, Sliders 20, Menus 15, Navigation 10, Overlays 10"></p>



110 components, 112 export variants. Save & Cancel is available together or separately. Feedback and Data display are reserved for later versions: **Nothing added yet**.

## Plugin installation

Install directly from this GitHub repository. No official marketplace listing or library account is required.

### Claude Code

Paste this line into a terminal with Claude Code installed:

```sh
claude plugin marketplace add SLtowl/sl-ui-library && claude plugin install sl-ui-library@sl-ui-library
```

Inside a Claude Code chat, run the same setup as two slash commands:

```text
/plugin marketplace add SLtowl/sl-ui-library
/plugin install sl-ui-library@sl-ui-library
```

### Codex

Paste this line into a terminal with Codex installed:

```sh
codex plugin marketplace add SLtowl/sl-ui-library && codex plugin add sl-ui-library@sl-ui-library
```

These one-line commands work in macOS/Linux shells, Windows Command Prompt and PowerShell 7+. In Windows PowerShell 5, run the two commands separately; continue only if the first succeeds. They register the repository and install the plugin through the application's own plugin manager. They do not install the AI application or copy buttons into your projects.

Start a new task after installation. Then ask, for example:

> Add a like button from SL UI Library. Use a violet background and light text, and keep its animation and keyboard interaction.

The agent selects a component, reads its bundled HTML, CSS and JavaScript, and exports it with the requested palette. The complete catalog works offline after installation. The bundled source CLI requires Node.js 22+.

### Claude and ChatGPT without a terminal

**Claude:** [download the plugin ZIP](https://sltowl.github.io/sl-ui-library/downloads/sl-ui-library-plugin.zip) and use **Customize → Plugins** to upload a custom plugin, where supported.

**ChatGPT web:** the terminal commands above do not install into an ordinary chat. A public ChatGPT Install link is not available yet; official directory publication is planned separately. Codex installation works without that publication.

[Platform setup, supported clients and updates](docs/agents.md) · [Claude Code plugin documentation](https://code.claude.com/docs/en/discover-plugins) · [OpenAI plugin documentation](https://developers.openai.com/plugins/build/plugins)

<details>
<summary>Only need one component?</summary>

From a downloaded repository:

```sh
node component.mjs like ./my-button
```

This exports one complete example to a new folder. Its parent must exist; existing destinations and symlink parents are refused. Source files are verified before writing.

</details>

### Catalog updates

An opt-in data updater is prepared for the release channel. Once published and enabled by the user, it checks for a newer catalog on use, at most once per day, with an offline fallback. Existing components in your app are never silently replaced. Plugin code and skill updates remain host-managed.

**Update status:** the public update channel is not live. No telemetry is enabled. Owner-only release-download reporting is provided as a local tool, not a tracker; asset downloads are not unique installations. See the [update and metrics details](docs/agents.md).

## Component integration

Each component archive includes HTML, CSS, JavaScript, an integration example and local assets. Its Usage notes describe how to add it to your project and connect action handlers.

Archive, rename and creation demos only change preview state. In production, show success after your own operation succeeds. User-entered names remain literal text, including Unicode; action labels stay English.

## Library website

This repository contains the complete static library. GitHub stores the source; GitHub Pages serves the public website. Visitors to a hosted version will not need terminal commands or Node.js.

The site is published from `public/` by the [Pages workflow](https://github.com/SLtowl/sl-ui-library/actions/workflows/pages.yml). Check its latest deployment before sharing the website; a failed run means the site has not been updated.

<details>
<summary>For developers: run a local copy</summary>

Requires Node.js 22 or newer. From the repository:

```sh
npm start
```

This builds the exports and starts a local server. Open `http://127.0.0.1:4321/` on the same computer. No dependency installation is required. Use HTTP, not a double-clicked HTML file.

</details>

## Repository structure

```text
public/                 Interactive site and component source
  packages/             Self-contained component examples
plugins/sl-ui-library/  Portable plugin, host manifests, skill and source tools
docs/                   Guides, studio photography and film
tests/                  Automated checks
install.mjs             Optional Codex CLI installer
component.mjs           Optional single-component export
```

Edit component sources in `public/packages/` and metadata in `public/catalog-data.js`, then run `npm run build` and `npm run check`. Commit source and tracked generated data together. ZIP exports are regenerated by build/start rather than duplicated in Git history. See [contributing](CONTRIBUTING.md).

## Checks and limitations

- Project-owned SVG icons and bundled fonts.
- Keyboard interaction, visible focus and reduced-motion support.
- Repeated interaction and reset checks.
- Source, ZIP export and agent bundle consistency checks.
- No analytics scripts or tracking pixels.

See [QA evidence and limitations](QA.md). Chrome is the current automated browser target; Firefox, Safari and physical touch devices still need a separate release check.

![Graphite rating, topic chips, pin and volume studio composition](docs/media/studio.png)

Cover, collection table and closing image: generated studio artwork. Film: actual controls with a 3D presentation layer. [Media provenance](docs/media.md).

## Release status

[SLtowl/sl-ui-library](https://github.com/SLtowl/sl-ui-library) is public. The plugin archive and Claude Code repository marketplace are available. A public ChatGPT Plugins Directory listing has not been submitted or approved. No analytics collection is enabled.

## License

The library and agent plugin are licensed under the [MIT License](LICENSE). You can use, modify and redistribute the code, including in commercial projects, provided you retain the copyright and license notices.

The bundled Instrument Sans font is licensed separately under the SIL Open Font License 1.1. Its [OFL notice](public/packages/like/OFL.txt) remains included with component downloads.
