// Pass onSend(text, { signal }) and throw to keep the text and mark it as not sent. Enter sends, Shift + Enter adds a line.
SLMessage.mount(document.querySelector('.pb-message'), {
  onSend: async (text, { signal }) => {
    const response = await fetch('/api/messages', { method: 'POST', body: JSON.stringify({ text }), signal });
    if (!response.ok) throw new Error('Not sent');
  },
});
