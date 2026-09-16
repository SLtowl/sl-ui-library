// Fifth local Buttons batch for owner review. Not imported into the released catalog.
export default [
  {
    "id": "matte-buttons-cart-toggle-v11",
    "category": "buttons",
    "name": "Cart item",
    "description": "Add or remove one local product with a compact standalone shopping-bag button.",
    "motions": [
      "Item settle",
      "Bag counter"
    ],
    "variants": [
      "buttons-cart-toggle-v11"
    ],
    "keywords": [
      "cart",
      "shop",
      "product",
      "bag",
      "basic",
      "animated icon",
      "everyday action"
    ],
    "page": "./component.html?component=matte-buttons-cart-toggle-v11",
    "preview": "./packages/buttons-cart-toggle-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "buttons-cart-toggle-v11": "./downloads/matte-buttons-cart-toggle-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "Serve the extracted package over HTTP. The bundled demonstration changes only its local sample. Replace mountPreview with mount when connecting application state."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "toggle() reverses the local state and setCartState(value) silently accepts 'empty' | 'added'. state reports { cartState, index }. reset() and destroy() are repeat-safe. User changes call onChange and dispatch one bubbling, composed sl:action event."
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
    "id": "matte-buttons-archive-toggle-v11",
    "category": "buttons",
    "name": "Archive item",
    "description": "Archive or restore a local document as a detailed sheet settles behind a closing archive lid.",
    "motions": [
      "Document descent",
      "Archive close"
    ],
    "variants": [
      "buttons-archive-toggle-v11"
    ],
    "keywords": [
      "archive",
      "restore",
      "box",
      "document",
      "basic",
      "animated icon",
      "everyday action"
    ],
    "page": "./component.html?component=matte-buttons-archive-toggle-v11",
    "preview": "./packages/buttons-archive-toggle-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "buttons-archive-toggle-v11": "./downloads/matte-buttons-archive-toggle-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "Serve the extracted package over HTTP. The bundled demonstration changes only its local sample. Replace mountPreview with mount when connecting application state."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "toggle() reverses the local state and setArchiveState(value) silently accepts 'active' | 'archived'. state reports { archiveState, index }. reset() and destroy() are repeat-safe. User changes call onChange and dispatch one bubbling, composed sl:action event."
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
    "id": "matte-buttons-task-complete-v11",
    "category": "buttons",
    "name": "Complete task",
    "description": "Complete or reopen one local task with two optically centered checks and a controlled line draw.",
    "motions": [
      "Centered check draw",
      "Text strike"
    ],
    "variants": [
      "buttons-task-complete-v11"
    ],
    "keywords": [
      "task",
      "complete",
      "done",
      "check",
      "basic",
      "animated icon",
      "everyday action"
    ],
    "page": "./component.html?component=matte-buttons-task-complete-v11",
    "preview": "./packages/buttons-task-complete-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "buttons-task-complete-v11": "./downloads/matte-buttons-task-complete-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "Serve the extracted package over HTTP. The bundled demonstration changes only its local sample. Replace mountPreview with mount when connecting application state."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "toggle() reverses the local state and setTaskState(value) silently accepts 'open' | 'done'. state reports { taskState, index }. reset() and destroy() are repeat-safe. User changes call onChange and dispatch one bubbling, composed sl:action event."
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
    "id": "matte-buttons-assign-toggle-v11",
    "category": "buttons",
    "name": "Assign person",
    "description": "Assign or remove one local teammate as an avatar travels precisely into a visible task slot.",
    "motions": [
      "Avatar dock",
      "Connector retract"
    ],
    "variants": [
      "buttons-assign-toggle-v11"
    ],
    "keywords": [
      "assign",
      "person",
      "task",
      "teammate",
      "basic",
      "animated icon",
      "everyday action"
    ],
    "page": "./component.html?component=matte-buttons-assign-toggle-v11",
    "preview": "./packages/buttons-assign-toggle-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "buttons-assign-toggle-v11": "./downloads/matte-buttons-assign-toggle-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "Serve the extracted package over HTTP. The bundled demonstration changes only its local sample. Replace mountPreview with mount when connecting application state."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "toggle() reverses the local state and setAssignState(value) silently accepts 'unassigned' | 'assigned'. state reports { assignState, index }. reset() and destroy() are repeat-safe. User changes call onChange and dispatch one bubbling, composed sl:action event."
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
    "id": "matte-buttons-compare-toggle-v11",
    "category": "buttons",
    "name": "Compare items",
    "description": "Split two already-visible local cards from one stack and connect their aligned edges.",
    "motions": [
      "Symmetric split",
      "Straight connector"
    ],
    "variants": [
      "buttons-compare-toggle-v11"
    ],
    "keywords": [
      "compare",
      "cards",
      "products",
      "difference",
      "basic",
      "animated icon",
      "everyday action"
    ],
    "page": "./component.html?component=matte-buttons-compare-toggle-v11",
    "preview": "./packages/buttons-compare-toggle-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "buttons-compare-toggle-v11": "./downloads/matte-buttons-compare-toggle-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "Serve the extracted package over HTTP. The bundled demonstration changes only its local sample. Replace mountPreview with mount when connecting application state."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "toggle() reverses the local state and setCompareState(value) silently accepts 'stacked' | 'compared'. state reports { compareState, index }. reset() and destroy() are repeat-safe. User changes call onChange and dispatch one bubbling, composed sl:action event."
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
    "id": "matte-buttons-new-folder-v11",
    "category": "buttons",
    "name": "New folder",
    "description": "Create or remove a local folder preview with layered documents and a hinged front panel.",
    "motions": [
      "Folder hinge",
      "Document rise"
    ],
    "variants": [
      "buttons-new-folder-v11"
    ],
    "keywords": [
      "folder",
      "create",
      "files",
      "new",
      "basic",
      "animated icon",
      "everyday action"
    ],
    "page": "./component.html?component=matte-buttons-new-folder-v11",
    "preview": "./packages/buttons-new-folder-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "buttons-new-folder-v11": "./downloads/matte-buttons-new-folder-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "Serve the extracted package over HTTP. The bundled demonstration changes only its local sample. Replace mountPreview with mount when connecting application state."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "toggle() reverses the local state and setFolderState(value) silently accepts 'empty' | 'created'. state reports { folderState, index }. reset() and destroy() are repeat-safe. User changes call onChange and dispatch one bubbling, composed sl:action event."
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
    "id": "matte-buttons-comment-toggle-v11",
    "category": "buttons",
    "name": "Comment on selection",
    "description": "Attach or remove one local review note from a visibly selected line of copy.",
    "motions": [
      "Anchored bubble",
      "Comment reveal"
    ],
    "variants": [
      "buttons-comment-toggle-v11"
    ],
    "keywords": [
      "comment",
      "selection",
      "review",
      "document",
      "basic",
      "animated icon",
      "everyday action"
    ],
    "page": "./component.html?component=matte-buttons-comment-toggle-v11",
    "preview": "./packages/buttons-comment-toggle-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "buttons-comment-toggle-v11": "./downloads/matte-buttons-comment-toggle-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "Serve the extracted package over HTTP. The bundled demonstration changes only its local sample. Replace mountPreview with mount when connecting application state."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "toggle() reverses the local state and setCommentState(value) silently accepts 'clear' | 'commented'. state reports { commentState, index }. reset() and destroy() are repeat-safe. User changes call onChange and dispatch one bubbling, composed sl:action event."
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
    "id": "matte-buttons-translate-toggle-v11",
    "category": "buttons",
    "name": "Translate text",
    "description": "Switch a fixed local phrase between English and Russian with a calm directional handoff.",
    "motions": [
      "Word handoff",
      "Arrow exchange"
    ],
    "variants": [
      "buttons-translate-toggle-v11"
    ],
    "keywords": [
      "translate",
      "language",
      "text",
      "locale",
      "basic",
      "animated icon",
      "everyday action"
    ],
    "page": "./component.html?component=matte-buttons-translate-toggle-v11",
    "preview": "./packages/buttons-translate-toggle-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "buttons-translate-toggle-v11": "./downloads/matte-buttons-translate-toggle-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "Serve the extracted package over HTTP. The bundled demonstration changes only its local sample. Replace mountPreview with mount when connecting application state."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "toggle() reverses the local state and setLanguage(value) silently accepts 'english' | 'russian'. state reports { language, index }. reset() and destroy() are repeat-safe. User changes call onChange and dispatch one bubbling, composed sl:action event."
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
    "id": "matte-buttons-tag-toggle-v11",
    "category": "buttons",
    "name": "Tag item",
    "description": "Attach or remove one local category tag with compact uppercase typography and a balanced icon.",
    "motions": [
      "Tag settle",
      "Label reveal"
    ],
    "variants": [
      "buttons-tag-toggle-v11"
    ],
    "keywords": [
      "tag",
      "label",
      "organize",
      "metadata",
      "basic",
      "animated icon",
      "everyday action"
    ],
    "page": "./component.html?component=matte-buttons-tag-toggle-v11",
    "preview": "./packages/buttons-tag-toggle-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "buttons-tag-toggle-v11": "./downloads/matte-buttons-tag-toggle-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "Serve the extracted package over HTTP. The bundled demonstration changes only its local sample. Replace mountPreview with mount when connecting application state."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "toggle() reverses the local state and setTagState(value) silently accepts 'untagged' | 'tagged'. state reports { tagState, index }. reset() and destroy() are repeat-safe. User changes call onChange and dispatch one bubbling, composed sl:action event."
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
    "id": "matte-buttons-photo-toggle-v11",
    "category": "buttons",
    "name": "Add photo",
    "description": "Add or clear a synthetic local photo as a complete image card settles over a small print stack.",
    "motions": [
      "Photo settle",
      "Print fan"
    ],
    "variants": [
      "buttons-photo-toggle-v11"
    ],
    "keywords": [
      "photo",
      "image",
      "gallery",
      "add",
      "basic",
      "animated icon",
      "everyday action"
    ],
    "page": "./component.html?component=matte-buttons-photo-toggle-v11",
    "preview": "./packages/buttons-photo-toggle-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "buttons-photo-toggle-v11": "./downloads/matte-buttons-photo-toggle-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "Serve the extracted package over HTTP. The bundled demonstration changes only its local sample. Replace mountPreview with mount when connecting application state."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "toggle() reverses the local state and setPhotoState(value) silently accepts 'empty' | 'added'. state reports { photoState, index }. reset() and destroy() are repeat-safe. User changes call onChange and dispatch one bubbling, composed sl:action event."
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
