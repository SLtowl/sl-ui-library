// Pass value from 0 to 100, set --sd-color on the root and read onChange(value).
SLOpacity.mount(document.querySelector('.pb-opacity'), {
  onChange: value => { layer.style.opacity = value / 100; },
});
