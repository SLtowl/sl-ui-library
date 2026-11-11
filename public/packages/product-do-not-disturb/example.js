// Read onChange(on). Pass on: true to start silenced.
SLDoNotDisturb.mount(document.querySelector('.pb-dnd'), {
  on: false,
  onChange: on => { document.querySelector('#quiet').checked = on; },
});
