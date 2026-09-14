// Interactive local preview. No real requests or data changes.
const root = document.querySelector('.fb-demo');
const preview = MatteFeedbackPreview.mount(root, MatteFeedback.mount);

// Application integration: replace the preview mount above with:
// const feedback = MatteFeedback.mount(root, {
//   onAction: async (action, { signal, onProgress }) => {
//     // Await your real operation; reject on failure, honor signal.
//     // For measurable work, call onProgress(percent) with 0–100.
//   }
// });
// Remove the [data-demo] controls when connecting your app.
// feedback.show({title, detail, tone}) presents a literal-text message.
// feedback.push({title, detail}) queues a notification (stack only).
// feedback.update(percent), feedback.setMode('unknown') control progress.
// feedback.run(action) calls onAction; feedback.cancel() aborts it.
// feedback.reset() restores defaults; feedback.destroy() removes listeners.
// Success is shown only after onAction resolves. Demo success is not a server response.
