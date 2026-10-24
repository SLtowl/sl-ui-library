import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdir,mkdtemp,readFile,writeFile,rm,realpath} from 'node:fs/promises';
import {join,resolve,sep} from 'node:path';
import {pathToFileURL} from 'node:url';
import {tmpdir} from 'node:os';
import {components} from '../public/catalog-data.js';
import {compileController} from '../frameworks/controller-source.mjs';

test('all catalog legacy overlay adapters retain source and recognize composed internal events',async()=>{
 const variants=components.flatMap(component=>component.variants).filter(variant=>variant.endsWith('-overlay'));
 assert.equal(variants.length,10);
 for(const variant of variants){
  const source=await compileController(new URL('../public/packages/'+variant+'/',import.meta.url),variant);
  assert.ok(source.includes('opened&&!e.composedPath().includes(panel)&&!e.composedPath().includes(trigger)'),variant);
  assert.ok(!source.includes('opened&&!panel.contains(e.target)&&!trigger.contains(e.target)'),variant);
  assert.ok(source.includes("panel.addEventListener('cancel'"),variant+' retains native modal Escape');
  if(variant==='popover-overlay'){
   const css=JSON.parse(source.match(/const sourceCSS=(.*);\n/)[1]);
   const packageRoot=new URL('../public/packages/popover-overlay/',import.meta.url),overlayCSS=await readFile(new URL('buttons.css',packageRoot),'utf8'),html=await readFile(new URL('index.html',packageRoot),'utf8');
   assert.deepEqual(html.match(/<link\b[^>]*\brel=["']stylesheet["'][^>]*>/g),['<link rel="stylesheet" href="./buttons.css">'],'native Popover is self-contained');
   assert.equal(css,overlayCSS,'preserve exact self-contained source CSS');
   assert.ok(css.includes('.popover-pin .sl-check__input{position:absolute;width:1px;height:1px;margin:0;opacity:0}'),'include the scoped native input geometry');
  }
 }
});

test('overlay extraction rejects changed outside-pointer or stylesheet grammar',async()=>{
 const scratch=resolve(process.env.SL_UI_FRAMEWORK_TEST_ROOT||tmpdir(),'sl-ui-overlay-scratch');await mkdir(scratch,{recursive:true});const target=await mkdtemp(join(scratch,'overlay-grammar-'));
 try{
  const packageRoot=pathToFileURL(target+'/'),original=new URL('../public/packages/popover-overlay/',import.meta.url),html=await readFile(new URL('index.html',original),'utf8'),overlay=await readFile(new URL('overlays.js',original),'utf8');
  await writeFile(join(target,'buttons.css'),'/* fixture */');
  for(const altered of [
   html.replace('./buttons.css','https://example.invalid/unapproved.css'),
   html.replace('./buttons.css','../pin-checkbox/buttons.css'),
   html.replace('./buttons.css','./altered.css'),
   html.replace('<link rel="stylesheet" href="./buttons.css">',''),
   html.replace('<link rel="stylesheet" href="./buttons.css">','<link rel="stylesheet" href="../../packages/pin-checkbox/buttons.css"><link rel="stylesheet" href="./buttons.css">'),
   html.replace('</head>','<link rel="stylesheet" href="./extra.css"></head>')
  ]){await writeFile(join(target,'index.html'),altered);await assert.rejects(compileController(packageRoot,'popover-overlay'),/Unrecognized overlay stylesheet dependencies/);}
  // A non-popover fixture exercises the pointer guard before optional pin source reads.
  await writeFile(join(target,'index.html'),html);
  await writeFile(join(target,'overlays.js'),overlay.replace('opened&&!panel.contains(e.target)&&!trigger.contains(e.target)','opened&&!root.contains(e.target)'));
  await assert.rejects(compileController(packageRoot,'quickedit-overlay'),/Unrecognized overlay outside-pointer guard/);
  await writeFile(join(target,'overlays.js'),overlay+'\n// opened&&!panel.contains(e.target)&&!trigger.contains(e.target)');
  await assert.rejects(compileController(packageRoot,'quickedit-overlay'),/Unrecognized overlay outside-pointer guard/);
 }finally{const actual=await realpath(target),allowed=(await realpath(scratch))+sep;if(!actual.startsWith(allowed))throw new Error('Refusing cleanup outside overlay scratch');await rm(actual,{recursive:true,force:true});}
});
