import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir, mkdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { createRequire } from 'node:module';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { join, resolve, extname, sep } from 'node:path';
import { Script } from 'node:vm';
import batch from '../../public/catalog-batches/navigation.js';

const publicRoot = fileURLToPath(new URL('../../public/', import.meta.url));
const required = ['LICENSE', 'OFL.txt', 'buttons.css', 'buttons.js', 'example.js', 'index.html', 'instrument-sans-variable.woff2'].sort();
const hash = bytes => createHash('sha256').update(bytes).digest('hex');
const font = await readFile(join(publicRoot, 'packages/tabs-navigation/instrument-sans-variable.woff2'));
const license = await readFile(new URL('../../LICENSE', import.meta.url), 'utf8');
const sources = new Map();

test('navigation batch contains exactly ten distinct complete catalog entries', () => {
  assert.equal(batch.length, 10);
  assert.equal(new Set(batch.map(entry => entry.id)).size, 10);
  assert.equal(new Set(batch.map(entry => entry.name)).size, 10);
  for (const entry of batch) {
    assert.equal(entry.category, 'navigation');
    assert.equal(entry.variants.length, 1);
    const variant = entry.variants[0];
    assert.match(variant, /^navigation-[a-z-]+-v11$/);
    assert.equal(entry.id, 'matte-' + variant);
    assert.equal(entry.preview, `./packages/${variant}/index.html?embed=1`);
    assert.equal(entry.page, `./component.html?component=matte-${variant}`);
    assert.equal(entry.downloads[variant], `./downloads/matte-${variant}.zip`);
    assert.equal(entry.usage.length, 3);
    assert.match(entry.usage[1].paragraphs.join(' '), /reset\(\).*destroy\(\).*state/);
  }
});

