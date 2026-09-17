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
    const input=q('.sl-shortcut'),record=q('.sl-record'),clear=q('.sl-clear');const initial=String(options.value??input.value);let value=initial,recording=false;
      const pretty=event=>{const parts=[];if(event.ctrlKey)parts.push('Ctrl');if(event.altKey)parts.push('Alt');if(event.shiftKey)parts.push('Shift');if(event.metaKey)parts.push('Meta');const ignored=['Control','Alt','Shift','Meta'];if(!ignored.includes(event.key)){let key=event.key===' '?'Space':event.key;key=key.length===1?key.toUpperCase():key;parts.push(key);}return parts;};
      function render(){input.value=recording?'Press a shortcut…':(value||'Not set');record.textContent=recording?'Listening…':'Record shortcut';record.setAttribute('aria-pressed',String(recording));clear.disabled=disabled||!value;setValidity(true,recording?'Press a key combination. Escape cancels.':value?'Shortcut saved locally.':'No shortcut assigned.',[]);}
      on(record,'click',()=>{recording=!recording;render();if(recording)record.focus();});on(record,'keydown',event=>{if(!recording)return;if(event.key==='Escape'){event.preventDefault();recording=false;render();return;}const parts=pretty(event);if(parts.length===0||['Ctrl','Alt','Shift','Meta'].includes(parts.at(-1)))return;event.preventDefault();const next=parts.join(' + ');recording=false;if(next!==value){value=next;render();emit();}else render();});on(clear,'click',()=>{if(!value)return;value='';recording=false;render();emit();});render();
      return finish(()=>({value,recording}),()=>{value=initial;recording=false;render();});
  }
  function mountPreview(root) { return mount(root); }
  window.SLComponent = { mount, mountPreview };
})();
