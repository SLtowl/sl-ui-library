import{retainFont as L}from"./react-font.mjs";const E="selection-reading-aids-v11";const K='<section class="sl-component" data-kind="selection-reading-aids-v11" aria-label="Reading aids">\n  <header class="sl-head"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 7C10 5 7 4 3 5v13c4-1 7 0 9 2 2-2 5-3 9-2V5c-4-1-7 0-9 2Zm0 0v13M6 9h3M6 12h3M15 9h3M15 12h3"/></svg><div><h2>Reading aids</h2><p>One switch, remembered details.</p></div></header>\n  <div class="sl-row"><span>Reading aids<small>Enable the helpers below</small></span><button type="button" class="sl-toggle" role="switch" aria-label="Reading aids" aria-checked="true" data-toggle="enabled"><span class="sl-toggle-word" aria-hidden="true">On</span><span class="sl-toggle-track" aria-hidden="true"></span></button></div><div class="sl-dependent"><div class="sl-row"><span>Line guide<small>Keep your place</small></span><button type="button" class="sl-toggle" role="switch" aria-label="Line guide" aria-checked="true" data-toggle="guide"><span class="sl-toggle-word" aria-hidden="true">On</span><span class="sl-toggle-track" aria-hidden="true"></span></button></div><div class="sl-row"><span>Key phrases<small>Mark useful passages</small></span><button type="button" class="sl-toggle" role="switch" aria-label="Key phrases" aria-checked="false" data-toggle="phrases"><span class="sl-toggle-word" aria-hidden="true">Off</span><span class="sl-toggle-track" aria-hidden="true"></span></button></div></div><div class="sl-aid-sample" aria-hidden="true"><span>Keep a little <em>room for ideas.</em></span></div>\n  <p class="sl-status" role="status" data-status>Line guide active</p>\n</section>';const H=`@font-face {
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
.sl-component .sl-dependent { border-left: 1px solid var(--sl-border); padding-left: 12px; }
.sl-component .sl-aid-sample { margin-top: 16px; padding: 12px 4px; color: var(--sl-muted); font-size: 11px; }
.sl-component .sl-aid-sample span { padding-bottom: 5px; border-bottom: 2px solid transparent; transition: border-color 220ms ease; }
.sl-component .sl-aid-sample em { font-style: normal; background: transparent; transition: background-color 220ms ease, color 220ms ease; }
.sl-component[data-guide="true"] .sl-aid-sample span { border-color: var(--sl-accent); }
.sl-component[data-phrases="true"] .sl-aid-sample em { background: var(--sl-selected); color: var(--sl-text); }
`;function j(){return(()=>{"use strict";const r=new WeakMap;function h(n,c={}){if(!n||!n.matches(".sl-component"))throw new TypeError("A .sl-component root is required.");if(r.has(n))return r.get(n);if(c.onChange!==void 0&&typeof c.onChange!=="function")throw new TypeError("onChange must be a function.");const m=n.ownerDocument.defaultView;const p=new m.AbortController;const u=e=>n.querySelector(e);const f=e=>[...n.querySelectorAll(e)];const i=e=>JSON.parse(JSON.stringify(e));let a=false;delete n.dataset.destroyed;function d(e,t){u(e).textContent=t}function w(e,t){f('[data-field="'+e+'"] [data-choice]').forEach(l=>{const s=l.dataset.choice===t;l.setAttribute("aria-checked",String(s));l.tabIndex=s?0:-1})}function v(e,t,l=false){const s=u('[data-toggle="'+e+'"]');s.setAttribute("aria-checked",String(t));s.disabled=l;s.querySelector(".sl-toggle-word").textContent=t?"On":"Off"}function D(e,t){if(!t.includes(e))throw new RangeError("Unsupported selection: "+String(e));return e}function y(e){if(typeof e!=="boolean")throw new TypeError("Expected a boolean.");return e}const k={"enabled":true,"guide":true,"phrases":false};let o=i(k);function z(e){return{enabled:y(e.enabled),guide:y(e.guide),phrases:y(e.phrases)}}function S(){v("enabled",o.enabled);v("guide",o.guide,!o.enabled);v("phrases",o.phrases,!o.enabled);n.dataset.guide=String(o.enabled&&o.guide);n.dataset.phrases=String(o.enabled&&o.phrases);d("[data-status]",!o.enabled?"Aids off. Your choices are kept.":o.guide&&o.phrases?"Both reading aids active":o.guide?"Line guide active":o.phrases?"Key phrases active":"Choose a reading aid")}function T(e,t){}function C(e,{emit:t=false}={}){if(a)return;if(!e||typeof e!=="object"||Array.isArray(e))throw new TypeError("Expected a state patch.");for(const b of Object.keys(e))if(!Object.hasOwn(k,b))throw new TypeError("Unknown state field: "+b);const l=z({...o,...e});if(JSON.stringify(l)===JSON.stringify(o))return;const s=n.getRootNode().activeElement;o=l;S();A(s);if(t){n.dispatchEvent(new m.CustomEvent("selectionchange",{bubbles:true,composed:true,detail:{state:i(o)}}));c.onChange?.(i(o))}}function A(e){if(e&&n.contains(e)&&e.disabled)u("button:not(:disabled)")?.focus()}function R(e){const t=e.target.closest("button");if(!t||!n.contains(t)||t.disabled)return;if(t.hasAttribute("data-choice")){C({[t.closest("[data-field]").dataset.field]:t.dataset.choice},{emit:true})}else if(t.hasAttribute("data-toggle")){C({[t.dataset.toggle]:!o[t.dataset.toggle]},{emit:true})}else T(t.dataset.action,t)}function q(e){const t=e.target.closest('[role="radio"]');if(!t||!n.contains(t)||t.disabled||e.altKey||e.ctrlKey||e.metaKey)return;const l=t.closest('[role="radiogroup"]');const s=[...l.querySelectorAll('[role="radio"]')].filter(M=>!M.disabled);const b=s.indexOf(t);let g;if(e.key==="Home")g=0;else if(e.key==="End")g=s.length-1;else if(e.key==="ArrowRight"||e.key==="ArrowDown")g=(b+1)%s.length;else if(e.key==="ArrowLeft"||e.key==="ArrowUp")g=(b-1+s.length)%s.length;else return;e.preventDefault();s[g].focus();s[g].click()}n.addEventListener("click",R,{signal:p.signal});n.addEventListener("keydown",q,{signal:p.signal});const O={setState:C,reset(){if(a)return;const e=n.getRootNode().activeElement;o=i(k);S();A(e)},destroy(){if(a)return;a=true;p.abort();n.dataset.destroyed="true";r.delete(n)},get state(){return i(o)}};S();r.set(n,O);return O}function x(n){return h(n)}return{mount:h,mountPreview:x}})()}function N(r,h={},{preview:x=false}={}){if(!r||typeof r.attachShadow!=="function")throw new TypeError("A DOM host is required");const n=r.shadowRoot||r.attachShadow({mode:"open"});n.innerHTML=K;const c=r.ownerDocument.createElement("style");const m=new URL("./instrument-sans-variable.woff2",import.meta.url).href;c.textContent=H.replaceAll("./instrument-sans-variable.woff2",m)+':host{display:block;min-width:0;max-width:100%;font-family:"Instrument Sans",sans-serif}[hidden]{display:none!important}';n.prepend(c);const p=n.querySelector(".sl-component");if(!p){n.replaceChildren();throw new Error("Missing component root")}const u=L(r.ownerDocument,m);let f,i=false;try{const a=j(),d={};if(E==="upload")d.input=n.querySelector('input[type="file"]');if(["like","copy","download","bookmark","playback","delete","upload","share","follow"].includes(E))d.feedback=n.querySelector("."+E+"-feedback");if(x&&typeof a.mountPreview!=="function")throw new Error("This source has no preview adapter; supply its documented application callbacks.");f=(x?a.mountPreview:a.mount)(p,{...d,...h});if(typeof f?.destroy!=="function")throw new Error("Missing source cleanup contract")}catch(a){u();n.replaceChildren();throw a}return new Proxy(f,{get(a,d){if(d==="destroy")return()=>{if(i)return;i=true;try{a.destroy()}finally{u();n.replaceChildren()}};const w=Reflect.get(a,d,a);return typeof w==="function"?w.bind(a):w}})}export{N as mountInto,E as variant};
