
import {mkdir,readFile,writeFile} from 'node:fs/promises';
import {loadPreview} from './public/site-preview-data.js';

const root = new URL('./public/', import.meta.url);
const pages = ['catalog', 'docs', 'showcase', 'studio-motion', 'analytics/privacy'];
for (const route of pages) {
  const source = await readFile(new URL(route + '.html', root), 'utf8');
  // Each public page sits one level deeper than its source.
  const rebase = (_, prefix, directory) => prefix + (directory === './' ? '../' : '../../');
  const page = source
    .replace(/(\b(?:href|src|poster)=["'])(\.\.?\/)/gi, rebase)
    .replace(/(\burl\(\s*['"]?)(\.\.?\/)/gi, rebase);
  const folder = new URL(route + '/', root);
  await mkdir(folder, {recursive:true});
  await writeFile(new URL('index.html', folder), page);
}

// The two homepage controls use the reviewed markup and motion styles directly.
const [copy,wifi] = await Promise.all([loadPreview('copy'),loadPreview('wifi-toggle-combined')]);
const homeFile = new URL('index.html', root);
let home = await readFile(homeFile, 'utf8');
const newline = home.includes('\r\n') ? '\r\n' : '\n';
for (const [name,markup] of [['copy',copy.markup],['wifi',wifi.markup]]) {
  const marker = new RegExp('<!-- home-' + name + ' -->[\\s\\S]*?<!-- /home-' + name + ' -->');
  if (!marker.test(home)) throw new Error('Missing homepage markup slot: ' + name);
  home = home.replace(marker, () =>
    '<!-- home-' + name + ' -->' + newline +
    '<div class="float-preview">' + markup.trim().replace(/\r?\n/g,newline) + '</div>' + newline +
    '<!-- /home-' + name + ' -->'
  );
}
const style = /(<style media="\(min-width:561px\)" id="home-controls-css">)[\s\S]*?(<\/style>)/;
if (!style.test(home)) throw new Error('Missing homepage styles slot');
home = home.replace(style, (_,open,close) => [open,copy.css.trim(),wifi.css.trim(),close].join(newline));
await writeFile(homeFile, home);
console.log('Built clean site routes and embedded the two homepage controls.');
