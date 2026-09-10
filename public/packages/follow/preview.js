// Display options only. Real integration lives in example.js.
const params = new URLSearchParams(location.search);
document.querySelector('.sl-follow').style.setProperty('--follow-unit', params.get('scale') === '2' ? '2px' : '1px');
if (params.get('embed') === '1') document.body.classList.add('embedded');
