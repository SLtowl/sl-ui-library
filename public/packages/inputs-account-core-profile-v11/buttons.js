(()=>{var X=`
.bk-button.bk-button{height:auto;min-height:48px;font:600 16px/22px 'Segoe UI',sans-serif;letter-spacing:0;max-width:100%;min-width:0}
.bk-surface.bk-surface{min-height:48px;padding:12px 16px;display:flex;align-items:center;justify-content:center;box-sizing:border-box}
.bk-label.bk-label{font:inherit;line-height:22px;white-space:normal;overflow-wrap:anywhere;text-align:center;min-width:0}
.bk-button.bk-button.bk-button--small{min-height:44px;font-size:15px;line-height:20px}
.bk-button--small .bk-surface.bk-surface{min-height:44px;padding:10px 12px}
.bk-button--small .bk-label.bk-label{font-size:15px;line-height:20px}
.bk-button--quiet .bk-surface.bk-surface{padding-inline:12px}
.bk-button.bk-button:disabled{opacity:.58}
`;var ee=`/* Matte buttons. Scoped styles and editable color and motion tokens. */

.button-kit {
  --unit: 1px;
  --ink: #222222;
  --secondary: #e4e3e0;
  --save-feedback: #3f3f3f;
  --primary-hover: #2e2e2e;
  --primary-foreground: #fafafa;
  --secondary-hover: #dcdcdc;
  --secondary-feedback: #cdcdcd;
  --secondary-foreground: var(--ink);
  --focus-ring: #5a5a5a;
  --motion-duration-short-2: 100ms;
  --motion-duration-short-3: 150ms;
  --motion-duration-short-4: 200ms;
  --motion-duration-medium-1: 250ms;
  --motion-duration-medium-2: 300ms;
  --motion-duration-medium-3: 350ms;
  --motion-easing-standard: cubic-bezier(0.2,0,0,1);
  --motion-easing-emphasized-decelerate: cubic-bezier(0.05,0.7,0.1,1);
  --motion-easing-ease-in-out-gentle: cubic-bezier(0.4,0,0.2,1);
  font-family: 'Instrument Sans', sans-serif;
  font-synthesis: none;
  -webkit-font-smoothing: antialiased;
  display: flex; flex-direction: column; align-items: center; gap: calc(20 * var(--unit));
}
.button-kit *, .button-kit *::before, .button-kit *::after { box-sizing: border-box; }
.bk-button {
  appearance: none;
  -webkit-tap-highlight-color: transparent;
  position: relative;
  display: block;
  border: 0;
  padding: 0;
  background: transparent;
  font: inherit;
  font-weight: 550;
  letter-spacing: -0.02em;
  cursor: pointer;
  touch-action: manipulation;
  user-select: none;
  border-radius: calc(13 * var(--unit));
  outline-offset: 6px;
}
.bk-button:focus-visible { outline: 2px solid var(--focus-ring); }
.bk-button--save {
  width: calc(220 * var(--unit));
  height: calc(52 * var(--unit));
  font-size: calc(19 * var(--unit));
  color: var(--primary-foreground);
}
.bk-button--cancel {
  width: calc(140 * var(--unit));
  height: calc(46 * var(--unit));
  font-size: calc(16 * var(--unit));
  color: var(--secondary-foreground);
}
.bk-surface {
  position: absolute;
  inset: 0;
  overflow: hidden;
  isolation: isolate;
  display: grid;
  place-items: center;
  border-radius: inherit;
  transition:
    transform var(--motion-duration-medium-3) var(--motion-easing-emphasized-decelerate),
    background-color var(--motion-duration-short-4) var(--motion-easing-standard),
    box-shadow var(--motion-duration-medium-2) var(--motion-easing-standard);
}
.bk-button--save .bk-surface {
  background-color: var(--secondary-foreground);
  background-image: linear-gradient(155deg, rgb(255 255 255 / 2.5%), transparent 68%);
  box-shadow: inset 0 1px 0 rgb(255 255 255 / 7%), 0 1px 2px rgb(0 0 0 / 5%);
}
.bk-button--cancel .bk-surface {
  background-color: var(--secondary);
  box-shadow: inset 0 1px 0 rgb(255 255 255 / 18%);
}
@media (hover: hover) {
  .bk-button:not([aria-disabled="true"]):hover .bk-surface { transform: translateY(-2px); }
  .bk-button--save:not([aria-disabled="true"]):hover .bk-surface {
    background-color: var(--primary-hover);
    box-shadow: inset 0 1px 0 rgb(255 255 255 / 9%), 0 6px 12px -8px rgb(0 0 0 / 28%);
  }
  .bk-button--cancel:hover .bk-surface { background-color: var(--secondary-hover); }
}
.bk-button:not([aria-disabled="true"]):active .bk-surface,
.bk-button.is-pressed .bk-surface {
  transform: translateY(1px) scale(0.98);
  transition-duration: var(--motion-duration-short-2);
  transition-timing-function: var(--motion-easing-standard);
}
.bk-button[aria-disabled="true"] { cursor: default; }
.bk-label {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.3em;
  line-height: 1.1;
  white-space: nowrap;
  opacity: 0;
  transition: opacity var(--motion-duration-short-3) var(--motion-easing-standard);
}
[data-state="idle"] .bk-label-idle,
[data-state="saving"] .bk-label-saving,
[data-state="saved"] .bk-label-saved,
[data-state="cancelled"] .bk-label-cancelled { opacity: 1; }
/* M3 fade-through: finish the outgoing label before revealing its replacement. */
.bk-button[data-state="idle"] .bk-label-idle,
.bk-button[data-state="saving"] .bk-label-saving,
.bk-button[data-state="saved"] .bk-label-saved,
.bk-button[data-state="cancelled"] .bk-label-cancelled {
  transition-duration: var(--motion-duration-short-4);
  transition-delay: var(--motion-duration-short-3);
}
/* A gentler, 600ms return after success; other state changes keep their timing. */
.bk-button--save[data-transition="return"] .bk-label-saved {
  transition-duration: var(--motion-duration-medium-1);
  transition-timing-function: var(--motion-easing-ease-in-out-gentle);
}
.bk-button--save[data-transition="return"] .bk-label-idle {
  transition-duration: var(--motion-duration-medium-3);
  transition-delay: var(--motion-duration-medium-1);
  transition-timing-function: var(--motion-easing-ease-in-out-gentle);
}
.bk-ellipsis { margin-left: -0.3em; }
.bk-progress {
  position: absolute;
  inset: 0;
  background: var(--save-feedback);
  transform: scaleX(0);
  transform-origin: left center;
}
.bk-wash { position: absolute; inset: 0; background: var(--secondary-feedback); opacity: 0; }
.bk-label-saved {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 0.24em;
}
.bk-label-saved .bk-check { justify-self: end; }
.bk-saved-text { grid-column: 2; }
.bk-check { width: 1em; height: 1em; flex: 0 0 auto; overflow: visible; }
.bk-check path {
  stroke: currentColor;
  stroke-width: 2.5;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 1;
  stroke-dashoffset: 0;
}
[data-state="saved"] .bk-check path {
  animation: bk-check-draw var(--motion-duration-medium-3) var(--motion-easing-standard) var(--motion-duration-short-2) backwards;
}
@keyframes bk-check-draw {
  from { stroke-dashoffset: 1; opacity: 0; }
  15% { opacity: 1; }
  to { stroke-dashoffset: 0; opacity: 1; }
}

.bk-sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; border: 0; }
@media (prefers-reduced-motion: reduce) {
  .bk-button .bk-surface, .bk-button .bk-label, .bk-check path { transition: none; }
  .bk-button[data-state] .bk-label { transition: none; }
  [data-state="saved"] .bk-check path { animation: none; }
  .bk-button .bk-surface, .bk-button:hover .bk-surface, .bk-button:active .bk-surface,
  .bk-button.is-pressed .bk-surface, .bk-button .bk-label { transform: none; }
  .bk-button:active .bk-surface { opacity: 0.88; }
  .bk-progress { display: none; }
}
@media (forced-colors: active) {
  .bk-surface { border: 1px solid ButtonText; }
  .bk-progress, .bk-wash { display: none; }
}

`,te=(()=>{let e={"short-2":100,"short-4":200,"medium-3":350,"medium-4":400,"long-4":600},t={linear:"cubic-bezier(0,0,1,1)","ease-in-out-gentle":"cubic-bezier(0.4,0,0.2,1)"},s=new WeakMap;function u(i,{onSave:d,onCancel:r=()=>{},previewDuration:a=0,confirmationMs:y=1400}={}){if(s.has(i))return s.get(i);let m=i.querySelector('[data-action="save"]'),g=i.querySelector('[data-action="cancel"]'),b=m?.querySelector(".bk-progress"),h=g?.querySelector(".bk-wash"),c=i.querySelector("[data-feedback]");if(m&&typeof d!="function")throw new TypeError("Pass your async onSave function.");let n=matchMedia("(prefers-reduced-motion: reduce)"),v=new AbortController,S=new Map,x=new Set,p,o,k,T,L,E=!1;function w(l,R,P){l&&(l===m&&l.dataset.state!==R&&(l.dataset.transition=l.dataset.state==="saved"&&R==="idle"?"return":"default"),l.dataset.state=R,l.setAttribute("aria-label",P))}function M(l){c&&(c.textContent=l)}function A(){m?.setAttribute("aria-disabled","false"),m?.setAttribute("aria-busy","false")}function f(l=!1){if(!b)return;let R=l&&!n.matches&&T?getComputedStyle(b):null,P=R?.transform||"none",$=R?Number(R.opacity):0,N=P==="none"?0:new DOMMatrixReadOnly(P).a;if(l&&!n.matches&&N>.001&&$>0){let D=b.cloneNode(!1);D.classList.add("bk-retiring"),D.style.transform=P,D.style.opacity=String($),b.before(D);let O=D.animate([{opacity:$},{opacity:0}],{duration:m.dataset.transition==="return"?e["long-4"]:e["medium-4"],easing:t["ease-in-out-gentle"],fill:"forwards"});S.set(D,O),O.onfinish=()=>{D.remove(),S.delete(D),O.cancel()}}if(T?.cancel(),T=null,!l||n.matches){for(let[D,O]of S)O.cancel(),D.remove();S.clear()}}async function C(){if(E||m.disabled||m.getAttribute("aria-disabled")==="true")return;clearTimeout(o),clearTimeout(k),L?.cancel(),w(g,"idle","Cancel"),f(!0);let l=new AbortController;if(p=l,w(m,"saving","Saving changes"),m.setAttribute("aria-disabled","true"),m.setAttribute("aria-busy","true"),M("Saving changes."),!n.matches&&a>e["short-4"]){let R=e["short-4"]/a;T=b.animate([{transform:"scaleX(0)",opacity:0},{transform:`scaleX(${R})`,opacity:1,offset:R},{transform:"scaleX(1)",opacity:1}],{duration:a,easing:t.linear,fill:"forwards"})}try{if(await d({signal:l.signal}),p!==l||l.signal.aborted)return;p=null,!T&&!n.matches&&(T=b.animate([{transform:"scaleX(1)",opacity:0},{transform:"scaleX(1)",opacity:1}],{duration:e["medium-3"],easing:t["ease-in-out-gentle"],fill:"forwards"})),w(m,"saved","Changes saved"),m.setAttribute("aria-busy","false"),M("Changes saved."),o=setTimeout(()=>{w(m,"idle","Save changes"),A(),f(!0)},y)}catch(R){if(p!==l)return;p=null,w(m,"idle","Save changes"),A(),f(!0),M(R?.name==="AbortError"?"Saving cancelled.":"Could not save. Please try again.")}}function q(){if(E||g.disabled||g.getAttribute("aria-disabled")==="true")return;let l=!!p;if(p?.abort(),p=null,clearTimeout(o),clearTimeout(k),w(m,"idle","Save changes"),A(),f(!0),w(g,"cancelled","Cancelled"),L?.cancel(),h&&!n.matches){L=h.animate([{opacity:0},{opacity:.35,offset:.5},{opacity:0}],{duration:e["medium-4"],easing:t["ease-in-out-gentle"]});let R=L;R.onfinish=()=>{L===R&&(L=null),R.cancel()}}M(l?"Saving cancelled.":"Cancelled."),k=setTimeout(()=>w(g,"idle","Cancel"),y),r({wasSaving:l})}m?.addEventListener("click",C,{signal:v.signal}),g?.addEventListener("click",q,{signal:v.signal});for(let l of[m,g].filter(Boolean))l.disabled=!1,l.addEventListener("keydown",R=>{if(R.key!=="Enter"||R.repeat||l.getAttribute("aria-disabled")==="true")return;l.classList.add("is-pressed");let P=setTimeout(()=>{l.classList.remove("is-pressed"),x.delete(P)},e["short-2"]);x.add(P)},{signal:v.signal}),l.addEventListener("blur",()=>l.classList.remove("is-pressed"),{signal:v.signal});n.addEventListener("change",()=>{n.matches&&(f(),L?.cancel())},{signal:v.signal});let _={destroy(){if(!E){E=!0,v.abort(),p?.abort(),p=null,clearTimeout(o),clearTimeout(k),x.forEach(clearTimeout),x.clear(),f(),L?.cancel();for(let l of[m,g].filter(Boolean))l.classList.remove("is-pressed"),l.disabled=!0;s.delete(i)}}};return s.set(i,_),_}return{mount:u}})(),H=`
.sl-field {
  --field-ink: #222222;
  --field-hover: #2e2e2e;
  --field-active: #3f3f3f;
  --field-text: #fafafa;
  --field-muted: #bbbbbb;
  --field-focus: #686868;
  --field-ease: cubic-bezier(.4, 0, .2, 1);
  position: relative;
  width: min(300px, 100%);
  color: var(--field-text);
  font-family: 'Instrument Sans', sans-serif;
  text-align: left;
}
.sl-field *, .sl-field *::before, .sl-field *::after { box-sizing: border-box; }
.sl-field [hidden] { display: none !important; }
.sl-field .sl-field__control { position: relative; height: 60px; border: 1px solid transparent; border-radius: 13px; background: var(--field-ink); box-shadow: inset 0 1px #ffffff12, 0 1px 2px #0000000d; transition: background-color 360ms ease, border-color 360ms ease, box-shadow 420ms var(--field-ease); }
.sl-field .sl-field__control:hover { background: var(--field-hover); }
.sl-field .sl-field__control:focus-within { border-color: #b0b0b0; box-shadow: 0 0 0 3px #5c5c5c24, inset 0 1px #ffffff12; }
.sl-field .sl-field__input { display: block; width: 100%; height: 100%; margin: 0; padding: 24px 16px 7px; border: 0; border-radius: inherit; outline: none; background: transparent; color: var(--field-text); caret-color: var(--field-text); font: 450 16px/1.25 'Instrument Sans', sans-serif; letter-spacing: -.01em; }
.sl-field .sl-field__input::placeholder { color: transparent; }
.sl-field .sl-field__input:focus-visible { outline: none; }
.sl-field .sl-field__label { position: absolute; top: 19px; left: 16px; max-width: calc(100% - 32px); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; pointer-events: none; color: var(--field-muted); font: 450 16px/20px 'Instrument Sans', sans-serif; letter-spacing: -.01em; transform-origin: left top; transition: transform 460ms var(--field-ease), color 360ms ease; }
.sl-field .sl-field__input:focus ~ .sl-field__label, .sl-field .sl-field__input:not(:placeholder-shown) ~ .sl-field__label { transform: translateY(-10px) scale(.8); color: #cecece; }
.sl-field .sl-field__input:disabled { opacity: .55; cursor: not-allowed; }
.sl-field .sl-field__helper { min-height: 36px; margin: 10px 2px 0; color: #5f5f5f; font: 400 12px/1.5 'Instrument Sans', sans-serif; transition: opacity 300ms ease; }
.sl-field .sl-field__action, .sl-field .sl-field__step { display: grid; place-items: center; flex: none; padding: 0; border: 0; border-radius: 8px; background: transparent; color: #d0d0d0; cursor: pointer; touch-action: manipulation; transition: background-color 180ms ease, color 180ms ease; }
.sl-field .sl-field__action { position: absolute; right: 7px; top: 11px; width: 36px; height: 36px; }
.sl-field .sl-field__action:hover, .sl-field .sl-field__step:hover { background: var(--field-active); color: var(--field-text); }
.sl-field .sl-field__action:focus-visible, .sl-field .sl-field__step:focus-visible { outline: 2px solid #dbdbdb; outline-offset: -2px; }
.sl-field .sl-field__action:disabled, .sl-field .sl-field__step:disabled { opacity: .35; background: transparent; cursor: not-allowed; }
.sl-field .sl-field__action svg, .sl-field .sl-field__step svg, .sl-field .sl-field__leading, .sl-field .sl-field__validation { display: block; width: 20px; height: 20px; fill: none; stroke: currentColor; stroke-width: 1.6; stroke-linecap: round; stroke-linejoin: round; }
.sl-field.sl-field--search .sl-field__input { padding-left: 52px; padding-right: 44px; }
.sl-field.sl-field--search .sl-field__label { left: 52px; max-width: calc(100% - 96px); }
.sl-field .sl-field__leading { position: absolute; top: 15px; left: 13px; width: 28px; height: 28px; stroke-width: 1.9; color: #e4e4e4; pointer-events: none; transform-origin: center; }
.sl-field.sl-field--search input::-webkit-search-cancel-button, .sl-field.sl-field--search input::-webkit-search-decoration { -webkit-appearance: none; }
.sl-field .sl-field__popup { position: absolute; z-index: 5; top: 68px; left: 0; right: 0; padding: 6px; border: 1px solid #575757; border-radius: 13px; background: var(--field-ink); box-shadow: 0 8px 20px #0000001f; opacity: 0; visibility: hidden; pointer-events: none; transform: translateY(-6px); transition: opacity 300ms ease, transform 420ms var(--field-ease), visibility 0s 420ms; }
.sl-field[data-search-open="true"] .sl-field__popup { opacity: 1; visibility: visible; pointer-events: auto; transform: translateY(0); transition-delay: 0s; }
.sl-field[data-search-open="true"] .sl-field__helper { opacity: 0; }
.sl-field .sl-field__options { list-style: none; margin: 0; padding: 0; }
.sl-field .sl-field__option { display: flex; align-items: center; min-height: 34px; padding: 7px 10px; border-radius: 7px; color: var(--field-text); font-size: 14px; line-height: 20px; cursor: pointer; }
.sl-field .sl-field__option:hover, .sl-field .sl-field__option[aria-selected="true"] { background: var(--field-active); }
.sl-field .sl-field__empty { margin: 0; padding: 9px 10px; color: #c8c8c8; font-size: 13px; line-height: 1.5; }
.sl-field.sl-field--email .sl-field__input, .sl-field.sl-field--password .sl-field__input { padding-right: 48px; }
.sl-field.sl-field--email .sl-field__label, .sl-field.sl-field--password .sl-field__label { max-width: calc(100% - 68px); }
.sl-field .sl-field__validation { position: absolute; top: 16px; right: 12px; width: 26px; height: 26px; border-radius: 50%; background: #ffffff09; stroke-width: 1.15; color: var(--field-text); opacity: 0; pointer-events: none; transition: opacity 300ms ease; }
.sl-field .sl-field__valid-icon, .sl-field .sl-field__invalid-icon { opacity: 0; transition: opacity 140ms ease; }
.sl-field .sl-field__invalid-icon { stroke-width: 1.05; }
.sl-field .sl-field__validation path { stroke-dasharray: 1; stroke-dashoffset: 1; transition: opacity 140ms ease, stroke-dashoffset 0s 140ms; }
.sl-field[data-validation="invalid"] .sl-field__validation, .sl-field[data-validation="valid"] .sl-field__validation { opacity: 1; }
.sl-field[data-validation="valid"] .sl-field__valid-icon, .sl-field[data-validation="invalid"] .sl-field__invalid-icon { opacity: 1; transition: opacity 220ms ease 140ms; }
.sl-field[data-validation="valid"] .sl-field__valid-icon { stroke-dashoffset: 0; transition: opacity 220ms ease 140ms, stroke-dashoffset 440ms var(--field-ease) 140ms; }
.sl-field[data-validation="invalid"] .sl-field__invalid-icon path { stroke-dashoffset: 0; transition: stroke-dashoffset 360ms var(--field-ease) 140ms; }
.sl-field[data-validation="invalid"] .sl-field__invalid-icon path + path { transition-delay: 240ms; }
.sl-field[data-validation="invalid"] .sl-field__control { border-color: #c5c5c5; }
.sl-field[data-validation="invalid"] .sl-field__helper { color: #3c3c3c; }
.sl-field.sl-field--password .sl-field__input { padding-right: 58px; }
.sl-field .sl-field__reveal { top: 7px; right: 5px; width: 44px; height: 44px; border-radius: 10px; }
.sl-field .sl-field__reveal svg { width: 32px; height: 24px; overflow: visible; stroke: currentColor; stroke-width: 1.35; }
.sl-field .sl-field__eyes-open, .sl-field .sl-field__eyes-closed { transform-box: fill-box; transform-origin: center; transition: opacity 220ms ease, transform 440ms var(--field-ease); }
.sl-field .sl-field__eyes-open { opacity: 0; transform: scaleY(.25); }
.sl-field .sl-field__eyes-open circle { fill: currentColor; stroke: none; transform-box: fill-box; transform-origin: center; transform: scale(.3); transition: transform 380ms var(--field-ease); }
.sl-field .sl-field__eyes-closed { opacity: 1; transform: scaleY(1); }
.sl-field[data-visible="true"] .sl-field__eyes-open { opacity: 1; transform: scaleY(1); transition-delay: 120ms, 0s; }
.sl-field[data-visible="true"] .sl-field__eyes-open circle { transform: scale(1); transition-delay: 180ms; }
.sl-field[data-visible="true"] .sl-field__eyes-closed { opacity: 0; transform: scaleY(.2); }
.sl-field.sl-field--number .sl-field__input { padding-right: 92px; appearance: textfield; -moz-appearance: textfield; }
.sl-field.sl-field--number .sl-field__input::-webkit-inner-spin-button, .sl-field.sl-field--number .sl-field__input::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
.sl-field.sl-field--number .sl-field__label { max-width: calc(100% - 108px); }
.sl-field .sl-field__steps { position: absolute; top: 11px; right: 7px; display: flex; gap: 2px; }
.sl-field .sl-field__step { width: 36px; height: 36px; }
@media (prefers-reduced-motion: reduce) {
  .sl-field *, .sl-field *::before, .sl-field *::after { transition: none !important; animation: none !important; }
  .sl-field .sl-field__popup { transform: none !important; }
}
@media (forced-colors: active) {
  .sl-field .sl-field__control, .sl-field .sl-field__popup { forced-color-adjust: none; background: Field !important; border-color: FieldText; color: FieldText; box-shadow: none; }
  .sl-field .sl-field__input, .sl-field .sl-field__label, .sl-field .sl-field__leading, .sl-field .sl-field__validation, .sl-field .sl-field__option, .sl-field .sl-field__action, .sl-field .sl-field__step, .sl-field .sl-field__empty { color: FieldText !important; caret-color: FieldText; }
  .sl-field .sl-field__control:focus-within { outline: 2px solid Highlight; outline-offset: 3px; }
  .sl-field .sl-field__option[aria-selected="true"], .sl-field .sl-field__option:hover, .sl-field .sl-field__action:hover, .sl-field .sl-field__step:hover { background: Highlight; color: HighlightText !important; }
  .sl-field .sl-field__helper { color: CanvasText; }
}

/* Draft input styles below this marker are not included in approved packages. */
.sl-field.sl-field--textarea .sl-field__control { height: 60px; min-height: 60px; max-height: 180px; transition: height 420ms var(--field-ease), background-color 360ms ease, border-color 360ms ease, box-shadow 420ms var(--field-ease); }
.sl-field.sl-field--textarea .sl-field__input { min-height: 0; padding: 30px 16px 24px; resize: none; overflow: hidden; line-height: 1.45; scrollbar-width: none; }
.sl-field.sl-field--textarea .sl-field__input::-webkit-scrollbar { display: none; width: 0; height: 0; }
.sl-field.sl-field--textarea .sl-field__label { top: 18px; }
.sl-field .sl-field__counter { position: absolute; right: 13px; bottom: 7px; display: flex; gap: 2px; color: #8f8f8f; font-size: 11px; line-height: 16px; font-variant-numeric: tabular-nums; pointer-events: none; }
.sl-field.sl-field--textarea .sl-field__input:focus ~ .sl-field__label, .sl-field.sl-field--textarea .sl-field__input:not(:placeholder-shown) ~ .sl-field__label { transform: translateY(-13px) scale(.76); }

.sl-field.sl-field--url .sl-field__input { padding-left: 50px; padding-right: 48px; }
.sl-field.sl-field--url .sl-field__label { left: 50px; max-width: calc(100% - 100px); }
.sl-field .sl-field__globe { top: 16px; left: 13px; width: 26px; height: 26px; overflow: visible; stroke-width: 1.35; }
.sl-field .sl-field__globe-axis { transform-box: fill-box; transform-origin: center; transition: transform 520ms var(--field-ease), opacity 320ms ease; }
.sl-field.sl-field--url[data-validation="valid"] .sl-field__globe { color: #f5f5f5; }
.sl-field.sl-field--url[data-validation="valid"] .sl-field__globe-axis { transform: scaleX(.92); }

.sl-field.sl-field--phone .sl-field__input { padding-left: 52px; }
.sl-field.sl-field--phone .sl-field__label { left: 52px; max-width: calc(100% - 70px); }
.sl-field .sl-field__phone { top: 15px; left: 12px; width: 29px; height: 29px; overflow: visible; stroke-width: 1.4; }
.sl-field .sl-field__phone-body { transform-box: fill-box; transform-origin: 54% 58%; }
.sl-field .sl-field__phone-ring { opacity: 0; stroke-dasharray: 1; stroke-dashoffset: 1; }
.sl-field[data-ringing="true"] .sl-field__phone-ring { opacity: 1; stroke-dashoffset: 0; transition: opacity 160ms ease, stroke-dashoffset 320ms var(--field-ease); }
.sl-field[data-ringing="true"] .sl-field__phone-ring--two { transition-delay: 90ms; }

.sl-field.sl-field--amount .sl-field__input { padding-left: 37px; padding-right: 58px; font-variant-numeric: tabular-nums; }
.sl-field.sl-field--amount .sl-field__label { left: 37px; max-width: calc(100% - 100px); }
.sl-field .sl-field__currency, .sl-field .sl-field__currency-code { position: absolute; z-index: 1; pointer-events: none; color: #d0d0d0; transition: transform 440ms var(--field-ease), color 300ms ease, opacity 300ms ease; }
.sl-field .sl-field__currency { top: 19px; left: 15px; font-size: 18px; font-weight: 520; line-height: 22px; }
.sl-field .sl-field__currency-code { top: 23px; right: 14px; font-size: 11px; line-height: 16px; letter-spacing: .04em; }
.sl-field.sl-field--amount .sl-field__control:focus-within .sl-field__currency { color: #f6f6f6; transform: translateX(-2px); }
.sl-field.sl-field--amount .sl-field__control:focus-within .sl-field__currency-code { color: #f6f6f6; transform: translateX(2px); }
.sl-field.sl-field--amount[data-amount-state="invalid"] .sl-field__control { border-color: #c5c5c5; }
.sl-field.sl-field--amount[data-amount-state="invalid"] .sl-field__helper { color: #3c3c3c; }

.sl-field.sl-field--code { width: min(300px, 100%); }
.sl-code__label { display: block; margin: 0 0 10px 2px; color: #5f5f5f; font: 500 12px/1.4 'Instrument Sans', sans-serif; }
.sl-code__control { position: relative; height: 46px; }
.sl-code__input { position: absolute; z-index: 2; inset: 0; width: 100%; height: 100%; padding: 0; border: 0; outline: 0; opacity: 0; cursor: text; caret-color: transparent; }
.sl-code__cells { position: absolute; inset: 0; display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); gap: 7px; pointer-events: none; }
.sl-code__cells span { display: grid; place-items: center; min-width: 0; border: 1px solid transparent; border-radius: 11px; color: #f9f9f9; background: var(--field-ink); box-shadow: inset 0 1px #ffffff12, 0 1px 2px #0000000d; font: 600 18px/1 'Instrument Sans', sans-serif; font-variant-numeric: tabular-nums; transition: border-color 300ms ease, background-color 300ms ease, box-shadow 380ms var(--field-ease), transform 380ms var(--field-ease); }
.sl-code__input:focus-visible + .sl-code__cells span.is-active { border-color: #b0b0b0; background: var(--field-hover); box-shadow: 0 0 0 3px #5c5c5c24, inset 0 1px #ffffff12; transform: translateY(-2px); }
.sl-field[data-result="success"] .sl-code__cells span { color: #eaf8ef; border-color: #4f8d72; background: #234b3a; box-shadow: inset 0 1px #ffffff17, 0 0 0 2px #4f8d7218; transform: translateY(-2px); }
.sl-field[data-result="error"] .sl-code__cells span { color: #fff0f0; border-color: #a85e63; background: #543134; box-shadow: inset 0 1px #ffffff12, 0 0 0 2px #a85e6315; transform: translateY(1px); }
.sl-field[data-result]:not([data-result="neutral"]) .sl-code__cells span:nth-child(1) { transition-delay: 0ms; }
.sl-field[data-result]:not([data-result="neutral"]) .sl-code__cells span:nth-child(2) { transition-delay: 80ms; }
.sl-field[data-result]:not([data-result="neutral"]) .sl-code__cells span:nth-child(3) { transition-delay: 160ms; }
.sl-field[data-result]:not([data-result="neutral"]) .sl-code__cells span:nth-child(4) { transition-delay: 240ms; }
.sl-field[data-result]:not([data-result="neutral"]) .sl-code__cells span:nth-child(5) { transition-delay: 320ms; }
.sl-field[data-result]:not([data-result="neutral"]) .sl-code__cells span:nth-child(6) { transition-delay: 400ms; }

@media (max-width: 420px) {
  .sl-code__cells { gap: 5px; }
}
@media (prefers-reduced-motion: reduce) {
  .sl-field .sl-field__counter, .sl-field .sl-field__phone-ring, .sl-field .sl-code__cells span { transition: none !important; animation: none !important; transform: none !important; }
}
@media (forced-colors: active) {
  .sl-field .sl-code__cells span { forced-color-adjust: none; background: Field; border-color: FieldText; color: FieldText; box-shadow: none; }
  .sl-field .sl-code__input:focus-visible + .sl-code__cells span.is-active { outline: 2px solid Highlight; outline-offset: 2px; }
}
`,ne=(()=>{let e=new WeakMap,t=0;function s(i,d,r=()=>({})){if(e.has(i))return e.get(i);let a=i?.querySelector("input, textarea"),y=a?.tagName==="TEXTAREA"?"textarea":a?.type;if(!a||y!==d)throw new TypeError(`A native ${d} control is required.`);let m=i.ownerDocument,g=m.defaultView,b=new g.AbortController,h=[],c=[],n=!1,v=(p,o,k,T={})=>p.addEventListener(o,k,{...T,signal:b.signal}),S=r({root:i,input:a,doc:m,view:g,on:v,resets:h,cleanups:c,alive:()=>!n});a.form&&v(a.form,"reset",p=>queueMicrotask(()=>{!n&&!p.defaultPrevented&&h.forEach(o=>o())}));let x={reset(){n||(a.value=a.defaultValue,h.forEach(p=>p()))},destroy(){n||(n=!0,b.abort(),c.forEach(p=>p()),e.delete(i))}};return Object.defineProperties(x,Object.getOwnPropertyDescriptors(S)),e.set(i,x),x}function u(i){return s(i,"text")}return{mount:u}})(),ae=(()=>{let e=new WeakMap,t=0;function s(i,d,r=()=>({})){if(e.has(i))return e.get(i);let a=i?.querySelector("input, textarea"),y=a?.tagName==="TEXTAREA"?"textarea":a?.type;if(!a||y!==d)throw new TypeError(`A native ${d} control is required.`);let m=i.ownerDocument,g=m.defaultView,b=new g.AbortController,h=[],c=[],n=!1,v=(p,o,k,T={})=>p.addEventListener(o,k,{...T,signal:b.signal}),S=r({root:i,input:a,doc:m,view:g,on:v,resets:h,cleanups:c,alive:()=>!n});a.form&&v(a.form,"reset",p=>queueMicrotask(()=>{!n&&!p.defaultPrevented&&h.forEach(o=>o())}));let x={reset(){n||(a.value=a.defaultValue,h.forEach(p=>p()))},destroy(){n||(n=!0,b.abort(),c.forEach(p=>p()),e.delete(i))}};return Object.defineProperties(x,Object.getOwnPropertyDescriptors(S)),e.set(i,x),x}function u(i){return s(i,"textarea",({input:d,root:r,view:a,on:y,resets:m,cleanups:g})=>{let b=r.querySelector(".sl-field__control"),h=r.querySelector("[data-count]"),c=r.querySelector(".sl-field__helper");if(!b||!h||!c)throw new TypeError("Textarea needs a control, counter and helper.");let n=c.textContent,v=d.maxLength>0?d.maxLength:null;function S(){d.style.height="0px";let p=d.scrollHeight,o=d.value?Math.max(60,Math.min(180,p)):60;d.style.height="100%",d.style.overflowY=p>180?"auto":"hidden",b.style.height=`${o}px`}function x(){let p=[...d.value].length;h.textContent=String(p),c.textContent=v&&p>=v?`Character limit reached: ${v}.`:n,S()}return y(d,"input",p=>{p.isComposing||x()}),y(d,"compositionend",()=>x()),y(a,"resize",S),m.push(x),g.push(()=>{b.style.removeProperty("height"),d.style.removeProperty("height"),d.style.removeProperty("overflow-y")}),x(),{get length(){return[...d.value].length}}})}return{mount:u}})(),ie=(()=>{let e=new WeakMap,t=0;function s(i,d,r=()=>({})){if(e.has(i))return e.get(i);let a=i?.querySelector("input, textarea"),y=a?.tagName==="TEXTAREA"?"textarea":a?.type;if(!a||y!==d)throw new TypeError(`A native ${d} control is required.`);let m=i.ownerDocument,g=m.defaultView,b=new g.AbortController,h=[],c=[],n=!1,v=(p,o,k,T={})=>p.addEventListener(o,k,{...T,signal:b.signal}),S=r({root:i,input:a,doc:m,view:g,on:v,resets:h,cleanups:c,alive:()=>!n});a.form&&v(a.form,"reset",p=>queueMicrotask(()=>{!n&&!p.defaultPrevented&&h.forEach(o=>o())}));let x={reset(){n||(a.value=a.defaultValue,h.forEach(p=>p()))},destroy(){n||(n=!0,b.abort(),c.forEach(p=>p()),e.delete(i))}};return Object.defineProperties(x,Object.getOwnPropertyDescriptors(S)),e.set(i,x),x}function u(i){return s(i,"password",({root:d,input:r,doc:a,on:y,resets:m,cleanups:g,alive:b})=>{let h=d.querySelector(".sl-field__reveal");if(!h)throw new TypeError("Password needs its reveal button.");let c=!1;function n(v){if(!b())return;let S=a.activeElement===r||d.getRootNode().activeElement===r,x=r.selectionStart,p=r.selectionEnd,o=r.selectionDirection,k=r.scrollLeft;c=!!v,r.type=c?"text":"password",d.dataset.visible=String(c),h.setAttribute("aria-pressed",String(c)),h.setAttribute("aria-label",c?"Hide password":"Show password"),S&&r.focus({preventScroll:!0}),x!==null&&p!==null&&r.setSelectionRange(x,p,o),r.scrollLeft=k}return y(h,"pointerdown",v=>{v.button===0&&(a.activeElement===r||d.getRootNode().activeElement===r)&&v.preventDefault()}),y(h,"click",()=>{r.disabled||n(!c)}),h.disabled=r.disabled,m.push(()=>n(!1)),g.push(()=>{c=!1,r.type="password",d.dataset.visible="false",h.setAttribute("aria-pressed","false"),h.setAttribute("aria-label","Show password"),h.disabled=!0}),{setVisible:n,get isVisible(){return c}}})}return{mount:u}})(),se=H.replace(/^\.sl-field\.sl-field--code \{ width: min\(300px, 100%\); \}\n/m,""),oe=(()=>{let e=new WeakMap,t=0;function s(i,d,r=()=>({})){if(e.has(i))return e.get(i);let a=i?.querySelector("input, textarea"),y=a?.tagName==="TEXTAREA"?"textarea":a?.type;if(!a||y!==d)throw new TypeError(`A native ${d} control is required.`);let m=i.ownerDocument,g=m.defaultView,b=new g.AbortController,h=[],c=[],n=!1,v=(p,o,k,T={})=>p.addEventListener(o,k,{...T,signal:b.signal}),S=r({root:i,input:a,doc:m,view:g,on:v,resets:h,cleanups:c,alive:()=>!n});a.form&&v(a.form,"reset",p=>queueMicrotask(()=>{!n&&!p.defaultPrevented&&h.forEach(o=>o())}));let x={reset(){n||(a.value=a.defaultValue,h.forEach(p=>p()))},destroy(){n||(n=!0,b.abort(),c.forEach(p=>p()),e.delete(i))}};return Object.defineProperties(x,Object.getOwnPropertyDescriptors(S)),e.set(i,x),x}function u(i,{expectedCode:d="482731"}={}){if(!/^\d{6}$/.test(d))throw new TypeError("Expected code must contain exactly six digits.");return s(i,"text",({root:r,input:a,view:y,on:m,resets:g,cleanups:b})=>{let h=r.querySelector(".sl-code__cells"),c=r.querySelector(".sl-code__control"),n=[...r.querySelectorAll(".sl-code__cells span")],v=r.querySelector(".sl-field__helper");if(!h||!c||n.length!==6||!v)throw new TypeError("Verification code needs six cells and a helper.");let S=v.textContent,x=y.matchMedia("(prefers-reduced-motion: reduce)"),p=new Map,o=new Set,k=null,T=0,L="";function E(){p.forEach(q=>q.cancel()),p.clear()}function w(){o.forEach(q=>q.cancel()),o.clear(),k?.cancel(),k=null}function M(){E(),w()}function A(q){p.get(q)?.cancel();let _=q.animate([{transform:"translateY(3px) scale(.9)",opacity:.55},{transform:"translateY(0) scale(1)",opacity:1}],{duration:300,easing:"cubic-bezier(.2,.7,.25,1)"});p.set(q,_),_.onfinish=()=>{p.get(q)===_&&(_.cancel(),p.delete(q))}}function f(q){if(M(),r.dataset.result=q?"success":"error",x.matches)return;let _=q?{color:"#eaf8ef",borderColor:"#4f8d72",backgroundColor:"#234b3a",boxShadow:"inset 0 1px rgba(255,255,255,.09), 0 0 0 2px rgba(79,141,114,.09)",transform:"translateY(-2px)"}:{color:"#fff0f0",borderColor:"#a85e63",backgroundColor:"#543134",boxShadow:"inset 0 1px rgba(255,255,255,.07), 0 0 0 2px rgba(168,94,99,.08)",transform:"translateY(1px)"};n.forEach((l,R)=>{let P=l.animate([{color:"#f9f9f9",borderColor:"rgba(0,0,0,0)",backgroundColor:"#222222",boxShadow:"inset 0 1px rgba(255,255,255,.07), 0 1px 2px rgba(0,0,0,.05)",transform:"translateY(0)"},_],{duration:360,delay:R*95,easing:"cubic-bezier(.4,0,.2,1)",fill:"both"});o.add(P),R===n.length-1&&(P.onfinish=()=>{if(!o.has(P))return;o.forEach(N=>N.cancel()),o.clear(),k=h.animate([{transform:"scale(1)"},{transform:"scale(1.018)",offset:.45},{transform:"scale(1)"}],{duration:340,easing:"cubic-bezier(.2,.7,.25,1)"});let $=k;$.onfinish=()=>{k===$&&($.cancel(),k=null)}})})}function C(q=!0){let _=a.value.replace(/\D/g,"").slice(0,n.length);a.value!==_&&(a.value=_);let l=a.matches(":focus");n.forEach(($,N)=>{$.textContent=_[N]||"",$.classList.toggle("is-filled",N<_.length),$.classList.toggle("is-active",l&&N===Math.min(_.length,n.length-1)&&_.length<n.length)}),r.dataset.length=String(_.length),r.dataset.complete=String(_.length===n.length);let R=_.length===n.length,P=R&&_===d;R?_!==L&&(q?f(P):(M(),r.dataset.result=P?"success":"error")):(r.dataset.result!=="neutral"&&M(),r.dataset.result="neutral"),a.setCustomValidity(R&&!P?"Code does not match.":""),R?a.setAttribute("aria-invalid",String(!P)):a.removeAttribute("aria-invalid"),v.textContent=_.length===0?S:R?P?"Code accepted.":`Code does not match. Try ${d}.`:`${_.length} of ${n.length} digits entered.`,q&&!R&&_.length>T&&!x.matches&&A(n[_.length-1]),R&&_!==L&&a.dispatchEvent(new y.CustomEvent("codecomplete",{bubbles:!0,composed:!0,detail:{code:_,valid:P}})),L=_,T=_.length}return m(a,"input",q=>{q.isComposing||C()}),m(a,"compositionend",()=>C()),m(a,"focus",()=>C(!1)),m(a,"blur",()=>C(!1)),m(x,"change",()=>{x.matches&&M()}),g.push(()=>{M(),T=0,L="",C(!1)}),b.push(M),C(!1),{validate:()=>(C(!1),a.value===d),get code(){return a.value},get complete(){return a.value.length===n.length}}})}return{mount:u}})(),F={pair:{markup:`<div class="button-kit">
<button class="bk-button bk-button--save" data-action="save" type="button" data-state="idle" disabled>
        <span class="bk-surface" aria-hidden="true">
          <span class="bk-progress"></span>
          <span class="bk-label bk-label-idle">Save changes</span>
          <span class="bk-label bk-label-saving">Saving<span class="bk-ellipsis">\u2026</span></span>
          <span class="bk-label bk-label-saved">
            <svg class="bk-check" viewBox="0 0 24 24" fill="none" focusable="false"><path d="M4 12.5 9.2 17.5 20 6.5" pathLength="1"/></svg>
            <span class="bk-saved-text">Saved</span>
          </span>
        </span>
        <span class="bk-sr-only">Save changes</span>
      </button>
<button class="bk-button bk-button--cancel" data-action="cancel" type="button" data-state="idle" disabled>
        <span class="bk-surface" aria-hidden="true">
          <span class="bk-wash"></span>
          <span class="bk-label bk-label-idle">Cancel</span>
          <span class="bk-label bk-label-cancelled">Cancelled</span>
        </span>
        <span class="bk-sr-only">Cancel</span>
      </button>
    <span class="bk-sr-only" data-feedback role="status" aria-live="polite" aria-atomic="true"></span>
  </div>`,css:ee,mount:te.mount},"text-input":{markup:`<div class="sl-field" id="text-field">
            <div class="sl-field__control"><input class="sl-field__input" id="demo-text" type="text" placeholder=" " autocomplete="off" aria-describedby="text-help"><label class="sl-field__label" for="demo-text">Project name</label></div>
            <p class="sl-field__helper" id="text-help">Try a name for your next project.</p>
          </div>`,css:H,mount:ne.mount},"textarea-input":{markup:`<div class="sl-field sl-field--textarea" id="textarea-field">
            <div class="sl-field__control">
              <textarea class="sl-field__input" id="demo-textarea" placeholder=" " maxlength="180" rows="1" aria-describedby="textarea-help"></textarea>
              <label class="sl-field__label" for="demo-textarea">Project notes</label>
              <span class="sl-field__counter" aria-hidden="true"><span data-count>0</span><span>/180</span></span>
            </div>
            <p class="sl-field__helper" id="textarea-help" role="status" aria-live="polite">Add a short note for your team.</p>
          </div>`,css:H,mount:ae.mount},"password-input":{markup:`<div class="sl-field sl-field--password" id="password-field" data-visible="false">
            <div class="sl-field__control">
              <input class="sl-field__input" id="demo-password" type="password" placeholder=" " value="sample-word" autocomplete="off" spellcheck="false" autocapitalize="off" data-1p-ignore data-lpignore="true" data-bwignore aria-describedby="password-help">
              <label class="sl-field__label" for="demo-password">Demo password</label>
              <button class="sl-field__action sl-field__reveal" type="button" aria-label="Show password" aria-pressed="false" aria-controls="demo-password">
                <svg class="sl-field__eyes" viewBox="0 0 32 24" fill="none" aria-hidden="true">
                  <g class="sl-field__eyes-open">
                    <path d="M2.5 12s2.2-3.5 6-3.5 6 3.5 6 3.5-2.2 3.5-6 3.5-6-3.5-6-3.5Zm15 0s2.2-3.5 6-3.5 6 3.5 6 3.5-2.2 3.5-6 3.5-6-3.5-6-3.5Z"/>
                    <circle cx="8.5" cy="12" r="1.5"/><circle cx="23.5" cy="12" r="1.5"/>
                  </g>
                  <g class="sl-field__eyes-closed">
                    <path d="M2.5 12.5c1.7 2.7 4 3.7 6 3.7s4.3-1 6-3.7M17.5 12.5c1.7 2.7 4 3.7 6 3.7s4.3-1 6-3.7"/>
                  </g>
                </svg>
              </button>
            </div>
            <p class="sl-field__helper" id="password-help">Sample text only. There is no sign-in.</p>
          </div>`,css:H,mount:ie.mount},"code-input":{markup:`<div class="sl-field sl-field--code" id="code-field" data-length="0" data-complete="false" data-result="neutral">
            <label class="sl-code__label" for="demo-code">Verification code</label>
            <div class="sl-code__control">
              <input class="sl-code__input" id="demo-code" type="text" inputmode="numeric" autocomplete="one-time-code" data-code-length="6" pattern="[0-9]{6}" aria-describedby="code-help">
              <div class="sl-code__cells" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span><span></span></div>
            </div>
            <p class="sl-field__helper" id="code-help" role="status" aria-live="polite">Enter 482731 to see the accepted state.</p>
          </div>`,css:se,mount:oe.mount}};var V={duration:{short2:{$type:"duration",$value:"100ms"},short4:{$type:"duration",$value:"200ms"},medium2:{$type:"duration",$value:"300ms"}},easing:{settle:{$type:"cubicBezier",$value:[.22,1,.36,1]}}};var B=new WeakMap;function z(e,t="",s=""){let u=document.createElement(e);return u.className=t,u.textContent=s,u}function U(e){let t={user:"M16 7A4 4 0 1 1 8 7A4 4 0 1 1 16 7M4 21V19A8 8 0 0 1 20 19V21",shield:"M12 3L20 6V12C20 17 16 20 12 22C8 20 4 17 4 12V6ZM9 12L12 15L16 10",laptop:"M4 4H20V16H4ZM2 20H22M9 16L8 20M15 16L16 20",phone:"M7 2H17V22H7ZM11 18H13",key:"M13 8A5 5 0 1 1 3 8A5 5 0 1 1 13 8M13 8H22M18 8V12M21 8V11",link:"M9 15L15 9M8 12L6 14A4 4 0 0 0 12 20L15 17M16 12L18 10A4 4 0 0 0 12 4L9 7",mail:"M3 5H21V19H3ZM3 5L12 13L21 5",pin:"M19 10C19 15 12 22 12 22S5 15 5 10A7 7 0 1 1 19 10ZM15 10A3 3 0 1 1 9 10A3 3 0 1 1 15 10",right:"M5 12H19M14 7L19 12L14 17",close:"M6 6L18 18M18 6L6 18",plus:"M5 12H19M12 5V19",edit:"M4 20L5 15L17 3L21 7L9 19ZM14 6L18 10",eye:"M2 12Q12 1 22 12Q12 23 2 12ZM15 12A3 3 0 1 1 9 12A3 3 0 1 1 15 12",undo:"M5 10H14A5 5 0 0 1 14 20M5 10L10 5M5 10L10 15"},s=document.createElementNS("http://www.w3.org/2000/svg","svg");s.setAttribute("viewBox","0 0 24 24"),s.setAttribute("aria-hidden","true");let u=document.createElementNS(s.namespaceURI,"path");return u.setAttribute("d",t[e]||t.user),s.append(u),s}function W(e,{key:t,renderers:s,...u}){if(!s[t])throw new TypeError("Unknown account workflow");B.get(e)?.destroy();let i,d=[],r=null,a=()=>({}),y=!1,m=matchMedia("(prefers-reduced-motion:reduce)"),g=()=>{let o=e.getRootNode().activeElement;return o===e||e.contains(o)},b=!1,h=!0;function c(o,k){o?.isConnected&&(!b||h&&g())&&o.focus(k)}function n(o){o.parked&&requestAnimationFrame(()=>{let k=o.button;!y&&!r&&e.isConnected&&e.getRootNode().activeElement===e&&k?.isConnected&&!k.disabled&&!k.closest("[inert]")&&k.checkVisibility({checkVisibilityCSS:!0})&&k.focus({preventScroll:!0})})}function v(){if(!r)return;let o=r;r=null,o.abort.abort(),o.button?.removeAttribute("aria-busy"),o.button&&(o.button.disabled=o.wasDisabled),e.removeAttribute("aria-busy"),n(o)}function S(){v(),i?.abort(),d.forEach(o=>o()),d=[]}function x(){S(),i=new AbortController,e.replaceChildren(),e.className="account-control",e.dataset.kind=t,e.tabIndex=-1,e.setAttribute("role","group"),e.style.setProperty("--ac-fast",V.duration.short4.$value),e.style.setProperty("--ac-duration",V.duration.medium2.$value),e.style.setProperty("--ac-ease",`cubic-bezier(${V.easing.settle.$value.join(",")})`);let o=null,k=(E,w,M,A={})=>E.addEventListener(w,M,{...A,signal:o?AbortSignal.any([i.signal,o.signal]):i.signal}),T=z("p","ac-status",u.demo?"Local example. Changes are not sent to a server.":"Connect your application action handler to apply changes.");T.setAttribute("role","status"),T.setAttribute("aria-atomic","true");let L={root:e,options:u,el:z,glyph:U,on:k,reduced:m,focus:c,signal:i.signal,cleanup:E=>d.push(E),say(E){T.textContent=E},emit(E){let w=structuredClone(E);u.onChange?.(w),e.dispatchEvent(new CustomEvent("sl:change",{bubbles:!0,detail:structuredClone(w)}))},title(E,w,M="user"){e.setAttribute("aria-label",E);let A=z("div","ac-heading"),f=z("span","ac-mark");f.append(U(M)),A.append(f,z("h2","ac-title",E)),e.append(A,z("p","ac-hint ac-intro",w))},button(E,w,M="primary"){let A=z("span","ac-action"),f=A.attachShadow({mode:"open"}),C=z("style");C.textContent=F.pair.css+":host{--sl-input-action:1;display:inline-flex;min-width:0;max-width:100%;font-family:'Segoe UI',sans-serif}.button-kit{--focus-ring:#eee;font-family:'Segoe UI',sans-serif;display:block;min-width:0;width:100%}.bk-button{width:auto;max-width:100%;height:44px;font:500 16px/1.4 'Segoe UI',sans-serif;letter-spacing:0;min-width:0;border-radius:11px;outline-offset:3px}.bk-surface{position:relative;min-height:44px;padding:10px 16px;color:#f4f4f4}.bk-label{position:relative;inset:auto;white-space:normal;overflow-wrap:anywhere;opacity:1;transition:none;gap:8px}.bk-button--cancel .bk-surface{background:#3c3c3c;color:#ddd}.bk-button--cancel:hover .bk-surface{background:#474747}.bk-button:disabled{opacity:.4;cursor:default}.bk-button:disabled .bk-surface,.bk-button[aria-busy=true] .bk-surface{transform:none!important}.bk-surface:before,.bk-surface:after{display:none}.bk-button[aria-busy=true]{cursor:progress}.bk-button--quiet .bk-surface{background:transparent;box-shadow:none;color:#c6c6c6;padding-inline:8px}.bk-button--small{font-size:14px;height:36px;border-radius:8px}.bk-button--small .bk-surface{min-height:36px;padding:7px 10px}.bk-button svg{width:17px;height:17px;fill:none;stroke:currentColor;stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round}.bk-button:focus-visible{outline:2px solid #eee}@media(prefers-reduced-motion:reduce){*{transition:none!important;animation:none!important}}",C.textContent+=X;let q=z("span","button-kit"),_=z("button",`bk-button bk-button--${M==="primary"?"save":M==="quiet"?"quiet":"cancel"} ${M==="small"?"bk-button--small":""}`),l=z("span","bk-surface"),R=z("span","bk-label",E);return _.type="button",l.append(R),_.append(l),q.append(_),f.append(C,q),k(_,"click",w),_.view=A,_.label=R,_},actions(...E){let w=z("div","ac-actions");return w.append(...E.map(M=>M.view||M)),w},field(E,w="",M="text-input"){let A=F[M];if(!A)throw new Error(`Unknown field ${M}`);let f=z("div","ac-source"),C=f.attachShadow({mode:"open"});C.innerHTML=A.markup;let q=z("style");q.textContent=A.css+":host{display:block;min-width:0}.sl-field{width:100%;max-width:none;--field-ink:#222;--field-hover:#2c2c2c;--field-focus:#dedede;font-family:'Segoe UI',sans-serif;font-synthesis:none}.sl-field input,.sl-field textarea,.sl-field label,.sl-field button,.sl-code__label{font-family:'Segoe UI',sans-serif!important}.sl-field__input{font-size:16px!important}.sl-field__label{font-size:16px}.sl-field__helper,.sl-field__counter{display:none!important}.sl-field__control{margin:0}.sl-field.sl-field--textarea .sl-field__control{max-height:none}.sl-field textarea{resize:none;overflow:hidden!important}.sl-code__label{font-size:13px;color:#c6c6c6}.sl-code__control{margin-top:8px}.sl-field__reveal:focus-visible{outline-color:#eee}@media(prefers-reduced-motion:reduce){*{transition:none!important;animation:none!important}}",C.prepend(q);let _=C.querySelector(A.rootSelector||".sl-field"),l=C.querySelector("input,textarea"),R=C.querySelector(".sl-field__label,.sl-code__label");R.textContent=E,l.setAttribute("aria-label",E),l.removeAttribute("aria-describedby"),l.removeAttribute("required"),l.removeAttribute("maxlength"),l.value=w,l.defaultValue=w,l.autocomplete=M==="password-input"?"off":l.autocomplete;let P;if(M==="code-input"){let N=[...C.querySelectorAll(".sl-code__cells span")],D=()=>{l.value=l.value.replace(/\D/g,"").slice(0,6),_.dataset.result="neutral",_.dataset.length=String(l.value.length),_.dataset.complete=String(l.value.length===6),N.forEach((O,Y)=>{O.textContent=l.value[Y]||"",O.classList.toggle("is-filled",Y<l.value.length),O.classList.toggle("is-active",C.activeElement===l&&Y===Math.min(5,l.value.length))})};for(let O of["input","compositionend","focus","blur"])k(l,O,D);D(),P={reset(){l.value="",D()},destroy(){l.value="",N.forEach(O=>O.textContent="")}}}else P=A.mount(_);d.push(()=>{M==="password-input"&&(l.value=""),P.destroy()});let $=C.querySelector(".sl-field__reveal");if($){let N=()=>$.setAttribute("aria-label",P.isVisible?"Hide password":"Show password");N(),k($,"click",N)}if(l.tagName==="TEXTAREA"){let N=C.querySelector(".sl-field__control"),D=0,O=()=>{if(!f.getBoundingClientRect().width)return;l.style.height="0px";let I=Math.max(76,l.scrollHeight+2);l.style.height="100%",N.style.height=I+"px"};k(l,"input",O),k(l,"compositionend",O),k(window,"resize",O);let Y=new ResizeObserver(()=>{let I=f.getBoundingClientRect().width;I!==D&&(D=I,O())});Y.observe(f),d.push(()=>Y.disconnect())}return{node:f,input:l,control:P}},listRow(E,w,M="key"){let A=z("div","ac-row"),f=z("span","ac-row-icon"),C=z("div","ac-row-copy"),q=z("strong","ac-row-name",E),_=z("span","ac-hint",w);return f.append(U(M)),C.append(q,_),A.append(f,C),{node:A,copy:C,name:q,caption:_}},list(E,{animateInsert:w=!1}={}){let M=new Map,A=!1;return d.push(()=>{for(let f of M.values())f.scope?.abort(),clearTimeout(f.timer)}),(f,C)=>{let q=new Set(f.map(_=>_.id));for(let[_,l]of M)if(!q.has(_)&&l.node.dataset.removed!=="true"){l.node.dataset.removed="true",l.node.inert=!0,l.node.setAttribute("aria-hidden","true"),l.scope?.abort();let R=()=>{l.node.dataset.removed==="true"&&(l.node.remove(),M.delete(_))};m.matches?R():l.timer=setTimeout(R,parseFloat(V.duration.medium2.$value))}for(let _ of f){let l=M.get(_.id),R=!l;if(!l){let $=z("div","ac-list-slot"),N=z("div","ac-list-slot-inner");$.dataset.id=_.id,$.append(N),l={node:$,inner:N},M.set(_.id,l),E.append($)}clearTimeout(l.timer),l.node.dataset.removed="false",l.node.inert=!1,l.node.removeAttribute("aria-hidden");let P=JSON.stringify(_);if(l.fingerprint!==P||!l.scope||l.scope.signal.aborted){l.scope?.abort(),l.scope=new AbortController;let $=o;o=l.scope;try{l.inner.replaceChildren(C(_)),l.fingerprint=P}finally{o=$}}R&&A&&w&&!m.matches&&(l.node.dataset.entering="true",l.node.getBoundingClientRect(),delete l.node.dataset.entering)}A=!0}},panels(E){let w=z("div","ac-panels"),M=0;return E.forEach((A,f)=>{A.classList.add("ac-pane"),A.dataset.active=String(f===0),A.inert=f!==0,A.setAttribute("aria-hidden",String(f!==0)),w.append(A)}),{node:w,select(A){A!==M&&(M=A,E.forEach((f,C)=>{f.dataset.active=String(C===A),f.inert=C!==A,f.setAttribute("aria-hidden",String(C!==A))}))}}},reveal(E){let w=z("div","ac-reveal"),M=z("div","ac-reveal-inner");return M.append(E),w.append(M),w.dataset.open="false",w.inert=!0,w.setAttribute("aria-hidden","true"),{node:w,set(A){w.dataset.open=String(A),w.inert=!A,w.setAttribute("aria-hidden",String(!A))}}},toggle(E,w,M){let A=z("label","ac-switch"),f=z("input"),C=z("span","ac-switch-track");return f.type="checkbox",f.checked=w,A.append(z("span","",E),f,C),k(f,"change",()=>M(f.checked)),{node:A,input:f}},async run(E,w,M,A){if(r||y)return!1;if(!u.demo&&typeof u.onAction!="function")return L.say("Connect an action handler. Data has not changed."),!1;let f={abort:new AbortController,button:A,wasDisabled:A?.disabled};r=f,A?.getRootNode().activeElement===A&&(e.focus({preventScroll:!0}),f.parked=e.getRootNode().activeElement===e),e.setAttribute("aria-busy","true"),A&&(A.disabled=!0,A.setAttribute("aria-busy","true")),L.say("Processing action\u2026 You can cancel.");try{let C=u.demo?{demo:!0}:await u.onAction({type:E,payload:w},{signal:f.abort.signal});if(r!==f||f.abort.signal.aborted)return!1;if(C===!1)throw new Error("Action rejected");h=g(),b=!0;try{M(C)}finally{b=!1}return L.say(u.demo?"Only the example changed. Nothing was sent to a server.":"The action handler completed."),!0}catch{return r===f&&!f.abort.signal.aborted&&L.say("The action failed. Your data is preserved. Try again."),!1}finally{r===f&&(r=null,e.removeAttribute("aria-busy"),A&&(A.disabled=f.wasDisabled,A.removeAttribute("aria-busy")),n(f))}},cancel(){v(),L.say("Action cancelled. Data has not changed.")}};k(m,"change",()=>{e.dataset.reduced=String(m.matches),m.matches&&e.getAnimations({subtree:!0}).forEach(E=>E.finish())}),e.dataset.reduced=String(m.matches),a=s[t](L)||(()=>({})),e.append(T),k(e,"keydown",E=>{E.key==="Escape"&&r&&(E.preventDefault(),L.cancel())})}x();let p={reset(){y||x()},cancel(){y||(v(),e.querySelector(".ac-status").textContent="Action cancelled. Data has not changed.")},destroy(){y||(y=!0,S(),e.replaceChildren(),B.delete(e))},get state(){return{key:t,destroyed:y,pending:!!r,...y?{}:a()}}};return B.set(e,p),p}var Z={profile(e){e.title("Your profile","Tell us about yourself. Apply changes when ready.");let t={name:"Anna Smith",bio:"Interface designer. I enjoy clear, lively products.",link:"anna.design"},s=e.field("Full name",t.name),u=e.field("About you",t.bio,"textarea-input"),i=e.field("Website or portfolio",t.link),d=e.el("div","ac-fields");d.append(s.node,u.node,i.node);let r=()=>({name:s.input.value,bio:u.input.value,link:i.input.value}),a=()=>JSON.stringify(t)===JSON.stringify(r()),y=e.el("p","ac-draft-line","All changes applied"),m=e.button("Save",async()=>{if(!s.input.value.trim()){e.say("Add a name. Other fields are optional."),s.input.focus();return}let h=r();await e.run("profile.save",h,()=>{t={...h},e.emit({saved:{...t}})},m),b()}),g=e.button("Cancel",()=>{e.cancel(),s.input.value=t.name,u.input.value=t.bio,u.input.dispatchEvent(new Event("input")),i.input.value=t.link,b()},"quiet");function b(){m.disabled=a(),g.disabled=a(),y.textContent=a()?"All changes applied":"Unsaved changes"}for(let h of[s,u,i])e.on(h.input,"input",()=>{e.root.hasAttribute("aria-busy")&&e.cancel(),b()});return e.root.append(d,y,e.actions(m,g)),b(),()=>({saved:{...t},draft:r(),dirty:!a()})},contact(e){e.title("Contact details","Your current contact stays active until its replacement is verified.","mail");let t="email",s="edit",u={email:"anna@example.com",phone:"+7 900 123-45-67"},i="",d=null,r=e.listRow("Current email",u.email,"mail"),a=e.field("New address",""),y=e.field("New phone",""),m=e.panels([a.node,y.node]),g=e.el("div","ac-segments");g.setAttribute("role","group"),g.setAttribute("aria-label","Contact type");let b=["email","phone"].map((L,E)=>{let w=e.el("button","ac-segment",E?"Phone":"Email");return w.type="button",w.setAttribute("aria-pressed",String(E===0)),e.on(w,"click",()=>h(L)),e.on(w,"keydown",M=>{if(!["ArrowLeft","ArrowRight","Home","End"].includes(M.key))return;M.preventDefault();let A=M.key==="Home"?0:M.key==="End"?1:1-E;b[A].focus(),h(A?"phone":"email")}),g.append(w),w});function h(L){s!=="edit"||t===L||(t=L,m.select(t==="email"?0:1),b.forEach((E,w)=>E.setAttribute("aria-pressed",String(w===0==(t==="email")))),r.name.textContent=t==="email"?"Current email":"Current phone",r.caption.textContent=u[t])}let c=e.el("div","ac-flow"),n=e.el("div","ac-flow"),v=e.reveal(n),S=e.field("Verification code","","code-input"),x=e.el("p","ac-note"),p=e.button("Continue",async()=>{let L=t==="email"?a.input:y.input,E=L.value.trim();if(!E){e.say("Enter a new contact."),L.focus();return}if(E===u[t]){e.say("This is already your current contact.");return}let w=t;await e.run("contact.request",{kind:w,value:E},M=>{d=M?.challengeId??null,i=E,s="verify",x.textContent="Verify your new contact",T.set(!1),v.set(!0),b.forEach(A=>A.disabled=!0),a.input.readOnly=y.input.readOnly=!0,e.focus(S.input)},p)}),o=e.button("Confirm",async()=>{if(e.options.demo&&S.input.value!=="123456"){e.say("Use code 123456 in this example."),e.focus(S.input);return}if(!/^\d{6}$/.test(S.input.value)){e.say("Enter the six-digit code."),e.focus(S.input);return}await e.run("contact.confirm",{kind:t,value:i,challengeId:d,code:S.input.value},()=>{u[t]=i,r.caption.textContent=u[t],s="edit",d=null,S.input.value="",S.input.dispatchEvent(new Event("input")),T.set(!0),v.set(!1),b.forEach(L=>L.disabled=!1),a.input.readOnly=y.input.readOnly=!1,(t==="email"?a.input:y.input).value="",e.emit({current:{...u}}),e.focus(p)},o)}),k=e.button("Cancel",()=>{e.cancel(),s="edit",d=null,T.set(!0),v.set(!1),b.forEach(L=>L.disabled=!1),a.input.readOnly=y.input.readOnly=!1,S.input.value="",S.input.dispatchEvent(new Event("input")),e.focus(p)},"quiet"),T=e.reveal(e.actions(p));T.set(!0),c.append(m.node,T.node),n.append(x,S.node,e.el("p","ac-hint ac-code-hint",e.options.demo?"Demo code: 123456. No email or SMS is sent.":"Enter the code from your service."),e.actions(o,k));for(let L of[a,y,S])e.on(L.input,"input",()=>{e.root.hasAttribute("aria-busy")&&e.cancel()});return e.root.append(r.node,g,c,v.node),()=>({mode:t,stage:s,current:{...u},pendingContact:s==="verify"?i:null})},password(e){e.title("Update password","Your new password replaces the current one only after applying.","key");let t=!1,s=e.field("Current password","","password-input"),u=e.field("New password","","password-input"),i=e.field("Repeat new password","","password-input"),d=e.el("div","ac-fields");s.input.autocomplete="current-password",u.input.autocomplete=i.input.autocomplete="new-password",d.append(s.node,u.node,i.node);let r=e.el("p","ac-draft-line","You can use any values in this example."),a=()=>{for(let b of[s,u,i])b.input.value="",b.control.setVisible(!1),b.node.shadowRoot.querySelector(".sl-field__reveal").setAttribute("aria-label","Show password");g()},y=e.button("Change password",async()=>{if(u.input.value!==i.input.value){e.say("New passwords do not match."),i.input.focus();return}await e.run("password.change",{current:s.input.value,password:u.input.value},()=>{t=!0,a(),e.emit({changed:!0})},y),g()}),m=e.button("Clear",()=>{e.cancel(),a()},"quiet");function g(){let b=!!s.input.value&&!!u.input.value&&!!i.input.value;y.disabled=!b,m.disabled=![s,u,i].some(h=>h.input.value),r.textContent=u.input.value&&i.input.value?u.input.value===i.input.value?"New passwords match":"Check that the new passwords match":"You can use any values in this example."}for(let b of[s,u,i])e.on(b.input,"input",()=>{e.root.hasAttribute("aria-busy")&&e.cancel(),g()});return e.root.append(d,r,e.actions(y,m)),g(),()=>({changed:t,hasDraft:[s,u,i].some(b=>!!b.input.value)})}};function J(e,t,s){let u=e.el("dl",s);for(let[i,d]of t){let r=e.el("div");r.append(e.el("dt","",i),e.el("dd","",d)),u.append(r)}return u}var G={sessions(e){e.title("Signed-in devices","Review devices and end sessions you do not recognize.","laptop");let t=[{id:"this",name:"This computer",detail:"Desktop computer",system:"Windows 11",browser:"Edge",activity:"Now",location:"Novosibirsk",current:!0},{id:"phone",name:"Phone",detail:"Mobile device",system:"iOS",browser:"Safari",activity:"Today, 09:40",location:"Novosibirsk"},{id:"home",name:"Home computer",detail:"Laptop",system:"macOS",browser:"Chrome",activity:"Yesterday, 18:12",location:"Novosibirsk"}],s=null,u=e.el("div","ac-list"),i=e.list(u),d=e.el("div","ac-confirm"),r=e.el("p","ac-note"),a=e.reveal(d),y=e.button("End session",async()=>{let c=s==="others"?t.filter(n=>!n.current).map(n=>n.id):[s];await e.run("sessions.revoke",{ids:c},()=>{if(t=t.filter(n=>!c.includes(n.id)),s=null,a.set(!1),h(),e.emit({sessions:t.map(n=>({...n}))}),!b.disabled)e.focus(b);else{let n=u.querySelector(".ac-row-name");n.tabIndex=-1,e.focus(n)}},y)}),m=e.button("Cancel",()=>{e.cancel(),s=null,a.set(!1),e.focus(b)},"quiet");d.append(r,e.actions(y,m));function g(c){e.root.hasAttribute("aria-busy")&&e.cancel(),s=c,r.textContent=c==="others"?"End all sessions except this one?":"End the session on this device?",a.set(!0),y.focus()}let b=e.button("End other sessions",()=>g("others"),"secondary");function h(){i(t,c=>{let n=e.listRow(c.name,c.detail,c.id==="phone"?"phone":"laptop");if(n.node.classList.add("ac-device-card"),n.node.dataset.current=String(!!c.current),c.current&&n.copy.append(e.el("span","ac-badge","You are here \xB7 current session")),n.node.append(J(e,[["System",c.system],["Browser",c.browser],["Activity",c.activity],["City",c.location]],"ac-session-details")),!c.current){let v=e.button("End session",()=>g(c.id),"small");v.setAttribute("aria-label",`End session: ${c.name}`),n.node.append(e.actions(v))}return n.node}),b.disabled=t.every(c=>c.current)}return e.root.append(u,e.el("p","ac-hint ac-footnote","Devices, city and activity are sample data."),e.actions(b),a.node),h(),()=>({sessions:t.map(c=>({...c})),confirmation:s})},connections(e){e.title("Account sign-in","Keep at least one sign-in method connected.","link");let t=[{id:"email",name:"Email",detail:"anna@example.com",connected:!0},{id:"google",name:"Google",detail:"anna.personal@example.com",connected:!1},{id:"apple",name:"Apple",detail:"anna@privaterelay.example",connected:!1}],s=null,u=e.el("div","ac-list"),i=e.list(u),d=e.el("div","ac-confirm"),r=e.el("p","ac-note"),a=e.reveal(d),y=h=>{let c=[...u.querySelectorAll(".ac-provider-card")].find(v=>v.dataset.provider===h),n=c?.querySelector(".ac-action")?.shadowRoot.querySelector("button");if(n&&!n.disabled)e.focus(n,{preventScroll:!0});else{let v=c?.querySelector(".ac-row-name");v&&(v.tabIndex=-1,e.focus(v,{preventScroll:!0}))}},m=e.button("Disconnect",async()=>{let h=t.find(c=>c.id===s);if(!h||t.filter(c=>c.connected).length<=1){e.say("You cannot disconnect your last sign-in method.");return}await e.run("provider.disconnect",{id:h.id},()=>{h.connected=!1,s=null,a.set(!1),b(),e.emit({providers:t.map(c=>({id:c.id,connected:c.connected}))}),y(h.id)},m)}),g=e.button("Cancel",()=>{e.cancel(),s=null,a.set(!1),u.querySelector(".ac-action")?.shadowRoot.querySelector("button").focus()},"quiet");d.append(r,e.actions(m,g));function b(){let h=t.filter(c=>c.connected).length;i(t.map(c=>({...c,protected:c.connected&&h===1})),c=>{let n=t.find(p=>p.id===c.id),v=e.listRow(n.name,n.id==="email"?"Email and password":"External account",n.id==="email"?"mail":"link");v.node.classList.add("ac-provider-card"),v.node.dataset.provider=n.id,v.node.dataset.connected=String(n.connected),v.copy.append(e.el("span","ac-badge",n.connected?"Connected":"Disconnected")),v.node.append(J(e,[["Account",n.connected?n.detail:"Not selected yet"]],"ac-provider-details"));let S=e.el("p","ac-provider-note",c.protected?"Your only sign-in method. Connect another one first.":n.connected?"You can disconnect this; another sign-in method remains available.":"Connecting adds another sign-in method.");v.node.append(S);let x=e.button(n.connected?"Disconnect":"Connect",async()=>{if(n.connected){if(t.filter(p=>p.connected).length<=1){e.say("Connect another sign-in method first.");return}e.root.hasAttribute("aria-busy")&&e.cancel(),s=n.id,r.textContent=`Disconnect ${n.name}? Other sign-in methods will remain available.`,a.set(!0),m.focus({preventScroll:!0})}else await e.run("provider.connect",{id:n.id},()=>{n.connected=!0,b(),e.emit({providers:t.map(p=>({id:p.id,connected:p.connected}))}),y(n.id)},x)},"secondary");return x.setAttribute("aria-label",`${n.connected?"Disconnect":"Connect"} ${n.name}`),c.protected&&(x.disabled=!0,x.title="Last sign-in method"),v.node.append(e.actions(x)),v.node})}return e.root.append(u,a.node,e.el("p","ac-hint ac-footnote","Connections are examples. No authorization windows open.")),b(),()=>({providers:t.map(h=>({id:h.id,connected:h.connected})),confirmation:s})},passkeys(e){e.title("Passkeys","Use clear names to recognize your passkeys.","key");let t=[{id:"laptop",name:"Personal laptop",detail:"Added October 12"}],s=null,u=0,i=null,d="closed",r=new Map,a=e.el("div","ac-list"),y=e.list(a,{animateInsert:!0}),m=e.el("p","ac-note","No passkeys yet. You can add a device."),g=e.field("Passkey name",""),b=e.el("div","ac-flow"),h=e.el("p","ac-note"),c=e.el("div","ac-flow"),n=e.el("p","ac-note"),v=e.el("div","ac-key-panes"),S=e.reveal(v);S.node.classList.add("ac-key-region"),b.dataset.keyPane="edit",c.dataset.keyPane="remove",v.append(b,c);function x(f){d=f;for(let C of[b,c]){let q=C.dataset.keyPane===d;C.setAttribute("aria-hidden",String(!q)),C.inert=!q}S.set(d!=="closed"),T.setAttribute("aria-expanded",String(d==="edit"&&s===null))}function p(f){if(e.root.hasAttribute("aria-busy")&&e.cancel(),d==="edit"&&s===f){g.input.focus({preventScroll:!0});return}let C=f?t.find(q=>q.id===f):null;f&&!C||(s=f,i=null,g.input.value=r.get(f??"new")??C?.name??"",h.textContent=f?"Rename passkey":"Name the new device",x("edit"),g.input.focus({preventScroll:!0}))}function o(f){e.root.hasAttribute("aria-busy")&&e.cancel();let C=t.find(q=>q.id===f);C&&(i=f,s=null,n.textContent=`Remove passkey \u201C${C.name}\u201D? Password sign-in will remain available.`,x("remove"),w.focus({preventScroll:!0}))}function k(){s=i=null,x("closed"),e.focus(T,{preventScroll:!0})}let T=e.button("Add passkey",()=>p(null),"secondary"),L=e.button("Save",async()=>{let f=g.input.value.trim();if(!f){e.say("Give the passkey a clear name."),g.input.focus({preventScroll:!0});return}let C=s;await e.run(C?"passkey.rename":"passkey.create",{id:C,name:f},q=>{if(C)t.find(_=>_.id===C).name=f;else{let _=q?.id??`demo-${++u}`;if(typeof _!="string"||t.some(l=>l.id===_))throw new TypeError("Key id must be unique");t.push({id:_,name:f,detail:e.options.demo?"Demo passkey \xB7 not registered":"Added by your handler"})}r.delete(C??"new"),k(),A(),e.emit({keys:t.map(_=>({..._}))})},L)}),E=e.button("Cancel",()=>{e.cancel(),r.delete(s??"new"),k()},"quiet");b.append(h,g.node,e.actions(L,E));let w=e.button("Remove passkey",async()=>{let f=i;f&&await e.run("passkey.revoke",{id:f},()=>{t=t.filter(C=>C.id!==f),r.delete(f),k(),A(),e.emit({keys:t.map(C=>({...C}))})},w)}),M=e.button("Keep",()=>{e.cancel(),k()},"quiet");c.append(n,e.actions(w,M));function A(){m.hidden=!!t.length,m.isConnected||a.append(m),y(t,f=>{let C=e.listRow(f.name,f.detail,"key"),q=e.button("Name",()=>p(f.id),"small"),_=e.button("Remove",()=>o(f.id),"small");return q.setAttribute("aria-label",`Rename ${f.name}`),_.setAttribute("aria-label",`Remove ${f.name}`),C.node.append(e.actions(q,_)),C.node})}return e.on(g.input,"input",()=>{e.root.hasAttribute("aria-busy")&&e.cancel(),r.set(s??"new",g.input.value)}),e.on(e.root,"keydown",f=>{f.key==="Escape"&&d!=="closed"&&(f.preventDefault(),e.cancel(),k())}),e.root.append(a,e.actions(T),S.node),x("closed"),A(),()=>({keys:t.map(f=>({...f})),editing:s,removing:i,mode:d})}};var K={twofactor(e){e.title("Additional protection","An additional verification step when signing in.","shield");let t=!1,s=null,u=e.listRow("Protection disabled","You can enable sign-in verification","shield"),i=e.el("div","ac-inset");i.append(u.node);let d=e.field("Verification code","","code-input"),r=e.el("div","ac-flow"),a=e.el("p","ac-note"),y=e.reveal(r),m=e.button("Connect",()=>{s=t?"disable":"enable",a.textContent=t?"Confirm disabling protection":"Confirm enabling protection",y.set(!0),m.disabled=!0,d.input.focus()}),g=e.button("Confirm",async()=>{if(!/^\d{6}$/.test(d.input.value)||e.options.demo&&d.input.value!=="123456"){e.say(e.options.demo?"Demo code: 123456.":"Enter the six-digit code."),d.input.focus();return}let h=s==="enable";await e.run(h?"twofactor.enable":"twofactor.disable",{code:d.input.value},()=>{t=h,s=null,u.name.textContent=t?"Protection enabled":"Protection disabled",u.caption.textContent=t?"Sign-in requires a second step":"You can enable sign-in verification",m.label.textContent=t?"Disconnect":"Connect",m.disabled=!1,y.set(!1),d.input.value="",d.input.dispatchEvent(new Event("input")),e.emit({enabled:t}),e.focus(m)},g)}),b=e.button("Cancel",()=>{e.cancel(),s=null,m.disabled=!1,y.set(!1),e.focus(m)},"quiet");return r.append(a,d.node,e.el("p","ac-hint ac-code-hint",e.options.demo?"Demo code: 123456. Real account protection is unchanged.":"Your service handler verifies this code."),e.actions(g,b)),e.on(d.input,"input",()=>{e.root.hasAttribute("aria-busy")&&e.cancel()}),e.root.append(i,e.actions(m),y.node),()=>({enabled:t,mode:s})},recovery(e){e.title("Backup sign-in","Keep codes somewhere safe, separate from your device.","key");let t=!1,s=!1,u=0,i=4,d=e.el("p","ac-note","Current set \xB7 4 codes"),r=e.el("div","ac-codes"),a=e.el("div","ac-codes-cover"),y=e.el("div","ac-code-well");a.append(e.glyph("key"),e.el("strong","","Codes hidden"),e.el("span","ac-hint","Reveal them when you are ready to save them.")),y.append(r,a);let m=e.toggle("I saved this set",!1,S=>{s=S,v.disabled=!S,e.emit({acknowledged:s,generation:u,count:i})});function g(S){r.replaceChildren(),S.forEach(x=>{let p=e.el("div","ac-code-tile"),o=e.el("code");x.startsWith("DEMO-")?o.append(e.el("span","ac-code-prefix","DEMO-"),e.el("span","ac-code-value",x.slice(5))):o.append(e.el("span","ac-code-value",x)),p.append(o),r.append(p)}),t=!0,y.dataset.shown="true",a.setAttribute("aria-hidden","true"),r.setAttribute("aria-hidden","false"),n.label.textContent="Hide codes",i=S.length,d.textContent=`Current set \xB7 ${i} codes`}function b(){t=!1,r.replaceChildren(),y.dataset.shown="false",a.removeAttribute("aria-hidden"),r.setAttribute("aria-hidden","true"),n.label.textContent="Show codes"}let h=()=>Array.from({length:4},(S,x)=>`DEMO-${u+1}${x+1}00`),c=S=>{if(e.options.demo)return h();if(!Array.isArray(S?.codes)||!S.codes.length||!S.codes.every(x=>typeof x=="string"&&x.length<=80))throw new TypeError("Expected recovery codes");return S.codes.slice(0,8)},n=e.button("Show codes",async()=>{if(t){e.root.hasAttribute("aria-busy")&&e.cancel(),b();return}await e.run("recovery.reveal",{},S=>g(c(S)),n)},"secondary"),v=e.button("Replace set",async()=>{await e.run("recovery.rotate",{},S=>{let x=e.options.demo?null:c(S);u++,s=!1,m.input.checked=!1,v.disabled=!0,g(x??h()),e.emit({generation:u,count:i,acknowledged:s})},v),v.disabled=e.root.hasAttribute("aria-busy")||!s},"secondary");return v.disabled=!0,e.root.append(d,y,e.el("p","ac-hint ac-code-hint","Demo values start with DEMO and cannot be used to sign in."),m.node,e.actions(n,v)),b(),()=>({shown:t,acknowledged:s,generation:u,count:i})},visibility(e){e.title("Public profile","Choose what other people can see.","eye");let t={bio:!0,site:!0,email:!1},s={...t},u=e.el("div","ac-switches"),i=e.el("div","ac-public"),d=e.el("div","ac-avatar","AS"),r=e.el("strong","ac-public-name","Anna Smith");i.append(d,r,e.el("span","ac-hint","Visitor preview"));let a={bio:e.el("p","ac-public-line","Interface designer"),site:e.el("p","ac-public-line","anna.design"),email:e.el("p","ac-public-line","anna@example.com")},y={};for(let[n,v]of Object.entries(a))y[n]=e.reveal(v),i.append(y[n].node);let m=Object.entries({bio:"Biography",site:"Website or portfolio",email:"Email address"}).map(([n,v])=>{let S=e.toggle(v,s[n],x=>{e.root.hasAttribute("aria-busy")&&e.cancel(),s[n]=x,c()});return u.append(S.node),{key:n,...S}}),g=e.el("p","ac-draft-line","Settings applied"),b=e.button("Apply",async()=>{let n={...s};await e.run("visibility.save",n,()=>{t=n,e.emit({saved:{...t}})},b),c()}),h=e.button("Cancel",()=>{e.cancel(),s={...t},m.forEach(n=>n.input.checked=s[n.key]),c()},"quiet");function c(){for(let v of Object.keys(s))y[v].set(s[v]);let n=JSON.stringify(t)!==JSON.stringify(s);b.disabled=h.disabled=!n,g.textContent=n?"Preview of unsaved changes":"Settings applied"}return e.root.append(u,i,g,e.actions(b,h)),c(),()=>({saved:{...t},draft:{...s}})},addresses(e){e.title("Saved addresses","Choose a primary address or add another.","pin");let t=[{id:"home",name:"Home",address:"12 Forest Street, Novosibirsk",primary:!0},{id:"work",name:"Work",address:"8 Peace Street, Novosibirsk",primary:!1}],s=null,u=null,i=0,d=e.el("div","ac-list"),r=e.list(d),a=e.el("p","ac-note","No addresses yet. Add your first."),y=e.el("div","ac-flow"),m=e.el("p","ac-note"),g=e.field("Address name",""),b=e.field("Address","","textarea-input"),h=e.reveal(y),c=e.button("Add address",()=>n(null),"secondary");function n(o){e.root.hasAttribute("aria-busy")&&e.cancel(),s=o;let k=t.find(T=>T.id===o);m.textContent=k?"Edit address":"New address",g.input.value=k?.name??"",b.input.value=k?.address??"",h.set(!0),b.input.dispatchEvent(new Event("input")),g.input.focus()}let v=e.button("Save",async()=>{let o={name:g.input.value.trim(),address:b.input.value.trim()};if(!o.name||!o.address){e.say("Enter a name and address."),(o.name?b:g).input.focus();return}let k=s;await e.run(k?"address.update":"address.add",{id:k,...o},T=>{k?Object.assign(t.find(L=>L.id===k),o):t.push({id:T?.id??`example-${++i}`,...o,primary:!t.length}),h.set(!1),s=null,p(),e.emit({addresses:t.map(L=>({...L}))}),e.focus(c)},v)}),S=e.button("Cancel",()=>{e.cancel(),s=null,h.set(!1),e.focus(c)},"quiet");y.append(m,g.node,b.node,e.actions(v,S));let x=e.button("Restore address",async()=>{if(!u)return;let o=u;await e.run("address.restore",{address:{...o.row}},()=>{o.row.primary&&t.forEach(k=>k.primary=!1),t.splice(Math.min(o.index,t.length),0,o.row),u=null,p(),e.emit({addresses:t.map(k=>({...k}))})},x)},"secondary");function p(){a.hidden=!!t.length,a.isConnected||d.append(a),r(t,o=>{let k=e.listRow(o.name,o.address,"pin");o.primary&&k.copy.append(e.el("span","ac-badge","Primary"));let T=e.button("Edit",()=>n(o.id),"small"),L=e.button("Remove",async()=>{s===o.id&&(h.set(!1),s=null),await e.run("address.remove",{id:o.id},()=>{u={row:{...o},index:t.indexOf(o)},t=t.filter(w=>w.id!==o.id),o.primary&&t.length&&(t[0].primary=!0),p(),e.emit({addresses:t.map(w=>({...w}))}),e.focus(x)},L)},"small"),E=e.button("Primary",async()=>{await e.run("address.primary",{id:o.id},()=>{t.forEach(w=>w.primary=w.id===o.id),p(),e.emit({addresses:t.map(w=>({...w}))})},E)},"small");return T.setAttribute("aria-label",`Edit: ${o.name}`),L.setAttribute("aria-label",`Remove: ${o.name}`),L.title="Remove address",L.label.replaceChildren(e.glyph("close")),E.setAttribute("aria-label",`Primary: ${o.name}`),k.node.append(e.actions(T,...o.primary?[]:[E],L)),k.node}),x.disabled=!u,x.view.hidden=!u}for(let o of[g,b])e.on(o.input,"input",()=>{e.root.hasAttribute("aria-busy")&&e.cancel()});return e.root.append(d,e.actions(c,x),h.node),p(),()=>({addresses:t.map(o=>({...o})),editing:s,canUndo:!!u})}};var j=new WeakMap;function Q(e,t,s){j.get(e)?.destroy();let u=!1,i=document.createElement("div");e.replaceChildren(i),e.classList.add("sl-component"),e.dataset.kind="inputs-account-core-profile-v11";let d=W(i,{...t,key:"profile",renderers:{...Z,...G,...K},demo:s}),r={reset(){u||d.reset()},cancel(){u||d.cancel()},destroy(){u||(u=!0,d.destroy(),j.get(e)===r&&(e.replaceChildren(),j.delete(e)))},get state(){return d.state}};return j.set(e,r),r}function re(e,t={}){return Q(e,t,!1)}function de(e){return Q(e,{},!0)}window.SLComponent={mount:re,mountPreview:de};})();
