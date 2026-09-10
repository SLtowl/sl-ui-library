# Install once. Describe what you need.

From a downloaded, reviewed checkout, with Node.js 22+ and Codex CLI available:

```sh
node install.mjs
```

This single command registers the repository's local marketplace and installs the complete Codex plugin. It does not run downloaded shell scripts, copy components into your app, or change unrelated configuration. `node install.mjs --dry-run` shows the exact host commands without installing anything. If another marketplace already owns the configured name, installation stops instead of replacing it. Keep the checkout available for reinstalling, and start a new Codex task after installation.

Then ask normally:

> Add a compact topic picker to my settings page. Let people choose several topics. Use our violet palette and preserve the soft animation.

The agent interprets the interaction, finds a suitable real component, reads its source and usage, adapts the palette and connects it to your application. You do not need to know component IDs or memorize search commands. Selection is the agent's reasoning over the bundled catalog, not a remote embedding service or a guarantee of perfect autonomous integration.

## Only want one component?

The plugin is optional. From the checkout:

```sh
node component.mjs like ./my-like-button
```

This exports one complete HTML/CSS/JavaScript package to a new directory. The parent must exist; existing destinations and symlink parents are refused. Nothing executes automatically. The agent can choose the variant for you.

## Your palette, the same interaction

The agent can map library colors to your application's design tokens while preserving motion, icons and accessibility. The internal `palette` helper inventories actual colors; validated hex mappings can be applied during export. Original library files are unchanged. Rendered contrast, focus, semantic colors and disabled states still need verification; the installer does not claim any arbitrary palette is accessible.

## Updates

The entire initial catalog works offline. The bundled catalog does **not** contact an update server by default. The release includes a tested, opt-in data updater, but the public channel has not been published or enabled.

After the owner publishes a versioned channel, users may ask the agent to enable catalog updates. The agent runs `library.mjs updates enable` only with that authorization. Thereafter the next use checks at most once per 24 hours. Failed requests, invalid hashes and unsupported data fall back to the last valid local bundle. `updates disable` returns to bundled offline data. New source is downloaded as data and reviewed before integration; it is not executed by the updater.

These updates never overwrite components already integrated into an app. Plugin **code and skill** updates are separate, host-managed installs; the local Codex CLI supports marketplace refresh and reinstall, but this project does not promise silent automatic host-plugin upgrades. Start a new task after updating plugin code.

### Owner release checklist

Build and verify the new sources, increase the catalog version, commit the resulting catalog and source bundle, then generate a channel manifest with `node scripts/create-update-channel.mjs <40-character-commit-sha>`. It references immutable raw GitHub files and their SHA-256 hashes. Review and publish that manifest separately. Change `plugins/sl-ui-library/assets/update-policy.json` to `published: true` only when the public endpoint is reachable and the repository is approved for publication. Consumers must trust the publisher's GitHub account; hashes detect corruption and inconsistent files, not a compromised publisher.

## Downloads without visitor tracking

The owner can run `node scripts/download-counts.mjs` with a repository-scoped read credential in `GH_TOKEN`. It prints GitHub release-asset download counts locally and does not save the credential or install visitor analytics. The report has no data until real release assets exist. These are asset downloads, **not unique users, installations, Git clones or all website visits**. A local report is private, but public-repository asset counts themselves are public GitHub API data; a genuinely private installation counter would require an explicitly approved collection service.

The [GitHub release-asset API](https://docs.github.com/en/rest/releases/assets) exposes `download_count`. No telemetry endpoint, analytics script or user identifier is included in the plugin.

## Agent internals

The portable toolkit in `plugins/sl-ui-library/` includes its skill, scripts, catalog and complete content-addressed source bundle. It remains usable when copied out of this repository. Internal JSON operations are `list`, `search`, `inspect`, `read`, `palette`, `install` and `updates`; users normally do not operate them directly. Search matches every supplied keyword, so the agent selects concise terms and compares usage notes.

`catalog.json` uses schema version 1 and stable IDs. `source-bundle.json` maps `packages[variant][filename]` to SHA-256-addressed blobs. The CLI verifies source hashes before reading or writing files. Source strings and usage notes are data, not instructions to expand a task. Local demo feedback does not provide a backend: real save, archive, rename and navigation behavior must be connected and tested in the consuming app.

This is a Codex skill plus portable Node toolkit, not a published npm package, MCP service or universally supported plugin for every AI app. Publication and host installation are still separate user-authorized actions.
