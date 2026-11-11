// Transfer · SL UI Library. Adds window.SLTransfer with mount(root, options).
(() => {
  // A damped spring sampled into a CSS linear() curve: every width change overshoots a touch and settles like a real object.
  const pbSpringCurve = (stiffness, damping) => {
    if (typeof CSS === 'undefined' || !CSS.supports('transition-timing-function', 'linear(0, 1)')) return null;
    const dt = 1 / 240, points = [0];
    let x = 0, v = 0, t = 0;
    while (t < 2) {
      v += (-stiffness * (x - 1) - damping * v) * dt; x += v * dt; t += dt; points.push(x);
      if (t > .25 && Math.abs(x - 1) < 5e-4 && Math.abs(v) < 5e-3) break;
    }
    const step = Math.max(1, Math.round(points.length / 60)), out = points.filter((_, i) => i % step === 0);
    out.push(1);
    return { easing: `linear(${out.map(p => +p.toFixed(4)).join(',')})`, time: Math.round(t * 1000) + 'ms' };
  };
  const pbSpring = pbSpringCurve(180, 19);
  const pbCalm = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
  let pbCount = 0;
  function pbPrepare(root) {
    // Several copies on one page must not share ids: give this one its own suffix and keep labels pointing at it.
    const suffix = '-' + (++pbCount);
    for (const element of root.querySelectorAll('[id^="pb-"]')) {
      const id = element.id;
      if (element.dataset.pbSuffix) continue;
      element.id = id + suffix; element.dataset.pbSuffix = suffix;
      for (const ref of root.querySelectorAll(`[for="${id}"]`)) ref.htmlFor = id + suffix;
      for (const name of ['aria-describedby', 'aria-labelledby', 'aria-controls']) for (const ref of root.querySelectorAll(`[${name}="${id}"]`)) ref.setAttribute(name, id + suffix);
    }
    if (pbSpring && !root.classList.contains('pb-f')) { root.style.setProperty('--pb-spring', pbSpring.easing); root.style.setProperty('--pb-spring-time', pbSpring.time); }
  }
  // Text width in the button's own font, so widths can animate in pixels.
  function pbMeasure(button, text) {
    const probe = document.createElement('span');
    probe.className = 'pb-t'; probe.style.cssText = 'position:absolute;visibility:hidden'; probe.textContent = text;
    button.append(probe);
    const width = probe.getBoundingClientRect().width;
    probe.remove();
    return Math.ceil(width);
  }
  function pbShake(element) {
    if (pbCalm()) return;
    element.animate([{ translate: '0' }, { translate: '-8px' }, { translate: '7px' }, { translate: '-4px' }, { translate: '2px' }, { translate: '0' }], { duration: 440, easing: 'cubic-bezier(.3,.7,.4,1)' });
  }
  function pbWait(ms, signal) {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(resolve, ms);
      signal?.addEventListener('abort', () => { clearTimeout(timer); reject(new DOMException('Canceled', 'AbortError')); }, { once: true });
    });
  }
  function pbActive(root) { return root.getRootNode().activeElement; }
  // Shown progress eases toward the reported value instead of jumping, and never runs backwards.
  function pbProgress(paint) {
    let target = 0, shown = 0, frame = 0, full = null;
    const tick = () => {
      shown += (target - shown) * .14;
      if (Math.abs(target - shown) < .002) shown = target;
      paint(shown);
      if (shown === 1 && full) { full(); full = null; }
      frame = shown === target ? 0 : requestAnimationFrame(tick);
    };
    return {
      to(value) { target = Math.max(target, Math.min(1, value)); if (!frame) frame = requestAnimationFrame(tick); },
      // Ends at 100% even when the page is in the background and frames are paused.
      finish() {
        this.to(1);
        if (shown === 1) return Promise.resolve();
        return new Promise(resolve => {
          full = resolve;
          setTimeout(() => { if (full === resolve) { cancelAnimationFrame(frame); frame = 0; shown = target = 1; paint(1); full = null; resolve(); } }, 500);
        });
      },
      reset() { cancelAnimationFrame(frame); frame = 0; target = shown = 0; full = null; paint(0); },
    };
  }
  // Catalog demos only: uneven pretend progress, the way real transfers arrive in bursts.
  function pbDemoTransfer({ progress, signal }, ms = 2400) {
    return new Promise((resolve, reject) => {
      let done = 0;
      const step = () => {
        if (signal.aborted) return reject(new DOMException('Canceled', 'AbortError'));
        done = Math.min(1, done + .06 + Math.random() * .16);
        progress(done);
        if (done >= 1) resolve(); else timer = setTimeout(step, ms / 9 * (.5 + Math.random()));
      };
      let timer = setTimeout(step, 200);
      signal.addEventListener('abort', () => { clearTimeout(timer); reject(new DOMException('Canceled', 'AbortError')); }, { once: true });
    });
  }
  // Roll a value inside a small window: the new one comes in from below (or above), the old one leaves.
  // Fast repeated presses drop whatever is still leaving, so digits never pile up.
  function pbRoll(box, value, direction) {
    const spans = [...box.children], current = spans.at(-1);
    spans.slice(0, -1).forEach(span => span.remove());
    if (current.textContent === String(value)) return;
    const next = document.createElement('span');
    next.textContent = value; box.append(next);
    if (pbCalm() || !direction) { current.remove(); return; }
    const motion = { duration: 200, easing: 'cubic-bezier(.2,.9,.3,1)' };
    current.animate([{ translate: '0 0', opacity: 1 }, { translate: `0 ${-direction * 100}%`, opacity: 0 }], { ...motion, fill: 'forwards' });
    setTimeout(() => current.remove(), motion.duration + 20);
    next.animate([{ translate: `0 ${direction * 100}%`, opacity: 0 }, { translate: '0 0', opacity: 1 }], motion);
  }
  // The line under a field. Tone 'error' turns the field red; the text lifts in when it changes.
  function pbNote(root, text, tone = '') {
    const note = root.querySelector('.pb-note');
    root.classList.toggle('pb-error', tone === 'error');
    if (!note || note.textContent === text) return;
    note.textContent = text;
    note.classList.remove('pb-swap'); void note.offsetWidth; note.classList.add('pb-swap');
  }
  // Fields that are not logins: keep password managers' icons out of them.
  function pbNoManagers(input) {
    for (const [name, value] of [['data-bwignore', 'true'], ['data-1p-ignore', 'true'], ['data-lpignore', 'true'], ['data-form-type', 'other']]) input.setAttribute(name, value);
  }
  // Floating labels: the label rises when the field has a value or focus. Call after setting a value from code.
  function pbSync(root) {
    const field = root.querySelector('.pb-box .pb-input');
    if (field) root.classList.toggle('pb-has', !!field.value || root.classList.contains('pb-keep'));
  }
  // A layer exactly over the input's text, in the same font, so single letters can be animated. Returns the layer.
  function pbMirror(input) {
    const layer = document.createElement('span'), box = input.parentElement, style = getComputedStyle(input);
    layer.className = 'pb-mirror'; layer.setAttribute('aria-hidden', 'true');
    layer.style.cssText = `left:${input.offsetLeft + parseFloat(style.paddingLeft)}px;top:${input.offsetTop}px;height:${input.offsetHeight}px;font:${style.font};letter-spacing:${style.letterSpacing};color:${style.color}`;
    box.append(layer);
    return layer;
  }

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
  globalThis.SLTransfer = { mount };
})();
