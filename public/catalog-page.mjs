import './site-preview-runtime.js';
import {mountReviewHeader} from './site-shell/review-header.mjs';
mountReviewHeader({current:'Components',catalog:'./catalog.html',docs:'./docs.html',catalogSearch:true});
import './packages/search-input/buttons.js';
import {components,categories} from './site-catalog-data.js';
import {loadPalettePackage,loadPaletteSource} from './experiments/library-shell/site-catalog-export.mjs';
import SIZES from './site-shell/sizes.mjs';
const PEEK=new URLSearchParams(location.search).has('peek');if(PEEK)document.documentElement.classList.add('peek');
import {setPreviewPalette,paletteControls} from './experiments/library-shell/site-catalog-palettes.mjs';
const $=s=>document.querySelector(s),calm=matchMedia('(prefers-reduced-motion:reduce)'),byId=new Map(components.map(c=>[c.id,c])),params=new URLSearchParams(location.search);
const FORMATS=[['HTML','index.html'],['CSS','buttons.css'],['JavaScript','example.js'],['React','Component.jsx'],['Next.js','NextClient.jsx']];
// Icon / text versions of a component, as the earlier component window offered them. The choice follows into the card, the code and the ZIP.
const OWN_VERSIONS={'matte-save-cancel':[['pair','Save & Cancel'],['save','Save'],['save-icon','Icon']],'matte-copy':[['copy-text','Text'],['copy','Icon + text'],['copy-icon','Icon']],'matte-like':[['like','Icon + text'],['like-icon','Icon']]};
const versionsOf=c=>OWN_VERSIONS[c.id]||c.versions||[];
const chosen=new Map(),variantOf=c=>chosen.get(c.id)||c.variants[0],asChosen=c=>({...c,variants:[variantOf(c),...c.variants.filter(v=>v!==variantOf(c))]});
const palettes=new Map(components.filter(c=>c.collection==='product').map(c=>[c.id,'white'])),state={q:params.get('q')||'',file:'index.html',cat:params.get('cat')||'popular',coll:params.get('coll')||''};
const hay=new Map(components.map(c=>[c.id,[c.name,c.description,...(c.keywords||[]),...(c.motions||[])].join(' ').toLowerCase()]));
const words=()=>state.q.trim().toLowerCase().split(/\s+/).filter(Boolean);
function fitPreview(frame, stage, id) {
  if (id.startsWith('product-') && stage.classList.contains('big')) {
    frame.dataset.previewSizing = 'content';
    return;
  }
  const size = SIZES[id];
  if (!size) return;
  const reserved = stage.classList.contains('big') && matchMedia('(hover:none),(max-width:600px)').matches ? 44 : 0;
  const zoom = Math.min(1, (stage.clientHeight-reserved-24)/size[1], (stage.clientWidth-20)/Math.min(size[0],690));
  frame.style.zoom = zoom < .995 ? Math.max(.5, zoom).toFixed(3) : '';
}

// Mount visible previews and the next row. Keep their controllers while scrolling.
const previewsInView = new IntersectionObserver(entries => {
  for (const entry of entries) {
    if (entry.isIntersecting) wakeCard(entry.target);
  }
}, {rootMargin: '200px 0px'});

function wakeCard(card) {
  if (!card.isConnected || card.querySelector('sl-preview')) return;
  previewsInView.unobserve(card);
  const component = byId.get(card.dataset.id);
  const stage = card.querySelector('.stage');
  const frame = document.createElement('sl-preview');
  frame.setAttribute('variant', variantOf(component));
  frame.setAttribute('aria-label', component.name + ' interactive preview');
  fitPreview(frame, stage, component.id);
  stage.append(frame);
  const palette = palettes.get(component.id) || 'white';
  setPreviewPalette(frame, palette);
  const controls = paletteControls(frame, component.name, value => palettes.set(component.id, value));
  for (const button of controls.children) {
    if (button.dataset.palette) button.setAttribute('aria-pressed', String(button.dataset.palette === palette));
  }
  card.append(controls);
}

