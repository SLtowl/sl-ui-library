// Manual layout regression: node tests/hero-layout-browser.mjs <site-url>
// Reuses an existing Playwright install; optionally SL_UI_PLAYWRIGHT_MODULE.
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
import {resolve} from 'node:path';
const runtime=process.env.SL_UI_PLAYWRIGHT_MODULE,{chromium}=await import(runtime?pathToFileURL(runtime).href:'playwright');
const target=new URL(process.argv[2]);target.hash='';
const browser=await chromium.launch({headless:true,...(process.env.SL_UI_BROWSER_CHANNEL?{channel:process.env.SL_UI_BROWSER_CHANNEL}:{})});
const checks=[],errors=[];
try{
 const page=await browser.newPage({viewport:{width:1536,height:864},deviceScaleFactor:1});page.on('pageerror',e=>errors.push(e.message));
 await page.goto(target.href);await page.evaluate(()=>document.fonts.ready);
 for(const [width,height] of [[320,650],[390,844],[768,900],[1024,900],[1440,900],[1536,864],[1920,1080]]){
  await page.setViewportSize({width,height});await page.mouse.move(0,0);
  const box=await page.evaluate(()=>{
   const scene=document.querySelector('#intro').getBoundingClientRect(),heading=document.querySelector('#intro-title').getBoundingClientRect(),button=document.querySelector('#explore').getBoundingClientRect(),style=getComputedStyle(document.querySelector('#explore'));
   return{centerX:(Math.min(heading.left,button.left)+Math.max(heading.right,button.right))/2,centerY:(Math.min(heading.top,button.top)+Math.max(heading.bottom,button.bottom))/2,expectedX:(scene.left+scene.right)/2,expectedY:(scene.top+scene.bottom)/2,width:style.width,height:style.height,fontSize:style.fontSize,gap:button.top-heading.bottom,overflow:document.documentElement.scrollWidth>innerWidth};
  });
  assert(Math.abs(box.centerX-box.expectedX)<1,`${width}: horizontal group center`);assert(Math.abs(box.centerY-box.expectedY)<1,`${width}: vertical group center`);
  assert.equal(box.width,'222px');assert.equal(box.height,'62px');assert.equal(box.fontSize,'23px');assert(!box.overflow,`${width}: no horizontal overflow`);checks.push({viewport:{width,height},...box});
  if(width===1536&&process.env.SL_UI_QA_DIR)await page.screenshot({path:resolve(process.env.SL_UI_QA_DIR,'hero-production.png'),scale:'css'});
 }
 await page.setViewportSize({width:1536,height:864});
 await page.locator('#explore').hover();await page.waitForFunction(()=>Math.abs(document.querySelector('#explore').getBoundingClientRect().width-222*1.07)<.1);
 await page.mouse.move(0,0);await page.waitForFunction(()=>Math.abs(document.querySelector('#explore').getBoundingClientRect().width-222)<.1);
 await page.keyboard.press('Tab');assert(await page.locator('#explore').evaluate(el=>el===document.activeElement));
 await page.keyboard.press('Enter');await page.waitForFunction(()=>document.body.dataset.journey==='catalog');assert.equal(await page.locator('.component-card').count(),12);
 await page.locator('#home').click();await page.waitForFunction(()=>document.body.dataset.journey==='hero');
 for(const key of ['Escape','PageDown']){
  await page.locator('#explore').click();await page.waitForFunction(()=>document.body.dataset.journey==='moving');await page.keyboard.press(key);await page.waitForFunction(state=>document.body.dataset.journey===state,key==='Escape'?'hero':'catalog');
  if(key==='PageDown'){await page.locator('#home').click();await page.waitForFunction(()=>document.body.dataset.journey==='hero');}
 }
 await page.emulateMedia({reducedMotion:'reduce'});await page.locator('#explore').click();await page.waitForFunction(()=>document.body.dataset.journey==='catalog');await page.locator('#home').click();await page.waitForFunction(()=>document.body.dataset.journey==='hero');assert.deepEqual(errors,[]);
 console.log(JSON.stringify({passed:true,checks,interaction:['unchanged hover scale','keyboard activation','forward/reverse','Escape','PageDown','reduced motion'],errors}));
}finally{await browser.close();}
