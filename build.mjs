import {readFile,writeFile,readdir,mkdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {components,categories} from './public/catalog-data.js';
import {zip} from './zip.mjs';
await import('./build-previews.mjs');
await import('./build-views.mjs');
const publicRoot=new URL('./public/',import.meta.url);
const pluginRoot=new URL('./plugins/sl-ui-library/assets/',import.meta.url);
await mkdir(new URL('downloads/',publicRoot),{recursive:true});
await mkdir(pluginRoot,{recursive:true});
const blobs={},packages={};
for(const variant of components.flatMap(c=>c.variants)){
 const files=new Map(),manifest={};
 const folder=new URL(`packages/${variant}/`,publicRoot);
 for(const entry of (await readdir(folder,{withFileTypes:true})).sort((a,b)=>a.name.localeCompare(b.name,'en'))){
  if(!entry.isFile())throw new Error('Packages must contain flat files: '+variant);
  const bytes=await readFile(new URL(entry.name,folder));
  const hash=createHash('sha256').update(bytes).digest('hex');
  manifest[entry.name]=hash;
  blobs[hash]??={encoding:/\.(html|css|js|txt)$/.test(entry.name)?'utf8':'base64',content:bytes.toString(/\.(html|css|js|txt)$/.test(entry.name)?'utf8':'base64')};
  files.set(entry.name,bytes);
 }
 packages[variant]=manifest;
 await writeFile(new URL(`downloads/matte-${variant}.zip`,publicRoot),zip(files));
}
const {version}=JSON.parse(await readFile(new URL('./package.json',import.meta.url),'utf8'));
if(!/^\d+\.\d+\.\d+$/.test(version))throw new Error('Catalog releases require a stable major.minor.patch package version.');
const catalog={schemaVersion:1,version,categories,components:components.map(c=>({...c,files:Object.fromEntries(c.variants.map(v=>[v,Object.keys(packages[v])]))}))};
await writeFile(new URL('catalog.json',pluginRoot),JSON.stringify(catalog,null,2)+'\n');
await writeFile(new URL('source-bundle.json',pluginRoot),JSON.stringify({schemaVersion:1,packages,blobs})+'\n');
console.log(`Built ${components.length} components, ${Object.keys(packages).length} exports and offline plugin data.`);
