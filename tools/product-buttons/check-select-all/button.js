// mount(root, { onChange(selected) }) → { state, setAll(on), reset(), destroy() }
function mount(root, { onChange = () => {} } = {}) {
  root.__pb?.destroy();
  pbPrepare(root);
  const head = root.querySelector('.ck-head input'), kids = [...root.querySelectorAll('.ck-kid input')], words = [...root.querySelectorAll('.ck-count>span')], start = kids.map(kid => kid.checked);
  const read = () => kids.filter(kid => kid.checked).map(kid => kid.closest('label').textContent.trim());
  let timer;
  const paint = () => {
    const n = kids.filter(kid => kid.checked).length;
    head.checked = n === kids.length; head.indeterminate = n > 0 && n < kids.length;
    words.forEach((word, i) => word.classList.toggle('on', i === n));
  };
  const setAll = on => {
    root.classList.add('ck-cascade'); clearTimeout(timer); timer = setTimeout(() => root.classList.remove('ck-cascade'), 520);
    kids.forEach(kid => { kid.checked = on; }); paint(); onChange(read());
  };
  const off = new AbortController();
  head.addEventListener('change', () => setAll(kids.some(kid => !kid.checked)), { signal: off.signal });
  kids.forEach(kid => kid.addEventListener('change', () => { root.classList.remove('ck-cascade'); paint(); onChange(read()); }, { signal: off.signal }));
  paint();
  const api = {
    get state() { return { selected: read() }; },
    setAll,
    reset() { kids.forEach((kid, i) => { kid.checked = start[i]; }); paint(); },
    destroy() { off.abort(); clearTimeout(timer); delete root.__pb; },
  };
  root.__pb = api;
  return api;
}
// The catalog preview needs nothing extra.
const demo = {};
