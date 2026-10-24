import test from 'node:test';
import assert from 'node:assert/strict';
import {paletteJavaScript} from '../public/experiments/library-shell/palette-javascript.mjs';
const tag='sl-source-inputs-next-twenty-login-v11';
const options={sourceTag:tag,namespace:'palette-blue'};
test('a colored export gives the three real global API arguments the same independent identity',()=>{
 const source=`/* ${tag} */ const text="${tag} Привет"; if(customElements.get("${tag}"))return; customElements.define('${tag}',Source); const n=document.createElement("${tag}");`;
 const expected=source.replace(`get("${tag}")`,`get("${tag}-palette-blue")`).replace(`define('${tag}'`,`define('${tag}-palette-blue'`).replace(`createElement("${tag}")`,`createElement("${tag}-palette-blue")`);
 assert.equal(paletteJavaScript(source,x=>x,options),expected);
 assert.equal(paletteJavaScript(source,x=>x),source);
});
test('namespace validation and partial owned registration fail explicitly',()=>{
 for(const identity of [{sourceTag:tag,namespace:'blue/x'},{sourceTag:'x<script>',namespace:'palette-blue'}])assert.throws(()=>paletteJavaScript('',x=>x,identity),/Invalid export source identity/);
 assert.throws(()=>paletteJavaScript(`customElements.get('${tag}');customElements.define(TAG,C);document.createElement('${tag}');`,x=>x,options),/unsupported/);
 assert.throws(()=>paletteJavaScript(`customElements.get('${tag}');`,x=>x,options),/registration triple/);
});
test('comments, expressions, APIs and ordinary strings stay literal',()=>{
 const source=`// customElements.get('${tag}')\nconst regex=/${tag}\\/\\*/; const text='Привет ${tag}'; const tpl=\`Hello ${tag} \${obj.value}\`; other.customElements.get('${tag}'); document.createElement(variable); customElements.define(otherName,Other);`;
 assert.equal(paletteJavaScript(source,x=>x,options),source);
});
test('the two-argument CSS-only contract preserves all other bytes and interpolation expressions',()=>{
 const source='const value="Привет"; const css=`.x { color: #fff; width: ${size}px; }`; const literal="sl-source-line"; const re=/#fff/;';
 assert.equal(paletteJavaScript(source,css=>css.replace('#fff','#123')),source.replace('color: #fff','color: #123'));
 assert.equal(paletteJavaScript(source,()=>{throw Error('legacy transform failure');}),source);
 assert.equal(paletteJavaScript('const css=`sl-source-example {color:#fff}`;',css=>css.replace('#fff','#123')),'const css=`sl-source-example {color:#fff}`;');
});
test('namespace identity is stable on repeat and distinct across the three palettes',()=>{
 const source=`customElements.get('${tag}');customElements.define('${tag}',C);document.createElement('${tag}');`;
 const results=['black','white','blue'].map(palette=>{
  const identity={sourceTag:tag,namespace:'palette-'+palette},next=paletteJavaScript(source,x=>x,identity);
  assert.equal(paletteJavaScript(next,x=>x,identity),next);return next;
 });
 assert.equal(new Set(results).size,3);
});
test('tag-first CSS recognition is explicit to the namespace path',()=>{
 const source=`const css=\`${tag}{color:#fff}\`;`;
 assert.equal(paletteJavaScript(source,css=>css.replace('#fff','#123')),source);
 assert.equal(paletteJavaScript(source,css=>css.replace('#fff','#123'),options),source.replace('#fff','#123'));
 assert.throws(()=>paletteJavaScript(source,()=>{throw Error('unsupported CSS');},options),/unsupported CSS/);
});
