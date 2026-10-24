import {prepareButtonsAccount,exportsCss,exportsDetailsCss} from './buttons-review.mjs';
import {prepareInputsAccount,inputsAccountCss,factorInputsAccountRegistry} from './inputs-review.mjs';
import {prepareDataDisplayAccount,prepareDataDisplayAccountRegistry} from './owner-review-data-display.mjs';
import {readFile} from 'node:fs/promises';
import {resolve,posix} from 'node:path';
import {accountFamilies} from './account-families.mjs';
import {prepareAccountFocus} from './account-focus.mjs';
import {prepareAccountRecovery} from './account-recovery.mjs';

export const corePrimitives=['pair','text-input','textarea-input','password-input','code-input'];

/** Prune the known build-previews grammar before bundling. Fail on unknown grammar. */
export function pruneRegistry(source,keys=corePrimitives) {
  const boundary=source.indexOf('export const previews = {');
  if(boundary<0)throw new Error('Unsupported generated registry grammar');
  const declarations=[...source.slice(0,boundary).matchAll(/^const (style\d+|api\d+) = /gm)];
  const chunks=new Map(declarations.map((m,i)=>[m[1],source.slice(m.index,declarations[i+1]?.index??boundary)]));
  const entries=keys.map(key=>{
    const line=source.slice(boundary).split('\n').find(l=>l.startsWith(JSON.stringify(key)+':'));
    if(!line)throw new Error(`Missing approved primitive ${key}`);
    return line.replace(/,\s*$/,'');
  });
  const names=new Set(entries.flatMap(line=>[...line.matchAll(/\b(?:style|api)\d+\b/g)].map(m=>m[0])));
  for(const name of names)if(!chunks.has(name))throw new Error(`Missing registry declaration ${name}`);
  return [...names].map(name=>chunks.get(name)).join('\n')+'\nexport const previews={\n'+entries.join(',\n')+'\n};';
}

export function translateSource(source,copy) {
  let translated=source;
  for(const [from,to]of Object.entries(copy).sort((a,b)=>b[0].length-a[0].length))translated=translated.split(from).join(to);
  const missing=translated.match(/[^\n]*[\u0400-\u04ff][^\n]*/g);
  if(missing)throw new Error('Untranslated fixed core copy: '+missing.join('\n'));
  translated=translated.replace("el('p','ac-status','Local example. Changes are not sent to a server.')","el('p','ac-status',options.demo?'Local example. Changes are not sent to a server.':'Connect your application action handler to apply changes.')");
  return translated;
}

/** Audited public-language defaults; locale choices and integer money stay intact. */
export function translateAccountSource(path,source,copy,entry) {
  source=prepareInputsAccount(path,source,entry);
  source=prepareButtonsAccount(path,source,entry);
  source=prepareDataDisplayAccount(path,source,entry);
  let result=translateSource(prepareAccountFocus(path,prepareAccountRecovery(path,source)),copy);
  if(path==='account-extensions-ru/value.js')result=result.replace("saved={locale:'ru-RU'","saved={locale:'en-GB'");
  if(path==='account-services-ru/data.js')result=result.replace("new Intl.NumberFormat('ru-RU'","new Intl.NumberFormat('en-GB'");
  return result;
}

export async function bundleCore({sourceRoot,targetRoot,entry,esbuild,copy,family='core'}) {
  const configuration=accountFamilies[family];
  if(!configuration)throw new Error('Unknown account family');
  const registryPath=resolve(targetRoot,'public/preview-data.js');
  const registry=prepareDataDisplayAccountRegistry(factorInputsAccountRegistry(pruneRegistry(await readFile(registryPath,'utf8')),entry),entry);
  const key=entry.key,variant=entry.variants[0];
  const entrySource=`import {mount as reviewedMount} from '../account-core-ru/runtime.js';${configuration.imports}
const instances=new WeakMap();
function initialize(root,options,demo){instances.get(root)?.destroy();let destroyed=false;const inner=document.createElement('div');root.replaceChildren(inner);root.classList.add('sl-component');root.dataset.kind=${JSON.stringify(variant)};const control=reviewedMount(inner,{...options,key:${JSON.stringify(key)},renderers:${configuration.renderers},demo});const api={reset(){if(!destroyed)control.reset();},cancel(){if(!destroyed)control.cancel();},destroy(){if(destroyed)return;destroyed=true;control.destroy();if(instances.get(root)===api){root.replaceChildren();instances.delete(root);}},get state(){return control.state;}};instances.set(root,api);return api;}
function mount(root,options={}){return initialize(root,options,false);}
function mountPreview(root){return initialize(root,{},true);}
window.SLComponent={mount,mountPreview};`;
  const allowed=new Set(Object.values(accountFamilies).flatMap(f=>f.files.map(file=>f.folder+'/'+file)));
  const result=await esbuild.build({stdin:{contents:entrySource,sourcefile:configuration.folder+'/entry.js',resolveDir:'/'},bundle:true,write:false,format:'iife',platform:'browser',target:'es2022',minify:true,legalComments:'none',sourcemap:false,plugins:[{
    name:'approved-core-virtual-sources',setup(build){
      build.onResolve({filter:/.*/},args=>{
        if(args.path==='/preview-data.js')return {path:'registry.js',namespace:'approved'};
        if(!args.path.startsWith('.'))throw new Error(`Unapproved account dependency ${args.path}`);
        const importer=args.namespace==='approved'?args.importer:configuration.folder+'/entry.js';
        const name=posix.normalize(posix.join(posix.dirname(importer),args.path));
        if(!allowed.has(name))throw new Error(`Unapproved account source ${name}`);
        return {path:name,namespace:'approved'};
      });
      build.onLoad({filter:/.*/,namespace:'approved'},async args=>({contents:args.path==='registry.js'?registry:translateAccountSource(args.path,await readFile(resolve(sourceRoot,'experiments',args.path),'utf8'),copy,entry),loader:args.path.endsWith('.json')?'json':'js'}));
    }
  }]});
  const js=result.outputFiles[0].text;
  if(/C:[/\\]|\/preview-data\.js|\/drafts\/|[\u0400-\u04ff]/i.test(js))throw new Error('Portable core bundle contains forbidden source residue');
  return js;
}

export async function coreCss(sourceRoot,family='core',entry) {
  const css=await readFile(resolve(sourceRoot,'experiments/account-core-ru/styles.css'),'utf8');
  const scoped=css.slice(css.indexOf('.account-control{'));
  const comfort=await readFile(resolve(sourceRoot,'experiments/account-core-ru/comfort.css'),'utf8');
  let extra='';
  for(const folder of family==='extensions'?['account-services-ru','account-extensions-ru']:family==='services'?['account-services-ru']:[])extra+='\n'+(await readFile(resolve(sourceRoot,'experiments',folder,'styles.css'),'utf8')).split('\n').slice(1).join('\n');
  return `@font-face{font-family:'Instrument Sans';src:url('./instrument-sans-variable.woff2') format('woff2');font-weight:400 700;font-display:swap}.sl-component{width:100%;max-width:320px;min-width:0}`+scoped+'\n'+comfort+extra+'\n.sl-component .account-control:focus-visible{outline:2px solid #eee;outline-offset:-4px}'+(entry?.variants?.[0]==='buttons-account-services-exports-v11'?exportsCss+exportsDetailsCss:'')+inputsAccountCss(entry);
}
