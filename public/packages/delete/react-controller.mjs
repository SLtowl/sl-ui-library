import{retainFont as M}from"./react-font.mjs";const x="delete";const z='<button class="sl-delete" id="delete-button" type="button" data-state="idle" aria-label="Delete" disabled>\n          <span class="sl-delete__surface" aria-hidden="true">\n            <span class="sl-delete__icon">\n              <svg class="sl-delete__trash" viewBox="0 0 24 24" fill="none" focusable="false">\n                <path class="sl-delete__bin" d="m7 8 .8 12h8.4L17 8M10 11l.3 6M14 11l-.3 6"/>\n                <g class="sl-delete__lid"><path d="M5 6h14M9 6V4h6v2"/></g>\n              </svg>\n            </span>\n            <span class="sl-delete__label">Delete</span>\n          </span>\n        </button>\n  <p class="delete-feedback" role="status" aria-live="polite" aria-atomic="true"></p>';const R=`@font-face { font-family: 'Instrument Sans'; src: url('./instrument-sans-variable.woff2') format('woff2'); font-weight: 400 700; font-style: normal; font-display: swap; }
.sl-delete {
  --delete-unit: 1px;
  --delete-ink: #222222;
  --delete-hover: #2e2e2e;
  --delete-active: #3f3f3f;
  --delete-text: #fafafa;
  --delete-focus: #5a5a5a;
  --delete-ease: cubic-bezier(.4, 0, .2, 1);
  box-sizing: border-box;
  display: block;
  position: relative;
  flex: none;
  width: calc(248 * var(--delete-unit));
  height: calc(52 * var(--delete-unit));
  padding: 0;
  border: 0;
  border-radius: calc(13 * var(--delete-unit));
  appearance: none;
  background: transparent;
  color: var(--delete-text);
  font: 550 calc(19 * var(--delete-unit))/1.1 'Instrument Sans', sans-serif;
  letter-spacing: -.02em;
  text-align: center;
  cursor: pointer;
  touch-action: manipulation;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
}
.sl-delete *, .sl-delete *::before, .sl-delete *::after { box-sizing: border-box; }
.sl-delete:disabled { opacity: .5; cursor: not-allowed; }
.sl-delete[aria-disabled="true"] { cursor: default; }
.sl-delete[data-state="pending"] { cursor: progress; }
.sl-delete:focus-visible { outline: 2px solid var(--delete-focus); outline-offset: 6px; }
.sl-delete .sl-delete__surface { --delete-face: var(--delete-ink); position: absolute; inset: 0; display: grid; place-items: center; overflow: hidden; border-radius: inherit; background: var(--delete-face); box-shadow: inset 0 1px #ffffff12, 0 1px 2px #0000000d; transition: transform 350ms cubic-bezier(.22, 1, .36, 1), background-color 350ms ease, box-shadow 350ms ease; }
.sl-delete:is([data-state="pending"], [data-state="deleted"]) .sl-delete__surface { --delete-face: var(--delete-active); }
@media (hover: hover) and (forced-colors: none) {
  .sl-delete:not(:disabled):not([aria-disabled="true"]):hover .sl-delete__surface { transform: translateY(-2px); box-shadow: inset 0 1px #ffffff17, 0 6px 12px -8px #00000047; }
  .sl-delete:not(:disabled):not([aria-disabled="true"]):hover .sl-delete__surface { --delete-face: var(--delete-hover); }
}
.sl-delete:not(:disabled):not([aria-disabled="true"]):active .sl-delete__surface { transform: translateY(1px) scale(.98); transition-duration: 120ms; }
.sl-delete .sl-delete__label { position: absolute; inset: 0 calc(56 * var(--delete-unit)); display: grid; place-items: center; white-space: nowrap; text-align: center; }
.sl-delete .sl-delete__icon { position: absolute; left: calc(18 * var(--delete-unit)); top: 50%; width: calc(24 * var(--delete-unit)); height: calc(24 * var(--delete-unit)); transform: translateY(-50%); }
.sl-delete .sl-delete__trash { display: block; width: 100%; height: 100%; overflow: visible; fill: none; stroke: currentColor; stroke-width: 1.7; stroke-linecap: round; stroke-linejoin: round; }
.sl-delete .sl-delete__lid { transform-box: view-box; transform-origin: 75% 25%; }
/* One quiet open/close gesture, independent of the action's completion time. */
.sl-delete[data-delete-motion] .sl-delete__lid { animation: sl-delete-lid-cycle 620ms var(--delete-ease); }
.sl-delete:disabled .sl-delete__lid { animation: none !important; }
@keyframes sl-delete-lid-cycle {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  42% { transform: translateY(-1px) rotate(18deg); }
}
@media (prefers-reduced-motion: reduce) {
  .sl-delete *, .sl-delete *::before, .sl-delete *::after { transition: none !important; animation: none !important; }
  .sl-delete .sl-delete__surface, .sl-delete .sl-delete__lid { transform: none !important; }
  .sl-delete:active .sl-delete__surface { opacity: .9; }
}
@media (forced-colors: active) {
  .sl-delete .sl-delete__surface { --delete-face: ButtonFace; forced-color-adjust: none; border: 1px solid ButtonText; background: var(--delete-face); color: ButtonText; box-shadow: none; }
  .sl-delete:is([data-state="pending"], [data-state="deleted"]) .sl-delete__surface { --delete-face: Highlight; color: HighlightText; border-color: Highlight; }
  .sl-delete:focus-visible { outline-color: Highlight; }
}

.delete-feedback{margin:0;color:#545454;font-size:12px;line-height:1.5;text-align:center}`;function B(){return(()=>{const s=new WeakMap;const p={idle:"Delete",pending:"Deleting",deleted:"Deleted",error:"Try again"};function g(e,{onDelete:m,feedback:h}={}){if(e?.tagName!=="BUTTON")throw new TypeError("A native Delete button is required.");if(s.has(e))return s.get(e);if(typeof m!=="function")throw new TypeError("Delete needs an onDelete({ signal }) action.");const r=e.querySelector(".sl-delete__label");if(!r||!e.querySelector(".sl-delete__trash"))throw new TypeError("Delete needs its label and trash icon.");const f=e.ownerDocument.defaultView;const d=f.matchMedia("(prefers-reduced-motion: reduce)");let l=e.dataset.state==="deleted"?"deleted":"idle";let t=false;let a=null;let c=0;let i=null;let y=0;let w=p[l];const L=n=>{if(h)h.textContent=n};function u(){y++;i?.cancel();i=null;r.textContent=w;r.style.removeProperty("opacity")}async function T(n){if(n===w)return;const o=i?Number(f.getComputedStyle(r).opacity):1;const _=++y;w=n;i?.cancel();i=null;if(d.matches||!r.animate){u();return}r.style.opacity=String(o);try{if(r.textContent!==n){if(o>.001){i=r.animate([{opacity:o},{opacity:0}],{duration:140*o,easing:"cubic-bezier(.4,0,.2,1)",fill:"forwards"});await i.finished;if(_!==y||t)return}r.style.opacity="0";i?.cancel();r.textContent=n}const v=Number(r.style.opacity);i=r.animate([{opacity:v},{opacity:1}],{duration:240*(1-v),easing:"cubic-bezier(.4,0,.2,1)",fill:"forwards"});await i.finished;if(_!==y||t)return;r.style.removeProperty("opacity");i.cancel();i=null}catch(v){if(v.name!=="AbortError"&&_===y&&!t)u()}}function b(n,o){l=n;if(l!=="pending"&&l!=="deleted")e.removeAttribute("data-delete-motion");e.dataset.state=l;e.setAttribute("aria-label",p[l]);e.setAttribute("aria-disabled",String(l==="pending"));e.setAttribute("aria-busy",String(l==="pending"));T(p[l]);if(o)L(o)}async function q(){const n=++c;const o=new f.AbortController;a=o;b("pending","Deleting. Wait for the request to finish.");if(!d.matches)e.setAttribute("data-delete-motion","");try{await m({signal:o.signal});if(t||n!==c||o.signal.aborted)return;a=null;b("deleted","Deleted.")}catch{if(t||n!==c||o.signal.aborted)return;a=null;b("error","Could not delete. Choose Try again to retry.")}}function k(){if(t||e.disabled||e.getAttribute("aria-disabled")==="true")return;if(l==="idle"||l==="error"||l==="deleted")q()}function A(n){if(n.repeat&&(n.key==="Enter"||n.key===" "))n.preventDefault()}function D(n){if(n.animationName==="sl-delete-lid-cycle")e.removeAttribute("data-delete-motion")}function E(){if(d.matches){u();e.removeAttribute("data-delete-motion")}}function C(){c++;const n=a;a=null;n?.abort()}e.type="button";e.removeAttribute("aria-pressed");e.removeAttribute("data-delete-motion");b(l);u();e.disabled=false;e.addEventListener("click",k);e.addEventListener("keydown",A);e.addEventListener("animationend",D);d.addEventListener("change",E);const S={get state(){return t?"destroyed":l},reset(){if(t)return;C();b("idle","Control reset. Click Delete to try again.");u()},destroy(){if(t)return;t=true;C();u();e.removeAttribute("data-delete-motion");e.disabled=true;e.setAttribute("aria-busy","false");e.removeEventListener("click",k);e.removeEventListener("keydown",A);e.removeEventListener("animationend",D);d.removeEventListener("change",E);s.delete(e)}};s.set(e,S);return S}return{mount:g}})()}function H(s,p={},{preview:g=false}={}){if(!s||typeof s.attachShadow!=="function")throw new TypeError("A DOM host is required");const e=s.shadowRoot||s.attachShadow({mode:"open"});e.innerHTML=z;const m=s.ownerDocument.createElement("style");const h=new URL("./instrument-sans-variable.woff2",import.meta.url).href;m.textContent=R.replaceAll("./instrument-sans-variable.woff2",h)+':host{display:block;min-width:0;max-width:100%;font-family:"Instrument Sans",sans-serif}[hidden]{display:none!important}';e.prepend(m);const r=e.querySelector(".sl-delete");if(!r){e.replaceChildren();throw new Error("Missing component root")}const f=M(s.ownerDocument,h);let d,l=false;try{const t=B(),a={};if(x==="upload")a.input=e.querySelector('input[type="file"]');if(["like","copy","download","bookmark","playback","delete","upload","share","follow"].includes(x))a.feedback=e.querySelector("."+x+"-feedback");if(g&&typeof t.mountPreview!=="function")throw new Error("This source has no preview adapter; supply its documented application callbacks.");d=(g?t.mountPreview:t.mount)(r,{...a,...p});if(typeof d?.destroy!=="function")throw new Error("Missing source cleanup contract")}catch(t){f();e.replaceChildren();throw t}return new Proxy(d,{get(t,a){if(a==="destroy")return()=>{if(l)return;l=true;try{t.destroy()}finally{f();e.replaceChildren()}};const c=Reflect.get(t,a,t);return typeof c==="function"?c.bind(t):c}})}export{H as mountInto,x as variant};
