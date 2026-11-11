import {HOME,CATALOG,DOCS} from './routes.mjs';

// Shared markup for the home, catalog and docs in the local design.
const searchMarkup = `<form class="finder pill" id="finder" role="search">
    <div class="sl-field sl-field--search" id="search-field" data-search-open="false">
      <div class="sl-field__control">
        <svg class="sl-field__leading" viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 4.5 4.5"/></svg>
        <input class="sl-field__input" id="q" type="search" placeholder=" " autocomplete="off" spellcheck="false" role="combobox" aria-autocomplete="list" aria-controls="search-options" aria-expanded="false" aria-describedby="search-help">
        <label class="sl-field__label" for="q">Find a component</label>
        <button class="sl-field__action sl-field__clear" type="button" id="clear-search" aria-label="Clear search" aria-controls="q" hidden><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg></button>
      </div>
      <div class="sl-field__popup" aria-hidden="true" inert><ul class="sl-field__options" id="search-options" role="listbox" aria-label="Component suggestions"></ul><p class="sl-field__empty" hidden>No matches. Try another word.</p></div>
      <p class="sl-field__helper sr-only" id="search-help" role="status" aria-live="polite">Search the component library.</p>
    </div>
  </form>`;

const markup = catalogSearch => `<header class="top" id="site-header">
  <a class="brand pill" href="${HOME}" aria-label="SL UI Library, home"><strong>SL UI Library</strong></a>
  <div class="tg-slot"><a class="tg" href="https://t.me/SLtowl" target="_blank" rel="noopener noreferrer" aria-label="Telegram: @SLtowl"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3.5 10.8 20.2 4.5l-3 15-5.1-4.2-3 2.7v-4.5l7.8-5.7-9.3 4.8-4.1-1.8Z"/></svg></a><a class="tg tg-gh" href="https://github.com/SLtowl/sl-ui-library" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><svg viewBox="-.5 .75 24 24" aria-hidden="true"><path d="M9 19c-3.8 1-4.1-2.4-6-2.8m12.5 5v-3.5c0-1-.3-1.7-.8-2.2 2.9-.3 5.3-1.4 5.3-5.2 0-1-.3-2-1.1-2.9.3-.8.3-1.9-.1-3.1-1.1-.3-2.8.6-3.4 1.1a13.6 13.6 0 0 0-6.8 0C8 4.9 6.3 4 5.2 4.3c-.4 1.2-.4 2.3-.1 3.1C4.3 8.3 4 9.3 4 10.3c0 3.8 2.4 4.9 5.3 5.2-.5.5-.8 1.2-.8 2.2v3.5"/></svg></a></div>
  ${catalogSearch ? searchMarkup : ''}
  <nav class="sections pill" aria-label="Sections"><span class="sec-knob" id="secKnob" aria-hidden="true"></span><a data-view="components" href="${CATALOG}">Components</a><a class="sec-link" href="${DOCS}">Docs</a></nav>
</header>`;

export function mountReviewHeader({
  current = '', onComponents, onDocs, catalogSearch = false
}) {
  let headerStyles = document.querySelector('link[data-review-header]');
  if (!headerStyles) {
    headerStyles = document.createElement('link');
    headerStyles.rel = 'stylesheet';
    headerStyles.href = new URL('./review-header.css', import.meta.url);
    headerStyles.dataset.reviewHeader = '';
    document.head.append(headerStyles);
  }
  const searchCss = new URL('../packages/search-input/buttons.css', import.meta.url).href;
  if (catalogSearch && ![...document.querySelectorAll('link[rel="stylesheet"]')].some(link => link.href === searchCss)) {
    const searchStyles = document.createElement('link');
    searchStyles.rel = 'stylesheet';
    searchStyles.href = searchCss;
    document.head.append(searchStyles);
  }

  const template = document.createElement('template');
  template.innerHTML = markup(catalogSearch);
  const header = template.content.firstElementChild;
  document.body.prepend(header);
  const components = header.querySelector('[data-view]');
  const docsLink = header.querySelector('.sec-link');
  if (current === 'Components') components.setAttribute('aria-current', 'page');
  if (current === 'Docs') docsLink.setAttribute('aria-current', 'page');
  if (onComponents) components.addEventListener('click', onComponents);
  if (onDocs) docsLink.addEventListener('click', onDocs);

  const marker = header.querySelector('.sec-knob');
  const alignMarker = () => {
    const selected = header.querySelector('.sections [aria-current]');
    marker.style.opacity = selected ? '1' : '0';
    if (!selected) return;
    marker.style.width = selected.offsetWidth + 'px';
    marker.style.transform = `translateX(${selected.offsetLeft}px)`;
  };
  document.fonts.ready.then(alignMarker);
  headerStyles.addEventListener('load', alignMarker, { once: true });
  addEventListener('resize', alignMarker, { passive: true });

  return header;
}
