import {mountHeader,goCatalog,goDocs} from './site-shell/shell.mjs';
mountHeader();
const calm=matchMedia('(prefers-reduced-motion:reduce)');
// These previews are hidden at phone widths, so load their runtime only when they can be used.
const floatsHidden = matchMedia('(max-width:560px)');
async function mountFloatingPreviews() {
  if (floatsHidden.matches) return;
  floatsHidden.removeEventListener('change', mountFloatingPreviews);
  await Promise.all([
    import('./packages/copy/buttons.js'),
    import('./packages/wifi-toggle/buttons.js'),
  ]);
  window.MatteCopy.mount(document.querySelector('#f2 .sl-copy'), {
    getText: () => 'SL UI Library',
    feedback: document.querySelector('#f2 .copy-feedback'),
  });
  window.MatteToggle.mount(document.querySelector('#f1 .sl-toggle'));
}
floatsHidden.addEventListener('change', mountFloatingPreviews);
mountFloatingPreviews();
// Browse components zooms the page away and opens the catalog on the section shown in the window, with its entrance.
// Ctrl/Cmd-click and the middle button keep their usual behaviour.
const win=document.getElementById('shot');
document.querySelector('.split a[href="./docs/"]').addEventListener('click',goDocs);document.getElementById('browse').addEventListener('click',goCatalog);win.addEventListener('click',goCatalog);
// Coming back with the browser's Back button shows the page as it was.
addEventListener('pageshow',e=>{if(e.persisted)document.documentElement.classList.remove('going')});
// The floating components drift a few pixels against the pointer. Flat movement only, so they never blur.
const floats=[...document.querySelectorAll('.float')];let tRaf=0,lastE=null;
addEventListener('pointermove',e=>{if(floatsHidden.matches||calm.matches||e.pointerType==='touch')return;lastE=e;if(tRaf)return;tRaf=requestAnimationFrame(()=>{tRaf=0;const dx=lastE.clientX/innerWidth-.5,dy=lastE.clientY/innerHeight-.5;floats.forEach((f,i)=>{const k=i?-1:1;f.style.setProperty('--px',(dx*14*k).toFixed(1)+'px');f.style.setProperty('--py',(dy*10*k).toFixed(1)+'px')})})},{passive:true});
import('./site-shell/dots.mjs').then(m=>m.mountDots(document.getElementById('field')));
