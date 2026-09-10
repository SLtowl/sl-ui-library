import {readFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {resolve} from 'node:path';
import {execFile} from 'node:child_process';
import {promisify} from 'node:util';
const root=fileURLToPath(new URL('./',import.meta.url));
export async function installPlugin(args=[],execute=promisify(execFile)){
 if(args.some(a=>a!=='--dry-run'))throw new Error('Usage: node install.mjs [--dry-run]');
 const marketplace=JSON.parse(await readFile(new URL('.claude-plugin/marketplace.json',import.meta.url),'utf8'));
 if(!/^[A-Za-z0-9_-]+$/.test(marketplace.name))throw new Error('Invalid marketplace name');
 if(!marketplace.plugins?.some(p=>p.name==='sl-ui-library'&&p.source==='./plugins/sl-ui-library'))throw new Error('Marketplace does not point to the expected local plugin');
 const selector=`sl-ui-library@${marketplace.name}`;
 const commands=[['plugin','marketplace','add',root,'--json'],['plugin','add',selector,'--json']];
 if(args.includes('--dry-run'))return {dryRun:true,commands:commands.map(args=>({executable:'codex',args})),changes:'Registers this local checkout and installs its plugin in Codex. No components are copied into your projects.'};
 // Use only the host CLI; never rewrite a personal marketplace or config file.
 const listed=await execute('codex',['plugin','marketplace','list','--json'],{maxBuffer:4e6});
 const existing=JSON.parse(listed.stdout).marketplaces??[];
 const normalized=value=>{const path=value.replaceAll('\\','/').replace(/\/$/,'');return process.platform==='win32'?path.toLowerCase():path;};
 const containsCheckout=value=>typeof value==='string'?normalized(value)===normalized(root):value&&typeof value==='object'?Object.values(value).some(containsCheckout):false;
 if(existing.some(m=>m.name===marketplace.name&&!containsCheckout(m)))throw new Error(`Marketplace ${marketplace.name} already exists elsewhere. Nothing was changed; choose a distinct repository marketplace name before installing.`);
 for(const args of commands)await execute('codex',args,{maxBuffer:4e6});
 return {installed:true,plugin:selector,next:'Start a new Codex task, then describe the interface you want in normal language. Keep this checkout available for reinstalling.'};
}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 try{console.log(JSON.stringify(await installPlugin(process.argv.slice(2)),null,2));}
 catch(error){console.error(error.code==='ENOENT'?'Codex CLI is required. Install Codex, then run this command again.':error.message);process.exitCode=1;}
}
