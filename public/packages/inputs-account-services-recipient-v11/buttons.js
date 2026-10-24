(()=>{var G=`
.bk-button.bk-button{height:auto;min-height:48px;font:600 16px/22px 'Segoe UI',sans-serif;letter-spacing:0;max-width:100%;min-width:0}
.bk-surface.bk-surface{min-height:48px;padding:12px 16px;display:flex;align-items:center;justify-content:center;box-sizing:border-box}
.bk-label.bk-label{font:inherit;line-height:22px;white-space:normal;overflow-wrap:anywhere;text-align:center;min-width:0}
.bk-button.bk-button.bk-button--small{min-height:44px;font-size:15px;line-height:20px}
.bk-button--small .bk-surface.bk-surface{min-height:44px;padding:10px 12px}
.bk-button--small .bk-label.bk-label{font-size:15px;line-height:20px}
.bk-button--quiet .bk-surface.bk-surface{padding-inline:12px}
.bk-button.bk-button:disabled{opacity:.58}
`;var se=`/* Matte buttons. Scoped styles and editable color and motion tokens. */

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

`,oe=(()=>{let e={"short-2":100,"short-4":200,"medium-3":350,"medium-4":400,"long-4":600},m={linear:"cubic-bezier(0,0,1,1)","ease-in-out-gentle":"cubic-bezier(0.4,0,0.2,1)"},n=new WeakMap;function i(l,{onSave:r,onCancel:f=()=>{},previewDuration:p=0,confirmationMs:C=1400}={}){if(n.has(l))return n.get(l);let b=l.querySelector('[data-action="save"]'),h=l.querySelector('[data-action="cancel"]'),y=b?.querySelector(".bk-progress"),w=h?.querySelector(".bk-wash"),o=l.querySelector("[data-feedback]");if(b&&typeof r!="function")throw new TypeError("Pass your async onSave function.");let t=matchMedia("(prefers-reduced-motion: reduce)"),a=new AbortController,s=new Map,d=new Set,u,g,A,q,T,v=!1;function x(c,M,N){c&&(c===b&&c.dataset.state!==M&&(c.dataset.transition=c.dataset.state==="saved"&&M==="idle"?"return":"default"),c.dataset.state=M,c.setAttribute("aria-label",N))}function k(c){o&&(o.textContent=c)}function _(){b?.setAttribute("aria-disabled","false"),b?.setAttribute("aria-busy","false")}function S(c=!1){if(!y)return;let M=c&&!t.matches&&q?getComputedStyle(y):null,N=M?.transform||"none",P=M?Number(M.opacity):0,$=N==="none"?0:new DOMMatrixReadOnly(N).a;if(c&&!t.matches&&$>.001&&P>0){let D=y.cloneNode(!1);D.classList.add("bk-retiring"),D.style.transform=N,D.style.opacity=String(P),y.before(D);let O=D.animate([{opacity:P},{opacity:0}],{duration:b.dataset.transition==="return"?e["long-4"]:e["medium-4"],easing:m["ease-in-out-gentle"],fill:"forwards"});s.set(D,O),O.onfinish=()=>{D.remove(),s.delete(D),O.cancel()}}if(q?.cancel(),q=null,!c||t.matches){for(let[D,O]of s)O.cancel(),D.remove();s.clear()}}async function R(){if(v||b.disabled||b.getAttribute("aria-disabled")==="true")return;clearTimeout(g),clearTimeout(A),T?.cancel(),x(h,"idle","Cancel"),S(!0);let c=new AbortController;if(u=c,x(b,"saving","Saving changes"),b.setAttribute("aria-disabled","true"),b.setAttribute("aria-busy","true"),k("Saving changes."),!t.matches&&p>e["short-4"]){let M=e["short-4"]/p;q=y.animate([{transform:"scaleX(0)",opacity:0},{transform:`scaleX(${M})`,opacity:1,offset:M},{transform:"scaleX(1)",opacity:1}],{duration:p,easing:m.linear,fill:"forwards"})}try{if(await r({signal:c.signal}),u!==c||c.signal.aborted)return;u=null,!q&&!t.matches&&(q=y.animate([{transform:"scaleX(1)",opacity:0},{transform:"scaleX(1)",opacity:1}],{duration:e["medium-3"],easing:m["ease-in-out-gentle"],fill:"forwards"})),x(b,"saved","Changes saved"),b.setAttribute("aria-busy","false"),k("Changes saved."),g=setTimeout(()=>{x(b,"idle","Save changes"),_(),S(!0)},C)}catch(M){if(u!==c)return;u=null,x(b,"idle","Save changes"),_(),S(!0),k(M?.name==="AbortError"?"Saving cancelled.":"Could not save. Please try again.")}}function L(){if(v||h.disabled||h.getAttribute("aria-disabled")==="true")return;let c=!!u;if(u?.abort(),u=null,clearTimeout(g),clearTimeout(A),x(b,"idle","Save changes"),_(),S(!0),x(h,"cancelled","Cancelled"),T?.cancel(),w&&!t.matches){T=w.animate([{opacity:0},{opacity:.35,offset:.5},{opacity:0}],{duration:e["medium-4"],easing:m["ease-in-out-gentle"]});let M=T;M.onfinish=()=>{T===M&&(T=null),M.cancel()}}k(c?"Saving cancelled.":"Cancelled."),A=setTimeout(()=>x(h,"idle","Cancel"),C),f({wasSaving:c})}b?.addEventListener("click",R,{signal:a.signal}),h?.addEventListener("click",L,{signal:a.signal});for(let c of[b,h].filter(Boolean))c.disabled=!1,c.addEventListener("keydown",M=>{if(M.key!=="Enter"||M.repeat||c.getAttribute("aria-disabled")==="true")return;c.classList.add("is-pressed");let N=setTimeout(()=>{c.classList.remove("is-pressed"),d.delete(N)},e["short-2"]);d.add(N)},{signal:a.signal}),c.addEventListener("blur",()=>c.classList.remove("is-pressed"),{signal:a.signal});t.addEventListener("change",()=>{t.matches&&(S(),T?.cancel())},{signal:a.signal});let E={destroy(){if(!v){v=!0,a.abort(),u?.abort(),u=null,clearTimeout(g),clearTimeout(A),d.forEach(clearTimeout),d.clear(),S(),T?.cancel();for(let c of[b,h].filter(Boolean))c.classList.remove("is-pressed"),c.disabled=!0;n.delete(l)}}};return n.set(l,E),E}return{mount:i}})(),H=`
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
`,le=(()=>{let e=new WeakMap,m=0;function n(l,r,f=()=>({})){if(e.has(l))return e.get(l);let p=l?.querySelector("input, textarea"),C=p?.tagName==="TEXTAREA"?"textarea":p?.type;if(!p||C!==r)throw new TypeError(`A native ${r} control is required.`);let b=l.ownerDocument,h=b.defaultView,y=new h.AbortController,w=[],o=[],t=!1,a=(u,g,A,q={})=>u.addEventListener(g,A,{...q,signal:y.signal}),s=f({root:l,input:p,doc:b,view:h,on:a,resets:w,cleanups:o,alive:()=>!t});p.form&&a(p.form,"reset",u=>queueMicrotask(()=>{!t&&!u.defaultPrevented&&w.forEach(g=>g())}));let d={reset(){t||(p.value=p.defaultValue,w.forEach(u=>u()))},destroy(){t||(t=!0,y.abort(),o.forEach(u=>u()),e.delete(l))}};return Object.defineProperties(d,Object.getOwnPropertyDescriptors(s)),e.set(l,d),d}function i(l){return n(l,"text")}return{mount:i}})(),re=(()=>{let e=new WeakMap,m=0;function n(l,r,f=()=>({})){if(e.has(l))return e.get(l);let p=l?.querySelector("input, textarea"),C=p?.tagName==="TEXTAREA"?"textarea":p?.type;if(!p||C!==r)throw new TypeError(`A native ${r} control is required.`);let b=l.ownerDocument,h=b.defaultView,y=new h.AbortController,w=[],o=[],t=!1,a=(u,g,A,q={})=>u.addEventListener(g,A,{...q,signal:y.signal}),s=f({root:l,input:p,doc:b,view:h,on:a,resets:w,cleanups:o,alive:()=>!t});p.form&&a(p.form,"reset",u=>queueMicrotask(()=>{!t&&!u.defaultPrevented&&w.forEach(g=>g())}));let d={reset(){t||(p.value=p.defaultValue,w.forEach(u=>u()))},destroy(){t||(t=!0,y.abort(),o.forEach(u=>u()),e.delete(l))}};return Object.defineProperties(d,Object.getOwnPropertyDescriptors(s)),e.set(l,d),d}function i(l){return n(l,"textarea",({input:r,root:f,view:p,on:C,resets:b,cleanups:h})=>{let y=f.querySelector(".sl-field__control"),w=f.querySelector("[data-count]"),o=f.querySelector(".sl-field__helper");if(!y||!w||!o)throw new TypeError("Textarea needs a control, counter and helper.");let t=o.textContent,a=r.maxLength>0?r.maxLength:null;function s(){r.style.height="0px";let u=r.scrollHeight,g=r.value?Math.max(60,Math.min(180,u)):60;r.style.height="100%",r.style.overflowY=u>180?"auto":"hidden",y.style.height=`${g}px`}function d(){let u=[...r.value].length;w.textContent=String(u),o.textContent=a&&u>=a?`Character limit reached: ${a}.`:t,s()}return C(r,"input",u=>{u.isComposing||d()}),C(r,"compositionend",()=>d()),C(p,"resize",s),b.push(d),h.push(()=>{y.style.removeProperty("height"),r.style.removeProperty("height"),r.style.removeProperty("overflow-y")}),d(),{get length(){return[...r.value].length}}})}return{mount:i}})(),de=(()=>{let e=new WeakMap,m=0;function n(l,r,f=()=>({})){if(e.has(l))return e.get(l);let p=l?.querySelector("input, textarea"),C=p?.tagName==="TEXTAREA"?"textarea":p?.type;if(!p||C!==r)throw new TypeError(`A native ${r} control is required.`);let b=l.ownerDocument,h=b.defaultView,y=new h.AbortController,w=[],o=[],t=!1,a=(u,g,A,q={})=>u.addEventListener(g,A,{...q,signal:y.signal}),s=f({root:l,input:p,doc:b,view:h,on:a,resets:w,cleanups:o,alive:()=>!t});p.form&&a(p.form,"reset",u=>queueMicrotask(()=>{!t&&!u.defaultPrevented&&w.forEach(g=>g())}));let d={reset(){t||(p.value=p.defaultValue,w.forEach(u=>u()))},destroy(){t||(t=!0,y.abort(),o.forEach(u=>u()),e.delete(l))}};return Object.defineProperties(d,Object.getOwnPropertyDescriptors(s)),e.set(l,d),d}function i(l){return n(l,"password",({root:r,input:f,doc:p,on:C,resets:b,cleanups:h,alive:y})=>{let w=r.querySelector(".sl-field__reveal");if(!w)throw new TypeError("Password needs its reveal button.");let o=!1;function t(a){if(!y())return;let s=p.activeElement===f||r.getRootNode().activeElement===f,d=f.selectionStart,u=f.selectionEnd,g=f.selectionDirection,A=f.scrollLeft;o=!!a,f.type=o?"text":"password",r.dataset.visible=String(o),w.setAttribute("aria-pressed",String(o)),w.setAttribute("aria-label",o?"Hide password":"Show password"),s&&f.focus({preventScroll:!0}),d!==null&&u!==null&&f.setSelectionRange(d,u,g),f.scrollLeft=A}return C(w,"pointerdown",a=>{a.button===0&&(p.activeElement===f||r.getRootNode().activeElement===f)&&a.preventDefault()}),C(w,"click",()=>{f.disabled||t(!o)}),w.disabled=f.disabled,b.push(()=>t(!1)),h.push(()=>{o=!1,f.type="password",r.dataset.visible="false",w.setAttribute("aria-pressed","false"),w.setAttribute("aria-label","Show password"),w.disabled=!0}),{setVisible:t,get isVisible(){return o}}})}return{mount:i}})(),ce=H.replace(/^\.sl-field\.sl-field--code \{ width: min\(300px, 100%\); \}\n/m,""),ue=(()=>{let e=new WeakMap,m=0;function n(l,r,f=()=>({})){if(e.has(l))return e.get(l);let p=l?.querySelector("input, textarea"),C=p?.tagName==="TEXTAREA"?"textarea":p?.type;if(!p||C!==r)throw new TypeError(`A native ${r} control is required.`);let b=l.ownerDocument,h=b.defaultView,y=new h.AbortController,w=[],o=[],t=!1,a=(u,g,A,q={})=>u.addEventListener(g,A,{...q,signal:y.signal}),s=f({root:l,input:p,doc:b,view:h,on:a,resets:w,cleanups:o,alive:()=>!t});p.form&&a(p.form,"reset",u=>queueMicrotask(()=>{!t&&!u.defaultPrevented&&w.forEach(g=>g())}));let d={reset(){t||(p.value=p.defaultValue,w.forEach(u=>u()))},destroy(){t||(t=!0,y.abort(),o.forEach(u=>u()),e.delete(l))}};return Object.defineProperties(d,Object.getOwnPropertyDescriptors(s)),e.set(l,d),d}function i(l,{expectedCode:r="482731"}={}){if(!/^\d{6}$/.test(r))throw new TypeError("Expected code must contain exactly six digits.");return n(l,"text",({root:f,input:p,view:C,on:b,resets:h,cleanups:y})=>{let w=f.querySelector(".sl-code__cells"),o=f.querySelector(".sl-code__control"),t=[...f.querySelectorAll(".sl-code__cells span")],a=f.querySelector(".sl-field__helper");if(!w||!o||t.length!==6||!a)throw new TypeError("Verification code needs six cells and a helper.");let s=a.textContent,d=C.matchMedia("(prefers-reduced-motion: reduce)"),u=new Map,g=new Set,A=null,q=0,T="";function v(){u.forEach(L=>L.cancel()),u.clear()}function x(){g.forEach(L=>L.cancel()),g.clear(),A?.cancel(),A=null}function k(){v(),x()}function _(L){u.get(L)?.cancel();let E=L.animate([{transform:"translateY(3px) scale(.9)",opacity:.55},{transform:"translateY(0) scale(1)",opacity:1}],{duration:300,easing:"cubic-bezier(.2,.7,.25,1)"});u.set(L,E),E.onfinish=()=>{u.get(L)===E&&(E.cancel(),u.delete(L))}}function S(L){if(k(),f.dataset.result=L?"success":"error",d.matches)return;let E=L?{color:"#eaf8ef",borderColor:"#4f8d72",backgroundColor:"#234b3a",boxShadow:"inset 0 1px rgba(255,255,255,.09), 0 0 0 2px rgba(79,141,114,.09)",transform:"translateY(-2px)"}:{color:"#fff0f0",borderColor:"#a85e63",backgroundColor:"#543134",boxShadow:"inset 0 1px rgba(255,255,255,.07), 0 0 0 2px rgba(168,94,99,.08)",transform:"translateY(1px)"};t.forEach((c,M)=>{let N=c.animate([{color:"#f9f9f9",borderColor:"rgba(0,0,0,0)",backgroundColor:"#222222",boxShadow:"inset 0 1px rgba(255,255,255,.07), 0 1px 2px rgba(0,0,0,.05)",transform:"translateY(0)"},E],{duration:360,delay:M*95,easing:"cubic-bezier(.4,0,.2,1)",fill:"both"});g.add(N),M===t.length-1&&(N.onfinish=()=>{if(!g.has(N))return;g.forEach($=>$.cancel()),g.clear(),A=w.animate([{transform:"scale(1)"},{transform:"scale(1.018)",offset:.45},{transform:"scale(1)"}],{duration:340,easing:"cubic-bezier(.2,.7,.25,1)"});let P=A;P.onfinish=()=>{A===P&&(P.cancel(),A=null)}})})}function R(L=!0){let E=p.value.replace(/\D/g,"").slice(0,t.length);p.value!==E&&(p.value=E);let c=p.matches(":focus");t.forEach((P,$)=>{P.textContent=E[$]||"",P.classList.toggle("is-filled",$<E.length),P.classList.toggle("is-active",c&&$===Math.min(E.length,t.length-1)&&E.length<t.length)}),f.dataset.length=String(E.length),f.dataset.complete=String(E.length===t.length);let M=E.length===t.length,N=M&&E===r;M?E!==T&&(L?S(N):(k(),f.dataset.result=N?"success":"error")):(f.dataset.result!=="neutral"&&k(),f.dataset.result="neutral"),p.setCustomValidity(M&&!N?"Code does not match.":""),M?p.setAttribute("aria-invalid",String(!N)):p.removeAttribute("aria-invalid"),a.textContent=E.length===0?s:M?N?"Code accepted.":`Code does not match. Try ${r}.`:`${E.length} of ${t.length} digits entered.`,L&&!M&&E.length>q&&!d.matches&&_(t[E.length-1]),M&&E!==T&&p.dispatchEvent(new C.CustomEvent("codecomplete",{bubbles:!0,composed:!0,detail:{code:E,valid:N}})),T=E,q=E.length}return b(p,"input",L=>{L.isComposing||R()}),b(p,"compositionend",()=>R()),b(p,"focus",()=>R(!1)),b(p,"blur",()=>R(!1)),b(d,"change",()=>{d.matches&&k()}),h.push(()=>{k(),q=0,T="",R(!1)}),y.push(k),R(!1),{validate:()=>(R(!1),p.value===r),get code(){return p.value},get complete(){return p.value.length===t.length}}})}return{mount:i}})(),Z={pair:{markup:`<div class="button-kit">
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
  </div>`,css:se,mount:oe.mount},"text-input":{markup:`<div class="sl-field" id="text-field">
            <div class="sl-field__control"><input class="sl-field__input" id="demo-text" type="text" placeholder=" " autocomplete="off" aria-describedby="text-help"><label class="sl-field__label" for="demo-text">Project name</label></div>
            <p class="sl-field__helper" id="text-help">Try a name for your next project.</p>
          </div>`,css:H,mount:le.mount},"textarea-input":{markup:`<div class="sl-field sl-field--textarea" id="textarea-field">
            <div class="sl-field__control">
              <textarea class="sl-field__input" id="demo-textarea" placeholder=" " maxlength="180" rows="1" aria-describedby="textarea-help"></textarea>
              <label class="sl-field__label" for="demo-textarea">Project notes</label>
              <span class="sl-field__counter" aria-hidden="true"><span data-count>0</span><span>/180</span></span>
            </div>
            <p class="sl-field__helper" id="textarea-help" role="status" aria-live="polite">Add a short note for your team.</p>
          </div>`,css:H,mount:re.mount},"password-input":{markup:`<div class="sl-field sl-field--password" id="password-field" data-visible="false">
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
          </div>`,css:H,mount:de.mount},"code-input":{markup:`<div class="sl-field sl-field--code" id="code-field" data-length="0" data-complete="false" data-result="neutral">
            <label class="sl-code__label" for="demo-code">Verification code</label>
            <div class="sl-code__control">
              <input class="sl-code__input" id="demo-code" type="text" inputmode="numeric" autocomplete="one-time-code" data-code-length="6" pattern="[0-9]{6}" aria-describedby="code-help">
              <div class="sl-code__cells" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span><span></span></div>
            </div>
            <p class="sl-field__helper" id="code-help" role="status" aria-live="polite">Enter 482731 to see the accepted state.</p>
          </div>`,css:ce,mount:ue.mount}};var j={duration:{short2:{$type:"duration",$value:"100ms"},short4:{$type:"duration",$value:"200ms"},medium2:{$type:"duration",$value:"300ms"}},easing:{settle:{$type:"cubicBezier",$value:[.22,1,.36,1]}}};var J=new WeakMap;function z(e,m="",n=""){let i=document.createElement(e);return i.className=m,i.textContent=n,i}function Q(e){let m={user:"M16 7A4 4 0 1 1 8 7A4 4 0 1 1 16 7M4 21V19A8 8 0 0 1 20 19V21",shield:"M12 3L20 6V12C20 17 16 20 12 22C8 20 4 17 4 12V6ZM9 12L12 15L16 10",laptop:"M4 4H20V16H4ZM2 20H22M9 16L8 20M15 16L16 20",phone:"M7 2H17V22H7ZM11 18H13",key:"M13 8A5 5 0 1 1 3 8A5 5 0 1 1 13 8M13 8H22M18 8V12M21 8V11",link:"M9 15L15 9M8 12L6 14A4 4 0 0 0 12 20L15 17M16 12L18 10A4 4 0 0 0 12 4L9 7",mail:"M3 5H21V19H3ZM3 5L12 13L21 5",pin:"M19 10C19 15 12 22 12 22S5 15 5 10A7 7 0 1 1 19 10ZM15 10A3 3 0 1 1 9 10A3 3 0 1 1 15 10",right:"M5 12H19M14 7L19 12L14 17",close:"M6 6L18 18M18 6L6 18",plus:"M5 12H19M12 5V19",edit:"M4 20L5 15L17 3L21 7L9 19ZM14 6L18 10",eye:"M2 12Q12 1 22 12Q12 23 2 12ZM15 12A3 3 0 1 1 9 12A3 3 0 1 1 15 12",undo:"M5 10H14A5 5 0 0 1 14 20M5 10L10 5M5 10L10 15"},n=document.createElementNS("http://www.w3.org/2000/svg","svg");n.setAttribute("viewBox","0 0 24 24"),n.setAttribute("aria-hidden","true");let i=document.createElementNS(n.namespaceURI,"path");return i.setAttribute("d",m[e]||m.user),n.append(i),n}function K(e,{key:m,renderers:n,...i}){if(!n[m])throw new TypeError("Unknown account workflow");J.get(e)?.destroy();let l,r=[],f=null,p=()=>({}),C=!1,b=matchMedia("(prefers-reduced-motion:reduce)"),h=()=>{let g=e.getRootNode().activeElement;return g===e||e.contains(g)},y=!1,w=!0;function o(g,A){g?.isConnected&&(!y||w&&h())&&g.focus(A)}function t(g){g.parked&&requestAnimationFrame(()=>{let A=g.button;!C&&!f&&e.isConnected&&e.getRootNode().activeElement===e&&A?.isConnected&&!A.disabled&&!A.closest("[inert]")&&A.checkVisibility({checkVisibilityCSS:!0})&&A.focus({preventScroll:!0})})}function a(){if(!f)return;let g=f;f=null,g.abort.abort(),g.button?.removeAttribute("aria-busy"),g.button&&(g.button.disabled=g.wasDisabled),e.removeAttribute("aria-busy"),t(g)}function s(){a(),l?.abort(),r.forEach(g=>g()),r=[]}function d(){s(),l=new AbortController,e.replaceChildren(),e.className="account-control",e.dataset.kind=m,e.tabIndex=-1,e.setAttribute("role","group"),e.style.setProperty("--ac-fast",j.duration.short4.$value),e.style.setProperty("--ac-duration",j.duration.medium2.$value),e.style.setProperty("--ac-ease",`cubic-bezier(${j.easing.settle.$value.join(",")})`);let g=null,A=(v,x,k,_={})=>v.addEventListener(x,k,{..._,signal:g?AbortSignal.any([l.signal,g.signal]):l.signal}),q=z("p","ac-status",i.demo?"Local example. Changes are not sent to a server.":"Connect your application action handler to apply changes.");q.setAttribute("role","status"),q.setAttribute("aria-atomic","true");let T={root:e,options:i,el:z,glyph:Q,on:A,reduced:b,focus:o,signal:l.signal,cleanup:v=>r.push(v),say(v){q.textContent=v},emit(v){let x=structuredClone(v);i.onChange?.(x),e.dispatchEvent(new CustomEvent("sl:change",{bubbles:!0,detail:structuredClone(x)}))},title(v,x,k="user"){e.setAttribute("aria-label",v);let _=z("div","ac-heading"),S=z("span","ac-mark");S.append(Q(k)),_.append(S,z("h2","ac-title",v)),e.append(_,z("p","ac-hint ac-intro",x))},button(v,x,k="primary"){let _=z("span","ac-action"),S=_.attachShadow({mode:"open"}),R=z("style");R.textContent=Z.pair.css+":host{--sl-input-action:1;display:inline-flex;min-width:0;max-width:100%;font-family:'Segoe UI',sans-serif}.button-kit{--focus-ring:#eee;font-family:'Segoe UI',sans-serif;display:block;min-width:0;width:100%}.bk-button{width:auto;max-width:100%;height:44px;font:500 16px/1.4 'Segoe UI',sans-serif;letter-spacing:0;min-width:0;border-radius:11px;outline-offset:3px}.bk-surface{position:relative;min-height:44px;padding:10px 16px;color:#f4f4f4}.bk-label{position:relative;inset:auto;white-space:normal;overflow-wrap:anywhere;opacity:1;transition:none;gap:8px}.bk-button--cancel .bk-surface{background:#3c3c3c;color:#ddd}.bk-button--cancel:hover .bk-surface{background:#474747}.bk-button:disabled{opacity:.4;cursor:default}.bk-button:disabled .bk-surface,.bk-button[aria-busy=true] .bk-surface{transform:none!important}.bk-surface:before,.bk-surface:after{display:none}.bk-button[aria-busy=true]{cursor:progress}.bk-button--quiet .bk-surface{background:transparent;box-shadow:none;color:#c6c6c6;padding-inline:8px}.bk-button--small{font-size:14px;height:36px;border-radius:8px}.bk-button--small .bk-surface{min-height:36px;padding:7px 10px}.bk-button svg{width:17px;height:17px;fill:none;stroke:currentColor;stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round}.bk-button:focus-visible{outline:2px solid #eee}@media(prefers-reduced-motion:reduce){*{transition:none!important;animation:none!important}}",R.textContent+=G;let L=z("span","button-kit"),E=z("button",`bk-button bk-button--${k==="primary"?"save":k==="quiet"?"quiet":"cancel"} ${k==="small"?"bk-button--small":""}`),c=z("span","bk-surface"),M=z("span","bk-label",v);return E.type="button",c.append(M),E.append(c),L.append(E),S.append(R,L),A(E,"click",x),E.view=_,E.label=M,E},actions(...v){let x=z("div","ac-actions");return x.append(...v.map(k=>k.view||k)),x},field(v,x="",k="text-input"){let _=Z[k];if(!_)throw new Error(`Unknown field ${k}`);let S=z("div","ac-source"),R=S.attachShadow({mode:"open"});R.innerHTML=_.markup;let L=z("style");L.textContent=_.css+":host{display:block;min-width:0}.sl-field{width:100%;max-width:none;--field-ink:#222;--field-hover:#2c2c2c;--field-focus:#dedede;font-family:'Segoe UI',sans-serif;font-synthesis:none}.sl-field input,.sl-field textarea,.sl-field label,.sl-field button,.sl-code__label{font-family:'Segoe UI',sans-serif!important}.sl-field__input{font-size:16px!important}.sl-field__label{font-size:16px}.sl-field__helper,.sl-field__counter{display:none!important}.sl-field__control{margin:0}.sl-field.sl-field--textarea .sl-field__control{max-height:none}.sl-field textarea{resize:none;overflow:hidden!important}.sl-code__label{font-size:13px;color:#c6c6c6}.sl-code__control{margin-top:8px}.sl-field__reveal:focus-visible{outline-color:#eee}@media(prefers-reduced-motion:reduce){*{transition:none!important;animation:none!important}}",R.prepend(L);let E=R.querySelector(_.rootSelector||".sl-field"),c=R.querySelector("input,textarea"),M=R.querySelector(".sl-field__label,.sl-code__label");M.textContent=v,c.setAttribute("aria-label",v),c.removeAttribute("aria-describedby"),c.removeAttribute("required"),c.removeAttribute("maxlength"),c.value=x,c.defaultValue=x,c.autocomplete=k==="password-input"?"off":c.autocomplete;let N;if(k==="code-input"){let $=[...R.querySelectorAll(".sl-code__cells span")],D=()=>{c.value=c.value.replace(/\D/g,"").slice(0,6),E.dataset.result="neutral",E.dataset.length=String(c.value.length),E.dataset.complete=String(c.value.length===6),$.forEach((O,F)=>{O.textContent=c.value[F]||"",O.classList.toggle("is-filled",F<c.value.length),O.classList.toggle("is-active",R.activeElement===c&&F===Math.min(5,c.value.length))})};for(let O of["input","compositionend","focus","blur"])A(c,O,D);D(),N={reset(){c.value="",D()},destroy(){c.value="",$.forEach(O=>O.textContent="")}}}else N=_.mount(E);r.push(()=>{k==="password-input"&&(c.value=""),N.destroy()});let P=R.querySelector(".sl-field__reveal");if(P){let $=()=>P.setAttribute("aria-label",N.isVisible?"Hide password":"Show password");$(),A(P,"click",$)}if(c.tagName==="TEXTAREA"){let $=R.querySelector(".sl-field__control"),D=0,O=()=>{if(!S.getBoundingClientRect().width)return;c.style.height="0px";let V=Math.max(76,c.scrollHeight+2);c.style.height="100%",$.style.height=V+"px"};A(c,"input",O),A(c,"compositionend",O),A(window,"resize",O);let F=new ResizeObserver(()=>{let V=S.getBoundingClientRect().width;V!==D&&(D=V,O())});F.observe(S),r.push(()=>F.disconnect())}return{node:S,input:c,control:N}},listRow(v,x,k="key"){let _=z("div","ac-row"),S=z("span","ac-row-icon"),R=z("div","ac-row-copy"),L=z("strong","ac-row-name",v),E=z("span","ac-hint",x);return S.append(Q(k)),R.append(L,E),_.append(S,R),{node:_,copy:R,name:L,caption:E}},list(v,{animateInsert:x=!1}={}){let k=new Map,_=!1;return r.push(()=>{for(let S of k.values())S.scope?.abort(),clearTimeout(S.timer)}),(S,R)=>{let L=new Set(S.map(E=>E.id));for(let[E,c]of k)if(!L.has(E)&&c.node.dataset.removed!=="true"){c.node.dataset.removed="true",c.node.inert=!0,c.node.setAttribute("aria-hidden","true"),c.scope?.abort();let M=()=>{c.node.dataset.removed==="true"&&(c.node.remove(),k.delete(E))};b.matches?M():c.timer=setTimeout(M,parseFloat(j.duration.medium2.$value))}for(let E of S){let c=k.get(E.id),M=!c;if(!c){let P=z("div","ac-list-slot"),$=z("div","ac-list-slot-inner");P.dataset.id=E.id,P.append($),c={node:P,inner:$},k.set(E.id,c),v.append(P)}clearTimeout(c.timer),c.node.dataset.removed="false",c.node.inert=!1,c.node.removeAttribute("aria-hidden");let N=JSON.stringify(E);if(c.fingerprint!==N||!c.scope||c.scope.signal.aborted){c.scope?.abort(),c.scope=new AbortController;let P=g;g=c.scope;try{c.inner.replaceChildren(R(E)),c.fingerprint=N}finally{g=P}}M&&_&&x&&!b.matches&&(c.node.dataset.entering="true",c.node.getBoundingClientRect(),delete c.node.dataset.entering)}_=!0}},panels(v){let x=z("div","ac-panels"),k=0;return v.forEach((_,S)=>{_.classList.add("ac-pane"),_.dataset.active=String(S===0),_.inert=S!==0,_.setAttribute("aria-hidden",String(S!==0)),x.append(_)}),{node:x,select(_){_!==k&&(k=_,v.forEach((S,R)=>{S.dataset.active=String(R===_),S.inert=R!==_,S.setAttribute("aria-hidden",String(R!==_))}))}}},reveal(v){let x=z("div","ac-reveal"),k=z("div","ac-reveal-inner");return k.append(v),x.append(k),x.dataset.open="false",x.inert=!0,x.setAttribute("aria-hidden","true"),{node:x,set(_){x.dataset.open=String(_),x.inert=!_,x.setAttribute("aria-hidden",String(!_))}}},toggle(v,x,k){let _=z("label","ac-switch"),S=z("input"),R=z("span","ac-switch-track");return S.type="checkbox",S.checked=x,_.append(z("span","",v),S,R),A(S,"change",()=>k(S.checked)),{node:_,input:S}},async run(v,x,k,_){if(f||C)return!1;if(!i.demo&&typeof i.onAction!="function")return T.say("Connect an action handler. Data has not changed."),!1;let S={abort:new AbortController,button:_,wasDisabled:_?.disabled};f=S,_?.getRootNode().activeElement===_&&(e.focus({preventScroll:!0}),S.parked=e.getRootNode().activeElement===e),e.setAttribute("aria-busy","true"),_&&(_.disabled=!0,_.setAttribute("aria-busy","true")),T.say("Processing action\u2026 You can cancel.");try{let R=i.demo?{demo:!0}:await i.onAction({type:v,payload:x},{signal:S.abort.signal});if(f!==S||S.abort.signal.aborted)return!1;if(R===!1)throw new Error("Action rejected");w=h(),y=!0;try{k(R)}finally{y=!1}return T.say(i.demo?"Only the example changed. Nothing was sent to a server.":"The action handler completed."),!0}catch{return f===S&&!S.abort.signal.aborted&&T.say("The action failed. Your data is preserved. Try again."),!1}finally{f===S&&(f=null,e.removeAttribute("aria-busy"),_&&(_.disabled=S.wasDisabled,_.removeAttribute("aria-busy")),t(S))}},cancel(){a(),T.say("Action cancelled. Data has not changed.")}};A(b,"change",()=>{e.dataset.reduced=String(b.matches),b.matches&&e.getAnimations({subtree:!0}).forEach(v=>v.finish())}),e.dataset.reduced=String(b.matches),p=n[m](T)||(()=>({})),e.append(q),A(e,"keydown",v=>{v.key==="Escape"&&f&&(v.preventDefault(),T.cancel())})}d();let u={reset(){C||d()},cancel(){C||(a(),e.querySelector(".ac-status").textContent="Action cancelled. Data has not changed.")},destroy(){C||(C=!0,s(),e.replaceChildren(),J.delete(e))},get state(){return{key:m,destroyed:C,pending:!!f,...C?{}:p()}}};return J.set(e,u),u}function I(e){e.root.tabIndex=-1;let m=e.run.bind(e);e.run=async(...o)=>{let t=o[3],a=t?.getRootNode().activeElement===t,s=m(...o);a&&e.root.hasAttribute("aria-busy")&&e.root.focus({preventScroll:!0});let d=await s;return!e.signal.aborted&&a&&e.root.getRootNode().activeElement===e.root&&t?.isConnected&&!t.disabled&&t.focus({preventScroll:!0}),d};let n=new Map;e.cleanup(()=>{for(let o of n.values())o.cancel()});let i=()=>{e.root.hasAttribute("aria-busy")&&e.cancel()};function l(o,t=null){let a=Number(getComputedStyle(o).opacity)||1,s=n.has(o)?Math.max(.8,a):.9;if(n.get(o)?.cancel(),e.reduced.matches||!o.isConnected||o.closest("[inert]"))return;let d=o.getBoundingClientRect().height,u={opacity:s},g={opacity:1};t>0&&d>0&&Math.abs(t-d)>.5&&(u.height=t+"px",g.height=d+"px");let A=o.animate([u,g],{duration:parseFloat(j.duration.short4.$value),easing:`cubic-bezier(${j.easing.settle.$value.join(",")})`});n.set(o,A),A.finished.catch(()=>{}).finally(()=>{n.get(o)===A&&n.delete(o)})}function r(o,t){let a=o.isConnected&&!o.closest("[inert]")?o.getBoundingClientRect().height:null;o.replaceChildren(...t),l(o,a)}function f(o){let t=e.el("dl","as-details");return p(t,o,!1),t}function p(o,t,a=!0){let s=t.map(([d,u])=>{let g=e.el("div");return g.append(e.el("dt","",d),e.el("dd","",String(u))),g});a?r(o,s):o.replaceChildren(...s)}function C(o,t,a="user"){let s=e.listRow(o,t,a);return s.node.classList.add("as-card"),s}function b(o,t,a,s){let d=a,u=e.el("div","as-choice");u.setAttribute("role","group"),u.setAttribute("aria-label",o);let g=t.map(([q,T])=>{let v=e.el("button","as-choice-button",T);return v.type="button",v.setAttribute("aria-pressed",String(q===d)),e.on(v,"click",()=>{v.disabled||A(q,!0)}),e.on(v,"keydown",x=>{if(!["ArrowLeft","ArrowRight","Home","End"].includes(x.key))return;x.preventDefault();let k=g.filter(L=>!L.disabled);if(!k.length)return;let _=k.indexOf(v),S=x.key==="Home"?0:x.key==="End"?k.length-1:(_+(x.key==="ArrowRight"?1:-1)+k.length)%k.length,R=k[S];R.focus({preventScroll:!0}),A(t[g.indexOf(R)][0],!0)}),u.append(v),v});function A(q,T=!1){q!==d&&(i(),d=q,g.forEach((v,x)=>v.setAttribute("aria-pressed",String(t[x][0]===d))),T&&s(q))}return{node:u,set:A,get value(){return d}}}function h(o,t){let a=e.el("div","as-records"),s=new Map,d=e.el("p","ac-hint as-empty","No matching records.");a.setAttribute("role","group"),a.setAttribute("aria-label","Records");let u=null,g=[],A=!1;a.append(d);function q(v){g=v;for(let x of v){let k=s.get(x.id),_=!k;if(!k){let S=e.el("button","as-record"),R=e.el("strong"),L=e.el("span","ac-hint"),E=e.reveal(S);S.type="button",S.append(R,L),k={b:S,title:R,meta:L,reveal:E},s.set(x.id,k),a.append(E.node),e.on(S,"click",()=>{i(),T(x.id),t(g.find(c=>c.id===x.id))}),e.on(S,"keydown",c=>{if(!["ArrowUp","ArrowDown","Home","End"].includes(c.key))return;c.preventDefault();let M=[...s.values()].filter($=>!$.reveal.node.inert),N=M.indexOf(k),P=c.key==="Home"?0:c.key==="End"?M.length-1:(N+(c.key==="ArrowDown"?1:-1)+M.length)%M.length;M[P].b.focus({preventScroll:!0}),M[P].b.click()})}k.title.textContent=x.title,k.meta.textContent=x.meta,k.b.setAttribute("aria-label",`Open: ${x.title}`),k.b.setAttribute("aria-pressed",String(x.id===u)),_&&A&&!e.reduced.matches&&k.reveal.node.getBoundingClientRect(),k.reveal.set(!0)}for(let[x,k]of s)v.some(_=>_.id===x)||k.reveal.set(!1);d.hidden=!!v.length,A=!0}function T(v){u=v;for(let[x,k]of s)k.b.setAttribute("aria-pressed",String(x===v))}return q(o),{node:a,paint:q,set:T,focus(v){s.get(v)?.b.focus({preventScroll:!0})}}}function y(o){let t=e.reveal(o);return t.node.classList.add("as-drawer"),t}return{fade:l,replace:r,detail:f,setDetail:p,card:C,choice:b,records:h,drawer:y,cancel:i,mutationInputs:(...o)=>{for(let t of o)e.on(t.input,"input",i)}}}var ee={communications(e){let m=I(e);e.title("Messages to receive","Required security messages remain enabled.","mail");let n={orders:!0,updates:!0,ideas:!1,channel:"both",frequency:"instant"},i={...n},l=m.card("Account security","Required messages \xB7 always enabled","shield"),r=e.el("div","as-switches"),f=Object.entries({orders:"Order updates",updates:"Product updates",ideas:"Collections and tips"}).map(([o,t])=>{let a=e.toggle(t,i[o],s=>{m.cancel(),i[o]=s,w()});return r.append(a.node),{id:o,...a}}),p=m.choice("Message channel",[["email","Email"],["inbox","Account inbox"],["both","Both"]],"both",o=>{i.channel=o,w()}),C=m.choice("Message frequency",[["instant","Immediately"],["digest","Digest"]],"instant",o=>{i.frequency=o,w()}),b=e.el("p","ac-hint as-summary"),h=e.button("Apply",async()=>{let o={...i};await e.run("communications.save",o,()=>{n=o,e.emit({saved:{...n}})},h),w()}),y=e.button("Cancel",()=>{m.cancel(),i={...n},f.forEach(o=>o.input.checked=i[o.id]),p.set(i.channel),C.set(i.frequency),w()},"quiet");function w(){h.disabled=y.disabled=JSON.stringify(n)===JSON.stringify(i),b.textContent=i.frequency==="digest"?"Optional messages are collected into one digest.":"Receive messages for your selected topics and channels."}return e.root.append(l.node,r,e.el("h3","as-label","Where to receive"),p.node,e.el("h3","as-label","How often"),C.node,b,e.actions(h,y)),w(),()=>({saved:{...n},draft:{...i}})},security(e){let m=I(e);e.title("Security history","Review events and acknowledge familiar activity.","shield");let n=null,i="all",l=[{id:"entry",title:"New device sign-in",meta:"Today, 09:40 \xB7 Review needed",type:"entry",reviewed:!1,device:"Safari \xB7 iOS",place:"Novosibirsk"},{id:"password",title:"Password change",meta:"Yesterday, 18:12 \xB7 Confirmed",type:"change",reviewed:!0,device:"Edge \xB7 Windows 11",place:"Novosibirsk"},{id:"factor",title:"Protection enabled",meta:"October 12 \xB7 Confirmed",type:"change",reviewed:!0,device:"Edge \xB7 Windows 11",place:"Novosibirsk"}],r=e.el("div","as-flow"),f=e.el("h3","as-subtitle"),p=m.detail([]),C=m.drawer(r),b=m.records(l,a=>{n=a.id,w(),C.set(!0)}),h=e.button("This was me",async()=>{let a=n;await e.run("security.acknowledge",{id:a},()=>{let s=l.find(d=>d.id===a);s.reviewed=!0,s.meta="Today, 09:40 \xB7 Reviewed",o(),w(),e.emit({reviewed:l.filter(d=>d.reviewed).map(d=>d.id)})},h),h.disabled=l.find(s=>s.id===n)?.reviewed??!0}),y=e.button("Close",()=>{m.cancel(),C.set(!1),b.focus(n)},"quiet");function w(){let a=l.find(s=>s.id===n);a&&(f.textContent=a.title,m.setDetail(p,[["Device",a.device],["City",a.place],["Review",a.reviewed?"Event reviewed":"Confirm if this was you"]]),h.disabled=a.reviewed)}function o(){b.paint(l.filter(a=>i==="all"||a.type===i))}let t=m.choice("Event type",[["all","All"],["entry","Sign-ins"],["change","Changes"]],"all",a=>{i=a,C.set(!1),n=null,b.set(null),o()});return r.append(f,p,e.actions(h,y)),e.root.append(t.node,b.node,C.node,e.el("p","ac-hint as-footnote","These are fictional events, not your computer activity log.")),()=>({selected:n,filter:i,reviewed:l.filter(a=>a.reviewed).map(a=>a.id)})},recipient(e){let m=I(e);e.title("Document recipient","Recipient details, separate from your shipping address.","user");let n="person",i={type:"person",name:"Anna Smith",email:"anna@example.com",tax:""},l={person:{name:i.name,email:i.email,tax:""},company:{name:"Line Studio",email:"docs@example.com",tax:"0000000000"}},r=e.field("Recipient",i.name),f=e.field("Document email",i.email),p=e.field("Company tax ID",""),C=e.el("div","as-flow"),b=m.drawer(C),h=e.el("div","ac-fields");C.append(p.node),h.append(r.node,f.node,b.node);let y=()=>({name:r.input.value,email:f.input.value,tax:n==="company"?p.input.value:""}),w=m.choice("Recipient type",[["person","Individual"],["company","Company"]],"person",s=>{l[n]=y(),n=s;let d=l[n];r.input.value=d.name,f.input.value=d.email,p.input.value=d.tax,b.set(n==="company"),a()}),o=e.button("Save",async()=>{let s=y();if(!s.name.trim()){e.say("Enter the recipient name."),r.input.focus();return}let d={type:n,...s};await e.run("recipient.save",d,()=>{i={...d},l[n]={...s},e.emit({saved:{...i}})},o),a()}),t=e.button("Restore saved details",()=>{m.cancel(),n=i.type,w.set(n),r.input.value=i.name,f.input.value=i.email,p.input.value=i.tax,b.set(n==="company"),a()},"quiet");function a(){o.disabled=t.disabled=JSON.stringify(i)===JSON.stringify({type:n,...y()})}for(let s of[r,f,p])e.on(s.input,"input",()=>{m.cancel(),a()});return e.root.append(w.node,h,e.el("p","ac-hint as-footnote","Any values are accepted in this example. No legal validation is performed."),e.actions(o,t)),a(),()=>({mode:n,saved:{...i},draft:y()})}};function B(e){let m=0;for(let{unit:n,quantity:i}of e){if(!Number.isSafeInteger(n)||n<0||!Number.isSafeInteger(i)||i<0||!Number.isSafeInteger(n*i)||!Number.isSafeInteger(m+n*i))throw new TypeError("Expected safe nonnegative integer minor units");m+=n*i}return m}function Y(e){if(!Number.isSafeInteger(e)||e<0)throw new TypeError("Expected integer minor units");return new Intl.NumberFormat("en-GB",{style:"currency",currency:"RUB",maximumFractionDigits:2}).format(e/100)}var X=Object.freeze([{id:"order-a",title:"October 12 order",meta:"Received \xB7 2 items",lines:[{id:"notebook",title:"Notebook",unit:89e3,quantity:2},{id:"pen",title:"Pen",unit:32e3,quantity:1}],address:"12 Forest Street, Novosibirsk"},{id:"order-b",title:"October 5 order",meta:"Received \xB7 1 item",lines:[{id:"bag",title:"Bag",unit:249e3,quantity:1}],address:"8 Peace Street, Novosibirsk"}]),U=Object.freeze([{id:"invoice",title:"October invoice",type:"invoice",meta:"October 12 \xB7 Paid",lines:[{title:"Monthly subscription",unit:99e3,quantity:1}]},{id:"receipt",title:"Order receipt",type:"receipt",meta:"October 12 \xB7 Paid",lines:X[0].lines},{id:"previous",title:"September invoice",type:"invoice",meta:"September 12 \xB7 Paid",lines:[{title:"Monthly subscription",unit:99e3,quantity:1}]}]);var te={methods(e){let m=I(e);e.title("Payment methods","Masked examples only. No card numbers are entered.","key");let n=[{id:"personal",label:"Personal card",last4:"4821",primary:!0},{id:"reserve",label:"Backup card",last4:"9064",primary:!1}],i=0,l=null,r=e.el("div","as-methods"),f=e.list(r,{animateInsert:!0}),p=e.el("div","as-flow"),C=e.el("p","ac-note"),b=m.drawer(p),h=e.button("Add example",async()=>{await e.run("methods.add",{},t=>{let a=e.options.demo?{id:`sample-${++i}`,label:"Example card",last4:String(1e3+i)}:t?.method;if(!a||typeof a.id!="string"||!/^\d{4}$/.test(a.last4)||typeof a.label!="string"||n.some(s=>s.id===a.id))throw new TypeError("Expected a unique masked method");n.push({...a,primary:!1}),o(),e.emit({methods:n.map(s=>({...s}))})},h),h.disabled=n.length>=4},"secondary"),y=e.button("Remove method",async()=>{if(n.length<=1){e.say("Add another method before removing the last one.");return}let t=l;await e.run("methods.remove",{id:t},()=>{let a=n.find(s=>s.id===t)?.primary;n=n.filter(s=>s.id!==t),a&&(n[0].primary=!0),l=null,b.set(!1),o(),e.emit({methods:n.map(s=>({...s}))}),h.focus({preventScroll:!0})},y)}),w=e.button("Keep",()=>{m.cancel(),l=null,b.set(!1),h.focus({preventScroll:!0})},"quiet");p.append(C,e.actions(y,w));function o(){f(n.map(t=>({...t,last:n.length===1})),t=>{let a=m.card(t.label,`Card \u2022\u2022\u2022\u2022 ${t.last4}`,"key");a.node.append(e.el("span","as-method-status",t.primary?"Primary method":"Backup method"));let s=e.button("Make primary",async()=>{let u=t.id;await e.run("methods.primary",{id:u},()=>{n.forEach(g=>g.primary=g.id===u),o(),e.emit({methods:n.map(g=>({...g}))})},s)},"small"),d=e.button("Remove",()=>{m.cancel(),l=t.id,C.textContent=`Remove \u201C${t.label}\u201D \u2022\u2022\u2022\u2022 ${t.last4}?${t.primary?" Another method will become primary.":""}`,b.set(!0),y.focus({preventScroll:!0})},"small");return s.setAttribute("aria-label",`Primary: ${t.last4}`),d.setAttribute("aria-label",`Remove: ${t.last4}`),d.disabled=t.last,a.node.append(e.actions(...t.primary?[]:[s],d)),t.last&&a.node.append(e.el("p","ac-hint","Last method: add another one first.")),a.node}),h.disabled=n.length>=4}return e.root.append(r,e.actions(h),b.node,e.el("p","ac-hint as-footnote","The demo supports up to four methods. No payment is made.")),o(),()=>({methods:n.map(t=>({...t})),target:l})},documents(e){let m=I(e);e.title("Account documents","Invoices and receipts with itemized totals.","mail");let n=null,i="all",l=null,r=e.el("div","as-flow"),f=e.el("h3","as-subtitle"),p=e.el("div","as-line-items"),C=e.el("strong","as-amount"),b=e.el("p","ac-hint"),h=m.drawer(r),y=m.records(U,s=>{n=s.id,l=null,t(),h.set(!0)}),w=e.button("Retrieve document",async()=>{let s=n;await e.run("documents.retrieve",{id:s},()=>{l=s,b.textContent=e.options.demo?"Example only. No file is created or downloaded.":"Your handler completed retrieval.",e.emit({received:s})},w)}),o=e.button("Close",()=>{m.cancel(),h.set(!1),y.focus(n)},"quiet");function t(){let s=U.find(d=>d.id===n);f.textContent=s.title,m.replace(p,s.lines.map(d=>{let u=e.el("p");return u.append(e.el("span","",`${d.title} \xD7 ${d.quantity}`),e.el("strong","",Y(d.unit*d.quantity))),u})),C.textContent=Y(B(s.lines)),b.textContent="Sample document. No financial transaction is performed."}let a=m.choice("Document type",[["all","All"],["invoice","Invoices"],["receipt","Receipts"]],"all",s=>{i=s,n=null,y.set(null),h.set(!1),y.paint(U.filter(d=>i==="all"||d.type===i))});return r.append(f,p,C,b,e.actions(w,o)),e.root.append(a.node,y.node,h.node),()=>({selected:n,filter:i,received:l})},subscription(e){let m=I(e);e.title("Your subscription","Manage your existing subscription plan.","key");let n="month",i=null,l=!1,r="month",f=m.card("Studio plan","Active until November 12, 2026","key"),p=m.detail([]),C=e.el("p","ac-hint as-summary");f.node.append(p);let b=m.choice("Next period",[["month","Month"],["year","Year"]],"month",u=>{r=u,d()}),h=e.button("Schedule",async()=>{let u=r;await e.run("subscription.period",{period:u},()=>{i=u===n?null:u,d(),e.emit({period:n,scheduled:i,canceled:l})},h),d()}),y=e.button("Cancel change",async()=>{await e.run("subscription.period",{period:n},()=>{i=null,r=n,b.set(n),d(),e.emit({period:n,scheduled:i,canceled:l})},y),d()},"quiet"),w=e.el("div","as-flow"),o=m.drawer(w),t=e.button("Cancel renewal",async()=>{l?(await e.run("subscription.restore",{},()=>{l=!1,d(),e.emit({period:n,scheduled:i,canceled:l})},t),d()):(m.cancel(),o.set(!0),a.focus({preventScroll:!0}))},"secondary"),a=e.button("Do not renew",async()=>{await e.run("subscription.cancel",{},()=>{l=!0,i=null,o.set(!1),d(),e.emit({period:n,scheduled:i,canceled:l}),t.focus({preventScroll:!0})},a)}),s=e.button("Keep subscription",()=>{m.cancel(),o.set(!1),t.focus({preventScroll:!0})},"quiet");w.append(e.el("p","ac-note","Access continues until the paid period ends. The example does not renew a real subscription."),e.actions(a,s));function d(){m.setDetail(p,[["Current period",n==="month"?"Month":"Year"],["Renewal",l?"Not scheduled":"November 12, 2026"],["Period cost",Y(n==="month"?99e3:99e4)]]),C.textContent=l?"Demo renewal cancelled. Access remains until November 12.":i?`From the next period: ${i==="year"?"year \xB7 "+Y(99e4):"month \xB7 "+Y(99e3)}.`:"You can change the next period in advance.",h.disabled=l||r===(i??n),y.disabled=!i,t.label.textContent=l?"Restore renewal":"Cancel renewal"}return e.root.append(f.node,e.el("h3","as-label","From the next period"),b.node,C,e.actions(h,y),e.actions(t),o.node),d(),()=>({period:n,scheduled:i,canceled:l,draft:r})}};var ne={orders(e){let m=I(e);e.title("Your purchases","Review past orders and request a repeat.","user");let n=null,i=null,l=e.el("div","as-flow"),r=e.el("h3","as-subtitle"),f=e.el("div","as-line-items"),p=e.el("strong","as-amount"),C=e.el("p","ac-hint"),b=e.el("p","ac-hint as-summary"),h=m.drawer(l),y=m.records(X,t=>{n=t.id,r.textContent=t.title,m.replace(f,t.lines.map(a=>{let s=e.el("p");return s.append(e.el("span","",`${a.title} \xD7 ${a.quantity}`),e.el("strong","",Y(a.unit*a.quantity))),s})),p.textContent=Y(B(t.lines)),C.textContent=t.address,b.textContent="You can request this order again.",h.set(!0)}),w=e.button("Repeat order",async()=>{let t=n;await e.run("orders.repeat",{id:t},()=>{i=t,b.textContent=e.options.demo?"Items selected in the example. No new order was created.":"The repeat request was handled by your application.",e.emit({repeated:t})},w)}),o=e.button("Close",()=>{m.cancel(),h.set(!1),y.focus(n)},"quiet");return l.append(r,f,p,C,b,e.actions(w,o)),e.root.append(y.node,h.node),()=>({selected:n,repeated:i})},returns(e){let m=I(e);e.title("Return a purchase","Choose a purchased item and explain the reason.","undo");let n="notebook",i=1,l="fit",r=null,f=X[0].lines,p=m.detail([]),C=e.field("Comment","","textarea-input"),b=m.choice("Purchased item",f.map(s=>[s.id,s.title]),n,s=>{n=s;let d=f.find(u=>u.id===n).quantity;i>d&&(i=1,h.set("1")),a()}),h=m.choice("Return quantity",[["1","1 item"],["2","2 items"]],"1",s=>{i=Number(s),a()}),y=m.choice("Return reason",[["fit","Not suitable"],["defect","Defect"],["other","Other"]],"fit",s=>{l=s}),w=e.button("Prepare request",async()=>{let s=f.find(u=>u.id===n);if(i<1||i>s.quantity){e.say("Quantity cannot exceed the purchased amount.");return}let d={orderId:"order-a",item:n,quantity:i,reason:l,note:C.input.value};await e.run("returns.submit",d,u=>{r={...d,id:u?.id??"demo-return"},a(),e.emit({request:{...r}})},w),a()}),o=e.button("Cancel request",async()=>{let s=r?.id;s&&(await e.run("returns.withdraw",{id:s},()=>{r=null,a(),e.emit({request:null})},o),a())},"secondary"),t=m.drawer(e.actions(o));function a(){let s=f.find(d=>d.id===n);m.setDetail(p,[["Purchased",`${s.quantity} items`],["Example refund amount",Y(s.unit*i)],["Request",r?"Prepared in the example":"Not prepared yet"]]);for(let d of[b,h,y])for(let u of d.node.querySelectorAll("button"))u.disabled=!!r;h.node.querySelectorAll("button")[1].disabled=!!r||s.quantity<2,C.input.readOnly=!!r,w.disabled=!!r,t.set(!!r)}return m.mutationInputs(C),e.root.append(e.el("h3","as-label","From the October 12 order"),b.node,e.el("h3","as-label","Quantity"),h.node,p,e.el("h3","as-label","Reason"),y.node,C.node,e.actions(w),t.node,e.el("p","ac-hint as-footnote","No return or money transfer is performed.")),a(),()=>({item:n,quantity:i,reason:l,request:r?{...r}:null})}};var ae={tickets(e){let m=I(e);e.title("Support tickets","Reply to a ticket or start a new one.","mail");let n="delivery",i=!1,l=0,r=!1,f=[{id:"delivery",title:"Delivery question",meta:"Open \xB7 today",status:"open",messages:[{author:"You",text:"I would like to confirm the delivery time."},{author:"Support",text:"The courier will contact you before arrival."}]},{id:"billing",title:"September documents",meta:"Closed \xB7 October 12",status:"closed",messages:[{author:"You",text:"Where can I find the receipt?"},{author:"Support",text:"It is available in account documents."}]}],p=new Map,C=e.el("div","as-flow"),b=e.el("h3","as-subtitle"),h=e.el("div","as-conversation"),y=e.field("Ticket subject",""),w=e.el("div","as-flow"),o=m.drawer(w),t=e.field("Message","","textarea-input");w.append(y.node);function a(){r=!0;try{t.input.dispatchEvent(new Event("input"))}finally{r=!1}}let s=m.records(f,q=>{i=!1,n=q.id,t.input.value=p.get(n)??"",a(),A()}),d=e.button("New ticket",()=>{if(m.cancel(),i){y.input.focus({preventScroll:!0});return}i=!0,n=null,s.set(null),t.input.value=p.get("new")??"",a(),A(),y.input.focus({preventScroll:!0})},"secondary"),u=e.button("Send reply",async()=>{let q=t.input.value;if(!q.trim()||i&&!y.input.value.trim()){e.say("Enter a subject and message for a new ticket."),(q.trim()?y:t).input.focus();return}let T=n,v=i,x=y.input.value;await e.run(v?"tickets.create":"tickets.reply",v?{title:x,text:q}:{id:T,text:q},k=>{if(v){let _=k?.id??`demo-ticket-${++l}`;if(f.some(S=>S.id===_))throw new TypeError("Duplicate ticket");f.push({id:_,title:x,meta:"Open \xB7 just now",status:"open",messages:[{author:"You",text:q}]}),n=_,i=!1,y.input.value=""}else f.find(_=>_.id===T).messages.push({author:"You",text:q});p.delete(v?"new":T),t.input.value="",a(),A(),e.emit({selected:n,tickets:f.map(_=>({id:_.id,title:_.title,status:_.status,messages:_.messages.map(S=>({...S}))}))})},u),A()}),g=e.button("Close ticket",async()=>{let q=n,T=f.find(x=>x.id===q);if(!T)return;let v=T.status==="open"?"closed":"open";await e.run("tickets.status",{id:q,status:v},()=>{T.status=v,T.meta=v==="open"?"Open \xB7 just now":"Closed \xB7 just now",A(),e.emit({selected:n,status:v})},g),A()},"quiet");function A(){s.paint(f),s.set(n);let q=f.find(v=>v.id===n);b.textContent=i?"New ticket":q.title,o.set(i),h.hidden=i,m.replace(h,(q?.messages.slice(-2)??[]).map(v=>{let x=e.el("div","as-message");return x.append(e.el("span","as-message-author",v.author),e.el("p","",v.text)),x}));let T=!i&&q.status==="closed";t.input.readOnly=T,u.label.textContent=i?"Create ticket":"Send reply",u.disabled=T,g.view.hidden=i,g.label.textContent=T?"Reopen":"Close ticket"}return e.on(t.input,"input",()=>{r||(m.cancel(),p.set(i?"new":n,t.input.value))}),m.mutationInputs(y),C.append(b,h,o.node,t.node,e.actions(u,g)),e.root.append(s.node,e.actions(d),C,e.el("p","ac-hint as-footnote","Messages remain in this example. Nothing is sent to support.")),A(),()=>({selected:n,creating:i,tickets:f.map(q=>({id:q.id,title:q.title,status:q.status,messages:q.messages.map(T=>({...T}))}))})},exports(e){let m=I(e);e.title("Your data","Choose categories and prepare an export request.","user");let n="idle",i=null,l=!1,r=new Set(["profile","orders"]),f=e.el("div","as-switches"),p=m.detail([]),C=e.el("p","ac-hint as-summary"),b=[["profile","Profile data"],["orders","Purchase history"],["messages","Tickets and replies"]].map(([a,s])=>{let d=e.toggle(s,r.has(a),u=>{m.cancel(),u?r.add(a):r.delete(a),t()});return f.append(d.node),d}),h=e.button("Request export",async()=>{let a=[...r];await e.run("exports.request",{categories:a},s=>{n="pending",i=s?.id??"demo-export",l=!1,t(),e.emit({phase:n,categories:a})},h),t()}),y=e.button("Check readiness",async()=>{let a=i;await e.run("exports.refresh",{id:a},s=>{let d=e.options.demo?"ready":s?.phase;if(!["pending","ready"].includes(d))throw new TypeError("Expected pending or ready");n=d,t(),e.emit({phase:n,categories:[...r]})},y),t()},"secondary"),w=e.button("Cancel request",async()=>{let a=i;await e.run("exports.cancel",{id:a},()=>{n="canceled",t(),e.emit({phase:n})},w),t()},"quiet"),o=e.button("Retrieve export",async()=>{let a=i;await e.run("exports.retrieve",{id:a},()=>{l=!0,t(),e.emit({phase:n,received:!0})},o),t()});function t(){let a=n==="pending"||n==="ready";b.forEach(s=>s.input.disabled=a),h.disabled=!r.size||a,h.label.textContent=n==="canceled"?"Request again":"Request export",y.view.hidden=n!=="pending",w.view.hidden=n!=="pending",o.view.hidden=n!=="ready",m.setDetail(p,[["Request",{idle:"Not created",pending:"Preparing",ready:e.options.demo?"Ready in the example":"Ready to retrieve",canceled:"Cancelled"}[n]],["Contents",`${r.size} ${r.size===1?"section":(r.size,"sections")}`]]),C.textContent=l?e.options.demo?"No file is created or downloaded in this example.":"Your application handled retrieval.":e.options.demo?"Demo: use the button to mark ready. No server or background download.":"Your application handler confirms readiness."}return e.root.append(f,p,C,e.actions(h,y,w,o)),t(),()=>({phase:n,requestId:i,categories:[...r],received:l})}};var W=new WeakMap;function ie(e,m,n){W.get(e)?.destroy();let i=!1,l=document.createElement("div");e.replaceChildren(l),e.classList.add("sl-component"),e.dataset.kind="inputs-account-services-recipient-v11";let r=K(l,{...m,key:"recipient",renderers:{...ee,...te,...ne,...ae},demo:n}),f={reset(){i||r.reset()},cancel(){i||r.cancel()},destroy(){i||(i=!0,r.destroy(),W.get(e)===f&&(e.replaceChildren(),W.delete(e)))},get state(){return r.state}};return W.set(e,f),f}function fe(e,m={}){return ie(e,m,!1)}function me(e){return ie(e,{},!0)}window.SLComponent={mount:fe,mountPreview:me};})();
