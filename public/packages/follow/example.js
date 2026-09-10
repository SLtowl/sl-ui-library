// A small local model for this example. Replace it with your application state.
const profile = { following: false };
const follow = MatteFollow.mount(document.querySelector('.sl-follow'), {
  feedback: document.querySelector('.follow-feedback'),
  onChange: following => {
    profile.following = following;
    // Connect your application's follow/unfollow action here.
    // If it fails, restore the previous state with follow.setFollowing(value).
  }
});
follow.setFollowing(profile.following);

// onChange receives a boolean after a user action. The followchange event
// also exposes event.detail.following. setFollowing() and reset() are silent.
// Call follow.destroy() before removing the button.
