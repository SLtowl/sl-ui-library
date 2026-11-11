import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {components,categories} from '../public/catalog-data.js';

export const approved=JSON.parse(await readFile(new URL('./approved-components.json',import.meta.url),'utf8'));
export const approvedRelease91=JSON.parse(await readFile(new URL('./approved-release-91.json',import.meta.url),'utf8'));
const originalIds=new Set(approved.map(item=>item.id)),releaseIds=new Set(approvedRelease91.map(item=>item.id));
// Keep the original167 owner-reviewed batch contract independent of this release.
const product=components.filter(component=>component.collection==='product');
export const additions=components.filter(component=>component.collection!=='product'&&!originalIds.has(component.id)&&!releaseIds.has(component.id));
export const expectedCount=439;
export const expectedVariants=441;

export function assertCatalogContract({complete=false}={}){
 assert.equal(approved.length,130,'The original approved baseline remains frozen.');
 assert.equal(approvedRelease91.length,91,'This release contains exactly91 owner-approved additions.');
 assert.equal(releaseIds.size,91);assert.equal(categories.length,10);
 assert.deepEqual(approvedRelease91.map(item=>item.localNumber),Array.from({length:93},(_,i)=>i+1).filter(n=>n!==54&&n!==55));
 assert.equal(new Set(components.map(item=>item.id)).size,components.length);
 for(const item of [...approved,...approvedRelease91]){
  const current=components.find(component=>component.id===item.id);assert.ok(current,'Missing approved component: '+item.id);
  assert.equal(current.category,item.category);assert.deepEqual(current.variants,item.variants);
 }
 for(const category of categories){
  const batch=additions.filter(component=>component.category===category.id);
  const originalBatchSize=category.id==='sliders'?14:category.id==='buttons'?53:category.id==='inputs'||category.id==='selection'?20:10;
  assert.equal(batch.length,originalBatchSize,'Original approved batch changed: '+category.id);
 }
 for(const item of [...additions,...approvedRelease91.map(item=>components.find(component=>component.id===item.id))]){
  assert.equal(item.variants.length,1);const variant=item.variants[0];
  assert.ok(variant.startsWith(item.category+'-')&&variant.endsWith('-v11'));
  assert.equal(item.id,'matte-'+variant);assert.equal(item.downloads[variant],'./downloads/matte-'+variant+'.zip');
  assert.ok(categories.some(category=>category.id===item.category));
 }
 assert.equal(additions.length,167,'Preserve all167 previously approved batches, with no unrelated additions.');
 assert.equal(product.length,51);
 for(const [category,count] of [['buttons',10],['inputs',11],['selection',10],['checkboxes',10],['sliders',10]]){
  assert.equal(product.filter(component=>component.category===category).length,count);
 }
 for(const item of product){
  assert.match(item.id,/^product-[a-z0-9-]+$/);
  assert.deepEqual(item.variants,[item.id]);
  assert.equal(item.downloads[item.id],`./downloads/matte-${item.id}.zip`);
 }
 assert.equal(components.length,expectedCount);assert.equal(new Set(components.flatMap(item=>item.variants)).size,expectedVariants);
 if(complete)assert.equal(approved.length+additions.length+approvedRelease91.length+product.length,expectedCount);
}
