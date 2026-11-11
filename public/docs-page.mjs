import {mountHeader} from './site-shell/shell.mjs';
mountHeader('Docs');
import('./site-shell/dots.mjs').then(m=>m.mountDots(document.getElementById('field')));
const $=s=>document.querySelector(s),PS5='In Windows PowerShell 5, run the two commands separately';
// Commands as documented in docs/agents.md and the README.
const WAYS={claude:{cmd:'claude plugin marketplace add SLtowl/sl-ui-library && claude plugin install sl-ui-library@sl-ui-library',note:PS5},codex:{cmd:'codex plugin marketplace add SLtowl/sl-ui-library && codex plugin add sl-ui-library@sl-ui-library',note:PS5},zip:{note:'A ZIP copy does not update by itself. Download it again for new components'}};
let way='claude',back;
const calm=matchMedia('(prefers-reduced-motion:reduce)').matches;let typing=0,termSeen=false;
// The command types itself out, with a blinking caret at the end.
function type(text){clearInterval(typing);$('#ghost').textContent=text;const out=$('#cmd');if(calm||!termSeen){out.innerHTML='';out.append(text,caret());return}
  let k=0;out.replaceChildren(caret());typing=setInterval(()=>{k=Math.min(text.length,k+2);out.replaceChildren(text.slice(0,k),caret());if(k>=text.length)clearInterval(typing)},16)}
const caret=()=>Object.assign(document.createElement('span'),{className:'caret'});
// The plate moves under the chosen tab; the first placement has no transition.
function plate(instant){const b=document.querySelector(`.tabs [data-t="${way}"]`),p=$('.tab-plate');if(instant)p.style.transition='none';p.style.width=b.offsetWidth+'px';p.style.translate=b.offsetLeft+'px 0';if(instant){p.offsetWidth;p.style.transition=''}}
function paint(){const w=WAYS[way];for(const b of document.querySelectorAll('.tabs button'))b.setAttribute('aria-selected',String(b.dataset.t===way));plate();$('#cmdBox').hidden=!w.cmd;$('#zipBox').hidden=!!w.cmd;$('#copy').hidden=!w.cmd;if(w.cmd)type(w.cmd);$('#note').textContent=w.note;reset()}
function reset(){clearTimeout(back);delete $('#copy').dataset.state;$('#copyText').textContent='Copy'}
$('.tabs').addEventListener('click',e=>{const b=e.target.closest('[data-t]');if(b){way=b.dataset.t;paint()}});paint();plate(true);document.fonts?.ready.then(()=>plate(true));addEventListener('resize',()=>plate(true),{passive:true});
$('#copy').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(WAYS[way].cmd);$('#copy').dataset.state='done';$('#copyText').textContent='Copied';clearTimeout(back);back=setTimeout(reset,1800)}catch{$('#copyText').textContent='Failed';back=setTimeout(reset,1500)}});
// The outline marks the section being read.
const links=[...document.querySelectorAll('.toc a')],secs=links.map(a=>document.querySelector(a.hash));
const mark=()=>{let cur=secs[0];for(const s of secs)if(s.getBoundingClientRect().top<innerHeight*.35)cur=s;if(innerHeight+scrollY>=document.documentElement.scrollHeight-4)cur=secs.at(-1);links.forEach(a=>a.hash==='#'+cur.id?a.setAttribute('aria-current','true'):a.removeAttribute('aria-current'))};
addEventListener('scroll',mark,{passive:true});mark();
document.querySelectorAll('.steps li,.formats div').forEach(el=>el.style.setProperty('--i',[...el.parentNode.children].indexOf(el)));
// Each block plays once when it comes into view.
const seen=new IntersectionObserver(es=>{for(const e of es){if(!e.isIntersecting)continue;const el=e.target;seen.unobserve(el);el.classList.add('in');
  if(el.classList.contains('term')){termSeen=true;if(WAYS[way].cmd)type(WAYS[way].cmd)}
  if(el.classList.contains('chat')){const t=el.querySelector('.typing'),r=el.querySelector('.reply');if(calm){t.hidden=true;r.hidden=false;return}
    setTimeout(()=>t.classList.add('shown'),550);setTimeout(()=>{t.hidden=true;r.hidden=false;r.classList.add('shown')},1900)}}},{threshold:.35});
document.querySelectorAll('.term,.chat,.steps,.formats').forEach(el=>seen.observe(el));
document.documentElement.style.scrollBehavior='smooth';
