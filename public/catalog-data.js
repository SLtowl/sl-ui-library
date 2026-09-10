// Component types are separate from motion treatments and export variants.
// Add a ready component here only when its preview, source and download exist.
export const categories = [
  { id: 'buttons', label: 'Buttons', description: 'Action buttons, icon buttons and button groups.', keywords: ['button', 'save', 'cancel', 'кнопки'] },
  { id: 'inputs', label: 'Inputs', description: 'Text fields, search fields, text areas and number inputs.', keywords: ['field', 'text', 'search', 'поля', 'ввод'] },
  { id: 'selection', label: 'Toggles', description: 'On/off switches and segmented selection controls.', keywords: ['switch', 'toggle', 'segment', 'переключатели'] },
  { id: 'checkboxes', label: 'Checkboxes', description: 'Checkboxes, radio buttons and grouped choices.', keywords: ['checkbox', 'radio', 'check', 'select', 'чекбоксы', 'выбор'] },
  { id: 'sliders', label: 'Sliders', description: 'Single-value sliders, range selectors and stepped controls.', keywords: ['range', 'volume', 'ползунки', 'диапазон'] },
  { id: 'menus', label: 'Menus', description: 'Dropdown menus, context menus and command menus.', keywords: ['dropdown', 'context', 'command', 'меню'] },
  { id: 'navigation', label: 'Navigation', description: 'Tabs, breadcrumbs, pagination and navigation bars.', keywords: ['tabs', 'breadcrumbs', 'pagination', 'вкладки', 'навигация'] },
  { id: 'overlays', label: 'Overlays', description: 'Dialogs, drawers, popovers and tooltips.', keywords: ['modal', 'dialog', 'drawer', 'tooltip', 'модальные', 'подсказки'] },
  { id: 'feedback', label: 'Feedback', description: 'Toasts, alerts, progress indicators and loading states.', keywords: ['toast', 'alert', 'progress', 'loading', 'skeleton', 'уведомления', 'загрузка'] },
  { id: 'data-display', label: 'Data display', description: 'Lists, tables, cards, badges and accordions.', keywords: ['list', 'table', 'card', 'badge', 'accordion', 'списки', 'таблицы', 'карточки'] },
];

