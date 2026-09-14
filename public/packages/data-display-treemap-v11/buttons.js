/* Local sample data; replace paired markup and records together. No network operations. */
(() => {
  'use strict';
  const mounted = new WeakMap();
  function mount(root, options = {}) {
    if (!root?.matches('.sl-component[data-kind="data-display-treemap-v11"]')) throw new TypeError('Use this package’s .sl-component root.');
    if (options.onChange !== undefined && typeof options.onChange !== 'function') throw new TypeError('onChange must be a function.');
    if (mounted.has(root)) return mounted.get(root);
    const view = root.ownerDocument.defaultView;
    const lifecycle = new view.AbortController();
    const q = selector => root.querySelector(selector);
    const all = selector => [...root.querySelectorAll(selector)];
    const text = (selector, value) => { q(selector).textContent = String(value); };
    const initial = () => ({"selected":0,"mode":"storage"});
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
        
      }
    }
    function paintModes() { for (const b of all('[data-mode]')) b.setAttribute('aria-pressed', String(b.dataset.mode === state.mode)); }
    function changeMode(value, allowed) {
      if (dead) return false;
      if (!allowed.includes(value)) throw new RangeError('Unknown display mode.');
      if (state.mode === value) return false;
      state.mode = value; render(); emit('mode'); return true;
    }
    const values={storage:[50,25,15,10],files:[240,360,120,80]},names=['Assets','Media','Docs','Logs'];
    function render() { paintSelection();paintModes();const v=values[state.mode],total=v.reduce((a,b)=>a+b,0),unit=state.mode==='storage'?'GB':'files';q('[data-map]').style.gridTemplateColumns=v[0]+'fr '+(total-v[0])+'fr';q('[data-map-right]').style.gridTemplateRows=v[1]+'fr '+(v[2]+v[3])+'fr';q('[data-map-bottom]').style.gridTemplateColumns=v[2]+'fr '+v[3]+'fr';all('[data-select]').forEach((b,i)=>{b.querySelector('[data-share]').textContent=v[i]/total*100+'%';b.setAttribute('aria-label',names[i]+': '+v[i]+' '+unit+', '+v[i]/total*100+'%');});const i=state.selected;text('[data-summary]',names[i]+' · '+v[i]+' '+unit+' · '+v[i]/total*100+'% of '+total+' '+unit); }
    function select(value){if(dead)return false;integer(value,4);if(state.selected===value)return false;state.selected=value;render();emit('select');return true;}
function setMode(value){return changeMode(value,['storage','files']);}
    function reset() {
      if (dead) return false;
      const focused = root.getRootNode().activeElement;
      state = initial(); render();
      if (root.contains(focused) && focused.closest('[inert]')) q('button').focus({preventScroll:true});
      
      emit('reset'); return true;
    }
    root.addEventListener('click', event => {
      const b = event.target.closest?.('button');
      if (!b || !root.contains(b) || b.disabled || b.closest('[inert]')) return;
      if (b.hasAttribute('data-select')) select(Number(b.dataset.select));
      else if (b.hasAttribute('data-mode')) setMode(b.dataset.mode);
      
    }, {signal:lifecycle.signal});
    
    render();
    const controller = {select,setMode, reset, get state() { return snapshot(); }, destroy() { if (dead) return; dead=true; lifecycle.abort(); mounted.delete(root); }};
    mounted.set(root, controller);
    return controller;
  }
  function mountPreview(root) { return mount(root); }
  window.SLComponent = { mount, mountPreview };
})();
