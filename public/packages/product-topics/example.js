// Read onChange(selected), a list of the chosen topic names. Add or remove chips in the markup.
SLTopics.mount(document.querySelector('.pb-topics'), {
  onChange: selected => { saveTopics(selected); },
});
