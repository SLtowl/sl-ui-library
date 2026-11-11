// Shared markup for the home, catalog and docs in the local design.
const markup = `<header class="top" id="site-header">
  <a class="brand pill" href="./" aria-label="SL UI Library, home"><strong>SL UI Library</strong></a>
  <div class="tg-slot"><a class="tg" href="https://t.me/SLtowl" target="_blank" rel="noopener noreferrer" aria-label="Telegram: @SLtowl"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 4 3 11.2l6 2.3L17.5 8 11.6 15l6.2 5L21 4Z"/></svg></a><a class="tg tg-gh" href="https://github.com/SLtowl/sl-ui-library" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 19c-4 1.3-4-2-6-2.500m12 5v-3.500a3 3 0 0 0-.9-2.300c3-.3 6-1.5 6-6.500a5 5 0 0 0-1.4-3.5 4.6 4.6 0 0 0-.1-3.500s-1.1-.3-3.6 1.400a12.3 12.3 0 0 0-6.5 0C6 2.9 4.9 3.2 4.9 3.200a4.6 4.6 0 0 0-.1 3.500A5 5 0 0 0 3.4 10.200c0 5 3 6.2 6 6.500a3 3 0 0 0-.9 2.300V21.5"/></svg></a></div>
  <form class="finder pill" id="finder" role="search">
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
  </form>
  <nav class="sections pill" aria-label="Sections"><span class="sec-knob" id="secKnob" aria-hidden="true"></span><a data-view="components" href="./catalog.html">Components</a><a class="sec-link" href="./docs.html">Docs</a></nav>
</header>`;

export function mountReviewHeader({
  current = '', catalog, docs, onComponents, onDocs, catalogSearch = false
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
  if (![...document.querySelectorAll('link[rel="stylesheet"]')].some(link => link.href === searchCss)) {
    const searchStyles = document.createElement('link');
    searchStyles.rel = 'stylesheet';
    searchStyles.href = searchCss;
    document.head.append(searchStyles);
  }

  const template = document.createElement('template');
  template.innerHTML = markup;
  const header = template.content.firstElementChild;
  document.body.prepend(header);
  const components = header.querySelector('[data-view]');
  const docsLink = header.querySelector('.sec-link');
  docsLink.href = docs;
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

  if (!catalogSearch) {
    const input = header.querySelector('#q');
    const clear = header.querySelector('.sl-field__clear');
    input.setAttribute('role', 'searchbox');
    for (const attr of ['aria-autocomplete', 'aria-controls', 'aria-expanded']) {
      input.removeAttribute(attr);
    }
    input.addEventListener('input', () => { clear.hidden = !input.value; });
    clear.addEventListener('click', () => {
      input.value = '';
      clear.hidden = true;
      input.focus();
    });
    header.querySelector('#finder').addEventListener('submit', event => {
      event.preventDefault();
      const url = new URL(catalog, location.href);
      const query = input.value.trim();
      if (query) url.searchParams.set('q', query);
      location.href = url.href;
    });
  }
  return header;
}
