// List rows from the lowest level to the highest in the markup and read onChange(selected).
SLPermissions.mount(document.querySelector('.pb-permissions'), {
  onChange: selected => { savePermissions(selected); },
});
