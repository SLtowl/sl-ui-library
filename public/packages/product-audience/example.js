// Read onChange(isPrivate). Pass private: true to start with only you and text to rename the two lines. Replace the letters in the markup with your people. Set --au-note on the root to match a dark page.
SLAudience.mount(document.querySelector('.pb-audience'), {
  private: false,
  onChange: isPrivate => { document.querySelector('#private').checked = isPrivate; },
});
