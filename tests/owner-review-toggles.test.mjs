import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {prepareOwnerReviewTogglesComposition as composition,prepareOwnerReviewTogglesRegistry as registry,prepareOwnerReviewTogglesLocal as local,repairOwnerReviewPrivacyMarkup as markup,repairOwnerReviewPrivacyCss as css} from '../release-tools/compositions/owner-review-toggles.mjs';

const select='sl-source-selection-compositions-select-v11',cookies='sl-source-selection-compositions-cookies-v11',filters='sl-source-selection-compositions-filters-v11';
const beforeMarkup='<path class="sl-lock__shackle" d="M10 14V10a6 6 0 0 1 12 0v4"/><path class="sl-lock__key" d="M16 19v3"/>';
const beforeCss='.sl-lock__shackle { transform-box: fill-box; transform-origin: 26% 80%; transition: transform 520ms ease; }\n.sl-toggle--privacy[data-checked="false"] .sl-lock__shackle { transform: translate(3px, -2px) rotate(24deg); }';
const oldRegistry='const style0 = '+JSON.stringify(beforeCss)+';\nexport const previews={\n"glide-toggle": { markup: "unchanged bell", css: style0, mount: api0.mount },\n"privacy-toggle": { markup: '+JSON.stringify(beforeMarkup)+', css: style0, mount: api0.mount }\n};';

test('exact composition tags and paths preserve all unrelated source bytes',()=>{
 const untouched='literal Unicode: <用户> Привет 🧩';
 for(const tag of ['sl-source-unrelated',select+'-copy',cookies+'-copy',filters+'-copy'])for(const path of ['library-compositions-ru/essentials.js','library-compositions-ru/popular.js'])assert.equal(composition(path,untouched,tag),untouched);
 assert.equal(composition('unrelated.js',untouched,select),untouched);
 assert.equal(registry(untouched,select),untouched);
 assert.equal(registry(untouched,filters),untouched);
});

test('format adaptation closes only recognized choices and is idempotent',()=>{
 const source="source('status-menu',{prepare(root)";
 const repaired=composition('library-compositions-ru/essentials.js',source,select);
 assert.match(repaired,/choices\.some\(choice=>choice\[0\]===event\.detail\.value\)/);
 assert.match(repaired,/host\.controller\.close\(true\)/);
 assert.match(repaired,/t\.on\(host\.sourceRoot,'menuselect'/);
 assert.equal(composition('library-compositions-ru/essentials.js',repaired,select),repaired);
 assert.throws(()=>composition('library-compositions-ru/essentials.js','missing',select),/grammar/);
 assert.throws(()=>composition('library-compositions-ru/essentials.js',source+source,select),/grammar/);
});

test('filter adaptation is confined to its toolbar and is idempotent',()=>{
 const source='tools.append(categories,action(';
 const repaired=composition('library-compositions-ru/popular.js',source,filters);
 assert.equal(repaired,"tools.style.gridTemplateColumns='minmax(0,1fr)';"+source);
 assert.equal(composition('library-compositions-ru/popular.js',repaired,filters),repaired);
 assert.throws(()=>composition('library-compositions-ru/popular.js','missing',filters),/grammar/);
 assert.throws(()=>composition('library-compositions-ru/popular.js',source+source,filters),/grammar/);
});

test('payment adaptation changes only the exact On delivery entry',()=>{
 const source="'Оплатить при доставке','cash'",entry={key:'payment',variants:['selection-daily-controls-payment-v11']};
 assert.equal(local('daily','choices.js',source,entry),"'Оплатить при доставке','box'");
 const repaired=local('daily','choices.js',source,entry);
 assert.equal(local('daily','choices.js',repaired,entry),repaired);
 for(const entry of [{key:'tracking',variants:['selection-daily-controls-payment-v11']},{key:'payment',variants:['selection-daily-controls-payment-v11-copy']},{key:'payment',variants:['selection-daily-controls-payment-v11','another']}])assert.equal(local('daily','choices.js',source,entry),source);
 assert.equal(local('everyday','choices.js',source,entry),source);
 assert.equal(local('daily','helpers.js',source,entry),source);
 assert.throws(()=>local('daily','choices.js','missing',entry),/grammar/);
 assert.throws(()=>local('daily','choices.js',source+source,entry),/grammar/);
});

test('privacy geometry repairs recognized grammar once and fails closed',()=>{
 const repaired=markup(beforeMarkup);assert.match(repaired,/M10 13V10a6 6 0 0 1 12 0v3/);assert.match(repaired,/pathLength="1"/);assert.equal(markup(repaired),repaired);
 const sheet=css(beforeCss);assert.match(sheet,/transform-origin: 22px 13px/);assert.match(sheet,/transform: rotate\(32deg\)/);assert.equal(css(sheet),sheet);
 for(const transform of [markup,css]){assert.throws(()=>transform('missing'),/grammar/);assert.throws(()=>transform((transform===markup?beforeMarkup:beforeCss).repeat(2)),/grammar/);}
});

test('old shared registry clones only privacy entry and preserves other bytes',()=>{
 const repaired=registry(oldRegistry,cookies);
 assert.equal(repaired.split('\n')[0],oldRegistry.split('\n')[0]);
 assert.equal(repaired.split('\n').find(line=>line.startsWith('"glide-toggle":')),oldRegistry.split('\n').find(line=>line.startsWith('"glide-toggle":')));
 assert.equal(registry(repaired,cookies),repaired);
 assert.throws(()=>registry(oldRegistry.replace('"privacy-toggle":','"other":'),cookies),/entry/);
 assert.throws(()=>registry(oldRegistry+'\n'+oldRegistry.split('\n').find(line=>line.startsWith('"privacy-toggle":')),cookies),/entry/);
 assert.throws(()=>registry(oldRegistry.replace(', css: style0, mount: api0.mount }\n};',', css: unavailable, mount: api0.mount }\n};'),cookies),/grammar/);
});

test('already rebuilt native registry stays byte-identical',()=>{
 const ready=oldRegistry.replace(JSON.stringify(beforeCss),JSON.stringify(css(beforeCss))).replace(JSON.stringify(beforeMarkup),JSON.stringify(markup(beforeMarkup)));
 assert.equal(registry(ready,cookies),ready);
});

test('five native toggle sheets retain shared factoring and privacy-only selectors',async()=>{
 const sheets=await Promise.all(['privacy','theme','glide','sound','sync'].map(name=>readFile(new URL('../public/packages/'+name+'-toggle/buttons.css',import.meta.url),'utf8')));
 for(const sheet of sheets)assert.equal(sheet,sheets[0]);
 assert.match(sheets[0],/\.sl-lock__shackle \{ transform-box: view-box; transform-origin: 22px 13px;/);
 assert.match(sheets[0],/\.sl-toggle--privacy\[data-checked="false"\] \.sl-lock__shackle \{ transform: rotate\(32deg\); \}/);
});
