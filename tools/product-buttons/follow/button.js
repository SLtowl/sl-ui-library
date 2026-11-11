// mount(root, { onFollow(following, { signal }), following }) → { state, reset(), destroy() }
function mount(root, { onFollow = async () => {}, following = false } = {}) {
  root.__pb?.destroy();
  pbPrepare(root);
  const button = root.querySelector('.pb-btn'), status = root.querySelector('[data-status]');
  const text = key => root.querySelector(`[data-label=${key}]`).textContent;
  const off = new AbortController(), on = (target, type, fn) => target.addEventListener(type, fn, { signal: off.signal });
  let request = null;
  const fit = () => {
    root.style.setProperty('--w0', pbMeasure(button, text('idle')) + 52 + 'px');
    root.style.setProperty('--w1', pbMeasure(button, text('on')) + 48 + 'px');
    root.style.setProperty('--w2', pbMeasure(button, text('off')) + 48 + 'px');
  };
  fit(); document.fonts?.ready.then(fit);
  const show = value => {
    root.dataset.state = value ? 'on' : 'idle'; button.setAttribute('aria-pressed', String(value));
    button.setAttribute('aria-label', value ? text('on') : text('idle'));
  };
  show(following);

  on(button, 'click', async () => {
    const next = root.dataset.state !== 'on';
    request?.abort(); request = new AbortController();
    const signal = request.signal;
    // Change at once. Right after following, hovering must not shout "Unfollow": that waits until the pointer leaves.
    show(next); status.textContent = next ? 'Following' : 'Unfollowed';
    if (next) { root.classList.add('pb-fresh'); if (!pbCalm()) button.animate([{ scale: 1 }, { scale: 1.07 }, { scale: 1 }], { duration: 420, easing: 'cubic-bezier(.3,1.5,.5,1)' }); }
    try {
      await onFollow(next, { signal });
      root.dispatchEvent(new CustomEvent('pb:follow', { detail: { following: next }, bubbles: true }));
    } catch {
      if (signal.aborted) return;
      show(!next); root.classList.remove('pb-fresh'); status.textContent = 'Could not save. Try again'; pbShake(button);
    }
  });
  on(button, 'pointerleave', () => root.classList.remove('pb-fresh'));
  on(button, 'blur', () => root.classList.remove('pb-fresh'));

  const api = {
    get state() { return { following: root.dataset.state === 'on' }; },
    reset() { request?.abort(); root.classList.remove('pb-fresh'); status.textContent = ''; show(following); },
    destroy() { request?.abort(); off.abort(); delete root.__pb; },
  };
  root.__pb = api;
  return api;
}
// The catalog preview saves nothing.
const demo = {};
