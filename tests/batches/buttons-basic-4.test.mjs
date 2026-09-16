import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { createServer } from 'node:http';
import { once } from 'node:events';
import { pathToFileURL } from 'node:url';
import { Script } from 'node:vm';
import batch from '../../public/catalog-batches/buttons-basic-4.js';

const project = new URL('../../', import.meta.url);
const files = ['index.html', 'buttons.css', 'buttons.js', 'example.js', 'instrument-sans-variable.woff2', 'OFL.txt', 'LICENSE'];
const variants = batch.map(item => item.variants[0]);
const expected = [
  ['buttons-cart-toggle-v11', 'cartState', 'empty', 'added', 'setCartState'],
  ['buttons-archive-toggle-v11', 'archiveState', 'active', 'archived', 'setArchiveState'],
  ['buttons-task-complete-v11', 'taskState', 'open', 'done', 'setTaskState'],
  ['buttons-schedule-toggle-v11', 'scheduleState', 'clear', 'scheduled', 'setScheduleState'],
  ['buttons-compare-toggle-v11', 'compareState', 'single', 'compared', 'setCompareState'],
  ['buttons-new-folder-v11', 'folderState', 'empty', 'created', 'setFolderState'],
  ['buttons-comment-toggle-v11', 'commentState', 'none', 'added', 'setCommentState'],
  ['buttons-translate-toggle-v11', 'language', 'english', 'russian', 'setLanguage'],
  ['buttons-tag-toggle-v11', 'tagState', 'untagged', 'tagged', 'setTagState'],
  ['buttons-photo-toggle-v11', 'photoState', 'empty', 'added', 'setPhotoState']
];
const read = (variant, file) => readFile(new URL(`public/packages/${variant}/${file}`, project), 'utf8');

