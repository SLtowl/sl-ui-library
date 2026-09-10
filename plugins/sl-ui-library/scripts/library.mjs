import {readFile,lstat,mkdir,writeFile} from 'node:fs/promises';
import {resolve,dirname,basename,parse,join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
import {selectData,updateSettings} from './updates.mjs';

const fail=message=>{throw new Error(message);};
const safeFile=name=>/^[a-zA-Z0-9][a-zA-Z0-9._-]*$/.test(name)&&!name.includes('..');
const own=(object,key)=>Object.hasOwn(object,key);
export async function run(args){
 const [command,...rest]=args;
 if(!command||command==='help')return {userWorkflow:'Install the plugin once, then describe your interface to the agent.',commands:['list [category]','search <query>','inspect <component-id>','palette <variant>','read <variant> <filename>','install <variant> <new-directory> [--palette <mapping.json>]','updates enable|disable|status'],network:'Offline by default; data updates require explicit opt-in and a published channel.',overwrites:false};
 if(command==='updates'){if(rest.length!==1)fail('Usage: updates enable|disable|status');return updateSettings(rest[0]);}
 const data=await selectData();
 const catalog=data.catalog;
 if(catalog.schemaVersion!==1)fail('Unsupported catalog schema');
 if(command==='list'){
  if(rest.length>1)fail('Usage: list [category]');
  if(rest[0]&&!catalog.categories.some(c=>c.id===rest[0]))fail('Unknown category');
  return {categories:catalog.categories.map(c=>({...c,count:catalog.components.filter(v=>v.category===c.id).length})),components:catalog.components.filter(c=>!rest[0]||c.category===rest[0]).map(({id,name,category,description,variants})=>({id,name,category,description,variants}))};
 }
 if(command==='search'){
  const terms=rest.join(' ').trim().toLowerCase().split(/\s+/).filter(Boolean);
  if(!terms.length)fail('Usage: search <query>');
  const results=catalog.components.map(c=>{const category=catalog.categories.find(v=>v.id===c.category);return {c,text:[c.id,c.name,c.description,c.category,...c.keywords,...c.motions,category.label,category.description,...category.keywords].join(' ').toLowerCase()};}).filter(({text})=>terms.every(t=>text.includes(t))).map(({c})=>({id:c.id,name:c.name,category:c.category,description:c.description,variants:c.variants}));
  return {query:rest.join(' '),count:results.length,components:results};
 }
 if(command==='inspect'){
  if(rest.length!==1)fail('Usage: inspect <component-id>');
  return catalog.components.find(c=>c.id===rest[0])??fail('Unknown component ID');
 }
 if(!['read','install','palette'].includes(command))fail('Unknown command. Run help.');
 if(command==='palette'?rest.length!==1:!(rest.length===2||(command==='install'&&rest.length===4&&rest[2]==='--palette')))fail(`Usage: ${command} <variant> <${command==='read'?'filename':'new-directory'}>`);
 const [variant,target]=rest;
 if(!catalog.components.some(c=>c.variants.includes(variant)))fail('Unknown variant');
 const bundle=data.bundle;
 if(bundle.schemaVersion!==1||!own(bundle.packages,variant))fail('Invalid source bundle');
 const manifest=bundle.packages[variant];
 function bytes(name){
  if(!safeFile(name)||!own(manifest,name))fail('Unknown or unsafe file');
  const hash=manifest[name],blob=bundle.blobs[hash];
  if(!blob||!['utf8','base64'].includes(blob.encoding))fail('Invalid source encoding');
  const content=Buffer.from(blob.content,blob.encoding);
  if(createHash('sha256').update(content).digest('hex')!==hash)fail('Source integrity check failed');
  return {content,encoding:blob.encoding};
 }
 const colorPattern=/#(?:[a-f0-9]{8}|[a-f0-9]{6}|[a-f0-9]{4}|[a-f0-9]{3})(?![a-f0-9\w-])/gi;
 if(command==='palette'){
  const colors=new Map();
  for(const name of Object.keys(manifest).filter(name=>/\.(css|html|js)$/.test(name)))for(const match of bytes(name).content.toString('utf8').matchAll(colorPattern)){
   const key=match[0].toLowerCase();colors.set(key,[...new Set([...(colors.get(key)??[]),name])]);
  }
  return {variant,colors:[...colors].map(([color,files])=>({color,files})),instructions:'Map only requested palette colors. Keep semantic states, visible focus, icon contrast and alpha. Verify rendered contrast after integration.'};
 }
 if(command==='read'){
  const file=bytes(target);
  return {variant,file:target,encoding:file.encoding,sha256:manifest[target],content:file.content.toString(file.encoding)};
 }
 // Validate all data before touching the destination. Install only to a new leaf.
 const entries=Object.keys(manifest).map(name=>({name,...bytes(name)}));
 let palette;
 if(rest[2]==='--palette'){
  palette=JSON.parse(await readFile(rest[3],'utf8'));
  if(!palette||Array.isArray(palette)||typeof palette!=='object'||!Object.keys(palette).length)fail('Palette must be a nonempty object mapping hex colors to hex colors');
  const normalized={};
  for(const [from,to] of Object.entries(palette)){
   if(!/^#(?:[a-f0-9]{3}|[a-f0-9]{4}|[a-f0-9]{6}|[a-f0-9]{8})$/i.test(from)||typeof to!=='string'||!/^#(?:[a-f0-9]{3}|[a-f0-9]{4}|[a-f0-9]{6}|[a-f0-9]{8})$/i.test(to))fail('Palette accepts hex colors only');
   normalized[from.toLowerCase()]=to;
  }
  const used=new Set();
  for(const entry of entries.filter(e=>/\.(css|html|js)$/.test(e.name))){
   entry.content=Buffer.from(entry.content.toString('utf8').replace(colorPattern,value=>{const key=value.toLowerCase();if(own(normalized,key)){used.add(key);return normalized[key];}return value;}));
  }
  if(Object.keys(normalized).some(key=>!used.has(key)))fail('A mapped color does not exist in this component; inspect palette first');
 }
 const destination=resolve(target),parent=dirname(destination),leaf=basename(destination);
 if(destination===parse(destination).root||leaf.startsWith('.')||/[<>:"|?*\x00-\x1f]/.test(leaf)||/[. ]$/.test(leaf)||/^(?:con|prn|aux|nul|com[1-9]|lpt[1-9])(?:\.|$)/i.test(leaf))fail('Unsafe destination');
 for(let path=parent;;path=dirname(path)){
  const info=await lstat(path);
  if(info.isSymbolicLink()||!info.isDirectory())fail('Parent must be an existing directory without symlinks');
  if(dirname(path)===path)break;
 }
 await mkdir(destination); // Exclusive: EEXIST is an error, even for an empty directory.
 for(const entry of entries)await writeFile(join(destination,entry.name),entry.content,{flag:'wx'});
 return {installed:true,variant,destination,files:entries.map(e=>e.name),paletteApplied:Boolean(palette),next:'Serve the folder over HTTP. Read example.js and Usage notes before connecting real actions. Verify contrast after palette changes.'};
}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 try{console.log(JSON.stringify(await run(process.argv.slice(2)),null,2));}
 catch(error){console.error(JSON.stringify({error:error.code==='EEXIST'?'Destination already exists; nothing was overwritten.':error.message}));process.exitCode=1;}
}
