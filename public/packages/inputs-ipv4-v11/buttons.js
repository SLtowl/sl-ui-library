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
    const input=q('.sl-main');const incoming=Array.isArray(options.value)?options.value.join('.'):options.value;const initial=String(incoming??input.value);let state={};
      function render(emitChange=false){const parts=input.value.split('.'),valid=parts.length===4&&parts.every(x=>/^\d{1,3}$/.test(x)&&Number(x)<=255);state={value:valid?parts.map(Number):null,address:valid?parts.join('.'):'',valid,draft:input.value};q('.sl-address').textContent=valid?state.address:'Address incomplete';setValidity(valid,valid?'IPv4 address is complete.':'Enter four numbers from 0 to 255, separated by dots.',[input]);if(emitChange)emit();}
      input.value=initial;on(input,'input',()=>render(true));render();
      return finish(()=>state,()=>{input.value=initial;render();});
  }
  function mountPreview(root) { return mount(root); }
  window.SLComponent = { mount, mountPreview };
})();
