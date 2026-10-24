import {prepareButtonsComposition,ctaCss} from './buttons-review.mjs';
import {prepareButtonsFollowupComposition} from './buttons-followup.mjs';
import {prepareInputsComposition,prepareInputsToolkit,inputsCompositionCss} from './inputs-compositions-review.mjs';
import {prepareOwnerReviewTogglesComposition,prepareOwnerReviewTogglesRegistry} from './owner-review-toggles.mjs';
import {prepareDataDisplayRegistry} from './owner-review-data-display.mjs';
import {readFile} from 'node:fs/promises';
import {resolve,posix} from 'node:path';
import {pruneRegistry,translateSource} from './core.mjs';
import copy from './composition-copy.mjs';

const base='library-compositions-ru/';
const shared=['source-host.js','motion-tokens.js'].map(file=>base+file);
export const compositionPrimitives=['pair','text-input','email-input','textarea-input','password-input','buttons-details-disclosure-v11','status-menu','labels-menu','inputs-attachment-v11','search-input','tabs-navigation','carousel-navigation','bookmark','glide-toggle','privacy-toggle','feature-list-checkbox'];
export const compositionFamilies={
  compositions:{batch:'compositions',folder:'library-compositions-ru',files:[...shared,base+'essentials.js',base+'popular.js'],primitives:compositionPrimitives.filter(key=>key!=='password-input'),names:{accordion:'Project questions',select:'Project format',multi:'Project topics',files:'Sample document queue',wizard:'Project brief wizard',nav:'Studio navigation',gallery:'Project collection',reorder:'Section order',comments:'Local project discussion',cookies:'Privacy preferences',search:'Library material search',tabs:'Project workspace',filters:'Material filters','featured-card':'Featured material',contact:'Project brief contact form',newsletter:'Subscription example',cta:'Page direction chooser',features:'Project feature set',announcement:'Dismissible announcement',footer:'Studio footer'}},
  next:{batch:'next-twenty',folder:'library-next-twenty-ru',files:[...shared,...['forms.js','blocks.js','commerce.js','tools.js','ui.js'].map(file=>'library-next-twenty-ru/'+file)],primitives:['pair','text-input','email-input','textarea-input','password-input','search-input'],names:{login:'Sign-in and recovery example',register:'Profile registration example',contact:'Email and message contact form',booking:'Appointment slot chooser',pricing:'Billing period plan',comparison:'Plan comparison',testimonials:'Sample review carousel',team:'Team contacts',metrics:'Visits overview',process:'Project process',product:'Product set chooser',cart:'Local shopping cart',delivery:'Delivery method chooser',promo:'Sample promo code',saved:'Saved material collection',reader:'Article reading guide',table:'Material selection table',notifications:'Local notification inbox',export:'Export settings preview','not-found':'Page recovery search'}},
};

// The English primitives need no runtime locale conversion. Only explicit fixed
// label overrides from reviewed renderers are applied; editable/user text is skipped.
export const englishDictionary=`export function translateText(text,extra={}){const trimmed=text.trim();const replacement=extra[trimmed];return replacement===undefined?text:text.replace(trimmed,replacement);}export function translate(root,extra){const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT),nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);for(const node of nodes){if(node.parentElement?.closest('input,textarea,[contenteditable],[data-user-text],style,script'))continue;const next=translateText(node.data,extra);if(node.data!==next)node.data=next;}for(const node of root.querySelectorAll('[aria-label],[placeholder],[title],[data-on],[data-off],[data-label]'))for(const attr of ['aria-label','placeholder','title','data-on','data-off','data-label']){if(!node.hasAttribute(attr))continue;const value=node.getAttribute(attr),next=translateText(value,extra);if(value!==next)node.setAttribute(attr,next);}}`;

