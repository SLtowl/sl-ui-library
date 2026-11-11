const BADGE=34;
// Splits an address into what can go, the domain and the rest. Returns null when it is not a link.
function parse(raw){
  const text=raw.trim(),start=text.match(/^(https?:\/\/)?(www\.)?/i),prefix=start[0],rest=text.slice(prefix.length),host=(rest.match(/^[^/?#]+/)||[''])[0];
  // A domain with a dot, localhost, an IP address, or any name after an explicit http:// or https://.
  const known=/^[\p{L}\p{N}-]+(\.[\p{L}\p{N}-]+)*\.\p{L}{2,}(:\d+)?$/u.test(host)||/^(localhost|\d{1,3}(\.\d{1,3}){3})(:\d+)?$/i.test(host)||(!!start[1]&&/^[\p{L}\p{N}.-]+(:\d+)?$/u.test(host));
  if(/\s/.test(text)||!known)return null;
  return{prefix,host,tail:rest.slice(host.length),url:(start[1]?'':'https://')+text};
}
// mount(root, { onChange({ url, host, valid }), icon(url) }) → { state, reset(), destroy() }
// icon may return an image address for the site's badge; without it the badge shows the first letter.
function mount(root,{onChange=()=>{},icon=null}={}){
  root.__pb?.destroy();
  pbPrepare(root);
  const $=s=>root.querySelector(s),input=$('input'),row=$('.lk-row'),line=$('.lk-line'),run=$('.lk-run'),pre=$('.lk-pre'),hostEl=$('.lk-host'),tail=$('.lk-tail'),badge=$('.lk-badge'),clearBtn=$('.lk-clear'),plate=$('.lk-plate'),say=$('[role=status]');
  let timer=0,current=null,start=0;
  const state=next=>{if(next)root.dataset.state=next;return root.dataset.state};
  const report=()=>{const link=parse(input.value);onChange({url:link?link.url:'',host:link?link.host:'',valid:!!link})};
  const has=()=>root.classList.toggle('lk-has',!!input.value);
  const settle=link=>{
    clearTimeout(timer);root.classList.remove('lk-bad');current=link;
    pre.textContent=link.prefix;hostEl.textContent=link.host;tail.textContent=link.tail;
    badge.textContent=link.host[0];
    if(icon){const src=icon(link.url);if(src){const img=new Image();img.alt='';img.width=img.height=24;img.src=src;img.onload=()=>badge.replaceChildren(img)}}
    // Starts exactly where the field's text is, even when a long address is scrolled.
    start=-input.scrollLeft;
    root.classList.add('lk-still');line.style.translate=`${start}px 0`;run.style.translate='0 0';state('back');void line.offsetWidth;root.classList.remove('lk-still');
    state('done');line.style.translate='0 0';run.style.translate=`${BADGE-pre.offsetWidth}px 0`;
    row.setAttribute('aria-label',`Edit link, ${link.host}`);say.textContent=`Link to ${link.host}`;has();report();
  };
  const edit=()=>{
    clearTimeout(timer);state('back');
    // The caret goes to the end first, so the parts return to exactly where the field's text will be.
    input.focus({preventScroll:true});const end=input.value.length;input.setSelectionRange(end,end);input.scrollLeft=input.scrollWidth;start=-input.scrollLeft;
    line.style.translate=`${start}px 0`;run.style.translate='0 0';
    timer=setTimeout(()=>state('edit'),pbCalm()?0:480);
  };
  const tryLink=()=>{const link=parse(input.value);if(!link)return false;settle(link);return true};
  const reject=()=>{root.classList.add('lk-bad');say.textContent='That does not look like a link';pbShake(plate)};
  const off=new AbortController(),on=(t,e,f)=>t.addEventListener(e,f,{signal:off.signal});
  on(input,'focus',()=>root.classList.add('lk-focus'));
  on(input,'blur',()=>{root.classList.remove('lk-focus');if(state()==='edit'&&input.value)tryLink()});
  on(input,'input',()=>{if(state()==='back'){clearTimeout(timer);state('edit')}root.classList.remove('lk-bad');has();report()});
  on(input,'paste',()=>setTimeout(()=>{if(tryLink())input.blur();else if(input.value.trim())reject()},0));
  on(input,'keydown',e=>{if(e.key!=='Enter')return;e.preventDefault();if(!input.value)return;if(tryLink())input.blur();else reject()});
  on(row,'click',edit);
  on(clearBtn,'pointerdown',e=>e.preventDefault());
  on(clearBtn,'click',()=>{clearTimeout(timer);input.value='';current=null;root.classList.remove('lk-bad');state('edit');has();report();input.focus({preventScroll:true})});
  // Never wider than its container, with a little air on both sides.
  const host=root.parentElement,fit=()=>{if(host)root.style.width=Math.min(380,host.clientWidth-36)+'px'};
  fit();
  const resize=typeof ResizeObserver==='function'&&host?new ResizeObserver(fit):null;
  resize?.observe(host);
  const api={get state(){return{state:state(),url:current?current.url:'',host:current?current.host:''}},reset(){clearTimeout(timer);input.value='';current=null;state('edit');has()},destroy(){clearTimeout(timer);off.abort();resize?.disconnect();delete root.__pb}};
  root.__pb=api;
  return api;
}// The catalog preview shows what to paste to try it.
const demo = {
  prepare: root => {
    const hint = document.createElement('p');
    hint.className = 'lk-hint';
    hint.innerHTML = '<span><i>Works: </i><b>https://www.studio.co/work?ref=mail</b></span><span><i>Refused: </i><b>hello</b></span>';
    root.insertBefore(hint, root.querySelector('[role=status]'));
  },
};
