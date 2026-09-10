import { overlay } from './buttons.js';
const root = document.querySelector('.overlay-demo');
root.addEventListener('overlaycommit', event => {
  // Connect event.detail to your application. This preview only updates local UI.
});
root.addEventListener('overlayaction', event => { /* event.detail.value */ });
root.addEventListener('overlaytourcomplete', () => { /* Local tour finished. */ });
// overlay.open(); overlay.close(); overlay.reset(); overlay.destroy();
