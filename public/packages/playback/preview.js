// Preview scaling only. Remove this file in your project.
const params = new URLSearchParams(location.search);
document.querySelector('.sl-playback').style.setProperty('--playback-unit', params.get('scale') === '2' ? '2px' : '1px');
if (params.get('embed') === '1') document.body.classList.add('embedded');
