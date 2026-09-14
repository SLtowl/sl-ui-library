import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {components,categories} from '../public/catalog-data.js';

export const approved=JSON.parse(await readFile(new URL('./approved-components.json',import.meta.url),'utf8'));
export const additions=components.filter(component=>!approved.some(item=>item.id===component.id));
export const expectedCount=approved.length+additions.length;
export const expectedVariants=approved.flatMap(item=>item.variants).length+additions.length;

export function assertCatalogContract({complete=false}={}) {
  assert.equal(approved.length,130,'The approved baseline must remain explicit.');
  assert.equal(categories.length,10);
  assert.equal(new Set(components.map(item=>item.id)).size,components.length);
  for(const item of approved){
    const current=components.find(component=>component.id===item.id);
    assert.ok(current,'Missing approved component: '+item.id);
    assert.equal(current.category,item.category);
    assert.deepEqual(current.variants,item.variants);
  }
  for(const category of categories){
    const batch=additions.filter(component=>component.category===category.id);
    // Owner revision: remove one threshold editor and add five everyday sliders.
    const batchSize=category.id==='sliders'?14:10;
    assert.ok(batch.length===0||batch.length===batchSize,'Partial batch: '+category.id);
    for(const item of batch){
      assert.equal(item.variants.length,1);
      const variant=item.variants[0];
      assert.ok(variant.startsWith(category.id+'-')&&variant.endsWith('-v11'));
      assert.equal(item.id,'matte-'+variant);
      assert.equal(item.downloads[variant],'./downloads/matte-'+variant+'.zip');
    }
  }
  assert.ok(additions.every(item=>categories.some(category=>category.id===item.category)));
  assert.equal(components.length,expectedCount);
  assert.equal(new Set(components.flatMap(item=>item.variants)).size,expectedVariants);
  if(complete)assert.equal(additions.length,104,'All revised batches are required for signoff.');
}
