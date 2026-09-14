import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir, mkdir } from 'node:fs/promises';
import { createServer } from 'node:http';
import { once } from 'node:events';
import { pathToFileURL } from 'node:url';
import { join } from 'node:path';
import { Script } from 'node:vm';
import { createHash } from 'node:crypto';
import batch from '../../public/catalog-batches/buttons.js';

const project = new URL('../../', import.meta.url);
const read = (variant, file) => readFile(new URL(`public/packages/${variant}/${file}`, project), 'utf8');
const names = ['index.html', 'buttons.css', 'buttons.js', 'example.js', 'instrument-sans-variable.woff2', 'OFL.txt', 'LICENSE'];
const variants = batch.map(item => item.variants[0]);

test('buttons batch has ten distinct, complete and offline exports', async () => {
  assert.equal(batch.length, 10);
  assert.equal(new Set(batch.map(item => item.id)).size, 10);
  assert.equal(new Set(variants).size, 10);
  const sourceHashes = new Set();
  const font = await readFile(new URL('public/packages/connection-feedback/instrument-sans-variable.woff2', project));
  const license = await readFile(new URL('LICENSE', project), 'utf8');
  for (const item of batch) {
    const variant = item.variants[0];
    assert.equal(item.category, 'buttons');
    assert.match(variant, /^buttons-[a-z-]+-v11$/);
    assert.equal(item.downloads[variant], `./downloads/matte-${variant}.zip`);
    assert.equal(item.usage.length, 3);
    assert.deepEqual((await readdir(new URL(`public/packages/${variant}/`, project))).sort(), [...names].sort());
    const [html, css, js, example] = await Promise.all(['index.html', 'buttons.css', 'buttons.js', 'example.js'].map(file => read(variant, file)));
    assert.match(html, /<html lang="en">/);
    assert.match(html, /name="viewport"/);
    assert.equal((html.match(/class="sl-component"/g) || []).length, 1);
    assert.match(html, /data-kind="buttons-[a-z-]+"/);
    assert.doesNotMatch(html.split('<body>')[1], /<script/);
    assert.match(html, /<script src="\.\/buttons.js" defer>/);
    assert.match(css, /@font-face/);
    assert.match(css, /prefers-reduced-motion/);
    assert.match(css, /:focus-visible/);
    assert.match(css, /--action-on-accent/);
    assert.doesNotMatch(css, /(?:^|\n)\s*(?:button|input|svg|:root|\*)\s*\{/);
    assert.doesNotMatch(js, /innerHTML|insertAdjacentHTML|document\.activeElement|fetch\(|XMLHttpRequest|localStorage/);
    assert.match(js, /root\.getRootNode\(\)\.activeElement/);
    assert.match(js, /window\.SLComponent = \{ mount, mountPreview \}/);
    assert.match(js, /reset\(\)/);
    assert.match(js, /destroy\(\)/);
    assert.match(example, /SLComponent\.mountPreview/);
    assert.doesNotMatch(html + css + js + example, /https?:\/\//);
    new Script(js, { filename: variant + '/buttons.js' });
    new Script(example, { filename: variant + '/example.js' });
    // The shared compiler must be able to extract and return the controller.
    const expression = js.match(/\(\(\) => \{[\s\S]*\}\)\(\);\s*$/)?.[0];
    assert.ok(expression, variant);
    new Script('const api = ' + expression.replace(/window\.\w+\s*=\s*(\{[^;]+\});/, 'return $1;'));
    assert.deepEqual(await readFile(new URL(`public/packages/${variant}/instrument-sans-variable.woff2`, project)), font);
    assert.equal(await read(variant, 'LICENSE'), license);
    sourceHashes.add(createHash('sha256').update(js).digest('hex'));
  }
  assert.equal(sourceHashes.size, 10, 'Ten distinct controllers, not label variants');
});

// Set SL_UI_PLAYWRIGHT_MODULE to an existing Playwright module's index.mjs.
// This keeps the repository dependency-free and never installs a browser.
let chromium;
try {
  ({ chromium } = process.env.SL_UI_PLAYWRIGHT_MODULE
    ? await import(pathToFileURL(process.env.SL_UI_PLAYWRIGHT_MODULE).href)
    : await import('playwright'));
} catch (error) {
  if (process.env.SL_UI_PLAYWRIGHT_MODULE) throw error;
}

test('real browser: ten interactions, lifecycle, narrow Shadow DOM and palette', { skip: !chromium && 'Provide SL_UI_PLAYWRIGHT_MODULE to run browser behavior checks.', timeout: 120000 }, async t => {
  const server = createServer(async (request, response) => {
    const match = new URL(request.url, 'http://localhost').pathname.match(/^\/packages\/(buttons-[a-z-]+-v11)\/([a-zA-Z0-9.-]+)$/);
    if (!match || !variants.includes(match[1]) || !names.includes(match[2])) { response.writeHead(404).end(); return; }
    const body = await readFile(new URL(`public/packages/${match[1]}/${match[2]}`, project));
    const mime = { html: 'text/html', css: 'text/css', js: 'text/javascript', woff2: 'font/woff2' }[match[2].split('.').at(-1)] || 'text/plain';
    response.writeHead(200, { 'Content-Type': mime + (mime.startsWith('text/') ? '; charset=utf-8' : '') }).end(body);
  });
  server.listen(0, '127.0.0.1'); await once(server, 'listening');
  const origin = `http://127.0.0.1:${server.address().port}`;
  const browser = await chromium.launch({ headless: true, ...(process.env.SL_UI_BROWSER_CHANNEL ? { channel: process.env.SL_UI_BROWSER_CHANNEL } : {}) });
  const context = await browser.newContext({ viewport: { width: 768, height: 650 } });
  const page = await context.newPage();
  const errors = [], external = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('request', request => { if (!request.url().startsWith(origin) && !request.url().startsWith('data:')) external.push(request.url()); });
  const load = async slug => {
    await page.goto(`${origin}/packages/buttons-${slug}-v11/index.html`);
    await page.evaluate(() => { window.control = SLComponent.mountPreview(document.querySelector('.sl-component')); });
  };
  const state = () => page.evaluate(() => window.control.state);
  try {
    await t.test('split format menu: arrows, choice, Escape, focus and one export', async () => {
      await load('split-action');
      await page.locator('[data-toggle]').focus(); await page.keyboard.press('ArrowDown');
      assert.equal(await page.evaluate(() => document.activeElement.dataset.format), 'SVG');
      await page.keyboard.press('ArrowDown'); await page.keyboard.press('Enter');
      assert.equal((await state()).format, 'PNG');
      assert.equal(await page.locator('[data-toggle]').getAttribute('aria-expanded'), 'false');
      await page.locator('[data-toggle]').click(); await page.keyboard.press('End');
      assert.equal(await page.evaluate(() => document.activeElement.dataset.format), 'PDF');
      await page.keyboard.press('Escape');
      assert.equal(await page.evaluate(() => document.activeElement.hasAttribute('data-toggle')), true);
      await page.locator('[data-run]').click();
      await page.locator('[data-run]').dispatchEvent('click');
      assert.equal((await state()).phase, 'pending');
      await page.locator('[data-cancel]').click();
      assert.equal((await state()).phase, 'canceled');
      await page.waitForTimeout(1000);
      assert.equal((await state()).phase, 'canceled');
    });

    await t.test('processing: real progress, bounds, stale reports, rejection and retry', async () => {
      await load('cancellable-process');
      const result = await page.evaluate(async () => {
        const root = document.querySelector('.sl-component');
        let finish, report, signal, calls = 0;
        const c = SLComponent.mount(root, { onProcess(context) { calls++; report = context.onProgress; signal = context.signal; return new Promise(resolve => { finish = resolve; }); } });
        const pending = c.start(); const repeated = await c.start();
        report(.42); report(.2); report(NaN); const progress = c.state.progress;
        report(2); const capped = c.state.progress;
        c.cancel(); report(.9); finish(); await pending;
        const canceled = c.state; c.reset(); report(1); const reset = c.state;
        const error = SLComponent.mount(root, { onProcess: () => Promise.reject(new Error('Expected test failure')) });
        await error.start(); const failed = error.state.phase;
        window.control = SLComponent.mount(root, { onProcess: ({ onProgress }) => { onProgress(.7); } });
        await window.control.start();
        return { calls, repeated, progress, capped, canceled, reset, aborted: signal.aborted, failed, final: window.control.state };
      });
      assert.equal(result.calls, 1); assert.equal(result.repeated, false);
      assert.equal(result.progress, 42); assert.equal(result.capped, 100);
      assert.equal(result.canceled.phase, 'canceled'); assert.equal(result.reset.progress, 0); assert.equal(result.aborted, true);
      assert.equal(result.failed, 'error'); assert.equal(result.final.phase, 'complete'); assert.equal(result.final.progress, 100);
    });

    await t.test('hold: early release, pointer confirmation and untimed keyboard path', async () => {
      await load('hold-confirm');
      await page.evaluate(() => {
        window.confirms = 0;
        window.control = SLComponent.mount(document.querySelector('.sl-component'), { holdMs: 500, onConfirm: () => { window.confirms++; } });
      });
      const box = await page.locator('[data-hold]').boundingBox();
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
      await page.mouse.down(); await page.waitForTimeout(80); await page.mouse.up();
      assert.equal(await page.evaluate(() => window.confirms), 0);
      await page.mouse.down(); await page.waitForTimeout(600); await page.mouse.up();
      assert.equal(await page.evaluate(() => window.confirms), 1);
      await page.evaluate(() => window.control.reset());
      await page.locator('[data-hold]').focus(); await page.keyboard.press('Space');
      assert.equal((await state()).open, true);
      assert.equal(await page.evaluate(() => document.activeElement.hasAttribute('data-confirm')), true);
      await page.keyboard.press('Escape'); assert.equal((await state()).open, false);
      await page.locator('[data-confirm-open]').click(); await page.locator('[data-confirm]').click();
      assert.equal(await page.evaluate(() => window.confirms), 2);
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.locator('[data-confirm-open]').click(); await page.locator('[data-back]').click();
      assert.equal((await state()).open, false);
      await page.emulateMedia({ reducedMotion: 'no-preference' });
    });

    await t.test('queue: bounds, removal, serial execution, retry and literal labels', async () => {
      await load('action-queue');
      await page.locator('[data-add]').click(); await page.locator('[data-add]').click(); await page.locator('[data-add]').click();
      assert.equal(await page.locator('[data-add]').isDisabled(), true);
      await page.locator('[data-remove="1"]').click(); assert.equal((await state()).items.length, 2);
      const result = await page.evaluate(async () => {
        const root = document.querySelector('.sl-component'); let calls = [], fail = true;
        const c = SLComponent.mount(root, { async onRun({ id }) { calls.push(id); if (id === 2 && fail) throw new Error('Expected failure'); } });
        c.add('Первый <b>take</b>'); c.add('Second'); c.add('Third');
        const literal = root.querySelector('[data-job-label]').textContent;
        const fourth = c.add('Fourth'); await c.start(); const stopped = c.state;
        fail = false; await c.start(); window.control = c;
        return { literal, injected: !!root.querySelector('b'), fourth, stopped, calls, final: c.state };
      });
      assert.equal(result.literal, 'Первый <b>take</b>'); assert.equal(result.injected, false); assert.equal(result.fourth, false);
      assert.equal(result.stopped.completed, 1); assert.equal(result.stopped.items.length, 2);
      assert.deepEqual(result.calls, [1, 2, 2, 3]); assert.equal(result.final.completed, 3); assert.equal(result.final.items.length, 0);
    });

    await t.test('recording: elapsed time, failed stop, cleanup and late canceled session', async () => {
      await load('record-take');
      await page.evaluate(() => {
        window.disposals = 0; window.failStop = true;
        window.control = SLComponent.mount(document.querySelector('.sl-component'), {
          onStart: () => ({ dispose() { window.disposals++; } }),
          onStop: () => { if (window.failStop) throw new Error('Expected stop failure'); if (window.cancelStop) return { status: 'canceled' }; }
        });
      });
      await page.locator('[data-run]').click(); await page.waitForTimeout(1100);
      assert.equal((await state()).recording, true); assert.ok((await state()).elapsed >= 1);
      await page.locator('[data-stop]').click(); assert.equal((await state()).recording, true);
      const canceledFocus = await page.evaluate(async () => {
        window.failStop = false; window.cancelStop = true;
        const pending = window.control.stop(); document.querySelector('[data-cancel]').focus(); await pending;
        window.cancelStop = false;
        return { recording: window.control.state.recording, focus: document.activeElement.hasAttribute('data-stop') };
      });
      assert.deepEqual(canceledFocus, { recording: true, focus: true });
      await page.evaluate(() => { window.failStop = false; }); await page.locator('[data-stop]').click();
      assert.equal((await state()).recording, false); assert.equal(await page.evaluate(() => window.disposals), 1);
      const result = await page.evaluate(async () => {
        const root = document.querySelector('.sl-component'); let finish, disposed = 0;
        const c = SLComponent.mount(root, { onStart: () => new Promise(resolve => { finish = resolve; }), onStop() {} });
        const work = c.start(); c.cancel(); finish({ dispose() { disposed++; } }); await work;
        const late = { disposed, ...c.state };
        let lifetime;
        window.control = SLComponent.mount(root, { onStart({ signal }) { lifetime = signal; return { dispose() { disposed++; } }; }, onStop() {} });
        await window.control.start(); window.control.reset(); window.control.reset(); window.control.destroy(); window.control.destroy();
        return { late, disposed, aborted: lifetime.aborted, state: window.control.state };
      });
      assert.equal(result.late.disposed, 1); assert.equal(result.late.recording, false);
      assert.equal(result.disposed, 2); assert.equal(result.aborted, true); assert.equal(result.state.elapsed, 0);
    });

    await t.test('decision: approve, reject, undo and silent restoration', async () => {
      await load('review-decision');
      await page.locator('[data-approve]').focus(); await page.keyboard.press('Enter');
      assert.equal((await state()).decision, 'approve');
      await page.locator('[data-reject]').click(); assert.equal((await state()).decision, 'reject');
      assert.equal(await page.locator('[data-reject]').getAttribute('aria-pressed'), 'true');
      await page.locator('[data-undo]').click(); assert.equal((await state()).decision, 'approve');
      await page.locator('[data-undo]').click(); assert.equal((await state()).decision, null);
      await page.evaluate(() => { window.control.setDecision('reject'); });
      assert.equal((await state()).decision, 'reject');
    });

    await t.test('refresh: retained data, validated results and literal success text', async () => {
      await load('refresh-snapshot');
      const result = await page.evaluate(async () => {
        const root = document.querySelector('.sl-component'); let finish;
        const c = SLComponent.mount(root, { initialCount: 7, onRefresh: () => new Promise(resolve => { finish = resolve; }) });
        const work = c.start(); const pendingCount = c.state.count;
        c.cancel(); finish({ count: 99 }); await work; const canceledCount = c.state.count;
        const bad = SLComponent.mount(root, { initialCount: 7, onRefresh: () => ({ count: -1 }) }); await bad.start();
        const invalid = bad.state;
        window.control = SLComponent.mount(root, { onRefresh: () => ({ count: 31, label: 'Готово <img src=x onerror=alert(1)>' }) });
        await window.control.start();
        return { pendingCount, canceledCount, invalid, final: window.control.state, text: root.querySelector('[data-status]').textContent, injected: !!root.querySelector('img') };
      });
      assert.equal(result.pendingCount, 7); assert.equal(result.canceledCount, 7);
      assert.equal(result.invalid.phase, 'error'); assert.equal(result.invalid.count, 7);
      assert.equal(result.final.count, 31); assert.equal(result.final.version, 1);
      assert.equal(result.text, 'Готово <img src=x onerror=alert(1)>'); assert.equal(result.injected, false);
    });

    await t.test('duplicate: keyboard, confirmed copy, repeat suppression, cancellation and literal results', async () => {
      await load('duplicate-item');
      await page.locator('[data-run]').focus(); await page.keyboard.press('Enter');
      await page.waitForFunction(() => window.control.state.phase === 'complete');
      assert.equal((await state()).copies, 1);
      assert.equal(await page.locator('[data-created]').textContent(), 'Project brief — copy 1');
      assert.equal(await page.locator('[data-source]').textContent(), 'Project brief');
      await page.keyboard.press('Space');
      await page.waitForFunction(() => window.control.state.copies === 2);
      await page.locator('[data-run]').click(); await page.locator('[data-cancel]').focus();
      await page.keyboard.press('Escape');
      assert.equal((await state()).phase, 'canceled');
      assert.equal((await state()).copies, 2);
      assert.equal(await page.evaluate(() => document.activeElement.hasAttribute('data-run')), true);
      const result = await page.evaluate(async () => {
        const root = document.querySelector('.sl-component');
        let finish, signal, calls = 0;
        const c = SLComponent.mount(root, { onDuplicate(context) { calls++; signal = context.signal; return new Promise(resolve => { finish = resolve; }); } });
        const pending = c.start(), repeated = await c.start(); c.cancel();
        finish({ id: 'late', label: 'Late copy' }); await pending;
        const canceled = c.state; c.reset();
        const disposed = c.start(); c.destroy(); finish({ id: 'disposed', label: 'Disposed copy' }); await disposed;
        const fresh = SLComponent.mount(root, { onDuplicate: () => ({ id: 'literal', label: '<b>Copy & text</b>' }) });
        await fresh.start(); const literal = root.querySelector('[data-created]').textContent;
        const injected = !!root.querySelector('b'); const snapshot = fresh.state; snapshot.lastCreated.label = 'mutated';
        const protectedLabel = fresh.state.lastCreated.label;
        const invalid = await fresh.start(); const invalidState = fresh.state;
        let fails = true;
        const retry = SLComponent.mount(root, { onDuplicate: () => { if (fails) { fails = false; throw new Error('Expected failure'); } return { id: 'retried', label: 'Retry copy' }; } });
        const failed = await retry.start(); const phase = retry.state.phase; const retried = await retry.start();
        const aborted = signal.aborted; window.control = retry;
        return { calls, repeated, canceled, aborted, literal, injected, protectedLabel, invalid, invalidState, failed, phase, retried, final: retry.state };
      });
      assert.equal(result.calls, 2); assert.equal(result.repeated, false);
      assert.equal(result.canceled.copies, 0); assert.equal(result.canceled.lastCreated, null); assert.equal(result.aborted, true);
      assert.equal(result.literal, '<b>Copy & text</b>'); assert.equal(result.injected, false); assert.equal(result.protectedLabel, result.literal);
      assert.equal(result.invalid, false); assert.equal(result.invalidState.phase, 'error'); assert.equal(result.invalidState.copies, 1);
      assert.equal(result.failed, false); assert.equal(result.phase, 'error'); assert.equal(result.retried, true); assert.equal(result.final.copies, 1);
    });

    await t.test('repeat stepper: pointer hold, keyboard reversal and limits', async () => {
      await load('repeat-stepper');
      await page.locator('[data-plus]').click(); assert.equal((await state()).value, 4);
      const box = await page.locator('[data-plus]').boundingBox();
      await page.mouse.move(box.x + 20, box.y + 20); await page.mouse.down(); await page.waitForTimeout(650); await page.mouse.up();
      assert.ok((await state()).value >= 7);
      await page.keyboard.press('End'); assert.equal((await state()).value, 12);
      await page.keyboard.press('ArrowLeft'); assert.equal((await state()).value, 11);
      await page.keyboard.press('Home'); assert.equal((await state()).value, 1);
      await page.keyboard.press('ArrowUp'); assert.equal((await state()).value, 2);
      await page.keyboard.press('Space'); assert.equal((await state()).value, 3);
      await page.evaluate(() => window.control.reset());
      await page.waitForTimeout(450); assert.equal((await state()).value, 3);
    });

    await t.test('shuffle: no repeated pick, one-level undo and literal choices', async () => {
      await load('shuffle-choice');
      await page.locator('[data-shuffle]').click(); assert.notEqual((await state()).index, 0);
      await page.locator('[data-undo]').click(); assert.equal((await state()).index, 0);
      const result = await page.evaluate(() => {
        const root = document.querySelector('.sl-component');
        const c = SLComponent.mount(root, { choices: ['<b>Тихая форма</b>', '明るい線'], random: () => 0 });
        const values = [c.state.index]; for (let i = 0; i < 10; i++) { c.shuffle(); values.push(c.state.index); }
        window.control = c;
        return { values, text: root.querySelector('[data-choice]').textContent, injected: !!root.querySelector('b') };
      });
      assert.deepEqual(result.values, [0,1,0,1,0,1,0,1,0,1,0]);
      assert.equal(result.text, '<b>Тихая форма</b>'); assert.equal(result.injected, false);
    });

    await t.test('all asynchronous demos finish, cancel and reset without deferred side effects', async () => {
      const results = await Promise.all(['split-action', 'cancellable-process', 'hold-confirm', 'action-queue', 'record-take', 'refresh-snapshot', 'duplicate-item'].map(async slug => {
        const demoPage = await context.newPage();
        demoPage.on('pageerror', error => errors.push(error.message));
        try {
          await demoPage.goto(`${origin}/packages/buttons-${slug}-v11/index.html`);
          return await demoPage.evaluate(async slug => {
            const root = document.querySelector('.sl-component');
            const c = SLComponent.mountPreview(root);
            if (c.add) c.add();
            const completed = await (c.start ? c.start() : c.confirm());
            const completePhase = c.state.phase;
            if (c.stop) await c.stop();
            const stopped = !c.state.recording;
            c.reset(); if (c.add) c.add();
            const pending = c.start ? c.start() : c.confirm();
            root.querySelector('[data-cancel]').focus(); c.cancel();
            const canceled = await pending;
            c.reset(); const final = c.state;
            c.destroy();
            return { slug, completed, completePhase, stopped, canceled, final };
          }, slug);
        } finally { await demoPage.close(); }
      }));
      for (const result of results) {
        assert.equal(result.completed, true, result.slug);
        assert.equal(result.completePhase, 'complete', result.slug);
        assert.equal(result.stopped, true, result.slug);
        assert.equal(result.canceled, false, result.slug);
        assert.equal(result.final.phase, 'idle', result.slug);
      }
    });

    await t.test('all controllers: missing callbacks, reset equivalence, repeated mounts and isolated roots', async () => {
      for (const slug of variants.map(variant => variant.slice(8, -4))) {
        await load(slug);
        const result = await page.evaluate(slug => {
          const root = document.querySelector('.sl-component');
          const clone = root.cloneNode(true); root.after(clone);
          const a = SLComponent.mountPreview(root), b = SLComponent.mountPreview(clone);
          const serialize = node => node.nodeType === 1 ? { tag: node.tagName, attrs: [...node.attributes].filter(a => a.name !== 'style').map(a => [a.name, a.value]).sort(([a],[b]) => a.localeCompare(b)), style: [...node.style].sort().map(property => [property, node.style.getPropertyValue(property), node.style.getPropertyPriority(property)]), children: [...node.childNodes].map(serialize) } : node.textContent;
          const before = JSON.stringify(serialize(root));
          if (a.choose) a.choose('reject'); else if (a.shuffle) a.shuffle(); else if (a.setValue) a.setValue(9);
          else if (a.add) a.add(); else if (a.open) a.open();
          const isolated = JSON.stringify(b.state);
          a.reset(); a.reset(); const restored = JSON.stringify(serialize(root)) === before;
          a.destroy(); a.destroy();
          const old = SLComponent.mountPreview(root); const fresh = SLComponent.mountPreview(root);
          if (old.choose) old.choose('approve'); else if (old.shuffle) old.shuffle(); else if (old.setValue) old.setValue(8); else if (old.add) old.add();
          if (old.close && fresh.open) { fresh.open(); old.close(); if (!fresh.state.open) throw new Error('Disposed close changed the new controller.'); fresh.reset(); }
          const afterOld = JSON.stringify(fresh.state);
          fresh.destroy(); b.destroy(); clone.remove();
          const unconnected = SLComponent.mount(root);
          if (unconnected.add) unconnected.add();
          window.control = unconnected;
          return { restored, isolated, afterOld, slug };
        }, slug);
        assert.equal(result.restored, true, slug + ' reset restores all DOM/ARIA values');
        assert.equal(result.afterOld, result.isolated, slug + ' old controller is inert and siblings are isolated');
        const missing = await page.evaluate(async () => {
          const c = window.control;
          if (c.start) await c.start(); else if (c.confirm) await c.confirm();
          return c.state.phase;
        });
        assert.notEqual(missing, 'complete', slug + ' missing callback never reports success');
      }
    });

    await t.test('narrow previews: Shadow DOM focus, expanded controls, live reduced motion and palette contrast', async () => {
      const fixtures = await Promise.all(variants.map(async variant => ({ variant, html: (await read(variant, 'index.html')).match(/<body>([\s\S]*?)<\/body>/)[1], css: (await read(variant, 'buttons.css')).replaceAll('./instrument-sans-variable.woff2', `${origin}/packages/${variant}/instrument-sans-variable.woff2`), js: await read(variant, 'buttons.js') })));
      await page.setViewportSize({ width: 1280, height: 1080 });
      await page.goto(`${origin}/packages/buttons-duplicate-item-v11/index.html`);
      const dimensions = await page.evaluate(fixtures => {
        document.body.textContent = ''; document.body.style.cssText = 'margin:0;padding:20px;display:grid;grid-template-columns:repeat(5,226px);gap:20px;align-items:start;background:#f5f4f2;min-height:0';
        window.cards = [];
        for (const fixture of fixtures) {
          const host = document.createElement('div'); host.style.cssText = 'width:226px;min-height:480px;'; document.body.append(host);
          const shadow = host.attachShadow({ mode: 'open' });
          const style = document.createElement('style'); style.textContent = fixture.css; shadow.append(style);
          const template = document.createElement('template'); template.innerHTML = fixture.html; shadow.append(template.content.cloneNode(true));
          // Exactly the controller expression used by the shared preview compiler.
          const api = new Function('return ' + fixture.js.replace(/window\.\w+\s*=\s*(\{[^;]+\});/, 'return $1;'))();
          const root = shadow.querySelector('.sl-component'); const controller = api.mountPreview(root);
          window.cards.push({ root, controller, shadow, api });
          if (controller.add) { controller.add(); controller.add(); controller.add(); }
          if (controller.open) controller.open();
          if (controller.choose) controller.choose('reject');
        }
        return window.cards.map(({ root }) => ({ kind: root.dataset.kind, width: root.getBoundingClientRect().width, height: root.getBoundingClientRect().height, scroll: root.scrollWidth, client: root.clientWidth }));
      }, fixtures);
      await page.waitForTimeout(350);
      t.diagnostic('Expanded 226 px roots: ' + JSON.stringify(dimensions));
      if (process.env.SL_UI_SCREENSHOTS) { await mkdir(process.env.SL_UI_SCREENSHOTS, { recursive: true }); await page.screenshot({ path: join(process.env.SL_UI_SCREENSHOTS, 'buttons-narrow.png'), fullPage: true }); }
      for (const box of dimensions) { assert.ok(box.width <= 226.1, JSON.stringify(box)); assert.ok(box.height <= 458, JSON.stringify(box)); assert.ok(box.scroll <= box.client + 1, JSON.stringify(box)); }
      const shadowFocus = await page.evaluate(() => {
        const split = window.cards[0]; split.controller.open();
        split.shadow.activeElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'End', bubbles: true }));
        const end = split.shadow.activeElement.dataset.format;
        split.shadow.activeElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
        return { end, restored: split.shadow.activeElement.hasAttribute('data-toggle') };
      });
      assert.deepEqual(shadowFocus, { end: 'PDF', restored: true });
      await page.emulateMedia({ reducedMotion: 'reduce' });
      const reduced = await page.evaluate(() => window.cards.every(({ root }) => [...root.querySelectorAll('button')].every(button => getComputedStyle(button).transitionDuration === '0s')));
      assert.equal(reduced, true);
      await page.emulateMedia({ reducedMotion: 'no-preference' });
      if (process.env.SL_UI_SCREENSHOTS) { await mkdir(process.env.SL_UI_SCREENSHOTS, { recursive: true }); await page.screenshot({ path: join(process.env.SL_UI_SCREENSHOTS, 'buttons-narrow.png'), fullPage: true }); }
      const palette = await page.evaluate(() => {
        const luminance = rgb => { const parts = rgb.match(/[\d.]+/g).slice(0,3).map(Number).map(x => x / 255).map(x => x <= .04045 ? x / 12.92 : ((x + .055) / 1.055) ** 2.4); return .2126 * parts[0] + .7152 * parts[1] + .0722 * parts[2]; };
        const contrast = (a,b) => { const x = luminance(a), y = luminance(b); return (Math.max(x,y) + .05) / (Math.min(x,y) + .05); };
        return window.cards.map(({ root }) => {
          root.style.setProperty('--action-ink', '#23283b'); root.style.setProperty('--action-surface', '#303850'); root.style.setProperty('--action-hover', '#3c4661');
          root.style.setProperty('--action-accent', '#e5dbac'); root.style.setProperty('--action-on-accent', '#29261a'); root.style.setProperty('--action-focus', '#e5dbac');
          const surface = getComputedStyle(root), status = getComputedStyle(root.querySelector('[data-status]'));
          const primary = root.querySelector('.ab-primary'); const button = primary ? getComputedStyle(primary) : null;
          root.querySelector('button').focus();
          return { kind: root.dataset.kind, text: contrast(surface.color,surface.backgroundColor), muted: contrast(status.color,surface.backgroundColor), primary: button ? contrast(button.color,button.backgroundColor) : 10, focus: contrast(getComputedStyle(root.querySelector('button')).outlineColor,surface.backgroundColor) };
        });
      });
      for (const colors of palette) { assert.ok(colors.text >= 4.5, JSON.stringify(colors)); assert.ok(colors.muted >= 4.5, JSON.stringify(colors)); assert.ok(colors.primary >= 4.5, JSON.stringify(colors)); assert.ok(colors.focus >= 3, JSON.stringify(colors)); }
      if (process.env.SL_UI_SCREENSHOTS) await page.screenshot({ path: join(process.env.SL_UI_SCREENSHOTS, 'buttons-palette.png'), fullPage: true });
      await page.evaluate(() => window.cards.forEach(({ controller }) => controller.destroy()));
    });
    assert.deepEqual(errors, [], 'No browser page errors');
    assert.deepEqual(external, [], 'No external requests');
  } finally {
    await context.close(); await browser.close(); server.close(); await once(server, 'close');
  }
});
