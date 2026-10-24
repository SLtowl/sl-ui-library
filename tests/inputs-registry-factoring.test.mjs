import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {pathToFileURL} from 'node:url';
import {factorInputsAccountRegistry} from '../release-tools/compositions/inputs-review.mjs';
import {pruneRegistry} from '../release-tools/compositions/core.mjs';
import {paletteJavaScript} from '../public/experiments/library-shell/palette-javascript.mjs';

const keys=['pair','text-input','textarea-input','password-input','code-input'];
const entry={category:'inputs',key:'profile',variants:['inputs-account-core-profile-v11']};
const widthRule='.sl-field.sl-field--code { width: min(300px, 100%); }\n';
const specific='.sl-field { color: #fafafa; background: #222222; }\n';
const shared=specific+widthRule;

function fixture(base=shared,code=specific,reversed=false){
 const declarations=[`const style7 = ${JSON.stringify(base)};`,`const style19 = ${JSON.stringify(code)};`];
 if(reversed)declarations.reverse();
 return declarations.join('\n')+'\nconst api2 = {};\nexport const previews={\n'+keys.map(key=>JSON.stringify(key)+': {markup:"", css: '+(key==='code-input'?'style19':'style7')+', mount: api2.mount}').join(',\n')+'\n};';
}

// Execute only stylesheet declarations and dictionary data. Controller bodies
// are excluded and mount functions are inert stubs, so no DOM API is required.
function resolvedCss(source){
 const styles=source.split('\n').filter(line=>/^const style\d+ = /.test(line)).join('\n');
 const names=[...new Set([...source.matchAll(/\bmount:\s*(api\d+)\.mount/g)].map(match=>match[1]))];
 const stubs=names.map(name=>'const '+name+' = {mount(){}};').join('\n');
 const start=source.indexOf('export const previews={');
 if(start===-1)throw new Error('Known pruned dictionary grammar is required.');
 const dictionary=source.slice(start).replace('export const previews=','return ');
 const values=new Function(styles+'\n'+stubs+'\n'+dictionary)();
 return Object.fromEntries(Object.entries(values).map(([key,value])=>[key,value.css]));
}

test('account factoring preserves all five stylesheet values and removes duplicate storage',()=>{
 const source=fixture(),factored=factorInputsAccountRegistry(source,entry);
 assert.deepEqual(resolvedCss(factored),resolvedCss(source));
 assert.equal(factored.split(JSON.stringify(specific)).length-1,0);
 assert.equal(resolvedCss(factored)['code-input'].includes(widthRule),false);
 assert.equal(resolvedCss(factored)['text-input'].includes(widthRule),true);
});

test('factoring is a no-op outside owned Inputs accounts and for an existing shared binding',()=>{
 const source=fixture();
 for(const candidate of [undefined,{...entry,category:'buttons'},{...entry,key:'contact'},{...entry,variants:['buttons-account-core-profile-v11']}]){
  assert.equal(factorInputsAccountRegistry(source,candidate),source);
 }
 const alreadyShared=source.replace('css: style19','css: style7');
 assert.equal(factorInputsAccountRegistry(alreadyShared,entry),alreadyShared);
});

test('unsupported declarations, changed CSS relations and dependency order fail closed',()=>{
 const source=fixture();
 const malformed=[
  source.replace(/^"code-input":.*$/m,''),
  source.replace(/^const style7 = .*$/m,'const style7 = null;'),
  fixture(specific,specific),
  fixture(shared+widthRule,specific+widthRule),
  fixture(shared,specific+'.unrelated { color: red; }\n'),
  fixture(shared,specific,true),
 ];
 for(const candidate of malformed)assert.throws(()=>factorInputsAccountRegistry(candidate,entry));
});

const actual=pruneRegistry(await readFile(new URL('../public/preview-data.js',import.meta.url),'utf8'));
const actualFactored=factorInputsAccountRegistry(actual,entry);
test('the current generated registry resolves exactly without retaining its near-duplicate sheet',()=>{
 assert.deepEqual(Object.keys(resolvedCss(actualFactored)),keys);
 assert.deepEqual(resolvedCss(actualFactored),resolvedCss(actual));
 assert.ok(Buffer.byteLength(actual)-Buffer.byteLength(actualFactored)>15000);
});

let chromium;
try{
 const loaded=process.env.SL_UI_PLAYWRIGHT_MODULE
  ?await import(pathToFileURL(process.env.SL_UI_PLAYWRIGHT_MODULE).href)
  :await import('playwright');
 chromium=loaded.chromium??loaded.default?.chromium;
}catch{}

test('actual JavaScript palette exports retain all five resolved CSS values in white, black and blue',{
 skip:!chromium&&'Provide SL_UI_PLAYWRIGHT_MODULE for native browser stylesheet parsing.',
 timeout:60000,
},async()=>{
 const browser=await chromium.launch({headless:true,...(process.env.SL_UI_BROWSER_CHANNEL?{channel:process.env.SL_UI_BROWSER_CHANNEL}:{})});
 try{
  const page=await browser.newPage();
  const paletteSource=await readFile(new URL('../public/experiments/library-shell/catalog-palettes.mjs',import.meta.url),'utf8');
  await page.evaluate(({actual,factored,paletteSource,converterSource,resolverSource})=>{
   const paletteCss=new Function(paletteSource.replace(/^import .*$/gm,'').replaceAll('export function','function')+';return paletteCss;')();
   const convert=new Function('return ('+converterSource+');')();
   const resolve=new Function('return ('+resolverSource+');')();
   for(const palette of ['white','black','blue']){
    const expected=resolve(convert(actual,css=>paletteCss(css,palette)));
    const received=resolve(convert(factored,css=>paletteCss(css,palette)));
    if(JSON.stringify(received)!==JSON.stringify(expected))throw Error('Resolved '+palette+' CSS differs after factoring.');
   }
  },{actual,factored:actualFactored,paletteSource,converterSource:paletteJavaScript.toString(),resolverSource:resolvedCss.toString()});
 }finally{await browser.close();}
});
