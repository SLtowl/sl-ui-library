// Read onChange(days), a list of the chosen day names.
SLWeekdays.mount(document.querySelector('.pb-weekdays'), {
  onChange: days => { saveSchedule(days); },
});
