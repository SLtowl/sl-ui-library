// Pass onSubscribe(email, { signal }); resolve once your mailing service accepts the address, reject to let the person try again.
SLSubscribe.mount(document.querySelector('.pb-subscribe'), {
  // Send the address to your mailing service. Resolve when it is accepted, throw to show the error.
  onSubscribe: async (email, { signal }) => {
    const response = await fetch('/api/subscribe', { method: 'POST', body: JSON.stringify({ email }), signal });
    if (!response.ok) throw new Error('Subscribe failed');
  },
});
