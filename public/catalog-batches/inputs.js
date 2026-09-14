// Local review batch. Owned by the inputs task.
export default [
  {
    "id": "matte-inputs-tokens-v11",
    "category": "inputs",
    "name": "Tag input",
    "description": "Add and remove up to six unique text tags without splitting pasted or composed text.",
    "motions": [
      "Soft press",
      "Reversible field focus"
    ],
    "variants": [
      "inputs-tokens-v11"
    ],
    "keywords": [
      "tags",
      "tokens",
      "chips",
      "unicode",
      "input"
    ],
    "page": "./component.html?component=matte-inputs-tokens-v11",
    "preview": "./packages/inputs-tokens-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "inputs-tokens-v11": "./downloads/matte-inputs-tokens-v11.zip"
    },
    "usage": [
      {
        "title": "Use the field",
        "paragraphs": [
          "Add and remove up to six unique text tags without splitting pasted or composed text.",
          "Copy the complete package and mount its .sl-component root. All changes are local; connect application persistence explicitly."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "options.value is an array of up to six unique strings (1–40 characters each). state = { value: string[], draft: string }. Enter commits one whole tag; remove buttons delete a tag and return focus to the input.",
          "SLComponent.mount(root, options) and mountPreview(root) return { reset(), destroy(), state }. options.disabled disables editing. options.onChange(state) and the bubbling, composed sl:change event report local changes. State is a fresh snapshot. Reset restores the initial configured value without emitting a change; destroy is repeat-safe. Remounting the same root cleans up its previous listeners. Native form reset is supported."
        ]
      },
      {
        "title": "Appearance and accessibility",
        "paragraphs": [
          "Override --field-surface, --field-hover, --field-active, --field-text, --field-muted, --field-accent, --field-border, --field-focus and --field-error on the root. Instrument Sans is bundled. Native editing, literal Unicode text, keyboard focus and live reduced-motion preferences are preserved. The root fits widths from 226px to 320px."
        ]
      }
    ]
  },
  {
    "id": "matte-inputs-combobox-v11",
    "category": "inputs",
    "name": "Assignee combobox",
    "description": "Filter a local set of people and commit a stable ID; unavailable people cannot be selected.",
    "motions": [
      "Soft press",
      "Reversible field focus"
    ],
    "variants": [
      "inputs-combobox-v11"
    ],
    "keywords": [
      "combobox",
      "assignee",
      "listbox",
      "select",
      "disabled"
    ],
    "page": "./component.html?component=matte-inputs-combobox-v11",
    "preview": "./packages/inputs-combobox-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "inputs-combobox-v11": "./downloads/matte-inputs-combobox-v11.zip"
    },
    "usage": [
      {
        "title": "Use the field",
        "paragraphs": [
          "Filter a local set of people and commit a stable ID; unavailable people cannot be selected.",
          "Copy the complete package and mount its .sl-component root. All changes are local; connect application persistence explicitly."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "options.items = [{ id, label, disabled? }]; options.value is an available ID or null. state = { value: ID|null, label, query, open }. Arrow keys skip disabled items, Enter commits, Escape and blur restore the selected label. Free text never becomes a selected ID.",
          "SLComponent.mount(root, options) and mountPreview(root) return { reset(), destroy(), state }. options.disabled disables editing. options.onChange(state) and the bubbling, composed sl:change event report local changes. State is a fresh snapshot. Reset restores the initial configured value without emitting a change; destroy is repeat-safe. Remounting the same root cleans up its previous listeners. Native form reset is supported."
        ]
      },
      {
        "title": "Appearance and accessibility",
        "paragraphs": [
          "Override --field-surface, --field-hover, --field-active, --field-text, --field-muted, --field-accent, --field-border, --field-focus and --field-error on the root. Instrument Sans is bundled. Native editing, literal Unicode text, keyboard focus and live reduced-motion preferences are preserved. The root fits widths from 226px to 320px."
        ]
      }
    ]
  },
  {
    "id": "matte-inputs-date-range-v11",
    "category": "inputs",
    "name": "Date range input",
    "description": "Choose two calendar dates and read an inclusive day count with date-order validation.",
    "motions": [
      "Soft press",
      "Reversible field focus"
    ],
    "variants": [
      "inputs-date-range-v11"
    ],
    "keywords": [
      "date",
      "range",
      "calendar",
      "duration",
      "picker"
    ],
    "page": "./component.html?component=matte-inputs-date-range-v11",
    "preview": "./packages/inputs-date-range-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "inputs-date-range-v11": "./downloads/matte-inputs-date-range-v11.zip"
    },
    "usage": [
      {
        "title": "Use the field",
        "paragraphs": [
          "Choose two calendar dates and read an inclusive day count with date-order validation.",
          "Copy the complete package and mount its .sl-component root. All changes are local; connect application persistence explicitly."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "options.value = { start: YYYY-MM-DD, end: YYYY-MM-DD }, ordered and within 2000–2100. state = { value: { start, end }, valid, days: number|null }. Inclusive day arithmetic uses UTC calendar days and is independent of daylight-saving transitions. The project calendar uses the root language (English by default), a Monday-first keyboard grid and previous/next month navigation. Arrow keys move by day/week; Home/End move within a week; PageUp/PageDown change month (Shift changes year). ISO text entry remains available. Escape closes without selecting.",
          "SLComponent.mount(root, options) and mountPreview(root) return { reset(), destroy(), state }. options.disabled disables editing. options.onChange(state) and the bubbling, composed sl:change event report local changes. State is a fresh snapshot. Reset restores the initial configured value without emitting a change; destroy is repeat-safe. Remounting the same root cleans up its previous listeners. Native form reset is supported."
        ]
      },
      {
        "title": "Appearance and accessibility",
        "paragraphs": [
          "Override --field-surface, --field-hover, --field-active, --field-text, --field-muted, --field-accent, --field-border, --field-focus and --field-error on the root. Instrument Sans is bundled. Native editing, literal Unicode text, keyboard focus and live reduced-motion preferences are preserved. The root fits widths from 226px to 320px."
        ]
      }
    ]
  },
  {
    "id": "matte-inputs-time-v11",
    "category": "inputs",
    "name": "Time input",
    "description": "Enter a local wall-clock time in five-minute steps and compare morning, noon and evening presets.",
    "motions": [
      "Soft press",
      "Reversible field focus"
    ],
    "variants": [
      "inputs-time-v11"
    ],
    "keywords": [
      "time",
      "clock",
      "reminder",
      "picker",
      "presets"
    ],
    "page": "./component.html?component=matte-inputs-time-v11",
    "preview": "./packages/inputs-time-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "inputs-time-v11": "./downloads/matte-inputs-time-v11.zip"
    },
    "usage": [
      {
        "title": "Use the field",
        "paragraphs": [
          "Enter a local wall-clock time in five-minute steps and compare morning, noon and evening presets.",
          "Copy the complete package and mount its .sl-component root. All changes are local; connect application persistence explicitly."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "options.value is HH:MM from 00:00 to 23:55 in five-minute steps. state = { value, valid, minutes: number|null }. Presets update the local field; this component does not schedule notifications or convert time zones.",
          "SLComponent.mount(root, options) and mountPreview(root) return { reset(), destroy(), state }. options.disabled disables editing. options.onChange(state) and the bubbling, composed sl:change event report local changes. State is a fresh snapshot. Reset restores the initial configured value without emitting a change; destroy is repeat-safe. Remounting the same root cleans up its previous listeners. Native form reset is supported."
        ]
      },
      {
        "title": "Appearance and accessibility",
        "paragraphs": [
          "Override --field-surface, --field-hover, --field-active, --field-text, --field-muted, --field-accent, --field-border, --field-focus and --field-error on the root. Instrument Sans is bundled. Native editing, literal Unicode text, keyboard focus and live reduced-motion preferences are preserved. The root fits widths from 226px to 320px."
        ]
      }
    ]
  },
  {
    "id": "matte-inputs-duration-v11",
    "category": "inputs",
    "name": "Duration input",
    "description": "Compose hours and minutes into a bounded duration, with quick quarter-hour adjustments.",
    "motions": [
      "Soft press",
      "Reversible field focus"
    ],
    "variants": [
      "inputs-duration-v11"
    ],
    "keywords": [
      "duration",
      "hours",
      "minutes",
      "step",
      "bounded"
    ],
    "page": "./component.html?component=matte-inputs-duration-v11",
    "preview": "./packages/inputs-duration-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "inputs-duration-v11": "./downloads/matte-inputs-duration-v11.zip"
    },
    "usage": [
      {
        "title": "Use the field",
        "paragraphs": [
          "Compose hours and minutes into a bounded duration, with quick quarter-hour adjustments.",
          "Copy the complete package and mount its .sl-component root. All changes are local; connect application persistence explicitly."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "options.value is integer total minutes (0–1439). state = { value: number|null, valid, hours: string, minutes: string }. Quarter-hour actions clamp to the boundaries and carry between units; invalid drafts stay editable and disable adjustments.",
          "SLComponent.mount(root, options) and mountPreview(root) return { reset(), destroy(), state }. options.disabled disables editing. options.onChange(state) and the bubbling, composed sl:change event report local changes. State is a fresh snapshot. Reset restores the initial configured value without emitting a change; destroy is repeat-safe. Remounting the same root cleans up its previous listeners. Native form reset is supported."
        ]
      },
      {
        "title": "Appearance and accessibility",
        "paragraphs": [
          "Override --field-surface, --field-hover, --field-active, --field-text, --field-muted, --field-accent, --field-border, --field-focus and --field-error on the root. Instrument Sans is bundled. Native editing, literal Unicode text, keyboard focus and live reduced-motion preferences are preserved. The root fits widths from 226px to 320px."
        ]
      }
    ]
  },
  {
    "id": "matte-inputs-measurement-v11",
    "category": "inputs",
    "name": "Measurement input",
    "description": "Edit a length in centimetres or inches while preserving its underlying millimetre value.",
    "motions": [
      "Soft press",
      "Reversible field focus"
    ],
    "variants": [
      "inputs-measurement-v11"
    ],
    "keywords": [
      "measurement",
      "units",
      "centimetres",
      "inches",
      "conversion"
    ],
    "page": "./component.html?component=matte-inputs-measurement-v11",
    "preview": "./packages/inputs-measurement-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "inputs-measurement-v11": "./downloads/matte-inputs-measurement-v11.zip"
    },
    "usage": [
      {
        "title": "Use the field",
        "paragraphs": [
          "Edit a length in centimetres or inches while preserving its underlying millimetre value.",
          "Copy the complete package and mount its .sl-component root. All changes are local; connect application persistence explicitly."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "options.value is millimetres (0–10000); options.unit is cm or in. state = { value: millimetres|null, unit, draft, valid }. Unit toggles retain the canonical millimetres; display rounds to eight decimals. Editing updates the canonical value. Invalid drafts disable the unit switch.",
          "SLComponent.mount(root, options) and mountPreview(root) return { reset(), destroy(), state }. options.disabled disables editing. options.onChange(state) and the bubbling, composed sl:change event report local changes. State is a fresh snapshot. Reset restores the initial configured value without emitting a change; destroy is repeat-safe. Remounting the same root cleans up its previous listeners. Native form reset is supported."
        ]
      },
      {
        "title": "Appearance and accessibility",
        "paragraphs": [
          "Override --field-surface, --field-hover, --field-active, --field-text, --field-muted, --field-accent, --field-border, --field-focus and --field-error on the root. Instrument Sans is bundled. Native editing, literal Unicode text, keyboard focus and live reduced-motion preferences are preserved. The root fits widths from 226px to 320px."
        ]
      }
    ]
  },
  {
    "id": "matte-inputs-editable-title-v11",
    "category": "inputs",
    "name": "Editable title",
    "description": "Edit a local title with explicit Apply and Cancel actions while preserving its original text.",
    "motions": [
      "Soft press",
      "Reversible field focus"
    ],
    "variants": [
      "inputs-editable-title-v11"
    ],
    "keywords": [
      "inline",
      "edit",
      "title",
      "cancel",
      "unicode"
    ],
    "page": "./component.html?component=matte-inputs-editable-title-v11",
    "preview": "./packages/inputs-editable-title-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "inputs-editable-title-v11": "./downloads/matte-inputs-editable-title-v11.zip"
    },
    "usage": [
      {
        "title": "Use the field",
        "paragraphs": [
          "Edit a local title with explicit Apply and Cancel actions while preserving its original text.",
          "Copy the complete package and mount its .sl-component root. All changes are local; connect application persistence explicitly."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "options.value is a nonblank string of at most 80 characters. state = { value, draft, editing }. Apply commits the exact text locally and emits sl:change; Cancel/Escape discard the draft. Enter respects IME composition. No server persistence is implied.",
          "SLComponent.mount(root, options) and mountPreview(root) return { reset(), destroy(), state }. options.disabled disables editing. options.onChange(state) and the bubbling, composed sl:change event report local changes. State is a fresh snapshot. Reset restores the initial configured value without emitting a change; destroy is repeat-safe. Remounting the same root cleans up its previous listeners. Native form reset is supported."
        ]
      },
      {
        "title": "Appearance and accessibility",
        "paragraphs": [
          "Override --field-surface, --field-hover, --field-active, --field-text, --field-muted, --field-accent, --field-border, --field-focus and --field-error on the root. Instrument Sans is bundled. Native editing, literal Unicode text, keyboard focus and live reduced-motion preferences are preserved. The root fits widths from 226px to 320px."
        ]
      }
    ]
  },
  {
    "id": "matte-inputs-key-value-v11",
    "category": "inputs",
    "name": "Key–value input",
    "description": "Build up to three metadata pairs with unique keys and literal text values.",
    "motions": [
      "Soft press",
      "Reversible field focus"
    ],
    "variants": [
      "inputs-key-value-v11"
    ],
    "keywords": [
      "structured",
      "metadata",
      "key",
      "value",
      "pairs"
    ],
    "page": "./component.html?component=matte-inputs-key-value-v11",
    "preview": "./packages/inputs-key-value-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "inputs-key-value-v11": "./downloads/matte-inputs-key-value-v11.zip"
    },
    "usage": [
      {
        "title": "Use the field",
        "paragraphs": [
          "Build up to three metadata pairs with unique keys and literal text values.",
          "Copy the complete package and mount its .sl-component root. All changes are local; connect application persistence explicitly."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "options.value = [{ key, value }] with up to three pairs; keys are unique, nonblank and at most 32 characters; values are at most 80 characters. state = { value: pair[], valid }. An array preserves arbitrary Unicode keys (including __proto__) as literal data. Draft input is not rebuilt while typing.",
          "SLComponent.mount(root, options) and mountPreview(root) return { reset(), destroy(), state }. options.disabled disables editing. options.onChange(state) and the bubbling, composed sl:change event report local changes. State is a fresh snapshot. Reset restores the initial configured value without emitting a change; destroy is repeat-safe. Remounting the same root cleans up its previous listeners. Native form reset is supported."
        ]
      },
      {
        "title": "Appearance and accessibility",
        "paragraphs": [
          "Override --field-surface, --field-hover, --field-active, --field-text, --field-muted, --field-accent, --field-border, --field-focus and --field-error on the root. Instrument Sans is bundled. Native editing, literal Unicode text, keyboard focus and live reduced-motion preferences are preserved. The root fits widths from 226px to 320px."
        ]
      }
    ]
  },
  {
    "id": "matte-inputs-color-v11",
    "category": "inputs",
    "name": "Color input",
    "description": "Choose a color with the project palette, keyboard sliders, editable six-digit hex field and swatch presets.",
    "motions": [
      "Soft press",
      "Reversible field focus"
    ],
    "variants": [
      "inputs-color-v11"
    ],
    "keywords": [
      "color",
      "hex",
      "picker",
      "swatches",
      "hsv"
    ],
    "page": "./component.html?component=matte-inputs-color-v11",
    "preview": "./packages/inputs-color-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "inputs-color-v11": "./downloads/matte-inputs-color-v11.zip"
    },
    "usage": [
      {
        "title": "Use the field",
        "paragraphs": [
          "Choose a color with the project palette, keyboard sliders, editable six-digit hex field and swatch presets.",
          "Copy the complete package and mount its .sl-component root. All changes are local; connect application persistence explicitly."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "options.value is a six-digit #RRGGBB color. state = { value: lowercase hex|null, draft, valid }. Hex typing preserves case and caret. The project palette provides a pointer-controlled saturation/brightness plane and keyboard-accessible hue, saturation and brightness sliders. Apply commits the draft; Escape cancels. Presets apply immediately. The value is opaque sRGB; no alpha or color-space conversion is claimed.",
          "SLComponent.mount(root, options) and mountPreview(root) return { reset(), destroy(), state }. options.disabled disables editing. options.onChange(state) and the bubbling, composed sl:change event report local changes. State is a fresh snapshot. Reset restores the initial configured value without emitting a change; destroy is repeat-safe. Remounting the same root cleans up its previous listeners. Native form reset is supported."
        ]
      },
      {
        "title": "Appearance and accessibility",
        "paragraphs": [
          "Override --field-surface, --field-hover, --field-active, --field-text, --field-muted, --field-accent, --field-border, --field-focus and --field-error on the root. Instrument Sans is bundled. Native editing, literal Unicode text, keyboard focus and live reduced-motion preferences are preserved. The root fits widths from 226px to 320px."
        ]
      }
    ]
  },
  {
    "id": "matte-inputs-attachment-v11",
    "category": "inputs",
    "name": "Attachment input",
    "description": "Choose one local document, validate its size and extension, and remove it without uploading anything.",
    "motions": [
      "Soft press",
      "Reversible field focus"
    ],
    "variants": [
      "inputs-attachment-v11"
    ],
    "keywords": [
      "file",
      "attachment",
      "document",
      "native",
      "local"
    ],
    "page": "./component.html?component=matte-inputs-attachment-v11",
    "preview": "./packages/inputs-attachment-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "inputs-attachment-v11": "./downloads/matte-inputs-attachment-v11.zip"
    },
    "usage": [
      {
        "title": "Use the field",
        "paragraphs": [
          "Choose one local document, validate its size and extension, and remove it without uploading anything.",
          "Copy the complete package and mount its .sl-component root. All changes are local; connect application persistence explicitly."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "state = { file: File|null, value: { name, size, type, lastModified }|null, valid }. Validates the .pdf/.txt/.md extension and a 5 MiB byte limit only; this is not content validation. No file bytes are read. Pass state.file to your own operation only when state.valid is true. Normal mount uses the native file chooser. mountPreview uses built-in in-memory sample files and never opens the system chooser. options.demo=true selects that explicit demo mode; demo File objects are samples, not user documents.",
          "SLComponent.mount(root, options) and mountPreview(root) return { reset(), destroy(), state }. options.disabled disables editing. options.onChange(state) and the bubbling, composed sl:change event report local changes. State is a fresh snapshot. Reset restores the initial configured value without emitting a change; destroy is repeat-safe. Remounting the same root cleans up its previous listeners. Native form reset is supported."
        ]
      },
      {
        "title": "Appearance and accessibility",
        "paragraphs": [
          "Override --field-surface, --field-hover, --field-active, --field-text, --field-muted, --field-accent, --field-border, --field-focus and --field-error on the root. Instrument Sans is bundled. Native editing, literal Unicode text, keyboard focus and live reduced-motion preferences are preserved. The root fits widths from 226px to 320px."
        ]
      }
    ]
  }
];
