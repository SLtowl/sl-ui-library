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
    const fields=qa('.sl-ip input');const initial=(Array.isArray(options.value)?options.value.map(String):fields.map(x=>x.value));let state={};
      function render(emitChange=false){const parts=fields.map(x=>x.value),valid=parts.every(x=>/^\d{1,3}$/.test(x)&&Number(x)<=255);state={value:valid?parts.map(Number):null,address:valid?parts.join('.'):'',valid,draft:parts.slice()};q('.sl-address').textContent=valid?state.address:'Address incomplete';setValidity(valid,valid?'IPv4 address is complete.':'Every octet must be an integer from 0 to 255.',fields);if(emitChange)emit();}
      fields.forEach((field,i)=>{field.value=initial[i]??'';on(field,'input',()=>{field.value=field.value.replace(/\D/g,'').slice(0,3);render(true);if(field.value.length===3&&Number(field.value)<=255&&fields[i+1])fields[i+1].focus();});on(field,'keydown',e=>{if(e.key==='Backspace'&&field.selectionStart===0&&field.selectionEnd===0&&fields[i-1])fields[i-1].focus();});});render();
      return finish(()=>state,()=>{fields.forEach((x,i)=>x.value=initial[i]??'');render();});
  }
  function mountPreview(root) { return mount(root); }
  window.SLComponent = { mount, mountPreview };
})();
