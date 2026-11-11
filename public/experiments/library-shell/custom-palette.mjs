// Shared custom palette math for preview CSS and every exported source format.
export const isCustom = value => /^#[0-9a-f]{6}$/i.test(value);
export const channels = hex => [1,3,5].map(i=>parseInt(hex.slice(i,i+2),16));
export function luminance(rgb){return rgb.map(v=>{v/=255;return v<=.04045?v/12.92:((v+.055)/1.055)**2.4;}).reduce((sum,v,i)=>sum+v*[.2126,.7152,.0722][i],0);}
export function contrast(a,b){const x=luminance(a),y=luminance(b);return (Math.max(x,y)+.05)/(Math.min(x,y)+.05);}
const blend=(a,b,t)=>a.map((v,i)=>Math.round(v+(b[i]-v)*t));
const css=(rgb,a=1)=>`rgb(${rgb.join(' ')} / ${a})`;
const tokenCache=new Map();
export function customTokens(palette){
 if(tokenCache.has(palette))return tokenCache.get(palette);
 const base=channels(palette),light=luminance(base)>.179,ink=light?[0,0,0]:[255,255,255],opposite=light?[255,255,255]:[0,0,0];
 // Hover follows the selected hue, with a contrast floor even at mid-gray.
 function surface(t){let value=blend(base,ink,t);if(contrast(value,ink)<4.5)value=blend(base,opposite,Math.abs(t));return value;}
 const tokens={base,ink,light,secondary:light?[38,45,54]:[248,250,252],secondaryInk:light?[255,255,255]:[38,45,54],edge:blend(base,ink,.32),hover:surface(.075),selected:surface(.14),surface};
 tokenCache.set(palette,tokens);if(tokenCache.size>64)tokenCache.delete(tokenCache.keys().next().value);return tokens;
}
export function customRecolor(rgb,alpha,palette,role='surface'){
 const t=customTokens(palette),spread=Math.max(...rgb)-Math.min(...rgb),level=rgb.reduce((a,b)=>a+b,0)/3;
 // Semantic colors (errors, charts, identity) retain their hue. Only their
 // foreground contrast is corrected; their colored backgrounds remain intact.
 if(spread>28){
  if(role!=='text'&&role!=='mark')return css(rgb,alpha);
  let adjusted=rgb;
  for(let amount=0;contrast(adjusted,t.base)<4.5&&amount<=1;amount+=.025)adjusted=blend(rgb,t.ink,amount);
  return css(adjusted,Math.max(alpha,.9));
 }
 if(role==='edge')return css(t.edge,Math.max(alpha,.65));
 if(role==='text'||role==='mark')return css(level>=112?t.ink:t.secondaryInk,Math.max(alpha,.9));
 if(alpha<.75)return css(level>=112?t.ink:rgb,alpha);
 // The original components use dark primary surfaces and light inverse ones.
 // Preserve that distinction, rather than making both sides the same color.
 return css(level<112?t.surface(level>=16&&level<=40?0:Math.min(.14,Math.max(-.04,(level-40)/360))):t.secondary,alpha);
}
export function customReadability(text,palette){
 const t=customTokens(palette),ink=css(t.ink),hover=css(t.hover),selected=css(t.selected),edge=css(t.edge),base=css(t.base);
 const rules=[];
 if(text.includes('.menu-demo')||text.includes('menus-')){
  const scope=':is(.menu-demo.menu-demo,.sl-component[data-kind^="menus-"])';
  const choices=':is(.menu-item,.surface-option,.format-option,.insert-option,.sl-option,.sl-action,.sl-day,.sl-time-list button)';
  rules.push(`${scope} ${choices}:not(:disabled):is(:hover,:focus-visible){background:${hover};color:${ink};box-shadow:inset 0 0 0 1px ${edge}}`);
  rules.push(`${scope} ${choices}:is([aria-checked=true],[aria-selected=true],[aria-pressed=true],[aria-current=true]){background:${selected};color:${ink};box-shadow:inset 0 0 0 1px ${edge}}`);
  rules.push(`${scope} ${choices}:is(:hover,:focus-visible,[aria-checked=true],[aria-selected=true],[aria-pressed=true]) small{color:${ink};opacity:.9}`);
 }
 const surfaces=['copy','like','download','bookmark','playback','delete','upload','share','follow'].filter(name=>text.includes(`.sl-${name}__surface`)).map(name=>`.sl-${name}__surface`);
 if(text.includes('.motion-button'))surfaces.push('.sl-component .motion-button .button-surface');
 if(text.includes('.everyday-component'))surfaces.push('.everyday-component .everyday-button .button-surface');
 if(surfaces.length)rules.push(`${surfaces.join(',')}{outline:1px solid ${edge};outline-offset:-1px}`);
 if(text.includes('.sl-copy'))rules.push(`.sl-copy{--copy-ink:${base};--copy-hover:${hover};--copy-feedback:${selected};--copy-text:${ink};--copy-focus:${edge}}`);
 if(text.includes('.motion-button'))rules.push(`.sl-component{--action-surface:${base};--action-hover:${hover};--action-feedback:${selected};--action-text:${ink};--action-focus:${edge}}`);
 if(text.includes('.everyday-component'))rules.push(`.sl-component .everyday-component{--action-surface:${base};--action-hover:${hover};--action-feedback:${selected};--action-text:${ink};--action-focus:${edge}}`);
 if(text.includes('.tool-button')&&text.includes('--action-surface'))rules.push(`.sl-component{--action-surface:${base};--action-hover:${hover};--action-selected:${selected};--action-selected-ink:${ink};--action-focus:${edge}}.sl-component .tool-button{color:${ink}}.sl-component .tool-button .tool-surface{border-color:${edge}}.sl-component .tool-button[aria-pressed="true"] .tool-surface{border-color:${ink}}.sl-component .tool-button[aria-pressed="true"]:hover .tool-surface{background:${selected};color:${ink}}`);
 if(text.includes('.ov-panel'))rules.push(`.sl-component .ov-panel{--ov-muted:${ink};--ov-text:${ink}}.sl-component .ov-panel :is(.ov-tabs,.ov-options,.ov-history) button:is([aria-pressed=true],:hover,:focus-visible){background:${selected};color:${ink}}`);
 if(text.includes('.nv-input')||text.includes('.ov-field'))rules.push(`.sl-component .nv-input::placeholder,.sl-component .ov-field input::placeholder{color:${ink};opacity:.85}`);
 return '\n@media(forced-colors:none){'+rules.join('\n')+'}\n';
}
