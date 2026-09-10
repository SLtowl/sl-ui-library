const root = document.querySelector('.menu-demo');
const menu = MatteMenu.mount(root, {
  onSelect(values) {
    // Connect these values to your application.
  }
});
// menu.reset() restores defaults; menu.destroy() removes listeners.
