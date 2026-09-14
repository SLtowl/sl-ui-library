import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { runInNewContext, Script } from 'node:vm';
import manifest from '../../public/catalog-batches/checkboxes.js';

const packageRoot = new URL('../../public/packages/', import.meta.url);
const read = (slug, file) => readFile(new URL(`checkboxes-${slug}-v11/${file}`, packageRoot), 'utf8');

// Minimal DOM fixture for deterministic controller tests, not browser emulation.
// Native input, layout, keyboard and Shadow DOM checks are documented separately.
class Element {
  constructor(tag, attrs = {}) {
    this.tagName = tag;
    this.attrs = attrs;
    this.children = [];
    this.parentNode = null;
    this.listeners = new Map();
    this.dataset = Object.fromEntries(Object.entries(attrs).filter(([key]) => key.startsWith('data-')).map(([key, value]) => [key.slice(5).replace(/-([a-z])/g, (_, c) => c.toUpperCase()), value]));
    this.defaultChecked = Object.hasOwn(attrs, 'checked');
    this.checked = this.defaultChecked;
    this.disabled = Object.hasOwn(attrs, 'disabled');
    this.hidden = Object.hasOwn(attrs, 'hidden');
    this.indeterminate = false;
    this.value = attrs.value || '';
    this.type = attrs.type || '';
    this.name = attrs.name || '';
    this.ownText = '';
  }
  get textContent() { return this.ownText + this.children.map(child => child.textContent).join(''); }
  set textContent(value) { this.ownText = String(value); this.children = []; }
  matches(selector) {
    if (selector.startsWith('.')) return (this.attrs.class || '').split(' ').includes(selector.slice(1));
    const attribute = selector.match(/^\[([^=\]]+)(?:="([^"]*)")?\]$/);
    return attribute ? Object.hasOwn(this.attrs, attribute[1]) && (attribute[2] === undefined || this.attrs[attribute[1]] === attribute[2]) : this.tagName === selector;
  }
  querySelectorAll(selector) { return this.children.flatMap(child => [...(child.matches(selector) ? [child] : []), ...child.querySelectorAll(selector)]); }
  querySelector(selector) { return this.querySelectorAll(selector)[0] || null; }
  closest(selector) { return this.matches(selector) ? this : this.parentNode?.closest(selector) || null; }
  contains(node) { return node === this || this.children.some(child => child.contains(node)); }
  getRootNode() { return this.parentNode?.getRootNode() || this; }
  focus() { this.getRootNode().activeElement = this; }
  setAttribute(name, value) { this.attrs[name] = String(value); }
  addEventListener(name, listener) { if (!this.listeners.has(name)) this.listeners.set(name, new Set()); this.listeners.get(name).add(listener); }
  removeEventListener(name, listener) { this.listeners.get(name)?.delete(listener); }
  dispatchEvent(event) {
    event.target ??= this;
    for (const listener of this.listeners.get(event.type) || []) listener(event);
    if (event.bubbles) this.parentNode?.dispatchEvent(event);
    return !event.defaultPrevented;
  }
}
class DOMEvent {
  constructor(type, options = {}) { Object.assign(this, { type, bubbles: false, defaultPrevented: false }, options); }
  preventDefault() { this.defaultPrevented = true; }
}
function parse(html) {
  const document = new Element('document'), stack = [document];
  for (const token of html.match(/<[^>]+>|[^<]+/g)) {
    if (token.startsWith('</')) { stack.pop(); continue; }
    if (token.startsWith('<!')) continue;
    if (!token.startsWith('<')) { stack.at(-1).ownText += token; continue; }
    const [, tag, raw] = token.match(/^<([\w-]+)([\s\S]*?)\/?\s*>$/);
    const attrs = Object.fromEntries([...raw.matchAll(/([\w-]+)(?:="([^"]*)")?/g)].map(([, key, value]) => [key, value || '']));
    const node = new Element(tag, attrs);
    node.parentNode = stack.at(-1); stack.at(-1).children.push(node);
    if (!['input', 'meta', 'link', 'br', 'hr'].includes(tag) && !token.endsWith('/>')) stack.push(node);
  }
  return document.querySelector('.sl-component');
}
const plain = value => JSON.parse(JSON.stringify(value));
async function fixture(slug, options = {}) {
  const root = parse((await read(slug, 'index.html')).match(/<body>([\s\S]*?)<\/body>/)[1]);
  const window = {};
  runInNewContext(await read(slug, 'buttons.js'), { window, CustomEvent: DOMEvent });
  const events = [], callbacks = [];
  root.addEventListener('selectionchange', event => events.push(plain(event.detail)));
  const controller = window.SLComponent.mount(root, { onChange: detail => callbacks.push(plain(detail)), ...options });
  const input = value => root.querySelectorAll('[data-choice]').find(node => node.value === value);
  const select = (value, checked) => {
    const node = input(value); if (node.disabled) return;
    node.checked = checked ?? !node.checked;
    if (node.type === 'radio' && node.checked) for (const peer of root.querySelectorAll('[data-choice]')) if (peer !== node && peer.name === node.name) peer.checked = false;
    node.dispatchEvent(new DOMEvent('change', { bubbles: true }));
  };
  const clear = () => root.querySelector('[data-clear]').dispatchEvent(new DOMEvent('click', { bubbles: true }));
  return { root, controller, api: window.SLComponent, events, callbacks, input, select, clear, values: () => plain(controller.state.values) };
}

test('exactly ten distinct complete manifests', () => {
  assert.equal(manifest.length, 10);
  assert.equal(new Set(manifest.map(item => item.id)).size, 10);
  assert.equal(new Set(manifest.map(item => item.name)).size, 10);
  for (const item of manifest) {
    assert.equal(item.category, 'checkboxes');
    assert.equal(item.variants.length, 1);
    assert.match(item.variants[0], /^checkboxes-[a-z-]+-v11$/);
    assert.equal(item.preview, `./packages/${item.variants[0]}/index.html?embed=1`);
    assert.ok(item.usage.length >= 3 && item.description.length > 30);
  }
});
for (const item of manifest) {
  const slug = item.variants[0].slice(11, -4);
  test(`${slug}: self-contained source, scoped CSS and compiler contract`, async () => {
    const directory = new URL(`${item.variants[0]}/`, packageRoot);
    assert.deepEqual((await readdir(directory)).sort(), ['LICENSE', 'OFL.txt', 'buttons.css', 'buttons.js', 'example.js', 'index.html', 'instrument-sans-variable.woff2'].sort());
    const html = await read(slug, 'index.html'), css = await read(slug, 'buttons.css'), js = await read(slug, 'buttons.js');
    assert.match(html, /<html lang="en">/);
    assert.match(html, /name="viewport"/);
    assert.equal((html.match(/class="sl-component"/g) || []).length, 1);
    assert.doesNotMatch(html.split('<body>')[1], /<script/);
    for (const match of html.matchAll(/<script[^>]+>/g)) assert.match(match[0], /\bdefer\b/);
    assert.doesNotMatch(html + css + js, /https?:\/\/|fetch\(|innerHTML|setTimeout|requestAnimationFrame/);
    assert.match(css, /prefers-reduced-motion/);
    assert.match(css, /forced-colors/);
    assert.match(css, /:focus-visible/);
    // An empty native radio group also matches :indeterminate in Chromium.
    assert.doesNotMatch(css, /input:indeterminate/);
    assert.match(css, /input\[type=checkbox\]:indeterminate/);
    assert.match(css, /\.choice-mark \{ pointer-events: none/);
    assert.doesNotMatch(css, /(?:^|\n)(?:button|input|svg|\*|:root)\s*[{,:]/);
    assert.match(js, /window\.SLComponent = \{ mount, mountPreview \};/);
    new Script(js); new Script(await read(slug, 'example.js'));
    const compiled = js.replace(/window\.\w+\s*=\s*(\{[^;]+\});/, 'return $1;');
    const api = runInNewContext(compiled, { CustomEvent: DOMEvent });
    assert.equal(typeof api.mountPreview, 'function');
    assert.match(await read(slug, 'LICENSE'), /MIT License/);
    const font = await readFile(new URL('instrument-sans-variable.woff2', directory));
    const original = await readFile(new URL('nested-checkbox/instrument-sans-variable.woff2', packageRoot));
    assert.equal(createHash('sha256').update(font).digest('hex'), createHash('sha256').update(original).digest('hex'));
  });
  test(`${slug}: isolated snapshots, validation, reset and repeat-safe lifecycle`, async () => {
    const f = await fixture(slug), other = await fixture(slug);
    const initial = f.values(), otherInitial = other.values();
    assert.equal(f.api.mount(f.root), f.controller);
    assert.throws(() => f.controller.setValues(['missing']), /Invalid selection/);
    assert.throws(() => f.controller.setValues(null), /Invalid selection/);
    f.controller.state.values.push('external mutation');
    assert.deepEqual(f.values(), initial);
    const first = f.root.querySelectorAll('[data-choice]')[0];
    f.select(first.value, !first.checked);
    assert.deepEqual(other.values(), otherInitial);
    f.controller.reset(); f.controller.reset();
    assert.deepEqual(f.values(), initial);
    for (const node of f.root.querySelectorAll('[data-choice]')) assert.equal(node.checked, initial.includes(node.value));
    const resetEvent = new DOMEvent('reset'); f.root.dispatchEvent(resetEvent); assert.equal(resetEvent.defaultPrevented, true);
    const eventsBefore = f.events.length;
    f.controller.destroy(); f.controller.destroy();
    f.select(first.value, !first.checked);
    assert.equal(f.events.length, eventsBefore);
    assert.equal(f.controller.setValues(initial), false);
    assert.equal(f.root.listeners.get('change').size, 0);
    const next = f.api.mount(f.root); next.reset();
    assert.deepEqual(plain(next.state.values), initial);
    assert.equal(f.root.listeners.get('change').size, 1);
    next.destroy(); other.controller.destroy();
  });
}

test('limited: enforces a quota and re-enables choices immediately after removal', async () => {
  const f = await fixture('limited');
  f.select('research'); f.select('writing');
  assert.deepEqual(f.values(), ['design', 'research', 'writing']);
  assert.equal(f.input('motion').disabled, true);
  f.select('motion'); assert.equal(f.values().length, 3);
  f.select('research'); assert.equal(f.input('motion').disabled, false);
  f.select('motion'); assert.deepEqual(f.values(), ['design', 'writing', 'motion']);
  assert.throws(() => f.controller.setValues(['design', 'research', 'writing', 'motion']), /Invalid selection/);
  assert.throws(() => f.controller.setValues(['design', 'design']), /Invalid selection/);
  f.clear(); assert.deepEqual(f.values(), []);
  assert.deepEqual(f.events, f.callbacks);
});
test('budget: exact sums, weighted blocking and released capacity', async () => {
  const f = await fixture('budget');
  f.select('history'); f.select('archive');
  assert.equal(f.controller.state.used, 7); assert.equal(f.input('search').disabled, true);
  f.select('notes'); assert.equal(f.controller.state.used, 5);
  f.select('search'); assert.equal(f.controller.state.used, 8);
  assert.equal(f.root.querySelector('meter').value, 8);
  f.select('history'); assert.equal(f.controller.state.used, 4);
  assert.throws(() => f.controller.setValues(['notes', 'search', 'history']), /Invalid selection/);
});
test('permissions: edit grants view, removing view revokes edit only in that row', async () => {
  const f = await fixture('permissions'); f.select('notes-edit');
  assert.deepEqual(new Set(f.values()), new Set(['files-view', 'files-edit', 'notes-view', 'notes-edit']));
  f.select('files-view'); assert.deepEqual(new Set(f.values()), new Set(['notes-view', 'notes-edit']));
  f.select('notes-edit'); assert.deepEqual(f.values(), ['notes-view']);
  assert.throws(() => f.controller.setValues(['boards-edit']), /Invalid selection/);
  f.clear(); assert.deepEqual(f.values(), []);
});
test('group quotas: groups retain separate two-item capacities', async () => {
  const f = await fixture('group-quotas'); f.select('ruler');
  assert.equal(f.input('brush').disabled, true); assert.equal(f.input('svg').disabled, false);
  f.select('svg'); f.select('pdf'); assert.equal(f.input('png').disabled, true);
  f.select('pen'); assert.equal(f.input('brush').disabled, false); assert.equal(f.input('png').disabled, true);
  assert.equal(f.root.querySelector('[data-count="tools"]').textContent, '1/2');
  assert.throws(() => f.controller.setValues(['svg', 'pdf', 'png']), /Invalid selection/);
});
test('filtered bulk: tri-state master changes visible subset and preserves hidden selections', async () => {
  const f = await fixture('filtered-bulk'), master = f.root.querySelector('[data-master]');
  assert.equal(master.indeterminate, true);
  f.controller.setFilter('photos'); assert.deepEqual(plain(f.controller.state.visible), ['photos']);
  master.checked = true; master.dispatchEvent(new DOMEvent('change', { bubbles: true }));
  assert.deepEqual(f.values(), ['icons', 'photos']); assert.equal(master.indeterminate, false); assert.equal(master.checked, true);
  master.checked = false; master.dispatchEvent(new DOMEvent('change', { bubbles: true })); assert.deepEqual(f.values(), ['icons']);
  f.controller.setFilter('<img src=x> Привет 你好'); assert.equal(master.disabled, true); assert.deepEqual(f.values(), ['icons']);
  assert.equal(f.root.querySelector('[data-filter]').value, '<img src=x> Привет 你好');
  assert.equal(f.root.querySelector('[data-empty]').hidden, false);
  f.controller.reset(); assert.equal(f.controller.state.query, ''); assert.equal(master.indeterminate, true);
});
test('ranked: selection order, promotion, compact ranks and keyboard focus fallback', async () => {
  const f = await fixture('ranked'); f.select('coverage'); f.select('clarity');
  assert.deepEqual(f.values(), ['speed', 'coverage', 'clarity']);
  assert.equal(f.input('polish').disabled, true);
  const promote = f.root.querySelector('[data-up="coverage"]'); promote.focus();
  assert.equal(f.controller.moveEarlier('coverage'), true);
  assert.deepEqual(f.values(), ['coverage', 'speed', 'clarity']);
  assert.equal(f.root.getRootNode().activeElement, f.input('coverage'));
  assert.equal(f.controller.moveEarlier('coverage'), false);
  f.select('speed'); assert.equal(f.root.querySelector('[data-rank="clarity"]').textContent, '2');
  f.select('polish'); assert.deepEqual(f.values(), ['coverage', 'clarity', 'polish']);
  assert.equal(f.events.find(event => event.action === 'rank').values[0], 'coverage');
});
test('exclusive none: mutual exclusion is reversible and empty remains unspecified', async () => {
  const f = await fixture('exclusive-none'); f.select('inbox'); f.select('none'); assert.deepEqual(f.values(), ['none']);
  f.select('desktop'); assert.deepEqual(f.values(), ['desktop']);
  f.select('none'); f.select('none'); assert.deepEqual(f.values(), []);
  assert.equal(f.root.querySelector('[data-status]').textContent, 'No preference selected');
  assert.throws(() => f.controller.setValues(['none', 'email']), /Invalid selection/);
});
test('dependencies: details add sources; source removal cascades but retains readme', async () => {
  const f = await fixture('dependencies'); f.clear(); f.select('comments');
  assert.deepEqual(new Set(f.values()), new Set(['comments', 'sources']));
  f.select('history'); f.select('readme'); f.select('sources'); assert.deepEqual(f.values(), ['readme']);
  assert.throws(() => f.controller.setValues(['history']), /Invalid selection/);
});
test('optional radio: selecting replaces the previous mode and Clear removes selection', async () => {
  const f = await fixture('optional-radio'); f.select('priority', true); assert.equal(f.controller.state.credits, 4);
  f.select('instant', true); assert.deepEqual(f.values(), ['instant']); assert.equal(f.controller.state.credits, 7);
  f.clear(); assert.deepEqual(f.values(), []); assert.equal(f.controller.state.credits, 0);
  assert.throws(() => f.controller.setValues(['standard', 'instant']), /Invalid selection/);
});
test('polarity: three independent radio groups always retain exactly one choice each', async () => {
  const f = await fixture('filter-polarity'); f.select('video:exclude', true); f.select('audio:include', true);
  assert.deepEqual(new Set(f.values()), new Set(['video:exclude', 'audio:include', 'text:any']));
  f.select('video:any', true); assert.ok(f.values().includes('audio:include'));
  assert.throws(() => f.controller.setValues(['video:any']), /Invalid selection/);
  f.clear(); assert.deepEqual(f.values(), ['video:any', 'audio:any', 'text:any']);
});
test('rapid reversals do not duplicate events or accumulate listeners', async () => {
  const f = await fixture('limited');
  for (let i = 0; i < 60; i++) f.select('research');
  assert.deepEqual(f.values(), ['design']); assert.equal(f.events.length, 60);
  assert.equal(f.root.listeners.get('change').size, 1);
  const count = f.events.length; f.controller.setValues(['code']); assert.equal(f.events.length, count);
});
test('keyboard Clear returns focus to an available local input', async () => {
  const f = await fixture('limited');
  f.root.querySelector('[data-clear]').focus(); f.clear();
  assert.equal(f.root.getRootNode().activeElement, f.input('design'));
  assert.equal(f.root.querySelector('[data-clear]').disabled, true);
  const filtered = await fixture('filtered-bulk');
  filtered.controller.setFilter('No matching value');
  filtered.root.querySelector('[data-clear]').focus(); filtered.clear();
  assert.equal(filtered.root.getRootNode().activeElement, filtered.root.querySelector('[data-filter]'));
});
test('configured initial values are validated and state updates stay silent', async () => {
  const f = await fixture('limited', { values: ['code', 'motion'] });
  assert.deepEqual(f.values(), ['code', 'motion']); assert.equal(f.events.length, 0);
  assert.equal(f.controller.setValues(['code', 'motion']), false);
  assert.equal(f.controller.setValues(['writing']), true); assert.equal(f.events.length, 0);
  f.controller.reset(); assert.deepEqual(f.values(), ['design']);
  await assert.rejects(() => fixture('limited', { onChange: 3 }), /onChange must be a function/);
});

test('semantic palette supports a contrasting recolor without hard-coded glyph colors', async () => {
  const css = await read('limited', 'buttons.css');
  for (const token of ['bg', 'surface', 'text', 'muted', 'border', 'control', 'accent', 'accent-ink', 'focus', 'selected']) assert.ok(css.includes(`--choice-${token}:`));
  const palettes = [
    ['#202222', '#f7f8f7', '#bac3bd', '#d4e4d8', '#202822'],
    ['#24213b', '#fbf8ff', '#c7bfdc', '#e1d5ff', '#24213b'],
  ];
  const luminance = hex => hex.slice(1).match(/../g).map(x => parseInt(x, 16) / 255).map(v => v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4).reduce((sum, v, i) => sum + v * [.2126, .7152, .0722][i], 0);
  const contrast = (a, b) => (Math.max(luminance(a), luminance(b)) + .05) / (Math.min(luminance(a), luminance(b)) + .05);
  for (const [bg, text, muted, accent, ink] of palettes) {
    assert.ok(contrast(bg, text) >= 4.5); assert.ok(contrast(bg, muted) >= 4.5); assert.ok(contrast(accent, ink) >= 4.5);
  }
  assert.match(css, /stroke: var\(--choice-accent-ink\)/);
  assert.match(css, /outline: 2px solid var\(--choice-focus\)/);
});
