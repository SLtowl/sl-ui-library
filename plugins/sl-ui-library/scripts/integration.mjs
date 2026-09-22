// Static source-marker diagnostic, not an HTML validator or a visual test.
// Input is a serialized rendered component subtree, never JSX or executable code.
export const integrationContract = {
  source: 'Integrate the exported HTML, CSS and controller together. Do not redraw a component from its name or screenshot.',
  provenance: 'A valid SL UI integration names the CLI-returned component ID and variant, reads the real source with SHA-256 receipts, and passes the source audit. A similar reconstruction is not a library integration.',
  icons: 'Preserve the source inline SVG geometry, viewBox and animation hooks. Never substitute Unicode glyphs, emoji or a different icon set.',
  styles: 'Retain scoped classes and required wrappers. Adapt host tokens locally; do not copy preview body styles. Assign a single visible focus treatment to each compound control.',
  audit: 'Run audit <variant> <rendered-html-file> on the serialized component subtree after integration. needs-review is a blocking failure and the CLI exits nonzero.',
  verification: 'Source markers are not visual proof. Compare the export and host app at desktop and narrow widths, including focus, typing, disabled, repeated activation and reduced motion.',
  guide: 'scripts/integration-guide.md',
};

function markup(html) {
  return html.replace(/<!--[\s\S]*?-->/g, '').replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1\s*>/gi, '');
}

function attributes(tag) {
  const result = Object.create(null);
  for (const match of tag.matchAll(/([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/g)) {
    result[match[1].toLowerCase()] = (match[2] ?? match[3] ?? match[4]).trim().replace(/\s+/g, ' ');
  }
  return result;
}

function classes(html) {
  const found = new Set();
  for (const tag of html.matchAll(/<[a-z][^>]*>/gi)) {
    for (const name of (attributes(tag[0]).class ?? '').split(/\s+/)) if (name.startsWith('sl-')) found.add(name);
  }
  return found;
}

const geometry = new Set(['viewbox', 'd', 'cx', 'cy', 'r', 'x', 'y', 'rx', 'ry', 'width', 'height', 'x1', 'x2', 'y1', 'y2', 'points', 'transform', 'href', 'xlink:href']);
function icons(html) {
  return [...html.matchAll(/<svg\b[^>]*>[\s\S]*?<\/svg\s*>/gi)].map(match => {
    const shapes = [...match[0].matchAll(/<(svg|path|circle|ellipse|rect|line|polyline|polygon|g|use)\b([^>]*)>/gi)].map(([, name, attrs]) => [
      name.toLowerCase(), Object.entries(attributes(attrs)).filter(([key]) => geometry.has(key) && !(name.toLowerCase() === 'svg' && ['width', 'height'].includes(key))).sort(([a], [b]) => a.localeCompare(b)),
    ]);
    return JSON.stringify(shapes);
  });
}

export function auditIntegration(source, rendered) {
  const expected = markup(source), actual = markup(rendered);
  const actualClasses = classes(actual);
  const missingClasses = [...classes(expected)].filter(name => !actualClasses.has(name)).sort();
  const expectedIcons = icons(expected), actualIcons = icons(actual);
  const missingIcons = [];
  expectedIcons.forEach((signature, index) => {
    const found = actualIcons.indexOf(signature);
    if (found < 0) missingIcons.push(index + 1);
    else actualIcons.splice(found, 1);
  });
  const hasMarkers = classes(expected).size > 0 || expectedIcons.length > 0;
  return {
    status: !hasMarkers || missingClasses.length || missingIcons.length ? 'needs-review' : 'source-markers-present',
    missingClasses, expectedIcons: expectedIcons.length, missingIcons,
    visualVerification: 'required',
    limitations: 'Heuristic comparison of sl-* class names and SVG geometry in serialized HTML only. Does not execute scripts, load styles, validate behavior, detect hidden copies, or certify pixel fidelity. Renamed classes and equivalent path syntax require manual review; runtime-created icons may require additional state snapshots.',
    integration: integrationContract,
  };
}
