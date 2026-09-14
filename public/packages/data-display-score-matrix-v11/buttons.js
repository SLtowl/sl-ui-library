/* Local sample data; replace paired markup and records together. No network operations. */
(() => {
  'use strict';
  const mounted = new WeakMap();
  function mount(root, options = {}) {
    if (!root?.matches('.sl-component[data-kind="data-display-score-matrix-v11"]')) throw new TypeError('Use this package’s .sl-component root.');
    if (options.onChange !== undefined && typeof options.onChange !== 'function') throw new TypeError('onChange must be a function.');
    if (mounted.has(root)) return mounted.get(root);
    const view = root.ownerDocument.defaultView;
    const lifecycle = new view.AbortController();
    const q = selector => root.querySelector(selector);
    const all = selector => [...root.querySelectorAll(selector)];
    const text = (selector, value) => { q(selector).textContent = String(value); };
    const initial = () => ({"selected":4,"mode":"score"});
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
    const values=[4,3,5,5,4,4,3,5,4],platforms=['Web','iOS','API'],criteria=['Speed','Usability','Coverage'];
    function render() { paintSelection();paintModes();all('[data-select]').forEach((b,i)=>{b.querySelector('[data-score]').textContent=state.mode==='score'?values[i]:5-values[i];b.querySelector('[data-outof]').textContent=state.mode==='score'?'/ 5':'left';b.setAttribute('aria-label',criteria[Math.floor(i/3)]+', '+platforms[i%3]+': '+(state.mode==='score'?values[i]+' of 5':5-values[i]+' points to target'));});text('[data-scale]',state.mode==='score'?'Score: 1–5':'Gap: 0–4');q('[data-scale]').nextElementSibling.textContent=state.mode==='score'?'Higher is better':'Lower is better';const i=state.selected,gap=5-values[i];text('[data-summary]',platforms[i%3]+' · '+criteria[Math.floor(i/3)]+' · '+values[i]+' / 5 · '+(gap?gap+' point'+(gap===1?'':'s')+' to target':'target met')); }
    function select(value){if(dead)return false;integer(value,9);if(state.selected===value)return false;state.selected=value;render();emit('select');return true;}
function setMode(value){return changeMode(value,['score','gap']);}
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
      const index=Number(b.dataset.select),count=all('[data-select]').length,step=3;let next=index;
      if(event.key==='ArrowRight')next=index%step===step-1?index:index+1;
      else if(event.key==='ArrowLeft')next=index%step===0?index:index-1;
      else if(event.key==='ArrowDown')next=index+step<count?index+step:index;
      else if(event.key==='ArrowUp')next=index-step>=0?index-step:index;
      else if(event.key==='Home')next=event.ctrlKey?0:Math.floor(index/step)*step;
      else if(event.key==='End')next=event.ctrlKey?count-1:Math.min(count-1,Math.floor(index/step)*step+step-1);
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
