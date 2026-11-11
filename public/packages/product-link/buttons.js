// Link · SL UI Library. Adds window.SLLink with mount(root, options).
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

  const BADGE=34;
  // Splits an address into what can go, the domain and the rest. Returns null when it is not a link.
  function parse(raw){
    const text=raw.trim(),start=text.match(/^(https?:\/\/)?(www\.)?/i),prefix=start[0],rest=text.slice(prefix.length),host=(rest.match(/^[^/?#]+/)||[''])[0];
    // A domain with a dot, localhost, an IP address, or any name after an explicit http:// or https://.
    const known=/^[\p{L}\p{N}-]+(\.[\p{L}\p{N}-]+)*\.\p{L}{2,}(:\d+)?$/u.test(host)||/^(localhost|\d{1,3}(\.\d{1,3}){3})(:\d+)?$/i.test(host)||(!!start[1]&&/^[\p{L}\p{N}.-]+(:\d+)?$/u.test(host));
    if(/\s/.test(text)||!known)return null;
    return{prefix,host,tail:rest.slice(host.length),url:(start[1]?'':'https://')+text};
  }
  // mount(root, { onChange({ url, host, valid }), icon(url) }) → { state, reset(), destroy() }
  // icon may return an image address for the site's badge; without it the badge shows the first letter.
  function mount(root,{onChange=()=>{},icon=null}={}){
    root.__pb?.destroy();
    pbPrepare(root);
    const $=s=>root.querySelector(s),input=$('input'),row=$('.lk-row'),line=$('.lk-line'),run=$('.lk-run'),pre=$('.lk-pre'),hostEl=$('.lk-host'),tail=$('.lk-tail'),badge=$('.lk-badge'),clearBtn=$('.lk-clear'),plate=$('.lk-plate'),say=$('[role=status]');
    let timer=0,current=null,start=0;
    const state=next=>{if(next)root.dataset.state=next;return root.dataset.state};
    const report=()=>{const link=parse(input.value);onChange({url:link?link.url:'',host:link?link.host:'',valid:!!link})};
    const has=()=>root.classList.toggle('lk-has',!!input.value);
    const settle=link=>{
      clearTimeout(timer);root.classList.remove('lk-bad');current=link;
      pre.textContent=link.prefix;hostEl.textContent=link.host;tail.textContent=link.tail;
      badge.textContent=link.host[0];
      if(icon){const src=icon(link.url);if(src){const img=new Image();img.alt='';img.width=img.height=24;img.src=src;img.onload=()=>badge.replaceChildren(img)}}
      // Starts exactly where the field's text is, even when a long address is scrolled.
      start=-input.scrollLeft;
      root.classList.add('lk-still');line.style.translate=`${start}px 0`;run.style.translate='0 0';state('back');void line.offsetWidth;root.classList.remove('lk-still');
      state('done');line.style.translate='0 0';run.style.translate=`${BADGE-pre.offsetWidth}px 0`;
      row.setAttribute('aria-label',`Edit link, ${link.host}`);say.textContent=`Link to ${link.host}`;has();report();
    };
    const edit=()=>{
      clearTimeout(timer);state('back');
      // The caret goes to the end first, so the parts return to exactly where the field's text will be.
      input.focus({preventScroll:true});const end=input.value.length;input.setSelectionRange(end,end);input.scrollLeft=input.scrollWidth;start=-input.scrollLeft;
      line.style.translate=`${start}px 0`;run.style.translate='0 0';
      timer=setTimeout(()=>state('edit'),pbCalm()?0:480);
    };
    const tryLink=()=>{const link=parse(input.value);if(!link)return false;settle(link);return true};
    const reject=()=>{root.classList.add('lk-bad');say.textContent='That does not look like a link';pbShake(plate)};
    const off=new AbortController(),on=(t,e,f)=>t.addEventListener(e,f,{signal:off.signal});
    on(input,'focus',()=>root.classList.add('lk-focus'));
    on(input,'blur',()=>{root.classList.remove('lk-focus');if(state()==='edit'&&input.value)tryLink()});
    on(input,'input',()=>{if(state()==='back'){clearTimeout(timer);state('edit')}root.classList.remove('lk-bad');has();report()});
    on(input,'paste',()=>setTimeout(()=>{if(tryLink())input.blur();else if(input.value.trim())reject()},0));
    on(input,'keydown',e=>{if(e.key!=='Enter')return;e.preventDefault();if(!input.value)return;if(tryLink())input.blur();else reject()});
    on(row,'click',edit);
    on(clearBtn,'pointerdown',e=>e.preventDefault());
    on(clearBtn,'click',()=>{clearTimeout(timer);input.value='';current=null;root.classList.remove('lk-bad');state('edit');has();report();input.focus({preventScroll:true})});
    // Never wider than its container, with a little air on both sides.
    const host=root.parentElement,fit=()=>{if(host)root.style.width=Math.min(380,host.clientWidth-36)+'px'};
    fit();
    const resize=typeof ResizeObserver==='function'&&host?new ResizeObserver(fit):null;
    resize?.observe(host);
    const api={get state(){return{state:state(),url:current?current.url:'',host:current?current.host:''}},reset(){clearTimeout(timer);input.value='';current=null;state('edit');has()},destroy(){clearTimeout(timer);off.abort();resize?.disconnect();delete root.__pb}};
    root.__pb=api;
    return api;
  }// The catalog preview shows what to paste to try it.
  globalThis.SLLink = { mount };
})();
