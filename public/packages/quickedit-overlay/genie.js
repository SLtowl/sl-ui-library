// Compatibility export for existing packages; the former Genie effect is removed.
// A native dialog now opens with a small, ordinary scale/translate and opacity.
export function createGenie(root,panel,trigger,media){
 const view=root.ownerDocument.defaultView,closed='translateY(12px) scale(.96)';
 let animation=null,state=0,targetState=0,pending=Promise.resolve(),resolveRun=null;
 function settle(target){
  state=target;animation?.cancel();animation=null;
  panel.style.opacity=String(target);panel.style.transform=target?'none':closed;
 }
 function run(target,instant=false){
  if(animation&&target===targetState&&!instant&&!media.matches)return pending;
  const current=animation?view.getComputedStyle(panel):null;
  const from={opacity:current?current.opacity:String(state),transform:current?current.transform:(state?'none':closed)};
  resolveRun?.();resolveRun=null;animation?.cancel();animation=null;targetState=target;
  if(instant||media.matches){settle(target);return Promise.resolve();}
  panel.style.opacity=from.opacity;panel.style.transform=from.transform;
  animation=panel.animate([from,{opacity:String(target),transform:target?'none':closed}],{duration:220,easing:'cubic-bezier(.22,.61,.36,1)',fill:'forwards'});
  const active=animation;
  pending=new Promise(resolve=>{resolveRun=resolve;active.finished.then(()=>{
   if(animation!==active)return;settle(target);resolveRun=null;resolve();
  }).catch(()=>{});});
  return pending;
 }
 return {run,get progress(){return state;},destroy(){resolveRun?.();resolveRun=null;animation?.cancel();animation=null;panel.style.removeProperty('opacity');panel.style.removeProperty('transform');}};
}
