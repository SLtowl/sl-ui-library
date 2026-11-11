export const validPalette=value=>['white','black','blue'].includes(value)||/^#[0-9a-f]{6}$/i.test(value);
const rgb=hex=>[1,3,5].map(i=>parseInt(hex.slice(i,i+2),16));
const mix=(a,b,t)=>'#'+rgb(a).map((v,i)=>Math.round(v+(rgb(b)[i]-v)*t).toString(16).padStart(2,'0')).join('');
const luminance=hex=>rgb(hex).map(v=>{v/=255;return v<=.04045?v/12.92:((v+.055)/1.055)**2.4;}).reduce((sum,v,i)=>sum+v*[.2126,.7152,.0722][i],0);
export function saveTheme(palette){
 if(!validPalette(palette))throw Error('Invalid Save color');
 const base={white:'#fafbfd',black:'#292d33',blue:'#55749a'}[palette]||palette;
 const dark=(luminance(base)+.05)/.05,light=1.05/(luminance(base)+.05);
 const ink=dark>=light?'#000000':'#ffffff';
 // Keep a visible fill on paper; reject a darker/lighter fill if it would
 // lower text contrast below 4.5:1 at either end of the animation.
 const candidate=mix(base,ink,.10);
 const candidateContrast=ink==='#000000'?(luminance(candidate)+.05)/.05:1.05/(luminance(candidate)+.05);
 const fill=candidateContrast>=4.5?candidate:mix(base,ink==='#000000'?'#ffffff':'#000000',.16);
 const hover=mix(base,ink==='#000000'?'#ffffff':'#000000',.06);
 const edge=palette==='white'?'#b9c5d3':mix(base,ink,.30);
 const cancelBase=palette==='white'?'#292d33':['black','blue'].includes(palette)?'#e4e3e0':base;
 const cancelInk=luminance(cancelBase)>.179?'#000000':'#ffffff';
 const cancelHover=mix(cancelBase,cancelInk==='#000000'?'#ffffff':'#000000',.06);
 return `.button-kit{--ink:${base};--secondary-foreground:${base};--primary-foreground:${ink};--primary-hover:${hover};--save-feedback:${fill};--save-edge:${edge};--focus-ring:#526c8a}
.bk-button--save .bk-surface{background-color:${base};outline:none}
.bk-button--save:not([aria-disabled="true"]):hover .bk-surface{background-color:${hover}}
.bk-button--save{color:${ink}}
.bk-button--cancel{color:${cancelInk};--secondary:${cancelBase};--secondary-hover:${cancelHover};--secondary-feedback:${mix(cancelBase,cancelInk,.10)}}
.bk-button--cancel .bk-surface{background-color:${cancelBase};box-shadow:inset 0 0 0 1px ${mix(cancelBase,cancelInk,.22)}}
.bk-button--cancel:hover .bk-surface{background-color:${cancelHover}}`;
}
const clamp=(v,min,max)=>Math.max(min,Math.min(max,v));
function toHsv(hex){const [r,g,b]=rgb(hex).map(v=>v/255),max=Math.max(r,g,b),min=Math.min(r,g,b),d=max-min;let h=0;if(d)h=max===r?((g-b)/d+6)%6:max===g?(b-r)/d+2:(r-g)/d+4;return {h:h*60,s:max?d/max:0,v:max};}
function fromHsv({h,s,v}){const c=v*s,x=c*(1-Math.abs((h/60)%2-1)),m=v-c;const values=h<60?[c,x,0]:h<120?[x,c,0]:h<180?[0,c,x]:h<240?[0,x,c]:h<300?[x,0,c]:[c,0,x];return '#'+values.map(n=>Math.round((n+m)*255).toString(16).padStart(2,'0')).join('');}
export function attachCustomColor(group,frame,onChange,setPalette){
 const button=document.createElement('button');button.type='button';button.className='palette-swatch palette-custom';button.dataset.palette='custom';button.setAttribute('aria-label','Custom color');button.title='Custom color';button.setAttribute('aria-pressed','false');button.setAttribute('aria-expanded','false');
 const panel=document.createElement('div');panel.className='custom-color-panel';panel.setAttribute('popover','auto');
 // Static trusted UI. User HEX values only ever pass the strict validator.
 panel.innerHTML='<div class="custom-color-heading"><strong>Custom color</strong><button type="button" aria-label="Close color picker">×</button></div><button class="color-well-button" type="button" aria-expanded="false"><span>Choose any color</span><span class="color-well" aria-hidden="true"></span></button><div class="color-editor"><div class="color-editor-clip"><div class="color-editor-content" inert><div class="color-plane" role="group" tabindex="0" aria-label="Saturation and brightness. Use left and right arrows for saturation, up and down for brightness."><span class="color-point"></span></div><label class="hue-row"><span>Hue</span><input type="range" min="0" max="359" step="1" value="212" aria-label="Hue"></label></div></div></div><label class="hex-row"><span>HEX</span><input type="text" value="#55749a" maxlength="7" spellcheck="false" autocomplete="off" aria-label="HEX color"></label><p class="color-hint">Text contrast adjusts automatically.</p><span class="color-error" role="status"></span>';
 const well=panel.querySelector('.color-well-button'),editor=panel.querySelector('.color-editor'),content=panel.querySelector('.color-editor-content'),plane=panel.querySelector('.color-plane'),hue=panel.querySelector('[type=range]'),hex=panel.querySelector('[type=text]'),error=panel.querySelector('.color-error');
 let timer,paintFrame,last=frame.dataset.palette?.startsWith('#')?frame.dataset.palette:'#55749a',hsv=toHsv(last),dragging=false;
 function paint(){panel.style.setProperty('--picked-color',last);panel.style.setProperty('--picked-hue',hsv.h);panel.style.setProperty('--picked-x',(hsv.s*100)+'%');panel.style.setProperty('--picked-y',((1-hsv.v)*100)+'%');hue.value=Math.round(hsv.h);hex.value=last.toUpperCase();plane.setAttribute('aria-label',`Saturation ${Math.round(hsv.s*100)}%, brightness ${Math.round(hsv.v*100)}%. Left/right changes saturation, up/down brightness.`);}
 function position(){if(!panel.matches(':popover-open'))return;const rect=button.getBoundingClientRect(),height=panel.offsetHeight;panel.style.left=Math.max(12,Math.min(innerWidth-276,rect.right-264))+'px';panel.style.top=Math.max(12,Math.min(innerHeight-height-12,rect.bottom+8))+'px';}
 const resize=new ResizeObserver(position);
 frame.addEventListener('savepalettechange',event=>{if(event.detail.startsWith('#')){last=event.detail;button.dataset.palette=last;button.style.setProperty('--custom-color',last);}});
 function flushPalette(){cancelAnimationFrame(paintFrame);paintFrame=undefined;if(frame.isConnected)setPalette(frame,last);}
 function commit(){clearTimeout(timer);timer=undefined;if(!frame.isConnected)return;if(paintFrame)flushPalette();onChange(last);}
 function apply(value,fromField=false){
  if(!/^#[0-9a-f]{6}$/i.test(value))return;
  last=value.toLowerCase();if(!fromField)hsv=toHsv(last);paint();hex.removeAttribute('aria-invalid');error.textContent='';button.dataset.palette=last;button.style.setProperty('--custom-color',last);
  if(!paintFrame)paintFrame=requestAnimationFrame(flushPalette);for(const swatch of group.querySelectorAll('.palette-swatch'))swatch.setAttribute('aria-pressed',String(swatch===button));
  const dialog=group.closest('dialog');for(const action of dialog?.querySelectorAll('#copy-source,#download-link')||[])action.disabled=true;
  clearTimeout(timer);timer=setTimeout(commit,120);
 }
 well.addEventListener('click',()=>{const open=well.getAttribute('aria-expanded')!=='true';well.setAttribute('aria-expanded',String(open));editor.classList.toggle('is-open',open);content.inert=!open;});
 function pick(event){const rect=plane.getBoundingClientRect();hsv.s=clamp((event.clientX-rect.left)/rect.width,0,1);hsv.v=1-clamp((event.clientY-rect.top)/rect.height,0,1);apply(fromHsv(hsv),true);}
 plane.addEventListener('pointerdown',event=>{if(event.button!==0)return;event.preventDefault();plane.focus({preventScroll:true});dragging=true;plane.setPointerCapture(event.pointerId);pick(event);});
 plane.addEventListener('pointermove',event=>{if(dragging)pick(event);});
 plane.addEventListener('pointerup',()=>{dragging=false;commit();});plane.addEventListener('lostpointercapture',()=>{dragging=false;});
 plane.addEventListener('keydown',event=>{const step=event.shiftKey?.1:.01;if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(event.key))return;event.preventDefault();if(event.key==='ArrowLeft')hsv.s=clamp(hsv.s-step,0,1);if(event.key==='ArrowRight')hsv.s=clamp(hsv.s+step,0,1);if(event.key==='ArrowUp')hsv.v=clamp(hsv.v+step,0,1);if(event.key==='ArrowDown')hsv.v=clamp(hsv.v-step,0,1);apply(fromHsv(hsv),true);});
 hue.addEventListener('input',()=>{hsv.h=Number(hue.value);apply(fromHsv(hsv),true);});hue.addEventListener('change',commit);
 hex.addEventListener('input',()=>{
  let value=hex.value.trim();if(!value.startsWith('#'))value='#'+value;
  if(/^#[0-9a-f]{6}$/i.test(value))apply(value);else{hex.setAttribute('aria-invalid','true');error.textContent='Enter a valid HEX color.';}
 });
 hex.addEventListener('keydown',event=>{if(event.key==='Enter'){event.preventDefault();event.stopPropagation();if(!hex.hasAttribute('aria-invalid')){commit();panel.hidePopover();button.focus();}}});
 panel.querySelector('button').addEventListener('click',()=>{panel.hidePopover();button.focus();});
 panel.addEventListener('keydown',event=>{if(event.key==='Escape'){event.preventDefault();event.stopPropagation();panel.hidePopover();button.focus();}});
 panel.addEventListener('toggle',event=>{const open=event.newState==='open';button.setAttribute('aria-expanded',String(open));if(open)resize.observe(panel);else{resize.disconnect();if(timer)commit();}});
 button.addEventListener('click',()=>{
  if(panel.matches(':popover-open')){panel.hidePopover();return;}
  const active=frame.dataset.palette;if(active?.startsWith('#'))last=active;
  hsv=toHsv(last);paint();error.textContent='';hex.removeAttribute('aria-invalid');
  panel.showPopover();position();
 });
 group.addEventListener('click',event=>{if(event.target.closest('.palette-swatch')!==button&&!panel.contains(event.target)){clearTimeout(timer);timer=undefined;cancelAnimationFrame(paintFrame);paintFrame=undefined;if(panel.matches(':popover-open'))panel.hidePopover();}});
 if(frame.dataset.palette?.startsWith('#')){button.dataset.palette=last;button.style.setProperty('--custom-color',last);}
 group.append(button,panel);
}
