// Pass value in pixels from 12 to 24 and read onChange(value).
SLTextSize.mount(document.querySelector('.pb-textsize'), {
  onChange: value => { document.documentElement.style.fontSize = value + 'px'; },
});
