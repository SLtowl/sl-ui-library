/* Local sample data; replace paired markup and records together. No network operations. */
(() => {
  'use strict';
  const mounted = new WeakMap();
  function mount(root, options = {}) {
    if (!root?.matches('.sl-component[data-kind="data-display-funnel-v11"]')) throw new TypeError('Use this package’s .sl-component root.');
    if (options.onChange !== undefined && typeof options.onChange !== 'function') throw new TypeError('onChange must be a function.');
    if (mounted.has(root)) return mounted.get(root);
    const view = root.ownerDocument.defaultView;
    const lifecycle = new view.AbortController();
    const q = selector => root.querySelector(selector);
    const all = selector => [...root.querySelectorAll(selector)];
    const text = (selector, value) => { q(selector).textContent = String(value); };
    const initial = () => ({"selected":2,"mode":"entry"});
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
    const stages=[["Viewed",1000],["Started",600],["Submitted",240],["Activated",120]];
    function render() { paintSelection();paintModes();all('[data-select]').forEach((b,i)=>{const base=state.mode==='entry'?1000:(i?stages[i-1][1]:1000),rate=Math.round(stages[i][1]/base*100);b.querySelector('[data-rate]').textContent=rate+'%';b.querySelector('.dd-funnel-track i').style.transform='scaleX('+stages[i][1]/base+')';b.setAttribute('aria-label',stages[i][0]+': '+stages[i][1]+' people, '+rate+'% of '+(state.mode==='entry'?'entry':i?'previous stage':'entry'));});const i=state.selected;text('[data-summary]',stages[i][0]+' · '+stages[i][1]+' people · '+(i?stages[i-1][1]-stages[i][1]+' lost from '+stages[i-1][0]:'entry stage; no previous drop-off')); }
    function select(value){if(dead)return false;integer(value,4);if(state.selected===value)return false;state.selected=value;render();emit('select');return true;}
function setMode(value){return changeMode(value,['entry','previous']);}
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
