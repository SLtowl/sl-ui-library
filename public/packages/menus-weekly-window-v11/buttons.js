(() => {
  'use strict';
  // Each export owns this small picker shell: no portals or document-wide dialog.
  function createPicker(root, title, on, disabled) {
    const doc = root.ownerDocument;
    const panel = doc.createElement('div'), header = doc.createElement('div'), heading = doc.createElement('strong'), dismiss = doc.createElement('button');
    panel.className = 'sl-picker-panel'; panel.tabIndex = -1; panel.id = 'picker-' + doc.defaultView.crypto.randomUUID();
    panel.setAttribute('role', 'dialog'); panel.setAttribute('aria-label', title); panel.setAttribute('aria-hidden', 'true'); panel.inert = true;
    header.className = 'sl-picker-header'; heading.textContent = title;
    dismiss.type = 'button'; dismiss.textContent = '×'; dismiss.setAttribute('aria-label', 'Close picker');
    header.append(heading, dismiss);
    const body = doc.createElement('div'), footer = doc.createElement('div');
    body.className = 'sl-picker-body'; footer.className = 'sl-picker-footer'; panel.append(header, body, footer); root.append(panel);
    let opened = false, trigger = null, siblings = [];
    const triggers = new Set();
    function close(focus = true) {
      if (!opened) return;
      opened = false; panel.dataset.open = 'false'; panel.inert = true; panel.setAttribute('aria-hidden', 'true');
      siblings.forEach(([node, inert]) => { node.inert = inert; }); siblings = [];
      trigger?.setAttribute('aria-expanded', 'false');
      if (focus && trigger?.isConnected && !trigger.disabled) trigger.focus();
    }
    function bind(button) { triggers.add(button); button.setAttribute('aria-haspopup', 'dialog'); button.setAttribute('aria-expanded', 'false'); button.setAttribute('aria-controls', panel.id); }
    function open(button, focusNode) {
      if (disabled || button.disabled) return;
      close(false); trigger = button; bind(button); opened = true;
      panel.dataset.open = 'true'; panel.inert = false; panel.setAttribute('aria-hidden', 'false'); button.setAttribute('aria-expanded', 'true');
      (focusNode || dismiss).focus({ preventScroll: true });
      siblings = [...root.children].filter(node => node !== panel).map(node => [node, node.inert]);
      siblings.forEach(([node]) => { node.inert = true; });
    }
    on(dismiss, 'click', () => close());
    on(panel, 'keydown', event => {
      if (event.key === 'Escape') { event.preventDefault(); event.stopPropagation(); close(); }
      if (event.key !== 'Tab') return;
      const all = [...panel.querySelectorAll('button, input, [tabindex]')].filter(node => !node.disabled && node.tabIndex >= 0 && node.checkVisibility());
      const first = all[0], last = all[all.length - 1], active = root.getRootNode().activeElement;
      if (event.shiftKey && active === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && active === last) { event.preventDefault(); first?.focus(); }
    });
    on(doc, 'pointerdown', event => { if (opened && !event.composedPath().includes(root)) close(false); });
    return { body, footer, panel, heading, bind, open, close, get isOpen() { return opened; },
      destroy() { close(); triggers.forEach(button => { button.removeAttribute('aria-controls'); button.setAttribute('aria-expanded', 'false'); }); panel.remove(); } };
  }
  function bindTimePicker(root, input, container, on) {
    const doc = root.ownerDocument, view = doc.defaultView, trigger = root.querySelector('.sl-time-open');
    const picker = createPicker(container, 'Choose time', on, false); picker.bind(trigger);
    const initial = input.value, valid = value => /^([01]\d|2[0-3]):[0-5]\d$/.test(value);
    let draft = initial;
    const columns = doc.createElement('div'); columns.className = 'sl-time-columns';
    const lists = ['Hours', 'Minutes'].map((name, index) => {
      const column = doc.createElement('div'), label = doc.createElement('span'), list = doc.createElement('div');
      label.textContent = name; list.className = 'sl-time-list'; list.setAttribute('role', 'listbox'); list.setAttribute('aria-label', name);
      for (let i = 0; i < (index ? 60 : 24); i++) { const button = doc.createElement('button'); button.type = 'button'; button.setAttribute('role', 'option'); button.dataset.part = String(index); button.dataset.number = String(i).padStart(2, '0'); button.textContent = button.dataset.number; list.append(button); }
      column.append(label, list); columns.append(column); return list;
    });
    picker.body.append(columns);
    const summary = doc.createElement('span'), apply = doc.createElement('button');
    summary.className = 'sl-time-draft'; summary.setAttribute('aria-live', 'polite'); apply.type = 'button'; apply.className = 'sl-time-confirm'; apply.textContent = 'Use time'; picker.footer.append(summary, apply);
    function sync(focusPart) {
      const parts = draft.split(':'); summary.textContent = draft;
      lists.forEach((list, index) => {
        [...list.children].forEach(button => { const chosen = button.dataset.number === parts[index]; button.setAttribute('aria-selected', String(chosen)); button.tabIndex = chosen ? 0 : -1; });
        const selected = list.querySelector('[aria-selected="true"]');
        if (focusPart === index) selected?.focus({ preventScroll: true });
        if (selected) list.scrollTop = selected.offsetTop - list.clientHeight / 2 + selected.clientHeight / 2;
      });
    }
    function open() { if (input.disabled || input.readOnly) return; draft = valid(input.value) ? input.value : initial; sync(); picker.open(trigger, lists[0].querySelector('[aria-selected="true"]')); sync(); }
    on(trigger, 'click', event => { event.preventDefault(); open(); });
    on(trigger, 'keydown', event => { if (['ArrowDown', 'ArrowUp'].includes(event.key)) { event.preventDefault(); event.stopPropagation(); open(); } });
    on(input, 'keydown', event => { if (event.altKey && event.key === 'ArrowDown') { event.preventDefault(); event.stopPropagation(); open(); } });
    lists.forEach((list, index) => {
      function select(button) { if (!button || button.disabled || input.disabled) return; const parts = draft.split(':'); parts[index] = button.dataset.number; draft = parts.join(':'); sync(index); }
      on(list, 'click', event => select(event.target.closest('[data-number]')));
      on(list, 'keydown', event => {
        if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return;
        event.preventDefault(); event.stopPropagation(); const current = [...list.children].indexOf(event.target);
        const next = event.key === 'Home' ? 0 : event.key === 'End' ? list.children.length - 1 : Math.max(0, Math.min(list.children.length - 1, current + (event.key === 'ArrowDown' ? 1 : -1)));
        select(list.children[next]);
      });
    });
    on(apply, 'click', event => { event.preventDefault(); if (input.disabled || input.readOnly) return; const changed = input.value !== draft; input.value = draft; if (changed) input.dispatchEvent(new view.Event('input', { bubbles: true, composed: true })); picker.close(); });
    return { close: () => picker.close(false), destroy: () => picker.destroy() };
  }
  const mounted = new WeakMap();
  function mount(root, options = {}) {
    if (!root || !root.matches('.sl-component')) throw new TypeError('A .sl-component root is required.');
    if (mounted.has(root)) return mounted.get(root);
    if (options.onChange !== undefined && typeof options.onChange !== 'function') throw new TypeError('onChange must be a function.');
    const doc = root.ownerDocument, view = doc.defaultView;
    const life = new view.AbortController(), signal = life.signal;
    const q = selector => root.querySelector(selector), all = selector => [...root.querySelectorAll(selector)];
    const trigger = q('[data-trigger]'), panel = q('[data-panel]'), feedback = q('[data-feedback]');
    const initialFeedback = feedback.textContent, initialLabel = q('[data-label]').textContent;
    const initial = { days:[0,1,2,3,4], time:'09:00', draftDays:[0,1,2,3,4], draftTime:'09:00' };
    let state = structuredClone(initial), opened = false, destroyed = false;
    const active = () => root.getRootNode().activeElement;
    const controls = () => [...panel.querySelectorAll('button,input,select,textarea')].filter(n => !n.disabled && !n.closest('[hidden],[inert]'));
    const listen = (target, type, fn) => target.addEventListener(type, fn, { signal });
    const timeUI = bindTimePicker(root, q('[data-time]'), panel, listen);
    function text(selector, value) { q(selector).textContent = value; }
    function selected(key, value) { const n = all('[data-key]').find(n => n.dataset.key === key); if(n) n.setAttribute('aria-pressed', String(value)); }
    function option(key, label, detail, pressed) {
      const node = doc.createElement('button'); node.type = 'button'; node.className = 'sl-option'; node.dataset.key = key;
      const copy = doc.createElement('span'), title = doc.createElement('strong'); title.textContent = label; copy.append(title);
      if (detail) { const small = doc.createElement('small'); small.textContent = detail; copy.append(small); }
      const mark = doc.createElement('span'); mark.className = 'sl-mark'; mark.setAttribute('aria-hidden','true'); mark.textContent = '✓';
      node.append(copy, mark); if (pressed !== undefined) node.setAttribute('aria-pressed',String(pressed)); return node;
    }
    function report(message) { feedback.textContent = message; }
    function emit(message) {
      report(message);
      root.dispatchEvent(new view.CustomEvent('sl-menu-change', { bubbles: true, composed: true, detail: structuredClone(state) }));
      options.onChange?.(structuredClone(state));
    }
    function paint() {
      const previous = active(), key = previous?.dataset?.key;
      render();
      if (opened && previous && key && (!previous.isConnected || previous.disabled || previous.closest('[hidden]'))) {
        (all('[data-key]').find(n => n.dataset.key === key && !n.disabled && !n.closest('[hidden],[inert]')) || controls()[0])?.focus();
      }
    }
    function open(last = false) {
      if (destroyed || trigger.disabled || opened) return;
      opened = true; onOpen(); root.dataset.open = 'true'; trigger.setAttribute('aria-expanded','true');
      panel.inert = false; panel.setAttribute('aria-hidden','false'); q('.sl-summary').inert = true;
      q('.sl-summary').setAttribute('aria-hidden','true'); paint();
      (last ? controls().at(-1) : controls()[0])?.focus({ preventScroll: true });
    }
    function close(restoreFocus = true) {
      if (destroyed) return;
      timeUI.close();
      const wasOpen = opened; opened = false;
      if (restoreFocus && wasOpen) trigger.focus({ preventScroll: true });
      root.dataset.open = 'false'; trigger.setAttribute('aria-expanded','false'); panel.inert = true; panel.setAttribute('aria-hidden','true');
      q('.sl-summary').inert = false; q('.sl-summary').removeAttribute('aria-hidden'); onClose(); paint();
    }
    const names=['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
    const describe=(days,time)=> (days.join(',')==='0,1,2,3,4'?'Mon–Fri':days.join(',')==='5,6'?'Sat–Sun':days.map(i=>names[i]).join(', '))+' · '+time;
    const validTime=value=>/^([01]\d|2[0-3]):[0-5]\d$/.test(value);
    function onOpen() { state.draftDays=[...state.days]; state.draftTime=state.time; }
    function onClose() { state.draftDays=[...state.days]; state.draftTime=state.time; }
    function render() { names.forEach((_,i)=>selected('day:'+i,state.draftDays.includes(i)));
      q('[data-time]').value=state.draftTime; q('[data-key="apply"]').disabled=!state.draftDays.length || !validTime(state.draftTime);
      text('[data-draft]',!state.draftDays.length?'Choose at least one day.':!validTime(state.draftTime)?'Enter a valid time.':state.draftDays.length+' days · '+state.draftTime);
      text('[data-summary]',describe(state.days,state.time)); }
    function handle(key, button, event) { if(key==='weekdays')state.draftDays=[0,1,2,3,4];
      else if(key==='weekend')state.draftDays=[5,6];
      else if(key.startsWith('day:')){const day=Number(key.slice(4));state.draftDays=state.draftDays.includes(day)?state.draftDays.filter(d=>d!==day):[...state.draftDays,day].sort((a,b)=>a-b);}
      else if(key==='apply'){if(!state.draftDays.length||!validTime(state.draftTime))return;state.days=[...state.draftDays];state.time=state.draftTime;close();emit('Weekly preference applied locally.');return;}
      paint(); }
    listen(trigger, 'click', () => opened ? close() : open());
    listen(trigger, 'keydown', event => { if (['ArrowDown','ArrowUp'].includes(event.key)) { event.preventDefault(); open(event.key === 'ArrowUp'); } });
    listen(root, 'click', event => {
      const button = event.target.closest('[data-key]');
      if (!button || !root.contains(button) || button.disabled || button.closest('[hidden],[inert]')) return;
      if (button.dataset.key === 'dismiss') { close(); return; }
      handle(button.dataset.key, button, event);
    });
    listen(root, 'input', event => { if(event.target.matches('[data-time]')) { state.draftTime=event.target.value; paint(); } });
    listen(root, 'change', event => {  });
    listen(root, 'keydown', event => {
      if (!opened) return;
      if (event.key === 'Escape') { event.preventDefault(); event.stopPropagation(); close(); return; }

      if (event.target === trigger) return;
      const editing = ['INPUT','TEXTAREA','SELECT'].includes(event.target.tagName);
      if (editing && !(event.target.matches('[data-search]') && ['ArrowDown','ArrowUp'].includes(event.key))) return;
      const nodes = controls().filter(n => n.tagName === 'BUTTON'), index = nodes.indexOf(active());
      if (!nodes.length) return;
      if (['ArrowDown','ArrowUp','Home','End'].includes(event.key)) {
        event.preventDefault();
        const next = event.key === 'Home' ? 0 : event.key === 'End' ? nodes.length - 1 : index < 0 ? (event.key === 'ArrowUp' ? nodes.length-1 : 0) : (index + (event.key === 'ArrowDown' ? 1 : -1) + nodes.length) % nodes.length;
        nodes[next].focus();
      } else if (event.key.length === 1 && event.key !== ' ' && !event.ctrlKey && !event.metaKey && !event.altKey) {
        const next = [...nodes.slice(index+1),...nodes.slice(0,index+1)].find(n => n.textContent.trim().toLocaleLowerCase().startsWith(event.key.toLocaleLowerCase()));
        if(next) { event.preventDefault(); next.focus(); }
      }
    });
    listen(doc, 'pointerdown', event => { if(opened && !event.composedPath().includes(root)) close(false); });
    listen(root, 'focusout', event => {
      if (event.relatedTarget && root.contains(event.relatedTarget)) return;
      queueMicrotask(() => { if (!destroyed && opened && !root.contains(active())) close(false); });
    });
    function reset() {
      if (destroyed) return;
      const focusInside = root.contains(active()); state = structuredClone(initial);

      all('input[type="search"]').forEach(n => n.value = '');
      text('[data-label]', initialLabel); report(initialFeedback); close(focusInside);
      panel.scrollTop = 0;
      all('.sl-scroll,.sl-summary,textarea').forEach(node => { node.scrollTop = 0; node.scrollLeft = 0; });
    }
    const controller = { open, close, reset, get state() { return structuredClone({ ...state, open: opened }); }, destroy() {
      if (destroyed) return; reset(); timeUI.destroy(); destroyed = true; life.abort(); mounted.delete(root);
    } };
    mounted.set(root, controller); reset(); return controller;
  }
  function mountPreview(root) { return mount(root); }
  window.SLComponent = { mount, mountPreview };
})();