export const components = [
  {
    id: 'matte-save-cancel',
    category: 'buttons',
    name: 'Save & Cancel',
    description: 'Matte buttons with smooth state changes.',
    motions: ['Soft press', 'Fade-through'],
    variants: ['pair', 'save', 'cancel'],
    keywords: ['async', 'saving', 'saved', 'confirm', 'confirmation', 'primary', 'secondary', 'сохранить', 'сохранение', 'отмена', 'кнопка'],
    page: './component.html?component=matte-save-cancel',
    preview: './packages/pair/index.html?embed=1&scale=1',
    packageRoot: './packages/',
    downloads: { pair: './downloads/matte-pair.zip', save: './downloads/matte-save.zip', cancel: './downloads/matte-cancel.zip' },
  },
  {
    id: 'matte-copy', category: 'buttons', name: 'Copy',
    description: 'Copy text with a soft confirmation.',
    motions: ['Sheet merge', 'Fade-through'], variants: ['copy'],
    keywords: ['clipboard', 'copied', 'text', 'confirmation', 'копировать', 'копирование'],
    page: './component.html?component=matte-copy',
    preview: './packages/copy/index.html?embed=1&scale=1',
    packageRoot: './packages/', downloads: { copy: './downloads/matte-copy.zip' },
    usage: [
      { title: 'Take the component', paragraphs: ['Download the zip and open index.html, or serve the folder on localhost. All scripts and the Instrument Sans font are bundled. Clipboard access depends on your browser; use HTTPS or localhost in your project.'] },
      { title: 'Choose what to copy', paragraphs: ['In example.js, make getText return the text you want to copy. The library preview copies “SL UI Library”. No clipboard contents are read automatically.', 'Copied appears only after the browser confirms the write. If permission is denied, the button shows Try again and explains the problem. Supply a visible feedback element in your project.'] },
      { title: 'Adjust the look', paragraphs: ['Edit the .sl-copy variables in buttons.css for palette and size. holdMs controls how long confirmation stays visible, not the clipboard operation. The controller supports reset() and destroy(). Keyboard focus and reduced motion are supported. The included font license is in OFL.txt.'] },
    ],
  },
  {
    id: 'matte-like', category: 'buttons', name: 'Like',
    description: 'A soft heartbeat. Click again to undo.',
    motions: ['Heart fill', 'Soft pulse'], variants: ['like'],
    keywords: ['heart', 'liked', 'toggle', 'favorite', 'reaction'],
    page: './component.html?component=matte-like',
    preview: './packages/like/index.html?embed=1&scale=1',
    packageRoot: './packages/', downloads: { like: './downloads/matte-like.zip' },
    usage: [
      { title: 'Take the component', paragraphs: ['Download the zip and open index.html. HTML, CSS, JavaScript and the Instrument Sans font are included. No framework or animation library is required.'] },
      { title: 'Connect the action', paragraphs: ['MatteLike.mount returns a controller with setPressed(), reset() and destroy(). Listen for the likechange event and read event.detail.pressed to connect your own storage or request. The preview changes only local state; it does not save to an account.'] },
      { title: 'Adjust the look', paragraphs: ['Change the .sl-like variables in buttons.css for palette and size. Keep the font once per site or replace it with your own. Keyboard focus, reduced motion and high contrast are supported. Call destroy() when removing the component.'] },
    ],
  },
  {
    id: 'matte-download', category: 'buttons', name: 'Download',
    description: 'A download arrow that settles into a confirmation.',
    motions: ['Arrow to check', 'Soft return'], variants: ['download'],
    keywords: ['file', 'export', 'blob', 'complete', 'async'],
    page: './component.html?component=matte-download',
    preview: './packages/download/index.html?embed=1&scale=1',
    packageRoot: './packages/', downloads: { download: './downloads/matte-download.zip' },
    usage: [
      { title: 'Try it and take the component', paragraphs: ['The library preview simulates downloading and never saves a file. Download the ZIP to get the real controller and a working local example. That separate example creates a small text file when clicked. All scripts and the font are included; no framework is required.'] },
      { title: 'Supply your file', paragraphs: ['Pass getFile({ signal }) to MatteDownload.mount. Return a Blob or { blob, filename }, directly or from a promise. Use the signal with fetch to support cancellation.', 'The file is handed to the browser as soon as it is ready. The animation never delays the download. Complete confirms that the file was handed to your browser, not that the browser finished saving it to disk.'] },
      { title: 'Handle its lifecycle', paragraphs: ['Use reset() to abort a pending request and return to idle. Call destroy() before removing the button. Failures show Try again and update the feedback element. Edit the .sl-download CSS variables for palette and size. Keyboard focus and reduced motion are supported; the font license is in OFL.txt.'] },
    ],
  },
  {
    id: 'matte-bookmark', category: 'buttons', name: 'Bookmark',
    description: 'A ribbon that fills as you keep an item.',
    motions: ['Ribbon fill', 'Label fade'], variants: ['bookmark'],
    keywords: ['bookmarked', 'saved item', 'favorite', 'toggle', 'reading list'],
    page: './component.html?component=matte-bookmark',
    preview: './packages/bookmark/index.html?embed=1&scale=1',
    packageRoot: './packages/', downloads: { bookmark: './downloads/matte-bookmark.zip' },
    usage: [
      { title: 'Take the component', paragraphs: ['Download the zip and open index.html. The button toggles a local bookmark state; the sample does not save to an account.'] },
      { title: 'Connect the action', paragraphs: ['MatteBookmark.mount returns setPressed(), reset() and destroy(). Listen for bookmarkchange and use event.detail.pressed to connect your own data layer. Use setPressed(value) to reflect saved state without emitting another change event.'] },
      { title: 'Adjust the look', paragraphs: ['Edit .sl-bookmark variables in buttons.css for palette and size. The label stays centered when its length changes. Keyboard focus, reduced motion and high contrast are supported. Call destroy() when removing the component. The bundled font license is in OFL.txt.'] },
    ],
  },
  {
    id: 'matte-playback', category: 'buttons', name: 'Play / Pause',
    description: 'A play icon that opens into two pause bars.',
    motions: ['Icon morph', 'Label fade'], variants: ['playback'],
    keywords: ['play', 'pause', 'playing', 'video', 'audio', 'media'],
    page: './component.html?component=matte-playback',
    preview: './packages/playback/index.html?embed=1&scale=1',
    packageRoot: './packages/', downloads: { playback: './downloads/matte-playback.zip' },
    usage: [
      { title: 'Take the component', paragraphs: ['Download the zip and open index.html. The preview changes local state only; it does not play media or make external requests.'] },
      { title: 'Connect your player', paragraphs: ['MattePlayback.mount accepts onChange({ playing }) and returns setPlaying(), reset() and destroy(). Connect the callback to your player. If play() fails, call setPlaying(false); use your media events to keep the button in sync.', 'The playbackchange event also provides event.detail.playing. setPlaying(value) updates the button without emitting another change. The action and accessible label change immediately, independently of the visual transition.'] },
      { title: 'Adjust the look', paragraphs: ['Edit .sl-playback variables in buttons.css for palette and size. Keyboard focus, reduced motion and high contrast are supported. Call destroy() before unmounting. The font license is in OFL.txt.'] },
    ],
  },
  {
    id: 'matte-delete', category: 'buttons', name: 'Delete',
    description: 'A single action with a quiet lid motion.',
    motions: ['Lid motion', 'Soft confirmation'], variants: ['delete'],
    keywords: ['remove', 'trash', 'deleted', 'destructive', 'удалить', 'удаление'],
    page: './component.html?component=matte-delete',
    preview: './packages/delete/index.html?embed=1&scale=1',
    packageRoot: './packages/', downloads: { delete: './downloads/matte-delete.zip' },
    usage: [
      { title: 'Try the action', paragraphs: ['Click Delete once to play the lid motion and see Deleted. There is no second confirmation step. The library preview simulates the result and deletes nothing.'] },
      { title: 'Connect a deletion', paragraphs: ['MatteDelete.mount requires onDelete({ signal }) and calls it on the first click. Resolve only when your deletion succeeds and reject on failure. The ZIP example removes only its own local sample text; replace that action with your application logic. Provide confirmation or undo in the host application when needed for irreversible actions.', 'Use the signal to cancel a pending request. reset() resets the control and aborts pending work; it cannot restore deleted data. Call destroy() before removing the component.'] },
      { title: 'Adjust the look', paragraphs: ['Edit .sl-delete variables in buttons.css for palette and size. The label stays centered as the result changes. Keyboard input, reduced motion and high contrast are supported; the font license is in OFL.txt.'] },
    ],
  },
  {
    id: 'matte-upload', category: 'buttons', name: 'Upload',
    description: 'A file lifts into progress and confirmation.',
    motions: ['Arrow lift', 'Progress to check'], variants: ['upload'],
    keywords: ['file', 'uploading', 'complete', 'progress', 'input', 'загрузить', 'загрузка'],
    page: './component.html?component=matte-upload',
    preview: './packages/upload/index.html?embed=1&scale=1',
    packageRoot: './packages/', downloads: { upload: './downloads/matte-upload.zip' },
    usage: [
      { title: 'Try the local preview', paragraphs: ['The library plays a simulated upload. No file chooser opens, and no file is read or sent. This demo adapter is separate from the reusable upload controller.'] },
      { title: 'Supply your upload handler', paragraphs: ['MatteUpload.mount takes a native file input and onUpload(file, { signal, onProgress }). Resolve after your upload succeeds, reject on failure, and report progress from 0 to 1. The component does not assume an endpoint.', 'The ZIP includes the real file chooser. Its example selects a local file without reading or uploading it until you supply onUpload. Use select(file) for an existing File or chooseFile() to open the picker.'] },
      { title: 'Handle its lifecycle', paragraphs: ['reset() aborts pending work and clears progress. destroy() also removes listeners. Edit .sl-upload variables in buttons.css for palette and size. Keyboard input, reduced motion and high contrast are supported; the font license is in OFL.txt.'] },
    ],
  },
  {
    id: 'matte-share', category: 'buttons', name: 'Share',
    description: 'Open a link panel with separate copy and share actions.',
    motions: ['Panel reveal', 'Label fade'], variants: ['share'],
    keywords: ['link', 'clipboard', 'copy link', 'send', 'sent', 'native share', 'поделиться', 'ссылка'],
    page: './component.html?component=matte-share',
    preview: './packages/share/index.html?embed=1&scale=1',
    packageRoot: './packages/', downloads: { share: './downloads/matte-share.zip' },
    usage: [
      { title: 'Choose an action', paragraphs: ['Copy link writes an example.com URL to your clipboard. Share runs a local simulation in the library and sends nothing. These are separate actions; copying a link does not send it.'] },
      { title: 'Connect sharing', paragraphs: ['MatteShare.mount takes the .sl-share-control wrapper, getUrl(), feedback and an optional onShare({ url, signal }). getUrl must return an HTTP or HTTPS URL. Without onShare, the component uses native Web Share when available.', 'Resolve onShare only after your action succeeds. Return { label: "Sent" } when a send has actually completed, or { status: "canceled" } when canceled. An AbortError also means cancellation. The ZIP uses the native sharing path and does not include the library simulation.'] },
      { title: 'Adjust labels and lifecycle', paragraphs: ['labels supports idle, copy, copied, send, sharing, shared and error. Increase --share-width in buttons.css for longer translations. holdMs changes only how long feedback is shown, never when the action runs. open(), close(), reset() and destroy() control the panel. Escape or clicking away closes it. Keyboard input, reduced motion and high contrast are supported.', 'Native sharing confirms a handoff to the system share target, not delivery to a recipient. Use a label such as Sent only when your own handler confirms that result.'] },
    ],
  },
  {
    id: 'matte-follow', category: 'buttons', name: 'Follow',
    description: 'A plus becomes a check when you follow.',
    motions: ['Plus to check', 'Fade-through'], variants: ['follow'],
    keywords: ['following', 'unfollow', 'person', 'profile', 'toggle', 'подписаться', 'подписка'],
    page: './component.html?component=matte-follow',
    preview: './packages/follow/index.html?embed=1&scale=1',
    packageRoot: './packages/', downloads: { follow: './downloads/matte-follow.zip' },
    usage: [
      { title: 'Follow and unfollow', paragraphs: ['Click once to follow and again to unfollow. The preview changes local state only. It does not follow an account or make a network request.'] },
      { title: 'Connect your state', paragraphs: ['MatteFollow.mount accepts onChange(following), where following is a boolean. The followchange event also exposes event.detail.following. Connect either one to your application.', 'setFollowing(value) updates saved state without emitting another change. If an application request fails, restore the previous state with setFollowing(). reset() is silent; destroy() removes the listeners.'] },
      { title: 'Adjust the look', paragraphs: ['Edit .sl-follow variables in buttons.css for palette and size. The word stays centered with room beside the person icon. Keyboard input, reduced motion and high contrast are supported; the font license is in OFL.txt.'] },
    ],
  },
  {
    id: 'matte-text-input', category: 'inputs', name: 'Text input',
    description: 'A matte text field with a label that makes room.',
    motions: ['Floating label', 'Soft focus'], variants: ['text-input'],
    keywords: ['text', 'field', 'label', 'form', 'project name', 'input'],
    page: './component.html?component=matte-text-input',
    preview: './packages/text-input/index.html?embed=1', packageRoot: './packages/',
    downloads: { 'text-input': './downloads/matte-text-input.zip' },
    usage: [
      { title: 'Use the native field', paragraphs: ['The component keeps a real text input and label. Read its value through your form or application as usual; the controller adds only lifecycle helpers. The library preview stores and sends nothing.'] },
      { title: 'Connect and reset', paragraphs: ['MatteTextInput.mount returns reset() and destroy(). Native input and change events continue to work. Keep the label associated with the input when adapting the markup.'] },
      { title: 'Adjust the look', paragraphs: ['Edit the .sl-field variables in buttons.css for palette and timing. The ZIP includes plain HTML, CSS, JavaScript and the Instrument Sans license. Keyboard focus, reduced motion and high contrast are supported.'] },
    ],
  },
  {
    id: 'matte-search-input', category: 'inputs', name: 'Search input',
    description: 'A local search field with compact keyboard-friendly suggestions.',
    motions: ['Lens lift', 'List reveal'], variants: ['search-input'],
    keywords: ['search', 'combobox', 'suggestions', 'autocomplete', 'listbox', 'input'],
    page: './component.html?component=matte-search-input',
    preview: './packages/search-input/index.html?embed=1', packageRoot: './packages/',
    downloads: { 'search-input': './downloads/matte-search-input.zip' },
    usage: [
      { title: 'Supply local choices', paragraphs: ['Pass an array of strings as items to MatteSearchInput.mount. The included example filters local values and makes no request. Replace that array or connect the native input events to your own search layer.'] },
      { title: 'Read a selection', paragraphs: ['Listen for searchselect and read event.detail.value. Arrow keys move through suggestions, Enter chooses, Escape closes, and the clear action returns to an empty input. The controller also provides close(), reset() and destroy().'] },
      { title: 'Adjust the look', paragraphs: ['Edit the .sl-field variables in buttons.css. Preserve the combobox, listbox and option roles when changing markup. Reduced motion, keyboard focus and high contrast are supported.'] },
    ],
  },
  {
    id: 'matte-email-input', category: 'inputs', name: 'Email input',
    description: 'A native email field with quiet format feedback.',
    motions: ['Label float', 'Icon draw'], variants: ['email-input'],
    keywords: ['email', 'validation', 'valid', 'invalid', 'check', 'form', 'input'],
    page: './component.html?component=matte-email-input',
    preview: './packages/email-input/index.html?embed=1', packageRoot: './packages/',
    downloads: { 'email-input': './downloads/matte-email-input.zip' },
    usage: [
      { title: 'Check the format', paragraphs: ['The field uses the browser’s native email validity. A check or cross appears after a short typing pause or on blur. This confirms syntax only; it does not prove that a mailbox exists and sends no request.'] },
      { title: 'Validate in your form', paragraphs: ['MatteEmailInput.mount returns validate(), reset() and destroy(). Call validate() before your submit flow when needed, while keeping server-side validation for real submissions. Editing clears stale feedback.'] },
      { title: 'Adjust the look', paragraphs: ['Edit the .sl-field variables in buttons.css. Keep the live helper associated through aria-describedby. Reduced motion, keyboard focus and high contrast are supported.'] },
    ],
  },
  {
    id: 'matte-password-input', category: 'inputs', name: 'Password input',
    description: 'A password field with two eyes that open and close.',
    motions: ['Eye open', 'Eye close'], variants: ['password-input'],
    keywords: ['password', 'show', 'hide', 'reveal', 'visibility', 'secure', 'input'],
    page: './component.html?component=matte-password-input',
    preview: './packages/password-input/index.html?embed=1', packageRoot: './packages/',
    downloads: { 'password-input': './downloads/matte-password-input.zip' },
    usage: [
      { title: 'Reveal without losing place', paragraphs: ['The control switches the native input type and preserves its focus, selection and horizontal scroll. The included value is sample text only; nothing is logged, stored or sent.'] },
      { title: 'Control visibility', paragraphs: ['MattePasswordInput.mount returns setVisible(), reset(), destroy() and the isVisible getter. The reveal button keeps aria-pressed and its accessible label in sync with the immediate privacy state.'] },
      { title: 'Adjust the look', paragraphs: ['Edit the .sl-field variables and eye styles in buttons.css. Keep autocomplete appropriate for the sign-in or account flow in your real project. Reduced motion, keyboard focus and high contrast are supported.'] },
    ],
  },
  {
    id: 'matte-number-input', category: 'inputs', name: 'Number input',
    description: 'A bounded number field with calm step controls.',
    motions: ['Soft step press', 'Floating label'], variants: ['number-input'],
    keywords: ['number', 'quantity', 'stepper', 'increment', 'decrement', 'min', 'max', 'input'],
    page: './component.html?component=matte-number-input',
    preview: './packages/number-input/index.html?embed=1', packageRoot: './packages/',
    downloads: { 'number-input': './downloads/matte-number-input.zip' },
    usage: [
      { title: 'Use native constraints', paragraphs: ['Set min, max and step on the native number input. The two buttons use those values, disable at the limits, and leave the displayed number stationary during repeated clicks.'] },
      { title: 'Control the value', paragraphs: ['MatteNumberInput.mount returns stepUp(), stepDown(), validate(), reset() and destroy(). Input and change events are dispatched after button steps, so existing form logic continues to work.'] },
      { title: 'Adjust the look', paragraphs: ['Edit the .sl-field variables in buttons.css. Keep visible labels and accessible names for both step buttons. Reduced motion, keyboard focus and high contrast are supported.'] },
    ],
  },
  {
    id: 'matte-textarea-input', category: 'inputs', name: 'Textarea input',
    description: 'A compact native textarea that grows with its content.',
    motions: ['Auto grow', 'Floating label'], variants: ['textarea-input'],
    keywords: ['textarea', 'multiline', 'notes', 'counter', 'character limit', 'input'],
    page: './component.html?component=matte-textarea-input',
    preview: './packages/textarea-input/index.html?embed=1', packageRoot: './packages/',
    downloads: { 'textarea-input': './downloads/matte-textarea-input.zip' },
    usage: [
      { title: 'Grow with the message', paragraphs: ['The controller measures the native textarea as its content changes, grows the surface up to its configured maximum, and keeps the character count stationary. The field remains scrollable without showing a platform scrollbar.'] },
      { title: 'Read and reset', paragraphs: ['MatteTextareaInput.mount returns reset(), destroy() and a length getter. Read the textarea value through your form as usual. No text is stored or submitted by the component.'] },
      { title: 'Adjust the look', paragraphs: ['Change the maximum height, character limit and .sl-field variables in buttons.css. Preserve the visible label and aria-describedby relationship. Reduced motion, keyboard focus and high contrast are supported.'] },
    ],
  },
  {
    id: 'matte-url-input', category: 'inputs', name: 'URL input',
    description: 'A URL field with a turning globe and quiet syntax feedback.',
    motions: ['Globe turn', 'Icon draw'], variants: ['url-input'],
    keywords: ['url', 'website', 'link', 'validation', 'globe', 'input'],
    page: './component.html?component=matte-url-input',
    preview: './packages/url-input/index.html?embed=1', packageRoot: './packages/',
    downloads: { 'url-input': './downloads/matte-url-input.zip' },
    usage: [
      { title: 'Check complete URLs', paragraphs: ['The local demonstration accepts a native valid URL beginning with http:// or https://. It checks syntax only, never visits the address, and clears stale feedback while the user edits.'] },
      { title: 'Validate in your flow', paragraphs: ['MatteUrlInput.mount returns validate(), reset() and destroy(). Sanitize and validate every URL again where your application consumes it, especially before redirects or server requests.'] },
      { title: 'Adjust the look', paragraphs: ['Edit the .sl-field variables and globe paths in buttons.css and index.html. Keep the native URL input, visible label and live helper. Reduced motion, keyboard focus and high contrast are supported.'] },
    ],
  },
  {
    id: 'matte-phone-input', category: 'inputs', name: 'Phone input',
    description: 'A telephone field with common international masks and forgiving deletion.',
    motions: ['Handset ring', 'Live mask'], variants: ['phone-input'],
    keywords: ['phone', 'telephone', 'mask', 'international', 'country code', 'input'],
    page: './component.html?component=matte-phone-input',
    preview: './packages/phone-input/index.html?embed=1', packageRoot: './packages/',
    downloads: { 'phone-input': './downloads/matte-phone-input.zip' },
    usage: [
      { title: 'Format while typing', paragraphs: ['The included formatter covers common +1, +7, +33, +44 and +49 display patterns, adds a +1 demonstration prefix for an unqualified number, and lets Backspace move cleanly through generated punctuation.'] },
      { title: 'Adapt supported regions', paragraphs: ['MattePhoneInput.mount returns format(), ring(), reset() and destroy(). Treat the formatted string as presentation: normalize and validate numbers with the regional rules required by your actual product.'] },
      { title: 'Adjust the look', paragraphs: ['Edit the masks in buttons.js and the .sl-field variables in buttons.css. Keep autocomplete="tel" and the native telephone input for keyboards and assistive technology. Reduced motion is supported.'] },
    ],
  },
  {
    id: 'matte-amount-input', category: 'inputs', name: 'Amount input',
    description: 'A numeric amount field that formats without forcing trailing zeroes.',
    motions: ['Currency spread', 'Format on blur'], variants: ['amount-input'],
    keywords: ['amount', 'money', 'currency', 'number', 'finance', 'input'],
    page: './component.html?component=matte-amount-input',
    preview: './packages/amount-input/index.html?embed=1', packageRoot: './packages/',
    downloads: { 'amount-input': './downloads/matte-amount-input.zip' },
    usage: [
      { title: 'Keep editing predictable', paragraphs: ['The field exposes a plain numeric string while focused and adds local grouping separators on blur. By default it keeps up to two decimals without inventing .00. It does not initiate a payment.'] },
      { title: 'Read the number', paragraphs: ['Pass locale and fraction digit options to MatteAmountInput.mount. Listen for amountchange and read event.detail.amount, or call parse(). Always use a decimal-safe money representation in financial application logic.'] },
      { title: 'Adjust the look', paragraphs: ['Change the visible currency symbol and code in index.html and the spacing tokens in buttons.css. Keep the native label and live error helper. Reduced motion, keyboard focus and high contrast are supported.'] },
    ],
  },
  {
    id: 'matte-code-input', category: 'inputs', name: 'Verification code input',
    description: 'One native code field with six staged result cells.',
    motions: ['Sequential result', 'Group settle'], variants: ['code-input'],
    keywords: ['verification', 'otp', 'one time code', 'pin', 'success', 'error', 'input'],
    page: './component.html?component=matte-code-input',
    preview: './packages/code-input/index.html?embed=1', packageRoot: './packages/',
    downloads: { 'code-input': './downloads/matte-code-input.zip' },
    usage: [
      { title: 'Try the local result', paragraphs: ['The bundled demonstration accepts 482731 and marks any other six digits as incorrect. Fast typing and paste use the same sequential result motion. The six visual cells are driven by one native input, so paste and one-time-code autofill continue to work.'] },
      { title: 'Connect real verification', paragraphs: ['MatteCodeInput.mount accepts expectedCode for this local demonstration and emits codecomplete with { code, valid }. Never ship real verification secrets in client code: send the completed value to your server and render the server result in production.'] },
      { title: 'Adjust the look', paragraphs: ['Edit the success and error tokens in buttons.css while retaining the textual live status, so meaning never depends on color alone. Reduced motion, keyboard focus and high contrast are supported.'] },
    ],
  },
];

