import { previews } from './preview-data.js?v=instant-4';

const layout = `
  :host, * { scrollbar-width: none !important; }
  :host::-webkit-scrollbar, *::-webkit-scrollbar { display: none; }
  :host { display: block; position: relative; width: 100%; height: 100%; container-type: inline-size; color: #202222; color-scheme: light; font-family: 'Instrument Sans', sans-serif; }
  :host([variant="share"]) { container-type: size; }
  .stage { position: absolute; inset: 0; display: grid; place-content: center; }
  :host([data-preview-sizing="content"]) { height: auto; }
  :host([data-preview-sizing="content"]) .stage { position: relative; inset: auto; min-height: inherit; padding-block: 16px; box-sizing: border-box; }
  .stage > .sl-toggle { width: min(320px, calc(100cqw - 40px)); }
  .stage > .sl-check-card { width: min(320px, calc(100cqw - 40px)); }
  .stage > .sl-slider { width: min(320px, calc(100cqw - 40px)); }
  .stage > .menu-demo { width: min(288px, calc(100cqw - 40px)); }
  .stage > .nav-demo { width: min(320px, calc(100cqw - 32px)); }
  .stage > .fb-demo { width: min(320px, calc(100cqw - 32px)); }
  .stage > .dd-demo { width: min(320px, calc(100cqw - 32px)); }
  .stage > .sl-component { width: min(320px, calc(100cqw - 32px)); min-width: 0; }
  .overlay-idle { position:absolute; inset:0; }
  .overlay-idle > .overlay-demo { min-height:100%; height:100%; width:100%; }
  .stage > .mixer-group { width: min(320px, calc(100cqw - 40px)); }
  .stage > .sl-slider--vertical { width: min(178px, calc(100cqw - 40px)); }
  :is(.stage--text-input, .stage--search-input, .stage--email-input, .stage--password-input, .stage--number-input, .stage--textarea-input, .stage--url-input, .stage--phone-input, .stage--amount-input, .stage--code-input) > .sl-field { width: min(300px, calc(100cqw - 48px)); }
  [hidden] { display: none !important; }
  .copy-feedback, .like-feedback, .download-feedback, .bookmark-feedback, .playback-feedback, .delete-feedback, .upload-feedback, .share-feedback, .follow-feedback { position: absolute; bottom: 14px; inset-inline: 16px; margin: 0; color: #515555; font: 12px/1.5 'Instrument Sans', sans-serif; text-align: center; }
  @container (min-width: 480px) {
    .button-kit { --unit: 2px; }
    .sl-copy { --copy-unit: 2px; }
    .sl-like { --like-unit: 2px; }
    .sl-download { --download-unit: 2px; }
    .sl-bookmark { --bookmark-unit: 2px; }
    .sl-playback { --playback-unit: 2px; }
    .sl-upload { --upload-unit: 2px; }
    .sl-follow { --follow-unit: 2px; }
  }
  @container (min-width: 512px) { .sl-delete { --delete-unit: 2px; } }
  @container (min-width: 480px) and (min-height: 350px) { .sl-share-control { --share-unit: 2px; } }
  @container (max-height: 349px) { .sl-share__popover { bottom: calc(100% + 6px); padding: 10px; } }
`;
// The catalogue owns the stage paint. Keep native dialog modality and authored
// scrolling inside its isolated viewport without painting a second rectangle.
const framePresentation = `
  html, body { background: transparent !important; }
  .overlay-panel::backdrop { background: transparent !important; }
  * { scrollbar-width: none !important; }
  *::-webkit-scrollbar { display: none; }
  @media (max-height: 350px) {
    .overlay-panel { box-shadow: inset 0 1px #ffffff09, 0 3px 8px #1d1d1d24 !important; }
  }
`;
const sheets = new Map();
// Intrinsic flow owns height. Observation only repairs focus-induced shell scroll;
// source reflow must never wait for an observer or a later animation frame.
const sizingOwners = new WeakMap();
function contentSizing(host, element) {
  const card = host.closest('.card-preview');
  const panel = host.closest('.preview-panel');
  const owner = card || panel?.closest('.workbench-body');
  const token = {};
  const wrappers = [card, panel, panel?.closest('.workbench')].filter(Boolean);
  let disposed = false, frame = 0;
  if (owner) sizingOwners.set(owner, token);
  const measure = () => {
    frame = 0;
    if (disposed || !host.isConnected || !element.isConnected || host.shadowRoot.querySelector('.stage > .sl-component') !== element || (owner && sizingOwners.get(owner) !== token)) return;
    // Focus can scroll overflow:hidden presentation ancestors before RO delivers.
    // Only these owned shells are repaired; intentional component scrollers stay put.
    for (const wrapper of wrappers) {
      if (/^(hidden|clip)$/.test(getComputedStyle(wrapper).overflowY) && wrapper.scrollTop) wrapper.scrollTop = 0;
    }
  };
  const schedule = () => { if (!disposed && !frame) frame = requestAnimationFrame(measure); };
  const observer = new ResizeObserver(schedule);
  observer.observe(element);
  observer.observe(host);
  host.shadowRoot.addEventListener('focusin', schedule);
  measure();
  return () => {
    disposed = true;
    observer.disconnect();
    cancelAnimationFrame(frame);
    host.shadowRoot.removeEventListener('focusin', schedule);
    if (owner && sizingOwners.get(owner) === token) {
      sizingOwners.delete(owner);
    }
  };
}
function stylesheet(css) {
  if (!sheets.has(css)) { const sheet = new CSSStyleSheet(); sheet.replaceSync(css + layout); sheets.set(css, sheet); }
  return sheets.get(css);
}
function simulatedSave({ signal }) {
  return new Promise((resolve, reject) => {
    if (signal.aborted) { reject(new DOMException('Cancelled', 'AbortError')); return; }
    const abort = () => { clearTimeout(timer); reject(new DOMException('Cancelled', 'AbortError')); };
    const timer = setTimeout(() => { signal.removeEventListener('abort', abort); resolve(); }, 1900);
    signal.addEventListener('abort', abort, { once: true });
  });
}
// Explicit local demos: these resolve after a cancelable wait and change no data.
function demoWait(signal, duration) {
  return new Promise((resolve, reject) => {
    if (signal.aborted) { reject(new DOMException('Canceled', 'AbortError')); return; }
    const abort = () => { clearTimeout(timer); reject(new DOMException('Canceled', 'AbortError')); };
    const timer = setTimeout(() => { signal.removeEventListener('abort', abort); resolve(); }, duration);
    signal.addEventListener('abort', abort, { once: true });
  });
}
class Preview extends HTMLElement {
  static observedAttributes = ['variant'];
  constructor() { super(); this.attachShadow({ mode: 'open' }); }
  connectedCallback() { this.render(); }
  disconnectedCallback() { this.stopSizing?.(); this.stopSizing = null; this.controller?.destroy(); this.controller = null; }
  attributeChangedCallback() { if (this.isConnected) this.render(); }
  reset() { if (/-(overlay|navigation|feedback|display)$/.test(this.currentVariant) && this.controller?.reset) this.controller.reset(); else this.render(true); }
  render(force = false) {
    const variant = this.getAttribute('variant') || 'pair';
    if (!force && this.controller && this.currentVariant === variant) return;
    const definition = previews[variant];
    this.stopSizing?.();
    this.stopSizing = null;
    this.controller?.destroy();
    this.controller = null;
    this.currentVariant = variant;
    delete this.dataset.ready;
    delete this.dataset.previewSizing;
    delete this.dataset.error;
    if (!definition) { this.shadowRoot.textContent = 'Preview unavailable.'; return; }
    const root = this.shadowRoot;
    if (definition.frameMount) {
      // The real launch control is part of this document's first paint, like Menus.
      // Only the opened overlay needs the isolated native-dialog viewport.
      root.innerHTML = `<div class="overlay-idle">${definition.markup}</div>`;
      if ('adoptedStyleSheets' in root && 'replaceSync' in CSSStyleSheet.prototype) root.adoptedStyleSheets = [stylesheet(definition.css)];
      else { const style = document.createElement('style');style.textContent=definition.css+layout;root.prepend(style); }
      const idle = root.querySelector('.overlay-idle'), proxy = idle.querySelector('[data-trigger]');
      idle.querySelector('.overlay-panel').remove();
      const iframe = document.createElement('iframe');
      iframe.title = this.getAttribute('aria-label') || variant + ' interactive preview';
      iframe.style.cssText = 'display:block;position:absolute;inset:0;width:100%;height:100%;border:0;visibility:hidden;pointer-events:none;';
      iframe.inert=true;iframe.tabIndex=-1;iframe.setAttribute('aria-hidden','true');
      let controller = null, mountedDocument = null, disposed = false, pending = [];
      const activate = (kind) => {
        if (disposed) return;
        if (!controller) { pending.push(kind);return; }
        if(kind==='hover'&&!proxy.matches(':hover'))return;
        if(kind==='focus'&&root.activeElement!==proxy)return;
        idle.hidden=true;iframe.style.visibility='visible';iframe.style.pointerEvents='auto';iframe.inert=false;iframe.removeAttribute('aria-hidden');iframe.removeAttribute('tabindex');
        const trigger=iframe.contentDocument.querySelector('[data-trigger]');
        if(kind!=='hover'){iframe.contentWindow.focus();trigger.focus({preventScroll:true});}
        if(kind==='click')trigger.click();else controller.open();
      };
      proxy.addEventListener('click',()=>activate('click'));
      if(variant==='tooltip-overlay'){
        proxy.addEventListener('pointerenter',e=>{if(e.pointerType!=='touch')activate('hover');});
        proxy.addEventListener('focus',()=>activate('focus'));
      }
      iframe.addEventListener('load', () => {
        if (disposed || !this.isConnected || iframe.parentNode !== root) return;
        const doc = iframe.contentDocument;
        if (!doc?.querySelector('.nav-demo,.overlay-demo') || mountedDocument === doc) return;
        // Font sharing is only an optimization, never a prerequisite for rendering.
        let shared = false;
        try {
          for (const face of document.fonts) if (face.family.replaceAll('"','').replaceAll("'",'') === 'Instrument Sans') { doc.fonts.add(face); shared = true; }
        } catch { /* Some embedded browsers cannot transfer a FontFace between documents. */ }
        if (!shared) {
          const font = doc.createElement('style');
          font.textContent = `@font-face{font-family:'Instrument Sans';src:url('${new URL('./assets/instrument-sans-variable.woff2',import.meta.url).href}') format('woff2');font-weight:400 700;font-display:swap}`;
          doc.head.append(font);
        }
        controller = definition.frameMount(doc, iframe.contentWindow);
        mountedDocument = doc;
        this.dataset.ready = 'true';
        const actions=pending;pending=[];actions.forEach(activate);
      });
      // A complete srcdoc survives initial iframe navigation; no document.write race.
      iframe.srcdoc = '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>'+definition.css.replace(/<\/style/gi,'<\\/style')+'</style><style data-preview-presentation>'+framePresentation+'</style></head><body>'+definition.markup+'</body></html>';
      this.controller = { reset() { pending=[];controller?.reset(); }, destroy() { disposed = true;pending=[];controller?.destroy();iframe.remove(); } };
      root.append(iframe);
      return;
    }
    root.innerHTML = `<div class="stage stage--${variant}">${definition.markup}</div>`;
    if ('adoptedStyleSheets' in root && 'replaceSync' in CSSStyleSheet.prototype) root.adoptedStyleSheets = [stylesheet(definition.css)];
    else { const style = document.createElement('style'); style.textContent = definition.css + layout; root.prepend(style); }
    if (definition.rootSelector) {
      const element = root.querySelector(definition.rootSelector);
      this.controller = (definition.demoMount || definition.mount)(element);
    } else if (['pair', 'save', 'cancel'].includes(variant)) {
      this.controller = definition.mount(root.querySelector('.button-kit'), { onSave: simulatedSave, onCancel: () => {}, previewDuration: 1900 });
    } else if (variant === 'copy') {
      this.controller = definition.mount(root.querySelector('.sl-copy'), { getText: () => 'SL UI Library', feedback: root.querySelector('.copy-feedback') });
    } else if (variant === 'download') {
      this.controller = definition.demoMount(root.querySelector('.sl-download'), { feedback: root.querySelector('.download-feedback') });
    } else if (variant === 'delete') {
      const feedback = root.querySelector('.delete-feedback');
      feedback.textContent = 'Demo only. Nothing is deleted.';
      const prefix = document.createTextNode('Demo only. ');
      const message = document.createElement('span');
      message.textContent = 'Nothing is deleted.';
      feedback.replaceChildren(prefix, message);
      this.controller = definition.mount(root.querySelector('.sl-delete'), { feedback: message, onDelete: ({ signal }) => demoWait(signal, 850) });
    } else if (variant === 'upload') {
      const feedback = root.querySelector('.upload-feedback');
      const message = document.createElement('span');
      feedback.replaceChildren(document.createTextNode('Demo only. '), message);
      this.controller = definition.demoMount(root.querySelector('.sl-upload'), { input: root.querySelector('input[type="file"]'), feedback: message });
    } else if (variant === 'share') {
      const feedback = root.querySelector('.share-feedback');
      const prefix = document.createTextNode('Demo only. ');
      const message = document.createElement('span');
      message.textContent = 'Try Copy link or Share.';
      feedback.replaceChildren(prefix, message);
      this.controller = definition.mount(root.querySelector('.sl-share-control'), {
        feedback: message, getUrl: () => 'https://example.com/article',
        onShare: async ({ signal }) => { await demoWait(signal, 800); return { label: 'Shared' }; },
      });
    } else if (variant.endsWith('-display')) {
      this.controller = definition.mount(root.querySelector('.dd-demo'));
    } else if (variant.endsWith('-feedback')) {
      this.controller = definition.demoMount(root.querySelector('.fb-demo'), definition.mount);
    } else if (variant.endsWith('-navigation')) {
      this.controller = definition.mount(root.querySelector('.nav-demo'));
    } else if (variant.endsWith('-menu')) {
      this.controller = definition.mount(root.querySelector('.menu-demo'));
    } else if (variant.endsWith('-slider')) {
      this.controller = definition.mount(root.querySelector('.mixer-group, .sl-slider'));
    } else if (variant.endsWith('-checkbox')) {
      this.controller = definition.mount(root.querySelector('.sl-check-card'));
    } else if (variant.endsWith('-toggle')) {
      this.controller = definition.mount(root.querySelector('.sl-toggle'));
    } else if (variant.endsWith('-input')) {
      const field = root.querySelector('.sl-field');
      this.controller = variant === 'search-input'
        ? definition.mount(field, { items: ['Buttons', 'Inputs', 'Toggles'] })
        : definition.mount(field);
    } else {
      this.controller = definition.mount(root.querySelector('.sl-' + variant), { feedback: root.querySelector('.' + variant + '-feedback') });
    }
    if (definition.contentSizing) {
      const element = root.querySelector('.stage > .sl-component');
      if (!element || definition.rootSelector !== '.sl-component') {
        this.controller?.destroy(); this.controller = null;
        root.textContent = 'Preview content sizing requires its source root.';
        this.dataset.error = 'content-sizing-root';
        return;
      }
      this.dataset.previewSizing = 'content';
      this.stopSizing = contentSizing(this, element);
    }
    this.dataset.ready = 'true';
  }
}
if (!customElements.get('sl-preview')) customElements.define('sl-preview', Preview);
