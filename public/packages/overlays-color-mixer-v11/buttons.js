(() => {
  'use strict';
  const mounted = new WeakMap();
  function mount(root, options = {}) {
    if (mounted.has(root)) return mounted.get(root);
    const doc = root.ownerDocument, view = doc.defaultView;
    const q = selector => root.querySelector(selector), all = selector => [...root.querySelectorAll(selector)];
    const life = new view.AbortController();
    const on = (target, type, handler) => target.addEventListener(type, handler, {signal:life.signal});
    const panel = q('[data-panel]'), layer = q('[data-layer]'), launch = q('[data-launch]');
    const trigger = q('[data-trigger]'), summary = q('[data-summary]'), initialSummary = summary.textContent;
    let opened = false, destroyed = false, feature = {};
    const active = () => root.getRootNode().activeElement;
    const onAction = (action, handler) => on(q('[data-action="'+action+'"]'), 'click', handler);
    function emit(value, action) {
      if (destroyed) return;
      const detail = {kind:root.dataset.kind, action, value:JSON.parse(JSON.stringify(value))};
      root.dispatchEvent(new view.CustomEvent('overlaychange', {bubbles:true,composed:true,detail}));
      if (typeof options.onChange === 'function') options.onChange(detail);
    }
    function open() {
      if (destroyed || opened) return;
      feature.open?.(); opened = true; root.dataset.open = 'true';
      layer.inert = false; layer.setAttribute('aria-hidden','false'); trigger.setAttribute('aria-expanded','true');
      q('[data-close]').focus({preventScroll:true}); launch.inert = true;
    }
    function close({restoreFocus = true} = {}) {
      if (destroyed || !opened) return;
      const ownedFocus = panel.contains(active());
      opened = false; root.dataset.open = 'false'; launch.inert = false;
      trigger.setAttribute('aria-expanded','false');
      if (restoreFocus && ownedFocus) trigger.focus({preventScroll:true});
      layer.inert = true; layer.setAttribute('aria-hidden','true'); feature.close?.();
    }
    on(trigger,'click',open);
    on(q('[data-close]'),'click',()=>close());
    const cancel = q('[data-action=cancel]'); if (cancel) on(cancel,'click',()=>close());
    const isBackdrop = event => event.target === layer || event.target === q('[data-backdrop]');
    on(layer,'pointerdown',event=>{if(isBackdrop(event))event.preventDefault();});
    on(layer,'click',event=>{if(isBackdrop(event))close();});
    on(root,'keydown',event=>{
      if (!opened) return;
      if (event.key === 'Escape') {event.preventDefault();event.stopPropagation();close();}
      if (event.key !== 'Tab' || !panel.contains(active())) return;
      const stops = [...panel.querySelectorAll('button,input,select,[tabindex]')].filter(node=>!node.disabled && node.tabIndex>=0 && node.getClientRects().length>0 && !node.closest('[hidden]'));
      const first = stops[0], last = stops.at(-1);
      if (event.shiftKey && (active()===first || active()===panel)) {event.preventDefault();last?.focus();}
      else if (!event.shiftKey && (active()===last || active()===panel)) {event.preventDefault();first?.focus();}
    });
    on(root,'focusout',event=>{if(opened && event.relatedTarget && !root.contains(event.relatedTarget)) close({restoreFocus:false});});

    const initial='#A8C0AE';let value=initial,draft=value,valid=true;
    const channels=()=>[1,3,5].map(index=>parseInt(draft.slice(index,index+2),16));
    function render(){q('[data-swatch]').style.setProperty('--mixed-color',draft);q('[data-swatch]').setAttribute('aria-label','Selected color '+draft);['r','g','b'].forEach((key,index)=>{q('[name='+key+']').value=channels()[index];q('[data-channel='+key+']').textContent=channels()[index];});q('[name=hex]').value=draft;valid=true;q('[name=hex]').setAttribute('aria-invalid','false');q('[data-action=apply]').disabled=false;q('[data-color-status]').textContent='Six digits, with or without #.';}
    on(panel,'input',event=>{if(['r','g','b'].includes(event.target.name)){draft='#'+['r','g','b'].map(key=>Math.max(0,Math.min(255,Number(q('[name='+key+']').value))).toString(16).padStart(2,'0')).join('').toUpperCase();render();}if(event.target.name==='hex'){const candidate=event.target.value.trim();valid=/^#?[0-9a-f]{6}$/i.test(candidate);event.target.setAttribute('aria-invalid',String(!valid));q('[data-action=apply]').disabled=!valid;q('[data-color-status]').textContent=valid?'Color ready.':'Enter exactly six hexadecimal digits.';if(valid){draft='#'+candidate.replace('#','').toUpperCase();const selection=event.target.selectionStart;render();event.target.setSelectionRange(selection,selection);}}});
    onAction('apply',()=>{if(!valid)return;value=draft;summary.textContent=value+' selected';close();emit({hex:value,rgb:channels()},'select');});
    function sync(){draft=value;render();}
    feature={read:()=>({hex:value,draft,valid,rgb:channels()}),open:sync,close:sync,reset(){value=initial;sync();}};

    function reset() {
      if (destroyed) return;
      close(); feature.reset?.(); summary.textContent = initialSummary;
      root.dataset.open = 'false'; trigger.setAttribute('aria-expanded','false'); launch.inert = false;
      layer.inert = true; layer.setAttribute('aria-hidden','true'); q('.ov-body').scrollTop = 0;
    }
    const controller = {open, close, reset, destroy() {
      if (destroyed) return;
      reset(); feature.destroy?.(); destroyed = true; life.abort(); mounted.delete(root);
    }, get state() { return {open:opened,...feature.read?.()}; }};
    mounted.set(root,controller); reset(); return controller;
  }
  function mountPreview(root) { return mount(root); }
  window.SLComponent = { mount, mountPreview };
})();
