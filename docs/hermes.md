# Install in Hermes Agent

SL UI Library can run as a **complete portable Agent Plugin** in Hermes. It is
not an MCP server: no MCP URL, credentials or Python tool bridge are needed.
The skill uses the bundled catalog and Node.js source CLI.

This guide covers the **Linux/POSIX-shell path tested with SL UI Library 1.2.1**
and Hermes `v0.21.6+131.g38880bd` (source revision `38880bd2`). It is not a claim
that every older Hermes release or every operating system supports these flags.
Check `hermes plugins install --help` and `hermes plugins doctor --help` first.
See the [Hermes plugin documentation](https://hermes-agent.nousresearch.com/docs/developer-guide/plugins/).

## Why install the whole package?

Keep `plugin.json`, host compatibility manifests, `skills/`, `scripts/` and
`assets/` together. The skill resolves its plugin root as its directory's
`../..`. Copying only `SKILL.md` does not supply the source tools and catalog.
The skills.sh route tested during this installation copied only that file;
this is an observation of that route, not a guarantee about future hub versions.
Codex and Claude installation commands register a plugin in their own host,
not in Hermes.

## Packaging issue and tested workaround

The pinned 1.2.1 source bundle is about 31.7 MB, almost entirely on one physical
JSON line. Hermes' regex-based security scan did not complete within a
540-second bounded installation attempt. Git had already fetched the package;
the last printed `Cloning` line did not mean a download was still running.

A formatting-only local copy completed the **unchanged full-plugin scanner**
in about 94 seconds with verdict **SAFE**. The report still contained medium
size/encoded-data findings; they were not suppressed. These are observations
from one machine, not a performance guarantee or a security certification.

The workaround below changes JSON whitespace, not its parsed data. It verifies
all bundled source hashes and retains the upstream license. It does **not**
patch Hermes, omit assets, truncate scan input, change severity rules or use
`--force`. Obtain the user's agreement to this local packaging adaptation.
If the normal security scan blocks the prepared package, stop and inspect its
report instead of bypassing it.

## Prepare a durable, reviewed local source

Prerequisites: an installed Hermes CLI with portable-plugin support, Node.js
22+, Git with sparse checkout, and a POSIX shell. No npm dependencies are
required. Review the pinned source before executing its validator or CLI.

Run these blocks in the same shell. Use a **new, absolute** source directory
outside temporary/cache storage: Hermes records its local Git URL for later
inspection. This recipe refuses to overwrite an existing source tree.

```sh
set -eu
export SL_UI_REF=2b0fd924f2a1223f2db6932f90a0ef065bac0424
export SL_UI_HERMES_SOURCE="${SL_UI_HERMES_SOURCE:-${XDG_DATA_HOME:-$HOME/.local/share}/sl-ui-library/hermes-1.2.1}"
export SL_UI_PACKAGE="$SL_UI_HERMES_SOURCE/package"
test ! -e "$SL_UI_HERMES_SOURCE"
mkdir -p "$SL_UI_HERMES_SOURCE"
git clone --depth 1 --filter=blob:none --no-checkout \
  https://github.com/SLtowl/sl-ui-library.git "$SL_UI_HERMES_SOURCE/upstream"
git -C "$SL_UI_HERMES_SOURCE/upstream" sparse-checkout init --cone
git -C "$SL_UI_HERMES_SOURCE/upstream" sparse-checkout set plugins/sl-ui-library
git -C "$SL_UI_HERMES_SOURCE/upstream" fetch --depth 1 origin "$SL_UI_REF"
git -C "$SL_UI_HERMES_SOURCE/upstream" checkout --detach "$SL_UI_REF"
cp -R "$SL_UI_HERMES_SOURCE/upstream/plugins/sl-ui-library" "$SL_UI_PACKAGE"
cp "$SL_UI_HERMES_SOURCE/upstream/LICENSE" "$SL_UI_PACKAGE/LICENSE"
```

Format only the source bundle, verify JSON-value equality and validate every
embedded source hash using the library's own validator. Store provenance
**beside**, not inside, the package.

```sh
node --input-type=module <<'NODE'
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {pathToFileURL} from 'node:url';

const root = process.env.SL_UI_PACKAGE;
assert(path.isAbsolute(root), 'SL_UI_PACKAGE must be absolute');
const bundlePath = path.join(root, 'assets/source-bundle.json');
const before = fs.readFileSync(bundlePath);
const bundle = JSON.parse(before);
const after = JSON.stringify(bundle, null, 2) + '\n';
assert.deepStrictEqual(JSON.parse(after), bundle);
const catalog = JSON.parse(fs.readFileSync(path.join(root, 'assets/catalog.json')));
const {validateData} = await import(pathToFileURL(path.join(root, 'scripts/updates.mjs')));
validateData(catalog, bundle);
fs.writeFileSync(bundlePath, after);
const sha256 = data => createHash('sha256').update(data).digest('hex');
fs.writeFileSync(path.join(process.env.SL_UI_HERMES_SOURCE, 'provenance.json'), JSON.stringify({
  upstream: 'https://github.com/SLtowl/sl-ui-library',
  upstreamRevision: process.env.SL_UI_REF,
  adaptation: 'JSON whitespace formatting only; upstream LICENSE included',
  originalBundleSha256: sha256(before),
  formattedBundleSha256: sha256(after),
}, null, 2) + '\n');
console.log('JSON values unchanged; all embedded source hashes verified.');
NODE
```

Create an immutable local Git source. The commit identity applies only to this
packaging commit; it does not change global Git settings or publish anything.

```sh
git -C "$SL_UI_PACKAGE" init --initial-branch=local-packaging
git -C "$SL_UI_PACKAGE" add -- \
  plugin.json .claude-plugin .codex-plugin skills scripts assets LICENSE
git -C "$SL_UI_PACKAGE" \
  -c user.name='Local Plugin Packaging' \
  -c user.email='local-packaging@localhost' \
  commit -m 'Package SL UI Library 1.2.1 with JSON formatting only'
SL_UI_LOCAL_REF="$(git -C "$SL_UI_PACKAGE" rev-parse HEAD)"
SL_UI_PACKAGE_URL="$(node --input-type=module -e \
  'import {pathToFileURL} from "node:url"; console.log(pathToFileURL(process.env.SL_UI_PACKAGE).href)')"
```

## Install through Hermes

Use the Hermes CLI for the **intended profile**. A local launcher can select a
custom home; do not assume that it uses `~/.hermes`, and do not install into a
different existing profile merely to test this guide.

```sh
hermes plugins doctor "$SL_UI_PACKAGE" --ci
hermes plugins install "$SL_UI_PACKAGE_URL" --ref "$SL_UI_LOCAL_REF" --enable
hermes plugins list
hermes plugins show sl-ui-library
hermes plugins doctor sl-ui-library --ci
```

`doctor` verifies runtime loading, not the security verdict. The normal
**installer** scans the full prepared package again before installation.
Allow it time to finish. The local/custom-source warning is expected for this
reviewed local copy; it does not mean the security scan is disabled.

The result should be version `1.2.1`, enabled, with a pinned local Git revision.
Hermes reported no required session restart for this portable package in the
tested setup. Verify skill discovery in your running client; if its list is
stale, use that client's supported refresh/new-session flow rather than
restarting a working gateway blindly. The tested qualified skill name was
`agent-plugin-sl-ui-library-57ad600a:use-sl-ui`; discover the actual name instead
of assuming namespace hashes are stable across host versions.

No tools or hooks is normal: the portable skill drives local source commands,
not newly registered MCP tools. If a previous incomplete hub copy of `use-sl-ui`
exists, remove only that copy with `hermes skills uninstall use-sl-ui` **after**
the packaged skill works. Do not remove an edited or unrelated skill.

## Verify the installed source tools

Set `SL_UI_INSTALLED` to the **Location printed by the installer/doctor**, not
the prepared source folder and not an assumed home directory. Then run:

```sh
node "$SL_UI_INSTALLED/scripts/library.mjs" inspect matte-text-input
node "$SL_UI_INSTALLED/scripts/library.mjs" read text-input buttons.js
node "$SL_UI_INSTALLED/scripts/library.mjs" install text-input \
  "$SL_UI_HERMES_SOURCE/smoke-text-input"
node "$SL_UI_INSTALLED/scripts/library.mjs" audit text-input \
  "$SL_UI_HERMES_SOURCE/smoke-text-input/index.html"
```

The export should include the complete vanilla/framework package, local font
and OFL notice. `source-markers-present` is a static source audit, **not** proof
of browser behavior or a finished app integration. The skill's read-source,
callback wiring, keyboard, visual and interaction checks still apply.

## Updates and removal

This is a locally adapted, pinned installation. It does **not** automatically
track GitHub main, and the library's opt-in data-update channel stays disabled.
Retain its durable local source and provenance. For an upgrade, review a new
upstream revision, prepare a new source directory and repeat validation and the
normal installation flow; do not silently swap its remote or unpin it.

Use `hermes plugins remove sl-ui-library` to remove the installed plugin through
its manager. This is separate from deleting your retained local source and
never removes components already exported into an application.

For maintainers: emitting a multiline source bundle in a future reviewed
release could avoid this particular packaging workaround. This guide does not
change the generator or claim that such a release has been published.