components.push(...[
  ['glide', 'Notifications', 'Bell ring', 'Bell strike'],
  ['theme', 'Day & night', 'Smooth slide', 'Sun and moon fade'],
  ['sound', 'Sound waves', 'Wave reveal', 'Mute fade'],
  ['privacy', 'Privacy lock', 'Shackle close', 'Key reveal'],
  ['sync', 'Auto sync', 'Single orbit', 'Soft settle'],
  ['wifi', 'Wi-Fi', 'Signal unfold', 'Quiet fade'],
  ['location', 'Location', 'Pin landing', 'Soft lift'],
  ['battery', 'Battery saver', 'Leaf reveal', 'Fade-through'],
  ['microphone', 'Microphone', 'Mute stroke', 'Wave fade'],
  ['autosave', 'Auto save', 'Check draw', 'Slot settle'],
].map(([id, name, first, second]) => ({
  id: `matte-${id}-toggle`, category: 'selection', name,
  description: `${name} with immediate on/off state and smooth feedback.`,
  motions: [first, second], variants: [`${id}-toggle`],
  keywords: [id, name, 'switch', 'checkbox', 'toggle', 'setting'],
  page: `./component.html?component=matte-${id}-toggle`,
  preview: `./packages/${id}-toggle/index.html?embed=1`, packageRoot: './packages/',
  downloads: { [`${id}-toggle`]: `./downloads/matte-${id}-toggle.zip` },
  usage: [
    { title: 'Connect a setting', paragraphs: ['MatteToggle.mount(root, { onChange(checked) }) connects the native checkbox to your application. This preview changes local state only. Click the label or switch, or use Space when focused.'] },
    { title: 'Control the state', paragraphs: ['setChecked(value) updates state without emitting a change. reset() restores the default checkbox value. destroy() cancels motion and removes listeners. The togglechange event carries event.detail.checked.'] },
    { title: 'Adapt the design', paragraphs: ['Edit the --toggle variables for palette and timing, and data-on / data-off for status text. Keep the native checkbox and its label. Reduced motion preserves all final states.'] },
  ],
})));

