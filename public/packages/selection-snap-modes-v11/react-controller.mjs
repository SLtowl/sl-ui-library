import{retainFont as M}from"./react-font.mjs";const S="selection-snap-modes-v11";const R='<section class="sl-component" data-kind="selection-snap-modes-v11" aria-label="Snap modes">\n  <header class="sl-head"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 8h9m6 0h1M8 4v16M16 4v2m0 4v10M4 16h16"/><circle cx="16" cy="8" r="2"/><circle cx="8" cy="16" r="1.5" fill="currentColor" stroke="none"/></svg><div><h2>Snap modes</h2><p>Tune each drawing guide.</p></div></header>\n  <div class="sl-mode-row"><span>Grid</span><div class="sl-segments " role="radiogroup" aria-label="Grid snapping" data-field="grid"><button type="button" role="radio" data-choice="off" aria-checked="false" tabindex="-1">Off</button><button type="button" role="radio" data-choice="soft" aria-checked="true" tabindex="0">Soft</button><button type="button" role="radio" data-choice="firm" aria-checked="false" tabindex="-1">Firm</button></div></div><div class="sl-mode-row"><span>Guides</span><div class="sl-segments " role="radiogroup" aria-label="Guide snapping" data-field="guides"><button type="button" role="radio" data-choice="off" aria-checked="false" tabindex="-1">Off</button><button type="button" role="radio" data-choice="soft" aria-checked="false" tabindex="-1">Soft</button><button type="button" role="radio" data-choice="firm" aria-checked="true" tabindex="0">Firm</button></div></div><div class="sl-snap-sample" aria-hidden="true"><i></i><b></b></div>\n  <p class="sl-status" role="status" data-status>Grid: soft / Guides: firm</p>\n</section>';const H=`@font-face {
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
.sl-component .sl-mode-row { margin-bottom: 16px; }
.sl-component .sl-mode-row > span { display: block; margin-bottom: 7px; font-size: 12px; }
.sl-component .sl-snap-sample { height: 62px; border: 1px solid var(--sl-border); border-radius: 9px; position: relative; background: var(--sl-inset); }
.sl-component .sl-snap-sample::before { content: ''; position: absolute; top: 9px; bottom: 9px; left: 60%; border-left: 1px dashed var(--sl-accent); opacity: .65; transition: opacity 220ms ease; }
.sl-component .sl-snap-sample i { position: absolute; top: 30px; left: 12px; right: 12px; border-top: 1px dashed var(--sl-accent); opacity: .4; transition: opacity 220ms ease; }
.sl-component .sl-snap-sample b { position: absolute; width: 20px; height: 20px; top: 19px; left: calc(60% - 10px); border: 1px solid var(--sl-accent); border-radius: 4px; background: var(--sl-selected); transition: transform 280ms var(--sl-ease); }
.sl-component[data-grid="off"] .sl-snap-sample i, .sl-component[data-guides="off"] .sl-snap-sample::before { opacity: 0; }
.sl-component[data-grid="firm"] .sl-snap-sample i, .sl-component[data-guides="firm"] .sl-snap-sample::before { opacity: 1; }
.sl-component[data-guides="off"] .sl-snap-sample b { transform: translateX(-24px); }
`;function j(){return(()=>{"use strict";const a=new WeakMap;function x(t,c={}){if(!t||!t.matches(".sl-component"))throw new TypeError("A .sl-component root is required.");if(a.has(t))return a.get(t);if(c.onChange!==void 0&&typeof c.onChange!=="function")throw new TypeError("onChange must be a function.");const g=t.ownerDocument.defaultView;const p=new g.AbortController;const u=e=>t.querySelector(e);const b=e=>[...t.querySelectorAll(e)];const l=e=>JSON.parse(JSON.stringify(e));let s=false;delete t.dataset.destroyed;function d(e,n){u(e).textContent=n}function f(e,n){b('[data-field="'+e+'"] [data-choice]').forEach(i=>{const o=i.dataset.choice===n;i.setAttribute("aria-checked",String(o));i.tabIndex=o?0:-1})}function D(e,n,i=false){const o=u('[data-toggle="'+e+'"]');o.setAttribute("aria-checked",String(n));o.disabled=i;o.querySelector(".sl-toggle-word").textContent=n?"On":"Off"}function C(e,n){if(!n.includes(e))throw new RangeError("Unsupported selection: "+String(e));return e}function I(e){if(typeof e!=="boolean")throw new TypeError("Expected a boolean.");return e}const w={"grid":"soft","guides":"firm"};let r=l(w);function z(e){return{grid:C(e.grid,["off","soft","firm"]),guides:C(e.guides,["off","soft","firm"])}}function v(){f("grid",r.grid);f("guides",r.guides);t.dataset.grid=r.grid;t.dataset.guides=r.guides;d("[data-status]","Grid: "+r.grid+" / Guides: "+r.guides)}function T(e,n){}function k(e,{emit:n=false}={}){if(s)return;if(!e||typeof e!=="object"||Array.isArray(e))throw new TypeError("Expected a state patch.");for(const h of Object.keys(e))if(!Object.hasOwn(w,h))throw new TypeError("Unknown state field: "+h);const i=z({...r,...e});if(JSON.stringify(i)===JSON.stringify(r))return;const o=t.getRootNode().activeElement;r=i;v();E(o);if(n){t.dispatchEvent(new g.CustomEvent("selectionchange",{bubbles:true,composed:true,detail:{state:l(r)}}));c.onChange?.(l(r))}}function E(e){if(e&&t.contains(e)&&e.disabled)u("button:not(:disabled)")?.focus()}function O(e){const n=e.target.closest("button");if(!n||!t.contains(n)||n.disabled)return;if(n.hasAttribute("data-choice")){k({[n.closest("[data-field]").dataset.field]:n.dataset.choice},{emit:true})}else if(n.hasAttribute("data-toggle")){k({[n.dataset.toggle]:!r[n.dataset.toggle]},{emit:true})}else T(n.dataset.action,n)}function q(e){const n=e.target.closest('[role="radio"]');if(!n||!t.contains(n)||n.disabled||e.altKey||e.ctrlKey||e.metaKey)return;const i=n.closest('[role="radiogroup"]');const o=[...i.querySelectorAll('[role="radio"]')].filter(G=>!G.disabled);const h=o.indexOf(n);let m;if(e.key==="Home")m=0;else if(e.key==="End")m=o.length-1;else if(e.key==="ArrowRight"||e.key==="ArrowDown")m=(h+1)%o.length;else if(e.key==="ArrowLeft"||e.key==="ArrowUp")m=(h-1+o.length)%o.length;else return;e.preventDefault();o[m].focus();o[m].click()}t.addEventListener("click",O,{signal:p.signal});t.addEventListener("keydown",q,{signal:p.signal});const A={setState:k,reset(){if(s)return;const e=t.getRootNode().activeElement;r=l(w);v();E(e)},destroy(){if(s)return;s=true;p.abort();t.dataset.destroyed="true";a.delete(t)},get state(){return l(r)}};v();a.set(t,A);return A}function y(t){return x(t)}return{mount:x,mountPreview:y}})()}function N(a,x={},{preview:y=false}={}){if(!a||typeof a.attachShadow!=="function")throw new TypeError("A DOM host is required");const t=a.shadowRoot||a.attachShadow({mode:"open"});t.innerHTML=R;const c=a.ownerDocument.createElement("style");const g=new URL("./instrument-sans-variable.woff2",import.meta.url).href;c.textContent=H.replaceAll("./instrument-sans-variable.woff2",g)+':host{display:block;min-width:0;max-width:100%;font-family:"Instrument Sans",sans-serif}[hidden]{display:none!important}';t.prepend(c);const p=t.querySelector(".sl-component");if(!p){t.replaceChildren();throw new Error("Missing component root")}const u=M(a.ownerDocument,g);let b,l=false;try{const s=j(),d={};if(S==="upload")d.input=t.querySelector('input[type="file"]');if(["like","copy","download","bookmark","playback","delete","upload","share","follow"].includes(S))d.feedback=t.querySelector("."+S+"-feedback");if(y&&typeof s.mountPreview!=="function")throw new Error("This source has no preview adapter; supply its documented application callbacks.");b=(y?s.mountPreview:s.mount)(p,{...d,...x});if(typeof b?.destroy!=="function")throw new Error("Missing source cleanup contract")}catch(s){u();t.replaceChildren();throw s}return new Proxy(b,{get(s,d){if(d==="destroy")return()=>{if(l)return;l=true;try{s.destroy()}finally{u();t.replaceChildren()}};const f=Reflect.get(s,d,s);return typeof f==="function"?f.bind(s):f}})}export{N as mountInto,S as variant};
