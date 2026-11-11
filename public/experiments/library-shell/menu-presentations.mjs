export const menuBatch=[{"base":"actions-menu","name":"Action menu","modes":["text","combined"]},{"base":"sort-menu","name":"Sort menu","modes":["text","combined"]},{"base":"labels-menu","name":"Multi-select menu","modes":["text","combined"]},{"base":"commands-menu","name":"Command menu","modes":["text","combined"]},{"base":"workspace-menu","name":"Workspace switcher","modes":["text","combined"]},{"base":"status-menu","name":"Status picker","modes":["text","combined"]},{"base":"assignee-menu","name":"Assignee menu","modes":["text","combined"]},{"base":"appearance-menu","name":"Appearance menu","modes":["text","combined"]},{"base":"density-menu","name":"Density menu","modes":["text","combined"]},{"base":"export-menu","name":"Export menu","modes":["text","combined"]},{"base":"permissions-menu","name":"Access menu","modes":["text","combined"]},{"base":"snooze-menu","name":"Reminder menu","modes":["text","combined"]},{"base":"move-menu","name":"Folder menu","modes":["text","combined"]},{"base":"insert-menu","name":"Insert menu","modes":["text","combined"]},{"base":"menus-resource-picker-v11","name":"Grouped resource picker","modes":["text","combined"]},{"base":"menus-nested-topic-v11","name":"Nested topic menu","modes":["text","combined"]},{"base":"menus-recent-actions-v11","name":"Recent action menu","modes":["text","combined"]},{"base":"menus-tag-workbench-v11","name":"Tag assignment menu","modes":["text","combined"]},{"base":"menus-branch-picker-v11","name":"Branch and tag menu","modes":["text","combined"]},{"base":"menus-weekly-window-v11","name":"Weekly delivery menu","modes":["text","combined"]}];
export function menuPresentation(root,base,mode,controller){
 const trigger=root?.querySelector('[data-trigger]');if(!trigger)return controller;
 const ownName=!trigger.hasAttribute('aria-label'),label=trigger.querySelector('[data-trigger-label],[data-label]');
 const sync=()=>{if(ownName){const text=[label?.textContent.trim(),trigger.querySelector('[data-count]')?.textContent.trim()].filter(Boolean).join(', ');if(text&&trigger.getAttribute('aria-label')!==text)trigger.setAttribute('aria-label',text);}};
 sync();const observer=new root.ownerDocument.defaultView.MutationObserver(sync);observer.observe(trigger,{subtree:true,childList:true,characterData:true});
 let destroyed=false;
 return new Proxy(controller,{get(target,key){
  if(key==='destroy')return()=>{if(destroyed)return;destroyed=true;observer.disconnect();target.destroy();};
  if(key==='reset')return()=>{if(destroyed)return;target.reset();sync();};
  const value=Reflect.get(target,key,target);return typeof value==='function'?value.bind(target):value;
 }});
}
export function menuMarkup(markup,base,mode){
 if(base.startsWith('menus-'))return markup.replace('class="sl-component"',`class="sl-variant-${mode} sl-component"`);
 return markup.replace('class="menu-demo',`class="sl-variant-${mode} menu-demo`);
}