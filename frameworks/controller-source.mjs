import {readFile} from 'node:fs/promises';

const navigationLayouts=new Set(['tabs','views','steps','sections','breadcrumbs','pages','sidebar','carousel','dock','tree'].map(name=>name+'-navigation'));
const displayLayouts=new Set(['metric','table','avatars','status','details','timeline','file','bar','donut','calendar'].map(name=>name+'-display'));
const feedbackLayouts=new Set(['copy','like','download','bookmark','playback','delete','upload','share','follow']);
function layoutDependency(html,css,variant){
 const head=html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i)?.[1]||'';
 const headStyles=[...head.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/gi)].map(match=>match[1]).join('\n');
 if(feedbackLayouts.has(variant)){
  const feedback='.'+variant+'-feedback',shared=['delete','upload','share','follow'].includes(variant);
  const rules=[...headStyles.matchAll(/([^{}]+)\{([^{}]*)\}/g)].filter(match=>match[1].split(',').map(selector=>selector.trim()).includes(feedback)).map(match=>match[1].trim().replace(/\s/g,'')+'{'+match[2].replace(/\s/g,'')+'}');
  const appearance='margin:0;color:#545454;font-size:12px;line-height:1.5;text-align:center;';
  const expected=shared?[feedback+',.example-note{position:fixed;left:16px;right:16px;'+appearance+'}',feedback+'{bottom:14px;}']:[feedback+'{position:fixed;bottom:14px;left:16px;right:16px;'+appearance+'}'];
  if(JSON.stringify(rules)!==JSON.stringify(expected))throw new Error('Unrecognized button feedback head layout dependency');
  // Retain the status paragraph in local document flow, with source typography
  // and zero margins. Viewport-fixed example placement is not host placement.
  return '\n'+feedback+'{'+appearance.slice(0,-1)+'}';
 }
 if(navigationLayouts.has(variant)){
  // The standalone viewport width overrides the source's responsive 100% root.
  // The library preview supplies host sizing; a bare framework host must too.
  const scene='.nav-demo{width:min(320px,calc(100vw - 32px))}';
  if(css.split(scene).length!==2||!css.includes('.nav-demo{width:min(320px,100%);min-width:0;'))throw new Error('Unrecognized navigation scene layout');
  return '\n.nav-demo{max-width:100%}';
 }
 if(displayLayouts.has(variant)){
  // This is component CSS in the source head, not standalone body centering.
  // Preserve it verbatim so the existing narrow @container rules can run.
  const flatRule=/[^{}]+\{[^{}]*\}/g;
  const rules=[...headStyles.matchAll(flatRule)].map(rule=>rule[0].trim()).filter(rule=>/\.dd-demo\b/.test(rule.slice(0,rule.indexOf('{'))));
  // Validate the complete selector, not a .dd-demo suffix inside another
  // selector. Unparsed braces also reject an unsupported nested at-rule.
  if(headStyles.replace(flatRule,'').trim()||rules.length!==1||rules[0]!=='.dd-demo{width:min(320px,100%);container-type:inline-size}')throw new Error('Unrecognized display head layout dependency');
  return '\n'+rules[0];
 }
 return '';
}

