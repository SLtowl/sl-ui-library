// Ten Data display additions for local owner review.
export default [
  {
    "id": "matte-data-display-funnel-v11",
    "category": "data-display",
    "name": "Conversion funnel",
    "description": "Select a funnel stage for drop-off details and animate its percentage bars between entry and previous-stage bases.",
    "motions": [
      "Soft selection"
    ],
    "variants": [
      "data-display-funnel-v11"
    ],
    "keywords": [
      "funnel",
      "Conversion funnel",
      "data",
      "display",
      "keyboard",
      "compact"
    ],
    "page": "./component.html?component=matte-data-display-funnel-v11",
    "preview": "./packages/data-display-funnel-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "data-display-funnel-v11": "./downloads/matte-data-display-funnel-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "Serve the extracted folder locally. The immediately visible sample works offline. Use SLComponent.mountPreview(root) for the local demonstration or SLComponent.mount(root, { onChange }) for application selections. Replace paired sample markup and records together."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "select(index) accepts funnel stages 0–3. setMode(\"entry\" | \"previous\") changes percentage denominators and animates bar lengths to the matching percentages. First-stage conversion remains 100%. state contains selected and mode.",
          "Selection, mode and toggle methods return true for a change, false for no change or a destroyed controller; invalid live arguments throw. reset() returns true while mounted, false after destruction. reset() restores defaults and emits a reset event. destroy() is repeat-safe and removes listeners. Repeated mount(root) returns the existing controller until destroyed. onChange(detail) and the bubbling, composed displaychange event receive { kind, action, state }; state is a read-only snapshot. No server operation is simulated."
        ]
      },
      {
        "title": "Appearance",
        "paragraphs": [
          "Adapt --dd-surface, --dd-hover, --dd-edge, --dd-text, --dd-muted, --dd-accent, --dd-selected, --dd-chart, --dd-secondary, --dd-tertiary and --dd-focus in buttons.css. Preserve contrast after recoloring. Native buttons support Enter and Space, visible focus and pressed states. CSS motion respects live prefers-reduced-motion changes. Root width is at most 320px and supports 226px previews. Instrument Sans, original SVG and licenses are included."
        ]
      }
    ]
  },
  {
    "id": "matte-data-display-score-matrix-v11",
    "category": "data-display",
    "name": "Review score matrix",
    "description": "Navigate a criterion-by-platform score matrix and reveal remaining gaps to a five-point target.",
    "motions": [
      "Soft selection"
    ],
    "variants": [
      "data-display-score-matrix-v11"
    ],
    "keywords": [
      "score-matrix",
      "Review score matrix",
      "data",
      "display",
      "keyboard",
      "compact"
    ],
    "page": "./component.html?component=matte-data-display-score-matrix-v11",
    "preview": "./packages/data-display-score-matrix-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "data-display-score-matrix-v11": "./downloads/matte-data-display-score-matrix-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "Serve the extracted folder locally. The immediately visible sample works offline. Use SLComponent.mountPreview(root) for the local demonstration or SLComponent.mount(root, { onChange }) for application selections. Replace paired sample markup and records together."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "select(index) accepts cells 0–8 in row-major order (Speed, Usability, Coverage × Web, iOS, API). setMode(\"score\" | \"gap\") shows score or 5 minus score. state contains selected and mode.",
          "Selection, mode and toggle methods return true for a change, false for no change or a destroyed controller; invalid live arguments throw. reset() returns true while mounted, false after destruction. reset() restores defaults and emits a reset event. destroy() is repeat-safe and removes listeners. Repeated mount(root) returns the existing controller until destroyed. onChange(detail) and the bubbling, composed displaychange event receive { kind, action, state }; state is a read-only snapshot. No server operation is simulated."
        ]
      },
      {
        "title": "Appearance",
        "paragraphs": [
          "Adapt --dd-surface, --dd-hover, --dd-edge, --dd-text, --dd-muted, --dd-accent, --dd-selected, --dd-chart, --dd-secondary, --dd-tertiary and --dd-focus in buttons.css. Preserve contrast after recoloring. Native buttons support Enter and Space, visible focus and pressed states. CSS motion respects live prefers-reduced-motion changes. Root width is at most 320px and supports 226px previews. Instrument Sans, original SVG and licenses are included."
        ]
      }
    ]
  },
  {
    "id": "matte-data-display-treemap-v11",
    "category": "data-display",
    "name": "Storage treemap",
    "description": "Select proportional rectangles and switch their area between storage size and file count.",
    "motions": [
      "Soft selection"
    ],
    "variants": [
      "data-display-treemap-v11"
    ],
    "keywords": [
      "treemap",
      "Storage treemap",
      "data",
      "display",
      "keyboard",
      "compact"
    ],
    "page": "./component.html?component=matte-data-display-treemap-v11",
    "preview": "./packages/data-display-treemap-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "data-display-treemap-v11": "./downloads/matte-data-display-treemap-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "Serve the extracted folder locally. The immediately visible sample works offline. Use SLComponent.mountPreview(root) for the local demonstration or SLComponent.mount(root, { onChange }) for application selections. Replace paired sample markup and records together."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "select(index) accepts 0 Assets, 1 Media, 2 Docs, 3 Logs. setMode(\"storage\" | \"files\") recomputes proportional areas against 100 GB or 800 files. state contains selected and mode.",
          "Selection, mode and toggle methods return true for a change, false for no change or a destroyed controller; invalid live arguments throw. reset() returns true while mounted, false after destruction. reset() restores defaults and emits a reset event. destroy() is repeat-safe and removes listeners. Repeated mount(root) returns the existing controller until destroyed. onChange(detail) and the bubbling, composed displaychange event receive { kind, action, state }; state is a read-only snapshot. No server operation is simulated."
        ]
      },
      {
        "title": "Appearance",
        "paragraphs": [
          "Adapt --dd-surface, --dd-hover, --dd-edge, --dd-text, --dd-muted, --dd-accent, --dd-selected, --dd-chart, --dd-secondary, --dd-tertiary and --dd-focus in buttons.css. Preserve contrast after recoloring. Native buttons support Enter and Space, visible focus and pressed states. CSS motion respects live prefers-reduced-motion changes. Root width is at most 320px and supports 226px previews. Instrument Sans, original SVG and licenses are included."
        ]
      }
    ]
  },
  {
    "id": "matte-data-display-comparison-v11",
    "category": "data-display",
    "name": "Cycle comparison",
    "description": "Compare two labeled cycle bars per team on a shared scale and inspect absolute or relative changes.",
    "motions": [
      "Soft selection"
    ],
    "variants": [
      "data-display-comparison-v11"
    ],
    "keywords": [
      "comparison",
      "Cycle comparison",
      "data",
      "display",
      "keyboard",
      "compact"
    ],
    "page": "./component.html?component=matte-data-display-comparison-v11",
    "preview": "./packages/data-display-comparison-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "data-display-comparison-v11": "./downloads/matte-data-display-comparison-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "Serve the extracted folder locally. The immediately visible sample works offline. Use SLComponent.mountPreview(root) for the local demonstration or SLComponent.mount(root, { onChange }) for application selections. Replace paired sample markup and records together."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "select(index) accepts teams 0–2. setMode(\"count\" | \"percent\") changes the delta labels; geometry always uses a fixed 0–160 issue scale. state contains selected and mode.",
          "Selection, mode and toggle methods return true for a change, false for no change or a destroyed controller; invalid live arguments throw. reset() returns true while mounted, false after destruction. reset() restores defaults and emits a reset event. destroy() is repeat-safe and removes listeners. Repeated mount(root) returns the existing controller until destroyed. onChange(detail) and the bubbling, composed displaychange event receive { kind, action, state }; state is a read-only snapshot. No server operation is simulated."
        ]
      },
      {
        "title": "Appearance",
        "paragraphs": [
          "Adapt --dd-surface, --dd-hover, --dd-edge, --dd-text, --dd-muted, --dd-accent, --dd-selected, --dd-chart, --dd-secondary, --dd-tertiary and --dd-focus in buttons.css. Preserve contrast after recoloring. Native buttons support Enter and Space, visible focus and pressed states. CSS motion respects live prefers-reduced-motion changes. Root width is at most 320px and supports 226px previews. Instrument Sans, original SVG and licenses are included."
        ]
      }
    ]
  },
  {
    "id": "matte-data-display-grouped-rows-v11",
    "category": "data-display",
    "name": "Grouped work log",
    "description": "Expand independent work groups, select an entry and inspect its share of logged time.",
    "motions": [
      "Reversible group reveal"
    ],
    "variants": [
      "data-display-grouped-rows-v11"
    ],
    "keywords": [
      "grouped-rows",
      "Grouped work log",
      "data",
      "display",
      "keyboard",
      "compact"
    ],
    "page": "./component.html?component=matte-data-display-grouped-rows-v11",
    "preview": "./packages/data-display-grouped-rows-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "data-display-grouped-rows-v11": "./downloads/matte-data-display-grouped-rows-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "Serve the extracted folder locally. The immediately visible sample works offline. Use SLComponent.mountPreview(root) for the local demonstration or SLComponent.mount(root, { onChange }) for application selections. Replace paired sample markup and records together."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "select(index) accepts entries 0–5 and opens their group. toggle(groupIndex, expanded?) accepts groups 0–2. Escape inside a group closes it and returns focus to its header. state includes selected and a frozen expanded array.",
          "Selection, mode and toggle methods return true for a change, false for no change or a destroyed controller; invalid live arguments throw. reset() returns true while mounted, false after destruction. reset() restores defaults and emits a reset event. destroy() is repeat-safe and removes listeners. Repeated mount(root) returns the existing controller until destroyed. onChange(detail) and the bubbling, composed displaychange event receive { kind, action, state }; state is a read-only snapshot. No server operation is simulated."
        ]
      },
      {
        "title": "Appearance",
        "paragraphs": [
          "Adapt --dd-surface, --dd-hover, --dd-edge, --dd-text, --dd-muted, --dd-accent, --dd-selected, --dd-chart, --dd-secondary, --dd-tertiary and --dd-focus in buttons.css. Preserve contrast after recoloring. Native buttons support Enter and Space, visible focus and pressed states. CSS motion respects live prefers-reduced-motion changes. Root width is at most 320px and supports 226px previews. Instrument Sans, original SVG and licenses are included."
        ]
      }
    ]
  },
  {
    "id": "matte-data-display-distribution-v11",
    "category": "data-display",
    "name": "Latency distribution",
    "description": "Inspect five labeled latency statistics and compare regions with animated bars on a shared scale.",
    "motions": [
      "Soft selection"
    ],
    "variants": [
      "data-display-distribution-v11"
    ],
    "keywords": [
      "distribution",
      "Latency distribution",
      "data",
      "display",
      "keyboard",
      "compact"
    ],
    "page": "./component.html?component=matte-data-display-distribution-v11",
    "preview": "./packages/data-display-distribution-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "data-display-distribution-v11": "./downloads/matte-data-display-distribution-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "Serve the extracted folder locally. The immediately visible sample works offline. Use SLComponent.mountPreview(root) for the local demonstration or SLComponent.mount(root, { onChange }) for application selections. Replace paired sample markup and records together."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "select(index) accepts 0 Fastest (minimum), 1 25% below (Q1), 2 Median, 3 75% below (Q3), 4 Slowest (maximum). setMode(\"east\" | \"west\") changes the sample and animates bars on the same 0–100 ms scale. state contains selected and mode.",
          "Selection, mode and toggle methods return true for a change, false for no change or a destroyed controller; invalid live arguments throw. reset() returns true while mounted, false after destruction. reset() restores defaults and emits a reset event. destroy() is repeat-safe and removes listeners. Repeated mount(root) returns the existing controller until destroyed. onChange(detail) and the bubbling, composed displaychange event receive { kind, action, state }; state is a read-only snapshot. No server operation is simulated."
        ]
      },
      {
        "title": "Appearance",
        "paragraphs": [
          "Adapt --dd-surface, --dd-hover, --dd-edge, --dd-text, --dd-muted, --dd-accent, --dd-selected, --dd-chart, --dd-secondary, --dd-tertiary and --dd-focus in buttons.css. Preserve contrast after recoloring. Native buttons support Enter and Space, visible focus and pressed states. CSS motion respects live prefers-reduced-motion changes. Root width is at most 320px and supports 226px previews. Instrument Sans, original SVG and licenses are included."
        ]
      }
    ]
  },
  {
    "id": "matte-data-display-series-legend-v11",
    "category": "data-display",
    "name": "Interactive series legend",
    "description": "Toggle labeled line series with distinct stroke patterns and a live visible-total summary.",
    "motions": [
      "Soft selection"
    ],
    "variants": [
      "data-display-series-legend-v11"
    ],
    "keywords": [
      "series-legend",
      "Interactive series legend",
      "data",
      "display",
      "keyboard",
      "compact"
    ],
    "page": "./component.html?component=matte-data-display-series-legend-v11",
    "preview": "./packages/data-display-series-legend-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "data-display-series-legend-v11": "./downloads/matte-data-display-series-legend-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "Serve the extracted folder locally. The immediately visible sample works offline. Use SLComponent.mountPreview(root) for the local demonstration or SLComponent.mount(root, { onChange }) for application selections. Replace paired sample markup and records together."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "toggle(index, visible?) accepts 0 Direct, 1 Search, 2 Referral. It returns false if hiding the last visible series. state.visible is a frozen boolean array. Totals are visits summed across W1–W4.",
          "Selection, mode and toggle methods return true for a change, false for no change or a destroyed controller; invalid live arguments throw. reset() returns true while mounted, false after destruction. reset() restores defaults and emits a reset event. destroy() is repeat-safe and removes listeners. Repeated mount(root) returns the existing controller until destroyed. onChange(detail) and the bubbling, composed displaychange event receive { kind, action, state }; state is a read-only snapshot. No server operation is simulated."
        ]
      },
      {
        "title": "Appearance",
        "paragraphs": [
          "Adapt --dd-surface, --dd-hover, --dd-edge, --dd-text, --dd-muted, --dd-accent, --dd-selected, --dd-chart, --dd-secondary, --dd-tertiary and --dd-focus in buttons.css. Preserve contrast after recoloring. Native buttons support Enter and Space, visible focus and pressed states. CSS motion respects live prefers-reduced-motion changes. Root width is at most 320px and supports 226px previews. Instrument Sans, original SVG and licenses are included."
        ]
      }
    ]
  },
  {
    "id": "matte-data-display-heatmap-v11",
    "category": "data-display",
    "name": "Hourly heatmap",
    "description": "Inspect a weekday and time cell in a labeled, keyboard-navigable heatmap.",
    "motions": [
      "Soft selection"
    ],
    "variants": [
      "data-display-heatmap-v11"
    ],
    "keywords": [
      "heatmap",
      "Hourly heatmap",
      "data",
      "display",
      "keyboard",
      "compact"
    ],
    "page": "./component.html?component=matte-data-display-heatmap-v11",
    "preview": "./packages/data-display-heatmap-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "data-display-heatmap-v11": "./downloads/matte-data-display-heatmap-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "Serve the extracted folder locally. The immediately visible sample works offline. Use SLComponent.mountPreview(root) for the local demonstration or SLComponent.mount(root, { onChange }) for application selections. Replace paired sample markup and records together."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "select(index) accepts 0–14 in row-major order (09:00, 13:00, 17:00; Monday–Friday). state.selected is the selected index.",
          "Selection, mode and toggle methods return true for a change, false for no change or a destroyed controller; invalid live arguments throw. reset() returns true while mounted, false after destruction. reset() restores defaults and emits a reset event. destroy() is repeat-safe and removes listeners. Repeated mount(root) returns the existing controller until destroyed. onChange(detail) and the bubbling, composed displaychange event receive { kind, action, state }; state is a read-only snapshot. No server operation is simulated."
        ]
      },
      {
        "title": "Appearance",
        "paragraphs": [
          "Adapt --dd-surface, --dd-hover, --dd-edge, --dd-text, --dd-muted, --dd-accent, --dd-selected, --dd-chart, --dd-secondary, --dd-tertiary and --dd-focus in buttons.css. Preserve contrast after recoloring. Native buttons support Enter and Space, visible focus and pressed states. CSS motion respects live prefers-reduced-motion changes. Root width is at most 320px and supports 226px previews. Instrument Sans, original SVG and licenses are included."
        ]
      }
    ]
  },
  {
    "id": "matte-data-display-histogram-v11",
    "category": "data-display",
    "name": "Duration histogram",
    "description": "Select a duration interval and switch between frequency and cumulative counts.",
    "motions": [
      "Shared-scale morph"
    ],
    "variants": [
      "data-display-histogram-v11"
    ],
    "keywords": [
      "histogram",
      "Duration histogram",
      "data",
      "display",
      "keyboard",
      "compact"
    ],
    "page": "./component.html?component=matte-data-display-histogram-v11",
    "preview": "./packages/data-display-histogram-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "data-display-histogram-v11": "./downloads/matte-data-display-histogram-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "Serve the extracted folder locally. The immediately visible sample works offline. Use SLComponent.mountPreview(root) for the local demonstration or SLComponent.mount(root, { onChange }) for application selections. Replace paired sample markup and records together."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "select(index) accepts bins 0–5. setMode(\"frequency\" | \"cumulative\") changes the y-axis to 0–10 or 0–30 jobs; state contains selected and mode.",
          "Selection, mode and toggle methods return true for a change, false for no change or a destroyed controller; invalid live arguments throw. reset() returns true while mounted, false after destruction. reset() restores defaults and emits a reset event. destroy() is repeat-safe and removes listeners. Repeated mount(root) returns the existing controller until destroyed. onChange(detail) and the bubbling, composed displaychange event receive { kind, action, state }; state is a read-only snapshot. No server operation is simulated."
        ]
      },
      {
        "title": "Appearance",
        "paragraphs": [
          "Adapt --dd-surface, --dd-hover, --dd-edge, --dd-text, --dd-muted, --dd-accent, --dd-selected, --dd-chart, --dd-secondary, --dd-tertiary and --dd-focus in buttons.css. Preserve contrast after recoloring. Native buttons support Enter and Space, visible focus and pressed states. CSS motion respects live prefers-reduced-motion changes. Root width is at most 320px and supports 226px previews. Instrument Sans, original SVG and licenses are included."
        ]
      }
    ]
  },
  {
    "id": "matte-data-display-ranking-v11",
    "category": "data-display",
    "name": "Channel ranking",
    "description": "Rank acquisition channels by visits or conversion rate while preserving selection.",
    "motions": [
      "Soft selection"
    ],
    "variants": [
      "data-display-ranking-v11"
    ],
    "keywords": [
      "ranking",
      "Channel ranking",
      "data",
      "display",
      "keyboard",
      "compact"
    ],
    "page": "./component.html?component=matte-data-display-ranking-v11",
    "preview": "./packages/data-display-ranking-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "data-display-ranking-v11": "./downloads/matte-data-display-ranking-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "Serve the extracted folder locally. The immediately visible sample works offline. Use SLComponent.mountPreview(root) for the local demonstration or SLComponent.mount(root, { onChange }) for application selections. Replace paired sample markup and records together."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "select(index) uses stable channel IDs 0 Direct, 1 Search, 2 Referral, 3 Social. setMode(\"visits\" | \"conversion\") sorts descending with stable ties. state contains selected and mode.",
          "Selection, mode and toggle methods return true for a change, false for no change or a destroyed controller; invalid live arguments throw. reset() returns true while mounted, false after destruction. reset() restores defaults and emits a reset event. destroy() is repeat-safe and removes listeners. Repeated mount(root) returns the existing controller until destroyed. onChange(detail) and the bubbling, composed displaychange event receive { kind, action, state }; state is a read-only snapshot. No server operation is simulated."
        ]
      },
      {
        "title": "Appearance",
        "paragraphs": [
          "Adapt --dd-surface, --dd-hover, --dd-edge, --dd-text, --dd-muted, --dd-accent, --dd-selected, --dd-chart, --dd-secondary, --dd-tertiary and --dd-focus in buttons.css. Preserve contrast after recoloring. Native buttons support Enter and Space, visible focus and pressed states. CSS motion respects live prefers-reduced-motion changes. Root width is at most 320px and supports 226px previews. Instrument Sans, original SVG and licenses are included."
        ]
      }
    ]
  }
];
