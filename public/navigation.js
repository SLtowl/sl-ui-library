import { views } from './view-data.js';
import { categoryFor } from './catalog-data.js';
import { mountCatalog } from './catalog.js';
import { mountComponent } from './library.js';
import './preview-runtime.js?v=instant-4';

const base = new URL('.', import.meta.url);
const routes = new Map([['', 'home'], ['index.html', 'home'], ['category.html', 'category'], ['component.html', 'component']]);
const scrollPositions = new Map();
let active;
let sequence = 0;
function routeFor(url) {
  if (url.origin !== base.origin || !url.pathname.startsWith(base.pathname)) return null;
  return routes.get(url.pathname.slice(base.pathname.length));
}
function canonical(url) {
  if (routeFor(url) === 'home' && categoryFor(url.searchParams.get('category'))) {
    const next = new URL('category.html', base);
    next.searchParams.set('type', url.searchParams.get('category'));
    if (url.searchParams.get('q')) next.searchParams.set('q', url.searchParams.get('q').slice(0, 160));
    return next;
  }
  return url;
}
function recordScroll() {
  if (active) scrollPositions.set(active.key, { x: scrollX, y: scrollY });
}
async function navigate(input, { mode = 'push', stateKey, initial = false } = {}) {
  const url = canonical(input);
  const kind = routeFor(url);
  if (!kind) return;
  const revision = ++sequence;
  recordScroll();
  const root = document.createElement('div');
  root.className = 'route-view';
  root.dataset.page = kind;
  root.dataset.title = kind === 'home' ? 'Components · SL UI Library' : 'SL UI Library';
  root.innerHTML = views[kind];
  let controller;
  try {
    controller = kind === 'component' ? mountComponent(root, url) : mountCatalog(root, url);
    await controller.ready;
    if (revision !== sequence) { controller.destroy(); return; }
  } catch (error) {
    controller?.destroy();
    console.error('Could not prepare library view.', error);
    document.querySelector('#navigation-status').textContent = 'This page could not be opened. Please try again.';
    return;
  }
  const nextKey = stateKey || crypto.randomUUID();
  if (mode === 'push') history.pushState({ slRouteKey: nextKey }, '', url.href);
  else if (mode === 'replace' || url.href !== location.href || !history.state?.slRouteKey) history.replaceState({ ...history.state, slRouteKey: nextKey }, '', url.href);
  active?.controller.destroy();
  if (active) active.root.replaceWith(root);
  else {
    const main = document.querySelector('main');
    document.querySelector('#usage-dialog')?.remove();
    main.replaceWith(root);
  }
  active = { root, controller, key: nextKey };
  document.body.dataset.page = kind;
  document.title = root.dataset.title;
  const meta = document.querySelector('meta[name="description"]');
  if (meta) meta.content = root.dataset.description || 'Browse and try components in SL UI Library.';
  const homeLink = document.querySelector('.navigation a');
  homeLink.setAttribute('aria-current', kind === 'home' ? 'page' : 'location');
  document.documentElement.dataset.navigationReady = 'true';
  document.querySelector('#navigation-status').textContent = '';
  if (!initial) {
    const restored = mode === 'pop' ? scrollPositions.get(nextKey) : null;
    root.querySelector('main').focus({ preventScroll: true });
    window.scrollTo(restored?.x || 0, restored?.y || 0);
    if (url.hash) {
      try { document.getElementById(decodeURIComponent(url.hash.slice(1)))?.scrollIntoView(); }
      catch { /* A malformed fragment must not interrupt navigation. */ }
    }
  }
}
const status = document.createElement('p');
status.id = 'navigation-status';
status.setAttribute('role', 'status');
status.className = 'visually-hidden';
document.body.append(status);

document.addEventListener('click', event => {
  if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
  const link = event.target.closest?.('a[href]');
  if (!link || link.hasAttribute('download') || (link.target && link.target !== '_self')) return;
  const url = new URL(link.href);
  if (!routeFor(url)) return;
  if (url.pathname === location.pathname && url.search === location.search && url.hash) return;
  event.preventDefault();
  void navigate(url);
});
document.querySelector('#open-usage').addEventListener('click', () => active?.root.querySelector('#usage-dialog').showModal());
window.addEventListener('popstate', event => { void navigate(new URL(location.href), { mode: 'pop', stateKey: event.state?.slRouteKey }); });
history.scrollRestoration = 'manual';
await navigate(new URL(location.href), { mode: 'replace', stateKey: history.state?.slRouteKey, initial: true });
