import {readZip,writeZip} from './catalog-zip.mjs';
import {paletteExportSource} from './palette-export.mjs';
const base=new URL('../../',import.meta.url),decoder=new TextDecoder('utf-8',{fatal:true}),encoder=new TextEncoder();
export async function loadPalettePackage(component,palette,{signal}={}){
 if(!['black','white','blue'].includes(palette))throw Error('Unknown palette');
 const variant=component?.variants?.[0],rawDownload=component?.downloads?.[variant],download=typeof rawDownload==='string'?rawDownload.replace(/^\.\//,''):rawDownload;
 if(typeof download!=='string'||!/^downloads\/[\w.-]+\.zip$/.test(download))throw Error('Component archive unavailable');
 signal?.throwIfAborted();const response=await fetch(new URL(download,base),{signal});if(!response.ok)throw Error(`Archive unavailable (${response.status})`);
 const bytes=new Uint8Array(await response.arrayBuffer()),files=await readZip(bytes,{signal});
 let changed=palette!=='black';
 for(const [name,data] of files){
  signal?.throwIfAborted();
  if(/\.css$/i.test(name)){const original=decoder.decode(data),next=paletteExportSource(original,{type:'css',variant,palette});changed||=next!==original;files.set(name,encoder.encode(next));}
  else if(/\.(?:m?js)$/i.test(name)){
   // Nested native shadow roots ship their sheets inside controller bundles.
   // Theme those CSS literals too, preserving JavaScript and dynamic values.
   const text=decoder.decode(data),next=paletteExportSource(text,{type:'javascript',variant,palette});
   changed||=next!==text;files.set(name,encoder.encode(next));
  }
  else if(/\.html?$/i.test(name)){
   // Only style elements are CSS. Script contents and literal user text stay intact.
   const text=decoder.decode(data),next=paletteExportSource(text,{type:'html',variant,palette});changed||=next!==text;files.set(name,encoder.encode(next));
  }
 }
 signal?.throwIfAborted();
 return {files,source(file){if(!files.has(file))throw Error(`File absent from archive: ${file}`);return decoder.decode(files.get(file));},blob:changed?writeZip(files):new Blob([bytes],{type:'application/zip'}),filename:`${download.split('/').pop().slice(0,-4)}-${palette}.zip`};
}
