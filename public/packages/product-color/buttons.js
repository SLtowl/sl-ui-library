// Color · SL UI Library. Adds window.SLColor with mount(root, options).
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

  const PALETTE=['#2D6AF6','#1E9E5A','#E0484E','#F2994A','#F2C94C','#8B5CF6','#EC4899','#14B8A6','#16181D','#8A8F99','#FFFFFF'];
  const toHex=n=>Math.max(0,Math.min(255,n)).toString(16).padStart(2,'0').toUpperCase();
  // #RGB, #RRGGBB or rgb(r, g, b). Returns #RRGGBB, or null.
  function parse(raw){
    const text=raw.trim(),rgb=text.match(/^rgba?\(\s*(\d{1,3})[\s,]+(\d{1,3})[\s,]+(\d{1,3})/i);
    if(rgb)return'#'+[rgb[1],rgb[2],rgb[3]].map(v=>toHex(+v)).join('');
    const hex=text.replace(/^#/,'').toUpperCase();
    if(/^[0-9A-F]{6}$/.test(hex))return'#'+hex;
    if(/^[0-9A-F]{3}$/.test(hex))return'#'+[...hex].map(c=>c+c).join('');
    return null;
  }
  // Picks dark or light text by how bright the colour really looks.
  const inkOn=hex=>{const [r,g,b]=[1,3,5].map(i=>parseInt(hex.slice(i,i+2),16)/255).map(v=>v<=.03928?v/12.92:((v+.055)/1.055)**2.4);return .2126*r+.7152*g+.0722*b>.36?'#16181D':'#FFFFFF'};
  const TOP=6,SHORT=92;
  const hexToHsv=hex=>{const [r,g,b]=[1,3,5].map(i=>parseInt(hex.slice(i,i+2),16)/255),max=Math.max(r,g,b),d=max-Math.min(r,g,b);let h=0;if(d)h=max===r?((g-b)/d+6)%6:max===g?(b-r)/d+2:(r-g)/d+4;return{h:h*60,s:max?d/max:0,v:max}};
  const hsvToHex=({h,s,v})=>{const f=n=>{const k=(n+h/60)%6;return Math.round((v-v*s*Math.max(0,Math.min(k,4-k,1)))*255)};return'#'+[f(5),f(3),f(1)].map(toHex).join('')};
  const clamp=(n,a=0,b=1)=>Math.min(b,Math.max(a,n));
  // mount(root, { palette, onChange({ hex, valid }), svHeight }) → { state, set(value), reset(), destroy() }
  // palette is a list of #RRGGBB shown as ready colours; the last circle always opens the full palette.
  function mount(root,{palette=PALETTE,onChange=()=>{},svHeight=124}={}){
    root.__pb?.destroy();
    pbPrepare(root);
    const $=s=>root.querySelector(s),input=$('input'),opener=$('.cl-swatch'),paint=$('.cl-paint'),base=$('.cl-base'),grid=$('.cl-grid'),pick=$('.cl-pick'),sv=$('.cl-sv'),hue=$('.cl-hue'),svKnob=$('.cl-sv .cl-knob'),hueKnob=$('.cl-hue .cl-knob'),sheet=$('.cl-sheet'),shade=$('.cl-shade'),reveal=$('.cl-reveal'),head=$('.cl-head'),say=$('[role=status]');
    const CONTENT=126+svHeight,FULL=TOP+CONTENT;
    root.style.setProperty('--sv',svHeight+'px');
    root.style.setProperty('--full',FULL+'px');
    let shown=null,finishPour=null,timer=0;
    const focused=()=>root.getRootNode().activeElement===input;
    const reach=h=>{root.style.setProperty('--open-h',h+'px');sheet.style.translate=shade.style.translate=reveal.style.translate=`0 ${h-FULL}px`;pick.style.translate=`0 ${FULL-h}px`};
    let extra=false;
    const open=()=>{root.dataset.sheet='open';opener.setAttribute('aria-expanded','true');reach(TOP+(extra?CONTENT:SHORT))};
    const fold=()=>{root.dataset.sheet='closed';extra=false;root.classList.remove('cl-extra');more.classList.remove('on');more.setAttribute('aria-expanded','false');sv.tabIndex=hue.tabIndex=-1;opener.setAttribute('aria-expanded','false');reach(0)};
    const dots=palette.map(hex=>{
      const b=document.createElement('button');b.type='button';b.className='cl-dot';b.setAttribute('aria-label',hex);b.style.setProperty('--c',hex);b.innerHTML='<i></i>';
      b.addEventListener('pointerdown',e=>e.preventDefault());b.addEventListener('click',()=>{input.value=hex;apply(hex);clearTimeout(timer);fold();input.focus({preventScroll:true});input.setSelectionRange(7,7)});
      grid.append(b);return b;
    });
    const more=document.createElement('button');more.type='button';more.className='cl-dot cl-more';more.setAttribute('aria-label','More colors');more.setAttribute('aria-expanded','false');more.innerHTML='<i></i>';grid.append(more);
    more.addEventListener('pointerdown',e=>e.preventDefault());
    more.addEventListener('click',()=>{clearTimeout(timer);extra=!extra;root.classList.toggle('cl-extra',extra);more.classList.toggle('on',extra);more.setAttribute('aria-expanded',String(extra));sv.tabIndex=hue.tabIndex=extra?0:-1;open();if(!focused())input.focus({preventScroll:true})});
    const mark=hex=>dots.forEach((b,i)=>b.classList.toggle('on',palette[i]===hex));
    // The two knobs and the square's hue always show the current colour.
    let hsv={h:220,s:.8,v:.9};
    const showKnobs=()=>{sv.style.setProperty('--hue',hsv.h.toFixed(1));svKnob.style.left=hsv.s*100+'%';svKnob.style.top=(1-hsv.v)*100+'%';svKnob.style.setProperty('--k',hsvToHex(hsv));hueKnob.style.left=hsv.h/3.6+'%';hueKnob.style.setProperty('--k',`hsl(${hsv.h} 100% 50%)`);hue.setAttribute('aria-valuenow',Math.round(hsv.h))};
    // While dragging there is no pour: the colour simply follows the hand.
    const follow=()=>{
      const hex=hsvToHex(hsv);finishPour?.();showKnobs();input.value=hex;root.classList.remove('cl-bad');
      if(hex!==shown){shown=hex;root.classList.add('cl-has');root.style.setProperty('--cl-swatch',hex);root.style.setProperty('--cl-ink',inkOn(hex));base.style.background=hex;base.style.opacity=1;mark(hex)}
      onChange({hex,valid:true});
    };
    const drag=(el,read)=>el.addEventListener('pointerdown',e=>{
      e.preventDefault();clearTimeout(timer);el.setPointerCapture(e.pointerId);read(e);
      const move=ev=>read(ev),up=()=>{el.removeEventListener('pointermove',move);el.removeEventListener('pointerup',up);el.removeEventListener('pointercancel',up)};
      el.addEventListener('pointermove',move);el.addEventListener('pointerup',up);el.addEventListener('pointercancel',up);
    });
    drag(sv,e=>{const r=sv.getBoundingClientRect();hsv={...hsv,s:clamp((e.clientX-r.left)/r.width),v:1-clamp((e.clientY-r.top)/r.height)};follow()});
    drag(hue,e=>{const r=hue.getBoundingClientRect();hsv={...hsv,h:clamp((e.clientX-r.left)/r.width)*359.9};follow()});
    sv.addEventListener('keydown',e=>{const d={ArrowLeft:[-.02,0],ArrowRight:[.02,0],ArrowUp:[0,.02],ArrowDown:[0,-.02]}[e.key];if(!d)return;e.preventDefault();hsv={...hsv,s:clamp(hsv.s+d[0]),v:clamp(hsv.v+d[1])};follow()});
    hue.addEventListener('keydown',e=>{const d={ArrowLeft:-3,ArrowRight:3}[e.key];if(!d)return;e.preventDefault();hsv={...hsv,h:clamp(hsv.h+d,0,359.9)};follow()});
    const pour=hex=>{
      finishPour?.();
      if(pbCalm()){base.style.background=hex;base.style.opacity=1;return}
      const el=document.createElement('span');el.className='cl-pour';el.style.background=hex;paint.append(el);void el.offsetWidth;el.classList.add('go');
      const end=()=>{if(finishPour!==end)return;finishPour=null;base.style.transition='none';base.style.background=hex;base.style.opacity=1;void base.offsetWidth;base.style.transition='';el.remove()};
      finishPour=end;el.addEventListener('transitionend',end,{once:true});setTimeout(end,760);
    };
    const clearPaint=()=>{finishPour?.();base.style.opacity=0};
    const apply=hex=>{
      root.classList.remove('cl-bad');
      if(hex!==shown){shown=hex;root.classList.add('cl-has');root.style.setProperty('--cl-swatch',hex);root.style.setProperty('--cl-ink',inkOn(hex));const next=hexToHsv(hex);hsv=next.s?next:{...next,h:hsv.h};showKnobs();pour(hex);mark(hex);say.textContent=`Color ${hex}`}
      onChange({hex,valid:true});
    };
    const drop=()=>{if(shown){shown=null;root.classList.remove('cl-has');root.style.removeProperty('--cl-swatch');root.style.removeProperty('--cl-ink');clearPaint();mark(null)}onChange({hex:'',valid:false})};
    const reject=()=>{root.classList.add('cl-bad');say.textContent='That is not a color code';pbShake(head)};
    const off=new AbortController(),on=(t,e,f)=>t.addEventListener(e,f,{signal:off.signal});
    // The # is there from the moment the field is pressed, so the first character never pushes anything.
    on(input,'focus',()=>{if(!input.value)input.value='#';setTimeout(()=>{const end=input.value.length;input.setSelectionRange(end,end)},0);if(!shown)open()});
    on(input,'blur',()=>{clearTimeout(timer);fold();const hex=parse(input.value);if(hex){input.value=hex;apply(hex)}else if(input.value==='#')input.value=''});
    on(input,'input',()=>{
      root.classList.remove('cl-bad');
      const raw=input.value,rgb=/^\s*rgb/i.test(raw)&&parse(raw);
      if(rgb){input.value=rgb;apply(rgb);clearTimeout(timer);fold();return}
      const left=raw.slice(0,input.selectionStart).replace(/[^0-9a-f]/gi,'').length,hex=raw.replace(/[^0-9a-f]/gi,'').slice(0,6).toUpperCase();
      input.value='#'+hex;const at=1+Math.min(left,hex.length);input.setSelectionRange(at,at);
      if(hex.length===6){apply('#'+hex);clearTimeout(timer);timer=setTimeout(fold,pbCalm()?0:320)}
      else{drop();clearTimeout(timer);if(focused())open()}
    });
    on(input,'keydown',e=>{
      if(e.key==='Escape'){fold();return}
      if(e.key!=='Enter')return;
      e.preventDefault();
      if(input.value==='#'||!input.value)return;
      const hex=parse(input.value);
      if(hex){input.value=hex;apply(hex);clearTimeout(timer);fold()}else reject();
    });
    on(input,'keydown',e=>{if(e.key==='Backspace'&&input.selectionStart<=1&&input.selectionEnd<=1)e.preventDefault()});
    on(opener,'pointerdown',e=>e.preventDefault());
    on(opener,'click',()=>{if(root.dataset.sheet==='open')fold();else open();if(!focused())input.focus({preventScroll:true})});
    on(sheet,'pointerdown',e=>e.preventDefault());
    showKnobs();
    on(document,'pointerdown',e=>{if(!e.composedPath().includes(root))fold()});
    // Never wider than its container, with a little air on both sides.
    const host=root.parentElement,fit=()=>{if(host)root.style.width=Math.min(380,host.clientWidth-36)+'px'};
    fit();
    const resize=typeof ResizeObserver==='function'&&host?new ResizeObserver(fit):null;
    resize?.observe(host);
    const api={get state(){return{hex:shown||'',sheet:root.dataset.sheet,value:input.value}},set(value){const hex=parse(value);if(!hex)return false;input.value=hex;apply(hex);return true},reset(){clearTimeout(timer);input.value='';drop();fold();root.classList.remove('cl-bad')},destroy(){clearTimeout(timer);finishPour?.();off.abort();dots.forEach(b=>b.remove());more.remove();resize?.disconnect();delete root.__pb}};
    root.__pb=api;
    return api;
  }// The catalog preview says what to type and fits the open palette to the card.
  globalThis.SLColor = { mount };
})();
