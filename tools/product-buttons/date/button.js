const MASK='## / ## / ####',MONTHS=['January','February','March','April','May','June','July','August','September','October','November','December'],DAYS=['Su','Mo','Tu','We','Th','Fr','Sa'];
const TOP=6,HEAD=36,WEEK=22,ROWS=6;
const pad=n=>String(n).padStart(2,'0');
const fill=digits=>{let i=0,out='';for(const c of MASK){if(i>=digits.length)break;if(c==='#')out+=digits[i++];else out+=c}return out};
const digitsOf=date=>pad(date.getMonth()+1)+pad(date.getDate())+date.getFullYear();
const midnight=date=>new Date(date.getFullYear(),date.getMonth(),date.getDate());
const same=(a,b)=>!!a&&!!b&&a.getFullYear()===b.getFullYear()&&a.getMonth()===b.getMonth()&&a.getDate()===b.getDate();
const realDate=(y,m,d)=>{const date=new Date(y,m-1,d);return date.getFullYear()===y&&date.getMonth()===m-1&&date.getDate()===d?date:null};
const iso=date=>`${date.getFullYear()}-${pad(date.getMonth()+1)}-${pad(date.getDate())}`;
function relative(date){
  const days=Math.round((midnight(date)-midnight(new Date()))/864e5),far=Math.abs(days),unit=(n,w)=>`${n} ${w}${n===1?'':'s'}`;
  if(!days)return'Today';if(days===1)return'Tomorrow';if(days===-1)return'Yesterday';
  const text=far<14?unit(far,'day'):far<60?unit(Math.round(far/7),'week'):far<730?unit(Math.round(far/30.44),'month'):unit(Math.round(far/365.25),'year');
  return days>0?`In ${text}`:`${text} ago`;
}
// mount(root, { min, max, onChange({ date, iso, valid }), cell }) → { state, reset(), destroy() }
// min and max are Date objects; days outside them cannot be chosen.
function mount(root,{min=null,max=null,onChange=()=>{},cell=36}={}){
  root.__pb?.destroy();
  pbPrepare(root);
  const $=s=>root.querySelector(s),input=$('input'),ghost=$('.dt-ghost'),rel=$('.dt-rel'),title=$('.dt-title'),days=$('.dt-days'),knob=$('.dt-knob'),sheet=$('.dt-sheet'),shade=$('.dt-shade'),reveal=$('.dt-reveal'),pick=$('.dt-pick'),head=$('.dt-head'),say=$('[role=status]');
  const FULL=TOP+HEAD+WEEK+ROWS*cell;
  root.style.setProperty('--full',FULL+'px');root.style.setProperty('--cell',cell+'px');
  const today=midnight(new Date()),example=fill(digitsOf(today));
  let view={y:today.getFullYear(),m:today.getMonth()},selected=null,dates=[],foldTimer=0,swapTimer=0,relText='',fades=[];
  const reach=h=>{sheet.style.translate=shade.style.translate=reveal.style.translate=`0 ${h-FULL}px`;pick.style.translate=`0 ${FULL-h}px`};
  const open=()=>{root.dataset.sheet='open';reach(FULL)};
  const fold=()=>{root.dataset.sheet='closed';reach(0)};
  $('.dt-week').innerHTML=DAYS.map(d=>`<span>${d}</span>`).join('');
  const cells=Array.from({length:42},(_,i)=>{
    const b=document.createElement('button');b.type='button';b.className='dt-day';
    b.addEventListener('pointerdown',e=>e.preventDefault());
    b.addEventListener('click',()=>choose(dates[i]));
    days.append(b);return b;
  });
  const allowed=date=>(!min||date>=midnight(min))&&(!max||date<=midnight(max));
  const placeKnob=()=>{
    const i=dates.findIndex(d=>same(d,selected));
    cells.forEach((b,n)=>{const on=n===i;b.classList.toggle('on',on);b.setAttribute('aria-selected',String(on))});
    if(i<0){knob.style.opacity=0;return}
    const at=`${(i%7)*100}% ${Math.floor(i/7)*100}%`,hidden=knob.style.opacity==='0'||!knob.style.opacity;
    if(hidden){knob.style.transition='none';knob.style.translate=at;void knob.offsetWidth;knob.style.transition=''}else knob.style.translate=at;
    knob.style.opacity=1;
  };
  const render=()=>{
    title.textContent=`${MONTHS[view.m]} ${view.y}`;
    const first=new Date(view.y,view.m,1);
    dates=cells.map((_,i)=>new Date(view.y,view.m,1-first.getDay()+i));
    cells.forEach((b,i)=>{const d=dates[i];b.textContent=d.getDate();b.classList.toggle('other',d.getMonth()!==view.m);b.classList.toggle('today',same(d,today));b.disabled=!allowed(d);b.setAttribute('aria-label',d.toDateString())});
    knob.style.opacity=0;placeKnob();
  };
  // Another month fades in where the last one stood; nothing slides.
  const show=(y,m)=>{
    const date=new Date(y,m,1),next={y:date.getFullYear(),m:date.getMonth()};
    if(next.y===view.y&&next.m===view.m)return;
    view=next;clearTimeout(swapTimer);
    if(pbCalm())return render();
    // A fade still running is dropped first, so fast clicks can never leave the calendar invisible.
    fades.forEach(a=>a.cancel());
    fades=[days,title].map(el=>el.animate([{opacity:1},{opacity:0}],{duration:70,easing:'ease-in',fill:'forwards'}));
    swapTimer=setTimeout(()=>{render();fades.forEach(a=>a.cancel());fades=[];[days,title].forEach(el=>el.animate([{opacity:0},{opacity:1}],{duration:170,easing:'ease-out'}))},70);
  };
  const setRel=text=>{
    if(text===relText)return;relText=text;
    if(pbCalm()){rel.textContent=text;return}
    const out=rel.animate([{opacity:1},{opacity:0}],{duration:80,easing:'ease-in',fill:'forwards'});
    setTimeout(()=>{rel.textContent=relText;out.cancel();rel.animate([{opacity:0},{opacity:1}],{duration:170,easing:'ease-out'})},80);
  };
  const drawGhost=()=>{ghost.firstChild.textContent=example.slice(0,input.value.length);ghost.lastChild.textContent=example.slice(input.value.length)};
  const report=()=>{setRel(selected?relative(selected):'');drawGhost();onChange({date:selected,iso:selected?iso(selected):'',valid:!!selected})};
  function setDate(date){selected=date;if(date){show(date.getFullYear(),date.getMonth());say.textContent=date.toDateString()}placeKnob();report()}
  function choose(date){
    if(!allowed(date))return;
    root.classList.remove('dt-bad');input.value=fill(digitsOf(date));input.setSelectionRange(input.value.length,input.value.length);setDate(date);
    clearTimeout(foldTimer);foldTimer=setTimeout(fold,pbCalm()?0:320);
  }
  const reject=text=>{root.classList.add('dt-bad');selected=null;placeKnob();setRel('');say.textContent=text;pbShake(head);onChange({date:null,iso:'',valid:false})};
  const reformat=(digits,left)=>{const text=fill(digits);input.value=text;let at=0,seen=0;while(at<text.length&&seen<left){if(/\d/.test(text[at]))seen++;at++}input.setSelectionRange(at,at)};
  const handle=digits=>{
    root.classList.remove('dt-bad');clearTimeout(foldTimer);
    if(digits.length===8){
      const date=realDate(+digits.slice(4),+digits.slice(0,2),+digits.slice(2,4));
      if(date&&allowed(date)){setDate(date);foldTimer=setTimeout(fold,pbCalm()?0:320)}else reject('That date does not exist');
      drawGhost();return;
    }
    selected=null;placeKnob();report();
    if(digits.length>=2){const m=+digits.slice(0,2);if(m>=1&&m<=12)show(view.y,m-1)}
    if(root.getRootNode().activeElement===input)open();
  };
  const off=new AbortController(),on=(t,e,f)=>t.addEventListener(e,f,{signal:off.signal});
  on(input,'input',()=>{
    const raw=input.value,isoMatch=raw.trim().match(/^(\d{4})-(\d{2})-(\d{2})/);
    let left=raw.slice(0,input.selectionStart).replace(/\D/g,'').length,d=raw.replace(/\D/g,'');
    if(isoMatch){d=isoMatch[2]+isoMatch[3]+isoMatch[1];left=8}
    // A first digit that cannot start a month or a day gets its zero at once.
    if(d.length&&+d[0]>1){d='0'+d;left++}
    if(d.length>=3&&+d[2]>3){d=d.slice(0,2)+'0'+d.slice(2);if(left>=3)left++}
    d=d.slice(0,8);reformat(d,Math.min(left,d.length));handle(d);
  });
  on(input,'focus',()=>open());
  on(input,'click',()=>open());
  on(input,'blur',()=>{clearTimeout(foldTimer);fold()});
  on(input,'keydown',e=>{
    if(e.key==='Escape'){fold();return}
    if(e.key==='Enter'){e.preventDefault();if(selected)fold();return}
    if(e.key==='ArrowDown'||e.key==='ArrowUp'){e.preventDefault();const from=selected||today,next=new Date(from.getFullYear(),from.getMonth(),from.getDate()+(e.key==='ArrowDown'?7:-7));if(allowed(next)){open();input.value=fill(digitsOf(next));input.setSelectionRange(input.value.length,input.value.length);root.classList.remove('dt-bad');setDate(next)}return}
    if(e.key!=='Backspace')return;
    const at=input.selectionStart;
    // Stepping back over a slash takes the digit before it, or the caret would get stuck.
    if(at===input.selectionEnd&&at>0&&/\D/.test(input.value[at-1])){e.preventDefault();const left=input.value.slice(0,at).replace(/\D/g,'').length,d=input.value.replace(/\D/g,'');if(!left)return;const next=d.slice(0,left-1)+d.slice(left);reformat(next,left-1);handle(next)}
  });
  on($('.prev'),'click',()=>show(view.y,view.m-1));
  on($('.next'),'click',()=>show(view.y,view.m+1));
  for(const nav of root.querySelectorAll('.dt-nav'))on(nav,'pointerdown',e=>e.preventDefault());
  on(sheet,'pointerdown',e=>e.preventDefault());
  render();drawGhost();
  // Never wider than its container, with a little air on both sides.
  const host=root.parentElement,fit=()=>{if(host)root.style.width=Math.min(380,host.clientWidth-36)+'px'};
  fit();
  const resize=typeof ResizeObserver==='function'&&host?new ResizeObserver(fit):null;
  resize?.observe(host);
  const api={get state(){return{iso:selected?iso(selected):'',sheet:root.dataset.sheet,value:input.value,view:`${view.y}-${pad(view.m+1)}`,rel:relText}},reset(){clearTimeout(foldTimer);input.value='';selected=null;root.classList.remove('dt-bad');placeKnob();report();fold()},destroy(){clearTimeout(foldTimer);clearTimeout(swapTimer);off.abort();resize?.disconnect();cells.forEach(b=>b.remove());delete root.__pb}};
  root.__pb=api;
  return api;
}// The catalog preview says what to type and keeps the open calendar inside the card.
const demo = {
  prepare: root => {
    const room = root.parentElement?.clientHeight || 252, open = 308 * .8;
    root.style.setProperty('--dt-zoom', Math.min(.85, room / (open + 8)).toFixed(3));
    root.style.setProperty('--rise', (94 - open) / 2 + 'px');
    const hint = document.createElement('p');
    hint.className = 'dt-hint';
    hint.innerHTML = '<span><i>Works: </i><b>12 / 25 / 2026</b></span><span><i>Refused: </i><b>02 / 31 / 2026</b></span>';
    root.insertBefore(hint, root.querySelector('[role=status]'));
  },
  cell: 30,
};
