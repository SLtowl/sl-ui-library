import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { createServer } from 'node:http';
import { once } from 'node:events';
import { pathToFileURL } from 'node:url';
import { Script } from 'node:vm';
import { createHash } from 'node:crypto';
import batch from '../../public/catalog-batches/buttons-basic.js';

const project = new URL('../../', import.meta.url);
const files = ['index.html', 'buttons.css', 'buttons.js', 'example.js', 'instrument-sans-variable.woff2', 'OFL.txt', 'LICENSE'];
const variants = batch.map(item => item.variants[0]);
const read = (variant, file) => readFile(new URL(`public/packages/${variant}/${file}`, project), 'utf8');

test('basic buttons review batch has ten distinct, complete and offline packages', async () => {
  assert.equal(batch.length, 10);
  assert.equal(new Set(batch.map(item => item.id)).size, 10);
  assert.equal(new Set(variants).size, 10);
  const controllerHashes = new Set();
  const font = await readFile(new URL('public/packages/buttons-review-decision-v11/instrument-sans-variable.woff2', project));
  const license = await readFile(new URL('LICENSE', project), 'utf8');

  for (const item of batch) {
    const variant = item.variants[0];
    assert.equal(item.category, 'buttons');
    assert.match(variant, /^buttons-[a-z-]+-v11$/);
    assert.equal(item.downloads[variant], `./downloads/matte-${variant}.zip`);
    assert.equal(item.usage.length, 3);
    assert.deepEqual((await readdir(new URL(`public/packages/${variant}/`, project))).sort(), [...files].sort());

    const [html, css, js, example] = await Promise.all(['index.html', 'buttons.css', 'buttons.js', 'example.js'].map(file => read(variant, file)));
    assert.match(html, /<html lang="en">/);
    assert.match(html, /name="viewport"/);
    assert.equal((html.match(/class="sl-component"/g) || []).length, 1);
    assert.match(html, /data-kind="buttons-[a-z-]+"/);
    assert.match(html, /data-action aria-label="[^"]+"/);
    assert.doesNotMatch(html.split('<body>')[1], /<script/);
    assert.match(html, /<script src="\.\/buttons\.js" defer>/);
    assert.match(css, /@font-face/);
    assert.match(css, /prefers-reduced-motion/);
    assert.match(css, /forced-colors/);
    assert.match(css, /:focus-visible/);
    assert.match(css, /--action-surface/);
    assert.doesNotMatch(css, /\.button-label::after/);
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
    assert.deepEqual(await readFile(new URL(`public/packages/${variant}/instrument-sans-variable.woff2`, project)), font);
    assert.equal(await read(variant, 'LICENSE'), license);
    controllerHashes.add(createHash('sha256').update(js).digest('hex'));
  }

  assert.equal(controllerHashes.size, 10, 'Every component has its own controller source.');
});

let chromium;
try {
  ({ chromium } = process.env.SL_UI_PLAYWRIGHT_MODULE
    ? await import(pathToFileURL(process.env.SL_UI_PLAYWRIGHT_MODULE).href)
    : await import('playwright'));
} catch (error) {
  if (process.env.SL_UI_PLAYWRIGHT_MODULE) throw error;
}

