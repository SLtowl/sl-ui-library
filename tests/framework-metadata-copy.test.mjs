import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=process.env.SL_UI_METADATA_ROOT||fileURLToPath(new URL('../',import.meta.url));
const text=name=>readFile(resolve(root,name),'utf8');
const json=async name=>JSON.parse(await text(name));
const formats=['HTML','CSS','JavaScript','React','Next.js'];
function five(value,label){for(const format of formats)assert.ok(value.includes(format),label+' must name '+format);}
test('plugin discovery surfaces name all five source formats',async()=>{
 for(const file of ['package.json','plugins/sl-ui-library/plugin.json','plugins/sl-ui-library/.claude-plugin/plugin.json','plugins/sl-ui-library/.codex-plugin/plugin.json'])five((await json(file)).description,file);
 const codex=await json('plugins/sl-ui-library/.codex-plugin/plugin.json');
 five(codex.interface.shortDescription,'Codex short description');five(codex.interface.longDescription,'Codex long description');
 assert.ok(codex.interface.shortDescription.length<=80);
 five((await json('.claude-plugin/marketplace.json')).plugins[0].description,'marketplace description');
 const skill=await text('plugins/sl-ui-library/skills/use-sl-ui/SKILL.md');five(skill.match(/^description: (.+)$/m)?.[1]||'','skill discovery');
});
test('patch metadata is consistent without losing the complete catalog',async()=>{
 const pkg=await json('package.json');const [major,minor,patch]=pkg.version.split('.').map(Number);
 assert.ok(major>1||major===1&&(minor>2||minor===2&&patch>=1),'Metadata changes require at least 1.2.1');
 for(const file of ['plugins/sl-ui-library/plugin.json','plugins/sl-ui-library/.claude-plugin/plugin.json','plugins/sl-ui-library/.codex-plugin/plugin.json'])assert.equal((await json(file)).version,pkg.version,file);
});
test('README and integration guide explain complete source-preserving exports',async()=>{
 const readme=await text('README.md');five(readme.split('\n')[2],'README opening');
 for(const file of ['README.md','docs/integration.md','plugins/sl-ui-library/skills/use-sl-ui/SKILL.md']){
  const value=await text(file);for(const name of ['Component.jsx','NextClient.jsx','react-controller.mjs','react-font.mjs'])assert.ok(value.includes(name),file+' must explain '+name);
  assert.ok(/client[- ](?:only|widget)/i.test(value),file+' must disclose client-widget rendering');
 }
 assert.ok(!(await text('docs/integration.md')).includes('not a framework-specific component'),'Remove superseded blanket integration statement');
});
test('website discovery metadata and help mention React and Next.js',async()=>{
 for(const file of ['index.html','catalog.html','docs.html','intro.html','category.html','component.html','showcase.html','studio-motion.html']){
  const html=await text('public/'+file);
  for(const key of ['og:description','twitter:description'])five(html.match(new RegExp('<meta (?:property|name)="'+key+'" content="([^"]+)"'))?.[1]||'',file+' '+key);
  if(['catalog.html','intro.html','category.html'].includes(file)){
   const help=(file==='catalog.html'?html.match(/<dialog\b[^>]*id="help"[\s\S]*?<\/dialog>/):html.match(/<dialog\b[\s\S]*?<\/dialog>/))?.[0]||'';
   assert.ok(help.includes('React')&&help.includes('Next.js'),file+' help');
  }
 }
});
