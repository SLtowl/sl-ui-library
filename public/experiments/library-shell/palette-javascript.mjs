// Rewrite embedded stylesheet literals without evaluating JavaScript. All other
// source bytes, including interpolation expressions, remain untouched.
export function paletteJavaScript(source, transformCss, identity) {
  if (typeof source !== 'string' || typeof transformCss !== 'function') throw new TypeError('JavaScript source and a CSS transform are required.');
  if (identity && (!/^sl-source-[a-z0-9]+(?:-[a-z0-9]+)*$/.test(identity.sourceTag) || !/^palette-(?:black|white|blue)$/.test(identity.namespace))) throw new TypeError('Invalid export source identity.');
  const sourceTag=identity?.sourceTag, exportTag=identity&&`${sourceTag}-${identity.namespace}`, tokens=[], references={get:0,define:0,createElement:0};
  let unsupportedRegistration=false;
  const token=value=>{if(identity){tokens.push(value);if(tokens.length>5)tokens.shift();}};
  function reference() {
    const tail=tokens.slice(-4).join(' ');
    if(tokens.at(-5)==='.')return null;
    return tail==='customElements . get ('?'get':tail==='customElements . define ('?'define':tail==='document . createElement ('?'createElement':null;
  }
  const edits = [];
  const regexKeywords = new Set(['return','throw','case','delete','void','typeof','new','in','of','yield','await','instanceof','else','do']);
  const identifier = c => !!c && /[\w$\u0080-\uffff]/.test(c);
  function quoted(start) {
    const quote = source[start]; let end = start + 1;
    for (; end < source.length; end++) {
      if (source[end] === '\\') { end++; if (source[end] === '\r' && source[end + 1] === '\n') end++; }
      else if (source[end] === quote) return end + 1;
      else if (source[end] === '\n' || source[end] === '\r') return null;
    }
    return null;
  }
  function regexEnd(start) {
    let bracket = false;
    for (let i = start + 1; i < source.length; i++) {
      const c = source[i];
      if (c === '\\') i++;
      else if (c === '\n' || c === '\r') return start + 1;
      else if (c === '[') bracket = true;
      else if (c === ']') bracket = false;
      else if (c === '/' && !bracket) { i++; while (/[a-z]/i.test(source[i] || '') && i < source.length) i++; return i; }
    }
    return start + 1;
  }
  // Return the closing brace of a template expression. Nested templates, quoted
  // strings, comments, regex character classes and object/function braces are opaque.
  function expressionEnd(start) {
    let depth = 0, canRegex = true;
    for (let i = start; i < source.length;) {
      const c = source[i], next = source[i + 1];
      if (/\s/.test(c)) { i++; continue; }
      if (c === '/' && next === '/') { const end = source.indexOf('\n', i + 2); i = end < 0 ? source.length : end; continue; }
      if (c === '/' && next === '*') { const end = source.indexOf('*/', i + 2); if (end < 0) return null; i = end + 2; continue; }
      if (c === '"' || c === "'") { const end = quoted(i); if (!end) return null; i = end; canRegex = false; continue; }
      if (c === '`') { const token = template(i); if (!token) return null; i = token.end; canRegex = false; continue; }
      if (c === '/' && canRegex) { i = regexEnd(i); canRegex = false; continue; }
      if (identifier(c)) { let end = i + 1; while (identifier(source[end])) end++; canRegex = regexKeywords.has(source.slice(i,end)); i = end; continue; }
      if (c === '{') { depth++; canRegex = true; i++; continue; }
      if (c === '}') { if (!depth) return i; depth--; canRegex = false; i++; continue; }
      canRegex = !/[)\].]/.test(c) && !(c === '+' && next === '+') && !(c === '-' && next === '-'); i++;
    }
    return null;
  }
  function template(start) {
    const parts = []; let from = start + 1;
    for (let i = from; i < source.length; i++) {
      if (source[i] === '\\') { i++; continue; }
      if (source[i] === '`') { parts.push({text:source.slice(from,i)}); return {end:i+1,parts}; }
      if (source[i] === '$' && source[i+1] === '{') {
        const end = expressionEnd(i+2); if (end === null) return null;
        parts.push({text:source.slice(from,i)},{expression:source.slice(i,end+1)}); i = end; from = end+1;
      }
    }
    return null;
  }
  function decode(raw) {
    let value = '';
    for (let i=0;i<raw.length;i++) {
      if (raw[i] !== '\\') { value += raw[i]; continue; }
      const c=raw[++i]; if(c===undefined)return null;
      if(c==='\n')continue;if(c==='\r'){if(raw[i+1]==='\n')i++;continue;}
      const escapes={n:'\n',r:'\r',t:'\t',b:'\b',f:'\f',v:'\v','0':'\0'};
      if(Object.hasOwn(escapes,c)){if(c==='0'&&/[0-9]/.test(raw[i+1]||''))return null;value+=escapes[c];continue;}
      if(c==='x'){const hex=raw.slice(i+1,i+3);if(!/^[\da-f]{2}$/i.test(hex))return null;value+=String.fromCharCode(parseInt(hex,16));i+=2;continue;}
      if(c==='u'){
        if(raw[i+1]==='{'){const end=raw.indexOf('}',i+2),hex=raw.slice(i+2,end);if(end<0||!/^\p{ASCII_Hex_Digit}{1,6}$/u.test(hex)||parseInt(hex,16)>0x10ffff)return null;value+=String.fromCodePoint(parseInt(hex,16));i=end;}
        else{const hex=raw.slice(i+1,i+5);if(!/^[\da-f]{4}$/i.test(hex))return null;value+=String.fromCharCode(parseInt(hex,16));i+=4;}continue;
      }
      if(/[1-9]/.test(c))return null; // Do not reinterpret legacy octal escapes.
      value+=c;
    }
    return value;
  }
  function looksLikeCss(text) {
    const clean=text.replace(/^(?:\s|\/\*[\s\S]*?\*\/)+/g,'');
    if(!/^(?:@(?:font-face|media|supports|keyframes|layer|container|property)\b|:host\b|[.#][\w-]|\*(?:[\s:{.#[]|$)|(?:html|body|button|input|textarea|select|svg)(?=[\s:{.#[]))/i.test(clean)&&!(identity&&clean.startsWith(sourceTag)&&/^[\s:{.#[]/.test(clean.slice(sourceTag.length))))return false;
    return /\{[^{}]*[\w-]\s*:\s*[^{}]+/.test(clean);
  }
  const encodeTemplate=text=>text.replace(/\\/g,'\\\\').replace(/`/g,'\\`').replace(/\$\{/g,'\\${');
  function transformLiteral(start,end,parts) {
    const quote=source[start], masks=[];let css='';
    if(parts){
      for(let index=0;index<parts.length;index++){
        const part=parts[index];
        if(part.expression){
          let number=masks.length;while(source.includes(`--sl-interpolation-${number}`)||masks.some(m=>m.number===number))number++;
          // A bare var(...) followed by px is invalid CSS. Keep the unit inside
          // the reversible placeholder so parsing cannot discard the declaration.
          const next=parts[index+1],unit=next?.text?.match(/^(?:px|rem|em|vh|vw|svh|svw|dvh|dvw|vmin|vmax|ch|ex|cm|mm|in|pt|pc|q|deg|rad|grad|turn|ms|s|%)(?![\w-])/i)?.[0]||'';
          if(unit)next.text=next.text.slice(unit.length);
          const marker=`var(--sl-interpolation-${number})`;masks.push({number,marker,original:part.expression+unit});css+=marker;
        }else{const value=decode(part.text);if(value===null)return;css+=value;}
      }
    }else{css=decode(source.slice(start+1,end-1));if(css===null)return;}
    if(!looksLikeCss(css))return;
    let transformed;try{transformed=transformCss(css);}catch(error){if(identity)throw error;return;}
    if(typeof transformed!=='string'||transformed===css)return;
    for(const mask of masks){const occurrences=transformed.split(mask.marker).length-1;if(occurrences!==1)return;}
    let replacement;
    if(quote==='`'){
      const pattern=masks.length?new RegExp(masks.map(m=>m.marker.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')).join('|'),'g'):null;
      let position=0;replacement='`';
      if(pattern)for(const match of transformed.matchAll(pattern)){replacement+=encodeTemplate(transformed.slice(position,match.index))+masks.find(m=>m.marker===match[0]).original;position=match.index+match[0].length;}
      replacement+=encodeTemplate(transformed.slice(position))+'`';
    }else replacement=JSON.stringify(transformed).replace(/\u2028/g,'\\u2028').replace(/\u2029/g,'\\u2029');
    edits.push({start,end,replacement});
  }
  let canRegex=true;
  for(let i=0;i<source.length;){
    const c=source[i],next=source[i+1];
    if(/\s/.test(c)){i++;continue;}
    if(c==='/'&&next==='/'){const end=source.indexOf('\n',i+2);i=end<0?source.length:end;continue;}
    if(c==='/'&&next==='*'){const end=source.indexOf('*/',i+2);if(end<0)break;i=end+2;continue;}
    if(c==='"'||c==="'"){
      const end=quoted(i);if(!end){if(identity)throw Error('Unclosed JavaScript string in export.');break;}
      const method=identity&&reference(),value=method&&decode(source.slice(i+1,end-1));
      if(method&&(value===sourceTag||value===exportTag)){references[method]++;if(value===sourceTag)edits.push({start:i,end,replacement:c+exportTag+c});}
      else transformLiteral(i,end);
      token('literal');i=end;canRegex=false;continue;
    }
    if(c==='`'){
      const literal=template(i);if(!literal){if(identity)throw Error('Unclosed JavaScript template in export.');break;}
      // Tagged templates can observe raw source/escape spelling, so leave them intact.
      if(canRegex)transformLiteral(i,literal.end,literal.parts);
      if(identity&&['get','define'].includes(reference()))unsupportedRegistration=true;
      i=literal.end;token('template');canRegex=false;continue;
    }
    if(c==='/'&&canRegex){i=regexEnd(i);token('regex');canRegex=false;continue;}
    if(identifier(c)){let end=i+1;while(identifier(source[end]))end++;if(identity&&['get','define'].includes(reference()))unsupportedRegistration=true;canRegex=regexKeywords.has(source.slice(i,end));token(source.slice(i,end));i=end;continue;}
    token(c);canRegex=!/[)\].]/.test(c)&&!(c==='+'&&next==='+')&&!(c==='-'&&next==='-');i++;
  }
  if(unsupportedRegistration&&Object.values(references).some(Boolean))throw Error('Dynamic source registration arguments are unsupported in exports.');
  if(identity&&Object.values(references).some(Boolean)&&Object.values(references).some(count=>count!==1))throw Error('Export source identity requires exactly one get/define/createElement registration triple.');
  let output='',position=0;for(const edit of edits){output+=source.slice(position,edit.start)+edit.replacement;position=edit.end;}return output+source.slice(position);
}
