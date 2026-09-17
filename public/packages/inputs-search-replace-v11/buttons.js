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
    const find=q('.sl-find'),replacement=q('.sl-replace'),apply=q('.sl-apply'),sample=q('.sl-sample'),matches=q('.sl-matches');const original=String(options.text??sample.textContent),initialFind=String(options.find??find.value),initialReplacement=String(options.replace??replacement.value);let text=original,state={};
      function count(haystack,needle){if(!needle)return 0;let total=0,pos=0;while((pos=haystack.indexOf(needle,pos))!==-1){total++;pos+=Math.max(needle.length,1);}return total;}
      function render(emitChange=false){const n=count(text,find.value);state={find:find.value,replace:replacement.value,text,matches:n};matches.textContent=n+' '+(n===1?'match':'matches');apply.disabled=disabled||n===0;sample.textContent=text;setValidity(Boolean(find.value),find.value?(n?n+' literal match'+(n===1?'':'es')+' found.':'No literal matches found.'):'Enter text to find.',[find]);if(emitChange)emit();}
      find.value=initialFind;replacement.value=initialReplacement;on(find,'input',()=>render(true));on(replacement,'input',()=>render(true));on(apply,'click',()=>{if(!find.value)return;const next=text.split(find.value).join(replacement.value);if(next!==text){text=next;root.dataset.changed='true';render(true);}});render();
      return finish(()=>state,()=>{find.value=initialFind;replacement.value=initialReplacement;text=original;delete root.dataset.changed;render();});
  }
  function mountPreview(root) { return mount(root); }
  window.SLComponent = { mount, mountPreview };
})();
