// Read onChange({ hex, valid }). Pass palette as a list of #RRGGBB to replace the ready colors. Call set(value) to start with a color.
const color = SLColor.mount(document.querySelector('.pb-color'), {
  onChange: ({ hex, valid }) => {
    if (valid) document.documentElement.style.setProperty('--brand', hex);
  },
});
color.set('#2D6AF6');
