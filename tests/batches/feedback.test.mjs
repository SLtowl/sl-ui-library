import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { Script, runInNewContext } from 'node:vm';
import { setMaxListeners } from 'node:events';
import batch from '../../public/catalog-batches/feedback.js';

const packageRoot = new URL('../../public/packages/', import.meta.url);
const read = (slug, name) => readFile(new URL(`feedback-${slug}-v11/${name}`, packageRoot), 'utf8');
const slugs = batch.map(item => item.variants[0].replace(/^feedback-|-v11$/g, ''));

// A deliberately small DOM adapter for deterministic controller unit tests.
// Rendering, native validation, keyboard activation and layout are browser QA.
class Element {
  constructor(tag, doc, attrs = {}) {
    this.tagName = tag.toUpperCase(); this.ownerDocument = doc; this.attrs = { ...attrs };
    this.children = []; this.listeners = new Map(); this.parentElement = null; this.ownText = '';
    this.value = attrs.value ?? ''; this.defaultValue = this.value;
    this.checked = 'checked' in attrs; this.disabled = 'disabled' in attrs;
    this.hidden = 'hidden' in attrs; this.inert = 'inert' in attrs; this.readOnly = false;
    this.style = {}; this.dataset = new Proxy({}, {
      get: (_, key) => this.attrs['data-' + String(key).replace(/[A-Z]/g, letter => '-' + letter.toLowerCase())],
      set: (_, key, value) => { this.attrs['data-' + String(key).replace(/[A-Z]/g, letter => '-' + letter.toLowerCase())] = String(value); return true; }
    });
    doc.elements.push(this);
  }
  set className(value) { this.attrs.class = value; }
  get className() { return this.attrs.class ?? ''; }
  set textContent(value) { this.ownText = String(value); this.children = []; }
  get textContent() { return this.ownText + this.children.map(child => child.textContent).join(''); }
  get validity() { return { valid: this.attrs.type !== 'email' || /^[^\s@]+@[^\s@]+$/.test(this.value) }; }
  setAttribute(key, value) { this.attrs[key] = String(value); }
  getAttribute(key) { return this.attrs[key] ?? null; }
  removeAttribute(key) { delete this.attrs[key]; }
  append(...nodes) { for (const node of nodes) { node.parentElement = this; this.children.push(node); } }
  replaceChildren(...nodes) { for (const node of this.children) node.parentElement = null; this.children = []; this.ownText = ''; this.append(...nodes); }
  contains(node) { return node === this || this.children.some(child => child.contains(node)); }
  matches(selector) {
    if (selector.startsWith('.')) return this.className.split(' ').includes(selector.slice(1));
    const attr = selector.match(/^\[([^=\]]+)(?:="([^"]*)")?\]$/);
    if (attr) return attr[1] in this.attrs && (attr[2] === undefined || this.attrs[attr[1]] === attr[2]);
    return this.tagName.toLowerCase() === selector;
  }
  querySelectorAll(selector) {
    const parts = selector.trim().split(/\s+/), result = [];
    const visit = node => {
      for (const child of node.children) {
        if (child.matches(parts.at(-1))) {
          let parent = child.parentElement, index = parts.length - 2;
          while (index >= 0 && parent) { if (parent.matches(parts[index])) index--; parent = parent.parentElement; }
          if (index < 0) result.push(child);
        }
        visit(child);
      }
    };
    visit(this); return result;
  }
  querySelector(selector) { return this.querySelectorAll(selector)[0] ?? null; }
  closest(selector) { return this.matches(selector) ? this : this.parentElement?.closest(selector); }
  getRootNode() { return this.ownerDocument.scope; }
  focus() { this.ownerDocument.scope.activeElement = this; }
  addEventListener(type, handler, { signal, once } = {}) {
    if (signal?.aborted) return;
    const record = { handler, once }; const list = this.listeners.get(type) ?? [];
    list.push(record); this.listeners.set(type, list);
    signal?.addEventListener('abort', () => this.removeEventListener(type, handler), { once: true });
  }
  removeEventListener(type, handler) { this.listeners.set(type, (this.listeners.get(type) ?? []).filter(record => record.handler !== handler)); }
  dispatchEvent(event) {
    if (!event.target) Object.defineProperty(event, 'target', { value: this, configurable: true });
    for (const record of [...this.listeners.get(event.type) ?? []]) {
      record.handler(event); if (record.once) this.removeEventListener(event.type, record.handler);
    }
    if (event.bubbles) this.parentElement?.dispatchEvent(event);
    return !event.defaultPrevented;
  }
}

