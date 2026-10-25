import {setPreviewPalette,paletteControls} from './catalog-palettes.mjs';
import {loadPalettePackage,loadPaletteSource} from './catalog-export.mjs';
import {mountReliefCTA} from './hero-controls.mjs';
import '../../packages/copy/buttons.js';
const formats=[['HTML','index.html'],['CSS','buttons.css'],['JavaScript','example.js'],['React','Component.jsx'],['Next.js','NextClient.jsx']];

// Source remains literal text; line numbers are CSS counters, never copied content.
function paintCode(code,text,file){
  const fragment=document.createDocumentFragment();
  const tokens=file.endsWith('.html')?/(<!--[\s\S]*?-->|<\/?[\w-]+|\b[\w-]+(?==)|"[^"\n]*"|'[^'\n]*')/g:/(\/\/[^\n]*|"[^"\n]*"|'[^'\n]*'|\b(?:import|export|from|const|let|return|function|class|new|if|else|true|false|null)\b|#[\da-f]{3,8}\b)/gi;
  const lines=text.split('\n');
  lines.forEach((line,index)=>{
    const row=document.createElement('span');row.className='code-line';let position=0;
    for(const match of line.matchAll(tokens)){row.append(document.createTextNode(line.slice(position,match.index)));const token=document.createElement('span');token.className=/^["']/.test(match[0])?'syntax-string':'syntax-key';token.textContent=match[0];row.append(token);position=match.index+match[0].length;}
    row.append(document.createTextNode(line.slice(position)+(index<lines.length-1?'\n':'')));fragment.append(row);
  });code.replaceChildren(fragment);
}

export function mountSourceDialog(root,onClose,onPaletteChange=()=>{}){
  const dialog=root.querySelector('#component-dialog'),preview=root.querySelector('#detail-preview'),help=root.querySelector('#help-dialog');
  const tabs=root.querySelector('#source-tabs'),code=root.querySelector('#source-code'),status=root.querySelector('#source-status');
  const copy=root.querySelector('#copy-source'),download=root.querySelector('#download-link');
  let component,palette='white',file='index.html',bundle,request,generation=0,sourceRequest,sourceGeneration=0,sourceText;
  // Retain at most the three finished palettes of the last component. Public
  // source can be reopened instantly; partial/failed loads are never cached.
  const bundles=new Map();
  const copyController=window.MatteCopy.mount(copy,{getText:()=>sourceText,feedback:status});
  mountReliefCTA(help.querySelector('.help-plugin-download'));
  copy.disabled=true;
  for(const modal of [dialog,help]){
    modal.querySelector('[data-close]').addEventListener('click',()=>modal.close());
    modal.addEventListener('click',event=>{if(event.target!==modal)return;const rect=modal.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)modal.close();});
    modal.addEventListener('close',()=>{if(!root.querySelector('dialog[open]'))document.documentElement.classList.remove('catalog-dialog-open');});
  }
  root.querySelector('#how-to-use').addEventListener('click',()=>{help.showModal();document.documentElement.classList.add('catalog-dialog-open');});
  function resetCopy(){copyController.reset();}
  async function showSource(){
    sourceRequest?.abort();sourceRequest=new AbortController();const signal=sourceRequest.signal,version=++sourceGeneration;
    const selected=component,selectedPalette=palette,selectedFile=file;sourceText=undefined;
    resetCopy();root.querySelector('#source-filename').textContent=file;
    for(const tab of tabs.children){const selected=tab.dataset.file===file;tab.setAttribute('aria-selected',String(selected));tab.tabIndex=selected?0:-1;if(selected)code.setAttribute('aria-labelledby',tab.id);}
    copy.disabled=true;code.setAttribute('aria-busy','true');code.textContent='Preparing source…';
    try{
      const text=bundle?bundle.source(selectedFile):await loadPaletteSource(selected,selectedPalette,selectedFile,{signal});
      if(signal.aborted||version!==sourceGeneration||!dialog.open)return;
      sourceText=text;paintCode(code,text,selectedFile);copy.disabled=false;code.scrollTop=0;code.scrollLeft=0;
    }catch{if(!signal.aborted&&version===sourceGeneration)code.textContent='This file is not available in this package.';}
    finally{if(version===sourceGeneration)code.setAttribute('aria-busy','false');}
  }
  async function load(){
    request?.abort();request=new AbortController();const signal=request.signal,version=++generation;
    const selected=component,selectedPalette=palette;bundle=bundles.get(palette);download.disabled=!bundle;
    status.textContent='';
    await showSource();
    if(signal.aborted||version!==generation||!dialog.open||bundle)return;
    // Let the code paint before archive transfer/transformation competes for
    // bandwidth or the main thread. Tabs and Copy do not depend on the ZIP.
    await new Promise(resolve=>requestAnimationFrame(()=>setTimeout(resolve,0)));
    if(signal.aborted||version!==generation||!dialog.open)return;
    try{
      const result=await loadPalettePackage(selected,selectedPalette,{signal});
      if(signal.aborted||version!==generation||!dialog.open)return;
      bundles.set(selectedPalette,result);
      bundle=result;download.disabled=false;status.textContent='';if(sourceText===undefined)showSource();
    }catch(error){
      if(signal.aborted||version!==generation)return;
      status.textContent='Download unavailable. Choose a palette to retry.';
    }
  }
  function mountPreview(){
    const frame=document.createElement('sl-preview');frame.setAttribute('variant',component.variants[0]);frame.setAttribute('aria-label',`${component.name} interactive preview`);preview.replaceChildren(frame);setPreviewPalette(frame,palette);
    const swatches=paletteControls(frame,component.name,next=>{palette=next;onPaletteChange(component.id,next);load();});
    for(const b of swatches.children)b.setAttribute('aria-pressed',String(b.dataset.palette===palette));root.querySelector('#detail-palettes').replaceChildren(swatches);
  }
  for(const [label,name] of formats){const tab=document.createElement('button');tab.type='button';tab.textContent=label;tab.id=`source-${label.replace(/\W/g,'')}`;tab.dataset.file=name;tab.setAttribute('role','tab');tab.setAttribute('aria-controls','source-code');tab.addEventListener('click',()=>{if(file===name)return;file=name;showSource();});tabs.append(tab);}
  tabs.addEventListener('keydown',event=>{const buttons=[...tabs.children],i=buttons.indexOf(document.activeElement);let next;if(event.key==='ArrowRight')next=(i+1)%buttons.length;if(event.key==='ArrowLeft')next=(i+buttons.length-1)%buttons.length;if(event.key==='Home')next=0;if(event.key==='End')next=buttons.length-1;if(next!==undefined){event.preventDefault();buttons[next].focus();buttons[next].click();}});
  download.addEventListener('click',()=>{
    if(!bundle)return;
    const url=URL.createObjectURL(bundle.blob),anchor=document.createElement('a');anchor.href=url;anchor.download=bundle.filename;document.body.append(anchor);anchor.click();anchor.remove();setTimeout(()=>URL.revokeObjectURL(url),30000);
  });
  root.querySelector('#reset-preview').addEventListener('click',mountPreview);
  dialog.addEventListener('close',()=>{if(dialog.open)return;request?.abort();sourceRequest?.abort();generation++;sourceGeneration++;resetCopy();copy.disabled=true;sourceText=undefined;bundle=undefined;preview.replaceChildren();onClose();});
  return {
    open(next,selectedPalette='white',category='Component'){
      if(component!==next)bundles.clear();
      component=next;palette=selectedPalette;file='index.html';
      root.querySelector('#inspector-name').textContent=component.name;root.querySelector('#inspector-description').textContent=component.description;root.querySelector('#inspector-category').textContent=category;
      if(!dialog.open)dialog.showModal();document.documentElement.classList.add('catalog-dialog-open');load();mountPreview();
    },
    close(){request?.abort();sourceRequest?.abort();if(dialog.open)dialog.close();if(help.open)help.close();}
  };
}
