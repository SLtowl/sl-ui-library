// Read onChange(checked) or state.checked when the form is sent.
SLRemember.mount(document.querySelector('.pb-remember'), {
  onChange: checked => { document.querySelector('#remember').value = checked; },
});