for (const entry of batch) {
  const variant = entry.variants[0], folder = join(publicRoot, 'packages', variant);
  const html = await readFile(join(folder, 'index.html'), 'utf8');
  const css = await readFile(join(folder, 'buttons.css'), 'utf8');
  const js = await readFile(join(folder, 'buttons.js'), 'utf8');
  const example = await readFile(join(folder, 'example.js'), 'utf8');
  sources.set(variant, { html, css, js });
  test(`${entry.name}: standalone, offline, scoped and compiler-compatible source`, async () => {
    assert.deepEqual((await readdir(folder)).sort(), required);
    assert.equal(hash(await readFile(join(folder, 'instrument-sans-variable.woff2'))), hash(font));
    assert.equal(await readFile(join(folder, 'LICENSE'), 'utf8'), license);
    assert.match(html, /<html lang="en">/);
    assert.match(html, /name="viewport"/);
    assert.match(html, new RegExp(`class="sl-component" data-kind="${variant}"`));
    assert.equal((html.match(/class="sl-component"/g) || []).length, 1);
    assert.match(html.split('</head>')[0], /buttons\.js" defer/);
    assert.match(html.split('</head>')[0], /example\.js" defer/);
    assert.doesNotMatch(html.split('<body>')[1], /<script/);
    assert.doesNotMatch(html + css + js, /(?:src|href)=["']https?:|fetch\(|XMLHttpRequest|innerHTML|insertAdjacentHTML/);
    assert.doesNotMatch(js, /document\.(?:querySelector|activeElement)|setTimeout|setInterval|requestAnimationFrame/);
    assert.match(js, /root\.getRootNode\(\)\.activeElement/);
    assert.match(js, /window\.SLComponent = \{ mount, mountPreview \};/);
    assert.match(js, /life\.abort\(\)/);
    assert.match(js, /function reset\(\)/);
    assert.match(example, /SLComponent\.mountPreview/);
    assert.match(css, /prefers-reduced-motion:reduce/);
    assert.match(css, /font-display:swap/);
    assert.doesNotMatch(css, /(?:^|\})\s*(?:body|button|input|svg|\*|:root)\s*\{/);
    for (const token of ['surface', 'raised', 'text', 'muted', 'accent', 'accent-ink', 'border', 'focus']) assert.match(css, new RegExp(`--nav-${token}:`));
    new Script(js, { filename: variant + '/buttons.js' });
    new Script(example, { filename: variant + '/example.js' });
    const expression = js.match(/\(\(\) => \{[\s\S]*\}\)\(\);\s*$/)?.[0];
    assert.ok(expression, 'same standalone expression required by build-previews.mjs');
    new Script('const api = ' + expression.replace(/window\.\w+\s*=\s*(\{[^;]+\});/, 'return $1;'));
  });
}

// Browser tests use an already installed Playwright. No dependency is downloaded.
// Set SL_UI_PLAYWRIGHT_PATH to its package directory when it is outside node_modules.
const require = createRequire(import.meta.url);
let playwright;
try { playwright = require(process.env.SL_UI_PLAYWRIGHT_PATH || 'playwright'); } catch (error) {
  if (process.env.SL_UI_PLAYWRIGHT_PATH) throw error;
}
let browser, server, origin;
before(async () => {
  if (!playwright) return;
  server = createServer(async (request, response) => {
    const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    const target = resolve(publicRoot, '.' + pathname);
    if (!target.startsWith(resolve(publicRoot) + sep)) { response.writeHead(403).end(); return; }
    try {
      const body = await readFile(target);
      const type = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.woff2': 'font/woff2' }[extname(target)] || 'text/plain';
      response.writeHead(200, { 'Content-Type': type }); response.end(body);
    } catch { response.writeHead(404).end(); }
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  origin = 'http://127.0.0.1:' + server.address().port;
  browser = await playwright.chromium.launch({ headless: true, ...(process.env.SL_UI_BROWSER ? { executablePath: process.env.SL_UI_BROWSER } : {}) });
  if (process.env.SL_UI_QA_DIR) await mkdir(process.env.SL_UI_QA_DIR, { recursive: true });
});
after(async () => {
  if (server) {
    const closed = new Promise(resolve => server.close(resolve));
    // Close this test server's speculative browser connections as well.
    server.closeAllConnections();
    await closed;
  }
  await browser?.close();
});

const state = page => page.evaluate(() => window.controller.state);
async function open(page, slug) {
  await page.goto(`${origin}/packages/navigation-${slug}-v11/index.html`);
  await page.evaluate(() => {
    const root = document.querySelector('.sl-component');
    window.events = [];
    window.controller = SLComponent.mount(root, { onNavigate: detail => window.events.push(detail) });
  });
}
const interaction = {
  async 'overflow-tabs'(page) {
    await page.locator('[data-tab="0"]').focus();
    await page.keyboard.press('End');
    assert.equal((await state(page)).selected, 5);
    assert.equal(await page.locator('[data-title]').textContent(), 'Project settings');
    await page.locator('[data-tab="2"]').click();
    assert.equal((await state(page)).selected, 2);
    assert.equal(await page.locator('[data-tab="2"]').evaluate(node => node === node.getRootNode().activeElement), true);
    await page.keyboard.press('Home');
    assert.equal((await state(page)).selected, 0);
    await page.keyboard.press('ArrowLeft');
    assert.equal((await state(page)).selected, 5);
    await page.keyboard.press('ArrowRight');
    assert.equal((await state(page)).selected, 0);
  },
  async 'drill-down'(page) {
    await page.locator('[data-go="1"]').click();
    await page.keyboard.press('Enter');
    assert.equal((await state(page)).selected, 3);
    assert.equal(await page.locator('[data-screen="3"]').isVisible(), true);
    await page.keyboard.press('Escape');
    assert.deepEqual((await state(page)).trail, [0, 1]);
    assert.equal(await page.locator('[data-go="3"]').evaluate(node => node === node.getRootNode().activeElement), true);
    await page.locator('[data-back]').click();
    assert.deepEqual((await state(page)).trail, [0]);
    await page.locator('[data-go="2"]').click();
    await page.locator('[data-go="5"]').click();
  },
  async 'history'(page) {
    await page.locator('[data-route="1"]').click();
    await page.locator('[data-route="2"]').click();
    await page.keyboard.press('Alt+ArrowLeft');
    assert.equal((await state(page)).selected, 1);
    await page.locator('[data-forward]').click();
    assert.equal((await state(page)).selected, 2);
    await page.locator('[data-back]').click();
    await page.locator('[data-route="3"]').click();
    assert.deepEqual((await state(page)).entries, [0, 1, 3]);
    assert.equal(await page.locator('[data-forward]').isDisabled(), true);
    await page.locator('[data-route="3"]').click();
    assert.deepEqual((await state(page)).entries, [0, 1, 3]);
  },
  async 'context-rail'(page) {
    await page.locator('[data-section="1"]').click();
    await page.locator('.sl-choice-trigger').click(); await page.locator('[data-choice="1"]').click();
    await page.locator('[data-section="2"]').click();
    await page.locator('.sl-choice-trigger').click(); await page.locator('[data-choice="0"]').click();
    assert.equal((await state(page)).selected, 1);
    assert.equal(await page.locator('[data-title]').textContent(), 'Document outline');
    await page.locator('.sl-choice-trigger').click(); await page.locator('[data-choice="1"]').click();
    assert.equal((await state(page)).selected, 2);
    await page.locator('[data-section="0"]').focus();
    await page.keyboard.press('End');
    assert.equal(await page.locator('[data-section="2"]').evaluate(node => node === node.getRootNode().activeElement), true);
  },
  async 'landmark-jump'(page) {
    await page.locator('[data-pane]').evaluate(node => node.scrollTop = 30);
    await page.locator('[data-toggle]').focus();
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('End');
    await page.keyboard.press('Enter');
    assert.equal((await state(page)).selected, 2);
    assert.equal(await page.locator('[data-landmark="2"] h3').evaluate(node => node === node.getRootNode().activeElement), true);
    await page.locator('[data-return]').click();
    assert.equal(await page.locator('[data-pane]').evaluate(node => Math.round(node.scrollTop)), 30);
    assert.equal((await state(page)).returnPosition, null);
    await page.locator('[data-toggle]').click();
  },
  async 'route-finder'(page) {
    await page.locator('[data-search]').fill('studio');
    assert.deepEqual((await state(page)).results, [2, 3]);
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    assert.equal((await state(page)).selected, 2);
    await page.keyboard.press('Escape');
    assert.equal((await state(page)).query, 'studio');
    assert.equal(await page.locator('[data-route="2"]').evaluate(node => node === node.getRootNode().activeElement), true);
    const literal = 'Привет <img src=x onerror=alert(1)> 🌿';
    await page.locator('[data-search]').fill(literal);
    assert.equal((await state(page)).query, literal);
    assert.deepEqual((await state(page)).results, []);
    assert.equal(await page.locator('img').count(), 0);
    assert.equal(await page.locator('[data-empty]').isVisible(), true);
    await page.keyboard.press('Escape');
    assert.equal((await state(page)).query, '');
    await page.locator('[data-route="4"]').click();
  },
  async 'alphabet-jump'(page) {
    await page.locator('[data-letter="0"]').focus();
    await page.keyboard.press('End');
    assert.equal((await state(page)).selected, 3);
    assert.ok(await page.locator('[data-pane]').evaluate(node => node.scrollTop > 300));
    await page.locator('[data-back]').click();
    assert.equal((await state(page)).selected, 0);
    assert.equal(await page.locator('[data-pane]').evaluate(node => node.scrollTop), 0);
    await page.locator('[data-letter="2"]').click();
  },
  async 'reference-return'(page) {
    const source = page.locator('[data-reference]').nth(2);
    await source.click();
    assert.equal((await state(page)).sourceIndex, 2);
    assert.equal((await state(page)).selected, 0);
    assert.equal(await page.locator('[data-note="0"] h3').evaluate(node => node === node.getRootNode().activeElement), true);
    const position = (await state(page)).returnPosition;
    await page.keyboard.press('Escape');
    assert.equal(await source.evaluate(node => node === node.getRootNode().activeElement), true);
    assert.equal(await page.locator('[data-pane]').evaluate(node => node.scrollTop), position);
    await page.locator('[data-reference]').nth(1).click();
  },
  async 'reading-queue'(page) {
    for (let i = 0; i < 3; i++) await page.locator('[data-complete]').click();
    assert.deepEqual((await state(page)).read, [true, true, true]);
    assert.equal(await page.locator('[data-complete]').textContent(), 'Mark unread');
    assert.equal(await page.locator('[data-progress]').textContent(), '3 of 3 read');
    await page.locator('[data-undo]').click();
    assert.deepEqual((await state(page)).read, [true, true, false]);
    assert.equal((await state(page)).selected, 2);
    assert.equal(await page.locator('[data-undo]').isDisabled(), false);
    await page.locator('[data-back]').click();
    assert.equal((await state(page)).selected, 1);
    await page.locator('[data-document="0"]').focus();
    await page.keyboard.press('End');
    await page.keyboard.press('Enter');
    assert.equal((await state(page)).selected, 2);
  },
  async 'spatial-map'(page) {
    await page.locator('[data-room="0"]').focus();
    await page.keyboard.press('ArrowRight');
    assert.equal((await state(page)).selected, 1);
    await page.keyboard.press('ArrowDown');
    assert.equal((await state(page)).selected, 2);
    assert.equal(await page.locator('[data-title]').textContent(), 'Reference library');
    await page.keyboard.press('Escape');
    assert.equal((await state(page)).selected, 1);
    await page.keyboard.press('Home');
    assert.equal((await state(page)).selected, 0);
    await page.locator('[data-room="2"]').click();
  }
};

for (const entry of batch) {
  const variant = entry.variants[0], slug = variant.slice(11, -4);
  test(`${entry.name}: real keyboard interaction, state, lifecycle, 226px fit and palette`, { skip: !playwright && 'Install Playwright or provide SL_UI_PLAYWRIGHT_PATH', timeout: 30000 }, async () => {
    const context = await browser.newContext({ viewport: { width: 320, height: 640 }, reducedMotion: 'reduce' });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    try {
      await open(page, slug);
      const baseline = await state(page);
      if (process.env.SL_UI_QA_DIR) await page.screenshot({ path: join(process.env.SL_UI_QA_DIR, slug + '-initial.png') });
      for (const width of [320, 768, 1024, 1440]) {
        await page.setViewportSize({ width, height: 640 });
        const box = await page.locator('.sl-component').boundingBox();
        assert.ok(box.width <= 320 && box.x >= 0 && box.x + box.width <= width && box.height <= 458);
      }
      if (process.env.SL_UI_QA_DIR) await page.locator('.sl-component').screenshot({ path: join(process.env.SL_UI_QA_DIR, slug + '-desktop.png') });
      await page.setViewportSize({ width: 320, height: 640 });
      await interaction[slug](page);
      assert.ok(await page.evaluate(() => window.events.length > 0));
      const selectedButton = page.locator('button[aria-current],button[aria-selected="true"]').filter({ visible: true }).first();
      if (await selectedButton.count()) {
        await selectedButton.hover();
        const colors = await selectedButton.evaluate(node => ({ background: getComputedStyle(node).backgroundColor, color: getComputedStyle(node).color }));
        assert.equal(colors.background, 'rgb(224, 224, 224)');
        assert.equal(colors.color, 'rgb(51, 51, 51)');
      }
      await page.locator('.sl-component').evaluate(node => node.style.width = '226px');
      const fit = await page.locator('.sl-component').evaluate(root => {
        const box = root.getBoundingClientRect();
        const controls = [...root.querySelectorAll('button,input,select')].filter(node => !node.closest('[hidden],[inert]'));
        return { width: box.width, height: box.height, scrollWidth: root.scrollWidth,
          outside: controls.filter(node => {
            if (node.closest('.nv-scroll,.nv-tabstrip')) return false;
            const rect = node.getBoundingClientRect();
            return rect.left < box.left || rect.right > box.right + 1 || rect.top < box.top || rect.bottom > box.bottom + 1;
          }).map(node => node.textContent) };
      });
      assert.equal(fit.width, 226); assert.ok(fit.height <= 458, JSON.stringify(fit));
      assert.ok(fit.scrollWidth <= 226, JSON.stringify(fit)); assert.deepEqual(fit.outside, []);
      if (process.env.SL_UI_QA_DIR) await page.screenshot({ path: join(process.env.SL_UI_QA_DIR, slug + '-narrow.png') });
      await page.locator('.sl-component').evaluate(root => {
        root.style.setProperty('--nav-surface', '#f4f1e9'); root.style.setProperty('--nav-raised', '#e6e1d5');
        root.style.setProperty('--nav-text', '#252a27'); root.style.setProperty('--nav-muted', '#4f5b52');
        root.style.setProperty('--nav-accent', '#345a44'); root.style.setProperty('--nav-accent-ink', '#ffffff');
        root.style.setProperty('--nav-border', '#778379'); root.style.setProperty('--nav-focus', '#214f35');
        root.style.setProperty('--nav-color-scheme', 'light');
      });
      assert.equal(await page.locator('.sl-component').evaluate(node => getComputedStyle(node).backgroundColor), 'rgb(244, 241, 233)');
      assert.equal(await page.locator('.sl-component').evaluate(node => getComputedStyle(node).color), 'rgb(37, 42, 39)');
      if (process.env.SL_UI_QA_DIR) await page.screenshot({ path: join(process.env.SL_UI_QA_DIR, slug + '-palette.png') });
      await page.evaluate(() => { controller.reset(); controller.reset(); });
      assert.deepEqual(await state(page), baseline);
      assert.equal(await page.evaluate(() => {
        const root = document.querySelector('.sl-component'), node = root.getRootNode().activeElement;
        return !!node?.closest('[hidden],[inert]') || node?.disabled === true;
      }), false);
      await page.emulateMedia({ reducedMotion: 'no-preference' });
      if (slug === 'landmark-jump') {
        await page.locator('[data-toggle]').focus();
        await page.keyboard.press('ArrowDown');
        assert.equal(await page.locator('[data-menu]').evaluate(node => node.contains(node.getRootNode().activeElement)), true);
        await page.keyboard.press('Escape');
      }
      await page.evaluate(() => {
        const action = controller.navigate || controller.jump;
        for (let i = 0; i < 12; i++) { action(1); controller.back?.(); action(0); }
      });
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.evaluate(() => controller.reset());
      assert.deepEqual(await state(page), baseline);
      const lifecycle = await page.evaluate(() => {
        const root = document.querySelector('.sl-component');
        const old = controller;
        controller = SLComponent.mount(root);
        old.destroy(); old.reset();
        const clone = root.cloneNode(true);
        const host = document.createElement('div'); document.body.append(host);
        const shadow = host.attachShadow({ mode: 'open' }); shadow.append(clone);
        const second = SLComponent.mount(clone);
        const secondBefore = JSON.stringify(second.state);
        const action = controller.navigate || controller.jump;
        for (let i = 0; i < 20; i++) { controller.reset(); action(1); }
        const isolated = secondBefore === JSON.stringify(second.state);
        second.destroy(); second.destroy(); host.remove();
        controller.reset(); const resetState = controller.state;
        controller.destroy(); controller.destroy(); action(1); controller.reset();
        const deadStable = JSON.stringify(controller.state) === JSON.stringify(resetState);
        controller = SLComponent.mount(root);
        return { isolated, deadStable, final: controller.state };
      });
      assert.equal(lifecycle.isolated, true); assert.equal(lifecycle.deadStable, true); assert.deepEqual(lifecycle.final, baseline);
      assert.deepEqual(errors, []);
    } finally { await context.close(); }
  });
}

test('compiled navigation previews mount in independent Shadow DOM cards', { skip: !playwright && 'Playwright unavailable', timeout: 30000 }, async () => {
  const page = await browser.newPage({ viewport: { width: 320, height: 640 }, reducedMotion: 'reduce' });
  try {
    await page.goto(origin + '/category.html?category=navigation');
    const results = await page.evaluate(async variants => {
      await customElements.whenDefined('sl-preview');
      await document.fonts.ready;
      document.body.replaceChildren();
      document.body.style.cssText = 'margin:0;padding:0;display:block';
      return variants.map(variant => {
        const preview = document.createElement('sl-preview');
        preview.id = 'component-preview';
        preview.setAttribute('variant', variant);
        preview.style.cssText = 'display:block;width:258px;height:510px;position:relative';
        document.body.append(preview);
        const root = preview.shadowRoot.querySelector('.sl-component');
        const result = { variant, root: !!root, controller: !!preview.controller, ready: preview.dataset.ready, fits: [] };
        const checkFit = () => {
          const box = root.getBoundingClientRect(), host = preview.getBoundingClientRect();
          result.fits.push(box.width <= 226 && box.top >= host.top + 52 - 1 && box.bottom <= host.bottom + 1 && root.scrollWidth <= 226);
        };
        checkFit();
        const action = preview.controller?.navigate || preview.controller?.jump;
        for (let index = 0; index < 6; index++) { preview.controller.reset(); action(index); checkFit(); }
        preview.controller?.reset(); preview.remove();
        return result;
      });
    }, batch.map(entry => entry.variants[0]));
    for (const result of results) { assert.ok(result.root, result.variant); assert.ok(result.controller, result.variant); assert.equal(result.ready, 'true'); assert.ok(result.fits.every(Boolean), result.variant + ' exceeds the 510px preview'); }
  } finally { await page.close(); }
});

test('all ten navigation heading icons have distinct repository-owned contours', () => {
  const icons = [...sources.values()].map(({ html }) => html.match(/<header[\s\S]*?(<svg[\s\S]*?<\/svg>)<\/header>/)?.[1]);
  assert.ok(icons.every(Boolean));
  assert.equal(new Set(icons).size, 10);
});

function regression(name, run) {
  test(name, { skip: !playwright && 'Playwright unavailable', timeout: 20000 }, async () => {
    const context = await browser.newContext({viewport:{width:320,height:640},reducedMotion:'reduce'});
    const page = await context.newPage(); page.setDefaultTimeout(3000);
    try { await run(page); } finally { await context.close(); }
  });
}

regression('section tabs are the only navigation control and every destination stays visible without scrolling', async page => {
  await open(page,'overflow-tabs');
  assert.equal(await page.locator('.sl-component button').count(),6);
  assert.equal(await page.locator('[data-toggle],[data-menu],[data-previous-section],[data-next-section]').count(),0);
  for(const width of [226,320]) {
    await page.locator('.sl-component').evaluate((root,w)=>root.style.width=w+'px',width);
    for(let i=0;i<6;i++) {
      const fit=await page.locator(`[data-tab="${i}"]`).evaluate(tab=>{
        const strip=tab.parentElement,a=tab.getBoundingClientRect(),b=strip.getBoundingClientRect();
        return strip.scrollWidth<=strip.clientWidth && strip.scrollHeight<=strip.clientHeight
          && a.left>=b.left && a.right<=b.right+1 && a.top>=b.top && a.bottom<=b.bottom+1
          && tab.scrollWidth<=tab.clientWidth;
      }); assert.equal(fit,true,`Tab ${i} at ${width}px`);
      await page.locator(`[data-tab="${i}"]`).click();
      assert.equal((await state(page)).selected,i);
    }
  }
  await page.locator('[data-tab="3"]').click();
  await page.locator('[data-tab="0"]').click();
  assert.equal((await state(page)).selected,0);
});

regression('reading changes support repeated Undo and direct Mark unread after visiting other documents', async page => {
  await open(page,'reading-queue');
  for(let i=0;i<3;i++) await page.locator('[data-complete]').click();
  await page.locator('[data-document="0"]').click();
  for(let n=2;n>=0;n--){await page.locator('[data-undo]').click();assert.equal((await state(page)).read.filter(Boolean).length,n);}
  assert.equal(await page.locator('[data-undo]').isDisabled(),true);
  await page.locator('[data-complete]').click(); await page.locator('[data-document="0"]').click();
  assert.equal(await page.locator('[data-complete]').textContent(),'Mark unread');
  await page.locator('[data-complete]').click(); assert.equal((await state(page)).read[0],false);
  await page.locator('[data-undo]').click(); assert.equal((await state(page)).read[0],true);
  await page.evaluate(()=>controller.reset()); assert.equal((await state(page)).canUndo,false);
});

regression('floor-plan room labels fit their rooms without intersecting walls', async page => {
  await open(page,'spatial-map');
  assert.equal(await page.locator('.nv-plan-outline').count(),1);
  for(const width of [226,320]){
    await page.locator('.sl-component').evaluate((e,w)=>e.style.width=w+'px',width);
    for(let i=0;i<3;i++){
      await page.locator(`[data-room="${i}"]`).click();
      const inside=await page.locator(`[data-room="${i}"]`).evaluate(button=>{
        const shape=button.closest('.nv-plan').querySelector(`[data-room-shape="${button.dataset.room}"]`);
        const a=button.getBoundingClientRect(),b=shape.getBoundingClientRect();
        return a.left>=b.left&&a.right<=b.right&&a.top>=b.top&&a.bottom<=b.bottom;
      });assert.equal(inside,true,`Room ${i} at ${width}px`);
    }
  }
});