components.push(...[
  [
    "draw",
    "Signature check"
  ],
  [
    "fill",
    "Precision square"
  ],
  [
    "sweep",
    "Circle check"
  ],
  [
    "task",
    "Task complete"
  ],
  [
    "group",
    "Select together"
  ],
  [
    "cross-square",
    "Square cross"
  ],
  [
    "cross-circle",
    "Circle cross"
  ],
  [
    "star",
    "Star"
  ],
  [
    "heart",
    "Heart"
  ],
  [
    "bookmark",
    "Bookmark check"
  ],
  [
    "shield",
    "Shield"
  ],
  [
    "pin",
    "Pin"
  ],
  [
    "bell",
    "Follow topic"
  ],
  [
    "ring",
    "Ring outline"
  ],
  [
    "corner",
    "Open corners"
  ],
  [
    "chips",
    "Selection chips"
  ],
  [
    "days",
    "Weekdays"
  ],
  [
    "tiles",
    "Format cards"
  ],
  [
    "swatches",
    "Texture swatches"
  ],
  [
    "round-list",
    "Round checklist"
  ],
  [
    "exclude-list",
    "Exclusion list"
  ],
  [
    "feature-list",
    "Feature list"
  ],
  [
    "file-list",
    "File list"
  ],
  [
    "table",
    "Selection table"
  ],
  [
    "nested",
    "Nested list"
  ]
].map(([slug, name]) => ({
  id: `matte-${slug}-checkbox`, category: 'checkboxes', name,
  description: `${name} with independent selection and reversible motion.`,
  motions: ['Soft selection', 'Reversible feedback'], variants: [`${slug}-checkbox`],
  keywords: [slug, name, 'checkbox', 'selection', 'check', 'form'],
  page: `./component.html?component=matte-${slug}-checkbox`,
  preview: `./packages/${slug}-checkbox/index.html?embed=1`, packageRoot: './packages/',
  downloads: { [`${slug}-checkbox`]: `./downloads/matte-${slug}-checkbox.zip` },
  usage: [
    { title: 'Connect selection', paragraphs: ['MatteCheckboxes.mount(root, { onChange(values) }) returns the selected input names. The selectionchange event also exposes event.detail.values. These examples change local selection only.'] },
    { title: 'Use native controls', paragraphs: ['Labels are clickable and Space toggles the focused checkbox. Multi-selection is supported, including for circular controls. A parent with data-parent summarizes inputs with data-child and displays a dash for partial selection.'] },
    { title: 'Customize', paragraphs: ['Change labels and input names in the HTML, and --check variables in the CSS. reset() restores defaults; destroy() removes listeners. Reduced motion preserves selection without animation.'] },
  ],
})));

