const CURRENCIES=[{code:'USD',symbol:'$',name:'US Dollar',decimals:2},{code:'EUR',symbol:'€',name:'Euro',decimals:2},{code:'GBP',symbol:'£',name:'Pound',decimals:2},{code:'JPY',symbol:'¥',name:'Yen',decimals:0},{code:'RUB',symbol:'₽',name:'Ruble',decimals:2}];
const ROW=46,GAP=2,TOP=6;
const slot=i=>TOP+i*(ROW+GAP);
// Keeps digits and one point, and no more decimals than the currency has.
function clean(raw,decimals){
  const text=raw.replace(/[^\d.]/g,''),at=text.indexOf('.');
  let whole=at<0?text:text.slice(0,at),frac=at<0?'':text.slice(at+1).replace(/\./g,'').slice(0,decimals);
  whole=whole.replace(/^0+(?=\d)/,'');
  return at>=0&&decimals>0?`${whole||'0'}.${frac}`:whole;
}
const group=text=>{const [whole,frac]=text.split('.');const grouped=whole.replace(/\B(?=(\d{3})+$)/g,',');return frac?`${grouped}.${frac}`:grouped};
// mount(root, { currencies, currency, max, onChange({ amount, currency, valid, over }) }) → { state, setMax(value), reset(), destroy() }
// Each currency is { code, symbol, name, decimals }. Without max there is no meter and no Max button. Call setMax(value) whenever the balance changes.
function mount(root,{currencies=CURRENCIES,currency=currencies[0].code,max=null,onChange=()=>{}}={}){
  root.__pb?.destroy();
  pbPrepare(root);
  const $=s=>root.querySelector(s),input=$('input'),curBtn=$('.am-cur'),maxBtn=$('.am-max'),meter=$('.am-meter i'),list=$('.am-list'),knob=$('.am-knob'),sheet=$('.am-sheet'),shade=$('.am-shade'),reveal=$('.am-reveal'),say=$('[role=status]');
  const uid=list.id;
  const MAX=currencies.length,FULL=TOP+MAX*ROW+(MAX-1)*GAP;
  root.style.setProperty('--full',FULL+'px');
  let current=currencies.find(c=>c.code===currency)||currencies[0],active=-1,serial=0;
  const reach=h=>{sheet.style.translate=shade.style.translate=reveal.style.translate=`0 ${h-FULL}px`;list.style.translate=`0 ${FULL-h}px`};
  const raw=()=>input.value.replace(/,/g,'');
  const amount=()=>parseFloat(raw())||0;
  const money=n=>`${current.symbol}${group(String(n))}`;
  const focused=()=>root.getRootNode().activeElement===input;
  const update=()=>{
    const value=amount(),over=max!=null&&value>max;
    root.style.setProperty('--used',max?Math.min(1,value/max).toFixed(4):'0');
    root.classList.toggle('am-over',over);
    say.textContent=over?`Over the limit of ${money(max)}`:'';
    onChange({amount:value,currency:current.code,valid:value>0&&!over,over});
  };
  // The text changes while invisible, so digits are never seen shifting. A change already made by typing wins.
  const swapTo=text=>{
    if(input.value===text)return;
    if(pbCalm()){input.value=text;return}
    const before=input.value,out=input.animate([{opacity:1},{opacity:0}],{duration:80,easing:'ease-in',fill:'forwards'});
    setTimeout(()=>{if(input.value===before){input.value=text;if(focused())input.setSelectionRange(text.length,text.length)}out.cancel();input.animate([{opacity:0},{opacity:1}],{duration:160,easing:'ease-out'})},80);
  };
  const tidy=()=>{const text=clean(raw(),current.decimals).replace(/\.$/,'');return text?group(text):''};
  const setActive=i=>{
    const hidden=knob.style.opacity==='0'||!knob.style.opacity;active=i;
    if(i<0){knob.style.opacity=0;return}
    if(hidden){knob.style.transition='none';knob.style.translate=`0 ${slot(i)}px`;void knob.offsetWidth;knob.style.transition=''}else knob.style.translate=`0 ${slot(i)}px`;
    knob.style.opacity=1;curBtn.setAttribute('aria-activedescendant',rows[i].id);
  };
  const open=()=>{root.dataset.sheet='open';curBtn.setAttribute('aria-expanded','true');reach(FULL);setActive(currencies.indexOf(current))};
  const fold=()=>{root.dataset.sheet='closed';curBtn.setAttribute('aria-expanded','false');reach(0);setActive(-1)};
  const isOpen=()=>root.dataset.sheet==='open';
  const rows=currencies.map((c,i)=>{
    const el=document.createElement('div');el.className='am-row';el.id=`${uid}-${++serial}`;el.setAttribute('role','option');el.style.top=`${slot(i)}px`;
    const sym=document.createElement('b'),code=document.createElement('u'),name=document.createElement('span');sym.textContent=c.symbol;code.textContent=c.code;name.textContent=c.name;el.append(sym,code,name);
    el.addEventListener('pointerdown',e=>e.preventDefault());
    el.addEventListener('pointermove',()=>{if(i!==active)setActive(i)});
    el.addEventListener('click',()=>pick(c));
    list.append(el);return el;
  });
  const showCur=()=>{curBtn.textContent=current.code;curBtn.setAttribute('aria-label',`Currency, ${current.name}`)};
  function pick(c){
    fold();input.focus({preventScroll:true});
    if(c===current)return;
    current=c;
    const next=clean(raw(),c.decimals);input.value=next;
    if(pbCalm())showCur();else{const out=curBtn.animate([{opacity:1},{opacity:0}],{duration:80,easing:'ease-in',fill:'forwards'});setTimeout(()=>{showCur();out.cancel();curBtn.animate([{opacity:0},{opacity:1}],{duration:160,easing:'ease-out'})},80)}
    update();
  }
  const off=new AbortController(),on=(t,e,f)=>t.addEventListener(e,f,{signal:off.signal});
  on(input,'input',()=>{
    const value=input.value,left=clean(value.slice(0,input.selectionStart),current.decimals).length,next=clean(value,current.decimals);
    if(next!==value){input.value=next;const at=Math.min(left,next.length);input.setSelectionRange(at,at)}
    update();
  });
  on(input,'focus',()=>swapTo(raw()));
  on(input,'blur',()=>swapTo(tidy()));
  on(input,'keydown',e=>{if(e.key==='Enter'){e.preventDefault();input.blur()}});
  on(maxBtn,'pointerdown',e=>e.preventDefault());
  on(maxBtn,'click',e=>{e.preventDefault();if(max==null)return;const text=String(max);if(focused())swapTo(text);else swapTo(group(text));setTimeout(update,pbCalm()?0:90)});
  on(curBtn,'click',()=>{if(isOpen())fold();else open()});
  on(curBtn,'blur',()=>{if(isOpen())fold()});
  on(curBtn,'keydown',e=>{
    if(!isOpen()){if(e.key==='ArrowDown'||e.key==='ArrowUp'){e.preventDefault();open()}return}
    if(e.key==='ArrowDown'||e.key==='ArrowUp'){e.preventDefault();const step=e.key==='ArrowDown'?1:-1;setActive((active+step+MAX)%MAX)}
    else if(e.key==='Enter'||e.key===' '){e.preventDefault();if(active>=0)pick(currencies[active])}
    else if(e.key==='Escape'){e.preventDefault();fold()}
  });
  on(sheet,'pointerdown',e=>e.preventDefault());
  maxBtn.hidden=max==null;
  showCur();update();
  // Never wider than its container, with a little air on both sides.
  const host=root.parentElement,fit=()=>{if(host)root.style.width=Math.min(380,host.clientWidth-36)+'px'};
  fit();
  const resize=typeof ResizeObserver==='function'&&host?new ResizeObserver(fit):null;
  resize?.observe(host);
  const api={get state(){return{amount:amount(),currency:current.code,value:input.value,sheet:root.dataset.sheet,over:root.classList.contains('am-over')}},setMax(value){max=value;maxBtn.hidden=max==null;update()},reset(){input.value='';fold();update()},destroy(){off.abort();resize?.disconnect();rows.forEach(el=>el.remove());delete root.__pb}};
  root.__pb=api;
  return api;
}// The catalog preview has a pretend limit, says what to type and keeps the open list inside the card.
const demo = {
  prepare: root => {
    const room = root.parentElement?.clientHeight || 252, open = 308 * .8;
    root.style.setProperty('--am-zoom', Math.min(.85, room / (open + 8)).toFixed(3));
    root.style.setProperty('--rise', (94 - open) / 2 + 'px');
    const hint = document.createElement('p');
    hint.className = 'am-hint';
    hint.innerHTML = '<span><i>Works: </i><b>1250.50</b></span><span><i>Refused: </i><b>9000</b></span>';
    root.insertBefore(hint, root.querySelector('[role=status]'));
  },
  max: 2400,
};
