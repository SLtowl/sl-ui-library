import { readFile, writeFile } from 'node:fs/promises';
import { components } from './public/catalog-data.js';
const root = new URL('./public/', import.meta.url);
const views = {};
for (const [name, file] of [['home', 'index.html'], ['category', 'category.html'], ['component', 'component.html']]) {
  const html = await readFile(new URL(file, root), 'utf8');
  const main = html.match(/<main\b[\s\S]*?<\/main>/)?.[0];
  const dialog = html.match(/<dialog\b[\s\S]*?<\/dialog>/)?.[0];
  if (!main || !dialog) throw new Error(`Missing route content: ${file}`);
  views[name] = main + '\n' + dialog;
}
const initialSources = {};
for (const variant of components.flatMap(component => component.variants)) {
  initialSources[`${variant}/example.js`] = await readFile(new URL(`packages/${variant}/example.js`, root), 'utf8');
}
await writeFile(new URL('view-data.js', root), `// Generated route markup and initial examples. No navigation fetch is required.\nexport const views = ${JSON.stringify(views)};\nexport const initialSources = ${JSON.stringify(initialSources)};\n`);
console.log('Built local route templates and initial source examples.');
