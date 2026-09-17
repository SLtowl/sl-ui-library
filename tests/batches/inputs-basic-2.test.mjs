import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import { createServer } from 'node:http';
import { dirname, extname, join, resolve, sep } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import batch from '../../public/catalog-batches/inputs-basic-2.js';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const publicRoot = resolve(projectRoot, 'public');
const required = ['index.html', 'buttons.css', 'buttons.js', 'example.js', 'instrument-sans-variable.woff2', 'OFL.txt', 'LICENSE'];
const expected = ['username', 'slug', 'percentage', 'coordinates', 'semantic-version', 'ipv4', 'card-number', 'shortcut', 'search-replace', 'formula'];

test('second Inputs batch has ten distinct review entries', () => {
  assert.equal(batch.length, 10);
  assert.deepEqual(batch.map(entry => entry.variants[0].slice(7, -4)), expected);
  assert.equal(new Set(batch.map(entry => entry.id)).size, 10);
  for (const entry of batch) {
    assert.equal(entry.category, 'inputs');
    assert.match(entry.preview, /^\.\/packages\/inputs-[a-z0-9-]+-v11\/index\.html\?embed=1$/);
    assert.equal(entry.variants.length, 1);
    assert.equal(Object.keys(entry.downloads).length, 1);
  }
});

