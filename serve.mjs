import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { gzipSync } from 'node:zlib';
import { components } from './public/catalog-data.js';
const port = Number(process.env.PORT || 4321);
const root = new URL('./public/', import.meta.url);
const types = { html: 'text/html; charset=utf-8', css: 'text/css; charset=utf-8', js: 'text/javascript; charset=utf-8', png: 'image/png', woff2: 'font/woff2', txt: 'text/plain; charset=utf-8', zip: 'application/zip' };
// Explicit local asset allowlist. Menu contours are embedded SVG.
const allowed = new Set(['index.html', 'library.css', 'library.js', 'component.html', 'category.html', 'catalog.css', 'catalog.js', 'catalog-data.js', 'assets/instrument-sans-variable.woff2']);
allowed.add('preview-runtime.js');
for (const file of ['showcase.html', 'showcase.css', 'showcase.js', 'studio-motion.html', 'studio-motion.css', 'studio-motion.js']) allowed.add(file);
allowed.add('assets/menu-icons-v1.png');
allowed.add('preview-data.js');
for (const file of ['navigation.js', 'view-data.js', 'source-cache.js']) allowed.add(file);
for (const file of ['index.html', 'copy-button.css', 'copy-button.js', 'review.css', 'preview.js']) allowed.add(`experiments/copy/${file}`);
for (const file of ['index.html', 'like-button.css', 'like-button.js', 'review.css', 'preview.js']) allowed.add(`experiments/like/${file}`);
for (const kind of ['download', 'bookmark', 'playback', 'delete', 'upload', 'share', 'follow']) {
  for (const file of ['index.html', `${kind}-button.css`, `${kind}-button.js`, 'review.css', 'preview.js']) allowed.add(`experiments/${kind}/${file}`);
}
for (const file of ['index.html', 'review.css', 'preview.js']) allowed.add(`experiments/next/${file}`);
for (const file of ['index.html', 'review.css', 'preview.js']) allowed.add(`experiments/final-four/${file}`);
allowed.add('experiments/upload/demo.js');
for (const file of ['index.html', 'next.html', 'next.css', 'next.js', 'slider-studies.js', 'sliders.css', 'sliders.js', 'preview.js']) allowed.add(`experiments/sliders/${file}`);
for (const file of ['index.html', 'next.html', 'next.css', 'next.js', 'menus.css', 'menus.js', 'preview.js']) allowed.add(`experiments/menus/${file}`);
for (const file of ['index.html', 'next.html', 'navigation.css', 'navigation.js', 'next.css', 'next.js']) allowed.add(`experiments/navigation/${file}`);
for (const file of ['index.html', 'next.html', 'modal.html', 'drawer.html', 'sheet.html', 'popover.html', 'tooltip.html', 'confirm.html', 'palette.html', 'document.html', 'quickedit.html', 'tour.html', 'overlays.css', 'overlays.js', 'genie.js', 'next.css', 'next.js', 'review.css', 'review.js']) allowed.add(`experiments/overlays/${file}`);
for (const file of ['index.html', 'checkboxes.css', 'variations.css', 'checkboxes.js', 'preview.js']) allowed.add(`experiments/checkboxes/${file}`);
allowed.add('experiments/download/demo.js');
for (const file of ['index.html', 'inputs.css', 'inputs.js', 'review.css', 'preview.js']) allowed.add(`experiments/inputs/${file}`);
for (const file of ['index.html', 'next.html', 'next.css', 'toggles.css', 'toggles.js', 'review.css', 'preview.js']) allowed.add(`experiments/toggles/${file}`);
for (const variant of components.flatMap(component => component.variants)) {
  allowed.add(`downloads/matte-${variant}.zip`);
  for (const file of ['index.html', 'buttons.css', 'buttons.js', 'example.js', 'preview.js', 'overlays.js', 'genie.js', 'next.js', 'pin.js', 'menu-icons-v1.png', 'instrument-sans-variable.woff2', 'OFL.txt']) allowed.add(`packages/${variant}/${file}`);
}
const cache = new Map();
createServer(async (req, res) => {
  if (![`127.0.0.1:${port}`, `localhost:${port}`].includes(req.headers.host)) { res.writeHead(403).end(); return; }
  if (!['GET', 'HEAD'].includes(req.method)) { res.writeHead(405, { Allow: 'GET, HEAD' }).end(); return; }
  const path = new URL(req.url, `http://127.0.0.1:${port}`).pathname.slice(1) || 'index.html';
  if (!allowed.has(path)) { res.writeHead(404).end(); return; }
  try {
    const file = new URL(path, root);
    const info = await stat(file);
    let asset = cache.get(path);
    if (!asset || asset.modified !== info.mtimeMs || asset.size !== info.size) {
      const body = await readFile(file);
      asset = { body, modified: info.mtimeMs, size: info.size, etag: 'W/"' + createHash('sha256').update(body).digest('hex').slice(0, 24) + '"' };
      if (/\.(html|css|js|txt)$/.test(path)) asset.gzip = gzipSync(body);
      cache.set(path, asset);
    }
    const type = types[path.split('.').pop()];
    const headers = {
      'Content-Type': type, 'Cache-Control': path.endsWith('.woff2') ? 'public, max-age=86400' : 'no-cache', 'ETag': asset.etag, 'Vary': 'Accept-Encoding', 'X-Content-Type-Options': 'nosniff',
      'Content-Security-Policy': "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; font-src 'self'; img-src 'self' data:; frame-src 'self'; frame-ancestors 'self'; connect-src 'self'; base-uri 'none'; form-action 'none'",
    };
    if (path.endsWith('.zip')) headers['Content-Disposition'] = `attachment; filename="${path.split('/').pop()}"`;
    if (req.headers['if-none-match'] === asset.etag) { res.writeHead(304, headers).end(); return; }
    const acceptsGzip = (req.headers['accept-encoding'] || '').split(',').some(value => /^\s*gzip\s*(?:;\s*q\s*=\s*(?!0(?:\.0*)?\s*$)[\d.]+)?\s*$/.test(value));
    const body = acceptsGzip && asset.gzip ? asset.gzip : asset.body;
    if (body === asset.gzip) headers['Content-Encoding'] = 'gzip';
    headers['Content-Length'] = body.length;
    res.writeHead(200, headers); res.end(req.method === 'HEAD' ? undefined : body);
  } catch { res.writeHead(500).end('Could not load this file.'); }
}).listen(port, '127.0.0.1', () => console.log(`Button library: http://127.0.0.1:${port}/`));
