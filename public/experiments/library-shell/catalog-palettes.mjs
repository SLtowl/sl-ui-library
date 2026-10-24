// Shared preview/export colors. Never mutate a shared sheet or remount a controller.
import {previews} from '../../preview-data.js?v=instant-4';
import {configurePreviewCursor} from './site-cursor.mjs';
const sheetCache=new WeakMap(), owners=new WeakMap(), definitions=new Map(),nestedOwners=new WeakMap();
// Presentation only: retain the approved selection colors across isolated
// preview roots without recoloring them or adding them to exported packages.
const selectionCss='@media(forced-colors:none){::selection{background:#dce4ed;color:#2e3b49;text-shadow:none}}';
const selectionSheet=new CSSStyleSheet();selectionSheet.replaceSync(selectionCss);
const initialPaletteSheet=new CSSStyleSheet();initialPaletteSheet.replaceSync('*,*::before,*::after{transition:none!important}');
// Natural block flow keeps tall demos reachable; source layouts and controllers stay intact.
const previewLayout=new CSSStyleSheet();previewLayout.replaceSync(':host{height:auto;min-height:var(--shell-preview-min-height,264px)}.stage{position:relative;inset:auto;min-height:var(--shell-preview-min-height,264px);padding-block:16px;box-sizing:border-box}:host([variant="share"]){height:var(--shell-preview-min-height,264px)}');
// Some CSSOM serializers omit a zero transition duration before a nonzero
// delay. Restore only the longhands whose meaning would change on reparse.
const transitionProbe=new CSSStyleSheet();
function paletteBodyStart(text){
  let quote='',comment=false,round=0,square=0;
  for(let i=0;i<text.length;i++){
    const c=text[i],next=text[i+1];
    if(comment){if(c==='*'&&next==='/'){comment=false;i++;}continue;}
    if(c==='\\'){i++;continue;}
    if(quote){if(c===quote)quote='';continue;}
    if(c==='/'&&next==='*'){comment=true;i++;continue;}
    if(c==='"'||c==="'"){quote=c;continue;}
    if(c==='(')round++;else if(c===')')round--;
    else if(c==='[')square++;else if(c===']')square--;
    else if(c==='{'&&!round&&!square)return i+1;
  }
  return 0;
}
function paletteChildStarts(text,children){
  const starts=[];let quote='',comment=false,depth=1,round=0,square=0,statement=true;
  for(let i=paletteBodyStart(text);i<text.length&&starts.length<children.length;i++){
    const c=text[i],next=text[i+1];
    if(comment){if(c==='*'&&next==='/'){comment=false;i++;}continue;}
    if(quote){if(c==='\\')i++;else if(c===quote)quote='';continue;}
    if(c==='/'&&next==='*'){comment=true;i++;continue;}
    if(depth===1&&!round&&!square&&statement&&!/[\t\n\f\r ]/.test(c)){
      const child=children[starts.length].cssText;
      if(text.startsWith(child,i)){starts.push(i);i+=child.length-1;continue;}
      statement=false;
    }
    if(c==='\\'){i++;continue;}
    if(c==='"'||c==="'"){quote=c;continue;}
    if(c==='(')round++;else if(c===')')round--;
    else if(c==='[')square++;else if(c===']')square--;
    else if(c==='{')depth++;else if(c==='}')depth--;
    else if(c===';'&&depth===1&&!round&&!square)statement=true;
  }
  if(starts.length!==children.length)throw new Error('Cannot locate serialized CSS child rule');
  return starts;
}
function paletteRuleText(rule){
  const text=rule.cssText,children=[...rule.cssRules||[]],starts=children.length?paletteChildStarts(text,children):[];
  const repairs=[];
  if(rule.style?.getPropertyValue('transition-duration')){
    const style=rule.style,declarations=style.cssText;
    transitionProbe.replaceSync('x{'+declarations+'}');
    const reparsed=transitionProbe.cssRules[0].style;
    for(const property of ['transition-duration','transition-delay']){
      const value=style.getPropertyValue(property);
      if(value!==reparsed.getPropertyValue(property))repairs.push(property+': '+value+(style.getPropertyPriority(property)?' !important':'')+';');
    }
  }
  let output='',position=0;
  if(repairs.length){
    let at=starts[0]??(text.endsWith('}')?text.length-1:text.length);
    while(at&&/[\t\n\f\r ]/.test(text[at-1]))at--;
    output=text.slice(0,at)+' '+repairs.join(' ');position=at;
  }
  for(let i=0;i<children.length;i++){
    const child=children[i],at=starts[i];
    output+=text.slice(position,at)+paletteRuleText(child);position=at+child.cssText.length;
  }
  return output+text.slice(position);
}
function recolor(value,palette,textRole=false){
  return value.replace(/#[\da-f]{3,8}\b|rgba?\([^)]*\)|\b(?:white|black)\b/gi,token=>{
    let channels,alpha=1;
    if(token[0]==='#'){
      let hex=token.slice(1);if(hex.length===3||hex.length===4)hex=[...hex].map(c=>c+c).join('');
      if(![6,8].includes(hex.length))return token;
      channels=[0,2,4].map(i=>parseInt(hex.slice(i,i+2),16));if(hex.length===8)alpha=parseInt(hex.slice(6),16)/255;
    }else if(/^rgba?/i.test(token)){
      const numbers=token.match(/[\d.]+%?/g);if(!numbers||numbers.length<3)return token;
      channels=numbers.slice(0,3).map(v=>parseFloat(v)*(v.endsWith('%')?2.55:1));
      if(numbers[3])alpha=parseFloat(numbers[3])/(numbers[3].endsWith('%')?100:1);
    }else channels=token.toLowerCase()==='white'?[255,255,255]:[0,0,0];
    if(palette==='blue'&&textRole&&alpha>=.75&&Math.max(...channels)<112)return `rgb(52 64 78 / ${alpha})`;
    if(palette==='black'&&textRole&&alpha>=.75&&Math.max(...channels)-Math.min(...channels)<=28&&Math.min(...channels)>=112){
      return `rgb(${channels.map(v=>Math.min(255,v+14)).join(' ')} / ${alpha})`;
    }
    // Blue surfaces need a brighter secondary foreground than the charcoal
    // originals. Do not lighten surface/border tokens along with the text.
    if(palette==='blue'&&textRole&&alpha>=.75&&channels.reduce((a,b)=>a+b,0)/3>=112){
      const low=Math.min(...channels),lift=Math.max(0,255-low);
      return `rgb(${channels.map(v=>Math.min(255,v+lift)).join(' ')} / ${alpha})`;
    }
    // Pastel warning/danger ink was authored for charcoal. Keep its hue but
    // darken it for paper; the translucent status surface stays unchanged.
    if(palette==='white'&&textRole&&alpha>=.75&&Math.max(...channels)-Math.min(...channels)>28){
      const factor=Math.min(1,94/Math.max(...channels));
      return `rgb(${channels.map(v=>Math.round(v*factor)).join(' ')} / ${alpha})`;
    }
    // Preserve semantic/accent colors and transparent shadows/overlays.
    if(Math.max(...channels)-Math.min(...channels)>28||alpha<.75)return token;
    const light=channels.reduce((a,b)=>a+b,0)/765;
    let rgb;
    if(palette==='white'){
      // Reference paper and cool ink, rather than a neutral-gray inversion.
      const v=Math.round(light<.5?255-light*65:25+(1-light)*140);
      rgb=light<.5?[Math.min(255,v+2),Math.min(255,v+3),Math.min(255,v+5)]:[v+23,v+35,v+49];
      if(textRole&&light>=.5)rgb=rgb.map((v,i)=>Math.min(v,[83,100,120][i]));
    }else if(palette==='black'){
      if(light>=.44)return token;
      const v=Math.round(light*255);rgb=[v+7,v+11,v+17];
    }else if(light<.44){
      // Slate blue from the approved reference. Bound the hover ramp so small
      // white labels remain readable, including the brighter hover surface.
      const t=Math.min(1,light/(34/255)),shade=Math.max(0,light*255-34)*.18;
      rgb=[Math.round(65+t*20-shade),Math.round(92+t*24-shade),Math.round(128+t*26-shade)];
    }else return token;
    return `rgb(${rgb.join(' ')} / ${alpha})`;
  });
}
export function paletteCss(text,palette){
  if(!['black','white','blue'].includes(palette))throw new Error('Unknown palette');
  const result=new CSSStyleSheet();result.replaceSync(text);
  // Only the authored Buttons backdrop family owns this light stage. The edge
  // token is also used by nested controls, so change the wrapper border itself.
  const buttonsStage=/\.sl-component \.(?:motion-button|tool-button)\b/.test(text)&&text.includes('.component-status')?[...result.cssRules].find(rule=>rule.selectorText==='.sl-component'&&/var\(--action-stage\)/.test(rule.style?.background||'')):null;
  const textVars=new Set(),surfaceVars=new Set();
  function roles(rules){for(const rule of rules){if(rule.style)for(const property of [...rule.style]){
    if(property.startsWith('--'))continue;
    if(property!=='color'&&!/^background(?:-|$)/.test(property))continue;
    const set=property==='color'?textVars:surfaceVars;
    for(const match of rule.style.getPropertyValue(property).matchAll(/var\((--[\w-]+)/g))set.add(match[1]);
  }if(rule.cssRules)roles(rule.cssRules);}}
  roles(result.cssRules);
  const outside=[];let transparentRoot=false;
  function visit(rules){for(const rule of rules){
    if(rule.style)for(const property of [...rule.style]){
      // These captions already target the light page outside a themed surface.
      const selector=rule.selectorText||'';
      if(rule===buttonsStage&&palette==='white'){
        if(property==='--action-stage'){rule.style.setProperty(property,'#e6ebf0');continue;}
        if(/^border-(?:top|right|bottom|left)-color$/.test(property)){rule.style.setProperty(property,'#cbd3dc');continue;}
      }
      // The document and action-stage are demonstration backdrops, not control
      // surfaces. Keep their original ink/background pair in every palette.
      if((/^(?:html|body)(?:\s*,\s*(?:html|body))*$/.test(selector)&&/^(?:color|background(?:-color|-image)?)$/.test(property))||property==='--action-stage')continue;
      if(/^--[\w-]*outside$/.test(property)||['--sl-caption','--ov-ink'].includes(property)||(property==='color'&&/\.(?:sl-field__helper|sl-code__label|menu-hint|menu-feedback|overlay-feedback)\b/.test(selector)))continue;
      // Person colors are identity swatches, not light/dark surface tokens.
      if((property==='color'&&/\.(?:dd-avatar|dd-mini-avatar)$/.test(selector))||(/\.dd-avatar--(?:sage|blue|sand|rose)$/.test(selector)&&property==='background'))continue;
      if(property==='color'&&/^\.sl-component(?:\.[\w-]+)*$/.test(selector)&&!rule.style.background&&!rule.style.backgroundColor){transparentRoot=true;continue;}
      if(property==='color')for(const part of selector.split(',').map(s=>s.trim().replace(/^\.sl-component\s+/,'')))if(/^\.(?:heading\s|note\b|status\b)/.test(part))outside.push(`:is(.composition,.sl-component) > ${part}{color:${rule.style.getPropertyValue(property)}}`);
      if(property.startsWith('--')||/^(color|background(-color|-image)?|border.*color|border|outline(-color)?|fill|stroke|caret-color|accent-color)$/.test(property)){
        const original=rule.style.getPropertyValue(property);
        // CSS strings and URL payloads are data, never palette tokens.
        const textRole=property==='color'||(textVars.has(property)&&!surfaceVars.has(property));
        const next=original.replace(/url\((?:[^()"']|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')*\)|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|#[\da-f]{3,8}\b|rgba?\([^)]*\)|\b(?:white|black)\b/gi,token=>/^(?:url\(|["'])/i.test(token)?token:recolor(token,palette,textRole));
        if(next!==original)rule.style.setProperty(property,next,rule.style.getPropertyPriority(property));
      }
    }
    if(rule.cssRules)visit(rule.cssRules);
  }}
  visit(result.cssRules);
  if(transparentRoot)outside.push(':is(.composition,.sl-component) .newsletter,:is(.composition,.sl-component) .mock-page{color:#303a45}');
  if(text.includes('.everyday-component'))outside.push('.everyday-component .button-status,.everyday-component .example-sample{color:#58616d}.everyday-component .fold-example strong{color:#555}.everyday-component[data-restored=true] .redo-sample{color:#333}');
  return [...result.cssRules].map(paletteRuleText).join('\n')+'\n'+outside.join('\n')+controlPalette(text,palette)+readabilityCss(text,palette);
}
function readabilityCss(text,palette){
 // Native placeholders otherwise fall back to browser gray, which disappears
 // on the dark/blue field. Keep this identical in previews and downloaded CSS.
 const rules=[];
 const menuFamily=text.includes('.menu-demo')||/\[data-kind(?:\^)?=["']?menus-/.test(text);
 // Menu-only feedback: translucent charcoal washes cannot express state on paper.
 if(palette==='blue'&&menuFamily){
  rules.push(':is(.menu-demo,.sl-component[data-kind="menus-weekly-window-v11"]) .sl-picker-panel button:is([aria-pressed=true],[aria-selected=true]):is(button,:hover,:focus-visible){color:#34404e}');
 }
 if(palette==='white'&&menuFamily){
  const roots='.menu-demo.menu-demo,.sl-component[data-kind^="menus-"]';
  const scope=':is('+roots+')';
  const choices=':is(.menu-item,.surface-option,.format-option,.insert-option,.sl-option,.sl-action,.sl-day,.sl-time-list button)';
  rules.push(scope+' '+choices+':not(:disabled):is(:hover,:focus-visible){background:#e1e7ee;color:#29394b}');
  rules.push(scope+' '+choices+':is([aria-checked=true],[aria-selected=true],[aria-pressed=true],[aria-current=true]){background:#cdd8e4;color:#263749}');
  rules.push(scope+' '+choices+':is([aria-checked=true],[aria-selected=true],[aria-pressed=true],[aria-current=true]):is(:hover,:focus-visible){background:#cdd8e4;color:#263749}');
  rules.push(scope+' '+choices+':not(:disabled):is(:hover,:focus-visible,[aria-checked=true],[aria-selected=true],[aria-pressed=true],[aria-current=true]) small{color:#435466}');
  rules.push(scope+' button:focus-visible{outline:2px solid #596f89;outline-offset:-2px}');
  rules.push('.menu-demo.menu-demo .custom-time .sl-time-control{border-radius:8px}.menu-demo.menu-demo .custom-time .sl-time-field{border-color:#a6b5c5;color:#29394b;background:#fff}.menu-demo.menu-demo .custom-time .sl-time-open{border-color:#a6b5c5;background:#e1e7ee;color:#29394b}');
  rules.push('.sl-component[data-kind="menus-weekly-window-v11"] .sl-day[aria-pressed=true]:is(:hover,:focus-visible){background:#cdd8e4;color:#263749}');
 }

 if(palette==='white'){
  const edges=[];
  if(text.includes('.bk-button--save'))edges.push('.bk-button--save:not(.bk-button--quiet) .bk-surface');
  for(const name of ['copy','like','download','bookmark','playback','delete','upload','share','follow'])if(text.includes(`.sl-${name}__surface`))edges.push(`.sl-${name}__surface`);
  if(text.includes('.component-status')&&/\.sl-component\s+\.motion-button\b/.test(text))edges.push('.sl-component .motion-button .button-surface');
  if(text.includes('.everyday-component'))edges.push('.everyday-component .everyday-button .button-surface');
  // These local secondary actions use paper after conversion; legacy Cancel stays dark.
  if(/\.bk-button--cancel\s+\.bk-surface\s*\{[^}]*background(?:-color)?\s*:\s*(?:#3b3b3b\b|rgb\(\s*59\s*,\s*59\s*,\s*59\s*\))/i.test(text))edges.push('.bk-button--cancel .bk-surface');
  if(edges.length)rules.push(edges.join(',')+'{outline:1px solid #b9c5d3;outline-offset:-1px}');
  if(text.includes('.ab-decisions'))rules.push('.sl-component .ab-decisions .ab-danger{border-color:#b9c5d3}');
  if(text.includes('.ab-icon'))rules.push('.sl-component .ab-icon:not(.ab-primary){border-color:#b9c5d3}');
  if(text.includes('menuitemradio')&&text.includes('.ab-primary'))rules.push('.sl-component [role=menuitemradio]:not([aria-checked=true]){border-color:#b9c5d3}');
 }
 if(palette==='white'&&text.includes('--sl-input-action')){
  // Reviewed form actions live in nested roots; carry the same edge into ZIPs.
  rules.push('.bk-button:not(.bk-button--quiet) .bk-surface.bk-surface{box-shadow:inset 0 0 0 1px #b9c5d3,0 2px 3px #26374912}.bk-button:not(.bk-button--quiet):hover .bk-surface.bk-surface{box-shadow:inset 0 0 0 1px #a1b0c2,0 3px 5px #2637491a}');
 }
 if(palette==='blue'){
  // These animated labels belong to the original light Cancel control.
  // Do not change its shared surface token or nested compositions' labels.
  rules.push('.button-kit .bk-button--cancel .bk-label:is(.bk-label-idle,.bk-label-cancelled){color:#34404e}');
  rules.push('.check-day input:checked + span,.sl-slider .distance-bubble,.sl-slider .speed-value,.fb-demo .fb-button--quiet{color:#34404e}');
  rules.push('.menu-demo .menu-badge{background:#405b7c;color:#fff}');
  rules.push((text.includes('.menu-demo')?'.menu-demo.menu-demo':'.menu-demo')+' .menu-item:is(:hover,:focus,:focus-visible,[aria-selected=true]){background:#48668b}');
  rules.push('.sl-component .account-control :is(.as-choice-button,.as-record)[aria-pressed=true]{background:#476487;color:#fff}');
  rules.push('.check-exclusions .sl-check:has(:checked) .sl-check__title{opacity:.96}');
 }
 if(text.includes('.component-status'))rules.push('.sl-component .component-status{color:#58616d}');
 if(palette==='blue'&&text.includes('.chip-list'))rules.push('.sl-component .composition .chip-list .chip{color:#303a45}');
 if(palette==='blue'&&text.includes('.product-object'))rules.push('.sl-component .product-object{color:#303a45}');
 if(text.includes('.everyday-component'))rules.push('.sl-component .everyday-component :is(.button-status,.example-sample){color:#58616d}.sl-component .everyday-component .redo-sample{color:#414b58;opacity:.9}.sl-component .everyday-component [data-restored=true] .redo-sample{opacity:1}');
 if(palette==='blue'&&text.includes('.sample-chip'))rules.push('.sl-component .everyday-component .sample-chip:not([data-selected=true]){color:#303a45}');
 if(palette==='blue'&&text.includes('.as-choice-button'))rules.push('.sl-component .account-control :is(.as-choice-button,.as-record),.sl-component .account-control .as-record .ac-hint{color:#fff}');
 if(text.includes('.sl-page-arrow'))rules.push('.sl-component .sl-page-arrow{opacity:.9}');
 if(palette==='white'&&text.includes('.dc-offer'))rules.push('.sl-component .dc-offer{background:linear-gradient(145deg,#f8fafc,#e6ebf1);border-color:#c6cfd9}');
 if(text.includes('.newsletter')||text.includes('.mock-page'))rules.push(':is(.composition,.sl-component) :is(.newsletter,.mock-page) :is(p,.status){color:#58616d}');
 if(palette==='white'&&(text.includes('.newsletter')||text.includes('.mock-page')))rules.push('.sl-component .newsletter,.sl-component .mock-page{background:#f4f6f8;border-color:#d3dbe5}');
 if(palette==='blue'&&text.includes('.menu-badge'))rules.push('.menu-demo .menu-badge{color:#f2f4f8}');
 if(palette==='blue'&&text.includes('.overlay-primary'))rules.push('.overlay-demo .overlay-primary,.overlay-demo .overlay-actions .overlay-primary{color:#303a45}.overlay-demo .preview-paper p{color:#58616d}');
 if(text.includes('.dd-avatar'))rules.push('.dd-demo .dd-avatar--sage{background:#bed2c4}.dd-demo .dd-avatar--blue{background:#b4c7d2}.dd-demo .dd-avatar--sand{background:#d8cdb7}.dd-demo .dd-avatar--rose{background:#d7bfbb}.dd-demo .dd-avatar:not(.dd-avatar--more),.dd-demo .dd-mini-avatar{color:#272727}');
 if(text.includes('.check-exclusions')&&palette!=='blue')rules.push('.check-exclusions .sl-check:has(:checked) .sl-check__title{opacity:.86}');
 if(text.includes('.nv-input')||text.includes('.ov-field'))rules.push(`.sl-component .nv-input::placeholder,.sl-component .ov-field input::placeholder{color:${palette==='white'?'#58616d':'#fff'};opacity:1}`);
 if(text.includes('.ov-panel')){
  if(palette==='blue')rules.push('.sl-component .ov-panel{--ov-muted:#fff;--ov-text:#fff}.sl-component .ov-panel :is(.ov-tabs,.ov-options,.ov-history) button,.sl-component .ov-panel .ov-history :is(small,.ov-muted){color:#fff}.sl-component .ov-panel :is(.ov-tabs,.ov-options,.ov-history) button:is([aria-pressed=true],:hover,:focus-visible){background:#476487}');
  rules.push('.sl-component .ov-calendar button[data-outside=true]{opacity:.96}');
 }
 if(palette==='blue'&&text.includes('.sl-option'))rules.push('.sl-component .sl-option small{color:#fff}');
 if(text.includes('.composition'))rules.push('.sl-component .composition > .wizard-progress button{color:#58616d}.sl-component .composition > .wizard-progress [aria-current=step]{color:#303a45;border-color:#596879}.sl-component .composition > .heading p,.sl-component .composition > .note,.sl-component .composition > .feature-detail p,.sl-component .composition > .settings-intro p,.sl-component .composition > .filter-count,.sl-component .composition > .reply-target,.sl-component .comment header span{color:#58616d}');
 return rules.length?'\n@media(forced-colors:none){'+rules.join('\n')+'}\n':'';
}
// A light surface does not imply a dark thumb: surfaces, marks and state tracks
// have distinct roles. These rules also ship in the selected CSS/ZIP package.
function controlPalette(text,palette){
 if(palette!=='white')return '';
 const rules=[];
 if(text.includes('.sl-code__cells'))rules.push('.sl-field.sl-field--code[data-result="neutral"] .sl-code__cells span.is-filled{border-color:#a6b5c5}.sl-field.sl-field--code[data-result="success"] .sl-code__cells span,.sl-field.sl-field--code[data-result="error"] .sl-code__cells span{background:var(--field-ink);color:var(--field-text)}');
 if(text.includes('.sl-toggle'))rules.push(`
.sl-toggle{--toggle-track:#dbe0e5;--toggle-track-on:#687687;--toggle-thumb:#fff}
.sl-toggle__track{border-color:#8b96a2;box-shadow:inset 0 1px 2px #26374914,0 1px #ffffff80}
.sl-toggle__thumb{color:#39434f;border:1px solid #929ca8;box-shadow:0 2px 4px #26374926,inset 0 1px #fff}
.sl-toggle__input:checked + .sl-toggle__track{border-color:#687687;box-shadow:inset 0 1px 2px #26374920}
.sl-toggle__input:focus-visible + .sl-toggle__track{outline-color:#4d5c6d;box-shadow:0 0 0 5px #64748722}
.sl-toggle__dot{background:#7c8794}.sl-toggle__input:checked + .sl-toggle__track .sl-toggle__dot{background:#39434f}`);
 if(text.includes('.sl-check-card'))rules.push(`
.sl-check__box{background:#fff;border-color:#939da8;box-shadow:inset 0 1px 2px #26374910,0 1px 2px #2637490a}
.sl-check__box::before{background:#edf0f4}
.sl-check__box svg,.sl-check--icon .sl-check__input:checked + .sl-check__box svg,.sl-check--ring .sl-check__box svg,.sl-check--corner .sl-check__box svg,.sl-check--chip .sl-check__box svg{stroke:#39434f}
.sl-check__input:checked + .sl-check__box,.sl-check__input:indeterminate + .sl-check__box{border-color:#6f7d8c}
.sl-check__input:focus-visible + .sl-check__box{outline-color:#4d5c6d}
.sl-check--star .sl-check__input:checked + .sl-check__box .mark-icon,.sl-check--heart .sl-check__input:checked + .sl-check__box .mark-icon,.sl-check--bookmark .sl-check__input:checked + .sl-check__box .mark-icon{fill:#39434f}
.sl-check--corner .sl-check__box,.sl-check--chip .sl-check__box{background:transparent;box-shadow:none}
.check-day input:checked + span{background:#e4e9ef;color:#303a45;border-color:#6f7d8c}`);
 if(text.includes('.sl-slider'))rules.push(`
.sl-slider .slider-rail{background:#c8d2de}.sl-slider .slider-fill{background:#7b8490}
.sl-slider .slider-input::-webkit-slider-thumb{background:#fff;border-color:#626d7b;box-shadow:0 2px 4px #26374926,inset 0 1px #fff}
.sl-slider .slider-input::-moz-range-thumb{background:#fff;border-color:#626d7b;box-shadow:0 2px 4px #26374926,inset 0 1px #fff}
.sl-slider .slider-input:active::-webkit-slider-thumb{box-shadow:0 0 0 5px #64748719,0 2px 4px #26374926}
.sl-slider .slider-input:active::-moz-range-thumb{box-shadow:0 0 0 5px #64748719,0 2px 4px #26374926}
.sl-slider .slider-input:focus-visible{outline-color:#4d5c6d}`);
 return rules.length?'\n@media (forced-colors: none){'+rules.join('\n')+'}\n':'';
}
function themeSheet(source,palette){
  let themes=sheetCache.get(source);if(!themes){themes=new Map();sheetCache.set(source,themes);}
  if(themes.has(palette))return themes.get(palette);
  const result=new CSSStyleSheet();result.replaceSync(paletteCss([...source.cssRules].map(paletteRuleText).join('\n'),palette));
  themes.set(palette,result);return result;
}
function themeNested(frame,palette){
 const top=frame.shadowRoot;if(!top)return;
 function observe(root){
  let record=nestedOwners.get(root);
  if(!record){
   record={original:[...root.adoptedStyleSheets],source:'',palette:'',sheet:new CSSStyleSheet(),queued:false};nestedOwners.set(root,record);
   // Some native compositions construct another shadow-root after an action.
   // Observe mounting, not pointer movement or text/attribute animation frames.
   record.observer=new MutationObserver(changes=>{
    if(record.queued||!changes.some(c=>c.target.nodeName==='STYLE'||[...c.addedNodes].some(n=>n.nodeType===1)))return;
    record.queued=true;queueMicrotask(()=>{record.queued=false;if(frame.isConnected)themeNested(frame,owners.get(frame)?.palette||palette);});
   });record.observer.observe(root,{childList:true,subtree:true});
  }
  return record;
 }
 observe(top);
 function visit(root){for(const host of root.querySelectorAll('*'))if(host.shadowRoot){
  const nested=host.shadowRoot,record=observe(nested);
  const source=[...record.original,...[...nested.querySelectorAll('style')].map(s=>s.sheet).filter(Boolean)].flatMap(s=>[...s.cssRules].map(paletteRuleText)).join('\n');
  if(source!==record.source||record.palette!==palette){
   const initial=!record.palette;
   record.source=source;record.palette=palette;record.sheet.replaceSync(paletteCss(source,palette));
   const sheets=[...nested.adoptedStyleSheets.filter(s=>s!==record.sheet&&s!==selectionSheet),record.sheet,selectionSheet];
   // CTA swaps mount native controls that measure their original black styles.
   // Commit their first palette without tweening from that unselected palette.
   if(initial&&frame.getAttribute('variant')==='buttons-compositions-cta-v11'){
    nested.adoptedStyleSheets=[...sheets,initialPaletteSheet];
    host.getBoundingClientRect();
   }
   nested.adoptedStyleSheets=sheets;
  }
  visit(nested);
 }}visit(top);
}
export function setPreviewPalette(frame,palette='white'){
  if(!['black','white','blue'].includes(palette))return;
  const root=frame.shadowRoot;if(!root)return;
  let owner=owners.get(frame);const initial=!owner;
  if(!owner){
    const variant=frame.getAttribute('variant');
    if(!definitions.has(variant)){const sheet=new CSSStyleSheet();sheet.replaceSync(previews[variant]?.css||'');definitions.set(variant,sheet);}
    owner={sheets:[...root.adoptedStyleSheets],source:definitions.get(variant),palette:'black'};owners.set(frame,owner);
    const iframe=root.querySelector('iframe');
    if(iframe)iframe.addEventListener('load',()=>paintDocument(iframe,owner.palette));
  }
  owner.palette=palette;frame.dataset.palette=palette;
  // Inherit the runtime layout intact: only theme the original definition sheet.
  const sheets=[...owner.sheets,themeSheet(owner.source,palette),selectionSheet];
  if(initial){
    // Some controllers measure content during connectedCallback, committing the
    // original black styles before we can theme them. Do not animate that mount.
    root.adoptedStyleSheets=[...sheets,initialPaletteSheet];
    frame.getBoundingClientRect();
  }
  root.adoptedStyleSheets=sheets;
  if(root.querySelector('.stage')){frame.dataset.shellSizing='flow';root.adoptedStyleSheets=[...root.adoptedStyleSheets,previewLayout];}
  themeNested(frame,palette);configurePreviewCursor(frame);
  const iframe=root.querySelector('iframe');if(iframe)paintDocument(iframe,palette);
}
function paintDocument(iframe,palette){
  const doc=iframe.contentDocument;if(!doc?.body)return;
  let style=doc.querySelector('style[data-palette]');
  if(!style){style=doc.createElement('style');style.dataset.palette='';doc.head.append(style);}
  const source=[...doc.styleSheets].find(sheet=>sheet.ownerNode!==style);
  if(source)style.textContent=[...themeSheet(source,palette).cssRules].map(paletteRuleText).join('\n')+'\n'+selectionCss;
}
export function paletteControls(frame,name,onChange){
  const group=document.createElement('div');group.className='palette-controls';group.setAttribute('role','group');group.setAttribute('aria-label',`${name} preview palette`);
  for(const palette of ['white','black','blue']){
    const button=document.createElement('button');button.type='button';button.className='palette-swatch';button.dataset.palette=palette;
    button.setAttribute('aria-label',`${palette[0].toUpperCase()+palette.slice(1)} palette`);button.title=button.getAttribute('aria-label');button.setAttribute('aria-pressed',String(palette==='white'));
    button.addEventListener('click',()=>{if(button.getAttribute('aria-pressed')==='true')return;setPreviewPalette(frame,palette);onChange(palette);for(const b of group.children)b.setAttribute('aria-pressed',String(b===button));});group.append(button);
  }
  return group;
}
