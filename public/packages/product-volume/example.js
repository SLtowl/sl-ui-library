// Pass value from 0 to 100 and read onChange(value).
SLVolume.mount(document.querySelector('.pb-volume'), {
  onChange: value => { player.volume = value / 100; },
});
