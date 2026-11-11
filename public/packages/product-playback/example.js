// Pass value and total in seconds and read onChange(value). Call set(value) as the media plays.
SLPlayback.mount(document.querySelector('.pb-playback'), {
  onChange: value => { video.currentTime = value; },
});
