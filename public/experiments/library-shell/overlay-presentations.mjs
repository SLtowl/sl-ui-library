export const overlayBatch=[{"base":"quickedit-overlay","name":"Quick edit","modes":["combined","icon"]},{"base":"overlays-workspace-settings-v11","name":"Workspace settings","modes":["combined","icon"]},{"base":"overlays-date-picker-v11","name":"Calendar date picker","modes":["combined","icon"]},{"base":"overlays-notification-inbox-v11","name":"Notification inbox","modes":["combined","icon"]},{"base":"overlays-filter-builder-v11","name":"Project filter overlay","modes":["combined","icon"]}];
export function overlayMarkup(markup, base, mode) {
  if (!overlayBatch.some(item => item.base === base)) return markup;
  let result = base === 'quickedit-overlay'
    ? markup.replace('class="overlay-demo', `class="sl-variant-${mode} overlay-demo`)
    : markup.replace('class="sl-component"', `class="sl-component sl-variant-${mode}"`);
  if(base==='overlays-workspace-settings-v11')result=result.replace('M4 7h16M4 17h16','M4 7h2m6 0h8M4 17h9m6 0h1');
  return result;
}