// Pass onSend(email, { signal }) to email the code and onVerify(code, { signal }) to check it. Throw from onVerify for a wrong code.
SLSignIn.mount(document.querySelector('.pb-signin'), {
  // Email the code. Throw to show the error and keep the address.
  onSend: async (email, { signal }) => {
    const response = await fetch('/api/auth/send', { method: 'POST', body: JSON.stringify({ email }), signal });
    if (!response.ok) throw new Error('Could not send');
  },
  // Check the code. Throw when it is wrong.
  onVerify: async (code, { signal }) => {
    const response = await fetch('/api/auth/verify', { method: 'POST', body: JSON.stringify({ code }), signal });
    if (!response.ok) throw new Error('Wrong code');
  },
});
