// Read onChange({ date, iso, valid }). Pass min and max as Date objects to limit the days that can be chosen.
SLDate.mount(document.querySelector('.pb-date'), {
  min: new Date(),
  onChange: ({ iso, valid }) => {
    if (valid) document.querySelector('#due').value = iso;
  },
});
