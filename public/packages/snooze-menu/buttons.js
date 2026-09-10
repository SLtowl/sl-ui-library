(() => {
const mounted=new WeakMap();
function mountMenuStudy(root,{onSelect}={}){
 if(mounted.has(root))return mounted.get(root);
 const life=new AbortController(),signal=life.signal,doc=root.ownerDocument,view=doc.defaultView;
 const trigger=root.querySelector('[data-trigger]'),panel=root.querySelector('.menu-panel'),feedback=root.querySelector('[data-feedback]'),label=root.querySelector('[data-trigger-label]'),search=root.querySelector('input[type="search"]');
 const kind=root.dataset.menu,choices=[...root.querySelectorAll('[data-value]')],initialLabel=label.textContent,initialFeedback=feedback.textContent;
 const defaults=choices.map(n=>n.getAttribute('aria-checked'));
 const initialValues=choices.filter(n=>n.getAttribute('aria-checked')==='true').map(n=>n.dataset.value);
 let committed=[...initialValues],opened=false,destroyed=false,typeTimer,buffer='';
 const active=()=>[...panel.querySelectorAll('button')].filter(n=>!n.disabled&&!n.hidden&&!n.closest('[inert],[hidden]'));
 function mark(values){choices.forEach(n=>{if(n.hasAttribute('aria-checked'))n.setAttribute('aria-checked',String(values.includes(n.dataset.value)));});}
 function close(focus=false){opened=false;root.dataset.open='false';trigger.setAttribute('aria-expanded','false');panel.inert=true;panel.setAttribute('aria-hidden','true');if(root.dataset.confirm)mark(committed);if(focus)trigger.focus({preventScroll:true});}
 function open(focus=false,last=false){if(destroyed||trigger.disabled)return;opened=true;root.dataset.open='true';trigger.setAttribute('aria-expanded','true');panel.inert=false;panel.setAttribute('aria-hidden','false');if(focus)(search||(last?active().at(-1):active()[0]))?.focus({preventScroll:true});}
 function finish(value,name,message,closeMenu=false){
  committed=[value];mark(committed);
  if(kind==='appearance')root.dataset.appearance=value;
  if(!['move','snooze','insert','export'].includes(kind))label.textContent=name;
  feedback.textContent=message||name+' selected in this preview.';
  if(kind==='insert'){
   choices.forEach(n=>n.setAttribute('aria-current',String(n.dataset.value===value)));
   label.textContent='Insert '+name.toLowerCase();
  }
  if(closeMenu)close(true);
  root.dispatchEvent(new view.CustomEvent('menuselect',{bubbles:true,detail:{value,values:[value]}}));
  onSelect?.([value]);
 }
 trigger.addEventListener('click',e=>opened?close():open(e.detail===0||!!search),{signal});
 trigger.addEventListener('keydown',e=>{if(['ArrowDown','ArrowUp'].includes(e.key)){e.preventDefault();open(true,e.key==='ArrowUp');}},{signal});
 choices.forEach(n=>n.addEventListener('click',()=>{
  const value=n.dataset.value,name=n.dataset.label;
  if(root.dataset.confirm){mark([value]);return;}
  finish(value,name,kind==='insert'?name+' block inserted in this preview.':kind==='snooze'?name+' selected. No reminder is scheduled.':undefined);
 },{signal}));
 root.querySelector('[data-apply]')?.addEventListener('click',()=>{
  const chosen=choices.find(n=>n.getAttribute('aria-checked')==='true');if(!chosen)return;
  finish(chosen.dataset.value,chosen.dataset.label,kind==='export'?chosen.dataset.label+' export preview complete. Nothing downloaded.':chosen.dataset.label+' applied in this preview only.',true);
 },{signal});
 search?.addEventListener('input',()=>{const q=search.value.trim().toLowerCase();choices.forEach(n=>n.hidden=!n.textContent.toLowerCase().includes(q));root.querySelector('[data-empty]').hidden=choices.some(n=>!n.hidden);},{signal});
 const folderRoot=root.querySelector('[data-folder-root]'),folderChild=root.querySelector('[data-folder-child]'),back=root.querySelector('[data-back]');
 function showFolder(name,focus=true){
  const child=Boolean(name);root.dataset.depth=child?'child':'root';
  folderRoot.inert=child;folderRoot.setAttribute('aria-hidden',String(child));folderChild.inert=!child;folderChild.setAttribute('aria-hidden',String(!child));back.hidden=!child;
  root.querySelector('[data-path]').textContent=child?'Projects / '+name:'Projects';
  if(child)root.querySelector('[data-folder-name]').textContent=name;
  if(focus)(child?back:folderRoot.querySelector('button')).focus({preventScroll:true});
 }
 root.querySelectorAll('[data-folder]').forEach(n=>n.addEventListener('click',()=>showFolder(n.dataset.folder),{signal}));
 back?.addEventListener('click',()=>showFolder(null),{signal});
 root.querySelector('[data-move]')?.addEventListener('click',()=>{const name=root.querySelector('[data-folder-name]').textContent;finish(name.toLowerCase(),name,'Sample moved to '+name+'. No real file changed.',true);},{signal});
 const time=root.querySelector('input[type="time"]');
 root.querySelector('[data-time-apply]')?.addEventListener('click',()=>{if(!time.reportValidity())return;finish(time.value,time.value,'Time set to '+time.value+' in this preview. No reminder is scheduled.',true);},{signal});
 root.addEventListener('keydown',e=>{
  if(!opened)return;
  if(e.key==='Escape'){e.preventDefault();e.stopPropagation();close(true);return;}
  if(e.target===trigger)return;
  if(e.key==='ArrowLeft'&&kind==='move'&&root.dataset.depth==='child'&&e.target.tagName!=='INPUT'){e.preventDefault();showFolder(null);return;}
  if(e.target===time)return;
  if(e.target===search&&!['ArrowDown','Enter'].includes(e.key))return;
  const options=active();if(!options.length)return;
  if(e.target===search&&e.key==='Enter'){e.preventDefault();options[0].click();return;}
  if(['ArrowDown','ArrowUp','Home','End'].includes(e.key)){
   e.preventDefault();const i=options.indexOf(e.target),next=e.key==='Home'?0:e.key==='End'?options.length-1:(i+(e.key==='ArrowDown'?1:-1)+options.length)%options.length;options[next]?.focus({preventScroll:true});
  }else if(!search&&e.key.length===1&&e.key!==' '&&!e.ctrlKey&&!e.metaKey){
   buffer+=e.key.toLowerCase();clearTimeout(typeTimer);options.find(n=>n.textContent.trim().toLowerCase().startsWith(buffer))?.focus({preventScroll:true});typeTimer=setTimeout(()=>buffer='',600);
  }
 },{signal});
 doc.addEventListener('pointerdown',e=>{if(opened&&!e.composedPath().includes(root))close();},{signal});
 root.addEventListener('focusout',()=>queueMicrotask(()=>{if(opened&&!root.matches(':focus-within'))close();}),{signal});
 function reset(){close(root.matches(':focus-within'));committed=[...initialValues];choices.forEach((n,i)=>{n.hidden=false;n.removeAttribute('aria-current');if(defaults[i]!==null)n.setAttribute('aria-checked',defaults[i]);});label.textContent=initialLabel;feedback.textContent=initialFeedback;delete root.dataset.appearance;if(search){search.value='';root.querySelector('[data-empty]').hidden=true;}if(time)time.value='15:00';if(folderRoot)showFolder(null,false);clearTimeout(typeTimer);buffer='';}
 close();
 const control={open,close,reset,destroy(){close();destroyed=true;clearTimeout(typeTimer);life.abort();mounted.delete(root);}};
 mounted.set(root,control);return control;
}

window.MatteMenu = { mount: mountMenuStudy };
})();
