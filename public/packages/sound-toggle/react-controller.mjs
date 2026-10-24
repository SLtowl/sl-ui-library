import{retainFont as S}from"./react-font.mjs";const k="sound-toggle";const C='<div class="sl-toggle sl-toggle--sound" id="sound-toggle" data-checked="true">\n            <span class="sl-toggle__emblem" aria-hidden="true"><svg viewBox="0 0 32 32" fill="none"><path class="sl-sound__speaker" d="M6 13h5l6-5v16l-6-5H6v-6Z"/><path class="sl-sound__wave sl-sound__wave--one" d="M21 12.5a5 5 0 0 1 0 7"/><path class="sl-sound__wave sl-sound__wave--two" d="M24 9a10 10 0 0 1 0 14"/><path class="sl-sound__mute" d="m21 13 6 6M27 13l-6 6"/></svg></span>\n            <label class="sl-toggle__label" for="demo-sound"><span class="sl-toggle__copy"><span class="sl-toggle__title">Interface sounds</span><span class="sl-toggle__status" data-status>Playing</span></span></label>\n            <span class="sl-toggle__switch"><input class="sl-toggle__input" id="demo-sound" type="checkbox" checked data-on="Playing" data-off="Muted"><span class="sl-toggle__track" aria-hidden="true"><span class="sl-toggle__thumb"></span></span></span>\n          </div>';const M=`@font-face { font-family: 'Instrument Sans'; src: url('./instrument-sans-variable.woff2') format('woff2'); font-weight: 400 700; font-display: swap; }
.sl-toggle {
  --toggle-ink: #222222;
  --toggle-hover: #2b2b2b;
  --toggle-track: #101010;
  --toggle-track-on: #4a4a4a;
  --toggle-thumb: #f0f0f0;
  --toggle-text: #f8f8f8;
  --toggle-muted: #b3b3b3;
  --toggle-ease: cubic-bezier(.4, 0, .2, 1);
  width: min(320px, 100%);
  min-height: 82px;
  padding: 14px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: 12px;
  border: 1px solid #ffffff0b;
  border-radius: 14px;
  color: var(--toggle-text);
  background: var(--toggle-ink);
  box-shadow: inset 0 1px #ffffff0d, 0 2px 5px #00000010;
  font-family: 'Instrument Sans', sans-serif;
  text-align: left;
  transition: background-color 300ms ease, border-color 300ms ease, box-shadow 380ms var(--toggle-ease);
}
.sl-toggle *, .sl-toggle *::before, .sl-toggle *::after { box-sizing: border-box; }
.sl-toggle:hover { background: var(--toggle-hover); }
.sl-toggle__label { min-width: 0; flex: 1; display: block; cursor: pointer; }
.sl-toggle__copy { min-width: 0; display: grid; gap: 4px; }
.sl-toggle__title { overflow: hidden; text-overflow: ellipsis; color: var(--toggle-text); font-size: 15px; font-weight: 540; line-height: 20px; letter-spacing: -.01em; white-space: nowrap; }
.sl-toggle__status { color: var(--toggle-muted); font-size: 12px; line-height: 16px; font-variant-numeric: tabular-nums; transition: color 300ms ease, opacity 240ms ease; }
.sl-toggle[data-checked="true"] .sl-toggle__status { color: #e5e5e5; }
.sl-toggle__switch { position: relative; display: block; flex: none; width: 64px; height: 36px; }
.sl-toggle__input { position: absolute; z-index: 2; inset: 0; width: 100%; height: 100%; margin: 0; opacity: 0; cursor: pointer; }
.sl-toggle__track { position: absolute; inset: 0; display: block; overflow: hidden; border: 1px solid #606060; border-radius: 12px; background: var(--toggle-track); box-shadow: inset 0 1px 3px #0008, 0 1px #ffffff0b; transition: background-color 360ms ease, border-color 360ms ease, box-shadow 420ms var(--toggle-ease), transform 260ms var(--toggle-ease); }
.sl-toggle__thumb { position: absolute; top: 3px; left: 3px; width: 28px; height: 28px; display: grid; place-items: center; border-radius: 9px; color: #212121; background: var(--toggle-thumb); box-shadow: 0 2px 5px #0006, inset 0 1px #fff; transform: translateX(0); transform-origin: center; transition: transform 460ms var(--toggle-ease), width 220ms var(--toggle-ease), border-radius 320ms ease, background-color 320ms ease; }
.sl-toggle__input:checked + .sl-toggle__track { border-color: #828282; background: var(--toggle-track-on); box-shadow: inset 0 1px 3px #0004, 0 1px #ffffff12; }
.sl-toggle__input:checked + .sl-toggle__track .sl-toggle__thumb { transform: translateX(30px); }
.sl-toggle__input:focus-visible + .sl-toggle__track { outline: 2px solid #1f1f1f; outline-offset: 3px; box-shadow: 0 0 0 5px #6f6f6f2b, inset 0 1px 3px #0006; }
.sl-toggle__input:active + .sl-toggle__track .sl-toggle__thumb { width: 32px; }
.sl-toggle__input:checked:active + .sl-toggle__track .sl-toggle__thumb { transform: translateX(26px); }
.sl-toggle__input:disabled { cursor: not-allowed; }
.sl-toggle:has(.sl-toggle__input:disabled) { opacity: .55; }
.sl-toggle__dot { width: 7px; height: 7px; border-radius: 3px; background: #7f7f7f; box-shadow: inset 0 1px #fff6; transition: width 380ms var(--toggle-ease), background-color 300ms ease; }
.sl-toggle__input:checked + .sl-toggle__track .sl-toggle__dot { width: 13px; background: #3a3a3a; }

.sl-toggle__emblem { flex: none; width: 44px; height: 44px; display: grid; place-items: center; border: 1px solid #5a5a5a; border-radius: 12px; color: #d0d0d0; background: #181818; box-shadow: inset 0 1px #ffffff0b; transition: color 300ms ease, background-color 300ms ease, border-color 300ms ease; }
.sl-toggle__emblem svg { display: block; width: 29px; height: 29px; overflow: visible; stroke: currentColor; stroke-width: 1.45; stroke-linecap: round; stroke-linejoin: round; }
.sl-toggle[data-checked="true"] .sl-toggle__emblem { color: #f2f2f2; border-color: #6f6f6f; background: #333333; }

.sl-bell__body { transform-origin: 16px 8px; }
.sl-bell__waves { opacity: 1; transition: opacity 340ms ease 140ms; }
.sl-bell__slash { stroke-dasharray: 1; stroke-dashoffset: 1; opacity: 0; transition: stroke-dashoffset 420ms var(--toggle-ease), opacity 260ms ease; }
.sl-toggle--glide[data-checked="false"] .sl-bell__waves { opacity: 0; transition-delay: 0ms; }
.sl-toggle--glide[data-checked="false"] .sl-bell__slash { opacity: 1; stroke-dashoffset: 0; transition-delay: 100ms; }

.sl-toggle--theme .sl-toggle__thumb { transition: transform 580ms cubic-bezier(.22,.61,.36,1), background-color 320ms ease; }
.sl-toggle--theme .sl-toggle__input:active + .sl-toggle__track .sl-toggle__thumb { width: 28px; }
.sl-toggle--theme .sl-toggle__input:checked:active + .sl-toggle__track .sl-toggle__thumb { transform: translateX(30px); }
.sl-toggle--theme .sl-toggle__thumb svg { position: absolute; width: 18px; height: 18px; stroke: currentColor; stroke-width: 1.4; stroke-linecap: round; stroke-linejoin: round; transition: opacity 220ms ease; }
.sl-toggle--theme .sl-toggle__sun { opacity: 1; transition-delay: 150ms; }
.sl-toggle--theme .sl-toggle__moon { opacity: 0; }
.sl-toggle--theme .sl-toggle__input:checked + .sl-toggle__track .sl-toggle__sun { opacity: 0; transition-delay: 0ms; }
.sl-toggle--theme .sl-toggle__input:checked + .sl-toggle__track .sl-toggle__moon { opacity: 1; transition-delay: 150ms; }

.sl-sound__wave, .sl-sound__mute { transform-box: fill-box; transform-origin: center; transition: opacity 240ms ease, transform 420ms var(--toggle-ease), stroke-dashoffset 420ms var(--toggle-ease); }
.sl-sound__wave { stroke-dasharray: 1; stroke-dashoffset: 0; }
.sl-sound__wave--two { transition-delay: 70ms; }
.sl-sound__mute { opacity: 0; transform: scale(.65) rotate(-12deg); }
.sl-toggle--sound[data-checked="false"] .sl-sound__wave { opacity: 0; stroke-dashoffset: 1; transform: translateX(-2px); transition-delay: 0ms; }
.sl-toggle--sound[data-checked="false"] .sl-sound__mute { opacity: 1; transform: scale(1) rotate(0); transition-delay: 120ms; }

.sl-lock__shackle { transform-box: view-box; transform-origin: 22px 13px; transition: transform 520ms var(--toggle-ease); }
.sl-lock__body { transition: fill 300ms ease; }
.sl-toggle--privacy[data-checked="false"] .sl-lock__shackle { transform: rotate(32deg); }
.sl-toggle--privacy[data-checked="true"] .sl-lock__shackle { transform: translate(0) rotate(0); }
.sl-lock__key { stroke-dasharray: 1; stroke-dashoffset: 1; transition: stroke-dashoffset 360ms var(--toggle-ease) 150ms; }
.sl-toggle--privacy[data-checked="true"] .sl-lock__key { stroke-dashoffset: 0; }

.sl-sync__orbit { transform-origin: center; }
.sl-toggle--sync[data-checked="false"] .sl-sync__orbit { opacity: .72; }
.sl-toggle--sync[data-checked="true"] .sl-sync__orbit { opacity: 1; }

@media (max-width: 420px) {
  .sl-toggle { padding: 12px; gap: 10px; }
  .sl-toggle__emblem { width: 40px; height: 40px; }
  .sl-toggle__title { font-size: 14px; }
}
@media (prefers-reduced-motion: reduce) {
  .sl-toggle, .sl-toggle *, .sl-toggle *::before, .sl-toggle *::after { transition: none !important; animation: none !important; }
}
@media (forced-colors: active) {
  .sl-toggle, .sl-toggle__emblem, .sl-toggle__track, .sl-toggle__thumb { forced-color-adjust: none; color: FieldText; background: Field; border-color: FieldText; box-shadow: none; }
  .sl-toggle__status, .sl-toggle__title { color: FieldText; }
  .sl-toggle__input:checked + .sl-toggle__track { background: Highlight; border-color: Highlight; }
  .sl-toggle__input:checked + .sl-toggle__track .sl-toggle__thumb { color: Highlight; background: HighlightText; }
  .sl-toggle__input:focus-visible + .sl-toggle__track { outline-color: Highlight; box-shadow: none; }
}
`;function q(){return(()=>{const n=new WeakMap;function m(t,{onChange:s}={}){if(n.has(t))return n.get(t);if(typeof s!=="undefined"&&typeof s!=="function")throw new TypeError("onChange must be a function.");const e=t?.querySelector('input[type="checkbox"]');const d=t?.querySelector("[data-status]");if(!e||!d)throw new TypeError("A native checkbox and visible status are required.");const f=t.ownerDocument.defaultView;const u=new f.AbortController;const c=f.matchMedia("(prefers-reduced-motion: reduce)");let l=null,o=false;const r=(a,g,p)=>a.addEventListener(g,p,{signal:u.signal});function i(){l?.cancel();l=null}function v(){if(c.matches)return;i();const a=[...t.classList].find(_=>_.startsWith("sl-toggle--"))?.slice(11);if(a==="theme")return;if(a==="glide"){if(!e.checked)return;const _=t.querySelector(".sl-bell__body");if(!_?.animate)return;l=_.animate([{transform:"rotate(0deg)"},{transform:"rotate(-12deg)",offset:.2},{transform:"rotate(9deg)",offset:.43},{transform:"rotate(-5deg)",offset:.65},{transform:"rotate(2deg)",offset:.83},{transform:"rotate(0deg)"}],{duration:820,easing:"ease-in-out"});const w=l;w.onfinish=()=>{if(l===w)i()};return}const g=a==="sync"?t.querySelector(".sl-sync__orbit"):t.querySelector(".sl-toggle__emblem");if(!g?.animate)return;const p=a==="sync"?[{rotate:"0deg"},{rotate:e.checked?"360deg":"-360deg"}]:[{transform:"scale(1)"},{transform:"scale(.96)",offset:.36},{transform:"scale(1)"}];l=g.animate(p,{duration:a==="sync"?680:420,easing:"cubic-bezier(.4,0,.2,1)"});const y=l;y.onfinish=()=>{if(l===y)i()}}function h({animate:a=false,emit:g=false}={}){if(o)return;t.dataset.checked=String(e.checked);d.textContent=e.checked?e.dataset.on||"On":e.dataset.off||"Off";d.setAttribute("aria-live","polite");if(a)v();else i();if(g){s?.(e.checked);t.dispatchEvent(new f.CustomEvent("togglechange",{bubbles:true,composed:true,detail:{checked:e.checked}}))}}function b(a,{emit:g=false,animate:p=true}={}){if(o)return;e.checked=Boolean(a);h({animate:p,emit:g})}r(e,"change",()=>h({animate:true,emit:true}));r(c,"change",()=>{if(c.matches)i()});if(e.form)r(e.form,"reset",()=>queueMicrotask(()=>b(e.defaultChecked,{animate:false})));h();const x={setChecked:b,reset(){b(e.defaultChecked,{animate:false})},destroy(){if(o)return;o=true;i();u.abort();n.delete(t)},get checked(){return e.checked}};n.set(t,x);return x}return{mount:m}})()}function T(n,m={},{preview:t=false}={}){if(!n||typeof n.attachShadow!=="function")throw new TypeError("A DOM host is required");const s=n.shadowRoot||n.attachShadow({mode:"open"});s.innerHTML=C;const e=n.ownerDocument.createElement("style");const d=new URL("./instrument-sans-variable.woff2",import.meta.url).href;e.textContent=M.replaceAll("./instrument-sans-variable.woff2",d)+':host{display:block;min-width:0;max-width:100%;font-family:"Instrument Sans",sans-serif}[hidden]{display:none!important}';s.prepend(e);const f=s.querySelector(".sl-toggle");if(!f){s.replaceChildren();throw new Error("Missing component root")}const u=S(n.ownerDocument,d);let c,l=false;try{const o=q(),r={};if(k==="upload")r.input=s.querySelector('input[type="file"]');if(["like","copy","download","bookmark","playback","delete","upload","share","follow"].includes(k))r.feedback=s.querySelector("."+k+"-feedback");if(t&&typeof o.mountPreview!=="function")throw new Error("This source has no preview adapter; supply its documented application callbacks.");c=(t?o.mountPreview:o.mount)(f,{...r,...m});if(typeof c?.destroy!=="function")throw new Error("Missing source cleanup contract")}catch(o){u();s.replaceChildren();throw o}return new Proxy(c,{get(o,r){if(r==="destroy")return()=>{if(l)return;l=true;try{o.destroy()}finally{u();s.replaceChildren()}};const i=Reflect.get(o,r,o);return typeof i==="function"?i.bind(o):i}})}export{T as mountInto,k as variant};
