export const navigationBatch=[{"base":"views-navigation","name":"View switcher","modes":["text","combined","icon"]},{"base":"sidebar-navigation","name":"Side navigation","modes":["combined","icon"]},{"base":"dock-navigation","name":"Bottom navigation","modes":["combined","icon"]}];
export function navigationMarkup(markup, base, mode) {
  if (!navigationBatch.some((item) => item.base === base)) return markup;
  return markup.replace('class="nav-demo', `class="sl-variant-${mode} nav-demo`);
}