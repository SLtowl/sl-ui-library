// Read onChange(isPrivate). Pass private: true to start on and text to rename the two lines under the title.
SLPrivacyRow.mount(document.querySelector('.pb-privacyrow'), {
  private: false,
  onChange: isPrivate => { document.querySelector('#private').checked = isPrivate; },
});
