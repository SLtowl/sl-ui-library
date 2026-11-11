// Pass from and to, then read onChange({ from, to }).
SLPriceRange.mount(document.querySelector('.pb-pricerange'), {
  onChange: ({ from, to }) => { filterProducts(from, to); },
});