function makeCard(c){const card=document.createElement('article');card.className='card';card.dataset.id=c.id;card.tabIndex=0;
  card.innerHTML=`<div class="stage"></div><div class="foot"><b title="${c.name}">${c.name}</b><button class="open" type="button" data-open aria-label="Open ${c.name} code">Open code</button></div>`;return card}

// The catalog shows one category at a time, chosen in the dock. Search looks through all of them.
const MIN_CARD_WIDTH={'data-display':400,navigation:340,overlays:320,menus:320};
// A category with several collections opens on a shelf of them; choosing one shows only its components, with a way back.
const COMP_COLLECTIONS={buttons:[
  {id:'product',name:'Product',desc:'Buttons that turn into what the action needs',art:'<span class="pa"><span class="pa-field"><span class="pa-type">anna@studio.co</span><span class="pa-pill">Subscribe</span></span><span class="pa-bar"><b>Pay $49</b></span></span>'},
  {id:'matte',name:'Matte',desc:'Everyday buttons with soft state changes',art:'<span class="pa pa-matte"><span class="pm paper wide" style="--k:0">Save</span><span class="pm ink wide" style="--k:1">Cancel</span><span class="pa-row"><span class="pm paper" style="--k:2">Follow</span><span class="pm ink" style="--k:3">Share</span><span class="pm paper" style="--k:4">Like</span></span></span>'}]};
COMP_COLLECTIONS.inputs=[
  {id:'product',name:'Product',desc:'Fields that check, format and fix as you type',art:'<span class="pa"><span class="pi"><i class="pi-at">@</i><span class="pa-type">anna.studio</span><b class="pi-ok">Available</b></span><span class="pi-cells"><i>4</i><i>2</i><i>7</i><i class="pi-on"></i><i></i><i></i></span></span>'},
  {id:'matte',name:'Matte',desc:'Everyday fields with clear states',art:'<span class="pa pa-mi"><span class="mi"><small>Email</small><span>anna@studio.co</span></span><span class="mi"><small>Search</small><span class="mi-ph">Find a component</span></span></span>'}];
COMP_COLLECTIONS.selection=[
  {id:'product',name:'Product',desc:'Switches you can feel change things',art:'<span class="pa"><span class="pa-field pt-field"><span>Do not disturb</span><i class="pt-sw"></i></span><span class="pa-bar pt-bar"><i></i><b>Monthly</b><b>Yearly</b></span></span>'},
  {id:'matte',name:'Matte',desc:'Everyday switches and segmented controls',art:'<span class="pa pa-row"><span class="mt on"></span><span class="mt"></span></span>'}];
COMP_COLLECTIONS.checkboxes=[
  {id:'product',name:'Product',desc:'Checkboxes that do what the choice needs',art:'<span class="pa"><span class="pa-field ct-field"><i class="ct-box"><svg viewBox="0 0 22 22"><path pathLength="1" d="M6 11.5l3.5 3.5L16 7.5"/></svg></i><span class="ct-text">Review the contract</span></span><span class="pa-bar"><b>2 of 3 done</b></span></span>'},
  {id:'matte',name:'Matte',desc:'Everyday checkboxes and radio groups',art:'<span class="pa pa-row"><i class="mc" style="--k:0"><svg viewBox="0 0 22 22"><path pathLength="1" d="M6 11.5l3.5 3.5L16 7.5"/></svg></i><i class="mc" style="--k:1"><svg viewBox="0 0 22 22"><path pathLength="1" d="M6 11.5l3.5 3.5L16 7.5"/></svg></i><i class="mc" style="--k:2"><svg viewBox="0 0 22 22"><path pathLength="1" d="M6 11.5l3.5 3.5L16 7.5"/></svg></i></span>'}];
