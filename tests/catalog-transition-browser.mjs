// Manual browser regression: node tests/catalog-transition-browser.mjs <site-url>
// Uses an existing Playwright install, optionally SL_UI_PLAYWRIGHT_MODULE.
// No dependencies are installed and the target website is never modified.
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
const runtime=process.env.SL_UI_PLAYWRIGHT_MODULE;
const {chromium}=await import(runtime?pathToFileURL(runtime).href:'playwright');
const target=process.argv[2];
assert(target,'Pass the running site URL');
const browser=await chromium.launch({headless:true,...(process.env.SL_UI_BROWSER_CHANNEL?{channel:process.env.SL_UI_BROWSER_CHANNEL}:{})});
try{
 const context=await browser.newContext({viewport:{width:1440,height:900}}),page=await context.newPage(),errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 await page.addInitScript(()=>{
  window.__transitionProbe={frames:[],last:0,active:false};
  function sample(t){const p=window.__transitionProbe;if(p.active){if(p.last)p.frames.push({dt:t-p.last,state:document.body?.dataset.journey});p.last=t;}else p.last=0;requestAnimationFrame(sample);}requestAnimationFrame(sample);
 });
 await page.goto(target,{waitUntil:'load'});
 const results=[];
 for(const label of ['cold-first','repeat']){
  await page.locator('#explore').waitFor();
  await page.evaluate(()=>{window.__transitionProbe.frames=[];window.__transitionProbe.active=true;});
  await page.locator('#explore').click();
  await page.waitForFunction(()=>document.body.dataset.journey==='catalog');
  const sample=await page.evaluate(()=>{const p=window.__transitionProbe;p.active=false;const moving=p.frames.filter(f=>f.state==='moving').map(f=>f.dt).sort((a,b)=>a-b);return{frames:moving.length,maxGap:Math.max(0,...moving),p95:moving[Math.floor(moving.length*.95)]};});
  assert(sample.frames>10,'Animated transition was exercised, not bypassed');
  assert(sample.maxGap<Number(process.env.SL_UI_FRAME_BUDGET_MS||100),`${label}: ${sample.maxGap.toFixed(1)} ms moving-state frame gap`);
  assert.equal(await page.locator('.component-card').count(),12);
  results.push({label,...sample});
  await page.locator('#home').click();await page.waitForFunction(()=>document.body.dataset.journey==='hero');
 }
 await page.locator('#explore').click();await page.waitForFunction(()=>document.body.dataset.journey==='moving');await page.keyboard.press('Escape');await page.waitForFunction(()=>document.body.dataset.journey==='hero');
 await page.locator('#explore').click();await page.waitForFunction(()=>document.body.dataset.journey==='moving');await page.setViewportSize({width:1280,height:800});await page.waitForFunction(()=>document.body.dataset.journey==='catalog');
 await page.emulateMedia({reducedMotion:'reduce'});await page.locator('#home').click();await page.waitForFunction(()=>document.body.dataset.journey==='hero');await page.locator('#explore').click();await page.waitForFunction(()=>document.body.dataset.journey==='catalog');
 assert.deepEqual(errors,[]);
 console.log(JSON.stringify({results,checks:['cold first','repeat','reverse','Escape','resize','reduced motion'],errors}));
}finally{await browser.close();}
