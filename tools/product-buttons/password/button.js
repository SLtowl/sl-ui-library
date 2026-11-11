const RULES=[{label:'8 or more characters',test:v=>v.length>=8},{label:'A number',test:v=>/\d/.test(v)},{label:'A symbol',test:v=>/[^\p{L}\p{N}\s]/u.test(v)}];
const ROW=40,TOP=6;
// native false draws dots over plain text, for pages that should not attract password managers.
// mount(root, { rules, native, onChange({ value, valid }) }) → { state, reset(), destroy() }
// rules is a list of { label, test(value) }.
function mount(root,{rules=RULES,native=true,onChange=()=>{}}={}){
  root.__pb?.destroy();
  pbPrepare(root);
  const $=s=>root.querySelector(s),input=$('input'),list=$('.pw-rules'),sheet=$('.pw-sheet'),shade=$('.pw-shade'),reveal=$('.pw-reveal'),show=$('.pw-show'),say=$('[role=status]');
  const FULL=TOP+rules.length*ROW;
  root.style.setProperty('--full',FULL+'px');
  if(!native){input.type='text';root.classList.add('pw-css');for(const [k,v] of [['data-bwignore','true'],['data-1p-ignore','true'],['data-lpignore','true'],['data-form-type','other']])input.setAttribute(k,v);input.autocomplete='off'}
  const items=rules.map((rule,i)=>{
    const li=document.createElement('li'),mark=document.createElement('span'),text=document.createElement('span');
    li.className='pw-rule';li.style.top=`${TOP+i*ROW}px`;mark.className='pw-mark';mark.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><path pathLength="1" d="m5 12.5 4.5 4.5L19 7.5"/></svg>';text.textContent=rule.label;li.append(mark,text);list.append(li);return li;
  });
  let focused=false,shown=false,timer=0,whole=false;
  const reach=h=>{sheet.style.translate=shade.style.translate=reveal.style.translate=`0 ${h-FULL}px`;list.style.translate=`0 ${FULL-h}px`};
  const phase=next=>{root.dataset.phase=next;reach(next==='open'?FULL:0)};
  const sync=()=>{
    const value=input.value,met=rules.map(rule=>rule.test(value));
    met.forEach((ok,i)=>items[i].classList.toggle('met',ok));
    const all=met.every(Boolean);
    if(all!==whole){whole=all;root.classList.toggle('pw-whole',all);say.textContent=all?'Password meets all conditions':''}
    clearTimeout(timer);
    // The last check draws first, then the sheet folds.
    if(focused){if(all)timer=setTimeout(()=>phase('idle'),pwWait());else phase('open')}
    onChange({value,valid:all});
  };
  const pwWait=()=>pbCalm()?0:520;
  const conceal=()=>{
    root.classList.toggle('pw-shown',shown);root.classList.toggle('pw-on',shown);show.setAttribute('aria-pressed',String(shown));show.setAttribute('aria-label',shown?'Hide password':'Show password');
    if(native){const a=input.selectionStart,b=input.selectionEnd;input.type=shown?'text':'password';if(focused&&a!==null)input.setSelectionRange(a,b)}
  };
  // The text fades, changes while invisible and fades back, so letters and dots are never seen resizing.
  const toggle=()=>{
    shown=!shown;root.classList.toggle('pw-on',shown);
    if(pbCalm())return conceal();
    const out=input.animate([{opacity:1},{opacity:0}],{duration:90,easing:'ease-in',fill:'forwards'});
    setTimeout(()=>{conceal();out.cancel();input.animate([{opacity:0},{opacity:1}],{duration:170,easing:'ease-out'})},90);
  };
  const off=new AbortController(),on=(t,e,f)=>t.addEventListener(e,f,{signal:off.signal});
  on(input,'focus',()=>{focused=true;if(!whole)phase('open')});
  on(input,'blur',()=>{focused=false;clearTimeout(timer);phase('idle')});
  on(input,'input',sync);
  on(show,'pointerdown',e=>e.preventDefault());
  on(show,'click',toggle);
  on(sheet,'pointerdown',e=>e.preventDefault());
  // Never wider than its container, with a little air on both sides.
  const host=root.parentElement,fit=()=>{if(host)root.style.width=Math.min(380,host.clientWidth-36)+'px'};
  fit();
  const resize=typeof ResizeObserver==='function'&&host?new ResizeObserver(fit):null;
  resize?.observe(host);
  const api={get state(){return{phase:root.dataset.phase,valid:whole,shown}},reset(){clearTimeout(timer);input.value='';shown=false;conceal();sync();phase('idle')},destroy(){clearTimeout(timer);off.abort();resize?.disconnect();items.forEach(li=>li.remove());delete root.__pb}};
  root.__pb=api;
  return api;
}// The catalog preview keeps password managers out of the card.
const demo = { native: false };