COMP_COLLECTIONS.sliders=[
  {id:'product',name:'Product',desc:'Sliders that show what they change',art:'<span class="pa"><span class="pa-field st-field"><span>Volume</span><i class="st-rail"><u></u></i></span><span class="pa-bar"><b>$1,200</b></span></span>'},
  {id:'matte',name:'Matte',desc:'Everyday sliders and ranges',art:'<span class="pa"><i class="st-rail"><u></u></i></span>'}];
const collectionOf=c=>c.collection||'matte';
let groupIds=[],dockSig='';state.cat=params.get('cat')||'buttons';
function buildComponents(enter){
  const terms=words();
  const hits=components.filter(c=>terms.every(term=>hay.get(c.id).includes(term))),groups=categories.map(x=>({id:x.id,label:x.label,items:hits.filter(c=>c.category===x.id)})).filter(g=>g.items.length),main=$('#main');main.replaceChildren();
  if(!groups.length){const n=document.createElement('div');n.className='none';n.innerHTML=`<h2>No “${state.q.replace(/[<&]/g,'')}” yet</h2><p>Try another word, or how it feels: soft press.</p>`;main.append(n);dock.classList.add('away');return}
  dock.classList.remove('away');groupIds=groups.map(g=>g.id);if(!groupIds.includes(state.cat))state.cat=groupIds[0];const g=groups.find(x=>x.id===state.cat),items=(state.q?hits:g.items).slice(0,PEEK?12:Infinity);
  const sets=!state.q&&!PEEK&&COMP_COLLECTIONS[g.id],set=sets&&sets.find(x=>x.id===state.coll);
  if(sets&&!set){state.coll='';const s=document.createElement('section');s.className='shelf';s.toggleAttribute('data-enter',enter);s.innerHTML=`<div class="shelf-head"><h2>${g.label}</h2><span>${sets.length} collections</span></div><div class="collections">${sets.map(x=>`<button class="collection" type="button" data-coll="${x.id}" aria-label="Open ${x.name} buttons"><span class="peek art" aria-hidden="true">${x.art}</span><span class="about"><b>${x.name}</b><i>${x.desc}</i></span><span class="formats">${(n=>n+" "+(n===1?g.label.toLowerCase().replace(/(x)es$|s$/,"$1"):g.label.toLowerCase()))(g.items.filter(c=>collectionOf(c)===x.id).length)}</span></button>`).join('')}</div>`;main.append(s);
    const sig=groupIds.join();if(sig!==dockSig){dockSig=sig;for(const b of [...dock.querySelectorAll('button')])b.remove();dock.append(...groups.map((x,i)=>{const b=document.createElement('button');b.type='button';b.dataset.go=i;b.innerHTML=`<span>${x.id==='data-display'?'Data':x.label}</span>`;return b}));measureDock();setDock(groupIds.indexOf(state.cat),true)}else setDock(groupIds.indexOf(state.cat));return}
  const list=set?items.filter(c=>collectionOf(c)===set.id):items;
  const s=document.createElement('section');s.className='shelf';s.toggleAttribute('data-enter',enter);s.style.setProperty('--min',state.q?300:MIN_CARD_WIDTH[g.id]||300);s.innerHTML=`<div class="shelf-head">${set?'<button class="back" type="button" data-back aria-label="All collections"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m14.5 6.5-5.5 5.5 5.5 5.5"/></svg></button>':''}<h2>${state.q?'Results':set?set.name:g.label}</h2><span>${list.length}</span></div><div class="track"></div>`;s.querySelector('.track').append(...list.map(makeCard));
  const cards=s.querySelectorAll('.card');
  if(enter)cards.forEach((card,i)=>card.style.setProperty('--i',Math.min(i,12)));
  main.append(s);
  cards.forEach(card=>previewsInView.observe(card));
  const sig=groupIds.join();if(sig!==dockSig){dockSig=sig;for(const b of [...dock.querySelectorAll('button')])b.remove();dock.append(...groups.map((x,i)=>{const b=document.createElement('button');b.type='button';b.dataset.go=i;b.innerHTML=`<span>${x.id==='data-display'?'Data':x.label}</span>`;return b}));measureDock();setDock(groupIds.indexOf(state.cat),true)}else setDock(groupIds.indexOf(state.cat));
}
function moveSectionKnob(instant){const knob=$('#secKnob'),b=document.querySelector('.sections [aria-current]');if(!knob||!b)return;if(instant)knob.style.transition='none';knob.style.width=b.offsetWidth+'px';knob.style.transform=`translateX(${b.offsetLeft}px)`;if(instant){knob.offsetWidth;knob.style.transition=''}}
function build(initial=false){
  previewsInView.disconnect();
  buildComponents(initial && document.documentElement.classList.contains('enter'));
  moveSectionKnob();
}
function saveUrl(push){const p=new URLSearchParams();if(!state.q&&state.cat&&state.cat!=='buttons')p.set('cat',state.cat);if(!state.q&&state.coll)p.set('coll',state.coll);if(state.q)p.set('q',state.q);if(sheet.dataset.id)p.set('open',sheet.dataset.id);history[push?'pushState':'replaceState'](null,'',location.pathname+(p.size?'?'+p:''))}

