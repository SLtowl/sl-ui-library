/* Standalone controller. No runtime dependencies. */
(() => {
const mounted = new WeakMap();
let nextId = 0;

// onShare({ url, signal }) may return { label: 'Sent' } or { status: 'canceled' }.
// Without onShare, sharing uses the system share sheet when supported.
function mountShareButton(root, { getUrl, onShare, labels = {}, holdMs = 1900, feedback } = {}) {
  if (mounted.has(root)) return mounted.get(root);
  const button = root?.querySelector('.sl-share');
  const popover = root?.querySelector('.sl-share__popover');
  const field = root?.querySelector('.sl-share__url');
  const copy = root?.querySelector('.sl-share__copy');
  const send = root?.querySelector('.sl-share__send');
  const label = root?.querySelector('.sl-share__label');
  if (!button || !popover || !field || !copy || !label) throw new TypeError('Share needs its button, panel, URL field and copy action.');
  if (typeof getUrl !== 'function') throw new TypeError('Share needs a getUrl callback.');
  if (onShare !== undefined && typeof onShare !== 'function') throw new TypeError('onShare must be a function.');
  const text = { idle: 'Share', copy: 'Copy link', copied: 'Link copied', send: 'Share…', sharing: 'Sharing', shared: 'Shared', error: 'Try again', ...labels };
  if (Object.values(text).some(value => typeof value !== 'string' || !value.trim())) throw new TypeError('Share labels must be non-empty strings.');
  if (!Number.isFinite(holdMs) || holdMs < 0) throw new TypeError('holdMs must be a non-negative number.');
  const doc = root.ownerDocument, view = doc.defaultView;
  const lifecycle = new AbortController();
  const motion = view.matchMedia('(prefers-reduced-motion: reduce)');
  let open = false, destroyed = false, busy = false, revision = 0, labelRevision = 0;
  let labelAnimation, resetTimer, request, targetLabel = text.idle;
  copy.textContent = text.copy;
  if (send) { send.textContent = text.send; send.hidden = !onShare && typeof view.navigator.share !== 'function'; }

  function settleLabel() {
    labelRevision++; labelAnimation?.cancel(); labelAnimation = null;
    label.textContent = targetLabel; label.style.removeProperty('opacity');
  }
  async function setLabel(text) {
    if (text === targetLabel) return;
    const opacity = Number(view.getComputedStyle(label).opacity);
    targetLabel = text; const id = ++labelRevision;
    label.style.opacity = String(opacity); labelAnimation?.cancel();
    if (motion.matches || !label.animate) { settleLabel(); return; }
    try {
      if (label.textContent !== text) {
        labelAnimation = label.animate([{ opacity }, { opacity: 0 }], { duration: 150 * opacity, easing: 'ease', fill: 'forwards' });
        await labelAnimation.finished;
        if (destroyed || id !== labelRevision) return;
        label.style.opacity = '0'; labelAnimation.cancel(); label.textContent = text;
      }
      const from = Number(label.style.opacity);
      labelAnimation = label.animate([{ opacity: from }, { opacity: 1 }], { duration: 280 * (1 - from), easing: 'ease', fill: 'forwards' });
      await labelAnimation.finished;
      if (id === labelRevision && !destroyed) settleLabel();
    } catch (error) { if (error.name !== 'AbortError' && id === labelRevision && !destroyed) settleLabel(); }
  }
  function setBusy(value) {
    busy = value;
    button.setAttribute('aria-busy', String(value));
    for (const action of [copy, send]) {
      if (!action) continue;
      if (value) action.setAttribute('aria-disabled', 'true');
      else action.removeAttribute('aria-disabled');
    }
  }
  function close(restoreFocus = false) {
    if (destroyed) return;
    if (request) { setLabel(text.idle); button.setAttribute('aria-label', text.idle); }
    revision++; request?.abort(); request = null; setBusy(false);
    open = false; root.dataset.shareOpen = 'false'; button.setAttribute('aria-expanded', 'false');
    popover.inert = true; popover.setAttribute('aria-hidden', 'true');
    if (restoreFocus) button.focus({ preventScroll: true });
  }
  function show() {
    if (destroyed || button.disabled || busy) return;
    try {
      const url = new URL(String(getUrl()));
      if (!['http:', 'https:'].includes(url.protocol)) throw new TypeError('Use an HTTP or HTTPS link.');
      field.value = url.href;
    } catch {
      if (feedback) feedback.textContent = 'A valid link is not available.';
      return;
    }
    clearTimeout(resetTimer); root.dataset.shareCopied = 'false'; setLabel(text.idle); button.setAttribute('aria-label', text.idle);
    if (feedback) feedback.textContent = '';
    open = true; root.dataset.shareOpen = 'true'; button.setAttribute('aria-expanded', 'true');
    popover.inert = false; popover.setAttribute('aria-hidden', 'false'); copy.focus({ preventScroll: true });
  }
  function confirm(caption, action, url) {
    request = null;
    close(true); root.dataset.shareCopied = 'true'; setLabel(caption);
    button.setAttribute('aria-label', caption);
    if (feedback) feedback.textContent = action === 'copy' ? `${caption}. Nothing was sent to another person.` : `${caption}.`;
    resetTimer = setTimeout(() => { root.dataset.shareCopied = 'false'; setLabel(text.idle); button.setAttribute('aria-label', text.idle); }, holdMs);
    button.dispatchEvent(new view.CustomEvent(action === 'copy' ? 'sharecopy' : 'sharecomplete', { bubbles: true, composed: true, detail: { url, action, label: caption } }));
  }
  async function copyLink() {
    if (destroyed || busy || !open) return;
    setBusy(true); const id = ++revision, url = field.value;
    try {
      await view.navigator.clipboard.writeText(url);
      if (destroyed || id !== revision) return;
      confirm(text.copied, 'copy', url);
    } catch {
      if (destroyed || id !== revision) return;
      field.focus(); field.select();
      if (feedback) feedback.textContent = 'Link selected. Press Ctrl+C or Command+C to copy.';
    } finally { if (!destroyed && id === revision) setBusy(false); }
  }
  async function shareLink() {
    if (destroyed || busy || !open || send?.hidden) return;
    const url = field.value;
    // Hide the panel before calling native share, without losing user activation.
    close(true); setBusy(true); request = new AbortController();
    const id = ++revision;
    setLabel(text.sharing); button.setAttribute('aria-label', text.sharing);
    try {
      const result = onShare ? await onShare({ url, signal: request.signal }) : await view.navigator.share({ url });
      if (destroyed || id !== revision) return;
      if (result?.status === 'canceled') {
        setLabel(text.idle); button.setAttribute('aria-label', text.idle);
        if (feedback) feedback.textContent = 'Sharing canceled.';
      } else {
        const caption = typeof result?.label === 'string' && result.label.trim() ? result.label : text.shared;
        confirm(caption, 'share', url);
      }
    } catch (error) {
      if (destroyed || id !== revision) return;
      const canceled = error?.name === 'AbortError';
      setLabel(canceled ? text.idle : text.error);
      button.setAttribute('aria-label', canceled ? text.idle : text.error);
      if (feedback) feedback.textContent = canceled ? 'Sharing canceled.' : 'Could not share. Try again or copy the link.';
    } finally { if (!destroyed && id === revision) { request = null; setBusy(false); } }
  }
  button.type = 'button'; button.disabled = false;
  if (!popover.id) popover.id = 'sl-share-panel-' + (++nextId);
  button.setAttribute('aria-controls', popover.id);
  const listen = (target, type, callback) => target.addEventListener(type, callback, { signal: lifecycle.signal });
  listen(button, 'click', () => open ? close(true) : show());
  listen(copy, 'click', copyLink);
  if (send) listen(send, 'click', shareLink);
  listen(root, 'keydown', event => { if (event.key === 'Escape' && open) { event.preventDefault(); event.stopPropagation(); close(true); } });
  listen(root, 'focusout', event => {
    // During blur, activeElement can briefly be <body> before the next control focuses.
    if (root.contains(event.relatedTarget)) return;
    queueMicrotask(() => { if (!destroyed && open && !root.contains(root.getRootNode().activeElement || doc.activeElement)) close(); });
  });
  listen(doc, 'pointerdown', event => { if (open && !event.composedPath().includes(root)) close(); });
  listen(motion, 'change', () => { if (motion.matches) settleLabel(); });
  const controller = {
    open: show, close: () => close(true),
    reset() { if (destroyed) return; close(); clearTimeout(resetTimer); root.dataset.shareCopied = 'false'; targetLabel = text.idle; settleLabel(); button.setAttribute('aria-label', text.idle); if (feedback) feedback.textContent = ''; },
    destroy() { if (destroyed) return; controller.reset(); destroyed = true; button.disabled = true; lifecycle.abort(); mounted.delete(root); },
  };
  controller.reset(); mounted.set(root, controller); return controller;
}

window.MatteShare = { mount: mountShareButton };
})();
