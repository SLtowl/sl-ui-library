// Read onChange({ country, code, number, e164, complete }) to get the number. Pass countries as { iso, name, code, mask } to replace the built-in list, common for the short list, country for the starting country.
SLPhone.mount(document.querySelector('.pb-phone'), {
  country: 'GB',
  onChange: phone => {
    // phone.e164 is ready to send when phone.complete is true.
    document.querySelector('#send').disabled = !phone.complete;
  },
});