const S={active:-1};
const dock=$('#dock'),dockKnob=$('#dockKnob');
// Cache both real states, including the selected font weight and fractional widths.
// Buttons keep their natural widths and scroll rather than shrinking under this cache.
function measureDock(){
  dock.classList.add('still');const btns=[...dock.querySelectorAll('button')];
  btns.forEach(b=>b.classList.remove('on'));
  S.bases=btns.map(b=>b.getBoundingClientRect().width);
  S.dockStart=btns[0]?.offsetLeft||0;
  btns.forEach(b=>b.classList.add('on'));
  S.expanded=btns.map(b=>b.getBoundingClientRect().width);
  btns.forEach(b=>b.classList.remove('on'));S.active=-1;
}
function setDock(i,instant){
  const btns=dock.querySelectorAll('button');if(i<0||i>=btns.length||i===S.active)return;
  S.active=i;btns.forEach((b,n)=>b.classList.toggle('on',n===i));
  const left=S.dockStart+S.bases.slice(0,i).reduce((sum,w)=>sum+w,0);
  dockKnob.style.width=S.expanded[i]+'px';dockKnob.style.transform=`translateX(${left}px)`;
  if(instant){dock.offsetWidth;dock.classList.remove('still')}
  if(dock.scrollWidth>dock.clientWidth){
    const minLeft=left+S.expanded[i]+S.dockStart-dock.clientWidth;
    const maxLeft=left-S.dockStart;
    const nextLeft=Math.max(0,minLeft,Math.min(dock.scrollLeft,maxLeft));
    if(Math.abs(nextLeft-dock.scrollLeft)>1) dock.scrollTo({left:nextLeft,behavior:instant||calm.matches?'instant':'smooth'});
  }
}
function refreshDock(){if(!dock.querySelector('button'))return;measureDock();setDock(groupIds.indexOf(state.cat),true)}
addEventListener('resize',refreshDock,{passive:true});

// Code sheet
const sheet=$('#sheet'),big=$('#sheet-big'),tabsEl=$('#sheet-tabs'),code=$('#sheet-code'),copyBtn=$('#sheet-copy'),zipBtn=$('#sheet-zip');
let sheetSource=null,shown=0,opened=0;
function showDialog(d){document.documentElement.classList.add('modal');d.showModal();if(calm.matches)return;const timing={duration:460,easing:'cubic-bezier(.2,.8,.2,1)'};d.animate([{opacity:0,transform:'translateY(14px) scale(.985)'},{opacity:1,transform:'none'}],timing);d.animate([{opacity:0},{opacity:1}],{...timing,pseudoElement:'::backdrop'})}
function hideDialog(d){if(d._closing||!d.open)return;if(calm.matches){d.close();return}d._closing=true;const timing={duration:240,easing:'ease-in',fill:'forwards'};const a=d.animate([{opacity:1,transform:'none'},{opacity:0,transform:'translateY(8px) scale(.99)'}],timing),b=d.animate([{opacity:1},{opacity:0}],{...timing,pseudoElement:'::backdrop'});// A tab that is not drawing never finishes its animation, so a timer closes the dialog as well.
  const done=()=>{if(!d._closing)return;d._closing=false;d.close();a.cancel();b.cancel()};a.finished.finally(done);setTimeout(done,320)}
