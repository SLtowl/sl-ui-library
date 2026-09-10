const website = MatteUrlInput.mount(document.querySelector('#url-field'));

// website.validate() checks the native URL syntax and requires http:// or https://.
// Verify and sanitize URLs again wherever your application consumes them.
