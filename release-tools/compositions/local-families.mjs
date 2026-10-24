import {prepareButtonsLocal,prepareButtonsCss,prepareButtonsEntry} from './buttons-review.mjs';
import {inputsSignatureCss} from './inputs-compositions-review.mjs';
import {prepareOwnerReviewTogglesLocal} from './owner-review-toggles.mjs';
import {prepareDataDisplayLocal,dataDisplayLocalCss} from './owner-review-data-display.mjs';
import {readFile} from 'node:fs/promises';
import {resolve,posix} from 'node:path';
import {translateSource} from './core.mjs';
import everydayCopy from './everyday-copy.mjs';
import dailyCopy from './daily-copy.mjs';

export const localFamilies={
 everyday:{batch:'everyday-buttons',folder:'everyday-buttons-ru',files:['button.js','examples.js','icons.js','motion.js','invite-motion.js','motion-tokens.js','manifest.js'],copy:everydayCopy,names:{top:'Back to top',more:'Show more',defaults:'Reset settings',redo:'Redo action',invert:'Invert selection','expand-all':'Expand all',invite:'Invite member',signout:'Sign out',call:'Call',email:'Compose email',support:'Support chat',directions:'Get directions',calendar:'Add to calendar'}},
 daily:{batch:'daily-controls',folder:'daily-controls-ru',files:['helpers.js','actions.js','blocks.js','choices.js','motion.tokens.json'],copy:dailyCopy,names:{currency:'Price currency',payment:'Checkout payment choice',signature:'Signature field',poll:'Single-vote poll',partners:'Partner marks',hours:'Business hours',splitter:'Resizable panels',tracking:'Order tracking'}},
};

export function prepareLocalSource(family,file,source,entry){
 source=prepareButtonsLocal(family,file,source,entry);
 source=prepareOwnerReviewTogglesLocal(family,file,source,entry);
 source=prepareDataDisplayLocal(family,file,source,entry);
 const configuration=localFamilies[family];
 if(!configuration||!configuration.files.includes(file))throw new Error('Unapproved local family dependency');
 if(family==='daily'&&file==='actions.js'){
   const marker='  signature(t){',start=source.indexOf(marker);
   if(start<0||source.indexOf(marker,start+1)>=0||!source.endsWith('};\n'))throw new Error('Unexpected reviewed signature renderer grammar');
   source='export const actions={\n'+source.slice(start);
 }
 let translated=translateSource(source,configuration.copy);
 if(family==='daily'&&file==='choices.js')translated=translated.replace("new Intl.NumberFormat('ru-RU'","new Intl.NumberFormat('en-GB'");
 return translated;
}

export function localEntry(family,entry){
 const variant=JSON.stringify(entry.variants[0]),key=JSON.stringify(entry.key);
 const imports=family==='everyday'?"import {mount as reviewedMount} from './button.js';import {example} from './examples.js';":"import {mount as reviewedMount} from './helpers.js';import {actions} from './actions.js';import {choices} from './choices.js';import {blocks} from './blocks.js';";
 const create=family==='everyday'?`let demoExample=demo?example(${key}):null;control=reviewedMount(inner,{...options,key:${key},onAction:demo?()=>demoExample.run():options.onAction});if(demoExample){inner.insertBefore(demoExample.sample,control.button);demoExample.ready?.();}`:`control=reviewedMount(inner,{...options,key:${key},renderers:{...actions,...choices,...blocks},demo});`;
 return prepareButtonsEntry(family,`${imports}
const instances=new WeakMap();function initialize(root,options,demo){instances.get(root)?.destroy();let control,destroyed=false;const inner=document.createElement('div');root.replaceChildren(inner);root.classList.add('sl-component');root.dataset.kind=${variant};function render(){control?.destroy();root.replaceChildren(inner);${create}}render();const api={reset(){if(!destroyed)render();},destroy(){if(destroyed)return;destroyed=true;control.destroy();if(instances.get(root)===api){root.replaceChildren();instances.delete(root);}},get state(){return control.state;}};instances.set(root,api);return api;}function mount(root,options={}){return initialize(root,options,false);}function mountPreview(root){return initialize(root,{},true);}window.SLComponent={mount,mountPreview};`,entry);
}

export async function bundleLocal({sourceRoot,entry,esbuild,family}){
 const configuration=localFamilies[family];
 const result=await esbuild.build({stdin:{contents:localEntry(family,entry),sourcefile:'portable-local-entry.js',resolveDir:'/'},bundle:true,write:false,format:'iife',platform:'browser',target:'es2022',minify:true,legalComments:'none',sourcemap:false,plugins:[{name:'reviewed-local-family',setup(build){
   build.onResolve({filter:/.*/},args=>{if(!args.path.startsWith('./')||!configuration.files.includes(posix.basename(args.path)))throw new Error('Unapproved local dependency '+args.path);return {path:posix.basename(args.path),namespace:'reviewed-local'};});
   build.onLoad({filter:/.*/,namespace:'reviewed-local'},async args=>({contents:prepareLocalSource(family,args.path,await readFile(resolve(sourceRoot,'experiments',configuration.folder,args.path),'utf8'),entry),loader:args.path.endsWith('.json')?'json':'js'}));
 }}]});
 const code=result.outputFiles[0].text;
 if(/C:[/\\]|\/preview-data\.js|\/drafts\/|[\u0400-\u04ff]/i.test(code))throw new Error('Local bundle residue');
 return code;
}

export async function localCss(sourceRoot,family,entry){
 const configuration=localFamilies[family],original=await readFile(resolve(sourceRoot,'experiments',configuration.folder,'styles.css'),'utf8');
 let css;
 if(family==='daily')css=original.slice(original.indexOf('.daily-control{'));
 else css=original.split('\n').slice(4).join('\n').replace('main{padding-inline:12px}','');
 if(/:root|\bbody\s*\{|#preview|@import|url\(['"]?\//.test(css))throw new Error('Local CSS source escape');
 const inherited=family==='everyday'?"color:#222;font:14px/1.45 'Instrument Sans',sans-serif;font-synthesis:none;-webkit-font-smoothing:antialiased;":'';
  return `@font-face{font-family:'Instrument Sans';src:url('./instrument-sans-variable.woff2') format('woff2');font-weight:400 700;font-display:swap}.sl-component{width:100%;max-width:320px;min-width:0;${inherited}}`+dataDisplayLocalCss(family,prepareButtonsCss(family,css,entry),entry)+inputsSignatureCss(entry);
}
