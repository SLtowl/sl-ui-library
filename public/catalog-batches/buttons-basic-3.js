// Fourth local Buttons batch for owner review. Not imported into the released catalog until approved.
export default [
  {
    "id": "matte-buttons-text-editor-toolbar-v11",
    "category": "buttons",
    "name": "Text editor toolbar",
    "description": "Format an editable local text sample with seven compact controls in one coordinated toolbar.",
    "motions": [
      "Toolbar press",
      "Format transition"
    ],
    "variants": [
      "buttons-text-editor-toolbar-v11"
    ],
    "keywords": [
      "text",
      "editor",
      "toolbar",
      "bold",
      "italic",
      "case",
      "strikethrough",
      "alignment",
      "list",
      "indent"
    ],
    "page": "./component.html?component=matte-buttons-text-editor-toolbar-v11",
    "preview": "./packages/buttons-text-editor-toolbar-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "buttons-text-editor-toolbar-v11": "./downloads/matte-buttons-text-editor-toolbar-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "Serve the extracted package over HTTP. The bundled demonstration formats only its editable local sample. Use mount(root, options) to connect the seven commands and text input to a real editor."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "toggleBold(), toggleItalic(), cycleCase(), toggleStrike(), cycleAlignment(), cycleList() and cycleIndent() update local state. Matching setters are silent. User commands call onChange and dispatch one sl:action event; edits call onInput and dispatch sl:text-input. reset() and destroy() are repeat-safe."
        ]
      },
      {
        "title": "Appearance and accessibility",
        "paragraphs": [
          "Override the --action-* variables on .sl-component to adapt the neutral palette. The toolbar uses native buttons, roving arrow-key focus and visible focus states. Formatting motion respects prefers-reduced-motion and forced colors."
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
