import assert from 'node:assert/strict';
import {mkdir,readFile,writeFile} from 'node:fs/promises';
import {resolve,isAbsolute} from 'node:path';
import {pathToFileURL} from 'node:url';
const runtime=process.env.SL_UI_FRAMEWORK_RUNTIME,playwright=process.env.SL_UI_PLAYWRIGHT_MODULE,label=process.env.SL_UI_OVERLAY_LABEL||'current';
if(process.env.SL_UI_FRAMEWORK_BROWSER!=='1'||![runtime,playwright].every(p=>isAbsolute(p||''))||!/^[-a-z0-9]+$/.test(label))throw new Error('Explicit installed runtime, private output directory and safe evidence label required');
const out=resolve(runtime,'overlay-results',label);await mkdir(out,{recursive:true});
const sourcePackage=resolve(runtime,'release-candidate/public/packages/popover-overlay'),sourceHTML=await readFile(resolve(sourcePackage,'index.html'),'utf8');
const sourceLinks=[...sourceHTML.matchAll(/<link\b[^>]*\brel=["']stylesheet["'][^>]*href=["']([^"']+)["'][^>]*>/g)].map(match=>match[1]);
assert.deepEqual(sourceLinks,['./buttons.css'],'native Popover reference owns its stylesheet');
const sourceCSS=(await Promise.all(sourceLinks.map(link=>readFile(resolve(sourcePackage,link),'utf8')))).join('\n');
const pinBaseline={markup:sourceHTML.match(/<body[^>]*>([\s\S]*?)<\/body>/i)[1],css:sourceCSS};
const pw=await import(pathToFileURL(playwright)),browser=await(pw.chromium??pw.default.chromium).launch({channel:'msedge',headless:true}),page=await browser.newPage({viewport:{width:900,height:1100}}),report={label,checks:[],errors:[],external:[]};let active='';
page.on('pageerror',error=>report.errors.push({active,message:error.message}));
await page.route('**/*',route=>{const url=route.request().url();if(!/^http:\/\/127\.0\.0\.1:435[56]\//.test(url)&&!url.startsWith('data:')){report.external.push({active,url});return route.abort();}return route.continue();});
await page.addInitScript(()=>{
 const add=document.addEventListener.bind(document);window.__overlayListeners=[];window.__overlayPointer=[];
 document.addEventListener=(type,listener,options)=>{if(['pointerdown','keydown'].includes(type)&&options?.signal)window.__overlayListeners.push({type,signal:options.signal});return add(type,listener,options);};
 add('pointerdown',event=>{const path=event.composedPath();window.__overlayPointer.push({target:event.target?.tagName,composed:event.composed,panel:path.some(n=>n.classList?.contains('overlay-panel')),trigger:path.some(n=>n.matches?.('[data-trigger]'))});},true);
});
async function choose(variant){const ready=await page.evaluate(()=>__frameworkBulk.ready);await page.evaluate(variant=>__frameworkBulk.select(variant),variant);await page.waitForFunction(n=>__frameworkBulk.ready>n,ready);}
const host=(slot='first')=>page.locator(`[data-bulk-slot=${slot}]`),root=slot=>host(slot).locator('.overlay-demo'),trigger=slot=>host(slot).locator('[data-trigger]'),panel=slot=>host(slot).locator('.overlay-panel');
async function opened(value,slot='first'){assert.equal(await root(slot).getAttribute('data-open'),String(value));}
async function focused(slot='first'){await page.waitForFunction(slot=>{const n=document.querySelector(`[data-bulk-slot=${slot}] [data-sl-react]`)?.querySelector('div')?.shadowRoot?.querySelector('[data-trigger]');return n&&n.getRootNode().activeElement===n;},slot);}
async function open(variant,slot='first'){if(variant==='tooltip-overlay'){await trigger(slot).focus();await trigger(slot).press('Enter');}else await trigger(slot).click();await opened(true,slot);}
async function pointerDownOn(locator){const box=await locator.boundingBox();assert.ok(box);await page.mouse.move(box.x+box.width/2,box.y+box.height/2);await page.mouse.down();}
async function pinStyles(){return page.evaluate(({markup,css})=>{
 const previous=document.querySelector('[data-pin-baseline]');previous?.remove();
 const baseline=document.createElement('div');baseline.dataset.pinBaseline='';baseline.style.cssText='position:fixed;left:-10000px;top:0;width:320px;';const shadow=baseline.attachShadow({mode:'open'});shadow.innerHTML=markup;const style=document.createElement('style');style.textContent=css;shadow.prepend(style);document.body.append(baseline);
 const derived=document.querySelector('[data-bulk-slot=first] [data-sl-react] div').shadowRoot;
 const inspect=scope=>Object.fromEntries([['input','.sl-check__input',['position','width','height','opacity']],['label','.sl-check',['display','position','gap']],['box','.sl-check__box',['display','position','width','height']],['copy','.sl-check__copy',['display']],['dash','.sl-check__dash',['opacity']]].map(([name,selector,properties])=>{const computed=getComputedStyle(scope.querySelector(selector));return [name,Object.fromEntries(properties.map(p=>[p,computed[p]]))];}));
 const result={expected:inspect(shadow),actual:inspect(derived)};baseline.remove();return result;
},pinBaseline);}
try{
 for(const[framework,url]of [['react','http://127.0.0.1:4355/bulk.html'],['nextjs','http://127.0.0.1:4356/bulk']]){
  await page.goto(url);await page.waitForFunction(()=>window.__frameworkBulk);
  for(const motion of ['no-preference','reduce'])for(const variant of ['popover-overlay','tooltip-overlay','quickedit-overlay','tour-overlay']){
   active=[framework,motion,variant].join(':');const check={framework,motion,variant,steps:[],issues:[]};report.checks.push(check);
   const step=async(name,run)=>{await run();check.steps.push(name);};
   try{
    await page.emulateMedia({reducedMotion:motion});await choose(variant);const modal=variant==='tour-overlay';
    await step('open',()=>open(variant));
    if(variant==='popover-overlay')check.pinStyles=await pinStyles();
    if(!modal){
     await step('native internal pointerdown remains open',async()=>{
      const target=variant==='popover-overlay'?panel().locator('.sl-check'):variant==='quickedit-overlay'?panel().locator('input'):panel();
      await pointerDownOn(target);check.internalPointer=await page.evaluate(()=>__overlayPointer.at(-1));await opened(true);assert.equal(check.internalPointer.composed,true);assert.equal(check.internalPointer.panel,true);assert.equal(check.internalPointer.target,'DIV');await page.mouse.up();
      if(variant==='popover-overlay')assert.equal(await panel().locator('input[type=checkbox]').isChecked(),true);
      if(variant==='quickedit-overlay'){await target.fill('Project 😀 <b>literal</b>');assert.equal(await target.inputValue(),'Project 😀 <b>literal</b>');}
     });
     if(variant==='popover-overlay')await step('pin computed styles match source page CSS cascade',async()=>assert.deepEqual(check.pinStyles.actual,check.pinStyles.expected));
     if(variant==='popover-overlay')await step('pin keyboard reverses without dismissing',async()=>{const input=panel().locator('input[type=checkbox]');await input.focus();await input.press('Space');assert.equal(await input.isChecked(),false);await opened(true);await input.press('Space');assert.equal(await input.isChecked(),true);await opened(true);assert.equal(await panel().locator('.sl-check').evaluate(n=>getComputedStyle(n).outlineWidth),'1px');});
     if(variant==='quickedit-overlay')await step('native submit retains literal Unicode commit values',async()=>{await root().evaluate(n=>n.addEventListener('overlaycommit',event=>window.__overlayCommit=event.detail,{once:true}));await panel().locator('button[type=submit]').click();await opened(false);assert.equal(await page.evaluate(()=>__overlayCommit.project),'Project 😀 <b>literal</b>');assert.equal(await host().locator('[data-feedback]').textContent(),'Renamed to Project 😀 <b>literal</b> in this preview.');assert.equal(await host().locator('[data-feedback] b').count(),0);await open(variant);});
     await step('native trigger pointerdown remains open before click toggles closed',async()=>{await pointerDownOn(trigger());await opened(true);await page.mouse.up();await opened(false);});
     await step('outside pointer dismisses',async()=>{await open(variant);await page.getByRole('heading',{name:'Full framework matrix'}).click();await opened(false);});
    }else{
     await step('modal tour internal navigation and native dialog retained',async()=>{assert.equal(await panel().evaluate(n=>n.tagName),'DIALOG');assert.equal(await panel().evaluate(n=>n.open),true);await panel().locator('[data-tour-next]').click();assert.equal(await panel().locator('[data-tour-count]').textContent(),'STEP 2 OF 3');await opened(true);});
     await page.keyboard.press('Escape');await opened(false);await focused();
    }
    await step('Escape restores own trigger focus',async()=>{await open(variant);await page.keyboard.press('Escape');await opened(false);await focused();});
    await step('three reversible open/close cycles',async()=>{for(let n=0;n<3;n++){await open(variant);await page.keyboard.press('Escape');await opened(false);await focused();}});
    await step('two instances isolate pointer, state and focus',async()=>{
     const ready=await page.evaluate(()=>__frameworkBulk.ready);await page.evaluate(()=>__frameworkBulk.second(true));await page.waitForFunction(n=>__frameworkBulk.ready>n,ready);
     await open(variant,'second');await opened(false);await opened(true,'second');
     if(!modal){await panel('second').dispatchEvent('pointerdown',{bubbles:true,composed:true,pointerType:'mouse',button:0,isPrimary:true});await opened(true,'second');await opened(false);}
     await page.keyboard.press('Escape');await opened(false,'second');await focused('second');
     await open(variant);await opened(false,'second');await page.keyboard.press('Escape');await focused();await page.evaluate(()=>__frameworkBulk.second(false));await page.waitForFunction(()=>!document.querySelector('[data-bulk-slot=second]'));
    });
    await step('repeated unmount clears document listeners and stale open',async()=>{
     for(let n=0;n<2;n++){
      await open(variant);await page.evaluate(()=>{window.__overlayOld={node:document.querySelector('[data-bulk-slot=first] [data-sl-react] div').shadowRoot.querySelector('.overlay-demo'),controller:__frameworkBulk.controllers[0]};__frameworkBulk.show(false);});
      await page.waitForFunction(()=>!document.querySelector('[data-bulk-slot=first] [data-sl-react]'));
      assert.equal(await page.evaluate(()=>__overlayListeners.filter(n=>!n.signal.aborted).length),0);
      await page.getByRole('heading',{name:'Full framework matrix'}).click();await page.keyboard.press('Escape');
      assert.equal(await page.evaluate(()=>{__overlayOld.controller.open();return __overlayOld.node.dataset.open;}),'false');
      const ready=await page.evaluate(()=>__frameworkBulk.ready);await page.evaluate(()=>__frameworkBulk.show(true));await page.waitForFunction(n=>__frameworkBulk.ready>n,ready);await opened(false);
     }
    });
    await open(variant);await root().evaluate(async n=>{await Promise.allSettled(n.getAnimations({subtree:true}).map(animation=>animation.finished));});await page.screenshot({path:resolve(out,[framework,motion,variant].join('-')+'.png'),fullPage:true});await page.keyboard.press('Escape');await opened(false);
   }catch(error){await page.mouse.up();check.issues.push(error.message);await page.screenshot({path:resolve(out,[framework,motion,variant].join('-')+'-failure.png'),fullPage:true});await choose(variant);}
  }
 }
}finally{await browser.close();await writeFile(resolve(out,'overlays.json'),JSON.stringify(report,null,2)+'\n');}
console.log(JSON.stringify(report));if(report.checks.some(c=>c.issues.length)||report.errors.length||report.external.length)process.exitCode=1;
