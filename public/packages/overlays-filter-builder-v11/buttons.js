(() => {
  'use strict';
  // Styled listbox with a hidden native value carrier for form/controller compatibility.
  function bindChoice(root, select, on) {
    const wrap = select.closest('.sl-choice'), trigger = wrap.querySelector('.sl-choice-trigger'), label = wrap.querySelector('.sl-choice-value');
    const list = wrap.querySelector('.sl-choice-list'), buttons = [...wrap.querySelectorAll('[data-choice]')];
    let opened = false;
    function sync() {
      const selected = buttons.find(button => button.dataset.choice === select.value);
      if (selected) label.textContent = selected.textContent;
      trigger.disabled = select.disabled;
      buttons.forEach(button => { const active = button === selected; button.setAttribute('aria-selected', String(active)); button.tabIndex = active ? 0 : -1; });
      if (select.disabled) close(false);
    }
    function close(focus = true) {
      if (!opened) return; opened = false; trigger.setAttribute('aria-expanded', 'false');
      if (focus) trigger.focus({ preventScroll: true });
      wrap.dataset.expanded = 'false'; list.inert = true; list.setAttribute('aria-hidden', 'true');
    }
    function open() {
      if (select.disabled || opened) return; sync(); opened = true;
      wrap.dataset.expanded = 'true'; list.inert = false; list.setAttribute('aria-hidden', 'false'); trigger.setAttribute('aria-expanded', 'true');
      const boundary = select.closest('.ov-body') || root, bounds = boundary.getBoundingClientRect(), anchor = trigger.getBoundingClientRect();
      const below = bounds.bottom - anchor.bottom - 8, above = anchor.top - bounds.top - 8;
      wrap.dataset.up = String(below < Math.min(164, list.scrollHeight) && above > below);
      list.style.maxHeight = Math.max(48, Math.min(164, wrap.dataset.up === 'true' ? above : below)) + 'px';
      const selected = buttons.find(button => button.dataset.choice === select.value) || buttons.find(button => !button.disabled);
      selected?.focus({ preventScroll: true }); if (selected) list.scrollTop = Math.max(0, selected.offsetTop - list.clientHeight / 2);
    }
    on(trigger, 'click', () => opened ? close() : open());
    on(trigger, 'keydown', event => { if (['ArrowDown', 'ArrowUp'].includes(event.key)) { event.preventDefault(); event.stopPropagation(); open(); } });
    buttons.forEach(button => on(button, 'click', event => {
      event.preventDefault(); if (select.disabled || button.disabled) return;
      const changed = select.value !== button.dataset.choice; select.value = button.dataset.choice; sync(); close();
      if (changed) select.dispatchEvent(new select.ownerDocument.defaultView.Event('change', { bubbles: true, composed: true }));
    }));
    on(wrap, 'keydown', event => {
      if (!opened) return;
      if (event.key === 'Escape') { event.preventDefault(); event.stopPropagation(); close(); return; }
      if (event.key === 'Tab') { close(false); return; }
      if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault(); event.stopPropagation();
      const enabled = buttons.filter(button => !button.disabled), current = enabled.indexOf(root.getRootNode().activeElement);
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? enabled.length - 1 : (current + (event.key === 'ArrowDown' ? 1 : enabled.length - 1)) % enabled.length;
      enabled.forEach((button, i) => { button.tabIndex = i === next ? 0 : -1; }); enabled[next]?.focus({ preventScroll: true }); if (enabled[next]) list.scrollTop = Math.max(0, enabled[next].offsetTop - list.clientHeight / 2);
    });
    on(select, 'change', sync);
    on(root.ownerDocument, 'pointerdown', event => { if (opened && !event.composedPath().includes(wrap)) close(false); });
    on(wrap, 'focusout', event => { if (opened && event.relatedTarget && !wrap.contains(event.relatedTarget)) close(false); });
    sync(); list.inert = true; list.setAttribute('aria-hidden', 'true');
    return { sync, close, destroy() { close(false); } };
  }
  const mounted = new WeakMap();
  function mount(root, options = {}) {
    if (mounted.has(root)) return mounted.get(root);
    const doc = root.ownerDocument, view = doc.defaultView;
    const q = selector => root.querySelector(selector), all = selector => [...root.querySelectorAll(selector)];
    const life = new view.AbortController();
    const on = (target, type, handler) => target.addEventListener(type, handler, {signal:life.signal});
    const choiceUI = bindChoice(root, q('select'), on);
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
      feature.open?.(); choiceUI.sync(); opened = true; root.dataset.open = 'true';
      layer.inert = false; layer.setAttribute('aria-hidden','false'); trigger.setAttribute('aria-expanded','true');
      q('[data-close]').focus({preventScroll:true}); launch.inert = true;
    }
    function close({restoreFocus = true} = {}) {
      if (destroyed || !opened) return;
      const ownedFocus = panel.contains(active());
      choiceUI.close(false);
      opened = false; root.dataset.open = 'false'; launch.inert = false;
      trigger.setAttribute('aria-expanded','false');
      if (restoreFocus && ownedFocus) trigger.focus({preventScroll:true});
      layer.inert = true; layer.setAttribute('aria-hidden','true'); feature.close?.(); choiceUI.sync();
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
      const stops = [...panel.querySelectorAll('button,input,select,[tabindex]')].filter(node=>!node.disabled && node.tabIndex>=0 && node.getClientRects().length>0 && !node.closest('[hidden],[inert]'));
      const first = stops[0], last = stops.at(-1);
      if (event.shiftKey && (active()===first || active()===panel)) {event.preventDefault();last?.focus();}
      else if (!event.shiftKey && (active()===last || active()===panel)) {event.preventDefault();first?.focus();}
    });
    on(root,'focusout',event=>{if(opened && event.relatedTarget && !root.contains(event.relatedTarget)) close({restoreFocus:false});});

    const projects=[{title:'Studio website',status:'active',mine:true},{title:'Field notes',status:'planned',mine:true},{title:'Mobile kit',status:'active',mine:false},{title:'Archive index',status:'planned',mine:false}];
    const initial={query:'',status:'all',mine:false};let value={...initial},draft={...initial};
    const matches=()=>projects.filter(project=>project.title.toLowerCase().includes(draft.query.toLowerCase().trim())&&(draft.status==='all'||project.status===draft.status)&&(!draft.mine||project.mine));
    function render(){const list=matches();q('[data-match-count]').textContent=list.length+' matching project'+(list.length===1?'':'s');const target=q('[data-matches]');target.replaceChildren(...list.map(project=>{const li=doc.createElement('li');li.textContent=project.title;return li;}));if(!list.length){const li=doc.createElement('li');li.textContent='Try removing a filter.';target.append(li);}q('[data-action=apply]').textContent='Show '+list.length;}
    function sync(){for(const key of ['query','status'])q('[name='+key+']').value=draft[key];q('[name=mine]').checked=draft.mine;render();choiceUI.sync();}
    on(panel,'input',event=>{if(event.target.name==='query'){draft.query=event.target.value;render();}});
    on(panel,'change',event=>{if(event.target.name==='status')draft.status=event.target.value;if(event.target.name==='mine')draft.mine=event.target.checked;render();});
    onAction('clear',()=>{draft={...initial};sync();});
    onAction('apply',()=>{value={...draft};const results=matches().map(project=>project.title);summary.textContent=results.length+' projects · '+((value.query?1:0)+(value.status!=='all'?1:0)+(value.mine?1:0))+' filters';close();emit({filters:{...value},results},'apply');});
    feature={read:()=>({filters:{...value},draft:{...draft},matches:matches().map(project=>project.title)}),open(){draft={...value};sync();},close(){draft={...value};sync();},reset(){value={...initial};draft={...initial};sync();}};

    function reset() {
      if (destroyed) return;
      close(); choiceUI.close(false); feature.reset?.(); choiceUI.sync(); summary.textContent = initialSummary;
      root.dataset.open = 'false'; trigger.setAttribute('aria-expanded','false'); launch.inert = false;
      layer.inert = true; layer.setAttribute('aria-hidden','true'); q('.ov-body').scrollTop = 0;
    }
    const controller = {open, close, reset, destroy() {
      if (destroyed) return;
      reset(); choiceUI.destroy(); feature.destroy?.(); destroyed = true; life.abort(); mounted.delete(root);
    }, get state() { return {open:opened,...feature.read?.()}; }};
    mounted.set(root,controller); reset(); return controller;
  }
  function mountPreview(root) { return mount(root); }
  window.SLComponent = { mount, mountPreview };
})();