function replaceOnce(source,from,to){if(!source.includes(from)||source.indexOf(from)!==source.lastIndexOf(from))throw new Error('Unexpected reviewed composition grammar: '+from);return source.replace(from,to);}
export function prepareCompositionSource(path,source,tag){
  source=prepareButtonsComposition(path,source,tag);
  source=prepareButtonsFollowupComposition(path,source,tag);
  source=prepareInputsComposition(path,source,tag);
  source=prepareOwnerReviewTogglesComposition(path,source,tag);
  const allowed=new Set(Object.values(compositionFamilies).flatMap(f=>f.files));
  if(!allowed.has(path))throw new Error('Unapproved composition source '+path);
  let result=path.endsWith('/source-host.js')||path.endsWith('/motion-tokens.js')?source:translateSource(source,copy);
  result=result.replaceAll('sl-source',tag);
  if(path===base+'source-host.js'){
    result=replaceOnce(result,'class Source extends HTMLElement {','function ensureSource(){if(customElements.get('+JSON.stringify(tag)+'))return;class Source extends HTMLElement {');
    result=replaceOnce(result,`customElements.define('${tag}',Source);`,`customElements.define('${tag}',Source);}`);
    result=replaceOnce(result,'export function source(variant, config={}) {','export function source(variant, config={}) {\n  ensureSource();');
  }
  if(path.endsWith('/ui.js'))result=result.replace("new Intl.NumberFormat('ru-RU'","new Intl.NumberFormat('en-GB'");
  result=result.replaceAll("toLocaleLowerCase('ru')","toLocaleLowerCase('en')").replaceAll("new Intl.NumberFormat('ru-RU'","new Intl.NumberFormat('en-GB'");
  if(/[\u0400-\u04ff]/.test(result))throw new Error('Untranslated composition source '+path);
  return result;
}

/** Retain the two audited app motion contexts, excluding review-page globals. */
export function reviewedToolkit(source,family){
  const start=source.indexOf('  const el='),marker=family==='compositions'?'  (renderers[only]':'  (renderers[key]',end=source.indexOf(marker);
  if(start<0||end<=start||source.indexOf(marker,end+1)>=0)throw new Error('Unexpected reviewed motion context');
  const context=source.slice(start,end);
  if(/document\.querySelector|parent\.|location\.|window\.__/.test(context))throw new Error('Review initialization leaked into toolkit');
  const imports=family==='compositions'?"import {essentials} from './essentials.js';import {popular} from './popular.js';":"import {forms} from './forms.js';import {blocks} from './blocks.js';import {commerce} from './commerce.js';import {tools} from './tools.js';";
  const renderers=family==='compositions'?'{...essentials,...popular}':'{...forms,...blocks,...commerce,...tools}';
  return `${imports}import {motionTokens} from '/drafts/ru/motion-tokens.js';
export function renderReviewed(root,key){const lifecycle=new AbortController(),animations=new Set(),running=new WeakMap(),visibility=new WeakMap();
${context}
const renderer=(${renderers})[key];if(!renderer)throw new Error('Unknown reviewed composition');renderer(t);${family==='next'?'for(const callback of mounted)callback();':''}
const media=matchMedia('(prefers-reduced-motion:reduce)');media.addEventListener('change',()=>{if(media.matches)for(const animation of animations)animation.cancel();},{signal:lifecycle.signal});
return {destroy(){lifecycle.abort();for(const animation of animations)animation.cancel();animations.clear();},get state(){return {key,local:true};}};}`;
}

export function compositionEntry(family,entry){
  return `import {renderReviewed} from './portable-runtime.js';const instances=new WeakMap();function initialize(root){instances.get(root)?.destroy();let control,destroyed=false;root.classList.add('sl-component');root.dataset.kind=${JSON.stringify(entry.variants[0])};function render(){control?.destroy();const inner=document.createElement('section');inner.className=${JSON.stringify(family==='next'?'composition next-composition':'composition')};inner.dataset.component=${JSON.stringify(entry.key)};root.replaceChildren(inner);control=renderReviewed(inner,${JSON.stringify(entry.key)});}render();const api={reset(){if(!destroyed)render();},destroy(){if(destroyed)return;destroyed=true;control.destroy();if(instances.get(root)===api){root.replaceChildren();instances.delete(root);}},get state(){return control.state;}};instances.set(root,api);return api;}function mount(root){return initialize(root);}function mountPreview(root){return initialize(root);}window.SLComponent={mount,mountPreview};`;
}

