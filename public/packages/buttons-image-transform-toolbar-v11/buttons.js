(() => {
  'use strict';
  const rotations = Object.freeze([0, 90, 180, 270]);
  function mount(root, options = {}) {
    if (!root?.matches('.sl-component')) throw new TypeError('Expected a .sl-component root.');
    const view = root.ownerDocument.defaultView;
    root.dispatchEvent(new view.Event('sl:buttons-remount'));
    const life = new view.AbortController();
    const buttons = [...root.querySelectorAll('[data-command]')];
    const rotateButton = root.querySelector('[data-command="rotate"]');
    const mirrorButton = root.querySelector('[data-command="mirror"]');
    const status = root.querySelector('[data-status]');
    let angle = 0;
    let mirrored = false;
    let destroyed = false;
    let rovingIndex = 0;
    const listen = (target, type, fn) => target.addEventListener(type, fn, { signal: life.signal });
    const activeElement = () => root.getRootNode().activeElement;
    const normalizedRotation = () => ((angle % 360) + 360) % 360;
    const snapshot = () => ({ rotation: String(normalizedRotation()), angle, mirrored });
    function setRoving(index, focus = false) {
      rovingIndex = Math.max(0, Math.min(buttons.length - 1, index));
      buttons.forEach((button, buttonIndex) => { button.tabIndex = buttonIndex === rovingIndex ? 0 : -1; });
      if (focus) buttons[rovingIndex].focus();
    }
    function render(message = '') {
      const rotation = normalizedRotation();
      root.dataset.rotation = String(rotation);
      root.dataset.mirrored = String(mirrored);
      root.style.setProperty('--turn-angle', `${angle}deg`);
      root.style.setProperty('--turn-scale', rotation === 90 || rotation === 270 ? '.72' : '1');
      root.style.setProperty('--mirror-scale', mirrored ? '-1' : '1');
      rotateButton.setAttribute('aria-label', `Rotate image to ${(rotation + 90) % 360} degrees`);
      mirrorButton.setAttribute('aria-pressed', String(mirrored));
      mirrorButton.setAttribute('aria-label', mirrored ? 'Restore image orientation' : 'Mirror image horizontally');
      status.textContent = message || `Rotation: ${rotation}°. ${mirrored ? 'Mirrored.' : 'Original orientation.'}`;
    }
    function emit(action) {
      const state = snapshot();
      options.onChange?.({ action, state });
      root.dispatchEvent(new view.CustomEvent('sl:action', { bubbles: true, composed: true, detail: { kind: root.dataset.kind, action, state } }));
    }
    function rotate(shouldEmit = true) {
      if (destroyed) return false;
      angle += 90;
      render(`Rotation: ${normalizedRotation()}°.`);
      if (shouldEmit) emit('rotate');
      return true;
    }
    function toggleMirror(shouldEmit = true) {
      if (destroyed) return false;
      mirrored = !mirrored;
      render(mirrored ? 'Image mirrored.' : 'Original orientation restored.');
      if (shouldEmit) emit('mirror');
      return true;
    }
    function setRotation(value) {
      const target = Number(value);
      if (destroyed || !rotations.includes(target) || target === normalizedRotation()) return false;
      angle += (target - normalizedRotation() + 360) % 360;
      render();
      return true;
    }
    function setMirrored(value) {
      const next = Boolean(value);
      if (destroyed || next === mirrored) return false;
      mirrored = next;
      render();
      return true;
    }
    function activate(event) {
      const button = event.currentTarget;
      setRoving(buttons.indexOf(button));
      if (activeElement() !== button) button.focus();
      return button.dataset.command === 'rotate' ? rotate(true) : toggleMirror(true);
    }
    function onToolbarKey(event) {
      const index = buttons.indexOf(event.target);
      if (index < 0) return;
      let next = index;
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % buttons.length;
      else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index - 1 + buttons.length) % buttons.length;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = buttons.length - 1;
      else return;
      event.preventDefault();
      setRoving(next, true);
    }
    function reset() {
      if (destroyed) return;
      root.classList.add('is-resetting');
      angle = 0;
      mirrored = false;
      setRoving(0);
      render();
      root.getBoundingClientRect();
      root.classList.remove('is-resetting');
    }
    function destroy() {
      if (destroyed) return;
      reset();
      destroyed = true;
      life.abort();
    }
    buttons.forEach(button => listen(button, 'click', activate));
    listen(root.querySelector('[role="toolbar"]'), 'keydown', onToolbarKey);
    listen(root, 'sl:buttons-remount', destroy);
    reset();
    return { rotate, toggleMirror, setRotation, setMirrored, reset, destroy, get state() { return snapshot(); } };
  }
  function mountPreview(root) { return mount(root); }
  window.SLComponent = { mount, mountPreview };
})();
