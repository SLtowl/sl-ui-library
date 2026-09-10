// Preview setup, not part of the button controller.
// For your project, supply your own onCancel callback in example.js.
const previewRoot = document.querySelector('.button-kit');
const previewParams = new URLSearchParams(location.search);
previewRoot.style.setProperty('--unit', Number(previewParams.get('scale')) === 2 ? '2px' : '1px');
if (previewParams.get('embed') === '1') document.body.classList.add('embedded');


function closeEditor() {
  // Connect your close, discard or navigation action here.
}
