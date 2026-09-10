const code = MatteCodeInput.mount(document.querySelector('#code-field'), {
  expectedCode: '482731' // Demo only. Verify real codes on your server.
});

document.querySelector('#code-field').addEventListener('codecomplete', event => {
  // event.detail contains { code, valid } for this local demonstration.
});
