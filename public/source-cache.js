import { initialSources } from './view-data.js';
import { components } from './catalog-data.js';
const cache = new Map(Object.entries(initialSources).map(([key, value]) => [key, Promise.resolve(value)]));
const variants = new Set(components.flatMap(component => component.variants));
const files = new Set(['index.html', 'buttons.css', 'buttons.js', 'example.js']);
export function readSource(variant, file) {
  if (!variants.has(variant) || !files.has(file)) return Promise.reject(new Error('Unknown source'));
  const key = variant + '/' + file;
  if (!cache.has(key)) cache.set(key, fetch(new URL('packages/' + key, import.meta.url)).then(response => {
    if (!response.ok) throw new Error('Source not available');
    return response.text();
  }).catch(error => { cache.delete(key); throw error; }));
  return cache.get(key);
}
