import test from 'node:test';
import assert from 'node:assert/strict';
import {randomUUID} from 'node:crypto';
import {createAnalytics,configurationReady,trafficSource} from '../plugins/sl-ui-library/scripts/analytics-core.mjs';

// Synthetic ingestion token: all requests below use injected local transports.
const config={enabled:true,privacyVerified:true,projectId:123,apiHost:'https://eu.i.posthog.com',environment:'qa',projectToken:'phc_SyntheticTestToken000000',version:'1.2.2'};
const catalog=new Set(['copy','search-input']);
function fixture(overrides={}) {
  const calls=[];let identifiers=0;
  const analytics=createAnalytics({config,consent:true,componentIds:catalog,
    randomUUID:()=>{identifiers++;return randomUUID();},fetcher:async(url,options)=>{calls.push({url,options,payload:JSON.parse(options.body)});return {ok:true};},...overrides});
  return {...analytics,calls,allocated:()=>identifiers};
}

test('default and refused consent produce no request or identifier',async()=>{
  for(const consent of [undefined,false,'true']) {
    const f=fixture({consent});
    assert.equal(await f.capture('$pageview',{page:'home'}),false);
    assert.equal(f.calls.length,0);assert.equal(f.allocated(),0);
  }
});
test('unconfigured, unverified and private credentials fail closed',async()=>{
  for(const changed of [{enabled:false},{privacyVerified:false},{projectToken:''},{projectToken:'phx_PRIVATEKEY'},{apiHost:'https://attacker.test'},{environment:'custom'},{projectId:null},{version:'1.2.2\ntext'}]) {
    const candidate={...config,...changed};assert.equal(configurationReady(candidate),false);
    const f=fixture({config:candidate});await f.capture('$pageview',{page:'home'});
    assert.equal(f.calls.length,0);assert.equal(f.allocated(),0);
  }
});
test('GPC/DNT adapter blocks even an already consented identity',async()=>{
  const f=fixture({privacySignal:()=>true});
  assert.equal(await f.capture('$pageview',{page:'home'}),false);
  assert.equal(f.calls.length,0);assert.equal(f.allocated(),0);
});
test('page URL and traffic never include Unicode searches, tokens or paths',async()=>{
  const f=fixture();
  const secret='личный поиск @example.com';
  assert.equal(await f.capture('$pageview',{page:'catalog',referrer:'https://github.com/private/repo?secret='+encodeURIComponent(secret),url:'https://example.com/?token='+secret,query:secret,text:secret}),true);
  const body=f.calls[0].options.body,p=f.calls[0].payload;
  assert.equal(p.properties.$current_url,'https://sltowl.github.io/sl-ui-library/#catalog');
  assert.equal(p.properties.traffic_source,'github');
  for(const forbidden of [secret,'secret=','token=','private/repo','example.com'])assert.equal(body.includes(forbidden),false);
  assert.equal(p.properties.$process_person_profile,false);
});
test('component interactions are never collected, including valid published metadata',async()=>{
  const f=fixture();
  for(const event of ['component_opened','source_copied','component_zip_clicked'])for(const palette of ['white','black','blue'])assert.equal(await f.capture(event,{componentId:'copy',palette,format:'HTML'}),false);
  assert.equal(f.calls.length,0);assert.equal(f.allocated(),0);
});
test('unknown events, identify and activation cannot leak through website channel',async()=>{
  const f=fixture();
  for(const event of ['$identify','$autocapture','$snapshot','plugin_activated','arbitrary'])assert.equal(await f.capture(event,{host:'codex'}),false);
  assert.equal(f.allocated(),0);assert.equal(f.calls.length,0);
});
test('plugin channel sends activation only, with no supplied user text',async()=>{
  const f=fixture({channel:'plugin'}),eventId=randomUUID();
  assert.equal(await f.capture('$pageview',{page:'home'}),false);
  assert.equal(await f.capture('plugin_activated',{host:'codex',path:'C:/private',email:'secret@example.com'},{eventId}),true);
  const p=f.calls[0].payload;
  assert.equal(p.uuid,eventId);assert.equal(p.properties.host,'codex');
  assert.equal(p.properties.$session_id,undefined);
  assert.equal(JSON.stringify(p).includes('private'),false);
  assert.equal(JSON.stringify(p).includes('secret@example.com'),false);
});
test('traffic categories reject spoofed hosts, unsafe protocols and arbitrary hostnames',()=>{
  assert.equal(trafficSource('https://github.com.attacker.test/'),'other');
  assert.equal(trafficSource('https://user.secret-domain.test/path'),'other');
  assert.equal(trafficSource('file:///C:/Users/me'),'other');
  assert.equal(trafficSource('not a url'),'other');
  assert.equal(trafficSource(''),'direct');
  assert.equal(trafficSource('https://t.me/example'),'telegram');
});
test('production destination is fixed; cookies and raw referrer are omitted',async()=>{
  const f=fixture();await f.capture('plugin_zip_clicked',{endpoint:'https://attacker.test'});
  assert.equal(f.calls[0].url,'https://eu.i.posthog.com/i/v0/e/');
  assert.equal(f.calls[0].options.credentials,'omit');
  assert.equal(f.calls[0].options.referrerPolicy,'no-referrer');
  assert.equal(f.calls[0].options.redirect,'error');
});
test('website sends daily server-hash sentinel and no browser or session identity',async()=>{
  const identity=randomUUID(),f=fixture({identity,userAgent:'Browser QA 1.0'});
  await f.capture('$pageview',{page:'home'});await f.capture('$pageview',{page:'catalog'});
  for(const {payload} of f.calls){
    assert.equal(payload.distinct_id,'$posthog_cookieless');
    assert.equal(payload.properties.$cookieless_mode,true);
    assert.equal(payload.properties.collection_mode,'cookieless');
    assert.equal(payload.properties.$host,'sltowl.github.io');
    assert.equal(payload.properties.$raw_user_agent,'Browser QA 1.0');
    assert.equal(payload.properties.$session_id,undefined);
    assert.equal(payload.properties.$ip,undefined);
    assert.equal(JSON.stringify(payload).includes(identity),false);
  }
  assert.equal(f.allocated(),2,'only independent event UUIDs are allocated');
  assert.notEqual(f.calls[0].payload.uuid,f.calls[1].payload.uuid);
  assert.deepEqual(f.identifiers(),{});
  f.setConsent(false);assert.deepEqual(f.identifiers(),{});
  assert.equal(await f.capture('$pageview',{page:'home'}),false);
});
test('plugin retains a stable consented installation identity and no cookieless metadata',async()=>{
  const identity=randomUUID(),f=fixture({channel:'plugin',identity,userAgent:'Browser QA'});
  await f.capture('plugin_activated',{host:'codex'});
  await f.capture('plugin_activated',{host:'codex'});
  for(const {payload} of f.calls){
    assert.equal(payload.distinct_id,identity);
    assert.equal(payload.properties.collection_mode,undefined);
    assert.equal(payload.properties.$cookieless_mode,undefined);
    assert.equal(payload.properties.$host,undefined);
    assert.equal(payload.properties.$raw_user_agent,undefined);
  }
  f.setConsent(false);assert.deepEqual(f.identifiers(),{});
});
test('withdrawal aborts in-flight work without sending an opt-out event',async()=>{
  let signal;
  const f=fixture({fetcher:(_url,options)=>new Promise(resolve=>{signal=options.signal;signal.addEventListener('abort',()=>resolve({ok:false}),{once:true});})});
  const pending=f.capture('$pageview',{page:'home'});await Promise.resolve();
  f.setConsent(false);assert.equal(signal.aborted,true);assert.equal(await pending,false);
  assert.equal(await f.capture('$pageview',{page:'home'}),false);
});
test('collector failures, exceptions and a stalled network cannot break the caller',async()=>{
  for(const fetcher of [async()=>{throw new Error('offline');},async()=>({ok:false}),()=>{throw new Error('blocked');},()=>new Promise(()=>{})]) {
    const f=fixture({fetcher,timeoutMs:15});
    assert.equal(await f.capture('$pageview',{page:'home'}),false);
  }
});
test('withdrawal in the same task prevents the queued network request',async()=>{
  const f=fixture();const pending=f.capture('$pageview',{page:'home'});f.setConsent(false);
  assert.equal(await pending,false);assert.equal(f.calls.length,0);
});
test('rapid interaction burst is bounded and does not retry failed requests',async()=>{
  const f=fixture({now:()=>100000});
  for(let i=0;i<100;i++)await f.capture('plugin_zip_clicked');
  assert.equal(f.calls.length,60);
});
