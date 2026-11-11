import {mountReviewHeader} from './review-header.mjs';
// The shared header. Every page gets it from here, so it can never differ between pages.
export const CATALOG = './catalog.html';
const DOCS = './docs.html';
// Moving between sections: the page drops away first, then the next one builds itself in. Plain new-tab clicks are left alone.
function leaveFor(to, e) {
  if (e.button || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  e.preventDefault();
  if (matchMedia('(prefers-reduced-motion:reduce)').matches) { location.href = to; return; }
  document.documentElement.classList.add('going');
  setTimeout(() => { location.href = to; }, 400);
}
export const goCatalog = e => leaveFor(CATALOG + '?cat=buttons&enter', e);
export const goDocs = e => leaveFor(DOCS + '?enter', e);
export function mountHeader(current) {
  const header=mountReviewHeader({current,catalog:CATALOG,docs:DOCS,onComponents:goCatalog,onDocs:current==='Docs'?null:goDocs});
  addEventListener('pageshow',e=>{if(e.persisted)document.documentElement.classList.remove('going')});
  return header;
}
