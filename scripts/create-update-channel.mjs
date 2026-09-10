import {readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
const commit=process.argv[2];
if(!/^[a-f0-9]{40}$/.test(commit??''))throw new Error('Pass the immutable 40-character Git commit containing the built data.');
const assets='plugins/sl-ui-library/assets/';
const catalog=JSON.parse(await readFile(new URL(`../${assets}catalog.json`,import.meta.url),'utf8'));
const manifest={schemaVersion:1,version:catalog.version};
for(const [key,name] of [['catalog','catalog.json'],['bundle','source-bundle.json']]){
 const bytes=await readFile(new URL(`../${assets}${name}`,import.meta.url));
 manifest[key]={url:`https://raw.githubusercontent.com/SLtowl/sl-ui-library/${commit}/${assets}${name}`,sha256:createHash('sha256').update(bytes).digest('hex')};
}
await writeFile(new URL('../plugin-channel.json',import.meta.url),JSON.stringify(manifest,null,2)+'\n',{flag:'wx'});
console.log('Created plugin-channel.json locally. Verify the referenced commit, review, then publish separately. Existing manifests are never overwritten.');
