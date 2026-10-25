import {readFile,writeFile,mkdir,lstat,rename,open,unlink} from 'node:fs/promises';
import {join,dirname} from 'node:path';
import {homedir} from 'node:os';
import {randomUUID} from 'node:crypto';
import {createAnalytics,configurationReady} from './analytics-core.mjs';
const cacheDefault=join(homedir(),'.cache','sl-ui-library');
const hosts=new Set(['claude','codex','hermes','other']);
const uuid=/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
export async function readAnalyticsConfig({fetcher=fetch,reader=readFile}={}) {
 try{return JSON.parse(await reader(new URL('../assets/analytics-config.json',import.meta.url),'utf8'));}
 catch(error){if(error.code!=='ENOENT')throw error;}
 // Repository-based host installs do not run our build. Resolve the public
 // ingestion configuration only after consent, never during source retrieval.
 const response=await fetcher('https://sltowl.github.io/sl-ui-library/analytics/config.json',
  {credentials:'omit',redirect:'error',referrerPolicy:'no-referrer',signal:AbortSignal.timeout(1800)});
 if(!response.ok)throw Error('Optional analytics configuration is unavailable.');
 const text=await response.text();if(text.length>2048)throw Error('Invalid analytics configuration size.');
 return JSON.parse(text);
}
async function safeDirectory(cache,create=false) {
 for(let path=cache;;path=dirname(path)){
  try{const stat=await lstat(path);if(stat.isSymbolicLink()||!stat.isDirectory())throw Error('Unsafe analytics cache directory.');}
  catch(error){if(error.code!=='ENOENT')throw error;}
  if(dirname(path)===path)break;
 }
 if(create)await mkdir(cache,{recursive:true});
}
async function stateFile(cache) {
 await safeDirectory(cache);
 const file=join(cache,'activation.json');
 try {
  const stat=await lstat(file);if(!stat.isFile()||stat.isSymbolicLink()||stat.size>4096)throw Error('Unsafe analytics preference file.');
  const data=JSON.parse(await readFile(file,'utf8'));
  if(data.consent==='declined')return {consent:'declined'};
  const idsValid=data.identity===undefined&&data.eventId===undefined&&!data.sent || uuid.test(data.identity??'')&&uuid.test(data.eventId??'');
  if(data.consent!=='granted'||!idsValid||!hosts.has(data.host)||typeof data.sent!=='boolean')throw Error('Invalid analytics preference.');
  return data;
 }catch(error){if(error.code==='ENOENT')return null;throw error;}
}
async function save(cache,data) {
 const temp=join(cache,'activation.'+randomUUID()+'.tmp');
 try{await writeFile(temp,JSON.stringify(data)+'\n',{flag:'wx',mode:0o600});await rename(temp,join(cache,'activation.json'));}
 finally{try{await unlink(temp);}catch(error){if(error.code!=='ENOENT')throw error;}}
}
export async function analyticsSettings(mode,host,{cache=cacheDefault,config,fetcher=fetch,loadConfiguration=readAnalyticsConfig}={}) {
 if(!['status','enable','disable','send'].includes(mode))throw Error('Usage: analytics status|enable <claude|codex|hermes|other>|disable|send');
 if((mode==='enable'&&!hosts.has(host))||(mode!=='enable'&&host!==undefined))throw Error('Specify a supported host only with analytics enable.');
 if(mode==='status') {
  const state=await stateFile(cache);
  return {consent:state?.consent??'unset',activationReported:state?.sent===true,scope:'One optional anonymous activation; no usage, source, input or conversation collection.'};
 }
 await safeDirectory(cache,true);
 const lockPath=join(cache,'activation.lock');let lock;
 try{lock=await open(lockPath,'wx',0o600);}catch(error){if(error.code==='EEXIST')return {status:'busy',message:'Another consent command is running; normal component commands remain available.'};throw error;}
 try {
  let state=await stateFile(cache);
  if(mode==='disable'){await save(cache,{consent:'declined'});return {consent:'declined',activationReported:false,identifiersRemoved:true};}
  if(mode==='send'&&state?.consent!=='granted')return {consent:state?.consent??'unset',activationReported:false};
  if(state?.consent!=='granted'){state={consent:'granted',host,sent:false};await save(cache,state);}
  if(state.sent)return {consent:'granted',activationReported:true,alreadyReported:true};
  try{config??=await loadConfiguration();}
  catch{return {consent:'granted',activationReported:false,status:'pending',message:'Optional configuration is offline; consent was remembered. Component retrieval remains available offline.'};}
  if(!configurationReady(config))return {status:'unconfigured',activationReported:false,message:'Analytics is disabled in this build; no event or identifier was created.'};
  if(!state.identity){
   state={...state,identity:randomUUID(),eventId:randomUUID()};
   await save(cache,state);
  }
  const client=createAnalytics({config,channel:'plugin',consent:true,identity:state.identity,randomUUID,fetcher});
  const accepted=await client.capture('plugin_activated',{host:state.host},{eventId:state.eventId});
  if(accepted){state.sent=true;await save(cache,state);}
  return {consent:'granted',activationReported:accepted,status:accepted?'accepted':'pending',message:accepted?'Activation accepted by the collector.':'Optional activation was not delivered; component retrieval remains available offline.'};
 }finally{await lock.close();await unlink(lockPath);}
}
