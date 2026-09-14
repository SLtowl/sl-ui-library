// Local review batch. Owned by the selection task.
export default [
  {
    "id": "matte-selection-presence-rail-v11",
    "category": "selection",
    "name": "Presence rail",
    "description": "Three presence positions share a sliding indicator and one keyboard tab stop.",
    "motions": [
      "Sliding position",
      "Shape transition"
    ],
    "variants": [
      "selection-presence-rail-v11"
    ],
    "keywords": [
      "presence",
      "rail",
      "toggle",
      "selection",
      "mode"
    ],
    "page": "./component.html?component=matte-selection-presence-rail-v11",
    "preview": "./packages/selection-presence-rail-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "selection-presence-rail-v11": "./downloads/matte-selection-presence-rail-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "Use mode: available, focus or away. Arrow keys wrap between positions; Home and End select endpoints.",
          "The complete package works offline. Load buttons.css and buttons.js, keep the .sl-component markup and call SLComponent.mount(root, { onChange(state) }). mountPreview(root) is the same local selection controller."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "Initial state: { mode: \"available\" }. setState(patch, { emit: false }) validates known fields, updates immediately and returns undefined; invalid values throw without changing state. Pass emit: true to dispatch selectionchange with detail.state and call onChange(state). Each payload and the state getter is a copy. reset() restores package defaults silently. destroy() is repeat-safe and releases the root for a fresh mount. A repeated mount returns the existing controller. No server operation or persistence is performed."
        ]
      },
      {
        "title": "Appearance",
        "paragraphs": [
          "Set --sl-surface, --sl-hover, --sl-inset, --sl-border, --sl-text, --sl-muted, --sl-accent, --sl-on-accent, --sl-selected, --sl-focus and --sl-disabled on the root. Instrument Sans and original inline SVG ship in the package. Selection has text or shape cues as well as color. Controls support keyboard focus and live status; CSS observes reduced-motion changes while mounted. The root fits 226–320px without concealing controls."
        ]
      }
    ]
  },
  {
    "id": "matte-selection-reading-density-v11",
    "category": "selection",
    "name": "Reading density",
    "description": "A bounded stepper moves through three reading densities and changes sample spacing.",
    "motions": [
      "Reversible spacing"
    ],
    "variants": [
      "selection-reading-density-v11"
    ],
    "keywords": [
      "reading",
      "density",
      "toggle",
      "selection",
      "mode"
    ],
    "page": "./component.html?component=matte-selection-reading-density-v11",
    "preview": "./packages/selection-reading-density-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "selection-reading-density-v11": "./downloads/matte-selection-reading-density-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "Use density: compact, balanced or roomy. Previous and next buttons stop at the endpoints; the three sample lines keep their content.",
          "The complete package works offline. Load buttons.css and buttons.js, keep the .sl-component markup and call SLComponent.mount(root, { onChange(state) }). mountPreview(root) is the same local selection controller."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "Initial state: { density: \"balanced\" }. setState(patch, { emit: false }) validates known fields, updates immediately and returns undefined; invalid values throw without changing state. Pass emit: true to dispatch selectionchange with detail.state and call onChange(state). Each payload and the state getter is a copy. reset() restores package defaults silently. destroy() is repeat-safe and releases the root for a fresh mount. A repeated mount returns the existing controller. No server operation or persistence is performed."
        ]
      },
      {
        "title": "Appearance",
        "paragraphs": [
          "Set --sl-surface, --sl-hover, --sl-inset, --sl-border, --sl-text, --sl-muted, --sl-accent, --sl-on-accent, --sl-selected, --sl-focus and --sl-disabled on the root. Instrument Sans and original inline SVG ship in the package. Selection has text or shape cues as well as color. Controls support keyboard focus and live status; CSS observes reduced-motion changes while mounted. The root fits 226–320px without concealing controls."
        ]
      }
    ]
  },
  {
    "id": "matte-selection-reading-aids-v11",
    "category": "selection",
    "name": "Reading aids",
    "description": "A master switch gates two reading aids while preserving each child preference.",
    "motions": [
      "Switch travel",
      "Sample highlight"
    ],
    "variants": [
      "selection-reading-aids-v11"
    ],
    "keywords": [
      "reading",
      "aids",
      "toggle",
      "selection",
      "mode"
    ],
    "page": "./component.html?component=matte-selection-reading-aids-v11",
    "preview": "./packages/selection-reading-aids-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "selection-reading-aids-v11": "./downloads/matte-selection-reading-aids-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "Boolean enabled gates guide and phrases without changing them. Compute effective settings as enabled && guide and enabled && phrases.",
          "The complete package works offline. Load buttons.css and buttons.js, keep the .sl-component markup and call SLComponent.mount(root, { onChange(state) }). mountPreview(root) is the same local selection controller."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "Initial state: { enabled: true, guide: true, phrases: false }. setState(patch, { emit: false }) validates known fields, updates immediately and returns undefined; invalid values throw without changing state. Pass emit: true to dispatch selectionchange with detail.state and call onChange(state). Each payload and the state getter is a copy. reset() restores package defaults silently. destroy() is repeat-safe and releases the root for a fresh mount. A repeated mount returns the existing controller. No server operation or persistence is performed."
        ]
      },
      {
        "title": "Appearance",
        "paragraphs": [
          "Set --sl-surface, --sl-hover, --sl-inset, --sl-border, --sl-text, --sl-muted, --sl-accent, --sl-on-accent, --sl-selected, --sl-focus and --sl-disabled on the root. Instrument Sans and original inline SVG ship in the package. Selection has text or shape cues as well as color. Controls support keyboard focus and live status; CSS observes reduced-motion changes while mounted. The root fits 226–320px without concealing controls."
        ]
      }
    ]
  },
  {
    "id": "matte-selection-focus-override-v11",
    "category": "selection",
    "name": "Focus override",
    "description": "A temporary focus preset suppresses two saved preferences and restores them when released.",
    "motions": [
      "Switch travel",
      "Preset surface"
    ],
    "variants": [
      "selection-focus-override-v11"
    ],
    "keywords": [
      "focus",
      "override",
      "toggle",
      "selection",
      "mode"
    ],
    "page": "./component.html?component=matte-selection-focus-override-v11",
    "preview": "./packages/selection-focus-override-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "selection-focus-override-v11": "./downloads/matte-selection-focus-override-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "Boolean focus temporarily overrides saved activity and hints to off. The state getter keeps the saved preferences; effective values are !focus && activity and !focus && hints.",
          "The complete package works offline. Load buttons.css and buttons.js, keep the .sl-component markup and call SLComponent.mount(root, { onChange(state) }). mountPreview(root) is the same local selection controller."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "Initial state: { focus: false, activity: true, hints: true }. setState(patch, { emit: false }) validates known fields, updates immediately and returns undefined; invalid values throw without changing state. Pass emit: true to dispatch selectionchange with detail.state and call onChange(state). Each payload and the state getter is a copy. reset() restores package defaults silently. destroy() is repeat-safe and releases the root for a fresh mount. A repeated mount returns the existing controller. No server operation or persistence is performed."
        ]
      },
      {
        "title": "Appearance",
        "paragraphs": [
          "Set --sl-surface, --sl-hover, --sl-inset, --sl-border, --sl-text, --sl-muted, --sl-accent, --sl-on-accent, --sl-selected, --sl-focus and --sl-disabled on the root. Instrument Sans and original inline SVG ship in the package. Selection has text or shape cues as well as color. Controls support keyboard focus and live status; CSS observes reduced-motion changes while mounted. The root fits 226–320px without concealing controls."
        ]
      }
    ]
  },
  {
    "id": "matte-selection-snap-modes-v11",
    "category": "selection",
    "name": "Snap modes",
    "description": "Two compact rows choose independent off, soft or firm snapping with per-row radio navigation.",
    "motions": [
      "Guide fade",
      "Marker travel"
    ],
    "variants": [
      "selection-snap-modes-v11"
    ],
    "keywords": [
      "snap",
      "modes",
      "toggle",
      "selection",
      "mode"
    ],
    "page": "./component.html?component=matte-selection-snap-modes-v11",
    "preview": "./packages/selection-snap-modes-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "selection-snap-modes-v11": "./downloads/matte-selection-snap-modes-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "Use grid and guides independently with off, soft or firm. Each row is its own radio group and tab stop; the illustration is a local guide sample.",
          "The complete package works offline. Load buttons.css and buttons.js, keep the .sl-component markup and call SLComponent.mount(root, { onChange(state) }). mountPreview(root) is the same local selection controller."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "Initial state: { grid: \"soft\", guides: \"firm\" }. setState(patch, { emit: false }) validates known fields, updates immediately and returns undefined; invalid values throw without changing state. Pass emit: true to dispatch selectionchange with detail.state and call onChange(state). Each payload and the state getter is a copy. reset() restores package defaults silently. destroy() is repeat-safe and releases the root for a fresh mount. A repeated mount returns the existing controller. No server operation or persistence is performed."
        ]
      },
      {
        "title": "Appearance",
        "paragraphs": [
          "Set --sl-surface, --sl-hover, --sl-inset, --sl-border, --sl-text, --sl-muted, --sl-accent, --sl-on-accent, --sl-selected, --sl-focus and --sl-disabled on the root. Instrument Sans and original inline SVG ship in the package. Selection has text or shape cues as well as color. Controls support keyboard focus and live status; CSS observes reduced-motion changes while mounted. The root fits 226–320px without concealing controls."
        ]
      }
    ]
  },
  {
    "id": "matte-selection-week-rhythm-v11",
    "category": "selection",
    "name": "Week rhythm",
    "description": "Seven independent day toggles combine with replaceable weekday and weekend presets.",
    "motions": [
      "Day check reveal"
    ],
    "variants": [
      "selection-week-rhythm-v11"
    ],
    "keywords": [
      "week",
      "rhythm",
      "toggle",
      "selection",
      "mode"
    ],
    "page": "./component.html?component=matte-selection-week-rhythm-v11",
    "preview": "./packages/selection-week-rhythm-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "selection-week-rhythm-v11": "./downloads/matte-selection-week-rhythm-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "days contains unique keys mon through sun, normalized into week order. Day buttons use Space or Enter. Weekdays and Weekend replace the whole selection; Clear allows an empty selection.",
          "The complete package works offline. Load buttons.css and buttons.js, keep the .sl-component markup and call SLComponent.mount(root, { onChange(state) }). mountPreview(root) is the same local selection controller."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "Initial state: { days: [\"mon\", \"tue\", \"wed\", \"thu\", \"fri\"] }. setState(patch, { emit: false }) validates known fields, updates immediately and returns undefined; invalid values throw without changing state. Pass emit: true to dispatch selectionchange with detail.state and call onChange(state). Each payload and the state getter is a copy. reset() restores package defaults silently. destroy() is repeat-safe and releases the root for a fresh mount. A repeated mount returns the existing controller. No server operation or persistence is performed."
        ]
      },
      {
        "title": "Appearance",
        "paragraphs": [
          "Set --sl-surface, --sl-hover, --sl-inset, --sl-border, --sl-text, --sl-muted, --sl-accent, --sl-on-accent, --sl-selected, --sl-focus and --sl-disabled on the root. Instrument Sans and original inline SVG ship in the package. Selection has text or shape cues as well as color. Controls support keyboard focus and live status; CSS observes reduced-motion changes while mounted. The root fits 226–320px without concealing controls."
        ]
      }
    ]
  },
  {
    "id": "matte-selection-measurement-units-v11",
    "category": "selection",
    "name": "Measurement units",
    "description": "A two-way unit selector converts a fixed route distance and ascent from canonical metric values.",
    "motions": [
      "Segment crossfade"
    ],
    "variants": [
      "selection-measurement-units-v11"
    ],
    "keywords": [
      "measurement",
      "units",
      "toggle",
      "selection",
      "mode"
    ],
    "page": "./component.html?component=matte-selection-measurement-units-v11",
    "preview": "./packages/selection-measurement-units-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "selection-measurement-units-v11": "./downloads/matte-selection-measurement-units-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "units is metric or imperial. The sample starts from 12 km and 480 m, using 1 mi = 1.609344 km and 1 ft = 0.3048 m. Repeated switching never converts rounded output back into source values.",
          "The complete package works offline. Load buttons.css and buttons.js, keep the .sl-component markup and call SLComponent.mount(root, { onChange(state) }). mountPreview(root) is the same local selection controller."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "Initial state: { units: \"metric\" }. setState(patch, { emit: false }) validates known fields, updates immediately and returns undefined; invalid values throw without changing state. Pass emit: true to dispatch selectionchange with detail.state and call onChange(state). Each payload and the state getter is a copy. reset() restores package defaults silently. destroy() is repeat-safe and releases the root for a fresh mount. A repeated mount returns the existing controller. No server operation or persistence is performed."
        ]
      },
      {
        "title": "Appearance",
        "paragraphs": [
          "Set --sl-surface, --sl-hover, --sl-inset, --sl-border, --sl-text, --sl-muted, --sl-accent, --sl-on-accent, --sl-selected, --sl-focus and --sl-disabled on the root. Instrument Sans and original inline SVG ship in the package. Selection has text or shape cues as well as color. Controls support keyboard focus and live status; CSS observes reduced-motion changes while mounted. The root fits 226–320px without concealing controls."
        ]
      }
    ]
  },
  {
    "id": "matte-selection-inherited-setting-v11",
    "category": "selection",
    "name": "Inherited setting",
    "description": "Choose a workspace default or a remembered personal override, with visible source and effective value.",
    "motions": [
      "Source segment",
      "Switch travel"
    ],
    "variants": [
      "selection-inherited-setting-v11"
    ],
    "keywords": [
      "inherited",
      "setting",
      "toggle",
      "selection",
      "mode"
    ],
    "page": "./component.html?component=matte-selection-inherited-setting-v11",
    "preview": "./packages/selection-inherited-setting-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "selection-inherited-setting-v11": "./downloads/matte-selection-inherited-setting-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "source is workspace or custom. workspace and custom are booleans. Update the inherited value through setState({ workspace: value }); the custom choice survives source changes. Effective value is state[state.source].",
          "The complete package works offline. Load buttons.css and buttons.js, keep the .sl-component markup and call SLComponent.mount(root, { onChange(state) }). mountPreview(root) is the same local selection controller."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "Initial state: { source: \"workspace\", workspace: true, custom: false }. setState(patch, { emit: false }) validates known fields, updates immediately and returns undefined; invalid values throw without changing state. Pass emit: true to dispatch selectionchange with detail.state and call onChange(state). Each payload and the state getter is a copy. reset() restores package defaults silently. destroy() is repeat-safe and releases the root for a fresh mount. A repeated mount returns the existing controller. No server operation or persistence is performed."
        ]
      },
      {
        "title": "Appearance",
        "paragraphs": [
          "Set --sl-surface, --sl-hover, --sl-inset, --sl-border, --sl-text, --sl-muted, --sl-accent, --sl-on-accent, --sl-selected, --sl-focus and --sl-disabled on the root. Instrument Sans and original inline SVG ship in the package. Selection has text or shape cues as well as color. Controls support keyboard focus and live status; CSS observes reduced-motion changes while mounted. The root fits 226–320px without concealing controls."
        ]
      }
    ]
  },
  {
    "id": "matte-selection-preview-mode-v11",
    "category": "selection",
    "name": "Preview mode",
    "description": "A draft layout selection previews immediately; Apply commits locally and Cancel or Escape restores the applied mode.",
    "motions": [
      "Outline indentation"
    ],
    "variants": [
      "selection-preview-mode-v11"
    ],
    "keywords": [
      "preview",
      "mode",
      "toggle",
      "selection",
      "mode"
    ],
    "page": "./component.html?component=matte-selection-preview-mode-v11",
    "preview": "./packages/selection-preview-mode-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "selection-preview-mode-v11": "./downloads/matte-selection-preview-mode-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "draft previews list or outline; applied holds the locally accepted mode. Apply copies draft to applied. Cancel and Escape restore draft from applied. selectionchange reports both fields; only applied should drive a committed application layout. No persistence is performed.",
          "The complete package works offline. Load buttons.css and buttons.js, keep the .sl-component markup and call SLComponent.mount(root, { onChange(state) }). mountPreview(root) is the same local selection controller."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "Initial state: { draft: \"list\", applied: \"list\" }. setState(patch, { emit: false }) validates known fields, updates immediately and returns undefined; invalid values throw without changing state. Pass emit: true to dispatch selectionchange with detail.state and call onChange(state). Each payload and the state getter is a copy. reset() restores package defaults silently. destroy() is repeat-safe and releases the root for a fresh mount. A repeated mount returns the existing controller. No server operation or persistence is performed."
        ]
      },
      {
        "title": "Appearance",
        "paragraphs": [
          "Set --sl-surface, --sl-hover, --sl-inset, --sl-border, --sl-text, --sl-muted, --sl-accent, --sl-on-accent, --sl-selected, --sl-focus and --sl-disabled on the root. Instrument Sans and original inline SVG ship in the package. Selection has text or shape cues as well as color. Controls support keyboard focus and live status; CSS observes reduced-motion changes while mounted. The root fits 226–320px without concealing controls."
        ]
      }
    ]
  },
  {
    "id": "matte-selection-output-priority-v11",
    "category": "selection",
    "name": "Output priority",
    "description": "A fallback switch enables a secondary output and a swap action exchanges primary and fallback priority.",
    "motions": [
      "Switch travel",
      "Fallback fade"
    ],
    "variants": [
      "selection-output-priority-v11"
    ],
    "keywords": [
      "output",
      "priority",
      "toggle",
      "selection",
      "mode"
    ],
    "page": "./component.html?component=matte-selection-output-priority-v11",
    "preview": "./packages/selection-output-priority-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "selection-output-priority-v11": "./downloads/matte-selection-output-priority-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "primary is headphones or speakers; the other output is the fallback. Boolean fallback enables the second choice and the Swap priority action. This selects a preference only; it does not route audio or enumerate devices.",
          "The complete package works offline. Load buttons.css and buttons.js, keep the .sl-component markup and call SLComponent.mount(root, { onChange(state) }). mountPreview(root) is the same local selection controller."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "Initial state: { primary: \"headphones\", fallback: true }. setState(patch, { emit: false }) validates known fields, updates immediately and returns undefined; invalid values throw without changing state. Pass emit: true to dispatch selectionchange with detail.state and call onChange(state). Each payload and the state getter is a copy. reset() restores package defaults silently. destroy() is repeat-safe and releases the root for a fresh mount. A repeated mount returns the existing controller. No server operation or persistence is performed."
        ]
      },
      {
        "title": "Appearance",
        "paragraphs": [
          "Set --sl-surface, --sl-hover, --sl-inset, --sl-border, --sl-text, --sl-muted, --sl-accent, --sl-on-accent, --sl-selected, --sl-focus and --sl-disabled on the root. Instrument Sans and original inline SVG ship in the package. Selection has text or shape cues as well as color. Controls support keyboard focus and live status; CSS observes reduced-motion changes while mounted. The root fits 226–320px without concealing controls."
        ]
      }
    ]
  }
];
