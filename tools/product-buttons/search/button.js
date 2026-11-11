// Name, word start, anywhere, then letters in order, so "cpy" still finds Copy link.
function match(name,query){
  const n=name.toLowerCase(),q=query.toLowerCase();
  const at=n.indexOf(q);
  if(at>=0)return{rank:at===0?0:n[at-1]===' '?1:2,at,hits:new Set(Array.from(q,(_,i)=>at+i))};
  const hits=new Set(),letters=q.replace(/\s/g,'');let from=0;
  for(const c of letters){const i=n.indexOf(c,from);if(i<0)return null;hits.add(i);from=i+1}
  return{rank:3,at:[...hits][0],hits};
}
const ROW=46,GAP=2,TOP=6,MAX=5,FULL=TOP+MAX*ROW+(MAX-1)*GAP;
const slot=i=>TOP+i*(ROW+GAP);
// mount(root, { items, suggest, search(query, { signal }), onPick(item), limit }) → { state, reset(), destroy() }
// items and suggest are strings or { name, tag }. Pass search instead of items for server results.
function mount(root,{items=[],suggest=[],search=null,onPick=()=>{},limit=MAX}={}){
  root.__pb?.destroy();
  pbPrepare(root);
  const $=s=>root.querySelector(s),input=$('input'),list=$('.ss-list'),knob=$('.ss-knob'),none=$('.ss-none'),clearBtn=$('.ss-clear'),countBox=$('.ss-count'),sheet=$('.ss-sheet'),shade=$('.ss-shade'),reveal=$('.ss-reveal'),say=$('[role=status]');
  const norm=item=>typeof item==='string'?{name:item,tag:''}:item;
  const uid=list.id;
  const rows=new Map();
  let shown=[],active=-1,request=null,timer=0,flyTimer=0,flyer=null,lastCount=0;
  const reach=h=>{sheet.style.translate=shade.style.translate=reveal.style.translate=`0 ${h-FULL}px`;list.style.translate=`0 ${FULL-h}px`};
  sheet.addEventListener('pointerdown',e=>e.preventDefault());
  const phase=next=>{if(next)root.dataset.phase=next;return root.dataset.phase};

  const make=item=>{
    const el=document.createElement('div'),name=document.createElement('span'),tag=document.createElement('span');
    el.className='ss-row';el.setAttribute('role','option');el.id=`${uid}-${rows.size}-${Math.random().toString(36).slice(2,6)}`;
    name.className='ss-name';name.append(...Array.from(item.name,c=>{const i=document.createElement('i');i.textContent=c;return i}));
    tag.className='ss-tag';tag.textContent=item.tag||'';el.append(name,tag);
    el.addEventListener('pointerdown',e=>e.preventDefault());
    el.addEventListener('pointermove',()=>{const i=shown.findIndex(s=>s.name===item.name);if(i>=0&&i!==active)setActive(i)});
    el.addEventListener('click',()=>pick(item));
    list.append(el);
    return{el,name,gone:0};
  };
  const leave=(r,key)=>{r.el.classList.add('out');clearTimeout(r.gone);r.gone=setTimeout(()=>{r.el.remove();rows.delete(key)},pbCalm()?0:170)};
  const moveKnob=(y,instant)=>{if(instant){knob.style.transition='none';knob.style.translate=`0 ${y}px`;void knob.offsetWidth;knob.style.transition=''}else knob.style.translate=`0 ${y}px`};
  const setActive=i=>{
    const was=active;active=i;
    if(i<0){knob.style.opacity=0;input.removeAttribute('aria-activedescendant');return}
    moveKnob(slot(i),was<0||knob.style.opacity==='0'||!knob.style.opacity);
    knob.style.opacity=1;
    rows.get(shown[i].name)&&input.setAttribute('aria-activedescendant',rows.get(shown[i].name).el.id);
  };
  const paint=(found,total,query)=>{
    const keep=new Set(found.map(f=>f.name));
    rows.forEach((r,k)=>{if(!keep.has(k))leave(r,k)});
    found.forEach((item,i)=>{
      let r=rows.get(item.name);const y=slot(i);
      if(!r){r=make(item);rows.set(item.name,r);r.el.style.transition='none';r.el.style.translate=`0 ${y+8}px`;r.el.style.opacity=0;void r.el.offsetWidth;r.el.style.transition=''}
      clearTimeout(r.gone);r.el.classList.remove('out');r.el.style.translate=`0 ${y}px`;r.el.style.opacity='';
      [...r.name.children].forEach((c,n)=>c.classList.toggle('on',!!item.hits?.has(n)));
    });
    shown=found;
    const empty=!!query&&!found.length;
    root.classList.toggle('ss-empty',empty);
    if(empty)none.textContent=`Nothing called “${query}”`;
    root.classList.toggle('ss-counted',!!query&&total>0);
    if(total!==lastCount&&query){pbRoll(countBox,total,total>lastCount?-1:1)}
    lastCount=query?total:0;
    const lines=empty?1:found.length;
    reach(lines?TOP+lines*ROW+(lines-1)*GAP:0);
    input.setAttribute('aria-expanded',found.length?'true':'false');
    say.textContent=query?(total?`${total} found`:`Nothing called ${query}`):'';
    setActive(query&&found.length?0:-1);
  };
  const local=query=>items.map(norm).map(item=>{const m=match(item.name,query);return m&&{...item,...m}}).filter(Boolean).sort((a,b)=>a.rank-b.rank||a.at-b.at||a.name.length-b.name.length);
  const update=()=>{
    const query=input.value.trim();
    root.classList.toggle('ss-q',!!query);root.classList.toggle('ss-has',!!input.value);
    request?.abort();clearTimeout(timer);root.classList.remove('ss-busy');
    if(!query)return paint(suggest.map(norm).slice(0,limit),0,'');
    if(!search){const found=local(query);return paint(found.slice(0,limit),found.length,query)}
    timer=setTimeout(async()=>{
      const mine=request=new AbortController();
      const busy=setTimeout(()=>root.classList.add('ss-busy'),160);
      try{const result=(await search(query,{signal:mine.signal})).map(norm).map(item=>({...item,...(match(item.name,query)||{})}));if(!mine.signal.aborted)paint(result.slice(0,limit),result.length,query)}catch{if(!mine.signal.aborted)paint([],0,query)}
      finally{clearTimeout(busy);if(request===mine)root.classList.remove('ss-busy')}
    },140);
  };
  const close=()=>{phase('idle');request?.abort();rows.forEach((r,k)=>leave(r,k));shown=[];reach(0);root.classList.remove('ss-empty');input.setAttribute('aria-expanded','false');setActive(-1)};
  const settle=()=>{clearTimeout(flyTimer);flyer?.remove();flyer=null;root.classList.remove('ss-fly');knob.style.scale=''};
  const open=()=>{settle();phase('open');update()};

  function pick(item){
    const r=rows.get(item.name);if(!r)return;
    settle();request?.abort();clearTimeout(timer);
    rows.delete(item.name);clearTimeout(r.gone);
    phase('picked');root.classList.add('ss-fly');root.classList.remove('ss-counted','ss-q','ss-empty','ss-busy');root.classList.add('ss-has');
    rows.forEach((row,k)=>leave(row,k));shown=[];
    input.blur();input.setAttribute('aria-expanded','false');input.removeAttribute('aria-activedescendant');say.textContent=`${item.name} selected`;
    flyer=r.el;flyer.classList.remove('out');flyer.style.opacity='';flyer.classList.add('flying');
    // The list sits right under the well, so the row only has to rise; its text already lines up with the field's.
    flyer.style.translate='0 -49px';
    knob.style.opacity=1;knob.style.scale='1 1.1304';knob.style.translate='0 -49px';
    reach(0);active=-1;lastCount=0;
    // One frame swaps the flying row for the field's own text, so the two are never drawn on top of each other.
    const row=flyer,land=()=>{
      if(flyer!==row)return;
      clearTimeout(flyTimer);
      input.value=item.name;root.classList.remove('ss-fly');
      knob.style.transition='none';knob.style.opacity=0;void knob.offsetWidth;knob.style.transition='';knob.style.scale='';
      flyer=null;row.remove();
      onPick(item);
    };
    row.addEventListener('transitionend',e=>{if(e.target===row&&e.propertyName==='translate')land()});
    flyTimer=setTimeout(land,pbCalm()?0:640);
  }
  const off=new AbortController(),on=(t,e,f)=>t.addEventListener(e,f,{signal:off.signal});
  on(input,'input',open);
  on(input,'focus',()=>{if(phase()==='idle')open()});
  on(root,'focusout',e=>{if(phase()==='open'&&!root.contains(e.relatedTarget))close()});
  on(input,'keydown',e=>{
    if(e.key==='ArrowDown'||e.key==='ArrowUp'){e.preventDefault();if(phase()!=='open')open();if(!shown.length)return;const step=e.key==='ArrowDown'?1:-1;setActive(active<0?(step>0?0:shown.length-1):(active+step+shown.length)%shown.length)}
    else if(e.key==='Enter'){e.preventDefault();if(phase()==='open'&&active>=0)pick(shown[active])}
    else if(e.key==='Escape'&&phase()==='open'){close();input.blur()}
  });
  on(clearBtn,'pointerdown',e=>e.preventDefault());
  on(clearBtn,'click',()=>{input.value='';input.focus({preventScroll:true});lastCount=0;open()});
  // Never wider than its container, with a little air on both sides.
  const host=root.parentElement,fit=()=>{if(host)root.style.width=Math.min(380,host.clientWidth-36)+'px'};
  fit();
  const resize=typeof ResizeObserver==='function'&&host?new ResizeObserver(fit):null;
  resize?.observe(host);
  const api={get state(){return{phase:phase(),query:input.value,results:shown.length}},reset(){settle();input.value='';root.classList.remove('ss-has','ss-q','ss-counted');close()},destroy(){settle();clearTimeout(timer);request?.abort();off.abort();resize?.disconnect();rows.forEach(r=>{clearTimeout(r.gone);r.el.remove()});rows.clear();delete root.__pb}};
  root.__pb=api;
  return api;
}
// The catalog preview searches the library's own component names.
const demo = {
  // Shows as many rows as the preview has room for, and lifts the field by half of what opens under it.
  prepare: root => {
    const rows = Math.max(1, Math.min(3, Math.floor(((root.parentElement?.clientHeight || 252) / .85 - 76) / 48)));
    demo.limit = rows;
    root.style.setProperty('--rise', -(6 + rows * 46 + (rows - 1) * 2) / 2 + 'px');
  },
  items: [['Subscribe','Button'],['Pay','Button'],['Copy link','Button'],['Delete','Button'],['Follow','Button'],['Cart','Button'],['Download','Button'],['Upload','Button'],['Promo','Button'],['Invite','Button'],['Email sign-in','Input'],['Card','Input'],['Toggle','Control'],['Tabs','Navigation'],['Slider','Control'],['Tooltip','Overlay'],['Dropdown','Overlay'],['Stepper','Control']].map(([name, tag]) => ({ name, tag })),
  suggest: [{ name: 'Subscribe', tag: 'Button' }, { name: 'Email sign-in', tag: 'Input' }, { name: 'Card', tag: 'Input' }],
  limit: 3,
};
