// Pass onFollow(following, { signal }). The button changes at once; reject and it changes back with a shake.
SLFollow.mount(document.querySelector('.pb-follow'), {
  // Save the new state. Throw to undo it on the button.
  onFollow: async (following, { signal }) => {
    const response = await fetch('/api/follow', { method: following ? 'POST' : 'DELETE', signal });
    if (!response.ok) throw new Error('Follow failed');
  },
});
