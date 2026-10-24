(()=>{var de=`/* Matte buttons. Scoped styles and editable color and motion tokens. */

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

`,pe=(()=>{let e={"short-2":100,"short-4":200,"medium-3":350,"medium-4":400,"long-4":600},b={linear:"cubic-bezier(0,0,1,1)","ease-in-out-gentle":"cubic-bezier(0.4,0,0.2,1)"},t=new WeakMap;function o(n,{onSave:a,onCancel:p=()=>{},previewDuration:l=0,confirmationMs:c=1400}={}){if(t.has(n))return t.get(n);let h=n.querySelector('[data-action="save"]'),i=n.querySelector('[data-action="cancel"]'),r=h?.querySelector(".bk-progress"),d=i?.querySelector(".bk-wash"),y=n.querySelector("[data-feedback]");if(h&&typeof a!="function")throw new TypeError("Pass your async onSave function.");let u=matchMedia("(prefers-reduced-motion: reduce)"),f=new AbortController,k=new Map,g=new Set,m,v,x,s,_,S=!1;function T(E,P,A){E&&(E===h&&E.dataset.state!==P&&(E.dataset.transition=E.dataset.state==="saved"&&P==="idle"?"return":"default"),E.dataset.state=P,E.setAttribute("aria-label",A))}function j(E){y&&(y.textContent=E)}function M(){h?.setAttribute("aria-disabled","false"),h?.setAttribute("aria-busy","false")}function B(E=!1){if(!r)return;let P=E&&!u.matches&&s?getComputedStyle(r):null,A=P?.transform||"none",F=P?Number(P.opacity):0,I=A==="none"?0:new DOMMatrixReadOnly(A).a;if(E&&!u.matches&&I>.001&&F>0){let w=r.cloneNode(!1);w.classList.add("bk-retiring"),w.style.transform=A,w.style.opacity=String(F),r.before(w);let z=w.animate([{opacity:F},{opacity:0}],{duration:h.dataset.transition==="return"?e["long-4"]:e["medium-4"],easing:b["ease-in-out-gentle"],fill:"forwards"});k.set(w,z),z.onfinish=()=>{w.remove(),k.delete(w),z.cancel()}}if(s?.cancel(),s=null,!E||u.matches){for(let[w,z]of k)z.cancel(),w.remove();k.clear()}}async function C(){if(S||h.disabled||h.getAttribute("aria-disabled")==="true")return;clearTimeout(v),clearTimeout(x),_?.cancel(),T(i,"idle","Cancel"),B(!0);let E=new AbortController;if(m=E,T(h,"saving","Saving changes"),h.setAttribute("aria-disabled","true"),h.setAttribute("aria-busy","true"),j("Saving changes."),!u.matches&&l>e["short-4"]){let P=e["short-4"]/l;s=r.animate([{transform:"scaleX(0)",opacity:0},{transform:`scaleX(${P})`,opacity:1,offset:P},{transform:"scaleX(1)",opacity:1}],{duration:l,easing:b.linear,fill:"forwards"})}try{if(await a({signal:E.signal}),m!==E||E.signal.aborted)return;m=null,!s&&!u.matches&&(s=r.animate([{transform:"scaleX(1)",opacity:0},{transform:"scaleX(1)",opacity:1}],{duration:e["medium-3"],easing:b["ease-in-out-gentle"],fill:"forwards"})),T(h,"saved","Changes saved"),h.setAttribute("aria-busy","false"),j("Changes saved."),v=setTimeout(()=>{T(h,"idle","Save changes"),M(),B(!0)},c)}catch(P){if(m!==E)return;m=null,T(h,"idle","Save changes"),M(),B(!0),j(P?.name==="AbortError"?"Saving cancelled.":"Could not save. Please try again.")}}function q(){if(S||i.disabled||i.getAttribute("aria-disabled")==="true")return;let E=!!m;if(m?.abort(),m=null,clearTimeout(v),clearTimeout(x),T(h,"idle","Save changes"),M(),B(!0),T(i,"cancelled","Cancelled"),_?.cancel(),d&&!u.matches){_=d.animate([{opacity:0},{opacity:.35,offset:.5},{opacity:0}],{duration:e["medium-4"],easing:b["ease-in-out-gentle"]});let P=_;P.onfinish=()=>{_===P&&(_=null),P.cancel()}}j(E?"Saving cancelled.":"Cancelled."),x=setTimeout(()=>T(i,"idle","Cancel"),c),p({wasSaving:E})}h?.addEventListener("click",C,{signal:f.signal}),i?.addEventListener("click",q,{signal:f.signal});for(let E of[h,i].filter(Boolean))E.disabled=!1,E.addEventListener("keydown",P=>{if(P.key!=="Enter"||P.repeat||E.getAttribute("aria-disabled")==="true")return;E.classList.add("is-pressed");let A=setTimeout(()=>{E.classList.remove("is-pressed"),g.delete(A)},e["short-2"]);g.add(A)},{signal:f.signal}),E.addEventListener("blur",()=>E.classList.remove("is-pressed"),{signal:f.signal});u.addEventListener("change",()=>{u.matches&&(B(),_?.cancel())},{signal:f.signal});let D={destroy(){if(!S){S=!0,f.abort(),m?.abort(),m=null,clearTimeout(v),clearTimeout(x),g.forEach(clearTimeout),g.clear(),B(),_?.cancel();for(let E of[h,i].filter(Boolean))E.classList.remove("is-pressed"),E.disabled=!0;t.delete(n)}}};return t.set(n,D),D}return{mount:o}})(),K=`
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
`,ue=(()=>{let e=new WeakMap,b=0;function t(n,a,p=()=>({})){if(e.has(n))return e.get(n);let l=n?.querySelector("input, textarea"),c=l?.tagName==="TEXTAREA"?"textarea":l?.type;if(!l||c!==a)throw new TypeError(`A native ${a} control is required.`);let h=n.ownerDocument,i=h.defaultView,r=new i.AbortController,d=[],y=[],u=!1,f=(m,v,x,s={})=>m.addEventListener(v,x,{...s,signal:r.signal}),k=p({root:n,input:l,doc:h,view:i,on:f,resets:d,cleanups:y,alive:()=>!u});l.form&&f(l.form,"reset",m=>queueMicrotask(()=>{!u&&!m.defaultPrevented&&d.forEach(v=>v())}));let g={reset(){u||(l.value=l.defaultValue,d.forEach(m=>m()))},destroy(){u||(u=!0,r.abort(),y.forEach(m=>m()),e.delete(n))}};return Object.defineProperties(g,Object.getOwnPropertyDescriptors(k)),e.set(n,g),g}function o(n){return t(n,"text")}return{mount:o}})(),fe=(()=>{let e=new WeakMap,b=0;function t(n,a,p=()=>({})){if(e.has(n))return e.get(n);let l=n?.querySelector("input, textarea"),c=l?.tagName==="TEXTAREA"?"textarea":l?.type;if(!l||c!==a)throw new TypeError(`A native ${a} control is required.`);let h=n.ownerDocument,i=h.defaultView,r=new i.AbortController,d=[],y=[],u=!1,f=(m,v,x,s={})=>m.addEventListener(v,x,{...s,signal:r.signal}),k=p({root:n,input:l,doc:h,view:i,on:f,resets:d,cleanups:y,alive:()=>!u});l.form&&f(l.form,"reset",m=>queueMicrotask(()=>{!u&&!m.defaultPrevented&&d.forEach(v=>v())}));let g={reset(){u||(l.value=l.defaultValue,d.forEach(m=>m()))},destroy(){u||(u=!0,r.abort(),y.forEach(m=>m()),e.delete(n))}};return Object.defineProperties(g,Object.getOwnPropertyDescriptors(k)),e.set(n,g),g}function o(n){return t(n,"email",({root:a,input:p,view:l,on:c,resets:h,cleanups:i,alive:r})=>{let d=a.querySelector(".sl-field__helper");if(!d)throw new TypeError("Email needs a helper.");let y=d.textContent,u=null,f=!1;function k(){l.clearTimeout(u),u=null}function g(){k(),a.dataset.validation="neutral",p.removeAttribute("aria-invalid"),d.textContent=y}function m(){if(k(),!r())return p.validity.valid;if(p.disabled||p.readOnly||f)return g(),p.validity.valid;if(!p.value&&!p.required)return g(),!0;let x=p.validity.valid;return a.dataset.validation=x?"valid":"invalid",p.setAttribute("aria-invalid",String(!x)),d.textContent=x?"Email format looks right.":p.validity.valueMissing?"Enter an email address.":"Enter an address such as name@example.com.",x}function v(x){g(),p.value&&!f&&!x?.isComposing&&(u=l.setTimeout(m,650))}return c(p,"blur",m),c(p,"input",v),c(p,"compositionstart",()=>{f=!0,g()}),c(p,"compositionend",()=>{f=!1,v()}),h.push(()=>{f=!1,g()}),i.push(g),g(),{validate:m}})}return{mount:o}})(),me=(()=>{let e=new WeakMap,b=0;function t(n,a,p=()=>({})){if(e.has(n))return e.get(n);let l=n?.querySelector("input, textarea"),c=l?.tagName==="TEXTAREA"?"textarea":l?.type;if(!l||c!==a)throw new TypeError(`A native ${a} control is required.`);let h=n.ownerDocument,i=h.defaultView,r=new i.AbortController,d=[],y=[],u=!1,f=(m,v,x,s={})=>m.addEventListener(v,x,{...s,signal:r.signal}),k=p({root:n,input:l,doc:h,view:i,on:f,resets:d,cleanups:y,alive:()=>!u});l.form&&f(l.form,"reset",m=>queueMicrotask(()=>{!u&&!m.defaultPrevented&&d.forEach(v=>v())}));let g={reset(){u||(l.value=l.defaultValue,d.forEach(m=>m()))},destroy(){u||(u=!0,r.abort(),y.forEach(m=>m()),e.delete(n))}};return Object.defineProperties(g,Object.getOwnPropertyDescriptors(k)),e.set(n,g),g}function o(n){return t(n,"textarea",({input:a,root:p,view:l,on:c,resets:h,cleanups:i})=>{let r=p.querySelector(".sl-field__control"),d=p.querySelector("[data-count]"),y=p.querySelector(".sl-field__helper");if(!r||!d||!y)throw new TypeError("Textarea needs a control, counter and helper.");let u=y.textContent,f=a.maxLength>0?a.maxLength:null;function k(){a.style.height="0px";let m=a.scrollHeight,v=a.value?Math.max(60,Math.min(180,m)):60;a.style.height="100%",a.style.overflowY=m>180?"auto":"hidden",r.style.height=`${v}px`}function g(){let m=[...a.value].length;d.textContent=String(m),y.textContent=f&&m>=f?`Character limit reached: ${f}.`:u,k()}return c(a,"input",m=>{m.isComposing||g()}),c(a,"compositionend",()=>g()),c(l,"resize",k),h.push(g),i.push(()=>{r.style.removeProperty("height"),a.style.removeProperty("height"),a.style.removeProperty("overflow-y")}),g(),{get length(){return[...a.value].length}}})}return{mount:o}})(),he=`/* App-neutral matte button with component-scoped motion and palette tokens. */

.sl-component{--action-ink:#222222;--action-surface:#303030;--action-hover:#3b3b3b;--action-text:#f6f6f6;--action-muted:#696969;--action-stage:#f2f2f2;--action-edge:#d3d3d3;--action-focus:#4b4b4b;--action-feedback:#505050;width:320px;max-width:100%;min-width:0;min-height:190px;padding:28px 20px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:17px;color:var(--action-ink);background:var(--action-stage);border:1px solid var(--action-edge);border-radius:18px;box-shadow:inset 0 1px #fff,0 3px 8px #0000000d;font:14px/1.45 'Instrument Sans',sans-serif;font-synthesis:none;-webkit-font-smoothing:antialiased}
.sl-component,.sl-component *,.sl-component *::before,.sl-component *::after{box-sizing:border-box}.sl-component [hidden]{display:none!important}.sl-component .motion-button{appearance:none;position:relative;width:min(216px,100%);height:54px;padding:0;border:0;border-radius:14px;background:transparent;color:var(--action-text);font:550 15px/1.1 'Instrument Sans',sans-serif;letter-spacing:-.015em;cursor:pointer;touch-action:manipulation;-webkit-tap-highlight-color:transparent}.sl-component .button-surface{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;gap:11px;overflow:hidden;isolation:isolate;border-radius:inherit;background:var(--action-surface);box-shadow:inset 0 1px #ffffff12,0 2px 3px #00000018;transition:transform 340ms cubic-bezier(.22,1,.36,1),background-color 220ms ease,box-shadow 280ms ease}.sl-component .button-surface::before{content:'';position:absolute;inset:0;z-index:-1;background:var(--action-feedback);opacity:0;transform:scaleX(0);transform-origin:left;transition:transform 420ms cubic-bezier(.22,1,.36,1),opacity 220ms ease}.sl-component[data-active="true"] .button-surface::before,.sl-component[data-phase="complete"] .button-surface::before{opacity:1;transform:scaleX(1)}
.sl-component .button-icon{width:23px;height:23px;position:relative;display:grid;place-items:center;flex:0 0 auto}.sl-component .button-icon svg{width:100%;height:100%;display:block;overflow:visible;fill:none;stroke:currentColor;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round}.sl-component .button-icon path,.sl-component .button-icon rect,.sl-component .button-icon circle{transform-box:view-box;transition:transform 460ms cubic-bezier(.22,1,.36,1),opacity 220ms ease,stroke-dashoffset 460ms cubic-bezier(.22,1,.36,1)}.sl-component .icon-result{opacity:0}.sl-component[data-active="true"] .icon-result,.sl-component[data-phase="complete"] .icon-result{opacity:1}.sl-component .button-label{position:relative;white-space:nowrap}
.sl-component .component-status{max-width:27ch;min-height:36px;margin:0;color:var(--action-muted);font-size:12px;line-height:1.5;text-align:center;overflow-wrap:anywhere}.sl-component[data-phase="error"] .component-status{color:#8a372f}.sl-component .details-panel{width:min(236px,100%);display:grid;grid-template-rows:0fr;opacity:0;visibility:hidden;transition:grid-template-rows 320ms cubic-bezier(.4,0,.2,1),opacity 320ms cubic-bezier(.4,0,.2,1),visibility 0s linear 320ms}.sl-component .details-panel[data-open="true"]{grid-template-rows:1fr;opacity:1;visibility:visible;transition:grid-template-rows 320ms cubic-bezier(.4,0,.2,1),opacity 320ms cubic-bezier(.4,0,.2,1),visibility 0s linear 0s}.sl-component .details-panel>div{min-height:0;overflow:hidden}.sl-component .details-panel p{margin:0;padding:14px 16px;border:1px solid var(--action-edge);border-radius:12px;background:#fafafa;color:var(--action-muted);font-size:12px}.sl-component .motion-button:focus-visible{outline:2px solid var(--action-focus);outline-offset:4px}.sl-component .motion-button:disabled,.sl-component .motion-button[aria-disabled="true"]{cursor:default;opacity:.62}.sl-component[data-phase="pending"] .button-surface::before{opacity:.32;transform:scaleX(1);animation:pending-wash 1s ease-in-out infinite alternate}@keyframes pending-wash{from{opacity:.16}to{opacity:.48}}
@media(hover:hover){.sl-component .motion-button:not(:disabled):not([aria-disabled="true"]):hover .button-surface{background:var(--action-hover);transform:translateY(-2px);box-shadow:inset 0 1px #ffffff18,0 8px 16px -12px #0008}}
.sl-component .motion-button:not(:disabled):not([aria-disabled="true"]):active .button-surface{transform:translateY(1px) scale(.98);transition-duration:100ms}.sl-component .sl-sr{position:absolute;width:1px;height:1px;margin:-1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
@media(max-width:260px){.sl-component{padding-inline:14px}.sl-component .motion-button{height:50px;font-size:13px}.sl-component .button-icon{width:21px;height:21px}.sl-component .component-status{font-size:11px}}
@media(prefers-reduced-motion:reduce){.sl-component *,.sl-component *::before,.sl-component *::after{transition:none!important;animation:none!important;scroll-behavior:auto!important}.sl-component .button-surface,.sl-component .motion-button:hover .button-surface,.sl-component .motion-button:active .button-surface{transform:none!important}.sl-component .motion-button:active .button-surface{opacity:.88}}
@media(forced-colors:active){.sl-component{border-color:CanvasText}.sl-component .button-surface{border:1px solid ButtonText;background:ButtonFace;color:ButtonText}.sl-component .button-surface::before{display:none}.sl-component .motion-button:focus-visible{outline-color:Highlight}.sl-component .details-panel p{border-color:CanvasText}}

.sl-component[data-kind="buttons-details-disclosure"] .disclosure-chevron{transform-origin:12px 12px}.sl-component[data-kind="buttons-details-disclosure"][data-active="true"] .disclosure-chevron{transform:rotate(180deg)}
`,ne=(()=>{"use strict";function e(t,o={}){if(!t?.matches(".sl-component"))throw new TypeError("Expected a .sl-component root.");let n=t.ownerDocument.defaultView;t.dispatchEvent(new n.Event("sl:buttons-remount"));let a=new n.AbortController,p=t.querySelector("[data-action]"),l=t.querySelector("[data-label]"),c=t.querySelector("[data-status]"),h=t.querySelector("[data-panel]"),i=!1,r=!1,d=(v,x,s)=>v.addEventListener(x,s,{signal:a.signal}),y=()=>t.getRootNode().activeElement;function u(){!i&&h.contains(y())&&p.focus(),t.dataset.active=String(i),p.setAttribute("aria-expanded",String(i)),p.setAttribute("aria-label",i?"Hide details":"Show details"),l.textContent=i?"Hide details":"Show details",h.dataset.open=String(i),h.setAttribute("aria-hidden",String(!i)),h.inert=!i,c.textContent=i?"Details are visible.":"Details are hidden."}function f(v,x=!1){let s=!!v;return r||s===i?!1:(i=s,u(),x&&(o.onChange?.({expanded:i}),t.dispatchEvent(new n.CustomEvent("sl:action",{bubbles:!0,composed:!0,detail:{kind:t.dataset.kind,expanded:i}}))),!0)}function k(){return y()!==p&&p.focus(),f(!i,!0)}function g(){r||(i=!1,u())}function m(){r||(g(),r=!0,a.abort())}return d(p,"click",k),d(t,"keydown",v=>{v.key==="Escape"&&i&&(v.preventDefault(),f(!1,!0),p.focus())}),d(t,"sl:buttons-remount",m),g(),{toggle:k,setExpanded:v=>f(v),reset:g,destroy:m,get state(){return{expanded:i}}}}function b(t){return e(t)}return{mount:e,mountPreview:b}})(),ge=`
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

.menu-study { height: 366px; --study-ease: cubic-bezier(.22,.61,.36,1); }
.menu-review:has(.menu-study) .toggle-stage { min-height: 440px; }
.menu-study .menu-trigger-label { font-size: 14px; }
.menu-study .menu-panel { z-index: 2; }
.choice-copy strong { display: block; font-weight: 450; font-size: 13px; }
.choice-copy small { display: block; margin-top: 4px; color: var(--menu-muted); font-size: 11px; line-height: 1.4; }
.menu-study .menu-item { min-height: 41px; }
.menu-study .menu-item:has(small) { min-height: 57px; }
.menu-study .menu-panel { transform: none; transition: opacity 180ms ease,visibility 0s 280ms; }
.menu-study[data-open="true"] .menu-panel { transition-delay: 0s; }
.menu-study[data-motion="rise"] .menu-panel { transform: translateY(12px); transition: transform 260ms var(--study-ease),opacity 170ms ease,visibility 0s 260ms; }
.menu-study[data-motion="corner"] .menu-panel { left: auto; right: 0; width: min(228px,100%); transform: scale(.94); transform-origin: top right; transition: transform 220ms var(--study-ease),opacity 160ms ease,visibility 0s 220ms; }
.menu-study[data-motion="sequence"] .menu-item { transform: translateY(7px); opacity: 0; transition: transform 240ms var(--study-ease),opacity 150ms ease,background-color 160ms ease; }
.menu-study[data-motion="sequence"][data-open="true"] .menu-item { transform: none; opacity: 1; }
.menu-study[data-motion="sequence"][data-open="true"] .menu-item:nth-child(2) { transition-delay: 25ms,25ms,0s; }
.menu-study[data-motion="sequence"][data-open="true"] .menu-item:nth-child(3) { transition-delay: 50ms,50ms,0s; }
.menu-study[data-motion="sequence"][data-open="true"] .menu-item:nth-child(4) { transition-delay: 75ms,75ms,0s; }
.study-scroll { max-height: 244px; overflow: auto; scrollbar-width: thin; scrollbar-color: #7e7e7e transparent; }
.menu-study[data-motion="side"] .menu-panel { transform: translateX(14px); transition: transform 260ms var(--study-ease),opacity 180ms ease,visibility 0s 260ms; }
.menu-study[data-motion="up"],.menu-study[data-motion="lift"] { padding-top: 278px; }
.menu-study[data-motion="up"] .menu-panel { top: auto; bottom: 100px; transform: translateY(12px); transition: transform 250ms var(--study-ease),opacity 180ms ease,visibility 0s 250ms; }
.menu-study[data-motion="lift"] .menu-panel { top: auto; bottom: 100px; transform: translateY(8px) scale(.98); transform-origin: bottom center; transition: transform 280ms var(--study-ease),opacity 190ms ease,visibility 0s 280ms; }
.menu-study[data-motion="hinge"] .menu-panel { transform: translateX(-8px) scale(.98); transform-origin: top left; transition: transform 250ms var(--study-ease),opacity 180ms ease,visibility 0s 250ms; }
.menu-study[data-motion="drill"] .menu-panel { transform: translateY(-8px); transition: transform 230ms var(--study-ease),opacity 180ms ease,visibility 0s 230ms; }
.menu-study[data-motion="fan"] .menu-panel { transform: translateY(10px) scale(.96); transform-origin: top center; transition: transform 260ms var(--study-ease),opacity 160ms ease,visibility 0s 260ms; }
.menu-study[data-open="true"] .menu-panel { transform: none; transition-delay: 0s; }
.study-joined { isolation: isolate; }
.study-joined .menu-trigger { position: relative; z-index: 3; height: 52px; transition: background-color 180ms ease; }
.study-reveal { overflow: hidden; border-radius: 0 0 14px 14px; margin-top: -14px; }
.menu-study[data-motion="joined"] .menu-panel { position: relative; top: auto; padding-top: 21px; opacity: 1; border-top: 0; border-radius: 0 0 14px 14px; box-shadow: none; transform: translateY(-100%); transition: transform 280ms var(--study-ease),visibility 0s 280ms; }
.menu-study[data-motion="joined"][data-open="true"] .menu-panel { transform: none; transition-delay: 0s; }
.surface-options { display: grid; grid-template-columns: repeat(3,1fr); gap: 6px; padding: 3px; }
.surface-option { display: grid; grid-template-rows: 53px 18px 20px; align-content: start; align-items: center; gap: 8px; min-width: 0; }
.surface-option,.format-option,.insert-option { position: relative; border: 1px solid transparent; color: var(--menu-text); background: transparent; border-radius: 10px; padding: 10px 5px; cursor: pointer; font-size: 12px!important; }
.surface-option:hover,.format-option:hover,.insert-option:hover { background: transparent; }
.surface-option[aria-checked="true"],.format-option[aria-checked="true"],.insert-option[aria-current="true"] { border-color: #c4c4c466; background: transparent; }
.surface-sample { display: block; width: 100%; height: 53px; border-radius: 9px; background: #383838; }
.sample-outline { border: 1px solid #a7a7a7; background: transparent; }
.sample-raised { box-shadow: inset 0 1px #ffffff30,0 4px 6px #0005; background: linear-gradient(#4a4a4a,#2b2b2b); }
.surface-option .menu-check { display: block; margin: 0 auto; width: 20px; height: 20px; }
[data-appearance="outline"] > .menu-trigger { background: #191919; border-color: #a7a7a7; }
[data-appearance="raised"] > .menu-trigger { background: linear-gradient(#454545,#292929); box-shadow: inset 0 1px #ffffff30,0 5px 8px #0003; }
.density-sample { width: 29px; display: grid; gap: 3px; margin-right: 8px; }
.menu-item > .density-sample { flex: none; }
.density-sample b { height: 2px; background: #cfcfcf; border-radius: 2px; }
.spacing-1 { gap: 5px; }.spacing-2 { gap: 7px; }
.format-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 5px; padding: 0 3px; }
.format-option { display: grid; justify-items: start; padding: 9px 13px; gap: 4px; }
.format-option .menu-check { position: absolute; top: 10px; right: 7px; width: 20px; height: 20px; }
.format-option strong { font-size: 13px; font-weight: 500; }.format-option small { color: var(--menu-muted); font-size: 10px; }
.custom-time { padding: 9px 10px; }
.custom-time > label { font-size: 11px; color: var(--menu-muted); }
.custom-time > div { display: flex; gap: 8px; margin-top: 8px; }
.custom-time input { min-width: 0; width: 100%; border: 1px solid #ffffff22; border-radius: 8px; color: #efefef; background: #1c1c1c; padding: 9px; color-scheme: dark; font-size: 13px; }
.custom-time button,.folder-toolbar button { display: grid; place-items: center; flex: none; border: 0; border-radius: 8px; background: transparent; color: #efefef; padding: 5px; }
.folder-toolbar { display: flex; align-items: center; min-height: 41px; gap: 8px; padding: 2px 9px 8px; border-bottom: 1px solid #ffffff10; }
.folder-toolbar strong { font-size: 12px; font-weight: 450; }
.folder-toolbar button .menu-glyph { width: 21px; height: 21px; transform: rotate(90deg); }
.folder-next { transform: rotate(-90deg); width: 18px; height: 18px; }
.folder-pages { position: relative; height: 176px; overflow: hidden; margin-top: 6px; }
.folder-pages > div { position: absolute; inset: 0; transition: transform 260ms var(--study-ease),opacity 180ms ease,visibility 0s 260ms; }
[data-folder-child] { transform: translateX(24px); opacity: 0; visibility: hidden; }
[data-depth="child"] [data-folder-child] { transform: none; opacity: 1; visibility: visible; transition-delay: 0s; }
[data-depth="child"] [data-folder-root] { transform: translateX(-24px); opacity: 0; visibility: hidden; }
[data-depth="root"] [data-folder-root] { visibility: visible; transition-delay: 0s; }
.folder-description { display: grid; justify-items: center; padding: 8px 0 13px; gap: 7px; }
.folder-description > .menu-glyph { width: 38px; height: 38px; }
.folder-description strong { font-size: 14px; font-weight: 450; }.folder-description small { color: var(--menu-muted); font-size: 11px; }
.insert-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 4px; }
.insert-option { display: grid; justify-items: center; gap: 9px; padding: 13px 5px; }
.insert-option:active { border-color: #c4c4c466; }
.menu-study button:focus-visible { outline: 2px solid #c0c0c0; outline-offset: -2px; }
.menu-study button { -webkit-tap-highlight-color: transparent; }
.menu-study .menu-item:not(.menu-done):is(:hover,:active,:focus-visible) { background: transparent; }
.menu-study .menu-item:not(.menu-done):hover { color: #ffffff; }
.menu-item > .person-initials { display: grid; place-items: center; flex: none!important; width: 29px; height: 29px; border: 1px solid #cbcbcb2b; border-radius: 50%; color: #d2d2d2; font: 10px/1 'Instrument Sans',sans-serif; letter-spacing: .02em; }
@media(prefers-reduced-motion:reduce) { .menu-study *, .menu-study *::before,.menu-study *::after { transition: none!important; } }
.menu-demo .menu-panel .menu-item:not(.menu-done){margin-block:0 4px}
`,be=(()=>{let e=new WeakMap;function b(t,{onSelect:o}={}){if(e.has(t))return e.get(t);let n=new AbortController,a=n.signal,p=t.ownerDocument,l=p.defaultView,c=t.querySelector("[data-trigger]"),h=t.querySelector(".menu-panel"),i=t.querySelector("[data-feedback]"),r=t.querySelector("[data-trigger-label]"),d=t.querySelector('input[type="search"]'),y=t.dataset.menu,u=[...t.querySelectorAll("[data-value]")],f=r.textContent,k=i.textContent,g=u.map(w=>w.getAttribute("aria-checked")),m=u.filter(w=>w.getAttribute("aria-checked")==="true").map(w=>w.dataset.value),v=[...m],x=!1,s=!1,_,S="",T=()=>[...h.querySelectorAll("button")].filter(w=>!w.disabled&&!w.hidden&&!w.closest("[inert],[hidden]"));function j(w){u.forEach(z=>{z.hasAttribute("aria-checked")&&z.setAttribute("aria-checked",String(w.includes(z.dataset.value)))})}function M(w=!1){x=!1,t.dataset.open="false",c.setAttribute("aria-expanded","false"),h.inert=!0,h.setAttribute("aria-hidden","true"),t.dataset.confirm&&j(v),w&&c.focus({preventScroll:!0})}function B(w=!1,z=!1){s||c.disabled||(x=!0,t.dataset.open="true",c.setAttribute("aria-expanded","true"),h.inert=!1,h.setAttribute("aria-hidden","false"),w&&(d||(z?T().at(-1):T()[0]))?.focus({preventScroll:!0}))}function C(w,z,N,W=!1){v=[w],j(v),y==="appearance"&&(t.dataset.appearance=w),["move","snooze","insert","export"].includes(y)||(r.textContent=z),i.textContent=N||z+" selected in this preview.",y==="insert"&&(u.forEach(L=>L.setAttribute("aria-current",String(L.dataset.value===w))),r.textContent="Insert "+z.toLowerCase()),W&&M(!0),t.dispatchEvent(new l.CustomEvent("menuselect",{bubbles:!0,detail:{value:w,values:[w]}})),o?.([w])}c.addEventListener("click",w=>x?M():B(w.detail===0||!!d),{signal:a}),c.addEventListener("keydown",w=>{["ArrowDown","ArrowUp"].includes(w.key)&&(w.preventDefault(),B(!0,w.key==="ArrowUp"))},{signal:a}),u.forEach(w=>w.addEventListener("click",()=>{let z=w.dataset.value,N=w.dataset.label;if(t.dataset.confirm){j([z]);return}C(z,N,y==="insert"?N+" block inserted in this preview.":y==="snooze"?N+" selected. No reminder is scheduled.":void 0)},{signal:a})),t.querySelector("[data-apply]")?.addEventListener("click",()=>{let w=u.find(z=>z.getAttribute("aria-checked")==="true");w&&C(w.dataset.value,w.dataset.label,y==="export"?w.dataset.label+" export preview complete. Nothing downloaded.":w.dataset.label+" applied in this preview only.",!0)},{signal:a}),d?.addEventListener("input",()=>{let w=d.value.trim().toLowerCase();u.forEach(z=>z.hidden=!z.textContent.toLowerCase().includes(w)),t.querySelector("[data-empty]").hidden=u.some(z=>!z.hidden)},{signal:a});let q=t.querySelector("[data-folder-root]"),D=t.querySelector("[data-folder-child]"),E=t.querySelector("[data-back]");function P(w,z=!0){let N=!!w;t.dataset.depth=N?"child":"root",q.inert=N,q.setAttribute("aria-hidden",String(N)),D.inert=!N,D.setAttribute("aria-hidden",String(!N)),E.hidden=!N,t.querySelector("[data-path]").textContent=N?"Projects / "+w:"Projects",N&&(t.querySelector("[data-folder-name]").textContent=w),z&&(N?E:q.querySelector("button")).focus({preventScroll:!0})}t.querySelectorAll("[data-folder]").forEach(w=>w.addEventListener("click",()=>P(w.dataset.folder),{signal:a})),E?.addEventListener("click",()=>P(null),{signal:a}),t.querySelector("[data-move]")?.addEventListener("click",()=>{let w=t.querySelector("[data-folder-name]").textContent;C(w.toLowerCase(),w,"Sample moved to "+w+". No real file changed.",!0)},{signal:a});let A=t.querySelector('input[type="time"]');t.querySelector("[data-time-apply]")?.addEventListener("click",()=>{A.reportValidity()&&C(A.value,A.value,"Time set to "+A.value+" in this preview. No reminder is scheduled.",!0)},{signal:a}),t.addEventListener("keydown",w=>{if(!x)return;if(w.key==="Escape"){w.preventDefault(),w.stopPropagation(),M(!0);return}if(w.target===c)return;if(w.key==="ArrowLeft"&&y==="move"&&t.dataset.depth==="child"&&w.target.tagName!=="INPUT"){w.preventDefault(),P(null);return}if(w.target===A||w.target===d&&!["ArrowDown","Enter"].includes(w.key))return;let z=T();if(z.length){if(w.target===d&&w.key==="Enter"){w.preventDefault(),z[0].click();return}if(["ArrowDown","ArrowUp","Home","End"].includes(w.key)){w.preventDefault();let N=z.indexOf(w.target),W=w.key==="Home"?0:w.key==="End"?z.length-1:(N+(w.key==="ArrowDown"?1:-1)+z.length)%z.length;z[W]?.focus({preventScroll:!0})}else!d&&w.key.length===1&&w.key!==" "&&!w.ctrlKey&&!w.metaKey&&(S+=w.key.toLowerCase(),clearTimeout(_),z.find(N=>N.textContent.trim().toLowerCase().startsWith(S))?.focus({preventScroll:!0}),_=setTimeout(()=>S="",600))}},{signal:a}),p.addEventListener("pointerdown",w=>{x&&!w.composedPath().includes(t)&&M()},{signal:a}),t.addEventListener("focusout",()=>queueMicrotask(()=>{x&&!t.matches(":focus-within")&&M()}),{signal:a});function F(){M(t.matches(":focus-within")),v=[...m],u.forEach((w,z)=>{w.hidden=!1,w.removeAttribute("aria-current"),g[z]!==null&&w.setAttribute("aria-checked",g[z])}),r.textContent=f,i.textContent=k,delete t.dataset.appearance,d&&(d.value="",t.querySelector("[data-empty]").hidden=!0),A&&(A.value="15:00"),q&&P(null,!1),clearTimeout(_),S=""}M();let I={open:B,close:M,reset:F,destroy(){M(),s=!0,clearTimeout(_),n.abort(),e.delete(t)}};return e.set(t,I),I}return{mount:b}})(),xe=`
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
`,ke=(()=>{let e=new WeakMap;function b(t,{onSelect:o}={}){if(e.has(t))return e.get(t);if(o!==void 0&&typeof o!="function")throw new TypeError("onSelect must be a function.");let n=new AbortController,a=n.signal,p=t.querySelector("[data-trigger]"),l=t.querySelector(".menu-panel"),c=[...t.querySelectorAll("[data-value]")],h=t.querySelector('input[type="search"]'),i=t.querySelector("[data-feedback]"),r=t.querySelector("[data-trigger-label]"),d=c.map(C=>C.getAttribute("aria-checked")),y=r?.textContent,u=i.textContent,f=t.ownerDocument,k=f.defaultView,g=t.dataset.menu,m=!1,v=!1,x="",s,_=()=>c.filter(C=>!C.hidden&&!C.disabled);function S(C=!1){m=!1,t.dataset.open="false",p.setAttribute("aria-expanded","false"),l.inert=!0,l.setAttribute("aria-hidden","true"),C&&p.focus({preventScroll:!0})}function T(C=!1,q=!1){v||p.disabled||(t.dataset.open="true",m=!0,p.setAttribute("aria-expanded","true"),l.inert=!1,l.setAttribute("aria-hidden","false"),C&&(h||(q?_().at(-1):_()[0]))?.focus({preventScroll:!0}))}function j(C){let q=C.dataset.value;if(g==="sort")c.forEach(E=>E.setAttribute("aria-checked",String(E===C))),r.textContent=C.querySelector("span").textContent,i.textContent="Sorted by "+r.textContent.toLowerCase()+".";else if(g==="labels"){C.setAttribute("aria-checked",String(C.getAttribute("aria-checked")!=="true"));let E=c.filter(P=>P.getAttribute("aria-checked")==="true");t.querySelector("[data-count]").textContent=String(E.length),i.textContent=E.length?E.map(P=>P.querySelector("[data-label]").textContent).join(" \xB7 "):"No labels selected."}else i.textContent=C.dataset.result;let D=g==="labels"?c.filter(E=>E.getAttribute("aria-checked")==="true").map(E=>E.dataset.value):[q];o?.(D),t.dispatchEvent(new k.CustomEvent("menuselect",{bubbles:!0,detail:{value:q,values:D}})),g!=="labels"&&S(!0)}p.addEventListener("click",C=>m?S():T(C.detail===0||!!h),{signal:a}),p.addEventListener("keydown",C=>{["ArrowDown","ArrowUp"].includes(C.key)&&(C.preventDefault(),T(!0,C.key==="ArrowUp"))},{signal:a});for(let C of c)C.addEventListener("click",()=>j(C),{signal:a});t.querySelector("[data-done]")?.addEventListener("click",()=>S(!0),{signal:a}),t.addEventListener("keydown",C=>{if(!m||C.target===p&&C.key!=="Escape")return;if(C.key==="Escape"){C.preventDefault(),C.stopPropagation(),S(!0);return}let q=_();if(!(C.target===h&&!["ArrowDown","Enter"].includes(C.key))){if(C.target===h&&C.key==="Enter"){C.preventDefault(),q[0]?.click();return}if(["ArrowDown","ArrowUp","Home","End"].includes(C.key)){C.preventDefault();let D=q.indexOf(C.target),E=C.key==="Home"?0:C.key==="End"?q.length-1:(D+(C.key==="ArrowDown"?1:-1)+q.length)%q.length;q[E]?.focus()}else!h&&C.key.length===1&&C.key!==" "&&!C.ctrlKey&&!C.metaKey&&(x+=C.key.toLowerCase(),clearTimeout(s),q.find(D=>D.textContent.trim().toLowerCase().startsWith(x))?.focus(),s=setTimeout(()=>{x=""},600))}},{signal:a}),h?.addEventListener("input",()=>{let C=h.value.trim().toLowerCase();c.forEach(q=>{q.hidden=!q.textContent.toLowerCase().includes(C)}),t.querySelector("[data-empty]").hidden=_().length>0},{signal:a}),f.addEventListener("pointerdown",C=>{m&&!C.composedPath().includes(t)&&S()},{signal:a}),t.addEventListener("focusout",()=>queueMicrotask(()=>{m&&!t.matches(":focus-within")&&S()}),{signal:a}),t.querySelector("[data-context]")?.addEventListener("contextmenu",C=>{C.preventDefault();let q=t.getBoundingClientRect();t.style.setProperty("--menu-x",Math.max(0,Math.min(q.width-232,C.clientX-q.left))+"px"),t.style.setProperty("--menu-y",Math.max(76,Math.min(112,C.clientY-q.top))+"px"),t.style.setProperty("--origin-x",Math.max(0,Math.min(232,C.clientX-q.left-parseFloat(t.style.getPropertyValue("--menu-x"))))+"px"),T(!0)},{signal:a});function M(){S(t.matches(":focus-within")),clearTimeout(s),x="",c.forEach((q,D)=>{d[D]!==null&&q.setAttribute("aria-checked",d[D]),q.hidden=!1}),r&&(r.textContent=y),h&&(h.value="",t.querySelector("[data-empty]").hidden=!0);let C=t.querySelector("[data-count]");C&&(C.textContent=String(d.filter(q=>q==="true").length)),i.textContent=u,t.style.removeProperty("--menu-x"),t.style.removeProperty("--menu-y"),t.style.removeProperty("--origin-x")}S();let B={open:T,close:S,reset:M,destroy(){v=!0,S(),clearTimeout(s),n.abort(),e.delete(t)}};return e.set(t,B),B}return{mount:b}})(),ve=`
.sl-component { position: relative; }
.sl-component .sl-field-control { display: flex; align-items: stretch; gap: 6px; }
.sl-component .sl-field-control input { flex: 1; width: 0; }
.sl-component .sl-icon-button { display: grid; place-items: center; flex: 0 0 38px; padding: 6px; min-height: 44px; background: var(--field-hover); }
.sl-component .sl-icon-button svg { width: 18px; height: 18px; }
.sl-component .sl-picker-panel { position: absolute; z-index: 3; inset: 8px; display: flex; flex-direction: column; gap: 12px; min-width: 0; padding: 12px; border: 1px solid var(--field-border); border-radius: 12px; background: var(--field-surface); box-shadow: 0 6px 18px #0003; visibility: hidden; opacity: 0; transform: translateY(4px) scale(.985); pointer-events: none; transition: opacity 180ms var(--field-ease), transform 180ms var(--field-ease), visibility 0s 180ms; }
.sl-component .sl-picker-panel[data-open="true"] { visibility: visible; opacity: 1; transform: none; pointer-events: auto; transition-delay: 0s; }
.sl-component .sl-picker-header { display: flex; align-items: center; justify-content: space-between; gap: 8px; flex: none; }
.sl-component .sl-picker-header strong { font-size: 14px; font-weight: 550; }
.sl-component .sl-picker-header button { flex: 0 0 30px; min-height: 30px; padding: 0; font-size: 22px; line-height: 1; border-color: transparent; }
.sl-component .sl-picker-body { min-height: 0; flex: 1; overflow: auto; overscroll-behavior: contain; scrollbar-width: thin; scrollbar-color: var(--field-border) transparent; }
.sl-component .sl-picker-footer { display: flex; justify-content: space-between; align-items: center; gap: 8px; flex: none; }
.sl-component .sl-picker-footer:empty { display: none; }
.sl-component .sl-picker-panel button[aria-pressed="true"], .sl-component .sl-picker-panel button[aria-selected="true"] { background: var(--field-accent); color: var(--field-surface); border-color: var(--field-accent); }
@media (prefers-reduced-motion: reduce) { .sl-component .sl-picker-panel { transition: none; transform: none; } }
.sl-component {
  --field-surface: #222222; --field-hover: #2e2e2e; --field-active: #424242;
  --field-text: #fafafa; --field-muted: #bbbbbb; --field-accent: #e0e0e0;
  --field-border: #5a5a5a; --field-focus: #e0e0e0; --field-error: #f0bfad;
  --field-ease: cubic-bezier(.4, 0, .2, 1);
  box-sizing: border-box; width: min(320px, 100%); min-width: 0; padding: 20px;
  background: var(--field-surface); color: var(--field-text); border: 1px solid var(--field-border);
  border-radius: 16px; box-shadow: 0 2px 5px #0000000d; text-align: left;
  font: 400 14px/1.5 'Instrument Sans', sans-serif; color-scheme: dark;
}
.sl-component *, .sl-component *::before, .sl-component *::after { box-sizing: border-box; }
.sl-component [hidden] { display: none !important; }
.sl-component .sl-heading { display: flex; align-items: center; gap: 10px; margin: 0 0 20px; font-size: 15px; font-weight: 550; }
.sl-component svg { width: 22px; height: 22px; flex: none; fill: none; stroke: currentColor; stroke-width: 1.5; stroke-linecap: round; stroke-linejoin: round; }
.sl-component .sl-heading svg { color: var(--field-accent); }
.sl-component label, .sl-component legend { display: block; padding: 0; color: var(--field-muted); font-size: 12px; }
.sl-component label > span { display: block; margin-bottom: 6px; }
.sl-component fieldset { min-width: 0; margin: 0; padding: 0; border: 0; }
.sl-component legend { margin-bottom: 10px; }
.sl-component input, .sl-component select, .sl-component button { font: inherit; }
.sl-component input:not([type="color"]), .sl-component select { display: block; width: 100%; min-width: 0; min-height: 44px; margin: 0; padding: 10px; border: 1px solid var(--field-border); border-radius: 8px; outline: none; background: var(--field-hover); color: var(--field-text); caret-color: var(--field-text); transition: border-color 180ms ease, background-color 180ms ease; }
.sl-component input::placeholder { color: var(--field-muted); opacity: 1; }
.sl-component input:focus-visible, .sl-component select:focus-visible { border-color: var(--field-focus); }
.sl-component input[aria-invalid="true"] { border-color: var(--field-error); }
.sl-component button { min-height: 36px; padding: 7px 12px; border: 1px solid var(--field-border); border-radius: 8px; color: var(--field-text); background: transparent; cursor: pointer; touch-action: manipulation; transition: background-color 180ms ease, color 180ms ease, transform 180ms var(--field-ease); }
.sl-component button:hover { background: var(--field-active); }
.sl-component button:active { transform: translateY(1px); }
.sl-component button:focus-visible, .sl-component input[type="color"]:focus-visible { outline: 2px solid var(--field-focus); outline-offset: -2px; }
.sl-component :is(input, select, button):disabled { opacity: .55; cursor: not-allowed; }
.sl-component .sl-primary { background: var(--field-accent); color: var(--field-surface); border-color: var(--field-accent); }
.sl-component .sl-primary:hover { background: var(--field-text); }
.sl-component .sl-row { display: flex; align-items: end; gap: 8px; }
.sl-component .sl-row > label { flex: 1; min-width: 0; }
.sl-component .sl-stack { display: grid; gap: 12px; }
.sl-component .sl-actions { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; margin-top: 12px; }
.sl-component .sl-note { margin: 12px 0 0; color: var(--field-muted); font-size: 12px; overflow-wrap: anywhere; }
.sl-component .sl-status { min-height: 36px; margin: 14px 0 0; font-size: 12px; color: var(--field-muted); overflow-wrap: anywhere; }
.sl-component[data-invalid="true"] .sl-status { color: var(--field-error); }
.sl-component output { display: block; margin-top: 16px; padding-top: 12px; border-top: 1px solid var(--field-border); color: var(--field-accent); font-size: 14px; font-variant-numeric: tabular-nums; overflow-wrap: anywhere; }
@media (prefers-reduced-motion: reduce) { .sl-component *, .sl-component *::before, .sl-component *::after { animation: none !important; transition: none !important; scroll-behavior: auto !important; } }
@media (forced-colors: active) { .sl-component { border-color: CanvasText; } .sl-component button, .sl-component input, .sl-component select { border: 1px solid ButtonText; } .sl-component :focus-visible { outline: 2px solid Highlight; outline-offset: -2px; } }
.sl-component .sl-file-control { position: relative; display: block; min-height: 44px; padding: 10px; margin: 0; border: 1px solid var(--field-border); border-radius: 8px; background: var(--field-hover); color: var(--field-text); font-size: 14px; }
.sl-component .sl-file-control:has(input:focus-visible) { outline: 2px solid var(--field-focus); outline-offset: -2px; }
.sl-component .sl-file-control:has(input:disabled) { opacity: .55; }
.sl-component .sl-file-control input[type="file"] { position: absolute; inset: 0; width: 100%; height: 100%; padding: 0; opacity: 0; cursor: pointer; }
.sl-component .sl-file-detail { margin-top: 16px; padding-top: 12px; border-top: 1px solid var(--field-border); }
.sl-component .sl-file-name { color: var(--field-accent); margin: 0; overflow-wrap: anywhere; }
.sl-component .sl-file-size { margin: 4px 0 0; color: var(--field-muted); font-size: 12px; }

.sl-component .sl-file-name { max-height: 126px; overflow-y: auto; }
.sl-component .sl-demo-file > span { display: block; margin-bottom: 6px; color: var(--field-muted); font-size: 12px; }
.sl-component .sl-demo-choose { display: block; width: 100%; min-height: 44px; padding: 10px; background: var(--field-hover); text-align: left; }
.sl-component .sl-demo-files { display: grid; gap: 8px; }
.sl-component .sl-demo-files button { text-align: left; padding: 10px; width: 100%; }
.sl-component .sl-demo-files span { display: block; font-size: 12px; overflow-wrap: anywhere; }
.sl-component .sl-demo-files small { display: block; font-size: 10px; margin-top: 4px; color: var(--field-muted); }
`,ae=(()=>{"use strict";function e(o,n,a,p){let l=o.ownerDocument,c=l.createElement("div"),h=l.createElement("div"),i=l.createElement("strong"),r=l.createElement("button");c.className="sl-picker-panel",c.id="picker-"+l.defaultView.crypto.randomUUID(),c.setAttribute("role","dialog"),c.setAttribute("aria-label",n),c.setAttribute("aria-hidden","true"),c.inert=!0,h.className="sl-picker-header",i.textContent=n,r.type="button",r.textContent="\xD7",r.setAttribute("aria-label","Close picker"),h.append(i,r);let d=l.createElement("div"),y=l.createElement("div");d.className="sl-picker-body",y.className="sl-picker-footer",c.append(h,d,y),o.append(c);let u=!1,f=null,k=[],g=new Set;function m(s=!0){u&&(u=!1,c.dataset.open="false",c.inert=!0,c.setAttribute("aria-hidden","true"),k.forEach(([_,S])=>{_.inert=S}),k=[],f?.setAttribute("aria-expanded","false"),s&&f?.isConnected&&!f.disabled&&f.focus())}function v(s){g.add(s),s.setAttribute("aria-haspopup","dialog"),s.setAttribute("aria-expanded","false"),s.setAttribute("aria-controls",c.id)}function x(s,_){p||s.disabled||(m(!1),f=s,v(s),u=!0,c.dataset.open="true",c.inert=!1,c.setAttribute("aria-hidden","false"),s.setAttribute("aria-expanded","true"),(_||r).focus({preventScroll:!0}),k=[...o.children].filter(S=>S!==c).map(S=>[S,S.inert]),k.forEach(([S])=>{S.inert=!0}))}return a(r,"click",()=>m()),a(c,"keydown",s=>{if(s.key==="Escape"&&(s.preventDefault(),s.stopPropagation(),m()),s.key!=="Tab")return;let _=[...c.querySelectorAll("button, input, [tabindex]")].filter(M=>!M.disabled&&M.tabIndex>=0&&M.checkVisibility()),S=_[0],T=_[_.length-1],j=o.getRootNode().activeElement;s.shiftKey&&j===S?(s.preventDefault(),T?.focus()):!s.shiftKey&&j===T&&(s.preventDefault(),S?.focus())}),a(l,"pointerdown",s=>{u&&!s.composedPath().includes(o)&&m(!1)}),{body:d,footer:y,panel:c,heading:i,bind:v,open:x,close:m,get isOpen(){return u},destroy(){m(),g.forEach(s=>{s.removeAttribute("aria-controls"),s.setAttribute("aria-expanded","false")}),c.remove()}}}function b(o,n={}){if(!o||!o.matches(".sl-component"))throw new TypeError("A .sl-component root is required.");let a=o.ownerDocument,p=a.defaultView;o.dispatchEvent(new p.Event("sl:inputs-remount"));let l=new p.AbortController,c=!1,h=!1,i=L=>o.querySelector(L),r=L=>[...o.querySelectorAll(L)],d=(L,H,O)=>L.addEventListener(H,O,{signal:l.signal}),y=()=>o.getRootNode().activeElement,u=L=>!c&&!n.disabled&&!L?.disabled&&!L?.readOnly,f=r("input, select, button").map(L=>[L,L.disabled]),k=r("input, select").map(L=>[L,L.validity.customError?L.validationMessage:""]),g=new Map;r("[id]").forEach(L=>{let H=L.dataset.slId||L.id;L.dataset.slId=H;let O=H+"-"+p.crypto.randomUUID();g.set(L.id,O),L.id=O}),r("[for], [aria-describedby], [aria-controls], [aria-labelledby]").forEach(L=>{["for","aria-describedby","aria-controls","aria-labelledby"].forEach(H=>{L.hasAttribute(H)&&L.setAttribute(H,L.getAttribute(H).split(" ").map(O=>g.get(O)||O).join(" "))})});let m=i(".sl-status");function v(L,H=!1){m.textContent=L,o.dataset.invalid=String(H)}let x,s;function _(){let L=N();x=JSON.stringify(L),s=L.file}function S(){let L=N(),H=JSON.stringify(L);H===x&&L.file===s||(x=H,s=L.file,o.dispatchEvent(new p.CustomEvent("sl:change",{bubbles:!0,composed:!0,detail:L})),typeof n.onChange=="function"&&n.onChange(L))}function T(L,H=()=>{}){function O(){c||(c=!0,l.abort(),H(),k.forEach(([X,Q])=>X.setCustomValidity(Q)),f.forEach(([X,Q])=>{X.disabled=Q}))}d(o,"sl:inputs-remount",O),d(o,"compositionstart",()=>{h=!0}),d(o,"compositionend",()=>{h=!1});let Z=o.closest("form");return Z&&d(Z,"reset",X=>p.queueMicrotask(()=>{!c&&!X.defaultPrevented&&(h=!1,L(),_())})),L(),_(),n.disabled&&r("input, select, button").forEach(X=>{X.disabled=!0}),{reset(){c||(h=!1,L(),_(),n.disabled&&r("input, select, button").forEach(X=>{X.disabled=!0}))},destroy:O,get state(){return N()}}}let j=i("input"),M=i(".sl-remove-file"),B=i(".sl-file-name"),C=i(".sl-file-size"),q=n.demo===!0,D=i(".sl-demo-choose"),E=i(".sl-real-file"),P=i(".sl-demo-file");E.hidden=q,P.hidden=!q;let A=e(o,"Demo files",d,n.disabled);A.bind(D);let F=[{name:"Project brief.txt",type:"text/plain",content:"Sample project brief. This document exists only in memory."},{name:"Research notes.md",type:"text/markdown",content:`# Sample research notes

No files from your computer are used.`},{name:"Release checklist.txt",type:"text/plain",content:`Sample checklist
Review components
Check keyboard controls`}],I=a.createElement("div");I.className="sl-demo-files",F.forEach((L,H)=>{let O=a.createElement("button"),Z=a.createElement("span"),X=a.createElement("small");O.type="button",O.dataset.sample=String(H),Z.textContent=L.name,X.textContent="Sample \xB7 stored in memory",O.append(Z,X),I.append(O)}),A.body.append(I);let w=null,z=!0;function N(){return{file:w,valid:z,value:w?{name:w.name,size:w.size,type:w.type,lastModified:w.lastModified}:null}}function W(L=!1){j.value="",w=null,z=!0,j.removeAttribute("aria-invalid"),j.setCustomValidity(""),M.disabled=!0,B.textContent="No file selected",C.textContent=q?"Built-in samples. No computer files.":"PDF, TXT or MD \xB7 up to 5 MiB",v(q?"Demo only. Choose a sample document.":"Local selection only. Nothing is uploaded or read."),L&&(q?D:j).focus()}return d(j,"change",()=>{if(w=j.files[0]??null,!w){W(),S();return}z=/\.(pdf|txt|md)$/i.test(w.name)&&w.size<=5*1024*1024,j.setAttribute("aria-invalid",String(!z)),j.setCustomValidity(z?"":"Choose a PDF, TXT or MD file no larger than 5 MiB."),B.textContent=w.name,C.textContent=w.size.toLocaleString("en-US")+" bytes",M.disabled=!!n.disabled,v(z?"Selected locally. Nothing is uploaded or read.":"Choose a PDF, TXT or MD file no larger than 5 MiB.",!z),S()}),d(M,"click",()=>{u(j)&&(W(!0),S())}),d(D,"click",()=>{q&&u(D)&&A.open(D,I.querySelector("button"))}),d(I,"click",L=>{let H=L.target.closest("[data-sample]");if(!q||!H||!u(D))return;let O=F[Number(H.dataset.sample)];w=new p.File([O.content],O.name,{type:O.type,lastModified:0}),z=!0,B.textContent=w.name,C.textContent=w.size.toLocaleString("en-US")+" bytes",M.disabled=!!n.disabled,v("Demo file selected. Nothing is read or uploaded."),S(),A.close()}),d(j,"click",L=>{q&&L.preventDefault()}),T(()=>{A.close(),W()},()=>{w=null,A.destroy(),E.hidden=!1,P.hidden=!0})}function t(o){return b(o,{demo:!0})}return{mount:b,mountPreview:t}})(),ye=(()=>{let e=new WeakMap,b=0;function t(n,a,p=()=>({})){if(e.has(n))return e.get(n);let l=n?.querySelector("input, textarea"),c=l?.tagName==="TEXTAREA"?"textarea":l?.type;if(!l||c!==a)throw new TypeError(`A native ${a} control is required.`);let h=n.ownerDocument,i=h.defaultView,r=new i.AbortController,d=[],y=[],u=!1,f=(m,v,x,s={})=>m.addEventListener(v,x,{...s,signal:r.signal}),k=p({root:n,input:l,doc:h,view:i,on:f,resets:d,cleanups:y,alive:()=>!u});l.form&&f(l.form,"reset",m=>queueMicrotask(()=>{!u&&!m.defaultPrevented&&d.forEach(v=>v())}));let g={reset(){u||(l.value=l.defaultValue,d.forEach(m=>m()))},destroy(){u||(u=!0,r.abort(),y.forEach(m=>m()),e.delete(n))}};return Object.defineProperties(g,Object.getOwnPropertyDescriptors(k)),e.set(n,g),g}function o(n,{items:a=["Buttons","Inputs","Toggles","Checkboxes","Sliders","Menus","Navigation","Overlays","Feedback","Data display"]}={}){if(!Array.isArray(a)||a.some(l=>typeof l!="string"))throw new TypeError("Search items must be strings.");let p=[...new Set(a)];return t(n,"search",({root:l,input:c,doc:h,view:i,on:r,resets:d,cleanups:y,alive:u})=>{let f=l.querySelector(".sl-field__popup"),k=l.querySelector(".sl-field__options"),g=l.querySelector(".sl-field__clear"),m=l.querySelector(".sl-field__empty"),v=l.querySelector(".sl-field__helper");if(!f||!k||!g||!m||!v)throw new TypeError("Search needs its list, clear action and helper.");k.id||(k.id="sl-field-options-"+ ++b),c.setAttribute("aria-controls",k.id);let x=v.textContent,s=l.querySelector(".sl-field__leading"),_=i.matchMedia("(prefers-reduced-motion: reduce)"),S=null;function T(){S?.cancel(),S=null}function j(){if(_.matches||!s?.animate||S?.playState==="running")return;T(),S=s.animate([{transform:"translateY(0) rotate(0) scale(1)",easing:"ease-in-out"},{transform:"translateY(1px) rotate(3deg) scale(.96)",offset:.14,easing:"cubic-bezier(.25, .1, .25, 1)"},{transform:"translateY(-6px) rotate(-16deg) scale(1.08)",offset:.46,easing:"cubic-bezier(.35, 0, .3, 1)"},{transform:"translateY(.7px) rotate(2deg) scale(1)",offset:.78,easing:"ease-out"},{transform:"translateY(0) rotate(0) scale(1)"}],{duration:700});let A=S;A.onfinish=()=>{S===A&&T()}}let M=[],B=-1,C=!1;function q(){C=!1,B=-1,l.dataset.searchOpen="false",f.inert=!0,f.setAttribute("aria-hidden","true"),c.setAttribute("aria-expanded","false"),c.removeAttribute("aria-activedescendant")}function D(A){B=A,[...k.children].forEach((F,I)=>F.setAttribute("aria-selected",String(I===B))),B>=0?c.setAttribute("aria-activedescendant",k.children[B].id):c.removeAttribute("aria-activedescendant")}function E(A=!0){let F=c.value.trim().toLocaleLowerCase();if(M=p.filter(I=>I.toLocaleLowerCase().includes(F)).slice(0,4),k.replaceChildren(...M.map((I,w)=>{let z=h.createElement("li");return z.className="sl-field__option",z.id=k.id+"-"+w,z.setAttribute("role","option"),z.setAttribute("aria-selected","false"),z.dataset.index=String(w),z.textContent=I,z})),g.hidden=!c.value,m.hidden=M.length>0,D(-1),!A||c.disabled||c.readOnly){q();return}C=!0,l.dataset.searchOpen="true",f.inert=!1,f.setAttribute("aria-hidden","false"),c.setAttribute("aria-expanded","true"),v.textContent=M.length?`${M.length} suggestions. Use the arrow keys to choose.`:"No matching components."}function P(A){!u()||!M[A]||(c.value=M[A],c.dispatchEvent(new i.Event("input",{bubbles:!0,composed:!0})),c.dispatchEvent(new i.Event("change",{bubbles:!0,composed:!0})),c.focus({preventScroll:!0}),q(),v.textContent=`${c.value} selected.`,c.dispatchEvent(new i.CustomEvent("searchselect",{bubbles:!0,composed:!0,detail:{value:c.value}})))}return r(c,"focus",()=>{E(),j()}),r(c,"pointerdown",A=>{A.button===0&&(h.activeElement===c||l.getRootNode().activeElement===c)&&j()}),r(c,"input",A=>{A.isComposing||E()}),r(c,"compositionend",()=>E()),r(c,"keydown",A=>{if(!A.isComposing)if(A.key==="ArrowDown"||A.key==="ArrowUp"){if(A.preventDefault(),C||E(),!M.length)return;D(A.key==="ArrowDown"?(B+1)%M.length:B<=0?M.length-1:B-1)}else A.key==="Enter"&&C?(A.preventDefault(),B>=0&&P(B)):A.key==="Escape"&&C&&(A.preventDefault(),q(),v.textContent=x)}),r(k,"pointerdown",A=>A.preventDefault()),r(k,"click",A=>{let F=A.target.closest('[role="option"]');F&&k.contains(F)&&P(Number(F.dataset.index))}),r(g,"click",()=>{c.disabled||c.readOnly||(c.value="",c.dispatchEvent(new i.Event("input",{bubbles:!0,composed:!0})),c.dispatchEvent(new i.Event("change",{bubbles:!0,composed:!0})),c.focus({preventScroll:!0}),q(),v.textContent=x)}),r(l,"focusout",A=>{if(A.relatedTarget){l.contains(A.relatedTarget)||q();return}queueMicrotask(()=>{u()&&!l.contains(l.getRootNode().activeElement||h.activeElement)&&q()})}),r(h,"pointerdown",A=>{C&&!A.composedPath().includes(l)&&q()}),r(_,"change",()=>{_.matches&&T()}),d.push(()=>{T(),E(!1),v.textContent=x}),y.push(()=>{T(),q(),g.hidden=!0}),E(!1),{close:()=>{u()&&q()},get isOpen(){return C}}})}return{mount:o}})(),we=`
.nav-demo{width:min(320px,100%);min-width:0;--nav-ease:cubic-bezier(.22,.61,.36,1);color:#f0f0f0;font-family:'Instrument Sans',sans-serif;font-size:13px}
.navigation-review .skip-link:not(:focus){clip-path:inset(100%)}
@media(max-width:420px){.navigation-review .header-inner{padding-inline:16px;gap:10px}.navigation-review .wordmark{font-size:18px;white-space:nowrap}.navigation-review .navigation{gap:2px}.navigation-review .nav-item{padding-inline:5px;font-size:11px;gap:4px}}
.nav-demo *{box-sizing:border-box}.nav-demo [hidden]{display:none!important}
.nav-surface{border:1px solid #ffffff16;border-radius:17px;background:#232323;box-shadow:inset 0 1px #ffffff08,0 3px 6px #00000015;overflow:hidden}
.nav-demo button{font:inherit;color:inherit;cursor:pointer;border:0;background:transparent;-webkit-tap-highlight-color:transparent}
.nav-demo button:focus-visible,.nav-content:focus-visible{outline:2px solid #c9c9c9;outline-offset:-3px;border-radius:7px}
.nav-demo button:disabled{opacity:.3;cursor:default}
.menu-glyph{display:inline-flex;flex:none;align-items:center;justify-content:center;width:24px;height:24px;pointer-events:none;vertical-align:middle}
.menu-glyph>svg{display:block;width:100%;height:100%;fill:none;stroke:currentColor;stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round}
.nav-demo .arrow-left{transform:rotate(90deg)}.nav-demo .arrow-right{transform:rotate(-90deg)}
.nav-track{position:relative;display:flex;isolation:isolate}
.nav-track button{position:relative;z-index:1;flex:1;min-width:0;min-height:48px;padding:8px 3px;color:#b8b8b8;transition:color 160ms ease;white-space:nowrap}
.nav-track button[aria-selected=true]{color:#f4f4f4}
.nav-track button:hover{color:#fff}
.nav-indicator{position:absolute;left:0;bottom:0;width:var(--indicator-width,33.333%);transform:translateX(var(--indicator-x,0px));background:#dcdcdc;pointer-events:none}
[data-ready=true] .nav-indicator,[data-ready=true] .page-indicator{transition:transform 260ms var(--nav-ease),width 260ms var(--nav-ease)}
.underline-track{margin:0 16px;border-bottom:1px solid #ffffff13}
.underline-track .nav-indicator{height:2px;border-radius:3px;bottom:-1px}
.nav-content{min-height:181px;padding:23px 20px}
.nav-eyebrow{font-size:9px;letter-spacing:.1em;color:#a9a9a9}
.nav-content h3{margin:12px 0 8px;font-size:19px;font-weight:500;letter-spacing:-.025em}
.nav-content p{font-size:12px;color:#bebebe;line-height:1.6;margin:0;max-width:225px}
.project-meta{display:flex;align-items:center;gap:6px;font-size:9px;color:#b2b2b2;margin-top:20px;white-space:nowrap}
.status-dot{width:5px;height:5px;border-radius:50%;background:#b7cdbd}.meta-line{width:1px;height:10px;background:#ffffff25;margin:0 4px}
.document-row{display:flex;align-items:center;gap:10px;min-height:48px}.document-row+.document-row{border-top:1px solid #ffffff0e}
.document-row>.menu-glyph{color:#c4c4c4}.document-row strong,.activity-line strong{font-size:12px;font-weight:450;display:block}
.document-row small,.activity-line small{display:block;font-size:10px;color:#b2b2b2;margin-top:4px}
.activity-line{display:flex;position:relative;align-items:center;gap:14px;min-height:58px}.activity-line>span{width:7px;height:7px;border-radius:50%;border:1px solid #c5c5c5}.activity-line:first-child:after{content:'';position:absolute;top:34px;left:3px;height:47px;width:1px;background:#aaaaaa3a}
.segment-track{margin:12px;padding:3px;border:1px solid #ffffff0c;border-radius:12px;background:#191919}
.segment-track button{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:5px;min-height:57px;font-size:11px}
.segment-track .menu-glyph{width:22px;height:22px}
.segment-track .nav-indicator{top:3px;bottom:3px;border-radius:9px;background:#3c3c3c;box-shadow:inset 0 1px #ffffff0e}
.view-surface .nav-content{min-height:173px;padding:0 18px 18px}
.mini-board{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:6px;padding-top:10px;min-height:150px}
.mini-board>div{background:#1b1b1b;border:1px solid #ffffff07;border-radius:8px;padding:10px 5px}
.mini-board small{font-size:7px;color:#b5b5b5;letter-spacing:.025em}.mini-board span{display:block;font-size:10px;padding:12px 3px;margin-top:10px;border-radius:5px;background:#3d3d3d}
.mini-timeline{padding-top:10px}.mini-timeline>div{position:relative;height:39px;display:grid;grid-template-columns:60px 1fr;align-items:center;border-bottom:1px solid #ffffff08;gap:8px}.mini-timeline span{font-size:10px;color:#cacaca}.mini-timeline b{display:block;height:14px;width:48%;border-radius:5px;background:#b9c9bd}.mini-timeline>div:nth-child(2) b{margin-left:26%;background:#859b8d}.mini-timeline>div:nth-child(3) b{margin-left:65%;width:35%;background:#52695c}.mini-timeline footer{display:flex;justify-content:space-between;margin-left:68px;padding-top:10px}.mini-timeline footer span{font-size:8px;color:#a0a0a0}
.trail-surface{padding:18px 16px}.folder-trail{display:flex;align-items:center;gap:4px;list-style:none;margin:0;padding:0 0 16px;border-bottom:1px solid #ffffff15;min-height:44px}.folder-trail li{display:flex;align-items:center;gap:3px;min-width:0}.folder-trail button,.folder-trail [aria-current]{font-size:11px;white-space:nowrap;padding:6px 2px}.folder-trail button{color:#adadad}.folder-trail .menu-glyph{width:12px;height:12px;transform:rotate(-90deg);color:#909090}.trail-body{min-height:145px;padding-top:10px}.trail-folder{display:flex;gap:10px;align-items:center;text-align:left;width:100%;min-height:44px;border-radius:8px}.trail-folder .menu-glyph{color:#cbcbcb}.trail-folder span{flex:1}.trail-folder:hover span{color:#d3d3d3}.trail-folder>.arrow-right{width:16px;height:16px;color:#9e9e9e}.trail-note{margin:10px 0 0;color:#ababab;font-size:10px;line-height:1.5;min-height:15px}
.pages-surface{padding:20px 16px 15px}.collection-heading{display:flex;justify-content:space-between;align-items:center;gap:10px;margin-bottom:13px}.collection-heading strong{font-size:13px;font-weight:500}.collection-heading>span{font-size:10px;color:#b3b3b3;font-variant-numeric:tabular-nums}.page-files{min-height:112px}.page-files .document-row{min-height:53px}.pagination{display:flex;align-items:center;gap:6px;justify-content:space-between;padding-top:13px;border-top:1px solid #ffffff12}.pagination>button{width:28px;height:36px;display:grid;place-items:center;padding:0}.pagination .menu-glyph{width:20px;height:20px}.page-numbers{display:flex;position:relative;isolation:isolate;flex:1;max-width:190px}.page-numbers button{position:relative;flex:1;min-width:0;height:34px;font-size:12px;z-index:1}.page-indicator{position:absolute;top:0;bottom:0;left:0;width:20%;border:1px solid #bfbfbf55;background:#d1d1d10c;border-radius:50%;transform:translateX(var(--page-x,0px))}
.sidebar-surface{display:grid;grid-template-columns:116px minmax(0,1fr);min-height:242px;transition:grid-template-columns 260ms var(--nav-ease)}
.side-rail{padding:12px 6px;border-right:1px solid #ffffff12;min-width:0;overflow:hidden}.rail-toggle{display:grid;place-items:center;width:40px;height:36px;margin:0 0 13px 3px}.rail-toggle .menu-glyph{width:20px;height:20px;transition:transform 240ms var(--nav-ease)}
.side-links{position:relative}.side-links button{display:flex;align-items:center;gap:9px;width:100%;height:44px;padding:0 7px;color:#b4b4b4}.side-links button .menu-glyph{width:23px;height:23px}.side-links button span{font-size:11px;transition:opacity 130ms ease;white-space:nowrap}.side-links button[aria-current]{color:#f5f5f5}.side-marker{position:absolute;left:-6px;top:11px;width:2px;height:22px;border-radius:3px;background:#d2d2d2;transform:translateY(var(--side-y,0px));transition:transform 240ms var(--nav-ease)}
.side-content{padding:24px 14px;min-width:0}.side-content>.menu-glyph{width:28px;height:28px;color:#c7c7c7}.side-content h3{font-weight:500;font-size:15px;margin:18px 0 10px}.side-content p{font-size:11px;line-height:1.6;color:#b8b8b8;margin:0}.side-content small{display:block;margin-top:24px;font-size:9px;color:#b1b1b1}
[data-collapsed=true] .sidebar-surface{grid-template-columns:53px minmax(0,1fr)}[data-collapsed=true] .side-links button span{opacity:0;pointer-events:none}[data-collapsed=true] .rail-toggle .menu-glyph{transform:rotate(-90deg)}
@media(max-width:420px){.nav-content{padding-inline:14px}.project-meta{font-size:8px;gap:4px}.sidebar-surface{grid-template-columns:104px minmax(0,1fr)}.side-content{padding-inline:10px}.folder-trail{gap:1px}.folder-trail button,.folder-trail [aria-current]{font-size:10px}.pagination{gap:2px}}
@media(prefers-reduced-motion:reduce){.nav-demo *,.nav-demo *::after{transition:none!important;animation:none!important}}


body{margin:0;min-height:100svh;display:grid;place-items:center;background:#edf0f1}.nav-demo{width:min(320px,calc(100vw - 32px))}.sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%)}`,_e=(()=>{function e(b){let t=new AbortController,o=t.signal,n=matchMedia("(prefers-reduced-motion: reduce)"),a=new Map,p=new Map,l=[];function c(r){if(a.get(r)?.cancel(),n.matches)return;let d=r.animate([{opacity:.5,transform:"translateY(4px)"},{opacity:1,transform:"translateY(0)"}],{duration:180,easing:"cubic-bezier(.22,.61,.36,1)"});a.set(r,d),d.onfinish=()=>a.delete(r)}let h={file:'<i class="menu-glyph " data-icon="file" aria-hidden="true"><svg viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg" focusable="false" aria-hidden="true"><path d="M7 4h10l6 6v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm10 0v6h6"/></svg></i>',folder:'<i class="menu-glyph " data-icon="folder" aria-hidden="true"><svg viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg" focusable="false" aria-hidden="true"><path d="M4.5 9a2 2 0 0 1 2-2h5l2.5 3h7.5a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-15a2 2 0 0 1-2-2Z"/></svg></i>',chevron:'<i class="menu-glyph " data-icon="chevron" aria-hidden="true"><svg viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg" focusable="false" aria-hidden="true"><path d="m8 11 6 6 6-6"/></svg></i>',pin:'<i class="menu-glyph " data-icon="pin" aria-hidden="true"><svg viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg" focusable="false" aria-hidden="true"><path d="m17 4 7 7c-4 0-6 2-7 7l-3-3-5 1-4-4c5-1 7-3 7-7l5-1ZM10 18l-6 6"/></svg></i>'},i=(r,d)=>'<div class="document-row">'+h.file+"<div><strong>"+r+"</strong><small>"+d+"</small></div></div>";for(let r of[b]){let d=r.dataset.navigation;if(["tabs","views"].includes(d)){let m=function(){let s=f[g];u.style.setProperty("--indicator-x",s.offsetLeft+"px"),u.style.setProperty("--indicator-width",s.offsetWidth+"px")},v=function(s,_=!0){g=s,f.forEach((S,T)=>{S.setAttribute("aria-selected",String(s===T)),S.tabIndex=s===T?0:-1,k[T].hidden=s!==T,a.get(k[T])?.cancel()}),m(),_&&c(k[s])},u=r.querySelector(".nav-track"),f=[...u.querySelectorAll("[role=tab]")],k=[...r.querySelectorAll("[role=tabpanel]")],g=0;f.forEach((s,_)=>s.addEventListener("click",()=>{_!==g&&v(_)},{signal:o})),u.addEventListener("keydown",s=>{if(!["ArrowLeft","ArrowRight","Home","End"].includes(s.key))return;s.preventDefault();let _=s.key==="Home"?0:s.key==="End"?f.length-1:(g+(s.key==="ArrowRight"?1:-1)+f.length)%f.length;v(_),f[_].focus()},{signal:o});let x=new ResizeObserver(m);x.observe(u),l.push(x),v(0,!1),p.set(d,()=>v(0))}else if(d==="breadcrumbs"){let v=function(x=!1){u.innerHTML=m.slice(0,g+1).map((s,_)=>"<li>"+(_?h.chevron:"")+(_===g?'<span aria-current="page">'+s+"</span>":'<button type="button" data-depth="'+_+'">'+s+"</button>")+"</li>").join(""),f.innerHTML=g===0?'<button type="button" class="trail-folder" data-drill>'+h.folder+"<span>Projects</span>"+h.chevron+"</button>":g===1?'<button type="button" class="trail-folder" data-drill>'+h.folder+"<span>Design</span>"+h.chevron+"</button>"+i("Project brief","Document"):i("Color palette","Design document")+i("Components","Design document"),k.textContent=g===2?"Two files in Design.":"Open a folder to explore.",c(f),x&&(f.querySelector("button")||[...u.querySelectorAll("button")].at(-1))?.focus({preventScroll:!0})},u=r.querySelector("[data-trail]"),f=r.querySelector("[data-folder-content]"),k=r.querySelector("[data-folder-note]"),g=1,m=["Studio","Projects","Design"];r.addEventListener("click",x=>{let s=x.target.closest("[data-depth]"),_=x.target.closest("[data-drill]");if(s)g=Number(s.dataset.depth);else if(_)g=Math.min(2,g+1);else return;v(!0)},{signal:o}),v(),p.set(d,()=>{g=1,v()})}else if(d==="pages"){let s=function(){f.style.setProperty("--page-x",u[v-1].offsetLeft+"px")},_=function(T,j=!0){v=Math.max(1,Math.min(5,T)),u.forEach((M,B)=>{B+1===v?M.setAttribute("aria-current","page"):M.removeAttribute("aria-current")}),k.disabled=v===1,g.disabled=v===5,r.querySelector("[data-page-summary]").textContent=v*2-1+"\u2013"+v*2+" of 10",m.innerHTML=x.slice((v-1)*2,v*2).map(M=>i(M,"Studio project")).join(""),s(),j&&c(m)},u=[...r.querySelectorAll("[data-page]")],f=r.querySelector(".page-numbers"),k=r.querySelector("[data-previous]"),g=r.querySelector("[data-next]"),m=r.querySelector("[data-page-files]"),v=1,x=["Project brief","Research notes","Color palette","Typography","Components","Wireframes","Prototype","Motion study","Review notes","Final handoff"];u.forEach((T,j)=>T.addEventListener("click",()=>{v!==j+1&&_(j+1)},{signal:o})),k.addEventListener("click",()=>{_(v-1),k.disabled&&u[0].focus()},{signal:o}),g.addEventListener("click",()=>{_(v+1),g.disabled&&u[4].focus()},{signal:o});let S=new ResizeObserver(s);S.observe(f),l.push(S),_(1,!1),p.set(d,()=>_(1))}else if(d==="sidebar"){let v=function(s,_=!0){g=s,u.forEach((B,C)=>{s===C?B.setAttribute("aria-current","page"):B.removeAttribute("aria-current")}),r.style.setProperty("--side-y",s*44+"px");let[S,T,j,M]=m[s];f.innerHTML=h[M]+"<h3>"+S+"</h3><p>"+T+"</p><small>"+j+"</small>",_&&c(f)},x=function(s){r.dataset.collapsed=String(s),k.setAttribute("aria-expanded",String(!s)),k.setAttribute("aria-label",s?"Expand navigation":"Collapse navigation")},u=[...r.querySelectorAll("[data-section]")],f=r.querySelector("[data-side-content]"),k=r.querySelector("[data-collapse]"),g=0,m=[["Projects","A place for your next idea.","Three active projects","folder"],["Files","Everything you need, together.","Ten project files","file"],["Saved","Keep the details that matter.","Four saved items","pin"]];u.forEach((s,_)=>s.addEventListener("click",()=>{_!==g&&v(_)},{signal:o})),k.addEventListener("click",()=>x(r.dataset.collapsed!=="true"),{signal:o}),v(0,!1),p.set(d,()=>{x(!1),v(0)})}let y=requestAnimationFrame(()=>r.dataset.ready="true");o.addEventListener("abort",()=>cancelAnimationFrame(y),{once:!0})}return n.addEventListener("change",()=>{n.matches&&(a.forEach(r=>r.cancel()),a.clear())},{signal:o}),{reset(){p.get(b.dataset.navigation)?.()},destroy(){t.abort(),l.forEach(r=>r.disconnect()),a.forEach(r=>r.cancel()),a.clear()}}}return{mount:e}})(),Ce=`
.nav-demo{width:min(320px,100%);min-width:0;--nav-ease:cubic-bezier(.22,.61,.36,1);color:#f0f0f0;font-family:'Instrument Sans',sans-serif;font-size:13px}
.navigation-review .skip-link:not(:focus){clip-path:inset(100%)}
@media(max-width:420px){.navigation-review .header-inner{padding-inline:16px;gap:10px}.navigation-review .wordmark{font-size:18px;white-space:nowrap}.navigation-review .navigation{gap:2px}.navigation-review .nav-item{padding-inline:5px;font-size:11px;gap:4px}}
.nav-demo *{box-sizing:border-box}.nav-demo [hidden]{display:none!important}
.nav-surface{border:1px solid #ffffff16;border-radius:17px;background:#232323;box-shadow:inset 0 1px #ffffff08,0 3px 6px #00000015;overflow:hidden}
.nav-demo button{font:inherit;color:inherit;cursor:pointer;border:0;background:transparent;-webkit-tap-highlight-color:transparent}
.nav-demo button:focus-visible,.nav-content:focus-visible{outline:2px solid #c9c9c9;outline-offset:-3px;border-radius:7px}
.nav-demo button:disabled{opacity:.3;cursor:default}
.menu-glyph{display:inline-flex;flex:none;align-items:center;justify-content:center;width:24px;height:24px;pointer-events:none;vertical-align:middle}
.menu-glyph>svg{display:block;width:100%;height:100%;fill:none;stroke:currentColor;stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round}
.nav-demo .arrow-left{transform:rotate(90deg)}.nav-demo .arrow-right{transform:rotate(-90deg)}
.nav-track{position:relative;display:flex;isolation:isolate}
.nav-track button{position:relative;z-index:1;flex:1;min-width:0;min-height:48px;padding:8px 3px;color:#b8b8b8;transition:color 160ms ease;white-space:nowrap}
.nav-track button[aria-selected=true]{color:#f4f4f4}
.nav-track button:hover{color:#fff}
.nav-indicator{position:absolute;left:0;bottom:0;width:var(--indicator-width,33.333%);transform:translateX(var(--indicator-x,0px));background:#dcdcdc;pointer-events:none}
[data-ready=true] .nav-indicator,[data-ready=true] .page-indicator{transition:transform 260ms var(--nav-ease),width 260ms var(--nav-ease)}
.underline-track{margin:0 16px;border-bottom:1px solid #ffffff13}
.underline-track .nav-indicator{height:2px;border-radius:3px;bottom:-1px}
.nav-content{min-height:181px;padding:23px 20px}
.nav-eyebrow{font-size:9px;letter-spacing:.1em;color:#a9a9a9}
.nav-content h3{margin:12px 0 8px;font-size:19px;font-weight:500;letter-spacing:-.025em}
.nav-content p{font-size:12px;color:#bebebe;line-height:1.6;margin:0;max-width:225px}
.project-meta{display:flex;align-items:center;gap:6px;font-size:9px;color:#b2b2b2;margin-top:20px;white-space:nowrap}
.status-dot{width:5px;height:5px;border-radius:50%;background:#b7cdbd}.meta-line{width:1px;height:10px;background:#ffffff25;margin:0 4px}
.document-row{display:flex;align-items:center;gap:10px;min-height:48px}.document-row+.document-row{border-top:1px solid #ffffff0e}
.document-row>.menu-glyph{color:#c4c4c4}.document-row strong,.activity-line strong{font-size:12px;font-weight:450;display:block}
.document-row small,.activity-line small{display:block;font-size:10px;color:#b2b2b2;margin-top:4px}
.activity-line{display:flex;position:relative;align-items:center;gap:14px;min-height:58px}.activity-line>span{width:7px;height:7px;border-radius:50%;border:1px solid #c5c5c5}.activity-line:first-child:after{content:'';position:absolute;top:34px;left:3px;height:47px;width:1px;background:#aaaaaa3a}
.segment-track{margin:12px;padding:3px;border:1px solid #ffffff0c;border-radius:12px;background:#191919}
.segment-track button{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:5px;min-height:57px;font-size:11px}
.segment-track .menu-glyph{width:22px;height:22px}
.segment-track .nav-indicator{top:3px;bottom:3px;border-radius:9px;background:#3c3c3c;box-shadow:inset 0 1px #ffffff0e}
.view-surface .nav-content{min-height:173px;padding:0 18px 18px}
.mini-board{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:6px;padding-top:10px;min-height:150px}
.mini-board>div{background:#1b1b1b;border:1px solid #ffffff07;border-radius:8px;padding:10px 5px}
.mini-board small{font-size:7px;color:#b5b5b5;letter-spacing:.025em}.mini-board span{display:block;font-size:10px;padding:12px 3px;margin-top:10px;border-radius:5px;background:#3d3d3d}
.mini-timeline{padding-top:10px}.mini-timeline>div{position:relative;height:39px;display:grid;grid-template-columns:60px 1fr;align-items:center;border-bottom:1px solid #ffffff08;gap:8px}.mini-timeline span{font-size:10px;color:#cacaca}.mini-timeline b{display:block;height:14px;width:48%;border-radius:5px;background:#b9c9bd}.mini-timeline>div:nth-child(2) b{margin-left:26%;background:#859b8d}.mini-timeline>div:nth-child(3) b{margin-left:65%;width:35%;background:#52695c}.mini-timeline footer{display:flex;justify-content:space-between;margin-left:68px;padding-top:10px}.mini-timeline footer span{font-size:8px;color:#a0a0a0}
.trail-surface{padding:18px 16px}.folder-trail{display:flex;align-items:center;gap:4px;list-style:none;margin:0;padding:0 0 16px;border-bottom:1px solid #ffffff15;min-height:44px}.folder-trail li{display:flex;align-items:center;gap:3px;min-width:0}.folder-trail button,.folder-trail [aria-current]{font-size:11px;white-space:nowrap;padding:6px 2px}.folder-trail button{color:#adadad}.folder-trail .menu-glyph{width:12px;height:12px;transform:rotate(-90deg);color:#909090}.trail-body{min-height:145px;padding-top:10px}.trail-folder{display:flex;gap:10px;align-items:center;text-align:left;width:100%;min-height:44px;border-radius:8px}.trail-folder .menu-glyph{color:#cbcbcb}.trail-folder span{flex:1}.trail-folder:hover span{color:#d3d3d3}.trail-folder>.arrow-right{width:16px;height:16px;color:#9e9e9e}.trail-note{margin:10px 0 0;color:#ababab;font-size:10px;line-height:1.5;min-height:15px}
.pages-surface{padding:20px 16px 15px}.collection-heading{display:flex;justify-content:space-between;align-items:center;gap:10px;margin-bottom:13px}.collection-heading strong{font-size:13px;font-weight:500}.collection-heading>span{font-size:10px;color:#b3b3b3;font-variant-numeric:tabular-nums}.page-files{min-height:112px}.page-files .document-row{min-height:53px}.pagination{display:flex;align-items:center;gap:6px;justify-content:space-between;padding-top:13px;border-top:1px solid #ffffff12}.pagination>button{width:28px;height:36px;display:grid;place-items:center;padding:0}.pagination .menu-glyph{width:20px;height:20px}.page-numbers{display:flex;position:relative;isolation:isolate;flex:1;max-width:190px}.page-numbers button{position:relative;flex:1;min-width:0;height:34px;font-size:12px;z-index:1}.page-indicator{position:absolute;top:0;bottom:0;left:0;width:20%;border:1px solid #bfbfbf55;background:#d1d1d10c;border-radius:50%;transform:translateX(var(--page-x,0px))}
.sidebar-surface{display:grid;grid-template-columns:116px minmax(0,1fr);min-height:242px;transition:grid-template-columns 260ms var(--nav-ease)}
.side-rail{padding:12px 6px;border-right:1px solid #ffffff12;min-width:0;overflow:hidden}.rail-toggle{display:grid;place-items:center;width:40px;height:36px;margin:0 0 13px 3px}.rail-toggle .menu-glyph{width:20px;height:20px;transition:transform 240ms var(--nav-ease)}
.side-links{position:relative}.side-links button{display:flex;align-items:center;gap:9px;width:100%;height:44px;padding:0 7px;color:#b4b4b4}.side-links button .menu-glyph{width:23px;height:23px}.side-links button span{font-size:11px;transition:opacity 130ms ease;white-space:nowrap}.side-links button[aria-current]{color:#f5f5f5}.side-marker{position:absolute;left:-6px;top:11px;width:2px;height:22px;border-radius:3px;background:#d2d2d2;transform:translateY(var(--side-y,0px));transition:transform 240ms var(--nav-ease)}
.side-content{padding:24px 14px;min-width:0}.side-content>.menu-glyph{width:28px;height:28px;color:#c7c7c7}.side-content h3{font-weight:500;font-size:15px;margin:18px 0 10px}.side-content p{font-size:11px;line-height:1.6;color:#b8b8b8;margin:0}.side-content small{display:block;margin-top:24px;font-size:9px;color:#b1b1b1}
[data-collapsed=true] .sidebar-surface{grid-template-columns:53px minmax(0,1fr)}[data-collapsed=true] .side-links button span{opacity:0;pointer-events:none}[data-collapsed=true] .rail-toggle .menu-glyph{transform:rotate(-90deg)}
@media(max-width:420px){.nav-content{padding-inline:14px}.project-meta{font-size:8px;gap:4px}.sidebar-surface{grid-template-columns:104px minmax(0,1fr)}.side-content{padding-inline:10px}.folder-trail{gap:1px}.folder-trail button,.folder-trail [aria-current]{font-size:10px}.pagination{gap:2px}}
@media(prefers-reduced-motion:reduce){.nav-demo *,.nav-demo *::after{transition:none!important;animation:none!important}}

.previous-studies{text-decoration:underline;text-underline-offset:4px;font-size:14px;white-space:nowrap}
.nav-next h3{font-size:19px;letter-spacing:-.025em;font-weight:500;margin:12px 0 9px}.nav-next p{font-size:12px;line-height:1.65;color:#bebebe;margin:0}.nav-next .sr-only{position:absolute;width:1px;height:1px;clip-path:inset(50%);overflow:hidden;white-space:nowrap}
.steps-surface{padding:22px 18px 16px}.step-track{display:flex;position:relative;isolation:isolate;justify-content:space-between}.step-track:before,.step-line{position:absolute;content:'';top:18px;left:16.666%;right:16.666%;height:1px;background:#727272;z-index:-1}.step-line{background:#dedede;transform:scaleX(var(--step-progress,0));transform-origin:left;transition:transform 280ms var(--nav-ease)}.step-track button{display:grid;justify-items:center;gap:9px;width:33.333%;font-size:10px;color:#adadad;padding:0}.step-circle{display:grid;place-items:center;width:37px;height:37px;border-radius:50%;border:1px solid #6f6f6f;background:#232323;transition:background-color 200ms ease,border-color 200ms ease,color 200ms ease}.step-circle .menu-glyph{width:20px;height:20px}.step-track [aria-current] .step-circle{border-color:#dddddd;background:#dddddd;color:#343434}.step-track [data-complete=true] .step-circle{border-color:#c5c5c5;color:#e1e1e1}.step-track [aria-current]{color:#eeeeee}.step-copy{min-height:149px;padding:18px 0}.step-copy h3{font-size:18px}.step-actions{display:flex;align-items:center;justify-content:space-between;border-top:1px solid #ffffff14;padding-top:11px;gap:8px}.step-actions button{min-height:36px;font-size:12px;padding:5px 8px}.step-actions [data-forward]{display:flex;align-items:center;gap:6px;border:1px solid #cdcdcd38;border-radius:9px;padding-inline:12px}.step-actions .menu-glyph{width:16px;height:16px}
.dock-surface{padding:22px 13px 12px}.dock-content{padding:6px 12px 18px;min-height:185px}.dock-content>.menu-glyph{width:32px;height:32px;color:#cacaca}.dock-content h3{margin-top:20px}.bottom-dock{position:relative;display:flex;padding:5px;border-radius:15px;background:#1a1a1a;border:1px solid #ffffff0c;isolation:isolate}.bottom-dock button{display:grid;place-items:center;gap:7px;min-width:0;flex:1;padding:10px 3px;font-size:10px;color:#ababab;z-index:1;transition:color 180ms ease}.bottom-dock [aria-current]{color:#f2f2f2}.dock-indicator{position:absolute;top:5px;bottom:5px;left:0;width:var(--dock-width,33.333%);background:#3d3d3d;border-radius:11px;transform:translateX(var(--dock-x,5px));pointer-events:none}[data-ready=true] .dock-indicator{transition:transform 260ms var(--nav-ease),width 260ms var(--nav-ease)}
.index-surface{padding:20px 15px}.index-heading,.tree-heading{font-size:13px;font-weight:500;padding-bottom:16px;border-bottom:1px solid #ffffff14}.index-layout{display:grid;grid-template-columns:65px minmax(0,1fr);gap:8px;padding-top:15px}.section-index{border-right:1px solid #ffffff10;padding-right:5px}.section-index button{display:flex;align-items:center;gap:6px;width:100%;text-align:left;min-height:39px;font-size:10px;color:#a5a5a5;padding:4px 0}.section-index i{width:3px;height:3px;border-radius:3px;background:#8b8b8b;transition:height 200ms var(--nav-ease),background-color 200ms ease}.section-index [aria-current]{color:#f0f0f0}.section-index [aria-current] i{height:15px;background:#d7d7d7}.reading-pane{height:210px;overflow-y:auto;overscroll-behavior:contain;scrollbar-width:thin;scrollbar-color:#6b6b6b transparent;scroll-padding:0;padding:0 7px 0 5px;outline-offset:-2px}.reading-pane section{min-height:210px;padding:5px 0 20px}.reading-pane h3{font-size:17px}.reading-pane p{font-size:11px;line-height:1.7}.reading-pane small{display:block;font-size:10px;line-height:1.6;color:#a3a3a3;padding-top:15px}.reading-pane section:last-child{min-height:210px}
.collection-window{overflow:hidden;touch-action:pan-y;cursor:grab;outline-offset:-4px}.collection-window:active{cursor:grabbing}.collection-track{display:flex;transform:translateX(calc(var(--slide,0)*-100%));transition:transform 320ms var(--nav-ease);will-change:transform}.collection-slide{flex:0 0 100%;min-width:0;padding:24px 23px 20px;min-height:236px;user-select:none}.slide-emblem{display:grid;place-items:center;width:48px;height:48px;border:1px solid #cdcdcd2a;border-radius:14px;margin-bottom:25px;color:#d3d3d3}.slide-emblem .menu-glyph{width:28px;height:28px}.collection-slide h3{font-size:21px}.collection-controls{display:flex;align-items:center;justify-content:space-between;padding:0 16px 14px}.collection-controls>button{display:grid;place-items:center;width:36px;height:36px;border:1px solid #cdcdcd24;border-radius:50%}.collection-controls .menu-glyph{width:18px;height:18px}.collection-dots{display:flex;gap:0;align-items:center}.collection-dots button{width:30px;height:34px;display:grid;place-items:center;padding:0}.collection-dots span{width:5px;height:5px;border-radius:6px;background:#727272;transition:width 220ms var(--nav-ease),background-color 220ms ease}.collection-dots [aria-current] span{width:18px;background:#dedede}
.tree-surface{padding:20px 16px 16px;user-select:none;-webkit-user-select:none}
.file-tree,.file-tree ul{list-style:none;padding:0;margin:0}
.file-tree{padding:12px 0;min-height:174px}
.tree-row{display:flex;align-items:center;gap:8px;min-height:36px;font-size:12px;cursor:pointer;position:relative}
.tree-row>.menu-glyph{width:20px;height:20px;color:#b7b7b7}
.tree-row>.tree-chevron{width:13px;height:13px;transform:rotate(-90deg);transition:transform 320ms var(--nav-ease)}
[aria-expanded=true]>.tree-row>.tree-chevron{transform:none}
.file-tree [role=group]{padding-left:23px;border-left:1px solid #a5a5a530;margin-left:6px}
.file-tree [data-file] .tree-row{gap:8px;font-size:11px;color:#bbbbbb;padding-left:4px}
.file-tree [aria-selected=true]>.tree-row{color:#f3f3f3}
.file-tree [aria-selected=true]>.tree-row:before{content:'';position:absolute;left:-24px;width:2px;height:16px;border-radius:2px;background:#d8d8d8}
.file-tree [role=treeitem]:focus{outline:none}
.file-tree [role=treeitem]:focus-visible>.tree-row{outline:1px solid #d2d2d2;outline-offset:1px;border-radius:6px}
.tree-detail{padding:13px 2px 0;border-top:1px solid #ffffff14;min-height:57px}
.tree-detail strong{font-weight:450;font-size:12px;display:block}
.tree-detail small{display:block;color:#adadad;font-size:10px;margin-top:5px}
@media(max-width:420px){.steps-surface{padding-inline:13px}.step-copy h3{font-size:17px}.index-surface{padding-inline:12px}.index-layout{grid-template-columns:54px minmax(0,1fr);gap:5px}.reading-pane{padding-inline:3px}.reading-pane h3{font-size:15px}.collection-slide{padding-inline:18px}.tree-surface{padding-inline:12px}}
@media(prefers-reduced-motion:reduce){.nav-next *{transition:none!important;animation:none!important}}

body{margin:0;min-height:100svh;display:grid;place-items:center;background:#edf0f1}.nav-demo{width:min(320px,calc(100vw - 32px))}.sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%)}`,Se=(()=>{function e(b){let t=new AbortController,o=t.signal,n=new Map,a=[],p=new Map,l=matchMedia("(prefers-reduced-motion: reduce)");function c(i){if(p.get(i)?.cancel(),l.matches)return;let r=i.animate([{opacity:.55},{opacity:1}],{duration:180,easing:"ease-out"});p.set(i,r),r.onfinish=()=>p.delete(i)}function h(i,r,d){i.forEach((y,u)=>{u===r?y.setAttribute("aria-current",d):y.removeAttribute("aria-current")})}for(let i of[b]){let r=i.dataset.navigation;if(r==="steps"){let x=function(s,_=!0){m=Math.max(0,Math.min(2,s)),h(y,m,"step"),i.style.setProperty("--step-progress",m/2),y.forEach((S,T)=>S.dataset.complete=String(T<m)),f.disabled=m===0,k.innerHTML=m===2?"Start again":g,u.innerHTML="<h3>"+v[m][0]+"</h3><p>"+v[m][1]+"</p>",_&&c(u)},y=[...i.querySelectorAll("[data-step]")],u=i.querySelector("[data-step-copy]"),f=i.querySelector("[data-back]"),k=i.querySelector("[data-forward]"),g=k.innerHTML,m=0,v=[["Give your idea a home.","Start with a clear project brief and a little room to explore."],["Make it feel like you.","Choose the details that give your project its own character."],["Ready for a closer look.","Take a final pass through your work before the next chapter."]];y.forEach((s,_)=>s.addEventListener("click",()=>{_!==m&&x(_)},{signal:o})),f.addEventListener("click",()=>{x(m-1),f.disabled&&y[0].focus()},{signal:o}),k.addEventListener("click",()=>x(m===2?0:m+1),{signal:o}),x(0,!1),n.set(r,()=>x(0))}else if(r==="dock"){let m=function(){u.style.setProperty("--dock-x",y[k].offsetLeft+"px"),u.style.setProperty("--dock-width",y[k].offsetWidth+"px")},v=function(s,_=!0){k=s,h(y,s,"page"),m(),f.innerHTML=y[s].querySelector(".menu-glyph").outerHTML+"<h3>"+g[s][0]+"</h3><p>"+g[s][1]+"</p>",_&&c(f)},y=[...i.querySelectorAll("[data-dock]")],u=i.querySelector(".bottom-dock"),f=i.querySelector("[data-dock-content]"),k=0,g=[["Your workspace","A quiet place for your next project."],["Pick up where you left off","Your latest work, always close at hand."],["Worth keeping","The ideas you want to come back to."]];y.forEach((s,_)=>s.addEventListener("click",()=>{_!==k&&v(_)},{signal:o}));let x=new ResizeObserver(m);x.observe(u),a.push(x),v(0,!1),n.set(r,()=>v(0))}else if(r==="sections"){let g=function(){let v=0;f.forEach((x,s)=>{k(s)<=u.scrollTop+35&&(v=s)}),h(y,v,"location")},y=[...i.querySelectorAll("[data-jump]")],u=i.querySelector(".reading-pane"),f=[...u.querySelectorAll("section")],k=v=>f[v].getBoundingClientRect().top-u.getBoundingClientRect().top+u.scrollTop;y.forEach((v,x)=>v.addEventListener("click",()=>u.scrollTo({top:k(x),behavior:l.matches?"instant":"smooth"}),{signal:o})),u.addEventListener("scroll",g,{signal:o,passive:!0});let m=new ResizeObserver(g);m.observe(u),a.push(m),g(),n.set(r,()=>{u.scrollTo({top:0,behavior:"instant"}),h(y,0,"location")})}else if(r==="carousel"){let x=function(s){m=Math.max(0,Math.min(2,s)),i.style.setProperty("--slide",m),h(y,m,"true"),u.forEach((_,S)=>{_.inert=S!==m,_.setAttribute("aria-hidden",String(S!==m))}),k.disabled=m===0,g.disabled=m===2,i.querySelector("[data-slide-status]").textContent=u[m].querySelector("h3").textContent+", "+(m+1)+" of 3"},y=[...i.querySelectorAll("[data-slide]")],u=[...i.querySelectorAll(".collection-slide")],f=i.querySelector(".collection-window"),k=i.querySelector("[data-prev-slide]"),g=i.querySelector("[data-next-slide]"),m=0,v=null;y.forEach((s,_)=>s.addEventListener("click",()=>x(_),{signal:o})),k.addEventListener("click",()=>{x(m-1),k.disabled&&f.focus()},{signal:o}),g.addEventListener("click",()=>{x(m+1),g.disabled&&f.focus()},{signal:o}),f.addEventListener("keydown",s=>{["ArrowLeft","ArrowRight","Home","End"].includes(s.key)&&(s.preventDefault(),x(s.key==="Home"?0:s.key==="End"?2:m+(s.key==="ArrowRight"?1:-1)))},{signal:o}),f.addEventListener("pointerdown",s=>{!s.isPrimary||s.button!==0||(v={x:s.clientX,y:s.clientY,id:s.pointerId},f.setPointerCapture(s.pointerId))},{signal:o}),f.addEventListener("pointerup",s=>{if(!v||v.id!==s.pointerId)return;let _=s.clientX-v.x,S=s.clientY-v.y;v=null,Math.abs(_)>35&&Math.abs(_)>Math.abs(S)*1.25&&x(m+(_<0?1:-1))},{signal:o}),f.addEventListener("pointercancel",()=>v=null,{signal:o}),f.addEventListener("lostpointercapture",()=>v=null,{signal:o}),n.set(r,()=>{v=null,x(0)})}else if(r==="tree"){let g=function(x){u.forEach(s=>s.tabIndex=s===x?0:-1),x.focus({preventScroll:!0})},m=function(x,s,_=!0){let S=x.querySelector("[role=group]"),T=S.hidden?0:S.getBoundingClientRect().height,j=S.hidden?0:Number(getComputedStyle(S).opacity);p.get(S)?.cancel(),p.delete(S),!s&&S.contains(b.getRootNode().activeElement)&&g(x),x.setAttribute("aria-expanded",String(s)),S.inert=!s,S.setAttribute("aria-hidden",String(!s)),S.hidden=!1;let M=s?S.scrollHeight:0,B=()=>{S.hidden=!s,S.style.removeProperty("overflow")};if(!_||l.matches||Math.abs(T-M)<.1){B();return}S.style.overflow="hidden";let C=S.animate([{height:T+"px",opacity:j},{height:M+"px",opacity:s?1:0}],{duration:320,easing:"cubic-bezier(.22,.61,.36,1)",fill:"both"});p.set(S,C),C.onfinish=()=>{p.get(S)===C&&(B(),C.cancel(),p.delete(S))}},v=function(x){k.forEach(s=>s.setAttribute("aria-selected",String(s===x))),i.querySelector("[data-file-name]").textContent=x.getAttribute("aria-label"),i.querySelector("[data-file-description]").textContent=x.dataset.description,c(i.querySelector(".tree-detail"))},y=i.querySelector("[role=tree]"),u=[...y.querySelectorAll("[role=treeitem]")],f=[...y.querySelectorAll("[data-branch]")],k=[...y.querySelectorAll("[data-file]")];f.forEach(x=>m(x,x.getAttribute("aria-expanded")==="true",!1)),l.addEventListener("change",()=>{l.matches&&f.forEach(x=>m(x,x.getAttribute("aria-expanded")==="true",!1))},{signal:o}),y.addEventListener("click",x=>{let s=x.target.closest("[role=treeitem]");s&&(g(s),s.hasAttribute("data-branch")?m(s,s.getAttribute("aria-expanded")!=="true"):v(s))},{signal:o}),y.addEventListener("keydown",x=>{let s=x.target.closest("[role=treeitem]");if(!s)return;let _=u.filter(j=>!j.closest("[hidden],[inert]")),S=_.indexOf(s),T=s.hasAttribute("data-branch");["ArrowDown","ArrowUp","Home","End"].includes(x.key)?(x.preventDefault(),g(_[x.key==="Home"?0:x.key==="End"?_.length-1:Math.max(0,Math.min(_.length-1,S+(x.key==="ArrowDown"?1:-1)))])):x.key==="ArrowRight"?(x.preventDefault(),T&&(s.getAttribute("aria-expanded")==="true"?g(s.querySelector("[data-file]")):m(s,!0))):x.key==="ArrowLeft"?(x.preventDefault(),T?m(s,!1):g(s.parentElement.closest("[data-branch]"))):["Enter"," "].includes(x.key)&&(x.preventDefault(),T?m(s,s.getAttribute("aria-expanded")!=="true"):v(s))},{signal:o}),n.set(r,()=>{f.forEach((x,s)=>m(x,s===0,!1)),u.forEach((x,s)=>x.tabIndex=s===0?0:-1),k.forEach(x=>x.setAttribute("aria-selected","false")),i.querySelector("[data-file-name]").textContent="Select a file",i.querySelector("[data-file-description]").textContent="Explore a folder above."})}let d=requestAnimationFrame(()=>i.dataset.ready="true");o.addEventListener("abort",()=>cancelAnimationFrame(d),{once:!0})}return l.addEventListener("change",()=>{l.matches&&(p.forEach(i=>i.cancel()),p.clear())},{signal:o}),{reset(){n.get(b.dataset.navigation)?.()},destroy(){t.abort(),a.forEach(i=>i.disconnect()),p.forEach(i=>i.cancel()),p.clear()}}}return{mount:e}})(),Ee=`
.sl-bookmark {
  --bookmark-unit: 1px;
  --bookmark-ink: #222222;
  --bookmark-hover: #2e2e2e;
  --bookmark-active: #3f3f3f;
  --bookmark-text: #fafafa;
  --bookmark-focus: #5a5a5a;
  --bookmark-ease: cubic-bezier(.4, 0, .2, 1);
  display: block;
  position: relative;
  flex: none;
  width: calc(236 * var(--bookmark-unit));
  height: calc(52 * var(--bookmark-unit));
  padding: 0;
  border: 0;
  border-radius: calc(13 * var(--bookmark-unit));
  appearance: none;
  background: transparent;
  color: var(--bookmark-text);
  font: 550 calc(19 * var(--bookmark-unit))/1.1 'Instrument Sans', sans-serif;
  letter-spacing: -.02em;
  text-align: center;
  cursor: pointer;
  touch-action: manipulation;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
}
.sl-bookmark *, .sl-bookmark *::before, .sl-bookmark *::after { box-sizing: border-box; }
.sl-bookmark:disabled, .sl-bookmark[aria-disabled="true"] { opacity: .5; cursor: not-allowed; }
.sl-bookmark:focus-visible { outline: 2px solid var(--bookmark-focus); outline-offset: 6px; }
.sl-bookmark .sl-bookmark__surface {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  overflow: hidden;
  isolation: isolate;
  border-radius: inherit;
  background: var(--bookmark-ink);
  box-shadow: inset 0 1px #ffffff12, 0 1px 2px #0000000d;
  transition: transform 350ms cubic-bezier(.22, 1, .36, 1), background-color 350ms ease, box-shadow 350ms ease;
}
@media (hover: hover) and (forced-colors: none) {
  .sl-bookmark:not(:disabled):not([aria-disabled="true"]):hover .sl-bookmark__surface {
    transform: translateY(-2px);
    background-color: var(--bookmark-hover);
    box-shadow: inset 0 1px #ffffff17, 0 6px 12px -8px #00000047;
  }
}
.sl-bookmark:not(:disabled):not([aria-disabled="true"]):active .sl-bookmark__surface { transform: translateY(1px) scale(.98); transition-duration: 120ms; }
.sl-bookmark .sl-bookmark__wash { position: absolute; inset: 0; z-index: -1; background: var(--bookmark-active); opacity: 0; transition: opacity 540ms var(--bookmark-ease); }
.sl-bookmark[aria-pressed="true"] .sl-bookmark__wash { opacity: 1; }
.sl-bookmark .sl-bookmark__label { position: absolute; inset: 0 calc(56 * var(--bookmark-unit)); display: grid; place-items: center; text-align: center; white-space: nowrap; }
.sl-bookmark .sl-bookmark__icon { position: absolute; left: calc(18 * var(--bookmark-unit)); top: 50%; width: calc(22 * var(--bookmark-unit)); height: calc(24 * var(--bookmark-unit)); transform: translateY(-50%); }
.sl-bookmark .sl-bookmark__ribbon {
  display: block;
  width: 100%;
  height: 100%;
  overflow: visible;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
  transform-box: view-box;
  transform-origin: 50% 12.5%;
  transform: translateY(0) scaleY(1);
  transition: transform 540ms var(--bookmark-ease);
}
.sl-bookmark[aria-pressed="true"] .sl-bookmark__ribbon { transform: translateY(calc(-1.2 * var(--bookmark-unit))) scaleY(1); }
.sl-bookmark .sl-bookmark__fill { fill: currentColor; stroke: none; clip-path: inset(0 0 100% 0); transition: clip-path 540ms var(--bookmark-ease); }
.sl-bookmark[aria-pressed="true"] .sl-bookmark__fill { clip-path: inset(0); }
@media (prefers-reduced-motion: reduce) {
  .sl-bookmark *, .sl-bookmark *::before, .sl-bookmark *::after { transition: none !important; animation: none !important; }
  .sl-bookmark .sl-bookmark__surface, .sl-bookmark:hover .sl-bookmark__surface, .sl-bookmark:active .sl-bookmark__surface, .sl-bookmark[aria-pressed] .sl-bookmark__ribbon { transform: none !important; }
  .sl-bookmark:active .sl-bookmark__surface { opacity: .9; }
}
@media (forced-colors: active) {
  .sl-bookmark .sl-bookmark__surface { forced-color-adjust: none; border: 1px solid ButtonText; background: ButtonFace; color: ButtonText; box-shadow: none; }
  .sl-bookmark[aria-pressed="true"] .sl-bookmark__surface { background: Highlight; color: HighlightText; border-color: Highlight; }
  .sl-bookmark .sl-bookmark__wash { display: none; }
  .sl-bookmark:focus-visible { outline-color: Highlight; }
}
`,Ae=(()=>{let e=new WeakMap,b="Try the button. Your selection stays until you undo it.";function t(o,{feedback:n}={}){if(e.has(o))return e.get(o);if(o?.tagName!=="BUTTON")throw new TypeError("A native Bookmark button is required.");let a=o.querySelector(".sl-bookmark__label"),p=o.querySelector(".sl-bookmark__ribbon");if(!a||!p)throw new TypeError("The Bookmark button needs its label and ribbon elements.");let l=o.ownerDocument.defaultView,c=l.matchMedia("(prefers-reduced-motion: reduce)"),h=o.getAttribute("aria-pressed")==="true",i=h?"Bookmarked":"Bookmark",r=null,d=0,y=!1;function u(){d++,r?.cancel(),r=null,a.textContent=i,a.style.removeProperty("opacity")}async function f(x){if(x===i)return;let s=r?l.getComputedStyle(a).opacity:"1";i=x;let _=++d;if(a.style.opacity=s,r?.cancel(),c.matches||!a.animate){u();return}try{if(a.textContent!==x){if(r=a.animate([{opacity:s},{opacity:0}],{duration:180,easing:"cubic-bezier(.4,0,.2,1)",fill:"forwards"}),await r.finished,_!==d||y)return;a.style.opacity="0",r.cancel(),a.textContent=x}if(r=a.animate([{opacity:a.style.opacity},{opacity:1}],{duration:300,easing:"cubic-bezier(.4,0,.2,1)",fill:"forwards"}),await r.finished,_!==d||y)return;a.style.removeProperty("opacity"),r.cancel(),r=null}catch(S){S.name!=="AbortError"&&_===d&&u()}}function k(x,s=!1){let _=!!x;y||h===_||(h=_,o.setAttribute("aria-pressed",String(h)),f(h?"Bookmarked":"Bookmark"),n&&(n.textContent=h?"Bookmarked. Click again to undo.":"Bookmark removed."),s&&o.dispatchEvent(new l.CustomEvent("bookmarkchange",{bubbles:!0,detail:{pressed:h}})))}function g(){!o.disabled&&o.getAttribute("aria-disabled")!=="true"&&k(!h,!0)}function m(){c.matches&&u()}o.type="button",!o.hasAttribute("aria-label")&&!o.hasAttribute("aria-labelledby")&&o.setAttribute("aria-label","Bookmark"),o.setAttribute("aria-pressed",String(h)),a.textContent=i,o.disabled=!1,o.addEventListener("click",g),c.addEventListener("change",m);let v={setPressed:x=>k(x),reset(){y||(k(!1),u(),n&&(n.textContent=b))},destroy(){y||(y=!0,u(),o.disabled=!0,o.removeEventListener("click",g),c.removeEventListener("change",m),e.delete(o))}};return e.set(o,v),v}return{mount:t}})(),oe=`
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
`,ie=(()=>{let e=new WeakMap;function b(t,{onChange:o}={}){if(e.has(t))return e.get(t);if(typeof o<"u"&&typeof o!="function")throw new TypeError("onChange must be a function.");let n=t?.querySelector('input[type="checkbox"]'),a=t?.querySelector("[data-status]");if(!n||!a)throw new TypeError("A native checkbox and visible status are required.");let p=t.ownerDocument.defaultView,l=new p.AbortController,c=p.matchMedia("(prefers-reduced-motion: reduce)"),h=null,i=!1,r=(g,m,v)=>g.addEventListener(m,v,{signal:l.signal});function d(){h?.cancel(),h=null}function y(){if(c.matches)return;d();let g=[...t.classList].find(s=>s.startsWith("sl-toggle--"))?.slice(11);if(g==="theme")return;if(g==="glide"){if(!n.checked)return;let s=t.querySelector(".sl-bell__body");if(!s?.animate)return;h=s.animate([{transform:"rotate(0deg)"},{transform:"rotate(-12deg)",offset:.2},{transform:"rotate(9deg)",offset:.43},{transform:"rotate(-5deg)",offset:.65},{transform:"rotate(2deg)",offset:.83},{transform:"rotate(0deg)"}],{duration:820,easing:"ease-in-out"});let _=h;_.onfinish=()=>{h===_&&d()};return}let m=g==="sync"?t.querySelector(".sl-sync__orbit"):t.querySelector(".sl-toggle__emblem");if(!m?.animate)return;let v=g==="sync"?[{rotate:"0deg"},{rotate:n.checked?"360deg":"-360deg"}]:[{transform:"scale(1)"},{transform:"scale(.96)",offset:.36},{transform:"scale(1)"}];h=m.animate(v,{duration:g==="sync"?680:420,easing:"cubic-bezier(.4,0,.2,1)"});let x=h;x.onfinish=()=>{h===x&&d()}}function u({animate:g=!1,emit:m=!1}={}){i||(t.dataset.checked=String(n.checked),a.textContent=n.checked?n.dataset.on||"On":n.dataset.off||"Off",a.setAttribute("aria-live","polite"),g?y():d(),m&&(o?.(n.checked),t.dispatchEvent(new p.CustomEvent("togglechange",{bubbles:!0,composed:!0,detail:{checked:n.checked}}))))}function f(g,{emit:m=!1,animate:v=!0}={}){i||(n.checked=!!g,u({animate:v,emit:m}))}r(n,"change",()=>u({animate:!0,emit:!0})),r(c,"change",()=>{c.matches&&d()}),n.form&&r(n.form,"reset",()=>queueMicrotask(()=>f(n.defaultChecked,{animate:!1}))),u();let k={setChecked:f,reset(){f(n.defaultChecked,{animate:!1})},destroy(){i||(i=!0,d(),l.abort(),e.delete(t))},get checked(){return n.checked}};return e.set(t,k),k}return{mount:b}})(),ze=`
.sl-check-card {
  --check-ink: #222222;
  --check-paper: #efefef;
  --check-muted: #b3b3b3;
  --check-ease: cubic-bezier(.22,.61,.36,1);
  width: min(320px,100%); min-width: 0; margin: 0; padding: 6px;
  border: 1px solid #ffffff0b; border-radius: 14px;
  color: #f8f8f8; background: var(--check-ink);
  box-shadow: inset 0 1px #ffffff0d, 0 2px 5px #00000010;
  font-family: 'Instrument Sans',sans-serif; text-align: left;
}
.sl-check-card, .sl-check-card * { box-sizing: border-box; }
.sl-check { position: relative; display: flex; align-items: center; gap: 16px; min-height: 68px; padding: 12px; border-radius: 9px; cursor: pointer; transition: background-color 300ms ease; }
.sl-check:hover { background: #ffffff06; }
.sl-check__input { position: absolute; width: 1px; height: 1px; margin: 0; opacity: 0; }
.sl-check__box { position: relative; isolation: isolate; display: grid; place-items: center; flex: none; width: 28px; height: 28px; overflow: hidden; border: 1px solid #797979; border-radius: 8px; background: #141414; box-shadow: inset 0 1px 2px #0004; transition: border-color 350ms ease, transform 260ms var(--check-ease); }
.sl-check__box::before { content: ""; position: absolute; inset: -1px; z-index: -1; background: var(--check-paper); opacity: 0; transition: opacity 380ms ease, transform 520ms var(--check-ease); }
.sl-check__box svg { display: block; width: 23px; height: 23px; stroke: var(--check-ink); stroke-width: 1.65; stroke-linecap: round; stroke-linejoin: round; }
.sl-check__tick { stroke-dasharray: 1; stroke-dashoffset: 1; opacity: 0; transition: stroke-dashoffset 480ms var(--check-ease), opacity 240ms ease; }
.sl-check__dash { opacity: 0; transition: opacity 220ms ease; }
.sl-check__input:checked + .sl-check__box, .sl-check__input:indeterminate + .sl-check__box { border-color: var(--check-paper); }
.sl-check__input:checked + .sl-check__box::before, .sl-check__input:indeterminate + .sl-check__box::before { opacity: 1; }
.sl-check__input:checked + .sl-check__box .sl-check__tick { opacity: 1; stroke-dashoffset: 0; transition-delay: 70ms; }
.sl-check__input:indeterminate + .sl-check__box .sl-check__tick { opacity: 0; }
.sl-check__input:indeterminate + .sl-check__box .sl-check__dash { opacity: 1; }
.sl-check__input:focus-visible + .sl-check__box { outline: 2px solid var(--check-paper); outline-offset: 4px; }
.sl-check:active .sl-check__box { transform: scale(.94); }
.sl-check:has(.sl-check__input:disabled) { opacity: .5; cursor: not-allowed; }
.sl-check__copy { display: grid; gap: 4px; min-width: 0; }
.sl-check__title { position: relative; width: fit-content; font-size: 15px; font-weight: 540; line-height: 20px; }
.sl-check__hint { color: var(--check-muted); font-size: 12px; line-height: 17px; }
/* Short, coordinated fill: no delayed second beat after the surface settles. */
.sl-check--fill .sl-check__box { border-radius: 4px; transition: border-color 240ms ease, transform 220ms var(--check-ease); }
.sl-check--fill .sl-check__box::before { transform: scale(.65); border-radius: 3px; transition: opacity 200ms ease, transform 280ms var(--check-ease); }
.sl-check--fill .sl-check__tick { stroke-dashoffset: 0; transform: scale(.9); transform-origin: 12px 12px; transition: opacity 180ms ease, transform 260ms var(--check-ease); }
.sl-check--fill .sl-check__input:checked + .sl-check__box::before { transform: scale(1); }
.sl-check--fill .sl-check__input:checked + .sl-check__box .sl-check__tick { transform: scale(1); transition-delay: 20ms; }
/* Circular checkbox, not a radio: selections remain independent. */
.sl-check--outline .sl-check__box { width: 30px; height: 30px; border-radius: 50%; }
.sl-check--outline .sl-check__box::before { border-radius: 50%; transform: scale(.65); transition: opacity 200ms ease, transform 280ms var(--check-ease); }
.sl-check--outline .sl-check__input:checked + .sl-check__box::before { transform: scale(1); }
.sl-check--outline .sl-check__tick { stroke-dashoffset: 0; transform: scale(.9); transform-origin: 12px 12px; transition: opacity 180ms ease, transform 260ms var(--check-ease); }
.sl-check--outline .sl-check__input:checked + .sl-check__box .sl-check__tick { transform: scale(1); transition-delay: 20ms; }
.sl-check--task .sl-check__title { transition: color 440ms ease; }
.sl-check--task .sl-check__title::after { content: ""; position: absolute; left: 0; right: 0; top: 52%; height: 1px; background: #bebebe; transform: scaleX(0); transform-origin: left; transition: transform 600ms var(--check-ease); }
.sl-check--task .sl-check__input:checked ~ .sl-check__copy .sl-check__title { color: #b3b3b3; }
.sl-check--task .sl-check__input:checked ~ .sl-check__copy .sl-check__title::after { transform: scaleX(1); transition-delay: 90ms; }
.sl-check-group__children { margin: 0 12px 5px; padding-top: 7px; border-top: 1px solid #ffffff12; }
.sl-check-group__children .sl-check { min-height: 45px; padding: 7px 0; }
.sl-check-group__children .sl-check__box { width: 24px; height: 24px; border-radius: 7px; }
.sl-check-group__children .sl-check__box svg { width: 21px; height: 21px; }
.sl-check-group__children .sl-check__title { font-size: 14px; font-weight: 450; }
.visually-hidden { position: absolute; width: 1px; height: 1px; padding: 0; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
@media (max-width:420px) { .sl-check { gap: 12px; padding-inline: 10px; } .sl-check__title { font-size: 14px; } }
@media (prefers-reduced-motion:reduce) { .sl-check-card *, .sl-check-card *::before, .sl-check-card *::after { transition: none !important; animation: none !important; } .sl-check:active .sl-check__box { transform: none; } }
@media (forced-colors:active) {
  .sl-check-card { color: CanvasText; background: Canvas; border-color: CanvasText; }
  .sl-check__hint { color: CanvasText; }
  .sl-check__box { forced-color-adjust: none; background: Canvas; border-color: CanvasText; }
  .sl-check__box::before { background: Highlight; }
  .sl-check__box svg { stroke: HighlightText; }
  .sl-check--outline .sl-check__box svg { stroke: HighlightText; }
  .sl-check--outline .sl-check__input:checked + .sl-check__box { border-color: Highlight; }
  .sl-check__input:focus-visible + .sl-check__box { outline-color: Highlight; }
}

/* Only the twenty new studies; the original five keep their own motion. */
.check-jumps { display: flex; flex-wrap: wrap; gap: 10px 22px; margin-top: 28px; }
.check-jumps a { color: #bdbdbd; font-size: 14px; text-decoration: none; border-bottom: 1px solid #676767; padding-block: 8px; }
.check-jumps a:hover { color: #fff; }
.check-jumps a:focus-visible { outline: 2px solid #ddd; outline-offset: 4px; }
.check-section { grid-column: 1 / -1; padding-top: 26px; scroll-margin-top: 30px; }
.check-section h2 { margin: 0 0 4px; font-size: 28px; letter-spacing: -.03em; }
[data-variation] .toggle-heading h2 { font-size: 21px; }
[data-variation] .sl-check__title { line-height: 1.4; }
.sl-check--round .sl-check__box { border-radius: 50%; width: 30px; height: 30px; }
.sl-check--sharp .sl-check__box { border-radius: 4px; }
.mark-stroke { opacity: 0; stroke-dasharray: 1; stroke-dashoffset: 1; transition: stroke-dashoffset 360ms var(--check-ease), opacity 240ms ease; }
.sl-check__input:checked + .sl-check__box .mark-stroke { opacity: 1; stroke-dashoffset: 0; }
.sl-check--cross .stroke-two { transition-delay: 0ms; }
.sl-check--cross .sl-check__input:checked + .sl-check__box .stroke-two { transition-delay: 75ms; }
.sl-check--cross-turn .mark-stroke { stroke-dashoffset: 0; transform-origin: 12px 12px; transform: rotate(-35deg) scale(.7); transition: transform 400ms var(--check-ease), opacity 240ms ease; }
.sl-check--cross-turn .sl-check__input:checked + .sl-check__box .mark-stroke { transform: rotate(0) scale(1); transition-delay: 0ms; }
.sl-check--icon .sl-check__box { width: 36px; height: 36px; }
.sl-check--icon .sl-check__box svg { stroke: #b4b4b4; transition: stroke 320ms ease; }
.sl-check--icon .sl-check__input:checked + .sl-check__box svg { stroke: var(--check-ink); }
.mark-icon { transform-origin: 12px 12px; fill: transparent; transition: fill 360ms ease, transform 460ms var(--check-ease); }
.sl-check--star .sl-check__input:checked + .sl-check__box .mark-icon { fill: var(--check-ink); transform: rotate(12deg) scale(.93); }
.sl-check--heart .mark-icon { transform: scale(.88); }
.sl-check--heart .sl-check__input:checked + .sl-check__box .mark-icon { fill: var(--check-ink); transform: scale(1); }
.sl-check--bookmark .mark-icon { transform: translateY(-2px); }
.sl-check--bookmark .sl-check__input:checked + .sl-check__box .mark-icon { transform: translateY(0); fill: var(--check-ink); }
.sl-check--shield .sl-check__box::before { border-radius: 7px; transform: scale(.5); }
.sl-check--shield .sl-check__input:checked + .sl-check__box::before { transform: scale(1); }
.sl-check--shield .sl-check__input:checked + .sl-check__box .mark-stroke { transition-delay: 80ms; }
.sl-check--pin .mark-icon { transform: translateY(-1px) rotate(-15deg); transform-origin: 12px 12px; }
.sl-check--pin .sl-check__input:checked + .sl-check__box .mark-icon { transform: translateY(0) rotate(0); }
.sl-check--bell .mark-icon { transform: rotate(-10deg); transform-origin: 12px 4px; }
.sl-check--bell .sl-check__input:checked + .sl-check__box .mark-icon { transform: rotate(0); }
.sl-check--bell .sl-check__input:checked + .sl-check__box .mark-stroke { transition-delay: 120ms; }
.sl-check--ring .sl-check__box { border-color: #6d6d6d; }
.sl-check--ring .sl-check__box::before, .sl-check--corner .sl-check__box::before { display: none; }
.sl-check--ring .sl-check__box svg, .sl-check--corner .sl-check__box svg { stroke: var(--check-paper); }
.check-ring { stroke-dasharray: 1; stroke-dashoffset: 1; transform: rotate(-90deg); transform-origin: 12px 12px; transition: stroke-dashoffset 520ms var(--check-ease); }
.sl-check--ring .sl-check__input:checked + .sl-check__box .check-ring { stroke-dashoffset: 0; }
.sl-check--ring .sl-check__input:checked + .sl-check__box { border-color: #6d6d6d; }
.sl-check--corner .sl-check__box { overflow: visible; border: 0; background: transparent; box-shadow: none; }
.check-corners { transform-origin: 12px 12px; transform: scale(1.08); opacity: .45; transition: transform 400ms var(--check-ease), opacity 320ms ease; }
.sl-check--corner .sl-check__input:checked + .sl-check__box .check-corners { transform: scale(.9); opacity: 1; }

.check-caption { margin: 12px 12px 14px; color: #c9c9c9; font-size: 13px; line-height: 1.4; }
.check-chips { display: flex; flex-wrap: wrap; justify-content: center; gap: 8px; padding: 0 10px 12px; }
.sl-check--chip { min-height: 40px; padding: 8px 28px; justify-content: center; gap: 0; background: #131313; border: 1px solid #585858; border-radius: 30px; transition: background-color 320ms ease, border-color 320ms ease; }
.sl-check--chip .sl-check__copy { transform: translateX(0); transition: transform 360ms var(--check-ease); }
.sl-check--chip:has(:checked) .sl-check__copy { transform: translateX(12px); }
.sl-check--chip .sl-check__title { font-size: 13px; }
.sl-check--chip .sl-check__box { position: absolute; left: 16px; top: calc(50% - 9px); width: 18px; height: 18px; border: 0; background: transparent; box-shadow: none; opacity: 0; transition: opacity 180ms ease; }
.sl-check--chip:has(:checked) .sl-check__box { opacity: 1; }
.sl-check--chip .sl-check__box::before { display: none; }
.sl-check--chip .sl-check__box svg { width: 18px; height: 18px; stroke: var(--check-paper); }
.sl-check--chip:has(:checked) { background: #404040; border-color: #b6b6b6; }
.sl-check--chip .sl-check__tick { stroke-dashoffset: 1; transition: opacity 180ms ease, stroke-dashoffset 360ms var(--check-ease); }
.sl-check--chip .sl-check__input:checked + .sl-check__box .sl-check__tick { stroke-dashoffset: 0; transition-delay: 70ms; }
.sl-check--chip:has(:focus-visible) { outline: 2px solid var(--check-paper); outline-offset: 3px; }
.sl-check--chip .sl-check__input:focus-visible + .sl-check__box { outline: none; }
.check-days { display: grid; grid-template-columns: repeat(7,minmax(0,1fr)); gap: 3px; padding: 0 9px 12px; }
.check-day { position: relative; min-width: 0; cursor: pointer; }
.check-day > span { position: relative; display: grid; place-content: center; height: 44px; border: 1px solid #5c5c5c; border-radius: 20px; color: #bdbdbd; font-size: 12px; transition: color 300ms ease, background-color 300ms ease, border-color 300ms ease; }
.check-day i { position: absolute; bottom: 5px; left: calc(50% - 2px); width: 4px; height: 4px; background: #262626; border-radius: 50%; transform: scale(0); transition: transform 340ms var(--check-ease); }
.check-day input:checked + span { background: var(--check-paper); color: var(--check-ink); border-color: var(--check-paper); }
.check-day input:checked + span i { transform: scale(1); }
.check-day input:focus-visible + span, .check-tile input:focus-visible + span, .check-swatch input:focus-visible + span { outline: 2px solid var(--check-paper); outline-offset: 3px; }
.check-tiles { display: grid; grid-template-columns: repeat(2,minmax(0,1fr)); gap: 10px; padding: 8px; }
.check-tile { position: relative; min-width: 0; cursor: pointer; }
.check-tile__face { display: flex; min-height: 128px; flex-direction: column; align-items: center; justify-content: center; gap: 10px; border: 1px solid #686868; border-radius: 10px; background: #181818; color: #bebebe; transition: border-color 340ms ease, background-color 340ms ease, color 340ms ease; font-size: 12px; }
.tile-art { width: 29px; height: 29px; transition: transform 420ms var(--check-ease); }
.check-tile svg, .row-art { stroke: currentColor; stroke-width: 1.4; stroke-linecap: round; stroke-linejoin: round; }
.tile-check { position: absolute; width: 17px; height: 17px; right: 8px; top: 8px; }
.check-tile input:checked + span { border-color: #c9c9c9; background: #3b3b3b; color: #f3f3f3; }
.check-tile input:checked + span .tile-art { transform: translateY(-2px); }
.check-tile input:checked + span .sl-check__tick { stroke-dashoffset: 0; opacity: 1; }
.check-swatches { display: grid; grid-template-columns: repeat(3,minmax(0,1fr)); gap: 10px; padding: 0 10px 12px; }
.check-swatch { position: relative; display: grid; justify-items: center; gap: 9px; cursor: pointer; }
.swatch-face { position: relative; display: grid; place-content: center; width: 60px; height: 60px; border: 1px solid #777777; border-radius: 50%; box-shadow: 0 0 0 3px transparent; transition: box-shadow 350ms ease, border-color 350ms ease; }
.texture-0 { background: #474747; }
.texture-1 { background: repeating-linear-gradient(45deg,#303030 0 4px,#5b5b5b 4px 5px); }
.texture-2 { background: radial-gradient(#7d7d7d 1px,transparent 1.5px) 0 0 / 7px 7px,#323232; }
.swatch-face svg { width: 24px; height: 24px; stroke: #222222; stroke-width: 1.6; stroke-linecap: round; stroke-linejoin: round; background: #f2f2f2; border-radius: 50%; opacity: 0; transform: scale(.65); transition: transform 380ms var(--check-ease), opacity 240ms ease; }
.check-swatch input:checked + span { border-color: #e6e6e6; box-shadow: 0 0 0 3px #828282; }
.check-swatch input:checked + span svg { opacity: 1; transform: scale(1); }
.check-swatch input:checked + span .sl-check__tick { stroke-dashoffset: 0; opacity: 1; }
.swatch-label { font-size: 12px; color: #c3c3c3; }

.check-list .sl-check { min-height: 52px; padding: 10px 12px; gap: 12px; }
.check-list .sl-check__title { font-size: 13px; }
.check-list .sl-check__box { width: 24px; height: 24px; }
.check-list .sl-check__box svg { width: 20px; height: 20px; }
.check-list .sl-check + .sl-check { border-top: 1px solid #ffffff0a; }
.check-exclusions .sl-check__title { transition: opacity 300ms ease; }
.check-exclusions .sl-check:has(:checked) .sl-check__title { opacity: .55; text-decoration: line-through; text-decoration-thickness: 1px; }
.sl-check--right .sl-check__box { order: 3; margin-left: auto; }
.sl-check--right .sl-check__copy { flex: 1; }
.row-art { width: 22px; height: 22px; color: #c3c3c3; flex: none; }
.check-filelist .sl-check:has(:checked) { background: #3c3c3c; }
.check-filelist .sl-check { transition: background-color 400ms ease; }
.check-table-head { display: flex; justify-content: space-between; margin: 10px 12px 6px 48px; color: #aaaaaa; font-size: 11px; }
.check-table .sl-check { border-radius: 0; min-height: 45px; }
.check-table .sl-check__copy { display: flex; flex: 1; align-items: center; justify-content: space-between; gap: 8px; }
.check-table .sl-check__hint { font-size: 11px; }
.check-table .sl-check:has(:checked) { background: #363636; }
.check-tree { margin: 0 8px 10px 23px; border-left: 1px solid #5e5e5e; padding-left: 10px; }
.check-tree .sl-check { position: relative; min-height: 43px; border: 0; padding-right: 4px; }
.check-tree .sl-check::before { content: ""; position: absolute; left: -10px; width: 12px; height: 1px; background: #5e5e5e; }
.check-nested > .sl-check { min-height: 65px; }
@media (max-width:420px) {
  .swatch-face { width: 49px; height: 49px; }
  .check-swatches { gap: 7px; padding-inline: 6px; }
  .check-list .sl-check { padding-inline: 8px; gap: 9px; }
  .check-list .sl-check__title { font-size: 12px; }
  .check-days { padding-inline: 4px; }
}
@media (prefers-reduced-motion: reduce) {
  .sl-check-card *, .sl-check-card *::before, .sl-check-card *::after { animation: none !important; transition: none !important; }
}
@media (forced-colors:active) {
  .sl-check--icon .sl-check__box svg { stroke: CanvasText; }
  .sl-check--icon .sl-check__input:checked + .sl-check__box svg { stroke: HighlightText; }
  .sl-check--icon .sl-check__input:checked + .sl-check__box .mark-icon { fill: transparent; }
  .sl-check--ring .sl-check__box svg, .sl-check--corner .sl-check__box svg, .sl-check--chip .sl-check__box svg { stroke: CanvasText; }
  .check-day > span, .check-tile__face, .swatch-face { forced-color-adjust: none; color: CanvasText; background: Canvas; border-color: CanvasText; }
  .check-day input:checked + span, .check-tile input:checked + span, .check-swatch input:checked + span { background: Highlight; color: HighlightText; border-color: HighlightText; }
  .check-day input:checked + span i { background: HighlightText; }
}
`,qe=(()=>{let e=new WeakMap;function b(t,{onChange:o}={}){if(e.has(t))return e.get(t);if(o!==void 0&&typeof o!="function")throw new TypeError("onChange must be a function.");let n=[...t.querySelectorAll('input[type="checkbox"]')];if(!n.length)throw new TypeError("Native checkboxes are required.");let a=t.querySelector("[data-parent]"),p=[...t.querySelectorAll("[data-child]")],l=new AbortController,c=!1,h=()=>n.filter(f=>f!==a&&f.checked).map(f=>f.name);function i(){if(!a||!p.length)return;let f=p.filter(k=>k.checked).length;a.checked=f===p.length,a.indeterminate=f>0&&f<p.length}function r(f){if(n.includes(f.target)){if(f.target===a)for(let k of p)k.disabled||(k.checked=a.checked);i(),o?.(h()),t.dispatchEvent(new CustomEvent("selectionchange",{bubbles:!0,detail:{values:h()}}))}}let d=()=>{if(!c){for(let f of n)f.checked=f.defaultChecked;i()}};t.addEventListener("change",r,{signal:l.signal}),n[0].form?.addEventListener("reset",()=>queueMicrotask(d),{signal:l.signal}),i();let u={reset:d,get values(){return h()},destroy(){c=!0,l.abort(),e.delete(t)}};return e.set(t,u),u}return{mount:b}})(),ee={pair:{markup:`<div class="button-kit">
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
  </div>`,css:de,mount:pe.mount},"text-input":{markup:`<div class="sl-field" id="text-field">
            <div class="sl-field__control"><input class="sl-field__input" id="demo-text" type="text" placeholder=" " autocomplete="off" aria-describedby="text-help"><label class="sl-field__label" for="demo-text">Project name</label></div>
            <p class="sl-field__helper" id="text-help">Try a name for your next project.</p>
          </div>`,css:K,mount:ue.mount},"email-input":{markup:`<div class="sl-field sl-field--email" id="email-field" data-validation="neutral">
            <div class="sl-field__control">
              <input class="sl-field__input" id="demo-email" type="email" placeholder=" " autocomplete="off" spellcheck="false" aria-describedby="email-help">
              <label class="sl-field__label" for="demo-email">Email address</label>
              <svg class="sl-field__validation" viewBox="0 0 24 24" fill="none" aria-hidden="true"><g class="sl-field__invalid-icon"><path pathLength="1" d="m8.25 8.25 7.5 7.5"/><path pathLength="1" d="m15.75 8.25-7.5 7.5"/></g><path class="sl-field__valid-icon" pathLength="1" d="m5.5 12 4 4 9-9"/></svg>
            </div>
            <p class="sl-field__helper" id="email-help" role="status" aria-live="polite">Use an address such as name@example.com.</p>
          </div>`,css:K,mount:fe.mount},"textarea-input":{markup:`<div class="sl-field sl-field--textarea" id="textarea-field">
            <div class="sl-field__control">
              <textarea class="sl-field__input" id="demo-textarea" placeholder=" " maxlength="180" rows="1" aria-describedby="textarea-help"></textarea>
              <label class="sl-field__label" for="demo-textarea">Project notes</label>
              <span class="sl-field__counter" aria-hidden="true"><span data-count>0</span><span>/180</span></span>
            </div>
            <p class="sl-field__helper" id="textarea-help" role="status" aria-live="polite">Add a short note for your team.</p>
          </div>`,css:K,mount:me.mount},"buttons-details-disclosure-v11":{markup:`<section class="sl-component" data-kind="buttons-details-disclosure" data-active="false" aria-label="Details disclosure">
    <button class="motion-button" type="button" data-action aria-label="Show details" aria-expanded="false" aria-controls="details-panel">
      <span class="button-surface" aria-hidden="true"><span class="button-icon"><svg viewBox="0 0 24 24" focusable="false"><path class="disclosure-chevron" d="m7 9 5 5 5-5"/></svg></span><span class="button-label" data-label>Show details</span></span>
    </button>
    <div class="details-panel" id="details-panel" data-panel data-open="false" aria-hidden="true" inert><div><p>Updated today \xB7 3 collaborators \xB7 local example</p></div></div><p class="component-status" data-status role="status" aria-live="polite" aria-atomic="true">Details are hidden.</p>
  </section>`,css:he,mount:ne.mount,rootSelector:".sl-component",demoMount:ne.mountPreview},"status-menu":{markup:'<div class="menu-demo menu-study" data-menu="status" data-motion="corner"><button type="button" class="menu-trigger" data-trigger aria-expanded="false" aria-haspopup="menu" aria-controls="study-status"><i class="menu-glyph " data-icon="flag" aria-hidden="true"><svg viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg" focusable="false" aria-hidden="true"><path d="M6 24V5m0 3c5-5 11 4 16-1v11c-5 5-11-4-16 1"/></svg></i><span class="menu-trigger-label" data-trigger-label>In progress</span><i class="menu-glyph menu-chevron" data-icon="chevron" aria-hidden="true"><svg viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg" focusable="false" aria-hidden="true"><path d="m8 11 6 6 6-6"/></svg></i></button><div class="menu-panel" id="study-status" role="menu" aria-label="Status picker" aria-hidden="true" inert><div class="menu-overline">PROJECT STATUS</div><button type="button" class="menu-item" data-value="planned" data-label="Planned" role="menuitemradio" aria-checked="false" tabindex="-1" ><i class="menu-glyph " data-icon="clock" aria-hidden="true"><svg viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg" focusable="false" aria-hidden="true"><circle cx="14" cy="14" r="9"/><path d="M14 8v6l4 3"/></svg></i><span class="choice-copy"><strong>Planned</strong></span><i class="menu-glyph menu-check" data-icon="check" aria-hidden="true"><svg viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg" focusable="false" aria-hidden="true"><path d="m5 14 6 6L23 8"/></svg></i></button><button type="button" class="menu-item" data-value="active" data-label="In progress" role="menuitemradio" aria-checked="true" tabindex="-1" ><i class="menu-glyph " data-icon="edit" aria-hidden="true"><svg viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg" focusable="false" aria-hidden="true"><path d="m5 23 1.5-5.5L19 5a2.8 2.8 0 0 1 4 4L10.5 21.5 5 23ZM16.5 7.5l4 4M6.5 17.5l4 4"/></svg></i><span class="choice-copy"><strong>In progress</strong></span><i class="menu-glyph menu-check" data-icon="check" aria-hidden="true"><svg viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg" focusable="false" aria-hidden="true"><path d="m5 14 6 6L23 8"/></svg></i></button><button type="button" class="menu-item" data-value="review" data-label="In review" role="menuitemradio" aria-checked="false" tabindex="-1" ><i class="menu-glyph " data-icon="search" aria-hidden="true"><svg viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg" focusable="false" aria-hidden="true"><circle cx="12" cy="12" r="7.5"/><path d="m17.5 17.5 6 6"/></svg></i><span class="choice-copy"><strong>In review</strong></span><i class="menu-glyph menu-check" data-icon="check" aria-hidden="true"><svg viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg" focusable="false" aria-hidden="true"><path d="m5 14 6 6L23 8"/></svg></i></button><button type="button" class="menu-item" data-value="complete" data-label="Complete" role="menuitemradio" aria-checked="false" tabindex="-1" ><i class="menu-glyph " data-icon="check" aria-hidden="true"><svg viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg" focusable="false" aria-hidden="true"><path d="m5 14 6 6L23 8"/></svg></i><span class="choice-copy"><strong>Complete</strong></span><i class="menu-glyph menu-check" data-icon="check" aria-hidden="true"><svg viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg" focusable="false" aria-hidden="true"><path d="m5 14 6 6L23 8"/></svg></i></button></div><p class="menu-feedback" data-feedback role="status" aria-live="polite">Choose a state for this sample project.</p></div>',css:ge,mount:be.mount},"labels-menu":{markup:'<div class="menu-demo" data-menu="labels"><button type="button" class="menu-trigger" data-trigger aria-expanded="false" aria-haspopup="menu" aria-controls="menu-labels"><i class="menu-glyph " data-icon="tag" aria-hidden="true"><svg viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg" focusable="false" aria-hidden="true"><path d="M5 5h8l10 10a2 2 0 0 1 0 3l-5 5a2 2 0 0 1-3 0L5 13Z"/><circle cx="10" cy="10" r="1.7"/></svg></i><span class="menu-trigger-label" data-trigger-label>Labels</span><span class="menu-badge" data-count>1</span><i class="menu-glyph menu-chevron" data-icon="chevron" aria-hidden="true"><svg viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg" focusable="false" aria-hidden="true"><path d="m8 11 6 6 6-6"/></svg></i></button><div id="menu-labels" class="menu-panel" role="menu" aria-label="labels options" aria-hidden="true" inert><div class="menu-overline">FILTER BY LABEL</div><button type="button" class="menu-item" role="menuitemcheckbox" aria-checked="true" tabindex="-1" data-value="design"><span class="menu-dot" aria-hidden="true"></span><span data-label>Design</span><i class="menu-glyph menu-check" data-icon="check" aria-hidden="true"><svg viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg" focusable="false" aria-hidden="true"><path d="m5 14 6 6L23 8"/></svg></i></button><button type="button" class="menu-item" role="menuitemcheckbox" aria-checked="false" tabindex="-1" data-value="development"><span class="menu-dot" aria-hidden="true"></span><span data-label>Development</span><i class="menu-glyph menu-check" data-icon="check" aria-hidden="true"><svg viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg" focusable="false" aria-hidden="true"><path d="m5 14 6 6L23 8"/></svg></i></button><button type="button" class="menu-item" role="menuitemcheckbox" aria-checked="false" tabindex="-1" data-value="motion"><span class="menu-dot" aria-hidden="true"></span><span data-label>Motion</span><i class="menu-glyph menu-check" data-icon="check" aria-hidden="true"><svg viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg" focusable="false" aria-hidden="true"><path d="m5 14 6 6L23 8"/></svg></i></button><div class="menu-rule" role="separator"></div><button type="button" class="menu-item menu-done" data-done>Done</button></div><p class="menu-feedback" data-feedback role="status" aria-live="polite">Design</p></div>',css:xe,mount:ke.mount},"inputs-attachment-v11":{markup:`<section class="sl-component" data-kind="inputs-attachment-v11" aria-label="Attachment input">
    <h2 class="sl-heading"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 4h7l4 4v12H5V4Zm6 0v5h5M8 13h8m-8 4h5"/></svg>Attachment input</h2>
    <label class="sl-real-file"><span>Project document</span><span class="sl-file-control"><span aria-hidden="true">Choose file</span><input class="sl-file" type="file" accept=".pdf,.txt,.md" aria-label="Project document" aria-describedby="file-help"></span></label>
    <div class="sl-demo-file" hidden><span>Sample document</span><button class="sl-demo-choose" type="button">Choose demo file</button></div>
    <div class="sl-file-detail"><p class="sl-file-name">No file selected</p><p class="sl-file-size">PDF, TXT or MD \xB7 up to 5 MiB</p></div>
    <div class="sl-actions"><button class="sl-remove-file" type="button" disabled>Remove file</button></div><p class="sl-status" id="file-help" role="status">Local selection only. Nothing is uploaded or read.</p>
  </section>`,css:ve,mount:ae.mount,rootSelector:".sl-component",demoMount:ae.mountPreview},"search-input":{markup:`<div class="sl-field sl-field--search" id="search-field" data-search-open="false">
            <div class="sl-field__control">
              <svg class="sl-field__leading" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 4.5 4.5"/></svg>
              <input class="sl-field__input" id="demo-search" type="search" placeholder=" " autocomplete="off" spellcheck="false" role="combobox" aria-autocomplete="list" aria-controls="search-options" aria-expanded="false" aria-describedby="search-help">
              <label class="sl-field__label" for="demo-search">Find a component</label>
              <button class="sl-field__action sl-field__clear" type="button" aria-label="Clear search" aria-controls="demo-search" hidden><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m7 7 10 10M17 7 7 17"/></svg></button>
            </div>
            <div class="sl-field__popup" aria-hidden="true" inert><ul class="sl-field__options" id="search-options" role="listbox" aria-label="Component suggestions"></ul><p class="sl-field__empty" hidden>No matches. Try another word.</p></div>
            <p class="sl-field__helper" id="search-help" role="status" aria-live="polite">Search the local component list.</p>
          </div>`,css:K,mount:ye.mount},"tabs-navigation":{markup:'<div class="nav-demo" data-navigation="tabs"><div class="nav-surface tabs-surface"><div class="nav-track underline-track" role="tablist" aria-label="Project sections"><span class="nav-indicator" aria-hidden="true"></span><button type="button" role="tab" id="tabs-tab-0" aria-controls="tabs-panel-0" aria-selected="true" tabindex="0" data-choice="0"><span>Overview</span></button><button type="button" role="tab" id="tabs-tab-1" aria-controls="tabs-panel-1" aria-selected="false" tabindex="-1" data-choice="1"><span>Files</span></button><button type="button" role="tab" id="tabs-tab-2" aria-controls="tabs-panel-2" aria-selected="false" tabindex="-1" data-choice="2"><span>Activity</span></button></div><div class="nav-content" role="tabpanel" id="tabs-panel-0" aria-labelledby="tabs-tab-0" tabindex="0" ><span class="nav-eyebrow">STUDIO PROJECT</span><h3>A little more clarity.</h3><p>Your ideas, files and progress in one place.</p><div class="project-meta"><span class="status-dot"></span>In progress<span class="meta-line"></span>Updated today</div></div><div class="nav-content" role="tabpanel" id="tabs-panel-1" aria-labelledby="tabs-tab-1" tabindex="0" hidden><div class="document-row"><i class="menu-glyph " data-icon="file" aria-hidden="true"><svg viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg" focusable="false" aria-hidden="true"><path d="M7 4h10l6 6v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm10 0v6h6"/></svg></i><div><strong>Project brief</strong><small>Document \xB7 Updated today</small></div></div><div class="document-row"><i class="menu-glyph " data-icon="folder" aria-hidden="true"><svg viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg" focusable="false" aria-hidden="true"><path d="M4.5 9a2 2 0 0 1 2-2h5l2.5 3h7.5a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-15a2 2 0 0 1-2-2Z"/></svg></i><div><strong>Design assets</strong><small>Folder \xB7 Three files</small></div></div></div><div class="nav-content" role="tabpanel" id="tabs-panel-2" aria-labelledby="tabs-tab-2" tabindex="0" hidden><div class="activity-line"><span></span><div><strong>Brief updated</strong><small>Alex \xB7 Just now</small></div></div><div class="activity-line"><span></span><div><strong>Assets added</strong><small>Sam \xB7 Earlier today</small></div></div></div></div></div>',css:we,mount:_e.mount},"carousel-navigation":{markup:'<div class="nav-demo nav-next" data-navigation="carousel"><div class="nav-surface collection-surface"><div class="collection-window" tabindex="0" role="region" aria-roledescription="carousel" aria-label="Project collection"><div class="collection-track"><section class="collection-slide" role="group" aria-roledescription="slide" aria-label="1 of 3" ><span class="slide-emblem"><i class="menu-glyph " data-icon="folder" aria-hidden="true"><svg viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg" focusable="false" aria-hidden="true"><path d="M4.5 9a2 2 0 0 1 2-2h5l2.5 3h7.5a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-15a2 2 0 0 1-2-2Z"/></svg></i></span><span class="nav-eyebrow">STUDIO COLLECTION</span><h3>Brand system</h3><p>A shared language for every detail.</p></section><section class="collection-slide" role="group" aria-roledescription="slide" aria-label="2 of 3" inert aria-hidden="true"><span class="slide-emblem"><i class="menu-glyph " data-icon="file" aria-hidden="true"><svg viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg" focusable="false" aria-hidden="true"><path d="M7 4h10l6 6v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm10 0v6h6"/></svg></i></span><span class="nav-eyebrow">STUDIO COLLECTION</span><h3>Product flow</h3><p>A clear path from idea to interaction.</p></section><section class="collection-slide" role="group" aria-roledescription="slide" aria-label="3 of 3" inert aria-hidden="true"><span class="slide-emblem"><i class="menu-glyph " data-icon="edit" aria-hidden="true"><svg viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg" focusable="false" aria-hidden="true"><path d="m5 23 1.5-5.5L19 5a2.8 2.8 0 0 1 4 4L10.5 21.5 5 23ZM16.5 7.5l4 4M6.5 17.5l4 4"/></svg></i></span><span class="nav-eyebrow">STUDIO COLLECTION</span><h3>Motion notes</h3><p>Small movements with a little meaning.</p></section></div></div><div class="collection-controls"><button type="button" data-prev-slide aria-label="Previous project" disabled><i class="menu-glyph arrow-left" data-icon="chevron" aria-hidden="true"><svg viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg" focusable="false" aria-hidden="true"><path d="m8 11 6 6 6-6"/></svg></i></button><nav class="collection-dots" aria-label="Choose project"><button type="button" data-slide="0" aria-label="Brand system" aria-current="true"><span></span></button><button type="button" data-slide="1" aria-label="Product flow" ><span></span></button><button type="button" data-slide="2" aria-label="Motion notes" ><span></span></button></nav><button type="button" data-next-slide aria-label="Next project"><i class="menu-glyph arrow-right" data-icon="chevron" aria-hidden="true"><svg viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg" focusable="false" aria-hidden="true"><path d="m8 11 6 6 6-6"/></svg></i></button></div><p class="sr-only" data-slide-status role="status">Brand system, 1 of 3</p></div></div>',css:Ce,mount:Se.mount},bookmark:{markup:`<button class="sl-bookmark" id="bookmark-button" type="button" aria-label="Bookmark" aria-pressed="false" disabled>
          <span class="sl-bookmark__surface" aria-hidden="true">
            <span class="sl-bookmark__wash"></span>
            <span class="sl-bookmark__icon">
              <svg class="sl-bookmark__ribbon" viewBox="0 0 24 24" fill="none" focusable="false">
                <path class="sl-bookmark__outline" d="M6 20V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v15l-6-4-6 4Z"/>
                <path class="sl-bookmark__fill" d="M6 20V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v15l-6-4-6 4Z"/>
              </svg>
            </span>
            <span class="sl-bookmark__label">Bookmark</span>
          </span>
        </button>
  <p class="bookmark-feedback" role="status" aria-live="polite" aria-atomic="true"></p>`,css:Ee,mount:Ae.mount},"glide-toggle":{markup:`<div class="sl-toggle sl-toggle--glide" id="glide-toggle" data-checked="true">
            <span class="sl-toggle__emblem" aria-hidden="true"><svg viewBox="0 0 32 32" fill="none"><g class="sl-bell__body"><path d="M10 14a6 6 0 0 1 12 0v4l2 4H8l2-4v-4ZM14 26a2.5 2.5 0 0 0 4 0M16 5v3"/></g><g class="sl-bell__waves"><path d="M6.5 9.5A11 11 0 0 0 4 16M25.5 9.5A11 11 0 0 1 28 16"/></g><path class="sl-bell__slash" pathLength="1" d="m7 6 18 21"/></svg></span>
            <label class="sl-toggle__label" for="demo-glide"><span class="sl-toggle__copy"><span class="sl-toggle__title">Notifications</span><span class="sl-toggle__status" data-status>On</span></span></label>
            <span class="sl-toggle__switch"><input class="sl-toggle__input" id="demo-glide" type="checkbox" checked data-on="On" data-off="Off"><span class="sl-toggle__track" aria-hidden="true"><span class="sl-toggle__thumb"></span></span></span>
          </div>`,css:oe,mount:ie.mount},"privacy-toggle":{markup:`<div class="sl-toggle sl-toggle--privacy" id="privacy-toggle" data-checked="false">
            <span class="sl-toggle__emblem" aria-hidden="true"><svg viewBox="0 0 32 32" fill="none"><path class="sl-lock__shackle" d="M10 13V10a6 6 0 0 1 12 0v3"/><rect class="sl-lock__body" x="7" y="13" width="18" height="14" rx="4"/><path class="sl-lock__key" pathLength="1" d="M16 19v3"/></svg></span>
            <label class="sl-toggle__label" for="demo-privacy"><span class="sl-toggle__copy"><span class="sl-toggle__title">Private profile</span><span class="sl-toggle__status" data-status>Public</span></span></label>
            <span class="sl-toggle__switch"><input class="sl-toggle__input" id="demo-privacy" type="checkbox" data-on="Private" data-off="Public"><span class="sl-toggle__track" aria-hidden="true"><span class="sl-toggle__thumb"></span></span></span>
          </div>`,css:oe,mount:ie.mount},"feature-list-checkbox":{markup:'<fieldset class="sl-check-card check-list" data-demo="feature-list"><legend class="visually-hidden">Features</legend><p class="check-caption">Add features</p><label class="sl-check sl-check--outline sl-check--right"><input class="sl-check__input" type="checkbox" id="feature-0" name="feature-0" ><span class="sl-check__box" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path class="sl-check__tick" pathLength="1" d="m5 12 4.5 4.5L19 7"/><path class="sl-check__dash" d="M6 12h12"/></svg></span><svg class="row-art" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/></svg><span class="sl-check__copy"><span class="sl-check__title">Components</span></span></label><label class="sl-check sl-check--outline sl-check--right"><input class="sl-check__input" type="checkbox" id="feature-1" name="feature-1" ><span class="sl-check__box" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path class="sl-check__tick" pathLength="1" d="m5 12 4.5 4.5L19 7"/><path class="sl-check__dash" d="M6 12h12"/></svg></span><svg class="row-art" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="3"/><circle cx="8" cy="9" r="1.5"/><path d="m4 18 6-6 4 4 3-3 4 4"/></svg><span class="sl-check__copy"><span class="sl-check__title">Gallery</span></span></label><label class="sl-check sl-check--outline sl-check--right"><input class="sl-check__input" type="checkbox" id="feature-2" name="feature-2" ><span class="sl-check__box" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path class="sl-check__tick" pathLength="1" d="m5 12 4.5 4.5L19 7"/><path class="sl-check__dash" d="M6 12h12"/></svg></span><svg class="row-art" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 3h8l4 4v14H6V3ZM14 3v5h4M9 12h6M9 16h5"/></svg><span class="sl-check__copy"><span class="sl-check__title">Documents</span></span></label></fieldset>',css:ze,mount:qe.mount}};function J(e,b={}){let t=e.trim(),o=b[t];return o===void 0?e:e.replace(t,o)}function te(e,b){let t=document.createTreeWalker(e,NodeFilter.SHOW_TEXT),o=[];for(;t.nextNode();)o.push(t.currentNode);for(let n of o){if(n.parentElement?.closest("input,textarea,[contenteditable],[data-user-text],style,script"))continue;let a=J(n.data,b);n.data!==a&&(n.data=a)}for(let n of e.querySelectorAll("[aria-label],[placeholder],[title],[data-on],[data-off],[data-label]"))for(let a of["aria-label","placeholder","title","data-on","data-off","data-label"]){if(!n.hasAttribute(a))continue;let p=n.getAttribute(a),l=J(p,b);p!==l&&n.setAttribute(a,l)}}var Le={input:".sl-field",menu:".menu-demo",navigation:".nav-demo",checkbox:".sl-check-card",toggle:".sl-toggle",display:".dd-demo"},Te=`:host{display:block;position:relative;min-width:0;font-family:'Instrument Sans',sans-serif}:host(:focus-within){z-index:6} [hidden]{display:none!important}
  :host([compact])>.sl-component{width:100%;height:auto;min-height:0;padding:0;border:0;background:transparent;box-shadow:none;gap:10px}
  :host([compact])>.sl-component .motion-button{width:100%}
  :host([compact])>.sl-component .component-status{max-width:none;min-height:0;font-size:11px}
  :host>.sl-field,:host>.menu-demo,:host>.nav-demo,:host>.sl-check-card,:host>.sl-toggle{width:100%;max-width:100%}
  :host>.menu-demo{height:100px;padding-top:0}
  :host>.menu-demo .menu-panel{top:62px;z-index:5}
  :host([dark]) .component-status,:host([dark]) .sl-field__helper{color:#bdbdbd}
  :host([dark]) .sl-component{--action-muted:#c4c4c4;--action-edge:#484848;color:#f1f1f1}
  :host([dark]) .details-panel{width:100%}
  :host([dark]) .details-panel p{background:#2b2b2b;color:#d6d6d6;font-size:14px;line-height:1.6}
  :host([no-caption]) .component-status,:host([no-caption]) .menu-feedback{display:none}
  :host([free-text]) .sl-field--textarea .sl-field__control{max-height:none}
  :host([free-text]) textarea.sl-field__input{overflow:hidden!important}
  :host([free-text]) .sl-field__counter{display:none}
  :host([compact-field]) .sl-field__helper{position:absolute;width:1px;height:1px;min-height:0;overflow:hidden;clip-path:inset(50%);margin:0}
  :host([accordion]) .motion-button{height:48px;font-size:14px;font-weight:500;text-align:left;border-radius:10px}
  :host([accordion]) .button-surface{justify-content:flex-start;padding:0 16px;gap:12px}
  :host([accordion]) .button-icon{width:18px;height:18px}
  :host([accordion]) .button-label{padding:0;white-space:normal;line-height:1.4}
  :host([accordion]) .details-panel{width:100%}
  :host([small-action]) .sl-bookmark{width:152px;height:36px;font-size:14px;font-weight:500;border-radius:9px}
  :host([small-action]) .sl-bookmark__icon{left:12px;width:16px;height:18px}
  :host([small-action]) .sl-bookmark__label{inset:0 12px 0 36px}
  :host([small-disclosure]) .sl-component .motion-button{height:40px;font-size:14px;font-weight:500;border-radius:8px}
  :host([small-disclosure]) .sl-component .button-surface{justify-content:flex-start;padding:0 12px;gap:8px}
  :host([small-disclosure]) .sl-component .button-icon{width:16px;height:16px}
  :host([link-group]) .sl-component .details-panel>div{display:grid;gap:4px;padding:8px 0}
  :host([direction-picker]) .sl-component .details-panel>div{padding:14px 0}
  :host([direction-picker]) .sl-component .details-panel p{padding:0;border:0;background:transparent;margin:0 0 12px}
  *,*::before,*::after{scrollbar-width:none}*::-webkit-scrollbar{display:none}
`;function Me(){if(customElements.get("sl-source-data-display-compositions-gallery-v11"))return;class e extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){let t=this.getAttribute("variant"),o=ee[t];if(!o)throw new Error(`Unknown source: ${t}`);this.definition=o,this.shadowRoot.innerHTML=o.markup;let n=document.createElement("style");n.textContent=o.css+Te+(this.config?.css||""),this.shadowRoot.prepend(n);let a=o.rootSelector||Object.entries(Le).find(([c])=>t.endsWith("-"+c))?.[1]||".sl-"+t;if(this.sourceRoot=this.shadowRoot.querySelector(a),!this.sourceRoot)throw new Error(`Missing source root: ${t}`);this.config?.prepare?.(this.shadowRoot,this.sourceRoot),this.hasAttribute("free-text")&&this.shadowRoot.querySelector("textarea")?.removeAttribute("maxlength"),te(this.shadowRoot,this.config?.copy);let p=this.config?.options||{};this.controller=(this.config?.demo&&o.demoMount?o.demoMount:o.mount)(this.sourceRoot,p),this.config?.ready?.(this);let l=()=>te(this.shadowRoot,this.config?.copy);if(l(),this.observer=new MutationObserver(l),this.observer.observe(this.sourceRoot,{subtree:!0,childList:!0,characterData:!0,attributes:!0,attributeFilter:["aria-label","data-label","data-on","data-off"]}),this.hasAttribute("free-text")){let c=this.shadowRoot.querySelector("textarea"),h=this.shadowRoot.querySelector(".sl-field__control"),i=60,r=0,d=()=>{if(h.getBoundingClientRect().width){let k=getComputedStyle(h);c.style.height="0px",i=c.value?Math.max(60,c.scrollHeight+parseFloat(k.borderTopWidth)+parseFloat(k.borderBottomWidth)):60}c.style.height="100%",c.style.overflowY="hidden",h.style.height=i+"px"};c.removeAttribute("maxlength"),this.resize=d,c.addEventListener("input",d),c.addEventListener("compositionend",d),d();let y=this.controller.reset.bind(this.controller);this.controller.reset=()=>{y(),d()};let u=new ResizeObserver(()=>{let f=h.getBoundingClientRect().width;f!==r&&(r=f,d())});u.observe(this),window.addEventListener("resize",d),this.freeTextCleanup=()=>{window.removeEventListener("resize",d),c.removeEventListener("input",d),c.removeEventListener("compositionend",d),u.disconnect()}}this.dataset.ready="true"}disconnectedCallback(){this.observer?.disconnect(),this.freeTextCleanup?.(),this.controller?.destroy(),this.config?.cleanup?.()}}customElements.define("sl-source-data-display-compositions-gallery-v11",e)}function R(e,b={}){Me();let t=document.createElement("sl-source-data-display-compositions-gallery-v11");t.setAttribute("variant",e),t.config=b;for(let o of b.attributes||[])t.setAttribute(o,"");return t}function Y(e,b,t=!1,o="normal"){let n=document.createElement("div");n.className="source-action action-"+o;let a=n.attachShadow({mode:"open"}),p={normal:{height:40,radius:10},small:{height:32,radius:8},link:{height:34,radius:6},field:{height:60,radius:13},menu:{height:52,radius:14}},l=p[o]||p.normal,c=document.createElement("style");c.textContent=ee.pair.css+`:host{display:block;min-width:0}.button-kit{gap:0}.bk-button{width:100%;min-width:0;font-size:${o==="small"?13:14}px;line-height:1.4;font-weight:500;height:${l.height}px;border-radius:${l.radius}px}.bk-button .bk-label{opacity:1;transition:none}.bk-button--cancel{color:#ededed}.bk-button--cancel .bk-surface{background:#3b3b3b;box-shadow:inset 0 1px #ffffff0d}.bk-button--cancel:hover .bk-surface{background:#484848}.bk-button:disabled{opacity:.45;cursor:default}.bk-button:disabled .bk-surface{transform:none}`+(o==="link"?".bk-button{font-weight:400;color:#c4c4c4}.bk-button .bk-surface,.bk-button:hover .bk-surface{background:transparent;box-shadow:none}.bk-button .bk-label{justify-content:flex-start;padding:0 8px}.bk-button:hover{color:#fafafa}.bk-button:hover .bk-surface{transform:translateX(2px)}":"");let h=document.createElement("div");h.className="button-kit";let i=document.createElement("button");i.type="button",i.className="bk-button bk-button--"+(t?"cancel":"save");let r=document.createElement("span");r.className="bk-surface";let d=document.createElement("span");return d.className="bk-label",d.textContent=e,r.append(d),i.append(r),h.append(i),a.append(c,h),i.addEventListener("click",b),n.button=i,n.label=d,n}function V(e,b,t=""){return R(e,{attributes:e==="textarea-input"?["free-text","compact-field"]:["compact-field"],prepare(o){o.querySelector(".sl-field__label").textContent=b,o.querySelector(".sl-field__helper").textContent="";let n=o.querySelector("input,textarea");n.setAttribute("aria-label",b),t&&n.setAttribute("title",t)}})}var se={accordion(e){e.heading("Frequently asked questions","Useful details before you start.");let b=e.el("div","accordion-list");for(let[t,o]of[["Can I change the colors?","Yes. Surfaces, text and states use variables. Preserve their contrast."],["Does it support the keyboard?","Tab moves focus. Enter and Space expand an answer; Escape closes it."],["Does it work on a phone?","Yes. Controls remain accessible on narrow screens and with reduced motion."]])b.append(R("buttons-details-disclosure-v11",{attributes:["compact","accordion","dark","no-caption"],copy:{"Show details":t,"Hide details":t},prepare(n){n.querySelector("[data-panel] p").textContent=o}}));e.root.append(b)},select(e){e.heading("Project format","Choose an option to update its description below.");let b=e.el("div","wizard-summary");b.append(e.el("h2","","What are you building?"),e.el("p","","You can change this choice at any time."));let t=[["landing","Landing page","One page with an offer and a clear action."],["portfolio","Portfolio","Work, project details and contact information."],["shop","Store","A catalog, product cards and a cart."]];e.root.append(R("status-menu",{prepare(o){o.querySelector("[data-trigger-label]").textContent="Choose a format",o.querySelector("[data-feedback]").textContent="Open the list of options.",o.querySelectorAll("[data-value]").forEach((n,a)=>{let p=t[a%t.length];n.dataset.value=p[0],n.dataset.label=p[1],n.querySelector("strong").textContent=p[1],n.setAttribute("aria-checked","false"),a>=t.length&&n.remove()})},options:{onSelect(o){let n=t.find(a=>a[0]===o[0]);n&&e.swap(b,()=>{b.replaceChildren(e.el("h2","",n[1]),e.el("p","",n[2]))})}}}),b)},multi(e){e.heading("Project topics","Choose several values and see one clear summary.");let b=e.el("div","chip-list"),t=e.live("One topic selected.");function o(n){b.replaceChildren(...n.map(a=>e.el("span","chip",{design:"Design",development:"Development",motion:"Motion"}[a]))),t.textContent=n.length?`Topics selected: ${n.length}.`:"Choose at least one topic."}e.root.append(R("labels-menu",{copy:{Labels:"Project topics",Motion:"Motion",Done:"Done","labels options":"Project topics"},options:{onSelect:o}}),b,t),o(["design"])},files(e){e.heading("Project documents","Choose a built-in sample. No files from your computer are needed.");let b=e.el("ul","file-queue"),t=e.live("The queue is empty."),o=new Map,n,a=R("inputs-attachment-v11",{css:".sl-component{width:100%}.sl-remove-file{font-size:13px;min-height:32px;padding:5px 10px}",options:{demo:!0},copy:{"Attachment input":"Add document"},ready(l){e.on(l,"sl:change",c=>{let h=c.detail.file;h?(n=h.name,o.set(h.name,h)):n&&(o.delete(n),n=null),p()})}});function p(){e.swap(b,()=>{b.replaceChildren();for(let[l,c]of o){let h=e.el("li","file-row"),i=e.el("span","","");i.append(e.el("span","",J(l)),e.el("small","",`${c.size} bytes \xB7 sample`)),h.append(i,Y("Remove",()=>{o.delete(l),a.controller.state.file?.name===l&&a.controller.reset(),p()},!0,"small")),b.append(h)}}),t.textContent=o.size?`Documents queued: ${o.size}. Nothing has been uploaded.`:"The queue is empty."}e.root.append(a,b,t)},wizard(e){e.heading("About your project","Tell us about yourself and the task, then review your details.");let b=e.el("nav","wizard-progress");b.setAttribute("aria-label","Form steps");let t=e.el("div","wizard-body"),o=e.el("div","wizard-actions"),n=e.live(""),a=0,p={name:"",email:"",message:""},l=V("text-input","Your name"),c=V("email-input","Email address"),h=V("textarea-input","About your project"),i=[e.el("div","contact-fields"),e.el("div","stack"),e.el("div","wizard-summary")];i[0].append(l,c),i[1].append(h),i.forEach((k,g)=>{k.hidden=g!==0,t.append(k)});let d=["About you","Task","Review"].map((k,g)=>{let m=e.el("button","",k);return m.type="button",e.on(m,"click",()=>{g<a&&(a=g,f())}),b.append(m),m}),y=Y("Back",()=>{a=Math.max(0,a-1),f()},!0),u=Y("Next",()=>{if(a===0&&(p.name=l.shadowRoot.querySelector("input").value,p.email=c.shadowRoot.querySelector("input").value,!p.name.trim())){n.textContent="Enter a name for this example.",l.shadowRoot.querySelector("input").focus();return}if(a===1&&(p.message=h.shadowRoot.querySelector("textarea").value,!p.message.trim())){n.textContent="Add a few words about the project.",h.shadowRoot.querySelector("textarea").focus();return}if(a===2){n.textContent="Example ready. No data has been sent.",u.button.disabled=!0;return}a++,f()});o.append(y,u);function f(){d.forEach((k,g)=>{k.toggleAttribute("disabled",g>a),g===a?k.setAttribute("aria-current","step"):k.removeAttribute("aria-current")}),e.swap(t,()=>{i.forEach((k,g)=>{k.hidden=g!==a}),a===2&&(i[2].replaceChildren(e.el("h2","","Review the example"),e.el("p","",p.name),e.el("p","",p.email||"No address"),e.el("p","",p.message)),i[2].querySelectorAll("p").forEach(k=>k.dataset.userText=""))}),y.button.disabled=a===0,u.label.textContent=a===2?"Done":"Next",u.button.disabled=!1,n.textContent=""}e.root.append(b,t,o,n),f()},nav(e){let b=e.el("header","nav-top");b.append(e.el("strong","","Studio"),Y("Find",()=>{t.hidden=!t.hidden,t.hidden||t.querySelector("sl-source-data-display-compositions-gallery-v11").shadowRoot.querySelector("input").focus()},!0));let t=e.el("div","nav-search");t.hidden=!0,t.append(R("search-input",{options:{items:["Overview","Materials","Activity"]}})),e.root.append(b,t,R("tabs-navigation",{copy:{"Project sections":"Main navigation"}}))},gallery(e){e.heading("Project collection","Browse projects and save your favorites.");let b=R("carousel-navigation",{css:".collection-slide{position:relative;padding:0 0 16px}.collection-slide .art{height:135px;margin-bottom:16px;position:relative;overflow:hidden;background:#353535}.collection-slide .art:before{content:'';position:absolute;width:90px;height:180px;left:23%;top:-24px;background:#bdbdbd;border-radius:70px;transform:rotate(28deg)}.collection-slide .art[data-art=two]{background:#c4c4c4}.collection-slide .art[data-art=two]:before{background:#262626;left:48%;transform:rotate(-30deg)}.collection-slide .art[data-art=three]{background:#555}.collection-slide .art[data-art=three]:before{background:#e0e0e0;left:40%;transform:rotate(70deg)}.slide-emblem{position:absolute;right:12px;top:12px;margin:0;background:#222c;width:36px;height:36px}.slide-emblem .menu-glyph{width:23px;height:23px}.collection-slide .nav-eyebrow,.collection-slide h3,.collection-slide p{margin-left:20px;margin-right:20px}.collection-slide h3{margin-top:9px;margin-bottom:8px}.collection-slide p{font-size:12px;line-height:1.5;color:#bdbdbd}",prepare(o){o.querySelectorAll(".collection-slide").forEach((n,a)=>{let p=e.el("div","art");p.dataset.art=["one","two","three"][a],n.prepend(p)})}}),t=e.live("The project is not saved yet.");e.root.append(b,R("bookmark",{attributes:["small-action"],options:{},ready(o){e.on(o.sourceRoot,"bookmarkchange",n=>{t.textContent=n.detail.pressed?"Project saved in this example.":"Save undone."})}}),t)},reorder(e){e.heading("Section order","Move sections up; the other rows smoothly make room.");let b=e.el("ol","reorder-list"),t=["About","Work","Contact"],o=e.live("Changes apply only to this example."),n=t.map(p=>{let l=e.el("li","reorder-row");return l.append(e.el("strong","",p),Y("Move up",()=>{let c=l.previousElementSibling;if(!c)return;let h=new Map([...b.children].map(i=>[i,i.getBoundingClientRect().top]));b.insertBefore(l,c);for(let i of b.children)e.move(i,h.get(i)-i.getBoundingClientRect().top);a(),o.textContent=`\xAB${p}\xBB moved up.`},!0,"small")),l});b.append(...n);function a(){[...b.children].forEach((p,l)=>p.querySelector(".source-action").button.disabled=l===0)}e.root.append(b,o),a()},comments(e){e.heading("Discussion","Share a thought or ask a question.");let b=e.el("div","comments-list"),t=V("textarea-input","Your comment"),o=e.live(""),n=e.el("div","reply-target");n.hidden=!0;let a=e.el("span"),p=null;function l(i){p=i,n.hidden=!i,a.textContent=i?`Reply to: ${i.name}`:"",t.shadowRoot.querySelector("textarea").focus({preventScroll:!0})}n.append(a,Y("Cancel",()=>l(null),!0,"small"));function c(i,r,d=!1,y=null){let u=e.el("article","comment"+(d?" is-new":"")+(y?" is-reply":"")),f=e.el("header","");f.append(e.el("strong","",i),e.el("span","","just now"));let k=e.el("p","",r);k.dataset.userText="";let g=e.el("div","comment-replies"),m=Y("Reply",()=>l({name:i,row:u,replies:g}),!0,"small");u.append(f,k,m,g),(y?.replies||b).append(u),d&&e.appear(u)}c("Maria","I like the calm states and clear feedback.");let h=e.el("div","comment-entry");h.append(n,t,Y("Add",()=>{let i=t.shadowRoot.querySelector("textarea");if(!i.value.trim()){o.textContent="Write a comment.",i.focus();return}c("You",i.value,!0,p),i.value="",i.dispatchEvent(new Event("input",{bubbles:!0})),l(null),o.textContent="Added to the local example."})),e.root.append(b,h,o)},cookies(e){e.heading("Privacy preferences","Choose which optional features to allow.");let b=e.el("div","settings-list"),t=R("glide-toggle",{copy:{Notifications:"Analytics"}}),o=R("privacy-toggle",{copy:{"Private profile":"Personalization",Private:"On",Public:"Off"}});b.append(t,o);let n=e.el("div","settings-actions"),a=e.live("Essential features are always enabled.");n.append(Y("Reject optional",()=>{for(let p of[t,o])p.controller.setChecked(!1);a.textContent="Optional categories are off in this example."},!0),Y("Save",()=>{a.textContent="Choice saved only in this preview."})),e.root.append(b,n,a)}};var $=[["Typography","Guide","design"],["Components","Section","code"],["Composition","Collection","design"],["Process","Notes","notes"]],re={search(e){e.heading("Search the library","Find material by name or choose a suggestion.");let b=e.el("div","search-results"),t=e.live("");function o(a=""){let p=$.filter(([l])=>!a||l.toLocaleLowerCase("en").includes(a.toLocaleLowerCase("en")));e.swap(b,()=>{b.replaceChildren(...p.map(([l,c])=>{let h=e.el("article","");return h.append(e.el("strong","",l),e.el("p","",c)),h}))});for(let l of b.children)e.enter(l);t.textContent=p.length?`Materials: ${p.length}.`:"No matches for this search."}let n=R("search-input",{options:{items:$.map(a=>a[0])},ready(a){e.on(a.sourceRoot,"searchselect",p=>o(p.detail.value)),e.on(a.shadowRoot.querySelector("input"),"input",p=>o(p.target.value)),e.on(a.shadowRoot.querySelector(".sl-field__clear"),"click",()=>o())}});e.root.append(n,b,t),o()},tabs(e){e.heading("Workspace","Overview, documents and recent changes in one place."),e.root.append(R("tabs-navigation"),R("glide-toggle",{copy:{Notifications:"Project notifications"}}))},filters(e){e.heading("Project materials","Choose categories or find material by name.");let b=e.el("div","filter-tools"),t=e.el("div","filtered-grid"),o=e.live(""),n=["design"],a="",p=$.map(([i,r],d)=>{let y=e.el("article","work-card"),u=e.el("div","art");u.dataset.art=["one","two","three","one"][d];let f=e.el("p","",i);return f.append(e.el("small","",r)),y.append(u,f),t.append(y),y});function l(){let i=new Map(p.filter(r=>!r.hidden).map(r=>[r,r.getBoundingClientRect()]));p.forEach((r,d)=>r.hidden=!!(n.length&&!n.includes($[d][2])||a&&!$[d][0].toLocaleLowerCase("en").includes(a.toLocaleLowerCase("en"))));for(let r of p){if(r.hidden)continue;let d=i.get(r);d?e.move(r,d.top-r.getBoundingClientRect().top,d.left-r.getBoundingClientRect().left):e.enter(r)}o.textContent=`Showing: ${p.filter(r=>!r.hidden).length} of ${p.length}.`}let c=R("labels-menu",{copy:{Labels:"Categories",Design:"Design",Development:"Code",Motion:"Notes"},prepare(i){let r=[...i.querySelectorAll("[data-value]")];r[1].dataset.value="code",r[2].dataset.value="notes"},options:{onSelect(i){n=i,l()}}});b.append(c,Y("All materials",()=>{c.shadowRoot.querySelectorAll('[data-value][aria-checked="true"]').forEach(i=>i.click()),c.controller.close(),n=[],a="",h.controller.reset(),l()},!0,"menu"));let h=R("search-input",{options:{items:$.map(i=>i[0])},ready(i){e.on(i.shadowRoot.querySelector("input"),"input",r=>{a=r.target.value,l()}),e.on(i.sourceRoot,"searchselect",r=>{a=r.detail.value,l()})}});e.root.append(b,h,t,o),l()},"featured-card"(e){let b=e.el("article","material-card"),t=e.el("div","art");t.dataset.art="two";let o=e.el("div","material-copy");o.append(e.el("h2","","Quiet forms"),e.el("p","","How simple typography and precise states create a coherent interface."));let n=e.live("6 min read");o.append(R("bookmark",{attributes:["small-action"],ready(a){e.on(a.sourceRoot,"bookmarkchange",p=>{n.textContent=p.detail.pressed?"Added to favorites.":"6 min read"})}}),n),b.append(t,o),e.root.append(b)},contact(e){e.heading("Tell us about your task","A few details help us understand where to start.");let b=e.el("div","contact-fields"),t=V("text-input","Your name"),o=V("email-input","Email address"),n=V("textarea-input","Message");b.append(t,o,n);let a=e.live(""),p=e.el("div","contact-actions");p.append(Y("Clear",()=>{[t,o,n].forEach(l=>l.controller.reset()),a.textContent=""},!0),Y("Check example",()=>{let l=t.shadowRoot.querySelector("input"),c=n.shadowRoot.querySelector("textarea");if(!l.value.trim()||!c.value.trim()){a.textContent="Add a name and message.",(l.value.trim()?c:l).focus();return}a.textContent="Message shown in the example. Nothing was sent to a server.",e.motion(a)})),e.root.append(b,p,a)},newsletter(e){let b=e.el("div","newsletter");e.heading("Occasional inspiration","A small collection of ideas for your next page.",b);let t=e.el("div","row"),o=V("email-input","Your email address"),n=e.live("Local subscription demonstration.");t.append(o,Y("Subscribe",()=>{let a=o.shadowRoot.querySelector("input");if(!a.value.trim()){n.textContent="Enter an email address for this example.",a.focus();return}n.textContent="Address accepted in the example. No subscription was created.",e.motion(n)},!1,"field")),b.append(t,n),e.root.append(b)},cta(e){let b=e.el("section","cta");b.append(e.el("h2","","Build your next page."),e.el("p","","Start with the details you need. Fields, buttons and navigation share one language."));let t=e.el("div","cta-selection");t.hidden=!0;function o(n){t.hidden=!1,e.swap(t,()=>{if(t.replaceChildren(),n==="Forms"){t.append(e.el("h3","","Contact form"),V("text-input","Your name"),V("textarea-input","Your task"));let a=e.live("");t.append(Y("Check example",()=>{a.textContent="This is an example form. No data is sent."},!1,"small"),a)}else if(n==="Navigation")t.append(e.el("h3","","Project navigation"),R("tabs-navigation"));else{let a=e.el("article","work-card");a.append(e.el("p","","Material for your page"));let p=e.live("Choose what to save.");t.append(e.el("h3","","Material card"),a,R("bookmark",{attributes:["small-action"],ready(l){e.on(l.sourceRoot,"bookmarkchange",c=>p.textContent=c.detail.pressed?"Saved in this example.":"Save undone.")}}),p)}})}b.append(R("buttons-details-disclosure-v11",{attributes:["compact","dark","no-caption","small-disclosure","direction-picker"],css:".direction-list{display:flex;flex-wrap:wrap;gap:8px}.direction-list .source-action{min-width:80px}",copy:{"Show details":"Choose a direction","Hide details":"Hide directions"},prepare(n){let a=n.querySelector("[data-panel]>div"),p=e.el("div","direction-list");p.append(...["Forms","Navigation","Cards"].map(l=>Y(l,()=>o(l),!0,"small"))),a.replaceChildren(e.el("p","","Choose a direction and try its elements."),p)}}),t),e.root.append(b)},features(e){e.heading("Choose features","Build the feature set your project needs.");let b=e.el("div","feature-detail"),t=e.live(""),o=e.el("div","art");b.append(o,e.el("h2","","Your set"),e.el("p","","Choose features above."));let n=R("feature-list-checkbox",{ready(a){e.on(a.shadowRoot,"change",()=>{let l=[...a.shadowRoot.querySelectorAll("input:checked")].map(c=>c.closest("label").querySelector(".sl-check__title").textContent);b.querySelector("p").textContent=l.length?l.join(" \xB7 "):"Choose features above.",t.textContent=`Features selected: ${l.length}.`,o.dataset.art=["one","two","three"][l.length%3],e.motion(b)})}});e.root.append(n,b,t)},announcement(e){let b=e.el("div","announcement-wrap"),t=e.el("div","announcement-inner"),o=e.el("div","announcement"),n=e.el("div","");n.append(e.el("strong","","New library materials"),e.el("p","","A fresh collection is ready to explore."));let a=e.live("You can dismiss and restore the announcement."),p=Y("Restore announcement",()=>{b.classList.remove("is-closed"),b.inert=!1,p.hidden=!0,a.textContent="Announcement restored."});p.hidden=!0,o.append(n,Y("Hide",()=>{b.classList.add("is-closed"),b.inert=!0,p.hidden=!1,p.button.focus(),a.textContent="Announcement dismissed in this example."},!0)),t.append(o),b.append(t);let l=e.el("section","mock-page"),c=e.el("div","restore-slot");c.append(p),l.append(e.el("h2","","Your page"),e.el("p","","The compact announcement takes only the space it needs."),c,a),e.root.append(b,l)},footer(e){let b=e.el("footer","footer");b.append(e.el("p","footer-brand","Studio"),e.el("p","footer-description","Details for clear, usable interfaces."));let t=e.el("div","footer-groups"),o=e.live("Choose a section.");for(let[n,a]of[["Library",["Components","Fonts","Icons"]],["About",["Contact","Updates","Terms"]]])t.append(R("buttons-details-disclosure-v11",{attributes:["compact","dark","no-caption","small-disclosure","link-group"],copy:{"Show details":n,"Hide details":n},prepare(p){let l=p.querySelector("[data-panel]>div");l.setAttribute("role","navigation"),l.setAttribute("aria-label",n),l.replaceChildren(...a.map(c=>{let h=Y(c,()=>{o.textContent=`Selected: ${c}. This is a local navigation example.`},!0,"link");return h.classList.add("footer-link"),h}))}}));b.append(t,o,e.el("div","footer-bottom","\xA9 2026 \xB7 Local example")),e.root.append(b)}};var U=Object.freeze({duration:Object.freeze({content:200,layout:300}),easing:"cubic-bezier(.22,1,.36,1)"});function le(e,b){let t=new AbortController,o=new Set,n=new WeakMap,a=new WeakMap,p=(d,y="",u)=>{let f=document.createElement(d);return f.className=y,u!==void 0&&(f.textContent=u),f},l=()=>matchMedia("(prefers-reduced-motion: reduce)").matches,c=(d,y,u=U.duration.layout)=>{if(n.get(d)?.cancel(),l()||!d.isConnected)return;let f=d.animate(y,{duration:u,easing:U.easing});n.set(d,f),o.add(f);let k=()=>{o.delete(f),n.get(d)===f&&n.delete(d)};return f.finished.then(k,k),f},h={root:e,el:p,on:(d,y,u)=>d.addEventListener(y,u,{signal:t.signal}),heading(d,y,u=e){let f=p("header","heading");f.append(p("h1","",d),p("p","",y)),u.append(f)},live(d){let y=p("p","status",d);return y.setAttribute("role","status"),y.setAttribute("aria-live","polite"),y},motion(d){let y=getComputedStyle(d).opacity;c(d,[{opacity:Math.min(Number(y),.8)},{opacity:1}],U.duration.content)},enter(d){let y=n.has(d)?getComputedStyle(d).opacity:0;c(d,[{opacity:y},{opacity:1}],U.duration.content)},appear(d){let y=getComputedStyle(d),u=d.getBoundingClientRect().height,f=d.style.overflow;d.style.overflow="hidden";let k=c(d,[{height:"0px",paddingTop:"0px",paddingBottom:"0px",opacity:0},{height:u+"px",paddingTop:y.paddingTop,paddingBottom:y.paddingBottom,opacity:1}]),g=()=>{d.isConnected&&(d.style.overflow=f)};k?k.finished.then(g,g):g()},move(d,y,u=0){let f=getComputedStyle(d).transform;if(f!=="none"){let k=new DOMMatrixReadOnly(f);u+=k.m41,y+=k.m42}Math.abs(u)+Math.abs(y)>1&&c(d,[{transform:`translate(${u}px,${y}px)`},{transform:"translate(0,0)"}])},swap(d,y){let u=d.getBoundingClientRect().height,f=getComputedStyle(d).opacity;n.get(d)?.cancel(),y();let k=d.getBoundingClientRect().height;if(d.isConnected){let g=Math.abs(u-k)>.5?[{height:u+"px",opacity:Math.min(Number(f),.88)},{height:k+"px",opacity:1}]:[{opacity:Math.min(Number(f),.88)},{opacity:1}];c(d,g,Math.abs(u-k)>.5?U.duration.layout:U.duration.content)}}},i={...se,...re}[b];if(!i)throw new Error("Unknown reviewed composition");i(h);let r=matchMedia("(prefers-reduced-motion:reduce)");return r.addEventListener("change",()=>{if(r.matches)for(let d of o)d.cancel()},{signal:t.signal}),{destroy(){t.abort();for(let d of o)d.cancel();o.clear()},get state(){return{key:b,local:!0}}}}var G=new WeakMap;function ce(e){G.get(e)?.destroy();let b,t=!1;e.classList.add("sl-component"),e.dataset.kind="data-display-compositions-gallery-v11";function o(){b?.destroy();let a=document.createElement("section");a.className="composition",a.dataset.component="gallery",e.replaceChildren(a),b=le(a,"gallery")}o();let n={reset(){t||o()},destroy(){t||(t=!0,b.destroy(),G.get(e)===n&&(e.replaceChildren(),G.delete(e)))},get state(){return b.state}};return G.set(e,n),n}function je(e){return ce(e)}function Be(e){return ce(e)}window.SLComponent={mount:je,mountPreview:Be};})();
