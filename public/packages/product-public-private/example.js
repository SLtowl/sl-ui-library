// Read onChange(value), which gives 'public' or 'private'. Pass value to start on Private.
SLPublicPrivate.mount(document.querySelector('.pb-publicprivate'), {
  value: 'public',
  onChange: value => { document.querySelector('#visibility').value = value; },
});
