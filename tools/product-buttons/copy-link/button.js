async function writeClipboard(text) {
  if (navigator.clipboard?.writeText) { await navigator.clipboard.writeText(text); return; }
  // Older browsers: copy from a hidden text area.
  const area = document.createElement('textarea');
  area.value = text; area.setAttribute('readonly', ''); area.style.cssText = 'position:fixed;opacity:0;pointer-events:none';
  document.body.append(area); area.select();
  const ok = document.execCommand('copy');
  area.remove();
  if (!ok) throw new Error('Copy refused');
}
// mount(root, { link, maxWidth, holdFor }) → { state, reset(), destroy() }
function mount(root, { link = root.dataset.link || location.href, maxWidth = 300, holdFor = 1600 } = {}) {
  root.__pb?.destroy();
  pbPrepare(root);
  const button = root.querySelector('.pb-btn'), status = root.querySelector('[data-status]'), url = root.querySelector('.pb-url'), label = root.querySelector('[data-label=idle]');
  url.textContent = link.replace(/^https?:\/\//, '').replace(/\/$/, '');
  button.setAttribute('aria-label', label.textContent);
  const host = root.parentElement, off = new AbortController();
  let timers = [];
  const state = next => { if (next) root.dataset.state = next; return root.dataset.state; };
  const later = (ms, fn) => timers.push(setTimeout(fn, ms));
  const fit = () => {
    root.style.setProperty('--w0', pbMeasure(button, label.textContent) + 52 + 'px');
    const room = Math.max(200, Math.min(maxWidth, (host?.clientWidth || maxWidth + 40) - 40));
    root.style.setProperty('--w1', Math.min(room, pbMeasure(button, url.textContent) + 64) + 'px');
    root.style.setProperty('--w2', pbMeasure(button, root.querySelector('[data-label=done]').textContent) + 60 + 'px');
    root.style.setProperty('--w3', pbMeasure(button, root.querySelector('[data-label=fail]').textContent) + 52 + 'px');
  };
  fit(); document.fonts?.ready.then(fit);
  const resize = typeof ResizeObserver === 'function' && host ? new ResizeObserver(fit) : null;
  resize?.observe(host);

  button.addEventListener('click', async () => {
    if (state() !== 'idle') return;
    // Show what is being copied and select it, then confirm. The clipboard write happens right away, inside the click.
    state('show'); button.setAttribute('aria-disabled', 'true');
    let copied = true;
    try { await writeClipboard(link); } catch { copied = false; }
    const calm = pbCalm();
    later(calm ? 0 : 900, () => {
      state(copied ? 'done' : 'fail'); status.textContent = copied ? 'Link copied' : 'Copy failed';
      if (copied) root.dispatchEvent(new CustomEvent('pb:copy', { detail: { link }, bubbles: true })); else pbShake(button);
      later(holdFor, () => api.reset());
    });
  }, { signal: off.signal });

  const api = {
    get state() { return { phase: state(), link }; },
    reset() { timers.forEach(clearTimeout); timers = []; status.textContent = ''; button.removeAttribute('aria-disabled'); state('idle'); },
    destroy() { timers.forEach(clearTimeout); off.abort(); resize?.disconnect(); delete root.__pb; },
  };
  root.__pb = api;
  return api;
}
// The catalog preview copies the sample address for real; nothing else happens.
const demo = {};
