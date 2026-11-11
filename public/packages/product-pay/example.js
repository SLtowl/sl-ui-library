// Pass onPay({ amount, signal }); resolve once the payment is confirmed, reject when it is declined. The bar waits for your answer.
SLPay.mount(document.querySelector('.pb-pay'), {
  // Charge through your payment provider. Resolve when it is confirmed, throw when it is declined.
  onPay: async ({ amount, signal }) => {
    const response = await fetch('/api/pay', { method: 'POST', body: JSON.stringify({ amount }), signal });
    if (!response.ok) throw new Error('Card declined');
  },
});
