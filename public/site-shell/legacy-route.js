// Preserve existing catalog bookmarks and keep the homepage URL canonical.
(() => {
  const current = new URL(location.href);
  const category = current.searchParams.get('category');
  const component = current.searchParams.get('component');
  if (current.hash !== '#catalog' && !category && !component) {
    if (current.pathname.endsWith('/index.html')) {
      current.pathname = current.pathname.slice(0, -'index.html'.length);
      history.replaceState(history.state, '', current.href);
    }
    return;
  }
  const target = new URL('./catalog.html', current);
  for (const [key, value] of [['cat', category], ['open', component], ['q', current.searchParams.get('q')]]) {
    if (value) target.searchParams.set(key, value);
  }
  location.replace(target.href);
})();
