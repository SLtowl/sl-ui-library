/* Standalone Feedback controllers. No requests, telemetry or runtime dependencies. */
(() => {
const mounted = new WeakMap();
const motion = {"duration":{"short-2":100,"short-4":200,"medium-1":250,"medium-2":300,"medium-3":350,"medium-4":400}};
function mountFeedback(root, { onAction, returnFocus, timeout = 5000 } = {}) {
  if (mounted.has(root)) return mounted.get(root);
  if (!root?.matches('.fb-demo')) throw new TypeError('Feedback needs its .fb-demo root.');
  if (onAction !== undefined && typeof onAction !== 'function') throw new TypeError('onAction must be a function.');
  if (!Number.isFinite(timeout) || timeout < 0) throw new TypeError('timeout must be a non-negative number.');
  const doc=root.ownerDocument, view=doc.defaultView, kind=root.dataset.feedback;
  const known=['toast','undo','stack','alert','connection','linear','circular','skeleton','loading','retry'];
  if(!known.includes(kind)) throw new TypeError('Unknown Feedback kind.');
  const q=s=>root.querySelector(s), all=s=>[...root.querySelectorAll(s)];
  const lifecycle=new view.AbortController(), reduced=view.matchMedia('(prefers-reduced-motion: reduce)');
  const timers=new Set();
  let destroyed=false, revision=0, request=null, raf=0, progress=0, target=0, mode='determinate', state='idle';
  let queue=[], serial=3, expiryTimer=0, expiryRemaining=0, expiryAt=0, inView=true;
  for(const button of all('button')){button.type='button';button.disabled=false;}
  const baseline=[...root.childNodes].map(node=>node.cloneNode(true));
  function later(fn,ms){const timer=view.setTimeout(()=>{timers.delete(timer);if(!destroyed)fn();},ms);timers.add(timer);return timer;}
  function clearTimer(timer){view.clearTimeout(timer);timers.delete(timer);}
  function announce(text,error=false){q('[data-live]').textContent=error?'':text;q('[data-error]').textContent=error?text:'';}
  function emit(name,detail={}){root.dispatchEvent(new view.CustomEvent('feedback'+name,{bubbles:true,composed:true,detail:{kind,state,...detail}}));}
  function text(selector,value){const node=q(selector);if(node)node.textContent=String(value);}
  function active(){return root.getRootNode().activeElement||doc.activeElement;}
  function focusAway(region){if(!region?.contains(active()))return;const destination=returnFocus||q('[data-demo="show"]')||q('[data-demo="add"]')||q('[data-demo="remove"]')||q('button[data-demo]')||root;destination.focus({preventScroll:true});}
  function glyph(name){
    const svg=q('.fb-icon svg');if(!svg)return;
    const shapes={check:'<path d="m5 12 4 4L19 6"/>',info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7h.01"/>',error:'<circle cx="12" cy="12" r="9"/><path d="M12 7v6m0 4h.01"/>',file:'<path d="M14 3H5v18h14V8Zm0 0v5h5M8 12h8m-8 4h5"/>',wifi:'<path d="M3 8a15 15 0 0 1 18 0M6 12a10 10 0 0 1 12 0m-9 4a5 5 0 0 1 6 0m-3 4h.01"/>',retry:'<path d="M20 7v5h-5M4 17v-5h5"/><path d="M5.2 7a8 8 0 0 1 13.4-1L20 8M4 16l1.4 2A8 8 0 0 0 18.8 17"/>'};
    // Only this fixed icon dictionary is used as markup. Application messages use textContent.
    svg.innerHTML=shapes[name]||shapes.info;
  }
  function syncButtons(){
    for(const button of all('[data-action="undo"],[data-action="reconnect"],[data-action="retry"]')){
      const blocked=state==='pending'||((kind==='undo'||kind==='connection')&&state==='complete');
      button.setAttribute('aria-disabled',String(blocked));button.setAttribute('aria-busy',String(state==='pending'));
    }
    for(const button of all('[data-demo="start"],[data-demo="load"]'))button.disabled=state==='pending';
    for(const button of all('[data-demo="cancel"]'))button.disabled=state!=='pending';
  }
  function setState(value){
    state=value;root.dataset.state=value;syncButtons();
    const busy=value==='pending';
    if(kind==='undo'){
      text('[data-title]',busy?'Restoring item':value==='complete'?'Item restored':value==='error'?'Could not restore':'Item removed');
      text('[data-detail]',busy?'Please wait a moment.':value==='complete'?'Back where it belongs.':value==='error'?'Nothing changed. Try Undo again.':'You can still bring it back.');
      text('[data-action="undo"]',busy?'Restoring…':value==='complete'?'Restored':'Undo');glyph(value==='complete'?'check':'file');
    }else if(kind==='connection'){
      text('[data-title]',busy?'Reconnecting':value==='complete'?'You are connected':value==='error'?'Still offline':'Connection lost');
      text('[data-detail]',busy?'Checking the connection…':value==='complete'?'Your workspace is ready.':'Your changes are safe here.');
      text('[data-state-label]',busy?'CONNECTING':value==='complete'?'CONNECTED':'OFFLINE');
      text('[data-action="reconnect"]',busy?'Connecting…':value==='complete'?'Connected':'Reconnect');glyph(value==='complete'?'check':'wifi');
    }else if(kind==='retry'){
      text('[data-title]',busy?'Trying again':value==='complete'?'Files are ready':'Could not load files');
      text('[data-detail]',busy?'Checking your request…':value==='complete'?'You can continue where you left off.':'Something interrupted the request. Your files have not changed.');
      text('[data-state-label]',busy?'Please wait':value==='complete'?'Up to date':'Request failed');
      text('[data-action="retry"]',busy?'Trying…':value==='complete'?'Refresh':'Try again');glyph(value==='complete'?'check':'retry');
    }else if(kind==='loading'){
      text('[data-title]',busy?'Syncing workspace':value==='complete'?'Everything is up to date':value==='error'?'Could not sync':value==='canceled'?'Sync canceled':'Ready to sync');
      text('[data-detail]',busy?'Getting things ready.':value==='complete'?'You are ready to continue.':value==='error'?'Try again when you are ready.':'Everything stays on this device.');
    }else if(kind==='skeleton'){
      q('[data-content]').setAttribute('aria-busy',String(value!=='complete'));
      q('[data-loaded]').setAttribute('aria-hidden',String(value!=='complete'));q('[data-loaded]').inert=value!=='complete';
      text('[data-demo="load"]',busy?'Loading…':value==='complete'?'Reload content':'Load content');
    }else if(kind==='linear'||kind==='circular')renderProgress();
  }
  function initialState(){return kind==='connection'?'offline':kind==='retry'?'error':kind==='undo'?'removed':'idle';}
  function clearExpiry(){clearTimer(expiryTimer);expiryTimer=0;expiryRemaining=0;}
  function expiryPaused(){const panel=q('[data-panel]');return doc.hidden||!inView||panel?.matches(':hover')||panel?.contains(active());}
  function pauseExpiry(){if(!expiryTimer)return;expiryRemaining=Math.max(0,expiryRemaining-(view.performance.now()-expiryAt));clearTimer(expiryTimer);expiryTimer=0;}
  function resumeExpiry(){if(expiryTimer||!expiryRemaining||expiryPaused())return;expiryAt=view.performance.now();expiryTimer=later(()=>{expiryTimer=0;expiryRemaining=0;hide();},expiryRemaining);}
  function refreshExpiry(){if(expiryPaused())pauseExpiry();else resumeExpiry();}
  function show({title,detail,tone='success',duration=timeout}={}){
    if(destroyed)return false;
    if(!['success','error','info'].includes(tone))throw new TypeError('Unknown notification tone.');
    if(!Number.isFinite(duration)||duration<0)throw new TypeError('duration must be a non-negative number.');
    clearExpiry();root.dataset.tone=tone;
    if(kind==='toast'){
      const messages={success:['Changes saved','Your workspace is up to date.'],error:['Could not save','Your work is safe. Please try again.'],info:['A new update','There is a new note on this project.']};
      text('[data-title]',title??messages[tone][0]);text('[data-detail]',detail??messages[tone][1]);glyph(tone==='success'?'check':tone);
    }else if(kind==='undo'){cancelRequest();setState('removed');}
    const panel=q('[data-panel]');if(!panel)return false;
    panel.dataset.visible='true';panel.inert=false;panel.removeAttribute('aria-hidden');
    announce(q('[data-title]')?.textContent||'Notification shown.',tone==='error');
    if(kind==='toast'&&tone!=='error'){expiryRemaining=duration;resumeExpiry();}
    emit('show');return true;
  }
  function hide(){
    if(destroyed)return;clearExpiry();const panel=q('[data-panel]');if(!panel)return;
    focusAway(panel);panel.dataset.visible='false';panel.inert=true;panel.setAttribute('aria-hidden','true');announce('Message dismissed.');emit('dismiss');
  }
  function queueLabel(){const count=q('[data-stack]')?.children.length||0;text('[data-queue]',queue.length?`${count} visible · ${queue.length} queued`:`${count} notification${count===1?'':'s'}`);}
  function appendMessage(message,animate=true){
    const item=q('[data-item-template]').content.firstElementChild.cloneNode(true);
    item.dataset.id=String(++serial);item.querySelector('[data-title]').textContent=message.title;item.querySelector('[data-detail]').textContent=message.detail;
    item.dataset.visible=animate&&!reduced.matches?'false':'true';q('[data-stack]').append(item);
    if(animate&&!reduced.matches){void item.offsetHeight;item.dataset.visible='true';}
    queueLabel();return item.dataset.id;
  }
  function push({title='New notification',detail='An update to your workspace.'}={}){
    if(destroyed||kind!=='stack')return false;
    const message={title:String(title),detail:String(detail)};
    if(q('[data-stack]').children.length<3)appendMessage(message);
    else if(queue.length<20)queue.push(message);
    else{announce('Notification queue is full.');emit('overflow');return false;}
    queueLabel();announce(queue.length?'Notification added to the queue.':message.title);emit('enqueue');return true;
  }
  function dismissItem(item){
    if(!item||item.dataset.visible==='false')return;focusAway(item);item.inert=true;item.dataset.visible='false';
    later(()=>{item.remove();if(queue.length)appendMessage(queue.shift());queueLabel();},reduced.matches?0:motion.duration['medium-2']);
  }
  function clearStack(){if(destroyed||kind!=='stack')return;queue=[];for(const item of all('.fb-stack-item'))dismissItem(item);queueLabel();announce('Notifications cleared.');}
  function renderProgress(){
    const bar=q('[data-progress]');if(!bar)return;
    bar.dataset.mode=mode==='unknown'?'unknown':'determinate';
    if(mode==='unknown')bar.removeAttribute('aria-valuenow');else bar.setAttribute('aria-valuenow',String(Math.round(progress)));
    const isCircle=kind==='circular';
    if(mode==='unknown')text('[data-percent]',isCircle?'Working':'—');else text('[data-percent]',Math.round(progress)+(isCircle?'':'%'));
    if(q('[data-unit]'))q('[data-unit]').hidden=mode==='unknown';
    if(isCircle)q('[data-fill]').style.strokeDashoffset=String(100-progress);else q('[data-fill]').style.transform=`scaleX(${progress/100})`;
    const done=state==='complete'&&progress>=99.95;
    text('[data-title]',done?(isCircle?'Files are ready':'Export complete'):state==='error'?'Could not finish':state==='canceled'?'Operation canceled':state==='pending'||state==='complete'?(isCircle?'Preparing files':'Exporting assets'):isCircle?'Ready when you are':'Ready to export');
    text('[data-detail]',done?'All assets are prepared':state==='pending'?'Keep this preview open':state==='canceled'?'Start again when you are ready':state==='error'?'Try the operation again':'Waiting to start');
  }
  function update(value){
    if(destroyed)return false;
    if(!Number.isFinite(value))throw new TypeError('Progress must be a finite number.');
    target=Math.min(100,Math.max(0,value));view.cancelAnimationFrame(raf);raf=0;
    if(reduced.matches){progress=target;renderProgress();return true;}
    const from=progress,started=view.performance.now(),length=motion.duration['medium-4'];
    function tick(now){if(destroyed)return;const t=Math.min(1,(now-started)/length);const eased=t*t*(3-2*t);progress=from+(target-from)*eased;renderProgress();if(t<1)raf=view.requestAnimationFrame(tick);else raf=0;}
    raf=view.requestAnimationFrame(tick);return true;
  }
  function setMode(value){if(!['determinate','unknown'].includes(value))throw new TypeError('Unknown progress mode.');if(destroyed)return;mode=value;renderProgress();}
  function cancelRequest(){revision++;request?.abort();request=null;}
  async function run(action='start'){
    if(destroyed||state==='pending')return false;
    if(typeof onAction!=='function'){announce('Connect the onAction callback to run this operation.',true);return false;}
    cancelRequest();const id=revision,current=new view.AbortController();request=current;
    if(kind==='linear'||kind==='circular'){view.cancelAnimationFrame(raf);raf=0;progress=target=0;}
    setState('pending');announce(kind==='skeleton'?'Loading content.':'Operation started.');emit('change');
    try{
      await onAction(action,{signal:current.signal,onProgress:value=>{if(!destroyed&&id===revision&&state==='pending'&&mode!=='unknown')update(value);}});
      if(destroyed||id!==revision||current.signal.aborted)return false;
      request=null;mode='determinate';if(kind==='linear'||kind==='circular')update(100);
      setState('complete');announce(kind==='undo'?'Item restored.':kind==='connection'?'Connected.':kind==='skeleton'?'Content loaded.':'Operation complete.');emit('complete');return true;
    }catch(error){
      if(destroyed||id!==revision)return false;request=null;mode='determinate';
      setState(error?.name==='AbortError'?'canceled':'error');announce(error?.name==='AbortError'?'Operation canceled.':'The operation could not complete. Please try again.',error?.name!=='AbortError');emit('error',{message:error?.name==='AbortError'?'canceled':'failed'});return false;
    }
  }
  function cancel(){if(destroyed)return;cancelRequest();view.cancelAnimationFrame(raf);raf=0;mode='determinate';setState('canceled');announce('Operation canceled.');emit('cancel');}
  function reset(){
    if(destroyed)return;const focused=active(),demo=focused?.dataset?.demo,action=focused?.dataset?.action,hadFocus=root.contains(focused);
    cancelRequest();for(const timer of timers)view.clearTimeout(timer);timers.clear();expiryTimer=expiryRemaining=0;view.cancelAnimationFrame(raf);raf=0;progress=target=0;mode='determinate';queue=[];serial=3;
    root.replaceChildren(...baseline.map(node=>node.cloneNode(true)));root.dataset.tone='success';setState(initialState());queueLabel();
    if(hadFocus){const controls=all('button');(controls.find(el=>(demo&&el.dataset.demo===demo)||(action&&el.dataset.action===action))||q('button[data-demo]')||root).focus({preventScroll:true});}
    emit('reset');
  }
  const listen=(node,event,fn)=>node.addEventListener(event,fn,{signal:lifecycle.signal});
  listen(root,'click',event=>{const button=event.target.closest('button[data-action]');if(!button||!root.contains(button)||button.disabled||button.getAttribute('aria-disabled')==='true')return;const action=button.dataset.action;if(action==='dismiss')hide();else if(action==='dismiss-item')dismissItem(button.closest('.fb-stack-item'));else void run(action);});
  for(const event of ['pointerover','pointerout','focusin','focusout'])listen(root,event,()=>view.queueMicrotask(()=>{if(!destroyed)refreshExpiry();}));
  function pauseMotion(){root.dataset.motionPaused=String(doc.hidden||!inView);refreshExpiry();}
  listen(doc,'visibilitychange',pauseMotion);
  listen(reduced,'change',()=>{if(reduced.matches){view.cancelAnimationFrame(raf);raf=0;progress=target;renderProgress();}});
  const observer=typeof view.IntersectionObserver==='function'?new view.IntersectionObserver(entries=>{inView=entries[0].isIntersecting;pauseMotion();}):null;observer?.observe(root);
  setState(initialState());root.dataset.tone='success';queueLabel();pauseMotion();
  const controller={show,hide,push,clear:clearStack,update,setMode,run,cancel,reset,get state(){return state;},get progress(){return progress;},get queued(){return queue.length;},destroy(){if(destroyed)return;cancelRequest();destroyed=true;lifecycle.abort();observer?.disconnect();for(const timer of timers)view.clearTimeout(timer);timers.clear();view.cancelAnimationFrame(raf);for(const button of all('button'))button.disabled=true;mounted.delete(root);}};
  mounted.set(root,controller);return controller;
}
window.MatteFeedback = { mount: mountFeedback };
})();
