import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { auditPackages, neutralCss, neutralHex, neutralPage } from '../scripts/neutral-palette.mjs';

const read = path => readFile(new URL('../public/packages/' + path, import.meta.url), 'utf8');
const luminance = hex => {
  const rgb = [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map(v => v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4);
  return rgb[0] * .2126 + rgb[1] * .7152 + rgb[2] * .0722;
};
const contrast = (a, b) => (Math.max(luminance(a), luminance(b)) + .05) / (Math.min(luminance(a), luminance(b)) + .05);

test('all exported packages keep accidental sage out of theme colors', async () => {
  assert.deepEqual(await auditPackages(), []);
});

test('neutral migration preserves luminance, alpha and non-green semantic hues', () => {
  for (const hex of ['#202222', '#d4e4d8', '#202b23', '#b4c0b8', '#465149']) {
    const gray = neutralHex(hex);
    assert.equal(gray.slice(1, 3), gray.slice(3, 5));
    assert.equal(gray.slice(3, 5), gray.slice(5, 7));
    assert.ok(Math.abs(luminance(hex) - luminance(gray)) < .004);
  }
  assert.ok(neutralHex('#10181224').endsWith('24'));
  for (const hex of ['#efb8a6', '#e8d4a5', '#aec6d2']) assert.equal(neutralHex(hex), hex);
  assert.equal(neutralCss('.sample {color:#202222}'), '.sample {color:#222222}');
  assert.equal(neutralPage('<input value="#b6cbbb">'), '<input value="#b6cbbb">');
});

test('real color examples, charts and success states retain their meanings', async () => {
  assert.match(await read('inputs-color-v11/buttons.css'), /--chosen-color, #b6cbbb/);
  assert.match(await read('inputs-color-v11/index.html'), /value="#b6cbbb"/);
  assert.match(await read('overlays-color-mixer-v11/buttons.css'), /--mixed-color,#a8c0ae/);
  assert.match(await read('sliders-gradient-stops-v11/buttons.css'), /--sl-stop-sage:#8fa996/);
  assert.match(await read('data-display-heatmap-v11/buttons.css'), /--dd-chart:#929292/);
  assert.match(await read('code-input/buttons.css'), /border-color: #4f8d72/);
  assert.match(await read('avatars-display/buttons.css'), /dd-avatar--sage\{background:#bed2c4/);
});

test('actual Feedback theme retains readable text, primary buttons and focus', async () => {
  const css = await read('feedback-errors-v11/buttons.css');
  const tokens = Object.fromEntries([...css.matchAll(/--fb-([\w-]+):\s*(#[\da-f]{6})/g)].map(m => [m[1], m[2]]));
  for (const surface of ['surface', 'raised']) {
    for (const foreground of ['text', 'muted', 'danger', 'warning']) {
      assert.ok(contrast(tokens[foreground], tokens[surface]) >= 4.5, `${foreground} on ${surface}`);
    }
  }
  assert.ok(contrast(tokens.accent, tokens['on-accent']) >= 4.5);
  assert.ok(contrast(tokens.focus, tokens.surface) >= 3);
  assert.ok(contrast(tokens.outside, '#efefef') >= 4.5);
});
