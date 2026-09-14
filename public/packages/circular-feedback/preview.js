/* Preview-only adapter: every operation is simulated locally. Remove for production. */
(() => {
function mountFeedbackPreview(root, mount) {
  const view=root.ownerDocument.defaultView;
  const lifecycle=new view.AbortController();
  let added=0;
  const controller=mount(root,{
    onAction(action,{signal,onProgress}){
      const fail=Boolean(root.querySelector('[data-demo-error]')?.checked),kind=root.dataset.feedback;
      const duration=kind==='linear'||kind==='circular'?3200:kind==='loading'?2600:kind==='skeleton'?1250:850;
      return new Promise((resolve,reject)=>{
        if(signal.aborted){reject(new view.DOMException('Canceled','AbortError'));return;}
        const start=view.performance.now();
        const interval=view.setInterval(()=>{if(!signal.aborted&&(kind==='linear'||kind==='circular'))onProgress(Math.min(98,(view.performance.now()-start)/duration*100));},100);
        const finish=view.setTimeout(()=>{cleanup();fail?reject(new Error('Simulated preview failure')):resolve();},duration);
        const abort=()=>{cleanup();reject(new view.DOMException('Canceled','AbortError'));};
        function cleanup(){view.clearInterval(interval);view.clearTimeout(finish);signal.removeEventListener('abort',abort);}
        signal.addEventListener('abort',abort,{once:true});
      });
    }
  });
  root.addEventListener('click',event=>{
    const button=event.target.closest('button[data-demo]');if(!button||!root.contains(button)||button.disabled)return;
    const action=button.dataset.demo;
    if(action==='show')controller.show({tone:root.dataset.tone||'success'});
    else if(action==='tone'){
      for(const option of root.querySelectorAll('[data-demo="tone"]'))option.setAttribute('aria-pressed',String(option===button));
      controller.show({tone:button.dataset.tone});
    }else if(action==='remove')controller.show();
    else if(action==='add'){added++;controller.push({title:'Project update '+added,detail:'A new activity in your workspace.'});}
    else if(action==='clear')controller.clear();
    else if(action==='reset'||action==='offline'){added=0;controller.reset();}
    else if(action==='cancel')controller.cancel();
    else if(action==='start'||action==='load')void controller.run(action);
    else if(action==='unknown'){const unknown=root.querySelector('[data-progress]').dataset.mode!=='unknown';controller.setMode(unknown?'unknown':'determinate');if(controller.state!=='pending')void controller.run('start');}
  },{signal:lifecycle.signal});
  return {reset(){added=0;controller.reset();},destroy(){lifecycle.abort();controller.destroy();},controller};
}
window.MatteFeedbackPreview = { mount: mountFeedbackPreview };
})();
