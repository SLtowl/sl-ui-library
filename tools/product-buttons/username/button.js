const ROW=46,GAP=2,TOP=6,MIN=3;
const clean=value=>value.toLowerCase().replace(/[^a-z0-9_.-]/g,'');
const nearby=name=>[`${name}_studio`,`${name}.works`,`the_${name}`];
// check(name, { signal }) answers true for free, false for taken, or { free, suggest: [names] }.
// mount(root, { check, suggest(name), onChange({ name, free }), limit }) → { state, reset(), destroy() }
function mount(root,{check=async()=>true,suggest=nearby,onChange=()=>{},limit=3}={}){
  root.__pb?.destroy();
  pbPrepare(root);
  const FULL=TOP+limit*ROW+(limit-1)*GAP;
  root.style.setProperty('--full',FULL+'px');
  const $=s=>root.querySelector(s),input=$('input'),list=$('.un-list'),knob=$('.un-knob'),sheet=$('.un-sheet'),shade=$('.un-shade'),reveal=$('.un-reveal'),say=$('[role=status]');
  const uid=list.id;
  let request=null,timer=0,busy=0,names=[],active=-1,rows=[];
  const state=next=>{if(next)root.dataset.state=next;return root.dataset.state};
  const focused=()=>root.getRootNode().activeElement===input;
  const reach=h=>{sheet.style.translate=shade.style.translate=reveal.style.translate=`0 ${h-FULL}px`;list.style.translate=`0 ${FULL-h}px`};
  const slot=i=>TOP+i*(ROW+GAP);
  const setActive=i=>{
    const hidden=knob.style.opacity==='0'||!knob.style.opacity;active=i;
    if(i<0){knob.style.opacity=0;input.removeAttribute('aria-activedescendant');return}
    if(hidden){knob.style.transition='none';knob.style.translate=`0 ${slot(i)}px`;void knob.offsetWidth;knob.style.transition=''}else knob.style.translate=`0 ${slot(i)}px`;
    knob.style.opacity=1;input.setAttribute('aria-activedescendant',rows[i].id);
  };
  rows=Array.from({length:limit},(_,i)=>{
    const el=document.createElement('div');el.className='un-row';el.id=`${uid}-${i}`;el.setAttribute('role','option');el.style.top=`${slot(i)}px`;
    el.addEventListener('pointerdown',e=>e.preventDefault());
    el.addEventListener('pointermove',()=>{if(i!==active)setActive(i)});
    el.addEventListener('click',()=>pick(names[i]));
    list.append(el);return el;
  });
  sheet.addEventListener('pointerdown',e=>e.preventDefault());
  const open=()=>{root.dataset.sheet='open';reach(FULL);input.setAttribute('aria-expanded','true')};
  const fold=()=>{root.dataset.sheet='closed';reach(0);setActive(-1);input.setAttribute('aria-expanded','false')};
  const fill=next=>{
    const changed=names.join()!==next.join();names=next;
    rows.forEach((el,i)=>{el.textContent=next[i]||'';if(changed&&!pbCalm())el.animate([{opacity:0},{opacity:1}],{duration:180,easing:'ease-out'})});
  };
  const report=free=>onChange({name:input.value,free});
  const settle=(verdict,suggestions)=>{
    clearTimeout(busy);state(verdict);
    if(verdict==='taken'){fill(suggestions.slice(0,limit));if(focused())open();say.textContent=`${input.value} is taken`;report(false)}
    else{fold();say.textContent=`${input.value} is free`;report(true)}
  };
  const run=async name=>{
    const mine=request=new AbortController();
    busy=setTimeout(()=>{if(request===mine)state('checking')},160);
    try{
      const answer=await check(name,{signal:mine.signal});
      if(request!==mine)return;
      const free=typeof answer==='object'?answer.free:answer;
      settle(free?'free':'taken',typeof answer==='object'&&answer.suggest?answer.suggest:suggest(name));
    }catch{if(request===mine){clearTimeout(busy);state('typing')}}
  };
  const changed=()=>{
    const left=clean(input.value.slice(0,input.selectionStart)).length,value=clean(input.value);
    if(value!==input.value){input.value=value;input.setSelectionRange(left,left)}
    clearTimeout(timer);clearTimeout(busy);request?.abort();request=null;
    fold();
    if(value.length<MIN){state(value?'typing':'empty');say.textContent='';report(false);return}
    state('typing');
    timer=setTimeout(()=>run(value),pauseAfter());
  };
  const pauseAfter=()=>pbCalm()?0:320;
  function pick(name){
    if(!name)return;
    clearTimeout(timer);clearTimeout(busy);request?.abort();request=null;fold();
    // The word changes while it is invisible, so its letters are never seen shifting.
    const write=()=>{input.value=name;const end=name.length;input.setSelectionRange(end,end);state('free');say.textContent=`${name} is free`;report(true)};
    if(pbCalm())return write();
    const out=input.animate([{opacity:1},{opacity:0}],{duration:90,easing:'ease-in',fill:'forwards'});
    setTimeout(()=>{write();out.cancel();input.animate([{opacity:0},{opacity:1}],{duration:180,easing:'ease-out'})},90);
  }
  const off=new AbortController(),on=(t,e,f)=>t.addEventListener(e,f,{signal:off.signal});
  on(input,'input',changed);
  on(input,'focus',()=>{if(state()==='taken')open()});
  on(input,'blur',fold);
  on(input,'keydown',e=>{
    const isOpen=root.dataset.sheet==='open';
    if((e.key==='ArrowDown'||e.key==='ArrowUp')&&isOpen){e.preventDefault();const step=e.key==='ArrowDown'?1:-1;setActive(active<0?(step>0?0:limit-1):(active+step+limit)%limit)}
    else if(e.key==='Enter'){e.preventDefault();if(isOpen&&active>=0)pick(names[active])}
    else if(e.key==='Escape'&&isOpen){e.preventDefault();fold()}
  });
  // Never wider than its container, with a little air on both sides.
  const host=root.parentElement,fit=()=>{if(host)root.style.width=Math.min(380,host.clientWidth-36)+'px'};
  fit();
  const resize=typeof ResizeObserver==='function'&&host?new ResizeObserver(fit):null;
  resize?.observe(host);
  const api={get state(){return{state:state(),name:input.value}},reset(){clearTimeout(timer);clearTimeout(busy);request?.abort();request=null;input.value='';fold();state('empty')},destroy(){clearTimeout(timer);clearTimeout(busy);request?.abort();off.abort();resize?.disconnect();rows.forEach(el=>el.remove());delete root.__pb}};
  root.__pb=api;
  return api;
}// The catalog preview checks a short pretend list, fits its rows to the card and says what to type.
const demo = {
  prepare: root => {
    const rows = Math.max(1, Math.min(3, Math.floor(((root.parentElement?.clientHeight || 252) / .85 - 76) / 48)));
    demo.limit = rows;
    root.style.setProperty('--rise', 13 - 24 * rows + 'px');
    const hint = document.createElement('p');
    hint.className = 'un-hint';
    hint.innerHTML = '<span><i>Works: </i><b>anna_lee</b></span><span><i>Refused: </i><b>anna</b></span>';
    root.insertBefore(hint, root.querySelector('[role=status]'));
  },
  check: async (name, { signal }) => { await pbWait(500, signal); return !['anna', 'alex', 'studio', 'admin', 'design'].includes(name); },
  limit: 3,
};
