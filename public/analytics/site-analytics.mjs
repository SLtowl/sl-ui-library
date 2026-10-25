import {createAnalytics,configurationReady,sessionUUID} from './analytics-core.mjs';
const consentKey='sl-ui-library:analytics:v1',identityKey='sl-ui-library:analytics-id:v1',sessionKey='sl-ui-library:analytics-session:v1';
const consentLifetime=180*86400000,sessionLifetime=30*60000;
const blocked=()=>navigator.globalPrivacyControl===true || ['1','yes'].includes(navigator.doNotTrack);
const read=(storage,key)=>{try{return JSON.parse(storage.getItem(key));}catch{return null;}};
const write=(storage,key,value)=>{try{if(value===null)storage.removeItem(key);else storage.setItem(key,JSON.stringify(value));}catch{}};
export async function mountAnalytics() {
 let config;
 try {
  const response=await fetch(new URL('./config.json',import.meta.url),{credentials:'omit',signal:AbortSignal.timeout(5000)});
  if(!response.ok)return;config=await response.json();if(!configurationReady(config))return;
  if(location.origin!=='https://sltowl.github.io'||!location.pathname.startsWith('/sl-ui-library/'))config={...config,environment:'qa'};
 }catch{return;}
 let persistent,sessionStorageRef;
 try{persistent=window.localStorage;}catch{}
 try{sessionStorageRef=window.sessionStorage;}catch{}
 let preference=read(persistent,consentKey),session=read(sessionStorageRef,sessionKey),lastPage='';
 if(!preference || typeof preference.allowed!=='boolean' || !Number.isFinite(preference.at) || Date.now()-preference.at>consentLifetime || preference.at>Date.now())preference=null;
 if(!/^[a-f0-9]{8}-[a-f0-9]{4}-7[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i.test(session?.id??''))session=null;
 const {components}=await import('../catalog-data.js');
 const client=createAnalytics({config,consent:preference?.allowed===true&&!blocked(),privacySignal:blocked,
  identity:read(persistent,identityKey),sessionId:session?.id,componentIds:new Set(components.map(c=>c.id))});
 const panel=document.createElement('aside');panel.className='analytics-choice';panel.setAttribute('aria-label','Optional analytics');
 const description=document.createElement('p');description.innerHTML='<strong>Help improve SL UI Library?</strong><span>Optional analytics counts visits and downloads. No recordings, code or input text.</span>';
 const allow=document.createElement('button'),decline=document.createElement('button'),close=document.createElement('button'),privacy=document.createElement('button');
 allow.type=decline.type=close.type=privacy.type='button';
 allow.textContent='Allow analytics';decline.textContent='Decline';close.textContent='Close';privacy.textContent='Privacy';
 privacy.className='analytics-privacy';privacy.setAttribute('aria-controls','analytics-choice');
 const policy=document.createElement('a');policy.href=new URL('./privacy.html',import.meta.url).href;policy.textContent='What is collected';policy.className='analytics-policy';
 panel.id='analytics-choice';panel.append(description,allow,decline,close,policy);document.body.append(panel,privacy);
 function paint(open=!preference) {
  const disabled=blocked();allow.disabled=disabled;close.hidden=!preference;panel.hidden=!open;
  privacy.setAttribute('aria-expanded',String(open));privacy.setAttribute('aria-label','Analytics privacy settings');
  if(disabled)description.lastElementChild.textContent='Analytics is off because your browser requests privacy.';
  else description.lastElementChild.textContent='Optional analytics counts visits and downloads. No recordings, code or input text.';
 }
 function clearIdentity() {write(persistent,identityKey,null);write(sessionStorageRef,sessionKey,null);session=null;lastPage='';}
 function choice(allowed) {
  preference={allowed,at:Date.now()};write(persistent,consentKey,preference);client.setConsent(allowed&&!blocked());
  if(!allowed)clearIdentity();paint(false);privacy.focus({preventScroll:true});if(allowed)pageview();
 }
 function send(event,input) {
  if(preference?.allowed!==true || blocked())return;
  const now=Date.now();
  if(!session || !Number.isFinite(session.at) || now-session.at>=sessionLifetime || session.at>now) {
   try{session={id:sessionUUID(()=>crypto.randomUUID(),now),at:now};client.setSessionId(session.id);}catch{return;}
  }
  session.at=now;write(sessionStorageRef,sessionKey,session);
  void client.capture(event,input);
  const id=client.identifiers().identity;if(id)write(persistent,identityKey,id);
 }
 function pageview() {
  const state=document.body.dataset.journey;
  const page=state==='catalog'?'catalog':(!state||state==='hero')?'home':null;
  if(!page || page===lastPage || preference?.allowed!==true || blocked())return;
  send('$pageview',{page,referrer:document.referrer});lastPage=page;
 }
 allow.addEventListener('click',()=>choice(true));decline.addEventListener('click',()=>choice(false));
 close.addEventListener('click',()=>{paint(false);privacy.focus({preventScroll:true});});
 privacy.addEventListener('click',()=>{paint(panel.hidden);if(!panel.hidden)(allow.disabled?decline:allow).focus({preventScroll:true});});
 panel.addEventListener('keydown',event=>{if(event.key==='Escape'&&preference){paint(false);privacy.focus({preventScroll:true});}});
 window.addEventListener('storage',event=>{
  if(event.key!==consentKey)return;const next=read(persistent,consentKey);preference=next;
  client.setConsent(next?.allowed===true&&!blocked());if(next?.allowed!==true)clearIdentity();paint(false);pageview();
 });
 window.addEventListener('sl:analytics',event=>{const detail=event.detail;if(detail && typeof detail==='object')send(detail.event,detail.input);});
 document.addEventListener('click',event=>{
  const anchor=event.target.closest?.('a[href]');if(!anchor)return;
  try{const url=new URL(anchor.href);if(url.origin===location.origin&&url.pathname.endsWith('/downloads/sl-ui-library-plugin.zip'))send('plugin_zip_clicked',{});}catch{}
 });
 new MutationObserver(pageview).observe(document.body,{attributes:true,attributeFilter:['data-journey']});
 if(blocked()||preference?.allowed!==true){client.setConsent(false);clearIdentity();}
 paint();pageview();
}
if(typeof document!=='undefined')void mountAnalytics().catch(()=>{});
