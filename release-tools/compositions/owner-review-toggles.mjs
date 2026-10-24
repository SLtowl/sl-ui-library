// Narrow, pure source adaptations for the 2026-10-24 owner review.
const select='sl-source-selection-compositions-select-v11',cookies='sl-source-selection-compositions-cookies-v11',filters='sl-source-selection-compositions-filters-v11';
function once(source,before,after){const old=source.split(before).length-1,next=source.split(after).length-1;if(next===1&&old===after.split(before).length-1)return source;if(old!==1||next!==0)throw Error('Unexpected owner-review toggle grammar: '+before);return source.replace(before,after);}
export function prepareOwnerReviewTogglesComposition(path,source,tag){
 if(tag===select&&path==='library-compositions-ru/essentials.js')source=once(source,"source('status-menu',{prepare(root)","source('status-menu',{ready(host){t.on(host.sourceRoot,'menuselect',event=>{if(choices.some(choice=>choice[0]===event.detail.value))host.controller.close(true);});},prepare(root)");
 if(tag===filters&&path==='library-compositions-ru/popular.js')source=once(source,'tools.append(categories,action(',"tools.style.gridTemplateColumns='minmax(0,1fr)';tools.append(categories,action(");
 return source;
}
export function repairOwnerReviewPrivacyMarkup(source){
 source=once(source,'M10 14V10a6 6 0 0 1 12 0v4','M10 13V10a6 6 0 0 1 12 0v3');
 return once(source,'class="sl-lock__key" d="M16 19v3"','class="sl-lock__key" pathLength="1" d="M16 19v3"');
}
export function repairOwnerReviewPrivacyCss(source){
 source=once(source,'transform-box: fill-box; transform-origin: 26% 80%;','transform-box: view-box; transform-origin: 22px 13px;');
 return once(source,'transform: translate(3px, -2px) rotate(24deg);','transform: rotate(32deg);');
}
export function prepareOwnerReviewTogglesRegistry(registry,tag){
 if(tag!==cookies)return registry;
 const lines=registry.split('\n'),index=lines.findIndex(line=>line.startsWith('"privacy-toggle":'));
 if(index<0||lines.filter(line=>line.startsWith('"privacy-toggle":')).length!==1)throw Error('Missing exact privacy registry entry');
 let line=lines[index];const markup=line.match(/markup: ("(?:\\.|[^"\\])*"), css: /),css=line.match(/, css: (style\d+|"(?:\\.|[^"\\])*"), mount:/);
 if(!markup||!css)throw Error('Unknown privacy registry entry grammar');
 let sheet;if(css[1].startsWith('"'))sheet=JSON.parse(css[1]);else{const declaration=registry.match(new RegExp('^const '+css[1]+' = ("(?:\\\\.|[^"\\\\])*?");','m'));if(!declaration)throw Error('Missing privacy registry sheet');sheet=JSON.parse(declaration[1]);}
 const currentMarkup=JSON.parse(markup[1]),nextMarkup=repairOwnerReviewPrivacyMarkup(currentMarkup),nextCss=repairOwnerReviewPrivacyCss(sheet);
 if(nextMarkup===currentMarkup&&nextCss===sheet)return registry;
 line=line.replace(markup[1],JSON.stringify(nextMarkup)).replace(', css: '+css[1]+', mount:',', css: '+JSON.stringify(nextCss)+', mount:');lines[index]=line;return lines.join('\n');
}
export function prepareOwnerReviewTogglesLocal(family,file,source,entry){
 if(family==='daily'&&file==='choices.js'&&entry?.variants?.length===1&&entry.variants[0]==='selection-daily-controls-payment-v11'&&entry.key==='payment')source=once(source,"'Оплатить при доставке','cash'","'Оплатить при доставке','box'");
 return source;
}
