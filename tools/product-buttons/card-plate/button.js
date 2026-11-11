// Network by the first digits. Mir comes before Mastercard, whose 2xxx range would otherwise claim it.
const BRANDS = [['Mir', /^220[0-4]/], ['Amex', /^3[47]/], ['Visa', /^4/], ['Mastercard', /^(5[1-5]|2[2-7])/], ['Discover', /^6(011|5)/]];
const brandOf = digits => (BRANDS.find(([, test]) => test.test(digits)) || [''])[0];
const luhn = digits => [...digits].reverse().reduce((sum, c, i) => { let n = +c; if (i % 2) { n *= 2; if (n > 9) n -= 9; } return sum + n; }, 0) % 10 === 0;
// mount(root, { onLink({ number, expiry, cvc, brand, last4 }, { signal }), resetAfter }) → { state, reset(), destroy() }
function mount(root, { onLink = async () => {}, resetAfter = 0 } = {}) {
  root.__pb?.destroy();
  pbPrepare(root);
  const $ = selector => root.querySelector(selector);
  const plate = $('.cp-plate'), num = $('.cp-num'), exp = $('.cp-exp'), cvc = $('.cp-cvc'), edit = $('.cp-edit'), say = $('[data-status]'), brandBox = $('.cp-brand');
  const inputs = [num, exp, cvc], host = root.parentElement;
  const off = new AbortController(), on = (target, type, fn) => target.addEventListener(type, fn, { signal: off.signal });
  let brand = '', request = null, timer = 0;
  const step = next => { if (next) root.dataset.step = next; return root.dataset.step; };
  const digits = el => el.value.replace(/\D/g, ''), numSize = () => brand === 'Amex' ? 15 : 16, cvcSize = () => brand === 'Amex' ? 4 : 3;
  const groups = d => brand === 'Amex' ? [d.slice(0, 4), d.slice(4, 10), d.slice(10)].filter(Boolean).join(' ') : (d.match(/.{1,4}/g) || []).join(' ');
  const numOk = () => digits(num).length === numSize() && luhn(digits(num));
  const expOk = () => {
    const d = digits(exp);
    if (d.length < 4) return false;
    const mm = +d.slice(0, 2), yy = +d.slice(2), now = new Date(), year = now.getFullYear() % 100;
    return mm >= 1 && mm <= 12 && (yy > year || (yy === year && mm >= now.getMonth() + 1));
  };
  // Reformat without losing the caret: count digits to its left, then put it back after the same digit.
  const reformat = (el, text) => {
    const left = el.value.slice(0, el.selectionStart).replace(/\D/g, '').length;
    el.value = text;
    let at = 0, seen = 0;
    while (at < text.length && seen < left) { if (/\d/.test(text[at])) seen++; at++; }
    el.setSelectionRange(at, at);
  };
  const go = input => { input.focus({ preventScroll: true }); const n = input.value.length; input.setSelectionRange(n, n); };
  const clear = () => { root.classList.remove('cp-bad'); root.querySelectorAll('.wrong').forEach(c => c.classList.remove('wrong')); };
  const fail = (text, input) => { clear(); root.classList.add('cp-bad'); input.classList.add('wrong'); say.textContent = text; pbShake(plate); };
  // Moves on by itself, always to the first thing still missing.
  const advance = () => { if (!numOk()) return go(num); if (!expOk()) return go(exp); if (cvc.value.length < cvcSize()) return go(cvc); link(); };

  const link = async () => {
    const d = digits(num), e = digits(exp);
    const name = document.createElement('i');
    name.className = 'cp-name'; name.textContent = `${brand || 'Card'} `;
    $('.cp-line b').replaceChildren(name, `•••• ${d.slice(-4)}`);
    step('checking'); clear(); inputs.forEach(i => i.blur()); say.textContent = 'Linking the card';
    request = new AbortController();
    try {
      await Promise.all([onLink({ number: d, expiry: `${e.slice(0, 2)}/${e.slice(2)}`, cvc: cvc.value, brand, last4: d.slice(-4) }, { signal: request.signal }), pbWait(pbCalm() ? 0 : 1300, request.signal)]);
      inputs.forEach(i => { i.tabIndex = -1; }); edit.tabIndex = 0; step('done'); say.textContent = 'Card linked';
      root.dispatchEvent(new CustomEvent('pb:card', { detail: { brand, last4: d.slice(-4) }, bubbles: true }));
      if (resetAfter) timer = setTimeout(() => api.reset(), resetAfter);
    } catch {
      if (request.signal.aborted) return;
      step('details'); go(cvc); fail('This card was refused', cvc);
      timer = setTimeout(() => { clear(); cvc.value = ''; go(cvc); }, 460);
    } finally { request = null; }
  };

  on(num, 'input', () => {
    let d = digits(num);
    const b = brandOf(d);
    if (b !== brand) { brand = b; pbRoll(brandBox, b, 1); cvc.value = cvc.value.slice(0, cvcSize()); }
    d = d.slice(0, numSize()); reformat(num, groups(d)); clear(); step(numOk() ? 'details' : 'number');
    if (d.length === numSize()) { if (luhn(d)) { say.textContent = `${brand || 'Card'} number accepted`; advance(); } else fail('This card number has a typo', num); }
  });
  on(exp, 'input', () => {
    let d = digits(exp).slice(0, 4);
    if (d.length === 1 && +d > 1) d = '0' + d;
    reformat(exp, d.length > 2 ? `${d.slice(0, 2)} / ${d.slice(2)}` : d); clear();
    if (d.length < 4) return;
    if (expOk()) advance(); else fail('This date has passed', exp);
  });
  on(cvc, 'input', () => { cvc.value = digits(cvc).slice(0, cvcSize()); clear(); if (cvc.value.length === cvcSize()) advance(); });
  on(exp, 'keydown', event => { if (event.key === 'Backspace' && !exp.value) { event.preventDefault(); go(num); } });
  on(cvc, 'keydown', event => { if (event.key === 'Backspace' && !cvc.value) { event.preventDefault(); go(exp); } });
  // The whole form sits in one label-free plate, so Enter must never submit a page.
  on(root, 'submit', event => event.preventDefault());
  on(edit, 'click', event => { event.preventDefault(); clearTimeout(timer); exp.value = cvc.value = ''; inputs.forEach(i => { i.tabIndex = 0; }); edit.tabIndex = -1; step('details'); say.textContent = 'Change the card'; go(num); });

  // Never wider than its container, with a little air on both sides.
  const fit = () => { if (host) root.style.width = Math.min(380, host.clientWidth - 36) + 'px'; };
  fit();
  const resize = typeof ResizeObserver === 'function' && host ? new ResizeObserver(fit) : null;
  resize?.observe(host);

  const api = {
    get state() { return { phase: step(), brand, last4: digits(num).slice(-4) }; },
    reset() { clearTimeout(timer); request?.abort(); inputs.forEach(i => { i.value = ''; i.tabIndex = 0; }); brand = ''; pbRoll(brandBox, '', 0); edit.tabIndex = -1; clear(); step('number'); say.textContent = ''; },
    destroy() { clearTimeout(timer); request?.abort(); off.abort(); resize?.disconnect(); delete root.__pb; },
  };
  root.__pb = api;
  return api;
}
// The catalog preview sends nothing. An all-zero code is refused, and a line under the plate says what passes at each step.
const demo = {
  prepare: root => {
    const hint = document.createElement('div');
    hint.className = 'cp-hint';
    hint.innerHTML = '<p data-for="number"><span><i>Works: </i><b>4242 4242 4242 4242</b></span><span><i>Refused: </i><b>4242 4242 4242 4241</b></span></p><p data-for="details"><span><i>Works: </i><b>12/30</b>, <b>123</b></span><span><i>Refused: </i><b>01/20</b>, <b>000</b></span></p>';
    root.insertBefore(hint, root.querySelector('[data-status]'));
  },
  onLink: ({ cvc }) => new Promise((resolve, reject) => setTimeout(() => (/^0+$/.test(cvc) ? reject(new Error('Refused')) : resolve()), 200)),
  resetAfter: 3600,
};
