import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { createServer } from 'node:http';
import { once } from 'node:events';
import { pathToFileURL } from 'node:url';
import { Script } from 'node:vm';
import batch from '../../public/catalog-batches/buttons-basic-3.js';

const project = new URL('../../', import.meta.url);
const files = ['index.html', 'buttons.css', 'buttons.js', 'example.js', 'instrument-sans-variable.woff2', 'OFL.txt', 'LICENSE'];
const variants = batch.map(item => item.variants[0]);
const read = (variant, file) => readFile(new URL(`public/packages/${variant}/${file}`, project), 'utf8');

test('combined editor review batch has four distinct, complete and offline packages', async () => {
  assert.deepEqual(variants, ['buttons-text-editor-toolbar-v11', 'buttons-rotate-item-v11', 'buttons-mirror-item-v11', 'buttons-crop-mode-v11']);
  assert.equal(new Set(batch.map(item => item.id)).size, 4);
  const released = await readFile(new URL('public/catalog-data.js', project), 'utf8');
  assert.doesNotMatch(released, /buttons-text-editor-toolbar-v11/);
  for (const item of batch) {
    const variant = item.variants[0];
    assert.equal(item.category, 'buttons');
    assert.equal(item.downloads[variant], `./downloads/matte-${variant}.zip`);
    assert.equal(item.usage.length, 3);
    assert.deepEqual((await readdir(new URL(`public/packages/${variant}/`, project))).sort(), [...files].sort());
    const [html, css, js, example] = await Promise.all(['index.html', 'buttons.css', 'buttons.js', 'example.js'].map(file => read(variant, file)));
    assert.match(html, /<html lang="en">/);
    assert.equal((html.match(/class="sl-component"/g) || []).length, 1);
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
  const toolbarHtml = await read('buttons-text-editor-toolbar-v11', 'index.html');
  assert.match(toolbarHtml, /role="toolbar"/);
  assert.equal((toolbarHtml.match(/data-command=/g) || []).length, 7);
  assert.match(toolbarHtml, /contenteditable="true"/);
  assert.match(toolbarHtml, /aria-multiline="true"/);
});

let chromium;
try {
  ({ chromium } = process.env.SL_UI_PLAYWRIGHT_MODULE ? await import(pathToFileURL(process.env.SL_UI_PLAYWRIGHT_MODULE).href) : await import('playwright'));
} catch (error) {
  if (process.env.SL_UI_PLAYWRIGHT_MODULE) throw error;
}

test('real browser: combined toolbar behavior, lifecycle and narrow fit', { skip: !chromium && 'Provide SL_UI_PLAYWRIGHT_MODULE to run browser behavior checks.', timeout: 120000 }, async t => {
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
  const context = await browser.newContext({ viewport: { width: 768, height: 520 } });
  const page = await context.newPage();
  const errors = [], external = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('request', request => { if (!request.url().startsWith(origin) && !request.url().startsWith('data:')) external.push(request.url()); });
  const load = async variant => {
    await page.goto(`${origin}/packages/${variant}/index.html`);
    await page.evaluate(() => { window.control = SLComponent.mountPreview(document.querySelector('.sl-component')); });
  };
  try {
    await t.test('all seven tools share one state and visibly format one editable sample', async () => {
      await load('buttons-text-editor-toolbar-v11');
      for (const command of ['bold', 'italic', 'case', 'strike', 'align', 'list', 'indent']) await page.locator(`[data-command="${command}"]`).click();
      assert.deepEqual(await page.evaluate(() => window.control.state), { bold: true, italic: true, textCase: 'upper', strike: true, alignment: 'center', listStyle: 'numbers', indent: 1 });
      const appearance = await page.locator('[data-editor]').evaluate(node => {
        const style = getComputedStyle(node);
        return { weight: Number(style.fontWeight), fontStyle: style.fontStyle, transform: style.textTransform, decoration: style.textDecorationLine, align: style.textAlign };
      });
      assert.ok(appearance.weight >= 600);
      assert.equal(appearance.fontStyle, 'italic');
      assert.equal(appearance.transform, 'uppercase');
      assert.equal(appearance.decoration, 'line-through');
      assert.equal(appearance.align, 'center');
      const input = await page.evaluate(() => {
        const root = document.querySelector('.sl-component');
        const editor = root.querySelector('[data-editor]');
        let detail;
        root.addEventListener('sl:text-input', event => { detail = event.detail; }, { once: true });
        editor.textContent = 'Привет <b> literal';
        editor.dispatchEvent(new InputEvent('input', { bubbles: true, inputType: 'insertText' }));
        return { html: editor.innerHTML, text: detail.text };
      });
      assert.equal(input.html, 'Привет &lt;b&gt; literal');
      assert.equal(input.text, 'Привет <b> literal');
    });

    await t.test('toolbar arrows, Home and End move one roving focus target', async () => {
      await load('buttons-text-editor-toolbar-v11');
      await page.locator('[data-command="bold"]').focus();
      await page.keyboard.press('ArrowRight');
      assert.equal(await page.evaluate(() => document.activeElement.dataset.command), 'italic');
      await page.keyboard.press('End');
      assert.equal(await page.evaluate(() => document.activeElement.dataset.command), 'indent');
      await page.keyboard.press('Home');
      assert.equal(await page.evaluate(() => document.activeElement.dataset.command), 'bold');
    });

    await t.test('setters are silent, remount cleanup is exact and reset restores all state', async () => {
      await load('buttons-text-editor-toolbar-v11');
      const result = await page.evaluate(() => {
        const root = document.querySelector('.sl-component'); let changes = 0, events = 0;
        root.addEventListener('sl:action', () => { events++; });
        const old = SLComponent.mount(root, { onChange: () => { changes++; } });
        const current = SLComponent.mount(root, { onChange: () => { changes++; } });
        const stale = old.toggleBold();
        current.setBold(true); current.setAlignment('right'); current.setIndent(3);
        const silent = { changes, events, state: current.state };
        root.querySelector('[data-command="italic"]').click();
        const user = { changes, events, state: current.state };
        current.reset(); current.reset(); current.destroy(); current.destroy();
        return { stale, silent, user, final: current.state };
      });
      assert.equal(result.stale, false);
      assert.deepEqual(result.silent, { changes: 0, events: 0, state: { bold: true, italic: false, textCase: 'sentence', strike: false, alignment: 'right', listStyle: 'bullets', indent: 3 } });
      assert.equal(result.user.changes, 1);
      assert.equal(result.user.events, 1);
      assert.deepEqual(result.final, { bold: false, italic: false, textCase: 'sentence', strike: false, alignment: 'left', listStyle: 'bullets', indent: 0 });
    });

    await t.test('rotate, mirror and crop remain reversible local media actions', async () => {
      for (const [variant, property] of [['buttons-rotate-item-v11', 'rotation'], ['buttons-mirror-item-v11', 'mirrored'], ['buttons-crop-mode-v11', 'cropping']]) {
        await load(variant);
        const initial = (await page.evaluate(() => window.control.state))[property];
        await page.locator('[data-action]').click();
        assert.notEqual((await page.evaluate(() => window.control.state))[property], initial, variant);
      }
    });

    await t.test('every component fits a 226px preview and reduced motion keeps state changes', async () => {
      await page.setViewportSize({ width: 226, height: 226 });
      for (const variant of variants) {
        await load(variant);
        const rect = await page.locator('.sl-component').evaluate(node => { const box = node.getBoundingClientRect(); return { left: box.left, right: box.right, top: box.top, bottom: box.bottom }; });
        assert.ok(rect.left >= -0.5 && rect.right <= 226.5 && rect.top >= -0.5 && rect.bottom <= 226.5, variant);
      }
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await load('buttons-text-editor-toolbar-v11');
      await page.locator('[data-command="bold"]').click();
      assert.equal((await page.evaluate(() => window.control.state)).bold, true);
      assert.equal(await page.locator('.tool-surface').first().evaluate(node => getComputedStyle(node).transitionDuration), '0s');
    });
    assert.deepEqual(errors, []);
    assert.deepEqual(external, []);
  } finally {
    await context.close(); await browser.close(); server.close(); await once(server, 'close');
  }
});
