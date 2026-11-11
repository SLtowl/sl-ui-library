// Read onChange(checked), or state.checked before sending the form.
SLTerms.mount(document.querySelector('.pb-terms'), {
  onChange: checked => { document.querySelector('#continue').disabled = !checked; },
});
