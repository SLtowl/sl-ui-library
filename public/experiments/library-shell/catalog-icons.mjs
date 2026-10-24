// Project-owned, flat category silhouettes. No font glyphs or external icon fonts.
const paths={
  all:'M4 4h6v6H4z M14 4h6v6h-6z M4 14h6v6H4z M14 14h6v6h-6z',
  buttons:'M6 7h12a3 3 0 0 1 3 3v4a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-4a3 3 0 0 1 3-3Z M9 12h6',
  inputs:'M8 5H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h3 M16 5h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3 M10 4h4 M12 4v16 M10 20h4',
  selection:'M7 6h10a6 6 0 0 1 0 12H7A6 6 0 0 1 7 6Z M7 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z',
  checkboxes:'M6 3h12a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3Z M7 12l3 3 7-7',
  sliders:'M3 7h8 M16 7h5 M3 17h3 M11 17h10 M11 4v6h5V4z M6 14v6h5v-6z',
  menus:'M4 5h16 M4 12h11 M4 19h16 M18 10l3 2-3 2',
  navigation:'M3 5h18v14H3z M3 10h18 M8 5v5 M13 5v5',
  overlays:'M9 4h12v12H9z M5 8H3v13h13v-2',
  feedback:'M6 4h12a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3h-7l-5 3v-3a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3Z M8 9h8 M8 13h5',
  'data-display':'M4 3v18h17 M8 16v-4 M13 16V8 M18 16V5'
};
export function categoryIcon(category){
  const ns='http://www.w3.org/2000/svg',svg=document.createElementNS(ns,'svg'),path=document.createElementNS(ns,'path');
  svg.setAttribute('viewBox','0 0 24 24');svg.setAttribute('aria-hidden','true');svg.setAttribute('focusable','false');
  path.setAttribute('d',paths[category]||paths.all);svg.append(path);return svg;
}