components.push(...[
  ['volume', 'Volume', 'Progressive sound waves'],
  ['brightness', 'Brightness', 'Sun response'],
  ['steps', 'Stepped density', 'Discrete selection'],
  ['range', 'Price range', 'Dual handles'],
  ['vertical', 'Vertical level', 'Vertical fader'],
  ['scrub', 'Playback scrubber', 'Continuous playhead'],
  ['speed', 'Playback speed', 'Clickable speed stops'],
  ['zoom', 'Zoom', 'Live magnification'],
  ['temperature', 'Temperature', 'Thermometer response'],
  ['balance', 'Stereo balance', 'Center-origin fill'],
  ['exposure', 'Exposure', 'Precise neutral scale'],
  ['segments', 'Segmented level', 'Segment fill'],
  ['rating', 'Rating scale', 'Fractional star fill'],
  ['hours', 'Time window', 'Bounded interval'],
  ['distance', 'Distance bubble', 'Following value'],
  ['meter', 'Pill meter', 'Vertical fill'],
  ['mixer', 'Mini mixer', 'Independent channels'],
  ['type-size', 'Type size', 'Live type preview'],
  ['radius', 'Corner radius', 'Immediate rounding'],
  ['opacity', 'Opacity', 'Transparency preview'],
].map(([slug, name, motion]) => ({
  id: `matte-${slug}-slider`, category: 'sliders', name,
  description: `${name} with native input and precise, immediate control.`,
  motions: [motion, 'Soft feedback'], variants: [`${slug}-slider`],
  keywords: [slug, name, 'range', 'slider', 'value', 'input'],
  page: `./component.html?component=matte-${slug}-slider`,
  preview: `./packages/${slug}-slider/index.html?embed=1`, packageRoot: './packages/',
  downloads: { [`${slug}-slider`]: `./downloads/matte-${slug}-slider.zip` },
  usage: [
    { title: 'Read values', paragraphs: ['MatteSlider.mount(root, { onChange(values) }) reports an array of numeric values, with two values for a range. The sliderchange event carries event.detail.values. The example changes local values only, not device settings.'] },
    { title: 'Native interaction', paragraphs: ['Drag a handle, click the track or use arrow keys, Home and End. The two range handles cannot cross. reset() restores the defaults; destroy() removes listeners.'] },
    { title: 'Adapt to your project', paragraphs: ['Change min, max and step on the native input. The initial values and CSS fill values should match. The five basic sliders accept formatValue(value); the additional studies include their own unit formatters. Change --slider variables in the CSS for the palette. Reduced motion preserves immediate control.'] },
    ...(slug === 'scrub' ? [{ title: 'Playback preview', paragraphs: ['This is a silent 20-second local preview, not an audio player. In your project, replace the demonstration clock with the currentTime and duration of your own media source. Pause, reset, hidden pages and destroy stop the local animation loop.'] }] : []),
    ...(slug === 'rating' ? [{ title: 'Choose a rating', paragraphs: ['Click a star for a whole-number rating or drag the slider for tenths. Partial stars show the exact fractional value. Arrow keys on the slider adjust by 0.1; the star shortcuts support arrow keys, Home and End.'] }] : []),
    ...(slug === 'mixer' ? [{ title: 'Independent channels', paragraphs: ['values returns Voice, Music and FX in that order. onChange receives the changed channel values; use its native input name or the bubbling sliderchange event to identify a channel. The preview does not access audio devices.'] }] : []),
  ],
})));

