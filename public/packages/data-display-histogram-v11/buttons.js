/* Local sample data; replace paired markup and records together. No network operations. */
(() => {
  'use strict';
  const mounted = new WeakMap();
  function mount(root, options = {}) {
    if (!root?.matches('.sl-component[data-kind="data-display-histogram-v11"]')) throw new TypeError('Use this package’s .sl-component root.');
    if (options.onChange !== undefined && typeof options.onChange !== 'function') throw new TypeError('onChange must be a function.');
    if (mounted.has(root)) return mounted.get(root);
    const view = root.ownerDocument.defaultView;
    const lifecycle = new view.AbortController();
    const q = selector => root.querySelector(selector);
    const all = selector => [...root.querySelectorAll(selector)];
    const text = (selector, value) => { q(selector).textContent = String(value); };
    const initial = () => ({"selected":3,"mode":"frequency"});
    let state = initial(), dead = false;
    const snapshot = () => Object.freeze(Object.fromEntries(Object.entries(state).map(([key,value]) => [key, Array.isArray(value) ? Object.freeze([...value]) : value])));
    const integer = (value, length) => { if (!Number.isInteger(value) || value < 0 || value >= length) throw new RangeError('Index is outside this display.'); };
    function emit(action) {
      const detail = Object.freeze({kind:root.dataset.kind, action, state:snapshot()});
      root.dispatchEvent(new view.CustomEvent('displaychange', {bubbles:true, composed:true, detail}));
      options.onChange?.(detail);
    }
    function paintSelection() {
      for (const b of all('[data-select]')) {
        const selected = Number(b.dataset.select) === state.selected;
        b.setAttribute('aria-pressed', String(selected));
        b.tabIndex = selected ? 0 : -1;
      }
    }
    function paintModes() { for (const b of all('[data-mode]')) b.setAttribute('aria-pressed', String(b.dataset.mode === state.mode)); }
    function changeMode(value, allowed) {
      if (dead) return false;
      if (!allowed.includes(value)) throw new RangeError('Unknown display mode.');
      if (state.mode === value) return false;
      state.mode = value; render(); emit('mode'); return true;
    }
    const counts=[2,4,7,9,5,3];
    function render() { paintSelection();paintModes();const cumulative=state.mode==='cumulative',limit=cumulative?30:10;let sum=0;text('[data-max]',limit);text('[data-half]',limit/2);all('[data-select]').forEach((b,i)=>{sum+=counts[i];const n=cumulative?sum:counts[i];b.querySelector('[data-fill]').style.transform='scaleY('+n/limit+')';b.querySelector('[data-count]').textContent=n;b.setAttribute('aria-label',cumulative?'Up to '+((i+1)*2)+' minutes: '+n+' jobs':(i*2)+' to '+((i+1)*2)+' minutes: '+n+' jobs');});const i=state.selected,n=cumulative?counts.slice(0,i+1).reduce((a,b)=>a+b,0):counts[i];text('[data-summary]',(cumulative?'Up to '+((i+1)*2):i*2+'–'+(i+1)*2)+' minutes · '+n+' jobs · '+Math.round(n/30*100)+'% of total'); }
    function select(value){if(dead)return false;integer(value,6);if(state.selected===value)return false;state.selected=value;render();emit('select');return true;}
function setMode(value){return changeMode(value,['frequency','cumulative']);}
    function reset() {
      if (dead) return false;
      const focused = root.getRootNode().activeElement;
      state = initial(); render();
      if (root.contains(focused) && focused.closest('[inert]')) q('button').focus({preventScroll:true});
      else if(root.contains(focused)&&focused.hasAttribute('data-select'))q('[data-select="'+state.selected+'"]').focus({preventScroll:true});
      emit('reset'); return true;
    }
    root.addEventListener('click', event => {
      const b = event.target.closest?.('button');
      if (!b || !root.contains(b) || b.disabled || b.closest('[inert]')) return;
      if (b.hasAttribute('data-select')) select(Number(b.dataset.select));
      else if (b.hasAttribute('data-mode')) setMode(b.dataset.mode);
      
    }, {signal:lifecycle.signal});
    root.addEventListener('keydown', event => {
      
      const b=event.target.closest?.('[data-select]');if(!b||!root.contains(b))return;
      const index=Number(b.dataset.select),count=all('[data-select]').length,step=1;let next=index;
      if(event.key==='ArrowRight')next=Math.min(count-1,index+1);
      else if(event.key==='ArrowLeft')next=Math.max(0,index-1);
      else if(event.key==='ArrowDown')next=Math.min(count-1,index+step);
      else if(event.key==='ArrowUp')next=Math.max(0,index-step);
      else if(event.key==='Home')next=0;
      else if(event.key==='End')next=count-1;
      else return;
      event.preventDefault();select(next);q('[data-select="'+next+'"]').focus({preventScroll:true});
    }, {signal:lifecycle.signal});
    render();
    const controller = {select,setMode, reset, get state() { return snapshot(); }, destroy() { if (dead) return; dead=true; lifecycle.abort(); mounted.delete(root); }};
    mounted.set(root, controller);
    return controller;
  }
  function mountPreview(root) { return mount(root); }
  window.SLComponent = { mount, mountPreview };
})();
