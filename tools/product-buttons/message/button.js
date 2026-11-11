const LINE=22,BASE=52,PAD=100;
// mount(root, { onSend(text, { signal }), onChange({ text }), resetAfter, maxLines }) → { state, reset(), destroy() }
// Throw from onSend to keep the text and mark the message as not sent.
function mount(root,{onSend=async()=>{},onChange=()=>{},resetAfter=2400,maxLines=6}={}){
  root.__pb?.destroy();
  pbPrepare(root);
  const FULL=(maxLines-1)*LINE;
  root.style.setProperty('--full',FULL+'px');
  const $=s=>root.querySelector(s),area=$('textarea'),mirror=$('.ms-mirror'),sheet=$('.ms-sheet'),sendBtn=$('.ms-send'),sent=$('.ms-sent'),head=$('.ms-head'),say=$('[role=status]');
  let timer=0,request=null,lines=1;
  const state=next=>{if(next)root.dataset.state=next;return root.dataset.state};
  // The plate and well follow at once; the text box height is separate, so it can wait while the extra lines fade.
  const reach=n=>{root.style.setProperty('--h',BASE+(n-1)*LINE+'px');sheet.style.translate=`0 ${(n-1)*LINE-FULL}px`};
  const box=n=>{area.style.height=BASE+(n-1)*LINE+'px';area.style.overflowY=n>=maxLines?'auto':'hidden'};
  const measure=()=>{
    mirror.style.width=area.clientWidth-PAD+'px';mirror.textContent=area.value+'​';
    return Math.min(maxLines,Math.max(1,Math.round(mirror.offsetHeight/LINE)));
  };
  const fit=()=>{const n=measure();if(n!==lines){lines=n;reach(n);box(n)}};
  const changed=()=>{root.classList.remove('ms-bad');state(area.value.trim()?'typing':'empty');fit();onChange({text:area.value})};
  const finish=()=>{clearTimeout(timer);state(area.value.trim()?'typing':'empty')};
  const send=async()=>{
    const text=area.value.trim();
    if(!text||state()==='sending'||state()==='sent')return;
    state('sending');area.readOnly=true;say.textContent='Sending';
    const mine=request=new AbortController();
    try{await Promise.all([onSend(text,{signal:mine.signal}),pbWait(pbCalm()?0:500,mine.signal)])}
    catch{
      if(mine.signal.aborted)return;
      area.readOnly=false;state('typing');root.classList.add('ms-bad');say.textContent='Not sent. Try again';pbShake(head);return;
    }
    // The first line is cut from the box in the same frame the one-line copy appears, so it is never drawn twice.
    sent.textContent=text.replace(/\s*\n\s*/g,' ');
    if(!area.scrollTop)area.style.clipPath=`inset(${15+LINE}px 0 0 0)`;
    state('sent');lines=1;reach(1);say.textContent='Message sent';
    root.dispatchEvent(new CustomEvent('pb:message',{detail:{text},bubbles:true}));
    timer=setTimeout(()=>{area.value='';area.scrollTop=0;area.style.clipPath='';box(1);area.readOnly=false;onChange({text:''});timer=setTimeout(finish,pbCalm()?0:Math.max(0,resetAfter-180))},pbCalm()?0:180);
  };
  const off=new AbortController(),on=(t,e,f)=>t.addEventListener(e,f,{signal:off.signal});
  on(area,'input',changed);
  on(area,'keydown',e=>{if(e.key==='Enter'&&!e.shiftKey&&!e.isComposing){e.preventDefault();send()}});
  // Typing right after sending starts the next message at once.
  on(area,'beforeinput',()=>{if(state()==='sent'&&!area.readOnly){clearTimeout(timer);state('empty')}});
  on(sendBtn,'pointerdown',e=>e.preventDefault());
  on(sendBtn,'click',send);
  const resize=new ResizeObserver(fit);resize.observe(area);
  // Never wider than its container, with a little air on both sides.
  const host=root.parentElement,fitWidth=()=>{if(host)root.style.width=Math.min(380,host.clientWidth-36)+'px'};
  fitWidth();
  const hostResize=host?new ResizeObserver(fitWidth):null;
  hostResize?.observe(host);
  const api={get state(){return{state:state(),text:area.value,lines}},reset(){clearTimeout(timer);request?.abort();area.value='';area.readOnly=false;area.style.clipPath='';lines=1;reach(1);box(1);root.classList.remove('ms-bad');state('empty')},destroy(){clearTimeout(timer);request?.abort();off.abort();resize.disconnect();hostResize?.disconnect();delete root.__pb}};
  root.__pb=api;
  return api;
}// The catalog preview sends nothing. The word "fail" is refused, and a line under the field says how to try it.
const demo = {
  prepare: root => {
    demo.maxLines = (root.parentElement?.clientHeight || 252) / .85 < 240 ? 5 : 6;
    const hint = document.createElement('p');
    hint.className = 'ms-hint';
    hint.innerHTML = '<span><i>Send: </i><b>Enter</b></span><span><i>New line: </i><b>Shift + Enter</b></span><span><i>Refused: </i><b>fail</b></span>';
    root.insertBefore(hint, root.querySelector('[role=status]'));
  },
  onSend: async text => { if (/^fail$/i.test(text.trim())) throw new Error('Refused'); },
};
