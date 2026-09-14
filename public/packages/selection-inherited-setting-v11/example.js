// Standalone demonstration: all selections remain local to this component.
SLComponent.mountPreview(document.querySelector('.sl-component'));

// In your app, replace the call above with:
// const controller = SLComponent.mount(root, { onChange(state) { /* Connect your setting here. */ } });
// source is workspace or custom. workspace and custom are booleans. Update the inherited value through setState({ workspace: value }); the custom choice survives source changes. Effective value is state[state.source].
// Initial state: { source: "workspace", workspace: true, custom: false }
// controller.setState(patch) validates and updates silently; pass { emit: true } to notify.
// selectionchange bubbles across Shadow DOM; event.detail.state is an independent snapshot.
// controller.state returns a copy. reset() restores the package defaults without an event.
// destroy() removes listeners and stops CSS motion; repeated calls are safe.
// Repeated mount on the same root returns its existing controller until destroyed.
