import {test} from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,readFile,writeFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {Script} from 'node:vm';
import {run} from '../plugins/sl-ui-library/scripts/library.mjs';
import {additions,assertCatalogContract} from './catalog-contract.mjs';

test('new batches retain the approved catalog and export standalone source',async()=>{
  assertCatalogContract();
  const temp=await mkdtemp(join(tmpdir(),'sl-ui-batch-export-'));
  for(const component of additions){
    const variant=component.variants[0],info=await run(['inspect',component.id]);
    for(const name of ['index.html','buttons.css','buttons.js','example.js','instrument-sans-variable.woff2','OFL.txt','LICENSE'])assert.ok(info.files[variant].includes(name),variant+' missing '+name);
    const destination=join(temp,variant);
    assert.equal((await run(['install',variant,destination])).installed,true);
    const source=await readFile(join(destination,'buttons.js'),'utf8');
    new Script(source,{filename:variant+'/buttons.js'});
    new Script(await readFile(join(destination,'example.js'),'utf8'),{filename:variant+'/example.js'});
    assert.match(source,/window\.SLComponent\s*=/,variant+' controller API');
    assert.match(source,/\bmountPreview\b/,variant+' preview adapter');
    assert.match(await readFile(join(destination,'index.html'),'utf8'),/class=["'][^"']*\bsl-component\b/,variant+' preview root');
    assert.match(await readFile(join(destination,'buttons.css'),'utf8'),/--[a-z][\w-]*\s*:/,variant+' palette variables');
    assert.match(await readFile(join(destination,'LICENSE'),'utf8'),/MIT License/);
    assert.ok((await readFile(join(destination,'instrument-sans-variable.woff2'))).length>1000);
  }
});

test('each new package supports a non-destructive palette export',async()=>{
  const temp=await mkdtemp(join(tmpdir(),'sl-ui-batch-palette-'));
  for(const component of additions){
    const variant=component.variants[0];
    const sourcePath=new URL('../public/packages/'+variant+'/buttons.css',import.meta.url);
    const original=await readFile(sourcePath);
    const palette=await run(['palette',variant]);
    const color=palette.colors.find(item=>item.color.toLowerCase()==='#202222')?.color||palette.colors.find(item=>/^#[a-f\d]{6}$/i.test(item.color))?.color;
    assert.ok(color,variant+' must expose a real palette');
    const map=join(temp,variant+'.json');
    await writeFile(map,JSON.stringify({[color]:'#24213b'}));
    const destination=join(temp,variant);
    const result=await run(['install',variant,destination,'--palette',map]);
    assert.equal(result.paletteApplied,true);
    assert.ok((await readFile(join(destination,'buttons.css'),'utf8')).includes('#24213b'),variant+' recolored CSS');
    assert.deepEqual(await readFile(sourcePath),original,variant+' source was modified');
  }
});
