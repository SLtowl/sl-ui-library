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

`,oe=(()=>{let e={"short-2":100,"short-4":200,"medium-3":350,"medium-4":400,"long-4":600},b={linear:"cubic-bezier(0,0,1,1)","ease-in-out-gentle":"cubic-bezier(0.4,0,0.2,1)"},n=new WeakMap;function a(r,{onSave:d,onCancel:m=()=>{},previewDuration:f=0,confirmationMs:A=1400}={}){if(n.has(r))return n.get(r);let h=r.querySelector('[data-action="save"]'),g=r.querySelector('[data-action="cancel"]'),y=h?.querySelector(".bk-progress"),x=g?.querySelector(".bk-wash"),s=r.querySelector("[data-feedback]");if(h&&typeof d!="function")throw new TypeError("Pass your async onSave function.");let t=matchMedia("(prefers-reduced-motion: reduce)"),i=new AbortController,o=new Map,c=new Set,l,p,_,E,R,v=!1;function w(u,M,L){u&&(u===h&&u.dataset.state!==M&&(u.dataset.transition=u.dataset.state==="saved"&&M==="idle"?"return":"default"),u.dataset.state=M,u.setAttribute("aria-label",L))}function S(u){s&&(s.textContent=u)}function k(){h?.setAttribute("aria-disabled","false"),h?.setAttribute("aria-busy","false")}function C(u=!1){if(!y)return;let M=u&&!t.matches&&E?getComputedStyle(y):null,L=M?.transform||"none",P=M?Number(M.opacity):0,$=L==="none"?0:new DOMMatrixReadOnly(L).a;if(u&&!t.matches&&$>.001&&P>0){let D=y.cloneNode(!1);D.classList.add("bk-retiring"),D.style.transform=L,D.style.opacity=String(P),y.before(D);let O=D.animate([{opacity:P},{opacity:0}],{duration:h.dataset.transition==="return"?e["long-4"]:e["medium-4"],easing:b["ease-in-out-gentle"],fill:"forwards"});o.set(D,O),O.onfinish=()=>{D.remove(),o.delete(D),O.cancel()}}if(E?.cancel(),E=null,!u||t.matches){for(let[D,O]of o)O.cancel(),D.remove();o.clear()}}async function T(){if(v||h.disabled||h.getAttribute("aria-disabled")==="true")return;clearTimeout(p),clearTimeout(_),R?.cancel(),w(g,"idle","Cancel"),C(!0);let u=new AbortController;if(l=u,w(h,"saving","Saving changes"),h.setAttribute("aria-disabled","true"),h.setAttribute("aria-busy","true"),S("Saving changes."),!t.matches&&f>e["short-4"]){let M=e["short-4"]/f;E=y.animate([{transform:"scaleX(0)",opacity:0},{transform:`scaleX(${M})`,opacity:1,offset:M},{transform:"scaleX(1)",opacity:1}],{duration:f,easing:b.linear,fill:"forwards"})}try{if(await d({signal:u.signal}),l!==u||u.signal.aborted)return;l=null,!E&&!t.matches&&(E=y.animate([{transform:"scaleX(1)",opacity:0},{transform:"scaleX(1)",opacity:1}],{duration:e["medium-3"],easing:b["ease-in-out-gentle"],fill:"forwards"})),w(h,"saved","Changes saved"),h.setAttribute("aria-busy","false"),S("Changes saved."),p=setTimeout(()=>{w(h,"idle","Save changes"),k(),C(!0)},A)}catch(M){if(l!==u)return;l=null,w(h,"idle","Save changes"),k(),C(!0),S(M?.name==="AbortError"?"Saving cancelled.":"Could not save. Please try again.")}}function N(){if(v||g.disabled||g.getAttribute("aria-disabled")==="true")return;let u=!!l;if(l?.abort(),l=null,clearTimeout(p),clearTimeout(_),w(h,"idle","Save changes"),k(),C(!0),w(g,"cancelled","Cancelled"),R?.cancel(),x&&!t.matches){R=x.animate([{opacity:0},{opacity:.35,offset:.5},{opacity:0}],{duration:e["medium-4"],easing:b["ease-in-out-gentle"]});let M=R;M.onfinish=()=>{R===M&&(R=null),M.cancel()}}S(u?"Saving cancelled.":"Cancelled."),_=setTimeout(()=>w(g,"idle","Cancel"),A),m({wasSaving:u})}h?.addEventListener("click",T,{signal:i.signal}),g?.addEventListener("click",N,{signal:i.signal});for(let u of[h,g].filter(Boolean))u.disabled=!1,u.addEventListener("keydown",M=>{if(M.key!=="Enter"||M.repeat||u.getAttribute("aria-disabled")==="true")return;u.classList.add("is-pressed");let L=setTimeout(()=>{u.classList.remove("is-pressed"),c.delete(L)},e["short-2"]);c.add(L)},{signal:i.signal}),u.addEventListener("blur",()=>u.classList.remove("is-pressed"),{signal:i.signal});t.addEventListener("change",()=>{t.matches&&(C(),R?.cancel())},{signal:i.signal});let q={destroy(){if(!v){v=!0,i.abort(),l?.abort(),l=null,clearTimeout(p),clearTimeout(_),c.forEach(clearTimeout),c.clear(),C(),R?.cancel();for(let u of[h,g].filter(Boolean))u.classList.remove("is-pressed"),u.disabled=!0;n.delete(r)}}};return n.set(r,q),q}return{mount:a}})(),H=`
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
`,le=(()=>{let e=new WeakMap,b=0;function n(r,d,m=()=>({})){if(e.has(r))return e.get(r);let f=r?.querySelector("input, textarea"),A=f?.tagName==="TEXTAREA"?"textarea":f?.type;if(!f||A!==d)throw new TypeError(`A native ${d} control is required.`);let h=r.ownerDocument,g=h.defaultView,y=new g.AbortController,x=[],s=[],t=!1,i=(l,p,_,E={})=>l.addEventListener(p,_,{...E,signal:y.signal}),o=m({root:r,input:f,doc:h,view:g,on:i,resets:x,cleanups:s,alive:()=>!t});f.form&&i(f.form,"reset",l=>queueMicrotask(()=>{!t&&!l.defaultPrevented&&x.forEach(p=>p())}));let c={reset(){t||(f.value=f.defaultValue,x.forEach(l=>l()))},destroy(){t||(t=!0,y.abort(),s.forEach(l=>l()),e.delete(r))}};return Object.defineProperties(c,Object.getOwnPropertyDescriptors(o)),e.set(r,c),c}function a(r){return n(r,"text")}return{mount:a}})(),re=(()=>{let e=new WeakMap,b=0;function n(r,d,m=()=>({})){if(e.has(r))return e.get(r);let f=r?.querySelector("input, textarea"),A=f?.tagName==="TEXTAREA"?"textarea":f?.type;if(!f||A!==d)throw new TypeError(`A native ${d} control is required.`);let h=r.ownerDocument,g=h.defaultView,y=new g.AbortController,x=[],s=[],t=!1,i=(l,p,_,E={})=>l.addEventListener(p,_,{...E,signal:y.signal}),o=m({root:r,input:f,doc:h,view:g,on:i,resets:x,cleanups:s,alive:()=>!t});f.form&&i(f.form,"reset",l=>queueMicrotask(()=>{!t&&!l.defaultPrevented&&x.forEach(p=>p())}));let c={reset(){t||(f.value=f.defaultValue,x.forEach(l=>l()))},destroy(){t||(t=!0,y.abort(),s.forEach(l=>l()),e.delete(r))}};return Object.defineProperties(c,Object.getOwnPropertyDescriptors(o)),e.set(r,c),c}function a(r){return n(r,"textarea",({input:d,root:m,view:f,on:A,resets:h,cleanups:g})=>{let y=m.querySelector(".sl-field__control"),x=m.querySelector("[data-count]"),s=m.querySelector(".sl-field__helper");if(!y||!x||!s)throw new TypeError("Textarea needs a control, counter and helper.");let t=s.textContent,i=d.maxLength>0?d.maxLength:null;function o(){d.style.height="0px";let l=d.scrollHeight,p=d.value?Math.max(60,Math.min(180,l)):60;d.style.height="100%",d.style.overflowY=l>180?"auto":"hidden",y.style.height=`${p}px`}function c(){let l=[...d.value].length;x.textContent=String(l),s.textContent=i&&l>=i?`Character limit reached: ${i}.`:t,o()}return A(d,"input",l=>{l.isComposing||c()}),A(d,"compositionend",()=>c()),A(f,"resize",o),h.push(c),g.push(()=>{y.style.removeProperty("height"),d.style.removeProperty("height"),d.style.removeProperty("overflow-y")}),c(),{get length(){return[...d.value].length}}})}return{mount:a}})(),de=(()=>{let e=new WeakMap,b=0;function n(r,d,m=()=>({})){if(e.has(r))return e.get(r);let f=r?.querySelector("input, textarea"),A=f?.tagName==="TEXTAREA"?"textarea":f?.type;if(!f||A!==d)throw new TypeError(`A native ${d} control is required.`);let h=r.ownerDocument,g=h.defaultView,y=new g.AbortController,x=[],s=[],t=!1,i=(l,p,_,E={})=>l.addEventListener(p,_,{...E,signal:y.signal}),o=m({root:r,input:f,doc:h,view:g,on:i,resets:x,cleanups:s,alive:()=>!t});f.form&&i(f.form,"reset",l=>queueMicrotask(()=>{!t&&!l.defaultPrevented&&x.forEach(p=>p())}));let c={reset(){t||(f.value=f.defaultValue,x.forEach(l=>l()))},destroy(){t||(t=!0,y.abort(),s.forEach(l=>l()),e.delete(r))}};return Object.defineProperties(c,Object.getOwnPropertyDescriptors(o)),e.set(r,c),c}function a(r){return n(r,"password",({root:d,input:m,doc:f,on:A,resets:h,cleanups:g,alive:y})=>{let x=d.querySelector(".sl-field__reveal");if(!x)throw new TypeError("Password needs its reveal button.");let s=!1;function t(i){if(!y())return;let o=f.activeElement===m||d.getRootNode().activeElement===m,c=m.selectionStart,l=m.selectionEnd,p=m.selectionDirection,_=m.scrollLeft;s=!!i,m.type=s?"text":"password",d.dataset.visible=String(s),x.setAttribute("aria-pressed",String(s)),x.setAttribute("aria-label",s?"Hide password":"Show password"),o&&m.focus({preventScroll:!0}),c!==null&&l!==null&&m.setSelectionRange(c,l,p),m.scrollLeft=_}return A(x,"pointerdown",i=>{i.button===0&&(f.activeElement===m||d.getRootNode().activeElement===m)&&i.preventDefault()}),A(x,"click",()=>{m.disabled||t(!s)}),x.disabled=m.disabled,h.push(()=>t(!1)),g.push(()=>{s=!1,m.type="password",d.dataset.visible="false",x.setAttribute("aria-pressed","false"),x.setAttribute("aria-label","Show password"),x.disabled=!0}),{setVisible:t,get isVisible(){return s}}})}return{mount:a}})(),ce=(()=>{let e=new WeakMap,b=0;function n(r,d,m=()=>({})){if(e.has(r))return e.get(r);let f=r?.querySelector("input, textarea"),A=f?.tagName==="TEXTAREA"?"textarea":f?.type;if(!f||A!==d)throw new TypeError(`A native ${d} control is required.`);let h=r.ownerDocument,g=h.defaultView,y=new g.AbortController,x=[],s=[],t=!1,i=(l,p,_,E={})=>l.addEventListener(p,_,{...E,signal:y.signal}),o=m({root:r,input:f,doc:h,view:g,on:i,resets:x,cleanups:s,alive:()=>!t});f.form&&i(f.form,"reset",l=>queueMicrotask(()=>{!t&&!l.defaultPrevented&&x.forEach(p=>p())}));let c={reset(){t||(f.value=f.defaultValue,x.forEach(l=>l()))},destroy(){t||(t=!0,y.abort(),s.forEach(l=>l()),e.delete(r))}};return Object.defineProperties(c,Object.getOwnPropertyDescriptors(o)),e.set(r,c),c}function a(r,{expectedCode:d="482731"}={}){if(!/^\d{6}$/.test(d))throw new TypeError("Expected code must contain exactly six digits.");return n(r,"text",({root:m,input:f,view:A,on:h,resets:g,cleanups:y})=>{let x=m.querySelector(".sl-code__cells"),s=m.querySelector(".sl-code__control"),t=[...m.querySelectorAll(".sl-code__cells span")],i=m.querySelector(".sl-field__helper");if(!x||!s||t.length!==6||!i)throw new TypeError("Verification code needs six cells and a helper.");let o=i.textContent,c=A.matchMedia("(prefers-reduced-motion: reduce)"),l=new Map,p=new Set,_=null,E=0,R="";function v(){l.forEach(N=>N.cancel()),l.clear()}function w(){p.forEach(N=>N.cancel()),p.clear(),_?.cancel(),_=null}function S(){v(),w()}function k(N){l.get(N)?.cancel();let q=N.animate([{transform:"translateY(3px) scale(.9)",opacity:.55},{transform:"translateY(0) scale(1)",opacity:1}],{duration:300,easing:"cubic-bezier(.2,.7,.25,1)"});l.set(N,q),q.onfinish=()=>{l.get(N)===q&&(q.cancel(),l.delete(N))}}function C(N){if(S(),m.dataset.result=N?"success":"error",c.matches)return;let q=N?{color:"#eaf8ef",borderColor:"#4f8d72",backgroundColor:"#234b3a",boxShadow:"inset 0 1px rgba(255,255,255,.09), 0 0 0 2px rgba(79,141,114,.09)",transform:"translateY(-2px)"}:{color:"#fff0f0",borderColor:"#a85e63",backgroundColor:"#543134",boxShadow:"inset 0 1px rgba(255,255,255,.07), 0 0 0 2px rgba(168,94,99,.08)",transform:"translateY(1px)"};t.forEach((u,M)=>{let L=u.animate([{color:"#f9f9f9",borderColor:"rgba(0,0,0,0)",backgroundColor:"#222222",boxShadow:"inset 0 1px rgba(255,255,255,.07), 0 1px 2px rgba(0,0,0,.05)",transform:"translateY(0)"},q],{duration:360,delay:M*95,easing:"cubic-bezier(.4,0,.2,1)",fill:"both"});p.add(L),M===t.length-1&&(L.onfinish=()=>{if(!p.has(L))return;p.forEach($=>$.cancel()),p.clear(),_=x.animate([{transform:"scale(1)"},{transform:"scale(1.018)",offset:.45},{transform:"scale(1)"}],{duration:340,easing:"cubic-bezier(.2,.7,.25,1)"});let P=_;P.onfinish=()=>{_===P&&(P.cancel(),_=null)}})})}function T(N=!0){let q=f.value.replace(/\D/g,"").slice(0,t.length);f.value!==q&&(f.value=q);let u=f.matches(":focus");t.forEach((P,$)=>{P.textContent=q[$]||"",P.classList.toggle("is-filled",$<q.length),P.classList.toggle("is-active",u&&$===Math.min(q.length,t.length-1)&&q.length<t.length)}),m.dataset.length=String(q.length),m.dataset.complete=String(q.length===t.length);let M=q.length===t.length,L=M&&q===d;M?q!==R&&(N?C(L):(S(),m.dataset.result=L?"success":"error")):(m.dataset.result!=="neutral"&&S(),m.dataset.result="neutral"),f.setCustomValidity(M&&!L?"Code does not match.":""),M?f.setAttribute("aria-invalid",String(!L)):f.removeAttribute("aria-invalid"),i.textContent=q.length===0?o:M?L?"Code accepted.":`Code does not match. Try ${d}.`:`${q.length} of ${t.length} digits entered.`,N&&!M&&q.length>E&&!c.matches&&k(t[q.length-1]),M&&q!==R&&f.dispatchEvent(new A.CustomEvent("codecomplete",{bubbles:!0,composed:!0,detail:{code:q,valid:L}})),R=q,E=q.length}return h(f,"input",N=>{N.isComposing||T()}),h(f,"compositionend",()=>T()),h(f,"focus",()=>T(!1)),h(f,"blur",()=>T(!1)),h(c,"change",()=>{c.matches&&S()}),g.push(()=>{S(),E=0,R="",T(!1)}),y.push(S),T(!1),{validate:()=>(T(!1),f.value===d),get code(){return f.value},get complete(){return f.value.length===t.length}}})}return{mount:a}})(),Z={pair:{markup:`<div class="button-kit">
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
          </div>`,css:H,mount:ce.mount}};var j={duration:{short2:{$type:"duration",$value:"100ms"},short4:{$type:"duration",$value:"200ms"},medium2:{$type:"duration",$value:"300ms"}},easing:{settle:{$type:"cubicBezier",$value:[.22,1,.36,1]}}};var J=new WeakMap;function z(e,b="",n=""){let a=document.createElement(e);return a.className=b,a.textContent=n,a}function Q(e){let b={user:"M16 7A4 4 0 1 1 8 7A4 4 0 1 1 16 7M4 21V19A8 8 0 0 1 20 19V21",shield:"M12 3L20 6V12C20 17 16 20 12 22C8 20 4 17 4 12V6ZM9 12L12 15L16 10",laptop:"M4 4H20V16H4ZM2 20H22M9 16L8 20M15 16L16 20",phone:"M7 2H17V22H7ZM11 18H13",key:"M13 8A5 5 0 1 1 3 8A5 5 0 1 1 13 8M13 8H22M18 8V12M21 8V11",link:"M9 15L15 9M8 12L6 14A4 4 0 0 0 12 20L15 17M16 12L18 10A4 4 0 0 0 12 4L9 7",mail:"M3 5H21V19H3ZM3 5L12 13L21 5",pin:"M19 10C19 15 12 22 12 22S5 15 5 10A7 7 0 1 1 19 10ZM15 10A3 3 0 1 1 9 10A3 3 0 1 1 15 10",right:"M5 12H19M14 7L19 12L14 17",close:"M6 6L18 18M18 6L6 18",plus:"M5 12H19M12 5V19",edit:"M4 20L5 15L17 3L21 7L9 19ZM14 6L18 10",eye:"M2 12Q12 1 22 12Q12 23 2 12ZM15 12A3 3 0 1 1 9 12A3 3 0 1 1 15 12",undo:"M5 10H14A5 5 0 0 1 14 20M5 10L10 5M5 10L10 15"},n=document.createElementNS("http://www.w3.org/2000/svg","svg");n.setAttribute("viewBox","0 0 24 24"),n.setAttribute("aria-hidden","true");let a=document.createElementNS(n.namespaceURI,"path");return a.setAttribute("d",b[e]||b.user),n.append(a),n}function K(e,{key:b,renderers:n,...a}){if(!n[b])throw new TypeError("Unknown account workflow");J.get(e)?.destroy();let r,d=[],m=null,f=()=>({}),A=!1,h=matchMedia("(prefers-reduced-motion:reduce)"),g=()=>{let p=e.getRootNode().activeElement;return p===e||e.contains(p)},y=!1,x=!0;function s(p,_){p?.isConnected&&(!y||x&&g())&&p.focus(_)}function t(p){p.parked&&requestAnimationFrame(()=>{let _=p.button;!A&&!m&&e.isConnected&&e.getRootNode().activeElement===e&&_?.isConnected&&!_.disabled&&!_.closest("[inert]")&&_.checkVisibility({checkVisibilityCSS:!0})&&_.focus({preventScroll:!0})})}function i(){if(!m)return;let p=m;m=null,p.abort.abort(),p.button?.removeAttribute("aria-busy"),p.button&&(p.button.disabled=p.wasDisabled),e.removeAttribute("aria-busy"),t(p)}function o(){i(),r?.abort(),d.forEach(p=>p()),d=[]}function c(){o(),r=new AbortController,e.replaceChildren(),e.className="account-control",e.dataset.kind=b,e.tabIndex=-1,e.setAttribute("role","group"),e.style.setProperty("--ac-fast",j.duration.short4.$value),e.style.setProperty("--ac-duration",j.duration.medium2.$value),e.style.setProperty("--ac-ease",`cubic-bezier(${j.easing.settle.$value.join(",")})`);let p=null,_=(v,w,S,k={})=>v.addEventListener(w,S,{...k,signal:p?AbortSignal.any([r.signal,p.signal]):r.signal}),E=z("p","ac-status",a.demo?"Local example. Changes are not sent to a server.":"Connect your application action handler to apply changes.");E.setAttribute("role","status"),E.setAttribute("aria-atomic","true");let R={root:e,options:a,el:z,glyph:Q,on:_,reduced:h,focus:s,signal:r.signal,cleanup:v=>d.push(v),say(v){E.textContent=v},emit(v){let w=structuredClone(v);a.onChange?.(w),e.dispatchEvent(new CustomEvent("sl:change",{bubbles:!0,detail:structuredClone(w)}))},title(v,w,S="user"){e.setAttribute("aria-label",v);let k=z("div","ac-heading"),C=z("span","ac-mark");C.append(Q(S)),k.append(C,z("h2","ac-title",v)),e.append(k,z("p","ac-hint ac-intro",w))},button(v,w,S="primary"){let k=z("span","ac-action"),C=k.attachShadow({mode:"open"}),T=z("style");T.textContent=Z.pair.css+":host{display:inline-flex;min-width:0;max-width:100%;font-family:'Segoe UI',sans-serif}.button-kit{--focus-ring:#eee;font-family:'Segoe UI',sans-serif;display:block;min-width:0;width:100%}.bk-button{width:auto;max-width:100%;height:44px;font:500 16px/1.4 'Segoe UI',sans-serif;letter-spacing:0;min-width:0;border-radius:11px;outline-offset:3px}.bk-surface{position:relative;min-height:44px;padding:10px 16px;color:#f4f4f4}.bk-label{position:relative;inset:auto;white-space:normal;overflow-wrap:anywhere;opacity:1;transition:none;gap:8px}.bk-button--cancel .bk-surface{background:#3c3c3c;color:#ddd}.bk-button--cancel:hover .bk-surface{background:#474747}.bk-button:disabled{opacity:.4;cursor:default}.bk-button:disabled .bk-surface,.bk-button[aria-busy=true] .bk-surface{transform:none!important}.bk-surface:before,.bk-surface:after{display:none}.bk-button[aria-busy=true]{cursor:progress}.bk-button--quiet .bk-surface{background:transparent;box-shadow:none;color:#c6c6c6;padding-inline:8px}.bk-button--small{font-size:14px;height:36px;border-radius:8px}.bk-button--small .bk-surface{min-height:36px;padding:7px 10px}.bk-button svg{width:17px;height:17px;fill:none;stroke:currentColor;stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round}.bk-button:focus-visible{outline:2px solid #eee}@media(prefers-reduced-motion:reduce){*{transition:none!important;animation:none!important}}",T.textContent+=G;let N=z("span","button-kit"),q=z("button",`bk-button bk-button--${S==="primary"?"save":S==="quiet"?"quiet":"cancel"} ${S==="small"?"bk-button--small":""}`),u=z("span","bk-surface"),M=z("span","bk-label",v);return q.type="button",u.append(M),q.append(u),N.append(q),C.append(T,N),_(q,"click",w),q.view=k,q.label=M,q},actions(...v){let w=z("div","ac-actions");return w.append(...v.map(S=>S.view||S)),w},field(v,w="",S="text-input"){let k=Z[S];if(!k)throw new Error(`Unknown field ${S}`);let C=z("div","ac-source"),T=C.attachShadow({mode:"open"});T.innerHTML=k.markup;let N=z("style");N.textContent=k.css+":host{display:block;min-width:0}.sl-field{width:100%;max-width:none;--field-ink:#222;--field-hover:#2c2c2c;--field-focus:#dedede;font-family:'Segoe UI',sans-serif;font-synthesis:none}.sl-field input,.sl-field textarea,.sl-field label,.sl-field button,.sl-code__label{font-family:'Segoe UI',sans-serif!important}.sl-field__input{font-size:16px!important}.sl-field__label{font-size:16px}.sl-field__helper,.sl-field__counter{display:none!important}.sl-field__control{margin:0}.sl-field.sl-field--textarea .sl-field__control{max-height:none}.sl-field textarea{resize:none;overflow:hidden!important}.sl-code__label{font-size:13px;color:#c6c6c6}.sl-code__control{margin-top:8px}.sl-field__reveal:focus-visible{outline-color:#eee}@media(prefers-reduced-motion:reduce){*{transition:none!important;animation:none!important}}",T.prepend(N);let q=T.querySelector(k.rootSelector||".sl-field"),u=T.querySelector("input,textarea"),M=T.querySelector(".sl-field__label,.sl-code__label");M.textContent=v,u.setAttribute("aria-label",v),u.removeAttribute("aria-describedby"),u.removeAttribute("required"),u.removeAttribute("maxlength"),u.value=w,u.defaultValue=w,u.autocomplete=S==="password-input"?"off":u.autocomplete;let L;if(S==="code-input"){let $=[...T.querySelectorAll(".sl-code__cells span")],D=()=>{u.value=u.value.replace(/\D/g,"").slice(0,6),q.dataset.result="neutral",q.dataset.length=String(u.value.length),q.dataset.complete=String(u.value.length===6),$.forEach((O,F)=>{O.textContent=u.value[F]||"",O.classList.toggle("is-filled",F<u.value.length),O.classList.toggle("is-active",T.activeElement===u&&F===Math.min(5,u.value.length))})};for(let O of["input","compositionend","focus","blur"])_(u,O,D);D(),L={reset(){u.value="",D()},destroy(){u.value="",$.forEach(O=>O.textContent="")}}}else L=k.mount(q);d.push(()=>{S==="password-input"&&(u.value=""),L.destroy()});let P=T.querySelector(".sl-field__reveal");if(P){let $=()=>P.setAttribute("aria-label",L.isVisible?"Hide password":"Show password");$(),_(P,"click",$)}if(u.tagName==="TEXTAREA"){let $=T.querySelector(".sl-field__control"),D=0,O=()=>{if(!C.getBoundingClientRect().width)return;u.style.height="0px";let V=Math.max(76,u.scrollHeight+2);u.style.height="100%",$.style.height=V+"px"};_(u,"input",O),_(u,"compositionend",O),_(window,"resize",O);let F=new ResizeObserver(()=>{let V=C.getBoundingClientRect().width;V!==D&&(D=V,O())});F.observe(C),d.push(()=>F.disconnect())}return{node:C,input:u,control:L}},listRow(v,w,S="key"){let k=z("div","ac-row"),C=z("span","ac-row-icon"),T=z("div","ac-row-copy"),N=z("strong","ac-row-name",v),q=z("span","ac-hint",w);return C.append(Q(S)),T.append(N,q),k.append(C,T),{node:k,copy:T,name:N,caption:q}},list(v,{animateInsert:w=!1}={}){let S=new Map,k=!1;return d.push(()=>{for(let C of S.values())C.scope?.abort(),clearTimeout(C.timer)}),(C,T)=>{let N=new Set(C.map(q=>q.id));for(let[q,u]of S)if(!N.has(q)&&u.node.dataset.removed!=="true"){u.node.dataset.removed="true",u.node.inert=!0,u.node.setAttribute("aria-hidden","true"),u.scope?.abort();let M=()=>{u.node.dataset.removed==="true"&&(u.node.remove(),S.delete(q))};h.matches?M():u.timer=setTimeout(M,parseFloat(j.duration.medium2.$value))}for(let q of C){let u=S.get(q.id),M=!u;if(!u){let P=z("div","ac-list-slot"),$=z("div","ac-list-slot-inner");P.dataset.id=q.id,P.append($),u={node:P,inner:$},S.set(q.id,u),v.append(P)}clearTimeout(u.timer),u.node.dataset.removed="false",u.node.inert=!1,u.node.removeAttribute("aria-hidden");let L=JSON.stringify(q);if(u.fingerprint!==L||!u.scope||u.scope.signal.aborted){u.scope?.abort(),u.scope=new AbortController;let P=p;p=u.scope;try{u.inner.replaceChildren(T(q)),u.fingerprint=L}finally{p=P}}M&&k&&w&&!h.matches&&(u.node.dataset.entering="true",u.node.getBoundingClientRect(),delete u.node.dataset.entering)}k=!0}},panels(v){let w=z("div","ac-panels"),S=0;return v.forEach((k,C)=>{k.classList.add("ac-pane"),k.dataset.active=String(C===0),k.inert=C!==0,k.setAttribute("aria-hidden",String(C!==0)),w.append(k)}),{node:w,select(k){k!==S&&(S=k,v.forEach((C,T)=>{C.dataset.active=String(T===k),C.inert=T!==k,C.setAttribute("aria-hidden",String(T!==k))}))}}},reveal(v){let w=z("div","ac-reveal"),S=z("div","ac-reveal-inner");return S.append(v),w.append(S),w.dataset.open="false",w.inert=!0,w.setAttribute("aria-hidden","true"),{node:w,set(k){w.dataset.open=String(k),w.inert=!k,w.setAttribute("aria-hidden",String(!k))}}},toggle(v,w,S){let k=z("label","ac-switch"),C=z("input"),T=z("span","ac-switch-track");return C.type="checkbox",C.checked=w,k.append(z("span","",v),C,T),_(C,"change",()=>S(C.checked)),{node:k,input:C}},async run(v,w,S,k){if(m||A)return!1;if(!a.demo&&typeof a.onAction!="function")return R.say("Connect an action handler. Data has not changed."),!1;let C={abort:new AbortController,button:k,wasDisabled:k?.disabled};m=C,k?.getRootNode().activeElement===k&&(e.focus({preventScroll:!0}),C.parked=e.getRootNode().activeElement===e),e.setAttribute("aria-busy","true"),k&&(k.disabled=!0,k.setAttribute("aria-busy","true")),R.say("Processing action\u2026 You can cancel.");try{let T=a.demo?{demo:!0}:await a.onAction({type:v,payload:w},{signal:C.abort.signal});if(m!==C||C.abort.signal.aborted)return!1;if(T===!1)throw new Error("Action rejected");x=g(),y=!0;try{S(T)}finally{y=!1}return R.say(a.demo?"Only the example changed. Nothing was sent to a server.":"The action handler completed."),!0}catch{return m===C&&!C.abort.signal.aborted&&R.say("The action failed. Your data is preserved. Try again."),!1}finally{m===C&&(m=null,e.removeAttribute("aria-busy"),k&&(k.disabled=C.wasDisabled,k.removeAttribute("aria-busy")),t(C))}},cancel(){i(),R.say("Action cancelled. Data has not changed.")}};_(h,"change",()=>{e.dataset.reduced=String(h.matches),h.matches&&e.getAnimations({subtree:!0}).forEach(v=>v.finish())}),e.dataset.reduced=String(h.matches),f=n[b](R)||(()=>({})),e.append(E),_(e,"keydown",v=>{v.key==="Escape"&&m&&(v.preventDefault(),R.cancel())})}c();let l={reset(){A||c()},cancel(){A||(i(),e.querySelector(".ac-status").textContent="Action cancelled. Data has not changed.")},destroy(){A||(A=!0,o(),e.replaceChildren(),J.delete(e))},get state(){return{key:b,destroyed:A,pending:!!m,...A?{}:f()}}};return J.set(e,l),l}function I(e){e.root.tabIndex=-1;let b=e.run.bind(e);e.run=async(...s)=>{let t=s[3],i=t?.getRootNode().activeElement===t,o=b(...s);i&&e.root.hasAttribute("aria-busy")&&e.root.focus({preventScroll:!0});let c=await o;return!e.signal.aborted&&i&&e.root.getRootNode().activeElement===e.root&&t?.isConnected&&!t.disabled&&t.focus({preventScroll:!0}),c};let n=new Map;e.cleanup(()=>{for(let s of n.values())s.cancel()});let a=()=>{e.root.hasAttribute("aria-busy")&&e.cancel()};function r(s,t=null){let i=Number(getComputedStyle(s).opacity)||1,o=n.has(s)?Math.max(.8,i):.9;if(n.get(s)?.cancel(),e.reduced.matches||!s.isConnected||s.closest("[inert]"))return;let c=s.getBoundingClientRect().height,l={opacity:o},p={opacity:1};t>0&&c>0&&Math.abs(t-c)>.5&&(l.height=t+"px",p.height=c+"px");let _=s.animate([l,p],{duration:parseFloat(j.duration.short4.$value),easing:`cubic-bezier(${j.easing.settle.$value.join(",")})`});n.set(s,_),_.finished.catch(()=>{}).finally(()=>{n.get(s)===_&&n.delete(s)})}function d(s,t){let i=s.isConnected&&!s.closest("[inert]")?s.getBoundingClientRect().height:null;s.replaceChildren(...t),r(s,i)}function m(s){let t=e.el("dl","as-details");return f(t,s,!1),t}function f(s,t,i=!0){let o=t.map(([c,l])=>{let p=e.el("div");return p.append(e.el("dt","",c),e.el("dd","",String(l))),p});i?d(s,o):s.replaceChildren(...o)}function A(s,t,i="user"){let o=e.listRow(s,t,i);return o.node.classList.add("as-card"),o}function h(s,t,i,o){let c=i,l=e.el("div","as-choice");l.setAttribute("role","group"),l.setAttribute("aria-label",s);let p=t.map(([E,R])=>{let v=e.el("button","as-choice-button",R);return v.type="button",v.setAttribute("aria-pressed",String(E===c)),e.on(v,"click",()=>{v.disabled||_(E,!0)}),e.on(v,"keydown",w=>{if(!["ArrowLeft","ArrowRight","Home","End"].includes(w.key))return;w.preventDefault();let S=p.filter(N=>!N.disabled);if(!S.length)return;let k=S.indexOf(v),C=w.key==="Home"?0:w.key==="End"?S.length-1:(k+(w.key==="ArrowRight"?1:-1)+S.length)%S.length,T=S[C];T.focus({preventScroll:!0}),_(t[p.indexOf(T)][0],!0)}),l.append(v),v});function _(E,R=!1){E!==c&&(a(),c=E,p.forEach((v,w)=>v.setAttribute("aria-pressed",String(t[w][0]===c))),R&&o(E))}return{node:l,set:_,get value(){return c}}}function g(s,t){let i=e.el("div","as-records"),o=new Map,c=e.el("p","ac-hint as-empty","No matching records.");i.setAttribute("role","group"),i.setAttribute("aria-label","Records");let l=null,p=[],_=!1;i.append(c);function E(v){p=v;for(let w of v){let S=o.get(w.id),k=!S;if(!S){let C=e.el("button","as-record"),T=e.el("strong"),N=e.el("span","ac-hint"),q=e.reveal(C);C.type="button",C.append(T,N),S={b:C,title:T,meta:N,reveal:q},o.set(w.id,S),i.append(q.node),e.on(C,"click",()=>{a(),R(w.id),t(p.find(u=>u.id===w.id))}),e.on(C,"keydown",u=>{if(!["ArrowUp","ArrowDown","Home","End"].includes(u.key))return;u.preventDefault();let M=[...o.values()].filter($=>!$.reveal.node.inert),L=M.indexOf(S),P=u.key==="Home"?0:u.key==="End"?M.length-1:(L+(u.key==="ArrowDown"?1:-1)+M.length)%M.length;M[P].b.focus({preventScroll:!0}),M[P].b.click()})}S.title.textContent=w.title,S.meta.textContent=w.meta,S.b.setAttribute("aria-label",`Open: ${w.title}`),S.b.setAttribute("aria-pressed",String(w.id===l)),k&&_&&!e.reduced.matches&&S.reveal.node.getBoundingClientRect(),S.reveal.set(!0)}for(let[w,S]of o)v.some(k=>k.id===w)||S.reveal.set(!1);c.hidden=!!v.length,_=!0}function R(v){l=v;for(let[w,S]of o)S.b.setAttribute("aria-pressed",String(w===v))}return E(s),{node:i,paint:E,set:R,focus(v){o.get(v)?.b.focus({preventScroll:!0})}}}function y(s){let t=e.reveal(s);return t.node.classList.add("as-drawer"),t}return{fade:r,replace:d,detail:m,setDetail:f,card:A,choice:h,records:g,drawer:y,cancel:a,mutationInputs:(...s)=>{for(let t of s)e.on(t.input,"input",a)}}}var ee={communications(e){let b=I(e);e.title("Messages to receive","Required security messages remain enabled.","mail");let n={orders:!0,updates:!0,ideas:!1,channel:"both",frequency:"instant"},a={...n},r=b.card("Account security","Required messages \xB7 always enabled","shield"),d=e.el("div","as-switches"),m=Object.entries({orders:"Order updates",updates:"Product updates",ideas:"Collections and tips"}).map(([s,t])=>{let i=e.toggle(t,a[s],o=>{b.cancel(),a[s]=o,x()});return d.append(i.node),{id:s,...i}}),f=b.choice("Message channel",[["email","Email"],["inbox","Account inbox"],["both","Both"]],"both",s=>{a.channel=s,x()}),A=b.choice("Message frequency",[["instant","Immediately"],["digest","Digest"]],"instant",s=>{a.frequency=s,x()}),h=e.el("p","ac-hint as-summary"),g=e.button("Apply",async()=>{let s={...a};await e.run("communications.save",s,()=>{n=s,e.emit({saved:{...n}})},g),x()}),y=e.button("Cancel",()=>{b.cancel(),a={...n},m.forEach(s=>s.input.checked=a[s.id]),f.set(a.channel),A.set(a.frequency),x()},"quiet");function x(){g.disabled=y.disabled=JSON.stringify(n)===JSON.stringify(a),h.textContent=a.frequency==="digest"?"Optional messages are collected into one digest.":"Receive messages for your selected topics and channels."}return e.root.append(r.node,d,e.el("h3","as-label","Where to receive"),f.node,e.el("h3","as-label","How often"),A.node,h,e.actions(g,y)),x(),()=>({saved:{...n},draft:{...a}})},security(e){let b=I(e);e.title("Security history","Review events and acknowledge familiar activity.","shield");let n=null,a="all",r=[{id:"entry",title:"New device sign-in",meta:"Today, 09:40 \xB7 Review needed",type:"entry",reviewed:!1,device:"Safari \xB7 iOS",place:"Novosibirsk"},{id:"password",title:"Password change",meta:"Yesterday, 18:12 \xB7 Confirmed",type:"change",reviewed:!0,device:"Edge \xB7 Windows 11",place:"Novosibirsk"},{id:"factor",title:"Protection enabled",meta:"October 12 \xB7 Confirmed",type:"change",reviewed:!0,device:"Edge \xB7 Windows 11",place:"Novosibirsk"}],d=e.el("div","as-flow"),m=e.el("h3","as-subtitle"),f=b.detail([]),A=b.drawer(d),h=b.records(r,i=>{n=i.id,x(),A.set(!0)}),g=e.button("This was me",async()=>{let i=n;await e.run("security.acknowledge",{id:i},()=>{let o=r.find(c=>c.id===i);o.reviewed=!0,o.meta="Today, 09:40 \xB7 Reviewed",s(),x(),e.emit({reviewed:r.filter(c=>c.reviewed).map(c=>c.id)})},g),g.disabled=r.find(o=>o.id===n)?.reviewed??!0}),y=e.button("Close",()=>{b.cancel(),A.set(!1),h.focus(n)},"quiet");function x(){let i=r.find(o=>o.id===n);i&&(m.textContent=i.title,b.setDetail(f,[["Device",i.device],["City",i.place],["Review",i.reviewed?"Event reviewed":"Confirm if this was you"]]),g.disabled=i.reviewed)}function s(){h.paint(r.filter(i=>a==="all"||i.type===a))}let t=b.choice("Event type",[["all","All"],["entry","Sign-ins"],["change","Changes"]],"all",i=>{a=i,A.set(!1),n=null,h.set(null),s()});return d.append(m,f,e.actions(g,y)),e.root.append(t.node,h.node,A.node,e.el("p","ac-hint as-footnote","These are fictional events, not your computer activity log.")),()=>({selected:n,filter:a,reviewed:r.filter(i=>i.reviewed).map(i=>i.id)})},recipient(e){let b=I(e);e.title("Document recipient","Recipient details, separate from your shipping address.","user");let n="person",a={type:"person",name:"Anna Smith",email:"anna@example.com",tax:""},r={person:{name:a.name,email:a.email,tax:""},company:{name:"Line Studio",email:"docs@example.com",tax:"0000000000"}},d=e.field("Recipient",a.name),m=e.field("Document email",a.email),f=e.field("Company tax ID",""),A=e.el("div","as-flow"),h=b.drawer(A),g=e.el("div","ac-fields");A.append(f.node),g.append(d.node,m.node,h.node);let y=()=>({name:d.input.value,email:m.input.value,tax:n==="company"?f.input.value:""}),x=b.choice("Recipient type",[["person","Individual"],["company","Company"]],"person",o=>{r[n]=y(),n=o;let c=r[n];d.input.value=c.name,m.input.value=c.email,f.input.value=c.tax,h.set(n==="company"),i()}),s=e.button("Save",async()=>{let o=y();if(!o.name.trim()){e.say("Enter the recipient name."),d.input.focus();return}let c={type:n,...o};await e.run("recipient.save",c,()=>{a={...c},r[n]={...o},e.emit({saved:{...a}})},s),i()}),t=e.button("Restore saved details",()=>{b.cancel(),n=a.type,x.set(n),d.input.value=a.name,m.input.value=a.email,f.input.value=a.tax,h.set(n==="company"),i()},"quiet");function i(){s.disabled=t.disabled=JSON.stringify(a)===JSON.stringify({type:n,...y()})}for(let o of[d,m,f])e.on(o.input,"input",()=>{b.cancel(),i()});return e.root.append(x.node,g,e.el("p","ac-hint as-footnote","Any values are accepted in this example. No legal validation is performed."),e.actions(s,t)),i(),()=>({mode:n,saved:{...a},draft:y()})}};function B(e){let b=0;for(let{unit:n,quantity:a}of e){if(!Number.isSafeInteger(n)||n<0||!Number.isSafeInteger(a)||a<0||!Number.isSafeInteger(n*a)||!Number.isSafeInteger(b+n*a))throw new TypeError("Expected safe nonnegative integer minor units");b+=n*a}return b}function Y(e){if(!Number.isSafeInteger(e)||e<0)throw new TypeError("Expected integer minor units");return new Intl.NumberFormat("en-GB",{style:"currency",currency:"RUB",maximumFractionDigits:2}).format(e/100)}var X=Object.freeze([{id:"order-a",title:"October 12 order",meta:"Received \xB7 2 items",lines:[{id:"notebook",title:"Notebook",unit:89e3,quantity:2},{id:"pen",title:"Pen",unit:32e3,quantity:1}],address:"12 Forest Street, Novosibirsk"},{id:"order-b",title:"October 5 order",meta:"Received \xB7 1 item",lines:[{id:"bag",title:"Bag",unit:249e3,quantity:1}],address:"8 Peace Street, Novosibirsk"}]),U=Object.freeze([{id:"invoice",title:"October invoice",type:"invoice",meta:"October 12 \xB7 Paid",lines:[{title:"Monthly subscription",unit:99e3,quantity:1}]},{id:"receipt",title:"Order receipt",type:"receipt",meta:"October 12 \xB7 Paid",lines:X[0].lines},{id:"previous",title:"September invoice",type:"invoice",meta:"September 12 \xB7 Paid",lines:[{title:"Monthly subscription",unit:99e3,quantity:1}]}]);var te={methods(e){let b=I(e);e.title("Payment methods","Masked examples only. No card numbers are entered.","key");let n=[{id:"personal",label:"Personal card",last4:"4821",primary:!0},{id:"reserve",label:"Backup card",last4:"9064",primary:!1}],a=0,r=null,d=e.el("div","as-methods"),m=e.list(d,{animateInsert:!0}),f=e.el("div","as-flow"),A=e.el("p","ac-note"),h=b.drawer(f),g=e.button("Add example",async()=>{await e.run("methods.add",{},t=>{let i=e.options.demo?{id:`sample-${++a}`,label:"Example card",last4:String(1e3+a)}:t?.method;if(!i||typeof i.id!="string"||!/^\d{4}$/.test(i.last4)||typeof i.label!="string"||n.some(o=>o.id===i.id))throw new TypeError("Expected a unique masked method");n.push({...i,primary:!1}),s(),e.emit({methods:n.map(o=>({...o}))})},g),g.disabled=n.length>=4},"secondary"),y=e.button("Remove method",async()=>{if(n.length<=1){e.say("Add another method before removing the last one.");return}let t=r;await e.run("methods.remove",{id:t},()=>{let i=n.find(o=>o.id===t)?.primary;n=n.filter(o=>o.id!==t),i&&(n[0].primary=!0),r=null,h.set(!1),s(),e.emit({methods:n.map(o=>({...o}))}),g.focus({preventScroll:!0})},y)}),x=e.button("Keep",()=>{b.cancel(),r=null,h.set(!1),g.focus({preventScroll:!0})},"quiet");f.append(A,e.actions(y,x));function s(){m(n.map(t=>({...t,last:n.length===1})),t=>{let i=b.card(t.label,`Card \u2022\u2022\u2022\u2022 ${t.last4}`,"key");i.node.append(e.el("span","as-method-status",t.primary?"Primary method":"Backup method"));let o=e.button("Make primary",async()=>{let l=t.id;await e.run("methods.primary",{id:l},()=>{n.forEach(p=>p.primary=p.id===l),s(),e.emit({methods:n.map(p=>({...p}))})},o)},"small"),c=e.button("Remove",()=>{b.cancel(),r=t.id,A.textContent=`Remove \u201C${t.label}\u201D \u2022\u2022\u2022\u2022 ${t.last4}?${t.primary?" Another method will become primary.":""}`,h.set(!0),y.focus({preventScroll:!0})},"small");return o.setAttribute("aria-label",`Primary: ${t.last4}`),c.setAttribute("aria-label",`Remove: ${t.last4}`),c.disabled=t.last,i.node.append(e.actions(...t.primary?[]:[o],c)),t.last&&i.node.append(e.el("p","ac-hint","Last method: add another one first.")),i.node}),g.disabled=n.length>=4}return e.root.append(d,e.actions(g),h.node,e.el("p","ac-hint as-footnote","The demo supports up to four methods. No payment is made.")),s(),()=>({methods:n.map(t=>({...t})),target:r})},documents(e){let b=I(e);e.title("Account documents","Invoices and receipts with itemized totals.","mail");let n=null,a="all",r=null,d=e.el("div","as-flow"),m=e.el("h3","as-subtitle"),f=e.el("div","as-line-items"),A=e.el("strong","as-amount"),h=e.el("p","ac-hint"),g=b.drawer(d),y=b.records(U,o=>{n=o.id,r=null,t(),g.set(!0)}),x=e.button("Retrieve document",async()=>{let o=n;await e.run("documents.retrieve",{id:o},()=>{r=o,h.textContent=e.options.demo?"Example only. No file is created or downloaded.":"Your handler completed retrieval.",e.emit({received:o})},x)}),s=e.button("Close",()=>{b.cancel(),g.set(!1),y.focus(n)},"quiet");function t(){let o=U.find(c=>c.id===n);m.textContent=o.title,b.replace(f,o.lines.map(c=>{let l=e.el("p");return l.append(e.el("span","",`${c.title} \xD7 ${c.quantity}`),e.el("strong","",Y(c.unit*c.quantity))),l})),A.textContent=Y(B(o.lines)),h.textContent="Sample document. No financial transaction is performed."}let i=b.choice("Document type",[["all","All"],["invoice","Invoices"],["receipt","Receipts"]],"all",o=>{a=o,n=null,y.set(null),g.set(!1),y.paint(U.filter(c=>a==="all"||c.type===a))});return d.append(m,f,A,h,e.actions(x,s)),e.root.append(i.node,y.node,g.node),()=>({selected:n,filter:a,received:r})},subscription(e){let b=I(e);e.title("Your subscription","Manage your existing subscription plan.","key");let n="month",a=null,r=!1,d="month",m=b.card("Studio plan","Active until November 12, 2026","key"),f=b.detail([]),A=e.el("p","ac-hint as-summary");m.node.append(f);let h=b.choice("Next period",[["month","Month"],["year","Year"]],"month",l=>{d=l,c()}),g=e.button("Schedule",async()=>{let l=d;await e.run("subscription.period",{period:l},()=>{a=l===n?null:l,c(),e.emit({period:n,scheduled:a,canceled:r})},g),c()}),y=e.button("Cancel change",async()=>{await e.run("subscription.period",{period:n},()=>{a=null,d=n,h.set(n),c(),e.emit({period:n,scheduled:a,canceled:r})},y),c()},"quiet"),x=e.el("div","as-flow"),s=b.drawer(x),t=e.button("Cancel renewal",async()=>{r?(await e.run("subscription.restore",{},()=>{r=!1,c(),e.emit({period:n,scheduled:a,canceled:r})},t),c()):(b.cancel(),s.set(!0),i.focus({preventScroll:!0}))},"secondary"),i=e.button("Do not renew",async()=>{await e.run("subscription.cancel",{},()=>{r=!0,a=null,s.set(!1),c(),e.emit({period:n,scheduled:a,canceled:r}),t.focus({preventScroll:!0})},i)}),o=e.button("Keep subscription",()=>{b.cancel(),s.set(!1),t.focus({preventScroll:!0})},"quiet");x.append(e.el("p","ac-note","Access continues until the paid period ends. The example does not renew a real subscription."),e.actions(i,o));function c(){b.setDetail(f,[["Current period",n==="month"?"Month":"Year"],["Renewal",r?"Not scheduled":"November 12, 2026"],["Period cost",Y(n==="month"?99e3:99e4)]]),A.textContent=r?"Demo renewal cancelled. Access remains until November 12.":a?`From the next period: ${a==="year"?"year \xB7 "+Y(99e4):"month \xB7 "+Y(99e3)}.`:"You can change the next period in advance.",g.disabled=r||d===(a??n),y.disabled=!a,t.label.textContent=r?"Restore renewal":"Cancel renewal"}return e.root.append(m.node,e.el("h3","as-label","From the next period"),h.node,A,e.actions(g,y),e.actions(t),s.node),c(),()=>({period:n,scheduled:a,canceled:r,draft:d})}};var ne={orders(e){let b=I(e);e.title("Your purchases","Review past orders and request a repeat.","user");let n=null,a=null,r=e.el("div","as-flow"),d=e.el("h3","as-subtitle"),m=e.el("div","as-line-items"),f=e.el("strong","as-amount"),A=e.el("p","ac-hint"),h=e.el("p","ac-hint as-summary"),g=b.drawer(r),y=b.records(X,t=>{n=t.id,d.textContent=t.title,b.replace(m,t.lines.map(i=>{let o=e.el("p");return o.append(e.el("span","",`${i.title} \xD7 ${i.quantity}`),e.el("strong","",Y(i.unit*i.quantity))),o})),f.textContent=Y(B(t.lines)),A.textContent=t.address,h.textContent="You can request this order again.",g.set(!0)}),x=e.button("Repeat order",async()=>{let t=n;await e.run("orders.repeat",{id:t},()=>{a=t,h.textContent=e.options.demo?"Items selected in the example. No new order was created.":"The repeat request was handled by your application.",e.emit({repeated:t})},x)}),s=e.button("Close",()=>{b.cancel(),g.set(!1),y.focus(n)},"quiet");return r.append(d,m,f,A,h,e.actions(x,s)),e.root.append(y.node,g.node),()=>({selected:n,repeated:a})},returns(e){let b=I(e);e.title("Return a purchase","Choose a purchased item and explain the reason.","undo");let n="notebook",a=1,r="fit",d=null,m=X[0].lines,f=b.detail([]),A=e.field("Comment","","textarea-input"),h=b.choice("Purchased item",m.map(o=>[o.id,o.title]),n,o=>{n=o;let c=m.find(l=>l.id===n).quantity;a>c&&(a=1,g.set("1")),i()}),g=b.choice("Return quantity",[["1","1 item"],["2","2 items"]],"1",o=>{a=Number(o),i()}),y=b.choice("Return reason",[["fit","Not suitable"],["defect","Defect"],["other","Other"]],"fit",o=>{r=o}),x=e.button("Prepare request",async()=>{let o=m.find(l=>l.id===n);if(a<1||a>o.quantity){e.say("Quantity cannot exceed the purchased amount.");return}let c={orderId:"order-a",item:n,quantity:a,reason:r,note:A.input.value};await e.run("returns.submit",c,l=>{d={...c,id:l?.id??"demo-return"},i(),e.emit({request:{...d}})},x),i()}),s=e.button("Cancel request",async()=>{let o=d?.id;o&&(await e.run("returns.withdraw",{id:o},()=>{d=null,i(),e.emit({request:null})},s),i())},"secondary"),t=b.drawer(e.actions(s));function i(){let o=m.find(c=>c.id===n);b.setDetail(f,[["Purchased",`${o.quantity} items`],["Example refund amount",Y(o.unit*a)],["Request",d?"Prepared in the example":"Not prepared yet"]]);for(let c of[h,g,y])for(let l of c.node.querySelectorAll("button"))l.disabled=!!d;g.node.querySelectorAll("button")[1].disabled=!!d||o.quantity<2,A.input.readOnly=!!d,x.disabled=!!d,t.set(!!d)}return b.mutationInputs(A),e.root.append(e.el("h3","as-label","From the October 12 order"),h.node,e.el("h3","as-label","Quantity"),g.node,f,e.el("h3","as-label","Reason"),y.node,A.node,e.actions(x),t.node,e.el("p","ac-hint as-footnote","No return or money transfer is performed.")),i(),()=>({item:n,quantity:a,reason:r,request:d?{...d}:null})}};var ae={tickets(e){let b=I(e);e.title("Support tickets","Reply to a ticket or start a new one.","mail");let n="delivery",a=!1,r=0,d=!1,m=[{id:"delivery",title:"Delivery question",meta:"Open \xB7 today",status:"open",messages:[{author:"You",text:"I would like to confirm the delivery time."},{author:"Support",text:"The courier will contact you before arrival."}]},{id:"billing",title:"September documents",meta:"Closed \xB7 October 12",status:"closed",messages:[{author:"You",text:"Where can I find the receipt?"},{author:"Support",text:"It is available in account documents."}]}],f=new Map,A=e.el("div","as-flow"),h=e.el("h3","as-subtitle"),g=e.el("div","as-conversation"),y=e.field("Ticket subject",""),x=e.el("div","as-flow"),s=b.drawer(x),t=e.field("Message","","textarea-input");x.append(y.node);function i(){d=!0;try{t.input.dispatchEvent(new Event("input"))}finally{d=!1}}let o=b.records(m,E=>{a=!1,n=E.id,t.input.value=f.get(n)??"",i(),_()}),c=e.button("New ticket",()=>{if(b.cancel(),a){y.input.focus({preventScroll:!0});return}a=!0,n=null,o.set(null),t.input.value=f.get("new")??"",i(),_(),y.input.focus({preventScroll:!0})},"secondary"),l=e.button("Send reply",async()=>{let E=t.input.value;if(!E.trim()||a&&!y.input.value.trim()){e.say("Enter a subject and message for a new ticket."),(E.trim()?y:t).input.focus();return}let R=n,v=a,w=y.input.value;await e.run(v?"tickets.create":"tickets.reply",v?{title:w,text:E}:{id:R,text:E},S=>{if(v){let k=S?.id??`demo-ticket-${++r}`;if(m.some(C=>C.id===k))throw new TypeError("Duplicate ticket");m.push({id:k,title:w,meta:"Open \xB7 just now",status:"open",messages:[{author:"You",text:E}]}),n=k,a=!1,y.input.value=""}else m.find(k=>k.id===R).messages.push({author:"You",text:E});f.delete(v?"new":R),t.input.value="",i(),_(),e.emit({selected:n,tickets:m.map(k=>({id:k.id,title:k.title,status:k.status,messages:k.messages.map(C=>({...C}))}))})},l),_()}),p=e.button("Close ticket",async()=>{let E=n,R=m.find(w=>w.id===E);if(!R)return;let v=R.status==="open"?"closed":"open";await e.run("tickets.status",{id:E,status:v},()=>{R.status=v,R.meta=v==="open"?"Open \xB7 just now":"Closed \xB7 just now",_(),e.emit({selected:n,status:v})},p),_()},"quiet");function _(){o.paint(m),o.set(n);let E=m.find(v=>v.id===n);h.textContent=a?"New ticket":E.title,s.set(a),g.hidden=a,b.replace(g,(E?.messages.slice(-2)??[]).map(v=>{let w=e.el("div","as-message");return w.append(e.el("span","as-message-author",v.author),e.el("p","",v.text)),w}));let R=!a&&E.status==="closed";t.input.readOnly=R,l.label.textContent=a?"Create ticket":"Send reply",l.disabled=R,p.view.hidden=a,p.label.textContent=R?"Reopen":"Close ticket"}return e.on(t.input,"input",()=>{d||(b.cancel(),f.set(a?"new":n,t.input.value))}),b.mutationInputs(y),A.append(h,g,s.node,t.node,e.actions(l,p)),e.root.append(o.node,e.actions(c),A,e.el("p","ac-hint as-footnote","Messages remain in this example. Nothing is sent to support.")),_(),()=>({selected:n,creating:a,tickets:m.map(E=>({id:E.id,title:E.title,status:E.status,messages:E.messages.map(R=>({...R}))}))})},exports(e){e.root.classList.add("as-exports");let b=I(e);e.title("Your data","Choose categories and prepare an export request.","user");let n="idle",a=null,r=!1,d=new Set(["profile","orders"]),m=e.el("div","as-switches"),f=b.detail([]),A=e.el("p","ac-hint as-summary"),h=[["profile","Profile data"],["orders","Purchase history"],["messages","Tickets and replies"]].map(([p,_])=>{let E=e.toggle(_,d.has(p),R=>{b.cancel(),R?d.add(p):d.delete(p),l()});return m.append(E.node),E}),g=e.button("Request export",async()=>{let p=[...d];await e.run("exports.request",{categories:p},_=>{n="pending",a=_?.id??"demo-export",r=!1,l(),e.emit({phase:n,categories:p})},g),l()}),y=e.button("Check readiness",async()=>{let p=a;await e.run("exports.refresh",{id:p},_=>{let E=e.options.demo?"ready":_?.phase;if(!["pending","ready"].includes(E))throw new TypeError("Expected pending or ready");n=E,l(),e.emit({phase:n,categories:[...d]})},y),l()},"secondary"),x=e.button("Cancel request",async()=>{let p=a;await e.run("exports.cancel",{id:p},()=>{n="canceled",l(),e.emit({phase:n})},x),l()},"quiet"),s=e.button("Retrieve export",async()=>{let p=a;await e.run("exports.retrieve",{id:p},()=>{r=!0,l(),e.emit({phase:n,received:!0})},s),l()}),t=e.el("div","ac-actions as-export-actions"),i=e.el("div","as-export-primary"),o=e.el("div","as-export-secondary");i.append(g.view,s.view),o.append(y.view,x.view),t.append(i,o);for(let p of[g,y,x,s])p.getRootNode().append(e.el("style","",".bk-button.bk-button{width:100%;height:48px;min-height:48px;font-size:13px;line-height:16px}.bk-surface.bk-surface{height:48px;min-height:48px;padding:8px}.bk-label.bk-label{line-height:16px}"));function c(p,_){!_&&p.getRootNode().activeElement===p&&e.root.focus({preventScroll:!0}),p.view.inert=!_,p.view.hidden=!_}function l(){let p=n==="pending"||n==="ready";c(g,!p),c(s,n==="ready"),c(y,n==="pending"),c(x,n==="pending"),h.forEach(_=>_.input.disabled=p),g.disabled=!d.size||p,g.label.textContent=n==="canceled"?"Request again":"Request export",y.view.hidden=n!=="pending",x.view.hidden=n!=="pending",s.view.hidden=n!=="ready",b.setDetail(f,[["Request",{idle:"Not created",pending:"Preparing",ready:e.options.demo?"Ready in the example":"Ready to retrieve",canceled:"Cancelled"}[n]],["Contents",`${d.size} ${d.size===1?"section":(d.size,"sections")}`]]),A.textContent=r?e.options.demo?"No file is created or downloaded in this example.":"Your application handled retrieval.":e.options.demo?"Demo: use the button to mark ready. No server or background download.":"Your application handler confirms readiness."}return e.root.append(m,f,A,t),l(),()=>({phase:n,requestId:a,categories:[...d],received:r})}};var W=new WeakMap;function ie(e,b,n){W.get(e)?.destroy();let a=!1,r=document.createElement("div");e.replaceChildren(r),e.classList.add("sl-component"),e.dataset.kind="buttons-account-services-exports-v11";let d=K(r,{...b,key:"exports",renderers:{...ee,...te,...ne,...ae},demo:n}),m={reset(){a||d.reset()},cancel(){a||d.cancel()},destroy(){a||(a=!0,d.destroy(),W.get(e)===m&&(e.replaceChildren(),W.delete(e)))},get state(){return d.state}};return W.set(e,m),m}function pe(e,b={}){return ie(e,b,!1)}function fe(e){return ie(e,{},!0)}window.SLComponent={mount:pe,mountPreview:fe};})();
