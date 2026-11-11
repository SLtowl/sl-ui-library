// Pass onInvite({ email, role }, { signal }); resolve once the invitation is sent. Set roles to the choices your app has; the role pill cycles through them.
SLInvite.mount(document.querySelector('.pb-invite'), {
  roles: ['Editor', 'Viewer'],
  // Send the invitation. Throw to show the error and keep the address.
  onInvite: async ({ email, role }, { signal }) => {
    const response = await fetch('/api/invites', { method: 'POST', body: JSON.stringify({ email, role }), signal });
    if (!response.ok) throw new Error('Invite failed');
  },
});
