// The bitmap and this SVG share cover/slice coordinates. The foreground surface
// never moves: its silhouette occludes the travelling light behind the edge.
const edge='M0 550 C210 550 380 614 560 696 C706 763 814 802 985 802 C1215 802 1480 721 1672 634';
export function mountAmbientRelief(intro){
  const reduced=matchMedia('(prefers-reduced-motion:reduce)'),contrast=matchMedia('(forced-colors:active)');
  const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');
  svg.setAttribute('class','relief-ambient');svg.setAttribute('viewBox','0 0 1672 941');
  svg.setAttribute('preserveAspectRatio','xMidYMid slice');svg.setAttribute('aria-hidden','true');
  svg.setAttribute('focusable','false');svg.setAttribute('hidden','');
  svg.innerHTML=`<defs>
    <clipPath id="ambient-behind-wave"><path d="${edge} L1672 0 L0 0 Z"/></clipPath>
    <radialGradient id="ambient-blue"><stop stop-color="#83b4ff"/><stop offset=".24" stop-color="#96bfff" stop-opacity=".86"/><stop offset=".55" stop-color="#b0d0ff" stop-opacity=".46"/><stop offset=".8" stop-color="#d0e3ff" stop-opacity=".14"/><stop offset="1" stop-color="#e5efff" stop-opacity="0"/></radialGradient>
  </defs>
  <g clip-path="url(#ambient-behind-wave)"><g class="ambient-traveller">
    <ellipse cx="0" cy="25" rx="529" ry="210" fill="url(#ambient-blue)"/>
  </g></g>
  <path class="ambient-route" d="M-180 550 L0 550 C210 550 380 614 560 696 C706 763 814 802 985 802 C1215 802 1480 721 1672 634 L1852 550" fill="none" stroke="none"/>`;
  intro.prepend(svg);
  let animation,active=!intro.hidden,destroyed=false;
  function refresh(){
    const enabled=active&&!document.hidden&&!reduced.matches&&!contrast.matches;
    svg.toggleAttribute('hidden',!enabled);
    if(animation){if(enabled)animation.play();else animation.pause();}
  }
  // Native WAAPI owns the idle loop; no per-frame JavaScript or layout reads.
  fetch(new URL('./ambient-motion.tokens.json',import.meta.url)).then(r=>{if(!r.ok)throw Error('Ambient tokens unavailable');return r.json();}).then(tokens=>{
    if(destroyed)return;
    const looping=tokens.motion.looping,route=svg.querySelector('.ambient-route'),length=route.getTotalLength();
    const frames=Array.from({length:97},(_,i)=>{
      const progress=i/96,p=route.getPointAtLength(length*progress);
      const fade=Math.min(1,progress/.12,(1-progress)/.12);
      return {transform:`translate(${p.x}px,${p.y}px)`,opacity:fade*fade*(3-2*fade)};
    });
    svg.style.setProperty('--relief-light-intensity',tokens.motion.glow.intensity.subtle.$value);
    animation=svg.querySelector('.ambient-traveller').animate(frames,{
      id:'relief-ambient-drift',duration:parseFloat(looping.duration['ultra-slow'].$value)*1000,
      iterations:Infinity,direction:looping.mode.alternate.$value,easing:looping.wave['ease-in-out'].$value
    });
    // Start with a visible light near the original reference position, not a second static glow.
    animation.currentTime=animation.effect.getTiming().duration*looping['initial-phase'].$value;
    refresh();
  }).catch(()=>{svg.toggleAttribute('hidden',true);});
  document.addEventListener('visibilitychange',refresh);reduced.addEventListener('change',refresh);contrast.addEventListener('change',refresh);
  return {
    setActive(value){active=value;refresh();},
    destroy(){destroyed=true;animation?.cancel();svg.remove();document.removeEventListener('visibilitychange',refresh);reduced.removeEventListener('change',refresh);contrast.removeEventListener('change',refresh);}
  };
}
