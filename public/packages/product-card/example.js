// Pass onLink({ number, expiry, cvc, brand, last4 }, { signal }); hand the values straight to your payment provider and never store them yourself. Throw to mark the card as refused.
SLCardPlate.mount(document.querySelector('.pb-cardplate'), {
  // Hand the card to your payment provider. Throw when it is refused.
  onLink: async (card, { signal }) => {
    const response = await fetch('/api/cards', { method: 'POST', body: JSON.stringify(card), signal });
    if (!response.ok) throw new Error('Refused');
  },
});
