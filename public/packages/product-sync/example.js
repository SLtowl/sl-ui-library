// Read onChange(on). Pass run, a function that returns a promise, and the status stays on Syncing until it finishes. If it rejects, the switch turns off.
SLSync.mount(document.querySelector('.pb-sync'), {
  on: true,
  run: () => fetch('/api/sync', { method: 'POST' }),
  onChange: on => { document.querySelector('#sync').checked = on; },
});
