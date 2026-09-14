import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { runInNewContext } from 'node:vm';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import batch from '../../public/catalog-batches/sliders.js';

const repo = new URL('../../', import.meta.url);
const source = async (slug, file) => readFile(new URL(`public/packages/sliders-${slug}-v11/${file}`,repo),'utf8');

// Small event/element fixture exercises the exported controller without a DOM dependency.
// It deliberately does not claim to emulate native pointer handling or browser layout.
class Element {
  constructor(attrs={}) {
    this.attrs={...attrs};this.dataset={};this.listeners=new Map();this.disabled=false;this.textContent='';
    this.style={setProperty(name,value){this[name]=String(value);}};
    for(const [key,value] of Object.entries(attrs)) if(key.startsWith('data-'))this.dataset[key.slice(5).replace(/-([a-z])/g,(_,c)=>c.toUpperCase())]=value;
    this.value=attrs.value??'';
  }
  setAttribute(key,value){this.attrs[key]=String(value);}
  getAttribute(key){return this.attrs[key]??null;}
  addEventListener(type,fn){if(!this.listeners.has(type))this.listeners.set(type,new Set());this.listeners.get(type).add(fn);}
  removeEventListener(type,fn){this.listeners.get(type)?.delete(fn);}
  dispatchEvent(event){event.target??=this;for(const fn of [...this.listeners.get(event.type)??[]])fn(event);return !event.defaultPrevented;}
  get valueAsNumber(){return Number(this.value);}
}
class CustomEvent {
  constructor(type,options={}){this.type=type;Object.assign(this,options);this.defaultPrevented=false;}
  preventDefault(){this.defaultPrevented=true;}
}
async function fixture(slug,options={}) {
  const html=await source(slug,'index.html'),elements=[];
  for(const match of html.matchAll(/<([a-z][\w-]*)\b([^>]*)>/g)) {
    const attrs=Object.fromEntries([...match[2].matchAll(/([\w-]+)(?:="([^"]*)")?/g)].map(m=>[m[1],m[2]??'']));
    const el=new Element(attrs);el.tag=match[1];elements.push(el);
  }
  const root=elements.find(e=>e.attrs.class==='sl-component');
  root.ownerDocument={defaultView:{CustomEvent}};
  root.getRootNode=()=>({activeElement:null});
  root.querySelectorAll=selector=>{
    if(selector==='input[type="range"]')return elements.filter(e=>e.tag==='input'&&e.attrs.type==='range');
    if(selector==='button[data-action]')return elements.filter(e=>e.tag==='button'&&'data-action'in e.attrs);
    const [,key,value]=selector.match(/^\[([^=\]]+)(?:="([^"]*)")?\]$/)??[];
    if(!key)throw new Error('Unsupported selector: '+selector);
    return elements.filter(e=>key in e.attrs&&(value===undefined||e.attrs[key]===value));
  };
  root.querySelector=selector=>root.querySelectorAll(selector)[0]??null;
  const context={window:{}};runInNewContext(await source(slug,'buttons.js'),context);
  const api=context.window.SLComponent,controller=api.mount(root,options),inputs=root.querySelectorAll('input[type="range"]');
  const plain=()=>JSON.parse(JSON.stringify(controller.state));
  const input=(i,value)=>{inputs[i].value=String(value);inputs[i].dispatchEvent(new CustomEvent('input'));};
  const key=(i,key)=>inputs[i].dispatchEvent(new CustomEvent('keydown',{key}));
  const click=action=>root.querySelector(`[data-action="${action}"]`).dispatchEvent(new CustomEvent('click'));
  return {root,api,controller,inputs,plain,input,key,click,elements};
}

test('fourteen revised exports compile and preserve offline, scoped package contracts',async()=>{
  assert.equal(batch.length,14);assert.equal(new Set(batch.map(c=>c.id)).size,14);
  assert.ok(!batch.some(c=>c.id==='matte-sliders-thresholds-v11'));
  assert.ok(!(await readdir(new URL('public/packages/',repo))).includes('sliders-thresholds-v11'));
  const license=await readFile(new URL('LICENSE',repo));
  const font=await readFile(new URL('public/packages/range-slider/instrument-sans-variable.woff2',repo));
  for(const c of batch){
    assert.equal(c.category,'sliders');assert.equal(c.variants.length,1);assert.equal(c.usage.length,3);
    const variant=c.variants[0],folder=new URL(`public/packages/${variant}/`,repo);
    assert.deepEqual((await readdir(folder)).sort(),['LICENSE','OFL.txt','buttons.css','buttons.js','example.js','index.html','instrument-sans-variable.woff2'].sort());
    assert.deepEqual(await readFile(new URL('LICENSE',folder)),license);
    assert.deepEqual(await readFile(new URL('instrument-sans-variable.woff2',folder)),font);
    const html=await readFile(new URL('index.html',folder),'utf8'),js=await readFile(new URL('buttons.js',folder),'utf8'),css=await readFile(new URL('buttons.css',folder),'utf8');
    assert.match(html,/<html lang="en">/);assert.match(html,/name="viewport"/);assert.equal((html.match(/class="sl-component"/g)??[]).length,1);
    assert.match(html,new RegExp(`data-kind="${variant}"`));assert.doesNotMatch(html.match(/<body>([\s\S]*)<\/body>/)[1],/<script/);
    assert.doesNotMatch(js,/innerHTML|fetch\(|XMLHttpRequest|setTimeout|requestAnimationFrame|document\.querySelector|document\.activeElement|new WeakMap/);
    assert.match(js,/window\.SLComponent = \{ mount, mountPreview \};/);
    const expression=js.match(/\(\(\) => \{[\s\S]*\}\)\(\);\s*$/)?.[0];assert.ok(expression);
    const compiled=runInNewContext(expression.replace(/window\.\w+\s*=\s*(\{[^;]+\});/,'return $1;'));assert.equal(typeof compiled.mountPreview,'function');
    for(const file of ['buttons.js','example.js'])execFileSync(process.execPath,['--check',fileURLToPath(new URL(file,folder))]);
    assert.match(css,/prefers-reduced-motion:reduce/);assert.match(css,/\.sl-component input:focus-visible/);
    assert.doesNotMatch(css,/(?:^|\})\s*(?:button|input|svg|body|\*|:root)\b/);
    assert.doesNotMatch(html+js+css,/(?:src|href)=["']https?:|url\(["']?https?:/);
    for(const token of ['ink','surface','edge','text','muted','accent','secondary','track','focus'])assert.ok(css.includes('--sl-'+token));
  }
});

for(const component of batch){
  const slug=component.variants[0].slice(8,-4);
  test(`${slug}: keyboard, numeric text, lifecycle, disabled state and independent mounts`,async()=>{
    let calls=0;const f=await fixture(slug,{onChange:()=>calls++}),g=await fixture(slug);
    const initial=f.plain(),otherInitial=g.plain();
    let events=0;f.root.addEventListener('sliderchange',e=>{events++;assert.equal(e.composed,true);assert.equal(e.bubbles,true);});
    for(let i=0;i<f.inputs.length;i++){
      f.key(i,'End');const maximum=Number(f.inputs[i].getAttribute('aria-valuemax'));assert.equal(f.plain().values[i],maximum);
      f.key(i,'Home');assert.equal(f.plain().values[i],Number(f.inputs[i].getAttribute('aria-valuemin')));
      const before=f.plain().values[i],step=Number(f.inputs[i].attrs.step);f.key(i,'ArrowRight');
      assert.equal(f.plain().values[i],Math.min(Number(f.inputs[i].getAttribute('aria-valuemax')),Number((before+step).toFixed(6))));
      assert.equal(f.root.querySelector(`[data-value="${i}"]`).textContent,f.inputs[i].getAttribute('aria-valuetext'));
      f.controller.reset();assert.deepEqual(f.plain(),initial);
    }
    assert.equal(events,calls);assert.deepEqual(g.plain(),otherInitial);
    f.controller.setDisabled(true);const disabled=f.plain();
    f.key(0,'End');f.input(0,999);for(const b of f.root.querySelectorAll('button[data-action]')){assert.equal(b.disabled,true);f.click(b.dataset.action);}
    assert.deepEqual(f.plain(),disabled);f.controller.reset();assert.deepEqual(f.plain(),initial);
    assert.throws(()=>f.controller.setValues([NaN]),/finite/);assert.throws(()=>f.controller.setDisabled('yes'),/boolean/);
    const snapshot=f.controller.state;snapshot.values[0]=987;assert.notEqual(f.plain().values[0],987);
    for(let n=0;n<3;n++){
      const next=f.api.mount(f.root);assert.equal(f.inputs[0].listeners.get('input').size,1);
      next.destroy();next.destroy();assert.equal(f.inputs[0].listeners.get('input').size,0);
    }
    const stopped=f.plain();f.key(0,'End');f.controller.reset();assert.deepEqual(f.plain(),stopped);
    f.controller.destroy();g.controller.destroy();
  });
}

test('cart quantity clamps counts, updates cents exactly and never submits an order',async()=>{
  const f=await fixture('quantity');assert.equal(f.plain().subtotalCents,2400);
  f.click('more');assert.equal(f.plain().quantity,3);assert.equal(f.plain().subtotalCents,3600);
  f.key(0,'End');f.click('more');assert.equal(f.plain().quantity,20);
  assert.equal(f.root.querySelector('[data-action="more"]').disabled,true);
  f.key(0,'Home');f.click('less');assert.equal(f.plain().quantity,1);
  assert.equal(f.root.querySelector('[data-total]').textContent,'$12.00');
  f.controller.setValues([4.4]);assert.equal(f.plain().quantity,4);
  assert.equal(f.plain().currency,'USD');
});
test('reading spacing applies a unitless line-height and restores the default',async()=>{
  const f=await fixture('line-height');f.key(0,'End');assert.equal(f.plain().lineHeight,2);
  assert.equal(f.root.querySelector('[data-reading]').style.lineHeight,'2');
  f.click('default');assert.equal(f.plain().lineHeight,1.5);
});
test('content width maps percentages to the actual centered column',async()=>{
  const f=await fixture('content-width');f.click('full');assert.equal(f.plain().widthCss,'100%');
  f.key(0,'Home');assert.equal(f.root.querySelector('[data-column]').style.width,'50%');
  f.click('default');assert.equal(f.plain().widthPercent,80);
});
test('card spacing changes gap alone and both presets reverse',async()=>{
  const f=await fixture('card-gap');f.click('compact');assert.equal(f.plain().gapPx,4);
  f.click('spacious');assert.equal(f.plain().gapCss,'24px');
  assert.equal(f.root.querySelector('[data-list]').style.gap,'24px');
  f.controller.reset();assert.equal(f.plain().gapPx,12);
});
test('thumbnail presets change the actual gallery size token',async()=>{
  const f=await fixture('thumbnails');f.click('large');assert.equal(f.plain().thumbnailPx,88);
  f.click('small');assert.equal(f.plain().thumbnailCss,'48px');
  assert.equal(f.root.querySelector('[data-gallery]').style['--thumbnail-size'],'48px');
});
test('hover rules cannot darken the background of a selected button',async()=>{
  for(const c of batch){
    const css=await source(c.variants[0].slice(8,-4),'buttons.css');
    assert.ok(css.includes('button:hover:enabled:not([aria-pressed="true"])'));
  }
});
test('locked loop translates without shortening at either clip edge',async()=>{
  const f=await fixture('loop');f.click('lock');f.key(0,'End');assert.deepEqual(f.plain().values,[96,120]);assert.equal(f.plain().duration,24);
  f.key(1,'Home');assert.deepEqual(f.plain().values,[0,24]);assert.equal(f.root.querySelector('[data-action="earlier"]').disabled,true);
  f.click('later');assert.deepEqual(f.plain().values,[1,25]);f.click('lock');f.key(0,'End');assert.equal(f.plain().duration,1);
  f.controller.reset();assert.equal(f.plain().locked,false);
});
test('crossfade gives exact silence at endpoints and preserves the selected mixing law',async()=>{
  const f=await fixture('crossfade');const [a,b]=f.plain().gains;assert.ok(Math.abs(a*a+b*b-1)<1e-12);
  f.key(0,'End');assert.deepEqual(f.plain().gains,[0,1]);assert.equal(f.root.querySelector('[data-adb]').textContent,'−∞ dB');
  f.key(0,'Home');assert.deepEqual(f.plain().gains,[1,0]);f.click('curve');f.click('center');assert.deepEqual(f.plain().gains,[.5,.5]);
  for(let n=0;n<40;n++)f.click('curve');assert.equal(f.plain().equalPower,false);
});
test('gain converts decibels to amplitude and restores gain after mute',async()=>{
  const f=await fixture('gain');f.controller.setValues([-60]);assert.equal(f.plain().amplitude,.001);
  f.click('unity');assert.equal(f.plain().amplitude,1);f.click('mute');assert.equal(f.plain().amplitude,0);
  f.controller.setValues([12]);f.click('mute');assert.ok(Math.abs(f.plain().amplitude-10**.6)<1e-12);
});
test('bounded allocation protects the reserve during excessive edits',async()=>{
  const f=await fixture('allocation');f.key(0,'End');assert.deepEqual(f.plain().hours,[55,35,10]);
  f.controller.setValues([200,200]);assert.deepEqual(f.plain().hours,[80,10,10]);f.click('balance');assert.deepEqual(f.plain().hours,[40,40,20]);
});
test('gradient stops stay ordered and produce a usable, token-based CSS gradient',async()=>{
  const f=await fixture('gradient-stops');f.key(1,'Home');assert.deepEqual(f.plain().values,[10,15,90]);
  f.key(2,'Home');assert.deepEqual(f.plain().values,[10,15,20]);f.click('spread');assert.deepEqual(f.plain().values,[0,50,100]);
  assert.match(f.plain().gradient,/var\(--sl-stop-shade\) 0%.*var\(--sl-stop-light\) 100%/);
});
test('log frequencies span 20–20000 Hz with a constant ratio and real unit text',async()=>{
  const f=await fixture('frequency-band');assert.ok(Math.abs(f.plain().frequenciesHz[0]-200)<1e-10);
  f.controller.setValues([0,120]);assert.deepEqual(f.plain().frequenciesHz,[20,20000]);
  f.key(0,'ArrowRight');assert.ok(Math.abs(f.plain().frequenciesHz[0]/20-1000**(1/120))<1e-12);
  assert.match(f.inputs[0].getAttribute('aria-valuetext'),/Hz$/);f.key(0,'End');assert.equal(f.plain().values[1]-f.plain().values[0],1);
});
test('ADSR presets update time geometry and normalized sustain',async()=>{
  const f=await fixture('envelope');f.click('pluck');assert.deepEqual(f.plain().values,[10,150,25,200]);assert.equal(f.plain().sustain,.25);
  const before=f.root.querySelector('[data-envelope]').getAttribute('d');f.click('pad');assert.equal(f.plain().sustain,.8);
  assert.notEqual(f.root.querySelector('[data-envelope]').getAttribute('d'),before);assert.match(f.root.querySelector('[data-summary]').textContent,/3100 ms/);
  f.controller.setValues([14,19,101,1999]);assert.deepEqual(f.plain().values,[10,20,100,2000]);
});
test('dead-zone output is zero, symmetric and saturated at the exact thresholds',async()=>{
  const f=await fixture('dead-zone');f.controller.setValues([20,80,20]);assert.equal(f.plain().response,0);
  f.controller.setValues([20,80,50]);assert.equal(f.plain().response,.5);f.controller.setValues([20,80,-50]);assert.equal(f.plain().response,-.5);
  f.controller.setValues([20,80,-80]);assert.equal(f.plain().response,-1);f.controller.setValues([20,80,100]);assert.equal(f.plain().response,1);
});
test('tolerance includes exact decimal edges, clamps symmetrically and reports rejection',async()=>{
  const f=await fixture('tolerance');f.controller.setValues([50.1,.2,50.3]);assert.equal(f.plain().accepted,true);
  f.key(2,'ArrowRight');assert.equal(f.plain().accepted,false);assert.equal(f.root.querySelector('[data-verdict-text]').textContent,'Outside tolerance');
  f.controller.setValues([0,20,0]);assert.equal(f.plain().lower,0);assert.equal(f.plain().upper,0);assert.equal(f.plain().accepted,true);
  f.controller.setValues([95,20,100]);assert.equal(f.plain().lower,90);assert.equal(f.plain().upper,100);assert.equal(f.plain().accepted,true);
});
test('repeat reversals keep all constrained editors finite and within announced bounds',async()=>{
  for(const slug of ['loop','allocation','gradient-stops','frequency-band','tolerance','quantity','line-height','content-width','card-gap','thumbnails']){
    const f=await fixture(slug);for(let n=0;n<100;n++){
      const i=n%f.inputs.length;f.input(i,n%2===0?1e6:-1e6);
      f.plain().values.forEach((v,j)=>{assert.ok(Number.isFinite(v));assert.ok(v>=Number(f.inputs[j].getAttribute('aria-valuemin')));assert.ok(v<=Number(f.inputs[j].getAttribute('aria-valuemax')));});
    }
  }
});

test('semantic palette is readable in charcoal and can be adapted to a light surface',async()=>{
  const luminance=hex=>{const rgb=hex.match(/[a-f\d]{2}/gi).map(v=>parseInt(v,16)/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4);return rgb[0]*.2126+rgb[1]*.7152+rgb[2]*.0722;};
  const contrast=(a,b)=>{const x=luminance(a),y=luminance(b);return(Math.max(x,y)+.05)/(Math.min(x,y)+.05);};
  for(const palette of [{ink:'202222',text:'f5f7f4',muted:'b4c0b8',accent:'d4e4d8'},{ink:'f5f7f4',text:'202222',muted:'414843',accent:'40594c'}]){
    assert.ok(contrast(palette.text,palette.ink)>4.5);assert.ok(contrast(palette.muted,palette.ink)>4.5);assert.ok(contrast(palette.accent,palette.ink)>4.5);
  }
});