function apiExpression(source){
 const expression=source.match(/\(\(\)\s*=>\s*\{[\s\S]*\}\)\(\);\s*$/)?.[0];
 if(!expression)throw new Error('Unsupported source wrapper; explicit adapter required');
 const exports=[...expression.matchAll(/window\.(\w+)\s*=\s*(\{[^;]+\});/g)];
 if(exports.length!==1)throw new Error('Expected one explicit source controller API');
 return expression.replace(exports[0][0],'return '+exports[0][2]+';');
}
function selector(markup,variant){
 if(variant.endsWith('-v11'))return '.sl-component';
 const known={pair:'.button-kit',save:'.button-kit',cancel:'.button-kit',like:'.sl-like',copy:'.sl-copy',download:'.sl-download',upload:'.sl-upload',delete:'.sl-delete',bookmark:'.sl-bookmark',share:'.sl-share-control',follow:'.sl-follow',playback:'.sl-playback'};
 if(known[variant])return known[variant];
 for(const [suffix,root]of [['-input','.sl-field'],['-toggle','.sl-toggle'],['-checkbox','.sl-check-card'],['-slider','.mixer-group,.sl-slider'],['-menu','.menu-demo'],['-navigation','.nav-demo'],['-feedback','.fb-demo'],['-display','.dd-demo']])if(variant.endsWith(suffix))return root;
 throw new Error('No reviewed root selector for '+variant);
}
export async function compileController(packageRoot,variant){
 const read=file=>readFile(new URL(file,packageRoot),'utf8'),html=await read('index.html');let css=await read('buttons.css');
 css+=layoutDependency(html,css,variant);
 let markup=html.match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1];if(!markup)throw new Error('Missing source body');markup=markup.replace(/<script\b[\s\S]*?<\/script>/gi,'').replace(/<p class="example-note"[\s\S]*?<\/p>/g,'').trim();
 if(/<script\b/i.test(markup))throw new Error('Executable template is not a component export');
 let factory,rootSelector;
 if(variant.endsWith('-overlay')){
  // Overlay packages own their complete CSS; reject undeclared dependencies.
  const links=html.match(/<link\b[^>]*\brel=["']stylesheet["'][^>]*>/g)||[];
  const expectedLinks=['<link rel="stylesheet" href="./buttons.css">'];
  if(JSON.stringify(links)!==JSON.stringify(expectedLinks))throw new Error('Unrecognized overlay stylesheet dependencies');
  const overlay=await read('overlays.js'),marker='window.SLOverlayInstance=mountOverlay(';if(!overlay.includes(marker))throw new Error('Unrecognized overlay initialization');
  const outside='opened&&!panel.contains(e.target)&&!trigger.contains(e.target)';
  if(overlay.split(outside).length!==2)throw new Error('Unrecognized overlay outside-pointer guard');
  const declarations=overlay.slice(0,overlay.indexOf(marker)).replace(/^import[^\n]*\n/gm,'').replace('export function mountOverlay','function mountOverlay').replaceAll('doc.activeElement','root.getRootNode().activeElement').replace(outside,'opened&&!e.composedPath().includes(panel)&&!e.composedPath().includes(trigger)');
  if(!declarations.includes('view.MatteCheckboxes.mount(pin)'))throw new Error('Unrecognized pin integration');
  const isolated=declarations.replace('view.MatteCheckboxes.mount(pin)','pinAPI.mount(pin)'),genie=(await read('genie.js')).replace('export function createGenie','function createGenie');
  let enhancement='';
  if((await read('buttons.js')).includes("'./next.js'")){
   const header="const root=document.querySelector('.overlay-demo'),kind=root.dataset.overlay,control=window.SLOverlayInstance,life=new AbortController(),signal=life.signal;";
   const pagehide="window.addEventListener('pagehide',e=>{if(!e.persisted){life.abort();animation?.cancel();resultAnimation?.cancel();}});";
   const source=await read('next.js');
   if(!source.includes(header)||!source.includes(pagehide))throw new Error('Unrecognized overlay enhancement lifecycle');
   enhancement=`function enhance(root,control){const document=root.ownerDocument;\n${source.replace(/^import[^\n]*\n/gm,'').replace(header,'const kind=root.dataset.overlay,life=new AbortController(),signal=life.signal;').replace(pagehide,'')}\n}`;
  }
  factory=`function sourceAPI(){const pinAPI=${apiExpression(await read('pin.js'))};\n${genie}\n${isolated}\n${enhancement}\nreturn {mount(root,options){const controller=mountOverlay(root,options);${enhancement?'enhance(root,controller);':''}return controller;}};}`;rootSelector='.overlay-demo';
 }else{
  let source=await read('buttons.js');
  if(variant.endsWith('-navigation')&&source.includes('document.activeElement')){
   if(!source.includes('function mount(element)'))throw new Error('Unrecognized navigation focus scope');
   source=source.replaceAll('document.activeElement','element.getRootNode().activeElement');
  }
  factory=`function sourceAPI(){return ${apiExpression(source)}}`;rootSelector=selector(markup,variant);
 }
 // Source template/CSS are trusted repository constants. User values are never
 // interpolated as HTML. All browser operations stay inside mountInto().
 return `import {retainFont} from './react-font.mjs';
export const variant=${JSON.stringify(variant)};
const markup=${JSON.stringify(markup)};
const sourceCSS=${JSON.stringify(css)};
${factory}
export function mountInto(host,options={}, {preview=false}={}){
 if(!host||typeof host.attachShadow!=='function')throw new TypeError('A DOM host is required');
 const shadow=host.shadowRoot||host.attachShadow({mode:'open'});
 shadow.innerHTML=markup;
 const style=host.ownerDocument.createElement('style');
 const fontURL=new URL('./instrument-sans-variable.woff2',import.meta.url).href;
 style.textContent=sourceCSS.replaceAll('./instrument-sans-variable.woff2',fontURL)+':host{display:block;min-width:0;max-width:100%;font-family:"Instrument Sans",sans-serif}[hidden]{display:none!important}';
 shadow.prepend(style);
 const root=shadow.querySelector(${JSON.stringify(rootSelector)});
 if(!root){shadow.replaceChildren();throw new Error('Missing component root');}
 const releaseFont=retainFont(host.ownerDocument,fontURL);
 let controller,destroyed=false;
 try{
  const api=sourceAPI(),bindings={};
  if(variant==='upload')bindings.input=shadow.querySelector('input[type="file"]');
  if(['like','copy','download','bookmark','playback','delete','upload','share','follow'].includes(variant))bindings.feedback=shadow.querySelector('.'+variant+'-feedback');
  if(preview&&typeof api.mountPreview!=='function')throw new Error('This source has no preview adapter; supply its documented application callbacks.');
  controller=(preview?api.mountPreview:api.mount)(root,{...bindings,...options});
  if(typeof controller?.destroy!=='function')throw new Error('Missing source cleanup contract');
 }
 catch(error){releaseFont();shadow.replaceChildren();throw error;}
 return new Proxy(controller,{get(target,key){
  if(key==='destroy')return()=>{if(destroyed)return;destroyed=true;try{target.destroy();}finally{releaseFont();shadow.replaceChildren();}};
  const value=Reflect.get(target,key,target);return typeof value==='function'?value.bind(target):value;
 }});
}
`;
}
