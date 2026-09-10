import './overlays.js';
const root=document.querySelector('.overlay-demo'),kind=root.dataset.overlay,control=window.SLOverlayInstance,life=new AbortController(),signal=life.signal;
let extraReset=()=>{},animation=null;
const motion=matchMedia('(prefers-reduced-motion:reduce)'),trigger=root.querySelector('[data-trigger]');
let resultAnimation=null,resetResult=()=>{};
// Keep the original icon mounted: no reloads or geometry changes on confirmation.
let presentResult=()=>{};
if(kind!=='document'){
 const label=trigger.querySelector('span'),original=label.textContent,icon=trigger.querySelector('.menu-glyph');
 const stack=document.createElement('i'),check=document.createElementNS('http://www.w3.org/2000/svg','svg'),path=document.createElementNS('http://www.w3.org/2000/svg','path');
 stack.className='trigger-icon-stack';stack.setAttribute('aria-hidden','true');
 check.setAttribute('viewBox','0 0 28 28');check.setAttribute('focusable','false');check.classList.add('trigger-result-check');
 path.setAttribute('d','m6 14 5 5L22 8');path.setAttribute('pathLength','1');check.append(path);
 icon.before(stack);stack.append(icon,check);label.classList.add('trigger-result-label');
 presentResult=(text)=>{
  resultAnimation?.cancel();label.textContent=text;trigger.title=text;
  trigger.dataset.result='true';
  if(!motion.matches)resultAnimation=label.animate([{opacity:.3,transform:'translateY(3px)'},{opacity:1,transform:'translateY(0)'}],{duration:240,easing:'cubic-bezier(.2,.7,.2,1)'});
 };
 resetResult=()=>{resultAnimation?.cancel();label.textContent=original;trigger.removeAttribute('title');delete trigger.dataset.result;};
 root.addEventListener('overlaycommit',e=>{
  if(kind==='confirm')presentResult('Project archived');
  else if(kind==='quickedit')presentResult('Project renamed');
 },{signal});
}
function fade(node){animation?.cancel();if(matchMedia('(prefers-reduced-motion:reduce)').matches)return;animation=node.animate([{opacity:.55},{opacity:1}],{duration:180,easing:'ease-out'});}
if(kind==='palette'){
 const search=root.querySelector('[data-search]'),items=[...root.querySelectorAll('[data-command]')],empty=root.querySelector('[data-empty]');let selected=0;
 const visible=()=>items.filter(n=>!n.hidden);
 function mark(i){const list=visible();selected=Math.max(0,Math.min(list.length-1,i));items.forEach(n=>n.dataset.active=String(n===list[selected]));}
 function filter(){const query=search.value.trim().toLowerCase();items.forEach(n=>n.hidden=!n.textContent.toLowerCase().includes(query));empty.hidden=visible().length>0;mark(0);}
 search.addEventListener('input',filter,{signal});
 items.forEach((b,i)=>{b.addEventListener('click',()=>{root.querySelector('[data-feedback]').textContent=b.dataset.command+' selected in this preview.';presentResult(b.dataset.command);root.dispatchEvent(new CustomEvent('overlayaction',{bubbles:true,detail:{value:b.dataset.command}}));control.close();},{signal});b.addEventListener('focus',()=>mark(visible().indexOf(b)),{signal});});
 root.addEventListener('keydown',e=>{if(root.dataset.open!=='true')return;const list=visible();if(!list.length)return;if(['ArrowDown','ArrowUp','Home','End'].includes(e.key)){e.preventDefault();mark(e.key==='Home'?0:e.key==='End'?list.length-1:(selected+(e.key==='ArrowDown'?1:-1)+list.length)%list.length);list[selected].focus();}else if(e.key==='Enter'&&e.target===search){e.preventDefault();list[selected].click();}},{signal});
 extraReset=()=>{search.value='';filter();};filter();
}else if(kind==='document'){
 const paper=root.querySelector('[data-paper]'),first=paper.innerHTML,previous=root.querySelector('[data-page-back]'),next=root.querySelector('[data-page-next]');let page=0;
 const second='<span>STUDIO / NEXT STEPS</span><h3>Build with intention.</h3><p>Keep the path clear. Start with the smallest useful version and refine it through real interaction.</p><h4>What comes next</h4><p>Explore the prototype, share your observations and make the next detail a little better.</p>';
 function paint(value){page=value;paper.innerHTML=page?second:first;paper.scrollTop=0;previous.disabled=!page;next.disabled=Boolean(page);root.querySelector('[data-page-count]').textContent=(page+1)+' / 2';fade(paper);}
 previous.addEventListener('click',()=>{paint(0);next.focus();},{signal});next.addEventListener('click',()=>{paint(1);previous.focus();},{signal});extraReset=()=>paint(0);
}else if(kind==='tour'){
 const text=[['A place for your work.','Switch between projects and keep your ideas together.'],['Keep files close.','Open a brief without losing your place in the workspace.'],['Return to what matters.','Pin useful details and come back whenever you need them.']];let step=0,completed=false;
 const back=root.querySelector('[data-tour-back]'),next=root.querySelector('[data-tour-next]');
 function paint(i){step=i;root.querySelectorAll('[data-tour-target]').forEach((n,j)=>n.dataset.highlight=String(i===j));root.querySelector('[data-tour-title]').textContent=text[i][0];root.querySelector('[data-tour-description]').textContent=text[i][1];root.querySelector('[data-tour-count]').textContent='STEP '+(i+1)+' OF 3';back.disabled=!i;next.textContent=i===2?'Finish':'Next';fade(root.querySelector('.tour-copy'));}
 const open=control.open.bind(control);
 control.open=()=>{if(signal.aborted)return;if(completed){completed=false;paint(0);}return open();};
 // The shared click handler owns its own open closure; reset before that handler runs.
 trigger.addEventListener('click',()=>{if(completed){completed=false;paint(0);}},{signal,capture:true});
 back.addEventListener('click',()=>{paint(Math.max(0,step-1));if(!step)next.focus();},{signal});next.addEventListener('click',()=>{if(step===2){completed=true;root.querySelector('[data-feedback]').textContent='Tour complete. Click again to replay.';presentResult('Tour complete');root.dispatchEvent(new CustomEvent('overlaytourcomplete',{bubbles:true}));control.close();}else paint(step+1);},{signal});extraReset=()=>{completed=false;paint(0);};paint(0);
}
const reset=control.reset.bind(control);control.reset=()=>{reset();extraReset();resetResult();animation?.cancel();};
const destroy=control.destroy.bind(control);
control.destroy=()=>{life.abort();animation?.cancel();resultAnimation?.cancel();destroy();};
motion.addEventListener('change',e=>{if(e.matches){animation?.cancel();resultAnimation?.cancel();}},{signal});
window.addEventListener('pagehide',e=>{if(!e.persisted){life.abort();animation?.cancel();resultAnimation?.cancel();}});
