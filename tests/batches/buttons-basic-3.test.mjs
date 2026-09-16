import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFile,readdir} from 'node:fs/promises';
import {createServer} from 'node:http';
import {once} from 'node:events';
import {pathToFileURL} from 'node:url';
import {Script} from 'node:vm';
import batch from '../../public/catalog-batches/buttons-basic-3.js';

const project=new URL('../../',import.meta.url);
const files=['index.html','buttons.css','buttons.js','example.js','instrument-sans-variable.woff2','OFL.txt','LICENSE'];
const variants=batch.map(item=>item.variants[0]);
const read=(variant,file)=>readFile(new URL(`public/packages/${variant}/${file}`,project),'utf8');

test('third basic buttons review batch has ten distinct, complete and offline packages',async()=>{
  assert.equal(batch.length,10);
  assert.equal(new Set(batch.map(item=>item.id)).size,10);
  assert.equal(new Set(variants).size,10);
  const released=await readFile(new URL('public/catalog-data.js',project),'utf8');
  assert.doesNotMatch(released,/buttons-basic-3/);
  for(const item of batch){
    const variant=item.variants[0];
    assert.equal(item.category,'buttons');
    assert.match(variant,/^buttons-[a-z-]+-v11$/);
    assert.equal(item.downloads[variant],`./downloads/matte-${variant}.zip`);
    assert.equal(item.usage.length,3);
    assert.deepEqual((await readdir(new URL(`public/packages/${variant}/`,project))).sort(),[...files].sort());
    const [html,css,js,example]=await Promise.all(['index.html','buttons.css','buttons.js','example.js'].map(file=>read(variant,file)));
    assert.match(html,/<html lang="en">/);
    assert.equal((html.match(/class="sl-component"/g)||[]).length,1);
    assert.match(html,/class="sample-window" data-preview/);
    assert.match(html,/data-action aria-label="[^"]+"/);
    assert.match(html,/data-action aria-label="[^"]+" title="[^"]+"/);
    if(variant==='buttons-crop-mode-v11')assert.match(html,/data-layout="expanded"/);
    else{
      assert.match(html,/data-layout="compact"/);
      assert.match(html,/class="tool-row" role="toolbar"/);
    }
    assert.doesNotMatch(html.split('<body>')[1],/<script/);
    assert.match(css,/@font-face/);
    assert.match(css,/prefers-reduced-motion/);
    assert.match(css,/forced-colors/);
    assert.match(css,/:focus-visible/);
    assert.match(css,/--action-surface/);
    assert.doesNotMatch(css,/(?:^|\n)\s*(?:button|input|svg|:root|\*)\s*\{/);
    assert.doesNotMatch(js,/innerHTML|insertAdjacentHTML|document\.activeElement|fetch\(|XMLHttpRequest|localStorage/);
    assert.match(js,/root\.getRootNode\(\)\.activeElement/);
    assert.match(js,/window\.SLComponent = \{ mount, mountPreview \}/);
    assert.match(js,/reset\(\)/);
    assert.match(js,/destroy\(\)/);
    assert.match(example,/SLComponent\.mountPreview/);
    assert.doesNotMatch(html+css+js+example,/https?:\/\//);
    new Script(js,{filename:`${variant}/buttons.js`});
    new Script(example,{filename:`${variant}/example.js`});
  }
});

let chromium;
try{
  ({chromium}=process.env.SL_UI_PLAYWRIGHT_MODULE
    ? await import(pathToFileURL(process.env.SL_UI_PLAYWRIGHT_MODULE).href)
    : await import('playwright'));
}catch(error){if(process.env.SL_UI_PLAYWRIGHT_MODULE)throw error;}

test('real browser: editor actions, reversible motion, lifecycle and 226px fit',{skip:!chromium&&'Provide SL_UI_PLAYWRIGHT_MODULE to run browser behavior checks.',timeout:120000},async t=>{
  const server=createServer(async(request,response)=>{
    const pathname=new URL(request.url,'http://localhost').pathname;
    const match=pathname.match(/^\/packages\/(buttons-[a-z-]+-v11)\/([a-zA-Z0-9.-]+)$/);
    if(!match||!variants.includes(match[1])||!files.includes(match[2])){response.writeHead(404).end();return;}
    const body=await readFile(new URL(`public/packages/${match[1]}/${match[2]}`,project));
    const extension=match[2].split('.').at(-1);
    const mime={html:'text/html',css:'text/css',js:'text/javascript',woff2:'font/woff2'}[extension]||'text/plain';
    response.writeHead(200,{'Content-Type':mime+(mime.startsWith('text/')?'; charset=utf-8':'')}).end(body);
  });
  server.listen(0,'127.0.0.1');await once(server,'listening');
  const origin=`http://127.0.0.1:${server.address().port}`;
  const browser=await chromium.launch({headless:true,...(process.env.SL_UI_BROWSER_CHANNEL?{channel:process.env.SL_UI_BROWSER_CHANNEL}:{})});
  const context=await browser.newContext({viewport:{width:768,height:520}});
  const page=await context.newPage();
  const errors=[],external=[];
  page.on('pageerror',error=>errors.push(error.message));
  page.on('request',request=>{if(!request.url().startsWith(origin)&&!request.url().startsWith('data:'))external.push(request.url());});
  const load=async slug=>{
    await page.goto(`${origin}/packages/buttons-${slug}-v11/index.html`);
    await page.evaluate(()=>{window.control=SLComponent.mountPreview(document.querySelector('.sl-component'));});
  };
  const state=()=>page.evaluate(()=>window.control.state);
  try{
    await t.test('every action updates the actual local sample and returns to its first state',async()=>{
      const cases=[
        ['text-bold',2,()=>getComputedStyle(document.querySelector('.sample-copy')).fontWeight],
        ['text-italic',2,()=>getComputedStyle(document.querySelector('.sample-copy')).transform],
        ['text-case',3,()=>getComputedStyle(document.querySelector('.sample-copy')).textTransform],
        ['text-strike',2,()=>getComputedStyle(document.querySelector('.sample-task'),'::after').transform],
        ['text-align',3,()=>getComputedStyle(document.querySelector('.sample-lines')).alignItems],
        ['list-style',3,()=>getComputedStyle(document.querySelector('.sample-list b'),'::before').content],
        ['indent-level',4,()=>getComputedStyle(document.querySelector('.sample-indent i')).transform],
        ['rotate-item',4,()=>getComputedStyle(document.querySelector('.sample-picture')).transform],
        ['mirror-item',2,()=>getComputedStyle(document.querySelector('.sample-picture')).transform],
        ['crop-mode',2,()=>getComputedStyle(document.querySelector('.sample-crop i')).opacity],
      ];
      for(const [slug,count,readSample] of cases){
        await load(slug);
        const initial=await page.evaluate(readSample);
        const seen=new Set([initial]);
        await page.locator('[data-action]').focus();
        for(let index=1;index<count;index++){
          await page.keyboard.press(index%2?'Enter':'Space');
          assert.equal((await state()).index,index,slug);
          await page.waitForTimeout(380);
          seen.add(await page.evaluate(readSample));
        }
        assert.equal(seen.size,count,`${slug}: sample states`);
        await page.keyboard.press('Enter');
        assert.equal((await state()).index,0,`${slug}: reversed`);
        assert.equal(await page.evaluate(()=>document.activeElement===document.querySelector('[data-action]')),true,`${slug}: focus`);
      }
    });

    await t.test('silent setters, remount cleanup and one user event stay exact',async()=>{
      await load('text-align');
      const result=await page.evaluate(()=>{
        const root=document.querySelector('.sl-component');let changes=0,events=0;
        root.addEventListener('sl:action',()=>{events++;});
        const old=SLComponent.mount(root,{onChange:()=>{changes++;}});
        const current=SLComponent.mount(root,{onChange:()=>{changes++;}});
        const stale=old.cycle();
        const silent=current.setAlignment('right');
        const afterSilent={changes,events,state:current.state};
        current.cycle();
        const afterUser={changes,events,state:current.state};
        current.reset();current.reset();current.destroy();current.destroy();
        return{stale,silent,afterSilent,afterUser,final:current.state};
      });
      assert.equal(result.stale,false);
      assert.equal(result.silent,true);
      assert.deepEqual(result.afterSilent,{changes:0,events:0,state:{alignment:'right',index:2}});
      assert.deepEqual(result.afterUser,{changes:1,events:1,state:{alignment:'left',index:0}});
      assert.deepEqual(result.final,{alignment:'left',index:0});
    });

    await t.test('nine editor actions stay compact while Crop keeps its centered action label at 226px',async()=>{
      await page.setViewportSize({width:226,height:226});
      for(const variant of variants){
        const slug=variant.replace(/^buttons-/,'').replace(/-v11$/,'');
        await load(slug);
        const fit=await page.evaluate(()=>{
          document.body.style.padding='0';
          const root=document.querySelector('.sl-component').getBoundingClientRect();
          const button=document.querySelector('[data-action]').getBoundingClientRect();
          const label=document.querySelector('[data-label]').getBoundingClientRect();
          const icon=document.querySelector('.button-icon').getBoundingClientRect();
          return{layout:document.querySelector('.sl-component').dataset.layout,left:root.left,right:root.right,top:root.top,bottom:root.bottom,buttonWidth:button.width,labelWidth:label.width,labelDelta:Math.abs(button.x+button.width/2-(label.x+label.width/2)),iconDelta:Math.abs(button.x+button.width/2-(icon.x+icon.width/2))};
        });
        assert.ok(fit.left>=-0.5&&fit.right<=226.5&&fit.top>=-0.5&&fit.bottom<=226.5,variant);
        if(variant==='buttons-crop-mode-v11'){
          assert.equal(fit.layout,'expanded');
          assert.ok(fit.labelDelta<0.25,`${variant}: centered label`);
        }else{
          assert.equal(fit.layout,'compact');
          assert.ok(fit.buttonWidth<=36.5,`${variant}: compact width`);
          assert.ok(fit.labelWidth<=1.5,`${variant}: hidden visual label`);
          assert.ok(fit.iconDelta<0.25,`${variant}: centered icon`);
        }
      }
    });

    await t.test('reduced motion removes transitions without removing the state change',async()=>{
      await page.emulateMedia({reducedMotion:'reduce'});await load('rotate-item');
      await page.locator('[data-action]').click();
      assert.equal((await state()).rotation,'90');
      assert.equal(await page.locator('.sample-picture').evaluate(node=>getComputedStyle(node).transitionDuration),'0s');
    });
    assert.deepEqual(errors,[]);assert.deepEqual(external,[]);
  }finally{await context.close();await browser.close();server.close();await once(server,'close');}
});
