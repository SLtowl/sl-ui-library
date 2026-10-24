import{retainFont as A}from"./react-font.mjs";const C="inputs-username-v11";const N='<section class="sl-component" data-kind="inputs-username-v11" aria-label="Username input">\n    <h2 class="sl-heading"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 18c1.4-2.5 3.8-4 7-4s5.6 1.5 7 4"/><circle cx="12" cy="8" r="3.5"/><path d="M19 8.5v2.7a1.8 1.8 0 0 1-3.6 0V8.7a3.4 3.4 0 1 0-1.1 2.5"/></svg>Username input</h2>\n    <label class="sl-label">Username</label><div class="sl-control"><span class="sl-affix" aria-hidden="true">@</span><input class="sl-main" type="text" value="studio_line" maxlength="24" autocomplete="username" spellcheck="false" aria-label="Username"></div><div class="sl-meta"><span>Letters, numbers, dot or underscore</span><output class="sl-count">11 / 24</output></div>\n  </section>';const O=`@font-face { font-family: 'Instrument Sans'; src: url('./instrument-sans-variable.woff2') format('woff2'); font-weight: 400 700; font-style: normal; font-display: swap; }
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
.sl-component .sl-affix { flex:none; padding-left:12px; color:var(--field-text); font-size:18px; font-weight:600; line-height:1; font-variant-numeric:tabular-nums; transition:color 200ms var(--field-ease), transform 200ms var(--field-ease); }
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
`;function M(){return(()=>{"use strict";function l(n,t={}){if(!n||!n.matches(".sl-component"))throw new TypeError("A .sl-component root is required.");if(typeof n.__slInputCleanup==="function")n.__slInputCleanup();const g=[];let a=false;let i="";const x=Boolean(t.disabled);const u=e=>n.querySelector(e);const b=e=>[...n.querySelectorAll(e)];const o=(e,r,f,v)=>{e.addEventListener(r,f,v);g.push(()=>e.removeEventListener(r,f,v))};const c=e=>new Intl.NumberFormat(n.lang||"en",{maximumFractionDigits:8}).format(e);const s=document.createElement("p");s.className="sl-status";s.setAttribute("role","status");s.setAttribute("aria-live","polite");n.append(s);function E(e,r,f){n.dataset.invalid=String(!e);s.dataset.tone=e?"success":"error";s.textContent=r;f.forEach(v=>v.setAttribute("aria-invalid",String(!e)))}let d=()=>({});const _=e=>JSON.parse(JSON.stringify(e));function z(){if(a)return;const e=JSON.stringify(d());if(e===i)return;i=e;const r=_(d());if(typeof t.onChange==="function")t.onChange(r);n.dispatchEvent(new CustomEvent("sl:change",{bubbles:true,composed:true,detail:r}))}function I(e,r){d=e;i=JSON.stringify(d());const f=n.closest("form");const v=()=>queueMicrotask(()=>{if(!a){r();i=JSON.stringify(d())}});if(f)o(f,"reset",v);const k=()=>{if(a)return;a=true;g.splice(0).forEach(S=>S());s.remove();if(n.__slInputCleanup===k)delete n.__slInputCleanup};Object.defineProperty(n,"__slInputCleanup",{value:k,configurable:true,writable:true});b("input,button").forEach(S=>{S.disabled=x});return{reset(){if(a)return;r();i=JSON.stringify(d())},destroy:k,get state(){return _(d())}}}const m=u(".sl-main"),q=u(".sl-count");const h=String(t.value??m.value);let p=h;function y(e=false){p=m.value;const r=/^[A-Za-z0-9._]{3,24}$/.test(p)&&!/[._]{2}/.test(p)&&!/^[._]|[._]$/.test(p);q.textContent=p.length+" / 24";E(r,r?"Available format.":"Use 3–24 characters without repeated or edge punctuation.",[m]);if(e)z()}m.value=h;o(m,"input",()=>y(true));y();return I(()=>({value:p,valid:n.dataset.invalid!=="true"}),()=>{m.value=h;p=h;y()})}function w(n){return l(n)}return{mount:l,mountPreview:w}})()}function J(l,w={},{preview:n=false}={}){if(!l||typeof l.attachShadow!=="function")throw new TypeError("A DOM host is required");const t=l.shadowRoot||l.attachShadow({mode:"open"});t.innerHTML=N;const g=l.ownerDocument.createElement("style");const a=new URL("./instrument-sans-variable.woff2",import.meta.url).href;g.textContent=O.replaceAll("./instrument-sans-variable.woff2",a)+':host{display:block;min-width:0;max-width:100%;font-family:"Instrument Sans",sans-serif}[hidden]{display:none!important}';t.prepend(g);const i=t.querySelector(".sl-component");if(!i){t.replaceChildren();throw new Error("Missing component root")}const x=A(l.ownerDocument,a);let u,b=false;try{const o=M(),c={};if(C==="upload")c.input=t.querySelector('input[type="file"]');if(["like","copy","download","bookmark","playback","delete","upload","share","follow"].includes(C))c.feedback=t.querySelector("."+C+"-feedback");if(n&&typeof o.mountPreview!=="function")throw new Error("This source has no preview adapter; supply its documented application callbacks.");u=(n?o.mountPreview:o.mount)(i,{...c,...w});if(typeof u?.destroy!=="function")throw new Error("Missing source cleanup contract")}catch(o){x();t.replaceChildren();throw o}return new Proxy(u,{get(o,c){if(c==="destroy")return()=>{if(b)return;b=true;try{o.destroy()}finally{x();t.replaceChildren()}};const s=Reflect.get(o,c,o);return typeof s==="function"?s.bind(o):s}})}export{J as mountInto,C as variant};
