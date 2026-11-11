export function inputPresentation(root,base,mode,controller){
 if(!root||!mode)return controller;
 const doc=root.ownerDocument,view=doc.defaultView,life=new view.AbortController();
 const on=(node,type,fn)=>node.addEventListener(type,fn,{signal:life.signal});
 let destroyed=false,observer;
 const actions={
  'inputs-tokens-v11':[['.sl-add','Add tag','plus']],
  'inputs-combobox-v11':[['.sl-browse','Show people','person'],['.sl-clear','Clear','close']],
  'inputs-date-range-v11':[['[data-calendar]','Calendar','calendar']],
  'inputs-time-v11':[['.sl-open-time','Time','clock']],
  'inputs-editable-title-v11':[['.sl-edit','Edit title','edit'],['.sl-apply','Apply','check'],['.sl-cancel','Cancel','close']],
  'inputs-key-value-v11':[['.sl-add-pair','Add pair','plus']],
  'inputs-color-v11':[['.sl-picker','Choose color','color']],
  'inputs-attachment-v11':[['.sl-demo-choose','Choose demo file','attach'],['.sl-remove-file','Remove file','close']],
  'password-input':[['.sl-field__reveal','Show','eyes']],
  'inputs-semantic-version-v11':[['.sl-next','Next patch','next']],
  'inputs-shortcut-v11':[['.sl-record','Record shortcut','keyboard'],['.sl-clear','Clear','close']],
  'inputs-search-replace-v11':[['.sl-apply','Replace text','replace']],
  'inputs-daily-controls-signature-v11':[['.daily-control>.dc-quiet.dc-button','Clear signature','erase']],
 };
 function decorate(){
  for(const [selector,label,glyph] of actions[base]||[])for(const button of root.querySelectorAll(selector)){
   if(!button.classList.contains('ip-action')){
    button.classList.add('ip-action');button.dataset.ipGlyph=glyph;
    if(!button.getAttribute('aria-label')){button.setAttribute('aria-label',button.textContent.trim()||label);button.dataset.ipOwnName='true';}
    if(!button.textContent.trim()){
     const caption=doc.createElement('span');caption.className='ip-caption';caption.textContent=label;button.append(caption);
    }
   }
   if(button.dataset.ipOwnName==='true'){
    const text=button.textContent.trim();if(text&&button.getAttribute('aria-label')!==text)button.setAttribute('aria-label',text);
   }
   if(base==='password-input'){
    const caption=button.querySelector('.ip-caption'),text=root.dataset.visible==='true'?'Hide':'Show';
    if(caption&&caption.textContent!==text)caption.textContent=text;
   }
  }
  if(base==='inputs-attachment-v11'){
   const surface=root.querySelector('.sl-file-control');
   if(surface&&!surface.classList.contains('ip-file')){
    surface.classList.add('ip-file');surface.dataset.ipGlyph='attach';
    const caption=surface.querySelector('span');if(caption)caption.classList.add('ip-file-caption');
   }
  }
 }
 let opener,searchBody;
 if(base==='search-input'&&mode!=='text'){
  opener=doc.createElement('button');opener.type='button';opener.className='ip-search-opener ip-action';opener.dataset.ipGlyph='search';opener.textContent='Search';opener.setAttribute('aria-label','Open search');opener.setAttribute('aria-expanded','false');
  searchBody=doc.createElement('div');searchBody.className='ip-search-body';const inner=doc.createElement('div');
  while(root.firstChild)inner.append(root.firstChild);searchBody.append(inner);root.append(opener,searchBody);root.dataset.ipSearchOpen='false';searchBody.inert=true;
  // The source field's 700ms lens flourish conflicts with the expanding surface.
  // Cancel it in the same event task, before a frame can display both motions.
  const input=root.querySelector('input'),lens=root.querySelector('.sl-field__leading');
  const settleLens=()=>lens?.getAnimations().forEach(animation=>{if(!('transitionProperty' in animation))animation.cancel();});
  on(input,'focus',settleLens);on(input,'pointerdown',settleLens);
  const close=()=>{root.dataset.ipSearchOpen='false';opener.setAttribute('aria-expanded','false');searchBody.inert=true;root.querySelector('input').blur();opener.focus({preventScroll:true});};
  on(opener,'click',()=>{root.dataset.ipSearchOpen='true';opener.setAttribute('aria-expanded','true');searchBody.inert=false;root.querySelector('input').focus({preventScroll:true});});
  on(root,'keydown',event=>{if(event.key==='Escape'&&root.dataset.ipSearchOpen==='true'){event.preventDefault();close();}});
  on(root,'focusout',()=>queueMicrotask(()=>{if(destroyed)return;const active=root.getRootNode().activeElement;if(!root.contains(active)&&!root.querySelector('input').value){root.dataset.ipSearchOpen='false';opener.setAttribute('aria-expanded','false');searchBody.inert=true;}}));
 }
 decorate();observer=new view.MutationObserver(decorate);observer.observe(root,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['data-visible']});
 return new Proxy(controller,{get(target,key){
  if(key==='destroy')return()=>{if(destroyed)return;destroyed=true;life.abort();observer.disconnect();target.destroy();if(searchBody){const inner=searchBody.firstElementChild;root.append(...inner.childNodes);searchBody.remove();opener.remove();delete root.dataset.ipSearchOpen;}root.querySelectorAll('.ip-caption').forEach(n=>n.remove());};
  if(key==='reset')return()=>{if(destroyed)return;target.reset?.();decorate();if(searchBody){root.dataset.ipSearchOpen='false';opener.setAttribute('aria-expanded','false');searchBody.inert=true;}};
  const value=Reflect.get(target,key,target);return typeof value==='function'?value.bind(target):value;
 }});
}
export function inputMarkup(markup,base,mode){
 return markup.replace(base.endsWith('-input')?'class="sl-field ':'class="sl-component"',base.endsWith('-input')?`class="sl-variant-${mode} sl-field `:`class="sl-component sl-variant-${mode}"`);
}