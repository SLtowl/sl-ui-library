import{retainFont as X}from"./react-font.mjs";const q="menus-checkpoint-menu-v11";const Z='<div class="sl-component" data-kind="menus-checkpoint-menu-v11" data-open="false">\n    <p class="sl-eyebrow">Local document history</p>\n    <button class="sl-trigger" data-trigger type="button" aria-expanded="false" aria-haspopup="dialog"><svg class="" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false"><path d="M7 3h7l5 5v13H7Z M14 3v6h5M4 7v12m6-6h6m-6 4h4"/></svg><span data-label>Browse checkpoints</span><svg class="sl-chevron" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false"><path d="m7 10 5 5 5-5"/></svg></button>\n    <div class="sl-panel" data-panel tabindex="-1" role="dialog" aria-label="Document checkpoint menu" aria-hidden="true" inert>\n      <div class="sl-scroll"><section data-group><h3>Saved checkpoints</h3><button class="sl-option" type="button" data-key="version:v3" aria-pressed="true"><span><strong>Final copy</strong><small>Today · 10:20</small></span><span class="sl-mark" aria-hidden="true">✓</span></button><button class="sl-option" type="button" data-key="version:v2" aria-pressed="false"><span><strong>Review draft</strong><small>Today · 09:40</small></span><span class="sl-mark" aria-hidden="true">✓</span></button><button class="sl-option" type="button" data-key="version:v1" aria-pressed="false"><span><strong>First outline</strong><small>Yesterday · 16:15</small></span><span class="sl-mark" aria-hidden="true">✓</span></button></section></div><p class="sl-note" data-version-copy>Share the release notes with the team.</p><div class="sl-footer"><button type="button" class="sl-action" data-key="dismiss" >Cancel</button><button type="button" class="sl-action" data-key="restore" disabled>Use version</button></div>\n    </div>\n    <div class="sl-summary" role="region" aria-label="Local result" tabindex="0"><p class="sl-document-caption">Current version</p><h2 class="sl-document-title" data-summary>Final copy</h2><p data-document>Share the release notes with the team.</p><button type="button" class="sl-action" data-key="undo" disabled>Undo restore</button></div>\n    <p class="sl-feedback" data-feedback role="status" aria-live="polite">Preview a version before using it locally.</p>\n  </div>';const G=`@font-face { font-family: 'Instrument Sans'; src: url('./instrument-sans-variable.woff2') format('woff2'); font-weight: 400 700; font-display: swap; }
.sl-component {
  --sl-surface: #222222; --sl-panel: #2b2b2b; --sl-text: #f1f1f1; --sl-muted: #bdbdbd;
  --sl-accent: #e0e0e0; --sl-accent-ink: #282828; --sl-border: #505050; --sl-hover: #3b3b3b;
  --sl-focus: #d6d6d6; --sl-caption: #515151; --sl-shadow: #16161624;
  position: relative; width: min(320px,100%); height: 430px; min-width: 0; color: var(--sl-text);
  font: 14px/1.4 'Instrument Sans', sans-serif; text-align: left; color-scheme: dark;
}
.sl-component, .sl-component * { box-sizing: border-box; }
.sl-component [hidden] { display: none !important; }
.sl-component button, .sl-component input, .sl-component textarea, .sl-component select { font: inherit; }
.sl-component button { cursor: pointer; }
.sl-component button:disabled { opacity: .5; cursor: not-allowed; }
.sl-component button:focus-visible, .sl-component input:focus-visible, .sl-component textarea:focus-visible, .sl-component select:focus-visible { outline: 1px solid var(--sl-focus); outline-offset: -3px; }
.sl-component svg { flex: none; width: 22px; height: 22px; fill: none; stroke: currentColor; stroke-width: 1.5; stroke-linecap: round; stroke-linejoin: round; background: transparent; }
.sl-component .sl-eyebrow { margin: 0 0 10px 3px; color: var(--sl-caption); font-size: 11px; letter-spacing: .055em; text-transform: uppercase; }
.sl-component .sl-trigger { display: flex; align-items: center; gap: 10px; width: 100%; min-height: 50px; padding: 12px 14px; color: var(--sl-text); background: var(--sl-surface); border: 1px solid var(--sl-border); border-radius: 13px; box-shadow: 0 2px 5px var(--sl-shadow); }
.sl-component .sl-trigger span { flex: 1; min-width: 0; text-align: left; overflow-wrap: anywhere; }
.sl-component .sl-chevron { width: 18px; color: var(--sl-muted); transition: transform 190ms ease; }
.sl-component[data-open="true"] .sl-chevron { transform: rotate(180deg); }
.sl-component .sl-panel { position: absolute; z-index: 2; top: 84px; inset-inline: 0; max-height: 290px; padding: 7px; overflow: auto; overscroll-behavior: contain; scrollbar-width: thin; scrollbar-color: var(--sl-border) transparent; border: 1px solid var(--sl-border); border-radius: 13px; background: var(--sl-panel); box-shadow: 0 6px 14px var(--sl-shadow); opacity: 0; visibility: hidden; transform: translateY(-5px); pointer-events: none; transition: opacity 150ms ease, transform 190ms ease, visibility 0s 190ms; }
.sl-component[data-open="true"] .sl-panel { opacity: 1; visibility: visible; transform: translateY(0); pointer-events: auto; transition-delay: 0s; }
.sl-component .sl-option { display: flex; align-items: center; justify-content: space-between; gap: 8px; width: 100%; min-height: 40px; padding: 8px 10px; border: 0; border-radius: 8px; background: transparent; color: var(--sl-text); text-align: left; }
.sl-component .sl-option > span:first-child { flex: 1; min-width: 0; }
.sl-component strong { font-weight: 500; }
.sl-component .sl-option small { display: block; font-size: 11px; line-height: 1.4; margin-top: 2px; color: var(--sl-muted); }
.sl-component button:not(:disabled):hover { background: var(--sl-hover); }
.sl-component .sl-option[aria-pressed="true"] { background: var(--sl-hover); }
.sl-component .sl-mark { visibility: hidden; flex: none; color: var(--sl-accent); }
.sl-component [aria-pressed="true"] > .sl-mark { visibility: visible; }
.sl-component h3 { margin: 7px 10px 3px; font-size: 10px; font-weight: 500; text-transform: uppercase; letter-spacing: .06em; color: var(--sl-muted); }
.sl-component .sl-search { display: flex; align-items: center; gap: 8px; margin: 2px 3px 7px; padding: 6px; border: 1px solid var(--sl-border); border-radius: 8px; background: var(--sl-surface); }
.sl-component .sl-search svg { width: 18px; color: var(--sl-muted); }
.sl-component input, .sl-component select, .sl-component textarea { min-width: 0; width: 100%; padding: 8px; color: var(--sl-text); background: var(--sl-surface); border: 1px solid var(--sl-border); border-radius: 7px; }
.sl-component .sl-search input { padding: 6px; background: transparent; border: 0; outline: none; }
.sl-component .sl-search:focus-within { border-color: var(--sl-focus); }
.sl-component .sl-search input:focus-visible { outline: none; }
.sl-component .sl-panel:focus { outline: none; }
.sl-component input::placeholder { color: var(--sl-muted); opacity: 1; }
.sl-component .sl-empty, .sl-component .sl-note { margin: 9px 10px; color: var(--sl-muted); font-size: 12px; }
.sl-component .sl-footer { display: flex; gap: 6px; padding: 8px 3px 2px; margin-top: 5px; border-top: 1px solid var(--sl-border); }
.sl-component .sl-action { flex: 1; padding: 8px; min-height: 34px; border: 1px solid var(--sl-border); border-radius: 7px; background: transparent; color: var(--sl-text); font-size: 12px; }
.sl-component .sl-primary { background: var(--sl-accent); color: var(--sl-accent-ink); border-color: var(--sl-accent); }
.sl-component .sl-primary:not(:disabled):hover { background: var(--sl-accent); filter: brightness(.96); }
.sl-component .sl-summary { margin-top: 16px; padding: 16px; border: 1px solid var(--sl-border); border-radius: 11px; background: var(--sl-surface); min-height: 108px; }
.sl-component .sl-summary p { margin: 0 0 9px; overflow-wrap: anywhere; }
.sl-component .sl-summary small { color: var(--sl-muted); font-size: 12px; }
.sl-component .sl-summary [data-summary] { display: block; font-size: 15px; overflow-wrap: anywhere; }
.sl-component .sl-summary ol { margin: 8px 0 0; padding-left: 20px; }
.sl-component .sl-summary li { padding: 3px 0; }
.sl-component .sl-feedback { position: absolute; bottom: 0; inset-inline: 3px; margin: 0; height: 44px; overflow: auto; color: var(--sl-caption); font-size: 12px; line-height: 1.5; overflow-wrap: anywhere; }
.sl-component .sl-row { display: flex; align-items: center; gap: 8px; padding: 5px 3px; }
.sl-component .sl-row > label { flex: 1; min-width: 0; font-size: 12px; color: var(--sl-muted); }
.sl-component .sl-row input, .sl-component .sl-row select { margin-top: 4px; }
.sl-component .sl-tabs { display: flex; gap: 4px; margin: 2px 3px 8px; }
.sl-component .sl-tabs button { flex: 1; }
.sl-component .sl-days { display: grid; grid-template-columns: repeat(7,minmax(0,1fr)); gap: 3px; margin: 8px 3px; }
.sl-component .sl-day { min-height: 32px; padding: 0; font-size: 11px; color: var(--sl-text); background: transparent; border: 1px solid var(--sl-border); border-radius: 5px; }
.sl-component .sl-day[aria-pressed="true"] { color: var(--sl-accent-ink); background: var(--sl-accent); font-weight: 600; border-bottom-width: 3px; }
.sl-component .sl-path { margin: 3px 8px 8px; color: var(--sl-muted); font-size: 12px; overflow-wrap: anywhere; }
.sl-component .sl-mini-table { width: 100%; border-collapse: collapse; font-size: 11px; table-layout: fixed; }
.sl-component .sl-mini-table th, .sl-component .sl-mini-table td { padding: 7px 3px; border-bottom: 1px solid var(--sl-border); text-align: left; overflow-wrap: anywhere; }
.sl-component .sl-mini-table th { color: var(--sl-muted); font-weight: 400; }
.sl-component textarea { resize: vertical; min-height: 76px; max-height: 132px; font-size: 13px; line-height: 1.5; }
.sl-component .sl-editor-label { display: block; margin-bottom: 6px; color: var(--sl-muted); font-size: 12px; }
@media (prefers-reduced-motion: reduce) { .sl-component *, .sl-component *::before, .sl-component *::after { transition: none !important; animation: none !important; } }
@media (forced-colors: active) { .sl-component .sl-panel, .sl-component .sl-trigger, .sl-component .sl-summary { border-color: CanvasText; } .sl-component [aria-pressed="true"] { outline: 1px solid Highlight; outline-offset: -3px; } }
.sl-component[data-open="true"] .sl-summary { visibility: hidden; }
.sl-component .sl-action[aria-pressed="true"] { background: var(--sl-hover); border-color: var(--sl-accent); }
.sl-component .sl-action[aria-pressed="true"]::after { content: " ✓"; color: var(--sl-accent); }
.sl-component .sl-panel { display: flex; flex-direction: column; }
.sl-component .sl-panel > :not(.sl-scroll) { flex-shrink: 0; }
.sl-component .sl-scroll { min-height: 0; flex: 0 1 auto; overflow: auto; overscroll-behavior: contain; scrollbar-width: thin; scrollbar-color: var(--sl-border) transparent; scrollbar-gutter: stable; }
.sl-component[data-kind="menus-recent-actions-v11"] .sl-option small { display: none; }
.sl-component .sl-summary { max-height: 270px; overflow: auto; scrollbar-width: thin; scrollbar-color: var(--sl-border) transparent; }
.sl-component .sl-summary:focus-visible { outline: 1px solid var(--sl-focus); outline-offset: -3px; }
.sl-component .sl-option, .sl-component .sl-action { overflow-wrap: anywhere; max-width: 100%; }

.sl-component .sl-summary .sl-document-caption { margin: 0 0 6px; color: var(--sl-muted); font-size: 12px; line-height: 1.5; }
.sl-component .sl-summary .sl-document-title { margin: 0 0 16px; font-size: 18px; line-height: 1.35; font-weight: 600; letter-spacing: normal; }
.sl-component [data-document] { padding-top: 14px; border-top: 1px solid var(--sl-border); font-size: 15px; line-height: 1.65; }
.sl-component [data-version-copy] { margin: 10px 8px; font-size: 14px; line-height: 1.6; max-height: 68px; overflow-y: auto; }
.sl-component .sl-summary [data-key="undo"] { margin-top: 8px; }

/* Menu review: retained results and reversible source-owned selection marks. */
.sl-component .sl-day[aria-pressed="true"]:is(:hover,:focus-visible) { color: var(--sl-accent-ink); background: var(--sl-accent); }
.sl-component[data-kind="menus-branch-picker-v11"] .sl-tabs .sl-action::after { content: none; }
.sl-component .sl-mark:has(svg) { display: grid; place-items: center; visibility: visible; width: 20px; height: 20px; }
.sl-component .sl-mark svg { width: 20px; height: 20px; stroke-width: 1.65; }
.sl-component .sl-mark path { stroke-dasharray: 1; stroke-dashoffset: 1; opacity: 0; transition: stroke-dashoffset 480ms cubic-bezier(.22,.61,.36,1),opacity 240ms ease; }
.sl-component [aria-pressed="true"] > .sl-mark path { stroke-dashoffset: 0; opacity: 1; transition-delay: 70ms; }
.sl-component[data-kind="menus-variable-insert-v11"] textarea { resize: none; overflow-y: auto; }
.sl-component:is([data-kind="menus-recent-actions-v11"],[data-kind="menus-sort-recipe-v11"]) { display: flex; flex-direction: column; height: 430px; }
.sl-component:is([data-kind="menus-recent-actions-v11"],[data-kind="menus-sort-recipe-v11"]) .sl-trigger { flex: none; }
.sl-component:is([data-kind="menus-recent-actions-v11"],[data-kind="menus-sort-recipe-v11"]) .sl-summary { order: 1; visibility: visible; flex: none; margin-top: 10px; padding: 10px 12px; min-height: 0; }
.sl-component:is([data-kind="menus-recent-actions-v11"],[data-kind="menus-sort-recipe-v11"]) .sl-panel { order: 2; position: relative; top: auto; inset-inline: auto; flex: 1; min-height: 0; margin-top: 8px; margin-bottom: 50px; }
.sl-component:is([data-kind="menus-recent-actions-v11"],[data-kind="menus-sort-recipe-v11"]) .sl-option { min-height: 32px; padding: 5px 8px; font-size: 12px; }
.sl-component:is([data-kind="menus-recent-actions-v11"],[data-kind="menus-sort-recipe-v11"]) .sl-option small { display: none; }
.sl-component:is([data-kind="menus-recent-actions-v11"],[data-kind="menus-sort-recipe-v11"]) .sl-summary [data-summary] { font-size: 12px; }
.sl-component[data-kind="menus-sort-recipe-v11"] .sl-summary ol { margin-top: 4px; font-size: 11px; }
.sl-component .sl-canvas { position: relative; display: grid; place-items: center; height: 72px; overflow: hidden; border: 1px solid var(--sl-border); border-radius: 6px; margin-top: 6px; background: var(--sl-panel); }
.sl-component .sl-canvas-art { width: 108px; height: 48px; display: flex; align-items: center; gap: 8px; padding: 8px; border: 1px solid var(--sl-border); border-radius: 5px; color: var(--sl-text); background: var(--sl-surface); transform: scale(var(--canvas-scale,1)); transition: transform 220ms ease; }
.sl-component .sl-canvas-art svg { width: 24px; height: 24px; }
.sl-component .sl-canvas-art span { font-size: 10px; line-height: 1.3; }
.sl-component .sl-canvas-pin { position: absolute; right: 6px; top: 5px; opacity: 0; transform: translateY(-3px); transition: opacity 180ms ease,transform 220ms ease; }
.sl-component .sl-canvas-pin svg { width: 15px; height: 15px; }
.sl-component [data-pinned="true"] .sl-canvas-pin { opacity: 1; transform: none; }
@media (prefers-reduced-motion: reduce) { .sl-component .sl-mark path,.sl-component .sl-canvas-art,.sl-component .sl-canvas-pin { transition: none; } }
.sl-component .sl-panel .sl-option{margin-block:0 4px}
`;function J(){return(()=>{"use strict";const p=new WeakMap;function C(n,x={}){if(!n||!n.matches(".sl-component"))throw new TypeError("A .sl-component root is required.");if(p.has(n))return p.get(n);if(x.onChange!==void 0&&typeof x.onChange!=="function")throw new TypeError("onChange must be a function.");const c=n.ownerDocument,v=c.defaultView;const g=new v.AbortController,y=g.signal;const r=e=>n.querySelector(e),a=e=>[...n.querySelectorAll(e)];const l=r("[data-trigger]"),d=r("[data-panel]"),M=r("[data-feedback]");const H=M.textContent,B=r("[data-label]").textContent;const P={current:"v3",draft:"v3",previous:null};let t=structuredClone(P),m=false,b=false;const A=()=>n.getRootNode().activeElement;const E=()=>[...d.querySelectorAll("button,input,select,textarea")].filter(e=>!e.disabled&&!e.closest("[hidden],[inert]"));const f=(e,o,s)=>e.addEventListener(o,s,{signal:y});function S(e,o){r(e).textContent=o}function Y(e,o){const s=a("[data-key]").find(u=>u.dataset.key===e);if(s)s.setAttribute("aria-pressed",String(o))}function Q(e,o,s,u){const i=c.createElement("button");i.type="button";i.className="sl-option";i.dataset.key=e;const k=c.createElement("span"),N=c.createElement("strong");N.textContent=o;k.append(N);if(s){const O=c.createElement("small");O.textContent=s;k.append(O)}const L=c.createElement("span");L.className="sl-mark";L.setAttribute("aria-hidden","true");L.textContent="✓";i.append(k,L);if(u!==void 0)i.setAttribute("aria-pressed",String(u));return i}function R(e){M.textContent=e}function F(e){R(e);n.dispatchEvent(new v.CustomEvent("sl-menu-change",{bubbles:true,composed:true,detail:structuredClone(t)}));x.onChange?.(structuredClone(t))}function T(){const e=A(),o=e?.dataset?.key;W();if(m&&e&&o&&(!e.isConnected||e.disabled||e.closest("[hidden]"))){(a("[data-key]").find(s=>s.dataset.key===o&&!s.disabled&&!s.closest("[hidden],[inert]"))||E()[0])?.focus()}}function D(e=false){if(b||l.disabled||m)return;m=true;j();n.dataset.open="true";l.setAttribute("aria-expanded","true");d.inert=false;d.setAttribute("aria-hidden","false");r(".sl-summary").inert=true;r(".sl-summary").setAttribute("aria-hidden","true");T();(e?E().at(-1):E()[0])?.focus({preventScroll:true})}function h(e=true){if(b)return;const o=m;m=false;if(e&&o)l.focus({preventScroll:true});n.dataset.open="false";l.setAttribute("aria-expanded","false");d.inert=true;d.setAttribute("aria-hidden","true");r(".sl-summary").inert=false;r(".sl-summary").removeAttribute("aria-hidden");K();T()}const w={v3:{name:"Final copy",text:"Share the release notes with the team."},v2:{name:"Review draft",text:"Review the release notes before sharing."},v1:{name:"First outline",text:"Collect the changes for this release."}};function j(){t.draft=t.current}function K(){t.draft=t.current}function W(){Object.keys(w).forEach(e=>Y("version:"+e,t.draft===e));S("[data-version-copy]",w[t.draft].text);r('[data-key="restore"]').disabled=t.draft===t.current;r('[data-key="undo"]').disabled=t.previous===null;S("[data-summary]",w[t.current].name);S("[data-document]",w[t.current].text)}function V(e,o,s){if(e.startsWith("version:")){t.draft=e.slice(8);T()}else if(e==="restore"){if(t.draft===t.current)return;t.previous=t.current;t.current=t.draft;h();F(w[t.current].name+" restored in the local document.")}else if(e==="undo"&&t.previous){t.current=t.previous;t.previous=null;t.draft=t.current;T();F("Local restore undone.")}}f(l,"click",()=>m?h():D());f(l,"keydown",e=>{if(["ArrowDown","ArrowUp"].includes(e.key)){e.preventDefault();D(e.key==="ArrowUp")}});f(n,"click",e=>{const o=e.target.closest("[data-key]");if(!o||!n.contains(o)||o.disabled||o.closest("[hidden],[inert]"))return;if(o.dataset.key==="dismiss"){h();return}V(o.dataset.key,o,e)});f(n,"input",e=>{});f(n,"change",e=>{});f(n,"keydown",e=>{if(!m)return;if(e.key==="Escape"){e.preventDefault();e.stopPropagation();h();return}if(e.target===l)return;const o=["INPUT","TEXTAREA","SELECT"].includes(e.target.tagName);if(o&&!(e.target.matches("[data-search]")&&["ArrowDown","ArrowUp"].includes(e.key)))return;const s=E().filter(i=>i.tagName==="BUTTON"),u=s.indexOf(A());if(!s.length)return;if(["ArrowDown","ArrowUp","Home","End"].includes(e.key)){e.preventDefault();const i=e.key==="Home"?0:e.key==="End"?s.length-1:u<0?e.key==="ArrowUp"?s.length-1:0:(u+(e.key==="ArrowDown"?1:-1)+s.length)%s.length;s[i].focus()}else if(e.key.length===1&&e.key!==" "&&!e.ctrlKey&&!e.metaKey&&!e.altKey){const i=[...s.slice(u+1),...s.slice(0,u+1)].find(k=>k.textContent.trim().toLocaleLowerCase().startsWith(e.key.toLocaleLowerCase()));if(i){e.preventDefault();i.focus()}}});f(c,"pointerdown",e=>{if(m&&!e.composedPath().includes(n))h(false)});f(n,"focusout",e=>{if(e.relatedTarget&&n.contains(e.relatedTarget))return;queueMicrotask(()=>{if(!b&&m&&!n.contains(A()))h(false)})});function U(){if(b)return;const e=n.contains(A());t=structuredClone(P);a('input[type="search"]').forEach(o=>o.value="");S("[data-label]",B);R(H);h(e);d.scrollTop=0;a(".sl-scroll,.sl-summary,textarea").forEach(o=>{o.scrollTop=0;o.scrollLeft=0})}const I={open:D,close:h,reset:U,get state(){return structuredClone({...t,open:m})},destroy(){if(b)return;U();b=true;g.abort();p.delete(n)}};p.set(n,I);U();return I}function z(n){return C(n)}return{mount:C,mountPreview:z}})()}function $(p,C={},{preview:z=false}={}){if(!p||typeof p.attachShadow!=="function")throw new TypeError("A DOM host is required");const n=p.shadowRoot||p.attachShadow({mode:"open"});n.innerHTML=Z;const x=p.ownerDocument.createElement("style");const c=new URL("./instrument-sans-variable.woff2",import.meta.url).href;x.textContent=G.replaceAll("./instrument-sans-variable.woff2",c)+':host{display:block;min-width:0;max-width:100%;font-family:"Instrument Sans",sans-serif}[hidden]{display:none!important}';n.prepend(x);const v=n.querySelector(".sl-component");if(!v){n.replaceChildren();throw new Error("Missing component root")}const g=X(p.ownerDocument,c);let y,r=false;try{const a=J(),l={};if(q==="upload")l.input=n.querySelector('input[type="file"]');if(["like","copy","download","bookmark","playback","delete","upload","share","follow"].includes(q))l.feedback=n.querySelector("."+q+"-feedback");if(z&&typeof a.mountPreview!=="function")throw new Error("This source has no preview adapter; supply its documented application callbacks.");y=(z?a.mountPreview:a.mount)(v,{...l,...C});if(typeof y?.destroy!=="function")throw new Error("Missing source cleanup contract")}catch(a){g();n.replaceChildren();throw a}return new Proxy(y,{get(a,l){if(l==="destroy")return()=>{if(r)return;r=true;try{a.destroy()}finally{g();n.replaceChildren()}};const d=Reflect.get(a,l,a);return typeof d==="function"?d.bind(a):d}})}export{$ as mountInto,q as variant};
