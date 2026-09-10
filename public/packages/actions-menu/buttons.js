(() => {
const mounted = new WeakMap();
function mountMenu(root, { onSelect } = {}) {
  if (mounted.has(root)) return mounted.get(root);
  if (onSelect !== undefined && typeof onSelect !== 'function') throw new TypeError('onSelect must be a function.');
  const lifecycle = new AbortController(), signal = lifecycle.signal;
  const trigger = root.querySelector('[data-trigger]'), panel = root.querySelector('.menu-panel');
  const items = [...root.querySelectorAll('[data-value]')], search = root.querySelector('input[type="search"]');
  const feedback = root.querySelector('[data-feedback]'), label = root.querySelector('[data-trigger-label]');
  const defaults = items.map(item => item.getAttribute('aria-checked'));
  const initialLabel = label?.textContent, initialFeedback = feedback.textContent;
  const doc = root.ownerDocument, view = doc.defaultView;
  const kind = root.dataset.menu;
  let opened = false, destroyed = false, typeBuffer = '', typeTimer;
  const visible = () => items.filter(item => !item.hidden && !item.disabled);
  function close(restore = false) {
    opened = false; root.dataset.open = 'false'; trigger.setAttribute('aria-expanded','false');
    panel.inert = true; panel.setAttribute('aria-hidden','true');
    if (restore) trigger.focus({preventScroll:true});
  }
  function open(focus = false, last = false) {
    if (destroyed || trigger.disabled) return;
    root.dataset.open = 'true'; opened = true; trigger.setAttribute('aria-expanded','true');
    panel.inert = false; panel.setAttribute('aria-hidden','false');
    if (focus) (search || (last ? visible().at(-1) : visible()[0]))?.focus({preventScroll:true});
  }
  function report(item) {
    const value = item.dataset.value;
    if (kind === 'sort') {
      items.forEach(option => option.setAttribute('aria-checked', String(option === item)));
      label.textContent = item.querySelector('span').textContent;
      feedback.textContent = 'Sorted by ' + label.textContent.toLowerCase() + '.';
    } else if (kind === 'labels') {
      item.setAttribute('aria-checked',String(item.getAttribute('aria-checked') !== 'true'));
      const selected = items.filter(option => option.getAttribute('aria-checked') === 'true');
      root.querySelector('[data-count]').textContent = String(selected.length);
      feedback.textContent = selected.length ? selected.map(option => option.querySelector('[data-label]').textContent).join(' · ') : 'No labels selected.';
    } else feedback.textContent = item.dataset.result;
    const values = kind === 'labels' ? items.filter(option => option.getAttribute('aria-checked') === 'true').map(option => option.dataset.value) : [value];
    onSelect?.(values);
    root.dispatchEvent(new view.CustomEvent('menuselect', {bubbles:true,detail:{value,values}}));
    if (kind !== 'labels') close(true);
  }
  trigger.addEventListener('click', event => opened ? close() : open(event.detail === 0 || !!search), {signal});
  trigger.addEventListener('keydown', event => {
    if (!['ArrowDown','ArrowUp'].includes(event.key)) return;
    event.preventDefault();open(true,event.key === 'ArrowUp');
  }, {signal});
  for (const item of items) item.addEventListener('click', () => report(item), {signal});
  root.querySelector('[data-done]')?.addEventListener('click',()=>close(true),{signal});
  root.addEventListener('keydown',event=>{
    if (!opened) return;
    if (event.target === trigger && event.key !== 'Escape') return;
    if (event.key === 'Escape') { event.preventDefault();event.stopPropagation();close(true);return; }
    const options=visible();
    if (event.target === search && !['ArrowDown','Enter'].includes(event.key)) return;
    if (event.target === search && event.key === 'Enter') { event.preventDefault();options[0]?.click();return; }
    if (['ArrowDown','ArrowUp','Home','End'].includes(event.key)) {
      event.preventDefault();const index=options.indexOf(event.target);
      const next=event.key==='Home'?0:event.key==='End'?options.length-1:(index+(event.key==='ArrowDown'?1:-1)+options.length)%options.length;
      options[next]?.focus();
    } else if (!search && event.key.length===1 && event.key!==' ' && !event.ctrlKey && !event.metaKey) {
      typeBuffer+=event.key.toLowerCase();clearTimeout(typeTimer);
      options.find(option=>option.textContent.trim().toLowerCase().startsWith(typeBuffer))?.focus();
      typeTimer=setTimeout(()=>{typeBuffer='';},600);
    }
  },{signal});
  search?.addEventListener('input',()=>{
    const query=search.value.trim().toLowerCase();
    items.forEach(item=>{item.hidden=!item.textContent.toLowerCase().includes(query);});
    root.querySelector('[data-empty]').hidden=visible().length>0;
  },{signal});
  doc.addEventListener('pointerdown',event=>{if(opened&&!event.composedPath().includes(root))close();},{signal});
  root.addEventListener('focusout',()=>queueMicrotask(()=>{if(opened&&!root.matches(':focus-within'))close();}),{signal});
  root.querySelector('[data-context]')?.addEventListener('contextmenu',event=>{
    event.preventDefault();const rect=root.getBoundingClientRect();
    root.style.setProperty('--menu-x',Math.max(0,Math.min(rect.width-232,event.clientX-rect.left))+'px');
    root.style.setProperty('--menu-y',Math.max(76,Math.min(112,event.clientY-rect.top))+'px');
    root.style.setProperty('--origin-x',Math.max(0,Math.min(232,event.clientX-rect.left-parseFloat(root.style.getPropertyValue('--menu-x'))))+'px');
    open(true);
  },{signal});
  function reset() {
    close(root.matches(':focus-within'));clearTimeout(typeTimer);typeBuffer='';
    items.forEach((item,index)=>{if(defaults[index]!==null)item.setAttribute('aria-checked',defaults[index]);item.hidden=false;});
    if(label)label.textContent=initialLabel;
    if(search){search.value='';root.querySelector('[data-empty]').hidden=true;}
    const count=root.querySelector('[data-count]');if(count)count.textContent=String(defaults.filter(value=>value==='true').length);
    feedback.textContent=initialFeedback;root.style.removeProperty('--menu-x');root.style.removeProperty('--menu-y');root.style.removeProperty('--origin-x');
  }
  close();
  const controller={open,close,reset,destroy(){destroyed=true;close();clearTimeout(typeTimer);lifecycle.abort();mounted.delete(root);}};
  mounted.set(root,controller);return controller;
}

window.MatteMenu = { mount: mountMenu };
})();
