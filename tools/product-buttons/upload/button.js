// mount(root, { onUpload(file, { signal, progress }), pick(), accept, maxWidth, holdFor }) → { state, reset(), destroy() }
function mount(root, { onUpload = async () => {}, pick = null, accept = '', maxWidth = 300, holdFor = 2200 } = {}) {
  root.__pb?.destroy();
  pbPrepare(root);
  const button = root.querySelector('.pb-btn'), input = root.querySelector('.pb-file'), status = root.querySelector('[data-status]');
  const name = root.querySelector('.pb-fname'), pct = root.querySelector('.pb-pct');
  const text = key => root.querySelector(`[data-label=${key}]`).textContent;
  const host = root.parentElement, off = new AbortController(), on = (target, type, fn) => target.addEventListener(type, fn, { signal: off.signal });
  if (accept) input.accept = accept;
  let request = null, timer = 0, depth = 0;
  const state = next => { if (next) root.dataset.state = next; return root.dataset.state; };
  const room = () => Math.max(200, Math.min(maxWidth, (host?.clientWidth || maxWidth + 40) - 40));
  const fit = () => {
    root.style.setProperty('--w0', pbMeasure(button, text('idle')) + 52 + 'px');
    root.style.setProperty('--wd', pbMeasure(button, text('drop')) + 52 + 'px');
    root.style.setProperty('--w2', pbMeasure(button, text('done')) + 60 + 'px');
    root.style.setProperty('--w3', pbMeasure(button, text('fail')) + 52 + 'px');
  };
  fit(); document.fonts?.ready.then(fit);
  const bar = pbProgress(p => { root.style.setProperty('--p', p.toFixed(4)); pct.textContent = Math.round(p * 100) + '%'; });
  const idle = () => { clearTimeout(timer); bar.reset(); button.removeAttribute('aria-disabled'); state('idle'); };

  const start = async file => {
    if (!file || state() !== 'idle') return;
    name.textContent = file.name;
    // The bar is as wide as the name needs, within its container.
    root.style.setProperty('--w1', Math.min(room(), pbMeasure(button, file.name) + pbMeasure(button, '100%') + 66) + 'px');
    state('busy'); button.setAttribute('aria-disabled', 'true'); status.textContent = `Uploading ${file.name}`;
    request = new AbortController();
    const signal = request.signal;
    try {
      await onUpload(file, { signal, progress: value => { if (!signal.aborted) bar.to(value); } });
      await bar.finish();
      state('done'); status.textContent = `${file.name} uploaded`;
      root.dispatchEvent(new CustomEvent('pb:upload', { detail: { file }, bubbles: true }));
    } catch {
      if (signal.aborted) return;
      state('fail'); status.textContent = 'Upload failed'; pbShake(button);
    } finally { request = null; input.value = ''; }
    timer = setTimeout(idle, holdFor);
  };
  // pick() can supply the file instead of the system dialog (the catalog demo does).
  on(button, 'click', async () => { if (state() !== 'idle') return; if (pick) start(await pick()); else input.click(); });
  on(input, 'change', () => start(input.files[0]));
  // Drag and drop: count enters and leaves so moving over the label does not flicker the target.
  on(button, 'dragenter', event => { if (state() !== 'idle') return; event.preventDefault(); depth++; root.classList.add('pb-drag'); });
  on(button, 'dragover', event => { if (state() === 'idle') { event.preventDefault(); event.dataTransfer.dropEffect = 'copy'; } });
  on(button, 'dragleave', () => { depth = Math.max(0, depth - 1); if (!depth) root.classList.remove('pb-drag'); });
  on(button, 'drop', event => { event.preventDefault(); depth = 0; root.classList.remove('pb-drag'); start(event.dataTransfer.files[0]); });

  const api = {
    get state() { return { phase: state(), file: name.textContent }; },
    reset() { request?.abort(); status.textContent = ''; idle(); },
    destroy() { clearTimeout(timer); request?.abort(); bar.reset(); off.abort(); delete root.__pb; },
  };
  root.__pb = api;
  return api;
}
// The catalog preview asks for no real file: a click uploads a sample one, and the progress is pretend. Dropping a file works too and sends nothing.
const demo = { pick: () => new File([''], 'quarterly-report.pdf', { type: 'application/pdf' }), onUpload: (file, options) => pbDemoTransfer(options, 2200) };
