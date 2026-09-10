const navigation = MatteNavigation.mount(document.querySelector('.nav-demo'));
// Connect the local handlers in buttons.js to your own router or content.
window.SLNavigationInstance = navigation;
window.addEventListener('pagehide', e => { if (!e.persisted) navigation.destroy(); });
