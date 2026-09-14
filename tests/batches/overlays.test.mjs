import test, {before, after} from 'node:test';
import assert from 'node:assert/strict';
import {readFile,readdir} from 'node:fs/promises';
import {createRequire} from 'node:module';
import {createServer} from 'node:http';
import {Script} from 'node:vm';
import {createHash} from 'node:crypto';
import batch from '../../public/catalog-batches/overlays.js';

const packageRoot=new URL('../../public/packages/',import.meta.url);
const required=['LICENSE','OFL.txt','buttons.css','buttons.js','example.js','index.html','instrument-sans-variable.woff2'];
const sources=new Map();
const hash=bytes=>createHash('sha256').update(bytes).digest('hex');

test('exactly ten complete, unique overlay packages with portable controller contracts',async()=>{
  assert.equal(batch.length,10);
  assert.equal(new Set(batch.map(item=>item.id)).size,10);
  const font=await readFile(new URL('modal-overlay/instrument-sans-variable.woff2',packageRoot));
  const license=await readFile(new URL('../../LICENSE',import.meta.url),'utf8');
  for(const item of batch){
    assert.equal(item.category,'overlays');
    const [variant]=item.variants;
    assert.match(variant,/^overlays-[a-z-]+-v11$/);
    assert.equal(item.id,'matte-'+variant);
    assert.equal(item.downloads[variant],'./downloads/'+item.id+'.zip');
    assert.equal(item.usage.length,3);
    const folder=new URL(variant+'/',packageRoot);
    assert.deepEqual((await readdir(folder)).sort(),required);
    const [html,css,js,example]=await Promise.all(['index.html','buttons.css','buttons.js','example.js'].map(file=>readFile(new URL(file,folder),'utf8')));
    sources.set(variant,{html,css,js});
    assert.match(html,/<html lang="en">/);
    assert.match(html,/<meta name="viewport"/);
    assert.equal((html.match(/class="sl-component"/g)||[]).length,1);
    assert.match(html,new RegExp('data-kind="'+variant+'"'));
    assert.equal((html.match(/<script defer/g)||[]).length,2);
    assert.doesNotMatch(html,/<body[^>]*>[\s\S]*<script|<dialog|\bstyle="|<img|https?:\/\//);
    assert.match(html,/data-layer aria-hidden="true" inert/);
    assert.match(html,/data-panel tabindex="-1" role="dialog"/);
    assert.match(css,/@font-face/);
    assert.match(css,/@media\(prefers-reduced-motion:reduce\)/);
    for(const token of ['surface','field','text','muted','accent','on-accent','border','focus','ink']){
      const hex=css.match(new RegExp('--ov-'+token+':#([0-9a-f]{6})'))?.[1];
      assert.ok(hex,variant+' has '+token);
      assert.equal(hex.slice(0,2),hex.slice(2,4),variant+' neutral '+token);
      assert.equal(hex.slice(2,4),hex.slice(4,6),variant+' neutral '+token);
    }
    assert.doesNotMatch(css,/(?:^|\n)(?:\*|body|html|:root|button|input|svg)\s*\{/);
    assert.doesNotMatch(js,/innerHTML|insertAdjacentHTML|fetch\(|XMLHttpRequest|showModal|document\.activeElement|setTimeout|requestAnimationFrame/);
    assert.match(js,/root\.getRootNode\(\)\.activeElement/);
    assert.match(js,/window\.SLComponent = \{ mount, mountPreview \};/);
    new Script(js,{filename:variant+'/buttons.js'});
    new Script(example,{filename:variant+'/example.js'});
    const expression=js.match(/\(\(\) => \{[\s\S]*\}\)\(\);\s*$/)?.[0];
    assert.ok(expression,'Compiler expression: '+variant);
    new Script('const api = '+expression.replace(/window\.\w+\s*=\s*(\{[^;]+\});/,'return $1;'));
    assert.match(example,/SLComponent\.mountPreview/);
    assert.equal(hash(await readFile(new URL('instrument-sans-variable.woff2',folder))),hash(font));
    assert.equal(await readFile(new URL('LICENSE',folder),'utf8'),license);
  }
});

// Browser checks use an existing Playwright installation; no install or host change is made.
// Set SL_UI_PLAYWRIGHT_PATH to its package.json and SL_UI_BROWSER_EXECUTABLE if needed.
let chromium;
try {
  const require=createRequire(process.env.SL_UI_PLAYWRIGHT_PATH||import.meta.url);
  ({chromium}=require('playwright'));
} catch {}
const browserTest=chromium?test:test.skip;
let server,browser,context,page,origin;
const errors=[];
before(async()=>{
  if(!chromium)return;
  server=createServer(async(req,res)=>{
    const path=new URL(req.url,'http://localhost').pathname.slice(1);
    if(!/^overlays-[a-z-]+-v11\/(index\.html|buttons\.(js|css)|example\.js|instrument-sans-variable\.woff2)$/.test(path)){res.writeHead(404).end();return;}
    try{const data=await readFile(new URL(path,packageRoot));res.setHeader('Content-Type',path.endsWith('.js')?'text/javascript':path.endsWith('.css')?'text/css':path.endsWith('.woff2')?'font/woff2':'text/html');res.end(data);}catch{res.writeHead(404).end();}
  });
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  origin='http://127.0.0.1:'+server.address().port;
  browser=await chromium.launch({headless:true,...(process.env.SL_UI_BROWSER_EXECUTABLE?{executablePath:process.env.SL_UI_BROWSER_EXECUTABLE}:{})});
  context=await browser.newContext({viewport:{width:320,height:510}});
  page=await context.newPage();
  page.on('pageerror',error=>errors.push(error.message));
});
after(async()=>{await browser?.close();if(server)await new Promise(resolve=>server.close(resolve));});

async function load(slug){
  await page.setViewportSize({width:320,height:510});
  await page.goto(origin+'/overlays-'+slug+'-v11/index.html');
  await page.evaluate(()=>{window.fixture=SLComponent.mount(document.querySelector('.sl-component'));window.events=[];document.querySelector('.sl-component').addEventListener('overlaychange',event=>events.push(event.detail));});
  await page.locator('[data-trigger]').click();
}
const state=()=>page.evaluate(()=>fixture.state);
const action=name=>page.locator('[data-action="'+name+'"]');

browserTest('panel text and empty space never dismiss any overlay inside a focusable Shadow DOM host',async()=>{
  for(const item of batch){
    await load(item.variants[0].slice(9,-4));
    await page.evaluate(async()=>{
      fixture.destroy();
      const root=document.querySelector('.sl-component');
      const main=document.createElement('main');main.tabIndex=-1;main.style.width='296px';
      const host=document.createElement('div');main.append(host);
      const shadow=host.attachShadow({mode:'open'});
      const css=document.createElement('link');css.rel='stylesheet';css.href='./buttons.css';
      const loaded=new Promise(resolve=>css.onload=resolve);shadow.append(css,root);
      document.body.replaceChildren(main);await loaded;
      window.fixture=SLComponent.mount(root);
    });
    await page.locator('[data-trigger]').click();
    assert.equal((await state()).open,true,item.name+' opens in Shadow DOM');
    await page.locator('.ov-head h2').click();
    assert.equal((await state()).open,true,item.name+' heading click');
    await page.locator('.ov-body').click({position:{x:2,y:20}});
    assert.equal((await state()).open,true,item.name+' body padding click');
    await page.locator('.ov-foot').click({position:{x:2,y:2}});
    assert.equal((await state()).open,true,item.name+' footer padding click');
    if(await page.locator('.ov-check').count()){
      await page.locator('.ov-check').first().click({position:{x:28,y:10}});
      assert.equal((await state()).open,true,item.name+' checkbox label click');
      await page.locator('.ov-foot').click({position:{x:2,y:2}});
    }
    await page.keyboard.press('Shift+Tab');
    assert.equal(await page.locator('[data-panel]').evaluate(p=>p.contains(p.getRootNode().activeElement)),true,item.name+' reverse Tab after blank click');
    await page.locator('.ov-head h2').click();await page.keyboard.press('Tab');
    assert.equal(await page.locator('[data-close]').evaluate(b=>b===b.getRootNode().activeElement),true,item.name+' Tab from panel');
    await page.keyboard.press('Escape');assert.equal((await state()).open,false);
    await page.locator('[data-trigger]').click();
    await page.locator('[data-layer]').click({position:{x:2,y:216}});
    assert.equal((await state()).open,false,item.name+' real backdrop click');
  }
});

browserTest('every panel fits narrow and wide previews; keyboard, reversal and lifecycle remain local',async()=>{
  for(const item of batch){
    const slug=item.variants[0].slice(9,-4);
    await load(slug);
    const initial=await page.evaluate(()=>{fixture.reset();return fixture.state;});
    for(const width of [226,320]){
      await page.setViewportSize({width:width===320?360:320,height:510});
      await page.locator('.sl-component').evaluate((root,width)=>root.style.width=width+'px',width);
      await page.evaluate(()=>fixture.open());
      await page.waitForFunction(()=>getComputedStyle(document.querySelector('.ov-panel')).transform==='matrix(1, 0, 0, 1, 0, 0)'||getComputedStyle(document.querySelector('.ov-panel')).transform==='none');
      const fit=await page.locator('.sl-component').evaluate(root=>{
        const r=root.getBoundingClientRect(),panel=root.querySelector('.ov-panel'),p=panel.getBoundingClientRect();
        const visible=[root.querySelector('[data-close]'),...root.querySelectorAll('.ov-foot button')].every(button=>{const b=button.getBoundingClientRect();return b.left>=r.left&&b.right<=r.right&&b.top>=r.top&&b.bottom<=r.bottom;});
        const body=panel.querySelector('.ov-body');
        return {visible,width:r.width,panelFits:p.left>=r.left&&p.right<=r.right&&p.top>=r.top&&p.bottom<=r.bottom,inViewport:r.left>=0&&r.right<=innerWidth&&r.top>=0&&r.bottom<=innerHeight,bodyScroll:body.scrollHeight-body.clientHeight,overflow:panel.scrollWidth>panel.clientWidth};
      });
      assert.equal(fit.width,width,item.name);assert.ok(fit.visible&&fit.panelFits&&!fit.overflow,item.name+' fits '+width);
      assert.equal(fit.inViewport,true,item.name+' fits viewport');assert.equal(fit.bodyScroll,0,item.name+' default content needs no scrolling');
      assert.equal(await page.locator('[data-close]').evaluate(el=>el===el.getRootNode().activeElement),true);
      await page.keyboard.press('Shift+Tab');
      assert.equal(await page.locator('.ov-panel').evaluate(panel=>{const stops=[...panel.querySelectorAll('button,input,select,[tabindex]')].filter(el=>!el.disabled&&el.tabIndex>=0&&el.getClientRects().length&&!el.closest('[hidden]'));return stops.at(-1)===panel.getRootNode().activeElement;}),true,item.name+' reverse Tab');
      await page.keyboard.press('Tab');
      assert.equal(await page.locator('[data-close]').evaluate(el=>el===el.getRootNode().activeElement),true);
      await page.keyboard.press('Escape');
      assert.equal((await state()).open,false);
      assert.equal(await page.locator('[data-trigger]').evaluate(el=>el===el.getRootNode().activeElement),true);
      assert.equal(await page.locator('[data-layer]').evaluate(el=>el.inert),true);
      await page.locator('[data-trigger]').click();
      await page.locator('[data-layer]').click({position:{x:2,y:216}});
      assert.equal((await state()).open,false,item.name+' backdrop closes');
      assert.equal(await page.locator('[data-trigger]').evaluate(el=>el===el.getRootNode().activeElement),true,item.name+' backdrop returns focus');
    }
    await page.evaluate(()=>{for(let i=0;i<15;i++){fixture.open();fixture.close();}fixture.open();fixture.reset();fixture.reset();});
    assert.deepEqual(await state(),initial,item.name+' reset');
    assert.equal(await page.evaluate(()=>SLComponent.mount(document.querySelector('.sl-component'))===fixture),true);
    await page.evaluate(()=>{fixture.destroy();fixture.destroy();document.querySelector('[data-trigger]').click();});
    assert.equal(await page.locator('.sl-component').getAttribute('data-open'),'false');
    await page.evaluate(()=>{fixture=SLComponent.mount(document.querySelector('.sl-component'));});
    await page.locator('[data-trigger]').click();assert.equal((await state()).open,true);
  }
  assert.deepEqual(errors,[]);
});

browserTest('settings drafts apply and cancel without cross-instance or duplicate changes',async()=>{
  await load('workspace-settings');
  await page.locator('.sl-choice-trigger').click();await page.locator('[data-choice="compact"]').click();await page.locator('[name=hints]').uncheck();
  assert.equal((await state()).density,'comfortable');
  await page.keyboard.press('Escape');await page.locator('[data-trigger]').click();
  assert.equal(await page.locator('[name=density]').inputValue(),'comfortable');
  await page.locator('.sl-choice-trigger').click();await page.locator('[data-choice="compact"]').click();await page.locator('[name=labels]').uncheck();await action('apply').click();
  assert.equal((await state()).density,'compact');assert.equal((await state()).labels,false);
  assert.equal(await page.evaluate(()=>events.length),1);
  const copy=await page.evaluate(()=>{const source=document.querySelector('.sl-component');const host=document.createElement('div');document.body.append(host);const shadow=host.attachShadow({mode:'open'});const clone=source.cloneNode(true);shadow.append(clone);const other=SLComponent.mount(clone);other.open();other.reset();return {same:other===fixture,first:fixture.state.density,other:other.state.density};});
  assert.deepEqual(copy,{same:false,first:'compact',other:'comfortable'});
});

browserTest('calendar crosses month and leap-day boundaries with keyboard and commits ISO dates',async()=>{
  await load('date-picker');
  await page.locator('[data-date="2026-09-30"]').click();await page.keyboard.press('ArrowRight');await page.keyboard.press('Enter');
  assert.equal((await state()).draft,'2026-10-01');
  await action('apply').click();assert.equal((await state()).date,'2026-10-01');
  await page.locator('[data-trigger]').click();
  await page.locator('[data-date="2026-10-01"]').focus();
  for(let i=0;i<16;i++)await page.keyboard.press('PageDown');
  assert.equal((await state()).month,'2028-02');
  await page.locator('[data-date="2028-02-29"]').click();await action('apply').click();
  assert.equal((await state()).date,'2028-02-29');
  await page.locator('[data-trigger]').click();await page.locator('[data-date="2028-02-29"]').focus();await page.keyboard.press('Home');
  assert.equal((await state()).cursor,'2028-02-28');await page.keyboard.press('End');assert.equal((await state()).cursor,'2028-03-05');
  await page.keyboard.press('Escape');assert.equal((await state()).date,'2028-02-29');
  await page.locator('[data-trigger]').click();
  const boundaries=await page.evaluate(()=>{
    const root=document.querySelector('.sl-component'),back=root.querySelector('[data-action=previous]'),next=root.querySelector('[data-action=next]');
    for(let i=0;i<2600&&!back.disabled;i++)back.click();
    const min=fixture.state.month;back.click();const minStill=fixture.state.month;
    const lowDates=[...root.querySelectorAll('[data-day]:enabled')].every(day=>day.dataset.date>='1900-01-01');
    for(let i=0;i<2600&&!next.disabled;i++)next.click();
    const max=fixture.state.month;next.click();const maxStill=fixture.state.month;
    const highDates=[...root.querySelectorAll('[data-day]:enabled')].every(day=>day.dataset.date<='2099-12-31');
    return {min,minStill,max,maxStill,lowDates,highDates};
  });
  assert.deepEqual(boundaries,{min:'1900-01',minStill:'1900-01',max:'2099-12',maxStill:'2099-12',lowDates:true,highDates:true});
});

browserTest('notification filtering preserves focus and read state is reversible',async()=>{
  await load('notification-inbox');await page.locator('[data-filter=unread]').click();
  await page.locator('[data-read="0"]').click();assert.equal((await state()).unread,1);
  assert.equal(await page.locator('[data-filter=unread]').evaluate(el=>el===document.activeElement),true);
  await action('mark-all').click();assert.equal((await state()).unread,0);assert.equal(await page.locator('[data-empty]').isVisible(),true);
  await page.locator('[data-filter=all]').click();await page.locator('[data-read="2"]').click();assert.equal((await state()).unread,1);
});

browserTest('comparison displays annual totals, hides equal rows and selects locally',async()=>{
  await load('plan-compare');await page.locator('[data-billing=yearly]').click();
  assert.equal(await page.locator('[data-team-price]').textContent(),'$200');assert.equal(await page.locator('[data-price-label]').textContent(),'Per year');
  await page.locator('[name=differences]').check();assert.equal(await page.locator('[data-equal]').isVisible(),false);
  await action('team').click();assert.equal((await state()).selected,'team');assert.equal((await state()).billing,'yearly');
  assert.deepEqual(await page.evaluate(()=>events.at(-1).value),{plan:'team',billing:'yearly'});
});

browserTest('style inspector preserves Unicode literally and keyboard range boundaries',async()=>{
  await load('style-inspector');const literal='<b>Привет & 東京</b>';
  await page.locator('[name=label]').fill(literal);assert.equal(await page.locator('[data-sample]').textContent(),literal);assert.equal(await page.locator('[data-sample] b').count(),0);
  await page.locator('[name=radius]').focus();await page.keyboard.press('End');assert.equal((await state()).radius,24);
  await page.locator('[name=opacity]').focus();await page.keyboard.press('Home');assert.equal((await state()).opacity,25);
  assert.match(await page.locator('[data-css]').textContent(),/opacity: 0.25;/);
  await action('defaults').click();assert.equal((await state()).label,'Sample label');assert.equal((await state()).opacity,100);
});

browserTest('shortcut search handles empty results, platform notation and clear focus',async()=>{
  await load('shortcut-guide');await page.locator('[data-platform=mac]').click();await page.locator('[name=query]').fill('cmd');
  assert.equal((await state()).visible,3);await page.locator('[name=query]').fill('<東京>');assert.equal((await state()).visible,0);
  assert.equal(await page.locator('[data-empty]').isVisible(),true);await action('clear').click();assert.equal((await state()).visible,5);
  assert.equal(await page.locator('[name=query]').evaluate(el=>el===document.activeElement),true);
});

browserTest('project filters combine facets, apply exact matches and discard pending edits',async()=>{
  await load('filter-builder');await page.locator('.sl-choice-trigger').click();await page.locator('[data-choice="active"]').click();await page.locator('[name=mine]').check();
  assert.deepEqual((await state()).matches,['Studio website']);await action('apply').click();
  assert.deepEqual(await page.evaluate(()=>events.at(-1).value.results),['Studio website']);
  await page.locator('[data-trigger]').click();await page.locator('[name=query]').fill('不存在');assert.deepEqual((await state()).matches,[]);
  await page.keyboard.press('Escape');await page.locator('[data-trigger]').click();assert.equal(await page.locator('[name=query]').inputValue(),'');
  await action('clear').click();assert.equal((await state()).matches.length,4);
});

browserTest('RGB mixer rejects invalid hex, supports range keys, applies and cancels drafts',async()=>{
  await load('color-mixer');await page.locator('[name=hex]').fill('#bad');assert.equal((await state()).valid,false);assert.equal(await action('apply').isDisabled(),true);
  await page.locator('[name=hex]').fill('ff0080');assert.deepEqual((await state()).rgb,[255,0,128]);await action('apply').click();assert.equal((await state()).hex,'#FF0080');
  await page.locator('[data-trigger]').click();await page.locator('[name=r]').focus();await page.keyboard.press('Home');assert.equal((await state()).rgb[0],0);
  await page.keyboard.press('Escape');assert.equal((await state()).hex,'#FF0080');assert.equal((await state()).draft,'#FF0080');
});

browserTest('focus timer uses elapsed time, pauses, completes once and cleans up on destroy',async()=>{
  await page.clock.install();await load('focus-timer');await action('toggle').click();await page.clock.fastForward(12500);
  assert.ok((await state()).remaining<=288);assert.equal((await state()).running,true);
  await action('toggle').click();const paused=(await state()).remaining;await page.clock.fastForward(20000);assert.equal((await state()).remaining,paused);
  await action('toggle').click();await page.keyboard.press('Escape');await page.clock.fastForward(300000);assert.equal((await state()).remaining,0);
  assert.equal(await page.evaluate(()=>events.filter(event=>event.action==='complete').length),1);await page.clock.fastForward(10000);
  assert.equal(await page.evaluate(()=>events.filter(event=>event.action==='complete').length),1);
  await page.locator('[data-trigger]').click();await action('toggle').click();await page.evaluate(()=>fixture.destroy());const count=await page.evaluate(()=>events.length);
  await page.clock.fastForward(400000);assert.equal(await page.evaluate(()=>events.length),count);assert.equal((await state()).running,false);
  await page.clock.resume();
});

browserTest('version selection updates a local draft and undo restores it only once',async()=>{
  await load('version-history');assert.equal(await action('use').isDisabled(),true);assert.equal(await action('undo').isDisabled(),true);
  await page.locator('[data-version="1"]').click();assert.equal((await state()).current,3);await action('use').click();assert.equal((await state()).text,'Build a workspace.');
  await action('undo').click();assert.equal((await state()).current,3);assert.equal(await action('undo').isDisabled(),true);
  assert.deepEqual(await page.evaluate(()=>events.map(event=>event.action)),['use','undo']);
});

browserTest('Shadow DOM focus isolation, reduced motion changes and palette adaptation',async()=>{
  await load('workspace-settings');
  await page.evaluate(()=>{fixture.destroy();const original=document.querySelector('.sl-component');const host=document.createElement('div');host.style.width='226px';document.body.replaceChildren(host);const shadow=host.attachShadow({mode:'open'});shadow.append(original);const link=document.createElement('link');link.rel='stylesheet';link.href='./buttons.css';shadow.prepend(link);window.fixture=SLComponent.mount(original);original.style.setProperty('--ov-surface','#30283e');original.style.setProperty('--ov-field','#241e2f');original.style.setProperty('--ov-accent','#eadff9');original.style.setProperty('--ov-on-accent','#332640');original.style.setProperty('--ov-focus','#dbc8f1');});
  await page.locator('[data-trigger]').click();assert.equal(await page.locator('[data-close]').evaluate(el=>el===el.getRootNode().activeElement),true);
  assert.equal(await page.locator('.ov-panel').evaluate(el=>getComputedStyle(el).backgroundColor),'rgb(48, 40, 62)');
  assert.equal(await action('apply').evaluate(el=>getComputedStyle(el).color),'rgb(51, 38, 64)');
  await page.emulateMedia({reducedMotion:'reduce'});
  assert.equal(await page.locator('.ov-panel').evaluate(el=>getComputedStyle(el).transitionDuration),'0s');
  await page.keyboard.press('Escape');assert.equal(await page.locator('[data-trigger]').evaluate(el=>el===el.getRootNode().activeElement),true);
  await page.emulateMedia({reducedMotion:'no-preference'});
  assert.notEqual(await page.locator('.ov-panel').evaluate(el=>getComputedStyle(el).transitionDuration),'0s');
  assert.deepEqual(errors,[]);
});
