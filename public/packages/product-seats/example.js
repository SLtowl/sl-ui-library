// Pass value, rate, betterRate and betterFrom, then read onChange({ seats, price }).
SLSeats.mount(document.querySelector('.pb-seats'), {
  onChange: ({ seats, price }) => { updatePlan(seats, price); },
});
