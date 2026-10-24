import {matchComponent} from './model.mjs';
const base=new URL('../../',import.meta.url);
import {categoryIcon} from './catalog-icons.mjs';
import {mountSourceDialog} from './catalog-dialog.mjs';
import {paletteControls,setPreviewPalette} from './catalog-palettes.mjs';
import {mountReliefCTA} from './hero-controls.mjs';
export async function mountWorkspace(root){
  const {categories,components}=await import(new URL('catalog-data.js',base));
  await import(new URL('preview-runtime.js',base));
  await import(new URL('packages/search-input/buttons.js',base));
  const grid=root.querySelector('#component-grid'),nav=root.querySelector('#category-nav'),input=root.querySelector('#catalog-search'),more=root.querySelector('#load-more');
  let category='all',collection='all',query='',shown=12,selected='';
  const collections=document.createElement('div');collections.id='collection-filters';collections.className='collection-filters';collections.setAttribute('role','group');collections.setAttribute('aria-label','Component collections');grid.before(collections);
  for(const [id,label,icon] of [['all','All','all'],['original','SL Original','buttons']]){
    const button=document.createElement('button');button.type='button';button.className='collection-filter';button.dataset.collection=id;button.setAttribute('aria-pressed',String(id==='all'));button.setAttribute('aria-controls','component-grid');
    const name=document.createElement('span');name.className='collection-label';name.textContent=label;const count=document.createElement('span');count.className='collection-count';count.setAttribute('aria-hidden','true');button.append(categoryIcon(icon),name,count);
    button.addEventListener('click',()=>{if(collection===id)return;clearTimeout(debounce);query=input.value.trim();collection=id;shown=12;navigate();render();});collections.append(button);
  }
  collections.addEventListener('keydown',event=>{const buttons=[...collections.children],index=buttons.indexOf(event.target);if(index<0)return;const next=event.key==='Home'?0:event.key==='End'?buttons.length-1:event.key==='ArrowRight'?(index+1)%buttons.length:event.key==='ArrowLeft'?(index+buttons.length-1)%buttons.length:-1;if(next<0)return;event.preventDefault();buttons[next].focus();buttons[next].click();});
  const palettes=new Map();
  mountReliefCTA(more);
  const search=window.MatteSearchInput.mount(root.querySelector('#search-field'),{items:components.map(c=>c.name)});
  const dialog=mountSourceDialog(root,()=>{selected='';for(const card of grid.children)card.classList.remove('is-selected');},(id,palette)=>{
    palettes.set(id,palette);const card=[...grid.children].find(c=>c.dataset.id===id);if(!card)return;
    setPreviewPalette(card.querySelector('sl-preview'),palette);for(const swatch of card.querySelectorAll('.palette-swatch'))swatch.setAttribute('aria-pressed',String(swatch.dataset.palette===palette));
  });
  const categoryMap=new Map(categories.map(c=>[c.id,c]));
  function navigate(){const p=new URLSearchParams();if(category!=='all')p.set('category',category);if(collection!=='all')p.set('collection',collection);if(query)p.set('q',query);history.replaceState(null,'',`#catalog${p.size?'?'+p:''}`);}
  for(const c of [{id:'all',label:'All components'},...categories]){
    const button=document.createElement('button');button.type='button';button.className='category-nav-button';button.dataset.category=c.id;button.setAttribute('aria-pressed',String(c.id==='all'));
    const symbol=document.createElement('span');symbol.className='category-symbol';symbol.setAttribute('aria-hidden','true');symbol.append(categoryIcon(c.id));
    const name=document.createElement('span');name.textContent=c.label;name.className='category-tooltip';name.setAttribute('aria-hidden','true');button.setAttribute('aria-label',c.label);const count=document.createElement('span');count.className='category-count';count.textContent=String(c.id==='all'?components.length:components.filter(v=>v.category===c.id).length);button.append(symbol,name,count);
    button.addEventListener('click',()=>{clearTimeout(debounce);query=input.value.trim();category=c.id;shown=12;navigate();render();root.querySelector('#categories').classList.remove('is-open');root.querySelector('#filter-toggle').setAttribute('aria-expanded','false');});nav.append(button);
  }
  function inspect(component){
    selected=component.id;for(const card of grid.children)card.classList.toggle('is-selected',card.dataset.id===selected);
    dialog.open(component,palettes.get(component.id)||'white',categoryMap.get(component.category)?.label||component.category);
  }
  function render(){
    const candidates=components.filter(c=>(category==='all'||c.category===category)&&matchComponent(c,query));
    const inCollection=(c,id)=>id==='all'||(c.collection||'original')===id;
    const results=candidates.filter(c=>inCollection(c,collection));
    for(const button of collections.children){button.setAttribute('aria-pressed',String(button.dataset.collection===collection));button.querySelector('.collection-count').textContent=String(candidates.filter(c=>inCollection(c,button.dataset.collection)).length);}
    root.querySelector('#catalog-title').textContent=categoryMap.get(category)?.label||'Components';root.querySelector('#result-count').textContent=String(results.length);root.querySelector('#result-count').setAttribute('aria-label',`${results.length} components`);
    for(const b of nav.children)b.setAttribute('aria-pressed',String(b.dataset.category===category));
    const already=[...grid.children].map(c=>c.dataset.id);const visible=results.slice(0,shown);
    if(already.some((id,i)=>visible[i]?.id!==id)||already.length>visible.length){grid.replaceChildren();}
    for(const c of visible.slice(grid.children.length)){
      const card=document.createElement('article');card.className='component-card';card.dataset.id=c.id;card.classList.toggle('is-selected',c.id===selected);
      const stage=document.createElement('div');stage.className='preview-window card-preview';const frame=document.createElement('sl-preview');frame.setAttribute('variant',c.variants[0]);frame.setAttribute('aria-label',`${c.name} interactive preview`);stage.append(frame);
      const marker=document.createElement('span');marker.className='studio-marker';marker.textContent='SL Original';stage.append(marker);
      const footer=document.createElement('div');footer.className='card-footer';const caption=document.createElement('div');const name=document.createElement('h3');name.className='card-title';name.textContent=c.name;const type=document.createElement('p');type.className='card-type';type.textContent=categoryMap.get(c.category)?.label||c.category;caption.append(name,type);const button=document.createElement('button');button.type='button';button.className='inspect-button';button.innerHTML='View code <svg class="code-icon" viewBox="0 0 24 24" aria-hidden="true"><path class="code-left" d="m7 6-5 6 5 6"/><path d="m14 4-4 16"/><path class="code-right" d="m17 6 5 6-5 6"/></svg>';button.setAttribute('aria-label',`Inspect ${c.name} source`);button.addEventListener('click',()=>inspect(c));footer.append(caption,button);card.append(stage,footer);grid.append(card);
      const swatches=paletteControls(frame,c.name,palette=>palettes.set(c.id,palette));stage.append(swatches);
      const palette=palettes.get(c.id)||'white';setPreviewPalette(frame,palette);for(const b of swatches.children)b.setAttribute('aria-pressed',String(b.dataset.palette===palette));
    }
    grid.setAttribute('aria-busy','false');root.querySelector('#catalog-empty').hidden=results.length!==0;more.hidden=results.length<=shown;root.querySelector('#clear-search').hidden=!query;
  }
  let debounce;
  input.addEventListener('input',()=>{clearTimeout(debounce);debounce=setTimeout(()=>{query=input.value.trim();shown=12;navigate();render();},120);});
  root.querySelector('#catalog-search-form').addEventListener('submit',event=>{event.preventDefault();clearTimeout(debounce);query=input.value.trim();shown=12;navigate();render();});
  root.querySelector('#search-field').addEventListener('searchselect',()=>{clearTimeout(debounce);query=input.value.trim();shown=12;navigate();render();});
  root.querySelector('#reset-filters').addEventListener('click',()=>{clearTimeout(debounce);category='all';collection='all';query='';input.value='';shown=12;navigate();render();input.focus();});
  more.addEventListener('click',()=>{shown+=12;render();});
  return{restore(params){clearTimeout(debounce);search.close();category=categoryMap.has(params.get('category'))?params.get('category'):'all';collection=params.get('collection')==='original'?'original':'all';query=params.get('q')||'';input.value=query;shown=12;render();},pause(){clearTimeout(debounce);search.close();dialog.close();grid.replaceChildren();},count:components.length};
}
