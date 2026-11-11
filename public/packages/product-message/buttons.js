// Message · SL UI Library. Adds window.SLMessage with mount(root, options).
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
  globalThis.SLMessage = { mount };
})();
