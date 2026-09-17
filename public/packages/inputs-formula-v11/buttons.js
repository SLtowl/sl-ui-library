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
    const input=q('.sl-main'),out=q('.sl-result output');const initial=String(options.value??input.value);let state={};
      function evaluate(source){const s=source.replace(/[×·]/g,'*').replace(/÷/g,'/').replace(/−/g,'-');let i=0;const ws=()=>{while(/\s/.test(s[i]||''))i++;};const number=()=>{ws();const m=s.slice(i).match(/^(?:\d+(?:\.\d*)?|\.\d+)/);if(!m)throw Error('number');i+=m[0].length;return Number(m[0]);};const factor=()=>{ws();if(s[i]==='+'){i++;return factor();}if(s[i]==='-'){i++;return-factor();}if(s[i]==='('){i++;const v=expr();ws();if(s[i]!==')')throw Error('paren');i++;return v;}return number();};const term=()=>{let v=factor();for(;;){ws();if(s[i]==='*'){i++;v*=factor();}else if(s[i]==='/'){i++;const d=factor();if(d===0)throw Error('zero');v/=d;}else return v;}};const expr=()=>{let v=term();for(;;){ws();if(s[i]==='+'){i++;v+=term();}else if(s[i]==='-'){i++;v-=term();}else return v;}};const value=expr();ws();if(i!==s.length||!Number.isFinite(value))throw Error('syntax');return value;}
      function render(emitChange=false){try{const value=evaluate(input.value);state={expression:input.value,value,valid:true};out.textContent=format(value);setValidity(true,'Expression calculated locally.',[input]);}catch{state={expression:input.value,value:null,valid:false};out.textContent='—';setValidity(false,'Check the arithmetic expression.',[input]);}if(emitChange)emit();}
      input.value=initial;on(input,'input',()=>render(true));render();return finish(()=>state,()=>{input.value=initial;render();});
  }
  function mountPreview(root) { return mount(root); }
  window.SLComponent = { mount, mountPreview };
})();
