import test, { before, after } from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { components, categories } from '../public/catalog-data.js';

let playwright;
try { playwright = createRequire(import.meta.url)(process.env.SL_UI_PLAYWRIGHT_PATH || 'playwright'); }
catch (error) { if (process.env.SL_UI_PLAYWRIGHT_PATH) throw error; }
let server, browser, base;
before(async () => {
  if (!playwright) return;
  const root = new URL('../public/', import.meta.url);
  server = createServer(async (request, response) => {
    try {
      const path = new URL(request.url, 'http://localhost').pathname.slice(1) || 'index.html';
      const file = new URL(path, root);
      if (!file.href.startsWith(root.href)) { response.writeHead(403).end(); return; }
      const bytes = await readFile(file);
      const ext = path.split('.').pop();
      response.writeHead(200, { 'Content-Type': ({ html: 'text/html', css: 'text/css', js: 'text/javascript', woff2: 'font/woff2', zip: 'application/zip' })[ext] || 'application/octet-stream' });
      response.end(bytes);
    } catch { response.writeHead(404).end(); }
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  base = `http://127.0.0.1:${server.address().port}`;
  browser = await playwright.chromium.launch({ headless: true, ...(process.env.SL_UI_BROWSER ? { executablePath: process.env.SL_UI_BROWSER } : {}) });
});
after(async () => { await browser?.close(); if (server) await new Promise(resolve => server.close(resolve)); });
const options = { skip: !playwright && 'Set SL_UI_PLAYWRIGHT_PATH for gallery browser checks', timeout: 600000 };

// Inspect component regions, not only document scroll metrics: overflow:hidden
// on a parent can conceal part of an otherwise correctly sized live preview.
function fitIssues() {
  const issues = [];
  for (const host of document.querySelectorAll('sl-preview')) {
    const name = host.getAttribute('variant');
    const h = host.getBoundingClientRect();
    if (host.dataset.ready !== 'true') issues.push(`${name}: not mounted`);
    const stage = host.shadowRoot?.querySelector('.stage');
    for (const element of stage?.children || []) {
      const style = getComputedStyle(element), r = element.getBoundingClientRect();
      if (style.display === 'none' || style.position === 'absolute' || r.height < 2) continue;
      if (r.left < h.left - 1 || r.right > h.right + 1 || r.top < h.top - 1 || r.bottom > h.bottom + 1) issues.push(`${name}: component exceeds preview`);
      const reset = host.closest('.card-preview')?.querySelector('.card-reset')?.getBoundingClientRect();
      if (reset && r.left < reset.right && r.right > reset.left && r.top < reset.bottom && r.bottom > reset.top) issues.push(`${name}: reset overlaps the component`);
    }
  }
  const workbench = document.querySelector('.workbench');
  if (workbench) {
    const outer = workbench.getBoundingClientRect();
    const preview = document.querySelector('.preview-panel').getBoundingClientRect();
    const code = document.querySelector('.code-panel').getBoundingClientRect();
    if (preview.bottom > outer.bottom + 1 || code.bottom > outer.bottom + 1) issues.push('Workbench clips its panels');
    if (innerWidth <= 860 && code.top < preview.bottom - 1) issues.push('Code overlaps preview');
    const heading = document.querySelector('#preview-heading').getBoundingClientRect();
    const host = document.querySelector('#component-preview');
    for (const element of host.shadowRoot?.querySelector('.stage')?.children || []) {
      const style = getComputedStyle(element), r = element.getBoundingClientRect();
      if (style.display === 'none' || style.position === 'absolute' || r.height < 2) continue;
      if (r.top < heading.bottom + 8 && r.left < heading.right && r.right > heading.left) issues.push('Preview heading overlaps the component');
    }
  }
  if (document.documentElement.scrollWidth > innerWidth + 1) issues.push('Page overflows horizontally');
  return issues;
}
async function ready(page) {
  await page.waitForFunction(() => document.querySelectorAll('sl-preview').length && [...document.querySelectorAll('sl-preview')].every(p => p.dataset.ready === 'true'));
  await page.evaluate(() => document.fonts.ready);
}

test('Follow and Auto save cards do not stretch to their taller neighbours', options, async () => {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  try {
    for (const [category, name] of [['buttons', 'Follow'], ['selection', 'Auto save']]) {
      await page.goto(base + '/category.html?type=' + category);
      await ready(page);
      const card = page.locator('.component-card').filter({ has: page.getByRole('heading', { name, exact: true }) });
      const blank = await card.evaluate(c => c.getBoundingClientRect().bottom - c.querySelector('.card-preview').getBoundingClientRect().bottom);
      assert.ok(blank <= 20, `${name}: ${blank}px of blank card below preview`);
    }
  } finally { await page.close(); }
});

test('Output priority workbench contains the complete preview and code panels', options, async () => {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  try {
    await page.goto(base + '/component.html?component=matte-selection-output-priority-v11');
    await ready(page);
    assert.deepEqual(await page.evaluate(fitIssues), []);
    await page.getByRole('button', { name: 'Swap priority', exact: true }).click();
    assert.equal(await page.locator('sl-preview [data-primary]').textContent(), 'Speakers');
    await page.getByRole('button', { name: 'Reset button animation' }).click();
    assert.equal(await page.locator('sl-preview [data-primary]').textContent(), 'Headphones');
  } finally { await page.close(); }
});

test('every catalog card fits at 320, 768, 1024 and 1440px', options, async () => {
  const page = await browser.newPage();
  const errors = [], issues = [];
  page.on('pageerror', error => errors.push(error.message));
  try {
    for (const width of [320, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      for (const category of categories) {
        await page.goto(base + '/category.html?type=' + category.id);
        await ready(page);
        assert.equal(await page.locator('.component-card').count(), components.filter(c => c.category === category.id).length);
        issues.push(...(await page.evaluate(fitIssues)).map(issue => `${width}/${category.id}: ${issue}`));
        const blanks = await page.locator('.component-card').evaluateAll(cards => cards.filter(c => c.getBoundingClientRect().bottom - c.querySelector('.card-preview').getBoundingClientRect().bottom > 20).map(c => c.querySelector('h2').textContent));
        issues.push(...blanks.map(name => `${width}/${name}: stretched card`));
      }
    }
    assert.deepEqual(issues, []);
    assert.deepEqual(errors, []);
  } finally { await page.close(); }
});

test('all catalog variants: complete workbench, source tabs, controller, ZIP and reset', options, async t => {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const errors = [], issues = [];
  page.on('pageerror', error => errors.push(error.message));
  try {
    for (const component of components) {
      if (components.find(c => c.category === component.category) === component) t.diagnostic('Checking ' + component.category);
      await page.goto(base + '/component.html?component=' + component.id);
      await ready(page);
      for (const variant of component.variants) {
        if (component.variants.length > 1) await page.locator(`[data-variant="${variant}"]`).click();
        await ready(page);
        for (const width of [320, 768, 1024, 1440]) {
          await page.setViewportSize({ width, height: 900 });
          issues.push(...(await page.evaluate(fitIssues)).map(issue => `${width}/${variant}: ${issue}`));
        }
        for (const [label, file] of [['HTML', 'index.html'], ['CSS', 'buttons.css'], ['JavaScript', 'example.js']]) {
          await page.getByRole('tab', { name: label, exact: true }).click();
          const expected = await readFile(new URL(`../public/packages/${variant}/${file}`, import.meta.url), 'utf8');
          await page.waitForFunction(text => document.querySelector('#source-code').textContent === text, expected);
          assert.equal(await page.locator('#copy').isEnabled(), true, `${variant}/${file}: copy disabled`);
        }
        await page.getByRole('button', { name: 'Usage', exact: true }).click();
        await page.getByRole('button', { name: 'View full JavaScript', exact: true }).click();
        const controller = await readFile(new URL(`../public/packages/${variant}/buttons.js`, import.meta.url), 'utf8');
        await page.waitForFunction(text => document.querySelector('#source-code').textContent === text, controller);
        const download = await page.locator('#download').getAttribute('href');
        assert.equal(download, component.downloads[variant]);
        const archive = await page.request.get(new URL(download, base + '/').href);
        assert.equal(archive.status(), 200, `${variant}: missing ZIP`);
        assert.equal((await archive.body()).subarray(0, 2).toString(), 'PK');
        await page.locator('#reset').click();
        await ready(page);
      }
    }
    assert.deepEqual(issues, []);
    assert.deepEqual(errors, []);
  } finally { await page.close(); }
});
