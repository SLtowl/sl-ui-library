import { categories, components, categoryFor, filterComponents } from './catalog-data.js';

const icons = {
  buttons: '<rect x="7" y="17" width="50" height="30" rx="10"/><path d="M23 32h18"/>',
  inputs: '<rect x="6" y="16" width="52" height="32" rx="8"/><path d="M17 32h12m6-11v22m-4-22h8m-8 22h8"/>',
  selection: '<rect x="7" y="18" width="50" height="28" rx="14"/><circle cx="23" cy="32" r="8"/>',
  checkboxes: '<rect x="13" y="13" width="38" height="38" rx="10"/><path d="m23 32 7 7 13-15"/>',
  sliders: '<path d="M8 22h14m12 0h22M8 42h28m12 0h8"/><circle cx="28" cy="22" r="6"/><circle cx="42" cy="42" r="6"/>',
  menus: '<rect x="10" y="10" width="44" height="44" rx="9"/><path d="M20 22h24M20 32h24M20 42h15"/>',
  navigation: '<rect x="7" y="12" width="50" height="40" rx="8"/><path d="M7 27h50M17 20h9m8 0h5m6 0h3"/>',
  overlays: '<rect x="18" y="20" width="38" height="32" rx="8"/><path d="M12 42H9a4 4 0 0 1-4-4V12a4 4 0 0 1 4-4h34a4 4 0 0 1 4 4v2M28 31h18m-18 9h10"/>',
  feedback: '<rect x="6" y="14" width="52" height="36" rx="10"/><circle cx="20" cy="32" r="5"/><path d="M33 27h14m-14 10h9"/>',
  'data-display': '<rect x="7" y="12" width="50" height="40" rx="7"/><path d="M7 26h50M7 39h50M24 12v40"/>',
};
function icon(id) {
  return '<svg viewBox="0 0 64 64" fill="none" aria-hidden="true">' + icons[id] + '</svg>';
}

