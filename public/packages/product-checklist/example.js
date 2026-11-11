// Read onChange({ done, total }). Keep one line per number in the heading when you change the number of steps.
SLChecklist.mount(document.querySelector('.pb-checklist'), {
  onChange: ({ done, total }) => { if (done === total) finishSetup(); },
});
