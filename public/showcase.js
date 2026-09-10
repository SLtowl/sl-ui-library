import './preview-runtime.js?v=instant-4';
const scenes={
 actions:{label:'Actions & selection',items:[['pair','Save & Cancel'],['like','Like'],['bookmark','Bookmark'],['theme-toggle','Appearance'],['sound-toggle','Sound'],['fill-checkbox','Remember choice']]},
 details:{label:'Control, without friction',items:[['rating-slider','Rating'],['volume-slider','Volume'],['chips-checkbox','Topics'],['tabs-navigation','Navigation'],['pin-checkbox','Pin'],['star-checkbox','Favorite']]},
 modal:{label:'Space for your next idea',items:[['modal-overlay','New project']]},
 menus:{label:'A place for every action',items:[['status-menu','Status'],['move-menu','Move to folder'],['appearance-menu','Surface'],['tabs-navigation','Tabs'],['steps-navigation','Steps'],['views-navigation','View switcher']]},
};
const key=new URL(location.href).searchParams.get('scene')||'actions',scene=scenes[key]||scenes.actions;
document.querySelector('#chapter').textContent=scene.label;
const collection=document.querySelector('#collection');collection.classList.toggle('spotlight',key==='modal');
for(const [variant,title] of scene.items){const cell=document.createElement('article');cell.className='cell';cell.innerHTML=`<h2>${title}</h2><sl-preview variant="${variant}"></sl-preview>`;collection.append(cell);}