components.push(...[
  ['actions', 'Action menu', 'Connected slide'],
  ['sort', 'Sort menu', 'Rising sheet'],
  ['labels', 'Multi-select menu', 'Sequenced choices'],
  ['context', 'Context menu', 'Pointer-origin reveal'],
  ['commands', 'Command menu', 'Connected expansion'],
  ['workspace', 'Workspace switcher', 'Soft rise'],
  ['status', 'Status picker', 'Corner reveal'],
  ['assignee', 'Assignee menu', 'Sequenced people'],
  ['appearance', 'Appearance menu', 'Side reveal'],
  ['density', 'Density menu', 'Upward sheet'],
  ['export', 'Export menu', 'Connected slide'],
  ['permissions', 'Access menu', 'Offset reveal'],
  ['snooze', 'Reminder menu', 'Gentle lift'],
  ['move', 'Folder menu', 'Nested slide'],
  ['insert', 'Insert menu', 'Compact reveal'],
].map(([slug, name, motion]) => ({
  id: `matte-${slug}-menu`, category: 'menus', name,
  description: `${name} with keyboard navigation and local feedback.`,
  motions: [motion], variants: [`${slug}-menu`],
  keywords: [slug, name, 'menu', 'dropdown', 'selection'],
  page: `./component.html?component=matte-${slug}-menu`,
  preview: `./packages/${slug}-menu/index.html?embed=1`, packageRoot: './packages/',
  downloads: { [`${slug}-menu`]: `./downloads/matte-${slug}-menu.zip` },
  usage: [
    { title: 'Connect actions', paragraphs: ['MatteMenu.mount(root, { onSelect(values) }) reports selected values. The bubbling menuselect event exposes value and values. Preview actions do not modify files or send requests; connect your application logic in the callback.'] },
    { title: 'Keyboard and pointer', paragraphs: ['Open with Enter, Space or arrow keys. Navigate choices using arrows, Home and End. Escape returns focus to the trigger; clicking outside closes the panel. Multi-selection stays open until Done. Context actions also support right-click.', 'Workspace, status, assignee, appearance, density, reminder presets and inserted blocks stay open after selection. Export and access choices require confirmation; dismissing them cancels an unconfirmed choice. Folder navigation supports Back and Arrow Left. Search filters people by name or role. Export, reminders, access changes and moving files are local demonstrations only.'] },
    { title: 'Customize', paragraphs: ['Edit labels and data-value attributes in the HTML. Project-owned SVG contours are embedded in the HTML; no separate icon image or icon library is required. reset() restores defaults and destroy() removes listeners. Reduced motion disables transitions.'] },
  ],
})));

