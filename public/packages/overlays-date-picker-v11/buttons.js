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

    const initial='2026-09-15',days=all('[data-day]');
    let value=initial,draft=value,cursor=value;
    const parse = iso=>new Date(iso+'T12:00:00Z');
    const iso = date=>date.toISOString().slice(0,10);
    const format = date=>parse(date).toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric',timeZone:'UTC'});
    let month = parse(value);
    function render(){
      q('[data-month]').textContent=month.toLocaleDateString('en-US',{month:'long',year:'numeric',timeZone:'UTC'});
      const start=new Date(Date.UTC(month.getUTCFullYear(),month.getUTCMonth(),1,12));start.setUTCDate(1-(start.getUTCDay()+6)%7);
      days.forEach((button,index)=>{const date=new Date(start);date.setUTCDate(start.getUTCDate()+index);const key=iso(date);button.dataset.date=key;button.textContent=date.getUTCDate();button.setAttribute('aria-label',format(key));button.setAttribute('aria-pressed',String(key===draft));button.dataset.outside=String(date.getUTCMonth()!==month.getUTCMonth());button.tabIndex=key===cursor?0:-1;button.disabled=key<'1900-01-01'||key>'2099-12-31';});
      q('[data-date-status]').textContent=format(draft);
      q('[data-action=previous]').disabled=month.getUTCFullYear()<=1900&&month.getUTCMonth()===0;
      q('[data-action=next]').disabled=month.getUTCFullYear()>=2099&&month.getUTCMonth()===11;
    }
    function moveMonth(delta){const date=parse(cursor),day=date.getUTCDate();date.setUTCDate(1);date.setUTCMonth(date.getUTCMonth()+delta);date.setUTCDate(Math.min(day,new Date(Date.UTC(date.getUTCFullYear(),date.getUTCMonth()+1,0)).getUTCDate()));move(iso(date));}
    function move(next){if(next<'1900-01-01'||next>'2099-12-31')return;cursor=next;month=parse(next);render();}
    onAction('previous',()=>moveMonth(-1));onAction('next',()=>moveMonth(1));
    on(q('.ov-calendar'),'click',event=>{const button=event.target.closest('[data-day]');if(!button||button.disabled)return;draft=button.dataset.date;move(draft);days.find(day=>day.dataset.date===cursor)?.focus();});
    on(q('.ov-calendar'),'keydown',event=>{const button=event.target.closest('[data-day]');if(!button)return;let delta={ArrowLeft:-1,ArrowRight:1,ArrowUp:-7,ArrowDown:7}[event.key];const current=parse(button.dataset.date);
      if(event.key==='Home')delta=-((current.getUTCDay()+6)%7);if(event.key==='End')delta=6-(current.getUTCDay()+6)%7;
      if(delta!==undefined){event.preventDefault();current.setUTCDate(current.getUTCDate()+delta);move(iso(current));}
      else if(event.key==='PageUp'||event.key==='PageDown'){event.preventDefault();moveMonth(event.key==='PageUp'?-1:1);}else return;
      days.find(day=>day.dataset.date===cursor)?.focus();
    });
    onAction('apply',()=>{value=draft;summary.textContent=format(value);close();emit({date:value},'select');});
    function sync(){draft=value;cursor=value;month=parse(value);render();}
    feature={read:()=>({date:value,draft,month:iso(month).slice(0,7),cursor}),open:sync,close:sync,reset(){value=initial;sync();}};

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
