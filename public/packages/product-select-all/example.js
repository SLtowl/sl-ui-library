// Read onChange(selected), a list of the chosen item names. Add or remove rows in the markup; keep --i counting from 0.
SLSelectAll.mount(document.querySelector('.pb-selectall'), {
  onChange: selected => { document.querySelector('#count').textContent = selected.length; },
});