for (const [category, entries] of [
  ['navigation', [
    ['tabs','Underline tabs','Sliding underline'], ['views','View switcher','Soft selection'],
    ['breadcrumbs','Folder trail','Folder transition'], ['pages','Pagination','Moving page marker'],
    ['sidebar','Side navigation','Collapsing rail'], ['steps','Step navigation','Step progression'],
    ['dock','Bottom navigation','Sliding dock'], ['sections','Section index','Scroll tracking'],
    ['carousel','Collection navigation','Horizontal slide'], ['tree','Tree navigation','Reversible branches'],
  ]],
  ['overlays', [
    ['modal','Project modal','Soft scale'], ['drawer','Details drawer','Side reveal'],
    ['sheet','Collection sheet','Bottom sheet'], ['popover','Project popover','Anchored reveal'],
    ['tooltip','Context tooltip','Quiet fade'], ['confirm','Confirmation dialog','Gentle rise'],
    ['palette','Action palette','Top reveal'], ['document','Document preview','Expanding surface'],
    ['quickedit','Quick edit','Anchored editor'], ['tour','Guided tour','Step fade'],
  ]],
]) {
  for (const [slug, name, motion] of entries) {
    const variant = `${slug}-${category === 'overlays' ? 'overlay' : 'navigation'}`;
    components.push({
      id: `matte-${variant}`, category, name, description: `${name} with responsive interaction and local preview state.`,
      motions: [motion], variants: [variant], keywords: [slug, name, category],
      page: `./component.html?component=matte-${variant}`, preview: `./packages/${variant}/index.html?embed=1`,
      packageRoot: './packages/', downloads: { [variant]: `./downloads/matte-${variant}.zip` },
      usage: [
        { title: 'Try the local example', paragraphs: ['Download and serve the extracted folder on localhost. No framework or remote service is required. The preview changes only local state; it does not create, rename, archive or move real data.'] },
        { title: 'Connect your application', paragraphs: category === 'overlays'
          ? ['The example exports its controller as SLOverlayInstance with open(), close(), reset() and destroy(). Form submissions emit overlaycommit with event.detail values. Action choices emit overlayaction; the completed tour emits overlaytourcomplete. Connect these local events to your application. Keep all bundled modules beside index.html. The demo confirmation is not a server success response.']
          : ['MatteNavigation.mount(root) returns reset() and destroy(). Keep the supplied native buttons, tab roles and accessible labels when adapting the markup. This is a self-contained local navigation example: connect the handlers in buttons.js to your router or content.'] },
        { title: 'Motion and accessibility', paragraphs: ['Keyboard operation and reduced motion are supported. All icons are project-owned inline SVG contours. Change the text in index.html and the palette in buttons.css. The Instrument Sans license is included in OFL.txt.'] },
      ],
    });
  }
}

export function categoryFor(id) {
  return categories.find(category => category.id === id) || null;
}

function normalize(value) {
  return value.normalize('NFKC').toLowerCase().replace(/[\s&+\-–—]+/g, ' ').trim();
}

export function filterComponents(category = 'all', query = '') {
  const terms = normalize(query).split(' ').filter(Boolean);
  return components.filter(component => {
    if (category !== 'all' && component.category !== category) return false;
    const type = categoryFor(component.category);
    const searchable = normalize([component.name, component.description, ...component.motions, ...component.variants, ...component.keywords, type.label, ...type.keywords].join(' '));
    return terms.every(term => searchable.includes(term));
  });
}
