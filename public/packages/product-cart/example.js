// Pass onChange(quantity) to update the cart; 0 means removed. Set max to limit the quantity.
SLCart.mount(document.querySelector('.pb-cart'), {
  max: 9,
  // Called after every change. 0 means the item left the cart.
  onChange: quantity => fetch('/api/cart/42', { method: 'PUT', body: JSON.stringify({ quantity }) }),
});
