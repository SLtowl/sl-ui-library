import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createServer } from 'node:http';
import { once } from 'node:events';
import { pathToFileURL } from 'node:url';
import { components } from '../public/catalog-data.js';

const variants = ['snooze-menu', 'menus-weekly-window-v11', 'navigation-context-rail-v11', 'overlays-workspace-settings-v11', 'overlays-filter-builder-v11', 'overlays-focus-timer-v11', 'feedback-capacity-v11'];
const publicRoot = new URL('../public/', import.meta.url);
test('all catalog exports contain no visible native date, time, color or select pickers', async () => {
  for (const variant of components.flatMap(component => component.variants)) {
    const html = await readFile(new URL('packages/' + variant + '/index.html', publicRoot), 'utf8');
    assert.doesNotMatch(html, /type="(?:date|time|color)"/, variant);
    for (const [select] of html.matchAll(/<select\b[^>]*>/g)) assert.match(select, /\bhidden\b/, variant);
  }
});

test('cross-category styled pickers keep real interactions and preview bounds', async t => {
  let playwright;
  try { playwright = await import(process.env.SL_UI_PLAYWRIGHT ? pathToFileURL(process.env.SL_UI_PLAYWRIGHT).href : 'playwright'); }
  catch { t.skip('Set SL_UI_PLAYWRIGHT to run the browser picker checks.'); return; }
  const server = createServer(async (req, res) => {
    const path = new URL(req.url, 'http://localhost').pathname, parts = path.split('/');
    if (parts.length !== 4 || parts[1] !== 'packages' || !variants.includes(parts[2]) || !['index.html', 'buttons.css', 'buttons.js', 'example.js', 'preview.js', 'instrument-sans-variable.woff2'].includes(parts[3])) { res.writeHead(404).end(); return; }
    try {
      const body = await readFile(new URL('.' + path, publicRoot)), type = path.endsWith('.js') ? 'text/javascript' : path.endsWith('.css') ? 'text/css' : path.endsWith('.woff2') ? 'font/woff2' : 'text/html';
      res.writeHead(200, { 'Content-Type': type + (type.startsWith('text/') ? '; charset=utf-8' : '') }).end(body);
    } catch { res.writeHead(404).end(); }
  });
  server.listen(0, '127.0.0.1'); await once(server, 'listening');
  let browser;
  try {
    browser = await playwright.chromium.launch({ headless: true, channel: process.env.SL_UI_BROWSER_CHANNEL || 'msedge' });
    const context = await browser.newContext({ viewport: { width: 320, height: 700 } }), page = await context.newPage();
    const errors = [], external = []; page.on('pageerror', e => errors.push(e.message)); page.on('request', r => { if (!r.url().startsWith('http://127.0.0.1:') && !r.url().startsWith('data:')) external.push(r.url()); });
    const base = 'http://127.0.0.1:' + server.address().port;
    async function open(variant) {
      await page.goto(base + '/packages/' + variant + '/index.html');
      await page.evaluate(() => { const root = document.querySelector('.sl-component, .menu-demo'); window.field = window.SLComponent ? SLComponent.mount(root) : MatteMenu.mount(root); });
      if (variant.startsWith('overlays-') || variant.startsWith('menus-') || variant === 'snooze-menu') await page.locator('[data-trigger]').click();
    }
    const state = () => page.evaluate(() => field.state);
    async function choose(value) { await page.locator('.sl-choice-trigger').click(); await page.locator('[data-choice="' + value + '"]').click(); }
    for (const variant of variants) await t.test(variant + ': pointer, keyboard, Escape, reset and narrow popup fit', async () => {
      await open(variant);
      const time = variant === 'snooze-menu' || variant.startsWith('menus-');
      const trigger = page.locator(time ? '.sl-time-open' : '.sl-choice-trigger');
      for (let i = 0; i < 5; i++) { await trigger.click(); await page.keyboard.press('Escape'); assert.equal(await trigger.getAttribute('aria-expanded'), 'false'); }
      await trigger.click(); await page.waitForTimeout(210);
      const popup = page.locator(time ? '.sl-picker-panel' : '.sl-choice-list');
      assert.equal(await popup.evaluate(panel => { const r = panel.getBoundingClientRect(), root = panel.closest('.sl-component, .menu-demo').getBoundingClientRect(); return r.left >= root.left - 1 && r.right <= root.right + 1 && r.top >= root.top - 1 && r.bottom <= root.bottom + 1 && r.left >= 0 && r.right <= innerWidth; }), true, variant);
      if (time) {
        for (let part = 0; part < 2; part++) await page.locator('.sl-time-list').nth(part).locator('[aria-selected="true"]').press('End');
        await page.getByRole('button', { name: 'Use time', exact: true }).click();
        assert.equal(await page.locator('.sl-time-field').inputValue(), '23:59');
      } else {
        await page.keyboard.press('End'); await page.keyboard.press('Enter');
        const pair = await page.locator('.sl-choice').evaluate(wrap => ({ backing: wrap.querySelector('select').value, selected: wrap.querySelector('[aria-selected="true"]').dataset.choice, text: wrap.querySelector('.sl-choice-value').textContent, option: wrap.querySelector('[aria-selected="true"]').textContent }));
        assert.equal(pair.backing, pair.selected); assert.equal(pair.text, pair.option);
      }
      assert.equal(await trigger.getAttribute('aria-expanded'), 'false');
      if (variant.startsWith('overlays-') || time) assert.equal(await page.locator('[data-trigger]').getAttribute('aria-expanded'), 'true', 'nested Escape must not close the parent');
      await page.evaluate(() => field.reset());
      assert.equal(await trigger.getAttribute('aria-expanded'), 'false');
      await page.evaluate(() => { field.destroy(); const root = document.querySelector('.sl-component, .menu-demo'); field = window.SLComponent ? SLComponent.mount(root) : MatteMenu.mount(root); });
      assert.equal(await page.locator(time ? '.sl-picker-panel' : '.sl-choice-list').count(), 1);
    });
    await t.test('the original actions consume the chosen values; drafts still cancel', async () => {
      await open('navigation-context-rail-v11'); await choose('1'); assert.equal((await state()).context, 1); await page.locator('[data-section="2"]').click();
      await choose('0'); await choose('1'); assert.equal((await state()).selected, 2);
      await open('overlays-workspace-settings-v11'); await choose('compact'); await page.locator('[data-action="cancel"]').click(); await page.locator('[data-trigger]').click(); assert.equal(await page.locator('.sl-choice-value').innerText(), 'Comfortable');
      await choose('compact'); await page.locator('[data-action="apply"]').click(); assert.equal((await state()).density, 'compact');
      await open('overlays-filter-builder-v11'); await choose('active'); assert.equal((await state()).matches.length, 2); await page.locator('[data-action="clear"]').click(); assert.equal(await page.locator('.sl-choice-value').innerText(), 'Any status');
      await open('overlays-focus-timer-v11'); await choose('15'); await page.locator('[data-action="toggle"]').click(); assert.equal(await page.locator('.sl-choice-trigger').isDisabled(), true);
      await page.locator('[data-action="toggle"]').click(); assert.equal(await page.locator('.sl-choice-trigger').isDisabled(), false); assert.equal((await state()).minutes, 15);
      await open('feedback-capacity-v11'); await choose('8'); await page.locator('[data-action="stage"]').click(); assert.equal((await state()).used, 94);
      await open('menus-weekly-window-v11'); await page.locator('.sl-time-open').click(); await page.locator('.sl-time-list').last().locator('[aria-selected="true"]').press('End'); await page.getByRole('button', { name: 'Use time', exact: true }).click(); await page.locator('[data-key="apply"]').click(); assert.equal((await state()).time, '09:59');
      await open('snooze-menu'); await page.locator('.sl-time-field').fill('14:37'); await page.locator('[data-time-apply]').click(); assert.match(await page.locator('[data-feedback]').innerText(), /14:37/);
      await page.locator('[data-trigger]').click(); await page.locator('.sl-time-field').fill('99:99'); await page.locator('[data-time-apply]').click(); assert.equal(await page.locator('[data-trigger]').getAttribute('aria-expanded'), 'true');
    });
    assert.deepEqual(errors, []); assert.deepEqual(external, []);
    await context.close();
  } finally { await browser?.close(); await new Promise(resolve => { server.close(resolve); server.closeAllConnections(); }); }
});
