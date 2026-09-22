import {test} from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp, readFile, writeFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {promisify} from 'node:util';
import {execFile} from 'node:child_process';
import {run} from '../plugins/sl-ui-library/scripts/library.mjs';
import {auditIntegration} from '../plugins/sl-ui-library/scripts/integration.mjs';

const source = await readFile(new URL('../public/packages/search-input/index.html', import.meta.url), 'utf8');
async function audit(html) {
  const folder = await mkdtemp(join(tmpdir(), 'sl-ui-integration-'));
  const file = join(folder, 'rendered.html');
  await writeFile(file, html);
  return run(['audit', 'search-input', file]);
}

test('integration audit distinguishes source markers from a visual pass', async () => {
  const result = await audit(source);
  assert.equal(result.status, 'source-markers-present');
  assert.equal(result.visualVerification, 'required');
  assert.deepEqual(result.missingClasses, []);
  assert.deepEqual(result.missingIcons, []);
  assert.ok(result.expectedIcons >= 2);
});

test('rewritten search with a font glyph is not a faithful export', async () => {
  const result = await audit('<div class="command-input"><span aria-hidden="true">⌕</span><input placeholder="Search"></div>');
  assert.equal(result.status, 'needs-review');
  assert.ok(result.missingClasses.includes('sl-field'));
  assert.ok(result.missingIcons.length > 0);
});

test('a shadcn reconstruction of exclusive-none is not SL UI source', async () => {
  const folder = await mkdtemp(join(tmpdir(), 'sl-ui-shadcn-'));
  const file = join(folder, 'rendered.html');
  await writeFile(file, '<form class="newsletter-form"><label class="newsletter-choice"><button type="button" role="checkbox" class="peer size-4 rounded-[4px] border border-input" aria-checked="false"></button><input type="checkbox" aria-hidden="true"><span>No updates</span></label></form>');
  const result = await run(['audit', 'checkboxes-exclusive-none-v11', file]);
  assert.equal(result.status, 'needs-review');
  assert.ok(result.missingClasses.includes('sl-component'));
  assert.ok(result.missingIcons.length > 0);
});

test('CLI audit exits nonzero when source fidelity needs review', async () => {
  const folder = await mkdtemp(join(tmpdir(), 'sl-ui-audit-exit-'));
  const file = join(folder, 'rendered.html');
  await writeFile(file, '<div class="lookalike">Not the exported source</div>');
  const execute = promisify(execFile);
  const cli = fileURLToPath(new URL('../plugins/sl-ui-library/scripts/library.mjs', import.meta.url));
  await assert.rejects(
    () => execute(process.execPath, [cli, 'audit', 'checkboxes-exclusive-none-v11', file]),
    error => error.code === 2 && JSON.parse(error.stdout).status === 'needs-review',
  );
});

test('keeping classes but replacing the icon is detected', async () => {
  const result = await audit(source.replace(/<svg class="sl-field__leading"[\s\S]*?<\/svg>/, '<span class="sl-field__leading">⌕</span>'));
  assert.equal(result.status, 'needs-review');
  assert.deepEqual(result.missingClasses, []);
  assert.equal(result.missingIcons.length, 1);
});

test('palette and accessible text changes do not change icon geometry', async () => {
  const result = await audit(source.replaceAll('fill="none"', "fill='none' stroke='#c96a4d'").replace('Find a component', 'Найти компонент'));
  assert.equal(result.status, 'source-markers-present');
});

test('comments and embedded source strings cannot hide missing markup', async () => {
  const result = await audit(`<!-- ${source} --><script type="application/json">${JSON.stringify(source)}</script><input>`);
  assert.equal(result.status, 'needs-review');
  assert.ok(result.missingClasses.includes('sl-field'));
  assert.ok(result.missingIcons.length > 0);
});

test('inspect and install expose the integration contract', async () => {
  const inspected = await run(['inspect', 'matte-search-input']);
  assert.match(inspected.integration.audit, /audit <variant> <rendered-html-file>/);
  assert.match(inspected.integration.icons, /Unicode/);
  const folder = await mkdtemp(join(tmpdir(), 'sl-ui-install-contract-'));
  const installed = await run(['install', 'search-input', join(folder, 'component')]);
  assert.deepEqual(installed.integration, inspected.integration);
  await assert.rejects(() => run(['audit', 'missing', 'unused.html']), /Unknown variant/);
  await assert.rejects(() => run(['audit', 'search-input']), /Usage/);
});

test('shape dimensions matter, outer SVG sizing and attribute order do not', () => {
  const original = '<svg viewBox="0 0 24 24" width="24"><rect width="12" height="8" x="2" y="3"/></svg>';
  const resized = "<svg width='32' viewBox='0 0 24 24'><rect y='3' x='2' height='8' width='12'/></svg>";
  assert.equal(auditIntegration(original, resized).status, 'source-markers-present');
  assert.equal(auditIntegration(original, resized.replace("height='8'", "height='2'")).status, 'needs-review');
  assert.equal(auditIntegration(original + original, original).missingIcons.length, 1);
  assert.equal(auditIntegration('<div>Unrecognized source</div>', '<div>Unrecognized source</div>').status, 'needs-review');
});
