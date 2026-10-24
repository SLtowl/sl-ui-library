import {mountSiteCursor} from './site-cursor.mjs';
import {mountReliefCTA} from './hero-controls.mjs';
import {mountAmbientRelief} from './ambient-relief.mjs';

const intro=document.querySelector('#intro'), workspace=document.querySelector('#workspace');
const explore=document.querySelector('#explore'), copy=intro.querySelector('.hero-copy');
const reduced=matchMedia('(prefers-reduced-motion:reduce)');
const cursor=mountSiteCursor(), cta=mountReliefCTA(explore), ambient=mountAmbientRelief(intro);
const root=document.body;
let catalog, loading, animationFrame=0, revision=0, state='hero', pieces=[], assembly=[];
let wheelFrame=0,wheelTarget=0,wheelFrom=0,wheelStarted=0,wheelPosition=0;
const wheelDuration=160;
const background=intro.querySelector('.relief-background'),glow=intro.querySelector('.relief-ambient');
const backdrop=document.createElement('div'),art=document.createElement('div');
backdrop.className='journey-backdrop';art.className='journey-art';
backdrop.setAttribute('aria-hidden','true');backdrop.hidden=true;backdrop.append(art);root.prepend(backdrop);
const smooth=t=>{t=Math.max(0,Math.min(1,t));return t*t*t*(t*(t*6-15)+10);};
const phase=(t,a,b)=>smooth((t-a)/(b-a));
const settings=fetch(new URL('./scroll-motion.tokens.json',import.meta.url)).then(async response=>{
  if(!response.ok)throw new Error('Motion settings unavailable');
  const {motion}=await response.json();
  return {duration:motion.duration.descent.$value.value,returnDuration:motion.duration.return.$value.value,chrome:motion.duration.interface.$value.value,
    exit:motion.progress.titleExitEnd.$value,start:motion.progress.piecesStart.$value,
    bias:motion.easing.accelerationBias.$value,stagger:motion.reveal.stagger.$value.value,pop:motion.reveal.duration.$value.value,
    scaleFrom:motion.reveal.scaleFrom.$value,scalePeak:motion.reveal.scalePeak.$value,peakAt:motion.reveal.peakAt.$value,opacityEnd:motion.reveal.opacityEnd.$value,
    fadeStart:motion.progress.backgroundFadeStart.$value,fadeEnd:motion.progress.backgroundFadeEnd.$value,
    backdropTravel:motion.background.travelRatio.$value,backdropScale:motion.background.scaleDelta.$value,
    assembly:Object.fromEntries(Object.entries(motion.assembly).map(([key,token])=>[key,token.$type==='duration'?token.$value.value:token.$value]))};
});
// The initial paint stays light; actual previews are prepared before they can enter view.
function prepare(){
  if(catalog)return Promise.resolve(catalog);
  loading??=import('./catalog-rail.mjs').then(m=>m.mountWorkspace(workspace)).then(value=>{
    catalog=value;catalog.restore(new URLSearchParams());return catalog;
  }).catch(error=>{loading=null;throw error;});
  return loading;
}
const ready=Promise.all([settings,prepare()]);
ready.catch(()=>{});
function paint(pieces,chrome){root.style.setProperty('--pieces',String(pieces));root.style.setProperty('--chrome',String(chrome));}
function mark(next){stopWheelScroll();state=next;root.dataset.journey=next;}
function refresh(){cursor.refresh();cta.refresh();ambient.setActive(!document.hidden&&scrollY<intro.offsetHeight);}
function cancel(){revision++;cancelAnimationFrame(animationFrame);animationFrame=0;}
function planAssembly(tokens){
  const a=tokens.assembly;
  const add=(element,delay,x=0,y=a.distance,surface=false)=>{
    if(!element)return;
    assembly.push({element,delay,x,y,surface});
    if(surface)element.style.setProperty('--card-surface','0');
    else{element.dataset.assembly='';element.style.setProperty('--assembly-opacity','0');element.style.setProperty('--assembly-x',`${x}px`);element.style.setProperty('--assembly-y',`${y}px`);}
  };
  const header=workspace.querySelector('.workspace-header');
  add(header,0,0,-a.distance);
  [...header.children].forEach((node,i)=>add(node,a.headerStep*(i+1)));
  const categories=workspace.querySelector('.categories');
  add(categories,a.categoriesAt,-a.distance,0);
  add(categories.querySelector('.sidebar-label'),a.categoriesAt+a.headerStep);
  [...categories.querySelectorAll('.category-nav-button')].forEach((node,i)=>add(node,a.categoriesAt+a.headerStep+i*a.categoryStep));
  add(categories.querySelector('.sidebar-note'),a.inspectorAt);
  add(workspace.querySelector('.catalog-heading'),a.headingAt);
  add(workspace.querySelector('.catalog-intro'),a.headingAt+a.headerStep);
  [...workspace.querySelectorAll('.component-card')].forEach((card,i)=>{
    add(card,a.cardsAt+i*a.cardStep,0,0,true);
    add(card.querySelector('.card-footer'),a.cardsAt+i*a.cardStep+a.captionDelay);
  });
  add(workspace.querySelector('.load-more'),a.inspectorAt+a.headerStep);
}
function restoreArt(){
  if(background.parentElement===art){intro.prepend(background);if(glow)intro.prepend(glow);}
  backdrop.hidden=true;art.removeAttribute('style');
  for(const piece of pieces){piece.style.removeProperty('--piece-opacity');piece.style.removeProperty('--piece-scale');}
  pieces=[];
  for(const {element,surface} of assembly){
    if(surface)element.style.removeProperty('--card-surface');
    else{delete element.dataset.assembly;for(const name of ['--assembly-opacity','--assembly-x','--assembly-y'])element.style.removeProperty(name);}
  }
  assembly=[];
}
function unlock(){intro.inert=false;workspace.inert=false;explore.removeAttribute('aria-busy');}
function complete({scrollToEnd=true,focus=true}={}){
  cancel();workspace.hidden=false;
  // Rebase the document without moving the visible catalog. The intro is a
  // transition scene, not a scrollable section once the catalog is entered.
  const catalogScroll=scrollToEnd?0:Math.max(0,scrollY-workspace.offsetTop);
  copy.style.opacity='1';paint(1,1);restoreArt();unlock();mark('catalog');
  intro.hidden=true;intro.inert=true;
  window.scrollTo({top:catalogScroll,behavior:'instant'});
  document.title='Components · SL UI Library';
  if(focus)document.querySelector('#catalog-title').focus({preventScroll:true});
  refresh();
}
function home(){
  workspace.querySelectorAll('dialog[open]').forEach(dialog=>dialog.close());
  intro.hidden=false;
  cancel();window.scrollTo({top:0,behavior:'instant'});
  workspace.hidden=true;workspace.inert=true;intro.inert=false;
  copy.style.opacity='1';paint(1,1);restoreArt();mark('hero');explore.removeAttribute('aria-busy');
  document.title='Made to interact · SL UI Library';explore.focus({preventScroll:true});refresh();
}
async function returnHome(){
  if(state==='returning')return;
  if(reduced.matches){home();return;}
  cancel();const version=revision;mark('returning');
  let tokens;try{tokens=await settings;}catch{home();return;}
  if(version!==revision)return;
  const previousScroll=scrollY;
  workspace.querySelectorAll('dialog[open]').forEach(dialog=>dialog.close());
  intro.hidden=false;intro.inert=true;workspace.inert=true;copy.style.opacity='0';
  const target=workspace.offsetTop,from=target+previousScroll;
  // Restore the removed scene above the catalog and compensate in the same task.
  // This keeps every visible card in place before the reverse journey starts.
  window.scrollTo({top:from,behavior:'instant'});
  art.style.height=`${intro.offsetHeight}px`;art.style.opacity='0';
  art.style.transform=`translateY(${-target*tokens.backdropTravel}px) scale(${1+tokens.backdropScale})`;
  art.append(background);if(glow)art.append(glow);backdrop.hidden=false;
  ambient.setActive(false);
  const start=performance.now();
  function tick(now){
    if(version!==revision)return;
    const t=Math.min(1,(now-start)/tokens.returnDuration),travel=smooth(1-Math.pow(1-t,1.65));
    window.scrollTo({top:from*(1-travel),behavior:'instant'});
    paint(1-phase(t,.06,.46),1-phase(t,0,.34));
    art.style.opacity=String(phase(t,0,.62));
    art.style.transform=`translateY(${-target*tokens.backdropTravel*(1-travel)}px) scale(${1+tokens.backdropScale*(1-travel)})`;
    copy.style.opacity=String(phase(t,.52,.97));
    if(t<1)animationFrame=requestAnimationFrame(tick);else home();
  }
  animationFrame=requestAnimationFrame(tick);
}
async function enter({animate=true}={}){
  if(state==='loading'||state==='moving')return;
  cancel();const version=revision;
  mark('loading');explore.setAttribute('aria-busy','true');
  let tokens;
  try{
    [tokens]=await Promise.all([settings,prepare()]);
    if(version!==revision)return;
    catalog.restore(new URLSearchParams(location.hash.split('?')[1]||''));
    document.querySelector('#catalog-error').hidden=true;
  }catch{
    if(version!==revision)return;
    document.querySelector('#catalog-error').hidden=false;
    document.querySelector('#component-grid').setAttribute('aria-busy','false');
    complete();return;
  }
  if(version!==revision)return;
  workspace.hidden=false;workspace.inert=true;intro.inert=true;
  if(!animate||reduced.matches){complete();return;}
  paint(0,0);
  const from=scrollY;
  pieces=[...workspace.querySelectorAll('sl-preview')];
  planAssembly(tokens);
  for(const piece of pieces){piece.style.setProperty('--piece-opacity','0');piece.style.setProperty('--piece-scale',String(tokens.scaleFrom));}
  art.style.height=`${intro.offsetHeight}px`;art.style.opacity='1';
  art.style.transform=`translateY(${-from}px)`;
  // The first layout and preview font must not compete with the journey clock.
  // Keep the hero intact while the same final nodes become render-ready.
  workspace.getBoundingClientRect();
  try{await document.fonts.load('16px "Instrument Sans"');await document.fonts.ready;}catch{/* A fallback font must not block navigation. */}
  await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));
  if(version!==revision)return;
  if(reduced.matches){complete();return;}
  art.append(background);if(glow)art.append(glow);backdrop.hidden=false;
  mark('moving');
  const target=workspace.offsetTop;
  const start=performance.now();
  const assemblyStart=tokens.start*tokens.duration+tokens.assembly.afterFirstPop;
  const finish=Math.max(tokens.duration,assemblyStart+Math.max(0,...assembly.map(part=>part.delay))+tokens.chrome,tokens.start*tokens.duration+(pieces.length-1)*tokens.stagger+tokens.pop);
  function tick(now){
    if(version!==revision)return;
    const elapsed=now-start,t=Math.min(1,elapsed/tokens.duration);
    // Real document scroll: every preview remains the same node in its final grid cell.
    const travel=smooth(1-Math.pow(1-t,tokens.bias));
    window.scrollTo({top:from+(target-from)*travel,behavior:'instant'});
    copy.style.opacity=String(1-phase(t,0,tokens.exit));
    paint(1,phase(elapsed,assemblyStart,assemblyStart+tokens.chrome));
    for(const {element,delay,x,y,surface} of assembly){
      const progress=phase(elapsed,assemblyStart+delay,assemblyStart+delay+tokens.chrome);
      if(surface)element.style.setProperty('--card-surface',String(progress));
      else{element.style.setProperty('--assembly-opacity',String(progress));element.style.setProperty('--assembly-x',`${x*(1-progress)}px`);element.style.setProperty('--assembly-y',`${y*(1-progress)}px`);}
    }
    // One uninterrupted relief surface spans the viewport while the document moves.
    art.style.transform=`translateY(${-from*(1-travel)-target*tokens.backdropTravel*travel}px) scale(${1+tokens.backdropScale*travel})`;
    art.style.opacity=String(1-phase(t,tokens.fadeStart,tokens.fadeEnd));
    pieces.forEach((piece,index)=>{
      const delay=index*tokens.stagger;
      const progress=Math.max(0,Math.min(1,(elapsed-tokens.start*tokens.duration-delay)/tokens.pop));
      const grow=1-Math.pow(1-Math.min(1,progress/tokens.peakAt),3);
      const scale=progress<tokens.peakAt
        ? tokens.scaleFrom+(tokens.scalePeak-tokens.scaleFrom)*grow
        : tokens.scalePeak+(1-tokens.scalePeak)*phase(progress,tokens.peakAt,1);
      piece.style.setProperty('--piece-opacity',String(phase(progress,0,tokens.opacityEnd)));
      piece.style.setProperty('--piece-scale',String(scale));
    });
    if(elapsed<finish)animationFrame=requestAnimationFrame(tick);
    else complete();
  }
  animationFrame=requestAnimationFrame(tick);
}
explore.addEventListener('click',event=>{
  if(event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
  event.preventDefault();
  if(state==='moving'||state==='loading')return;
  if(!location.hash.startsWith('#catalog'))history.pushState(null,'','#catalog');
  enter();
});
document.querySelector('#home').addEventListener('click',event=>{
  if(event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
  event.preventDefault();
  if(state==='returning')return;
  history.pushState(null,'',location.pathname+location.search);
  returnHome();
});
function route(){if(location.hash.startsWith('#catalog'))enter({animate:false});else home();}
window.addEventListener('hashchange',route);
// User scrolling takes control immediately; no tween fights their wheel or touch.
function interrupt(){if(state==='moving')complete({scrollToEnd:false,focus:false});else if(state==='returning')home();}
window.addEventListener('wheel',interrupt,{passive:true});
// Ease coarse mouse-wheel steps only. Fine pixel deltas, touch, embedded
// scrollers and editing controls keep the browser's native handling.
function stopWheelScroll(){cancelAnimationFrame(wheelFrame);wheelFrame=0;}
function wheelTick(now){
  if(state!=='catalog'||reduced.matches||document.hidden||document.querySelector('dialog[open]')||Math.abs(scrollY-wheelPosition)>1){stopWheelScroll();return;}
  const max=Math.max(0,document.documentElement.scrollHeight-innerHeight);
  wheelTarget=Math.max(0,Math.min(max,wheelTarget));
  const progress=Math.min(1,(now-wheelStarted)/wheelDuration);
  window.scrollTo({top:wheelFrom+(wheelTarget-wheelFrom)*(1-(1-progress)**3),behavior:'instant'});
  wheelPosition=scrollY;
  if(progress<1&&Math.abs(wheelTarget-scrollY)>.5)wheelFrame=requestAnimationFrame(wheelTick);
  else{window.scrollTo({top:wheelTarget,behavior:'instant'});wheelFrame=0;}
}
function smoothWheel(event){
  const delta=event.deltaY;
  const coarse=event.deltaMode===1||(event.deltaMode===0&&Number.isInteger(delta)&&Math.abs(delta)>=80);
  if(state!=='catalog'||reduced.matches||document.hidden||event.defaultPrevented||!event.cancelable||event.ctrlKey||event.metaKey||event.altKey||event.shiftKey||event.deltaX||!coarse||document.querySelector('dialog[open]')){stopWheelScroll();return;}
  for(const node of event.composedPath()){
    if(!(node instanceof Element))continue;
    if(node.matches('input,textarea,select,[contenteditable]:not([contenteditable="false"]),[role="slider"]')||(node!==document.body&&node!==document.documentElement&&node.scrollHeight>node.clientHeight+1&&/(auto|scroll)/.test(getComputedStyle(node).overflowY))){stopWheelScroll();return;}
  }
  let target=wheelFrame?wheelTarget:scrollY;
  if(Math.sign(delta)!==Math.sign(target-scrollY))target=scrollY;
  const max=Math.max(0,document.documentElement.scrollHeight-innerHeight);
  target=Math.max(0,Math.min(max,target+delta*(event.deltaMode===1?20:1)));
  if(Math.abs(target-scrollY)<.5){stopWheelScroll();return;}
  event.preventDefault();
  wheelTarget=target;wheelFrom=wheelPosition=scrollY;wheelStarted=performance.now();
  if(!wheelFrame)wheelFrame=requestAnimationFrame(wheelTick);
}
window.addEventListener('wheel',smoothWheel,{passive:false});
window.addEventListener('pointerdown',stopWheelScroll,{passive:true});
window.addEventListener('touchstart',stopWheelScroll,{passive:true});
window.addEventListener('keydown',event=>{if(['PageDown','PageUp','Home','End','ArrowDown','ArrowUp',' '].includes(event.key))stopWheelScroll();});
window.addEventListener('resize',stopWheelScroll,{passive:true});
document.addEventListener('visibilitychange',()=>{if(document.hidden)stopWheelScroll();});
reduced.addEventListener('change',()=>{if(reduced.matches)stopWheelScroll();});
window.addEventListener('touchstart',interrupt,{passive:true});
window.addEventListener('scroll',refresh,{passive:true});
window.addEventListener('resize',()=>{if(state==='moving')complete();else if(state==='returning')home();});
document.addEventListener('visibilitychange',()=>{if(document.hidden){if(state==='moving')complete();else if(state==='returning')home();}});
reduced.addEventListener('change',()=>{if(reduced.matches){if(state==='moving')complete();else if(state==='returning')home();}});
document.addEventListener('keydown',event=>{
  if(state==='returning'&&['Escape','PageDown','PageUp','Home','End','ArrowDown','ArrowUp',' '].includes(event.key)){event.preventDefault();home();return;}
  if(event.key==='Escape'&&(state==='moving'||state==='loading')){
    history.replaceState(null,'',location.pathname+location.search);home();return;
  }
  if(['PageDown','PageUp','Home','End','ArrowDown','ArrowUp',' '].includes(event.key)&&state==='moving')interrupt();
  if(event.key==='Escape'){
    document.querySelector('#categories').classList.remove('is-open');
    const button=document.querySelector('#filter-toggle');
    if(button.getAttribute('aria-expanded')==='true'){button.setAttribute('aria-expanded','false');button.focus();}
  }
});
document.querySelector('#filter-toggle').addEventListener('click',()=>{
  const open=document.querySelector('#categories').classList.toggle('is-open');
  document.querySelector('#filter-toggle').setAttribute('aria-expanded',String(open));
});
document.querySelector('#retry-catalog').addEventListener('click',()=>{mark('hero');enter({animate:false});});
history.scrollRestoration='manual';
mark('hero');workspace.inert=true;
if(location.hash.startsWith('#catalog'))enter({animate:false});else window.scrollTo({top:0,behavior:'instant'});
