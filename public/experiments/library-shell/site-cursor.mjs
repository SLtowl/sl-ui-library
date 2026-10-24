// Browser-painted cursors: no moving DOM layer, pointer event loop or hit testing.
// The same arrow geometry as the approved cursor; the stroke stays .8px at both sizes.
function arrow(width,height){
 const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 24 30"><path d="M3 3v20l5.5-5.2 4.2 9.3 3.7-1.7-4.2-9.2h7.7L3 3Z" fill="white" stroke="#171717" stroke-width=".8" stroke-linejoin="round" vector-effect="non-scaling-stroke"/></svg>`;
 return `url("data:image/svg+xml,${encodeURIComponent(svg)}") 2 2`;
}
const normal=`${arrow(14,18)}, auto`,active=`${arrow(17,22)}, pointer`;
const fine='(hover:hover) and (pointer:fine) and (forced-colors:none)';
const rules=`
 button,a[href],summary,[role=button],[role=link],[role=option],[role=tab],[role=checkbox],[role=switch],input:is([type=checkbox],[type=radio]){cursor:var(--site-action-cursor,pointer)!important}
 input:is(:not([type]),[type=text],[type=search],[type=email],[type=url],[type=tel],[type=password],[type=number]),textarea,[contenteditable]:not([contenteditable=false]),pre,pre *,code,code *{cursor:text!important}
 [data-cursor=grab]{cursor:grab!important}[data-cursor=grab]:active,[data-cursor=grabbing]{cursor:grabbing!important}
 [data-cursor=move]{cursor:move!important}[data-cursor=ew-resize]{cursor:ew-resize!important}[data-cursor=ns-resize]{cursor:ns-resize!important}
 [data-cursor=nwse-resize]{cursor:nwse-resize!important}[data-cursor=nesw-resize]{cursor:nesw-resize!important}
 [data-cursor=zoom-in]{cursor:zoom-in!important}[data-cursor=zoom-out]{cursor:zoom-out!important}
 :disabled,[aria-disabled=true]{cursor:not-allowed!important}[aria-busy=true]{cursor:progress!important}
 @media(prefers-reduced-motion:reduce){button,a[href],summary,[role=button],[role=link],[role=option],[role=tab],[role=checkbox],[role=switch]{--site-action-cursor:var(--site-arrow-cursor)}}
`;
let previewSheet;
const boundFrames=new WeakSet();
export function configurePreviewCursor(frame){
 const root=frame.shadowRoot;if(!root)return;
 if(!previewSheet){previewSheet=new CSSStyleSheet();previewSheet.replaceSync(`@media ${fine}{:host{cursor:var(--site-arrow-cursor,auto)}${rules}}`);}
 if(!root.adoptedStyleSheets.includes(previewSheet))root.adoptedStyleSheets=[...root.adoptedStyleSheets,previewSheet];
 const iframe=root.querySelector('iframe');if(!iframe)return;
 const paint=()=>{const doc=iframe.contentDocument;if(!doc?.head||doc.querySelector('[data-shell-cursor]'))return;const style=doc.createElement('style');style.dataset.shellCursor='';style.textContent=`@media ${fine}{:root{--site-arrow-cursor:${normal};--site-action-cursor:${active};cursor:var(--site-arrow-cursor)}${rules}}`;doc.head.append(style);};
 if(!boundFrames.has(iframe)){iframe.addEventListener('load',paint);boundFrames.add(iframe);}paint();
}
export function mountSiteCursor(){
 const style=document.createElement('style');style.dataset.shellCursor='';
 style.textContent=`@media ${fine}{:root{--site-arrow-cursor:${normal};--site-action-cursor:${active};cursor:var(--site-arrow-cursor)}${rules}}`;
 document.head.append(style);
 return {refresh(){},destroy(){style.remove();}};
}
