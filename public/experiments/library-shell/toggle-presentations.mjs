export const toggleBatch=[{"base":"glide-toggle","name":"Notifications","modes":["text","combined","icon"]},{"base":"theme-toggle","name":"Day & night","modes":["combined","icon"]},{"base":"sound-toggle","name":"Sound waves","modes":["text","combined","icon"]},{"base":"privacy-toggle","name":"Privacy lock","modes":["text","combined","icon"]},{"base":"sync-toggle","name":"Auto sync","modes":["text","combined","icon"]},{"base":"wifi-toggle","name":"Wi-Fi","modes":["text","combined","icon"]},{"base":"location-toggle","name":"Location","modes":["text","combined","icon"]},{"base":"battery-toggle","name":"Battery saver","modes":["text","combined","icon"]},{"base":"microphone-toggle","name":"Microphone","modes":["text","combined","icon"]},{"base":"autosave-toggle","name":"Auto save","modes":["text","combined","icon"]},{"base":"selection-line-wrap-v11","name":"Line wrap","modes":["text","combined","icon"]},{"base":"selection-sticky-header-v11","name":"Sticky header","modes":["text","combined","icon"]},{"base":"selection-grid-overlay-v11","name":"Grid overlay","modes":["text","combined"]},{"base":"selection-hide-balances-v11","name":"Hide balances","modes":["text","combined","icon"]},{"base":"selection-link-previews-v11","name":"Link previews","modes":["text","combined"]},{"base":"selection-completed-items-v11","name":"Completed items","modes":["text","combined","icon"]},{"base":"selection-autoplay-previews-v11","name":"Autoplay previews","modes":["text","combined"]}];
export function toggleMarkup(markup,base,mode){
 if(base.startsWith('selection-')){
  let result=markup.replace('class="sl-component"',`class="sl-variant-${mode} sl-component"`);
  if(mode==='icon'){
   const heading=result.match(/<h2 class="sl-heading">[\s\S]*?<\/h2>/)?.[0],glyph=heading?.match(/<svg\b[\s\S]*?<\/svg>/)?.[0];
   if(!glyph||!result.includes('class="sl-toggle-track"'))throw Error('Missing source toggle heading glyph or track: '+base);
   result=result.replace(glyph,'').replace('class="sl-toggle-track" aria-hidden="true">','class="sl-toggle-track" aria-hidden="true"><span class="tp-thumb sl-toggle__thumb">'+glyph+'</span>');
  }
  return result;
 }
 let result=markup.replace('class="sl-toggle ',`class="sl-variant-${mode} sl-toggle `);
 if(mode==='icon'&&base!=='theme-toggle'){
  const emblem=result.match(/<span class="sl-toggle__emblem"[^>]*>[\s\S]*?<\/svg><\/span>/)?.[0];
  if(!emblem||!result.includes('class="sl-toggle__thumb">'))throw Error('Missing source toggle emblem or thumb: '+base);
  result=result.replace(emblem,'').replace('class="sl-toggle__thumb">','class="sl-toggle__thumb">'+emblem);
 }
 return result;
}
export function togglePresentation(root,base,mode,controller){
 return controller;
}