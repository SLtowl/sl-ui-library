(() => {
  'use strict';
  const caseValues = Object.freeze(['sentence', 'upper', 'lower']);
  const alignValues = Object.freeze(['left', 'center', 'right']);
  const listValues = Object.freeze(['bullets', 'numbers', 'checks']);
  const defaultLines = Object.freeze(['Review the title', 'Refine the opening', 'Share the draft']);
  function mount(root, options = {}) {
    if (!root?.matches('.sl-component')) throw new TypeError('Expected a .sl-component root.');
    const view = root.ownerDocument.defaultView;
    root.dispatchEvent(new view.Event('sl:buttons-remount'));
    const life = new view.AbortController();
    const buttons = [...root.querySelectorAll('[data-command]')];
    const byCommand = Object.fromEntries(buttons.map(button => [button.dataset.command, button]));
    const editor = root.querySelector('[data-editor]');
    const status = root.querySelector('[data-status]');
    const caseGlyph = root.querySelector('[data-case-glyph]');
    const lines = Array.isArray(options.lines) && options.lines.length ? options.lines.slice(0, 5).map(String) : [...defaultLines];
    let state = { bold: false, italic: false, textCase: 'sentence', strike: false, alignment: 'left', listStyle: 'bullets', indent: 0 };
    let destroyed = false;
    let rovingIndex = 0;
    const listen = (target, type, fn) => target.addEventListener(type, fn, { signal: life.signal });
    const activeElement = () => root.getRootNode().activeElement;
    const snapshot = () => ({ ...state });
    function setRoving(index, focus = false) {
      rovingIndex = Math.max(0, Math.min(buttons.length - 1, index));
      buttons.forEach((button, buttonIndex) => { button.tabIndex = buttonIndex === rovingIndex ? 0 : -1; });
      if (focus) buttons[rovingIndex].focus();
    }
    function rebuildLines() {
      const fragment = root.ownerDocument.createDocumentFragment();
      lines.forEach(value => {
        const line = root.ownerDocument.createElement('div');
        line.dataset.line = '';
        line.textContent = value;
        fragment.append(line);
      });
      editor.replaceChildren(fragment);
    }
    function render(message = '') {
      root.dataset.bold = String(state.bold);
      root.dataset.italic = String(state.italic);
      root.dataset.case = state.textCase;
      root.dataset.strike = String(state.strike);
      root.dataset.align = state.alignment;
      root.dataset.list = state.listStyle;
      root.dataset.indent = String(state.indent);
      byCommand.bold.setAttribute('aria-pressed', String(state.bold));
      byCommand.bold.setAttribute('aria-label', state.bold ? 'Remove bold' : 'Apply bold');
      byCommand.italic.setAttribute('aria-pressed', String(state.italic));
      byCommand.italic.setAttribute('aria-label', state.italic ? 'Remove italic' : 'Apply italic');
      byCommand.strike.setAttribute('aria-pressed', String(state.strike));
      byCommand.strike.setAttribute('aria-label', state.strike ? 'Remove strikethrough' : 'Apply strikethrough');
      const nextCase = caseValues[(caseValues.indexOf(state.textCase) + 1) % caseValues.length];
      const nextAlign = alignValues[(alignValues.indexOf(state.alignment) + 1) % alignValues.length];
      const nextList = listValues[(listValues.indexOf(state.listStyle) + 1) % listValues.length];
      byCommand.case.setAttribute('aria-label', `Change text case to ${nextCase}`);
      byCommand.align.setAttribute('aria-label', `Align text to ${nextAlign}`);
      byCommand.list.setAttribute('aria-label', `Change list to ${nextList}`);
      byCommand.indent.setAttribute('aria-label', state.indent === 3 ? 'Reset indentation' : 'Increase indentation');
      caseGlyph.textContent = state.textCase === 'upper' ? 'AA' : state.textCase === 'lower' ? 'aa' : 'Aa';
      status.textContent = message || 'Formatting ready.';
    }
    function emit(action) {
      const nextState = snapshot();
      options.onChange?.({ action, state: nextState });
      root.dispatchEvent(new view.CustomEvent('sl:action', { bubbles: true, composed: true, detail: { kind: root.dataset.kind, action, state: nextState } }));
    }
    function update(action, next, message, shouldEmit = false) {
      if (destroyed || Object.is(state[action], next)) return false;
      state = { ...state, [action]: next };
      render(message);
      if (shouldEmit) emit(action);
      return true;
    }
    function toggle(command, shouldEmit = false) {
      const key = command === 'case' ? 'textCase' : command === 'align' ? 'alignment' : command === 'list' ? 'listStyle' : command;
      if (['bold', 'italic', 'strike'].includes(command)) return update(key, !state[key], `${command[0].toUpperCase()}${command.slice(1)} ${state[key] ? 'off' : 'on'}.`, shouldEmit);
      if (command === 'case') {
        const next = caseValues[(caseValues.indexOf(state.textCase) + 1) % caseValues.length];
        return update(key, next, `Text case: ${next}.`, shouldEmit);
      }
      if (command === 'align') {
        const next = alignValues[(alignValues.indexOf(state.alignment) + 1) % alignValues.length];
        return update(key, next, `Alignment: ${next}.`, shouldEmit);
      }
      if (command === 'list') {
        const next = listValues[(listValues.indexOf(state.listStyle) + 1) % listValues.length];
        return update(key, next, `List style: ${next}.`, shouldEmit);
      }
      if (command === 'indent') {
        const next = (state.indent + 1) % 4;
        return update('indent', next, `Indent level: ${next}.`, shouldEmit);
      }
      return false;
    }
    function activate(event) {
      const button = event.currentTarget;
      setRoving(buttons.indexOf(button));
      if (activeElement() !== button) button.focus();
      toggle(button.dataset.command, true);
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
    function onEditorInput() {
      const blocks = [...editor.childNodes].map(node => node.textContent);
      const text = blocks.length > 1 ? blocks.join('\n') : editor.textContent;
      options.onInput?.({ text });
      root.dispatchEvent(new view.CustomEvent('sl:text-input', { bubbles: true, composed: true, detail: { kind: root.dataset.kind, text } }));
    }
    function reset() {
      if (destroyed) return;
      state = { bold: false, italic: false, textCase: 'sentence', strike: false, alignment: 'left', listStyle: 'bullets', indent: 0 };
      rebuildLines();
      setRoving(0);
      render();
    }
    function destroy() {
      if (destroyed) return;
      reset();
      destroyed = true;
      life.abort();
    }
    buttons.forEach(button => listen(button, 'click', activate));
    listen(root.querySelector('[role="toolbar"]'), 'keydown', onToolbarKey);
    listen(editor, 'input', onEditorInput);
    listen(root, 'sl:buttons-remount', destroy);
    reset();
    return {
      toggleBold: () => toggle('bold', true), setBold: value => update('bold', Boolean(value), 'Bold updated.'),
      toggleItalic: () => toggle('italic', true), setItalic: value => update('italic', Boolean(value), 'Italic updated.'),
      cycleCase: () => toggle('case', true), setCase: value => caseValues.includes(String(value)) && update('textCase', String(value), 'Text case updated.'),
      toggleStrike: () => toggle('strike', true), setStrike: value => update('strike', Boolean(value), 'Strikethrough updated.'),
      cycleAlignment: () => toggle('align', true), setAlignment: value => alignValues.includes(String(value)) && update('alignment', String(value), 'Alignment updated.'),
      cycleList: () => toggle('list', true), setListStyle: value => listValues.includes(String(value)) && update('listStyle', String(value), 'List style updated.'),
      cycleIndent: () => toggle('indent', true), setIndent: value => Number.isInteger(Number(value)) && Number(value) >= 0 && Number(value) <= 3 && update('indent', Number(value), 'Indent updated.'),
      reset, destroy, get state() { return snapshot(); }
    };
  }
  function mountPreview(root) { return mount(root); }
  window.SLComponent = { mount, mountPreview };
})();
