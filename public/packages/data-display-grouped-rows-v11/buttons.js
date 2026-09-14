/* Local sample data; replace paired markup and records together. No network operations. */
(() => {
  'use strict';
  const mounted = new WeakMap();
  function mount(root, options = {}) {
    if (!root?.matches('.sl-component[data-kind="data-display-grouped-rows-v11"]')) throw new TypeError('Use this package’s .sl-component root.');
    if (options.onChange !== undefined && typeof options.onChange !== 'function') throw new TypeError('onChange must be a function.');
    if (mounted.has(root)) return mounted.get(root);
    const view = root.ownerDocument.defaultView;
    const lifecycle = new view.AbortController();
    const q = selector => root.querySelector(selector);
    const all = selector => [...root.querySelectorAll(selector)];
    const text = (selector, value) => { q(selector).textContent = String(value); };
    const initial = () => ({"selected":0,"expanded":[true,false,false]});
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
    const records=[['Brief',3],['Research',5],['Interface',8],['Tokens',4],['QA',6],['Docs',2]];
    function render() { paintSelection();all('[data-panel]').forEach((p,i)=>{const open=state.expanded[i];p.dataset.open=String(open);p.inert=!open;p.setAttribute('aria-hidden',String(!open));q('[data-toggle="'+i+'"]').setAttribute('aria-expanded',String(open));});const r=records[state.selected];text('[data-summary]',r[0]+' · '+r[1]+' h · '+Math.round(r[1]/28*100)+'% of 28 logged hours'); }
    function select(value){if(dead)return false;integer(value,6);if(state.selected===value&&state.expanded[Math.floor(value/2)])return false;state.selected=value;state.expanded[Math.floor(value/2)]=true;render();emit('select');return true;}
function toggle(value,expanded){if(dead)return false;integer(value,3);if(expanded!==undefined&&typeof expanded!=='boolean')throw new TypeError('Expanded must be boolean.');const next=expanded??!state.expanded[value];if(next===state.expanded[value])return false;const panel=q('[data-panel="'+value+'"]');if(!next&&panel.contains(root.getRootNode().activeElement))q('[data-toggle="'+value+'"]').focus({preventScroll:true});state.expanded[value]=next;render();emit('toggle');return true;}
    function reset() {
      if (dead) return false;
      const focused = root.getRootNode().activeElement;
      state = initial(); render(); q('.dd-groups').scrollTop = 0;
      if (root.contains(focused) && focused.closest('[inert]')) q('button').focus({preventScroll:true});
      
      emit('reset'); return true;
    }
    root.addEventListener('click', event => {
      const b = event.target.closest?.('button');
      if (!b || !root.contains(b) || b.disabled || b.closest('[inert]')) return;
      if (b.hasAttribute('data-select')) select(Number(b.dataset.select));
      
      else if(b.hasAttribute('data-toggle'))toggle(Number(b.dataset.toggle));
    }, {signal:lifecycle.signal});
    root.addEventListener('keydown', event => {
      if(event.key==='Escape'){const panel=event.target.closest('[data-panel]');if(panel){event.preventDefault();toggle(Number(panel.dataset.panel),false);}return;}
      
    }, {signal:lifecycle.signal});
    render();
    const controller = {select,toggle, reset, get state() { return snapshot(); }, destroy() { if (dead) return; dead=true; lifecycle.abort(); mounted.delete(root); }};
    mounted.set(root, controller);
    return controller;
  }
  function mountPreview(root) { return mount(root); }
  window.SLComponent = { mount, mountPreview };
})();
