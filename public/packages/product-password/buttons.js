// Password · SL UI Library. Adds window.SLPassword with mount(root, options).
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
  globalThis.SLPassword = { mount };
})();
