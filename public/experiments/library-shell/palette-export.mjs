// One export transformation for the download route and framework consumers.
// Raw packages and the preview's per-shadow palette traversal keep their identity.
import {paletteCss} from './catalog-palettes.mjs';
import {paletteJavaScript} from './palette-javascript.mjs';

// Edit only CSS type-selector tokens in rule preludes. Declaration values,
// strings, comments, attribute selectors and class/id names are opaque.
function sourceSelectors(css,sourceTag,exportTag) {
 const edits=[],stack=['rules'];let start=0,quote='',comment=false,round=0,square=0;
 function selector(from,to){
  let bracket=0,quoted='',commented=false;const functions=[];
  for(let i=from;i<to;){
   const c=css[i],next=css[i+1];
   if(commented){if(c==='*'&&next==='/'){commented=false;i+=2;}else i++;continue;}
   if(quoted){if(c==='\\')i+=2;else{if(c===quoted)quoted='';i++;}continue;}
   if(c==='/'&&next==='*'){commented=true;i+=2;continue;}
   if(c==='"'||c==="'"){quoted=c;i++;continue;}
   if(c==='\\'){i+=2;continue;}
   if(c==='['){bracket++;i++;continue;}if(c===']'){bracket--;i++;continue;}
   if(bracket){i++;continue;}
   if(c==='('){const name=css.slice(from,i).match(/:([\w-]+)$/)?.[1];functions.push(!name||['is','where','not','has','host','host-context','slotted'].includes(name));i++;continue;}
   if(c===')'){functions.pop();i++;continue;}
   if(/[\w-]/.test(c)){
    let end=i+1;while(end<to&&/[\w-]/.test(css[end]))end++;
    if(css.slice(i,end)===sourceTag&&functions.every(Boolean)){
     const previous=css[i-1];
     if(previous==='|'||css[end]==='\\')throw Error('Escaped or namespaced source selectors are unsupported in exports.');
     if(i===from||!/[\w.#:\\-]/.test(previous))edits.push({start:i,end,replacement:exportTag});
    }
    i=end;continue;
   }
   i++;
  }
 }
 for(let i=0;i<css.length;i++){
  const c=css[i],next=css[i+1];
  if(comment){if(c==='*'&&next==='/'){comment=false;i++;}continue;}
  if(quote){if(c==='\\')i++;else if(c===quote)quote='';continue;}
  if(c==='/'&&next==='*'){comment=true;i++;continue;}
  if(c==='"'||c==="'"){quote=c;continue;}if(c==='\\'){i++;continue;}
  if(c==='(')round++;else if(c===')')round--;else if(c==='[')square++;else if(c===']')square--;
  if(round||square)continue;
  if(c==='{'){
   const prelude=css.slice(start,i).replace(/\/\*[\s\S]*?\*\//g,'').trim(),rules=stack.at(-1)==='rules';
   if(rules&&!prelude.startsWith('@'))selector(start,i);
   stack.push(rules&&/^@(?:media|supports|layer|container|document|starting-style|(?:-webkit-)?keyframes)\b/i.test(prelude)?'rules':rules?'declarations':'opaque');start=i+1;
  }else if(c==='}'){
   if(stack.length===1)throw Error('Unbalanced CSS in palette export.');stack.pop();start=i+1;
  }else if(c===';')start=i+1;
 }
 if(stack.length!==1||quote||comment||round||square)throw Error('Unclosed CSS in palette export.');
 let output='',position=0;for(const edit of edits){output+=css.slice(position,edit.start)+edit.replacement;position=edit.end;}return output+css.slice(position);
}

export function paletteExportSource(source,{type,variant,palette}={}) {
 if(typeof source!=='string'||!['css','javascript','html'].includes(type))throw new TypeError('Export source and type are required.');
 if(typeof variant!=='string'||!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(variant))throw new TypeError('Invalid export variant.');
 if(!['black','white','blue'].includes(palette))throw new TypeError('Invalid export palette.');
 const sourceTag=`sl-source-${variant}`,namespace=`palette-${palette}`,exportTag=`${sourceTag}-${namespace}`;
 const transformCss=css=>paletteCss(sourceSelectors(css,sourceTag,exportTag),palette);
 if(type==='css')return transformCss(source);
 if(type==='javascript')return paletteJavaScript(source,transformCss,{sourceTag,namespace});
 // Current packages have no source custom-tag markup. Fail rather than leave
 // a future markup occurrence referring to a differently named registration.
 let output='',position=0;
 for(let i=0;i<source.length;){
  const start=source.indexOf('<',i);if(start<0)break;
  if(source.startsWith('<!--',start)){const end=source.indexOf('-->',start+4);if(end<0)throw Error('Unclosed HTML comment in palette export.');i=end+3;continue;}
  const match=source.slice(start).match(/^<\/?([a-z][\w-]*)(?=[\s/>])/i);
  if(!match){i=start+1;continue;}
  let end=start+match[0].length,quote='';
  for(;end<source.length;end++){const c=source[end];if(quote){if(c===quote)quote='';}else if(c==='"'||c==="'")quote=c;else if(c==='>')break;}
  if(end===source.length)throw Error('Unclosed HTML tag in palette export.');
  const name=match[1].toLowerCase(),closing=source[start+1]==='/';i=end+1;
  if(name===sourceTag)throw Error('Source custom-tag HTML markup is unsupported in palette exports.');
  if(closing||!['style','script','textarea','title','xmp'].includes(name))continue;
  const close=new RegExp(`</${name}\\s*>`,'ig');close.lastIndex=i;const found=close.exec(source);
  if(!found)throw Error('Unclosed HTML raw-text element in palette export.');
  if(name==='style'){output+=source.slice(position,i)+transformCss(source.slice(i,found.index));position=found.index;}
  i=close.lastIndex;
 }
 return output+source.slice(position);
}
