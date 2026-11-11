// Pass value and read onChange(value).
SLBudget.mount(document.querySelector('.pb-budget'), {
  onChange: value => { document.querySelector('#budget').value = value; },
});
