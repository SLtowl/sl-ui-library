// Local review batch. Owned by the checkboxes task.
export default [
  {
    "id": "matte-checkboxes-limited-v11",
    "category": "checkboxes",
    "name": "Limited shortlist",
    "description": "Choose up to three topics; remaining options pause until a choice is removed.",
    "motions": [
      "Reversible selection",
      "Soft press"
    ],
    "variants": [
      "checkboxes-limited-v11"
    ],
    "keywords": [
      "limit",
      "quota",
      "topics"
    ],
    "page": "./component.html?component=matte-checkboxes-limited-v11",
    "preview": "./packages/checkboxes-limited-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "checkboxes-limited-v11": "./downloads/matte-checkboxes-limited-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "Keep all seven package files together and open index.html or serve it locally. The complete form root isolates native controls between instances; do not nest it inside another form. Selection is local and makes no remote requests.",
          "At most three values are accepted. Unselected checkboxes are disabled at the limit; selected options always remain removable. state.limit is 3."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "SLComponent.mount(root, { values, onChange }) returns state, setValues(values), reset() and destroy(). values is an optional array of input values; invalid, unknown or duplicate values throw TypeError. setValues returns whether selection changed and emits no event. User changes emit selectionchange with { action, kind, values } plus the component-specific state fields, and call onChange with the same fields. action is select or clear, with bulk for the visible-results master and rank for promotion. State arrays are copied. reset restores HTML defaults silently. Mounting an already mounted root returns its current controller; destroy is repeat-safe. See example.js for additional state fields and methods."
        ]
      },
      {
        "title": "Appearance",
        "paragraphs": [
          "Customize --choice-bg, --choice-surface, --choice-text, --choice-muted, --choice-border, --choice-control, --choice-accent, --choice-accent-ink, --choice-focus and --choice-selected. Native inputs retain Space, radio arrow keys and visible focus. Check marks, rank labels and text accompany color. Reduced motion updates immediately. Long lists scroll inside the component. Instrument Sans and MIT licenses are included."
        ]
      }
    ]
  },
  {
    "id": "matte-checkboxes-budget-v11",
    "category": "checkboxes",
    "name": "Selection budget",
    "description": "Build a selection within eight points, with exact costs and a remaining budget.",
    "motions": [
      "Reversible selection",
      "Soft press"
    ],
    "variants": [
      "checkboxes-budget-v11"
    ],
    "keywords": [
      "budget",
      "cost",
      "points"
    ],
    "page": "./component.html?component=matte-checkboxes-budget-v11",
    "preview": "./packages/checkboxes-budget-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "checkboxes-budget-v11": "./downloads/matte-checkboxes-budget-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "Keep all seven package files together and open index.html or serve it locally. The complete form root isolates native controls between instances; do not nest it inside another form. Selection is local and makes no remote requests.",
          "Costs come from data-cost. The fixed budget is eight points. An option is disabled when its cost exceeds the remaining budget; selected options remain removable. state includes budget and used."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "SLComponent.mount(root, { values, onChange }) returns state, setValues(values), reset() and destroy(). values is an optional array of input values; invalid, unknown or duplicate values throw TypeError. setValues returns whether selection changed and emits no event. User changes emit selectionchange with { action, kind, values } plus the component-specific state fields, and call onChange with the same fields. action is select or clear, with bulk for the visible-results master and rank for promotion. State arrays are copied. reset restores HTML defaults silently. Mounting an already mounted root returns its current controller; destroy is repeat-safe. See example.js for additional state fields and methods."
        ]
      },
      {
        "title": "Appearance",
        "paragraphs": [
          "Customize --choice-bg, --choice-surface, --choice-text, --choice-muted, --choice-border, --choice-control, --choice-accent, --choice-accent-ink, --choice-focus and --choice-selected. Native inputs retain Space, radio arrow keys and visible focus. Check marks, rank labels and text accompany color. Reduced motion updates immediately. Long lists scroll inside the component. Instrument Sans and MIT licenses are included."
        ]
      }
    ]
  },
  {
    "id": "matte-checkboxes-permissions-v11",
    "category": "checkboxes",
    "name": "Permission matrix",
    "description": "Choose view and edit rights per resource; edit implies view and removing view removes edit.",
    "motions": [
      "Reversible selection",
      "Soft press"
    ],
    "variants": [
      "checkboxes-permissions-v11"
    ],
    "keywords": [
      "permissions",
      "matrix",
      "access",
      "dependent"
    ],
    "page": "./component.html?component=matte-checkboxes-permissions-v11",
    "preview": "./packages/checkboxes-permissions-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "checkboxes-permissions-v11": "./downloads/matte-checkboxes-permissions-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "Keep all seven package files together and open index.html or serve it locally. The complete form root isolates native controls between instances; do not nest it inside another form. Selection is local and makes no remote requests.",
          "Values use resource-view and resource-edit. User edits add view automatically. Clearing view also clears edit. setValues rejects edit without view."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "SLComponent.mount(root, { values, onChange }) returns state, setValues(values), reset() and destroy(). values is an optional array of input values; invalid, unknown or duplicate values throw TypeError. setValues returns whether selection changed and emits no event. User changes emit selectionchange with { action, kind, values } plus the component-specific state fields, and call onChange with the same fields. action is select or clear, with bulk for the visible-results master and rank for promotion. State arrays are copied. reset restores HTML defaults silently. Mounting an already mounted root returns its current controller; destroy is repeat-safe. See example.js for additional state fields and methods."
        ]
      },
      {
        "title": "Appearance",
        "paragraphs": [
          "Customize --choice-bg, --choice-surface, --choice-text, --choice-muted, --choice-border, --choice-control, --choice-accent, --choice-accent-ink, --choice-focus and --choice-selected. Native inputs retain Space, radio arrow keys and visible focus. Check marks, rank labels and text accompany color. Reduced motion updates immediately. Long lists scroll inside the component. Instrument Sans and MIT licenses are included."
        ]
      }
    ]
  },
  {
    "id": "matte-checkboxes-group-quotas-v11",
    "category": "checkboxes",
    "name": "Grouped quotas",
    "description": "Choose up to two items from each group with separate limits and totals.",
    "motions": [
      "Reversible selection",
      "Soft press"
    ],
    "variants": [
      "checkboxes-group-quotas-v11"
    ],
    "keywords": [
      "group",
      "subset",
      "quota"
    ],
    "page": "./component.html?component=matte-checkboxes-group-quotas-v11",
    "preview": "./packages/checkboxes-group-quotas-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "checkboxes-group-quotas-v11": "./downloads/matte-checkboxes-group-quotas-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "Keep all seven package files together and open index.html or serve it locally. The complete form root isolates native controls between instances; do not nest it inside another form. Selection is local and makes no remote requests.",
          "Each data-group accepts up to two values. Filling one group never disables another. setValues rejects an overfilled group."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "SLComponent.mount(root, { values, onChange }) returns state, setValues(values), reset() and destroy(). values is an optional array of input values; invalid, unknown or duplicate values throw TypeError. setValues returns whether selection changed and emits no event. User changes emit selectionchange with { action, kind, values } plus the component-specific state fields, and call onChange with the same fields. action is select or clear, with bulk for the visible-results master and rank for promotion. State arrays are copied. reset restores HTML defaults silently. Mounting an already mounted root returns its current controller; destroy is repeat-safe. See example.js for additional state fields and methods."
        ]
      },
      {
        "title": "Appearance",
        "paragraphs": [
          "Customize --choice-bg, --choice-surface, --choice-text, --choice-muted, --choice-border, --choice-control, --choice-accent, --choice-accent-ink, --choice-focus and --choice-selected. Native inputs retain Space, radio arrow keys and visible focus. Check marks, rank labels and text accompany color. Reduced motion updates immediately. Long lists scroll inside the component. Instrument Sans and MIT licenses are included."
        ]
      }
    ]
  },
  {
    "id": "matte-checkboxes-filtered-bulk-v11",
    "category": "checkboxes",
    "name": "Filtered bulk selection",
    "description": "Select all visible search results while retaining selections outside the current filter.",
    "motions": [
      "Reversible selection",
      "Soft press"
    ],
    "variants": [
      "checkboxes-filtered-bulk-v11"
    ],
    "keywords": [
      "bulk",
      "search",
      "visible",
      "tri-state"
    ],
    "page": "./component.html?component=matte-checkboxes-filtered-bulk-v11",
    "preview": "./packages/checkboxes-filtered-bulk-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "checkboxes-filtered-bulk-v11": "./downloads/matte-checkboxes-filtered-bulk-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "Keep all seven package files together and open index.html or serve it locally. The complete form root isolates native controls between instances; do not nest it inside another form. Selection is local and makes no remote requests.",
          "The tri-state master applies only to visible results. Filtering never changes selection. setFilter(text) updates the literal filter without a selection event. It returns true while mounted and false after destroy. state includes query and visible values."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "SLComponent.mount(root, { values, onChange }) returns state, setValues(values), reset() and destroy(). values is an optional array of input values; invalid, unknown or duplicate values throw TypeError. setValues returns whether selection changed and emits no event. User changes emit selectionchange with { action, kind, values } plus the component-specific state fields, and call onChange with the same fields. action is select or clear, with bulk for the visible-results master and rank for promotion. State arrays are copied. reset restores HTML defaults silently. Mounting an already mounted root returns its current controller; destroy is repeat-safe. See example.js for additional state fields and methods."
        ]
      },
      {
        "title": "Appearance",
        "paragraphs": [
          "Customize --choice-bg, --choice-surface, --choice-text, --choice-muted, --choice-border, --choice-control, --choice-accent, --choice-accent-ink, --choice-focus and --choice-selected. Native inputs retain Space, radio arrow keys and visible focus. Check marks, rank labels and text accompany color. Reduced motion updates immediately. Long lists scroll inside the component. Instrument Sans and MIT licenses are included."
        ]
      }
    ]
  },
  {
    "id": "matte-checkboxes-ranked-v11",
    "category": "checkboxes",
    "name": "Ranked shortlist",
    "description": "Keep up to three priorities in selection order and promote any selected choice.",
    "motions": [
      "Reversible selection",
      "Soft press"
    ],
    "variants": [
      "checkboxes-ranked-v11"
    ],
    "keywords": [
      "rank",
      "priority",
      "ordered",
      "limit"
    ],
    "page": "./component.html?component=matte-checkboxes-ranked-v11",
    "preview": "./packages/checkboxes-ranked-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "checkboxes-ranked-v11": "./downloads/matte-checkboxes-ranked-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "Keep all seven package files together and open index.html or serve it locally. The complete form root isolates native controls between instances; do not nest it inside another form. Selection is local and makes no remote requests.",
          "state.limit is 3 and state.values preserves priority order. Checking appends a priority; unchecking removes its rank. moveEarlier(value) swaps it with the preceding item and emits a rank action. It returns true for a move and false for an unknown, first-ranked or destroyed item."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "SLComponent.mount(root, { values, onChange }) returns state, setValues(values), reset() and destroy(). values is an optional array of input values; invalid, unknown or duplicate values throw TypeError. setValues returns whether selection changed and emits no event. User changes emit selectionchange with { action, kind, values } plus the component-specific state fields, and call onChange with the same fields. action is select or clear, with bulk for the visible-results master and rank for promotion. State arrays are copied. reset restores HTML defaults silently. Mounting an already mounted root returns its current controller; destroy is repeat-safe. See example.js for additional state fields and methods."
        ]
      },
      {
        "title": "Appearance",
        "paragraphs": [
          "Customize --choice-bg, --choice-surface, --choice-text, --choice-muted, --choice-border, --choice-control, --choice-accent, --choice-accent-ink, --choice-focus and --choice-selected. Native inputs retain Space, radio arrow keys and visible focus. Check marks, rank labels and text accompany color. Reduced motion updates immediately. Long lists scroll inside the component. Instrument Sans and MIT licenses are included."
        ]
      }
    ]
  },
  {
    "id": "matte-checkboxes-exclusive-none-v11",
    "category": "checkboxes",
    "name": "Exclusive none",
    "description": "Choose several channels or a mutually exclusive no-updates option.",
    "motions": [
      "Reversible selection",
      "Soft press"
    ],
    "variants": [
      "checkboxes-exclusive-none-v11"
    ],
    "keywords": [
      "exclusive",
      "none",
      "channels"
    ],
    "page": "./component.html?component=matte-checkboxes-exclusive-none-v11",
    "preview": "./packages/checkboxes-exclusive-none-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "checkboxes-exclusive-none-v11": "./downloads/matte-checkboxes-exclusive-none-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "Keep all seven package files together and open index.html or serve it locally. The complete form root isolates native controls between instances; do not nest it inside another form. Selection is local and makes no remote requests.",
          "The none value is exclusive. Choosing any channel clears none; choosing none clears all channels. Unchecking none leaves an empty, unspecified preference."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "SLComponent.mount(root, { values, onChange }) returns state, setValues(values), reset() and destroy(). values is an optional array of input values; invalid, unknown or duplicate values throw TypeError. setValues returns whether selection changed and emits no event. User changes emit selectionchange with { action, kind, values } plus the component-specific state fields, and call onChange with the same fields. action is select or clear, with bulk for the visible-results master and rank for promotion. State arrays are copied. reset restores HTML defaults silently. Mounting an already mounted root returns its current controller; destroy is repeat-safe. See example.js for additional state fields and methods."
        ]
      },
      {
        "title": "Appearance",
        "paragraphs": [
          "Customize --choice-bg, --choice-surface, --choice-text, --choice-muted, --choice-border, --choice-control, --choice-accent, --choice-accent-ink, --choice-focus and --choice-selected. Native inputs retain Space, radio arrow keys and visible focus. Check marks, rank labels and text accompany color. Reduced motion updates immediately. Long lists scroll inside the component. Instrument Sans and MIT licenses are included."
        ]
      }
    ]
  },
  {
    "id": "matte-checkboxes-dependencies-v11",
    "category": "checkboxes",
    "name": "Dependent export options",
    "description": "Select optional export details with an explicit dependency on source files.",
    "motions": [
      "Reversible selection",
      "Soft press"
    ],
    "variants": [
      "checkboxes-dependencies-v11"
    ],
    "keywords": [
      "dependency",
      "export",
      "prerequisite"
    ],
    "page": "./component.html?component=matte-checkboxes-dependencies-v11",
    "preview": "./packages/checkboxes-dependencies-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "checkboxes-dependencies-v11": "./downloads/matte-checkboxes-dependencies-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "Keep all seven package files together and open index.html or serve it locally. The complete form root isolates native controls between instances; do not nest it inside another form. Selection is local and makes no remote requests.",
          "Choosing comments or history includes sources. Clearing sources also clears both dependent details. Readme is independent. setValues rejects dependent details without sources."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "SLComponent.mount(root, { values, onChange }) returns state, setValues(values), reset() and destroy(). values is an optional array of input values; invalid, unknown or duplicate values throw TypeError. setValues returns whether selection changed and emits no event. User changes emit selectionchange with { action, kind, values } plus the component-specific state fields, and call onChange with the same fields. action is select or clear, with bulk for the visible-results master and rank for promotion. State arrays are copied. reset restores HTML defaults silently. Mounting an already mounted root returns its current controller; destroy is repeat-safe. See example.js for additional state fields and methods."
        ]
      },
      {
        "title": "Appearance",
        "paragraphs": [
          "Customize --choice-bg, --choice-surface, --choice-text, --choice-muted, --choice-border, --choice-control, --choice-accent, --choice-accent-ink, --choice-focus and --choice-selected. Native inputs retain Space, radio arrow keys and visible focus. Check marks, rank labels and text accompany color. Reduced motion updates immediately. Long lists scroll inside the component. Instrument Sans and MIT licenses are included."
        ]
      }
    ]
  },
  {
    "id": "matte-checkboxes-optional-radio-v11",
    "category": "checkboxes",
    "name": "Optional delivery choice",
    "description": "Choose one delivery mode with native radios and an explicit clear action.",
    "motions": [
      "Reversible selection",
      "Soft press"
    ],
    "variants": [
      "checkboxes-optional-radio-v11"
    ],
    "keywords": [
      "radio",
      "optional",
      "clear",
      "delivery"
    ],
    "page": "./component.html?component=matte-checkboxes-optional-radio-v11",
    "preview": "./packages/checkboxes-optional-radio-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "checkboxes-optional-radio-v11": "./downloads/matte-checkboxes-optional-radio-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "Keep all seven package files together and open index.html or serve it locally. The complete form root isolates native controls between instances; do not nest it inside another form. Selection is local and makes no remote requests.",
          "Accepts zero or one delivery value. Arrow keys follow native radio behavior; Clear removes the active radio. state.credits is the local cost, not a purchase."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "SLComponent.mount(root, { values, onChange }) returns state, setValues(values), reset() and destroy(). values is an optional array of input values; invalid, unknown or duplicate values throw TypeError. setValues returns whether selection changed and emits no event. User changes emit selectionchange with { action, kind, values } plus the component-specific state fields, and call onChange with the same fields. action is select or clear, with bulk for the visible-results master and rank for promotion. State arrays are copied. reset restores HTML defaults silently. Mounting an already mounted root returns its current controller; destroy is repeat-safe. See example.js for additional state fields and methods."
        ]
      },
      {
        "title": "Appearance",
        "paragraphs": [
          "Customize --choice-bg, --choice-surface, --choice-text, --choice-muted, --choice-border, --choice-control, --choice-accent, --choice-accent-ink, --choice-focus and --choice-selected. Native inputs retain Space, radio arrow keys and visible focus. Check marks, rank labels and text accompany color. Reduced motion updates immediately. Long lists scroll inside the component. Instrument Sans and MIT licenses are included."
        ]
      }
    ]
  },
  {
    "id": "matte-checkboxes-filter-polarity-v11",
    "category": "checkboxes",
    "name": "Include or exclude rules",
    "description": "Set each filter to any, include or exclude with independent native radio groups.",
    "motions": [
      "Reversible selection",
      "Soft press"
    ],
    "variants": [
      "checkboxes-filter-polarity-v11"
    ],
    "keywords": [
      "include",
      "exclude",
      "radio",
      "filter",
      "neutral"
    ],
    "page": "./component.html?component=matte-checkboxes-filter-polarity-v11",
    "preview": "./packages/checkboxes-filter-polarity-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "checkboxes-filter-polarity-v11": "./downloads/matte-checkboxes-filter-polarity-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "Keep all seven package files together and open index.html or serve it locally. The complete form root isolates native controls between instances; do not nest it inside another form. Selection is local and makes no remote requests.",
          "Each of video, audio and text requires one value ending in :any, :include or :exclude. Clear returns all rules to any. Arrow keys operate within the focused native radio group."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "SLComponent.mount(root, { values, onChange }) returns state, setValues(values), reset() and destroy(). values is an optional array of input values; invalid, unknown or duplicate values throw TypeError. setValues returns whether selection changed and emits no event. User changes emit selectionchange with { action, kind, values } plus the component-specific state fields, and call onChange with the same fields. action is select or clear, with bulk for the visible-results master and rank for promotion. State arrays are copied. reset restores HTML defaults silently. Mounting an already mounted root returns its current controller; destroy is repeat-safe. See example.js for additional state fields and methods."
        ]
      },
      {
        "title": "Appearance",
        "paragraphs": [
          "Customize --choice-bg, --choice-surface, --choice-text, --choice-muted, --choice-border, --choice-control, --choice-accent, --choice-accent-ink, --choice-focus and --choice-selected. Native inputs retain Space, radio arrow keys and visible focus. Check marks, rank labels and text accompany color. Reduced motion updates immediately. Long lists scroll inside the component. Instrument Sans and MIT licenses are included."
        ]
      }
    ]
  }
];
