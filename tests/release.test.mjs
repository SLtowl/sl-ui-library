import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {components,categories} from '../public/catalog-data.js';

const root=new URL('../',import.meta.url);
const text=path=>readFile(new URL(path,root),'utf8');
const json=async path=>JSON.parse(await text(path));

test('release versions and public component counts agree with the catalog',async()=>{
  const pkg=await json('package.json');
  for(const path of ['plugin.json','.codex-plugin/plugin.json','.claude-plugin/plugin.json','assets/catalog.json']){
    assert.equal((await json(`plugins/sl-ui-library/${path}`)).version,pkg.version,path);
  }
  const readme=await text('README.md');
  assert.ok(readme.includes(`**${components.length} interactive components**`));
  for(const category of categories){
    const count=components.filter(c=>c.category===category.id).length;
    assert.ok(readme.includes(`| ${category.label} | ${count} |`),category.id);
  }
  assert.doesNotMatch(readme,/awaiting owner review|Nothing added yet|Local development snapshot/);
  const manifest=await json('plugins/sl-ui-library/.codex-plugin/plugin.json');
  assert.ok(manifest.interface.longDescription.includes(`${components.length} HTML`));
  assert.ok((await text('public/showcase.html')).includes(`${components.length} components.`));
});
