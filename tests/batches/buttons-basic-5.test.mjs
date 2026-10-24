import {withFrameworkFiles} from '../framework-file-contract.mjs';
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { createServer } from 'node:http';
import { once } from 'node:events';
import { pathToFileURL } from 'node:url';
import { Script } from 'node:vm';
import batch from '../../public/catalog-batches/buttons-basic-5.js';
import { components as releasedComponents } from '../../public/catalog-data.js';

const project = new URL('../../', import.meta.url);
const files = withFrameworkFiles(['index.html','buttons.css','buttons.js','example.js','instrument-sans-variable.woff2','OFL.txt','LICENSE']);
const expected = [["buttons-close-item-v11","closeState","open","closed","setCloseState"],["buttons-open-external-v11","openState","inline","external","setOpenState"],["buttons-read-toggle-v11","readState","unread","read","setReadState"],["buttons-flag-toggle-v11","flagState","clear","flagged","setFlagState"],["buttons-snooze-toggle-v11","snoozeState","active","snoozed","setSnoozeState"],["buttons-publish-toggle-v11","publishState","draft","published","setPublishState"],["buttons-sync-toggle-v11","syncState","local","synced","setSyncState"],["buttons-report-toggle-v11","reportState","clear","reporting","setReportState"],["buttons-power-toggle-v11","powerState","off","on","setPowerState"],["buttons-group-toggle-v11","groupState","separate","grouped","setGroupState"]];
const read = (variant, file) => readFile(new URL('public/packages/' + variant + '/' + file, project), 'utf8');

