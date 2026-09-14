import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir, mkdir } from 'node:fs/promises';
import { createServer } from 'node:http';
import { once } from 'node:events';
import { pathToFileURL } from 'node:url';
import { join } from 'node:path';
import vm from 'node:vm';
import batch from '../../public/catalog-batches/inputs.js';

const publicRoot = new URL('../../public/', import.meta.url);
const packageURL = (variant, file) => new URL(`packages/${variant}/${file}`, publicRoot);
const sources = new Map();
for (const entry of batch) {
  const variant = entry.variants[0];
  sources.set(variant, Object.fromEntries(await Promise.all(['index.html', 'buttons.css', 'buttons.js', 'example.js'].map(async file => [file, await readFile(packageURL(variant, file), 'utf8')]))));
}

test('exactly ten distinct, complete input exports obey the compiler and offline contracts', async () => {
  assert.equal(batch.length, 10);
  assert.equal(new Set(batch.map(entry => entry.id)).size, 10);
  assert.equal(new Set(batch.map(entry => entry.name)).size, 10);
  for (const entry of batch) {
    const variant = entry.variants[0], files = sources.get(variant);
    assert.equal(entry.category, 'inputs');
    assert.match(variant, /^inputs-[a-z-]+-v11$/);
    assert.equal(entry.id, `matte-${variant}`);
    assert.equal(entry.preview, `./packages/${variant}/index.html?embed=1`);
    assert.equal(entry.downloads[variant], `./downloads/${entry.id}.zip`);
    assert.equal(entry.usage.length, 3);
    assert.deepEqual((await readdir(new URL(`packages/${variant}/`, publicRoot))).sort(), ['LICENSE', 'OFL.txt', 'buttons.css', 'buttons.js', 'example.js', 'index.html', 'instrument-sans-variable.woff2'].sort());
    assert.deepEqual(await readFile(packageURL(variant, 'instrument-sans-variable.woff2')), await readFile(packageURL('text-input', 'instrument-sans-variable.woff2')));
    assert.deepEqual(await readFile(packageURL(variant, 'OFL.txt')), await readFile(packageURL('text-input', 'OFL.txt')));
    assert.deepEqual(await readFile(packageURL(variant, 'LICENSE')), await readFile(new URL('../../LICENSE', import.meta.url)));
    assert.match(files['index.html'], /<html lang="en">/);
    assert.match(files['index.html'], /name="viewport"/);
    assert.equal((files['index.html'].match(/class="sl-component"/g) || []).length, 1);
    assert.match(files['index.html'], new RegExp(`data-kind="${variant}"`));
    const body = files['index.html'].match(/<body>([\s\S]*?)<\/body>/)[1];
    assert.doesNotMatch(body, /<script|<style/);
    assert.match(files['index.html'], /<script src="\.\/buttons.js" defer><\/script>/);
    assert.match(files['index.html'], /<script src="\.\/example.js" defer><\/script>/);
    assert.match(files['buttons.js'], /window\.SLComponent = \{ mount, mountPreview \};/);
    const expression = files['buttons.js'].match(/\(\(\) => \{[\s\S]*\}\)\(\);\s*$/)?.[0];
    assert.ok(expression, variant);
    const compiled = expression.replace(/window\.\w+\s*=\s*(\{[^;]+\});/, 'return $1;');
    assert.equal(typeof vm.runInNewContext(compiled).mount, 'function');
    new vm.Script(files['buttons.js'], { filename: variant + '/buttons.js' });
    new vm.Script(files['example.js'], { filename: variant + '/example.js' });
    assert.doesNotMatch(files['buttons.js'], /innerHTML|insertAdjacentHTML|fetch\(|XMLHttpRequest|setTimeout|setInterval|requestAnimationFrame|document\.activeElement/);
    assert.doesNotMatch(Object.values(files).join('\n'), /https?:\/\/|@import|<img\b/);
    assert.match(files['buttons.css'], /prefers-reduced-motion: reduce/);
    for (const token of ['surface', 'hover', 'active', 'text', 'muted', 'accent', 'border', 'focus', 'error']) assert.match(files['buttons.css'], new RegExp('--field-' + token + ':'));
    // Every ordinary selector is scoped; at-rules are the only permitted exceptions.
    const selectors = files['buttons.css'].replace(/@font-face\s*\{[^}]*\}/g, '').matchAll(/(?:^|\})([^{}]+)\{/g);
    for (const [, selector] of selectors) assert.ok(selector.trim().startsWith('.sl-component') || selector.trim().startsWith('@media'), selector);
  }
});

