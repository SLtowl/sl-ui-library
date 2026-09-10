import assert from 'node:assert/strict';
import {readFile,readdir,stat} from 'node:fs/promises';
import {components,categories} from './public/catalog-data.js';
const root=new URL('./public/',import.meta.url);
assert.equal(components.length,110);
assert.equal(new Set(components.map(c=>c.id)).size,components.length);
for(const category of ['feedback','data-display'])assert.equal(components.filter(c=>c.category===category).length,0);
const variants=components.flatMap(c=>c.variants);
assert.equal(new Set(variants).size,112);
let checked=0;
for(const entry of await readdir(root,{withFileTypes:true})){
 if(!entry.isFile()||! /\.(html|css|js)$/.test(entry.name))continue;
 const text=await readFile(new URL(entry.name,root),'utf8');
 assert.ok(!/C:[\\/](?:Users|Program Files)|BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY|gh[pousr]_[A-Za-z0-9]{30}/.test(text),'Private material in '+entry.name);
}
for(const c of components){
 assert.ok(categories.some(t=>t.id===c.category));
 assert.ok(!/[\p{Script=Cyrillic}\uFFFD]/u.test(c.name+c.description),'Unexpected interface language: '+c.id);
 for(const variant of c.variants){
  const folder=new URL('packages/'+variant+'/',root);
  for(const name of ['index.html','buttons.css','buttons.js','example.js','OFL.txt'])assert.ok((await stat(new URL(name,folder))).size>0);
  for(const entry of await readdir(folder,{withFileTypes:true})){
   if(!entry.isFile()||! /\.(html|css|js)$/.test(entry.name))continue;
   const text=await readFile(new URL(entry.name,folder),'utf8');checked++;
   assert.ok(!/[\p{Script=Cyrillic}\uFFFD]/u.test(text),'Unexpected package text: '+variant+'/'+entry.name);
   assert.ok(!/C:[\\/](?:Users|Program Files)|BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY|gh[pousr]_[A-Za-z0-9]{30}/.test(text),'Private material in '+variant+'/'+entry.name);
   const refs=entry.name.endsWith('.html')?[...text.matchAll(/(?:src|href)=["']([^"']+)["']/g)].map(m=>m[1]):entry.name.endsWith('.css')?[...text.matchAll(/url\(['"]?([^)'"\s]+)['"]?\)/g)].map(m=>m[1]):[...text.matchAll(/^import\s+(?:[^;\n]+?\s+from\s+)?['"]([^'"]+)['"]/gm)].map(m=>m[1]);
   for(const ref of refs){if(/^(?:#|data:|https?:|blob:)/.test(ref))continue;const path=new URL(ref,new URL(entry.name,folder));path.search='';path.hash='';assert.ok(path.href.startsWith(root.href),'Escaped public root');await stat(path);}
  }
  // The exporter uses store-only ZIPs. Compare every archived file with its source.
  const bytes=await readFile(new URL('downloads/matte-'+variant+'.zip',root));let offset=0,entries=0;
  while(bytes.readUInt32LE(offset)===0x04034b50){
   assert.equal(bytes.readUInt16LE(offset+8),0,'Unsupported ZIP method');
   const size=bytes.readUInt32LE(offset+18),length=bytes.readUInt16LE(offset+26),extra=bytes.readUInt16LE(offset+28),start=offset+30;
   const name=bytes.subarray(start,start+length).toString();assert.ok(!name.includes('..')&&!name.includes('/'));
   const dataStart=start+length+extra;assert.deepEqual(bytes.subarray(dataStart,dataStart+size),await readFile(new URL(name,folder)),'Stale ZIP: '+variant+'/'+name);
   offset=dataStart+size;entries++;
  }
  assert.ok(entries>=7,variant+' incomplete ZIP');
 }
}
console.log(`Verified ${components.length} components, ${variants.length} packages and ZIPs, ${checked} source files, local references, English UI and reserved categories.`);
