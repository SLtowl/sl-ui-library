// Existing catalog bookmarks still open the current catalog.
(() => {
  const current = new URL(location.href);
  const category = current.searchParams.get('category');
  const component = current.searchParams.get('component');
  if (current.hash !== '#catalog' && !category && !component) return;
  const target = new URL('./catalog.html', current);
  for (const [key, value] of [['cat', category], ['open', component], ['q', current.searchParams.get('q')]]) {
    if (value) target.searchParams.set(key, value);
  }
  location.replace(target.href);
})();
