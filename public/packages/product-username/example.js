// Pass check(name, { signal }) and return true for free, false for taken, or { free, suggest: [names] }. Read onChange({ name, free }).
SLUsername.mount(document.querySelector('.pb-username'), {
  check: async (name, { signal }) => (await fetch('/api/username?name=' + encodeURIComponent(name), { signal })).json(),
  onChange: ({ free }) => { document.querySelector('#next').disabled = !free; },
});
