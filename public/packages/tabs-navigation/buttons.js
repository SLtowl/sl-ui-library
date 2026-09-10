(() => {
function mount(element){
const life=new AbortController(),signal=life.signal;
const motion=matchMedia('(prefers-reduced-motion: reduce)');
const animations=new Map(),controls=new Map(),observers=[];
function reveal(node){
 animations.get(node)?.cancel();
 if(motion.matches)return;
 const animation=node.animate([{opacity:.5,transform:'translateY(4px)'},{opacity:1,transform:'translateY(0)'}],{duration:180,easing:'cubic-bezier(.22,.61,.36,1)'});
 animations.set(node,animation);animation.onfinish=()=>animations.delete(node);
}
// Reuse our embedded contours; there is no remote icon request or stock library.
const icons={"file":"<i class=\"menu-glyph \" data-icon=\"file\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"M7 4h10l6 6v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm10 0v6h6\"/></svg></i>","folder":"<i class=\"menu-glyph \" data-icon=\"folder\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"M4.5 9a2 2 0 0 1 2-2h5l2.5 3h7.5a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-15a2 2 0 0 1-2-2Z\"/></svg></i>","chevron":"<i class=\"menu-glyph \" data-icon=\"chevron\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"m8 11 6 6 6-6\"/></svg></i>","pin":"<i class=\"menu-glyph \" data-icon=\"pin\" aria-hidden=\"true\"><svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\"><path d=\"m17 4 7 7c-4 0-6 2-7 7l-3-3-5 1-4-4c5-1 7-3 7-7l5-1ZM10 18l-6 6\"/></svg></i>"};
const row=(name,sub)=>'<div class="document-row">'+icons.file+'<div><strong>'+name+'</strong><small>'+sub+'</small></div></div>';
for(const root of [element]){
 const kind=root.dataset.navigation;
 if(['tabs','views'].includes(kind)){
  const track=root.querySelector('.nav-track'),buttons=[...track.querySelectorAll('[role=tab]')],panels=[...root.querySelectorAll('[role=tabpanel]')];let selected=0;
  function position(){const b=buttons[selected];track.style.setProperty('--indicator-x',b.offsetLeft+'px');track.style.setProperty('--indicator-width',b.offsetWidth+'px');}
  function select(i,animate=true){selected=i;buttons.forEach((b,j)=>{b.setAttribute('aria-selected',String(i===j));b.tabIndex=i===j?0:-1;panels[j].hidden=i!==j;animations.get(panels[j])?.cancel();});position();if(animate)reveal(panels[i]);}
  buttons.forEach((b,i)=>b.addEventListener('click',()=>{if(i!==selected)select(i);},{signal}));
  track.addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;e.preventDefault();const i=e.key==='Home'?0:e.key==='End'?buttons.length-1:(selected+(e.key==='ArrowRight'?1:-1)+buttons.length)%buttons.length;select(i);buttons[i].focus();},{signal});
  const observer=new ResizeObserver(position);observer.observe(track);observers.push(observer);select(0,false);controls.set(kind,()=>select(0));
 }else if(kind==='breadcrumbs'){
  const trail=root.querySelector('[data-trail]'),body=root.querySelector('[data-folder-content]'),note=root.querySelector('[data-folder-note]');let depth=1;
  const paths=['Studio','Projects','Design'];
  function paint(focus=false){
   trail.innerHTML=paths.slice(0,depth+1).map((name,i)=>'<li>'+(i?icons.chevron:'')+(i===depth?'<span aria-current="page">'+name+'</span>':'<button type="button" data-depth="'+i+'">'+name+'</button>')+'</li>').join('');
   body.innerHTML=depth===0?'<button type="button" class="trail-folder" data-drill>'+icons.folder+'<span>Projects</span>'+icons.chevron+'</button>':depth===1?'<button type="button" class="trail-folder" data-drill>'+icons.folder+'<span>Design</span>'+icons.chevron+'</button>'+row('Project brief','Document'):row('Color palette','Design document')+row('Components','Design document');
   note.textContent=depth===2?'Two files in Design.':'Open a folder to explore.';reveal(body);
   if(focus){const target=body.querySelector('button')||[...trail.querySelectorAll('button')].at(-1);target?.focus({preventScroll:true});}
  }
  root.addEventListener('click',e=>{const parent=e.target.closest('[data-depth]'),child=e.target.closest('[data-drill]');if(parent)depth=Number(parent.dataset.depth);else if(child)depth=Math.min(2,depth+1);else return;paint(true);},{signal});
  paint();controls.set(kind,()=>{depth=1;paint();});
 }else if(kind==='pages'){
  const buttons=[...root.querySelectorAll('[data-page]')],track=root.querySelector('.page-numbers'),previous=root.querySelector('[data-previous]'),next=root.querySelector('[data-next]'),files=root.querySelector('[data-page-files]');let page=1;
  const names=['Project brief','Research notes','Color palette','Typography','Components','Wireframes','Prototype','Motion study','Review notes','Final handoff'];
  function position(){track.style.setProperty('--page-x',buttons[page-1].offsetLeft+'px');}
  function select(n,animate=true){page=Math.max(1,Math.min(5,n));buttons.forEach((b,i)=>{if(i+1===page)b.setAttribute('aria-current','page');else b.removeAttribute('aria-current');});previous.disabled=page===1;next.disabled=page===5;root.querySelector('[data-page-summary]').textContent=(page*2-1)+'–'+(page*2)+' of 10';files.innerHTML=names.slice((page-1)*2,page*2).map(name=>row(name,'Studio project')).join('');position();if(animate)reveal(files);}
  buttons.forEach((b,i)=>b.addEventListener('click',()=>{if(page!==i+1)select(i+1);},{signal}));previous.addEventListener('click',()=>{select(page-1);if(previous.disabled)buttons[0].focus();},{signal});next.addEventListener('click',()=>{select(page+1);if(next.disabled)buttons[4].focus();},{signal});
  const observer=new ResizeObserver(position);observer.observe(track);observers.push(observer);select(1,false);controls.set(kind,()=>select(1));
 }else if(kind==='sidebar'){
  const buttons=[...root.querySelectorAll('[data-section]')],content=root.querySelector('[data-side-content]'),toggle=root.querySelector('[data-collapse]');let selected=0;
  const sections=[['Projects','A place for your next idea.','Three active projects','folder'],['Files','Everything you need, together.','Ten project files','file'],['Saved','Keep the details that matter.','Four saved items','pin']];
  function select(i,animate=true){selected=i;buttons.forEach((b,j)=>{if(i===j)b.setAttribute('aria-current','page');else b.removeAttribute('aria-current');});root.style.setProperty('--side-y',i*44+'px');const [title,desc,count,icon]=sections[i];content.innerHTML=icons[icon]+'<h3>'+title+'</h3><p>'+desc+'</p><small>'+count+'</small>';if(animate)reveal(content);}
  function collapse(value){root.dataset.collapsed=String(value);toggle.setAttribute('aria-expanded',String(!value));toggle.setAttribute('aria-label',value?'Expand navigation':'Collapse navigation');}
  buttons.forEach((b,i)=>b.addEventListener('click',()=>{if(i!==selected)select(i);},{signal}));toggle.addEventListener('click',()=>collapse(root.dataset.collapsed!=='true'),{signal});select(0,false);controls.set(kind,()=>{collapse(false);select(0);});
 }
 const frame=requestAnimationFrame(()=>root.dataset.ready='true');signal.addEventListener('abort',()=>cancelAnimationFrame(frame),{once:true});
}

motion.addEventListener('change',()=>{if(motion.matches){animations.forEach(a=>a.cancel());animations.clear();}},{signal});
return {reset(){controls.get(element.dataset.navigation)?.();},destroy(){life.abort();observers.forEach(o=>o.disconnect());animations.forEach(a=>a.cancel());animations.clear();}};
}
window.MatteNavigation = { mount };
})();
