// Pass onApply(code, { signal }); resolve with { label: '−20%' } for a good code, throw for a bad one. Hovering an applied code offers Remove code; onRemove(code) runs then.
SLPromo.mount(document.querySelector('.pb-promo'), {
  // Check the code. Return the text to show, throw if it does not work.
  onApply: async (code, { signal }) => {
    const response = await fetch('/api/promo?code=' + encodeURIComponent(code), { signal });
    if (!response.ok) throw new Error('Unknown code');
    const { percent } = await response.json();
    return { label: '−' + percent + '%' };
  },
  onRemove: code => fetch('/api/promo', { method: 'DELETE' }),
});