function moveKnob(instant){const knob=tabsEl.querySelector('.tabs-knob'),b=tabsEl.querySelector('[aria-selected=true]');if(!knob||!b)return;if(instant)knob.style.transition='none';knob.style.width=b.offsetWidth+'px';knob.style.transform=`translateX(${b.offsetLeft}px)`;if(instant){knob.offsetWidth;knob.style.transition=''}}
function drawTabs(list,current){const knob=document.createElement('span');knob.className='tabs-knob';tabsEl.replaceChildren(knob,...list.map(([label,file])=>{const b=document.createElement('button');b.type='button';b.role='tab';b.textContent=label;b.dataset.file=file;b.setAttribute('aria-selected',String(file===current));return b}))}
// A small colouring pass, one expression for all five formats. The text itself is unchanged, so Copy gives the exact source.
const TOKENS=/(<!--[\s\S]*?-->|\/\*[\s\S]*?\*\/|\/\/[^\n]*)|("(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*'|`(?:[^`\\]|\\.)*`)|(<\/?[a-zA-Z][\w:-]*|\/?>)|\b(import|export|default|from|const|let|var|function|return|if|else|for|while|new|class|async|await|this|true|false|null|undefined)\b|([\w-]+(?==["'{]|\s*:\s))|(#[0-9a-fA-F]{3,8}\b|\b\d+(?:\.\d+)?(?:px|rem|em|ms|s|%|vh|vw|deg)?)/g,TOKEN_CLASS=['c','s','t','k','a','n'];
const esc=t=>t.replace(/[&<>]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;'})[m]);
function paintCode(text){if(text.length>240000){code.textContent=text;return}let html='',at=0;for(const m of text.matchAll(TOKENS)){const kind=m.slice(1).findIndex(Boolean);if(kind<0)continue;html+=esc(text.slice(at,m.index))+`<span class="${TOKEN_CLASS[kind]}">${esc(m[0])}</span>`;at=m.index+m[0].length}code.innerHTML=html+esc(text.slice(at))}
function showSource(file,instant){const mine=++shown;for(const b of tabsEl.querySelectorAll('button'))b.setAttribute('aria-selected',String(b.dataset.file===file));moveKnob(instant);copyBtn.disabled=true;const slow=setTimeout(()=>{if(mine===shown)code.textContent='Preparing source…'},200);Promise.resolve(sheetSource.load(file)).then(text=>{clearTimeout(slow);if(mine!==shown)return;paintCode(text);code.scrollTop=0;copyBtn.disabled=false;if(!calm.matches)code.animate([{opacity:0},{opacity:1}],{duration:260,easing:'ease-out'})}).catch(()=>{clearTimeout(slow);if(mine===shown)code.textContent='This file is not available in this package.'})}
function openComponent(c){
  setFx(copyBtn);setFx(zipBtn);const mine=++opened;sheet.dataset.id=c.id;$('#sheet-title').textContent=c.name;$('#sheet-desc').textContent=c.description||'';big.className='big';big.replaceChildren();code.textContent='';
  sheetSource={component:asChosen(c),load:file=>loadPaletteSource(asChosen(c),palettes.get(c.id)||'white',file),current:state.file};
  drawTabs(FORMATS,state.file);showDialog(sheet);showSource(state.file,true);saveUrl();
  // Let the dialog start rendering before mounting its live preview.
  requestAnimationFrame(()=>{if(mine!==opened||!sheet.open)return;mountBig(c,true)});
}
// The live preview in the window, with palette dots and, when the component has them, its versions.
function mountBig(c,first){
  big.replaceChildren();
  const f=document.createElement('sl-preview');f.setAttribute('variant',variantOf(c));f.setAttribute('aria-label',`${c.name} interactive preview`);f.addEventListener('previewloaded',()=>fitPreview(f,big,c.id));big.append(f);const p=palettes.get(c.id)||'white';setPreviewPalette(f,p);fitPreview(f,big,c.id);if(!calm.matches)f.animate([{opacity:0},{opacity:1}],{duration:first?380:260,easing:'ease-out'});
  const ctl=paletteControls(f,c.name,v=>{palettes.set(c.id,v);const small=document.querySelector(`.card[data-id="${c.id}"] sl-preview`);if(small)setPreviewPalette(small,v);showSource(sheetSource.current)});for(const b of ctl.children)if(b.dataset.palette)b.setAttribute('aria-pressed',String(b.dataset.palette===p));big.append(ctl);
  const list=versionsOf(c);if(list.length<2)return;
  const group=document.createElement('div');group.className='versions';group.setAttribute('role','group');group.setAttribute('aria-label',`${c.name} version`);
  group.innerHTML=list.map(([v,label])=>`<button type="button" data-version="${v}" aria-pressed="${v===variantOf(c)}">${label}</button>`).join('');
  group.addEventListener('click',e=>{const b=e.target.closest('[data-version]');if(!b||b.dataset.version===variantOf(c))return;chosen.set(c.id,b.dataset.version);
    // Swap the window preview and the card preview, then the code and the ZIP follow.
    mountBig(c,false);sheetSource.component=asChosen(c);showSource(sheetSource.current);
    const card=document.querySelector(`.card[data-id="${c.id}"]`),old=card?.querySelector('sl-preview');if(old){old.remove();card.querySelector('.palette-controls')?.remove();wakeCard(card)}});
  big.append(group);
}
sheet.addEventListener('close',()=>{document.documentElement.classList.remove('modal');big.replaceChildren();sheet.dataset.id='';saveUrl()});
$('#help').addEventListener('close',()=>document.documentElement.classList.remove('modal'));
// A click on the backdrop closes the dialog, and Escape leaves as softly as a click.
for(const d of [sheet,$('#help')]){d.addEventListener('click',e=>{if(e.target!==d)return;const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)hideDialog(d)});d.addEventListener('cancel',e=>{e.preventDefault();hideDialog(d)})}
$('#sheet-close').addEventListener('click',()=>hideDialog(sheet));$('#help-close').addEventListener('click',()=>hideDialog($('#help')));$('#how')?.addEventListener('click',()=>showDialog($('#help')));
tabsEl.addEventListener('click',e=>{const b=e.target.closest('[data-file]');if(!b)return;sheetSource.current=b.dataset.file;if(sheetSource.component)state.file=b.dataset.file;showSource(b.dataset.file)});
function setFx(b,state,back){clearTimeout(b._t);if(state)b.dataset.state=state;else delete b.dataset.state;if(back)b._t=setTimeout(()=>setFx(b),back)}
copyBtn.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(code.textContent);setFx(copyBtn,'done',1800)}catch{setFx(copyBtn,'fail',1500)}});
zipBtn.addEventListener('click',async()=>{if(zipBtn.dataset.state==='busy')return;const c=sheetSource.component;setFx(zipBtn,'busy');try{const pack=await loadPalettePackage(c,palettes.get(c.id)||'white'),url=URL.createObjectURL(pack.blob),a=document.createElement('a');a.href=url;a.download=pack.filename;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),30000);setFx(zipBtn,'done',1900)}catch{setFx(zipBtn,'fail',1500)}});

