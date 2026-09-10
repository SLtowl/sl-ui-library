(() => {
const mounted = new WeakMap();
function mountSlider(root, { onChange, formatValue } = {}) {
  if (mounted.has(root)) return mounted.get(root);
  if (onChange !== undefined && typeof onChange !== 'function') throw new TypeError('onChange must be a function.');
  if (formatValue !== undefined && typeof formatValue !== 'function') throw new TypeError('formatValue must be a function.');
  const inputs = [...root.querySelectorAll('input[type="range"]')];
  const output = root.querySelector('[data-output]');
  if (!inputs.length || !output) throw new TypeError('A native range and output are required.');
  const lifecycle = new AbortController();
  const view = root.ownerDocument.defaultView;
  const dual = inputs.length === 2;
  const labels = root.dataset.labels?.split(',');
  const format = value => formatValue ? String(formatValue(value)) : dual ? '$' + value : value + '%';
  const track = root.querySelector('.slider-track');
  let dragging = null, destroyed = false;
  const values = () => inputs.map(input => input.valueAsNumber);
  const percent = input => (input.valueAsNumber - Number(input.min)) / (Number(input.max) - Number(input.min)) * 100;
  function render(changed, emit = false) {
    if (destroyed) return;
    if (dual) {
      if (inputs[0].valueAsNumber > inputs[1].valueAsNumber) {
        if (changed === inputs[0]) inputs[0].value = inputs[1].value;
        else inputs[1].value = inputs[0].value;
      }
      root.style.setProperty('--low', percent(inputs[0]) + '%');
      root.style.setProperty('--high', percent(inputs[1]) + '%');
      inputs[0].setAttribute('aria-valuemax', inputs[1].value);
      inputs[1].setAttribute('aria-valuemin', inputs[0].value);
      for (const input of inputs) input.setAttribute('aria-valuetext', format(input.valueAsNumber));
      output.textContent = format(inputs[0].valueAsNumber) + ' – ' + format(inputs[1].valueAsNumber);
    } else {
      const p = percent(inputs[0]);
      root.style.setProperty('--high', p + '%');
      root.style.setProperty('--position', p + '%');
      if (root.hasAttribute('data-centered')) {
        const center = (0 - Number(inputs[0].min)) / (Number(inputs[0].max) - Number(inputs[0].min)) * 100;
        root.style.setProperty('--low', Math.min(p, center) + '%');
        root.style.setProperty('--high', Math.max(p, center) + '%');
      }
      root.style.setProperty('--sun-angle', (p * .9) + 'deg');
      root.style.setProperty('--sun-opacity', String(.25 + p * .0075));
      root.dataset.zero = String(p === 0);
      root.dataset.quiet = String(p <= 50);
      if (root.dataset.slider === 'volume') {
        // Only the emblem eases; the thumb and filled track always follow input.
        root.style.setProperty('--wave-one', String(Math.min(1, p / 35)));
        root.style.setProperty('--wave-two', String(Math.max(0, Math.min(1, (p - 20) / 80))));
      }
      output.textContent = labels ? labels[inputs[0].valueAsNumber] : format(inputs[0].valueAsNumber);
      inputs[0].setAttribute('aria-valuetext', output.textContent);
      for (const marker of root.querySelectorAll('[data-step]')) marker.classList.toggle('is-current', Number(marker.dataset.step) === inputs[0].valueAsNumber);
    }
    if (emit) {
      onChange?.(values());
      root.dispatchEvent(new view.CustomEvent('sliderchange', { bubbles: true, detail: { values: values() } }));
    }
  }
  root.addEventListener('input', event => { if (inputs.includes(event.target)) render(event.target, true); }, { signal: lifecycle.signal });
  // In the dual control, native thumbs drag normally. Empty-track dragging uses
  // the nearest thumb, with pointer capture, while both inputs remain focusable.
  if (dual) {
    const updatePointer = event => {
      const rect = track.getBoundingClientRect();
      const ratio = Math.max(0, Math.min(1, (event.clientX - rect.left - 12) / (rect.width - 24)));
      const min = Number(dragging.min), max = Number(dragging.max), step = Number(dragging.step) || 1;
      dragging.value = String(min + Math.round(ratio * (max - min) / step) * step);
      dragging.dispatchEvent(new view.Event('input', { bubbles: true }));
    };
    track.addEventListener('pointerdown', event => {
      if (event.button !== 0 || inputs.includes(event.target) || dragging) return;
      const candidates = inputs.filter(input => !input.disabled);
      if (!candidates.length) return;
      const rect = track.getBoundingClientRect();
      const p = (event.clientX - rect.left - 12) / (rect.width - 24) * 100;
      dragging = candidates.reduce((nearest, input) => Math.abs(percent(input)-p) < Math.abs(percent(nearest)-p) ? input : nearest);
      dragging.focus({ preventScroll: true });
      track.setPointerCapture(event.pointerId);
      updatePointer(event);
      event.preventDefault();
    }, { signal: lifecycle.signal });
    track.addEventListener('pointermove', event => { if (dragging && track.hasPointerCapture(event.pointerId)) updatePointer(event); }, { signal: lifecycle.signal });
    const finish = () => { const input = dragging; dragging = null; input?.dispatchEvent(new view.Event('change', { bubbles: true })); };
    track.addEventListener('pointerup', finish, { signal: lifecycle.signal });
    track.addEventListener('pointercancel', finish, { signal: lifecycle.signal });
    track.addEventListener('lostpointercapture', finish, { signal: lifecycle.signal });
  }
  function reset() {
    if (destroyed) return;
    inputs.forEach(input => { input.value = input.defaultValue; });
    render();
  }
  inputs[0].form?.addEventListener('reset', () => queueMicrotask(reset), { signal: lifecycle.signal });
  // History restoration can replace native values after module initialization.
  // Reconcile the visual state without emitting a user change or resetting it.
  view.addEventListener('pageshow', () => render(), { signal: lifecycle.signal });
  render();
  const controller = { reset, get values() { return values(); }, destroy() { destroyed = true; dragging = null; lifecycle.abort(); mounted.delete(root); } };
  mounted.set(root, controller);
  return controller;
}

window.MatteSlider = { mount: mountSlider };
})();
