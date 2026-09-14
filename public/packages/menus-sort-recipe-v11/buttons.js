(() => {
  'use strict';
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
    const initial = { field:'due', direction:1, priority:false };
    let state = structuredClone(initial), opened = false, destroyed = false;
    const active = () => root.getRootNode().activeElement;
    const controls = () => [...panel.querySelectorAll('button,input,select,textarea')].filter(n => !n.disabled && !n.closest('[hidden],[inert]'));
    const listen = (target, type, fn) => target.addEventListener(type, fn, { signal });
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
      const wasOpen = opened; opened = false;
      if (restoreFocus && wasOpen) trigger.focus({ preventScroll: true });
      root.dataset.open = 'false'; trigger.setAttribute('aria-expanded','false'); panel.inert = true; panel.setAttribute('aria-hidden','true');
      q('.sl-summary').inert = false; q('.sl-summary').removeAttribute('aria-hidden'); onClose(); paint();
    }
    const tasks=[{name:'Draft',due:14,priority:2},{name:'Review',due:14,priority:3},{name:'Publish',due:16,priority:1}];
    const sorted=()=>[...tasks].sort((a,b)=>(state.priority?b.priority-a.priority:0) || (state.field==='due'?a.due-b.due:a.name.localeCompare(b.name,'en'))*state.direction);
    function onOpen() {  }
    function onClose() {  }
    function render() { selected('field:due',state.field==='due'); selected('field:name',state.field==='name'); selected('priority',state.priority);
      q('[data-key="direction"] strong').textContent=state.direction===1?'Ascending':'Descending';
      text('[data-summary]',(state.priority?'Priority first · ':'')+(state.field==='due'?'Due date':'Task name')+' · '+(state.direction===1?'Ascending':'Descending'));
      q('[data-order]').replaceChildren(...sorted().map(task=>{const li=doc.createElement('li');li.textContent=task.name+' · Sep '+task.due+' · '+['','Low','Medium','High'][task.priority];return li;})); }
    function handle(key, button, event) { if(key.startsWith('field:'))state.field=key.slice(6); else if(key==='direction')state.direction*=-1; else if(key==='priority')state.priority=!state.priority; else return; paint(); emit('Local order: '+sorted().map(t=>t.name).join(', ')+'.'); }
    listen(trigger, 'click', () => opened ? close() : open());
    listen(trigger, 'keydown', event => { if (['ArrowDown','ArrowUp'].includes(event.key)) { event.preventDefault(); open(event.key === 'ArrowUp'); } });
    listen(root, 'click', event => {
      const button = event.target.closest('[data-key]');
      if (!button || !root.contains(button) || button.disabled || button.closest('[hidden],[inert]')) return;
      if (button.dataset.key === 'dismiss') { close(); return; }
      handle(button.dataset.key, button, event);
    });
    listen(root, 'input', event => {  });
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
      if (destroyed) return; reset(); destroyed = true; life.abort(); mounted.delete(root);
    } };
    mounted.set(root, controller); reset(); return controller;
  }
  function mountPreview(root) { return mount(root); }
  window.SLComponent = { mount, mountPreview };
})();