export function mountCatalog(root, url) {
const lifecycle = new AbortController();
root.querySelector('#close-usage').addEventListener('click', () => root.querySelector('#usage-dialog').close());
if (root.dataset.page === 'home') {
    const tiles = root.querySelector('#category-tiles');
    for (const category of categories) {
      const link = document.createElement('a');
      link.className = 'category-tile';
      link.href = './category.html?type=' + category.id;
      link.dataset.category = category.id;
      const mark = document.createElement('span');
      mark.className = 'tile-icon';
      mark.innerHTML = icon(category.id);
      const name = document.createElement('span');
      name.className = 'tile-name';
      name.textContent = category.label;
      link.append(mark, name);
      tiles.append(link);
    }
} else {
  initCategory();
}

function initCategory() {
  const search = root.querySelector('#component-search');
  const clearSearch = root.querySelector('#clear-search');
  const grid = root.querySelector('#component-grid');
  const empty = root.querySelector('#catalog-empty');
  const count = root.querySelector('#result-count');
  const status = root.querySelector('#catalog-status');
  const searchForm = root.querySelector('.catalog-search');
  const searchToggle = root.querySelector('#search-toggle');
  const searchField = root.querySelector('#search-field');
  let category;
  let type;

  function setSearchOpen(open, focus = false) {
    searchForm.classList.toggle('is-open', open);
    searchToggle.setAttribute('aria-expanded', String(open));
    searchToggle.setAttribute('aria-label', open ? 'Close search' : 'Search components');
    searchToggle.title = open ? 'Close search' : 'Search components';
    searchField.inert = !open;
    if (focus) (open ? search : searchToggle).focus({ preventScroll: true });
  }

  function readLocation() {
    const params = url.searchParams;
    category = params.get('type') || '';
    type = categoryFor(category);
    search.value = (params.get('q') || '').slice(0, 160);
    root.dataset.title = (type ? type.label : 'Category not found') + ' · SL UI Library';
    root.querySelector('#category-heading').textContent = type ? type.label : 'Category not found';
    root.querySelector('#category-description').textContent = type ? type.description : 'Choose a component type from the library.';
    searchForm.hidden = !type || !components.some(component => component.category === category);
    setSearchOpen(Boolean(search.value) && !searchForm.hidden);
  }
  function updateLocation() {
    const params = new URLSearchParams({ type: category });
    if (search.value.trim()) params.set('q', search.value.trim());
    history.replaceState(history.state, '', location.pathname + '?' + params);
  }

  function createCard(component) {
    const article = document.createElement('article');
    article.className = 'component-card';
    article.dataset.component = component.id;
    const details = document.createElement('div');
    details.className = 'card-details';
    const text = document.createElement('div');
    const title = document.createElement('h2');
    const link = document.createElement('a');
    link.href = component.page;
    link.textContent = component.name;
    title.append(link);
    const motion = document.createElement('p');
    motion.className = 'card-motion';
    motion.textContent = component.motions.join(' · ');
    text.append(title, motion);
    const open = document.createElement('a');
    open.href = component.page;
    open.className = 'surface-button card-open';
    open.textContent = 'View code';
    open.setAttribute('aria-label', 'Open ' + component.name + ' code and downloads');
    details.append(text, open);
    const preview = document.createElement('div');
    preview.className = 'card-preview';
    const frame = document.createElement('sl-preview');
    frame.setAttribute('variant', component.variants[0]);
    frame.setAttribute('role', 'group');
    frame.setAttribute('aria-label', component.name + ' interactive preview');
    const reset = document.createElement('button');
    reset.type = 'button';
    reset.className = 'card-reset';
    reset.setAttribute('aria-label', 'Reset ' + component.name + ' preview');
    reset.innerHTML = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M20 8a9 9 0 1 0 1 7M20 3v5h-5"/></svg>';
    reset.addEventListener('click', () => {
      frame.reset();
      status.textContent = component.name + ' preview reset.';
    });
    preview.append(frame, reset);
    article.append(details, preview);
    return article;
  }

  const cards = new Map();

  function render() {
    const query = search.value.trim();
    const results = type ? filterComponents(category, query) : [];
    const resultIds = new Set(results.map(component => component.id));
    clearSearch.hidden = !search.value;
    count.textContent = results.length + (results.length === 1 ? ' component' : ' components');
    for (const [id, card] of cards) {
      if (!resultIds.has(id)) card.remove();
    }
    for (const component of results) {
      if (!cards.has(component.id)) cards.set(component.id, createCard(component));
      const card = cards.get(component.id);
      if (card.parentElement !== grid) grid.append(card);
    }
    grid.hidden = results.length === 0;
    empty.hidden = results.length !== 0;
    if (!results.length) {
      const hasComponents = type && components.some(component => component.category === category);
      const noMatch = Boolean(query && hasComponents);
      root.querySelector('#empty-title').textContent = noMatch ? 'No matching components' : type ? 'Nothing added yet' : 'Let’s find the right category';
      root.querySelector('#empty-description').textContent = noMatch
        ? 'Try another name or motion, or clear your search.'
        : type ? 'New components in this category will appear here with their preview, code and download.' : 'Return to the home page to choose a component type.';
      root.querySelector('#clear-search-empty').hidden = !noMatch;
      root.querySelector('#empty-back').hidden = noMatch;
    }
    status.textContent = count.textContent + (type ? ' in ' + type.label : '') + (query ? ' matching your search.' : '.');
  }

  search.addEventListener('input', () => { updateLocation(); render(); });
  searchForm.addEventListener('submit', event => event.preventDefault());
  searchToggle.addEventListener('click', () => {
    const open = !searchForm.classList.contains('is-open');
    if (!open && search.value) { search.value = ''; updateLocation(); render(); }
    setSearchOpen(open, true);
  });
  searchForm.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    event.preventDefault();
    event.stopPropagation();
    if (search.value) resetSearch();
    else setSearchOpen(false, true);
  });
  searchForm.addEventListener('focusout', event => {
    if (!search.value && !searchForm.contains(event.relatedTarget)) setSearchOpen(false);
  });
  document.addEventListener('pointerdown', event => {
    if (!search.value && !searchForm.contains(event.target)) setSearchOpen(false);
  }, { signal: lifecycle.signal });
  function resetSearch() { search.value = ''; updateLocation(); render(); setSearchOpen(true, true); }
  clearSearch.addEventListener('click', resetSearch);
  root.querySelector('#clear-search-empty').addEventListener('click', resetSearch);
  readLocation();
  render();
}
return { ready: Promise.resolve(), destroy() { lifecycle.abort(); } };
}
