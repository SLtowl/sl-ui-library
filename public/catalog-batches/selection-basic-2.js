// Owner-approved second Toggles batch.
export default [
  {
    "id": "matte-selection-line-wrap-v11",
    "category": "selection",
    "name": "Line wrap",
    "description": "Toggle editor line wrapping with a compact code preview that reflows without losing content.",
    "motions": [
      "Switch travel",
      "Line reflow"
    ],
    "variants": [
      "selection-line-wrap-v11"
    ],
    "keywords": [
      "line wrap",
      "editor",
      "text",
      "code"
    ],
    "page": "./component.html?component=matte-selection-line-wrap-v11",
    "preview": "./packages/selection-line-wrap-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "selection-line-wrap-v11": "./downloads/matte-selection-line-wrap-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "Toggle editor line wrapping with a compact code preview that reflows without losing content.",
          "The demonstration changes preview state only. Connect selectionchange or onChange(state) to your application setting."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "Initial state: {\"wrap\":true}. SLComponent.mount(root, { onChange(state) }) returns setState(patch, { emit }), reset(), destroy() and a copied state getter. Invalid fields and values throw without mutation. Repeated mount and destroy calls are safe."
        ]
      },
      {
        "title": "Appearance and accessibility",
        "paragraphs": [
          "Override the --sl-* variables on the root. Instrument Sans and original inline SVG ship in the package. Controls expose native switch or radio semantics, keyboard focus, live status, forced-colors support and reduced-motion behavior. The root fits widths from 226px to 320px."
        ]
      }
    ]
  },
  {
    "id": "matte-selection-sticky-header-v11",
    "category": "selection",
    "name": "Sticky header",
    "description": "Keep a page header attached while scrolling, with a miniature layout that shows the exact behavior.",
    "motions": [
      "Switch travel",
      "Header docking"
    ],
    "variants": [
      "selection-sticky-header-v11"
    ],
    "keywords": [
      "sticky",
      "header",
      "scroll",
      "layout"
    ],
    "page": "./component.html?component=matte-selection-sticky-header-v11",
    "preview": "./packages/selection-sticky-header-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "selection-sticky-header-v11": "./downloads/matte-selection-sticky-header-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "Keep a page header attached while scrolling, with a miniature layout that shows the exact behavior.",
          "The demonstration changes preview state only. Connect selectionchange or onChange(state) to your application setting."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "Initial state: {\"sticky\":false}. SLComponent.mount(root, { onChange(state) }) returns setState(patch, { emit }), reset(), destroy() and a copied state getter. Invalid fields and values throw without mutation. Repeated mount and destroy calls are safe."
        ]
      },
      {
        "title": "Appearance and accessibility",
        "paragraphs": [
          "Override the --sl-* variables on the root. Instrument Sans and original inline SVG ship in the package. Controls expose native switch or radio semantics, keyboard focus, live status, forced-colors support and reduced-motion behavior. The root fits widths from 226px to 320px."
        ]
      }
    ]
  },
  {
    "id": "matte-selection-grid-overlay-v11",
    "category": "selection",
    "name": "Grid overlay",
    "description": "Show or hide a layout grid over a canvas while keeping artwork clearly visible.",
    "motions": [
      "Switch travel",
      "Grid reveal"
    ],
    "variants": [
      "selection-grid-overlay-v11"
    ],
    "keywords": [
      "grid",
      "overlay",
      "canvas",
      "layout"
    ],
    "page": "./component.html?component=matte-selection-grid-overlay-v11",
    "preview": "./packages/selection-grid-overlay-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "selection-grid-overlay-v11": "./downloads/matte-selection-grid-overlay-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "Show or hide a layout grid over a canvas while keeping artwork clearly visible.",
          "The demonstration changes preview state only. Connect selectionchange or onChange(state) to your application setting."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "Initial state: {\"grid\":false}. SLComponent.mount(root, { onChange(state) }) returns setState(patch, { emit }), reset(), destroy() and a copied state getter. Invalid fields and values throw without mutation. Repeated mount and destroy calls are safe."
        ]
      },
      {
        "title": "Appearance and accessibility",
        "paragraphs": [
          "Override the --sl-* variables on the root. Instrument Sans and original inline SVG ship in the package. Controls expose native switch or radio semantics, keyboard focus, live status, forced-colors support and reduced-motion behavior. The root fits widths from 226px to 320px."
        ]
      }
    ]
  },
  {
    "id": "matte-selection-hide-balances-v11",
    "category": "selection",
    "name": "Hide balances",
    "description": "Mask sensitive totals locally while preserving labels and the surrounding financial layout.",
    "motions": [
      "Switch travel",
      "Value mask"
    ],
    "variants": [
      "selection-hide-balances-v11"
    ],
    "keywords": [
      "balance",
      "mask",
      "sensitive",
      "privacy"
    ],
    "page": "./component.html?component=matte-selection-hide-balances-v11",
    "preview": "./packages/selection-hide-balances-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "selection-hide-balances-v11": "./downloads/matte-selection-hide-balances-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "Mask sensitive totals locally while preserving labels and the surrounding financial layout.",
          "The demonstration changes preview state only. Connect selectionchange or onChange(state) to your application setting."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "Initial state: {\"hidden\":false}. SLComponent.mount(root, { onChange(state) }) returns setState(patch, { emit }), reset(), destroy() and a copied state getter. Invalid fields and values throw without mutation. Repeated mount and destroy calls are safe."
        ]
      },
      {
        "title": "Appearance and accessibility",
        "paragraphs": [
          "Override the --sl-* variables on the root. Instrument Sans and original inline SVG ship in the package. Controls expose native switch or radio semantics, keyboard focus, live status, forced-colors support and reduced-motion behavior. The root fits widths from 226px to 320px."
        ]
      }
    ]
  },
  {
    "id": "matte-selection-link-previews-v11",
    "category": "selection",
    "name": "Link previews",
    "description": "Expand or collapse a contextual link card without changing the original message text.",
    "motions": [
      "Switch travel",
      "Preview expansion"
    ],
    "variants": [
      "selection-link-previews-v11"
    ],
    "keywords": [
      "link",
      "preview",
      "message",
      "card"
    ],
    "page": "./component.html?component=matte-selection-link-previews-v11",
    "preview": "./packages/selection-link-previews-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "selection-link-previews-v11": "./downloads/matte-selection-link-previews-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "Expand or collapse a contextual link card without changing the original message text.",
          "The demonstration changes preview state only. Connect selectionchange or onChange(state) to your application setting."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "Initial state: {\"previews\":true}. SLComponent.mount(root, { onChange(state) }) returns setState(patch, { emit }), reset(), destroy() and a copied state getter. Invalid fields and values throw without mutation. Repeated mount and destroy calls are safe."
        ]
      },
      {
        "title": "Appearance and accessibility",
        "paragraphs": [
          "Override the --sl-* variables on the root. Instrument Sans and original inline SVG ship in the package. Controls expose native switch or radio semantics, keyboard focus, live status, forced-colors support and reduced-motion behavior. The root fits widths from 226px to 320px."
        ]
      }
    ]
  },
  {
    "id": "matte-selection-completed-items-v11",
    "category": "selection",
    "name": "Completed items",
    "description": "Show or collapse completed rows while leaving active tasks untouched and in place.",
    "motions": [
      "Switch travel",
      "Row collapse"
    ],
    "variants": [
      "selection-completed-items-v11"
    ],
    "keywords": [
      "completed",
      "tasks",
      "list",
      "visibility"
    ],
    "page": "./component.html?component=matte-selection-completed-items-v11",
    "preview": "./packages/selection-completed-items-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "selection-completed-items-v11": "./downloads/matte-selection-completed-items-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "Show or collapse completed rows while leaving active tasks untouched and in place.",
          "The demonstration changes preview state only. Connect selectionchange or onChange(state) to your application setting."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "Initial state: {\"show\":true}. SLComponent.mount(root, { onChange(state) }) returns setState(patch, { emit }), reset(), destroy() and a copied state getter. Invalid fields and values throw without mutation. Repeated mount and destroy calls are safe."
        ]
      },
      {
        "title": "Appearance and accessibility",
        "paragraphs": [
          "Override the --sl-* variables on the root. Instrument Sans and original inline SVG ship in the package. Controls expose native switch or radio semantics, keyboard focus, live status, forced-colors support and reduced-motion behavior. The root fits widths from 226px to 320px."
        ]
      }
    ]
  },
  {
    "id": "matte-selection-autoplay-previews-v11",
    "category": "selection",
    "name": "Autoplay previews",
    "description": "Choose whether muted media previews start automatically, with a clear static state indicator.",
    "motions": [
      "Switch travel",
      "Playback cue"
    ],
    "variants": [
      "selection-autoplay-previews-v11"
    ],
    "keywords": [
      "autoplay",
      "media",
      "video",
      "preview"
    ],
    "page": "./component.html?component=matte-selection-autoplay-previews-v11",
    "preview": "./packages/selection-autoplay-previews-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "selection-autoplay-previews-v11": "./downloads/matte-selection-autoplay-previews-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "Choose whether muted media previews start automatically, with a clear static state indicator.",
          "The demonstration changes preview state only. Connect selectionchange or onChange(state) to your application setting."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "Initial state: {\"autoplay\":false}. SLComponent.mount(root, { onChange(state) }) returns setState(patch, { emit }), reset(), destroy() and a copied state getter. Invalid fields and values throw without mutation. Repeated mount and destroy calls are safe."
        ]
      },
      {
        "title": "Appearance and accessibility",
        "paragraphs": [
          "Override the --sl-* variables on the root. Instrument Sans and original inline SVG ship in the package. Controls expose native switch or radio semantics, keyboard focus, live status, forced-colors support and reduced-motion behavior. The root fits widths from 226px to 320px."
        ]
      }
    ]
  },
  {
    "id": "matte-selection-text-direction-v11",
    "category": "selection",
    "name": "Text direction",
    "description": "Switch a writing surface between left-to-right and right-to-left flow with proper radio behavior.",
    "motions": [
      "Segment selection",
      "Text realignment"
    ],
    "variants": [
      "selection-text-direction-v11"
    ],
    "keywords": [
      "direction",
      "ltr",
      "rtl",
      "writing"
    ],
    "page": "./component.html?component=matte-selection-text-direction-v11",
    "preview": "./packages/selection-text-direction-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "selection-text-direction-v11": "./downloads/matte-selection-text-direction-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "Switch a writing surface between left-to-right and right-to-left flow with proper radio behavior.",
          "The demonstration changes preview state only. Connect selectionchange or onChange(state) to your application setting."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "Initial state: {\"direction\":\"ltr\"}. SLComponent.mount(root, { onChange(state) }) returns setState(patch, { emit }), reset(), destroy() and a copied state getter. Invalid fields and values throw without mutation. Repeated mount and destroy calls are safe."
        ]
      },
      {
        "title": "Appearance and accessibility",
        "paragraphs": [
          "Override the --sl-* variables on the root. Instrument Sans and original inline SVG ship in the package. Controls expose native switch or radio semantics, keyboard focus, live status, forced-colors support and reduced-motion behavior. The root fits widths from 226px to 320px."
        ]
      }
    ]
  },
  {
    "id": "matte-selection-link-target-v11",
    "category": "selection",
    "name": "Link destination",
    "description": "Choose whether links reuse the current tab or open a new one, with an explicit two-state preview.",
    "motions": [
      "Segment selection",
      "Tab reveal"
    ],
    "variants": [
      "selection-link-target-v11"
    ],
    "keywords": [
      "link",
      "tab",
      "destination",
      "browser"
    ],
    "page": "./component.html?component=matte-selection-link-target-v11",
    "preview": "./packages/selection-link-target-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "selection-link-target-v11": "./downloads/matte-selection-link-target-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "Choose whether links reuse the current tab or open a new one, with an explicit two-state preview.",
          "The demonstration changes preview state only. Connect selectionchange or onChange(state) to your application setting."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "Initial state: {\"target\":\"same\"}. SLComponent.mount(root, { onChange(state) }) returns setState(patch, { emit }), reset(), destroy() and a copied state getter. Invalid fields and values throw without mutation. Repeated mount and destroy calls are safe."
        ]
      },
      {
        "title": "Appearance and accessibility",
        "paragraphs": [
          "Override the --sl-* variables on the root. Instrument Sans and original inline SVG ship in the package. Controls expose native switch or radio semantics, keyboard focus, live status, forced-colors support and reduced-motion behavior. The root fits widths from 226px to 320px."
        ]
      }
    ]
  },
  {
    "id": "matte-selection-sidebar-labels-v11",
    "category": "selection",
    "name": "Sidebar labels",
    "description": "Toggle a navigation rail between icons only and labeled items without changing the active destination.",
    "motions": [
      "Segment selection",
      "Sidebar expansion"
    ],
    "variants": [
      "selection-sidebar-labels-v11"
    ],
    "keywords": [
      "sidebar",
      "labels",
      "navigation",
      "icons"
    ],
    "page": "./component.html?component=matte-selection-sidebar-labels-v11",
    "preview": "./packages/selection-sidebar-labels-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "selection-sidebar-labels-v11": "./downloads/matte-selection-sidebar-labels-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "Toggle a navigation rail between icons only and labeled items without changing the active destination.",
          "The demonstration changes preview state only. Connect selectionchange or onChange(state) to your application setting."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "Initial state: {\"sidebar\":\"icons\"}. SLComponent.mount(root, { onChange(state) }) returns setState(patch, { emit }), reset(), destroy() and a copied state getter. Invalid fields and values throw without mutation. Repeated mount and destroy calls are safe."
        ]
      },
      {
        "title": "Appearance and accessibility",
        "paragraphs": [
          "Override the --sl-* variables on the root. Instrument Sans and original inline SVG ship in the package. Controls expose native switch or radio semantics, keyboard focus, live status, forced-colors support and reduced-motion behavior. The root fits widths from 226px to 320px."
        ]
      }
    ]
  }
];
