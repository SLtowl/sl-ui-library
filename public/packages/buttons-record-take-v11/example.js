// Explicit local demonstration. No network or device operation is performed.
SLComponent.mountPreview(document.querySelector('.sl-component'));

// Application integration:
// Pass onStart({ signal }) returning a session object with an idempotent synchronous dispose(), and onStop({ session, signal }). dispose() must stop all device tracks. The start signal stays active until session cleanup. A late session is disposed if start was canceled. Resolve onStop only when stopping succeeds.
// start() and stop() return Promise<boolean>; cancel() aborts only the pending request, so a canceled stop leaves the session recording. reset() and destroy() always dispose the session and abort its lifetime signal. state is { phase, recording, elapsed } in seconds. sl:action reports outcomes; the preview never accesses a microphone.
// Replace mountPreview above with SLComponent.mount(root, options).
// Call controller.destroy() before removing or replacing the component.
// reset() restores the control only; it cannot undo completed external work.
