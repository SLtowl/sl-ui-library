// mount(root, { on, run, onChange(on) }) → { state, set(on), toggle(), destroy() }
// run returns a promise; the status stays on Syncing until it finishes. If it rejects, the switch turns off.
function mount(root, { on: start = true, run, onChange = () => {} } = {}) {
  root.__pb?.destroy();
  pbPrepare(root);
  const row = root.querySelector('.sr-row'), arrows = row.querySelector('svg');
  const still = matchMedia('(prefers-reduced-motion:reduce)').matches;
  const angle = () => parseFloat(getComputedStyle(arrows).rotate) || 0;
  let current = Boolean(start), spin, ticket = 0;
  const paint = () => row.setAttribute('aria-checked', String(current));
  // The arrows are symmetric at half turns, so they can always stop on one and hand back to rest without a jump.
  const turn = on => {
    const from = angle(), half = Math.ceil(from / 180) * 180;
    spin?.cancel();
    if (still) return;
    if (on) spin = arrows.animate([{ rotate: from + 'deg' }, { rotate: half + 720 + 'deg' }], { duration: 1250, easing: 'cubic-bezier(.45,0,.15,1)' });
    else if (from !== half) spin = arrows.animate([{ rotate: from + 'deg' }, { rotate: half + 'deg' }], { duration: 320, easing: 'cubic-bezier(.22,1,.36,1)' });
  };
  const set = next => {
    next = Boolean(next); if (next === current) return;
    current = next; paint(); turn(current);
    const mine = ++ticket;
    root.dataset.sync = current ? 'busy' : 'paused';
    onChange(current);
    if (!current) return;
    const pause = new Promise(resolve => setTimeout(resolve, still ? 0 : 1180));
    Promise.all([pause, run?.()]).then(() => { if (mine === ticket) root.dataset.sync = 'done'; }, () => { if (mine === ticket) set(false); });
  };
  const off = new AbortController();
  row.addEventListener('click', () => set(!current), { signal: off.signal });
  paint(); root.dataset.sync = current ? 'done' : 'paused';
  const api = { get state() { return { on: current, status: root.dataset.sync }; }, set, toggle: () => set(!current), destroy() { off.abort(); spin?.cancel(); ticket += 1; delete root.__pb; } };
  root.__pb = api;
  return api;
}
// The catalog preview needs nothing extra.
const demo = {};
