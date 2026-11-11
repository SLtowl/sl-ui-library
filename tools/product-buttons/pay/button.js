// A payment does not move evenly: it starts quickly, waits on the bank, then finishes. Capped below 1 until the answer comes.
const pace = t => t < .35 ? (t / .35) ** .7 * .42 : t < .7 ? .42 + (t - .35) / .35 * .13 : .55 + (1 - (1 - (t - .7) / .3) ** 2) * .37;
// mount(root, { onPay({ amount, signal }), maxWidth, resetAfter }) → { state, reset(), destroy() }
function mount(root, { onPay = async () => {}, maxWidth = 300, resetAfter = 0 } = {}) {
  root.__pb?.destroy();
  pbPrepare(root);
  const button = root.querySelector('.pb-btn'), status = root.querySelector('[data-status]'), label = root.querySelector('[data-label=idle]'), number = root.querySelector('[data-label=amount]');
  const amount = Number(root.dataset.amount) || 0, currency = root.dataset.currency ?? '$', idleText = label.textContent;
  const money = n => currency + n.toFixed(2);
  const host = root.parentElement, off = new AbortController();
  let request = null, frame = 0, timer = 0, p = 0;
  const state = next => { if (next) root.dataset.state = next; return root.dataset.state; };
  const fit = () => {
    root.style.setProperty('--w0', pbMeasure(button, label.textContent) + 52 + 'px');
    root.style.setProperty('--w1', Math.max(200, Math.min(maxWidth, (host?.clientWidth || maxWidth + 40) - 40)) + 'px');
    root.style.setProperty('--w2', pbMeasure(button, root.querySelector('[data-label=done]').textContent) + 60 + 'px');
    root.style.setProperty('--w3', pbMeasure(button, root.querySelector('[data-label=fail]').textContent) + 52 + 'px');
  };
  fit(); document.fonts?.ready.then(fit);
  const resize = typeof ResizeObserver === 'function' && host ? new ResizeObserver(fit) : null;
  resize?.observe(host);
  const paint = () => { root.style.setProperty('--p', p.toFixed(4)); number.textContent = money(amount * (1 - p)); };
  const idle = text => { cancelAnimationFrame(frame); p = 0; paint(); label.textContent = text; fit(); button.removeAttribute('aria-disabled'); state('idle'); };

  button.addEventListener('click', async () => {
    if (state() !== 'idle') return;
    state('busy'); button.setAttribute('aria-disabled', 'true'); status.textContent = 'Processing payment';
    request = new AbortController();
    const signal = request.signal, start = performance.now() + 180, span = pbCalm() ? 300 : 2000;
    const run = now => { p = pace(Math.min(1, Math.max(0, (now - start) / span))); paint(); frame = requestAnimationFrame(run); };
    frame = requestAnimationFrame(run);
    try {
      await Promise.all([onPay({ amount, signal }), pbWait(pbCalm() ? 0 : 900, signal)]);
      // Confirmed: the bar runs out, then the button lands as "Paid".
      cancelAnimationFrame(frame);
      const from = p, t0 = performance.now();
      await new Promise(done => { const end = now => { const k = Math.min(1, (now - t0) / 320); p = from + (1 - from) * (1 - (1 - k) ** 3); paint(); k < 1 ? frame = requestAnimationFrame(end) : done(); }; frame = requestAnimationFrame(end); });
      state('done'); status.textContent = 'Paid ' + money(amount);
      root.dispatchEvent(new CustomEvent('pb:pay', { detail: { amount }, bubbles: true }));
      if (resetAfter) timer = setTimeout(() => api.reset(), resetAfter);
    } catch (error) {
      if (signal.aborted) return;
      // Declined: the bar stops where the bank refused, turns red and shakes, then offers to try again.
      cancelAnimationFrame(frame); state('fail'); status.textContent = 'Card declined'; pbShake(button);
      timer = setTimeout(() => idle('Try again'), 1800);
    } finally { request = null; }
  }, { signal: off.signal });

  const api = {
    get state() { return { phase: state(), amount, progress: p }; },
    reset() { clearTimeout(timer); request?.abort(); status.textContent = ''; idle(idleText); },
    destroy() { clearTimeout(timer); cancelAnimationFrame(frame); request?.abort(); off.abort(); resize?.disconnect(); delete root.__pb; },
  };
  root.__pb = api;
  return api;
}
// The catalog preview: no charge. The first press is declined so both endings can be seen; the next one goes through.
let demoTries = 0;
const demo = {
  onPay: () => { const decline = demoTries++ % 2 === 0; return new Promise((resolve, reject) => setTimeout(() => decline ? reject(new Error('Declined')) : resolve(), decline ? 1100 : 1800)); },
  resetAfter: 2600,
};
