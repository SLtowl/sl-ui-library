// Fourth local Buttons batch for owner review. Not imported into the released catalog until approved.
export default [
  {
    "id": "matte-buttons-text-bold-v11",
    "category": "buttons",
    "name": "Bold text",
    "description": "Toggle a local text sample between regular and bold while the icon gains weight.",
    "motions": [
      "Stroke weight",
      "Text emphasis"
    ],
    "variants": [
      "buttons-text-bold-v11"
    ],
    "keywords": [
      "bold",
      "text",
      "format",
      "weight",
      "basic",
      "animated icon",
      "editor"
    ],
    "page": "./component.html?component=matte-buttons-text-bold-v11",
    "preview": "./packages/buttons-text-bold-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "buttons-text-bold-v11": "./downloads/matte-buttons-text-bold-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "Serve the extracted package over HTTP. The bundled demonstration changes only its local sample. Replace mountPreview with mount when connecting your editor or media surface."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "toggle() advances the control and setWeight(value) silently accepts 'regular' | 'bold'. state reports { weight, index }. reset() and destroy() are repeat-safe. User changes call onChange and dispatch one bubbling, composed sl:action event."
        ]
      },
      {
        "title": "Appearance and accessibility",
        "paragraphs": [
          "Override the --action-* variables on .sl-component to adapt the neutral palette. Keep the native button, visible focus and live status. Icon and sample motion respects prefers-reduced-motion; forced colors remain legible."
        ]
      }
    ]
  },
  {
    "id": "matte-buttons-text-italic-v11",
    "category": "buttons",
    "name": "Italic text",
    "description": "Toggle a local text sample between upright and italic with one continuous icon lean.",
    "motions": [
      "Glyph lean",
      "Text slant"
    ],
    "variants": [
      "buttons-text-italic-v11"
    ],
    "keywords": [
      "italic",
      "text",
      "format",
      "slant",
      "basic",
      "animated icon",
      "editor"
    ],
    "page": "./component.html?component=matte-buttons-text-italic-v11",
    "preview": "./packages/buttons-text-italic-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "buttons-text-italic-v11": "./downloads/matte-buttons-text-italic-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "Serve the extracted package over HTTP. The bundled demonstration changes only its local sample. Replace mountPreview with mount when connecting your editor or media surface."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "toggle() advances the control and setStyle(value) silently accepts 'regular' | 'italic'. state reports { style, index }. reset() and destroy() are repeat-safe. User changes call onChange and dispatch one bubbling, composed sl:action event."
        ]
      },
      {
        "title": "Appearance and accessibility",
        "paragraphs": [
          "Override the --action-* variables on .sl-component to adapt the neutral palette. Keep the native button, visible focus and live status. Icon and sample motion respects prefers-reduced-motion; forced colors remain legible."
        ]
      }
    ]
  },
  {
    "id": "matte-buttons-text-case-v11",
    "category": "buttons",
    "name": "Text case",
    "description": "Cycle one local label through sentence, uppercase and lowercase forms.",
    "motions": [
      "Case step",
      "Baseline shift"
    ],
    "variants": [
      "buttons-text-case-v11"
    ],
    "keywords": [
      "case",
      "uppercase",
      "lowercase",
      "text",
      "basic",
      "animated icon",
      "editor"
    ],
    "page": "./component.html?component=matte-buttons-text-case-v11",
    "preview": "./packages/buttons-text-case-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "buttons-text-case-v11": "./downloads/matte-buttons-text-case-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "Serve the extracted package over HTTP. The bundled demonstration changes only its local sample. Replace mountPreview with mount when connecting your editor or media surface."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "cycle() advances the control and setCase(value) silently accepts 'sentence' | 'upper' | 'lower'. state reports { case, index }. reset() and destroy() are repeat-safe. User changes call onChange and dispatch one bubbling, composed sl:action event."
        ]
      },
      {
        "title": "Appearance and accessibility",
        "paragraphs": [
          "Override the --action-* variables on .sl-component to adapt the neutral palette. Keep the native button, visible focus and live status. Icon and sample motion respects prefers-reduced-motion; forced colors remain legible."
        ]
      }
    ]
  },
  {
    "id": "matte-buttons-text-strike-v11",
    "category": "buttons",
    "name": "Strikethrough",
    "description": "Add or remove a clean strike from a local task without moving its text.",
    "motions": [
      "Line draw",
      "Text settle"
    ],
    "variants": [
      "buttons-text-strike-v11"
    ],
    "keywords": [
      "strikethrough",
      "text",
      "task",
      "format",
      "basic",
      "animated icon",
      "editor"
    ],
    "page": "./component.html?component=matte-buttons-text-strike-v11",
    "preview": "./packages/buttons-text-strike-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "buttons-text-strike-v11": "./downloads/matte-buttons-text-strike-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "Serve the extracted package over HTTP. The bundled demonstration changes only its local sample. Replace mountPreview with mount when connecting your editor or media surface."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "toggle() advances the control and setStruck(value) silently accepts 'clear' | 'struck'. state reports { struck, index }. reset() and destroy() are repeat-safe. User changes call onChange and dispatch one bubbling, composed sl:action event."
        ]
      },
      {
        "title": "Appearance and accessibility",
        "paragraphs": [
          "Override the --action-* variables on .sl-component to adapt the neutral palette. Keep the native button, visible focus and live status. Icon and sample motion respects prefers-reduced-motion; forced colors remain legible."
        ]
      }
    ]
  },
  {
    "id": "matte-buttons-text-align-v11",
    "category": "buttons",
    "name": "Text alignment",
    "description": "Cycle a local paragraph through left, center and right alignment.",
    "motions": [
      "Line glide",
      "Alignment shift"
    ],
    "variants": [
      "buttons-text-align-v11"
    ],
    "keywords": [
      "align",
      "left",
      "center",
      "right",
      "text",
      "basic",
      "animated icon",
      "editor"
    ],
    "page": "./component.html?component=matte-buttons-text-align-v11",
    "preview": "./packages/buttons-text-align-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "buttons-text-align-v11": "./downloads/matte-buttons-text-align-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "Serve the extracted package over HTTP. The bundled demonstration changes only its local sample. Replace mountPreview with mount when connecting your editor or media surface."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "cycle() advances the control and setAlignment(value) silently accepts 'left' | 'center' | 'right'. state reports { alignment, index }. reset() and destroy() are repeat-safe. User changes call onChange and dispatch one bubbling, composed sl:action event."
        ]
      },
      {
        "title": "Appearance and accessibility",
        "paragraphs": [
          "Override the --action-* variables on .sl-component to adapt the neutral palette. Keep the native button, visible focus and live status. Icon and sample motion respects prefers-reduced-motion; forced colors remain legible."
        ]
      }
    ]
  },
  {
    "id": "matte-buttons-list-style-v11",
    "category": "buttons",
    "name": "List style",
    "description": "Cycle a local list through bullets, numbers and checks with stable row geometry.",
    "motions": [
      "Marker morph",
      "Row settle"
    ],
    "variants": [
      "buttons-list-style-v11"
    ],
    "keywords": [
      "list",
      "bullets",
      "numbers",
      "checklist",
      "basic",
      "animated icon",
      "editor"
    ],
    "page": "./component.html?component=matte-buttons-list-style-v11",
    "preview": "./packages/buttons-list-style-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "buttons-list-style-v11": "./downloads/matte-buttons-list-style-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "Serve the extracted package over HTTP. The bundled demonstration changes only its local sample. Replace mountPreview with mount when connecting your editor or media surface."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "cycle() advances the control and setListStyle(value) silently accepts 'bullets' | 'numbers' | 'checks'. state reports { listStyle, index }. reset() and destroy() are repeat-safe. User changes call onChange and dispatch one bubbling, composed sl:action event."
        ]
      },
      {
        "title": "Appearance and accessibility",
        "paragraphs": [
          "Override the --action-* variables on .sl-component to adapt the neutral palette. Keep the native button, visible focus and live status. Icon and sample motion respects prefers-reduced-motion; forced colors remain legible."
        ]
      }
    ]
  },
  {
    "id": "matte-buttons-indent-level-v11",
    "category": "buttons",
    "name": "Indent level",
    "description": "Advance a local paragraph through four exact indentation levels and return to zero.",
    "motions": [
      "Line indent",
      "Arrow nudge"
    ],
    "variants": [
      "buttons-indent-level-v11"
    ],
    "keywords": [
      "indent",
      "text",
      "paragraph",
      "level",
      "basic",
      "animated icon",
      "editor"
    ],
    "page": "./component.html?component=matte-buttons-indent-level-v11",
    "preview": "./packages/buttons-indent-level-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "buttons-indent-level-v11": "./downloads/matte-buttons-indent-level-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "Serve the extracted package over HTTP. The bundled demonstration changes only its local sample. Replace mountPreview with mount when connecting your editor or media surface."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "cycle() advances the control and setLevel(value) silently accepts '0' | '1' | '2' | '3'. state reports { level, index }. reset() and destroy() are repeat-safe. User changes call onChange and dispatch one bubbling, composed sl:action event."
        ]
      },
      {
        "title": "Appearance and accessibility",
        "paragraphs": [
          "Override the --action-* variables on .sl-component to adapt the neutral palette. Keep the native button, visible focus and live status. Icon and sample motion respects prefers-reduced-motion; forced colors remain legible."
        ]
      }
    ]
  },
  {
    "id": "matte-buttons-rotate-item-v11",
    "category": "buttons",
    "name": "Rotate item",
    "description": "Rotate one local item in quarter turns with a matching continuous arrow motion.",
    "motions": [
      "Quarter turn",
      "Arrow orbit"
    ],
    "variants": [
      "buttons-rotate-item-v11"
    ],
    "keywords": [
      "rotate",
      "turn",
      "image",
      "orientation",
      "basic",
      "animated icon",
      "editor"
    ],
    "page": "./component.html?component=matte-buttons-rotate-item-v11",
    "preview": "./packages/buttons-rotate-item-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "buttons-rotate-item-v11": "./downloads/matte-buttons-rotate-item-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "Serve the extracted package over HTTP. The bundled demonstration changes only its local sample. Replace mountPreview with mount when connecting your editor or media surface."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "cycle() advances the control and setRotation(value) silently accepts '0' | '90' | '180' | '270'. state reports { rotation, index }. reset() and destroy() are repeat-safe. User changes call onChange and dispatch one bubbling, composed sl:action event."
        ]
      },
      {
        "title": "Appearance and accessibility",
        "paragraphs": [
          "Override the --action-* variables on .sl-component to adapt the neutral palette. Keep the native button, visible focus and live status. Icon and sample motion respects prefers-reduced-motion; forced colors remain legible."
        ]
      }
    ]
  },
  {
    "id": "matte-buttons-mirror-item-v11",
    "category": "buttons",
    "name": "Mirror item",
    "description": "Mirror one asymmetric local item horizontally and return it along the same path.",
    "motions": [
      "Horizontal flip",
      "Axis settle"
    ],
    "variants": [
      "buttons-mirror-item-v11"
    ],
    "keywords": [
      "mirror",
      "flip",
      "image",
      "horizontal",
      "basic",
      "animated icon",
      "editor"
    ],
    "page": "./component.html?component=matte-buttons-mirror-item-v11",
    "preview": "./packages/buttons-mirror-item-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "buttons-mirror-item-v11": "./downloads/matte-buttons-mirror-item-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "Serve the extracted package over HTTP. The bundled demonstration changes only its local sample. Replace mountPreview with mount when connecting your editor or media surface."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "toggle() advances the control and setMirrored(value) silently accepts 'normal' | 'mirrored'. state reports { mirrored, index }. reset() and destroy() are repeat-safe. User changes call onChange and dispatch one bubbling, composed sl:action event."
        ]
      },
      {
        "title": "Appearance and accessibility",
        "paragraphs": [
          "Override the --action-* variables on .sl-component to adapt the neutral palette. Keep the native button, visible focus and live status. Icon and sample motion respects prefers-reduced-motion; forced colors remain legible."
        ]
      }
    ]
  },
  {
    "id": "matte-buttons-crop-mode-v11",
    "category": "buttons",
    "name": "Crop mode",
    "description": "Enter or leave a local crop mode while handles close around the visible sample.",
    "motions": [
      "Handle close",
      "Image scale"
    ],
    "variants": [
      "buttons-crop-mode-v11"
    ],
    "keywords": [
      "crop",
      "image",
      "frame",
      "edit",
      "basic",
      "animated icon",
      "editor"
    ],
    "page": "./component.html?component=matte-buttons-crop-mode-v11",
    "preview": "./packages/buttons-crop-mode-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "buttons-crop-mode-v11": "./downloads/matte-buttons-crop-mode-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "Serve the extracted package over HTTP. The bundled demonstration changes only its local sample. Replace mountPreview with mount when connecting your editor or media surface."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "toggle() advances the control and setCropping(value) silently accepts 'idle' | 'cropping'. state reports { cropping, index }. reset() and destroy() are repeat-safe. User changes call onChange and dispatch one bubbling, composed sl:action event."
        ]
      },
      {
        "title": "Appearance and accessibility",
        "paragraphs": [
          "Override the --action-* variables on .sl-component to adapt the neutral palette. Keep the native button, visible focus and live status. Icon and sample motion respects prefers-reduced-motion; forced colors remain legible."
        ]
      }
    ]
  }
];
