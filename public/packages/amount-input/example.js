const amount = MatteAmountInput.mount(document.querySelector('#amount-field'), {
  locale: 'en-US',
  minimumFractionDigits: 0,
  maximumFractionDigits: 2
});

document.querySelector('#amount-field').addEventListener('amountchange', event => {
  // event.detail.amount contains the parsed number.
});
