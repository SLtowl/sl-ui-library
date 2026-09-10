(() => {
function mount(element){
const life=new AbortController(),signal=life.signal,controls=new Map(),observers=[],animations=new Map();
const motion=matchMedia('(prefers-reduced-motion: reduce)');
function reveal(node){animations.get(node)?.cancel();if(motion.matches)return;const a=node.animate([{opacity:.55},{opacity:1}],{duration:180,easing:'ease-out'});animations.set(node,a);a.onfinish=()=>animations.delete(node);}
function current(buttons,index,token){buttons.forEach((b,i)=>{if(i===index)b.setAttribute('aria-current',token);else b.removeAttribute('aria-current');});}
for(const root of [element]){
 const kind=root.dataset.navigation;
 if(kind==='steps'){
  const buttons=[...root.querySelectorAll('[data-step]')],copy=root.querySelector('[data-step-copy]'),back=root.querySelector('[data-back]'),forward=root.querySelector('[data-forward]'),initialForward=forward.innerHTML;let step=0;
  const text=[['Give your idea a home.','Start with a clear project brief and a little room to explore.'],['Make it feel like you.','Choose the details that give your project its own character.'],['Ready for a closer look.','Take a final pass through your work before the next chapter.']];
  function select(i,animate=true){step=Math.max(0,Math.min(2,i));current(buttons,step,'step');root.style.setProperty('--step-progress',step/2);buttons.forEach((b,j)=>b.dataset.complete=String(j<step));back.disabled=step===0;forward.innerHTML=step===2?'Start again':initialForward;copy.innerHTML='<h3>'+text[step][0]+'</h3><p>'+text[step][1]+'</p>';if(animate)reveal(copy);}
  buttons.forEach((b,i)=>b.addEventListener('click',()=>{if(i!==step)select(i);},{signal}));back.addEventListener('click',()=>{select(step-1);if(back.disabled)buttons[0].focus();},{signal});forward.addEventListener('click',()=>select(step===2?0:step+1),{signal});select(0,false);controls.set(kind,()=>select(0));
 }else if(kind==='dock'){
  const buttons=[...root.querySelectorAll('[data-dock]')],dock=root.querySelector('.bottom-dock'),content=root.querySelector('[data-dock-content]');let selected=0;
  const text=[['Your workspace','A quiet place for your next project.'],['Pick up where you left off','Your latest work, always close at hand.'],['Worth keeping','The ideas you want to come back to.']];
  function position(){dock.style.setProperty('--dock-x',buttons[selected].offsetLeft+'px');dock.style.setProperty('--dock-width',buttons[selected].offsetWidth+'px');}
  function select(i,animate=true){selected=i;current(buttons,i,'page');position();content.innerHTML=buttons[i].querySelector('.menu-glyph').outerHTML+'<h3>'+text[i][0]+'</h3><p>'+text[i][1]+'</p>';if(animate)reveal(content);}
  buttons.forEach((b,i)=>b.addEventListener('click',()=>{if(i!==selected)select(i);},{signal}));const o=new ResizeObserver(position);o.observe(dock);observers.push(o);select(0,false);controls.set(kind,()=>select(0));
 }else if(kind==='sections'){
  const buttons=[...root.querySelectorAll('[data-jump]')],pane=root.querySelector('.reading-pane'),sections=[...pane.querySelectorAll('section')];
  const offset=i=>sections[i].getBoundingClientRect().top-pane.getBoundingClientRect().top+pane.scrollTop;
  function sync(){let active=0;sections.forEach((s,i)=>{if(offset(i)<=pane.scrollTop+35)active=i;});current(buttons,active,'location');}
  buttons.forEach((b,i)=>b.addEventListener('click',()=>pane.scrollTo({top:offset(i),behavior:motion.matches?'instant':'smooth'}),{signal}));pane.addEventListener('scroll',sync,{signal,passive:true});const o=new ResizeObserver(sync);o.observe(pane);observers.push(o);sync();controls.set(kind,()=>{pane.scrollTo({top:0,behavior:'instant'});current(buttons,0,'location');});
 }else if(kind==='carousel'){
  const buttons=[...root.querySelectorAll('[data-slide]')],slides=[...root.querySelectorAll('.collection-slide')],window=root.querySelector('.collection-window'),prev=root.querySelector('[data-prev-slide]'),next=root.querySelector('[data-next-slide]');let slide=0,start=null;
  function select(i){slide=Math.max(0,Math.min(2,i));root.style.setProperty('--slide',slide);current(buttons,slide,'true');slides.forEach((s,j)=>{s.inert=j!==slide;s.setAttribute('aria-hidden',String(j!==slide));});prev.disabled=slide===0;next.disabled=slide===2;root.querySelector('[data-slide-status]').textContent=slides[slide].querySelector('h3').textContent+', '+(slide+1)+' of 3';}
  buttons.forEach((b,i)=>b.addEventListener('click',()=>select(i),{signal}));prev.addEventListener('click',()=>{select(slide-1);if(prev.disabled)window.focus();},{signal});next.addEventListener('click',()=>{select(slide+1);if(next.disabled)window.focus();},{signal});
  window.addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;e.preventDefault();select(e.key==='Home'?0:e.key==='End'?2:slide+(e.key==='ArrowRight'?1:-1));},{signal});
  window.addEventListener('pointerdown',e=>{if(!e.isPrimary||e.button!==0)return;start={x:e.clientX,y:e.clientY,id:e.pointerId};window.setPointerCapture(e.pointerId);},{signal});
  window.addEventListener('pointerup',e=>{if(!start||start.id!==e.pointerId)return;const dx=e.clientX-start.x,dy=e.clientY-start.y;start=null;if(Math.abs(dx)>35&&Math.abs(dx)>Math.abs(dy)*1.25)select(slide+(dx<0?1:-1));},{signal});
  window.addEventListener('pointercancel',()=>start=null,{signal});window.addEventListener('lostpointercapture',()=>start=null,{signal});controls.set(kind,()=>{start=null;select(0);});
 }else if(kind==='tree'){
  const tree=root.querySelector('[role=tree]'),items=[...tree.querySelectorAll('[role=treeitem]')],branches=[...tree.querySelectorAll('[data-branch]')],files=[...tree.querySelectorAll('[data-file]')];
  function focus(item){items.forEach(n=>n.tabIndex=n===item?0:-1);item.focus({preventScroll:true});}
  function expand(branch,value,animate=true){
   const group=branch.querySelector('[role=group]');
   // Read the displayed frame before cancelling, so reversing a transition never jumps.
   const height=group.hidden?0:group.getBoundingClientRect().height;
   const opacity=group.hidden?0:Number(getComputedStyle(group).opacity);
   animations.get(group)?.cancel();animations.delete(group);
   if(!value&&group.contains(document.activeElement))focus(branch);
   branch.setAttribute('aria-expanded',String(value));
   group.inert=!value;group.setAttribute('aria-hidden',String(!value));group.hidden=false;
   const target=value?group.scrollHeight:0;
   const settle=()=>{group.hidden=!value;group.style.removeProperty('overflow');};
   if(!animate||motion.matches||Math.abs(height-target)<.1){settle();return;}
   group.style.overflow='hidden';
   const a=group.animate([{height:height+'px',opacity},{height:target+'px',opacity:value?1:0}],{duration:320,easing:'cubic-bezier(.22,.61,.36,1)',fill:'both'});
   animations.set(group,a);
   a.onfinish=()=>{if(animations.get(group)!==a)return;settle();a.cancel();animations.delete(group);};
  }
  branches.forEach(b=>expand(b,b.getAttribute('aria-expanded')==='true',false));
  motion.addEventListener('change',()=>{if(motion.matches)branches.forEach(b=>expand(b,b.getAttribute('aria-expanded')==='true',false));},{signal});
  function choose(item){files.forEach(n=>n.setAttribute('aria-selected',String(n===item)));root.querySelector('[data-file-name]').textContent=item.getAttribute('aria-label');root.querySelector('[data-file-description]').textContent=item.dataset.description;reveal(root.querySelector('.tree-detail'));}
  tree.addEventListener('click',e=>{const item=e.target.closest('[role=treeitem]');if(!item)return;focus(item);if(item.hasAttribute('data-branch'))expand(item,item.getAttribute('aria-expanded')!=='true');else choose(item);},{signal});
  tree.addEventListener('keydown',e=>{const item=e.target.closest('[role=treeitem]');if(!item)return;const visible=items.filter(n=>!n.closest('[hidden],[inert]')),i=visible.indexOf(item),branch=item.hasAttribute('data-branch');
   if(['ArrowDown','ArrowUp','Home','End'].includes(e.key)){e.preventDefault();focus(visible[e.key==='Home'?0:e.key==='End'?visible.length-1:Math.max(0,Math.min(visible.length-1,i+(e.key==='ArrowDown'?1:-1)))]);}
   else if(e.key==='ArrowRight'){e.preventDefault();if(branch){if(item.getAttribute('aria-expanded')==='true')focus(item.querySelector('[data-file]'));else expand(item,true);}}
   else if(e.key==='ArrowLeft'){e.preventDefault();if(branch)expand(item,false);else focus(item.parentElement.closest('[data-branch]'));}
   else if(['Enter',' '].includes(e.key)){e.preventDefault();if(branch)expand(item,item.getAttribute('aria-expanded')!=='true');else choose(item);}
  },{signal});
  controls.set(kind,()=>{branches.forEach((b,i)=>expand(b,i===0,false));items.forEach((n,i)=>n.tabIndex=i===0?0:-1);files.forEach(n=>n.setAttribute('aria-selected','false'));root.querySelector('[data-file-name]').textContent='Select a file';root.querySelector('[data-file-description]').textContent='Explore a folder above.';});
 }
 const frame=requestAnimationFrame(()=>root.dataset.ready='true');signal.addEventListener('abort',()=>cancelAnimationFrame(frame),{once:true});
}

motion.addEventListener('change',()=>{if(motion.matches){animations.forEach(a=>a.cancel());animations.clear();}},{signal});
return {reset(){controls.get(element.dataset.navigation)?.();},destroy(){life.abort();observers.forEach(o=>o.disconnect());animations.forEach(a=>a.cancel());animations.clear();}};
}
window.MatteNavigation = { mount };
})();
