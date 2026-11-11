(() => {
  const script = document.currentScript;
  const root = new URL('../', script.src);
  const current = new URL(location.href);
  const route = script.dataset.route || '';
  const target = new URL(route, root);
  target.search = current.search;
  target.hash = current.hash;

  if (route) {
    if (current.pathname === target.pathname + 'index.html') {
      history.replaceState(history.state, '', target);
    } else if (current.pathname !== target.pathname) {
      location.replace(target);
    }
    return;
  }

  const category = current.searchParams.get('category');
  const component = current.searchParams.get('component');
  if (current.hash === '#catalog' || category || component) {
    target.pathname += 'catalog/';
    if (target.hash === '#catalog') target.hash = '';
    for (const [oldName, newName, value] of [['category', 'cat', category], ['component', 'open', component]]) {
      target.searchParams.delete(oldName);
      if (value) target.searchParams.set(newName, value);
    }
    location.replace(target);
  } else if (current.pathname === target.pathname + 'index.html') {
    history.replaceState(history.state, '', target);
  }
})();
