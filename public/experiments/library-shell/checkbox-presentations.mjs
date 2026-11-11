export const checkboxBatch=[{"base":"draw-checkbox","name":"Signature check","modes":["combined","icon"]},{"base":"fill-checkbox","name":"Precision square","modes":["combined","icon"]},{"base":"sweep-checkbox","name":"Circle check","modes":["combined","icon"]},{"base":"task-checkbox","name":"Task complete","modes":["combined","icon"]},{"base":"cross-square-checkbox","name":"Square cross","modes":["combined","icon"]},{"base":"cross-circle-checkbox","name":"Circle cross","modes":["combined","icon"]},{"base":"star-checkbox","name":"Star","modes":["combined","icon"]},{"base":"heart-checkbox","name":"Heart","modes":["combined","icon"]},{"base":"bookmark-checkbox","name":"Bookmark check","modes":["combined","icon"]},{"base":"shield-checkbox","name":"Shield","modes":["combined","icon"]},{"base":"pin-checkbox","name":"Pin","modes":["combined","icon"]},{"base":"bell-checkbox","name":"Follow topic","modes":["combined","icon"]},{"base":"ring-checkbox","name":"Ring outline","modes":["combined","icon"]},{"base":"corner-checkbox","name":"Open corners","modes":["combined","icon"]}];
export function checkboxMarkup(markup,base,mode){
 return markup.replace('class="sl-check-card',`class="sl-variant-${mode} sl-check-card`);
}
export function checkboxPresentation(root,base,mode,controller){
 if(mode!=='icon'||!root)return controller;
 const view=root.ownerDocument.defaultView,life=new view.AbortController();let destroyed=false;
 root.addEventListener('keydown',event=>{if(event.key==='Escape'&&root.dataset.cpDismissed!=='true'){
  root.dataset.cpDismissed='true';event.preventDefault();event.stopPropagation();
 }},{signal:life.signal});
 root.addEventListener('pointerleave',()=>{delete root.dataset.cpDismissed},{signal:life.signal});
 root.addEventListener('focusout',()=>{queueMicrotask(()=>{if(!destroyed&&!root.contains(root.getRootNode().activeElement))delete root.dataset.cpDismissed})},{signal:life.signal});
 return new Proxy(controller,{get(target,key){
  if(key==='reset')return()=>{if(!destroyed){delete root.dataset.cpDismissed;target.reset()}};
  if(key==='destroy')return()=>{if(destroyed)return;destroyed=true;life.abort();delete root.dataset.cpDismissed;target.destroy()};
  const value=Reflect.get(target,key,target);return typeof value==='function'?value.bind(target):value;
 }});
}