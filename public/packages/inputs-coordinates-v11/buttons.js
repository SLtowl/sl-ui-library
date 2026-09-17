(() => {
  'use strict';
  function mount(root, options = {}) {
    if (!root || !root.matches('.sl-component')) throw new TypeError('A .sl-component root is required.');
    if (typeof root.__slInputCleanup === 'function') root.__slInputCleanup();
    const removers = []; let destroyed = false; let snapshot = ''; const disabled = Boolean(options.disabled);
    const q = selector => root.querySelector(selector); const qa = selector => [...root.querySelectorAll(selector)];
    const on = (node, type, handler, settings) => { node.addEventListener(type, handler, settings); removers.push(() => node.removeEventListener(type, handler, settings)); };
    const format = value => new Intl.NumberFormat(root.lang || 'en', { maximumFractionDigits: 8 }).format(value);
    const status = document.createElement('p'); status.className = 'sl-status'; status.setAttribute('role', 'status'); status.setAttribute('aria-live', 'polite'); root.append(status);
    function setValidity(valid, message, fields) { root.dataset.invalid = String(!valid); status.dataset.tone = valid ? 'success' : 'error'; status.textContent = message; fields.forEach(field => field.setAttribute('aria-invalid', String(!valid))); }
    let getState = () => ({});
    const copy = value => JSON.parse(JSON.stringify(value));
    function emit() { if (destroyed) return; const next = JSON.stringify(getState()); if (next === snapshot) return; snapshot = next; const detail = copy(getState()); if (typeof options.onChange === 'function') options.onChange(detail); root.dispatchEvent(new CustomEvent('sl:change', { bubbles: true, composed: true, detail })); }
    function finish(stateReader, resetter) { getState = stateReader; snapshot = JSON.stringify(getState()); const form = root.closest('form'); const resetHandler = () => queueMicrotask(() => { if (!destroyed) { resetter(); snapshot = JSON.stringify(getState()); } }); if (form) on(form, 'reset', resetHandler); const cleanup = () => { if (destroyed) return; destroyed = true; removers.splice(0).forEach(remove => remove()); status.remove(); if (root.__slInputCleanup === cleanup) delete root.__slInputCleanup; }; Object.defineProperty(root, '__slInputCleanup', { value: cleanup, configurable: true, writable: true }); qa('input,button').forEach(node => { node.disabled = disabled; }); return { reset() { if (destroyed) return; resetter(); snapshot = JSON.stringify(getState()); }, destroy: cleanup, get state() { return copy(getState()); } }; }
    const lat=q('.sl-lat'), lng=q('.sl-lng'), out=q('.sl-position'); const iv=options.value&&typeof options.value==='object'?options.value:{lat:lat.value,lng:lng.value}; const initial={lat:String(iv.lat),lng:String(iv.lng)}; let state={};
      function axis(value,max,pos,neg){const n=Number(value.replace(',','.'));return {valid:value.trim()!==''&&Number.isFinite(n)&&n>=-max&&n<=max,value:n,label:Math.abs(n).toFixed(4)+'° '+(n<0?neg:pos)}}
      function render(emitChange=false){const a=axis(lat.value,90,'N','S'),b=axis(lng.value,180,'E','W');state={value:a.valid&&b.valid?{lat:a.value,lng:b.value}:null,valid:a.valid&&b.valid,draft:{lat:lat.value,lng:lng.value}};out.textContent=state.valid?a.label+' · '+b.label:'Coordinates incomplete';setValidity(state.valid,state.valid?'Coordinates are within geographic bounds.':'Latitude must be −90…90 and longitude −180…180.',[lat,lng]);if(emitChange)emit();}
      lat.value=initial.lat;lng.value=initial.lng;on(lat,'input',()=>render(true));on(lng,'input',()=>render(true));render();
      return finish(()=>state,()=>{lat.value=initial.lat;lng.value=initial.lng;render();});
  }
  function mountPreview(root) { return mount(root); }
  window.SLComponent = { mount, mountPreview };
})();
