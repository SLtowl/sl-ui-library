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

    let read=[false,false,true],filter='all';
    function render(){all('[data-notification]').forEach((row,index)=>{row.hidden=filter==='unread'&&read[index];row.querySelector('[data-read-label]').textContent=read[index]?'Read':'Unread';const button=row.querySelector('[data-read]');button.textContent=read[index]?'Mark as unread':'Mark as read';button.setAttribute('aria-label',button.textContent+': '+row.querySelector('h3').textContent);});all('[data-filter]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.filter===filter)));const unread=read.filter(value=>!value).length;summary.textContent=unread+' unread notifications';q('[data-inbox-status]').textContent=unread+' unread · local';q('[data-empty]').hidden=filter!=='unread'||unread>0;q('[data-action=mark-all]').disabled=unread===0;}
    on(panel,'click',event=>{const button=event.target.closest('button');if(!button)return;if(button.dataset.filter){filter=button.dataset.filter;render();}if(button.hasAttribute('data-read')){const index=Number(button.dataset.read);read[index]=!read[index];render();if(filter==='unread')q('[data-filter=unread]').focus();emit({read:[...read]},'read');}});
    onAction('mark-all',()=>{read=[true,true,true];render();q('[data-filter='+filter+']').focus();emit({read:[...read]},'read-all');});
    feature={read:()=>({read:[...read],filter,unread:read.filter(value=>!value).length}),reset(){read=[false,false,true];filter='all';render();}};

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
