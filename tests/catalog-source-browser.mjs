// Manual regression: node tests/catalog-source-browser.mjs <running-site-url>
// Reuse an existing Playwright install via SL_UI_PLAYWRIGHT_MODULE if needed.
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {pathToFileURL} from 'node:url';
import {readZip} from '../public/experiments/library-shell/catalog-zip.mjs';
const runtime=process.env.SL_UI_PLAYWRIGHT_MODULE,{chromium}=await import(runtime?pathToFileURL(runtime).href:'playwright');
const target=process.argv[2];assert(target,'Pass the running site URL');
const browser=await chromium.launch({headless:true,...(process.env.SL_UI_BROWSER_CHANNEL?{channel:process.env.SL_UI_BROWSER_CHANNEL}:{})});
let release;const gate=new Promise(r=>release=r),errors=[];
try{
 const context=await browser.newContext({viewport:{width:1440,height:900}}),page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));
 await page.route('**/downloads/*.zip',async route=>{await gate;await route.continue().catch(()=>{});});
 await page.goto(new URL('#catalog',target).href);await page.locator('#catalog-search').fill('Search input');
 const inspect=page.getByRole('button',{name:'Inspect Search input source',exact:true});await inspect.click();
 await page.locator('#copy-source:not(:disabled)').waitFor({timeout:5000});
 assert(await page.locator('#download-link').isDisabled(),'ZIP is deliberately still blocked');
 assert((await page.locator('#source-code').textContent()).includes('<!doctype html>'));
 release();await page.locator('#download-link:not(:disabled)').waitFor();
 for(const palette of ['white','blue','black']){
  if(palette!=='white')await page.locator(`#detail-palettes [data-palette=${palette}]`).click();
  await page.locator('#download-link:not(:disabled)').waitFor();
  const [download]=await Promise.all([page.waitForEvent('download'),page.locator('#download-link').click()]);
  const files=await readZip(await readFile(await download.path())),decoder=new TextDecoder();
  for(const [label,file] of [['HTML','index.html'],['CSS','buttons.css'],['JavaScript','example.js'],['React','Component.jsx'],['Next.js','NextClient.jsx']]){
   await page.getByRole('tab',{name:label,exact:true}).click();await page.locator('#copy-source:not(:disabled)').waitFor();
   assert.equal(await page.locator('#source-code').textContent(),decoder.decode(files.get(file)),`${palette}/${file} must equal the ZIP`);
  }
 }
 await page.keyboard.press('Escape');let reopenRequests=0;page.on('request',()=>reopenRequests++);
 await inspect.click();await page.locator('#copy-source:not(:disabled)').waitFor();assert.equal(await page.locator('#download-link').isDisabled(),false);assert.equal(reopenRequests,0,'Completed last-component package survives closing');await page.keyboard.press('Escape');
 await page.unroute('**/downloads/*.zip');await page.route('**/downloads/*.zip',r=>r.fulfill({status:503,body:'Test archive failure'}));
 await page.locator('#catalog-search').fill('Text input');await page.getByRole('button',{name:'Inspect Text input source',exact:true}).click();await page.locator('#copy-source:not(:disabled)').waitFor();await page.waitForFunction(()=>document.querySelector('#source-status').textContent.includes('Download unavailable'));assert.equal(await page.locator('#copy-source').isDisabled(),false);
 await page.locator('#detail-palettes [data-palette=blue]').click();await page.getByRole('tab',{name:'CSS',exact:true}).click();await page.getByRole('tab',{name:'React',exact:true}).click();await page.locator('#copy-source:not(:disabled)').waitFor();assert.equal(await page.locator('#source-filename').textContent(),'Component.jsx');
 await page.keyboard.press('Escape');await page.getByRole('button',{name:'Inspect Text input source',exact:true}).click();await page.locator('#copy-source:not(:disabled)').waitFor();assert.equal(await page.locator('#source-filename').textContent(),'index.html');
 assert.deepEqual(errors,[]);console.log(JSON.stringify({passed:true,checks:['source before ZIP','five tabs equal ZIP in three palettes','bounded reopen cache','archive failure preserves source','rapid palette/tab changes and close/reopen'],errors}));
}finally{release();await browser.close();}
