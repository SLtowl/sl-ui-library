import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFile, mkdtemp, mkdir, writeFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join, dirname} from 'node:path';
import {promisify} from 'node:util';
import {execFile} from 'node:child_process';
import {pluginFiles} from '../build-plugin.mjs';

const root = new URL('../', import.meta.url);
test('portable and host manifests identify the same self-contained plugin', async () => {
 const portable = JSON.parse(await readFile(new URL('plugins/sl-ui-library/plugin.json', root)));
 for (const host of ['.claude-plugin', '.codex-plugin']) {
  const manifest = JSON.parse(await readFile(new URL('plugins/sl-ui-library/' + host + '/plugin.json', root)));
  assert.equal(manifest.name, portable.name);
  assert.equal(manifest.version, portable.version);
  assert.ok(manifest.description.length > 20);
 }
 const marketplace = JSON.parse(await readFile(new URL('.claude-plugin/marketplace.json', root)));
 assert.equal(marketplace.name, 'sl-ui-library');
 assert.equal(marketplace.plugins[0].source, './plugins/' + portable.name);
 const files = await pluginFiles();
 for (const name of ['skills/use-sl-ui/SKILL.md','scripts/library.mjs','scripts/updates.mjs','assets/catalog.json','assets/source-bundle.json','assets/update-policy.json']) assert.ok(files.has(name), name);
 assert.equal(JSON.parse(files.get('assets/update-policy.json')).published, false);
 assert.ok(!files.has('.mcp.json') && !files.has('hooks/hooks.json'));
});
test('downloadable plugin contains only exact package files and runs after extraction', async () => {
 const expected = await pluginFiles();
 const bytes = await readFile(new URL('public/downloads/sl-ui-library-plugin.zip', root));
 const temp = await mkdtemp(join(tmpdir(), 'sl-ui-plugin-zip-'));
 const plugin = join(temp, 'plugin');
 const names = new Set();
 let offset = 0;
 while (bytes.readUInt32LE(offset) === 0x04034b50) {
  assert.equal(bytes.readUInt16LE(offset + 8), 0);
  const size = bytes.readUInt32LE(offset + 18), length = bytes.readUInt16LE(offset + 26), extra = bytes.readUInt16LE(offset + 28);
  const name = bytes.subarray(offset + 30, offset + 30 + length).toString();
  assert.ok(expected.has(name) && !names.has(name), name);
  assert.ok(!name.startsWith('/') && !name.includes('..') && !name.includes('\\\\'));
  names.add(name);
  const start = offset + 30 + length + extra, content = bytes.subarray(start, start + size);
  assert.deepEqual(content, expected.get(name), name);
  const destination = join(plugin, name);
  await mkdir(dirname(destination), {recursive:true});
  await writeFile(destination, content, {flag:'wx'});
  offset = start + size;
 }
 assert.equal(names.size, expected.size);
 const execute = promisify(execFile);
 const cli = join(plugin, 'scripts', 'library.mjs');
 const call = async (...args) => JSON.parse((await execute(process.execPath, [cli, ...args], {cwd:temp})).stdout);
 assert.ok((await call('search', 'dialog')).components.some(c => c.id === 'matte-modal-overlay'));
 assert.equal((await call('inspect', 'matte-modal-overlay')).variants[0], 'modal-overlay');
 assert.ok((await call('read', 'modal-overlay', 'buttons.js')).content.length > 100);
 assert.ok((await call('palette', 'like')).colors.length > 0);
 assert.equal((await call('install', 'like', join(temp, 'like'))).installed, true);
});
