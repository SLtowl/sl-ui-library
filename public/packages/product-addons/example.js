// Set each price with data-price in the markup, pass base for the starting amount and read onChange({ total, selected }).
SLAddons.mount(document.querySelector('.pb-addons'), {
  base: 15,
  onChange: ({ total }) => { document.querySelector('#amount').value = total; },
});
