// Pass value from 1 to 5 and read onChange(value).
SLRating.mount(document.querySelector('.pb-rating'), {
  onChange: value => { saveRating(value); },
});
