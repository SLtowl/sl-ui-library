import {readdir} from 'node:fs/promises';
import {spawn} from 'node:child_process';
import {fileURLToPath} from 'node:url';

async function discover(folder){
  const files=[];
  for(const entry of await readdir(folder,{withFileTypes:true})){
    const path=new URL(entry.name+(entry.isDirectory()?'/':''),folder);
    if(entry.isDirectory())files.push(...await discover(path));
    else if(entry.isFile()&&entry.name.endsWith('.test.mjs'))files.push(fileURLToPath(path));
  }
  return files.sort();
}
const files=await discover(new URL('../tests/',import.meta.url));
const child=spawn(process.execPath,['--test','--test-concurrency=2',...files],{stdio:'inherit'});
child.on('error',error=>{console.error(error.message);process.exitCode=1;});
child.on('exit',code=>{process.exitCode=code??1;});
