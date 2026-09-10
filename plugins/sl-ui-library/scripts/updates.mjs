import {readFile,writeFile,mkdir,lstat,rename} from 'node:fs/promises';
import {join,dirname} from 'node:path';
import {homedir} from 'node:os';
import {createHash,randomUUID} from 'node:crypto';
const assets=new URL('../assets/',import.meta.url);
const defaultCache=join(homedir(),'.cache','sl-ui-library');
const hash=bytes=>createHash('sha256').update(bytes).digest('hex');
const compareVersions=(a,b)=>{const x=a.split('.').map(Number),y=b.split('.').map(Number);for(let i=0;i<3;i++)if(x[i]!==y[i])return x[i]-y[i];return 0;};
export function validateData(catalog,bundle){
 if(catalog.schemaVersion!==1||bundle.schemaVersion!==1||!Array.isArray(catalog.components)||!Array.isArray(catalog.categories)||!bundle.packages||!bundle.blobs)throw new Error('Unsupported update data');
 if(!catalog.components.length||catalog.components.length>10000||!/^\d+\.\d+\.\d+$/.test(catalog.version??''))throw new Error('Invalid catalog version or component count');
 for(const category of catalog.categories)if(typeof category.id!=='string'||typeof category.label!=='string'||typeof category.description!=='string'||!Array.isArray(category.keywords))throw new Error('Invalid category');
 for(const c of catalog.components){
  if(typeof c.id!=='string'||typeof c.name!=='string'||typeof c.description!=='string'||!Array.isArray(c.variants)||!Array.isArray(c.keywords)||!Array.isArray(c.motions)||!catalog.categories.some(category=>category.id===c.category))throw new Error('Invalid component');
  for(const variant of c.variants){
   const files=bundle.packages[variant];
   if(!files||!Object.hasOwn(files,'index.html'))throw new Error('Incomplete component');
   for(const [name,key] of Object.entries(files)){
    if(!/^[a-zA-Z0-9][a-zA-Z0-9._-]*$/.test(name)||name.includes('..'))throw new Error('Unsafe filename');
    const blob=bundle.blobs[key];
    if(!blob||!['utf8','base64'].includes(blob.encoding)||hash(Buffer.from(blob.content,blob.encoding))!==key)throw new Error('Invalid source hash');
   }
  }
 }
}
async function safeCache(cache,create=true){
 for(let path=cache;;path=dirname(path)){
  try{const stat=await lstat(path);if(stat.isSymbolicLink()||!stat.isDirectory())throw new Error('Unsafe cache directory');}
  catch(error){if(error.code!=='ENOENT')throw error;}
  if(dirname(path)===path)break;
 }
 if(create)await mkdir(cache,{recursive:true});
}
async function save(cache,name,value){
 await safeCache(cache);
 const path=join(cache,name),temp=join(cache,`${name}.${randomUUID()}.tmp`);
 // Replace only our own cache leaf; do not follow pre-existing symlinks.
 try{if((await lstat(path)).isSymbolicLink())throw new Error('Unsafe cache file');}catch(error){if(error.code!=='ENOENT')throw error;}
 await writeFile(temp,JSON.stringify(value),{flag:'wx',mode:0o600});await rename(temp,path);
}
async function load(cache,name){
 await safeCache(cache,false);
 const path=join(cache,name);try{if((await lstat(path)).isSymbolicLink())throw new Error('Unsafe cache file');return JSON.parse(await readFile(path,'utf8'));}catch(error){if(error.code==='ENOENT')return null;throw error;}
}
export async function updateSettings(mode,{cache=defaultCache,policy}={}){
 policy??=JSON.parse(await readFile(new URL('update-policy.json',assets),'utf8'));
 if(mode==='enable'&&!policy.published)throw new Error('Update channel is not published yet. No network access or settings change was made.');
 if(!['enable','disable','status'].includes(mode))throw new Error('Usage: updates enable|disable|status');
 if(mode!=='status')await save(cache,'settings.json',{enabled:mode==='enable'});
 return {enabled:(await load(cache,'settings.json'))?.enabled===true,published:policy.published,feed:policy.feed,telemetry:false,scope:'Catalog and source data only; installed app files and plugin code are never overwritten.'};
}
export async function selectData({cache=defaultCache,policy,fetcher=fetch,now=Date.now(),bundled}={}){
 policy??=JSON.parse(await readFile(new URL('update-policy.json',assets),'utf8'));
 bundled??={catalog:JSON.parse(await readFile(new URL('catalog.json',assets),'utf8')),bundle:JSON.parse(await readFile(new URL('source-bundle.json',assets),'utf8'))};
 if(!policy.published)return bundled;
 let cached;
 try{
  if(!(await load(cache,'settings.json'))?.enabled)return bundled;
  const candidate=await load(cache,'data.json');if(candidate){validateData(candidate.catalog,candidate.bundle);if(compareVersions(candidate.catalog.version,bundled.catalog.version)>=0)cached=candidate;}
  const checked=await load(cache,'checked.json');
  if(checked&&now-checked.at<policy.intervalHours*3600000)return cached??bundled;
  const trusted=url=>url.startsWith('https://raw.githubusercontent.com/SLtowl/sl-ui-library/')&&!url.includes('..');
  const get=async(url,limit)=>{
   if(!trusted(url))throw new Error('Untrusted update origin');
   const response=await fetcher(url,{redirect:'error',signal:AbortSignal.timeout(1800)});
   if(!response.ok)throw new Error('Update unavailable');
   const parts=[];let size=0;for await(const part of response.body){size+=part.length;if(size>limit)throw new Error('Update too large');parts.push(Buffer.from(part));}
   return Buffer.concat(parts);
  };
  const manifest=JSON.parse((await get(policy.feed,16000)).toString());
  if(manifest.schemaVersion!==1||!/^\d+\.\d+\.\d+$/.test(manifest.version)||!/^\d+\.\d+\.\d+$/.test(bundled.catalog.version))throw new Error('Unsupported release');
  if(compareVersions(manifest.version,(cached??bundled).catalog.version)<=0){await save(cache,'checked.json',{at:now});return cached??bundled;}
  const result={};
  for(const [key,limit] of [['catalog',4e6],['bundle',32e6]]){
   const item=manifest[key];if(!item||!/^[a-f0-9]{64}$/.test(item.sha256)||!/^https:\/\/raw\.githubusercontent\.com\/SLtowl\/sl-ui-library\/[a-f0-9]{40}\//.test(item.url??''))throw new Error('Invalid release hash or mutable source URL');
   const bytes=await get(item.url,limit);if(hash(bytes)!==item.sha256)throw new Error('Update integrity check failed');result[key]=JSON.parse(bytes.toString());
  }
  if(result.catalog.version!==manifest.version)throw new Error('Release version mismatch');
  validateData(result.catalog,result.bundle);await save(cache,'data.json',result);await save(cache,'checked.json',{at:now});return result;
 }catch{
  // Never make offline source retrieval fail because an optional update failed.
  try{await save(cache,'checked.json',{at:now});}catch{}
  return cached??bundled;
 }
}