function jumpTo(i){if(groupIds[i]===state.cat){if(state.coll){state.coll='';build();saveUrl(true);scrollTo({top:0,behavior:'instant'})}return}state.cat=groupIds[i];state.coll='';build();saveUrl();scrollTo({top:0,behavior:'instant'});if(!calm.matches)$('#main').animate([{opacity:0,transform:'translateY(8px)'},{opacity:1,transform:'none'}],{duration:380,easing:'cubic-bezier(.2,.8,.2,1)'})}
document.addEventListener('click',e=>{const t=e.target;
  const open=t.closest('[data-open]');if(open){openComponent(byId.get(open.closest('.card').dataset.id));return}
  const coll=t.closest('[data-coll]');if(coll){state.coll=coll.dataset.coll;build();saveUrl(true);scrollTo({top:0,behavior:'instant'});if(!calm.matches)$('#main').animate([{opacity:0,transform:'translateY(8px)'},{opacity:1,transform:'none'}],{duration:380,easing:'cubic-bezier(.2,.8,.2,1)'});return}
  if(t.closest('[data-back]')){state.coll='';state.q='';search.value='';build();saveUrl(true);return}
  const go=t.closest('[data-go]');if(go)jumpTo(+go.dataset.go);
});
addEventListener('popstate',()=>{const p=new URLSearchParams(location.search);state.q=p.get('q')||'';state.coll=p.get('coll')||'';state.cat=p.get('cat')||'buttons';search.value=state.q;build()});

