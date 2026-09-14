/* Local sample data; replace paired markup and records together. No network operations. */
(() => {
  'use strict';
  const mounted = new WeakMap();
  function mount(root, options = {}) {
    if (!root?.matches('.sl-component[data-kind="data-display-series-legend-v11"]')) throw new TypeError('Use this package’s .sl-component root.');
    if (options.onChange !== undefined && typeof options.onChange !== 'function') throw new TypeError('onChange must be a function.');
    if (mounted.has(root)) return mounted.get(root);
    const view = root.ownerDocument.defaultView;
    const lifecycle = new view.AbortController();
    const q = selector => root.querySelector(selector);
    const all = selector => [...root.querySelectorAll(selector)];
    const text = (selector, value) => { q(selector).textContent = String(value); };
    const initial = () => ({"visible":[true,true,true]});
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
    const totals=[115,120,55];
    function render() { all('[data-toggle]').forEach((b,i)=>{b.setAttribute('aria-pressed',String(state.visible[i]));b.disabled=state.visible[i]&&state.visible.filter(Boolean).length===1;b.querySelector('[data-check]').textContent=state.visible[i]?'✓':'−';q('[data-series="'+i+'"]').style.opacity=state.visible[i]?'1':'0';});text('[data-summary]',state.visible.filter(Boolean).length+' series · '+totals.reduce((sum,n,i)=>sum+(state.visible[i]?n:0),0)+' visits shown'); }
    function toggle(value,visible){if(dead)return false;integer(value,3);if(visible!==undefined&&typeof visible!=='boolean')throw new TypeError('Visible must be boolean.');const next=visible??!state.visible[value];if(next===state.visible[value]||(!next&&state.visible.filter(Boolean).length===1))return false;state.visible[value]=next;render();emit('toggle');return true;}
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
      
      
      if(b.hasAttribute('data-toggle'))toggle(Number(b.dataset.toggle));
    }, {signal:lifecycle.signal});
    
    render();
    const controller = {toggle, reset, get state() { return snapshot(); }, destroy() { if (dead) return; dead=true; lifecycle.abort(); mounted.delete(root); }};
    mounted.set(root, controller);
    return controller;
  }
  function mountPreview(root) { return mount(root); }
  window.SLComponent = { mount, mountPreview };
})();
