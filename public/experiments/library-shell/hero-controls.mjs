export function mountReliefCTA(button){
 const media=matchMedia('(prefers-reduced-motion:reduce)'),abort=new AbortController();let point=null,frame=0,visible=false;
 const on=(target,type,listener,options={})=>target.addEventListener(type,listener,{...options,signal:abort.signal});
 function paint(){frame=0;const r=button.getBoundingClientRect();if(!point||media.matches||!r.width||!r.height){button.style.setProperty('--near-strength','0');return;}
  const x=point.x-r.left,y=point.y-r.top,t=Math.max(0,1-Math.hypot(Math.max(-x,0,x-r.width),Math.max(-y,0,y-r.height))/160),clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
  button.style.setProperty('--near-strength',(t*t*(3-2*t)).toFixed(4));button.style.setProperty('--light-x',`${clamp(x,0,r.width)}px`);button.style.setProperty('--light-y',`${clamp(y,0,r.height)}px`);button.style.setProperty('--sheen-x',`${(1-clamp(x/r.width,0,1))*100}%`);
 }
 function refresh(){if(!visible||media.matches)return;if(!frame)frame=requestAnimationFrame(paint);}
 function stop(){if(frame)cancelAnimationFrame(frame);frame=0;button.style.setProperty('--near-strength','0');}
 function clear(){point=null;stop();}
 const visibility=new IntersectionObserver(entries=>{visible=entries.at(-1).isIntersecting;if(visible)refresh();else stop();},{rootMargin:'160px'});visibility.observe(button);
 on(document,'pointermove',e=>{point=e.pointerType==='mouse'?{x:e.clientX,y:e.clientY}:null;refresh();},{passive:true});
 on(document,'pointerout',e=>{if(e.relatedTarget===null)clear();},{passive:true});on(window,'blur',clear);on(document,'visibilitychange',()=>{if(document.hidden)clear();});
 on(window,'scroll',refresh,{passive:true});on(window,'resize',refresh);on(media,'change',()=>{if(media.matches)stop();else refresh();});
 return{refresh,destroy(){abort.abort();visibility.disconnect();clear();}};
}
