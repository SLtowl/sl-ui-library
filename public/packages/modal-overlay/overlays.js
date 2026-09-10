import './pin.js';
import {createGenie} from './genie.js';
const mounted=new WeakMap();
export function mountOverlay(root,{onCommit}={}){
 if(mounted.has(root))return mounted.get(root);
 const doc=root.ownerDocument,view=doc.defaultView,life=new AbortController(),signal=life.signal;
 const trigger=root.querySelector('[data-trigger]'),panel=root.querySelector('.overlay-panel'),feedback=root.querySelector('[data-feedback]'),form=root.querySelector('form'),kind=root.dataset.overlay;
 const modal=panel.tagName==='DIALOG',tip=kind==='tooltip',initialFeedback=feedback.textContent,media=view.matchMedia('(prefers-reduced-motion: reduce)');
 const genie=kind==='modal'?createGenie(root,panel,trigger,media):null;
 let opened=false,destroyed=false,revision=0,hoverTrigger=false,hoverTip=false,focused=false,pinned=false,dismissed=false,showTimer,hideTimer,drag=null,backdropDown=false;
 function clearTimers(){view.clearTimeout(showTimer);view.clearTimeout(hideTimer);}
 function position(){
  if(kind==='modal'&&panel.open){
   const button=trigger.getBoundingClientRect();
   panel.style.setProperty('--window-origin-x',(button.left+button.width/2-panel.offsetLeft)+'px');
   panel.style.setProperty('--window-origin-y',(button.top+button.height/2-panel.offsetTop)+'px');
  }
  if(modal)return;
  const r=root.getBoundingClientRect(),b=trigger.getBoundingClientRect(),p=panel.getBoundingClientRect();
  const left=Math.max(12,Math.min(b.x-r.x+(b.width-p.width)/2,r.width-p.width-12));
  const above=b.top-r.top-p.height-12,below=b.bottom-r.top+12;
  const top=above>=12?above:Math.min(below,r.height-p.height-12);
  panel.dataset.placement=above>=12?'above':'below';panel.style.left=left+'px';panel.style.top=Math.max(12,top)+'px';panel.style.setProperty('--arrow-x',Math.max(14,Math.min(p.width-14,b.x-r.x+b.width/2-left))+'px');
 }
 function open(){
  if(destroyed)return;clearTimers();revision++;opened=true;
  if(modal&&!panel.open){panel.inert=false;panel.showModal();panel.getBoundingClientRect();}
  panel.inert=false;panel.removeAttribute('aria-hidden');position();root.dataset.open='true';
  genie?.run(1);
  if(!tip)trigger.setAttribute('aria-expanded','true');
  if(!tip){
   const field=panel.querySelector('input');
   (field||panel.querySelector('[data-close]'))?.focus({preventScroll:true});
   if(field?.name==='project')field.select();
  }
 }
 function close({restoreFocus=true,instant=false}={}){
  clearTimers();const token=++revision;opened=false;root.dataset.open='false';
  if(!tip)trigger.setAttribute('aria-expanded','false');
  if(modal){
   if(!panel.open)return;
   panel.inert=true;
   const finish=()=>{
    if(destroyed||opened||revision!==token)return;
    const returnFocus=restoreFocus&&doc.hasFocus(),disabled=trigger.disabled;
    // Native close() restores the opener even after the user moved to another iframe.
    // Temporarily make it unfocusable, then explicitly restore only in the active preview.
    trigger.disabled=true;panel.close();trigger.disabled=disabled;panel.inert=false;
    if(returnFocus&&!disabled)trigger.focus({preventScroll:true});
   };
   if(genie){genie.run(0,instant).then(finish);}else if(instant||media.matches)finish();else Promise.allSettled(panel.getAnimations().map(a=>a.finished)).then(finish);
  }else{
   if(!tip&&panel.contains(doc.activeElement)&&restoreFocus)trigger.focus({preventScroll:true});
   panel.inert=!tip;panel.setAttribute('aria-hidden','true');
  }
 }
 trigger.addEventListener('click',()=>{
  if(tip){pinned=!pinned;dismissed=!pinned;pinned?open():close();return;}
  if(opened)close();else open();
 },{signal});
 panel.querySelectorAll('[data-close]').forEach(b=>b.addEventListener('click',()=>close(),{signal}));
 if(modal){
  const outside=e=>{const r=panel.getBoundingClientRect();return e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom;};
  panel.addEventListener('cancel',e=>{e.preventDefault();close();},{signal});
  panel.addEventListener('keydown',e=>{
   if(e.key!=='Tab'||!opened)return;
   const stops=[...panel.querySelectorAll('button,input,select,textarea,[tabindex]')].filter(n=>!n.disabled&&n.tabIndex>=0&&n.getClientRects().length);
   const first=stops[0],last=stops.at(-1);
   if((e.shiftKey&&doc.activeElement===first)||(!e.shiftKey&&doc.activeElement===last)){e.preventDefault();(e.shiftKey?last:first)?.focus({preventScroll:true});}
  },{signal});
  panel.addEventListener('pointerdown',e=>backdropDown=e.target===panel&&outside(e),{signal});
  panel.addEventListener('click',e=>{if(backdropDown&&e.target===panel&&outside(e))close();backdropDown=false;},{signal});
  panel.addEventListener('close',()=>{if(panel.open||!opened)return;opened=false;root.dataset.open='false';trigger.setAttribute('aria-expanded','false');},{signal});
 }else{
  doc.addEventListener('pointerdown',e=>{if(opened&&!panel.contains(e.target)&&!trigger.contains(e.target)){pinned=false;dismissed=true;close({restoreFocus:false});}},{signal});
  doc.addEventListener('keydown',e=>{if(e.key==='Escape'&&opened){e.preventDefault();pinned=false;dismissed=true;close();}},{signal});
  if(!tip){
   root.addEventListener('focusout',e=>{if(opened&&e.relatedTarget&&!root.contains(e.relatedTarget))close({restoreFocus:false});},{signal});
   view.addEventListener('blur',()=>{if(opened)close({restoreFocus:false});},{signal});
  }
 }
 if(tip){
  const hideIfAway=()=>{view.clearTimeout(hideTimer);hideTimer=view.setTimeout(()=>{if(!hoverTrigger&&!hoverTip&&!focused&&!pinned)close({restoreFocus:false});},140);};
  trigger.addEventListener('pointerenter',e=>{if(e.pointerType==='touch')return;hoverTrigger=true;dismissed=false;view.clearTimeout(hideTimer);showTimer=view.setTimeout(()=>{if(hoverTrigger&&!dismissed)open();},180);},{signal});
  trigger.addEventListener('pointerleave',()=>{hoverTrigger=false;view.clearTimeout(showTimer);hideIfAway();},{signal});
  trigger.addEventListener('focus',()=>{focused=true;dismissed=false;open();},{signal});
  trigger.addEventListener('blur',()=>{focused=false;hideIfAway();},{signal});
  panel.addEventListener('pointerenter',()=>{hoverTip=true;view.clearTimeout(hideTimer);},{signal});
  panel.addEventListener('pointerleave',()=>{hoverTip=false;hideIfAway();},{signal});
 }
 form?.addEventListener('submit',e=>{
  e.preventDefault();const project=form.elements.namedItem('project');
  if(project){project.value=project.value.trim();if(!project.reportValidity())return;}
  const values=Object.fromEntries(new view.FormData(form));
  feedback.textContent=kind==='modal'?values.project+' created in this preview.':kind==='drawer'?values.project+' · '+values.status+' · Saved locally.':values.collection+' selected in this preview.';
  if(root.dataset.success)feedback.textContent=root.dataset.success.replace(/\{(\w+)\}/g,(_,key)=>values[key]||'');
  root.dispatchEvent(new view.CustomEvent('overlaycommit',{bubbles:true,detail:values}));onCommit?.(values);close();
 },{signal});
 const pin=root.querySelector('[data-pin]');
 const pinControl=pin?view.MatteCheckboxes.mount(pin):null;
 const handle=root.querySelector('[data-drag-handle]');
 if(handle){
  function resetDrag(){drag=null;delete root.dataset.dragging;root.style.removeProperty('--drag-y');}
  handle.addEventListener('pointerdown',e=>{if(!e.isPrimary||e.button!==0||!opened)return;drag={id:e.pointerId,y:e.clientY,dy:0};root.dataset.dragging='true';handle.setPointerCapture(e.pointerId);},{signal});
  handle.addEventListener('pointermove',e=>{if(!drag||drag.id!==e.pointerId)return;drag.dy=Math.max(0,e.clientY-drag.y);root.style.setProperty('--drag-y',drag.dy+'px');},{signal});
  handle.addEventListener('pointerup',()=>{if(!drag)return;const dismiss=drag.dy>55;resetDrag();if(dismiss)close();},{signal});
  handle.addEventListener('pointercancel',resetDrag,{signal});handle.addEventListener('lostpointercapture',resetDrag,{signal});
 }
 const observer=new view.ResizeObserver(()=>{if(opened)position();});observer.observe(root);observer.observe(panel);
 media.addEventListener('change',()=>{if(!media.matches)return;if(genie&&opened)genie.run(1,true);if(!opened&&modal&&panel.open)close({instant:true});},{signal});
 function reset(){pinned=false;dismissed=true;hoverTrigger=hoverTip=focused=false;drag=null;delete root.dataset.dragging;root.style.removeProperty('--drag-y');close({instant:true,restoreFocus:root.contains(doc.activeElement)});form?.reset();feedback.textContent=initialFeedback;pinControl?.reset();}
 const controller={open,close,reset,destroy(){reset();if(modal&&panel.open)panel.close();genie?.destroy();pinControl?.destroy();destroyed=true;revision++;clearTimers();observer.disconnect();life.abort();mounted.delete(root);}};
 mounted.set(root,controller);return controller;
}
window.SLOverlayInstance=mountOverlay(document.querySelector('.overlay-demo'));
window.addEventListener('pagehide',e=>{if(!e.persisted)window.SLOverlayInstance.destroy();});
