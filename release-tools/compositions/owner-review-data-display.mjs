// Entry-scoped, pure source adaptations for the 2026-10-24 owner review.
import {factorAccountInputStyles} from './inputs-review.mjs';
function once(source,before,after){const old=source.split(before).length-1,next=source.split(after).length-1;if(next===1&&old===after.split(before).length-1)return source;if(old!==1||next!==0)throw Error('Unexpected owner-review data-display grammar: '+before);return source.replace(before,after);}
function exact(entry,key,variant){return entry?.key===key&&entry?.variants?.length===1&&entry.variants[0]===variant;}
const bookmarkBefore='transform: translateY(calc(-1.2 * var(--bookmark-unit))) scaleY(.88);',bookmarkAfter='transform: translateY(calc(-1.2 * var(--bookmark-unit))) scaleY(1);';
export function prepareDataDisplayRegistry(registry,tag){
 if(!['sl-source-data-display-compositions-gallery-v11','sl-source-data-display-compositions-featured-card-v11'].includes(tag))return registry;
 const lines=registry.split('\n'),entries=lines.map((line,index)=>({line,index})).filter(({line})=>line.startsWith('"bookmark":'));
 if(entries.length!==1)throw Error('Missing or duplicate exact bookmark registry entry');
 const {line,index}=entries[0],match=line.match(/, css: (style\d+|"(?:\\.|[^"\\])*"), mount:/);if(!match)throw Error('Unknown bookmark registry CSS grammar');
 if(match[1].startsWith('"')){const css=JSON.parse(match[1]),next=once(css,bookmarkBefore,bookmarkAfter);lines[index]=line.replace(', css: '+match[1]+', mount:',', css: '+JSON.stringify(next)+', mount:');return lines.join('\n');}
 const name=match[1],pattern=new RegExp('^const '+name+' = ("(?:\\\\.|[^"\\\\])*");$'),declarations=lines.map((line,index)=>({line,index,match:line.match(pattern)})).filter(item=>item.match);
 if(declarations.length!==1)throw Error('Missing or duplicate bookmark style declaration');
 const definition=declarations[0],css=JSON.parse(definition.match[1]),next=once(css,bookmarkBefore,bookmarkAfter);
 // Do not rewrite a shared declaration: doing so would restyle accepted primitives.
 const refs=lines.filter(row=>row.includes(', css: '+name+', mount:')).length;if(refs!==1)throw Error('Bookmark style unexpectedly shared; explicit factoring review required');
 lines[definition.index]='const '+name+' = '+JSON.stringify(next)+';';return lines.join('\n');
}
export function prepareDataDisplayLocal(family,file,source,entry){
 if(family==='daily'&&file==='blocks.js'&&exact(entry,'tracking','data-display-daily-controls-tracking-v11'))source=once(source,'indicator.style.transform=`translateX(${selected*100}%)`;orders.select(index);','indicator.style.transform=`translateX(calc(${selected*100}% + ${selected*8}px))`;orders.select(index);');
 return source;
}
export function dataDisplayLocalCss(family,source,entry){
 const keys={currency:'selection',payment:'selection',poll:'selection',partners:'data-display',hours:'data-display',splitter:'sliders',tracking:'data-display'};
 if(family!=='daily'||!Object.hasOwn(keys,entry?.key)||!exact(entry,entry.key,keys[entry.key]+'-daily-controls-'+entry.key+'-v11'))return source;
 const marker='.daily-control[data-kind="tracking"] .dc-segments{gap:8px}';
 const additions=marker+'.daily-control[data-kind="tracking"] .dc-segment-indicator{width:calc((100% - 8px - 8px)/2)}.daily-control[data-kind="tracking"] .dc-track-list li:not(:last-child)::before{top:calc(50% + 7.5px);bottom:calc(-50% + 7.5px)}.daily-control[data-kind="tracking"] .dc-track-dot{position:relative;z-index:1}';
 if(source.includes(marker)){if(source.split(additions).length!==2||source.split(marker).length!==2)throw Error('Unexpected owner-review tracking CSS grammar');return source;}
 for(const marker of ['.daily-control .dc-segments{--segments:2;','.daily-control .dc-segment-indicator{position:absolute;','.daily-control .dc-track-list li:not(:last-child)::before{content:', '.daily-control .dc-track-dot{display:grid;'])if(source.split(marker).length!==2)throw Error('Unexpected owner-review tracking CSS grammar: '+marker);
 return source+'\n'+additions+'\n';
}
export function prepareDataDisplayAccount(path,source,entry){
 if(path==='account-core-ru/runtime.js'&&exact(entry,'passkeys','data-display-account-core-passkeys-v11'))source=once(source,"key:'M13 8A5 5 0 1 1 3 8A5 5 0 1 1 13 8M13 8H22M18 8V12M21 8V11'","key:'M12.5 12A5 5 0 1 1 2.5 12A5 5 0 1 1 12.5 12M12.5 12H21.5M17.5 12V16M20.5 12V15'");
 return source;
}
export function prepareDataDisplayAccountRegistry(registry,entry){
 if(entry?.category!=='data-display'||!exact(entry,'passkeys','data-display-account-core-passkeys-v11'))return registry;
 const rows=registry.split('\n');
 for(const key of ['text-input','code-input']){
  const entries=rows.filter(row=>row.startsWith(JSON.stringify(key)+':'));
  if(entries.length!==1)throw Error('Missing or duplicate passkeys input registry entry');
  const style=entries[0].match(/, css: (style\d+), mount:/)?.[1];
  if(!style||rows.filter(row=>row.startsWith('const '+style+' = ')).length!==1)throw Error('Missing or duplicate passkeys input registry style');
 }
 return factorAccountInputStyles(registry);
}