test('fifth basic buttons review batch has ten distinct complete packages', async () => {
  assert.equal(batch.length, 10);
  assert.deepEqual(batch.map(item => item.variants[0]), expected.map(item => item[0]));
  assert.equal(new Set(batch.map(item => item.id)).size, 10);
  for (const item of batch) assert.ok(releasedComponents.some(component => component.id === item.id));
  for (const item of batch) {
    const variant = item.variants[0];
    assert.equal(item.category, 'buttons');
    assert.equal(item.downloads[variant], './downloads/matte-' + variant + '.zip');
    assert.deepEqual((await readdir(new URL('public/packages/' + variant + '/', project))).sort(), [...files].sort());
    const [html, css, js, example] = await Promise.all(['index.html','buttons.css','buttons.js','example.js'].map(file => read(variant, file)));
    assert.match(html, /<html lang="en">/);
    assert.equal((html.match(/data-action/g) || []).length, 1);
    assert.match(html, /data-probe/);
    assert.doesNotMatch(html, /data-preview|sample-window/);
    assert.match(css, /prefers-reduced-motion/);
    assert.match(css, /forced-colors/);
    assert.match(css, /:focus-visible/);
    assert.doesNotMatch(css, /(?:^|\n)\s*(?:button|input|svg|:root|\*)\s*\{/);
    assert.doesNotMatch(js, /innerHTML|insertAdjacentHTML|document\.activeElement|fetch\(|XMLHttpRequest|localStorage/);
    assert.match(js, /root\.getRootNode\(\)\.activeElement/);
    assert.match(js, /reset\(\)/);
    assert.match(js, /destroy\(\)/);
    assert.match(example, /SLComponent\.mountPreview/);
    assert.doesNotMatch(html + css + js + example, /https?:\/\//);
    new Script(js, { filename: variant + '/buttons.js' });
    new Script(example, { filename: variant + '/example.js' });
  }
});

test('reviewed Power and Group keep button-native, unambiguous glyphs', async () => {
  const [powerHtml, groupHtml, groupCss] = await Promise.all([
    read('buttons-power-toggle-v11', 'index.html'),
    read('buttons-group-toggle-v11', 'index.html'),
    read('buttons-group-toggle-v11', 'buttons.css')
  ]);
  assert.match(powerHtml, /class="power-ring"/);
  assert.match(powerHtml, /class="power-stem"/);
  assert.doesNotMatch(powerHtml, /power-track|power-knob/);
  assert.equal((groupHtml.match(/class="group-card/g) || []).length, 2);
  assert.doesNotMatch(groupHtml, /group-boundary|check|badge|plus/);
  const cards = [...groupHtml.matchAll(/<rect\b([^>]+)\/>/g)].map(([, attributes]) =>
    Object.fromEntries([...attributes.matchAll(/([\w-]+)="([^"]*)"/g)].map(([, name, value]) => [name, value])));
  assert.equal(cards.length, 2, 'only the two item squares form the Group glyph');
  assert.deepEqual(cards.map(card => [card.class, card.x, card.y, card.width, card.height, card.rx]), [
    ['group-card group-left', '4', '4', '7', '7', '2'],
    ['group-card group-right', '13', '13', '7', '7', '2']
  ]);
  assert.match(groupHtml, /<svg viewBox="0 0 24 24"/);
  const activeRule = side => groupCss.match(new RegExp('\\[data-active="true"\\] \\.' + side + '\\{([^}]+)\\}'))?.[1];
  const leftRule = activeRule('group-left'), rightRule = activeRule('group-right');
  assert.match(leftRule, /^transform:translate\(4\.5px,4\.5px\)$/);
  assert.match(rightRule, /^transform:translate\(-4\.5px,-4\.5px\);opacity:0$/);
  const offsets = [leftRule, rightRule].map(rule => rule.match(/translate\((-?[\d.]+)px,(-?[\d.]+)px\)/).slice(1).map(Number));
  const grouped = cards.map((card, index) => ({ x: Number(card.x) + offsets[index][0], y: Number(card.y) + offsets[index][1], width: Number(card.width), height: Number(card.height) }));
  assert.deepEqual(grouped[0], grouped[1], 'both item squares converge onto identical geometry');
  assert.equal(grouped[0].x + grouped[0].width / 2, 12, 'grouped square is horizontally centered');
  assert.equal(grouped[0].y + grouped[0].height / 2, 12, 'grouped square is vertically centered');
  assert.doesNotMatch(leftRule, /opacity|visibility|display/, 'the central left square remains visible');
  assert.match(rightRule, /opacity:0$/, 'the overlapping right square disappears, leaving one visible square');
});

let chromium;
try {
  ({ chromium } = process.env.SL_UI_PLAYWRIGHT_MODULE ? await import(pathToFileURL(process.env.SL_UI_PLAYWRIGHT_MODULE).href) : await import('playwright'));
} catch (error) { if (process.env.SL_UI_PLAYWRIGHT_MODULE) throw error; }

test('real browser: fifth basic buttons animate, reverse, remount and fit narrow previews', { skip: !chromium && 'Provide SL_UI_PLAYWRIGHT_MODULE to run browser checks.', timeout: 120000 }, async () => {
  const variants = expected.map(item => item[0]);
  const server = createServer(async (request, response) => {
    const pathname = new URL(request.url, 'http://localhost').pathname;
    const match = pathname.match(/^\/packages\/(buttons-[a-z-]+-v11)\/([a-zA-Z0-9.-]+)$/);
    if (!match || !variants.includes(match[1]) || !files.includes(match[2])) { response.writeHead(404).end(); return; }
    const body = await readFile(new URL('public/packages/' + match[1] + '/' + match[2], project));
    const extension = match[2].split('.').at(-1);
    const mime = { html:'text/html', css:'text/css', js:'text/javascript', woff2:'font/woff2' }[extension] || 'text/plain';
    response.writeHead(200, { 'Content-Type': mime + (mime.startsWith('text/') ? '; charset=utf-8' : '') }).end(body);
  });
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  const origin = 'http://127.0.0.1:' + server.address().port;
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 226, height: 230 } });
  const page = await context.newPage();
  const errors = [], external = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('request', request => { if (!request.url().startsWith(origin) && !request.url().startsWith('data:')) external.push(request.url()); });
  try {
    for (const [variant, key, initial, active, method] of expected) {
      await page.goto(origin + '/packages/' + variant + '/index.html');
      const before = await page.evaluate(() => { window.control = SLComponent.mountPreview(document.querySelector('.sl-component')); const probe = getComputedStyle(document.querySelector('[data-probe]')); return { state: window.control.state, probe: [probe.transform, probe.opacity, probe.strokeDashoffset] }; });
      assert.equal(before.state[key], initial, variant);
      const initialCenters = await page.evaluate(() => { const b=document.querySelector('[data-action]').getBoundingClientRect(), l=document.querySelector('[data-label]').getBoundingClientRect(); return [b.left+b.width/2,l.left+l.width/2]; });
      assert.ok(Math.abs(initialCenters[0] - initialCenters[1]) <= 1, variant);
      await page.locator('[data-action]').click();
      await page.waitForTimeout(500);
      const after = await page.evaluate(() => { const probe = getComputedStyle(document.querySelector('[data-probe]')); return { state: window.control.state, probe: [probe.transform, probe.opacity, probe.strokeDashoffset] }; });
      assert.equal(after.state[key], active, variant);
      assert.equal(await page.locator('[data-action]').getAttribute('aria-pressed'), 'true', variant);
      assert.notDeepEqual(after.probe, before.probe, variant);
      await page.locator('[data-action]').click();
      await page.waitForTimeout(500);
      assert.equal((await page.evaluate(() => window.control.state))[key], initial, variant);
      await page.locator('[data-action]').click();
      await page.waitForTimeout(70);
      await page.locator('[data-action]').click();
      await page.waitForTimeout(500);
      assert.equal((await page.evaluate(() => window.control.state))[key], initial, variant + " rapid reversal");
      const lifecycle = await page.evaluate(({ key, active, method }) => {
        const root=document.querySelector('.sl-component'); let changes=0, events=0; root.addEventListener('sl:action',()=>events++);
        const old=SLComponent.mount(root,{onChange:()=>changes++}); const current=SLComponent.mount(root,{onChange:()=>changes++});
        const stale=old.toggle(); current[method](active); const silent={changes,events,value:current.state[key]};
        root.querySelector('[data-action]').click(); const user={changes,events,value:current.state[key]};
        current.reset(); current.reset(); current.destroy(); current.destroy(); return {stale,silent,user,final:current.state[key]};
      }, { key, active, method });
      assert.equal(lifecycle.stale, false, variant);
      assert.deepEqual(lifecycle.silent, { changes:0, events:0, value:active }, variant);
      assert.deepEqual(lifecycle.user, { changes:1, events:1, value:initial }, variant);
      assert.equal(lifecycle.final, initial, variant);
      const rect = await page.locator('.sl-component').evaluate(node => { const b=node.getBoundingClientRect(); return {left:b.left,right:b.right,top:b.top,bottom:b.bottom}; });
      assert.ok(rect.left >= -.5 && rect.right <= 226.5 && rect.top >= -.5 && rect.bottom <= 230.5, variant);
    }
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(origin + '/packages/buttons-power-toggle-v11/index.html');
    await page.locator('[data-action]').click();
    assert.equal(await page.locator('.button-surface').evaluate(node => getComputedStyle(node).transitionDuration), '0s');
    assert.deepEqual(errors, []);
    assert.deepEqual(external, []);
  } finally { await context.close(); await browser.close(); server.close(); await once(server, "close"); }
});
