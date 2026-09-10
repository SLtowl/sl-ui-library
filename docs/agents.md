# Plugin setup

SL UI Library is a skills-based plugin: the agent receives the catalog, real component sources and instructions for choosing and adapting them. It does not need an MCP server, a library account or an API key.

The published ZIP is a plugin package, not the full website. It includes a portable `plugin.json`, Claude and Codex compatibility manifests, `skills/use-sl-ui/`, source tools and offline assets. The agent needs code execution and file access to use the source tools. The Node CLI requires Node.js 22+; the skill also describes direct, hash-verified source retrieval if another runtime is available.

## Claude

Download [sl-ui-library-plugin.zip](https://sltowl.github.io/sl-ui-library/downloads/sl-ui-library-plugin.zip). In Claude, open **Customize → Plugins** and use the custom-plugin upload option. Enable the installed plugin and select **use-sl-ui**, or describe a relevant interface task. Availability and permissions depend on the client and workspace.

In a chat, the agent can prepare files for download. It can integrate them into an existing application only when that application is available in its workspace. Uploading the plugin does not grant access to your computer.

[Official Claude plugin guide](https://support.claude.com/en/articles/13837440-use-plugins-in-claude).

### Claude Code

Add the repository marketplace and install its plugin:

```text
/plugin marketplace add SLtowl/sl-ui-library
/plugin install sl-ui-library@sl-ui-library
```

The repository contains `.claude-plugin/marketplace.json`; its entry points to `plugins/sl-ui-library/`. Both host manifests use the same skill and source data. The plugin remains self-contained when Claude copies it into its cache. Reload plugins or start a new session after installation.

Claude Code offers marketplace auto-updates; third-party marketplaces do not enable them by default. Users can choose that option in **/plugin → Marketplaces**. Uploaded ZIP copies do not update automatically; upload a newer package when needed. [Marketplace installation and updates](https://code.claude.com/docs/en/discover-plugins).

## ChatGPT

### Local desktop testing

In a ChatGPT desktop environment with **Work / Codex** and local projects:

1. Download and extract this repository, then open it as a project.
2. Restart the desktop app so it discovers the repository marketplace.
3. Open **Plugins**, choose the repository's **Personal** source and install **SL UI Library**.
4. Start a new task with the plugin enabled.

The existing repository marketplace is named `personal`; it is not the same as the user's global personal configuration. No setup script modifies that global marketplace directly. Local marketplace support varies by surface. It is not a way to install into ordinary ChatGPT on the web. [OpenAI local plugin packaging](https://developers.openai.com/plugins/build/plugins).

### Public directory status

**Not submitted or approved.** A public Install link for ChatGPT requires a separate skills-only submission and publication in the shared ChatGPT / Codex Plugins Directory. A GitHub repository or a ZIP attached to a conversation is not a directory installation.

The generated ZIP is the package for review. The owner still needs a verified developer identity, appropriate submission access, listing and policy information, host acceptance tests, and approval. No identity verification, policy attestation or terms acceptance is performed by the build. [OpenAI submission requirements](https://developers.openai.com/plugins/deploy/submission).

### Optional Codex CLI setup

From a downloaded, reviewed checkout with Node.js 22+ and Codex CLI:

```sh
node install.mjs
```

This wrapper only registers the local repository marketplace and installs the Codex plugin through the host CLI. It is not a universal installer. `node install.mjs --dry-run` previews the commands without changing configuration. A conflicting marketplace name stops the installer instead of overwriting another source.

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
