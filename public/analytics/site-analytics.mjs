import {createAnalytics,configurationReady} from './analytics-core.mjs';
const consentKey='sl-ui-library:analytics:v1';
const blocked=()=>navigator.globalPrivacyControl===true || ['1','yes'].includes(navigator.doNotTrack);
// Migration reads only the old refusal flag. Never write cookies or browser IDs.
function previouslyDeclined() {
 try{return JSON.parse(window.localStorage.getItem(consentKey))?.allowed===false;}catch{return false;}
}
function clearLegacyIdentifiers() {
 try{window.localStorage.removeItem('sl-ui-library:analytics-id:v1');}catch{}
 try{window.sessionStorage.removeItem('sl-ui-library:analytics-session:v1');}catch{}
}
export async function mountAnalytics() {
 clearLegacyIdentifiers();
 if(blocked()||previouslyDeclined())return;
 let config;
 try {
  const response=await fetch(new URL('./config.json',import.meta.url),{credentials:'omit',signal:AbortSignal.timeout(5000)});
  if(!response.ok)return;config=await response.json();if(!configurationReady(config))return;
  if(location.origin!=='https://sltowl.github.io'||!location.pathname.startsWith('/sl-ui-library/'))config={...config,environment:'qa'};
 }catch{return;}
 const client=createAnalytics({config,consent:true,userAgent:navigator.userAgent,privacySignal:()=>blocked()||previouslyDeclined()});
 let lastPage='';
 function pageview() {
  const state=document.body.dataset.journey;
  const page=state==='catalog'?'catalog':(!state||state==='hero')?'home':null;
  if(!page||page===lastPage||blocked()||previouslyDeclined())return;
  lastPage=page;void client.capture('$pageview',{page,referrer:document.referrer});
 }
 window.addEventListener('storage',event=>{if(event.key===consentKey&&previouslyDeclined())client.setConsent(false);});
 document.addEventListener('click',event=>{
  const anchor=event.target.closest?.('a[href]');if(!anchor)return;
  try{const url=new URL(anchor.href);if(url.origin===location.origin&&url.pathname.endsWith('/downloads/sl-ui-library-plugin.zip'))void client.capture('plugin_zip_clicked');}catch{}
 });
 new MutationObserver(pageview).observe(document.body,{attributes:true,attributeFilter:['data-journey']});
 pageview();
}
if(typeof document!=='undefined')void mountAnalytics().catch(()=>{});