test('fourth basic buttons review batch has ten distinct, complete and offline packages', async () => {
  assert.deepEqual(variants, expected.map(item => item[0]));
  assert.equal(new Set(batch.map(item => item.id)).size, 10);
  const released = await readFile(new URL('public/catalog-data.js', project), 'utf8');
  for (const [variant] of expected) assert.doesNotMatch(released, new RegExp(variant));
  for (const item of batch) {
    const variant = item.variants[0];
    assert.equal(item.category, 'buttons');
    assert.equal(item.downloads[variant], `./downloads/matte-${variant}.zip`);
    assert.equal(item.usage.length, 3);
    assert.deepEqual((await readdir(new URL(`public/packages/${variant}/`, project))).sort(), [...files].sort());
    const [html, css, js, example] = await Promise.all(['index.html', 'buttons.css', 'buttons.js', 'example.js'].map(file => read(variant, file)));
    assert.match(html, /<html lang="en">/);
    assert.equal((html.match(/class="sl-component"/g) || []).length, 1);
    assert.equal((html.match(/data-action/g) || []).length, 1);
    assert.doesNotMatch(html.split('<body>')[1], /<script/);
    assert.match(css, /@font-face/);
    assert.match(css, /prefers-reduced-motion/);
    assert.match(css, /forced-colors/);
    assert.match(css, /:focus-visible/);
    assert.match(css, /--action-surface/);
    assert.doesNotMatch(css, /(?:^|\n)\s*(?:button|input|svg|:root|\*)\s*\{/);
    assert.doesNotMatch(js, /innerHTML|insertAdjacentHTML|document\.activeElement|fetch\(|XMLHttpRequest|localStorage/);
    assert.match(js, /root\.getRootNode\(\)\.activeElement/);
    assert.match(js, /window\.SLComponent = \{ mount, mountPreview \}/);
    assert.match(js, /reset\(\)/);
    assert.match(js, /destroy\(\)/);
    assert.match(example, /SLComponent\.mountPreview/);
    assert.doesNotMatch(html + css + js + example, /https?:\/\//);
    new Script(js, { filename: `${variant}/buttons.js` });
    new Script(example, { filename: `${variant}/example.js` });
  }
});

let chromium;
try {
  ({ chromium } = process.env.SL_UI_PLAYWRIGHT_MODULE ? await import(pathToFileURL(process.env.SL_UI_PLAYWRIGHT_MODULE).href) : await import('playwright'));
} catch (error) {
  if (process.env.SL_UI_PLAYWRIGHT_MODULE) throw error;
}

test('real browser: everyday actions reverse, remount cleanly and fit narrow previews', { skip: !chromium && 'Provide SL_UI_PLAYWRIGHT_MODULE to run browser behavior checks.', timeout: 120000 }, async () => {
  const server = createServer(async (request, response) => {
    const pathname = new URL(request.url, 'http://localhost').pathname;
    const match = pathname.match(/^\/packages\/(buttons-[a-z-]+-v11)\/([a-zA-Z0-9.-]+)$/);
    if (!match || !variants.includes(match[1]) || !files.includes(match[2])) { response.writeHead(404).end(); return; }
    const body = await readFile(new URL(`public/packages/${match[1]}/${match[2]}`, project));
    const extension = match[2].split('.').at(-1);
    const mime = { html: 'text/html', css: 'text/css', js: 'text/javascript', woff2: 'font/woff2' }[extension] || 'text/plain';
    response.writeHead(200, { 'Content-Type': mime + (mime.startsWith('text/') ? '; charset=utf-8' : '') }).end(body);
  });
  server.listen(0, '127.0.0.1'); await once(server, 'listening');
  const origin = `http://127.0.0.1:${server.address().port}`;
  const browser = await chromium.launch({ headless: true, ...(process.env.SL_UI_BROWSER_CHANNEL ? { channel: process.env.SL_UI_BROWSER_CHANNEL } : {}) });
  const context = await browser.newContext({ viewport: { width: 226, height: 250 } });
  const page = await context.newPage();
  const errors = [], external = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('request', request => { if (!request.url().startsWith(origin) && !request.url().startsWith('data:')) external.push(request.url()); });
  try {
    for (const [variant, key, initial, active, method] of expected) {
      await page.goto(`${origin}/packages/${variant}/index.html`);
      const before = await page.evaluate(() => {
        window.control = SLComponent.mountPreview(document.querySelector('.sl-component'));
        return window.control.state;
      });
      assert.equal(before[key], initial, variant);
      await page.locator('[data-action]').click();
      assert.equal((await page.evaluate(() => window.control.state))[key], active, variant);
      assert.equal(await page.locator('[data-action]').getAttribute('aria-pressed'), 'true', variant);
      await page.locator('[data-action]').click();
      assert.equal((await page.evaluate(() => window.control.state))[key], initial, variant);
      const lifecycle = await page.evaluate(({ key, active, method }) => {
        const root = document.querySelector('.sl-component'); let changes = 0, events = 0;
        root.addEventListener('sl:action', () => { events++; });
        const old = SLComponent.mount(root, { onChange: () => { changes++; } });
        const current = SLComponent.mount(root, { onChange: () => { changes++; } });
        const stale = old.toggle();
        current[method](active);
        const silent = { changes, events, value: current.state[key] };
        root.querySelector('[data-action]').click();
        const user = { changes, events, value: current.state[key] };
        current.reset(); current.reset(); current.destroy(); current.destroy();
        return { stale, silent, user, final: current.state[key] };
      }, { key, active, method });
      assert.equal(lifecycle.stale, false, variant);
      assert.deepEqual(lifecycle.silent, { changes: 0, events: 0, value: active }, variant);
      assert.deepEqual(lifecycle.user, { changes: 1, events: 1, value: initial }, variant);
      assert.equal(lifecycle.final, initial, variant);
      const rect = await page.locator('.sl-component').evaluate(node => { const box = node.getBoundingClientRect(); return { left: box.left, right: box.right, top: box.top, bottom: box.bottom }; });
      assert.ok(rect.left >= -0.5 && rect.right <= 226.5 && rect.top >= -0.5 && rect.bottom <= 250.5, variant);
    }
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(`${origin}/packages/buttons-translate-toggle-v11/index.html`);
    await page.locator('[data-action]').click();
    assert.equal(await page.locator('.word-ru').textContent(), 'Привет');
    assert.equal(await page.locator('.button-surface').evaluate(node => getComputedStyle(node).transitionDuration), '0s');
    assert.deepEqual(errors, []);
    assert.deepEqual(external, []);
  } finally {
    await context.close(); await browser.close(); server.close(); await once(server, 'close');
  }
});
