const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
// mount(root, { onInvite({ email, role }, { signal }), roles, maxWidth, holdFor }) → { state, reset(), destroy() }
function mount(root, { onInvite = async () => {}, roles = ['Editor', 'Viewer'], maxWidth = 420, holdFor = 1500 } = {}) {
  root.__pb?.destroy();
  pbPrepare(root);
  const field = root.querySelector('.pb-field'), button = root.querySelector('.pb-btn'), role = root.querySelector('.pb-role'), roleText = root.querySelector('.pb-rn'), status = root.querySelector('[data-status]');
  const text = key => root.querySelector(`[data-label=${key}]`).textContent;
  const host = root.parentElement, off = new AbortController(), on = (target, type, fn) => target.addEventListener(type, fn, { signal: off.signal });
  let request = null, timer = 0, which = 0;
  const state = next => { if (next) root.dataset.state = next; return root.dataset.state; };
  const fit = () => {
    root.style.setProperty('--w0', pbMeasure(button, text('idle')) + 52 + 'px');
    root.style.setProperty('--ws', pbMeasure(button, text('send')) + 40 + 'px');
    root.style.setProperty('--wr', Math.max(...roles.map(r => pbMeasure(button, r))) + 26 + 'px');
    root.style.setProperty('--w1', Math.max(280, Math.min(maxWidth, (host?.clientWidth || maxWidth + 40) - 40)) + 'px');
    root.style.setProperty('--w2', pbMeasure(button, text('done')) + 52 + 'px');
  };
  const label = () => role.setAttribute('aria-label', `Role: ${roles[which]}. Press to change`);
  roleText.firstElementChild.textContent = roles[0]; label();
  fit(); document.fonts?.ready.then(fit);

  const open = () => { state('open'); button.setAttribute('aria-expanded', 'true'); field.tabIndex = role.tabIndex = 0; setTimeout(() => field.focus({ preventScroll: true }), 60); };
  const close = focusButton => { root.classList.remove('pb-error'); state('idle'); button.setAttribute('aria-expanded', 'false'); field.tabIndex = role.tabIndex = -1; if (focusButton) button.focus({ preventScroll: true }); };
  const refuse = message => { root.classList.add('pb-error'); status.textContent = message; field.focus({ preventScroll: true }); pbShake(root); };

  // The role rolls up to the next choice.
  on(role, 'click', () => {
    which = (which + 1) % roles.length; label(); status.textContent = `Role: ${roles[which]}`;
    pbRoll(roleText, roles[which], 1);
  });
  on(root, 'submit', async event => {
    event.preventDefault();
    if (state() === 'idle') return open();
    if (state() !== 'open') return;
    const email = field.value.trim();
    if (!EMAIL.test(email)) return refuse('Enter a full email address');
    root.classList.remove('pb-error'); state('busy'); field.tabIndex = role.tabIndex = -1; button.setAttribute('aria-disabled', 'true'); button.focus({ preventScroll: true }); status.textContent = 'Sending invite';
    request = new AbortController();
    try {
      await Promise.all([onInvite({ email, role: roles[which] }, { signal: request.signal }), pbWait(pbCalm() ? 0 : 800, request.signal)]);
      state('done'); status.textContent = `Invite sent to ${email}`;
      root.dispatchEvent(new CustomEvent('pb:invite', { detail: { email, role: roles[which] }, bubbles: true }));
      // Ready for the next person: reopen with an empty field, keeping the chosen role.
      timer = setTimeout(() => { field.value = ''; button.removeAttribute('aria-disabled'); open(); }, holdFor);
    } catch {
      if (request.signal.aborted) return;
      button.removeAttribute('aria-disabled'); open(); setTimeout(() => refuse('Could not send. Try again'), 120);
    } finally { request = null; }
  });
  on(field, 'input', () => root.classList.remove('pb-error'));
  on(root, 'keydown', event => { if (event.key === 'Escape' && state() === 'open') { event.preventDefault(); close(true); } });
  on(root, 'focusout', () => setTimeout(() => { if (state() === 'open' && !root.contains(pbActive(root)) && !field.value.trim()) close(false); }, 0));

  const api = {
    get state() { return { phase: state(), email: field.value.trim(), role: roles[which] }; },
    reset() { clearTimeout(timer); request?.abort(); field.value = ''; status.textContent = ''; button.removeAttribute('aria-disabled'); close(false); },
    destroy() { clearTimeout(timer); request?.abort(); off.abort(); delete root.__pb; },
  };
  root.__pb = api;
  return api;
}
// The catalog preview sends nothing.
const demo = { onInvite: () => new Promise(resolve => setTimeout(resolve, 400)) };
