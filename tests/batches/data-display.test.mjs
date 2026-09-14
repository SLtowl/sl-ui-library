import test, { before, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir, mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import { createHash } from 'node:crypto';
import { createServer } from 'node:http';
import { createRequire } from 'node:module';
import vm from 'node:vm';
import batch from '../../public/catalog-batches/data-display.js';

const publicRoot = new URL('../../public/', import.meta.url);
const source = (variant, file) => readFile(new URL(`packages/${variant}/${file}`, publicRoot), 'utf8');
const slugOf = entry => entry.variants[0].slice('data-display-'.length, -4);
const expected = ['heatmap','histogram','ranking','comparison','grouped-rows','distribution','series-legend','funnel','score-matrix','treemap'];
const hash = bytes => createHash('sha256').update(bytes).digest('hex');

test('reviewed charts use clear bars, single selection accents and unboxed counts', async () => {
  for (const slug of ['score-matrix','treemap','distribution','histogram']) {
    assert.doesNotMatch(await source(`data-display-${slug}-v11`,'buttons.css'), /text-decoration:underline/);
  }
  const funnelCSS = await source('data-display-funnel-v11','buttons.css');
  assert.match(funnelCSS, /transform 320ms/);
  assert.match(funnelCSS, /transform-origin:left/);
  assert.doesNotMatch(await source('data-display-comparison-v11','index.html'), /dd-dumbbell|dd-dot/);
  assert.match(await source('data-display-comparison-v11','index.html'), /dd-cycle-track/);
  assert.doesNotMatch(await source('data-display-distribution-v11','index.html'), /dd-boxplot|data-marker/);
  assert.match(await source('data-display-distribution-v11','index.html'), /dd-latency-fill/);
  assert.match(await source('data-display-histogram-v11','buttons.css'), /font-variant-numeric:tabular-nums/);
  assert.match(await source('data-display-histogram-v11','index.html'), /class="dd-count" data-count/);
});

test('ten complete, distinct packages obey the compiler and offline contract', async () => {
  assert.equal(batch.length, 10);
  assert.deepEqual(batch.map(slugOf).sort(), [...expected].sort());
  assert.equal(new Set(batch.map(c => c.id)).size, 10);
  const baselineFont = await readFile(new URL('packages/bar-display/instrument-sans-variable.woff2', publicRoot));
  const license = await readFile(new URL('../../LICENSE', import.meta.url), 'utf8');
  for (const entry of batch) {
    const variant = entry.variants[0];
    assert.equal(entry.category, 'data-display');
    assert.equal(entry.id, `matte-${variant}`);
    assert.equal(entry.downloads[variant], `./downloads/matte-${variant}.zip`);
    assert.equal(entry.usage.length, 3);
    assert.deepEqual((await readdir(new URL(`packages/${variant}`, publicRoot))).sort(), ['LICENSE','OFL.txt','buttons.css','buttons.js','example.js','index.html','instrument-sans-variable.woff2'].sort());
    const [html, css, js, example] = await Promise.all(['index.html','buttons.css','buttons.js','example.js'].map(f => source(variant,f)));
    assert.match(html, /<html lang="en">/);
    assert.match(html, /name="viewport"/);
    assert.equal((html.match(/class="sl-component"/g) || []).length, 1);
    assert.match(html, new RegExp(`data-kind="${variant}"`));
    assert.equal((html.match(/ defer>/g) || []).length, 2);
    assert.doesNotMatch(html.split('<body>')[1], /<script/);
    assert.doesNotMatch(js + html + css, /https?:\/\/|fetch\(|XMLHttpRequest|innerHTML|document\.activeElement|setTimeout|requestAnimationFrame/);
    assert.match(js, /window\.SLComponent = \{ mount, mountPreview \};/);
    const expression = js.match(/\(\(\) => \{[\s\S]*\}\)\(\);\s*$/)?.[0];
    assert.ok(expression, variant);
    const compiled = expression.replace(/window\.\w+\s*=\s*(\{[^;]+\});/, 'return $1;');
    assert.equal(typeof vm.runInNewContext(compiled).mount, 'function');
    new vm.Script(js); new vm.Script(example);
    assert.match(example, /SLComponent\.mountPreview\(document\.querySelector\('\.sl-component'\)\)/);
    assert.match(css, /@font-face/);
    assert.match(css, /prefers-reduced-motion:reduce/);
    assert.match(css, /:focus-visible/);
    for (const token of ['surface','text','muted','accent','edge','selected','focus']) assert.ok(css.includes(`--dd-${token}:`));
    const selectors = css.replace(/@font-face\{[^}]+\}/g,'').matchAll(/([^{}]+)\{/g);
    for (const [, selector] of selectors) if (!selector.trim().startsWith('@')) {
      for (const part of selector.trim().split(',')) assert.ok(part.trim().startsWith('.sl-component'), `${variant}: unscoped ${part}`);
    }
    assert.equal(hash(await readFile(new URL(`packages/${variant}/instrument-sans-variable.woff2`,publicRoot))), hash(baselineFont));
    assert.equal(await source(variant,'LICENSE'), license);
  }
});

// Optional real-browser coverage. Point SL_UI_PLAYWRIGHT at an existing Playwright package.
// No dependency is downloaded or installed by this suite. Static checks always run.
let playwright;
if (process.env.SL_UI_PLAYWRIGHT) playwright = createRequire(import.meta.url)(process.env.SL_UI_PLAYWRIGHT);
let browser, server, baseURL;
before(async () => {
  if (!playwright) return;
  const allowed = new Set(batch.flatMap(c => ['index.html','buttons.css','buttons.js','example.js','instrument-sans-variable.woff2'].map(f=>`packages/${c.variants[0]}/${f}`)));
  server = createServer(async (req,res) => {
    const path = new URL(req.url, 'http://localhost').pathname.slice(1);
    if (!allowed.has(path)) {res.writeHead(404).end(); return;}
    const type = path.endsWith('.css')?'text/css':path.endsWith('.js')?'text/javascript':path.endsWith('.woff2')?'font/woff2':'text/html';
    try {res.writeHead(200, {'Content-Type': type});res.end(await readFile(new URL(path,publicRoot)));}
    catch {res.writeHead(500).end();}
  });
  await new Promise(resolve => server.listen(0,'127.0.0.1',resolve));
  baseURL = `http://127.0.0.1:${server.address().port}`;
  browser = await playwright.chromium.launch({headless:true,...(process.env.SL_UI_BROWSER ? {executablePath:process.env.SL_UI_BROWSER} : {})});
});
after(async () => { await browser?.close(); if (server) await new Promise(resolve => server.close(resolve)); });

for (const entry of batch) test(`${entry.name}: independent lifecycle, interaction, narrow fit and reduced motion`, {skip: !playwright}, async () => {
  const context = await browser.newContext({viewport:{width:800,height:700}});
  const page = await context.newPage();
  const errors=[];
  page.on('pageerror', error=>errors.push(error.message));
  await page.goto(`${baseURL}/packages/${entry.variants[0]}/index.html`);
  await page.evaluate(() => document.fonts.ready);
  async function capture(state) {
    if (!process.env.SL_UI_QA_DIR) return;
    await mkdir(process.env.SL_UI_QA_DIR, {recursive:true});
    await page.locator('.sl-component').screenshot({path:join(process.env.SL_UI_QA_DIR,`${slugOf(entry)}-${state}.png`)});
  }
  await capture('initial');
  const report = await page.evaluate(() => {
    const root=document.querySelector('.sl-component'),api=window.SLComponent;
    const original=api.mount(root),initial=JSON.stringify(original.state);
    const initialMarkup=root.innerHTML;
    const clone=root.cloneNode(true),host=document.createElement('div'),shadow=host.attachShadow({mode:'open'});
    document.body.append(host);shadow.append(clone);
    const events=[],domEvents=[];host.addEventListener('displaychange',event=>domEvents.push(event));
    const other=api.mount(clone,{onChange:event=>events.push(event)});
    const same=api.mount(clone)===other;
    const select=clone.querySelector('[data-select]');
    const toggle=clone.querySelector('[data-toggle]');
    const mutate=()=>other.select?other.select((other.state.selected+1)%clone.querySelectorAll('[data-select]').length):other.toggle(0);
    mutate();const isolated=JSON.stringify(original.state)===initial;
    const composed=domEvents.length===1&&domEvents[0].composed&&domEvents[0].detail===events[0];
    const snapshot=other.state;let frozen=Object.isFrozen(snapshot);
    for(const value of Object.values(snapshot))if(Array.isArray(value))frozen&&=Object.isFrozen(value);
    let invalid=false;try{if(other.select)other.select(-1);else other.toggle(99);}catch(e){invalid=e.name==='RangeError';}
    const literal='測定 <img src=x onerror=alert(1)> & Пример';
    clone.querySelector('h2').textContent=literal;
    const safe=clone.querySelector('h2').textContent===literal&&!clone.querySelector('img');
    other.reset();const reset=JSON.stringify(other.state)===initial;
    if(other.setMode)other.setMode(clone.querySelectorAll('[data-mode]')[1].dataset.mode);
    for(let i=0;i<20;i++)mutate();
    other.destroy();other.destroy();const eventCount=events.length;
    (select||toggle).click();const noLeakedListeners=events.length===eventCount;
    const afterDestroy=other.reset()===false;
    const remounted=api.mount(clone),remount=remounted!==other&&JSON.stringify(remounted.state)===initial;
    const remountOrder=!clone.querySelector('[data-list]')||[...clone.querySelectorAll('[data-select]')].every((b,i)=>Number(b.dataset.select)===i);
    remounted.destroy();host.remove();
    original.reset();
    return {same,isolated,composed,frozen,invalid,safe,reset,noLeakedListeners,afterDestroy,remount,remountOrder,markupReset:root.innerHTML===initialMarkup};
  });
  assert.deepEqual(Object.values(report), Array(Object.keys(report).length).fill(true), JSON.stringify(report));
  const slug=slugOf(entry);
  const secondary=page.locator('[data-mode]').last();
  if(await secondary.count()) {await secondary.click(); await secondary.press('Space');}
  if(slug==='grouped-rows') {
    for(let i=0;i<3;i++)await page.locator(`[data-toggle="${i}"]`).click();
    await page.locator('[data-select="5"]').click();
    await page.locator('[data-select="5"]').press('Escape');
    assert.equal(await page.locator('[data-toggle="2"]').getAttribute('aria-expanded'),'false');
    assert.equal(await page.evaluate(()=>document.activeElement.dataset.toggle),'2');
    await page.evaluate(()=>{const c=SLComponent.mount(document.querySelector('.sl-component'));for(let i=0;i<3;i++)c.toggle(i,true);});
  } else if(slug==='series-legend') {
    await page.locator('[data-toggle="0"]').click();await page.locator('[data-toggle="1"]').press('Enter');
    assert.equal(await page.locator('[data-toggle="2"]').isDisabled(),true);
    assert.match(await page.locator('[data-summary]').innerText(),/1 series · 55 visits/);
    await page.locator('[data-toggle="0"]').click();
  } else {
    const last=page.locator('[data-select]').last();await last.click();await last.press('Enter');
    assert.equal(await last.getAttribute('aria-pressed'),'true');
    if(['heatmap','histogram','score-matrix'].includes(slug)) {
      await last.press('Control+Home');
      assert.equal(await page.locator('[data-select="0"]').getAttribute('aria-pressed'),'true');
      await page.locator('[data-select="0"]').press('ArrowRight');
      assert.equal(await page.locator('[data-select="1"]').getAttribute('aria-pressed'),'true');
      if(slug!=='histogram'){
        await page.locator('[data-select="1"]').press('ArrowUp');
        assert.equal(await page.locator('[data-select="1"]').getAttribute('aria-pressed'),'true');
        await page.locator('[data-select="1"]').press('Control+End');
        const end=page.locator('[data-select]').last();await end.press('ArrowDown');await end.press('ArrowRight');
        assert.equal(await end.getAttribute('aria-pressed'),'true');
      }
    }
  }
  // Direct staging here is geometry inspection, not evidence of user interaction.
  await page.setViewportSize({width:320,height:600});
  await page.evaluate(()=>document.querySelector('.sl-component').style.width='226px');
  await page.waitForTimeout(300);
  const fit=await page.evaluate(()=>{
    const root=document.querySelector('.sl-component'),box=root.getBoundingClientRect();
    const outside=[...root.querySelectorAll('button,.dd-summary,.dd-hint')].filter(el=>!el.closest('[inert]')).filter(el=>{const b=el.getBoundingClientRect();return b.left<box.left||b.right>box.right+1;}).map(el=>el.textContent);
    return {width:box.width,height:box.height,outside,overflow:root.scrollWidth>root.clientWidth};
  });
  assert.equal(fit.width,226);assert.ok(fit.height<=438,`${slug}: ${fit.height}px exceeds preview content budget`);
  assert.deepEqual(fit.outside,[]);assert.equal(fit.overflow,false);
  await capture('narrow');
  await page.emulateMedia({reducedMotion:'reduce'});
  const motion=await page.evaluate(()=>[...document.querySelectorAll('.sl-component *')].every(el=>getComputedStyle(el).transitionDuration==='0s'));
  assert.equal(motion,true);
  await page.evaluate(()=>{const root=document.querySelector('.sl-component');root.style.setProperty('--dd-surface','#202536');root.style.setProperty('--dd-accent','#dde5ff');root.style.setProperty('--dd-focus','#dde5ff');});
  assert.equal(await page.locator('.sl-component').evaluate(el=>getComputedStyle(el).backgroundColor),'rgb(32, 37, 54)');
  await capture('palette-reduced');
  assert.deepEqual(errors,[]);
  await context.close();
});

test('review fixes keep animated values, selection and count alignment consistent', {skip: !playwright}, async()=>{
  const page=await browser.newPage({reducedMotion:'no-preference'});
  async function open(slug){await page.goto(`${baseURL}/packages/data-display-${slug}-v11/index.html`);await page.evaluate(()=>document.fonts.ready);}
  const scaleX=el=>new DOMMatrixReadOnly(getComputedStyle(el).transform).a;
  await open('funnel');
  const fill=page.locator('[data-select="3"] .dd-funnel-track i');
  assert.ok(Math.abs(await fill.evaluate(scaleX)-.12)<.001);
  await page.evaluate(()=>{
    window.motionSamples=[];window.motionDone=false;
    document.querySelector('[data-mode="previous"]').addEventListener('click',()=>{
      const fill=document.querySelector('[data-select="3"] .dd-funnel-track i'),start=performance.now();
      function sample(){window.motionSamples.push(new DOMMatrixReadOnly(getComputedStyle(fill).transform).a);if(performance.now()-start<400)requestAnimationFrame(sample);else window.motionDone=true;}
      requestAnimationFrame(sample);
    },{once:true});
  });
  await page.locator('[data-mode="previous"]').click();
  await page.waitForFunction(()=>window.motionDone);
  assert.ok(await page.evaluate(()=>motionSamples.some(value=>value>.13&&value<.49)),'funnel must animate through intermediate values');
  assert.ok(Math.abs(await fill.evaluate(scaleX)-.5)<.001);
  await page.locator('[data-mode="entry"]').click();
  await page.locator('[data-mode="previous"]').click();
  await page.locator('[data-mode="entry"]').press('Enter');
  await page.waitForFunction(()=>Math.abs(new DOMMatrixReadOnly(getComputedStyle(document.querySelector('[data-select="3"] .dd-funnel-track i')).transform).a-.12)<.001);
  await page.locator('[data-select="1"]').click();
  assert.match(await page.locator('[data-summary]').innerText(),/Started · 600 people · 400 lost from Viewed/);
  for(const slug of ['score-matrix','treemap']){
    await open(slug);
    const selected=page.locator('[data-select="1"]');await selected.click();
    assert.equal(await selected.getAttribute('aria-pressed'),'true');
    assert.equal(await selected.locator('strong').evaluate(el=>getComputedStyle(el).textDecorationLine),'none');
  }
  await open('comparison');
  assert.equal(await page.getByRole('slider').count(),0);
  assert.equal(await page.locator('.dd-cycle-track').count(),6);
  await page.locator('[data-select="1"]').click();
  assert.match(await page.locator('[data-summary]').innerText(),/Commerce · -10 issues · -12.5%/);
  await open('distribution');
  await page.locator('[data-mode="west"]').click();
  await page.locator('[data-select="4"]').press('Enter');
  assert.match(await page.locator('[data-summary]').innerText(),/West · Slowest · 80 ms/);
  assert.deepEqual(await page.locator('.dd-latency-fill').evaluateAll(els=>els.map(el=>Number(el.style.transform.match(/[\d.]+/)[0]))),[.15,.3,.45,.65,.8]);
  await open('histogram');
  for(const width of [320,768,1024,1440]){
    await page.setViewportSize({width,height:650});
    await page.evaluate(()=>document.querySelector('.sl-component').style.width='226px');
    for(const mode of ['frequency','cumulative']){
      await page.locator(`[data-mode="${mode}"]`).click();
      const labels=await page.locator('.dd-bin').evaluateAll(bins=>bins.map(bin=>{
        const count=bin.querySelector('[data-count]'),bar=bin.querySelector('.dd-column'),c=count.getBoundingClientRect(),b=bar.getBoundingClientRect();
        return {center:Math.abs(c.left+c.width/2-b.left-b.width/2),above:c.bottom<=b.top,background:getComputedStyle(count).backgroundColor,clipped:count.scrollWidth>count.clientWidth};
      }));
      assert.ok(labels.every(l=>l.center<.5&&l.above&&!l.clipped&&l.background==='rgba(0, 0, 0, 0)'),JSON.stringify(labels));
    }
  }
  for(const slug of ['funnel','comparison','distribution','histogram']){
    await open(slug);
    const worst=await page.evaluate(()=>{
      const root=document.querySelector('.sl-component'),controller=SLComponent.mount(root);root.style.width='226px';
      let height=0,overflow=false;
      for(const mode of root.querySelectorAll('[data-mode]')){
        controller.setMode(mode.dataset.mode);
        for(const item of root.querySelectorAll('[data-select]')){
          controller.select(Number(item.dataset.select));
          height=Math.max(height,root.getBoundingClientRect().height);
          overflow ||= root.scrollWidth>root.clientWidth;
        }
      }
      return {height,overflow};
    });
    assert.ok(worst.height<=438&&!worst.overflow,`${slug}: ${JSON.stringify(worst)}`);
  }
  await page.close();
});

test('display math and mode semantics agree with the exact sample values', {skip: !playwright}, async()=>{
  const page=await browser.newPage();
  async function open(slug){await page.goto(`${baseURL}/packages/data-display-${slug}-v11/index.html`);}
  async function run(fn){return page.evaluate(fn);}
  await open('histogram');
  assert.deepEqual(await run(()=>{const c=SLComponent.mount(document.querySelector('.sl-component'));c.setMode('cumulative');return [...document.querySelectorAll('[data-count]')].map(n=>Number(n.textContent));}),[2,6,13,22,27,30]);
  await open('ranking');
  assert.deepEqual(await run(()=>{SLComponent.mount(document.querySelector('.sl-component')).setMode('conversion');return [...document.querySelectorAll('[data-select]')].map(n=>Number(n.dataset.select));}),[2,1,3,0]);
  await open('comparison');
  assert.equal(await run(()=>{SLComponent.mount(document.querySelector('.sl-component')).setMode('percent');return document.querySelector('[data-select="1"] [data-delta]').textContent;}),'-12.5%');
  await open('funnel');
  assert.deepEqual(await run(()=>{SLComponent.mount(document.querySelector('.sl-component')).setMode('previous');return [...document.querySelectorAll('[data-rate]')].map(n=>n.textContent);}),['100%','60%','40%','50%']);
  await open('score-matrix');
  assert.deepEqual(await run(()=>{SLComponent.mount(document.querySelector('.sl-component')).setMode('gap');return [...document.querySelectorAll('[data-score]')].map(n=>Number(n.textContent));}),[1,2,0,0,1,1,2,0,1]);
  await open('treemap');
  assert.deepEqual(await run(()=>{SLComponent.mount(document.querySelector('.sl-component')).setMode('files');return [...document.querySelectorAll('[data-share]')].map(n=>n.textContent);}),['30%','45%','15%','10%']);
  await open('distribution');
  assert.deepEqual(await run(()=>{SLComponent.mount(document.querySelector('.sl-component')).setMode('west');return [...document.querySelectorAll('[data-value]')].map(n=>n.textContent);}),['15 ms','30 ms','45 ms','65 ms','80 ms']);
  await open('heatmap');assert.equal(await run(()=>[...document.querySelectorAll('[data-select]')].reduce((sum,b)=>sum+Number(b.textContent),0)),94);
  await open('grouped-rows');assert.equal(await run(()=>[...document.querySelectorAll('.dd-group-total')].reduce((sum,b)=>sum+parseInt(b.textContent),0)),28);
  await open('series-legend');assert.equal(await run(()=>[...document.querySelectorAll('.dd-legend strong')].reduce((sum,b)=>sum+Number(b.textContent),0)),290);
  await page.close();
});
