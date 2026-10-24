/** Apply the reviewed CTA reveal after existing visibility/focus preparation and before bundling. */
export function prepareButtonsFollowupComposition(path,source,tag){
 if(path!=='library-compositions-ru/popular.js'||tag!=='sl-source-buttons-compositions-cta-v11')return source;
 const once=(from,to)=>{if(!source.includes(from)||source.indexOf(from)!==source.lastIndexOf(from))throw Error('Unexpected CTA follow-up grammar: '+from);source=source.replace(from,to)};
 once('let expanded=false,chosen=false,disclosureRoot=null;','let expanded=false,chosen=false,disclosureRoot=null,directionResize=null;');
 const css='.direction-list{display:flex;flex-wrap:wrap;gap:8px}.direction-list .source-action{min-width:80px}';
 const measured=':host([direction-picker]) .sl-component .details-panel{display:block;height:0;overflow:clip;transition:height 320ms cubic-bezier(.4,0,.2,1),opacity 320ms cubic-bezier(.4,0,.2,1),visibility 0s linear 320ms}:host([direction-picker]) .sl-component .details-panel[data-open=true]{height:var(--direction-height);transition-delay:0s}:host([direction-picker]) .sl-component .details-panel>div{padding:0;overflow:visible}.direction-content{padding:14px 0}';
 once("css:'"+css+"',copy:","css:'"+css+measured+"',ready(host){const panel=host.shadowRoot.querySelector('[data-panel]'),content=panel.querySelector('.direction-content'),measure=()=>panel.style.setProperty('--direction-height',content.getBoundingClientRect().height+'px');measure();directionResize=new ResizeObserver(measure);directionResize.observe(content);},cleanup(){directionResize?.disconnect();},copy:");
 once("body.replaceChildren(t.el('p','','Выберите направление и попробуйте его элементы.'),directions);","const content=t.el('div','direction-content');content.append(t.el('p','','Выберите направление и попробуйте его элементы.'),directions);body.replaceChildren(content);");
 return source;
}
