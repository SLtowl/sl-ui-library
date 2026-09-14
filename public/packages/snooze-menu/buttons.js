(() => {
  // Each export owns this small picker shell: no portals or document-wide dialog.
  function createPicker(root, title, on, disabled) {
    const doc = root.ownerDocument;
    const panel = doc.createElement('div'), header = doc.createElement('div'), heading = doc.createElement('strong'), dismiss = doc.createElement('button');
    panel.className = 'sl-picker-panel'; panel.id = 'picker-' + doc.defaultView.crypto.randomUUID();
    panel.setAttribute('role', 'dialog'); panel.setAttribute('aria-label', title); panel.setAttribute('aria-hidden', 'true'); panel.inert = true;
    header.className = 'sl-picker-header'; heading.textContent = title;
    dismiss.type = 'button'; dismiss.textContent = '×'; dismiss.setAttribute('aria-label', 'Close picker');
    header.append(heading, dismiss);
    const body = doc.createElement('div'), footer = doc.createElement('div');
    body.className = 'sl-picker-body'; footer.className = 'sl-picker-footer'; panel.append(header, body, footer); root.append(panel);
    let opened = false, trigger = null, siblings = [];
    const triggers = new Set();
    function close(focus = true) {
      if (!opened) return;
      opened = false; panel.dataset.open = 'false'; panel.inert = true; panel.setAttribute('aria-hidden', 'true');
      siblings.forEach(([node, inert]) => { node.inert = inert; }); siblings = [];
      trigger?.setAttribute('aria-expanded', 'false');
      if (focus && trigger?.isConnected && !trigger.disabled) trigger.focus();
    }
    function bind(button) { triggers.add(button); button.setAttribute('aria-haspopup', 'dialog'); button.setAttribute('aria-expanded', 'false'); button.setAttribute('aria-controls', panel.id); }
    function open(button, focusNode) {
      if (disabled || button.disabled) return;
      close(false); trigger = button; bind(button); opened = true;
      panel.dataset.open = 'true'; panel.inert = false; panel.setAttribute('aria-hidden', 'false'); button.setAttribute('aria-expanded', 'true');
      (focusNode || dismiss).focus({ preventScroll: true });
      siblings = [...root.children].filter(node => node !== panel).map(node => [node, node.inert]);
      siblings.forEach(([node]) => { node.inert = true; });
    }
    on(dismiss, 'click', () => close());
    on(panel, 'keydown', event => {
      if (event.key === 'Escape') { event.preventDefault(); event.stopPropagation(); close(); }
      if (event.key !== 'Tab') return;
      const all = [...panel.querySelectorAll('button, input, [tabindex]')].filter(node => !node.disabled && node.tabIndex >= 0 && node.checkVisibility());
      const first = all[0], last = all[all.length - 1], active = root.getRootNode().activeElement;
      if (event.shiftKey && active === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && active === last) { event.preventDefault(); first?.focus(); }
    });
    on(doc, 'pointerdown', event => { if (opened && !event.composedPath().includes(root)) close(false); });
    return { body, footer, panel, heading, bind, open, close, get isOpen() { return opened; },
      destroy() { close(); triggers.forEach(button => { button.removeAttribute('aria-controls'); button.setAttribute('aria-expanded', 'false'); }); panel.remove(); } };
  }
  function bindTimePicker(root, input, container, on) {
    const doc = root.ownerDocument, view = doc.defaultView, trigger = root.querySelector('.sl-time-open');
    const picker = createPicker(container, 'Choose time', on, false); picker.bind(trigger);
    const initial = input.value, valid = value => /^([01]\d|2[0-3]):[0-5]\d$/.test(value);
    let draft = initial;
    const columns = doc.createElement('div'); columns.className = 'sl-time-columns';
    const lists = ['Hours', 'Minutes'].map((name, index) => {
      const column = doc.createElement('div'), label = doc.createElement('span'), list = doc.createElement('div');
      label.textContent = name; list.className = 'sl-time-list'; list.setAttribute('role', 'listbox'); list.setAttribute('aria-label', name);
      for (let i = 0; i < (index ? 60 : 24); i++) { const button = doc.createElement('button'); button.type = 'button'; button.setAttribute('role', 'option'); button.dataset.part = String(index); button.dataset.number = String(i).padStart(2, '0'); button.textContent = button.dataset.number; list.append(button); }
      column.append(label, list); columns.append(column); return list;
    });
    picker.body.append(columns);
    const summary = doc.createElement('span'), apply = doc.createElement('button');
    summary.className = 'sl-time-draft'; summary.setAttribute('aria-live', 'polite'); apply.type = 'button'; apply.className = 'sl-time-confirm'; apply.textContent = 'Use time'; picker.footer.append(summary, apply);
    function sync(focusPart) {
      const parts = draft.split(':'); summary.textContent = draft;
      lists.forEach((list, index) => {
        [...list.children].forEach(button => { const chosen = button.dataset.number === parts[index]; button.setAttribute('aria-selected', String(chosen)); button.tabIndex = chosen ? 0 : -1; });
        const selected = list.querySelector('[aria-selected="true"]');
        if (focusPart === index) selected?.focus({ preventScroll: true });
        if (selected) list.scrollTop = selected.offsetTop - list.clientHeight / 2 + selected.clientHeight / 2;
      });
    }
    function open() { if (input.disabled || input.readOnly) return; draft = valid(input.value) ? input.value : initial; sync(); picker.open(trigger, lists[0].querySelector('[aria-selected="true"]')); sync(); }
    on(trigger, 'click', event => { event.preventDefault(); open(); });
    on(trigger, 'keydown', event => { if (['ArrowDown', 'ArrowUp'].includes(event.key)) { event.preventDefault(); event.stopPropagation(); open(); } });
    on(input, 'keydown', event => { if (event.altKey && event.key === 'ArrowDown') { event.preventDefault(); event.stopPropagation(); open(); } });
    lists.forEach((list, index) => {
      function select(button) { if (!button || button.disabled || input.disabled) return; const parts = draft.split(':'); parts[index] = button.dataset.number; draft = parts.join(':'); sync(index); }
      on(list, 'click', event => select(event.target.closest('[data-number]')));
      on(list, 'keydown', event => {
        if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return;
        event.preventDefault(); event.stopPropagation(); const current = [...list.children].indexOf(event.target);
        const next = event.key === 'Home' ? 0 : event.key === 'End' ? list.children.length - 1 : Math.max(0, Math.min(list.children.length - 1, current + (event.key === 'ArrowDown' ? 1 : -1)));
        select(list.children[next]);
      });
    });
    on(apply, 'click', event => { event.preventDefault(); if (input.disabled || input.readOnly) return; const changed = input.value !== draft; input.value = draft; if (changed) input.dispatchEvent(new view.Event('input', { bubbles: true, composed: true })); picker.close(); });
    return { close: () => picker.close(false), destroy: () => picker.destroy() };
  }
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
 function close(focus=false){timeUI.close();opened=false;root.dataset.open='false';trigger.setAttribute('aria-expanded','false');panel.inert=true;panel.setAttribute('aria-hidden','true');if(root.dataset.confirm)mark(committed);if(focus)trigger.focus({preventScroll:true});}
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
 const time=root.querySelector('.sl-time-field');
 const timeUI=bindTimePicker(root,time,panel,(node,type,handler)=>node.addEventListener(type,handler,{signal}));
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
 const control={open,close,reset,destroy(){close();timeUI.destroy();destroyed=true;clearTimeout(typeTimer);life.abort();mounted.delete(root);}};
 mounted.set(root,control);return control;
}

window.MatteMenu = { mount: mountMenuStudy };
})();
