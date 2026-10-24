// ZIP32 reader/writer. Stored and raw DEFLATE entries only; no executable dependencies.
const encoder=new TextEncoder(), decoder=new TextDecoder('utf-8',{fatal:true});
const LIMIT=64*1024*1024, COUNT=4096;
export function crc32(bytes){let crc=0xffffffff;for(const byte of bytes){crc^=byte;for(let j=0;j<8;j++)crc=(crc>>>1)^((crc&1)?0xedb88320:0);}return (crc^0xffffffff)>>>0;}
function path(name){if(!name||name.includes('\\')||name.startsWith('/')||/[\u0000-\u001f:]/.test(name)||name.split('/').some(p=>p==='..'||p==='.'||!p))throw Error('Unsafe ZIP path');return name;}
export async function readZip(input,{signal}={}){
 const bytes=new Uint8Array(input);if(bytes.length>LIMIT)throw Error('ZIP too large');
 const view=new DataView(bytes.buffer,bytes.byteOffset,bytes.byteLength), files=new Map();
 const need=(p,n)=>{if(p<0||p+n>bytes.length)throw Error('Truncated ZIP');};
 let end=-1;for(let p=bytes.length-22;p>=Math.max(0,bytes.length-65557);p--)if(view.getUint32(p,true)===0x06054b50&&p+22+view.getUint16(p+20,true)===bytes.length){end=p;break;}
 if(end<0)throw Error('Invalid ZIP directory');
 const count=view.getUint16(end+10,true),size=view.getUint32(end+12,true),offset=view.getUint32(end+16,true);
 if(view.getUint16(end+4,true)||view.getUint16(end+6,true)||view.getUint16(end+8,true)!==count||count>COUNT||offset+size!==end)throw Error('Unsupported ZIP directory');
 let p=offset,total=0;const seen=new Set();
 for(let i=0;i<count;i++){
  signal?.throwIfAborted();need(p,46);if(view.getUint32(p,true)!==0x02014b50)throw Error('Invalid ZIP entry');
  const flags=view.getUint16(p+8,true),method=view.getUint16(p+10,true),crc=view.getUint32(p+16,true),packed=view.getUint32(p+20,true),length=view.getUint32(p+24,true),nl=view.getUint16(p+28,true),el=view.getUint16(p+30,true),cl=view.getUint16(p+32,true),local=view.getUint32(p+42,true);
  if(flags&~0x808||![0,8].includes(method)||length>LIMIT||(total+=length)>LIMIT||view.getUint16(p+34,true))throw Error('Unsupported or oversized ZIP entry');
  need(p+46,nl+el+cl);const name=decoder.decode(bytes.subarray(p+46,p+46+nl)),directory=name.endsWith('/');path(directory?name.slice(0,-1):name);
  if(seen.has(name))throw Error('Duplicate ZIP path');seen.add(name);
  need(local,30);if(view.getUint32(local,true)!==0x04034b50||view.getUint16(local+6,true)!==flags||view.getUint16(local+8,true)!==method)throw Error('Invalid local ZIP header');
  if(!(flags&8)&&(view.getUint32(local+14,true)!==crc||view.getUint32(local+18,true)!==packed||view.getUint32(local+22,true)!==length))throw Error('Local ZIP CRC or size mismatch');
  const lnl=view.getUint16(local+26,true),lel=view.getUint16(local+28,true),start=local+30+lnl+lel;need(local+30,lnl+lel);if(decoder.decode(bytes.subarray(local+30,local+30+lnl))!==name||start+packed>offset)throw Error('Invalid local ZIP path');
  let data=bytes.slice(start,start+packed);
  if(method===8){const reader=new Blob([data]).stream().pipeThrough(new DecompressionStream('deflate-raw')).getReader(),chunks=[];let expanded=0;try{while(true){signal?.throwIfAborted();const chunk=await reader.read();if(chunk.done)break;expanded+=chunk.value.length;if(expanded>length)throw Error('ZIP expanded size mismatch');chunks.push(chunk.value);}}finally{await reader.cancel();}data=new Uint8Array(expanded);let at=0;for(const chunk of chunks){data.set(chunk,at);at+=chunk.length;}}
  if(data.length!==length||crc32(data)!==crc)throw Error('ZIP CRC or size mismatch');if(!directory)files.set(name,data);p+=46+nl+el+cl;
 }
 if(p!==offset+size)throw Error('Invalid ZIP directory size');return files;
}
export function writeZip(files){
 const entries=[...files];if(entries.length>COUNT)throw Error('Too many ZIP entries');let offset=0,total=0;const locals=[],central=[];
 for(const [name,data] of entries){path(name);if(!(data instanceof Uint8Array))throw Error('ZIP data must be bytes');total+=data.length;if(total>LIMIT)throw Error('ZIP too large');const n=encoder.encode(name);if(n.length>65535)throw Error('ZIP path too long');const crc=crc32(data),local=new Uint8Array(30+n.length),lv=new DataView(local.buffer);lv.setUint32(0,0x04034b50,true);lv.setUint16(4,20,true);lv.setUint16(6,0x800,true);lv.setUint32(14,crc,true);lv.setUint32(18,data.length,true);lv.setUint32(22,data.length,true);lv.setUint16(26,n.length,true);local.set(n,30);locals.push(local,data);
 const c=new Uint8Array(46+n.length),cv=new DataView(c.buffer);cv.setUint32(0,0x02014b50,true);cv.setUint16(4,20,true);cv.setUint16(6,20,true);cv.setUint16(8,0x800,true);cv.setUint32(16,crc,true);cv.setUint32(20,data.length,true);cv.setUint32(24,data.length,true);cv.setUint16(28,n.length,true);cv.setUint32(42,offset,true);c.set(n,46);central.push(c);offset+=local.length+data.length;
 }
 const size=central.reduce((n,b)=>n+b.length,0),end=new Uint8Array(22),v=new DataView(end.buffer);v.setUint32(0,0x06054b50,true);v.setUint16(8,entries.length,true);v.setUint16(10,entries.length,true);v.setUint32(12,size,true);v.setUint32(16,offset,true);return new Blob([...locals,...central,end],{type:'application/zip'});
}
