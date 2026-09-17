import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import test from 'node:test';
import manifest from '../../public/catalog-batches/selection-basic-2.js';

const rootUrl = new URL('../../', import.meta.url);
const required = ['LICENSE', 'OFL.txt', 'buttons.css', 'buttons.js', 'example.js', 'index.html', 'instrument-sans-variable.woff2'];
const read = (variant, file) => readFile(new URL(`public/packages/${variant}/${file}`, rootUrl), 'utf8');

test('second Toggles batch contains ten isolated selection packages', async () => {
  assert.equal(manifest.length, 10);
  assert.equal(new Set(manifest.map(item => item.id)).size, 10);
  assert.ok(manifest.every(item => item.category === 'selection'));
  for (const item of manifest) {
    const variant = item.variants[0];
    assert.match(variant, /^selection-[a-z-]+-v11$/);
    assert.deepEqual((await readdir(new URL(`public/packages/${variant}/`, rootUrl))).sort(), required);
    assert.equal(item.preview, `./packages/${variant}/index.html?embed=1`);
    assert.equal(item.downloads[variant], `./downloads/matte-${variant}.zip`);
  }
});

test('exports use self-contained controls, original inline SVG and no remote behavior', async () => {
  for (const item of manifest) {
    const variant = item.variants[0];
    const [html, css, js, example] = await Promise.all(['index.html', 'buttons.css', 'buttons.js', 'example.js'].map(file => read(variant, file)));
    assert.match(html, new RegExp(`data-kind="${variant}"`));
    assert.match(html, /role="(?:switch|radiogroup)"/);
    assert.match(html, /<svg[\s>]/);
    assert.doesNotMatch(html + css + js + example, /https?:\/\//i);
    assert.doesNotMatch(js, /fetch\(|XMLHttpRequest|WebSocket|localStorage|sessionStorage|setTimeout|setInterval|requestAnimationFrame/);
    assert.match(css, /prefers-reduced-motion:reduce/);
    assert.match(css, /forced-colors:active/);
    assert.match(js, /window\.SLComponent = \{ mount, mountPreview \}/);
    assert.match(js, /selectionchange/);
    assert.doesNotThrow(() => new Function(js));
  }
});

function button(dataset = {}, role = '') {
  const attrs = new Map(role ? [['role', role]] : []);
  return {
    dataset: { ...dataset }, tabIndex: 0, disabled: false,
    getAttribute(name) { return attrs.get(name) ?? null; },
    setAttribute(name, value) { attrs.set(name, String(value)); },
    querySelector(selector) { return selector === '.sl-toggle-word' ? this.word : null; },
    word: { textContent: '' }
  };
}

function fixture(kind) {
  const status = { textContent: '' };
  const listeners = new Map();
  const events = [];
  const view = { AbortController, CustomEvent };
  let switchControl = null;
  let radioGroup = null;
  if (kind === 'switch') {
    switchControl = button({ field: 'enabled', statusOn: 'Enabled.', statusOff: 'Disabled.' }, 'switch');
    switchControl.setAttribute('aria-checked', 'false');
  } else {
    const radios = [button({ value: 'first', status: 'First.' }, 'radio'), button({ value: 'second', status: 'Second.' }, 'radio')];
    radioGroup = {
      dataset: { field: 'mode', default: 'first' },
      querySelectorAll(selector) { return selector === '[role="radio"]' ? radios : []; },
      contains(node) { return radios.includes(node); }
    };
  }
  const root = {
    dataset: {}, ownerDocument: { defaultView: view },
    matches(selector) { return selector === '.sl-component'; },
    querySelector(selector) {
      if (selector === '[role="switch"][data-field]') return switchControl;
      if (selector === '[role="radiogroup"][data-field]') return radioGroup;
      if (selector === '[data-live-status]') return status;
      return null;
    },
    addEventListener(type, handler) { listeners.set(type, handler); },
    dispatchEvent(event) { events.push(event); return true; },
    contains(node) { return node === switchControl || radioGroup?.contains(node); }
  };
  return { root, status, events };
}

async function loadController(variant, kind) {
  const source = await read(variant, 'buttons.js');
  const scope = {};
  new Function('window', source)(scope);
  const f = fixture(kind);
  const changes = [];
  const controller = scope.SLComponent.mount(f.root, { onChange: state => changes.push(state) });
  return { ...f, scope, controller, changes };
}

test('switch controller validates, emits copied state, resets and remounts', async () => {
  const f = await loadController('selection-line-wrap-v11', 'switch');
  assert.deepEqual(f.controller.state, { enabled: false });
  f.controller.setState({ enabled: true }, { emit: true });
  assert.deepEqual(f.controller.state, { enabled: true });
  assert.equal(f.status.textContent, 'Enabled.');
  assert.equal(f.events.length, 1);
  f.events[0].detail.state.enabled = false;
  assert.deepEqual(f.controller.state, { enabled: true });
  assert.throws(() => f.controller.setState({ enabled: 'yes' }), TypeError);
  assert.throws(() => f.controller.setState({ unknown: true }), TypeError);
  f.controller.reset();
  assert.deepEqual(f.controller.state, { enabled: false });
  assert.equal(f.scope.SLComponent.mount(f.root), f.controller);
  f.controller.destroy();
  assert.notEqual(f.scope.SLComponent.mount(f.root), f.controller);
});

test('segmented controller validates enum state and keeps one selected radio', async () => {
  const f = await loadController('selection-text-direction-v11', 'segments');
  assert.deepEqual(f.controller.state, { mode: 'first' });
  f.controller.setState({ mode: 'second' }, { emit: true });
  assert.deepEqual(f.controller.state, { mode: 'second' });
  assert.equal(f.status.textContent, 'Second.');
  assert.equal(f.changes.length, 1);
  assert.throws(() => f.controller.setState({ mode: 'third' }), RangeError);
});

test('visual states use direct reversible selectors rather than timed loops', async () => {
  for (const item of manifest) {
    const variant = item.variants[0];
    const css = await read(variant, 'buttons.css');
    assert.match(css, /\.sl-component\[data-state=/);
    assert.doesNotMatch(css, /@keyframes|animation(?:-name)?:\s*(?!none\b)[^;}]+/);
    assert.match(css, /transition:/);
  }
});
