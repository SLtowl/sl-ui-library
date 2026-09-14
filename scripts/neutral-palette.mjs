// --write performs the bounded mechanical migration of package styles only.
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

export function neutralHex(hex) {
  const rgb = [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16));
  // Other hues can encode errors, warnings or data; leave those alone.
  if (rgb[1] < rgb[0] || rgb[1] < rgb[2] || new Set(rgb).size === 1) return hex;
  const linear = rgb.map(v => (v /= 255) <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4);
  const y = linear[0] * .2126 + linear[1] * .7152 + linear[2] * .0722;
  const gray = Math.round(255 * (y <= .0031308 ? 12.92 * y : 1.055 * y ** (1 / 2.4) - .055)).toString(16).padStart(2, '0');
  return '#' + gray.repeat(3) + hex.slice(7); // Retain alpha and relative luminance.
}

export function neutralCss(css) {
  return css.replace(/([^{}]+)\{([^{}]*)\}/g, (rule, selector, body) => {
    // Successful validation, data series, avatar identities and online status.
    if (/\[data-result="success"\]|\.dd-avatar--sage\b|\.dd-series-3\b|\.status-dot\b/.test(selector)) return rule;
    const changed = body.replace(/([\w-]+)(\s*:\s*)([^;{}]+)/g, (declaration, property, colon, value) => {
      if (/^--sl-stop-/.test(property)) return declaration;
      if (/^(?:background|background-color)$/.test(property) &&
          (/var\(--(?:chosen-color|mixed-color)/.test(value) || /\.sl-sage\b|\.mini-timeline.*\bb\b/.test(selector))) return declaration;
      return property + colon + value.replace(/#[\da-f]{6}(?:[\da-f]{2})?\b/gi, neutralHex);
    });
    return selector + '{' + changed + '}';
  });
}

export function neutralPage(html) {
  // Never change color values or labels supplied as example data in the body.
  return html.replace(/(<style\b[^>]*>)([\s\S]*?)(<\/style>)/gi,
    (_, start, css, end) => start + neutralCss(css) + end);
}

export async function auditPackages({ write = false } = {}) {
  const root = new URL('../public/packages/', import.meta.url), changes = [];
  for (const entry of await readdir(root, { withFileTypes: true })) {
    if (!entry.isDirectory() || entry.isSymbolicLink()) continue;
    for (const name of ['buttons.css', 'index.html']) {
      const path = new URL(`${entry.name}/${name}`, root);
      const before = await readFile(path, 'utf8');
      const after = name.endsWith('.css') ? neutralCss(before) : neutralPage(before);
      if (before === after) continue;
      changes.push(`${entry.name}/${name}`);
      if (write) await writeFile(path, after);
    }
  }
  return changes;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const write = process.argv.includes('--write'), changes = await auditPackages({ write });
  console.log(JSON.stringify({ write, files: changes.length, packages: new Set(changes.map(p => p.split('/')[0])).size }));
}
