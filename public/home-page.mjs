import './site-preview-runtime.js';
import {setPreviewPalette} from './experiments/library-shell/site-catalog-palettes.mjs';
import {mountHeader,goCatalog,goDocs} from './site-shell/shell.mjs';
mountHeader();
const CATALOG='./catalog.html';document.getElementById('browse').href=CATALOG;document.getElementById('shot').href=CATALOG;
const calm=matchMedia('(prefers-reduced-motion:reduce)');
// Two live components from the library, ready to be pressed.
// Variants named directly, so the home page does not load the whole catalog list for two buttons.
for(const [box,variant,label] of [['f1','wifi-toggle-combined','Wi-Fi'],['f2','copy','Copy']]){const f=document.createElement('sl-preview');f.setAttribute('variant',variant);f.setAttribute('aria-label',label);document.getElementById(box).append(f);setPreviewPalette(f,'white');quiet(f)}
// On the home page Copy is just the button: its status line stays for screen readers but is not shown.
// The preview loads on demand and its palette swaps the stylesheets, so the rule is put back after each of those.
const QUIET=new CSSStyleSheet();QUIET.replaceSync('.copy-feedback,[data-feedback],[role=status]{position:absolute!important;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}');
function quiet(f){const add=()=>{const root=f.shadowRoot;if(root&&!root.adoptedStyleSheets.includes(QUIET))root.adoptedStyleSheets=[...root.adoptedStyleSheets,QUIET]};
  for(const type of ['previewloaded','savepalettechange'])f.addEventListener(type,()=>queueMicrotask(add));customElements.whenDefined('sl-preview').then(add);
  // Copying re-renders the status line inside the component, never its sheets, but a late palette pass could; check once more after it settles.
  setTimeout(add,1500)}
// Browse components zooms the page away and opens the catalog on the section shown in the window, with its entrance.
// Ctrl/Cmd-click and the middle button keep their usual behaviour.
const win=document.getElementById('shot');
document.querySelector('.split a[href="./docs.html"]').addEventListener('click',goDocs);document.getElementById('browse').addEventListener('click',goCatalog);win.addEventListener('click',goCatalog);
// Coming back with the browser's Back button shows the page as it was.
addEventListener('pageshow',e=>{if(e.persisted)document.documentElement.classList.remove('going')});
// The catalog frame keeps the real page at its own width and scales it to fit, so text stays crisp.
// The catalog frame keeps the real page at its own width and scales it to fit, so text stays crisp.
const view=document.getElementById('view'),frame=view.querySelector('iframe');
const later=f=>('requestIdleCallback' in window)?requestIdleCallback(f,{timeout:1200}):setTimeout(f,300);
const start=()=>later(()=>{frame.addEventListener('load',()=>setTimeout(()=>frame.classList.add('ready'),250),{once:true});frame.src=frame.dataset.src});
document.readyState==='complete'?start():addEventListener('load',start,{once:true});
const fit=()=>{frame.style.transform=`scale(${view.clientWidth/1440})`};fit();new ResizeObserver(fit).observe(view);
// The floating components drift a few pixels against the pointer. Flat movement only, so they never blur.
const floats=[...document.querySelectorAll('.float')];let tRaf=0,lastE=null;
addEventListener('pointermove',e=>{if(calm.matches||e.pointerType==='touch')return;lastE=e;if(tRaf)return;tRaf=requestAnimationFrame(()=>{tRaf=0;const dx=lastE.clientX/innerWidth-.5,dy=lastE.clientY/innerHeight-.5;floats.forEach((f,i)=>{const k=i?-1:1;f.style.setProperty('--px',(dx*14*k).toFixed(1)+'px');f.style.setProperty('--py',(dy*10*k).toFixed(1)+'px')})})},{passive:true});
import('./site-shell/dots.mjs').then(m=>m.mountDots(document.getElementById('field')));
