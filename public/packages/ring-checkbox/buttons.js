(() => {
const mounted = new WeakMap();

function mountCheckboxes(root, { onChange } = {}) {
  if (mounted.has(root)) return mounted.get(root);
  if (onChange !== undefined && typeof onChange !== 'function') throw new TypeError('onChange must be a function.');
  const inputs = [...root.querySelectorAll('input[type="checkbox"]')];
  if (!inputs.length) throw new TypeError('Native checkboxes are required.');
  const parent = root.querySelector('[data-parent]');
  const children = [...root.querySelectorAll('[data-child]')];
  const lifecycle = new AbortController();
  let destroyed = false;
  const values = () => inputs.filter(input => input !== parent && input.checked).map(input => input.name);
  function syncParent() {
    if (!parent || !children.length) return;
    const count = children.filter(input => input.checked).length;
    parent.checked = count === children.length;
    parent.indeterminate = count > 0 && count < children.length;
  }
  function change(event) {
    if (!inputs.includes(event.target)) return;
    if (event.target === parent) for (const child of children) { if (!child.disabled) child.checked = parent.checked; }
    syncParent();
    onChange?.(values());
    root.dispatchEvent(new CustomEvent('selectionchange', { bubbles: true, detail: { values: values() } }));
  }
  const reset = () => {
    if (destroyed) return;
    for (const input of inputs) input.checked = input.defaultChecked;
    syncParent();
  };
  root.addEventListener('change', change, { signal: lifecycle.signal });
  const form = inputs[0].form;
  form?.addEventListener('reset', () => queueMicrotask(reset), { signal: lifecycle.signal });
  syncParent();
  const controller = { reset, get values() { return values(); }, destroy() { destroyed = true; lifecycle.abort(); mounted.delete(root); } };
  mounted.set(root, controller);
  return controller;
}

window.MatteCheckboxes = { mount: mountCheckboxes };
})();
