import { test, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';
import entries from '../../public/catalog-batches/menus.js';

const root = new URL('../../', import.meta.url);
const folder = slug => new URL(`public/packages/menus-${slug}-v11/`, root);
const slugs = entries.map(entry => entry.variants[0].slice(6, -4));
const sources = new Map(await Promise.all(slugs.map(async slug => [slug, Object.fromEntries(await Promise.all(
  ['index.html', 'buttons.css', 'buttons.js', 'example.js'].map(async name => [name, await readFile(new URL(name, folder(slug)), 'utf8')])
))])));

test('menus manifest has exactly ten distinct complete entries', () => {
  assert.equal(entries.length, 10);
  assert.equal(new Set(entries.map(entry => entry.id)).size, 10);
  assert.equal(new Set(entries.map(entry => entry.name)).size, 10);
  assert.equal(new Set([...sources.values()].map(source => source['buttons.js'])).size, 10);
  for (const entry of entries) {
    const variant = entry.variants[0];
    assert.equal(entry.category, 'menus');
    assert.match(variant, /^menus-[a-z-]+-v11$/);
    assert.equal(entry.id, `matte-${variant}`);
    assert.equal(entry.preview, `./packages/${variant}/index.html?embed=1`);
    assert.equal(entry.downloads[variant], `./downloads/matte-${variant}.zip`);
    assert.equal(entry.usage.length, 3);
    assert.ok(entry.usage.every(section => section.paragraphs.length >= 2));
  }
});

for (const slug of slugs) test(`${slug}: portable package, compiler and literal-text contract`, async () => {
  assert.deepEqual((await readdir(folder(slug))).sort(), ['LICENSE', 'OFL.txt', 'buttons.css', 'buttons.js', 'example.js', 'index.html', 'instrument-sans-variable.woff2'].sort());
  for (const asset of ['instrument-sans-variable.woff2', 'OFL.txt']) {
    const hash = bytes => createHash('sha256').update(bytes).digest('hex');
    assert.equal(hash(await readFile(new URL(asset, folder(slug)))), hash(await readFile(new URL(`public/packages/assignee-menu/${asset}`, root))));
  }
  assert.equal(await readFile(new URL('LICENSE', folder(slug)), 'utf8'), await readFile(new URL('LICENSE', root), 'utf8'));
  const { 'index.html': html, 'buttons.css': css, 'buttons.js': js, 'example.js': example } = sources.get(slug);
  assert.match(html, /<html lang="en">/);
  assert.match(html, /name="viewport"/);
  const body = html.match(/<body[^>]*>([\s\S]*?)<\/body>/)[1];
  assert.equal((body.match(/class="sl-component"/g) || []).length, 1);
  assert.match(body, new RegExp(`data-kind="menus-${slug}-v11"`));
  assert.doesNotMatch(body, /<script|\bid="/);
  assert.match(html, /<script src="\.\/buttons\.js" defer><\/script>/);
  assert.match(body, /aria-hidden="true" inert/);
  assert.match(css, /@font-face/);
  assert.match(css, /prefers-reduced-motion: reduce/);
  assert.match(css, /--sl-focus:/);
  assert.doesNotMatch(css, /(?:^|\})\s*(?:button|input|svg|body|:root|\*)\s*\{/m);
  assert.doesNotMatch(html + css + js, /https?:\/\/|<img\b|fetch\(|XMLHttpRequest|innerHTML|insertAdjacentHTML|document\.activeElement/);
  const expression = js.match(/\(\(\) => \{[\s\S]*\}\)\(\);\s*$/)?.[0];
  assert.ok(expression, 'Compiler-compatible IIFE');
  const compiled = expression.replace(/window\.\w+\s*=\s*(\{[^;]+\});/, 'return $1;');
  const api = Function(`return ${compiled}`)();
  assert.equal(typeof api.mount, 'function');
  assert.equal(typeof api.mountPreview, 'function');
  assert.match(example, /SLComponent\.mountPreview/);
});

// Browser coverage is optional on machines without Playwright. CI/coordinators can
// point SL_UI_PLAYWRIGHT at an installed Playwright package and SL_UI_BROWSER at
// an existing Chromium executable; this suite never installs dependencies.
let playwright;
if (process.env.SL_UI_PLAYWRIGHT) {
  playwright = createRequire(pathToFileURL(process.env.SL_UI_PLAYWRIGHT))('playwright');
} else {
  try { playwright = await import('playwright'); } catch (error) {
    if (error.code !== 'ERR_MODULE_NOT_FOUND') throw error;
  }
}
const browser = playwright ? await playwright.chromium.launch({ headless: true, ...(process.env.SL_UI_BROWSER ? { executablePath: process.env.SL_UI_BROWSER } : {}) }) : null;
after(async () => { await browser?.close(); });
const initialStates = new WeakMap();
const browserTest = (name, fn) => test(name, { skip: !browser && 'Set SL_UI_PLAYWRIGHT to run browser checks.' }, async () => {
  const context = await browser.newContext({ viewport: { width: 320, height: 560 }, reducedMotion: 'reduce' });
  const page = await context.newPage(), errors = [];
  page.setDefaultTimeout(5000);
  page.on('pageerror', error => errors.push(error.message));
  try {
    await fn(page, context);
    const restored = await page.evaluate(() => {
      const root = document.querySelector('.sl-component');
      if (!root) return null; // Two-instance tests mount their roots in Shadow DOM.
      const controller = SLComponent.mount(root); controller.reset(); controller.reset();
      return { state: controller.state, feedback: root.querySelector('[data-feedback]').textContent, summary: root.querySelector('.sl-summary').textContent, inert: root.querySelector('[data-panel]').inert };
    });
    if (restored) assert.deepEqual(restored, initialStates.get(page), 'Reset restores changed state, visible content and accessibility');
    assert.deepEqual(errors, []);
  } finally { await context.close(); }
});
const visit = async (page, slug) => {
  await page.goto(new URL('index.html', folder(slug)).href);
  initialStates.set(page, await page.evaluate(() => {
    const root = document.querySelector('.sl-component');
    return { state: SLComponent.mount(root).state, feedback: root.querySelector('[data-feedback]').textContent, summary: root.querySelector('.sl-summary').textContent, inert: root.querySelector('[data-panel]').inert };
  }));
};
const open = page => page.locator('[data-trigger]').click();
const click = (page, value) => page.locator(`[data-key="${value}"]`).click();
const state = page => page.evaluate(() => SLComponent.mount(document.querySelector('.sl-component')).state);
const feedback = page => page.locator('[data-feedback]').innerText();

browserTest('change notifications fire once, provide isolated copies and reset changed state', async page => {
  await visit(page, 'resource-picker');
  await page.evaluate(() => {
    const root = document.querySelector('.sl-component'); SLComponent.mount(root).destroy();
    window.observedEvents = []; window.observedCallbacks = [];
    root.addEventListener('sl-menu-change', event => { observedEvents.push(event.detail.value); event.detail.value = 'mutated event'; });
    SLComponent.mount(root, { onChange(state) { observedCallbacks.push(state.value); state.value = 'mutated callback'; } });
    SLComponent.mount(root);
  });
  await open(page); await click(page, 'atlas');
  assert.deepEqual(await page.evaluate(() => [observedEvents, observedCallbacks]), [['atlas'], ['atlas']]);
  assert.equal((await state(page)).value, 'atlas');
  const resetState = await page.evaluate(() => {
    const controller = SLComponent.mount(document.querySelector('.sl-component'));
    const external = controller.state; external.value = 'mutated getter';
    controller.reset(); controller.reset(); return controller.state;
  });
  assert.deepEqual(resetState, { value: null, query: '', open: false });
  assert.deepEqual(await page.evaluate(() => [observedEvents, observedCallbacks]), [['atlas'], ['atlas']]);
});

browserTest('palette tokens preserve readable normal, muted, selected and focus colors', async page => {
  await visit(page, 'tag-workbench'); await open(page);
  const contrast = await page.evaluate(() => {
    const rgb = hex => hex.trim().replace('#','').match(/../g).map(n => parseInt(n,16)/255).map(n=>n<=.04045?n/12.92:((n+.055)/1.055)**2.4);
    const luminance = hex => rgb(hex).reduce((sum,n,i)=>sum+n*[.2126,.7152,.0722][i],0);
    const ratio = (a,b) => (Math.max(luminance(a),luminance(b))+.05)/(Math.min(luminance(a),luminance(b))+.05);
    const styles=getComputedStyle(document.querySelector('.sl-component')), token=n=>styles.getPropertyValue('--sl-'+n);
    return { text:ratio(token('text'),token('panel')), muted:ratio(token('muted'),token('panel')), selected:ratio(token('text'),token('hover')), focus:ratio(token('focus'),token('surface')), caption:ratio(token('caption'),'#f5f4f2') };
  });
  for(const name of ['text','muted','selected','caption'])assert.ok(contrast[name]>=4.5, `${name}: ${contrast[name]}`);
  assert.ok(contrast.focus>=3);
});

for (const slug of slugs) browserTest(`${slug}: focus, rapid reversal, lifecycle, narrow fit and palette`, async (page, context) => {
  await visit(page, slug);
  const initial = await state(page);
  await page.evaluate(() => document.querySelector('.sl-component').style.width = '226px');
  await page.locator('[data-trigger]').focus();
  await page.keyboard.press('ArrowDown');
  assert.equal((await state(page)).open, true);
  assert.equal(await page.evaluate(() => document.querySelector('[data-panel]').contains(document.activeElement)), true);
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('End');
  assert.equal(await page.evaluate(() => document.activeElement.tagName), 'BUTTON');
  await page.keyboard.press('Home');
  await page.keyboard.press('Escape');
  assert.equal(await page.locator('[data-trigger]').evaluate(n => n === document.activeElement), true);
  assert.equal(await page.locator('[data-panel]').evaluate(n => n.inert), true);
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  for (let i = 0; i < 4; i++) { await open(page); await page.keyboard.press('Escape'); }
  await open(page);
  const geometry = await page.evaluate(() => {
    const root = document.querySelector('.sl-component'), panel = root.querySelector('[data-panel]'), feedback = root.querySelector('[data-feedback]');
    const a = root.getBoundingClientRect(), b = panel.getBoundingClientRect(), c = feedback.getBoundingClientRect();
    return { width: a.width, panelInside: b.left >= a.left && b.right <= a.right && b.bottom <= c.top, overflow: root.scrollWidth > root.clientWidth, height: a.height };
  });
  assert.equal(geometry.width, 226);
  assert.ok(geometry.height > 0 && geometry.height <= 458, 'Fits the 510px preview below its 52px title');
  assert.equal(geometry.panelInside, true);
  assert.equal(geometry.overflow, false);
  const footers = await page.locator('[data-panel] > .sl-footer button').evaluateAll(nodes => nodes.map(n => {
    const panel = n.closest('[data-panel]').getBoundingClientRect(), button = n.getBoundingClientRect();
    return button.top >= panel.top && button.bottom <= panel.bottom;
  }));
  assert.ok(footers.every(Boolean), 'Primary footer actions stay visible outside scrolling lists');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  assert.equal(await page.locator('[data-panel]').evaluate(n => getComputedStyle(n).transitionDuration), '0s');
  await page.evaluate(() => {
    const root = document.querySelector('.sl-component');
    for (const [token, value] of Object.entries({ '--sl-surface':'#24213b', '--sl-panel':'#302c48', '--sl-text':'#f6f1ff', '--sl-muted':'#c5bfda', '--sl-accent':'#ded4fa', '--sl-accent-ink':'#29213c', '--sl-border':'#625a7a', '--sl-hover':'#49405e', '--sl-focus':'#e4ccff', '--sl-caption':'#40374d' })) root.style.setProperty(token,value);
  });
  assert.equal(await page.locator('[data-panel]').evaluate(n => getComputedStyle(n).backgroundColor), 'rgb(48, 44, 72)');
  assert.equal(await page.locator('[data-trigger]').evaluate(n => getComputedStyle(n).color), 'rgb(246, 241, 255)');
  await page.keyboard.press('Escape');
  await open(page);
  await page.mouse.click(5, 5);
  assert.equal((await state(page)).open, false);
  await open(page);
  await page.keyboard.press('Tab');
  for (let i = 0; i < 24 && (await state(page)).open; i++) await page.keyboard.press('Tab');
  assert.equal((await state(page)).open, false, 'Tab can leave the nonmodal menu');
  const lifecycle = await page.evaluate(() => {
    const root = document.querySelector('.sl-component'), controller = SLComponent.mount(root);
    const same = controller === SLComponent.mount(root);
    const snapshot = controller.state; snapshot.open = true;
    root.querySelectorAll('.sl-scroll,.sl-summary,textarea').forEach(node => { node.scrollTop = 999; node.scrollLeft = 999; });
    controller.reset(); controller.reset(); const restored = controller.state;
    const scrollReset = [...root.querySelectorAll('.sl-scroll,.sl-summary,textarea')].every(node => node.scrollTop === 0 && node.scrollLeft === 0);
    controller.destroy(); controller.destroy(); root.querySelector('[data-trigger]').click();
    const inertAfterDestroy = root.querySelector('[data-panel]').inert;
    const remounted = SLComponent.mount(root); remounted.open();
    const oneMount = remounted === SLComponent.mount(root); remounted.reset();
    return { same, restored, inertAfterDestroy, oneMount, scrollReset };
  });
  assert.equal(lifecycle.same, true);
  assert.deepEqual(lifecycle.restored, initial);
  assert.equal(lifecycle.inertAfterDestroy, true);
  assert.equal(lifecycle.oneMount, true);
  assert.equal(lifecycle.scrollReset, true);
});

browserTest('grouped picker filters groups, supports empty search and commits a resource', async page => {
  await visit(page, 'resource-picker'); await open(page);
  await page.getByRole('searchbox').fill('nothing matches');
  assert.equal(await page.locator('[data-empty]').isVisible(), true);
  await page.getByRole('searchbox').fill('guide');
  assert.equal(await page.locator('[data-group]:visible').count(), 1);
  await page.keyboard.press('ArrowDown'); await page.keyboard.press('Enter');
  assert.equal((await state(page)).value, 'guide');
  assert.match(await feedback(page), /Writing guide selected locally/);
});

browserTest('nested menu traverses three levels with arrows and reports a complete leaf path', async page => {
  await visit(page, 'nested-topic'); await open(page);
  await page.keyboard.press('ArrowRight'); await page.keyboard.press('ArrowRight');
  assert.deepEqual((await state(page)).path, ['Design','Interface']);
  await page.keyboard.press('ArrowLeft');
  assert.deepEqual((await state(page)).path, ['Design']);
  await click(page,'branch:Research'); await click(page,'leaf:Synthesis');
  assert.equal((await state(page)).value,'Design / Research / Synthesis');
  assert.match(await feedback(page),/Topic assigned/);
});

browserTest('recent actions repeat real local actions, clamp zoom and clear only history', async page => {
  await visit(page, 'recent-actions'); await open(page);
  await click(page,'zoom-in'); await click(page,'recent:zoom-in');
  assert.equal((await state(page)).zoom,120);
  await click(page,'pin'); await click(page,'recent:pin');
  assert.equal((await state(page)).pinned,false);
  for(let i=0;i<3;i++) await click(page,'zoom-in');
  assert.equal((await state(page)).zoom,150);
  assert.equal(await page.locator('[data-key="zoom-in"]').isDisabled(),true);
  await click(page,'clear');
  assert.deepEqual((await state(page)).recent,[]);
  assert.equal((await state(page)).zoom,150);
  assert.equal(await page.locator('[data-empty]').isVisible(),true);
});

browserTest('tag draft cancels creation and applies literal Unicode without HTML injection', async page => {
  await visit(page, 'tag-workbench'); await open(page);
  assert.equal(await page.locator('[data-key="apply"]').innerText(),'Apply 1 tag');
  await page.getByRole('searchbox').fill('Temporary'); await click(page,'create');
  assert.equal(await page.locator('[data-key="apply"]').innerText(),'Apply 2 tags');
  await page.keyboard.press('Escape'); await open(page);
  assert.equal((await state(page)).draftTags.includes('Temporary'),false);
  const label='<b>猫 & café</b>';
  await page.getByRole('searchbox').fill(label); await click(page,'create');
  await click(page,'apply');
  assert.deepEqual((await state(page)).selected,['Design',label]);
  assert.equal(await page.locator('.sl-component b').count(),0);
  assert.match(await page.locator('[data-summary]').innerText(),/猫 & café/);
  await open(page); await page.getByRole('searchbox').fill('x'.repeat(25));
  assert.equal(await page.locator('[data-key="create"]').isDisabled(),true);
  await page.getByRole('searchbox').fill('dEsIgN');
  assert.equal(await page.locator('[data-key="create"]').isVisible(),false);
});

browserTest('branch menu filters both revision types and shows coherent comparison counts', async page => {
  await visit(page, 'branch-picker'); await open(page);
  await page.getByRole('searchbox').fill('search'); await click(page,'revision:feature/search');
  await click(page,'compare');
  assert.match(await page.locator('[data-compare]').innerText(),/4 ahead · 2 behind/);
  await click(page,'tab:tags'); await click(page,'revision:v1.4.0');
  assert.equal((await state(page)).value,'v1.4.0');
  assert.match(await page.locator('[data-compare]').innerText(),/0 ahead · 3 behind/);
  await page.getByRole('searchbox').fill('missing');
  assert.equal(await page.locator('[data-empty]').isVisible(),true);
});

browserTest('eight-tag limit and long Unicode results stay bounded at 226px', async page => {
  await visit(page, 'tag-workbench');
  await page.evaluate(() => document.querySelector('.sl-component').style.width='226px');
  await open(page); await click(page,'tag:Review'); await click(page,'tag:Research');
  for(let i=0;i<5;i++) {
    await page.getByRole('searchbox').fill('界'.repeat(23)+i); await click(page,'create');
  }
  await page.getByRole('searchbox').fill('One more');
  assert.equal(await page.locator('[data-key="create"]').isDisabled(),true);
  await click(page,'apply');
  assert.equal((await state(page)).selected.length,8);
  const fit=await page.locator('.sl-summary').evaluate(node=>{
    const root=node.closest('.sl-component'),summary=node.getBoundingClientRect(),feedback=root.querySelector('[data-feedback]').getBoundingClientRect();
    return { width:node.scrollWidth<=node.clientWidth, aboveFeedback:summary.bottom<feedback.top, focusable:node.tabIndex===0, maxHeight:summary.height<=270 };
  });
  assert.deepEqual(fit,{width:true,aboveFeedback:true,focusable:true,maxHeight:true});
});

browserTest('weekly menu rejects empty days and time, supports draft cancellation and applies a preset', async page => {
  await visit(page, 'weekly-window'); await open(page);
  await click(page,'weekend'); await click(page,'day:5'); await click(page,'day:6');
  assert.equal(await page.locator('[data-key="apply"]').isDisabled(),true);
  await click(page,'weekend'); await page.locator('[data-time]').fill('');
  assert.equal(await page.locator('[data-key="apply"]').isDisabled(),true);
  await page.keyboard.press('Escape'); await open(page);
  assert.equal((await state(page)).draftTime,'09:00');
  assert.deepEqual((await state(page)).draftDays,[0,1,2,3,4]);
  await click(page,'weekend'); await page.locator('[data-time]').fill('18:30'); await click(page,'apply');
  assert.deepEqual((await state(page)).days,[5,6]);
  assert.equal((await state(page)).time,'18:30');
  assert.equal(await page.locator('[data-summary]').innerText(),'Sat–Sun · 18:30');
});

browserTest('priority-first keeps High, Medium, Low order regardless of the secondary field or direction', async page => {
  await visit(page, 'sort-recipe'); await open(page); await click(page,'priority'); await click(page,'dismiss');
  assert.match(await page.locator('[data-order] li').first().innerText(),/^Review/);
  assert.deepEqual(await page.locator('[data-order] li').allTextContents(), ['Review · Sep 14 · High','Draft · Sep 14 · Medium','Publish · Sep 16 · Low']);
  await open(page); await click(page,'direction'); await click(page,'dismiss');
  assert.match(await page.locator('[data-order] li').first().innerText(),/^Review/);
  await open(page); await click(page,'field:name'); await click(page,'direction'); await click(page,'dismiss');
  assert.match(await page.locator('[data-order] li').first().innerText(),/^Review/);
  assert.match(await page.locator('[data-summary]').innerText(),/^Priority first/);
  await open(page); await click(page,'priority'); await click(page,'dismiss');
  assert.match(await page.locator('[data-order] li').first().innerText(),/^Draft/);
  assert.equal(await page.locator('[data-summary]').innerText(),'Task name · Ascending');
});

for (const slug of slugs) browserTest(`${slug}: plain panel clicks stay open; outside click and keyboard exit dismiss`, async page => {
  await visit(page, slug); await open(page);
  await page.locator('[data-panel]').click({position:{x:3,y:3}});
  assert.equal((await state(page)).open,true,'Panel padding must not dismiss the menu');
  await page.keyboard.press('Escape');
  assert.equal((await state(page)).open,false);
  await open(page);
  await page.mouse.click(1,1);
  assert.equal((await state(page)).open,false);
  await open(page);
  await page.locator('[data-panel] button:not([disabled]):visible').last().focus();
  await page.keyboard.press('Tab');
  await page.waitForFunction(()=>!SLComponent.mount(document.querySelector('.sl-component')).state.open);
});

browserTest('search focus frame surrounds the field without overlaying the text', async page => {
  await visit(page, 'resource-picker'); await open(page);
  const styles=await page.locator('[data-search]').evaluate(input=>({
    inputOutline:getComputedStyle(input).outlineStyle,
    fieldBorder:getComputedStyle(input.closest('.sl-search')).borderTopWidth,
    fieldRadius:getComputedStyle(input.closest('.sl-search')).borderTopLeftRadius
  }));
  assert.equal(styles.inputOutline,'none');
  assert.equal(styles.fieldBorder,'1px');
  assert.equal(styles.fieldRadius,'8px');
});

browserTest('table columns remain readable and scroll locally at 226px', async page => {
  await visit(page, 'column-visibility');
  await page.locator('.sl-component').evaluate(e=>e.style.width='226px');
  await open(page); await click(page,'all'); await page.keyboard.press('Escape');
  const layout=await page.locator('.sl-mini-table').evaluate(table=>({
    wrap:[...table.querySelectorAll('th,td')].every(e=>getComputedStyle(e).whiteSpace==='nowrap'),
    font:parseFloat(getComputedStyle(table).fontSize),
    local:table.parentElement.classList.contains('sl-table-scroll')&&table.parentElement.scrollWidth>table.parentElement.clientWidth,
    rootFits:table.closest('.sl-component').scrollWidth<=227
  }));
  assert.deepEqual(layout,{wrap:true,font:12,local:true,rootFits:true});
  assert.equal(await page.locator('.sl-table-hint').isVisible(),true);
  await page.locator('.sl-table-scroll').focus(); await page.keyboard.press('ArrowRight');
  await page.waitForFunction(()=>document.querySelector('.sl-table-scroll').scrollLeft>0);
  await page.evaluate(()=>SLComponent.mount(document.querySelector('.sl-component')).reset());
  assert.equal(await page.locator('.sl-table-scroll').evaluate(e=>e.scrollLeft),0);
});

browserTest('document version title and copy have separate readable typography', async page => {
  await visit(page, 'checkpoint-menu'); await open(page); await click(page,'version:v1'); await click(page,'restore');
  assert.equal(await page.locator('[data-summary]').innerText(),'First outline');
  const text=await page.locator('[data-document]').evaluate(e=>({size:parseFloat(getComputedStyle(e).fontSize),line:parseFloat(getComputedStyle(e).lineHeight)}));
  assert.ok(text.size>=15&&text.line>=24);
});

browserTest('column menu preserves required name and updates real table headers and cells', async page => {
  await visit(page, 'column-visibility'); await open(page);
  assert.equal(await page.locator('[data-key="column:name"]').isDisabled(),true);
  await click(page,'column:status'); await page.keyboard.press('Escape');
  assert.equal(await page.locator('th:visible').count(),1);
  await open(page); await click(page,'all'); await page.keyboard.press('Escape');
  assert.equal(await page.locator('th:visible').count(),4);
  assert.equal(await page.locator('td:visible').count(),8);
  await open(page); await click(page,'compact'); await page.keyboard.press('Escape');
  assert.deepEqual((await state(page)).columns,['name','status']);
});

browserTest('checkpoint preview cancels, restores local text and undoes one restore', async page => {
  await visit(page, 'checkpoint-menu'); await open(page);
  assert.equal(await page.locator('[data-key="restore"]').isDisabled(),true);
  await click(page,'version:v1');
  assert.match(await page.locator('[data-version-copy]').innerText(),/^Collect/);
  await page.keyboard.press('Escape');
  assert.equal((await state(page)).current,'v3');
  await open(page); await click(page,'version:v2'); await click(page,'restore');
  assert.equal((await state(page)).current,'v2');
  assert.match(await page.locator('[data-document]').innerText(),/^Review/);
  await click(page,'undo');
  assert.equal((await state(page)).current,'v3');
  assert.equal(await page.locator('[data-key="undo"]').isDisabled(),true);
});

browserTest('variable menu replaces the saved editor selection, undoes and keeps user text literal', async page => {
  await visit(page, 'variable-insert');
  const editor=page.getByRole('textbox',{name:'Message template'});
  await editor.fill('Hello 猫'); await editor.press('Control+End');
  await editor.press('Shift+ArrowLeft'); await open(page);
  await page.getByRole('searchbox').fill('First'); await click(page,'token:first_name');
  assert.equal(await editor.inputValue(),'Hello {{first_name}}');
  assert.equal(await editor.evaluate(n=>n===document.activeElement),true);
  await click(page,'undo'); assert.equal(await editor.inputValue(),'Hello 猫');
  await editor.fill('<img src=x onerror=alert(1)>');
  assert.equal(await page.locator('.sl-component img').count(),0);
  await open(page); await page.getByRole('searchbox').fill('Account');
  assert.equal(await page.locator('[data-key="token:account"]').isDisabled(),true);
});

for (const slug of slugs) browserTest(`${slug}: two Shadow DOM instances keep focus and state private`, async page => {
  await visit(page, slug);
  const source=sources.get(slug), markup=source['index.html'].match(/<body[^>]*>([\s\S]*?)<\/body>/)[1];
  await page.evaluate(({markup,css})=>{
    document.body.replaceChildren(); document.body.style.display='flex';
    window.testControllers=[];
    for(const name of ['first','second']) {
      const host=document.createElement('div');host.dataset.instance=name;host.style.width='226px';document.body.append(host);
      const shadow=host.attachShadow({mode:'open'}),style=document.createElement('style');style.textContent=css;shadow.append(style);
      const container=document.createElement('div');container.innerHTML=markup;shadow.append(container);
      testControllers.push(SLComponent.mount(shadow.querySelector('.sl-component')));
    }
  },{markup,css:source['buttons.css']});
  const first=page.locator('[data-instance="first"]'),second=page.locator('[data-instance="second"]');
  await first.locator('[data-trigger]').click();
  assert.deepEqual(await page.evaluate(()=>testControllers.map(c=>c.state.open)),[true,false]);
  await page.keyboard.press('Escape');
  assert.equal(await first.locator('[data-trigger]').evaluate(n=>n===n.getRootNode().activeElement),true);
  await second.locator('[data-trigger]').click();
  assert.deepEqual(await page.evaluate(()=>testControllers.map(c=>c.state.open)),[false,true]);
  await page.evaluate(()=>{testControllers[0].destroy();testControllers[0].destroy();testControllers[1].reset();});
  await second.locator('[data-trigger]').click();
  assert.equal(await second.locator('[data-trigger]').getAttribute('aria-expanded'),'true');
});
