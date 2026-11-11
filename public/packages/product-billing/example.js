// Pass prices and notes for your plan and read onChange(period), which gives 'monthly' or 'yearly'. Set --bl-text and --bl-note on the root to match a dark page.
SLBilling.mount(document.querySelector('.pb-billing'), {
  prices: { monthly: '$15', yearly: '$12' },
  notes: { monthly: 'Save 20% with Yearly', yearly: 'You save $36 a year' },
  onChange: period => { document.querySelector('#plan').value = period; },
});
