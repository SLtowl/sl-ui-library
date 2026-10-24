(()=>{var J=`
.bk-button.bk-button{height:auto;min-height:48px;font:600 16px/22px 'Segoe UI',sans-serif;letter-spacing:0;max-width:100%;min-width:0}
.bk-surface.bk-surface{min-height:48px;padding:12px 16px;display:flex;align-items:center;justify-content:center;box-sizing:border-box}
.bk-label.bk-label{font:inherit;line-height:22px;white-space:normal;overflow-wrap:anywhere;text-align:center;min-width:0}
.bk-button.bk-button.bk-button--small{min-height:44px;font-size:15px;line-height:20px}
.bk-button--small .bk-surface.bk-surface{min-height:44px;padding:10px 12px}
.bk-button--small .bk-label.bk-label{font-size:15px;line-height:20px}
.bk-button--quiet .bk-surface.bk-surface{padding-inline:12px}
.bk-button.bk-button:disabled{opacity:.58}
`;var ie=`/* Matte buttons. Scoped styles and editable color and motion tokens. */

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

`,ae=(()=>{let e={"short-2":100,"short-4":200,"medium-3":350,"medium-4":400,"long-4":600},m={linear:"cubic-bezier(0,0,1,1)","ease-in-out-gentle":"cubic-bezier(0.4,0,0.2,1)"},n=new WeakMap;function t(i,{onSave:l,onCancel:u=()=>{},previewDuration:d=0,confirmationMs:A=1400}={}){if(n.has(i))return n.get(i);let f=i.querySelector('[data-action="save"]'),v=i.querySelector('[data-action="cancel"]'),g=f?.querySelector(".bk-progress"),p=v?.querySelector(".bk-wash"),r=i.querySelector("[data-feedback]");if(f&&typeof l!="function")throw new TypeError("Pass your async onSave function.");let o=matchMedia("(prefers-reduced-motion: reduce)"),y=new AbortController,C=new Map,h=new Set,a,s,b,S,w,x=!1;function _(c,q,z){c&&(c===f&&c.dataset.state!==q&&(c.dataset.transition=c.dataset.state==="saved"&&q==="idle"?"return":"default"),c.dataset.state=q,c.setAttribute("aria-label",z))}function k(c){r&&(r.textContent=c)}function T(){f?.setAttribute("aria-disabled","false"),f?.setAttribute("aria-busy","false")}function E(c=!1){if(!g)return;let q=c&&!o.matches&&S?getComputedStyle(g):null,z=q?.transform||"none",R=q?Number(q.opacity):0,N=z==="none"?0:new DOMMatrixReadOnly(z).a;if(c&&!o.matches&&N>.001&&R>0){let P=g.cloneNode(!1);P.classList.add("bk-retiring"),P.style.transform=z,P.style.opacity=String(R),g.before(P);let I=P.animate([{opacity:R},{opacity:0}],{duration:f.dataset.transition==="return"?e["long-4"]:e["medium-4"],easing:m["ease-in-out-gentle"],fill:"forwards"});C.set(P,I),I.onfinish=()=>{P.remove(),C.delete(P),I.cancel()}}if(S?.cancel(),S=null,!c||o.matches){for(let[P,I]of C)I.cancel(),P.remove();C.clear()}}async function L(){if(x||f.disabled||f.getAttribute("aria-disabled")==="true")return;clearTimeout(s),clearTimeout(b),w?.cancel(),_(v,"idle","Cancel"),E(!0);let c=new AbortController;if(a=c,_(f,"saving","Saving changes"),f.setAttribute("aria-disabled","true"),f.setAttribute("aria-busy","true"),k("Saving changes."),!o.matches&&d>e["short-4"]){let q=e["short-4"]/d;S=g.animate([{transform:"scaleX(0)",opacity:0},{transform:`scaleX(${q})`,opacity:1,offset:q},{transform:"scaleX(1)",opacity:1}],{duration:d,easing:m.linear,fill:"forwards"})}try{if(await l({signal:c.signal}),a!==c||c.signal.aborted)return;a=null,!S&&!o.matches&&(S=g.animate([{transform:"scaleX(1)",opacity:0},{transform:"scaleX(1)",opacity:1}],{duration:e["medium-3"],easing:m["ease-in-out-gentle"],fill:"forwards"})),_(f,"saved","Changes saved"),f.setAttribute("aria-busy","false"),k("Changes saved."),s=setTimeout(()=>{_(f,"idle","Save changes"),T(),E(!0)},A)}catch(q){if(a!==c)return;a=null,_(f,"idle","Save changes"),T(),E(!0),k(q?.name==="AbortError"?"Saving cancelled.":"Could not save. Please try again.")}}function D(){if(x||v.disabled||v.getAttribute("aria-disabled")==="true")return;let c=!!a;if(a?.abort(),a=null,clearTimeout(s),clearTimeout(b),_(f,"idle","Save changes"),T(),E(!0),_(v,"cancelled","Cancelled"),w?.cancel(),p&&!o.matches){w=p.animate([{opacity:0},{opacity:.35,offset:.5},{opacity:0}],{duration:e["medium-4"],easing:m["ease-in-out-gentle"]});let q=w;q.onfinish=()=>{w===q&&(w=null),q.cancel()}}k(c?"Saving cancelled.":"Cancelled."),b=setTimeout(()=>_(v,"idle","Cancel"),A),u({wasSaving:c})}f?.addEventListener("click",L,{signal:y.signal}),v?.addEventListener("click",D,{signal:y.signal});for(let c of[f,v].filter(Boolean))c.disabled=!1,c.addEventListener("keydown",q=>{if(q.key!=="Enter"||q.repeat||c.getAttribute("aria-disabled")==="true")return;c.classList.add("is-pressed");let z=setTimeout(()=>{c.classList.remove("is-pressed"),h.delete(z)},e["short-2"]);h.add(z)},{signal:y.signal}),c.addEventListener("blur",()=>c.classList.remove("is-pressed"),{signal:y.signal});o.addEventListener("change",()=>{o.matches&&(E(),w?.cancel())},{signal:y.signal});let M={destroy(){if(!x){x=!0,y.abort(),a?.abort(),a=null,clearTimeout(s),clearTimeout(b),h.forEach(clearTimeout),h.clear(),E(),w?.cancel();for(let c of[f,v].filter(Boolean))c.classList.remove("is-pressed"),c.disabled=!0;n.delete(i)}}};return n.set(i,M),M}return{mount:t}})(),B=`
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
`,se=(()=>{let e=new WeakMap,m=0;function n(i,l,u=()=>({})){if(e.has(i))return e.get(i);let d=i?.querySelector("input, textarea"),A=d?.tagName==="TEXTAREA"?"textarea":d?.type;if(!d||A!==l)throw new TypeError(`A native ${l} control is required.`);let f=i.ownerDocument,v=f.defaultView,g=new v.AbortController,p=[],r=[],o=!1,y=(a,s,b,S={})=>a.addEventListener(s,b,{...S,signal:g.signal}),C=u({root:i,input:d,doc:f,view:v,on:y,resets:p,cleanups:r,alive:()=>!o});d.form&&y(d.form,"reset",a=>queueMicrotask(()=>{!o&&!a.defaultPrevented&&p.forEach(s=>s())}));let h={reset(){o||(d.value=d.defaultValue,p.forEach(a=>a()))},destroy(){o||(o=!0,g.abort(),r.forEach(a=>a()),e.delete(i))}};return Object.defineProperties(h,Object.getOwnPropertyDescriptors(C)),e.set(i,h),h}function t(i){return n(i,"text")}return{mount:t}})(),oe=(()=>{let e=new WeakMap,m=0;function n(i,l,u=()=>({})){if(e.has(i))return e.get(i);let d=i?.querySelector("input, textarea"),A=d?.tagName==="TEXTAREA"?"textarea":d?.type;if(!d||A!==l)throw new TypeError(`A native ${l} control is required.`);let f=i.ownerDocument,v=f.defaultView,g=new v.AbortController,p=[],r=[],o=!1,y=(a,s,b,S={})=>a.addEventListener(s,b,{...S,signal:g.signal}),C=u({root:i,input:d,doc:f,view:v,on:y,resets:p,cleanups:r,alive:()=>!o});d.form&&y(d.form,"reset",a=>queueMicrotask(()=>{!o&&!a.defaultPrevented&&p.forEach(s=>s())}));let h={reset(){o||(d.value=d.defaultValue,p.forEach(a=>a()))},destroy(){o||(o=!0,g.abort(),r.forEach(a=>a()),e.delete(i))}};return Object.defineProperties(h,Object.getOwnPropertyDescriptors(C)),e.set(i,h),h}function t(i){return n(i,"textarea",({input:l,root:u,view:d,on:A,resets:f,cleanups:v})=>{let g=u.querySelector(".sl-field__control"),p=u.querySelector("[data-count]"),r=u.querySelector(".sl-field__helper");if(!g||!p||!r)throw new TypeError("Textarea needs a control, counter and helper.");let o=r.textContent,y=l.maxLength>0?l.maxLength:null;function C(){l.style.height="0px";let a=l.scrollHeight,s=l.value?Math.max(60,Math.min(180,a)):60;l.style.height="100%",l.style.overflowY=a>180?"auto":"hidden",g.style.height=`${s}px`}function h(){let a=[...l.value].length;p.textContent=String(a),r.textContent=y&&a>=y?`Character limit reached: ${y}.`:o,C()}return A(l,"input",a=>{a.isComposing||h()}),A(l,"compositionend",()=>h()),A(d,"resize",C),f.push(h),v.push(()=>{g.style.removeProperty("height"),l.style.removeProperty("height"),l.style.removeProperty("overflow-y")}),h(),{get length(){return[...l.value].length}}})}return{mount:t}})(),re=(()=>{let e=new WeakMap,m=0;function n(i,l,u=()=>({})){if(e.has(i))return e.get(i);let d=i?.querySelector("input, textarea"),A=d?.tagName==="TEXTAREA"?"textarea":d?.type;if(!d||A!==l)throw new TypeError(`A native ${l} control is required.`);let f=i.ownerDocument,v=f.defaultView,g=new v.AbortController,p=[],r=[],o=!1,y=(a,s,b,S={})=>a.addEventListener(s,b,{...S,signal:g.signal}),C=u({root:i,input:d,doc:f,view:v,on:y,resets:p,cleanups:r,alive:()=>!o});d.form&&y(d.form,"reset",a=>queueMicrotask(()=>{!o&&!a.defaultPrevented&&p.forEach(s=>s())}));let h={reset(){o||(d.value=d.defaultValue,p.forEach(a=>a()))},destroy(){o||(o=!0,g.abort(),r.forEach(a=>a()),e.delete(i))}};return Object.defineProperties(h,Object.getOwnPropertyDescriptors(C)),e.set(i,h),h}function t(i){return n(i,"password",({root:l,input:u,doc:d,on:A,resets:f,cleanups:v,alive:g})=>{let p=l.querySelector(".sl-field__reveal");if(!p)throw new TypeError("Password needs its reveal button.");let r=!1;function o(y){if(!g())return;let C=d.activeElement===u||l.getRootNode().activeElement===u,h=u.selectionStart,a=u.selectionEnd,s=u.selectionDirection,b=u.scrollLeft;r=!!y,u.type=r?"text":"password",l.dataset.visible=String(r),p.setAttribute("aria-pressed",String(r)),p.setAttribute("aria-label",r?"Hide password":"Show password"),C&&u.focus({preventScroll:!0}),h!==null&&a!==null&&u.setSelectionRange(h,a,s),u.scrollLeft=b}return A(p,"pointerdown",y=>{y.button===0&&(d.activeElement===u||l.getRootNode().activeElement===u)&&y.preventDefault()}),A(p,"click",()=>{u.disabled||o(!r)}),p.disabled=u.disabled,f.push(()=>o(!1)),v.push(()=>{r=!1,u.type="password",l.dataset.visible="false",p.setAttribute("aria-pressed","false"),p.setAttribute("aria-label","Show password"),p.disabled=!0}),{setVisible:o,get isVisible(){return r}}})}return{mount:t}})(),le=B.replace(/^\.sl-field\.sl-field--code \{ width: min\(300px, 100%\); \}\n/m,""),de=(()=>{let e=new WeakMap,m=0;function n(i,l,u=()=>({})){if(e.has(i))return e.get(i);let d=i?.querySelector("input, textarea"),A=d?.tagName==="TEXTAREA"?"textarea":d?.type;if(!d||A!==l)throw new TypeError(`A native ${l} control is required.`);let f=i.ownerDocument,v=f.defaultView,g=new v.AbortController,p=[],r=[],o=!1,y=(a,s,b,S={})=>a.addEventListener(s,b,{...S,signal:g.signal}),C=u({root:i,input:d,doc:f,view:v,on:y,resets:p,cleanups:r,alive:()=>!o});d.form&&y(d.form,"reset",a=>queueMicrotask(()=>{!o&&!a.defaultPrevented&&p.forEach(s=>s())}));let h={reset(){o||(d.value=d.defaultValue,p.forEach(a=>a()))},destroy(){o||(o=!0,g.abort(),r.forEach(a=>a()),e.delete(i))}};return Object.defineProperties(h,Object.getOwnPropertyDescriptors(C)),e.set(i,h),h}function t(i,{expectedCode:l="482731"}={}){if(!/^\d{6}$/.test(l))throw new TypeError("Expected code must contain exactly six digits.");return n(i,"text",({root:u,input:d,view:A,on:f,resets:v,cleanups:g})=>{let p=u.querySelector(".sl-code__cells"),r=u.querySelector(".sl-code__control"),o=[...u.querySelectorAll(".sl-code__cells span")],y=u.querySelector(".sl-field__helper");if(!p||!r||o.length!==6||!y)throw new TypeError("Verification code needs six cells and a helper.");let C=y.textContent,h=A.matchMedia("(prefers-reduced-motion: reduce)"),a=new Map,s=new Set,b=null,S=0,w="";function x(){a.forEach(D=>D.cancel()),a.clear()}function _(){s.forEach(D=>D.cancel()),s.clear(),b?.cancel(),b=null}function k(){x(),_()}function T(D){a.get(D)?.cancel();let M=D.animate([{transform:"translateY(3px) scale(.9)",opacity:.55},{transform:"translateY(0) scale(1)",opacity:1}],{duration:300,easing:"cubic-bezier(.2,.7,.25,1)"});a.set(D,M),M.onfinish=()=>{a.get(D)===M&&(M.cancel(),a.delete(D))}}function E(D){if(k(),u.dataset.result=D?"success":"error",h.matches)return;let M=D?{color:"#eaf8ef",borderColor:"#4f8d72",backgroundColor:"#234b3a",boxShadow:"inset 0 1px rgba(255,255,255,.09), 0 0 0 2px rgba(79,141,114,.09)",transform:"translateY(-2px)"}:{color:"#fff0f0",borderColor:"#a85e63",backgroundColor:"#543134",boxShadow:"inset 0 1px rgba(255,255,255,.07), 0 0 0 2px rgba(168,94,99,.08)",transform:"translateY(1px)"};o.forEach((c,q)=>{let z=c.animate([{color:"#f9f9f9",borderColor:"rgba(0,0,0,0)",backgroundColor:"#222222",boxShadow:"inset 0 1px rgba(255,255,255,.07), 0 1px 2px rgba(0,0,0,.05)",transform:"translateY(0)"},M],{duration:360,delay:q*95,easing:"cubic-bezier(.4,0,.2,1)",fill:"both"});s.add(z),q===o.length-1&&(z.onfinish=()=>{if(!s.has(z))return;s.forEach(N=>N.cancel()),s.clear(),b=p.animate([{transform:"scale(1)"},{transform:"scale(1.018)",offset:.45},{transform:"scale(1)"}],{duration:340,easing:"cubic-bezier(.2,.7,.25,1)"});let R=b;R.onfinish=()=>{b===R&&(R.cancel(),b=null)}})})}function L(D=!0){let M=d.value.replace(/\D/g,"").slice(0,o.length);d.value!==M&&(d.value=M);let c=d.matches(":focus");o.forEach((R,N)=>{R.textContent=M[N]||"",R.classList.toggle("is-filled",N<M.length),R.classList.toggle("is-active",c&&N===Math.min(M.length,o.length-1)&&M.length<o.length)}),u.dataset.length=String(M.length),u.dataset.complete=String(M.length===o.length);let q=M.length===o.length,z=q&&M===l;q?M!==w&&(D?E(z):(k(),u.dataset.result=z?"success":"error")):(u.dataset.result!=="neutral"&&k(),u.dataset.result="neutral"),d.setCustomValidity(q&&!z?"Code does not match.":""),q?d.setAttribute("aria-invalid",String(!z)):d.removeAttribute("aria-invalid"),y.textContent=M.length===0?C:q?z?"Code accepted.":`Code does not match. Try ${l}.`:`${M.length} of ${o.length} digits entered.`,D&&!q&&M.length>S&&!h.matches&&T(o[M.length-1]),q&&M!==w&&d.dispatchEvent(new A.CustomEvent("codecomplete",{bubbles:!0,composed:!0,detail:{code:M,valid:z}})),w=M,S=M.length}return f(d,"input",D=>{D.isComposing||L()}),f(d,"compositionend",()=>L()),f(d,"focus",()=>L(!1)),f(d,"blur",()=>L(!1)),f(h,"change",()=>{h.matches&&k()}),v.push(()=>{k(),S=0,w="",L(!1)}),g.push(k),L(!1),{validate:()=>(L(!1),d.value===l),get code(){return d.value},get complete(){return d.value.length===o.length}}})}return{mount:t}})(),X={pair:{markup:`<div class="button-kit">
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
  </div>`,css:ie,mount:ae.mount},"text-input":{markup:`<div class="sl-field" id="text-field">
            <div class="sl-field__control"><input class="sl-field__input" id="demo-text" type="text" placeholder=" " autocomplete="off" aria-describedby="text-help"><label class="sl-field__label" for="demo-text">Project name</label></div>
            <p class="sl-field__helper" id="text-help">Try a name for your next project.</p>
          </div>`,css:B,mount:se.mount},"textarea-input":{markup:`<div class="sl-field sl-field--textarea" id="textarea-field">
            <div class="sl-field__control">
              <textarea class="sl-field__input" id="demo-textarea" placeholder=" " maxlength="180" rows="1" aria-describedby="textarea-help"></textarea>
              <label class="sl-field__label" for="demo-textarea">Project notes</label>
              <span class="sl-field__counter" aria-hidden="true"><span data-count>0</span><span>/180</span></span>
            </div>
            <p class="sl-field__helper" id="textarea-help" role="status" aria-live="polite">Add a short note for your team.</p>
          </div>`,css:B,mount:oe.mount},"password-input":{markup:`<div class="sl-field sl-field--password" id="password-field" data-visible="false">
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
          </div>`,css:B,mount:re.mount},"code-input":{markup:`<div class="sl-field sl-field--code" id="code-field" data-length="0" data-complete="false" data-result="neutral">
            <label class="sl-code__label" for="demo-code">Verification code</label>
            <div class="sl-code__control">
              <input class="sl-code__input" id="demo-code" type="text" inputmode="numeric" autocomplete="one-time-code" data-code-length="6" pattern="[0-9]{6}" aria-describedby="code-help">
              <div class="sl-code__cells" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span><span></span></div>
            </div>
            <p class="sl-field__helper" id="code-help" role="status" aria-live="polite">Enter 482731 to see the accepted state.</p>
          </div>`,css:le,mount:de.mount}};var Y={duration:{short2:{$type:"duration",$value:"100ms"},short4:{$type:"duration",$value:"200ms"},medium2:{$type:"duration",$value:"300ms"}},easing:{settle:{$type:"cubicBezier",$value:[.22,1,.36,1]}}};var W=new WeakMap;function O(e,m="",n=""){let t=document.createElement(e);return t.className=m,t.textContent=n,t}function Z(e){let m={user:"M16 7A4 4 0 1 1 8 7A4 4 0 1 1 16 7M4 21V19A8 8 0 0 1 20 19V21",shield:"M12 3L20 6V12C20 17 16 20 12 22C8 20 4 17 4 12V6ZM9 12L12 15L16 10",laptop:"M4 4H20V16H4ZM2 20H22M9 16L8 20M15 16L16 20",phone:"M7 2H17V22H7ZM11 18H13",key:"M13 8A5 5 0 1 1 3 8A5 5 0 1 1 13 8M13 8H22M18 8V12M21 8V11",link:"M9 15L15 9M8 12L6 14A4 4 0 0 0 12 20L15 17M16 12L18 10A4 4 0 0 0 12 4L9 7",mail:"M3 5H21V19H3ZM3 5L12 13L21 5",pin:"M19 10C19 15 12 22 12 22S5 15 5 10A7 7 0 1 1 19 10ZM15 10A3 3 0 1 1 9 10A3 3 0 1 1 15 10",right:"M5 12H19M14 7L19 12L14 17",close:"M6 6L18 18M18 6L6 18",plus:"M5 12H19M12 5V19",edit:"M4 20L5 15L17 3L21 7L9 19ZM14 6L18 10",eye:"M2 12Q12 1 22 12Q12 23 2 12ZM15 12A3 3 0 1 1 9 12A3 3 0 1 1 15 12",undo:"M5 10H14A5 5 0 0 1 14 20M5 10L10 5M5 10L10 15"},n=document.createElementNS("http://www.w3.org/2000/svg","svg");n.setAttribute("viewBox","0 0 24 24"),n.setAttribute("aria-hidden","true");let t=document.createElementNS(n.namespaceURI,"path");return t.setAttribute("d",m[e]||m.user),n.append(t),n}function G(e,{key:m,renderers:n,...t}){if(!n[m])throw new TypeError("Unknown account workflow");W.get(e)?.destroy();let i,l=[],u=null,d=()=>({}),A=!1,f=matchMedia("(prefers-reduced-motion:reduce)"),v=()=>{let s=e.getRootNode().activeElement;return s===e||e.contains(s)},g=!1,p=!0;function r(s,b){s?.isConnected&&(!g||p&&v())&&s.focus(b)}function o(s){s.parked&&requestAnimationFrame(()=>{let b=s.button;!A&&!u&&e.isConnected&&e.getRootNode().activeElement===e&&b?.isConnected&&!b.disabled&&!b.closest("[inert]")&&b.checkVisibility({checkVisibilityCSS:!0})&&b.focus({preventScroll:!0})})}function y(){if(!u)return;let s=u;u=null,s.abort.abort(),s.button?.removeAttribute("aria-busy"),s.button&&(s.button.disabled=s.wasDisabled),e.removeAttribute("aria-busy"),o(s)}function C(){y(),i?.abort(),l.forEach(s=>s()),l=[]}function h(){C(),i=new AbortController,e.replaceChildren(),e.className="account-control",e.dataset.kind=m,e.tabIndex=-1,e.setAttribute("role","group"),e.style.setProperty("--ac-fast",Y.duration.short4.$value),e.style.setProperty("--ac-duration",Y.duration.medium2.$value),e.style.setProperty("--ac-ease",`cubic-bezier(${Y.easing.settle.$value.join(",")})`);let s=null,b=(x,_,k,T={})=>x.addEventListener(_,k,{...T,signal:s?AbortSignal.any([i.signal,s.signal]):i.signal}),S=O("p","ac-status",t.demo?"Local example. Changes are not sent to a server.":"Connect your application action handler to apply changes.");S.setAttribute("role","status"),S.setAttribute("aria-atomic","true");let w={root:e,options:t,el:O,glyph:Z,on:b,reduced:f,focus:r,signal:i.signal,cleanup:x=>l.push(x),say(x){S.textContent=x},emit(x){let _=structuredClone(x);t.onChange?.(_),e.dispatchEvent(new CustomEvent("sl:change",{bubbles:!0,detail:structuredClone(_)}))},title(x,_,k="user"){e.setAttribute("aria-label",x);let T=O("div","ac-heading"),E=O("span","ac-mark");E.append(Z(k)),T.append(E,O("h2","ac-title",x)),e.append(T,O("p","ac-hint ac-intro",_))},button(x,_,k="primary"){let T=O("span","ac-action"),E=T.attachShadow({mode:"open"}),L=O("style");L.textContent=X.pair.css+":host{--sl-input-action:1;display:inline-flex;min-width:0;max-width:100%;font-family:'Segoe UI',sans-serif}.button-kit{--focus-ring:#eee;font-family:'Segoe UI',sans-serif;display:block;min-width:0;width:100%}.bk-button{width:auto;max-width:100%;height:44px;font:500 16px/1.4 'Segoe UI',sans-serif;letter-spacing:0;min-width:0;border-radius:11px;outline-offset:3px}.bk-surface{position:relative;min-height:44px;padding:10px 16px;color:#f4f4f4}.bk-label{position:relative;inset:auto;white-space:normal;overflow-wrap:anywhere;opacity:1;transition:none;gap:8px}.bk-button--cancel .bk-surface{background:#3c3c3c;color:#ddd}.bk-button--cancel:hover .bk-surface{background:#474747}.bk-button:disabled{opacity:.4;cursor:default}.bk-button:disabled .bk-surface,.bk-button[aria-busy=true] .bk-surface{transform:none!important}.bk-surface:before,.bk-surface:after{display:none}.bk-button[aria-busy=true]{cursor:progress}.bk-button--quiet .bk-surface{background:transparent;box-shadow:none;color:#c6c6c6;padding-inline:8px}.bk-button--small{font-size:14px;height:36px;border-radius:8px}.bk-button--small .bk-surface{min-height:36px;padding:7px 10px}.bk-button svg{width:17px;height:17px;fill:none;stroke:currentColor;stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round}.bk-button:focus-visible{outline:2px solid #eee}@media(prefers-reduced-motion:reduce){*{transition:none!important;animation:none!important}}",L.textContent+=J;let D=O("span","button-kit"),M=O("button",`bk-button bk-button--${k==="primary"?"save":k==="quiet"?"quiet":"cancel"} ${k==="small"?"bk-button--small":""}`),c=O("span","bk-surface"),q=O("span","bk-label",x);return M.type="button",c.append(q),M.append(c),D.append(M),E.append(L,D),b(M,"click",_),M.view=T,M.label=q,M},actions(...x){let _=O("div","ac-actions");return _.append(...x.map(k=>k.view||k)),_},field(x,_="",k="text-input"){let T=X[k];if(!T)throw new Error(`Unknown field ${k}`);let E=O("div","ac-source"),L=E.attachShadow({mode:"open"});L.innerHTML=T.markup;let D=O("style");D.textContent=T.css+":host{display:block;min-width:0}.sl-field{width:100%;max-width:none;--field-ink:#222;--field-hover:#2c2c2c;--field-focus:#dedede;font-family:'Segoe UI',sans-serif;font-synthesis:none}.sl-field input,.sl-field textarea,.sl-field label,.sl-field button,.sl-code__label{font-family:'Segoe UI',sans-serif!important}.sl-field__input{font-size:16px!important}.sl-field__label{font-size:16px}.sl-field__helper,.sl-field__counter{display:none!important}.sl-field__control{margin:0}.sl-field.sl-field--textarea .sl-field__control{max-height:none}.sl-field textarea{resize:none;overflow:hidden!important}.sl-code__label{font-size:13px;color:#c6c6c6}.sl-code__control{margin-top:8px}.sl-field__reveal:focus-visible{outline-color:#eee}@media(prefers-reduced-motion:reduce){*{transition:none!important;animation:none!important}}",L.prepend(D);let M=L.querySelector(T.rootSelector||".sl-field"),c=L.querySelector("input,textarea"),q=L.querySelector(".sl-field__label,.sl-code__label");q.textContent=x,c.setAttribute("aria-label",x),c.removeAttribute("aria-describedby"),c.removeAttribute("required"),c.removeAttribute("maxlength"),c.value=_,c.defaultValue=_,c.autocomplete=k==="password-input"?"off":c.autocomplete;let z;if(k==="code-input"){let N=[...L.querySelectorAll(".sl-code__cells span")],P=()=>{c.value=c.value.replace(/\D/g,"").slice(0,6),M.dataset.result="neutral",M.dataset.length=String(c.value.length),M.dataset.complete=String(c.value.length===6),N.forEach((I,j)=>{I.textContent=c.value[j]||"",I.classList.toggle("is-filled",j<c.value.length),I.classList.toggle("is-active",L.activeElement===c&&j===Math.min(5,c.value.length))})};for(let I of["input","compositionend","focus","blur"])b(c,I,P);P(),z={reset(){c.value="",P()},destroy(){c.value="",N.forEach(I=>I.textContent="")}}}else z=T.mount(M);l.push(()=>{k==="password-input"&&(c.value=""),z.destroy()});let R=L.querySelector(".sl-field__reveal");if(R){let N=()=>R.setAttribute("aria-label",z.isVisible?"Hide password":"Show password");N(),b(R,"click",N)}if(c.tagName==="TEXTAREA"){let N=L.querySelector(".sl-field__control"),P=0,I=()=>{if(!E.getBoundingClientRect().width)return;c.style.height="0px";let V=Math.max(76,c.scrollHeight+2);c.style.height="100%",N.style.height=V+"px"};b(c,"input",I),b(c,"compositionend",I),b(window,"resize",I);let j=new ResizeObserver(()=>{let V=E.getBoundingClientRect().width;V!==P&&(P=V,I())});j.observe(E),l.push(()=>j.disconnect())}return{node:E,input:c,control:z}},listRow(x,_,k="key"){let T=O("div","ac-row"),E=O("span","ac-row-icon"),L=O("div","ac-row-copy"),D=O("strong","ac-row-name",x),M=O("span","ac-hint",_);return E.append(Z(k)),L.append(D,M),T.append(E,L),{node:T,copy:L,name:D,caption:M}},list(x,{animateInsert:_=!1}={}){let k=new Map,T=!1;return l.push(()=>{for(let E of k.values())E.scope?.abort(),clearTimeout(E.timer)}),(E,L)=>{let D=new Set(E.map(M=>M.id));for(let[M,c]of k)if(!D.has(M)&&c.node.dataset.removed!=="true"){c.node.dataset.removed="true",c.node.inert=!0,c.node.setAttribute("aria-hidden","true"),c.scope?.abort();let q=()=>{c.node.dataset.removed==="true"&&(c.node.remove(),k.delete(M))};f.matches?q():c.timer=setTimeout(q,parseFloat(Y.duration.medium2.$value))}for(let M of E){let c=k.get(M.id),q=!c;if(!c){let R=O("div","ac-list-slot"),N=O("div","ac-list-slot-inner");R.dataset.id=M.id,R.append(N),c={node:R,inner:N},k.set(M.id,c),x.append(R)}clearTimeout(c.timer),c.node.dataset.removed="false",c.node.inert=!1,c.node.removeAttribute("aria-hidden");let z=JSON.stringify(M);if(c.fingerprint!==z||!c.scope||c.scope.signal.aborted){c.scope?.abort(),c.scope=new AbortController;let R=s;s=c.scope;try{c.inner.replaceChildren(L(M)),c.fingerprint=z}finally{s=R}}q&&T&&_&&!f.matches&&(c.node.dataset.entering="true",c.node.getBoundingClientRect(),delete c.node.dataset.entering)}T=!0}},panels(x){let _=O("div","ac-panels"),k=0;return x.forEach((T,E)=>{T.classList.add("ac-pane"),T.dataset.active=String(E===0),T.inert=E!==0,T.setAttribute("aria-hidden",String(E!==0)),_.append(T)}),{node:_,select(T){T!==k&&(k=T,x.forEach((E,L)=>{E.dataset.active=String(L===T),E.inert=L!==T,E.setAttribute("aria-hidden",String(L!==T))}))}}},reveal(x){let _=O("div","ac-reveal"),k=O("div","ac-reveal-inner");return k.append(x),_.append(k),_.dataset.open="false",_.inert=!0,_.setAttribute("aria-hidden","true"),{node:_,set(T){_.dataset.open=String(T),_.inert=!T,_.setAttribute("aria-hidden",String(!T))}}},toggle(x,_,k){let T=O("label","ac-switch"),E=O("input"),L=O("span","ac-switch-track");return E.type="checkbox",E.checked=_,T.append(O("span","",x),E,L),b(E,"change",()=>k(E.checked)),{node:T,input:E}},async run(x,_,k,T){if(u||A)return!1;if(!t.demo&&typeof t.onAction!="function")return w.say("Connect an action handler. Data has not changed."),!1;let E={abort:new AbortController,button:T,wasDisabled:T?.disabled};u=E,T?.getRootNode().activeElement===T&&(e.focus({preventScroll:!0}),E.parked=e.getRootNode().activeElement===e),e.setAttribute("aria-busy","true"),T&&(T.disabled=!0,T.setAttribute("aria-busy","true")),w.say("Processing action\u2026 You can cancel.");try{let L=t.demo?{demo:!0}:await t.onAction({type:x,payload:_},{signal:E.abort.signal});if(u!==E||E.abort.signal.aborted)return!1;if(L===!1)throw new Error("Action rejected");p=v(),g=!0;try{k(L)}finally{g=!1}return w.say(t.demo?"Only the example changed. Nothing was sent to a server.":"The action handler completed."),!0}catch{return u===E&&!E.abort.signal.aborted&&w.say("The action failed. Your data is preserved. Try again."),!1}finally{u===E&&(u=null,e.removeAttribute("aria-busy"),T&&(T.disabled=E.wasDisabled,T.removeAttribute("aria-busy")),o(E))}},cancel(){y(),w.say("Action cancelled. Data has not changed.")}};b(f,"change",()=>{e.dataset.reduced=String(f.matches),f.matches&&e.getAnimations({subtree:!0}).forEach(x=>x.finish())}),e.dataset.reduced=String(f.matches),d=n[m](w)||(()=>({})),e.append(S),b(e,"keydown",x=>{x.key==="Escape"&&u&&(x.preventDefault(),w.cancel())})}h();let a={reset(){A||h()},cancel(){A||(y(),e.querySelector(".ac-status").textContent="Action cancelled. Data has not changed.")},destroy(){A||(A=!0,C(),e.replaceChildren(),W.delete(e))},get state(){return{key:m,destroyed:A,pending:!!u,...A?{}:d()}}};return W.set(e,a),a}function $(e){e.root.tabIndex=-1;let m=e.run.bind(e);e.run=async(...r)=>{let o=r[3],y=o?.getRootNode().activeElement===o,C=m(...r);y&&e.root.hasAttribute("aria-busy")&&e.root.focus({preventScroll:!0});let h=await C;return!e.signal.aborted&&y&&e.root.getRootNode().activeElement===e.root&&o?.isConnected&&!o.disabled&&o.focus({preventScroll:!0}),h};let n=new Map;e.cleanup(()=>{for(let r of n.values())r.cancel()});let t=()=>{e.root.hasAttribute("aria-busy")&&e.cancel()};function i(r,o=null){let y=Number(getComputedStyle(r).opacity)||1,C=n.has(r)?Math.max(.8,y):.9;if(n.get(r)?.cancel(),e.reduced.matches||!r.isConnected||r.closest("[inert]"))return;let h=r.getBoundingClientRect().height,a={opacity:C},s={opacity:1};o>0&&h>0&&Math.abs(o-h)>.5&&(a.height=o+"px",s.height=h+"px");let b=r.animate([a,s],{duration:parseFloat(Y.duration.short4.$value),easing:`cubic-bezier(${Y.easing.settle.$value.join(",")})`});n.set(r,b),b.finished.catch(()=>{}).finally(()=>{n.get(r)===b&&n.delete(r)})}function l(r,o){let y=r.isConnected&&!r.closest("[inert]")?r.getBoundingClientRect().height:null;r.replaceChildren(...o),i(r,y)}function u(r){let o=e.el("dl","as-details");return d(o,r,!1),o}function d(r,o,y=!0){let C=o.map(([h,a])=>{let s=e.el("div");return s.append(e.el("dt","",h),e.el("dd","",String(a))),s});y?l(r,C):r.replaceChildren(...C)}function A(r,o,y="user"){let C=e.listRow(r,o,y);return C.node.classList.add("as-card"),C}function f(r,o,y,C){let h=y,a=e.el("div","as-choice");a.setAttribute("role","group"),a.setAttribute("aria-label",r);let s=o.map(([S,w])=>{let x=e.el("button","as-choice-button",w);return x.type="button",x.setAttribute("aria-pressed",String(S===h)),e.on(x,"click",()=>{x.disabled||b(S,!0)}),e.on(x,"keydown",_=>{if(!["ArrowLeft","ArrowRight","Home","End"].includes(_.key))return;_.preventDefault();let k=s.filter(D=>!D.disabled);if(!k.length)return;let T=k.indexOf(x),E=_.key==="Home"?0:_.key==="End"?k.length-1:(T+(_.key==="ArrowRight"?1:-1)+k.length)%k.length,L=k[E];L.focus({preventScroll:!0}),b(o[s.indexOf(L)][0],!0)}),a.append(x),x});function b(S,w=!1){S!==h&&(t(),h=S,s.forEach((x,_)=>x.setAttribute("aria-pressed",String(o[_][0]===h))),w&&C(S))}return{node:a,set:b,get value(){return h}}}function v(r,o){let y=e.el("div","as-records"),C=new Map,h=e.el("p","ac-hint as-empty","No matching records.");y.setAttribute("role","group"),y.setAttribute("aria-label","Records");let a=null,s=[],b=!1;y.append(h);function S(x){s=x;for(let _ of x){let k=C.get(_.id),T=!k;if(!k){let E=e.el("button","as-record"),L=e.el("strong"),D=e.el("span","ac-hint"),M=e.reveal(E);E.type="button",E.append(L,D),k={b:E,title:L,meta:D,reveal:M},C.set(_.id,k),y.append(M.node),e.on(E,"click",()=>{t(),w(_.id),o(s.find(c=>c.id===_.id))}),e.on(E,"keydown",c=>{if(!["ArrowUp","ArrowDown","Home","End"].includes(c.key))return;c.preventDefault();let q=[...C.values()].filter(N=>!N.reveal.node.inert),z=q.indexOf(k),R=c.key==="Home"?0:c.key==="End"?q.length-1:(z+(c.key==="ArrowDown"?1:-1)+q.length)%q.length;q[R].b.focus({preventScroll:!0}),q[R].b.click()})}k.title.textContent=_.title,k.meta.textContent=_.meta,k.b.setAttribute("aria-label",`Open: ${_.title}`),k.b.setAttribute("aria-pressed",String(_.id===a)),T&&b&&!e.reduced.matches&&k.reveal.node.getBoundingClientRect(),k.reveal.set(!0)}for(let[_,k]of C)x.some(T=>T.id===_)||k.reveal.set(!1);h.hidden=!!x.length,b=!0}function w(x){a=x;for(let[_,k]of C)k.b.setAttribute("aria-pressed",String(_===x))}return S(r),{node:y,paint:S,set:w,focus(x){C.get(x)?.b.focus({preventScroll:!0})}}}function g(r){let o=e.reveal(r);return o.node.classList.add("as-drawer"),o}return{fade:i,replace:l,detail:u,setDetail:d,card:A,choice:f,records:v,drawer:g,cancel:t,mutationInputs:(...r)=>{for(let o of r)e.on(o.input,"input",t)}}}function H(e){if(!Number.isSafeInteger(e)||e<0)throw new TypeError("Expected integer minor units");return new Intl.NumberFormat("en-GB",{style:"currency",currency:"RUB",maximumFractionDigits:2}).format(e/100)}var ue=Object.freeze([{id:"order-a",title:"October 12 order",meta:"Received \xB7 2 items",lines:[{id:"notebook",title:"Notebook",unit:89e3,quantity:2},{id:"pen",title:"Pen",unit:32e3,quantity:1}],address:"12 Forest Street, Novosibirsk"},{id:"order-b",title:"October 5 order",meta:"Received \xB7 1 item",lines:[{id:"bag",title:"Bag",unit:249e3,quantity:1}],address:"8 Peace Street, Novosibirsk"}]),ke=Object.freeze([{id:"invoice",title:"October invoice",type:"invoice",meta:"October 12 \xB7 Paid",lines:[{title:"Monthly subscription",unit:99e3,quantity:1}]},{id:"receipt",title:"Order receipt",type:"receipt",meta:"October 12 \xB7 Paid",lines:ue[0].lines},{id:"previous",title:"September invoice",type:"invoice",meta:"September 12 \xB7 Paid",lines:[{title:"Monthly subscription",unit:99e3,quantity:1}]}]);function K(e,m){if(!Number.isSafeInteger(e)||e<0)throw new TypeError("Expected nonnegative safe integer");let n=e;for(let{amount:t}of m){if(!Number.isSafeInteger(t)||!Number.isSafeInteger(n+t))throw new TypeError("Expected safe minor units");n+=t}if(n<0)throw new RangeError("Negative sample balance");return n}var F=[{id:"topup",title:"Account top-up",meta:"October 14 \xB7 Credit",amount:5e4,detail:"Sample top-up",date:"October 14, 2026"},{id:"purchase",title:"Material purchase",meta:"October 15 \xB7 Debit",amount:-35e3,detail:"Line icon set",date:"October 15, 2026"},{id:"service",title:"Service payment",meta:"October 16 \xB7 Debit",amount:-15e3,detail:"Design check",date:"October 16, 2026"}];var Q={region(e){let m=$(e);e.title("Language and region","Preview the result before applying settings.","user");let n={locale:"en-GB",zone:"Asia/Novosibirsk",format:"short"},t={...n},i=m.detail([]),l=m.choice("Display language",[["ru-RU","Russian"],["en-GB","English"]],t.locale,g=>{t.locale=g,v()}),u=m.choice("Time zone",[["Asia/Novosibirsk","Novosibirsk"],["Europe/Moscow","Moscow"],["UTC","UTC"]],t.zone,g=>{t.zone=g,v()}),d=m.choice("Date format",[["short","Short"],["long","Long"]],t.format,g=>{t.format=g,v()}),A=e.button("Apply",async()=>{let g={...t};await e.run("region.save",g,()=>{n=g,e.emit({saved:{...n}})},A),v()}),f=e.button("Cancel",()=>{m.cancel(),t={...n},l.set(t.locale),u.set(t.zone),d.set(t.format),v()},"quiet");function v(){m.setDetail(i,[["Date preview",new Intl.DateTimeFormat(t.locale,{timeZone:t.zone,dateStyle:t.format==="short"?"short":"long",timeStyle:"short"}).format(new Date("2026-10-17T10:30:00Z"))],["Settings",JSON.stringify(n)===JSON.stringify(t)?"Applied":"Changes pending"]]),A.disabled=f.disabled=JSON.stringify(n)===JSON.stringify(t)}return e.root.append(e.el("h3","as-label","Example language"),l.node,e.el("h3","as-label","Time zone"),u.node,e.el("h3","as-label","Date"),d.node,i,e.actions(A,f)),v(),()=>({saved:{...n},draft:{...t}})},balance(e){let m=$(e);e.title("Account balance","Sample account funds history, not a bank account.","key");let n="all",t=null,i=e.el("strong","as-amount",H(K(2e5,F))),l=m.detail([]),u=m.drawer(l),d=m.records(F,f=>{t=f.id,m.setDetail(l,[["Transaction",f.title],["Amount",(f.amount>0?"+":"\u2212")+H(Math.abs(f.amount))],["Date",f.date],["Description",f.detail]]),u.set(!0)}),A=m.choice("Transactions",[["all","All"],["in","Credits"],["out","Debits"]],"all",f=>{n=f,t=null,d.set(null),u.set(!1),d.paint(F.filter(v=>f==="all"||(f==="in"?v.amount>0:v.amount<0)))});return e.root.append(i,e.el("p","ac-hint","Opening balance: "+H(2e5)),A.node,d.node,u.node,e.el("p","ac-hint as-footnote","Filtering changes the list, not the balance. No real funds are involved.")),()=>({balance:K(2e5,F),filter:n,selected:t})},rewards(e){let m=$(e);e.title("Your rewards","Exchange sample points for an available reward.","user");let n="icons",t=[],i=[{id:"icons",title:"Icon set",meta:"300 points",cost:300},{id:"consult",title:"Design review",meta:"600 points",cost:600}],l=m.detail([]),u=e.el("p","ac-hint as-footnote"),d=m.records(i,g=>{n=g.id,v()}),A=e.button("Redeem reward",async()=>{let g=i.find(r=>r.id===n);if(t.includes(n)||g.cost>f())return;let p=n;await e.run("rewards.redeem",{id:p,cost:g.cost},()=>{t.push(p),v(),e.emit({points:f(),redeemed:[...t]})},A),v()});function f(){return 750-t.reduce((g,p)=>g+i.find(r=>r.id===p).cost,0)}function v(){d.paint(i.map(p=>({...p,meta:p.meta+(t.includes(p.id)?" \xB7 Redeemed":"")}))),d.set(n);let g=i.find(p=>p.id===n);m.setDetail(l,[["Available",`${f()} points`],["Reward",g.title],["Cost",`${g.cost} points`],["Redemption",t.includes(n)?"Already redeemed in the example":g.cost>f()?"Not enough points":"Available"]]),A.disabled=t.includes(n)||g.cost>f(),u.textContent=t.length?"Redeemed: "+t.map(p=>i.find(r=>r.id===p).title).join(", "):"No rewards redeemed yet."}return e.root.append(d.node,l,e.actions(A),u,e.el("p","ac-hint as-footnote","750 sample points. Redemption does not order a real service.")),v(),()=>({selected:n,points:f(),redeemed:[...t]})},referrals(e){let m=$(e);e.title("Friend referrals","Points are credited only when the condition is met.","link");let n=[{id:"anna",title:"Anna",status:"qualified"},{id:"ivan",title:"Ivan",status:"registered"},{id:"maria",title:"Maria",status:"pending"}],t="anna",i=m.detail([]),l=m.records([],v=>{t=v.id,f()}),u={pending:"Invitation pending",registered:"Registered",qualified:"Condition met"},d=e.button("Check results",async()=>{let v=t,g=n.find(p=>p.id===v);await e.run("referrals.refresh",{id:v},p=>{let r=e.options.demo?{pending:"registered",registered:"qualified",qualified:"qualified"}[g.status]:p?.status;if(!Object.hasOwn(u,r))throw new TypeError("Expected referral status");g.status=r,f(),e.emit({people:n.map(o=>({...o})),points:A()})},d),f()},"secondary");function A(){return n.filter(v=>v.status==="qualified").length*500}function f(){l.paint(n.map(g=>({...g,meta:u[g.status]}))),l.set(t);let v=n.find(g=>g.id===t);m.setDetail(i,[["Total credited",`${A()} points`],["Referral reward",v.status==="qualified"?"500 points":"Not credited yet"],["Condition","Friend completed their first purchase"]]),d.disabled=v.status==="qualified"}return e.root.append(e.el("p","ae-code","Demo code: ANNA"),l.node,i,e.actions(d),e.el("p","ac-hint as-footnote","Demo: checking advances one stage. No invitations or purchases are sent.")),f(),()=>({selected:t,points:A(),people:n.map(v=>({...v}))})}};var ee={licenses(e){let m=$(e);e.title("Licenses and devices","Product device activations, separate from account sign-in.","key");let n="studio",t=null,i=0,l=[{id:"studio",title:"Studio collection",meta:"Perpetual license",limit:2,devices:[{id:"main",name:"Work computer"}]},{id:"icons",title:"Line icons",meta:"Personal license",limit:1,devices:[]}],u=m.detail([]),d=e.el("div","as-methods"),A=e.list(d,{animateInsert:!0}),f=e.el("div","as-flow"),v=e.el("p","ac-note"),g=m.drawer(f),p=m.records(l,a=>{n=a.id,t=null,g.set(!1),h()}),r=e.button("Add device",async()=>{let a=n,s=l.find(b=>b.id===a);s.devices.length>=s.limit||(await e.run("licenses.activate",{productId:a},b=>{let S=e.options.demo?{id:"sample-"+ ++i,name:"Example computer "+i}:b?.device;if(!S||typeof S.id!="string"||typeof S.name!="string"||s.devices.some(w=>w.id===S.id))throw new TypeError("Expected unique device");s.devices.push({...S}),h(),e.emit(C())},r),h())},"secondary"),o=e.button("Deactivate device",async()=>{if(!t)return;let{productId:a,deviceId:s}=t;await e.run("licenses.revoke",{productId:a,deviceId:s},()=>{let b=l.find(S=>S.id===a);b.devices=b.devices.filter(S=>S.id!==s),t=null,g.set(!1),h(),e.emit(C()),r.focus({preventScroll:!0})},o),h()}),y=e.button("Keep",()=>{m.cancel(),t=null,g.set(!1),r.focus({preventScroll:!0})},"quiet");f.append(v,e.actions(o,y));function C(){return{selected:n,products:l.map(a=>({...a,devices:a.devices.map(s=>({...s}))})),target:t?{...t}:null}}function h(){p.set(n);let a=l.find(s=>s.id===n);m.setDetail(u,[["Product",a.title],["Devices",`${a.devices.length} of ${a.limit}`],["Access",a.devices.length>=a.limit?"Limit reached":"You can add a device"]]),A(a.devices.map(s=>({...s,id:a.id+"-"+s.id,deviceId:s.id,productId:a.id})),s=>{let b=m.card(s.name,"Example activation","laptop"),S=e.button("Deactivate",()=>{m.cancel(),t={productId:s.productId,deviceId:s.deviceId},v.textContent=`Deactivate \u201C${s.name}\u201D? This frees a device slot in the example.`,g.set(!0),o.focus({preventScroll:!0})},"small");return S.setAttribute("aria-label","Deactivate: "+s.name),b.node.append(e.actions(S)),b.node}),r.disabled=a.devices.length>=a.limit}return e.root.append(p.node,u,d,e.actions(r),g.node,e.el("p","ac-hint as-footnote","Sample activation. No device or license is verified.")),h(),C},appointments(e){let m=$(e);e.title("Your appointments","Reschedule an upcoming appointment or review a past one.","user");let n="design",t=!1,i=!1,l=[{id:"design",title:"Design review",meta:"Upcoming \xB7 October 18",status:"future",slot:"October 18, 11:00"},{id:"intro",title:"Project introduction",meta:"Completed \xB7 October 10",status:"past",slot:"October 10, 15:00"}],u=new Map([["design","October 18, 11:00"]]),d=m.detail([]),A=e.el("div","as-flow"),f=m.drawer(A),v=e.el("div","as-flow"),g=m.drawer(v),p=m.records(l,w=>{n=w.id,t=i=!1,r.set(u.get(n)??"October 18, 11:00"),S()}),r=m.choice("New time",[["October 18, 11:00","Oct 18 \xB7 11:00"],["October 19, 15:00","Oct 19 \xB7 15:00"]],"October 18, 11:00",w=>u.set(n,w)),o=e.button("Reschedule",()=>{m.cancel();let w=l.find(x=>x.id===n);w.status==="future"&&(t=!0,i=!1,r.set(u.get(n)??w.slot),S())},"secondary"),y=e.button("Save time",async()=>{let w=n,x=u.get(w);l.find(_=>_.id===w).status==="future"&&await e.run("appointments.move",{id:w,slot:x},()=>{let _=l.find(k=>k.id===w);_.slot=x,_.meta="Upcoming \xB7 "+x.split(",")[0],t=!1,S(),e.emit(b()),o.focus({preventScroll:!0})},y)}),C=e.button("Keep unchanged",()=>{m.cancel(),t=!1,S(),o.focus({preventScroll:!0})},"quiet");A.append(r.node,e.actions(y,C));let h=e.button("Cancel appointment",async()=>{let w=l.find(x=>x.id===n);if(w.status==="canceled"){let x=w.id;await e.run("appointments.restore",{id:x},()=>{w.status="future",w.meta="Upcoming \xB7 restored",S(),e.emit(b())},h),S()}else m.cancel(),t=!1,i=!0,S(),a.focus({preventScroll:!0})},"quiet"),a=e.button("Confirm cancellation",async()=>{let w=n;await e.run("appointments.cancel",{id:w},()=>{let x=l.find(_=>_.id===w);x.status="canceled",x.meta="Cancelled in the example",i=!1,S(),e.emit(b()),h.focus({preventScroll:!0})},a)}),s=e.button("Keep appointment",()=>{m.cancel(),i=!1,S(),h.focus({preventScroll:!0})},"quiet");v.append(e.el("p","ac-note","Cancel this appointment? You can restore it in the example."),e.actions(a,s));function b(){return{selected:n,editing:t,confirming:i,appointments:l.map(w=>({...w}))}}function S(){let w=l.find(x=>x.id===n);p.paint(l),p.set(n),m.setDetail(d,[["Appointment",w.title],["Time",w.slot],["Status",{future:"Upcoming",past:"Completed",canceled:"Cancelled"}[w.status]]]),o.view.hidden=w.status!=="future",h.view.hidden=w.status==="past",h.label.textContent=w.status==="canceled"?"Restore appointment":"Cancel appointment",f.set(t&&w.status==="future"),g.set(i&&w.status==="future")}return e.root.append(p.node,d,e.actions(o,h),f.node,g.node,e.el("p","ac-hint as-footnote","Times use the example time zone. No booking service is connected.")),S(),b},reviews(e){let m=$(e);e.title("Your reviews","Your reviews and their publication status.","edit");let n="course",t=[{id:"course",title:"Composition course",meta:"Published",status:"published",text:"Clear examples and useful practice."},{id:"service",title:"Design review",meta:"Under review",status:"pending",text:"I received detailed recommendations."}],i=new Map(t.map(p=>[p.id,p.text])),l=m.detail([]),u=e.field("Review text",i.get(n),"textarea-input"),d=m.records(t,p=>{n=p.id,u.input.value=i.get(n),u.input.dispatchEvent(new Event("input")),g()}),A=e.button("Save review",async()=>{let p=n,r=u.input.value;if(!r.trim()){e.say("Enter your review text."),u.input.focus();return}await e.run("reviews.save",{id:p,text:r},()=>{let o=t.find(y=>y.id===p);o.text=r,o.status="pending",o.meta="Under review",g(),e.emit(v())},A),g()}),f=e.button("Withdraw review",async()=>{let p=n,r=t.find(y=>y.id===p),o=r.status==="withdrawn"?"pending":"withdrawn";await e.run(o==="withdrawn"?"reviews.withdraw":"reviews.restore",{id:p},()=>{r.status=o,r.meta=o==="withdrawn"?"Withdrawn":"Under review",g(),e.emit(v())},f),g()},"secondary");function v(){return{selected:n,records:t.map(p=>({...p})),drafts:Object.fromEntries(i)}}function g(){let p=t.find(r=>r.id===n);d.paint(t),d.set(n),m.setDetail(l,[["Publication",p.meta],["Changes",u.input.value===p.text?"Saved":"Draft pending"]]),u.input.readOnly=p.status==="withdrawn",A.disabled=p.status==="withdrawn"||u.input.value===p.text,f.label.textContent=p.status==="withdrawn"?"Submit for review":"Withdraw review"}return e.on(u.input,"input",()=>{m.cancel(),i.set(n,u.input.value),g()}),e.root.append(d.node,l,u.node,e.actions(A,f),e.el("p","ac-hint as-footnote","Editing submits the review for moderation only in this example. Nothing is published.")),g(),v}};var te={members(e){let m=$(e);e.title("Organization members","Roles, access and last-owner protection.","user");let n="me",t="owner",i=null,l=[{id:"me",title:"Anna Smith",role:"owner",current:!0},{id:"boris",title:"Boris Volkov",role:"owner",current:!1},{id:"daria",title:"Daria Sokolova",role:"editor",current:!1}],u={owner:"Owner",editor:"Editor",reader:"Reader"},d=m.detail([]),A=e.el("div","as-flow"),f=e.el("p","ac-note"),v=m.drawer(A),g=m.records([],b=>{n=b.id,t=b.role,i=null,v.set(!1),p.set(t),s()}),p=m.choice("Member role",[["owner","Owner"],["editor","Editor"],["reader","Reader"]],"owner",b=>{t=b,s()}),r=e.button("Change role",async()=>{let b=n,S=l.find(x=>x.id===b),w=t;S.role==="owner"&&w!=="owner"&&h()===1||(await e.run("members.role",{id:b,role:w},()=>{S.role=w,s(),e.emit(a())},r),s())}),o=e.button("Remove member",()=>{m.cancel(),i=n,f.textContent=`Remove \u201C${l.find(b=>b.id===i).title}\u201D from the example organization?`,v.set(!0),y.focus({preventScroll:!0})},"secondary"),y=e.button("Confirm removal",async()=>{let b=i,S=l.find(w=>w.id===b);!S||S.current||S.role==="owner"&&h()===1||(await e.run("members.remove",{id:b},()=>{l.splice(l.indexOf(S),1),n=l[0].id,t=l[0].role,i=null,v.set(!1),s(),e.emit(a())},y),p.set(t),s())}),C=e.button("Keep",()=>{m.cancel(),i=null,v.set(!1),o.focus({preventScroll:!0})},"quiet");A.append(f,e.actions(y,C));function h(){return l.filter(b=>b.role==="owner").length}function a(){return{selected:n,draft:t,members:l.map(b=>({...b})),target:i}}function s(){g.paint(l.map(w=>({...w,meta:u[w.role]+(w.current?" \xB7 You":"")}))),g.set(n);let b=l.find(w=>w.id===n),S=b.role==="owner"&&h()===1;p.node.querySelectorAll("button").forEach((w,x)=>w.disabled=S&&x!==0),r.disabled=t===b.role||S&&t!=="owner",o.disabled=b.current||S,m.setDetail(d,[["Current role",u[b.role]],["Owners",h()],["Restriction",b.current?"You cannot remove yourself":S?"Last owner is protected":"Access can be changed"]])}return e.root.append(g.node,d,p.node,e.actions(r,o),v.node,e.el("p","ac-hint as-footnote","Roles change only in the example. Your server must validate real access.")),s(),a},ownership(e){let m=$(e);e.title("Transfer organization","The recipient must be an active member.","shield");let n="me",t="boris",i=null,l=!1,u={me:"Anna Smith",boris:"Boris Volkov",daria:"Daria Sokolova"},d=m.detail([]),A=e.el("p","ac-note"),f=e.el("div","as-flow"),v=m.drawer(f),g=m.choice("New owner",[["boris","Boris"],["daria","Daria"],["invite","Awaiting sign-in"]],"boris",s=>{t=s,l=!1,v.set(!1),a()});g.node.querySelectorAll("button")[2].disabled=!0;let p=e.button("Transfer ownership",()=>{m.cancel(),!(n!=="me"||i||!u[t])&&(l=!0,A.textContent=`Transfer the organization to \u201C${u[t]}\u201D? Permissions change only after acceptance.`,v.set(!0),r.focus({preventScroll:!0}))}),r=e.button("Confirm transfer",async()=>{let s=t;await e.run("ownership.request",{from:n,to:s},()=>{i={from:n,to:s},l=!1,v.set(!1),a(),e.emit(h())},r),a()}),o=e.button("Keep ownership",()=>{m.cancel(),l=!1,v.set(!1),p.focus({preventScroll:!0})},"quiet");f.append(A,e.actions(r,o));let y=e.button("Cancel transfer",async()=>{let s=i?.to;s&&(await e.run("ownership.cancel",{to:s},()=>{i=null,a(),e.emit(h())},y),a())},"secondary"),C=e.button(e.options.demo?"Accept as recipient":"Check transfer",async()=>{let s=i?.to;s&&(await e.run("ownership.refresh",{to:s},b=>{if(!e.options.demo&&typeof b?.accepted!="boolean")throw new TypeError("Expected accepted result");(e.options.demo||b.accepted)&&(n=s,i=null),a(),e.emit(h())},C),a())},"quiet");function h(){return{owner:n,selected:t,transfer:i?{...i}:null,confirming:l}}function a(){m.setDetail(d,[["Owner",u[n]],["Transfer",i?"Awaiting acceptance":n==="me"?"Not requested":e.options.demo?"Accepted in the example":"Accepted by recipient"],["Recipient",i?u[i.to]:u[t]??"Unavailable"]]),p.disabled=!!i||n!=="me",g.node.querySelectorAll("button").forEach((s,b)=>s.disabled=b===2||!!i||n!=="me"),y.view.hidden=C.view.hidden=!i}return e.root.append(d,e.el("h3","as-label","Active member"),g.node,e.actions(p),v.node,e.actions(y,C),e.el("p","ac-hint as-footnote","Accepting as the recipient is demo-only. Real organization ownership is unchanged.")),a(),h},lifecycle(e){let m=$(e);e.title("Account status","Pause your account or request deletion separately.","shield");let n="active",t=null,i=m.detail([]),l=e.el("div","as-flow"),u=e.el("p","ac-note"),d=e.field("Confirmation",""),A=m.drawer(d.node),f=m.drawer(l),v=e.button("Pause",()=>y("pause"),"secondary"),g=e.button("Request deletion",()=>y("delete"),"quiet"),p=e.button("Resume",async()=>{let h=n==="paused"?"lifecycle.restore":"lifecycle.cancel";await e.run(h,{},()=>{n="active",t=null,f.set(!1),C(),e.emit({phase:n})},p),C()}),r=e.button("Confirm",async()=>{let h=t;if(h==="delete"&&d.input.value!=="DELETE"||!["pause","delete"].includes(h))return;await e.run("lifecycle."+h,h==="delete"?{confirmation:"DELETE"}:{},()=>{n=h==="pause"?"paused":"scheduled",t=null,f.set(!1),C(),e.emit({phase:n}),p.focus({preventScroll:!0})},r)&&(d.input.value="",d.input.dispatchEvent(new Event("input"))),C()}),o=e.button("Keep unchanged",()=>{m.cancel(),t=null,f.set(!1),C(),v.focus({preventScroll:!0})},"quiet");l.append(u,A.node,e.actions(r,o));function y(h){m.cancel(),t=h,d.input.value="",d.input.dispatchEvent(new Event("input")),u.textContent=h==="delete"?"Enter DELETE. The example request can be cancelled before the stated date.":"Pause the example account? You can resume it.",A.set(h==="delete"),f.set(!0),C(),h==="delete"?d.input.focus({preventScroll:!0}):r.focus({preventScroll:!0})}function C(){m.setDetail(i,[["Account",{active:"Active",paused:"Paused",scheduled:"Deletion scheduled"}[n]],["Next step",n==="scheduled"?"Example deadline: October 24, 2026":n==="paused"?"You can resume":"All example features are available"]]),v.view.hidden=n!=="active",g.view.hidden=n==="scheduled",p.view.hidden=n==="active",p.label.textContent=n==="scheduled"?"Cancel deletion":"Resume",r.disabled=t==="delete"&&d.input.value!=="DELETE"}return e.on(d.input,"input",()=>{m.cancel(),C()}),e.root.append(i,e.actions(v,g,p),f.node,e.el("p","ac-hint as-footnote","No accounts or data are deleted. These are interface states only.")),C(),()=>({phase:n,task:t})}};var U=new WeakMap;function ne(e,m,n){U.get(e)?.destroy();let t=!1,i=document.createElement("div");e.replaceChildren(i),e.classList.add("sl-component"),e.dataset.kind="inputs-account-extensions-reviews-v11";let l=G(i,{...m,key:"reviews",renderers:{...Q,...ee,...te},demo:n}),u={reset(){t||l.reset()},cancel(){t||l.cancel()},destroy(){t||(t=!0,l.destroy(),U.get(e)===u&&(e.replaceChildren(),U.delete(e)))},get state(){return l.state}};return U.set(e,u),u}function fe(e,m={}){return ne(e,m,!1)}function pe(e){return ne(e,{},!0)}window.SLComponent={mount:fe,mountPreview:pe};})();
