const field = document.querySelector('#search-field');
const search = MatteSearchInput.mount(field, {
  items: ['Buttons', 'Inputs', 'Toggles', 'Checkboxes', 'Sliders', 'Menus']
});

field.addEventListener('searchselect', event => {
  // event.detail.value is the selected local item.
});
