// Read onChange(on). Pass on: false to start muted.
SLNotifications.mount(document.querySelector('.pb-notifications'), {
  on: true,
  onChange: on => { document.querySelector('#alerts').checked = on; },
});
