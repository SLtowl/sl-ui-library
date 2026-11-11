// Read onChange({ url, host, valid }); url always includes https://. Pass icon(url) to return an image for the site badge.
SLLink.mount(document.querySelector('.pb-link'), {
  onChange: ({ url, valid }) => {
    if (valid) document.querySelector('#website').value = url;
  },
});