for (const entry of batch) {
  const variant = entry.variants[0];
  test(`${variant} is a complete, scoped and safe package`, async () => {
    const dir = resolve(publicRoot, 'packages', variant);
    for (const file of required) assert.ok((await stat(resolve(dir, file))).isFile(), `${file} missing`);
    const [html, css, js, example] = await Promise.all(['index.html', 'buttons.css', 'buttons.js', 'example.js'].map(file => readFile(resolve(dir, file), 'utf8')));
    assert.match(html, /<html lang="en">/);
    assert.match(html, new RegExp(`data-kind="${variant}"`));
    assert.match(html, /<input\b/);
    assert.doesNotMatch(html, /https?:\/\//);
    assert.match(css, /prefers-reduced-motion:reduce/);
    assert.match(css, /forced-colors:active/);
    assert.doesNotMatch(css, /(?:^|})\s*(?:input|button|svg|\*|:root)\s*\{/m);
    assert.match(js, /window\.SLComponent\s*=\s*\{\s*mount,\s*mountPreview\s*\}/);
    assert.match(js, /reset\(\)/);
    assert.match(js, /destroy/);
    assert.match(js, /sl:change/);
    assert.doesNotMatch(js, /\beval\s*\(|new Function|innerHTML|fetch\s*\(|XMLHttpRequest/);
    assert.match(example, /local input state only/);
    assert.match(example, /mountPreview/);
  });
}

test('input controllers pass browser interaction and lifecycle checks', { timeout: 90_000 }, async t => {
  if (process.env.SL_UI_BROWSER !== '1') return t.skip('Set SL_UI_BROWSER=1 to run the local browser checks.');
  const modulePath = process.env.SL_UI_PLAYWRIGHT || 'C:/Users/frsqu/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.js';
  const loaded = await import(pathToFileURL(modulePath));
  const chromium = loaded.chromium ?? loaded.default?.chromium;
  assert.ok(chromium, 'Chromium runtime unavailable');

  const mime = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.woff2': 'font/woff2', '.txt': 'text/plain; charset=utf-8' };
  const server = createServer(async (request, response) => {
    try {
      const pathname = decodeURIComponent(new URL(request.url, 'http://127.0.0.1').pathname);
      const file = resolve(publicRoot, pathname.replace(/^\/+/, ''));
      if (!(file === publicRoot || file.startsWith(publicRoot + sep))) return response.writeHead(403).end();
      response.writeHead(200, { 'Content-Type': mime[extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-store' }).end(await readFile(file));
    } catch { response.writeHead(404).end(); }
  });
  await new Promise(resolveReady => server.listen(0, '127.0.0.1', resolveReady));
  const port = server.address().port;
  const browser = await chromium.launch({ channel: process.env.SL_UI_BROWSER_CHANNEL || 'msedge', headless: true });
  const context = await browser.newContext({ viewport: { width: 360, height: 620 }, reducedMotion: 'no-preference' });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(String(error)));

  async function open(purpose) {
    await page.goto(`http://127.0.0.1:${port}/packages/inputs-${purpose}-v11/index.html`, { waitUntil: 'load' });
    await page.evaluate(() => { window.field = SLComponent.mount(document.querySelector('.sl-component')); });
    const bounds = await page.locator('.sl-component').evaluate(root => { const box = root.getBoundingClientRect(); return { width: box.width, left: box.left, right: box.right, scroll: document.documentElement.scrollWidth }; });
    assert.ok(bounds.width <= 320 && bounds.left >= 0 && bounds.right <= 360 && bounds.scroll <= 360, `${purpose} overflowed`);
  }
  const state = () => page.evaluate(() => window.field.state);

  try {
    await open('username'); await page.getByRole('textbox', { name: 'Username', exact: true }).fill('ab'); assert.equal((await state()).valid, false); await page.getByRole('textbox', { name: 'Username', exact: true }).fill('studio.line'); assert.equal((await state()).valid, true);
    await open('slug'); await page.getByLabel('Page slug').fill('Моя новая страница!'); await page.getByRole('button', { name: 'Normalize' }).click(); assert.equal((await state()).value, 'моя-новая-страница');
    await open('percentage'); await page.getByLabel('Completion percentage').fill('115'); assert.equal((await state()).valid, false); await page.getByLabel('Completion percentage').fill('75'); assert.equal((await state()).value, 75);
    await open('coordinates'); await page.getByLabel('Latitude').fill('-91'); assert.equal((await state()).valid, false); await page.getByLabel('Latitude').fill('-33.8688'); assert.equal((await state()).value.lat, -33.8688);
    await open('semantic-version'); await page.getByRole('button', { name: 'Next patch' }).click(); assert.deepEqual((await state()).value, [2, 4, 8]);
    await open('ipv4'); await page.getByLabel('Octet 4').fill('999'); assert.equal((await state()).valid, false); await page.getByLabel('Octet 4').fill('8'); assert.equal((await state()).address, '192.168.1.8');
    await open('card-number'); await page.getByRole('textbox', { name: 'Card number', exact: true }).fill('4242424242424242'); assert.equal((await state()).valid, true);
    await open('shortcut'); await page.getByRole('button', { name: 'Record shortcut' }).click(); await page.getByRole('button', { name: 'Listening…' }).press('Control+Shift+P'); assert.equal((await state()).value, 'Ctrl + Shift + P');
    await open('search-replace'); await page.getByRole('button', { name: 'Replace locally' }).click(); assert.match((await state()).text, /Good movement/);
    await open('formula'); await page.getByRole('textbox', { name: 'Formula', exact: true }).fill('10 / (5 - 5)'); assert.equal((await state()).valid, false); await page.getByRole('textbox', { name: 'Formula', exact: true }).fill('10 / 2 + 3'); assert.deepEqual(await state(), { expression: '10 / 2 + 3', value: 8, valid: true });

    for (const purpose of expected) {
      await open(purpose);
      const result = await page.evaluate(() => {
        const root = document.querySelector('.sl-component');
        const before = JSON.stringify(field.state); field.reset(); field.reset();
        const stable = before === JSON.stringify(field.state);
        field.destroy(); field.destroy();
        const disabled = SLComponent.mount(root, { disabled: true });
        const allDisabled = [...root.querySelectorAll('input,button')].every(node => node.disabled);
        disabled.destroy();
        return { stable, allDisabled, statuses: root.querySelectorAll('.sl-status').length };
      });
      assert.deepEqual(result, { stable: true, allDisabled: true, statuses: 0 }, purpose);
    }
    await open('percentage'); await page.emulateMedia({ reducedMotion: 'reduce' });
    assert.equal(await page.locator('.sl-control').evaluate(node => getComputedStyle(node).transitionDuration), '0s');
    assert.deepEqual(errors, []);
  } finally {
    await context.close(); await browser.close(); await new Promise(resolveClose => server.close(resolveClose));
  }
});
