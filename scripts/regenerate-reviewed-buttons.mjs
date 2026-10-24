/** Explicit target-only QA regeneration; never promotes a family or mutates its input checkout. */
import {readFile,writeFile,mkdir,readdir,lstat} from 'node:fs/promises';
import {resolve,dirname,isAbsolute,relative} from 'node:path';
import {pathToFileURL,fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
import {variants} from '../release-tools/compositions/buttons-review.mjs';
import {approved91} from '../release-tools/compositions/inventory.mjs';
import {bundleLocal,localCss} from '../release-tools/compositions/local-families.mjs';
import {bundleCore,coreCss} from '../release-tools/compositions/core.mjs';
import {bundleComposition,compositionCss} from '../release-tools/compositions/composition-families.mjs';
import servicesCopy from '../release-tools/compositions/services-copy.mjs';
import extensionsCopy from '../release-tools/compositions/extensions-copy.mjs';
const [canonical,staging,runtime]=process.argv.slice(2);
if(![canonical,staging,runtime].every(p=>p&&isAbsolute(p)))throw Error('Usage: node scripts/regenerate-reviewed-buttons.mjs <absolute-canonical> <absolute-staging> <absolute-runtime>');
const input=resolve(canonical),output=resolve(staging);
if(output===input||!relative(output,input).startsWith('..')||!relative(input,output).startsWith('..'))throw Error('Staging must be separate from canonical input');
// Inspect every existing parent without realpath (which Windows sandbox can deny on read-only inputs).
async function refuseLinks(path){for(let p=path;;p=dirname(p)){try{if((await lstat(p)).isSymbolicLink())throw Error('Symlink staging parent');}catch(e){if(e.code!=='ENOENT')throw e;}if(dirname(p)===p)break;}}
await refuseLinks(output);
const {reviewedSourceRoot}=await import(pathToFileURL(resolve(input,'release-tools/reviewed-source-root.mjs')));
const sourceRoot=fileURLToPath(await reviewedSourceRoot(input));
if(resolve(sourceRoot)!==resolve(input,'review-sources'))throw Error('Reviewed source archive marker required');
const esbuild=await import(pathToFileURL(resolve(runtime,'node_modules/esbuild/lib/main.js')));
if(esbuild.version!=='0.28.2')throw Error('Expected private esbuild 0.28.2');
const copy={...JSON.parse(await readFile(resolve(input,'release-tools/public-copy.json'),'utf8')),...servicesCopy,...extensionsCopy};
const entries=approved91.filter(e=>variants.includes(e.variants[0]));
if(entries.length!==13||new Set(entries.map(e=>e.variants[0])).size!==13)throw Error('Expected exactly 13 approved targets');
const outputs=[];
for(const entry of entries){const family=entry.batch==='everyday-buttons'?'everyday':entry.key==='cta'?'compositions':'services',args={sourceRoot,targetRoot:input,entry,esbuild,copy,family};
 const js=family==='everyday'?await bundleLocal(args):family==='compositions'?await bundleComposition(args):await bundleCore(args);
 const css=family==='everyday'?await localCss(sourceRoot,family,entry):family==='compositions'?await compositionCss(sourceRoot,family,'sl-source-'+entry.variants[0]):await coreCss(sourceRoot,family,entry);
 for(const [file,content]of [['buttons.js',js],['buttons.css',css]])outputs.push({path:`public/packages/${entry.variants[0]}/${file}`,content});
}
const sha256=data=>createHash('sha256').update(data).digest('hex');
const receipt=[];
try{if((await readdir(resolve(output,'public/packages'))).some(name=>!variants.includes(name)))throw Error('Unexpected variant in target staging');}catch(e){if(e.code!=='ENOENT')throw e;}
// Capture originals before any package write. Output closure is constant and checked above.
for(const item of outputs){await refuseLinks(resolve(output,item.path));await refuseLinks(resolve(output,'originals',item.path));item.original=await readFile(resolve(input,item.path));receipt.push({path:item.path,originalHash:sha256(item.original),sha256:sha256(item.content)});}
for(const item of outputs){const target=resolve(output,item.path),original=resolve(output,'originals',item.path);await mkdir(dirname(target),{recursive:true});await mkdir(dirname(original),{recursive:true});await writeFile(original,item.original);await writeFile(target,item.content);}
const names=await readdir(resolve(output,'public/packages'));
if(names.some(name=>!variants.includes(name)))throw Error('Unexpected variant in target staging');
await writeFile(resolve(output,'target-generation-receipt.json'),JSON.stringify({esbuild:esbuild.version,targets:entries.map(e=>e.variants[0]),files:receipt},null,2)+'\n');
console.log(`Compiled and staged only ${entries.length} approved targets (${outputs.length} files).`);
