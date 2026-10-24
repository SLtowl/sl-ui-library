import{retainFont as H}from"./react-font.mjs";const E="context-menu";const j='<div class="menu-demo" data-menu="context"><div class="context-target" data-context><i class="menu-glyph " data-icon="file" aria-hidden="true"><svg viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg" focusable="false" aria-hidden="true"><path d="M7 4h10l6 6v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm10 0v6h6"/></svg></i><div class="context-title"><strong>Project brief</strong><small>Document · Local preview</small></div><button type="button" class="menu-trigger" data-trigger aria-expanded="false" aria-haspopup="menu" aria-controls="menu-context" aria-label="Open file actions"><i class="menu-glyph " data-icon="dots" aria-hidden="true"><svg viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg" focusable="false" aria-hidden="true"><circle cx="7" cy="14" r="1" fill="currentColor"/><circle cx="14" cy="14" r="1" fill="currentColor"/><circle cx="21" cy="14" r="1" fill="currentColor"/></svg></i></button></div><div id="menu-context" class="menu-panel" role="menu" aria-label="context options" aria-hidden="true" inert><button type="button" class="menu-item" role="menuitem" tabindex="-1" data-value="open" data-result="Document opened in this preview."><i class="menu-glyph " data-icon="file" aria-hidden="true"><svg viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg" focusable="false" aria-hidden="true"><path d="M7 4h10l6 6v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm10 0v6h6"/></svg></i><span>Open document</span></button><button type="button" class="menu-item" role="menuitem" tabindex="-1" data-value="pin" data-result="Document pinned in this preview."><i class="menu-glyph " data-icon="pin" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false"><path d="M8 3h8v3l-1 1v5l3 3v2H6v-2l3-3V7L8 6V3ZM12 17v5"/></svg></i><span>Pin to top</span></button><button type="button" class="menu-item" role="menuitem" tabindex="-1" data-value="duplicate" data-result="Document duplicated in this preview."><i class="menu-glyph " data-icon="copy" aria-hidden="true"><svg viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg" focusable="false" aria-hidden="true"><rect x="5" y="8" width="13" height="16" rx="2.5"/><path d="M10 8V6.5A2.5 2.5 0 0 1 12.5 4h8A2.5 2.5 0 0 1 23 6.5v11a2.5 2.5 0 0 1-2.5 2.5H18"/></svg></i><span>Duplicate</span></button></div><p class="menu-feedback" data-feedback role="status" aria-live="polite">Right-click works here. No real files are changed.</p></div>';const B=`@font-face{font-family:'Instrument Sans';src:url('./instrument-sans-variable.woff2') format('woff2');font-weight:400 700;font-display:swap}
.menu-demo {
  --menu-ink: #222222; --menu-panel: #282828; --menu-text: #efefef; --menu-muted: #b5b5b5;
  --menu-ease: cubic-bezier(.22,.61,.36,1);
  position: relative; width: min(288px,100%); height: 326px; padding-top: 24px;
  color: var(--menu-text); font-family: 'Instrument Sans',sans-serif; text-align: left;
}
.menu-demo, .menu-demo * { box-sizing: border-box; }
.menu-demo button, .menu-demo input { font: inherit; }
.menu-demo button { cursor: pointer; }
.menu-demo svg { width: 20px; height: 20px; flex: none; fill: none; stroke: currentColor; stroke-width: 1.4; stroke-linecap: round; stroke-linejoin: round; }
.menu-trigger { display: flex; align-items: center; gap: 12px; width: 100%; min-height: 52px; padding: 14px 16px; border: 1px solid #ffffff10; border-radius: 14px; background: var(--menu-ink); color: var(--menu-text); box-shadow: inset 0 1px #ffffff0c,0 2px 4px #0001; transition: background-color 180ms ease; }
.menu-trigger { transition: background-color 180ms ease,border-radius 280ms var(--menu-ease),border-color 220ms ease; }
.menu-trigger:hover { background: #2e2e2e; }
.menu-trigger-label { flex: 1; text-align: left; font-size: 14px; }
.menu-chevron { width: 16px !important; height: 16px !important; color: var(--menu-muted); transition: transform 240ms var(--menu-ease); }
[data-open="true"] .menu-chevron { transform: rotate(180deg); }
.menu-panel { position: absolute; top: 86px; left: 0; width: 100%; padding: 7px; border: 1px solid #ffffff13; border-radius: 16px; background: var(--menu-panel); box-shadow: 0 8px 20px #0002,inset 0 1px #ffffff08; opacity: 0; visibility: hidden; transform: translateY(-6px) scale(.985); transform-origin: top center; pointer-events: none; transition: opacity 170ms ease,transform 240ms var(--menu-ease),visibility 0s 240ms; }
[data-open="true"] .menu-panel { opacity: 1; visibility: visible; transform: none; pointer-events: auto; transition-delay: 0s; }
.menu-overline { padding: 8px 10px 10px; color: var(--menu-muted); font-size: 11px; letter-spacing: .025em; }
.menu-item { display: flex; align-items: center; gap: 10px; width: 100%; min-height: 39px; padding: 9px 10px; border: 0; border-radius: 9px; background: transparent; color: var(--menu-text); text-align: left; font-size: 13px !important; transition: background-color 160ms ease; }
.menu-item:hover, .menu-item:focus-visible { background: #ffffff0a; }
.menu-item > span:not(.menu-dot) { flex: 1; }
.menu-item svg { color: #c7c7c7; width: 18px; height: 18px; }
.menu-rule { height: 1px; margin: 5px 9px; background: #ffffff12; }
.menu-check { opacity: 0; transition: opacity 180ms ease; }
[aria-checked="true"] .menu-check { opacity: 1; }
[aria-checked="true"] { color: #f6f6f6; }
.menu-hint { margin: 16px 4px 0; color: #606060; font-size: 12px; line-height: 1.5; }
.menu-feedback { position: absolute; bottom: 0; left: 4px; right: 4px; margin: 0; min-height: 18px; color: #505050; font-size: 12px; line-height: 1.5; }
[data-open="true"] .menu-feedback { visibility: hidden; }
.menu-trigger kbd { font: 11px 'Instrument Sans',sans-serif; padding: 3px 7px; border: 1px solid #ffffff22; border-radius: 5px; color: var(--menu-muted); }
.menu-badge { display: grid; place-items: center; min-width: 22px; height: 22px; padding-inline: 5px; border-radius: 7px; background: #ffffff13; color: #eaeaea; font-size: 11px; font-variant-numeric: tabular-nums; }
.menu-dot { width: 8px; height: 8px; border-radius: 50%; background: #d2d2d2; box-shadow: 0 0 0 4px #ffffff06; margin: 0 6px 0 4px; }
.menu-item:nth-of-type(2) .menu-dot { background: #b3b3b3; }
.menu-item:nth-of-type(3) .menu-dot { background: #8f8f8f; }
.menu-done { justify-content: center; background: #e9e9e9; color: #222222; margin-top: 4px; min-height: 34px; }
.menu-done:hover, .menu-done:focus-visible { background: #f4f4f4; }
.context-target { display: flex; align-items: center; gap: 12px; padding: 20px 14px; background: var(--menu-ink); border: 1px solid #ffffff10; border-radius: 15px; }
.context-target > svg { width: 28px; height: 32px; color: #cfcfcf; }
.context-title { flex: 1; min-width: 0; }
.context-title strong { font-size: 14px; font-weight: 500; display: block; }
.context-title small { display: block; margin-top: 5px; color: var(--menu-muted); font-size: 11px; }
.context-target .menu-trigger { width: 32px; min-height: 32px; padding: 6px; border: 0; border-radius: 8px; box-shadow: none; }
[data-menu="context"] .menu-panel { width: min(232px,100%); top: var(--menu-y,116px); left: clamp(0px,var(--menu-x,28px),max(0px,calc(100% - 232px))); }
.menu-search { display: flex; align-items: center; gap: 9px; margin: 3px 4px 7px; padding: 8px 6px 11px; border-bottom: 1px solid #ffffff15; color: #b6b6b6; }
.menu-search svg { width: 18px; height: 18px; }
.menu-search input { width: 100%; min-width: 0; padding: 0; border: 0; outline: 0; color: var(--menu-text); background: transparent; font-size: 13px; }
.menu-search:focus-within { border-bottom-color: #b1b1b1; }
.menu-search input::placeholder { color: #b6b6b6; opacity: 1; }
.command-list { max-height: 144px; overflow: auto; scrollbar-width: thin; scrollbar-color: #757575 transparent; }
.command-list .menu-item { min-height: 36px; padding-block: 7px; }
.command-empty { margin: 0; padding: 18px 10px; color: var(--menu-muted); font-size: 12px; }
.command-foot { margin: 4px 5px 0; padding: 6px 4px 2px; color: #b0b0b0; font-size: 10px; line-height: 14px; border-top: 1px solid #ffffff10; }
.menu-demo button:focus-visible { outline: 2px solid #b9b9b9; outline-offset: 2px; }
.menu-demo [hidden] { display: none !important; }
.menu-review .toggle-stage { min-height: 402px; }
.menu-review .toggle-heading h2 { font-size: 21px; }
/* Each menu has its own opening structure, rather than one shared popover. */
/* Actions: a translated sheet passes under the fixed trigger.
   The clipping window and all corner radii remain static during motion. */
.action-surface { border-radius: 14px; isolation: isolate; }
.action-reveal { overflow: hidden; border-radius: 0 0 14px 14px; margin-top: -14px; }
[data-menu="actions"] .menu-trigger { position: relative; z-index: 1; height: 52px; border-radius: 14px; border-bottom-color: transparent; box-shadow: inset 0 1px #ffffff0c; transition: background-color 180ms ease; }
[data-menu="actions"] .menu-trigger:focus-visible { outline: none; }
[data-menu="actions"] .menu-trigger:focus-visible::after { content: ""; position: absolute; inset: 3px; border: 2px solid #b9b9b9; border-radius: 11px; pointer-events: none; }
[data-menu="actions"] .menu-panel { position: relative; top: auto; padding-top: 21px; border-top: 0; border-radius: 0 0 14px 14px; background: var(--menu-ink); box-shadow: none; transform: translateY(-100%); opacity: 1; visibility: hidden; transition: transform 280ms var(--menu-ease),visibility 0s 280ms; }
[data-menu="actions"][data-open="true"] .menu-panel { transform: none; visibility: visible; transition-delay: 0s; }
/* Sort: a small separate sheet rises into place. */
[data-menu="sort"] .menu-panel { transform: translateY(16px); transition: transform 280ms var(--menu-ease),opacity 200ms ease,visibility 0s 280ms; }
[data-menu="sort"][data-open="true"] .menu-panel { transform: none; transition-delay: 0s; }
/* Labels: stationary surface, with choices entering left to right in sequence. */
[data-menu="labels"] .menu-panel { transform: none; transition: opacity 180ms ease,visibility 0s 280ms; }
[data-menu="labels"][data-open="true"] .menu-panel { transition-delay: 0s; }
[data-menu="labels"] .menu-item { opacity: 0; transform: translateX(-12px); transition: transform 280ms var(--menu-ease),opacity 180ms ease,background-color 160ms ease; }
[data-menu="labels"][data-open="true"] .menu-item { opacity: 1; transform: none; }
[data-menu="labels"][data-open="true"] .menu-item:nth-of-type(2) { transition-delay: 35ms,35ms,0s; }
[data-menu="labels"][data-open="true"] .menu-item:nth-of-type(3) { transition-delay: 70ms,70ms,0s; }
[data-menu="labels"][data-open="true"] .menu-done { transition-delay: 100ms,100ms,0s; }
/* Context: expands from the point where the user opened it. */
[data-menu="context"] .menu-panel { transform: scale(.82); transform-origin: var(--origin-x,85%) 0; transition: transform 270ms var(--menu-ease),opacity 160ms ease,visibility 0s 270ms; }
[data-menu="context"][data-open="true"] .menu-panel { transform: none; transition-delay: 0s; }
/* Commands: trigger and search expand as one connected container. */
[data-menu="commands"][data-open="true"] .menu-trigger { border-radius: 14px 14px 0 0; border-bottom-color: transparent; box-shadow: inset 0 1px #ffffff0c; }
[data-menu="commands"] .menu-panel { display: grid; grid-template-rows: 0fr; top: 75px; padding: 0; border-top: 0; border-radius: 0 0 14px 14px; background: var(--menu-ink); transform: none; transition: grid-template-rows 340ms var(--menu-ease),opacity 200ms ease,visibility 0s 340ms; }
[data-menu="commands"][data-open="true"] .menu-panel { grid-template-rows: 1fr; transition-delay: 0s; }
.command-body { min-height: 0; overflow: hidden; }
.command-content { padding: 7px; }
/* Inline project-owned contours: no bitmap decoding, masks or backdrop blending. */
.menu-glyph { display: inline-flex; flex: 0 0 auto; width: 28px; height: 28px; align-items: center; justify-content: center; vertical-align: middle; pointer-events: none; }
.menu-glyph > svg { display: block; width: 100%; height: 100%; flex: none; fill: none; stroke: currentColor; stroke-width: 1.5; stroke-linecap: round; stroke-linejoin: round; overflow: visible; }
.menu-item .menu-glyph { width: 24px; height: 24px; margin-block: -3px; }
.menu-trigger .menu-glyph:not(.menu-chevron) { margin-block: -3px; }
.menu-glyph.menu-chevron { width: 20px !important; height: 20px !important; }
.menu-glyph.menu-check { transition: opacity 160ms ease; }
.context-target > .menu-glyph { width: 36px; height: 36px; }
.context-target .menu-trigger .menu-glyph { width: 22px; height: 22px; }
.menu-search .menu-glyph { width: 24px; height: 24px; margin-block: -3px; }
.menu-review .toggle-reset .menu-glyph { width: 27px; height: 27px; }
.menu-review .navigation .menu-glyph { width: 22px; height: 22px; }
@media(prefers-reduced-motion:reduce) { .menu-demo *, .menu-demo *::before, .menu-demo *::after { transition: none !important; } }
@media(forced-colors:active) { .menu-trigger,.menu-panel,.context-target { border: 1px solid CanvasText; } .menu-item[aria-checked="true"] { outline: 1px solid Highlight; } }
.menu-demo .menu-panel .menu-item:not(.menu-done){margin-block:0 4px}
`;function I(){return(()=>{const u=new WeakMap;function C(t,{onSelect:r}={}){if(u.has(t))return u.get(t);if(r!==void 0&&typeof r!=="function")throw new TypeError("onSelect must be a function.");const g=new AbortController,i=g.signal;const p=t.querySelector("[data-trigger]"),f=t.querySelector(".menu-panel");const o=[...t.querySelectorAll("[data-value]")],s=t.querySelector('input[type="search"]');const a=t.querySelector("[data-feedback]"),d=t.querySelector("[data-trigger-label]");const x=o.map(e=>e.getAttribute("aria-checked"));const D=d?.textContent,M=a.textContent;const A=t.ownerDocument,z=A.defaultView;const b=t.dataset.menu;let h=false,q=false,y="",w;const v=()=>o.filter(e=>!e.hidden&&!e.disabled);function m(e=false){h=false;t.dataset.open="false";p.setAttribute("aria-expanded","false");f.inert=true;f.setAttribute("aria-hidden","true");if(e)p.focus({preventScroll:true})}function k(e=false,n=false){if(q||p.disabled)return;t.dataset.open="true";h=true;p.setAttribute("aria-expanded","true");f.inert=false;f.setAttribute("aria-hidden","false");if(e)(s||(n?v().at(-1):v()[0]))?.focus({preventScroll:true})}function P(e){const n=e.dataset.value;if(b==="sort"){o.forEach(l=>l.setAttribute("aria-checked",String(l===e)));d.textContent=e.querySelector("span").textContent;a.textContent="Sorted by "+d.textContent.toLowerCase()+"."}else if(b==="labels"){e.setAttribute("aria-checked",String(e.getAttribute("aria-checked")!=="true"));const l=o.filter(S=>S.getAttribute("aria-checked")==="true");t.querySelector("[data-count]").textContent=String(l.length);a.textContent=l.length?l.map(S=>S.querySelector("[data-label]").textContent).join(" · "):"No labels selected."}else a.textContent=e.dataset.result;const c=b==="labels"?o.filter(l=>l.getAttribute("aria-checked")==="true").map(l=>l.dataset.value):[n];r?.(c);t.dispatchEvent(new z.CustomEvent("menuselect",{bubbles:true,detail:{value:n,values:c}}));if(b!=="labels")m(true)}p.addEventListener("click",e=>h?m():k(e.detail===0||!!s),{signal:i});p.addEventListener("keydown",e=>{if(!["ArrowDown","ArrowUp"].includes(e.key))return;e.preventDefault();k(true,e.key==="ArrowUp")},{signal:i});for(const e of o)e.addEventListener("click",()=>P(e),{signal:i});t.querySelector("[data-done]")?.addEventListener("click",()=>m(true),{signal:i});t.addEventListener("keydown",e=>{if(!h)return;if(e.target===p&&e.key!=="Escape")return;if(e.key==="Escape"){e.preventDefault();e.stopPropagation();m(true);return}const n=v();if(e.target===s&&!["ArrowDown","Enter"].includes(e.key))return;if(e.target===s&&e.key==="Enter"){e.preventDefault();n[0]?.click();return}if(["ArrowDown","ArrowUp","Home","End"].includes(e.key)){e.preventDefault();const c=n.indexOf(e.target);const l=e.key==="Home"?0:e.key==="End"?n.length-1:(c+(e.key==="ArrowDown"?1:-1)+n.length)%n.length;n[l]?.focus()}else if(!s&&e.key.length===1&&e.key!==" "&&!e.ctrlKey&&!e.metaKey){y+=e.key.toLowerCase();clearTimeout(w);n.find(c=>c.textContent.trim().toLowerCase().startsWith(y))?.focus();w=setTimeout(()=>{y=""},600)}},{signal:i});s?.addEventListener("input",()=>{const e=s.value.trim().toLowerCase();o.forEach(n=>{n.hidden=!n.textContent.toLowerCase().includes(e)});t.querySelector("[data-empty]").hidden=v().length>0},{signal:i});A.addEventListener("pointerdown",e=>{if(h&&!e.composedPath().includes(t))m()},{signal:i});t.addEventListener("focusout",()=>queueMicrotask(()=>{if(h&&!t.matches(":focus-within"))m()}),{signal:i});t.querySelector("[data-context]")?.addEventListener("contextmenu",e=>{e.preventDefault();const n=t.getBoundingClientRect();t.style.setProperty("--menu-x",Math.max(0,Math.min(n.width-232,e.clientX-n.left))+"px");t.style.setProperty("--menu-y",Math.max(76,Math.min(112,e.clientY-n.top))+"px");t.style.setProperty("--origin-x",Math.max(0,Math.min(232,e.clientX-n.left-parseFloat(t.style.getPropertyValue("--menu-x"))))+"px");k(true)},{signal:i});function T(){m(t.matches(":focus-within"));clearTimeout(w);y="";o.forEach((n,c)=>{if(x[c]!==null)n.setAttribute("aria-checked",x[c]);n.hidden=false});if(d)d.textContent=D;if(s){s.value="";t.querySelector("[data-empty]").hidden=true}const e=t.querySelector("[data-count]");if(e)e.textContent=String(x.filter(n=>n==="true").length);a.textContent=M;t.style.removeProperty("--menu-x");t.style.removeProperty("--menu-y");t.style.removeProperty("--origin-x")}m();const L={open:k,close:m,reset:T,destroy(){q=true;m();clearTimeout(w);g.abort();u.delete(t)}};u.set(t,L);return L}return{mount:C}})()}function R(u,C={},{preview:t=false}={}){if(!u||typeof u.attachShadow!=="function")throw new TypeError("A DOM host is required");const r=u.shadowRoot||u.attachShadow({mode:"open"});r.innerHTML=j;const g=u.ownerDocument.createElement("style");const i=new URL("./instrument-sans-variable.woff2",import.meta.url).href;g.textContent=B.replaceAll("./instrument-sans-variable.woff2",i)+':host{display:block;min-width:0;max-width:100%;font-family:"Instrument Sans",sans-serif}[hidden]{display:none!important}';r.prepend(g);const p=r.querySelector(".menu-demo");if(!p){r.replaceChildren();throw new Error("Missing component root")}const f=H(u.ownerDocument,i);let o,s=false;try{const a=I(),d={};if(E==="upload")d.input=r.querySelector('input[type="file"]');if(["like","copy","download","bookmark","playback","delete","upload","share","follow"].includes(E))d.feedback=r.querySelector("."+E+"-feedback");if(t&&typeof a.mountPreview!=="function")throw new Error("This source has no preview adapter; supply its documented application callbacks.");o=(t?a.mountPreview:a.mount)(p,{...d,...C});if(typeof o?.destroy!=="function")throw new Error("Missing source cleanup contract")}catch(a){f();r.replaceChildren();throw a}return new Proxy(o,{get(a,d){if(d==="destroy")return()=>{if(s)return;s=true;try{a.destroy()}finally{f();r.replaceChildren()}};const x=Reflect.get(a,d,a);return typeof x==="function"?x.bind(a):x}})}export{R as mountInto,E as variant};
