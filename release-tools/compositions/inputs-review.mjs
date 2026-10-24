/** Owner-reviewed Inputs changes, scoped before bundling; historical review sources stay frozen. */
const accountInputs=new Set(['profile','addresses','recipient','returns','tickets','appointments','reviews','ownership']);
const isAccountInput=entry=>entry?.category==='inputs'&&accountInputs.has(entry.key)&&entry.variants?.[0]?.startsWith('inputs-account-');
/** Share the exact inherited input sheet; avoid eight copies of a near-identical CSS blob. */
export function factorInputsAccountRegistry(source,entry){
 if(!isAccountInput(entry))return source;
 return factorAccountInputStyles(source);
}
/** Factor identical inherited input styles without choosing a public component entry. */
export function factorAccountInputStyles(source){
 const name=key=>source.match(new RegExp('^"'+key+'":.*\\bcss: (style\\d+)\\b','m'))?.[1];
 const base=name('text-input'),code=name('code-input');
 if(!base||!code)throw new Error('Missing Inputs registry styles');
 if(base===code)return source;
 const declaration=id=>{const match=source.match(new RegExp('^const '+id+' = ("(?:[^"\\\\]|\\\\.)*");$','m'));if(!match)throw new Error('Unsupported Inputs style declaration');return {match:match[0],css:JSON.parse(match[1])};};
 const line='.sl-field.sl-field--code { width: min(300px, 100%); }\n';
 const pattern=/^\.sl-field\.sl-field--code \{ width: min\(300px, 100%\); \}\n/m;
 const inherited='const '+code+' = '+base+'.replace('+pattern.toString()+', "");';
 if(source.includes(inherited)){
  const shared=declaration(base),rows=source.split('\n');
  if(rows.filter(row=>row.startsWith('const '+base+' = ')).length!==1||rows.filter(row=>row.startsWith('const '+code+' = ')).length!==1||!rows.includes(inherited)||shared.css.split(line).length!==2||source.indexOf(shared.match)>source.indexOf(inherited))throw new Error('Unsupported factored Inputs style declaration');
  return source;
 }
 const shared=declaration(base),specific=declaration(code);
 if(source.indexOf(shared.match)>source.indexOf(specific.match))throw new Error('Inputs shared style must precede its dependent style');
 if(shared.css.split(line).length!==2||shared.css.replace(line,'')!==specific.css)throw new Error('Unexpected Inputs shared-style difference');
 // A RegExp (not a CSS-looking string or numeric slice) stays correct when the
 // existing palette exporter rewrites the inherited stylesheet before use.
 if(shared.css.replace(pattern,'')!==specific.css)throw new Error('Inputs style factor mismatch');
 return source.replace(specific.match,'const '+code+' = '+base+'.replace('+pattern.toString()+', "");');
}
export function prepareInputsAccount(path,source,entry){
 if(!isAccountInput(entry))return source;
 const once=(before,after)=>{if(source.split(before).length!==2)throw new Error('Unsupported Inputs account grammar: '+path);source=source.replace(before,after);};
 if(path==='account-core-ru/runtime.js')once(':host{display:inline-flex;min-width:0;max-width:100%;',':host{--sl-input-action:1;display:inline-flex;min-width:0;max-width:100%;');
 if(entry.key==='returns'&&path==='account-core-ru/comfort.js')once('.bk-button.bk-button{height:auto;min-height:48px;','.bk-button.bk-button{width:100%;height:auto;min-height:48px;');
 return source;
}
export function inputsAccountCss(entry){
 if(!isAccountInput(entry))return '';
 if(entry.key==='profile')return `\n/* Keep draft feedback close to its profile actions. */\n.account-control[data-kind=profile]>.ac-draft-line{min-height:0;margin:8px 0 0;line-height:18px}\n.account-control[data-kind=profile]>.ac-actions{margin-top:8px}\n`;
 if(entry.key==='recipient')return `\n/* Company ID is an inline field, with the same rhythm as its siblings. */\n.account-control[data-kind=recipient] .ac-fields{gap:0}\n.account-control[data-kind=recipient] .ac-fields>.ac-source+.ac-source{margin-top:12px}\n.account-control[data-kind=recipient] .ac-fields>.as-drawer{transition:grid-template-rows var(--ac-duration) var(--ac-ease),opacity var(--ac-duration) var(--ac-ease)}\n.account-control[data-kind=recipient] .ac-fields>.as-drawer>.ac-reveal-inner>.as-flow{padding:12px 2px 0}\n`;
 if(entry.key==='returns')return `\n/* A request action fills its local row at every supported width. */\n.account-control[data-kind=returns] .ac-actions>.ac-action{width:100%}\n`;
 return '';
}