test('review pickers use project controls and the attachment preview is synthetic', () => {
  for (const purpose of ['date-range', 'time', 'measurement', 'color']) {
    const files = sources.get(`inputs-${purpose}-v11`);
    assert.doesNotMatch(files['index.html'], /type="(?:date|time|color)"|<select\b/);
    assert.match(files['buttons.js'], /createPicker/);
  }
  assert.match(sources.get('inputs-attachment-v11')['buttons.js'], /return mount\(root, \{ demo: true \}\)/);
});

test('browser interactions, lifecycle, Shadow DOM, narrow layout and palette', async t => {
  let playwright;
  try { playwright = await import(process.env.SL_UI_PLAYWRIGHT ? pathToFileURL(process.env.SL_UI_PLAYWRIGHT).href : 'playwright'); }
  catch { t.skip('Install Playwright or set SL_UI_PLAYWRIGHT to its entry point to run browser checks.'); return; }
  const server = createServer(async (req, res) => {
    const path = new URL(req.url, 'http://localhost').pathname;
    if (!/^\/packages\/inputs-[a-z-]+-v11\/[^/]+$/.test(path)) { res.writeHead(404).end(); return; }
    try {
      const bytes = await readFile(new URL('.' + path, publicRoot));
      const type = path.endsWith('.css') ? 'text/css' : path.endsWith('.js') ? 'text/javascript' : path.endsWith('.woff2') ? 'font/woff2' : 'text/html';
      res.writeHead(200, { 'Content-Type': type + (type.startsWith('text') ? '; charset=utf-8' : '') }).end(bytes);
    } catch { res.writeHead(404).end(); }
  });
  server.listen(0, '127.0.0.1'); await once(server, 'listening');
  const browser = await playwright.chromium.launch({ headless: true, ...(process.env.SL_UI_BROWSER_CHANNEL ? { channel: process.env.SL_UI_BROWSER_CHANNEL } : {}) });
  const context = await browser.newContext({ viewport: { width: 274, height: 510 } });
  const page = await context.newPage(), errors = [], external = [];
  page.on('pageerror', error => errors.push(String(error)));
  page.on('request', request => { if (!request.url().startsWith('http://127.0.0.1:') && !request.url().startsWith('data:')) external.push(request.url()); });
  const base = `http://127.0.0.1:${server.address().port}`;
  const screenshots = process.env.SL_UI_SCREENSHOTS;
  if (screenshots) await mkdir(screenshots, { recursive: true });
  const state = () => page.evaluate(() => window.field.state);
  async function open(purpose, options = {}) {
    await page.goto(`${base}/packages/inputs-${purpose}-v11/index.html`);
    await page.evaluate(options => { window.changes = 0; window.field = SLComponent.mount(document.querySelector('.sl-component'), { ...options, onChange: () => { window.changes++; } }); }, options);
  }
  async function fit(purpose, suffix = 'changed') {
    // Let CSS settle for layout measurement, not to postpone field behavior.
    await page.waitForTimeout(250);
    const bounds = await page.locator('.sl-component').evaluate(root => {
      const rect = root.getBoundingClientRect();
      const overflowing = [...root.querySelectorAll('input, select, button, output, .sl-status, .sl-heading, .sl-tags, .sl-options, .sl-time-list, .sl-picker-panel')].filter(node => {
        if (!node.checkVisibility() || getComputedStyle(node).visibility === 'hidden') return false;
        const scrollArea = node.closest('.sl-tags, .sl-options, .sl-time-list');
        if (scrollArea && scrollArea !== node) return false; // Check the bounded scroll viewport below, then exercise the last control.
        const r = node.getBoundingClientRect(); return r.left < rect.left - 1 || r.right > rect.right + 1 || r.bottom > rect.bottom + 1 || r.top < rect.top - 1;
      }).map(node => node.outerHTML.slice(0, 160));
      return { width: rect.width, height: rect.height, scrollWidth: root.scrollWidth, clientWidth: root.clientWidth, overflowing };
    });
    assert.ok(bounds.width <= 226.1, `${purpose}: ${JSON.stringify(bounds)}`);
    assert.ok(bounds.height <= 458, `${purpose}: ${JSON.stringify(bounds)}`);
    assert.ok(bounds.scrollWidth <= bounds.clientWidth + 1, `${purpose}: horizontal overflow`);
    assert.deepEqual(bounds.overflowing, [], `${purpose}: controls leave root`);
    if (screenshots) await page.screenshot({ path: join(screenshots, `${purpose}-${suffix}.png`), scale: 'css' });
  }
  try {
    await t.test('tags: IME, literal Unicode, duplicate/cap boundaries, deletion and reset', async () => {
      await open('tokens'); const input = page.getByRole('textbox');
      await input.fill('研究 <img>');
      await input.dispatchEvent('compositionstart');
      await input.press('Enter'); assert.equal((await state()).value.length, 2);
      await input.dispatchEvent('compositionend'); await input.press('Enter');
      assert.deepEqual((await state()).value, ['Design', 'Prototype', '研究 <img>']);
      assert.equal(await page.locator('.sl-tags img').count(), 0);
      await input.fill('Design'); await input.press('Enter'); assert.match(await page.locator('.sl-status').textContent(), /already/);
      for (const text of ['Alpha', 'Beta', 'Gamma']) { await input.fill(text); await input.press('Enter'); }
      assert.equal((await state()).value.length, 6); assert.equal(await page.getByRole('button', { name: 'Add tag', exact: true }).isDisabled(), true);
      await fit('tokens');
      await page.getByRole('button', { name: 'Remove Gamma', exact: true }).focus();
      assert.equal(await page.locator('.sl-tags').evaluate(node => node.scrollTop > 0), true);
      await page.getByRole('button', { name: 'Remove 研究 <img>', exact: true }).click(); assert.equal((await state()).value.length, 5);
      assert.equal(await input.evaluate(node => node === node.getRootNode().activeElement), true);
      await page.evaluate(() => field.reset()); assert.deepEqual((await state()).value, ['Design', 'Prototype']);
    });
    await t.test('combobox: keyboard skips disabled, Escape, empty results, blur, stable ID', async () => {
      await open('combobox'); const input = page.getByRole('combobox');
      await input.press('ArrowDown'); await input.press('ArrowDown'); await input.press('ArrowDown');
      assert.match(await input.getAttribute('aria-activedescendant'), /-3$/);
      await fit('combobox', 'expanded');
      await input.press('Enter'); assert.equal((await state()).value, 'noah');
      await input.fill('unmatched'); assert.equal(await page.locator('.sl-empty').isVisible(), true);
      await input.press('Escape'); assert.equal(await input.inputValue(), 'Noah Williams'); assert.equal((await state()).open, false);
      await page.getByRole('button', { name: 'Show people' }).click();
      const unavailable = page.getByRole('option', { name: 'Mina Patel · unavailable' });
      assert.equal(await unavailable.getAttribute('aria-disabled'), 'true');
      await unavailable.dispatchEvent('click'); assert.equal((await state()).value, 'noah');
      await page.getByRole('option', { name: 'Ada Morgan' }).click(); assert.equal((await state()).value, 'ada');
      await input.fill('draft'); await page.locator('.sl-heading').click(); assert.equal(await input.inputValue(), 'Ada Morgan');
      await page.getByRole('button', { name: 'Clear', exact: true }).click(); assert.equal((await state()).value, null);
      await open('combobox', { items: [{ id: 'a', label: '<img> 日本語' }, { id: 'b', label: 'Closed', disabled: true }] });
      await page.getByRole('combobox').press('ArrowUp'); await page.getByRole('combobox').press('Enter');
      assert.equal((await state()).label, '<img> 日本語'); assert.equal(await page.locator('img').count(), 0);
    });
    await t.test('date range: leap day, inclusive one-day range, invalid ordering and bounds', async () => {
      await open('date-range', { value: { start: '2024-02-28', end: '2024-03-01' } }); assert.equal((await state()).days, 3);
      await page.getByLabel('End date').fill('2024-02-28'); assert.equal((await state()).days, 1);
      await page.getByLabel('End date').fill('2024-02-27'); assert.equal((await state()).valid, false); assert.equal((await state()).days, null);
      assert.equal(await page.getByLabel('End date').evaluate(node => node.checkValidity()), false);
      await page.getByLabel('Start date').fill('1999-12-31'); assert.equal((await state()).valid, false);
      await fit('date-range');
      await page.evaluate(() => field.reset()); assert.equal((await state()).days, 3);
    });
    await t.test('time: five-minute validation, midnight and presets', async () => {
      await open('time'); await page.getByLabel('Daily reminder').fill('00:00'); assert.equal((await state()).minutes, 0);
      await page.getByLabel('Daily reminder').fill('12:03'); assert.equal((await state()).valid, false);
      await page.getByRole('button', { name: '18:00', exact: true }).click(); assert.equal((await state()).minutes, 1080);
      assert.equal(await page.getByRole('button', { name: '18:00', exact: true }).getAttribute('aria-pressed'), 'true');
      await fit('time');
    });
    await t.test('duration: carry, rapid adjustments, lower and upper limits, invalid drafts', async () => {
      await open('duration', { value: 55 }); await page.getByRole('button', { name: '+15 min', exact: true }).click();
      assert.equal((await state()).value, 70); assert.equal((await state()).hours, '1');
      await page.getByLabel('Hours', { exact: true }).fill('23'); await page.getByLabel('Minutes', { exact: true }).fill('58');
      await page.getByRole('button', { name: '+15 min', exact: true }).click(); assert.equal((await state()).value, 1439);
      assert.equal(await page.getByRole('button', { name: '+15 min', exact: true }).isDisabled(), true);
      await page.getByLabel('Hours', { exact: true }).fill('0'); await page.getByLabel('Minutes', { exact: true }).fill('5');
      await page.getByRole('button', { name: '−15 min', exact: true }).click(); assert.equal((await state()).value, 0);
      await page.getByLabel('Minutes', { exact: true }).fill('60'); assert.equal((await state()).valid, false);
      assert.equal(await page.getByRole('button', { name: '+15 min', exact: true }).isDisabled(), true); await fit('duration');
    });
    await t.test('measurement: exact conversion without round-trip drift, draft validation', async () => {
      async function chooseUnit(value) { await page.locator('.sl-unit-trigger').click(); await page.locator('[data-unit="' + value + '"]').click(); }
      await open('measurement', { value: 254 }); await chooseUnit('in');
      assert.equal(await page.getByLabel('Print width').inputValue(), '10'); assert.equal((await state()).value, 254);
      for (let i = 0; i < 8; i++) { await chooseUnit('cm'); await chooseUnit('in'); }
      assert.equal((await state()).value, 254);
      await page.getByLabel('Print width').fill('1'); assert.equal((await state()).value, 25.4);
      await page.getByLabel('Print width').fill('-1'); assert.equal((await state()).value, null); assert.equal(await page.locator('.sl-unit-trigger').isDisabled(), true);
      await page.getByLabel('Print width').fill(''); assert.equal((await state()).valid, false); await fit('measurement');
    });
    await t.test('editable title: caret, IME, exact text, Escape, focus restoration', async () => {
      await open('editable-title'); await page.getByRole('button', { name: 'Edit title', exact: true }).click();
      const input = page.getByRole('textbox'); await input.fill('  日本語 <b>title</b>  ');
      await input.evaluate(node => node.setSelectionRange(3, 3)); await input.press('ArrowRight');
      assert.equal(await input.evaluate(node => node.selectionStart), 4);
      await input.dispatchEvent('compositionstart'); await input.press('Enter'); assert.equal((await state()).editing, true);
      await input.dispatchEvent('compositionend'); await input.press('Enter'); assert.equal((await state()).value, '  日本語 <b>title</b>  ');
      assert.equal(await page.locator('.sl-title-text b').count(), 0);
      assert.equal(await page.getByRole('button', { name: 'Edit title', exact: true }).evaluate(node => node === node.getRootNode().activeElement), true);
      await page.getByRole('button', { name: 'Edit title', exact: true }).click(); await input.fill('discard me'); await input.press('Escape');
      assert.equal((await state()).value, '  日本語 <b>title</b>  '); await fit('editable-title');
    });
    await t.test('metadata: literal special keys, identity/caret, duplicate keys, capacity and remove', async () => {
      await open('key-value'); await page.getByLabel('Key 1', { exact: true }).fill('__proto__');
      const value = page.getByLabel('Value 1', { exact: true }); await value.fill('你好 <svg>');
      await value.evaluate(node => { window.originalInput = node; node.setSelectionRange(2, 2); }); await value.press('ArrowLeft');
      assert.equal(await value.evaluate(node => node === window.originalInput && node.selectionStart === 1), true);
      await page.getByRole('button', { name: 'Add pair', exact: true }).click(); await page.getByLabel('Key 2', { exact: true }).fill('__proto__');
      assert.equal((await state()).valid, false); await page.getByLabel('Key 2', { exact: true }).fill('language');
      await page.getByRole('button', { name: 'Add pair', exact: true }).click(); await page.getByLabel('Key 3', { exact: true }).fill('note');
      assert.equal((await state()).valid, true); assert.equal(await page.getByRole('button', { name: 'Add pair', exact: true }).isDisabled(), true);
      assert.equal((await state()).value[0].value, '你好 <svg>'); assert.equal(await page.locator('.sl-pairs svg').count(), 0); await fit('key-value');
      await page.getByRole('button', { name: 'Remove pair 2', exact: true }).click(); assert.equal((await state()).value.length, 2);
    });
    await t.test('color: incomplete input, case/caret, preset and custom picker synchronization', async () => {
      await open('color'); const hex = page.getByLabel('Hex color'); await hex.fill('#AbC123');
      assert.equal((await state()).value, '#abc123'); assert.equal(await hex.inputValue(), '#AbC123');
      await hex.evaluate(node => node.setSelectionRange(3, 3)); await hex.press('ArrowLeft'); assert.equal(await hex.evaluate(node => node.selectionStart), 2);
      await hex.fill('#12'); assert.equal((await state()).valid, false);
      assert.equal(await hex.evaluate(node => node.checkValidity()), false);
      await page.getByRole('button', { name: 'Mist #ABBECD', exact: true }).click(); assert.equal((await state()).value, '#abbecd');
      await page.getByRole('button', { name: 'Choose color', exact: true }).click();
      await page.getByRole('slider', { name: 'Hue', exact: true }).fill('0');
      await page.getByRole('slider', { name: 'Saturation', exact: true }).fill('100');
      await page.getByRole('slider', { name: 'Brightness', exact: true }).fill('100');
      assert.equal((await state()).value, '#abbecd');
      await page.getByRole('button', { name: 'Apply color', exact: true }).click();
      assert.equal(await hex.inputValue(), '#ff0000'); await fit('color');
    });
    await t.test('attachment: no upload, literal filename, size/extension limits, remove', async () => {
      await open('attachment'); const file = page.getByLabel('Project document');
      await file.setInputFiles({ name: '研究 <b>.md', mimeType: 'text/markdown', buffer: Buffer.from('# Notes') });
      assert.equal((await state()).value.name, '研究 <b>.md'); assert.equal((await state()).valid, true);
      assert.equal(await page.locator('.sl-file-name b').count(), 0);
      await file.setInputFiles({ name: 'large.pdf', mimeType: 'application/pdf', buffer: Buffer.alloc(5 * 1024 * 1024 + 1) }); assert.equal((await state()).valid, false);
      await file.setInputFiles({ name: 'wrong.exe', mimeType: 'text/plain', buffer: Buffer.from('x') }); assert.equal((await state()).valid, false);
      await fit('attachment'); await page.getByRole('button', { name: 'Remove file', exact: true }).click();
      assert.equal((await state()).value, null); assert.equal(await file.evaluate(node => node.files.length), 0);
    });
    await t.test('calendar: keyboard grid, month changes, leap selection, bounds, clear and focus', async () => {
      await open('date-range', { value: { start: '2024-02-28', end: '2024-03-01' } });
      const trigger = page.getByRole('button', { name: 'Open start calendar' });
      await trigger.click(); await fit('date-range', 'calendar-open');
      const selected = page.locator('[data-date="2024-02-28"]'); await selected.press('ArrowRight'); await page.keyboard.press('Enter');
      assert.equal((await state()).value.start, '2024-02-29'); assert.equal((await state()).days, 2);
      assert.equal(await trigger.evaluate(node => node === node.getRootNode().activeElement), true);
      await trigger.click(); await page.getByRole('button', { name: 'Next month', exact: true }).click();
      assert.match(await page.locator('.sl-month-name').innerText(), /March/);
      await page.getByRole('button', { name: 'Previous month', exact: true }).click();
      assert.match(await page.locator('.sl-month-name').innerText(), /February/); await page.keyboard.press('Escape');
      assert.equal((await state()).value.start, '2024-02-29');
      await page.getByRole('button', { name: 'Open end calendar' }).click();
      assert.equal(await page.locator('[data-date="2024-02-28"]').isDisabled(), true); await page.keyboard.press('Escape');
      await trigger.click(); await page.getByRole('button', { name: 'Clear date' }).click(); assert.equal((await state()).valid, false);
      await page.evaluate(() => field.reset());
      await open('date-range', { value: { start: '2000-01-01', end: '2000-01-01' } });
      await page.getByRole('button', { name: 'Open start calendar' }).click(); assert.equal(await page.getByRole('button', { name: 'Previous month' }).isDisabled(), true);
      await page.keyboard.press('Escape');
      await open('date-range', { value: { start: '2100-12-31', end: '2100-12-31' } });
      await page.getByRole('button', { name: 'Open end calendar' }).click(); assert.equal(await page.getByRole('button', { name: 'Next month' }).isDisabled(), true);
    });
    await t.test('time picker: scroll to selected, both columns, cancel and explicit apply', async () => {
      await open('time'); await page.getByRole('button', { name: 'Open time picker' }).click();
      await fit('time', 'picker-open');
      for (const part of [0, 1]) {
        const selected = page.locator('.sl-time-list').nth(part).locator('[aria-selected="true"]');
        assert.equal(await selected.evaluate(node => { const r = node.getBoundingClientRect(), p = node.parentElement.getBoundingClientRect(); return r.top >= p.top && r.bottom <= p.bottom; }), true);
        await selected.press('End');
      }
      assert.equal(await page.locator('.sl-time-draft').innerText(), '23:55');
      await page.getByRole('button', { name: 'Apply time' }).click(); assert.equal((await state()).value, '23:55');
      await page.getByRole('button', { name: 'Open time picker' }).click();
      await page.locator('.sl-time-list').first().locator('[aria-selected="true"]').press('Home');
      await page.keyboard.press('Escape'); assert.equal((await state()).value, '23:55');
    });
    await t.test('unit picker: keyboard choice and cancellation preserve canonical measurement', async () => {
      await open('measurement', { value: 254 }); const trigger = page.locator('.sl-unit-trigger');
      await trigger.press('ArrowDown'); await fit('measurement', 'units-open'); await page.keyboard.press('ArrowDown'); await page.keyboard.press('Enter');
      assert.equal((await state()).unit, 'in'); assert.equal((await state()).value, 254);
      await trigger.click(); await page.keyboard.press('ArrowUp'); await page.keyboard.press('Escape'); assert.equal((await state()).unit, 'in');
    });
    await t.test('color palette: pointer, keyboard sliders, cancel, exact round trip and reset', async () => {
      await open('color', { value: '#123456' }); const trigger = page.getByRole('button', { name: 'Choose color', exact: true });
      await trigger.click(); await fit('color', 'palette-open');
      await page.getByRole('button', { name: 'Apply color' }).click(); assert.equal((await state()).value, '#123456');
      await trigger.click(); const plane = await page.locator('.sl-color-plane').boundingBox();
      await page.mouse.move(plane.x + 4, plane.y + 4); await page.mouse.down(); await page.mouse.move(plane.x + plane.width - 4, plane.y + plane.height - 4, { steps: 10 }); await page.mouse.up();
      assert.equal((await state()).value, '#123456'); await page.keyboard.press('Escape'); assert.equal((await state()).value, '#123456');
      await trigger.click(); await page.getByRole('slider', { name: 'Brightness', exact: true }).press('Home'); await page.getByRole('button', { name: 'Apply color' }).click(); assert.equal((await state()).value, '#000000');
      await page.evaluate(() => field.reset()); assert.equal((await state()).value, '#123456');
    });
    await t.test('attachment preview: sample selection, replacement and removal never open an OS chooser', async () => {
      await open('attachment'); await page.evaluate(() => { field.destroy(); field = SLComponent.mountPreview(document.querySelector('.sl-component')); });
      let choosers = 0; const chooser = () => { choosers++; }; page.on('filechooser', chooser);
      assert.equal(await page.locator('input[type="file"]').isVisible(), false);
      for (const [index, name] of ['Project brief.txt', 'Research notes.md', 'Release checklist.txt'].entries()) {
        await page.getByRole('button', { name: 'Choose demo file' }).click(); await fit('attachment', 'demo-open');
        await page.locator('[data-sample="' + index + '"]').click();
        assert.equal((await state()).value.name, name); assert.equal((await state()).valid, true);
        assert.match(await page.locator('.sl-status').innerText(), /Demo file selected/);
      }
      await page.getByRole('button', { name: 'Remove file' }).click(); assert.equal((await state()).value, null);
      await page.getByRole('button', { name: 'Choose demo file' }).click(); await page.keyboard.press('Escape'); assert.equal((await state()).value, null);
      assert.equal(choosers, 0); page.off('filechooser', chooser);
      await page.evaluate(() => { field.destroy(); field = SLComponent.mount(document.querySelector('.sl-component')); });
      assert.equal(await page.locator('input[type="file"]').isVisible(), true);
    });
    await t.test('picker lifecycle: rapid reversal, focus cycle, outside dismissal and remount cleanup', async () => {
      const selectors = { 'date-range': '[data-calendar="start"]', time: '.sl-open-time', measurement: '.sl-unit-trigger', color: '.sl-picker' };
      for (const [purpose, selector] of Object.entries(selectors)) {
        await open(purpose);
        for (let i = 0; i < 8; i++) { await page.locator(selector).click(); await page.keyboard.press('Escape'); }
        assert.equal(await page.locator('.sl-picker-panel').getAttribute('aria-hidden'), 'true');
        await page.locator(selector).click();
        await page.getByRole('button', { name: 'Close picker' }).focus(); await page.keyboard.press('Shift+Tab');
        assert.equal(await page.locator('.sl-picker-panel').evaluate(panel => panel.contains(panel.getRootNode().activeElement)), true);
        await page.mouse.click(1, 1); assert.equal(await page.locator(selector).getAttribute('aria-expanded'), 'false');
        await page.locator(selector).click();
        await page.evaluate(() => { field.destroy(); field = SLComponent.mount(document.querySelector('.sl-component')); });
        assert.equal(await page.locator('.sl-picker-panel').count(), 1);
        assert.equal(await page.locator('.sl-component > [inert]:not(.sl-picker-panel)').count(), 0);
      }
    });
    await t.test('IME completion emits one distinct change and keeps the native editable node', async () => {
      for (const purpose of ['key-value', 'color']) {
        await open(purpose);
        const result = await page.evaluate(purpose => {
          const input = document.querySelector(purpose === 'color' ? '.sl-hex' : '[data-value]');
          input.dispatchEvent(new CompositionEvent('compositionstart', { bubbles: true }));
          input.value = purpose === 'color' ? '#abc123' : '日本語';
          input.dispatchEvent(new InputEvent('input', { bubbles: true, isComposing: true }));
          const during = window.changes;
          input.dispatchEvent(new CompositionEvent('compositionend', { bubbles: true }));
          input.dispatchEvent(new InputEvent('input', { bubbles: true, isComposing: false }));
          return { during, after: window.changes, attached: input.isConnected };
        }, purpose);
        assert.deepEqual(result, { during: 0, after: 1, attached: true });
      }
    });
    for (const entry of batch) await t.test(entry.name + ': isolated Shadow DOM, reset/remount, form reset, disabled, motion and palette', async () => {
      const variant = entry.variants[0], purpose = variant.slice(7, -4);
      await open(purpose); await fit(purpose, 'initial');
      const result = await page.evaluate(({ markup, css }) => {
        window.field.destroy();
        const roots = [], controls = [];
        for (let i = 0; i < 2; i++) {
          const host = document.createElement('div'); document.body.append(host); const shadow = host.attachShadow({ mode: 'open' });
          const form = document.createElement('form'); form.innerHTML = markup;
          const style = document.createElement('style'); style.textContent = css; shadow.append(style, form);
          const root = form.querySelector('.sl-component'); roots.push(root);
          const controller = SLComponent.mount(root); controls.push(controller);
        }
        const initial = JSON.stringify(controls[1].state);
        const input = roots[0].querySelector('input'); if (!['file', 'color', 'date', 'time', 'number'].includes(input.type)) { input.value = 'changed'; input.dispatchEvent(new Event('input', { bubbles: true })); }
        const isolated = initial === JSON.stringify(controls[1].state);
        const ids = roots.flatMap(root => [...root.querySelectorAll('[id]')].map(node => node.id));
        let changes = 0;
        for (let i = 0; i < 4; i++) SLComponent.mount(roots[0], { onChange() { changes++; } });
        const controller = SLComponent.mount(roots[0], { onChange() { changes++; } });
        const before = JSON.stringify(controller.state); controller.reset(); controller.reset();
        const stable = before === JSON.stringify(controller.state);
        const dynamic = roots[0].querySelector('input');
        if (dynamic.type === 'file') { const transfer = new DataTransfer(); transfer.items.add(new File(['notes'], 'test.md')); dynamic.files = transfer.files; }
        else dynamic.value = ({ date: '2020-01-01', time: '12:05', number: '2', color: '#010101' })[dynamic.type] || 'a new draft';
        dynamic.dispatchEvent(new Event(dynamic.type === 'file' ? 'change' : 'input', { bubbles: true }));
        const changeCount = changes;
        controller.destroy(); controller.destroy(); changes = 0; dynamic.dispatchEvent(new Event('input', { bubbles: true }));
        const clean = changes === 0;
        const disabled = SLComponent.mount(roots[0], { disabled: true }); disabled.reset();
        const allDisabled = [...roots[0].querySelectorAll('input, select, button')].every(node => node.disabled);
        disabled.destroy(); controls[1].destroy();
        document.body.querySelectorAll('div').forEach(node => { if (node.shadowRoot) node.remove(); });
        return { isolated, unique: new Set(ids).size === ids.length, stable, changeCount, clean, allDisabled };
      }, { markup: sources.get(variant)['index.html'].match(/<body>([\s\S]*?)<\/body>/)[1], css: sources.get(variant)['buttons.css'] });
      assert.equal(result.isolated, true); assert.equal(result.unique, true); assert.equal(result.stable, true);
      assert.equal(result.changeCount, ['tokens', 'combobox', 'editable-title'].includes(purpose) ? 0 : 1, JSON.stringify(result)); assert.equal(result.clean, true); assert.equal(result.allDisabled, true);
      const changed = await page.evaluate(purpose => {
        const root = document.querySelector('.sl-component'), form = document.createElement('form'); root.before(form); form.append(root);
        window.field = SLComponent.mount(root); window.beforeReset = JSON.stringify(field.state);
        const input = root.querySelector('input');
        if (purpose === 'editable-title') root.querySelector('.sl-edit').click();
        if (input.type === 'file') { const transfer = new DataTransfer(); transfer.items.add(new File(['notes'], 'test.md', { type: 'text/markdown' })); input.files = transfer.files; }
        else input.value = ({ date: '2001-01-01', time: '12:00', number: '2', color: '#123456' })[input.type] || 'changed';
        input.dispatchEvent(new Event(input.type === 'file' ? 'change' : 'input', { bubbles: true }));
        if (purpose === 'tokens') root.querySelector('.sl-add').click();
        if (purpose === 'editable-title') root.querySelector('.sl-apply').click();
        const different = JSON.stringify(field.state) !== window.beforeReset;
        form.reset(); return different;
      }, purpose);
      assert.equal(changed, true, purpose + ': reset must be tested after a real change');
      assert.equal(await page.evaluate(() => JSON.stringify(field.state) === window.beforeReset), true);
      await page.emulateMedia({ reducedMotion: 'reduce' });
      assert.equal(await page.locator('input').first().evaluate(node => getComputedStyle(node).transitionDuration), '0s');
      await page.emulateMedia({ reducedMotion: 'no-preference' });
      await page.locator('.sl-component').evaluate(root => { root.style.setProperty('--field-surface', '#25303b'); root.style.setProperty('--field-text', '#ffffff'); root.style.setProperty('--field-accent', '#d8e8f7'); root.style.setProperty('--field-focus', '#d8e8f7'); });
      assert.equal(await page.locator('.sl-component').evaluate(root => getComputedStyle(root).backgroundColor), 'rgb(37, 48, 59)');
      assert.equal(await page.locator('.sl-heading svg').evaluate(node => getComputedStyle(node).color), 'rgb(216, 232, 247)');
      if (screenshots) await page.screenshot({ path: join(screenshots, `${purpose}-palette.png`), scale: 'css' });
    });
    await t.test('standalone views remain within 320, 768, 1024 and 1440 pixel viewports', async () => {
      for (const width of [320, 768, 1024, 1440]) {
        await page.setViewportSize({ width, height: 700 });
        for (const entry of batch) {
          await open(entry.variants[0].slice(7, -4));
          const fit = await page.locator('.sl-component').evaluate(root => { const r = root.getBoundingClientRect(); return r.width <= 320 && r.left >= 0 && r.right <= innerWidth && r.top >= 0 && r.bottom <= innerHeight && document.documentElement.scrollWidth <= innerWidth; });
          assert.equal(fit, true, `${entry.name} at ${width}`);
        }
      }
    });
    assert.deepEqual(errors, []); assert.deepEqual(external, []);
  } finally { await context.close(); await browser.close(); await new Promise(resolve => { server.close(resolve); server.closeAllConnections(); }); }
});
