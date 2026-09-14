/* Standalone display components. Sample data is local; no requests or telemetry. */
(() => {
const mounted=new WeakMap(),motion={"duration":{"short-2":100,"short-4":200,"medium-1":250,"medium-2":300,"medium-3":350,"medium-4":400},"easing":"cubic-bezier(0.2,0,0,1)"};
const metrics={week:{value:1248,trend:'+12.4%',days:7,points:[49,39,44,23,28,15,8]},month:{value:5862,trend:'+18.2%',days:30,points:[53,42,37,41,22,27,7]},quarter:{value:17430,trend:'+9.6%',days:90,points:[50,53,38,30,35,18,9]}};
const weeks={current:[42,65,54,82,70],previous:[35,52,60,68,58]},weekdays=['Monday','Tuesday','Wednesday','Thursday','Friday'];
const storage=[{label:'Assets',value:42},{label:'Documents',value:18},{label:'Exports',value:12},{label:'Free',value:28}];
const files=[{name:'Project brief.pdf',type:'PDF document',extension:'PDF',size:'240 KB',updated:'Sep 12, 2026',version:'1.3'},{name:'Brand assets.svg',type:'Vector graphics',extension:'SVG',size:'86 KB',updated:'Sep 11, 2026',version:'2.0'},{name:'Design tokens.json',type:'Design tokens',extension:'JSON',size:'32 KB',updated:'Sep 10, 2026',version:'1.1'}];
const events={'2026-09-14':'Design review','2026-09-18':'Release checklist','2026-09-24':'Component audit','2026-10-02':'Sprint planning'};
const months=['January','February','March','April','May','June','July','August','September','October','November','December'];
const iso=(y,m,d)=>`${y}-${String(m+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
const daysIn=(y,m)=>new Date(Date.UTC(y,m+1,0)).getUTCDate();
function parseDate(value){
 if(typeof value!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(value))throw new TypeError('Use an ISO calendar date: YYYY-MM-DD.');
 const [y,month,d]=value.split('-').map(Number),m=month-1;
 if(y<1900||y>2100||m<0||m>11||d<1||d>daysIn(y,m))throw new RangeError('Date must be valid and between 1900 and 2100.');
 return {y,m,d};
}
function mountDataDisplay(root,{onChange}={}){
 if(mounted.has(root))return mounted.get(root);
 if(!root?.matches('.dd-demo'))throw new TypeError('Data display needs its .dd-demo root.');
 if(onChange!==undefined&&typeof onChange!=='function')throw new TypeError('onChange must be a function.');
 const kind=root.dataset.display;
 if(!['metric','table','avatars','status','details','timeline','file','bar','donut','calendar'].includes(kind))throw new TypeError('Unknown display kind.');
 const doc=root.ownerDocument,view=doc.defaultView,lifecycle=new view.AbortController(),reduced=view.matchMedia('(prefers-reduced-motion: reduce)');
 const q=s=>root.querySelector(s),all=s=>[...root.querySelectorAll(s)],baseline=[...root.childNodes].map(n=>n.cloneNode(true));
 const animations=new Set(),nodeAnimations=new WeakMap();let destroyed=false,raf=0,displayed=1248,points=[...metrics.week.points];
 const defaults=()=>({period:kind==='metric'?'week':'current',sort:'name',direction:'ascending',selected:kind==='avatars'?'AL':kind==='bar'?3:kind==='status'?'all':null,expanded:false,fileIndex:0,year:2026,month:8,date:'2026-09-14',focusDate:'2026-09-14'});
 let state=defaults();
 const text=(selector,value)=>{const n=q(selector);if(n)n.textContent=String(value)};
 const announce=value=>text('[data-live]',value);
 const snapshot=()=>Object.freeze({...state});
 const emit=action=>{const detail=Object.freeze({kind,action,...snapshot()});root.dispatchEvent(new view.CustomEvent('displaychange',{bubbles:true,composed:true,detail}));onChange?.(detail)};
 function pressed(selector,predicate){for(const b of all(selector))b.setAttribute('aria-pressed',String(predicate(b)))}
 function fade(node){
  if(!node||reduced.matches||!node.animate)return;
  nodeAnimations.get(node)?.cancel();const animation=node.animate([{opacity:.6},{opacity:1}],{duration:motion.duration['medium-1'],easing:motion.easing});
  animations.add(animation);nodeAnimations.set(node,animation);animation.finished.then(()=>animations.delete(animation),()=>animations.delete(animation));
 }
 function stopMotion(){view.cancelAnimationFrame(raf);raf=0;for(const a of animations)a.cancel();animations.clear()}
 function metricPaint(value,plot){
  displayed=value;points=plot;text('.dd-metric [data-value]',Math.round(value).toLocaleString('en-US'));
  q('[data-spark]').setAttribute('points',plot.map((y,i)=>`${i*260/6},${y}`).join(' '));
 }
 function renderMetric(animate){
  const m=metrics[state.period];pressed('[data-action="period"]',b=>b.dataset.value===state.period);
  text('[data-trend]',m.trend);text('[data-comparison]',`Compared with the previous ${m.days} days`);text('[data-start]',`${m.days} days ago`);text('[data-number]',`${m.value.toLocaleString('en-US')} project views`);
  q('.dd-spark').setAttribute('aria-label',`Project views trend for ${m.days} days. Total ${m.value.toLocaleString('en-US')}.`);
  view.cancelAnimationFrame(raf);raf=0;
  if(!animate||reduced.matches){metricPaint(m.value,[...m.points]);return;}
  const from=displayed,fromPoints=[...points],start=view.performance.now();
  const tick=now=>{if(destroyed)return;const t=Math.min(1,(now-start)/motion.duration['medium-4']),e=1-(1-t)**3;metricPaint(from+(m.value-from)*e,fromPoints.map((p,i)=>p+(m.points[i]-p)*e));if(t<1)raf=view.requestAnimationFrame(tick);else raf=0;};
  raf=view.requestAnimationFrame(tick);
 }
 function setPeriod(value){
  if(destroyed)return false;
  const valid=kind==='metric'?metrics:kind==='bar'?weeks:null;
  if(!valid||!Object.hasOwn(valid,value))throw new TypeError('Unknown display period.');
  if(state.period===value)return false;state.period=value;
  if(kind==='metric'){renderMetric(true);announce(`${metrics[value].value.toLocaleString('en-US')} project views in ${metrics[value].days} days.`)}
  else{renderBars();announce(`${value==='current'?'This':'Last'} week. ${weekdays[state.selected]}: ${weeks[value][state.selected]} completed tasks.`)}
  emit('period');return true;
 }
 function sort(column){
  if(destroyed)return false;if(kind!=='table'||!['name','size'].includes(column))throw new TypeError('Sort by name or size.');
  state.direction=state.sort===column&&state.direction==='ascending'?'descending':'ascending';state.sort=column;
  const rows=all('tbody tr');rows.sort((a,b)=>{const difference=column==='size'?Number(a.dataset.size)-Number(b.dataset.size):a.dataset.name.localeCompare(b.dataset.name,'en');return state.direction==='ascending'?difference:-difference});
  q('tbody').append(...rows);for(const b of all('[data-action="sort"]'))b.closest('th').setAttribute('aria-sort',b.dataset.value===column?state.direction:'none');
  fade(q('tbody'));announce(`Sorted by ${column}, ${state.direction}.`);emit('sort');return true;
 }
 function filter(value){
  if(destroyed)return false;if(kind!=='status'||!['all','active','paused'].includes(value))throw new TypeError('Unknown status filter.');
  state.selected=value;pressed('[data-action="filter"]',b=>b.dataset.value===value);let count=0;
  for(const row of all('[data-status]')){const shown=value==='all'||row.dataset.status===value;row.dataset.visible=String(shown);row.setAttribute('aria-hidden',String(!shown));row.inert=!shown;if(shown)count++;}
  text('[data-count]',`${count} project${count===1?'':'s'}`);announce(`${count} ${value==='all'?'':value+' '}project${count===1?'':'s'} shown.`);emit('filter');return true;
 }
 function toggle(value=!state.expanded){
  if(destroyed)return false;const extra=q('[data-extra]');if(!extra)return false;if(typeof value!=='boolean')throw new TypeError('Expanded state must be boolean.');
  const focused=root.getRootNode().activeElement||doc.activeElement;
  if(!value&&extra.contains(focused))q('[data-action="toggle"]').focus({preventScroll:true});
  state.expanded=value;root.dataset.expanded=String(value);extra.dataset.expanded=String(value);extra.setAttribute('aria-hidden',String(!value));extra.inert=!value;
  for(const b of all('[data-action="toggle"]')){
   b.setAttribute('aria-expanded',String(value));
   if(kind==='avatars'){b.textContent=value?'−':'+1';b.setAttribute('aria-label',value?'Hide additional members':'Show all 4 members')}
   else{const words=kind==='details'?(value?'Fewer details':'More details'):kind==='timeline'?(value?'Hide earlier':'Earlier activity'):'Details';b.firstChild.textContent=words;}
  }
  announce(value?'Additional details shown.':'Additional details hidden.');emit('toggle');return true;
 }
 function renderFile(){
  const file=files[state.fileIndex];text('[data-file-count]',`${state.fileIndex+1} / ${files.length}`);text('[data-file-name]',file.name);text('[data-file-summary]',`${file.type} · ${file.size}`);text('[data-extension]',file.extension);text('[data-file-updated]',file.updated);text('[data-file-version]',file.version);
 }
 function renderBars(){
  pressed('[data-action="period"]',b=>b.dataset.value===state.period);
  for(const b of all('[data-action="bar"]')){const index=Number(b.dataset.value),value=weeks[state.period][index];b.querySelector('[data-bar-fill]').style.transform=`scaleY(${value/100})`;b.setAttribute('aria-label',`${weekdays[index]}: ${value} completed tasks`);b.setAttribute('aria-pressed',String(state.selected===index));}
  text('[data-bar-summary]',`${weekdays[state.selected]} · ${weeks[state.period][state.selected]} completed tasks`);
 }
 function renderDonut(){
  const selected=state.selected===null?null:storage[state.selected];text('[data-storage-number]',selected?selected.value:72);text('[data-storage-label]',selected?`GB ${selected.label.toLowerCase()}`:'GB used');
  pressed('[data-action="segment"]',b=>Number(b.dataset.value)===state.selected);
  for(const arc of all('[data-arc]'))arc.style.opacity=state.selected===null||Number(arc.dataset.arc)===state.selected?'1':'.25';
  q('.dd-donut-track').style.opacity=state.selected===null||state.selected===3?'1':'.4';
 }
 function renderCalendar(focus=false){
  const {year,month}=state,label=`${months[month]} ${year}`;text('[data-month]',label);
  q('[data-action="prev-month"]').disabled=year===1900&&month===0;q('[data-action="next-month"]').disabled=year===2100&&month===11;
  const calendar=q('.dd-calendar-grid');calendar.setAttribute('aria-label',label);for(const row of [...calendar.querySelectorAll('.dd-week')])row.remove();
  const offset=(new Date(Date.UTC(year,month,1)).getUTCDay()+6)%7,days=daysIn(year,month);
  for(let week=0;week<6;week++){
   const row=doc.createElement('div');row.className='dd-week';row.setAttribute('role','row');
   for(let cell=0;cell<7;cell++){
    const day=week*7+cell-offset+1,slot=doc.createElement('span');slot.setAttribute('role','gridcell');
    if(day>0&&day<=days){
     const date=iso(year,month,day),b=doc.createElement('button');b.type='button';b.className='dd-day'+(events[date]?' has-event':'');b.dataset.action='date';b.dataset.date=date;b.textContent=String(day);b.tabIndex=date===state.focusDate?0:-1;b.setAttribute('aria-label',`${months[month]} ${day}, ${year}${events[date]?', '+events[date]:''}`);slot.setAttribute('aria-selected',String(date===state.date));slot.append(b);
    }else slot.className='dd-blank';row.append(slot);
   }calendar.append(row);
  }
  const selected=parseDate(state.date);text('[data-selected-date]',`${months[selected.m].slice(0,3)} ${selected.d}`);text('[data-event]',events[state.date]||'No events scheduled');
  if(focus)all('[data-action="date"]').find(b=>b.dataset.date===state.focusDate)?.focus({preventScroll:true});
 }
 function showMonth(year,month){
  if(destroyed)return false;if(kind!=='calendar'||!Number.isInteger(year)||!Number.isInteger(month)||year<1900||year>2100||month<1||month>12)throw new RangeError('Use year 1900–2100 and month 1–12.');
  state.year=year;state.month=month-1;const selected=parseDate(state.date);state.focusDate=iso(year,month-1,selected.y===year&&selected.m===month-1?selected.d:1);
  renderCalendar();fade(q('[data-calendar]'));announce(`${months[month-1]} ${year}`);emit('month');return true;
 }
 function select(value){
  if(destroyed)return false;
  if(kind==='metric')return setPeriod(value);if(kind==='status')return filter(value);
  if(kind==='table'){
   const row=all('[data-row]').find(row=>row.dataset.row===value);if(!row)throw new TypeError('Unknown row.');state.selected=value;pressed('[data-action="row"]',b=>b.dataset.value===value);text('[data-selection]',`${row.dataset.name} · ${row.dataset.type} · ${row.dataset.size} KB`);announce(q('[data-selection]').textContent);
  }else if(kind==='avatars'){
   const person=all('[data-action="member"]').find(b=>b.dataset.value===value);if(!person)throw new TypeError('Unknown member.');state.selected=value;pressed('[data-action="member"]',b=>b.dataset.value===value);text('[data-member-name]',person.dataset.name);text('[data-member-role]',person.dataset.role);announce(`${person.dataset.name}, ${person.dataset.role}.`);fade(q('.dd-person'));
  }else if(kind==='file'){
   if(!Number.isInteger(value)||value<0||value>=files.length)throw new RangeError('Unknown file.');state.fileIndex=value;renderFile();fade(q('.dd-file-visual'));announce(`${files[value].name}, ${files[value].size}.`);
  }else if(kind==='bar'){
   if(!Number.isInteger(value)||value<0||value>=5)throw new RangeError('Unknown weekday.');state.selected=value;renderBars();announce(q('[data-bar-summary]').textContent);
  }else if(kind==='donut'){
   if(value!==null&&(!Number.isInteger(value)||value<0||value>=storage.length))throw new RangeError('Unknown storage category.');state.selected=value;renderDonut();announce(value===null?'72 GB used out of 100 GB.':`${storage[value].label}: ${storage[value].value} GB.`);
  }else if(kind==='calendar'){
   const date=parseDate(value);state.date=value;state.focusDate=value;state.year=date.y;state.month=date.m;renderCalendar();announce(`${months[date.m]} ${date.d}, ${date.y}. ${events[value]||'No events scheduled'}.`);
  }else throw new TypeError('This component has no selectable items.');
  emit('select');return true;
 }
 function calendarKey(event){
  const b=event.target.closest('[data-action="date"]');if(!b)return;
  const current=parseDate(b.dataset.date);let next;
  const increment={ArrowRight:1,ArrowLeft:-1,ArrowDown:7,ArrowUp:-7};
  if(Object.hasOwn(increment,event.key)){const d=new Date(Date.UTC(current.y,current.m,current.d+increment[event.key]));next={y:d.getUTCFullYear(),m:d.getUTCMonth(),d:d.getUTCDate()};}
  else if(event.key==='Home'||event.key==='End'){
   const weekday=(new Date(Date.UTC(current.y,current.m,current.d)).getUTCDay()+6)%7,d=new Date(Date.UTC(current.y,current.m,current.d+(event.key==='Home'?-weekday:6-weekday)));next={y:d.getUTCFullYear(),m:d.getUTCMonth(),d:d.getUTCDate()};
  }else if(event.key==='PageUp'||event.key==='PageDown'){
   const month=new Date(Date.UTC(current.y,current.m+(event.key==='PageUp'?-1:1),1));next={y:month.getUTCFullYear(),m:month.getUTCMonth(),d:Math.min(current.d,daysIn(month.getUTCFullYear(),month.getUTCMonth()))};
  }else return;
  event.preventDefault();if(next.y<1900||next.y>2100)return;
  const changed=next.y!==state.year||next.m!==state.month;state.year=next.y;state.month=next.m;state.focusDate=iso(next.y,next.m,next.d);renderCalendar(true);if(changed)announce(`${months[next.m]} ${next.y}`);
 }
 function reset(){
  if(destroyed)return;const focused=root.getRootNode().activeElement||doc.activeElement,hadFocus=root.contains(focused),action=focused?.dataset?.action,value=focused?.dataset?.value;
  stopMotion();root.replaceChildren(...baseline.map(n=>n.cloneNode(true)));state=defaults();displayed=1248;points=[...metrics.week.points];root.dataset.expanded='false';init();
  if(hadFocus)(all('button').find(b=>b.dataset.action===action&&b.dataset.value===value&&!b.closest('[inert]'))||q('button')||root).focus({preventScroll:true});emit('reset');
 }
 function init(){
  if(kind==='metric')renderMetric(false);else if(kind==='calendar')renderCalendar();else if(kind==='bar')renderBars();else if(kind==='donut')renderDonut();else if(kind==='file')renderFile();
 }
 root.addEventListener('click',event=>{
  const b=event.target.closest('button[data-action]');if(!b||!root.contains(b)||b.disabled)return;
  const {action,value}=b.dataset;
  if(action==='period')setPeriod(value);else if(action==='sort')sort(value);else if(action==='filter')filter(value);else if(action==='toggle')toggle();else if(action==='row'||action==='member')select(value);
  else if(action==='bar'||action==='segment')select(Number(value));else if(action==='total')select(null);else if(action==='next-file')select((state.fileIndex+1)%files.length);
  else if(action==='date'){select(b.dataset.date);all('[data-action="date"]').find(day=>day.dataset.date===state.date)?.focus({preventScroll:true})}
  else if(action==='prev-month'||action==='next-month'){const next=new Date(Date.UTC(state.year,state.month+(action==='next-month'?1:-1),1));showMonth(next.getUTCFullYear(),next.getUTCMonth()+1)}
 },{signal:lifecycle.signal});
 root.addEventListener('keydown',calendarKey,{signal:lifecycle.signal});
 reduced.addEventListener('change',()=>{if(reduced.matches){stopMotion();if(kind==='metric')renderMetric(false)}},{signal:lifecycle.signal});
 init();
 const controller={select,setPeriod,sort,filter,toggle,showMonth,reset,get state(){return snapshot()},destroy(){if(destroyed)return;destroyed=true;stopMotion();lifecycle.abort();for(const b of all('button'))b.disabled=true;mounted.delete(root)}};
 mounted.set(root,controller);return controller;
}
window.MatteDataDisplay = { mount: mountDataDisplay };
})();
