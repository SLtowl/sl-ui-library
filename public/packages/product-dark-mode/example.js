// Pass target for the surface the night spreads over and read onChange(on) to apply your theme. Pass on to start in dark mode.
SLDarkMode.mount(document.querySelector('.pb-darkmode'), {
  target: document.body,
  onChange: on => { document.documentElement.dataset.theme = on ? 'dark' : 'light'; },
});
