import{retainFont as H}from"./react-font.mjs";const S="selection-inherited-setting-v11";const M='<section class="sl-component" data-kind="selection-inherited-setting-v11" aria-label="Inherited setting">\n  <header class="sl-head"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="10" height="6" rx="2"/><rect x="11" y="15" width="10" height="6" rx="2"/><path d="M8 9v5a4 4 0 0 0 4 4M16 11v4m-2-2 2 2 2-2"/></svg><div><h2>Inherited setting</h2><p>Keep a default or make it yours.</p></div></header>\n  <div class="sl-segments " role="radiogroup" aria-label="Spelling assistance source" data-field="source"><button type="button" role="radio" data-choice="workspace" aria-checked="true" tabindex="0">Workspace</button><button type="button" role="radio" data-choice="custom" aria-checked="false" tabindex="-1">Custom</button></div><div class="sl-source-line"><span>Workspace default</span><strong data-workspace>On</strong></div><div class="sl-row"><span>Spelling assistance<small>Your personal choice</small></span><button type="button" class="sl-toggle" role="switch" aria-label="Personal spelling assistance" aria-checked="false" data-toggle="custom" disabled><span class="sl-toggle-word" aria-hidden="true">Off</span><span class="sl-toggle-track" aria-hidden="true"></span></button></div><div class="sl-effective"><span>Effective setting</span><strong data-effective>On</strong></div>\n  <p class="sl-status" role="status" data-status>Following workspace default</p>\n</section>';const D=`@font-face {
  font-family: 'Instrument Sans';
  src: url('./instrument-sans-variable.woff2') format('woff2');
  font-weight: 400 700;
  font-display: swap;
}
.sl-component {
  --sl-surface: #222222;
  --sl-hover: #353535;
  --sl-inset: #1a1a1a;
  --sl-border: #525252;
  --sl-text: #f6f6f6;
  --sl-muted: #bdbdbd;
  --sl-accent: #e0e0e0;
  --sl-on-accent: #282828;
  --sl-selected: #454545;
  --sl-focus: #e0e0e0;
  --sl-disabled: #929292;
  --sl-ease: cubic-bezier(.4, 0, .2, 1);
  width: min(320px, 100%);
  min-width: 0;
  padding: 20px;
  color: var(--sl-text);
  background: var(--sl-surface);
  border: 1px solid var(--sl-border);
  border-radius: 16px;
  box-shadow: 0 3px 8px #00000012;
  font: 14px/1.45 'Instrument Sans', sans-serif;
  font-synthesis: none;
  text-align: left;
  position: relative;
}
.sl-component, .sl-component *, .sl-component *::before, .sl-component *::after { box-sizing: border-box; }
.sl-component h2, .sl-component p { margin: 0; }
.sl-component h2 { font-size: 15px; font-weight: 550; letter-spacing: -.02em; }
.sl-component .sl-head { display: flex; align-items: center; gap: 12px; margin-bottom: 20px; }
.sl-component .sl-head > div { min-width: 0; }
.sl-component .sl-head p { margin-top: 4px; color: var(--sl-muted); font-size: 11px; }
.sl-component svg { flex: none; width: 22px; height: 22px; fill: none; stroke: currentColor; stroke-width: 1.5; stroke-linecap: round; stroke-linejoin: round; color: var(--sl-accent); }
.sl-component button { font: inherit; color: inherit; cursor: pointer; touch-action: manipulation; -webkit-tap-highlight-color: transparent; }
.sl-component button:focus-visible { outline: 2px solid var(--sl-focus); outline-offset: 3px; }
.sl-component button:disabled { cursor: default; color: var(--sl-disabled); }
.sl-component button:disabled svg { color: inherit; }
.sl-component .sl-status { border-top: 1px solid var(--sl-border); padding-top: 12px; margin-top: 16px; color: var(--sl-muted); font-size: 11px; min-height: 29px; overflow-wrap: anywhere; }
.sl-component .sl-hint { color: var(--sl-muted); font-size: 11px; margin-top: 12px; }
.sl-component .sl-segments { display: grid; grid-auto-flow: column; grid-auto-columns: 1fr; padding: 4px; gap: 4px; background: var(--sl-inset); border: 1px solid var(--sl-border); border-radius: 10px; position: relative; isolation: isolate; }
.sl-component .sl-segments button { min-width: 0; padding: 8px 3px; min-height: 34px; border: 0; border-radius: 6px; background: transparent; color: var(--sl-muted); font-size: 11px; transition: color 180ms ease, background-color 220ms ease; }
.sl-component .sl-segments button[aria-checked="true"] { background: var(--sl-selected); color: var(--sl-text); font-weight: 600; }
.sl-component .sl-segments button:hover:not(:disabled) { color: var(--sl-text); }
.sl-component .sl-row { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 12px 0; }
.sl-component .sl-row + .sl-row { border-top: 1px solid var(--sl-border); }
.sl-component .sl-row > span { min-width: 0; font-size: 12px; }
.sl-component .sl-row small { display: block; color: var(--sl-muted); margin-top: 3px; font-size: 10px; }
.sl-component .sl-toggle { flex: none; display: flex; align-items: center; gap: 7px; border: 0; padding: 4px; min-height: 36px; background: transparent; border-radius: 7px; }
.sl-component .sl-toggle .sl-toggle-word { font-size: 10px; width: 17px; color: var(--sl-muted); }
.sl-component .sl-toggle-track { display: block; position: relative; width: 38px; height: 22px; border-radius: 8px; border: 1px solid var(--sl-border); background: var(--sl-inset); transition: background-color 240ms ease; }
.sl-component .sl-toggle-track::after { content: ''; position: absolute; top: 3px; left: 3px; width: 14px; height: 14px; background: var(--sl-muted); border-radius: 5px; transition: transform 300ms var(--sl-ease), background-color 200ms ease; }
.sl-component .sl-toggle[aria-checked="true"] .sl-toggle-track { background: var(--sl-selected); }
.sl-component .sl-toggle[aria-checked="true"] .sl-toggle-track::after { transform: translateX(16px); background: var(--sl-accent); }
.sl-component .sl-toggle:disabled .sl-toggle-track::after { background: var(--sl-disabled); }
.sl-component .sl-action { display: inline-flex; align-items: center; justify-content: center; gap: 7px; padding: 8px 12px; min-height: 36px; border: 1px solid var(--sl-border); border-radius: 8px; background: var(--sl-inset); color: var(--sl-accent); font-size: 11px; transition: background-color 180ms ease, transform 180ms var(--sl-ease); }
.sl-component .sl-action:hover:not(:disabled) { background: var(--sl-hover); }
.sl-component .sl-action:active:not(:disabled) { transform: translateY(1px); }
.sl-component .sl-action svg { width: 16px; height: 16px; }
.sl-component .sl-actions { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 16px; }
.sl-component .sl-action--primary { background: var(--sl-accent); color: var(--sl-on-accent); border-color: var(--sl-accent); }
.sl-component .sl-action--primary:hover:not(:disabled) { background: var(--sl-accent); }
.sl-component .sl-action--primary:disabled { background: var(--sl-inset); border-color: var(--sl-border); }
.sl-component .sl-sample { margin-top: 16px; padding: 12px; background: var(--sl-inset); border: 1px solid var(--sl-border); border-radius: 10px; }
.sl-component .sl-sample strong { display: block; font-size: 12px; font-weight: 500; }
.sl-component .sl-sample p { margin-top: 6px; color: var(--sl-muted); font-size: 11px; }
.sl-component [hidden] { display: none !important; }
.sl-component[data-destroyed="true"] *, .sl-component[data-destroyed="true"] *::before, .sl-component[data-destroyed="true"] *::after { transition: none !important; animation: none !important; }
@media (prefers-reduced-motion: reduce) {
  .sl-component, .sl-component *, .sl-component *::before, .sl-component *::after { transition: none !important; animation: none !important; }
}
@media (forced-colors: active) {
  .sl-component { --sl-surface: Canvas; --sl-hover: Canvas; --sl-inset: Canvas; --sl-border: ButtonText; --sl-text: CanvasText; --sl-muted: CanvasText; --sl-accent: Highlight; --sl-on-accent: HighlightText; --sl-selected: Canvas; --sl-focus: Highlight; --sl-disabled: GrayText; box-shadow: none; }
  .sl-component button[aria-checked="true"], .sl-component button[aria-pressed="true"] { outline: 1px solid Highlight; outline-offset: -2px; }
  .sl-component button:focus-visible { outline: 2px solid Highlight; outline-offset: 3px; }
}
.sl-component .sl-source-line, .sl-component .sl-effective { display: flex; align-items: center; justify-content: space-between; gap: 12px; font-size: 11px; color: var(--sl-muted); }
.sl-component .sl-source-line { margin: 16px 0 4px; }
.sl-component .sl-source-line strong { font-weight: 500; color: var(--sl-text); }
.sl-component .sl-effective { margin-top: 12px; padding: 12px; border-radius: 8px; background: var(--sl-inset); }
.sl-component .sl-effective strong { color: var(--sl-accent); font-size: 12px; }
`;function L(){return(()=>{"use strict";const a=new WeakMap;function x(t,d={}){if(!t||!t.matches(".sl-component"))throw new TypeError("A .sl-component root is required.");if(a.has(t))return a.get(t);if(d.onChange!==void 0&&typeof d.onChange!=="function")throw new TypeError("onChange must be a function.");const m=t.ownerDocument.defaultView;const p=new m.AbortController;const u=e=>t.querySelector(e);const g=e=>[...t.querySelectorAll(e)];const c=e=>JSON.parse(JSON.stringify(e));let r=false;delete t.dataset.destroyed;function l(e,n){u(e).textContent=n}function b(e,n){g('[data-field="'+e+'"] [data-choice]').forEach(i=>{const s=i.dataset.choice===n;i.setAttribute("aria-checked",String(s));i.tabIndex=s?0:-1})}function A(e,n,i=false){const s=u('[data-toggle="'+e+'"]');s.setAttribute("aria-checked",String(n));s.disabled=i;s.querySelector(".sl-toggle-word").textContent=n?"On":"Off"}function z(e,n){if(!n.includes(e))throw new RangeError("Unsupported selection: "+String(e));return e}function E(e){if(typeof e!=="boolean")throw new TypeError("Expected a boolean.");return e}const v={"source":"workspace","workspace":true,"custom":false};let o=c(v);function T(e){return{source:z(e.source,["workspace","custom"]),workspace:E(e.workspace),custom:E(e.custom)}}function y(){b("source",o.source);l("[data-workspace]",o.workspace?"On":"Off");A("custom",o.custom,o.source==="workspace");l("[data-effective]",(o.source==="workspace"?o.workspace:o.custom)?"On":"Off");l("[data-status]",o.source==="workspace"?"Following workspace default":"Using your personal choice")}function q(e,n){}function k(e,{emit:n=false}={}){if(r)return;if(!e||typeof e!=="object"||Array.isArray(e))throw new TypeError("Expected a state patch.");for(const h of Object.keys(e))if(!Object.hasOwn(v,h))throw new TypeError("Unknown state field: "+h);const i=T({...o,...e});if(JSON.stringify(i)===JSON.stringify(o))return;const s=t.getRootNode().activeElement;o=i;y();C(s);if(n){t.dispatchEvent(new m.CustomEvent("selectionchange",{bubbles:true,composed:true,detail:{state:c(o)}}));d.onChange?.(c(o))}}function C(e){if(e&&t.contains(e)&&e.disabled)u("button:not(:disabled)")?.focus()}function I(e){const n=e.target.closest("button");if(!n||!t.contains(n)||n.disabled)return;if(n.hasAttribute("data-choice")){k({[n.closest("[data-field]").dataset.field]:n.dataset.choice},{emit:true})}else if(n.hasAttribute("data-toggle")){k({[n.dataset.toggle]:!o[n.dataset.toggle]},{emit:true})}else q(n.dataset.action,n)}function R(e){const n=e.target.closest('[role="radio"]');if(!n||!t.contains(n)||n.disabled||e.altKey||e.ctrlKey||e.metaKey)return;const i=n.closest('[role="radiogroup"]');const s=[...i.querySelectorAll('[role="radio"]')].filter(j=>!j.disabled);const h=s.indexOf(n);let f;if(e.key==="Home")f=0;else if(e.key==="End")f=s.length-1;else if(e.key==="ArrowRight"||e.key==="ArrowDown")f=(h+1)%s.length;else if(e.key==="ArrowLeft"||e.key==="ArrowUp")f=(h-1+s.length)%s.length;else return;e.preventDefault();s[f].focus();s[f].click()}t.addEventListener("click",I,{signal:p.signal});t.addEventListener("keydown",R,{signal:p.signal});const O={setState:k,reset(){if(r)return;const e=t.getRootNode().activeElement;o=c(v);y();C(e)},destroy(){if(r)return;r=true;p.abort();t.dataset.destroyed="true";a.delete(t)},get state(){return c(o)}};y();a.set(t,O);return O}function w(t){return x(t)}return{mount:x,mountPreview:w}})()}function P(a,x={},{preview:w=false}={}){if(!a||typeof a.attachShadow!=="function")throw new TypeError("A DOM host is required");const t=a.shadowRoot||a.attachShadow({mode:"open"});t.innerHTML=M;const d=a.ownerDocument.createElement("style");const m=new URL("./instrument-sans-variable.woff2",import.meta.url).href;d.textContent=D.replaceAll("./instrument-sans-variable.woff2",m)+':host{display:block;min-width:0;max-width:100%;font-family:"Instrument Sans",sans-serif}[hidden]{display:none!important}';t.prepend(d);const p=t.querySelector(".sl-component");if(!p){t.replaceChildren();throw new Error("Missing component root")}const u=H(a.ownerDocument,m);let g,c=false;try{const r=L(),l={};if(S==="upload")l.input=t.querySelector('input[type="file"]');if(["like","copy","download","bookmark","playback","delete","upload","share","follow"].includes(S))l.feedback=t.querySelector("."+S+"-feedback");if(w&&typeof r.mountPreview!=="function")throw new Error("This source has no preview adapter; supply its documented application callbacks.");g=(w?r.mountPreview:r.mount)(p,{...l,...x});if(typeof g?.destroy!=="function")throw new Error("Missing source cleanup contract")}catch(r){u();t.replaceChildren();throw r}return new Proxy(g,{get(r,l){if(l==="destroy")return()=>{if(c)return;c=true;try{r.destroy()}finally{u();t.replaceChildren()}};const b=Reflect.get(r,l,r);return typeof b==="function"?b.bind(r):b}})}export{P as mountInto,S as variant};