// The library's own search field, with its flying label and suggestions.
const search=$('#q'),field=window.MatteSearchInput.mount($('#search-field'),{items:components.map(c=>c.name)});
let typing;search.addEventListener('input',()=>{clearTimeout(typing);typing=setTimeout(()=>{if(state.q===search.value)return;state.q=search.value;build();saveUrl();scrollTo({top:0,behavior:'instant'})},140)});
$('#finder').addEventListener('submit',e=>{e.preventDefault();field.close?.()});
document.addEventListener('keydown',e=>{const f=!!e.target.matches?.('input,textarea');if(e.key==='/'&&!f&&!document.querySelector('dialog[open]')){e.preventDefault();search.focus();search.select();return}if(e.key==='Escape'&&f)search.blur();if(e.key==='Enter'&&e.target.classList?.contains('card'))openComponent(byId.get(e.target.dataset.id))});

// Keyboard focus can reach a card before the intersection callback runs.
document.addEventListener('focusin',event=>{
  const card=event.target.closest('.card');
  if(card)wakeCard(card);
});

// Copying stays where it is useful: the code and the fields.
document.addEventListener('copy',e=>{if(!e.target.closest?.('.sheet,input,textarea'))e.preventDefault()});
search.value=state.q;build(true);moveSectionKnob(true);document.fonts.ready.then(()=>{if(groupIds.length){measureDock();setDock(groupIds.indexOf(state.cat),true)}moveSectionKnob(true)});
document.querySelector('.sec-link').addEventListener('click',e=>{if(e.button||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;e.preventDefault();const to='./docs.html?enter';if(calm.matches){location.href=to;return}document.documentElement.classList.add('going');setTimeout(()=>{location.href=to},400)});
addEventListener('pageshow',e=>{if(e.persisted)document.documentElement.classList.remove('going')});
let resizing;addEventListener('resize',()=>{clearTimeout(resizing);resizing=setTimeout(()=>{moveSectionKnob(true);if(sheet.open&&sheetSource?.component){const f=big.querySelector('sl-preview');if(f)fitPreview(f,big,sheetSource.component.id)}for(const s of document.querySelectorAll('.shelf'))for(const c of s.querySelectorAll('.card')){const f=c.querySelector('sl-preview');if(f)fitPreview(f,c.querySelector('.stage'),c.dataset.id)}},180)},{passive:true});
const deep=byId.get(params.get('open')||params.get('component'));if(deep)customElements.whenDefined('sl-preview').then(()=>openComponent(deep));
