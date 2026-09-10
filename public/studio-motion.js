import './preview-runtime.js?v=instant-4';
const previews=[...document.querySelectorAll('sl-preview')];
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
const recording=new URL(location.href).searchParams.has('record');
document.body.classList.toggle('recording',recording);
const wait=ms=>new Promise(resolve=>setTimeout(resolve,ms));
while(!previews.every(p=>p.dataset.ready==='true'))await wait(16);
await document.fonts.ready;
for(const p of previews){const style=document.createElement('style');style.textContent=`
 .stage{inset:0!important;display:flex!important;align-items:center;justify-content:center}.stage>.sl-slider,.stage>.nav-demo,.stage>.sl-toggle{width:calc(100% - 4px)!important;max-width:none!important}
 .sl-slider,.nav-surface,.sl-toggle{box-shadow:none!important;background:transparent!important;border-color:transparent!important}
 .nav-surface{width:100%;min-height:230px}.nav-demo{height:auto}.copy-feedback,.like-feedback,.bookmark-feedback{display:none}
 .button-kit{width:86%;gap:24px}.bk-button--save{width:100%!important;height:58px!important}.bk-button--cancel{width:60%!important;height:48px!important}
 .bk-surface,.sl-like{box-shadow:inset 0 1px 1px #ffffff24,0 2px 0 #151a14,0 4px 0 #10150f,0 6px 0 #080c08,3px 12px 8px #0008!important}
 .sl-like{width:82%!important;min-height:54px!important;background-image:linear-gradient(150deg,#ffffff0a,#00000018)!important}
 .sl-toggle__switch{filter:drop-shadow(2px 5px 2px #0008)}
 input[type=range]::-webkit-slider-thumb{box-shadow:0 2px 0 #b9bcb4,0 4px 0 #8b9185,3px 9px 5px #0008!important}
 .sl-toggle__title{font-size:20px;line-height:26px}.sl-toggle__status{font-size:15px;line-height:20px}
 .stage [data-studio-press]{transform:translateY(2px) scale(.975)!important;box-shadow:0 1px 2px #0005!important;transition:transform 180ms ease,box-shadow 180ms ease!important}
 `;p.shadowRoot.append(style)}
const find=(variant,selector)=>document.querySelector(`sl-preview[variant="${variant}"]`).shadowRoot.querySelector(selector);
// Film-only continuous motion: the exported rating keeps its original input step.
const ratingInput=find('rating-slider','input[type=range]');
ratingInput.step='any';
ratingInput.closest('.sl-slider').addEventListener('input',()=>{const label=Number(ratingInput.value).toFixed(1).replace(/\.0$/,'')+' / 5';find('rating-slider','[data-output]').textContent=label;ratingInput.setAttribute('aria-valuetext',label)});
async function press(variant,selector){const element=find(variant,selector);if(!element)throw Error('Missing studio control: '+variant);element.animate([{transform:'translateY(0) scale(1)'},{transform:'translateY(2px) scale(.975)',offset:.4},{transform:'translateY(0) scale(1)'}],{duration:360,easing:'cubic-bezier(.4,0,.2,1)'});await wait(120);element.click();}
async function rangeTo(value,duration){const input=find('rating-slider','input[type=range]'),from=Number(input.value);await new Promise(resolve=>{const start=performance.now();const tick=now=>{const t=Math.min(1,(now-start)/duration),e=t*t*t*(t*(6*t-15)+10);input.value=String(from+(value-from)*e);input.dispatchEvent(new Event('input',{bubbles:true}));if(t<1)requestAnimationFrame(tick);else{input.dispatchEvent(new Event('change',{bubbles:true}));resolve()}};requestAnimationFrame(tick)})}
let playing=false;
async function play(){if(playing)return;playing=true;document.body.dataset.playing='true';document.querySelector('#replay').disabled=true;try{
 await wait(300);
 await Promise.all([
  (async()=>{await press('pair','[data-action=save]');await wait(2650);await press('pair','[data-action=cancel]')})(),
  (async()=>{await press('like','button');await wait(1900);await press('like','button');await wait(1900);await press('like','button')})(),
  (async()=>{await press('theme-toggle','label');await wait(2150);await press('theme-toggle','label');await wait(2150);await press('theme-toggle','label')})(),
  (async()=>{await rangeTo(4.4,2500);await rangeTo(3,2700)})(),
  (async()=>{await press('tabs-navigation','[data-choice="1"]');await wait(1500);await press('tabs-navigation','[data-choice="2"]');await wait(1500);await press('tabs-navigation','[data-choice="0"]')})()
 ]);await wait(650);
 }finally{playing=false;document.body.dataset.playing='false';document.body.dataset.complete='true';document.querySelector('#replay').disabled=false}}
document.querySelector('#replay').onclick=()=>play();
window.studioFilm={play};document.body.dataset.ready='true';
if(!recording&&!reduced)play();
