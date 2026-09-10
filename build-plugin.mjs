import {readFile, readdir, mkdir, writeFile} from 'node:fs/promises';
import {zip} from './zip.mjs';

export async function pluginFiles(root = new URL('./plugins/sl-ui-library/', import.meta.url)) {
 const files = new Map();
 const manifests = ['plugin.json', '.codex-plugin/plugin.json', '.claude-plugin/plugin.json'];
 for (const name of manifests) files.set(name, await readFile(new URL(name, root)));
 async function collect(folder) {
  for (const entry of (await readdir(new URL(folder, root), {withFileTypes: true})).sort((a,b) => a.name.localeCompare(b.name, 'en'))) {
   if (entry.isSymbolicLink() || entry.name.startsWith('.')) throw new Error('Unexpected plugin entry: ' + folder + entry.name);
   const path = folder + entry.name;
   if (entry.isDirectory()) await collect(path + '/');
   else if (entry.isFile() && /\.(?:md|mjs|json|png)$/.test(entry.name)) files.set(path, await readFile(new URL(path, root)));
   else throw new Error('Unsupported plugin entry: ' + path);
  }
 }
 for (const folder of ['skills/', 'scripts/', 'assets/']) await collect(folder);
 return files;
}

export async function buildPlugin() {
 const files = await pluginFiles();
 const target = new URL('./public/downloads/sl-ui-library-plugin.zip', import.meta.url);
 await mkdir(new URL('./public/downloads/', import.meta.url), {recursive: true});
 await writeFile(target, zip(files));
 return {files: files.size, archive: 'public/downloads/sl-ui-library-plugin.zip'};
}
