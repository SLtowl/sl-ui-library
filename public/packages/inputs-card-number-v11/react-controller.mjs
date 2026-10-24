import{retainFont as M}from"./react-font.mjs";const C="inputs-card-number-v11";const O='<section class="sl-component" data-kind="inputs-card-number-v11" aria-label="Card number input">\n    <h2 class="sl-heading"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="3"/><path d="M3 9h18M7 14h4"/></svg>Card number input</h2>\n    <label class="sl-label">Card number</label><div class="sl-control"><input class="sl-main" type="text" inputmode="numeric" value="4242 4242 4242 4242" maxlength="23" autocomplete="cc-number" aria-label="Card number"></div><div class="sl-meta"><span>Local checksum only</span><output class="sl-brand">Visa · 16 digits</output></div>\n  </section>';const D=`@font-face { font-family: 'Instrument Sans'; src: url('./instrument-sans-variable.woff2') format('woff2'); font-weight: 400 700; font-style: normal; font-display: swap; }
.sl-component {
  --field-surface:#222222; --field-raised:#2d2d2d; --field-hover:#353535; --field-text:#fafafa;
  --field-muted:#bcbcbc; --field-accent:#e7e7e7; --field-border:#555555; --field-focus:#f2f2f2;
  --field-error:#f0bfad; --field-success:#dedede; --field-ease:cubic-bezier(.4,0,.2,1);
  box-sizing:border-box; width:min(320px,100%); min-width:0; padding:20px; border:1px solid var(--field-border);
  border-radius:18px; background:var(--field-surface); color:var(--field-text); box-shadow:0 8px 24px #00000012;
  text-align:left; font:400 14px/1.45 'Instrument Sans',sans-serif; color-scheme:dark;
}
.sl-component *, .sl-component *::before, .sl-component *::after { box-sizing:border-box; }
.sl-component .sl-heading { display:flex; align-items:center; gap:10px; margin:0 0 20px; font-size:15px; font-weight:600; letter-spacing:-.01em; }
.sl-component svg { width:22px; height:22px; flex:none; fill:none; stroke:currentColor; stroke-width:1.5; stroke-linecap:round; stroke-linejoin:round; color:var(--field-accent); }
.sl-component label, .sl-component legend, .sl-component .sl-label { display:block; min-width:0; padding:0; color:var(--field-muted); font-size:12px; }
.sl-component label>span, .sl-component .sl-label { display:block; margin:0 0 7px; }
.sl-component fieldset { min-width:0; margin:0; padding:0; border:0; }
.sl-component legend { margin:0 0 9px; }
.sl-component input, .sl-component button { font:inherit; }
.sl-component .sl-control { display:flex; align-items:center; min-width:0; min-height:46px; border:1px solid var(--field-border); border-radius:11px; background:var(--field-raised); transition:border-color 200ms var(--field-ease), background-color 200ms var(--field-ease), box-shadow 200ms var(--field-ease); }
.sl-component .sl-control:hover { background:var(--field-hover); }
.sl-component .sl-control:focus-within { border-color:var(--field-focus); background:var(--field-hover); box-shadow:0 0 0 3px color-mix(in srgb,var(--field-focus) 16%,transparent); }
.sl-component input { display:block; width:100%; min-width:0; height:44px; margin:0; padding:10px 12px; border:0; outline:0; background:transparent; color:var(--field-text); caret-color:var(--field-text); }
.sl-component input::placeholder { color:var(--field-muted); opacity:.8; }
.sl-component input[readonly] { cursor:default; }
.sl-component .sl-affix { flex:none; padding-left:12px; color:var(--field-muted); font-variant-numeric:tabular-nums; transition:color 200ms var(--field-ease), transform 200ms var(--field-ease); }
.sl-component .sl-control>.sl-affix:last-child { padding:0 12px 0 6px; }
.sl-component .sl-control:focus-within .sl-affix { color:var(--field-text); transform:translateX(1px); }
.sl-component .sl-domain { max-width:94px; overflow:hidden; white-space:nowrap; text-overflow:ellipsis; }
.sl-component button { min-height:38px; padding:8px 13px; border:1px solid var(--field-border); border-radius:10px; background:transparent; color:var(--field-text); cursor:pointer; touch-action:manipulation; transition:background-color 180ms var(--field-ease), border-color 180ms var(--field-ease), transform 140ms var(--field-ease); }
.sl-component button:hover { background:var(--field-hover); border-color:#737373; }
.sl-component button:active { transform:scale(.98); }
.sl-component button:focus-visible { outline:2px solid var(--field-focus); outline-offset:2px; }
.sl-component .sl-primary { background:var(--field-accent); border-color:var(--field-accent); color:var(--field-surface); }
.sl-component .sl-primary:hover { background:var(--field-text); }
.sl-component :is(input,button):disabled { opacity:.52; cursor:not-allowed; }
.sl-component[data-invalid="true"] .sl-control, .sl-component .sl-control[data-invalid="true"], .sl-component input[aria-invalid="true"] { border-color:var(--field-error); }
.sl-component .sl-meta, .sl-component .sl-preview, .sl-component .sl-result { display:flex; align-items:flex-start; justify-content:space-between; gap:10px; margin:9px 1px 0; color:var(--field-muted); font-size:11px; }
.sl-component output { color:var(--field-accent); font-variant-numeric:tabular-nums; overflow-wrap:anywhere; text-align:right; }
.sl-component .sl-preview, .sl-component .sl-result { margin-top:14px; padding:12px; border:1px solid var(--field-border); border-radius:11px; background:#282828; }
.sl-component .sl-path, .sl-component .sl-position { max-width:70%; }
.sl-component .sl-actions { display:flex; align-items:center; flex-wrap:wrap; gap:8px; margin-top:12px; }
.sl-component .sl-actions output { margin-left:auto; }
.sl-component .sl-note { min-height:34px; margin:12px 0 0; color:var(--field-muted); font-size:11px; overflow-wrap:anywhere; transition:color 180ms var(--field-ease), opacity 180ms var(--field-ease), transform 180ms var(--field-ease); }
.sl-component .sl-status { min-height:36px; margin:14px 0 0; color:var(--field-muted); font-size:12px; overflow-wrap:anywhere; transition:color 200ms var(--field-ease), opacity 200ms var(--field-ease), transform 200ms var(--field-ease); }
.sl-component .sl-status[data-tone="error"] { color:var(--field-error); transform:translateY(1px); }
.sl-component .sl-status[data-tone="success"] { color:var(--field-success); }
.sl-component .sl-meter { height:7px; margin-top:14px; overflow:hidden; border-radius:99px; background:#383838; }
.sl-component .sl-meter span { display:block; width:68%; height:100%; border-radius:inherit; background:var(--field-accent); transform-origin:left; transition:width 260ms var(--field-ease), opacity 180ms var(--field-ease); }
.sl-component .sl-grid-two { display:grid; grid-template-columns:1fr 1fr; gap:10px; }
.sl-component .sl-stack { display:grid; gap:11px; }
.sl-component .sl-segments { display:grid; grid-template-columns:1fr auto 1fr auto 1fr; align-items:end; gap:7px; }
.sl-component .sl-segments b { padding-bottom:13px; color:var(--field-muted); font-weight:400; }
.sl-component .sl-segments input { height:46px; padding:10px 6px; border:1px solid var(--field-border); border-radius:11px; background:var(--field-raised); text-align:center; transition:border-color 200ms var(--field-ease), background-color 200ms var(--field-ease); }
.sl-component .sl-segments input:focus-visible, .sl-component .sl-ip input:focus-visible { border-color:var(--field-focus); background:var(--field-hover); box-shadow:0 0 0 3px color-mix(in srgb,var(--field-focus) 16%,transparent); }
.sl-component .sl-version { align-self:center; margin-left:auto; font-size:14px; }
.sl-component .sl-ip { display:grid; grid-template-columns:1fr auto 1fr auto 1fr auto 1fr; align-items:center; gap:4px; }
.sl-component .sl-ip input { height:46px; padding:8px 4px; border:1px solid var(--field-border); border-radius:10px; background:var(--field-raised); text-align:center; transition:border-color 200ms var(--field-ease), background-color 200ms var(--field-ease); }
.sl-component .sl-ip b { color:var(--field-muted); font-weight:500; }
.sl-component .sl-sample { margin:14px 0 0; padding:12px; border-left:2px solid var(--field-border); color:var(--field-muted); background:#282828; font-size:12px; overflow-wrap:anywhere; transition:border-color 220ms var(--field-ease), color 220ms var(--field-ease); }
.sl-component[data-changed="true"] .sl-sample { border-color:var(--field-accent); color:var(--field-text); }
.sl-component .sl-result { align-items:center; }
.sl-component .sl-result output { font-size:20px; font-weight:600; letter-spacing:-.02em; }
@media (max-width:260px) { .sl-component { padding:16px; } .sl-component .sl-grid-two { grid-template-columns:1fr; } .sl-component .sl-domain { max-width:76px; } .sl-component .sl-actions output { width:100%; margin-left:0; text-align:left; } }
@media (prefers-reduced-motion:reduce) { .sl-component *, .sl-component *::before, .sl-component *::after { animation:none!important; transition:none!important; scroll-behavior:auto!important; } }
@media (forced-colors:active) { .sl-component, .sl-component .sl-control, .sl-component input, .sl-component button, .sl-component .sl-preview, .sl-component .sl-result { border-color:CanvasText; } .sl-component :focus-visible { outline:2px solid Highlight; outline-offset:2px; } }
`;function J(){return(()=>{"use strict";function a(t,r={}){if(!t||!t.matches(".sl-component"))throw new TypeError("A .sl-component root is required.");if(typeof t.__slInputCleanup==="function")t.__slInputCleanup();const g=[];let c=false;let d="";const v=Boolean(r.disabled);const b=e=>t.querySelector(e);const x=e=>[...t.querySelectorAll(e)];const l=(e,n,o,s)=>{e.addEventListener(n,o,s);g.push(()=>e.removeEventListener(n,o,s))};const f=e=>new Intl.NumberFormat(t.lang||"en",{maximumFractionDigits:8}).format(e);const i=document.createElement("p");i.className="sl-status";i.setAttribute("role","status");i.setAttribute("aria-live","polite");t.append(i);function z(e,n,o){t.dataset.invalid=String(!e);i.dataset.tone=e?"success":"error";i.textContent=n;o.forEach(s=>s.setAttribute("aria-invalid",String(!e)))}let m=()=>({});const S=e=>JSON.parse(JSON.stringify(e));function N(){if(c)return;const e=JSON.stringify(m());if(e===d)return;d=e;const n=S(m());if(typeof r.onChange==="function")r.onChange(n);t.dispatchEvent(new CustomEvent("sl:change",{bubbles:true,composed:true,detail:n}))}function q(e,n){m=e;d=JSON.stringify(m());const o=t.closest("form");const s=()=>queueMicrotask(()=>{if(!c){n();d=JSON.stringify(m())}});if(o)l(o,"reset",s);const u=()=>{if(c)return;c=true;g.splice(0).forEach(k=>k());i.remove();if(t.__slInputCleanup===u)delete t.__slInputCleanup};Object.defineProperty(t,"__slInputCleanup",{value:u,configurable:true,writable:true});x("input,button").forEach(k=>{k.disabled=v});return{reset(){if(c)return;n();d=JSON.stringify(m())},destroy:u,get state(){return S(m())}}}const p=b(".sl-main"),_=b(".sl-brand");const E=String(r.value??p.value);let I={};const A=e=>{let n=0,o=false;for(let s=e.length-1;s>=0;s--){let u=Number(e[s]);if(o){u*=2;if(u>9)u-=9}n+=u;o=!o}return n%10===0};function w(e=false){const n=p.value.replace(/\D/g,"").slice(0,19),o=n.length>=13&&n.length<=19&&A(n);I={value:o?n:null,valid:o,digits:n.length};const s=n.startsWith("4")?"Visa":/^5[1-5]/.test(n)?"Mastercard":"Card";_.textContent=n?s+" · "+n.length+" digits":"No number";z(o,o?"Number passes the local checksum.":n.length<13?"Enter 13–19 digits.":"Check the card number.",[p]);if(e)N()}function y(){const e=p.value.replace(/\D/g,"").slice(0,19);p.value=e.replace(/(.{4})/g,"$1 ").trim()}p.value=E;y();l(p,"input",()=>{y();w(true)});w();return q(()=>I,()=>{p.value=E;y();w()})}function h(t){return a(t)}return{mount:a,mountPreview:h}})()}function P(a,h={},{preview:t=false}={}){if(!a||typeof a.attachShadow!=="function")throw new TypeError("A DOM host is required");const r=a.shadowRoot||a.attachShadow({mode:"open"});r.innerHTML=O;const g=a.ownerDocument.createElement("style");const c=new URL("./instrument-sans-variable.woff2",import.meta.url).href;g.textContent=D.replaceAll("./instrument-sans-variable.woff2",c)+':host{display:block;min-width:0;max-width:100%;font-family:"Instrument Sans",sans-serif}[hidden]{display:none!important}';r.prepend(g);const d=r.querySelector(".sl-component");if(!d){r.replaceChildren();throw new Error("Missing component root")}const v=M(a.ownerDocument,c);let b,x=false;try{const l=J(),f={};if(C==="upload")f.input=r.querySelector('input[type="file"]');if(["like","copy","download","bookmark","playback","delete","upload","share","follow"].includes(C))f.feedback=r.querySelector("."+C+"-feedback");if(t&&typeof l.mountPreview!=="function")throw new Error("This source has no preview adapter; supply its documented application callbacks.");b=(t?l.mountPreview:l.mount)(d,{...f,...h});if(typeof b?.destroy!=="function")throw new Error("Missing source cleanup contract")}catch(l){v();r.replaceChildren();throw l}return new Proxy(b,{get(l,f){if(f==="destroy")return()=>{if(x)return;x=true;try{l.destroy()}finally{v();r.replaceChildren()}};const i=Reflect.get(l,f,l);return typeof i==="function"?i.bind(l):i}})}export{P as mountInto,C as variant};