export async function bundleComposition({sourceRoot,targetRoot,entry,esbuild,family}){
  const configuration=compositionFamilies[family];if(!configuration)throw new Error('Unknown composition family');
  const tag='sl-source-'+entry.variants[0],allowed=new Set(configuration.files);
  const registry=prepareDataDisplayRegistry(prepareOwnerReviewTogglesRegistry(pruneRegistry(await readFile(resolve(targetRoot,'public/preview-data.js'),'utf8'),configuration.primitives),tag),tag);
  const runtime=prepareInputsToolkit(reviewedToolkit(await readFile(resolve(sourceRoot,'experiments',configuration.folder,'app.js'),'utf8'),family).replaceAll('sl-source',tag),tag);
  const result=await esbuild.build({stdin:{contents:compositionEntry(family,entry),sourcefile:configuration.folder+'/entry.js',resolveDir:'/'},bundle:true,write:false,format:'iife',platform:'browser',target:'es2022',minify:true,legalComments:'none',sourcemap:false,plugins:[{name:'reviewed-compositions',setup(build){
    build.onResolve({filter:/.*/},args=>{
      if(args.path==='/preview-data.js')return {path:'registry.js',namespace:'composition'};
      if(args.path==='/drafts/ru/source-host.js')return {path:base+'source-host.js',namespace:'composition'};
      if(args.path==='/drafts/ru/motion-tokens.js')return {path:base+'motion-tokens.js',namespace:'composition'};
      if(!args.path.startsWith('./'))throw new Error('Unapproved composition dependency '+args.path);
      const importer=args.namespace==='composition'?args.importer:configuration.folder+'/entry.js',path=posix.normalize(posix.join(posix.dirname(importer),args.path));
      if(path===base+'dictionary.js'||path===configuration.folder+'/portable-runtime.js'||allowed.has(path))return {path,namespace:'composition'};
      throw new Error('Unapproved composition source '+path);
    });
    build.onLoad({filter:/.*/,namespace:'composition'},async args=>({contents:args.path==='registry.js'?registry:args.path===base+'dictionary.js'?englishDictionary:args.path.endsWith('/portable-runtime.js')?runtime:prepareCompositionSource(args.path,await readFile(resolve(sourceRoot,'experiments',args.path),'utf8'),tag),loader:'js'}));
  }}]});
  const code=result.outputFiles[0].text;
  if(/C:[/\\]|\/preview-data\.js|\/drafts\/|[\u0400-\u04ff]|parent\.postMessage|location\.search/i.test(code))throw new Error('Composition bundle residue');
  return code;
}

/** Scope only the known reviewed flat CSS grammar; reject unknown at-rules. */
export function scopeCompositionCss(source,tag){
  const clean=source.replace(/\/\*[\s\S]*?\*\//g,'').replaceAll('sl-source',tag);
  let index=0;
  function rules(nested=false){let output='';while(index<clean.length){if(clean[index]==='}'){if(!nested)throw new Error('Unexpected CSS close');index++;return output;}const open=clean.indexOf('{',index);if(open<0){if(clean.slice(index).trim())throw new Error('Unexpected CSS tail');index=clean.length;break;}const selector=clean.slice(index,open).trim();index=open+1;
    if(selector.startsWith('@media')){output+=selector+'{'+rules(true)+'}';continue;}
    const close=clean.indexOf('}',index);if(close<0)throw new Error('Unclosed CSS rule');const body=clean.slice(index,close);index=close+1;
    if(selector.startsWith('@font-face'))continue;if(selector.startsWith('@'))throw new Error('Unapproved CSS directive '+selector);
    const selectors=selector.split(',').map(s=>s.trim()).filter(s=>!s.includes('#preview')&&!/^(html|body)(:|$)/.test(s)).map(s=>s===':root'?'.sl-component':s.startsWith(':root')?s.replace(':root','.sl-component'):'.sl-component '+s);
    if(selectors.length)output+=selectors.join(',')+'{'+body+'}';
  }if(nested)throw new Error('Unclosed CSS group');return output;}
  return rules();
}
export async function compositionCss(sourceRoot,family,tag){
  if(!compositionFamilies[family])throw new Error('Unknown composition family');
  let source=await readFile(resolve(sourceRoot,'experiments/library-compositions-ru/styles.css'),'utf8');
  if(family==='next')source+='\n'+await readFile(resolve(sourceRoot,'experiments/library-next-twenty-ru/styles.css'),'utf8');
  const cart=family==='next'?'.sl-component [data-component="cart"] .cart-item{min-width:0}.sl-component [data-component="cart"] .cart-item-bottom{flex-wrap:wrap}':'';
  return `@font-face{font-family:'Instrument Sans';src:url('./instrument-sans-variable.woff2') format('woff2');font-weight:400 700;font-display:swap}.sl-component{width:100%;max-width:320px;min-width:0}`+scopeCompositionCss(source,tag)+cart+(tag==='sl-source-buttons-compositions-cta-v11'?ctaCss:'')+inputsCompositionCss(tag);
}
