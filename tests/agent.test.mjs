import {test} from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,readFile,lstat,symlink,mkdir,readdir,cp,writeFile} from 'node:fs/promises';
import {execFile} from 'node:child_process';
import {promisify} from 'node:util';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {createHash} from 'node:crypto';
import {run} from '../plugins/sl-ui-library/scripts/library.mjs';
import {selectData,updateSettings} from '../plugins/sl-ui-library/scripts/updates.mjs';
import {installPlugin} from '../install.mjs';
import {downloadCounts} from '../scripts/download-counts.mjs';
const root=new URL('../',import.meta.url);
test('discovery, reserved categories and invalid input',async()=>{
 const list=await run(['list']);assert.equal(list.components.length,110);
 assert.equal((await run(['list','navigation'])).components.length,10);
 assert.equal((await run(['list','feedback'])).components.length,0);
 assert.ok((await run(['search','dialog'])).components.some(c=>c.id==='matte-modal-overlay'));
 assert.ok((await run(['search','navigation'])).count>0);
 assert.ok((await run(['inspect','matte-modal-overlay'])).files['modal-overlay'].includes('genie.js'));
 await assert.rejects(()=>run(['inspect','missing']));
 await assert.rejects(()=>run(['read','../../private','index.html']));
 await assert.rejects(()=>run(['read','modal-overlay','../catalog.json']));
 await assert.rejects(()=>run(['search']));
});
test('every bundled file matches its actual package source',async()=>{
 const bundle=JSON.parse(await readFile(new URL('plugins/sl-ui-library/assets/source-bundle.json',root)));
 assert.equal(Object.keys(bundle.packages).length,112);
 for(const [variant,files] of Object.entries(bundle.packages))for(const [name,hash] of Object.entries(files)){
  const bytes=await readFile(new URL(`public/packages/${variant}/${name}`,root));
  assert.equal(createHash('sha256').update(bytes).digest('hex'),hash);
  const blob=bundle.blobs[hash];assert.deepEqual(Buffer.from(blob.content,blob.encoding),bytes);
 }
 const code=await run(['read','modal-overlay','genie.js']);assert.match(code.content,/createGenie/);
});
test('install preserves bytes and never overwrites',async()=>{
 const temp=await mkdtemp(join(tmpdir(),'sl-ui-agent-'));
 const dest=join(temp,'dialog');
 const result=await run(['install','modal-overlay',dest]);assert.equal(result.installed,true);
 assert.deepEqual(await readFile(join(dest,'genie.js')),await readFile(new URL('public/packages/modal-overlay/genie.js',root)));
 const before=await readFile(join(dest,'index.html'));
 await assert.rejects(()=>run(['install','modal-overlay',dest]),{code:'EEXIST'});
 assert.deepEqual(await readFile(join(dest,'index.html')),before);
 await assert.rejects(()=>run(['install','modal-overlay',join(temp,'.git')]));
 await assert.rejects(()=>run(['install','modal-overlay',join(temp,'missing','dialog')]));
 await assert.rejects(()=>run(['install','no-such-variant',join(temp,'bad')]));
 assert.deepEqual((await readdir(temp)).sort(),['dialog']);
});
test('symlink destination parent is rejected',async()=>{
 const temp=await mkdtemp(join(tmpdir(),'sl-ui-symlink-')),target=join(temp,'real'),link=join(temp,'linked');
 await mkdir(target);await symlink(target,link,process.platform==='win32'?'junction':'dir');
 assert.equal((await lstat(link)).isSymbolicLink(),true);
 await assert.rejects(()=>run(['install','like',join(link,'button')]),/symlink/);
 assert.deepEqual(await readdir(target),[]);
});
test('copied plugin works without its source repository',async()=>{
 const temp=await mkdtemp(join(tmpdir(),'sl-ui-portable-')),plugin=join(temp,'sl-ui-library');
 await cp(new URL('plugins/sl-ui-library/',root),plugin,{recursive:true});
 const {stdout}=await promisify(execFile)(process.execPath,[join(plugin,'scripts','library.mjs'),'list'],{cwd:temp});
 assert.equal(JSON.parse(stdout).components.length,110);
 const {stdout:installed}=await promisify(execFile)(process.execPath,[join(plugin,'scripts','library.mjs'),'install','like',join(temp,'like')],{cwd:temp});
 assert.equal(JSON.parse(installed).installed,true);
});
test('palette exports validated colors without changing the library',async()=>{
 const temp=await mkdtemp(join(tmpdir(),'sl-ui-palette-'));
 const palette=await run(['palette','like']);assert.ok(palette.colors.some(v=>v.color==='#202222'));
 const map=join(temp,'palette.json');await writeFile(map,JSON.stringify({'#202222':'#24213b'}));
 const result=await run(['install','like',join(temp,'violet'),'--palette',map]);assert.equal(result.paletteApplied,true);
 assert.match(await readFile(join(temp,'violet','buttons.css'),'utf8'),/--like-ink: #24213b/);
 assert.match(await readFile(new URL('public/packages/like/buttons.css',root),'utf8'),/--like-ink: #202222/);
 await writeFile(map,JSON.stringify({'#202222':'red; background:url(https://invalid)'}));
 await assert.rejects(()=>run(['install','like',join(temp,'invalid'),'--palette',map]),/hex colors/);
 await assert.rejects(()=>lstat(join(temp,'invalid')),{code:'ENOENT'});
 await writeFile(map,JSON.stringify({'#123abc':'#fff'}));
 await assert.rejects(()=>run(['install','like',join(temp,'absent'),'--palette',map]),/does not exist/);
});
test('one-command installer plans safely and delegates only to Codex CLI',async()=>{
 const dry=await installPlugin(['--dry-run'],()=>{throw new Error('Unexpected host mutation');});assert.equal(dry.commands.length,2);
 const calls=[];
 const result=await installPlugin([],async(exe,args)=>{calls.push({exe,args});return {stdout:JSON.stringify({marketplaces:[]})};});
 assert.equal(result.installed,true);assert.equal(calls.length,3);assert.ok(calls.every(c=>c.exe==='codex'));
 const same=await installPlugin([],async()=>({stdout:JSON.stringify({marketplaces:[{name:'personal',root:dry.commands[0].args[3]}]})}));assert.equal(same.installed,true);
 await assert.rejects(()=>installPlugin([],async()=>({stdout:JSON.stringify({marketplaces:[{name:'personal',path:'/different'}]})})),/already exists/);
 await assert.rejects(()=>installPlugin(['--force']));
});
test('unpublished or unapproved updates make no network requests',async()=>{
 const cache=await mkdtemp(join(tmpdir(),'sl-ui-update-'));
 const bundled={catalog:{schemaVersion:1,version:'1.0.0'},bundle:{}};
 const fetcher=()=>{throw new Error('No network expected');};
 assert.equal(await selectData({cache,bundled,policy:{published:false},fetcher}),bundled);
 assert.equal(await selectData({cache,bundled,policy:{published:true},fetcher}),bundled);
 await assert.rejects(()=>updateSettings('enable',{cache,policy:{published:false}}),/not published/);
 assert.equal((await readdir(cache)).length,0);
});
test('opt-in updates verify hashes, refresh once daily and fall back offline',async()=>{
 const cache=await mkdtemp(join(tmpdir(),'sl-ui-update-live-'));
 const originalCatalog=JSON.parse(await readFile(new URL('plugins/sl-ui-library/assets/catalog.json',root)));
 const bundle=JSON.parse(await readFile(new URL('plugins/sl-ui-library/assets/source-bundle.json',root)));
 const bundled={catalog:originalCatalog,bundle};
 const catalog={...originalCatalog,version:'1.1.0'};
 const base='https://raw.githubusercontent.com/SLtowl/sl-ui-library/';
 const policy={published:true,feed:base+'main/plugin-channel.json',intervalHours:24};
 await updateSettings('enable',{cache,policy});
 const catalogBytes=Buffer.from(JSON.stringify(catalog)),bundleBytes=Buffer.from(JSON.stringify(bundle));
 const manifest={schemaVersion:1,version:'1.1.0',catalog:{url:base+'a'.repeat(40)+'/catalog.json',sha256:createHash('sha256').update(catalogBytes).digest('hex')},bundle:{url:base+'a'.repeat(40)+'/bundle.json',sha256:createHash('sha256').update(bundleBytes).digest('hex')}};
 let requests=0;
 const fetcher=async url=>{requests++;return new Response(url===policy.feed?JSON.stringify(manifest):url.endsWith('/catalog.json')?catalogBytes:bundleBytes);};
 const updated=await selectData({cache,policy,bundled,fetcher,now:1e9});assert.equal(updated.catalog.version,'1.1.0');assert.equal(requests,3);
 await selectData({cache,policy,bundled,fetcher,now:1e9+1000});assert.equal(requests,3);
 const offline=await selectData({cache,policy,bundled,fetcher:async()=>{throw new Error('Offline');},now:1e9+86400001});assert.equal(offline.catalog.version,'1.1.0');
 await updateSettings('disable',{cache,policy});assert.equal((await selectData({cache,policy,bundled,fetcher})).catalog.version,'1.0.0');
});
test('invalid remote hashes and untrusted update URLs cannot replace bundled data',async()=>{
 const cache=await mkdtemp(join(tmpdir(),'sl-ui-update-bad-'));
 const bundled={catalog:JSON.parse(await readFile(new URL('plugins/sl-ui-library/assets/catalog.json',root))),bundle:JSON.parse(await readFile(new URL('plugins/sl-ui-library/assets/source-bundle.json',root)))};
 const base='https://raw.githubusercontent.com/SLtowl/sl-ui-library/';
 const policy={published:true,feed:base+'main/plugin-channel.json',intervalHours:24};await updateSettings('enable',{cache,policy});
 const manifest={schemaVersion:1,version:'9.0.0',catalog:{url:'https://evil.invalid/catalog',sha256:'a'.repeat(64)}};
 let requests=0;
 const value=await selectData({cache,policy,bundled,fetcher:async()=>{requests++;return new Response(JSON.stringify(manifest));}});
 assert.equal(requests,1);assert.equal(value,bundled);
 const cache2=await mkdtemp(join(tmpdir(),'sl-ui-update-hash-'));await updateSettings('enable',{cache:cache2,policy});
 manifest.catalog.url=base+'a'.repeat(40)+'/catalog.json';
 const hashValue=await selectData({cache:cache2,policy,bundled,fetcher:async url=>new Response(url===policy.feed?JSON.stringify(manifest):'{}')});assert.equal(hashValue,bundled);
});
test('download report is read-only, paginated and does not return its credential',async()=>{
 const paths=[];
 const report=await downloadCounts({token:'test-secret',fetcher:async(url,options)=>{
  paths.push(url);assert.equal(options.headers.Authorization,'Bearer test-secret');assert.equal(options.redirect,'error');
  return new Response(JSON.stringify(url.includes('/assets?')?[{name:'plugin.zip',download_count:17}]:[{id:1,tag_name:'v1.0.0'}]));
 }});
 assert.equal(report.total,17);assert.equal(paths.length,2);assert.ok(!JSON.stringify(report).includes('test-secret'));
 await assert.rejects(()=>downloadCounts({token:''}),/GH_TOKEN/);
});
