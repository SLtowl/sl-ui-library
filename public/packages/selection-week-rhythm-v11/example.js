// Standalone demonstration: all selections remain local to this component.
SLComponent.mountPreview(document.querySelector('.sl-component'));

// In your app, replace the call above with:
// const controller = SLComponent.mount(root, { onChange(state) { /* Connect your setting here. */ } });
// days contains unique keys mon through sun, normalized into week order. Day buttons use Space or Enter. Weekdays and Weekend replace the whole selection; Clear allows an empty selection.
// Initial state: { days: ["mon", "tue", "wed", "thu", "fri"] }
// controller.setState(patch) validates and updates silently; pass { emit: true } to notify.
// selectionchange bubbles across Shadow DOM; event.detail.state is an independent snapshot.
// controller.state returns a copy. reset() restores the package defaults without an event.
// destroy() removes listeners and stops CSS motion; repeated calls are safe.
// Repeated mount on the same root returns its existing controller until destroyed.
