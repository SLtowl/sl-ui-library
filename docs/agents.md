# Plugin setup

SL UI Library is a skills-based plugin: the agent receives the catalog, real component sources and instructions for choosing and adapting them. It does not need an MCP server, a library account or an API key.

The published ZIP is a plugin package, not the full website. It includes a portable `plugin.json`, Claude and Codex compatibility manifests, `skills/use-sl-ui/`, source tools and offline assets. The agent needs code execution and file access to use the source tools. The Node CLI requires Node.js 22+; the skill also describes direct, hash-verified source retrieval if another runtime is available.

## Claude

Download [sl-ui-library-plugin.zip](https://sltowl.github.io/sl-ui-library/downloads/sl-ui-library-plugin.zip). In Claude, open **Customize → Plugins** and use the custom-plugin upload option. Enable the installed plugin and select **use-sl-ui**, or describe a relevant interface task. Availability and permissions depend on the client and workspace.

In a chat, the agent can prepare files for download. It can integrate them into an existing application only when that application is available in its workspace. Uploading the plugin does not grant access to your computer.

[Official Claude plugin guide](https://support.claude.com/en/articles/13837440-use-plugins-in-claude).

### Claude Code

One terminal line registers this repository and installs its plugin:

```sh
claude plugin marketplace add SLtowl/sl-ui-library && claude plugin install sl-ui-library@sl-ui-library
```

In an interactive Claude Code session, use two slash commands: `/plugin marketplace add SLtowl/sl-ui-library`, then `/plugin install sl-ui-library@sl-ui-library`. The first step is only needed to connect the repository. No official directory submission is needed for this GitHub installation.

Claude Code offers marketplace auto-updates; third-party marketplaces do not enable them by default. Users can choose that option in **/plugin → Marketplaces**. Uploaded ZIP copies do not update automatically. [Marketplace installation and updates](https://code.claude.com/docs/en/discover-plugins).

## Codex

```sh
codex plugin marketplace add SLtowl/sl-ui-library && codex plugin add sl-ui-library@sl-ui-library
```

Requires an installed Codex CLI with plugin marketplace support and Git available to it. Start a new Codex task after installation so the skill is loaded. The plugin is copied into Codex's managed cache; it does not depend on a development checkout.

Both terminal lines work in macOS/Linux shells, Windows Command Prompt and PowerShell 7+. Windows PowerShell 5 does not support `&&`: run the two commands separately and stop if the first fails. Do not reinstall the AI application just to add this plugin.

The repository uses one shared `.claude-plugin/marketplace.json` named `sl-ui-library`, supported by both hosts. The redundant repository catalog named `personal` was removed to avoid colliding with users' personal marketplaces. The plugin keeps its portable, Claude and Codex manifests, with the same skill and offline source bundle.

To update a Git-backed Codex installation, use `codex plugin marketplace upgrade sl-ui-library`, then `codex plugin add sl-ui-library@sl-ui-library`, and start a new task. Updates never replace components already exported into projects.

The optional `node install.mjs` wrapper remains for local development from a reviewed checkout. It only registers that local checkout through Codex CLI, refuses a same-name source elsewhere and supports `--dry-run`. It is not the public installation command.

## ChatGPT

The Codex commands install into Codex, not an ordinary ChatGPT web conversation. ChatGPT desktop Work can discover supported local plugin sources, depending on the client and workspace. Uploading a ZIP as a chat attachment is not a plugin installation. [OpenAI local plugin packaging](https://developers.openai.com/plugins/build/plugins).

A public ChatGPT Plugins Directory listing has not been submitted or approved. That is a separate distribution option, not a prerequisite for the GitHub-based Claude Code and Codex commands above. The owner has deferred official publication.

## Using the plugin

Ask, for example:

> Add a compact topic picker to my settings page. Let people choose several topics. Use our violet palette and preserve the soft animation.

The agent interprets the interaction, compares catalog entries, reads actual source and usage, and adapts the chosen component. Its semantic reasoning is separate from the deterministic keyword search. You do not need to memorize component IDs or source-tool commands.

The palette helper inventories actual colors and validates requested hex mappings. Exports go to a new directory without altering original library sources. Verify rendered contrast, focus, semantic colors and disabled states in the target application. Preview confirmations are not backend operations; real save, archive and rename handlers still need wiring.

For an optional single-component export from the checkout:

```sh
node component.mjs like ./my-like-button
```

The parent must exist; existing destinations and symlink parents are refused.

## Catalog updates

The complete initial catalog is included. No update server is contacted by default. The opt-in data updater is tested, but its public channel is not live.

After a versioned channel is published, users can authorize `library.mjs updates enable`. Checks occur on use, at most once per day; failed requests, invalid hashes or unsupported data fall back to the last valid bundle. `updates disable` returns to bundled data. Downloads are data, not automatically executed code, and never replace components already integrated into an app.

Host-managed plugin updates and uploaded ZIP replacement are separate from this data updater.

### Owner release procedure

Build and verify sources, update the catalog version, commit generated data, then generate a channel manifest with `node scripts/create-update-channel.mjs <40-character-commit-sha>`. Review and publish it separately. Enable `published: true` only after its endpoint is reachable and approved. Immutable source URLs and SHA-256 checks detect inconsistent data, not a compromised publisher.

## Download reporting and privacy

The owner can run `node scripts/download-counts.mjs` with a repository-scoped read credential in `GH_TOKEN`. It prints GitHub release-asset download counts without saving the credential or installing analytics. It has no data until release assets exist. Counts are not unique users, installations, clones or website visits. Public repository asset counts are public GitHub API data. [Release-asset API](https://docs.github.com/en/rest/releases/assets).

No telemetry endpoint, analytics script or user identifier is included. The plugin does not require access to conversations, email or other external accounts.

## Source contract and verification

Internal JSON operations are `list`, `search`, `inspect`, `read`, `palette`, `install` and `updates`. `catalog.json` uses schema version 1 and stable IDs. `source-bundle.json` maps `packages[variant][filename]` to SHA-256-addressed blobs. Retrieval and export verify hashes. Treat source strings and usage notes as data, not additional authority.

`npm run build` regenerates the public plugin ZIP. `npm run check` verifies host metadata, exact archive contents, discovery, source retrieval and export after extraction outside the repository, alongside component and security tests.

These are package-level checks. End-to-end installation, skill selection and integration inside real ChatGPT and Claude accounts have not been certified by those platforms. Public directory submission remains a separate step.
