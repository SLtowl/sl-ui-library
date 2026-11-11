// Phone · SL UI Library. Adds window.SLPhone with mount(root, options).
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

  const ROW=46,GAP=2,TOP=6,MAX=5,FULL=TOP+MAX*ROW+(MAX-1)*GAP;
  const slot=i=>TOP+i*(ROW+GAP);
  const SAMPLE='5551234567890';
  const example=mask=>{let i=0;return mask.replace(/#/g,()=>SAMPLE[i++%SAMPLE.length])};
  const fill=(digits,mask)=>{let i=0,out='';for(const c of mask){if(c==='#'){if(i>=digits.length)break;out+=digits[i++]}else{if(i>=digits.length)break;out+=c}}return out};
  function letters(name,query){
    const n=name.toLowerCase(),q=query.toLowerCase(),at=n.indexOf(q);
    if(at>=0)return{rank:at===0?1:n[at-1]===' '?2:3,hits:new Set(Array.from(q,(_,i)=>at+i))};
    const hits=new Set();let from=0;
    for(const c of q.replace(/\s/g,'')){const i=n.indexOf(c,from);if(i<0)return null;hits.add(i);from=i+1}
    return{rank:4,hits};
  }
  // mount(root, { countries, common, country, onChange({ country, code, number, e164, complete }), limit }) → { state, reset(), destroy() }
  // common is the short list shown before typing, as ISO codes. Each country is { iso, name, code, mask }, with # for a digit.
  function mount(root,{countries=COUNTRIES,common=['US','GB','DE','FR','RU'],country=common[0],onChange=()=>{},limit=MAX}={}){
    root.__pb?.destroy();
    pbPrepare(root);
    const $=s=>root.querySelector(s),cc=$('.ph-cc'),num=$('.ph-n'),list=$('.ph-list'),knob=$('.ph-knob'),none=$('.ph-none'),sheet=$('.ph-sheet'),shade=$('.ph-shade'),reveal=$('.ph-reveal'),say=$('[role=status]'),ghost=$('.ph-ghost');
    const uid=list.id;
    const byIso=iso=>countries.find(c=>c.iso===iso);
    let current=byIso(country),rows=new Map(),shown=[],active=-1,dirty=false,serial=0;
    const phase=next=>{if(next)root.dataset.phase=next;return root.dataset.phase};
    const reach=h=>{sheet.style.translate=shade.style.translate=reveal.style.translate=`0 ${h-FULL}px`;list.style.translate=`0 ${FULL-h}px`};
    sheet.addEventListener('pointerdown',e=>e.preventDefault());
    const digits=()=>num.value.replace(/\D/g,''),size=()=>current.mask.split('#').length-1;

    // Old value fades out, the new one fades in. The input is one layer, so nothing is ever drawn twice.
    const swapIn=(el,write)=>{
      if(pbCalm()){write();return}
      const out=el.animate([{opacity:1},{opacity:0}],{duration:90,easing:'ease-in',fill:'forwards'});
      setTimeout(()=>{write();out.cancel();el.animate([{opacity:0},{opacity:1}],{duration:190,easing:'ease-out'})},90);
    };
    const report=()=>{
      const d=digits(),whole=d.length===size(),full=example(current.mask);
      ghost.hidden=false;ghost.firstChild.textContent=full.slice(0,num.value.length);ghost.lastChild.textContent=full.slice(num.value.length);
      root.classList.toggle('ph-whole',whole);
      say.textContent=whole?'Number complete':'';
      onChange({country:current.iso,code:current.code,number:d,e164:d?`+${current.code}${d}`:'',complete:whole});
    };
    const showNumber=d=>{num.value=fill(d.slice(0,size()),current.mask);report()};
    const setCountry=(next,animate)=>{
      const changed=next!==current,keep=digits();current=next;
      if(changed&&animate)swapIn(cc,()=>{cc.value='+'+next.code});else cc.value='+'+next.code;
      showNumber(keep);
      if(changed&&!pbCalm())ghost.animate([{opacity:0},{opacity:1}],{duration:220,easing:'ease-out'});
    };

    const make=item=>{
      const el=document.createElement('div'),code=document.createElement('span'),name=document.createElement('span'),spans=text=>Array.from(text,c=>{const i=document.createElement('i');i.textContent=c;return i});
      el.className='ph-row';el.setAttribute('role','option');el.id=`${uid}-${++serial}`;
      code.className='ph-rc';code.append(...spans('+'+item.code));name.className='ph-rn';name.append(...spans(item.name));el.append(code,name);
      el.addEventListener('pointerdown',e=>e.preventDefault());
      el.addEventListener('pointermove',()=>{const i=shown.findIndex(s=>s.iso===item.iso);if(i>=0&&i!==active)setActive(i)});
      el.addEventListener('click',()=>pick(item));
      list.append(el);
      return{el,code,name,gone:0};
    };
    const leave=(r,key)=>{r.el.classList.add('out');clearTimeout(r.gone);r.gone=setTimeout(()=>{r.el.remove();rows.delete(key)},pbCalm()?0:170)};
    const moveKnob=(y,instant)=>{if(instant){knob.style.transition='none';knob.style.translate=`0 ${y}px`;void knob.offsetWidth;knob.style.transition=''}else knob.style.translate=`0 ${y}px`};
    const setActive=(i,instant)=>{
      active=i;
      if(i<0){knob.style.opacity=0;cc.removeAttribute('aria-activedescendant');return}
      moveKnob(slot(i),instant||knob.style.opacity==='0'||!knob.style.opacity);
      knob.style.opacity=1;
      const r=rows.get(shown[i].iso);if(r)cc.setAttribute('aria-activedescendant',r.el.id);
    };
    const paint=(found,query,start)=>{
      const keep=new Set(found.map(f=>f.iso));
      rows.forEach((r,k)=>{if(!keep.has(k))leave(r,k)});
      found.forEach((item,i)=>{
        let r=rows.get(item.iso);const y=slot(i);
        // A row whose place changed fades in at the new place instead of travelling there.
        if(!r){r=make(item);rows.set(item.iso,r);r.el.style.transition='none';r.el.style.translate=`0 ${y}px`;r.el.style.opacity=0;void r.el.offsetWidth;r.el.style.transition=''}
        else if(r.el.style.translate!==`0 ${y}px`){r.el.style.translate=`0 ${y}px`;if(!pbCalm())r.el.animate([{opacity:0},{opacity:1}],{duration:140,easing:'ease-out'})}
        clearTimeout(r.gone);r.el.classList.remove('out');r.el.style.opacity='';
        [...r.code.children].forEach((c,n)=>c.classList.toggle('on',!!item.codeHits?.has(n)));
        [...r.name.children].forEach((c,n)=>c.classList.toggle('on',!!item.nameHits?.has(n)));
      });
      shown=found;
      const empty=!!query&&!found.length,lines=empty?1:found.length;
      root.classList.toggle('ph-empty',empty);
      if(empty)none.textContent=`Nothing called “${query}”`;
      reach(lines?TOP+lines*ROW+(lines-1)*GAP:0);
      cc.setAttribute('aria-expanded',found.length?'true':'false');
      setActive(found.length?Math.max(0,start):-1,true);
    };
    const update=()=>{
      const raw=dirty?cc.value.trim():'',query=raw.replace(/^\+/,'');
      root.classList.toggle('ph-q',!!query);
      if(!query){
        const base=common.map(byIso).slice(0,limit),found=base.includes(current)?base:[current,...base.slice(0,limit-1)];
        return paint(found,'',found.indexOf(current));
      }
      const isCode=/^\d+$/.test(query),hits=countries.map(c=>{
        if(isCode)return c.code.startsWith(query)?{...c,rank:c.code===query?0:1,codeHits:new Set(Array.from(query,(_,i)=>i+1))}:null;
        const m=letters(c.name,query);return m&&{...c,rank:m.rank,nameHits:m.hits};
      }).filter(Boolean).sort((a,b)=>a.rank-b.rank||a.name.length-b.name.length);
      paint(hits.slice(0,limit),raw,0);
    };
    const close=()=>{phase('idle');rows.forEach((r,k)=>leave(r,k));shown=[];reach(0);root.classList.remove('ph-empty','ph-q');cc.setAttribute('aria-expanded','false');setActive(-1);dirty=false};
    const open=()=>{phase('open');update()};

    function pick(item){
      if(!rows.has(item.iso))return;
      root.classList.remove('ph-q','ph-empty');
      rows.forEach((row,k)=>leave(row,k));shown=[];
      phase('idle');dirty=false;reach(0);setActive(-1);cc.setAttribute('aria-expanded','false');
      setCountry(item,true);
      say.textContent=`${item.name}, +${item.code}`;
      num.focus({preventScroll:true});const end=num.value.length;num.setSelectionRange(end,end);
    }

    const off=new AbortController(),on=(t,e,f)=>t.addEventListener(e,f,{signal:off.signal});
    on(cc,'focus',()=>{if(phase()==='idle'){open();setTimeout(()=>{const end=cc.value.length;cc.setSelectionRange(end,end)},0)}});
    on(cc,'beforeinput',e=>{if(dirty)return;dirty=true;if(e.inputType.startsWith('delete')){e.preventDefault();cc.value='';update()}else cc.value=''});
    on(cc,'input',()=>{dirty=true;if(phase()!=='open')phase('open');update()});
    on(cc,'blur',()=>{if(phase()==='open'){close();cc.value='+'+current.code}});
    on(cc,'keydown',e=>{
      if(e.key==='ArrowDown'||e.key==='ArrowUp'){e.preventDefault();if(phase()!=='open')open();if(!shown.length)return;const step=e.key==='ArrowDown'?1:-1;setActive(active<0?0:(active+step+shown.length)%shown.length)}
      else if(e.key==='Enter'){e.preventDefault();if(phase()==='open'&&active>=0)pick(shown[active])}
      else if(e.key==='Escape'&&phase()==='open'){close();cc.value='+'+current.code;cc.blur()}
    });

    // Keeps the caret after the same digit when the punctuation around it changes.
    const reformat=(text,digitsLeft)=>{num.value=text;let at=0,seen=0;while(at<text.length&&seen<digitsLeft){if(/\d/.test(text[at]))seen++;at++}num.setSelectionRange(at,at)};
    // A number that starts with + names its own country: the longest known code wins.
    const detect=raw=>{const d=raw.replace(/\D/g,'');return [...countries].filter(c=>d.startsWith(c.code)).sort((a,b)=>b.code.length-a.code.length)[0]||null};
    on(num,'input',()=>{
      const raw=num.value;
      if(raw.trim().startsWith('+')){
        const found=detect(raw);
        if(!found){root.classList.remove('ph-whole');ghost.hidden=true;return}
        const rest=raw.replace(/\D/g,'').slice(found.code.length),next=found.code===current.code?current:found;
        if(next!==current)setCountry(next,true);
        reformat(fill(rest.slice(0,size()),current.mask),rest.length);report();return;
      }
      const left=raw.slice(0,num.selectionStart).replace(/\D/g,'').length,d=digits().slice(0,size());
      reformat(fill(d,current.mask),left);report();
    });
    on(num,'keydown',e=>{
      if(e.key!=='Backspace')return;
      const at=num.selectionStart;
      if(!num.value){e.preventDefault();cc.focus({preventScroll:true});return}
      // Stepping back over punctuation takes the digit before it, or the caret would get stuck.
      if(at===num.selectionEnd&&at>0&&/\D/.test(num.value[at-1])){
        e.preventDefault();
        const left=num.value.slice(0,at).replace(/\D/g,'').length,d=digits();
        if(!left)return;
        reformat(fill((d.slice(0,left-1)+d.slice(left)).slice(0,size()),current.mask),left-1);report();
      }
    });
    on(root,'submit',e=>e.preventDefault());
    setCountry(current,false);
    // Never wider than its container, with a little air on both sides.
    const host=root.parentElement,fit=()=>{if(host)root.style.width=Math.min(380,host.clientWidth-36)+'px'};
    fit();
    const resize=typeof ResizeObserver==='function'&&host?new ResizeObserver(fit):null;
    resize?.observe(host);
    const api={get state(){return{phase:phase(),country:current.iso,number:digits(),complete:digits().length===size()}},reset(){close();num.value='';setCountry(current,false)},destroy(){off.abort();resize?.disconnect();rows.forEach(r=>{clearTimeout(r.gone);r.el.remove()});rows.clear();delete root.__pb}};
    root.__pb=api;
    return api;
  }
  const C=(iso,name,code,mask)=>({iso,name,code,mask});
  const COUNTRIES=[C('US','United States','1','(###) ###-####'),C('CA','Canada','1','(###) ###-####'),C('GB','United Kingdom','44','#### ######'),C('DE','Germany','49','### ########'),C('FR','France','33','# ## ## ## ##'),C('ES','Spain','34','### ### ###'),C('IT','Italy','39','### ### ####'),C('NL','Netherlands','31','# ########'),C('PL','Poland','48','### ### ###'),C('UA','Ukraine','380','## ### ## ##'),C('RU','Russia','7','(###) ###-##-##'),C('KZ','Kazakhstan','7','(###) ###-##-##'),C('TR','Turkey','90','(###) ### ## ##'),C('AE','United Arab Emirates','971','## ### ####'),C('IN','India','91','##### #####'),C('CN','China','86','### #### ####'),C('JP','Japan','81','##-####-####'),C('KR','South Korea','82','##-####-####'),C('BR','Brazil','55','(##) #####-####'),C('MX','Mexico','52','## #### ####'),C('AU','Australia','61','### ### ###'),C('SE','Sweden','46','##-### ## ##'),C('PT','Portugal','351','### ### ###'),C('IL','Israel','972','##-###-####'),C('SG','Singapore','65','#### ####')];
  globalThis.SLPhone = { mount };
})();
