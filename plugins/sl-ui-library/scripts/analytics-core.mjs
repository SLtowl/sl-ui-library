// No SDK/autocapture: only explicitly allowlisted events can reach the transport.
const allowedHosts = new Set(['https://eu.i.posthog.com','https://us.i.posthog.com']);
const websiteEvents = new Set(['$pageview','component_opened','source_copied','component_zip_clicked','plugin_zip_clicked']);
const palettes = new Set(['white','black','blue']);
const formats = new Set(['HTML','CSS','JavaScript','React','Next.js']);
const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const canonicalURL = 'https://sltowl.github.io/sl-ui-library/';
export function sessionUUID(randomUUID,now) {
 const random=randomUUID().replaceAll('-',''),time=Math.trunc(now).toString(16).padStart(12,'0').slice(-12);
 return time.slice(0,8)+'-'+time.slice(8)+'-7'+random.slice(13,16)+'-'+random.slice(16,20)+'-'+random.slice(20);
}

export function configurationReady(config) {
  return config?.enabled===true && config.privacyVerified===true &&
    allowedHosts.has(config.apiHost) && ['production','qa'].includes(config.environment) && /^[1-9]\d*$/.test(String(config.projectId)) &&
    /^phc_[a-zA-Z0-9]{12,200}$/.test(config.projectToken??'') &&
    /^\d+\.\d+\.\d+$/.test(config.version??'');
}

export function trafficSource(referrer) {
  if (!referrer) return 'direct';
  try {
    const url = new URL(referrer);
    if (!['https:','http:'].includes(url.protocol)) return 'other';
    const host = url.hostname.toLowerCase();
    if (host==='sltowl.github.io') return 'internal';
    if (['github.com','www.github.com'].includes(host)) return 'github';
    if (['t.me','telegram.org','web.telegram.org'].includes(host)) return 'telegram';
    if (['google.com','www.google.com','google.ru','www.google.ru'].includes(host)) return 'google';
    if (['bing.com','www.bing.com'].includes(host)) return 'bing';
    return 'other';
  } catch { return 'other'; }
}

export function eventProperties(event,input,{channel,componentIds,version,environment}) {
  if (!input || typeof input!=='object' || Array.isArray(input)) return null;
  if (channel==='website' ? !websiteEvents.has(event) : channel!=='plugin' || event!=='plugin_activated') return null;
  const properties = {channel,library_version:version,environment,$process_person_profile:false,$geoip_disable:true};
  if (event==='$pageview') {
    if (!['home','catalog'].includes(input.page)) return null;
    return {...properties,page:input.page,$current_url:canonicalURL+(input.page==='catalog'?'#catalog':''),traffic_source:trafficSource(input.referrer)};
  }
  if (['component_opened','source_copied','component_zip_clicked'].includes(event)) {
    if (!componentIds.has(input.componentId) || !palettes.has(input.palette)) return null;
    properties.component_id=input.componentId; properties.palette=input.palette;
    if (event==='source_copied') {
      if (!formats.has(input.format)) return null;
      properties.format=input.format;
    }
  }
  if (event==='plugin_activated') {
    if (!['claude','codex','hermes','other'].includes(input.host)) return null;
    properties.host=input.host;
  }
  return properties;
}

// The production wrapper must persist consent and supply its existing random ID
// only after consent. Never pass a username, path, hardware ID or host account ID.
export function createAnalytics({config={},channel='website',componentIds=new Set(),fetcher=globalThis.fetch,
  randomUUID=()=>globalThis.crypto.randomUUID(),now=Date.now,privacySignal=()=>false,
  consent=false,identity,sessionId,timeoutMs=1500}={}) {
  config={...config}; componentIds=new Set(componentIds);
  let allowed=consent===true,distinctId=uuidPattern.test(identity??'')?identity:undefined;
  let session=uuidPattern.test(sessionId??'')?sessionId:undefined;
  let budgetStart=0,sentInMinute=0;
  const requests=new Set();
  function setConsent(value) {
    allowed=value===true;
    if (!allowed) {
      for(const controller of requests)controller.abort();
      distinctId=undefined;session=undefined;
    }
  }
  function identifiers() { return allowed?{identity:distinctId,sessionId:session}:{}; }
  function setSessionId(value) { if(allowed && uuidPattern.test(value??''))session=value; }
  async function capture(event,input={},options={}) {
    let controller,timer;
    try {
      if (!allowed || !configurationReady(config) || privacySignal() || typeof fetcher!=='function') return false;
      const properties=eventProperties(event,input,{channel,componentIds,version:config.version,environment:config.environment});
      if (!properties || requests.size>=4) return false;
      const time=now();
      if (!Number.isFinite(time)) return false;
      if (time-budgetStart>=60000 || time<budgetStart) {budgetStart=time;sentInMinute=0;}
      if (sentInMinute>=60) return false;
      // The optional UUID lets the plugin reuse the same event after a retry.
      const eventId=options.eventId??randomUUID();
      if (!uuidPattern.test(eventId)) return false;
      distinctId??=randomUUID();
      if (!uuidPattern.test(distinctId)) return false;
      if (channel==='website') {
        session??=sessionUUID(randomUUID,time);
        if (!uuidPattern.test(session)) return false;
        properties.$session_id=session;
      }
      const payload={api_key:config.projectToken,event,distinct_id:distinctId,uuid:eventId,
        timestamp:new Date(time).toISOString(),properties};
      controller=new AbortController(); requests.add(controller); sentInMinute++;
      // A stalled collector must never stall an interaction or keep a Node host alive.
      const deadline=new Promise(resolve=>{timer=setTimeout(()=>{controller.abort();resolve(false);},Math.min(2000,Math.max(1,timeoutMs)));});
      const send=Promise.resolve().then(()=>{
        if (!allowed || privacySignal() || controller.signal.aborted) return false;
        return fetcher(config.apiHost+'/i/v0/e/',{method:'POST',headers:{'Content-Type':'application/json'},
          body:JSON.stringify(payload),credentials:'omit',referrerPolicy:'no-referrer',redirect:'error',
          cache:'no-store',keepalive:channel==='website',signal:controller.signal}).then(r=>r.ok===true,()=>false);
      });
      return await Promise.race([send,deadline]);
    } catch { return false; }
    finally {clearTimeout(timer);if(controller)requests.delete(controller);}
  }
  return {capture,setConsent,identifiers,setSessionId};
}
