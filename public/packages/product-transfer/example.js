// Pass max for the available balance and read onChange({ amount, currency, valid, over }). Call setMax(value) whenever the balance changes. Without max there is no meter and no Max button.
SLTransfer.mount(document.querySelector('.pb-transfer'), {
  max: 2400,
  onChange: ({ amount, currency, valid }) => {
    document.querySelector('#send').disabled = !valid;
  },
});
