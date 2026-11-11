// Read onChange(isPrivate). Pass private: true to start locked and text to rename the two words. Set --lk-text on the root to match a dark page.
SLLock.mount(document.querySelector('.pb-lock'), {
  private: false,
  onChange: isPrivate => { document.querySelector('#private').checked = isPrivate; },
});
