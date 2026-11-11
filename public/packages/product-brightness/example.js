// Pass value from 0 to 100 and read onChange(value).
SLBrightness.mount(document.querySelector('.pb-brightness'), {
  onChange: value => { screen.brightness = value / 100; },
});
