// Pass items, as strings or { name, tag }, or search(query, { signal }) for server results. suggest fills the list before typing. onPick(item) runs when a result is chosen.
SLSearch.mount(document.querySelector('.pb-search'), {
  // Ask your server; return strings or { name, tag }.
  search: async (query, { signal }) => (await fetch('/api/search?q=' + encodeURIComponent(query), { signal })).json(),
  onPick: item => location.assign('/components/' + encodeURIComponent(item.name)),
});
