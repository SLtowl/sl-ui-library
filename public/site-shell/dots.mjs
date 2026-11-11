// The interactive dot field shared by the home page and Docs. Call it with the page's full-screen canvas.
export function mountDots(canvas){
const calm=matchMedia('(prefers-reduced-motion:reduce)');
// Dots in the palette's grey; near the pointer they part and take the accent blue. A click sends a ring through them. It draws only while something moves.
const probe=document.createElement('canvas').getContext('2d',{willReadFrequently:true});
const rgb=name=>{probe.fillStyle=getComputedStyle(document.documentElement).getPropertyValue(name).trim();probe.fillRect(0,0,1,1);return [...probe.getImageData(0,0,1,1).data].slice(0,3)};
const BASE=rgb('--n8'),HOT=rgb('--b9');
const ctx=canvas.getContext('2d'),GAP=26,REACH=200,PUSH=18;
let W=0,H=0,dpr=1,dots=[],raf=0,mx=-9999,my=-9999,rings=[];
function layout(){W=innerWidth;H=innerHeight;dpr=Math.min(devicePixelRatio||1,2);canvas.width=W*dpr;canvas.height=H*dpr;dots=[];for(let y=GAP/2;y<H+GAP;y+=GAP)for(let x=GAP/2;x<W+GAP;x+=GAP)dots.push({x,y,ox:0,oy:0,vx:0,vy:0,e:0});draw()}
function draw(){ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,W,H);ctx.fillStyle=`rgba(${BASE},.55)`;ctx.beginPath();for(const d of dots){if(d.e>.02)continue;ctx.moveTo(d.x+1.1,d.y);ctx.arc(d.x,d.y,1.1,0,6.283)}ctx.fill();
  for(const d of dots){if(d.e<=.02)continue;const m=(a,b)=>a+(b-a)*d.e|0;ctx.fillStyle=`rgba(${m(BASE[0],HOT[0])},${m(BASE[1],HOT[1])},${m(BASE[2],HOT[2])},${(.55+.45*d.e).toFixed(3)})`;ctx.beginPath();ctx.arc(d.x+d.ox,d.y+d.oy,1.1+2.4*d.e,0,6.283);ctx.fill()}}
function step(now){raf=0;let busy=false;rings=rings.filter(r=>now-r.t<900);
  for(const d of dots){let tx=0,ty=0,te=0;const dx=d.x-mx,dy=d.y-my,dist=Math.hypot(dx,dy);if(dist<REACH){const f=1-dist/REACH,k=f*f;tx=dx/(dist||1)*PUSH*k;ty=dy/(dist||1)*PUSH*k;te=k}
    for(const r of rings){const rx=d.x-r.x,ry=d.y-r.y,rd=Math.hypot(rx,ry),w=Math.abs(rd-(now-r.t)*.75);if(w<60){const a=(1-w/60)*(1-(now-r.t)/900);tx+=rx/(rd||1)*14*a;ty+=ry/(rd||1)*14*a;te=Math.max(te,a)}}
    d.vx=(d.vx+(tx-d.ox)*.12)*.76;d.vy=(d.vy+(ty-d.oy)*.12)*.76;d.ox+=d.vx;d.oy+=d.vy;d.e+=(te-d.e)*.14;if(d.e<.002)d.e=0;
    if(Math.abs(d.ox-tx)>.05||Math.abs(d.oy-ty)>.05||Math.abs(d.vx)>.05||Math.abs(d.vy)>.05||Math.abs(d.e-te)>.01)busy=true}
  draw();if(busy||rings.length)wake()}
function wake(){if(!raf&&!document.hidden&&!calm.matches)raf=requestAnimationFrame(step)}
addEventListener('pointermove',e=>{if(e.pointerType==='touch')return;mx=e.clientX;my=e.clientY;wake()},{passive:true});
document.documentElement.addEventListener('pointerleave',()=>{mx=my=-9999;wake()});
addEventListener('pointerdown',e=>{if(e.target.closest('a,button,sl-preview'))return;rings.push({x:e.clientX,y:e.clientY,t:performance.now()});wake()},{passive:true});
let t;addEventListener('resize',()=>{clearTimeout(t);t=setTimeout(layout,160)},{passive:true});
layout();
}
