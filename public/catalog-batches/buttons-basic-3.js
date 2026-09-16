// Owner-approved local Buttons review set. Kept outside the released catalog until the next release transition.
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
    "id": "matte-buttons-image-transform-toolbar-v11",
    "category": "buttons",
    "name": "Image transform toolbar",
    "description": "Rotate and mirror one local image sample from a coordinated two-action toolbar.",
    "motions": [
      "Forward rotation",
      "Mirror transition"
    ],
    "variants": [
      "buttons-image-transform-toolbar-v11"
    ],
    "keywords": [
      "image",
      "media",
      "toolbar",
      "rotate",
      "mirror",
      "reverse",
      "transform"
    ],
    "page": "./component.html?component=matte-buttons-image-transform-toolbar-v11",
    "preview": "./packages/buttons-image-transform-toolbar-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "buttons-image-transform-toolbar-v11": "./downloads/matte-buttons-image-transform-toolbar-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "Serve the extracted package over HTTP. The bundled demonstration transforms only its local image sample. Use mount(root, options) to connect the two commands to a real editor."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "rotate() advances clockwise by 90 degrees without reversing at the 360-degree boundary. toggleMirror(), setRotation(value) and setMirrored(value) update the shared transform state. User commands call onChange and dispatch one sl:action event. reset() and destroy() are repeat-safe."
        ]
      },
      {
        "title": "Appearance and accessibility",
        "paragraphs": [
          "Override the --action-* variables on .sl-component to adapt the neutral palette. The toolbar uses native buttons, arrow-key focus and visible focus states. Transform motion respects prefers-reduced-motion and forced colors."
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
