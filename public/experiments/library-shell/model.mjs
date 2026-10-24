export function pointerInfluence(pointer, anchor, radius=210){
  const dx=pointer.x-anchor.x,dy=pointer.y-anchor.y,distance=Math.hypot(dx,dy);
  if(!distance||distance>=radius)return{x:0,y:0};
  const force=Math.sin(distance/radius*Math.PI)*Math.min(14,distance*.14);
  return{x:dx/distance*force,y:dy/distance*force};
}
export function routePath(w,h,[s,c,r,q],offset={x:0,y:0}){
  const x=offset.x,y=offset.y;
  if(w<700)return `M -15 ${h*.075} C ${w*.16} ${h*.025},${s.x-w*.12} ${s.y},${s.x} ${s.y} C ${s.x+w*.14} ${s.y+h*.12},${w*.065+x*.2} ${h*.31},${w*.065+x*.2} ${h*.43} C ${w*.065+x*.2} ${h*.65},${c.x-w*.12} ${c.y},${c.x} ${c.y} C ${c.x+w*.18} ${c.y},${r.x-w*.2} ${r.y+h*.075},${r.x} ${r.y} C ${w*.98} ${r.y},${w*.955+x*.2} ${q.y+h*.24},${w*.955+x*.2} ${q.y+h*.13} C ${w*.955+x*.2} ${q.y},${q.x+w*.12} ${q.y},${q.x} ${q.y} C ${q.x+w*.16} ${q.y},${w*.85} ${h*.06},${w+15} ${h*.035}`;
  return `M -15 ${h*.095} C ${w*.13} ${h*.025},${s.x-w*.105} ${s.y},${s.x} ${s.y} C ${s.x+w*.16+x} ${s.y+h*.11+y},${w*.04+x} ${c.y-h*.23+y},${w*.13} ${c.y-h*.08} C ${w*.175-x*.5} ${c.y-h*.005-y*.5},${c.x-w*.08} ${c.y},${c.x} ${c.y} C ${c.x+w*.17+x} ${c.y},${r.x-w*.18+x} ${r.y+h*.08+y},${r.x} ${r.y} C ${w*.92+x} ${r.y+h*.045+y},${w*.82+x} ${q.y+h*.21+y},${q.x-w*.08} ${q.y+h*.08} C ${q.x-w*.14} ${q.y-h*.04},${q.x-w*.04} ${q.y},${q.x} ${q.y} C ${q.x+w*.14} ${q.y},${w*.87} ${h*.055},${w+15} ${h*.035}`;
}
export function matchComponent(component,query){
  const normalize=s=>String(s).normalize('NFKC').toLocaleLowerCase();
  const haystack=normalize([component.name,component.description,...(component.keywords||[]),...(component.motions||[]),...(component.variants||[])].join(' '));
  return normalize(query).trim().split(/\s+/u).filter(Boolean).every(term=>haystack.includes(term));
}
