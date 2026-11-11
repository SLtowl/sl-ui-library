// Pass value as a percentage from 25 to 200 and read onChange(value).
SLZoom.mount(document.querySelector('.pb-zoom'), {
  onChange: value => { canvas.style.scale = value / 100; },
});
