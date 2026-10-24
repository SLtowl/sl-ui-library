// Suggested new release-tools/compositions module. Coordinator owns integration.
const ids={files:'inputs-compositions-files-v11',wizard:'inputs-compositions-wizard-v11',search:'inputs-compositions-search-v11',newsletter:'inputs-compositions-newsletter-v11',login:'inputs-next-twenty-login-v11',contact:'inputs-next-twenty-contact-v11',booking:'inputs-next-twenty-booking-v11',promo:'inputs-next-twenty-promo-v11'};
const next=new Set([ids.login,ids.contact,ids.booking,ids.promo]);
const variant=tag=>tag.replace(/^sl-source-/,'');
function once(source,from,to){if(!source.includes(from)||source.indexOf(from)!==source.lastIndexOf(from))throw Error('Unexpected Inputs composition source grammar: '+from);return source.replace(from,to);}
export function prepareInputsComposition(path,source,tag){
 const id=variant(tag);
 // Apply before translateSource; these snippets are from the archived original renderer.
 if(path==='library-compositions-ru/essentials.js'&&id===ids.files)source=once(source,'.sl-remove-file{font-size:13px;min-height:32px;padding:5px 10px}','.sl-remove-file{display:none}');
 if(path==='library-compositions-ru/essentials.js'&&id===ids.wizard)source=once(source,'panes.forEach((pane,i)=>{pane.hidden=i!==step;});','panes.forEach((pane,i)=>{pane.hidden=false;pane.dataset.active=String(i===step);pane.inert=i!==step;pane.setAttribute("aria-hidden",String(i!==step));});');
 if(path==='library-compositions-ru/popular.js'&&id===ids.search)source=once(source,"const input=source('search-input',{options:","const input=source('search-input',{css:'.sl-field__helper{position:absolute;width:1px;height:1px;min-height:0;margin:-1px;padding:0;overflow:hidden;clip-path:inset(50%);white-space:nowrap}',options:");
 if(path==='library-compositions-ru/popular.js'&&id===ids.newsletter)source=once(source,"email=field('email-input','Ваш адрес')","email=field('email-input','Email')");
 if(path==='library-next-twenty-ru/forms.js'&&id===ids.login){
  source=once(source,"t.swap(body,()=>{password.hidden=recovery;hint.hidden=!recovery;});", "setMode();");
  source=once(source,'hint.hidden=true;',`hint.hidden=false;
    const passwordRegion=t.el('div','auth-reveal'),passwordInner=t.el('div','auth-reveal-inner'),hintRegion=t.el('div','auth-reveal'),hintInner=t.el('div','auth-reveal-inner');
    passwordInner.append(password);passwordRegion.append(passwordInner);hintInner.append(hint);hintRegion.append(hintInner);
    function setMode(){for(const [region,open] of [[passwordRegion,!recovery],[hintRegion,recovery]]){region.dataset.open=String(open);region.inert=!open;region.setAttribute('aria-hidden',String(!open));}}
    setMode();`);
  source=once(source,'body.append(email,password,hint);','body.append(email,passwordRegion,hintRegion);');
 }
 if(path==='library-next-twenty-ru/ui.js'&&next.has(id))source=once(source,"node.append(...children);return node;}\nexport function actions", "node.append(...children);children.filter(child=>child.classList?.contains('action-normal')).forEach(child=>{const css=document.createElement('style');css.textContent=':host{--sl-input-action:1}.bk-button .bk-surface{border:1px solid var(--sl-action-edge,#454545)}';child.shadowRoot.append(css);});return node;}\nexport function actions");
 if(path==='library-next-twenty-ru/forms.js'&&id===ids.booking){
  source=once(source,"t.swap(summary,()=>summary.replaceChildren(pair(t,'День',dates[Number(date)]),pair(t,'Начало',time),pair(t,'Длительность','30 минут')));", "if(!summary.children.length)summary.append(pair(t,'День',dates[Number(date)]),pair(t,'Начало',time),pair(t,'Длительность','30 минут'));else{const values=summary.querySelectorAll('strong');values[0].textContent=dates[Number(date)];values[1].textContent=time;}");
  source=once(source,"function drawSlots(){slotWrap.firstElementChild?.dispose?.();const slots=choices(t,'Время встречи',availability[date].map(x=>[x,x,busy[date].includes(x)]),time,value=>{time=value;updateSummary();});slots.node.classList.add('slot-grid');slotWrap.replaceChildren(slots.node);}", "let slots;function drawSlots(){if(!slots){slots=choices(t,'Время встречи',availability[date].map((x,i)=>[String(i),x,busy[date].includes(x)]),String(availability[date].indexOf(time)),value=>{time=availability[date][Number(value)];updateSummary();});slots.node.classList.add('slot-grid');slotWrap.append(slots.node);}else{[...slots.node.querySelectorAll(':scope>.source-action')].forEach((host,i)=>{host.label.textContent=availability[date][i];host.button.disabled=busy[date].includes(availability[date][i]);});slots.set(String(availability[date].indexOf(time)));}}");
  source=once(source,'t.swap(slotWrap,drawSlots);updateSummary();','drawSlots();updateSummary();');
 }
 if(path==='library-next-twenty-ru/commerce.js'&&id===ids.promo)source=once(source,"t.swap(summary,()=>summary.replaceChildren(pair(t,'Сумма товаров',rub(3000)),pair(t,'Скидка',applied?`−${rub(300)}`:rub(0)),pair(t,'Итого',rub(applied?2700:3000))));", "if(!summary.children.length)summary.append(pair(t,'Сумма товаров',rub(3000)),pair(t,'Скидка',rub(0)),pair(t,'Итого',rub(3000)));const values=summary.querySelectorAll('strong');values[1].textContent=applied?`−${rub(300)}`:rub(0);values[2].textContent=rub(applied?2700:3000);");
 return source;
}
export function prepareInputsToolkit(source,tag){
 const id=variant(tag);
 if(id===ids.wizard)source=once(source,"[{height:from+'px',opacity:Math.min(Number(opacity),.88)},{height:to+'px',opacity:1}]:[{opacity:Math.min(Number(opacity),.88)},{opacity:1}]", "[{height:from+'px'},{height:to+'px'}]:[{opacity:1},{opacity:1}]");
 if(id===ids.promo)source=once(source,'enter(node){const opacity=running.has(node)?getComputedStyle(node).opacity:0;','enter(node){const opacity=getComputedStyle(node).opacity;');
 return source;
}
export function inputsCompositionCss(tag){
 const id=variant(tag);
 if(id===ids.login)return '\n.sl-component .next-panel>.source-action.action-normal{box-shadow:none}.sl-component [data-component="login"] .auth-body{gap:0}.sl-component [data-component="login"] .auth-reveal{display:grid;grid-template-rows:0fr;opacity:0;transition:grid-template-rows 300ms cubic-bezier(.22,1,.36,1),opacity 300ms cubic-bezier(.22,1,.36,1)}.sl-component [data-component="login"] .auth-reveal[data-open="true"]{grid-template-rows:1fr;opacity:1}.sl-component [data-component="login"] .auth-reveal-inner{min-height:0;overflow:hidden}.sl-component [data-component="login"] .auth-reveal-inner>sl-source-inputs-next-twenty-login-v11,.sl-component [data-component="login"] .auth-reveal-inner>.auth-foot{margin:12px 0 0}.sl-component [data-component="login"] .auth-reveal[data-open="true"]>.auth-reveal-inner{overflow:clip;overflow-clip-margin:4px}@media(prefers-reduced-motion:reduce){.sl-component [data-component="login"] .auth-reveal{transition:none}}';
 if(id===ids.search)return '\n.sl-component [data-component="search"] .search-results{min-height:0;margin-top:12px}';
 if(id===ids.wizard)return '\n.sl-component [data-component="wizard"] .wizard-body{position:relative;border-radius:13px;overflow:clip;overflow-clip-margin:4px}.sl-component [data-component="wizard"] .wizard-body>div{position:absolute;inset:0;min-width:0;opacity:0;visibility:hidden;transform:translateY(4px);transition:opacity 200ms var(--ease),transform 300ms var(--ease),visibility 0s 200ms}.sl-component [data-component="wizard"] .wizard-body>div[data-active="true"]{position:relative;inset:auto;opacity:1;visibility:visible;transform:translateY(0);transition-delay:0s}@media(prefers-reduced-motion:reduce){.sl-component [data-component="wizard"] .wizard-body>div{transition:none;transform:none}}';
 if(next.has(id))return '\n.sl-component .next-panel>.source-action.action-normal{box-shadow:none}';
 return '';
}
export function inputsSignatureCss(entry){return entry?.variants?.[0]==='inputs-daily-controls-signature-v11'?'\n.daily-control>.dc-quiet.dc-button{margin-top:16px;padding-inline:16px;background:var(--dc-action);border-color:var(--dc-edge);color:var(--dc-text);box-shadow:inset 0 1px #ffffff09}.daily-control>.dc-quiet.dc-button:disabled{opacity:.72}':'';}