test('real browser: interactions, lifecycle, narrow fit, palette and reduced motion', { skip: !chromium && 'Provide SL_UI_PLAYWRIGHT_MODULE to run browser behavior checks.', timeout: 120000 }, async t => {
  const server = createServer(async (request, response) => {
    const pathname = new URL(request.url, 'http://localhost').pathname;
    const match = pathname.match(/^\/packages\/(buttons-[a-z-]+-v11)\/([a-zA-Z0-9.-]+)$/);
    if (!match || !variants.includes(match[1]) || !files.includes(match[2])) {
      response.writeHead(404).end();
      return;
    }
    const body = await readFile(new URL(`public/packages/${match[1]}/${match[2]}`, project));
    const extension = match[2].split('.').at(-1);
    const mime = { html: 'text/html', css: 'text/css', js: 'text/javascript', woff2: 'font/woff2' }[extension] || 'text/plain';
    response.writeHead(200, { 'Content-Type': mime + (mime.startsWith('text/') ? '; charset=utf-8' : '') }).end(body);
  });
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  const origin = `http://127.0.0.1:${server.address().port}`;
  const browser = await chromium.launch({ headless: true, ...(process.env.SL_UI_BROWSER_CHANNEL ? { channel: process.env.SL_UI_BROWSER_CHANNEL } : {}) });
  const context = await browser.newContext({ viewport: { width: 768, height: 620 } });
  const page = await context.newPage();
  const errors = [];
  const external = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('request', request => {
    if (!request.url().startsWith(origin) && !request.url().startsWith('data:')) external.push(request.url());
  });
  const load = async slug => {
    await page.goto(`${origin}/packages/buttons-${slug}-v11/index.html`);
    await page.evaluate(() => { window.control = SLComponent.mountPreview(document.querySelector('.sl-component')); });
  };
  const state = () => page.evaluate(() => window.control.state);

  try {
    await t.test('seven local controls complete a reversible pointer and keyboard cycle', async () => {
      const toggles = [
        ['add-item', 'added'], ['edit-mode', 'editing'], ['link-toggle', 'linked'],
        ['lock-toggle', 'locked'], ['filter-toggle', 'active'], ['pin-toggle', 'pinned'],
      ];
      for (const [slug, key] of toggles) {
        await load(slug);
        assert.equal((await state())[key], false, slug);
        await page.locator('[data-action]').focus();
        await page.keyboard.press('Enter');
        assert.equal((await state())[key], true, slug);
        assert.equal(await page.locator('[data-action]').getAttribute('aria-pressed'), 'true');
        await page.keyboard.press('Space');
        assert.equal((await state())[key], false, slug);
        assert.equal(await page.locator('[data-action]').getAttribute('aria-pressed'), 'false');
      }

      await load('sort-direction');
      await page.locator('[data-action]').click();
      assert.equal((await state()).direction, 'descending');
      await page.keyboard.press('Enter');
      assert.equal((await state()).direction, 'ascending');
    });

    await t.test('reworked icons keep a stable layout while their state and labels change', async () => {
      for (const slug of ['send-message', 'link-toggle', 'lock-toggle', 'pin-toggle']) {
        await load(slug);
        const before = await page.evaluate(() => {
          const icon = document.querySelector('.button-icon').getBoundingClientRect();
          const label = document.querySelector('.button-label').getBoundingClientRect();
          return { iconX: icon.x, labelX: label.x, labelWidth: label.width };
        });
        await page.locator('[data-action]').click();
        await page.waitForTimeout(80);
        const during = await page.evaluate(() => {
          const icon = document.querySelector('.button-icon').getBoundingClientRect();
          const label = document.querySelector('.button-label').getBoundingClientRect();
          return { iconX: icon.x, labelX: label.x, labelWidth: label.width };
        });
        assert.ok(Math.abs(before.iconX - during.iconX) < 0.25, `${slug}: icon layout shifted`);
        assert.ok(Math.abs(before.labelX - during.labelX) < 0.25, `${slug}: label layout shifted`);
        assert.ok(Math.abs(before.labelWidth - during.labelWidth) < 0.25, `${slug}: label width shifted`);
      }
    });

    await t.test('details disclosure opens, closes with Escape and restores focus', async () => {
      await load('details-disclosure');
      const button = page.locator('[data-action]');
      await button.click();
      assert.equal((await state()).expanded, true);
      assert.equal(await button.getAttribute('aria-expanded'), 'true');
      assert.equal(await button.getAttribute('aria-label'), 'Hide details');
      assert.equal(await page.locator('[data-panel]').getAttribute('aria-hidden'), 'false');
      await page.keyboard.press('Escape');
      assert.equal((await state()).expanded, false);
      assert.equal(await button.getAttribute('aria-label'), 'Show details');
      assert.equal(await page.evaluate(() => document.activeElement === document.querySelector('[data-action]')), true);
    });

    await t.test('send and print require callbacks, suppress repeats, support cancel, error and success', async () => {
      for (const [slug, callback] of [['send-message', 'onSend'], ['print-document', 'onPrint']]) {
        await load(slug);
        const result = await page.evaluate(async ({ callback }) => {
          const root = document.querySelector('.sl-component');
          let finish;
          const options = { [callback]: () => new Promise(resolve => { finish = resolve; }) };
          const firstController = SLComponent.mount(root, options);
          const first = firstController.start();
          const repeated = await firstController.start();
          const pending = firstController.state.phase;
          firstController.cancel();
          finish('late');
          const canceledResult = await first;
          const canceled = firstController.state.phase;

          const failedController = SLComponent.mount(root, { [callback]: () => Promise.reject(new Error('Expected test failure')) });
          const failedResult = await failedController.start();
          const failed = failedController.state.phase;

          let actions = 0;
          root.addEventListener('sl:action', () => { actions++; }, { once: true });
          const successController = SLComponent.mount(root, { [callback]: () => Promise.resolve({ ok: true }) });
          const successResult = await successController.start();
          window.control = successController;
          return { repeated, pending, canceledResult, canceled, failedResult, failed, successResult, success: successController.state.phase, actions };
        }, { callback });
        assert.deepEqual(result, {
          repeated: false, pending: 'pending', canceledResult: false, canceled: 'idle',
          failedResult: false, failed: 'error', successResult: true, success: 'complete', actions: 1,
        });

        await page.evaluate(() => { window.control = SLComponent.mount(document.querySelector('.sl-component')); });
        assert.equal(await page.evaluate(() => window.control.start()), false);
        assert.equal((await state()).phase, 'error');

        await page.evaluate(() => { window.control = SLComponent.mountPreview(document.querySelector('.sl-component')); });
        await page.locator('[data-action]').click();
        await page.waitForFunction(() => window.control.state.phase === 'complete');
        assert.match(await page.locator('[data-status]').textContent(), /Demo finished locally\. No (message was sent|print job was created)\./);
      }
    });

    await t.test('remount cleanup and silent setters remain deterministic', async () => {
      await load('add-item');
      const result = await page.evaluate(() => {
        const root = document.querySelector('.sl-component');
        let changes = 0;
        const old = SLComponent.mount(root, { onChange: () => { changes++; } });
        const current = SLComponent.mount(root, { onChange: () => { changes++; } });
        const oldResult = old.toggle();
        const silent = current.setAdded(true);
        const afterSilent = { changes, state: current.state.added };
        current.reset(); current.reset(); current.destroy(); current.destroy();
        return { oldResult, silent, afterSilent, final: current.state };
      });
      assert.equal(result.oldResult, false);
      assert.equal(result.silent, true);
      assert.deepEqual(result.afterSilent, { changes: 0, state: true });
      assert.deepEqual(result.final, { added: false });
    });

    await t.test('all packages fit 226px, accept palette tokens and suppress motion', async () => {
      await page.setViewportSize({ width: 226, height: 520 });
      for (const variant of variants) {
        const slug = variant.replace(/^buttons-/, '').replace(/-v11$/, '');
        await load(slug);
        const fit = await page.evaluate(() => {
          document.body.style.padding = '0';
          const root = document.querySelector('.sl-component');
          root.style.setProperty('--action-surface', '#18324a');
          root.style.setProperty('--action-hover', '#244965');
          root.style.setProperty('--action-feedback', '#315a78');
          const rect = root.getBoundingClientRect();
          return {
            width: rect.width, height: rect.height,
            scrollX: document.documentElement.scrollWidth > document.documentElement.clientWidth,
            style: root.getAttribute('style'),
            variable: getComputedStyle(root).getPropertyValue('--action-surface'),
          };
        });
        await page.waitForTimeout(360);
        fit.surface = await page.evaluate(() => getComputedStyle(document.querySelector('.button-surface')).backgroundColor);
        assert.ok(fit.width <= 226, `${variant} ${JSON.stringify(fit)}`);
        assert.ok(fit.height <= 458, `${variant} ${JSON.stringify(fit)}`);
        assert.equal(fit.scrollX, false, variant);
        assert.equal(fit.surface, 'rgb(24, 50, 74)', `${variant} ${JSON.stringify(fit)}`);
      }

      await page.emulateMedia({ reducedMotion: 'reduce' });
      await load('pin-toggle');
      const motion = await page.evaluate(() => {
        const root = document.querySelector('.sl-component');
        return {
          surface: getComputedStyle(root.querySelector('.button-surface')).transitionDuration,
          icon: getComputedStyle(root.querySelector('.pin-shape')).transitionDuration,
        };
      });
      assert.equal(motion.surface, '0s');
      assert.equal(motion.icon, '0s');
    });

    assert.deepEqual(errors, []);
    assert.deepEqual(external, []);
  } finally {
    await context.close();
    await browser.close();
    await new Promise(resolve => server.close(resolve));
  }
});
