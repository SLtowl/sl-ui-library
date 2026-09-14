import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import vm from 'node:vm';
import manifest from '../../public/catalog-batches/selection.js';

const packageURL = slug => new URL('../../public/packages/selection-' + slug + '-v11/', import.meta.url);
const load = (slug, file) => readFile(new URL(file, packageURL(slug)), 'utf8');
const plain = value => JSON.parse(JSON.stringify(value));

// A deliberately small DOM double: controller/state tests, not a layout engine.
// It parses the actual package markup and models bubbling, focus, disabled
// buttons, attributes and AbortSignal cleanup. Real rendering is checked separately.
class Element {
  constructor(tag, attributes = {}, parent = null) {
    this.tagName = tag; this.attributes = attributes; this.parentElement = parent;
    this.children = []; this.listeners = new Map(); this.ownText = '';
    this.dataset = {};
    for (const [key, value] of Object.entries(attributes)) if (key.startsWith('data-')) this.dataset[key.slice(5).replace(/-([a-z])/g, (_, x) => x.toUpperCase())] = value;
    this.disabled = Object.hasOwn(attributes, 'disabled');
    this.tabIndex = Number(attributes.tabindex ?? 0);
    this.style = { setProperty: (key, value) => { this.style[key] = value; } };
  }
  setAttribute(key, value) { this.attributes[key] = String(value); }
  get disabled() { return this._disabled || false; }
  set disabled(value) {
    this._disabled = Boolean(value);
    if (this._disabled && this.scope?.activeElement === this) this.scope.activeElement = null;
  }
  getAttribute(key) { return this.attributes[key] ?? null; }
  hasAttribute(key) { return Object.hasOwn(this.attributes, key); }
  get textContent() { return this.ownText + this.children.map(child => child.textContent).join(''); }
  set textContent(value) { this.ownText = String(value); this.children = []; }
  matches(selector) {
    if (selector.endsWith(':not(:disabled)')) return !this.disabled && this.matches(selector.slice(0, -':not(:disabled)'.length));
    const tag = selector.match(/^[a-z]+/i)?.[0];
    if (tag && tag !== this.tagName) return false;
    for (const match of selector.matchAll(/\.([\w-]+)/g)) if (!(this.attributes.class || '').split(' ').includes(match[1])) return false;
    for (const match of selector.matchAll(/\[([\w-]+)(?:="([^"]*)")?\]/g)) {
      if (!this.hasAttribute(match[1]) || (match[2] !== undefined && this.getAttribute(match[1]) !== match[2])) return false;
    }
    return true;
  }
  querySelectorAll(selector) {
    const pieces = selector.trim().split(/\s+/);
    const last = pieces.pop();
    const result = [];
    const walk = element => {
      for (const child of element.children) {
        if (child.matches(last)) {
          let ancestor = child.parentElement, index = pieces.length - 1;
          while (index >= 0 && ancestor && ancestor !== this.parentElement) {
            if (ancestor.matches(pieces[index])) index--;
            ancestor = ancestor.parentElement;
          }
          if (index < 0) result.push(child);
        }
        walk(child);
      }
    };
    walk(this); return result;
  }
  querySelector(selector) { return this.querySelectorAll(selector)[0] || null; }
  closest(selector) { return this.matches(selector) ? this : this.parentElement?.closest(selector) || null; }
  contains(element) { return element === this || this.children.some(child => child.contains(element)); }
  getRootNode() { return this.scope; }
  focus() { this.scope.activeElement = this; }
  addEventListener(type, fn, { signal } = {}) {
    const listeners = this.listeners.get(type) || new Set(); listeners.add(fn); this.listeners.set(type, listeners);
    signal?.addEventListener('abort', () => listeners.delete(fn), { once: true });
  }
  dispatchEvent(event) {
    event.target ??= this;
    for (const fn of this.listeners.get(event.type) || []) fn(event);
    if (event.bubbles) this.parentElement?.dispatchEvent(event);
    return !event.defaultPrevented;
  }
  click() { if (!this.disabled) this.dispatchEvent({ type: 'click', target: this, bubbles: true }); }
  key(key, extra = {}) {
    const event = { type: 'keydown', target: this, key, bubbles: true, defaultPrevented: false, preventDefault() { this.defaultPrevented = true; }, ...extra };
    this.dispatchEvent(event); return event;
  }
}
function parse(html) {
  const body = html.match(/<body[^>]*>([\s\S]*?)<\/body>/)[1];
  const wrapper = new Element('body');
  let current = wrapper;
  for (const token of body.matchAll(/<[^>]+>|[^<]+/g)) {
    const value = token[0];
    if (value.startsWith('</')) { current = current.parentElement; continue; }
    if (!value.startsWith('<')) { current.ownText += value; continue; }
    const tag = value.match(/^<([a-z][\w-]*)/i)?.[1];
    if (!tag) continue;
    const attrs = {};
    for (const match of value.slice(tag.length + 1, -1).matchAll(/([\w-]+)(?:="([^"]*)")?/g)) attrs[match[1]] = match[2] ?? '';
    const element = new Element(tag, attrs, current); current.children.push(element);
    if (!value.endsWith('/>') && !['input', 'br', 'hr', 'img'].includes(tag)) current = element;
  }
  const root = wrapper.querySelector('.sl-component');
  const doc = { activeElement: null, defaultView: { AbortController, CustomEvent: class { constructor(type, init) { Object.assign(this, { type }, init); } } } };
  // A distinct focus scope verifies the Shadow DOM path, not document.activeElement.
  const scope = { activeElement: null };
  const assign = element => { element.ownerDocument = doc; element.scope = scope; element.children.forEach(assign); };
  assign(root); root.parentElement = null;
  return root;
}
async function fixture(slug, options = {}) {
  const [html, js] = await Promise.all([load(slug, 'index.html'), load(slug, 'buttons.js')]);
  const context = vm.createContext({ window: {}, AbortController });
  vm.runInContext(js, context);
  const root = parse(html), api = context.window.SLComponent, controller = api.mount(root, options);
  return { root, api, controller, html, js, q: selector => root.querySelector(selector) };
}
const choice = (f, field, value) => f.q('[data-field="' + field + '"] [data-choice="' + value + '"]');
const press = (f, field) => f.q('[data-toggle="' + field + '"]').click();
const action = (f, name) => f.q('[data-action="' + name + '"]').click();

test('exactly ten complete, independent selection exports and literal catalog entries', async () => {
  assert.equal(manifest.length, 10);
  assert.equal(new Set(manifest.map(item => item.id)).size, 10);
  const folderNames = await readdir(new URL('../../public/packages/', import.meta.url));
  assert.equal(folderNames.filter(name => /^selection-.*-v11$/.test(name)).length, 10);
  const font = await readFile(new URL('../../public/packages/theme-toggle/instrument-sans-variable.woff2', import.meta.url));
  const license = await readFile(new URL('../../LICENSE', import.meta.url));
  for (const item of manifest) {
    const variant = item.variants[0], slug = variant.slice(10, -4);
    assert.equal(item.category, 'selection');
    assert.equal(item.id, 'matte-' + variant);
    assert.equal(item.downloads[variant], './downloads/matte-' + variant + '.zip');
    assert.equal(item.usage.length, 3);
    const files = await readdir(packageURL(slug));
    assert.deepEqual(files.sort(), ['LICENSE', 'OFL.txt', 'buttons.css', 'buttons.js', 'example.js', 'index.html', 'instrument-sans-variable.woff2'].sort());
    assert.deepEqual(await readFile(new URL('instrument-sans-variable.woff2', packageURL(slug))), font);
    assert.deepEqual(await readFile(new URL('LICENSE', packageURL(slug))), license);
    const html = await load(slug, 'index.html'), css = await load(slug, 'buttons.css'), js = await load(slug, 'buttons.js');
    assert.match(html, /<html lang="en">/);
    assert.match(html, /name="viewport"/);
    assert.equal((html.match(/class="sl-component"/g) || []).length, 1);
    assert.match(html, new RegExp('data-kind="' + variant + '"'));
    assert.doesNotMatch(html.match(/<body[^>]*>([\s\S]*?)<\/body>/)[1], /<script/);
    assert.match(html, /src="\.\/buttons.js" defer/);
    assert.match(html, /<svg[^>]*aria-hidden="true"/);
    assert.doesNotMatch(html + css + js, /https?:\/\/|fetch\(|XMLHttpRequest|innerHTML|document\.activeElement|setTimeout|requestAnimationFrame|<img\b/);
    assert.match(js, /window\.SLComponent = \{ mount, mountPreview \};/);
    const expression = js.match(/\(\(\) => \{[\s\S]*\}\)\(\);\s*$/)?.[0];
    assert.ok(expression);
    // Run the exact compiler transformation, so a syntactically valid but
    // unexportable IIFE is caught before the coordinator integrates the batch.
    const compiled = vm.runInNewContext(expression.replace(/window\.\w+\s*=\s*(\{[^;]+\});/, 'return $1;'));
    assert.equal(typeof compiled.mount, 'function');
    assert.equal(typeof compiled.mountPreview, 'function');
    new vm.Script(await load(slug, 'example.js'));
    assert.match(css, /prefers-reduced-motion: reduce/);
    assert.match(css, /:focus-visible \{ outline: 2px/);
    for (const selector of css.replace(/@font-face\s*\{[^}]*\}/g, '').matchAll(/([^{}]+)\{/g)) {
      if (selector[1].trim().startsWith('@')) continue;
      for (const part of selector[1].split(',')) assert.ok(part.trim().startsWith('.sl-component'), part[0]);
    }
  }
});

const altered = {
  'presence-rail': { mode: 'away' },
  'reading-density': { density: 'roomy' },
  'reading-aids': { enabled: false, phrases: true },
  'focus-override': { focus: true, activity: false },
  'snap-modes': { grid: 'firm', guides: 'off' },
  'week-rhythm': { days: ['sun'] },
  'measurement-units': { units: 'imperial' },
  'inherited-setting': { source: 'custom', custom: true },
  'preview-mode': { draft: 'outline' },
  'output-priority': { primary: 'speakers', fallback: false }
};
for (const [slug, patch] of Object.entries(altered)) {
  test(slug + ': isolated state, validation, event copies, reset and repeat-safe lifecycle', async () => {
    const notices = [], f = await fixture(slug, { onChange: value => notices.push(value) });
    const initial = plain(f.controller.state), markup = f.root.textContent;
    const otherRoot = parse(f.html), other = f.api.mountPreview(otherRoot);
    assert.equal(f.api.mount(f.root), f.controller);
    assert.throws(() => f.api.mount(parse(f.html), { onChange: false }), /onChange/);
    assert.throws(() => f.controller.setState({ unknown: '<b>文字</b>' }), /Unknown/);
    assert.throws(() => f.controller.setState({ toString: 'bad' }), /Unknown/);
    const invalid = Object.fromEntries(Object.keys(initial).map(key => [key, 123]));
    assert.throws(() => f.controller.setState(invalid));
    for (const key of Object.keys(initial)) assert.throws(() => f.controller.setState({ [key]: undefined }));
    assert.deepEqual(plain(f.controller.state), initial);
    let events = 0;
    f.root.addEventListener('selectionchange', event => {
      events++;
      assert.equal(event.composed, true);
      Object.assign(event.detail.state, { tampered: true });
    });
    f.controller.setState(patch);
    assert.equal(events, 0);
    f.controller.reset();
    f.controller.setState(patch, { emit: true });
    assert.equal(events, 1); assert.equal(notices.length, 1);
    notices[0].tampered = true;
    const snapshot = f.controller.state; snapshot.tampered = true;
    if (snapshot.days) snapshot.days.push('mon');
    assert.equal(f.controller.state.tampered, undefined);
    assert.deepEqual(plain(other.state), initial);
    assert.equal(otherRoot.textContent, markup);
    f.controller.setState(patch, { emit: true });
    assert.equal(events, 1, 'repeat selections do not duplicate events');
    f.controller.reset(); f.controller.reset();
    assert.deepEqual(plain(f.controller.state), initial);
    assert.equal(f.root.textContent, markup);
    assert.equal(events, 1, 'reset is silent');
    f.controller.destroy(); f.controller.destroy();
    f.q('button').click();
    f.controller.setState(patch, { emit: true });
    assert.deepEqual(plain(f.controller.state), initial);
    const fresh = f.api.mount(f.root);
    assert.notEqual(fresh, f.controller);
    assert.deepEqual(plain(fresh.state), initial);
    for (const group of f.root.querySelectorAll('[role="radiogroup"]')) {
      assert.equal(group.querySelectorAll('[role="radio"]').filter(button => button.tabIndex === 0).length, 1);
    }
    fresh.destroy(); other.destroy();
  });
}

test('presence arrows wrap; Home/End and Shadow DOM focus use the current group', async () => {
  const f = await fixture('presence-rail');
  choice(f, 'mode', 'available').key('ArrowRight');
  assert.equal(f.controller.state.mode, 'focus');
  assert.equal(f.root.getRootNode().activeElement, choice(f, 'mode', 'focus'));
  choice(f, 'mode', 'focus').key('End');
  assert.equal(f.controller.state.mode, 'away');
  choice(f, 'mode', 'away').key('ArrowRight');
  assert.equal(f.controller.state.mode, 'available');
  choice(f, 'mode', 'available').key('ArrowLeft');
  assert.equal(f.controller.state.mode, 'away');
  choice(f, 'mode', 'away').key('Home');
  assert.equal(f.controller.state.mode, 'available');
  assert.equal(choice(f, 'mode', 'available').key('ArrowRight', { ctrlKey: true }).defaultPrevented, false);
  assert.equal(f.controller.state.mode, 'available');
});

test('density boundaries disable the unavailable direction and repair focused buttons', async () => {
  const f = await fixture('reading-density');
  f.q('[data-action="more"]').focus(); action(f, 'more');
  assert.equal(f.controller.state.density, 'roomy');
  assert.equal(f.q('[data-action="more"]').disabled, true);
  assert.equal(f.root.getRootNode().activeElement, f.q('[data-action="less"]'));
  action(f, 'more'); assert.equal(f.controller.state.density, 'roomy');
  action(f, 'less'); action(f, 'less');
  assert.equal(f.controller.state.density, 'compact');
  assert.equal(f.q('[data-action="less"]').disabled, true);
  assert.equal(f.q('[data-step]').textContent, '1 of 3');
});

test('reading aids preserve child choices while the master is off', async () => {
  const f = await fixture('reading-aids');
  press(f, 'phrases'); press(f, 'enabled');
  assert.equal(f.q('[data-toggle="guide"]').disabled, true);
  assert.equal(f.root.dataset.phrases, 'false');
  press(f, 'guide'); assert.equal(f.controller.state.guide, true);
  press(f, 'enabled');
  assert.equal(f.root.dataset.phrases, 'true');
  assert.equal(f.q('[data-toggle="phrases"]').getAttribute('aria-checked'), 'true');
});

test('focus override restores asymmetric saved settings over rapid reversals', async () => {
  const f = await fixture('focus-override');
  press(f, 'activity');
  for (let i = 0; i < 10; i++) {
    press(f, 'focus');
    assert.equal(f.q('[data-toggle="hints"]').getAttribute('aria-checked'), 'false');
    assert.equal(f.q('[data-toggle="hints"]').disabled, true);
    press(f, 'focus');
    assert.equal(f.q('[data-toggle="activity"]').getAttribute('aria-checked'), 'false');
    assert.equal(f.q('[data-toggle="hints"]').getAttribute('aria-checked'), 'true');
  }
});

test('snap mode keyboard changes remain inside their independent row', async () => {
  const f = await fixture('snap-modes');
  choice(f, 'grid', 'soft').key('ArrowRight');
  assert.deepEqual(plain(f.controller.state), { grid: 'firm', guides: 'firm' });
  choice(f, 'guides', 'firm').key('Home');
  assert.deepEqual(plain(f.controller.state), { grid: 'firm', guides: 'off' });
  assert.equal(choice(f, 'grid', 'firm').tabIndex, 0);
  assert.equal(choice(f, 'guides', 'off').tabIndex, 0);
});

test('day toggles, replacements, empty selections and normalized API order agree', async () => {
  const f = await fixture('week-rhythm');
  action(f, 'weekend');
  assert.deepEqual(plain(f.controller.state.days), ['sat', 'sun']);
  f.q('[data-day="sat"]').click();
  assert.deepEqual(plain(f.controller.state.days), ['sun']);
  action(f, 'clear');
  assert.deepEqual(plain(f.controller.state.days), []);
  assert.equal(f.q('[data-action="clear"]').disabled, true);
  action(f, 'weekdays');
  assert.equal(f.controller.state.days.length, 5);
  f.controller.setState({ days: ['sun', 'mon', 'sun'] });
  assert.deepEqual(plain(f.controller.state.days), ['mon', 'sun']);
});

test('unit reversal always uses canonical values and accurate labels', async () => {
  const f = await fixture('measurement-units');
  for (let i = 0; i < 20; i++) {
    choice(f, 'units', 'imperial').click();
    assert.equal(f.q('[data-distance]').textContent, '7.5');
    assert.equal(f.q('[data-ascent]').textContent, '1575');
    assert.equal(f.q('[data-distance-unit]').textContent, 'mi');
    assert.equal(f.q('[data-ascent-unit]').textContent, 'ft');
    choice(f, 'units', 'metric').click();
    assert.equal(f.q('[data-distance]').textContent, '12.0');
    assert.equal(f.q('[data-ascent]').textContent, '480');
  }
});

test('workspace updates change only inherited effective state; custom value survives', async () => {
  const f = await fixture('inherited-setting');
  assert.equal(f.q('[data-effective]').textContent, 'On');
  f.controller.setState({ workspace: false });
  assert.equal(f.q('[data-effective]').textContent, 'Off');
  choice(f, 'source', 'custom').click(); press(f, 'custom');
  choice(f, 'source', 'workspace').click();
  assert.equal(f.q('[data-effective]').textContent, 'Off');
  assert.equal(f.q('[data-toggle="custom"]').disabled, true);
  choice(f, 'source', 'custom').click();
  assert.equal(f.q('[data-effective]').textContent, 'On');
});

test('draft modes support Apply, Cancel, Escape and correct return focus', async () => {
  const f = await fixture('preview-mode');
  choice(f, 'draft', 'outline').click();
  assert.deepEqual(plain(f.controller.state), { draft: 'outline', applied: 'list' });
  choice(f, 'draft', 'outline').key('Escape');
  assert.equal(f.controller.state.draft, 'list');
  assert.equal(f.root.getRootNode().activeElement, choice(f, 'draft', 'list'));
  choice(f, 'draft', 'outline').click(); action(f, 'apply');
  assert.deepEqual(plain(f.controller.state), { draft: 'outline', applied: 'outline' });
  choice(f, 'draft', 'list').click(); action(f, 'cancel');
  assert.deepEqual(plain(f.controller.state), { draft: 'outline', applied: 'outline' });
  assert.equal(f.q('[data-action="apply"]').disabled, true);
});

test('output priority swaps reversibly and blocks swapping while fallback is off', async () => {
  const f = await fixture('output-priority');
  action(f, 'swap'); assert.equal(f.q('[data-primary]').textContent, 'Speakers');
  press(f, 'fallback'); assert.equal(f.q('[data-action="swap"]').disabled, true);
  action(f, 'swap'); assert.equal(f.controller.state.primary, 'speakers');
  assert.equal(f.q('[data-secondary-label]').textContent, 'Fallback disabled');
  press(f, 'fallback'); action(f, 'swap');
  assert.equal(f.q('[data-primary]').textContent, 'Headphones');
});

function contrast(a, b) {
  const luminance = hex => {
    const channels = hex.slice(1).match(/../g).map(value => parseInt(value, 16) / 255).map(value => value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4);
    return channels[0] * .2126 + channels[1] * .7152 + channels[2] * .0722;
  };
  const x = luminance(a), y = luminance(b);
  return (Math.max(x, y) + .05) / (Math.min(x, y) + .05);
}
test('semantic palette substitution keeps text, selection, glyph and focus contrast', async () => {
  const original = Object.fromEntries([...((await load('presence-rail', 'buttons.css')).matchAll(/(--sl-[a-z-]+): (#[0-9a-f]{6});/g))].map(match => [match[1], match[2]]));
  const recolored = { ...original, '--sl-surface': '#24213b', '--sl-inset': '#191627', '--sl-selected': '#403852', '--sl-accent': '#ded4fa', '--sl-focus': '#ded4fa', '--sl-text': '#faf7ff', '--sl-muted': '#c3bcd2', '--sl-on-accent': '#282036' };
  for (const palette of [original, recolored]) {
    for (const background of ['--sl-surface', '--sl-inset', '--sl-selected']) {
      assert.ok(contrast(palette['--sl-text'], palette[background]) >= 4.5);
      assert.ok(contrast(palette['--sl-muted'], palette[background]) >= 4.5);
      assert.ok(contrast(palette['--sl-focus'], palette[background]) >= 3);
      assert.ok(contrast(palette['--sl-accent'], palette[background]) >= 3);
    }
    assert.ok(contrast(palette['--sl-on-accent'], palette['--sl-accent']) >= 4.5);
  }
  for (const item of manifest) {
    const slug = item.variants[0].slice(10, -4), css = await load(slug, 'buttons.css');
    for (const token of Object.keys(original)) assert.ok(css.includes('var(' + token + ')'), token + ' must style a semantic element');
  }
});