function dom(html) {
  // Document pointer dismissal is exercised by the browser picker suite, not this small model.
  const doc = { elements: [], scope: { activeElement: null }, addEventListener() {}, createElement(tag) { return new Element(tag, this); } };
  const timers = new Map(); let serial = 0, now = 1_800_000_000_000;
  doc.defaultView = {
    AbortController: class extends AbortController { constructor() { super(); setMaxListeners(0, this.signal); } },
    CustomEvent, DOMException,
    setTimeout(fn, ms) { const id = ++serial; timers.set(id, { fn, ms, at: now + ms, interval: false }); return id; },
    clearTimeout(id) { timers.delete(id); },
    setInterval(fn, ms) { const id = ++serial; timers.set(id, { fn, ms, at: now + ms, interval: true }); return id; },
    clearInterval(id) { timers.delete(id); }
  };
  const fragment = new Element('fragment', doc), stack = [fragment];
  const body = html.match(/<body[^>]*>([\s\S]*?)<\/body>/)[1];
  for (const token of body.match(/<[^>]+>|[^<]+/g)) {
    if (token.startsWith('</')) { stack.pop(); continue; }
    if (!token.startsWith('<')) { stack.at(-1).ownText += token; continue; }
    const match = token.match(/^<([\w-]+)/); if (!match) continue;
    const attrs = {}; for (const attr of token.slice(match[0].length, -1).matchAll(/([\w-]+)(?:="([^"]*)")?/g)) attrs[attr[1]] = attr[2] ?? '';
    const node = new Element(match[1], doc, attrs); stack.at(-1).append(node);
    if (!['input','br','meta','link','hr'].includes(match[1]) && !token.endsWith('/>')) stack.push(node);
  }
  for (const node of doc.elements) {
    if (node.tagName === 'TEXTAREA') node.value = node.defaultValue = node.textContent;
    if (node.tagName === 'SELECT') node.value = node.children[0]?.attrs.value ?? '';
  }
  return { root: fragment.querySelector('.sl-component'), doc, timers,
    Date: class extends Date { static now() { return now; } },
    advance(ms) { now += ms; for (const [id,timer] of [...timers]) if (timer.at <= now) { if (timer.interval) timer.at = now + timer.ms; else timers.delete(id); timer.fn(); } }
  };
}
async function fixture(slug, options = {}, preview = false) {
  const value = dom(await read(slug, 'index.html')), window = {};
  runInNewContext(await read(slug, 'buttons.js'), { window, Date: value.Date });
  value.api = window.SLComponent;
  value.controller = value.api[preview ? 'mountPreview' : 'mount'](value.root, options);
  value.q = selector => value.root.querySelector(selector);
  value.act = action => value.q(`[data-action="${action}"]`).dispatchEvent(new Event('click', { bubbles: true }));
  return value;
}
const flush = async () => { for (let i = 0; i < 10; i++) await Promise.resolve(); };
const snapshot = controller => JSON.parse(JSON.stringify(controller.state));

test('exactly ten complete, self-contained and compiler-compatible packages', async () => {
  assert.equal(batch.length, 10); assert.equal(new Set(slugs).size, 10);
  const fontHash = createHash('sha256').update(await readFile(new URL('retry-feedback/instrument-sans-variable.woff2', packageRoot))).digest('hex');
  for (const item of batch) {
    const variant = item.variants[0], slug = variant.replace(/^feedback-|-v11$/g, '');
    assert.equal(item.category, 'feedback'); assert.equal(item.id, 'matte-' + variant); assert.equal(item.usage.length, 3);
    assert.deepEqual((await readdir(new URL(variant+'/', packageRoot))).sort(), ['LICENSE','OFL.txt','buttons.css','buttons.js','example.js','index.html','instrument-sans-variable.woff2'].sort());
    const html = await read(slug,'index.html'), js = await read(slug,'buttons.js'), css = await read(slug,'buttons.css');
    assert.match(html, /<html lang="en">/); assert.equal((html.match(/class="sl-component"/g) ?? []).length,1);
    assert.match(html, /data-kind="feedback-/); assert.match(html, /<script src="\.\/buttons.js" defer><\/script>/);
    assert.doesNotMatch(html.match(/<body[^>]*>([\s\S]*)<\/body>/)[1], /<script/);
    assert.doesNotMatch(js, /innerHTML|fetch\(|XMLHttpRequest|document\.querySelector|document\.activeElement|import\(/);
    assert.match(js, /window\.SLComponent = \{ mount, mountPreview \};/);
    const expression = js.match(/\(\(\) => \{[\s\S]*\}\)\(\);\s*$/)[0];
    new Script(expression.replace(/window\.\w+\s*=\s*(\{[^;]+\});/, 'return $1;'));
    new Script(js); new Script(await read(slug,'example.js'));
    assert.match(css, /prefers-reduced-motion:reduce/); assert.match(css, /forced-colors:active/);
    assert.doesNotMatch(css, /(?:^|\n)(?:button|input|svg|:root|\*)\s*[{,]/);
    for (const token of ['surface','text','muted','accent','on-accent','focus','danger']) assert.ok(css.includes('--fb-'+token+':'));
    assert.equal(createHash('sha256').update(await readFile(new URL(variant+'/instrument-sans-variable.woff2',packageRoot))).digest('hex'),fontHash);
    assert.match(await read(slug,'LICENSE'),/MIT License/);
  }
});

test('all instances reset, replace mounts and destroy without listeners or timers', async () => {
  for (const slug of slugs) {
    const a = await fixture(slug), b = dom(await read(slug, 'index.html')), baseline = snapshot(a.controller);
    b.controller = a.api.mount(b.root);
    a.controller.reset(); assert.deepEqual(snapshot(a.controller), baseline, slug+' reset');
    assert.deepEqual(snapshot(b.controller), baseline, slug+' isolation');
    const next = a.api.mount(a.root); assert.equal(a.controller.reset(),false,slug+' previous mount destroyed');
    next.destroy(); next.destroy(); b.controller.destroy();
    assert.equal(a.timers.size,0,slug+' timers');
    assert.equal(a.doc.elements.reduce((sum,node)=>sum+[...node.listeners.values()].reduce((n,list)=>n+list.length,0),0),0,slug+' listeners');
  }
});

test('replacing a demo with an application mount hides demo controls and releases demo listeners', async () => {
  for (const slug of slugs) {
    const f = await fixture(slug, {}, true);
    for (const node of f.root.querySelectorAll('[data-demo-only]')) assert.equal(node.hidden, false);
    const application = f.api.mount(f.root);
    for (const node of f.root.querySelectorAll('[data-demo-only]')) assert.equal(node.hidden, true);
    assert.equal(f.controller.reset(), false);
    application.destroy(); assert.equal(f.timers.size, 0);
    assert.equal(f.doc.elements.reduce((sum,node)=>sum+[...node.listeners.values()].reduce((n,list)=>n+list.length,0),0),0);
  }
});

test('form summary links invalid fields and safely accepts Unicode', async () => {
  const f = await fixture('errors'); assert.equal(f.controller.validate(),false); assert.equal(f.controller.state.errors.length,2);
  f.q('[data-errors] button').dispatchEvent(new Event('click',{bubbles:true})); assert.equal(f.doc.scope.activeElement,f.q('[data-name]'));
  f.q('[data-name]').value = '日本語 <svg onload=alert(1)>'; f.q('[data-email]').value = 'alex@example.com';
  assert.equal(f.controller.validate(),true); assert.equal(f.q('[data-name]').getAttribute('aria-invalid'),'false');
  f.controller.reset(); assert.equal(f.q('[data-errors]').children.length,0); f.controller.destroy();
});

test('form requires an explicit check, rejects incomplete domains and clears stale success', async () => {
  const f = await fixture('errors');
  assert.equal(f.q('[data-check-icon]').tagName, 'SPAN', 'hidden must reflect on an HTML element, not an SVG expando');
  f.q('[data-name]').value = 'Alex';
  f.q('[data-email]').value = 'alex@local';
  assert.equal(f.controller.validate(), false, 'public contact example requires a dotted domain');
  assert.equal(f.q('[data-email]').getAttribute('aria-invalid'), 'true');
  f.q('[data-email]').value = 'alex@example.com';
  f.q('[data-email]').dispatchEvent(new Event('input', { bubbles: true }));
  assert.equal(f.controller.state.status, 'idle', 'editing must not confirm the form automatically');
  assert.equal(f.q('[data-check-label]').textContent, 'Check details');
  assert.equal(f.q('[data-check-icon]').hidden, true);
  assert.equal(f.controller.validate(), true);
  assert.equal(f.controller.state.status, 'ready');
  assert.equal(f.q('[data-check-label]').textContent, 'Details checked');
  assert.equal(f.q('[data-check-icon]').hidden, false);
  assert.match(f.q('[data-status]').textContent, /Both fields passed/);
  f.q('[data-name]').value = 'Alex studio';
  f.q('[data-name]').dispatchEvent(new Event('input', { bubbles: true }));
  assert.equal(f.controller.state.status, 'idle');
  assert.equal(f.q('[data-check-icon]').hidden, true);
  assert.equal(f.controller.validate(), true);
  assert.equal(f.controller.validate(), true, 'repeat checks remain safe');
  f.controller.reset();
  assert.equal(f.q('[data-check-label]').textContent, 'Check details');
  assert.equal(f.q('[data-check-icon]').hidden, true);
  f.controller.destroy();
});

test('draft waits for confirmation, cancels stale answers, discards and keeps instances separate', async () => {
  let complete, signal, calls = 0;
  const f = await fixture('draft',{onAction:(_,{signal: value})=>{ calls++; signal=value; return new Promise(resolve=>complete=resolve); }});
  const b = await fixture('draft'); f.q('[data-draft]').value = 'Черновик <img src=x>';
  const operation=f.controller.save(); assert.equal(await f.controller.save(),false); assert.equal(calls,1);
  assert.equal(f.controller.state.saved,'Field notes — revision 2'); f.controller.cancel(); assert.ok(signal.aborted);
  complete(); await operation; assert.equal(f.controller.state.dirty,true);
  const saved=f.controller.save(); complete(); assert.equal(await saved,true); assert.equal(f.q('[data-saved]').textContent,'Черновик <img src=x>');
  f.q('[data-draft]').value='Other'; f.controller.discard(); assert.equal(f.q('[data-draft]').value,'Черновик <img src=x>');
  assert.equal(b.controller.state.dirty,false); f.controller.destroy(); b.controller.destroy();
});

test('session reaches expiry using wall time and accepts only future callback deadlines', async () => {
  const f=await fixture('session',{durationSeconds:2,onAction:async()=>({expiresAt:f.Date.now()+60000})});
  f.advance(3000); assert.equal(f.q('[data-countdown]').textContent,'00:00'); assert.equal(f.controller.state.expired,true);
  assert.equal(await f.controller.renew(),true); assert.equal(f.q('[data-countdown]').textContent,'01:00');
  f.controller.destroy(); assert.equal(f.timers.size,0);
  const invalid=await fixture('session',{onAction:async()=>({expiresAt:0})}); assert.equal(await invalid.controller.renew(),false); assert.equal(invalid.controller.state.status,'error'); invalid.controller.destroy();
});

test('capacity enforces exact limits and recovers by clearing cache or staged files', async () => {
  const f=await fixture('capacity'); assert.equal(f.controller.stage(),false); assert.equal(f.controller.state.used,86);
  assert.equal(f.controller.release(),true); assert.equal(f.controller.release(),false); assert.equal(f.controller.stage(),true);
  f.q('[data-size]').value='8'; assert.equal(f.controller.stage(),true); assert.equal(f.controller.stage(),true); assert.equal(f.controller.state.used,100);
  assert.equal(f.controller.stage(),false); assert.equal(f.q('[role="meter"]').getAttribute('aria-valuenow'),'100');
  f.controller.remove(); assert.equal(f.controller.state.used,66); f.controller.reset(); assert.equal(f.controller.state.used,86); f.controller.destroy();
});

test('conflict reports only confirmed resolution and renders both versions literally', async () => {
  let payload;
  const f=await fixture('conflict',{localText:'草稿 <b>one</b>',remoteText:'共有 & two',onAction:async(_,value)=>{payload=value;}});
  assert.equal(f.q('[data-local]').textContent,'草稿 <b>one</b>'); f.controller.choose('remote');
  assert.equal(f.q('[data-action="remote"]').getAttribute('aria-pressed'),'true'); assert.equal(await f.controller.resolve(),true);
  assert.equal(payload.text,'共有 & two'); assert.equal(f.controller.choose('local'),false); f.controller.reset(); assert.equal(f.controller.state.resolved,false); f.controller.destroy();
});

test('partial receipts retry only unfinished items and retain successful work after failure', async () => {
  const calls=[]; let fail=true;
  const f=await fixture('batch',{onAction:async(_,{id})=>{ calls.push(id); if(id==='interview'&&fail) throw new Error('Unavailable'); }});
  assert.equal(await f.controller.retry(),false); assert.deepEqual(calls,['map','interview']); assert.equal(f.controller.state.results.map,'done');
  fail=false; assert.equal(await f.controller.retry(),true); assert.deepEqual(calls,['map','interview','interview']);
  f.controller.dismiss(); assert.equal(f.controller.state.reviewed,true); f.controller.reset(); assert.equal(f.controller.state.results.map,'failed'); f.controller.destroy();
});

test('access distinguishes requested, pending, denied and granted', async () => {
  const calls=[]; let status='pending'; const f=await fixture('access',{onAction:async(action,payload)=>{calls.push([action,payload.reason]);return {status};}});
  assert.equal(await f.controller.request(),true); assert.equal(f.controller.state.access,'pending');
  status='denied'; await f.controller.request(); assert.equal(calls[1][0],'check'); assert.equal(f.q('[data-reason]').readOnly,false);
  f.q('[data-reason]').value='Review 日本語 <script>'; status='granted'; await f.controller.request(); assert.equal(calls[2][0],'request');
  assert.equal(await f.controller.request(),false); assert.equal(f.controller.state.access,'granted'); f.controller.destroy();
});

test('zero results recover independently through text and archive constraints', async () => {
  const f=await fixture('empty'); assert.deepEqual([...f.controller.state.matches],[]);
  f.controller.widen(); assert.deepEqual([...f.controller.state.matches],['Budget draft']);
  f.controller.reset(); f.controller.clear(); assert.deepEqual([...f.controller.state.matches],['Old itinerary']);
  f.q('[data-query]').value='<img src=x> 日本語'; f.q('[data-query]').dispatchEvent(new Event('input')); assert.ok(f.q('[data-hint]').textContent.includes('<img src=x> 日本語'));
  f.controller.reset(); assert.equal(f.q('[data-empty]').hidden,false); f.controller.destroy();
});

test('incident disclosures reverse, Escape restores focus and updates clear acknowledgement', async () => {
  const f=await fixture('incident'); f.controller.disclosure(true); assert.equal(f.q('[data-details]').inert,false);
  const escape=new Event('keydown'); Object.defineProperty(escape,'key',{value:'Escape'}); f.root.dispatchEvent(escape);
  assert.equal(f.q('[data-details]').inert,true); assert.equal(f.doc.scope.activeElement,f.q('[data-action="details"]'));
  f.controller.acknowledge(); f.controller.update({phase:'identified',title:'原因 <b>found</b>',time:'09:28'}); assert.equal(f.controller.state.acknowledged,false);
  assert.equal(f.q('[data-incident-title]').textContent,'原因 <b>found</b>'); assert.equal(f.controller.state.history.length,2);
  f.controller.update({phase:'resolved'}); f.controller.update({phase:'investigating'}); assert.equal(f.controller.state.history.length,3); f.controller.destroy();
});

test('readiness retains blocked checks and recovers after a genuine recheck', async () => {
  let blocked=true; const calls=[];
  const f=await fixture('readiness',{onAction:async(_,{id})=>{calls.push(id);return {ok:!(blocked&&id==='access')};}});
  assert.equal(await f.controller.check(),false); assert.equal(f.controller.state.checks.access,'blocked'); assert.equal(f.controller.state.checks.storage,'passed');
  blocked=false; assert.equal(await f.controller.check(),true); assert.equal(calls.length,6); assert.match(f.q('[data-status]').textContent,/Nothing has been shared/);
  f.controller.reset(); assert.equal(f.controller.state.checks.access,'unchecked'); f.controller.destroy();
});

test('all asynchronous exports refuse simulated success without callbacks and reject safely', async () => {
  const methods={draft:'save',session:'renew',conflict:'resolve',batch:'retry',access:'request',readiness:'check'};
  for(const [slug,method] of Object.entries(methods)) {
    const f=await fixture(slug); if(slug==='draft') f.q('[data-draft]').value='Edited';
    assert.equal(await f.controller[method](),false,slug); assert.match(f.q('[data-status]').textContent,/Connect onAction/); f.controller.destroy();
    const e=await fixture(slug,{onAction:async()=>{throw new Error('Ошибка <b>offline</b>');}}); if(slug==='draft') e.q('[data-draft]').value='Edited';
    assert.equal(await e.controller[method](),false); assert.equal(e.q('[data-status]').textContent,'Ошибка <b>offline</b>'); e.controller.destroy();
  }
});

test('all asynchronous demos cancel on Escape, reset cleanly and discard delayed settlements', async () => {
  const methods={draft:'save',session:'renew',conflict:'resolve',batch:'retry',access:'request',readiness:'check'};
  for(const [slug,method] of Object.entries(methods)) {
    const f=await fixture(slug,{},true); if(slug==='draft') f.q('[data-draft]').value='Edited';
    const task=f.controller[method](); assert.equal(f.root.dataset.state,'pending');
    const event=new Event('keydown'); Object.defineProperty(event,'key',{value:'Escape'}); f.root.dispatchEvent(event);
    await task; assert.equal(f.root.dataset.state,'canceled'); f.advance(1000); await flush(); assert.equal(f.root.dataset.state,'canceled');
    f.controller.reset(); f.controller.destroy(); assert.equal(f.timers.size,0,slug);
  }
});

test('reset and destroy abort every pending export and ignore callbacks which do not honor abort', async () => {
  const methods={draft:'save',session:'renew',conflict:'resolve',batch:'retry',access:'request',readiness:'check'};
  for (const [slug,method] of Object.entries(methods)) for (const ending of ['reset','destroy']) {
    let finish, signal;
    const f=await fixture(slug,{onAction:(_,{signal:value})=>{signal=value;return new Promise(resolve=>finish=resolve);}});
    const before=snapshot(f.controller); if(slug==='draft') f.q('[data-draft]').value='Do not save this';
    const operation=f.controller[method](); f.controller[ending](); assert.equal(signal.aborted,true,slug+' '+ending);
    finish({expiresAt:f.Date.now()+60000,status:'granted',ok:true}); await operation;
    if(ending==='reset') assert.deepEqual(snapshot(f.controller),before,slug);
    else assert.equal(f.root.dataset.state,'destroyed');
    f.controller.destroy(); assert.equal(f.timers.size,0);
  }
});

test('canceling sequential work retains completed items while leaving remaining work retryable', async () => {
  for (const slug of ['batch','readiness']) {
    let pendingSignal;
    const f=await fixture(slug,{onAction:async(_,{id,signal})=>{
      if (id === (slug === 'batch' ? 'interview' : 'access')) {
        pendingSignal=signal;
        return new Promise((resolve,reject)=>signal.addEventListener('abort',()=>reject(new DOMException('Canceled','AbortError')),{once:true}));
      }
      return {ok:true};
    }});
    const operation=f.controller[slug === 'batch' ? 'retry' : 'check'](); await flush();
    assert.ok(pendingSignal); f.controller.cancel(); await operation;
    assert.equal(slug==='batch' ? f.controller.state.results.map : f.controller.state.checks.details,slug==='batch' ? 'done':'passed');
    assert.equal(slug==='batch' ? f.controller.state.results.interview : f.controller.state.checks.access,slug==='batch' ? 'skipped':'unchecked');
    f.controller.destroy();
  }
});

test('palette substitutions preserve semantic contrast for text, controls and focus', async () => {
  const luminance = hex => { const rgb=hex.match(/\w\w/g).map(value=>parseInt(value,16)/255).map(value=>value<=.04045?value/12.92:((value+.055)/1.055)**2.4); return rgb[0]*.2126+rgb[1]*.7152+rgb[2]*.0722; };
  const ratio=(a,b)=>{const values=[luminance(a),luminance(b)].sort((x,y)=>y-x);return (values[0]+.05)/(values[1]+.05);};
  for(const palette of [
    {surface:'202222',text:'f5f7f4',muted:'b4c0b8',accent:'d4e4d8',onAccent:'202b23',danger:'efb8a6',outside:'516259'},
    {surface:'24213b',text:'f6f2ff',muted:'c4bdd6',accent:'ded4fa',onAccent:'292039',danger:'ffc3b3',outside:'514663'}
  ]) {
    for(const name of ['text','muted','danger','accent']) assert.ok(ratio(palette[name],palette.surface)>=4.5,name);
    assert.ok(ratio(palette.accent,palette.onAccent)>=4.5); assert.ok(ratio(palette.outside,'edf0ee')>=4.5);
  }
});
