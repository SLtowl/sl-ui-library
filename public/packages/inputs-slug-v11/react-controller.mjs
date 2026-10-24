import{retainFont as _}from"./react-font.mjs";const C="inputs-slug-v11";const P='<section class="sl-component" data-kind="inputs-slug-v11" aria-label="Slug input">\n    <h2 class="sl-heading"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 13a4 4 0 0 0 5.7.1l2.2-2.2a4 4 0 0 0-5.7-5.7L11 6.4"/><path d="M14 11a4 4 0 0 0-5.7-.1l-2.2 2.2a4 4 0 0 0 5.7 5.7l1.2-1.2"/></svg>Slug input</h2>\n    <label class="sl-label">Page path</label><div class="sl-control"><span class="sl-affix sl-domain">site.com/</span><input class="sl-main" type="text" value="motion-notes" maxlength="60" spellcheck="false" aria-label="Page slug"></div><p class="sl-preview"><span>Preview</span><output class="sl-path">/motion-notes</output></p>\n  </section>';const A=`@font-face { font-family: 'Instrument Sans'; src: url('./instrument-sans-variable.woff2') format('woff2'); font-weight: 400 700; font-style: normal; font-display: swap; }
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
`;function L(){return(()=>{"use strict";function s(n,o={}){if(!n||!n.matches(".sl-component"))throw new TypeError("A .sl-component root is required.");if(typeof n.__slInputCleanup==="function")n.__slInputCleanup();const v=[];let a=false;let i="";const b=Boolean(o.disabled);const f=e=>n.querySelector(e);const x=e=>[...n.querySelectorAll(e)];const t=(e,r,p,g)=>{e.addEventListener(r,p,g);v.push(()=>e.removeEventListener(r,p,g))};const c=e=>new Intl.NumberFormat(n.lang||"en",{maximumFractionDigits:8}).format(e);const l=document.createElement("p");l.className="sl-status";l.setAttribute("role","status");l.setAttribute("aria-live","polite");n.append(l);function z(e,r,p){n.dataset.invalid=String(!e);l.dataset.tone=e?"success":"error";l.textContent=r;p.forEach(g=>g.setAttribute("aria-invalid",String(!e)))}let d=()=>({});const E=e=>JSON.parse(JSON.stringify(e));function I(){if(a)return;const e=JSON.stringify(d());if(e===i)return;i=e;const r=E(d());if(typeof o.onChange==="function")o.onChange(r);n.dispatchEvent(new CustomEvent("sl:change",{bubbles:true,composed:true,detail:r}))}function q(e,r){d=e;i=JSON.stringify(d());const p=n.closest("form");const g=()=>queueMicrotask(()=>{if(!a){r();i=JSON.stringify(d())}});if(p)t(p,"reset",g);const k=()=>{if(a)return;a=true;v.splice(0).forEach(S=>S());l.remove();if(n.__slInputCleanup===k)delete n.__slInputCleanup};Object.defineProperty(n,"__slInputCleanup",{value:k,configurable:true,writable:true});x("input,button").forEach(S=>{S.disabled=b});return{reset(){if(a)return;r();i=JSON.stringify(d())},destroy:k,get state(){return E(d())}}}const u=f(".sl-main"),N=f(".sl-path");const h=String(o.value??u.value);let m=h;function y(e=false){m=u.value;const r=/^[\p{L}\p{N}]+(?:-[\p{L}\p{N}]+)*$/u.test(m)&&m.length<=60;N.textContent="/"+(m||"…");z(r,r?"Readable path is ready.":"Use letters, numbers and single hyphens.",[u]);if(e)I()}u.value=h;t(u,"input",()=>y(true));y();return q(()=>({value:m,valid:n.dataset.invalid!=="true"}),()=>{u.value=h;m=h;y()})}function w(n){return s(n)}return{mount:s,mountPreview:w}})()}function M(s,w={},{preview:n=false}={}){if(!s||typeof s.attachShadow!=="function")throw new TypeError("A DOM host is required");const o=s.shadowRoot||s.attachShadow({mode:"open"});o.innerHTML=P;const v=s.ownerDocument.createElement("style");const a=new URL("./instrument-sans-variable.woff2",import.meta.url).href;v.textContent=A.replaceAll("./instrument-sans-variable.woff2",a)+':host{display:block;min-width:0;max-width:100%;font-family:"Instrument Sans",sans-serif}[hidden]{display:none!important}';o.prepend(v);const i=o.querySelector(".sl-component");if(!i){o.replaceChildren();throw new Error("Missing component root")}const b=_(s.ownerDocument,a);let f,x=false;try{const t=L(),c={};if(C==="upload")c.input=o.querySelector('input[type="file"]');if(["like","copy","download","bookmark","playback","delete","upload","share","follow"].includes(C))c.feedback=o.querySelector("."+C+"-feedback");if(n&&typeof t.mountPreview!=="function")throw new Error("This source has no preview adapter; supply its documented application callbacks.");f=(n?t.mountPreview:t.mount)(i,{...c,...w});if(typeof f?.destroy!=="function")throw new Error("Missing source cleanup contract")}catch(t){b();o.replaceChildren();throw t}return new Proxy(f,{get(t,c){if(c==="destroy")return()=>{if(x)return;x=true;try{t.destroy()}finally{b();o.replaceChildren()}};const l=Reflect.get(t,c,t);return typeof l==="function"?l.bind(t):l}})}export{M as mountInto,C as variant};
