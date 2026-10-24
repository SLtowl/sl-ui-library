/** Owner-approved Buttons-only source preparation. Historical inputs stay frozen. */
export const everydayKeys='more defaults redo invert invite signout call email support directions calendar'.split(' ');
export const variants=[...everydayKeys.map(key=>`buttons-everyday-buttons-${key}-v11`),'buttons-compositions-cta-v11','buttons-account-services-exports-v11'];
export function once(source,from,to){if(source.indexOf(from)<0||source.indexOf(from)!==source.lastIndexOf(from))throw new Error('Unexpected Buttons source grammar: '+from);return source.replace(from,to);}
const selected=(entry,key)=>entry?.variants?.[0]===`buttons-everyday-buttons-${key}-v11`&&entry.key===key;
export function prepareButtonsLocal(family,file,source,entry){
 if(family!=='everyday')return source;
 if(file==='examples.js'&&selected(entry,'more')){
  source=once(source,"let entered=0;while(sample.children.length<count)","let entered=0;const initial=sample.children.length===0;while(sample.children.length<count)");
  source=once(source,"'sample-chip arriving');row.style.setProperty('--arrival-delay',`${entered++*35}ms`)","initial?'sample-chip':'sample-chip arriving');row.style.setProperty('--arrival-delay',`${entered++*20}ms`)");
 }
 if(file==='icons.js'&&selected(entry,'invite')){
  source=once(source,"['M12 7A3 3 0 1 1 6 7A3 3 0 1 1 12 7','M10 7A3 3 0 1 1 4 7A3 3 0 1 1 10 7']","['M12 7A3 3 0 1 1 6 7A3 3 0 1 1 12 7','M10 7A3 3 0 1 1 4 7A3 3 0 1 1 10 7']");
  source=once(source,"['M3 20L3 18Q3 13 9 13Q15 13 15 18L15 20','M2 20L2 18Q2 13 7 13Q12 13 12 18L12 20']","['M4 20L4 18Q4 13 9 13Q14 13 14 18L14 20','M2 20L2 18Q2 13 7 13Q12 13 12 18L12 20']");
  source=once(source,"['M23 7A3 3 0 1 1 17 7A3 3 0 1 1 23 7','M20 7A3 3 0 1 1 14 7A3 3 0 1 1 20 7']","['M21 7A3 3 0 1 1 15 7A3 3 0 1 1 21 7','M20 7A3 3 0 1 1 14 7A3 3 0 1 1 20 7']");
  source=once(source,"['M16 20L16 18Q16 13 20 13Q24 13 24 18L24 20','M13 20L13 18Q13 13 17 13Q21 13 21 18L21 20']","['M13 20L13 18Q13 13 18 13Q23 13 23 18L23 20','M12 20L12 18Q12 13 17 13Q22 13 22 18L22 20']");
  // Equal 10-unit shoulders, translated together; offstage guest remains within the stroke-safe box.
 }
 if(file==='icons.js'&&selected(entry,'directions')){
  source=once(source,"['M14 5L17 8L14 11','M16 5L19 8L16 11']","['M14 5L17 8L14 11','M14 5L17 8L14 11']");
  source=once(source,"part('endpoint','M20 7A3 3 0 1 1 14 7A3 3 0 1 1 20 7'","part('endpoint','M20 8A3 3 0 1 1 14 8A3 3 0 1 1 20 8'");
 }
 return source;
}
export function prepareButtonsCss(family,css,entry){
 if(family!=='everyday')return css;
 if(selected(entry,'more')){css=once(css,'sl-everyday-arrive 380ms','sl-everyday-arrive 280ms');css=once(css,'transform:translateY(6px)','transform:translateY(3px)');}
 if(selected(entry,'defaults'))css+='\n.everyday-component .settings-example{min-height:0;padding:14px;border:1px solid var(--action-edge);border-radius:10px;gap:12px;align-items:stretch}.everyday-component .settings-example>div{width:100%;gap:12px}.everyday-component .settings-example span{width:64px;flex:0 0 64px}.everyday-component .settings-example i{min-width:0}';
 if(selected(entry,'redo')){css=once(css,'.redo-sample{opacity:.45;','.redo-sample{opacity:1;color:inherit;');css=once(css,'text-decoration:none;color:#333','text-decoration:none;color:inherit');}
 if(selected(entry,'invert'))css+='\n.everyday-component .button-labels .alternate-label{display:none}.everyday-component[data-active=true] .button-labels .normal-label{opacity:1;transform:none}.everyday-component .button-labels .normal-label{transition:none}';
 return css;
}
export function prepareButtonsEntry(family,source,entry){
 if(family!=='everyday'||!['signout','call','email','support','directions','calendar'].some(key=>selected(entry,key)))return source;
 source=once(source,'let control,destroyed=false;','let control,destroyed=false,previewCleanup=()=>{};');
 source=once(source,'function render(){control?.destroy();','function render(){previewCleanup();control?.destroy();');
 source=once(source,'demoExample.ready?.();}','demoExample.ready?.();const button=control.button;const capture=event=>{if(control.state.phase!=="complete")return;event.preventDefault();event.stopImmediatePropagation();render();control.button.focus({preventScroll:true});};button.addEventListener("click",capture,true);previewCleanup=()=>button.removeEventListener("click",capture,true);}');
 return once(source,'destroyed=true;control.destroy();','destroyed=true;previewCleanup();control.destroy();');
}
export function prepareButtonsComposition(path,source,tag){
 if(path!=='library-compositions-ru/popular.js'||tag!=='sl-source-buttons-compositions-cta-v11')return source;
 source=once(source,"const selection=t.el('div','cta-selection');selection.hidden=true;","const selection=t.el('div','cta-selection');selection.hidden=true;selection.inert=true;let expanded=false,chosen=false,disclosureRoot=null;function visibility(){const visible=expanded&&chosen;if(!visible&&selection.contains(selection.getRootNode().activeElement))disclosureRoot?.querySelector('button')?.focus({preventScroll:true});selection.inert=!visible;selection.hidden=!visible;}");
 source=once(source,'function choose(kind){selection.hidden=false;','function choose(kind){chosen=true;visibility();');
 source=once(source,"'direction-picker'],css:","'direction-picker'],options:{onChange({expanded:value}){expanded=value;visibility();}},css:");
 return once(source,"prepare(root){const body=root.querySelector('[data-panel]>div'),directions=","prepare(root){disclosureRoot=root;const body=root.querySelector('[data-panel]>div'),directions=");
}
export function prepareButtonsAccount(path,source,entry){
 if(path!=='account-services-ru/support.js'||entry?.variants?.[0]!=='buttons-account-services-exports-v11'||entry.key!=='exports')return source;
 source=once(source,"exports(t){\n  const u=ui(t);","exports(t){\n  t.root.classList.add('as-exports');const u=ui(t);");
 const marker='  function sync(){const locked=phase===\'pending\'||phase===\'ready\';';
 source=once(source,marker,"  const actions=t.el('div','ac-actions as-export-actions'),primary=t.el('div','as-export-primary'),secondary=t.el('div','as-export-secondary');primary.append(request.view,retrieve.view);secondary.append(refresh.view,cancel.view);actions.append(primary,secondary);for(const button of [request,refresh,cancel,retrieve])button.getRootNode().append(t.el('style','','.bk-button.bk-button{width:100%;height:48px;min-height:48px;font-size:13px;line-height:16px}.bk-surface.bk-surface{height:48px;min-height:48px;padding:8px}.bk-label.bk-label{line-height:16px}'));function visible(button,show){if(!show&&button.getRootNode().activeElement===button)t.root.focus({preventScroll:true});button.view.inert=!show;button.view.hidden=!show;}\n"+marker+"visible(request,!locked);visible(retrieve,phase==='ready');visible(refresh,phase==='pending');visible(cancel,phase==='pending');");
 source=once(source,'t.root.append(options,state,note,t.actions(request,refresh,cancel,retrieve));','t.root.append(options,state,note,actions);');
 return source;
}
export const ctaCss='\n.sl-component [data-component="cta"] .cta-selection[hidden]{display:none!important}';
// At 226px, the ready value takes two 18.84px lines. Reserve row capacities in every phase.
export const exportsDetailsCss='\n.account-control.as-exports .as-details{min-height:87px}.account-control.as-exports .as-details>div{min-height:19px}.account-control.as-exports .as-details>div:first-child{min-height:38px}';
export const exportsCss='\n.account-control.as-exports .as-switches{margin:8px 0}.account-control.as-exports .as-switches>label{padding-block:8px;min-height:40px}.account-control.as-exports .as-details{padding:10px;gap:8px;margin:10px 0;min-height:84px}.account-control.as-exports .as-details>div{grid-template-columns:minmax(52px,.6fr) minmax(0,1fr);align-items:start;gap:8px}.account-control.as-exports .as-details dd{font-size:13px}.account-control.as-exports .as-summary{min-height:82px;margin-top:8px}.account-control.as-exports .as-export-actions{display:grid;grid-template-rows:48px 48px;gap:8px;min-height:104px;align-items:stretch}.account-control.as-exports .as-export-primary,.account-control.as-exports .as-export-secondary{display:grid;min-width:0;align-items:stretch}.account-control.as-exports .as-export-primary>*{grid-area:1/1}.account-control.as-exports .as-export-secondary{grid-template-columns:1fr 1fr;gap:6px}.account-control.as-exports .as-export-actions [hidden]{display:none!important}.account-control.as-exports .as-export-actions .ac-action{width:100%;min-width:0}.account-control.as-exports .as-export-actions .bk-button{width:100%;height:48px;min-height:48px;font-size:12px}.account-control.as-exports .as-export-actions .bk-label{white-space:normal;line-height:1.2;padding-inline:8px}';
