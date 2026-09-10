import { readFile, writeFile } from 'node:fs/promises';
import { components } from './public/catalog-data.js';

// Compile the same downloadable sources into one local preview module.
// Preview instances share code and CSS; each keeps its own state.
const root = new URL('./public/', import.meta.url);
const definitions = [];
const controllers = new Map();
const styles = new Map();
const modules = [];
const frameControllers = new Map();
for (const variant of components.flatMap(component => component.variants)) {
  // Keep the native-dialog viewport, but compile its content and code once.
  // No iframe navigation, script loading or per-package font request at runtime.
  if (variant.endsWith('-overlay')) {
    const folder = new URL(`packages/${variant}/`, root);
    const read = name => readFile(new URL(name, folder), 'utf8');
    const html = await read('index.html');
    const markup = html.match(/<body[^>]*>([\s\S]*?)<\/body>/)?.[1];
    if (!markup || /<script\b/i.test(markup)) throw new Error('Invalid frame markup: '+variant);
    const css = (await read('buttons.css')).replace(/@font-face\s*\{[^}]*\}/g, '');
    if (!styles.has(css)) {
      const name = 'style' + styles.size;
      styles.set(css, name); modules.push('const '+name+' = '+JSON.stringify(css)+';');
    }
    let source;
    if (variant.endsWith('-overlay')) {
      const stripImports = text => text.replace(/^import[^\n]*\n/gm, '');
      source = await read('pin.js')+'\n'+(await read('genie.js')).replace('export function createGenie','function createGenie')+'\n'+stripImports(await read('overlays.js')).replace('export function mountOverlay','function mountOverlay');
      if ((await read('buttons.js')).includes("'./next.js'")) source+='\n'+stripImports(await read('next.js'));
      source+='\nreturn window.SLOverlayInstance;';
    } else {
      source = await read('buttons.js')+"\nconst controller = window.MatteNavigation.mount(document.querySelector('.nav-demo'));\nwindow.SLNavigationInstance = controller;\nreturn controller;";
    }
    let api = frameControllers.get(source);
    if (!api) {
      api = 'frameApi'+frameControllers.size;frameControllers.set(source,api);
      modules.push(`function ${api}(document,window){\nconst {AbortController,CustomEvent,ResizeObserver}=window;\nconst matchMedia=window.matchMedia.bind(window),requestAnimationFrame=window.requestAnimationFrame.bind(window),cancelAnimationFrame=window.cancelAnimationFrame.bind(window);\n${source}\n}`);
    }
    definitions.push(`${JSON.stringify(variant)}: { markup: ${JSON.stringify(markup)}, css: ${styles.get(css)}, frameMount: ${api} }`);
    continue;
  }
  const folder = new URL(`packages/${variant}/`, root);
  const html = await readFile(new URL('index.html', folder), 'utf8');
  const css = (await readFile(new URL('buttons.css', folder), 'utf8')).replace(/@font-face\s*\{[^}]*\}/g, '').replaceAll('./menu-icons-v1.png', './assets/menu-icons-v1.png');
  const source = (await readFile(new URL('buttons.js', folder), 'utf8')).replaceAll('document.activeElement', variant.endsWith('-navigation') ? 'element.getRootNode().activeElement' : 'document.activeElement');
  if (!styles.has(css)) {
    const name = 'style' + styles.size;
    styles.set(css, name);
    modules.push('const ' + name + ' = ' + JSON.stringify(css) + ';');
  }
  let api = controllers.get(source);
  if (!api) {
    api = `api${controllers.size}`;
    controllers.set(source, api);
    const expression = source.match(/\(\(\) => \{[\s\S]*\}\)\(\);\s*$/)?.[0];
    if (!expression) throw new Error(`Missing standalone controller: ${variant}`);
    modules.push(`const ${api} = ${expression.replace(/window\.\w+\s*=\s*(\{[^;]+\});/, 'return $1;')}`);
  }
  let markup = html.match(/<body[^>]*>([\s\S]*?)<\/body>/)?.[1];
  if (!markup) throw new Error(`Missing component markup: ${variant}`);
  markup = markup.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<p class="example-note"[\s\S]*?<\/p>/g, '');
  let demo = '';
  if (variant === 'download') {
    // Compile the safe preview adapter against the transferable controller.
    const adapter = await readFile(new URL('experiments/download/demo.js', root), 'utf8');
    const importLine = /^import\s+\{\s*mountDownloadButton\s*\}\s+from\s+['"]\.\/download-button\.js['"];\s*/;
    if (!importLine.test(adapter) || !adapter.includes('export function mountDownloadDemo')) throw new Error('Download demo adapter is not available.');
    modules.push(`const downloadDemo = (() => {\nconst mountDownloadButton = ${api}.mount;\n${adapter.replace(importLine, '').replace('export function mountDownloadDemo', 'function mountDownloadDemo')}\nreturn mountDownloadDemo;\n})();`);
    demo = ', demoMount: downloadDemo';
  }
  if (variant === 'upload') {
    // Reuse the approved adapter without importing a second controller at runtime.
    const adapter = await readFile(new URL('experiments/upload/demo.js', root), 'utf8');
    const importLine = /^import\s+\{\s*mountUploadButton\s*\}\s+from\s+['"]\.\/upload-button\.js['"];\s*/;
    if (!importLine.test(adapter) || !adapter.includes('export function mountUploadDemo')) throw new Error('Upload demo adapter is not available.');
    modules.push(`const uploadDemo = (() => {\nconst mountUploadButton = ${api}.mount;\n${adapter.replace(importLine, '').replace('export function mountUploadDemo', 'function mountUploadDemo')}\nreturn mountUploadDemo;\n})();`);
    demo = ', demoMount: uploadDemo';
  }
  definitions.push(`${JSON.stringify(variant)}: { markup: ${JSON.stringify(markup.trim())}, css: ${styles.get(css)}, mount: ${api}.mount${demo} }`);
}
await writeFile(new URL('preview-data.js', root), `// Generated from the standalone packages by build-previews.mjs.\n${modules.join('\n')}\nexport const previews = {\n${definitions.join(',\n')}\n};\n`);
console.log('Built shared previews from the catalog variants.');
