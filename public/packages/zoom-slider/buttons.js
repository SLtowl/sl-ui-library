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

function formatter(root) {
  return value => {
    switch (root.dataset.format) {
      case 'time': return Math.floor(value / 60) + ':' + String(Math.floor(value) % 60).padStart(2,'0');
      case 'hours': return String(value).padStart(2,'0') + ':00';
      case 'temperature': return value + ' °C';
      case 'balance': return value === 0 ? 'Center' : Math.abs(value) + '% ' + (value < 0 ? 'L' : 'R');
      case 'exposure': return (value > 0 ? '+' : '') + value.toFixed(1) + ' EV';
      case 'rating': return value + ' / 5';
      case 'distance': return value + ' km';
      case 'pixels': return value + ' px';
      default: return value + '%';
    }
  };
}

function mountSliderStudy(root, { onChange } = {}) {
  if (onChange !== undefined && typeof onChange !== 'function') throw new TypeError('onChange must be a function.');
  const lifecycle = new AbortController();
  const roots = root.matches('.sl-slider') ? [root] : [...root.querySelectorAll('.sl-slider')];
  const instances = roots.map(root => {
    const input = root.querySelector('input'), format = formatter(root);
    root.addEventListener('input', () => { root.dataset.interacted = 'true'; }, { signal: lifecycle.signal });
    const choices = [...root.querySelectorAll('[data-rating],button[data-step]')];
    const waveform = [...root.querySelectorAll('.scrub-art span')];
    let playedBars = -1;
    const update = values => {
      const value = values[0], fraction = (value - Number(input.min)) / (Number(input.max) - Number(input.min));
      root.style.setProperty('--fraction', String(fraction));
      root.style.setProperty('--preview-value', value + 'px');
      root.style.setProperty('--zoom', String(value / 100));
      root.querySelector('[data-bubble]')?.replaceChildren(format(value));
      for (const choice of choices) {
        const n = Number(choice.dataset.rating ?? choice.dataset.step);
        if (choice.hasAttribute('data-rating')) {
          const star = choice.querySelector('svg');
          star.classList.toggle('is-filled', n <= value);
          star.style.setProperty('--star-fill', String(Math.max(0, Math.min(1, value - n + 1))));
          choice.setAttribute('aria-checked', String(n === value));
          choice.tabIndex = n === Math.round(value) ? 0 : -1;
        } else choice.setAttribute('aria-pressed', String(n === value));
      }
      const count = Math.round(fraction * waveform.length);
      if (count !== playedBars) {
        waveform.forEach((bar, index) => bar.classList.toggle('is-played', index < count));
        playedBars = count;
      }
    };
    const controller = mountSlider(root, { formatValue: format, onChange: values => { update(values); onChange?.(values); } });
    const setValue = value => {
      if (input.disabled) return;
      input.value = String(value);
      input.dispatchEvent(new Event('input', { bubbles: true }));
      input.dispatchEvent(new Event('change', { bubbles: true }));
    };
    for (const choice of choices) {
      choice.addEventListener('click', () => setValue(Number(choice.dataset.rating ?? choice.dataset.step)), { signal: lifecycle.signal });
      if (!choice.hasAttribute('data-rating')) continue;
      choice.addEventListener('keydown', event => {
        const offset = { ArrowRight: 1, ArrowUp: 1, ArrowLeft: -1, ArrowDown: -1 }[event.key];
        if (offset === undefined && !['Home','End'].includes(event.key)) return;
        event.preventDefault();
        const index = choices.indexOf(choice);
        const next = event.key === 'Home' ? 0 : event.key === 'End' ? choices.length - 1 : (index + offset + choices.length) % choices.length;
        choices[next].focus(); choices[next].click();
      }, { signal: lifecycle.signal });
    }
    const play = root.querySelector('[data-play]');
    let timer = null, startedAt = 0, startValue = 0;
    const pause = () => {
      cancelAnimationFrame(timer); timer = null;
      if (!play) return;
      root.dataset.playing = 'false';
      play.setAttribute('aria-label', 'Play preview');
      play.querySelector('[data-play-label]').textContent = 'Play';
    };
    if (play) {
      play.addEventListener('click', () => {
        if (timer !== null) { pause(); return; }
        if (input.valueAsNumber >= Number(input.max)) setValue(Number(input.min));
        startedAt = performance.now(); startValue = input.valueAsNumber;
        root.dataset.playing = 'true'; play.setAttribute('aria-label','Pause preview');
        play.querySelector('[data-play-label]').textContent = 'Pause';
        // Use elapsed time, not accumulated steps; render once per display frame.
        // No animation loop remains active on pause, reset or a hidden page.
        const tick = now => {
          const value = Math.min(Number(input.max), startValue + (now - startedAt) / 1000);
          if (value !== input.valueAsNumber) {
            input.value = String(value);
            input.dispatchEvent(new Event('input', { bubbles: true }));
          }
          if (value >= Number(input.max)) pause();
          else timer = requestAnimationFrame(tick);
        };
        timer = requestAnimationFrame(tick);
      }, { signal: lifecycle.signal });
      input.addEventListener('input', event => {
        if (event.isTrusted && timer !== null) { startedAt = performance.now(); startValue = input.valueAsNumber; }
      }, { signal: lifecycle.signal });
      input.addEventListener('keydown', event => {
        const direction = { ArrowRight: 1, ArrowUp: 1, ArrowLeft: -1, ArrowDown: -1 }[event.key];
        if (direction === undefined) return;
        event.preventDefault();
        // Fine playback precision must not make keyboard seeking impractical.
        setValue(Math.max(Number(input.min), Math.min(Number(input.max), input.valueAsNumber + direction)));
        if (timer !== null) { startedAt = performance.now(); startValue = input.valueAsNumber; }
      }, { signal: lifecycle.signal });
      document.addEventListener('visibilitychange', () => { if (document.hidden) pause(); }, { signal: lifecycle.signal });
    }
    update(controller.values);
    return { get values() { return controller.values; }, sync() { update(controller.values); }, pause, reset() { pause(); controller.reset(); update(controller.values); }, destroy() { pause(); controller.destroy(); } };
  });
  const sync = () => instances.forEach(instance => instance.sync());
  window.addEventListener('pageshow', sync, { signal: lifecycle.signal });
  window.addEventListener('pagehide', () => instances.forEach(instance => instance.pause()), { signal: lifecycle.signal });
  return {
    get values() { return instances.flatMap(instance => instance.values); },
    reset() { instances.forEach(instance => instance.reset()); },
    destroy() { lifecycle.abort(); instances.forEach(instance => instance.destroy()); }
  };
}


window.MatteSlider = { mount: mountSliderStudy };
})();
