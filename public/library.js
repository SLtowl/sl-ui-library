import { components } from './catalog-data.js';
import { readSource } from './source-cache.js';

export function mountComponent(root, url) {
  const id = url.searchParams.get('component') || 'matte-save-cancel';
  const component = components.find(item => item.id === id);
  if (!component) {
    root.querySelector('.intro h1').textContent = 'Component not found';
    root.querySelector('.intro p').textContent = 'Choose an available component from the library.';
    root.querySelector('.workbench').hidden = true;
    const dialog = root.querySelector('#usage-dialog');
    root.querySelector('#close-usage').addEventListener('click', () => dialog.close());
    return { ready: Promise.resolve(), destroy() {} };
  }
  root.dataset.title = component.name + ' · SL UI Library';
  root.dataset.description = component.description;
  root.querySelector('.intro h1').textContent = component.name;
  root.querySelector('.intro p').textContent = component.description;
  root.querySelector('.workbench').setAttribute('aria-label', component.name + ' component');
  const variants = root.querySelector('.variant-controls');
  variants.replaceChildren(...component.variants.map((variant, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.dataset.variant = variant;
    button.setAttribute('aria-pressed', String(index === 0));
    button.textContent = variant[0].toUpperCase() + variant.slice(1);
    return button;
  }));
  variants.hidden = component.variants.length === 1;
  const singleLabel = root.querySelector('.single-component-label');
  singleLabel.hidden = !variants.hidden;
  singleLabel.textContent = component.name;
  if (component.usage) {
    for (const section of root.querySelectorAll('.usage-content > section')) section.remove();
    const actions = root.querySelector('.usage-actions');
    for (const item of component.usage) {
      const section = document.createElement('section');
      const heading = document.createElement('h3');
      heading.textContent = item.title;
      section.append(heading);
      for (const text of item.paragraphs) { const p = document.createElement('p'); p.textContent = text; section.append(p); }
      actions.before(section);
    }
  }
  const frame = root.querySelector('#component-preview');
  const code = root.querySelector('#source-code');
  const numbers = root.querySelector('#line-numbers');
  const panel = root.querySelector('#source-panel');
  const copy = root.querySelector('#copy');
  const copyLabel = root.querySelector('#copy-label');
  const status = root.querySelector('#copy-status');
  const dialog = root.querySelector('#usage-dialog');
  const tabs = [...root.querySelectorAll('[role="tab"]')];
  let variant = component.variants[0];
  let file = 'example.js';
  let source = '';
  let requestId = 0;
  let copyTimer;
  function updatePreview() {
    frame.setAttribute('variant', variant);
    frame.setAttribute('aria-label', 'Interactive ' + component.name + ' preview: ' + variant);
  }

  function updateDownload() {
    const download = root.querySelector('#download');
    download.href = component.downloads[variant];
    download.download = component.downloads[variant].split('/').pop();
  }

  async function loadCode() {
    const id = ++requestId;
    source = '';
    clearTimeout(copyTimer);
    copy.disabled = true;
    copyLabel.textContent = 'Copy code';
    status.textContent = '';
    panel.setAttribute('aria-busy', 'true');
    try {
      const text = await readSource(variant, file);
      if (id !== requestId) return;
      source = text;
      code.textContent = text;
      const lines = text.trimEnd().split('\n').length;
      numbers.textContent = Array.from({ length: lines }, (_, i) => i + 1).join('\n');
      panel.scrollTo(0, 0);
      copy.disabled = false;
    } catch {
      if (id !== requestId) return;
      code.textContent = 'This file could not be loaded.\nSelect a source tab to try again.';
      status.textContent = 'Source unavailable. Please try again.';
    } finally {
      if (id === requestId) panel.setAttribute('aria-busy', 'false');
    }
  }

  function selectFile(next) {
    file = next;
    const tabFile = next === 'buttons.js' ? 'example.js' : next;
    for (const tab of tabs) {
      const active = tab.dataset.file === tabFile;
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
      if (active) panel.setAttribute('aria-labelledby', tab.id);
    }
    loadCode();
  }
  for (const tab of tabs) {
    tab.addEventListener('click', () => selectFile(tab.dataset.file));
    tab.addEventListener('keydown', event => {
      const index = tabs.indexOf(tab);
      const next = event.key === 'ArrowRight' ? (index + 1) % tabs.length
        : event.key === 'ArrowLeft' ? (index + tabs.length - 1) % tabs.length
        : event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : null;
      if (next === null) return;
      event.preventDefault();
      tabs[next].focus();
      selectFile(tabs[next].dataset.file);
    });
  }
  for (const button of root.querySelectorAll('[data-variant]')) {
    button.addEventListener('click', () => {
      if (variant === button.dataset.variant) return;
      variant = button.dataset.variant;
      for (const option of root.querySelectorAll('[data-variant]')) option.setAttribute('aria-pressed', String(option === button));
      updateDownload();
      updatePreview();
      loadCode();
    });
  }
  root.querySelector('#reset').addEventListener('click', () => {
    frame.reset();
    status.textContent = 'Preview reset.';
  });
  copy.addEventListener('click', async () => {
    if (!source) return;
    const snapshot = source;
    const id = requestId;
    try {
      await navigator.clipboard.writeText(snapshot);
      if (id !== requestId) return;
      copyLabel.textContent = 'Copied';
      status.textContent = 'Code copied.';
      clearTimeout(copyTimer);
      copyTimer = setTimeout(() => {
        copyLabel.textContent = 'Copy code';
        if (status.textContent === 'Code copied.') status.textContent = '';
      }, 1800);
    } catch {
      if (id !== requestId) return;
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(code);
      selection.removeAllRanges();
      selection.addRange(range);
      panel.focus();
      status.textContent = 'Code selected. Press Ctrl+C (⌘C on Mac) to copy.';
    }
  });
  root.querySelector('#close-usage').addEventListener('click', () => dialog.close());
  for (const [selector, next] of [['#show-integration', 'example.js'], ['#show-controller', 'buttons.js']]) {
    root.querySelector(selector).addEventListener('click', () => {
      dialog.close();
      selectFile(next);
      root.querySelector('#js-tab').focus();
    });
  }
  updatePreview();
  updateDownload();
  const ready = loadCode();
  for (const option of root.querySelectorAll('[data-variant]')) {
    option.addEventListener('pointerenter', () => readSource(option.dataset.variant, file).catch(() => {}));
    option.addEventListener('focus', () => readSource(option.dataset.variant, file).catch(() => {}));
  }
  return { ready, destroy() { requestId++; clearTimeout(copyTimer); } };
}
