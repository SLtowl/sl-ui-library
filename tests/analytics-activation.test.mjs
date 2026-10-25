import test,{after} from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,readFile,mkdir,rm} from 'node:fs/promises';
import {join,dirname,resolve,basename} from 'node:path';
import {analyticsSettings,readAnalyticsConfig} from '../plugins/sl-ui-library/scripts/analytics.mjs';
const config={enabled:true,privacyVerified:true,projectId:123,apiHost:'https://eu.i.posthog.com',environment:'qa',projectToken:'phc_SyntheticTestToken000000',version:'1.2.3'};
const paths=[];
const cache=async()=>{const path=await mkdtemp(join(process.cwd(),'.activation-test-'));paths.push(path);return path;};
after(async()=>{for(const path of paths){assert.equal(dirname(resolve(path)),resolve(process.cwd()));assert.ok(basename(path).startsWith('.activation-test-'));await rm(path,{recursive:true,force:true});}});
test('unset/status/send are offline and create no identifiers',async()=>{
 const path=await cache();let requests=0;
 const options={cache:path,config,fetcher:()=>{requests++;throw Error('must not request');}};
 assert.equal((await analyticsSettings('status',undefined,options)).consent,'unset');
 assert.equal((await analyticsSettings('send',undefined,options)).consent,'unset');
 assert.equal(requests,0);await assert.rejects(readFile(join(path,'activation.json')));
});
test('decline stores no identity and disables pending activation',async()=>{
 const path=await cache(),options={cache:path,config};
 await analyticsSettings('disable',undefined,options);
 assert.deepEqual(JSON.parse(await readFile(join(path,'activation.json'),'utf8')),{consent:'declined'});
 assert.equal((await analyticsSettings('send',undefined,options)).consent,'declined');
});
test('offline retry reuses event UUID and install identity; success prevents duplicates',async()=>{
 const path=await cache(),calls=[];
 const fetcher=async(_url,options)=>{calls.push(JSON.parse(options.body));return {ok:calls.length>1};};
 const options={cache:path,config,fetcher};
 assert.equal((await analyticsSettings('enable','codex',options)).status,'pending');
 assert.equal((await analyticsSettings('send',undefined,options)).activationReported,true);
 assert.equal(calls[0].uuid,calls[1].uuid);assert.equal(calls[0].distinct_id,calls[1].distinct_id);
 assert.equal((await analyticsSettings('enable','codex',options)).alreadyReported,true);assert.equal(calls.length,2);
 await analyticsSettings('disable',undefined,options);
 const state=await readFile(join(path,'activation.json'),'utf8');
 assert.equal(state.includes(calls[0].distinct_id),false);assert.equal(state.includes(calls[0].uuid),false);
});
test('concurrent enable has one in-flight event and reports busy safely',async()=>{
 const path=await cache();let release,started;
 const startedPromise=new Promise(resolve=>{started=resolve;});
 const options={cache:path,config,fetcher:()=>{started();return new Promise(resolve=>{release=resolve;});}};
 const first=analyticsSettings('enable','hermes',options);await startedPromise;
 assert.equal((await analyticsSettings('enable','hermes',options)).status,'busy');
 release({ok:true});assert.equal((await first).activationReported,true);
});
test('unconfigured builds do not create install identifiers',async()=>{
 const path=await cache();
 assert.equal((await analyticsSettings('enable','other',{cache:path,config:{enabled:false}})).status,'unconfigured');
 assert.deepEqual(JSON.parse(await readFile(join(path,'activation.json'),'utf8')),{consent:'granted',host:'other',sent:false});
});
test('repository install resolves public config only after explicit consent and remembers offline choice',async()=>{
 const path=await cache();let loads=0;
 const options={cache:path,loadConfiguration:async()=>{loads++;throw Error('offline');}};
 await analyticsSettings('status',undefined,options);await analyticsSettings('send',undefined,options);assert.equal(loads,0);
 assert.equal((await analyticsSettings('enable','hermes',options)).status,'pending');assert.equal(loads,1);
 assert.equal((await analyticsSettings('status',undefined,options)).consent,'granted');
 const requests=[];
 const loaded=await readAnalyticsConfig({reader:async()=>{throw Object.assign(Error(),{code:'ENOENT'});},
  fetcher:async(url,options)=>{requests.push({url,options});return {ok:true,text:async()=>JSON.stringify(config)};}});
 assert.deepEqual(loaded,config);assert.equal(requests[0].url,'https://sltowl.github.io/sl-ui-library/analytics/config.json');
 assert.equal(requests[0].options.credentials,'omit');assert.equal(requests[0].options.redirect,'error');
});
test('unsafe leaf and invalid host fail before network',async()=>{
 const path=await cache();await mkdir(join(path,'activation.json'));
 await assert.rejects(analyticsSettings('enable','codex',{cache:path,config}),/Unsafe/);
 await assert.rejects(analyticsSettings('enable','email@example.com',{cache:await cache(),config}),/supported host/);
});
