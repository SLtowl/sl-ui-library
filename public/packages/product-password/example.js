// Read onChange({ value, valid }); send the password only when valid is true. Pass rules as { label, test(value) } to replace the built-in three.
SLPassword.mount(document.querySelector('.pb-password'), {
  onChange: ({ valid }) => {
    document.querySelector('#create').disabled = !valid;
  },
});
