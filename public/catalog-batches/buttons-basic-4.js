// Fifth local Buttons batch for owner review. Not imported into the released catalog.
export default [
  {
    "id": "matte-buttons-cart-toggle-v11",
    "category": "buttons",
    "name": "Cart item",
    "description": "Add or remove one local product while the item settles into a compact cart.",
    "motions": [
      "Item drop",
      "Badge settle"
    ],
    "variants": [
      "buttons-cart-toggle-v11"
    ],
    "keywords": [
      "cart",
      "shop",
      "product",
      "add",
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
    "description": "Archive or restore a local item with a file that moves cleanly into its box.",
    "motions": [
      "File settle",
      "Lid close"
    ],
    "variants": [
      "buttons-archive-toggle-v11"
    ],
    "keywords": [
      "archive",
      "restore",
      "box",
      "file",
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
    "description": "Complete or reopen one local task with a drawn check and a restrained text strike.",
    "motions": [
      "Check draw",
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
    "id": "matte-buttons-schedule-toggle-v11",
    "category": "buttons",
    "name": "Schedule item",
    "description": "Schedule or clear one local item while the calendar marker lands on its day.",
    "motions": [
      "Marker drop",
      "Calendar settle"
    ],
    "variants": [
      "buttons-schedule-toggle-v11"
    ],
    "keywords": [
      "schedule",
      "calendar",
      "date",
      "plan",
      "basic",
      "animated icon",
      "everyday action"
    ],
    "page": "./component.html?component=matte-buttons-schedule-toggle-v11",
    "preview": "./packages/buttons-schedule-toggle-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "buttons-schedule-toggle-v11": "./downloads/matte-buttons-schedule-toggle-v11.zip"
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
          "toggle() reverses the local state and setScheduleState(value) silently accepts 'clear' | 'scheduled'. state reports { scheduleState, index }. reset() and destroy() are repeat-safe. User changes call onChange and dispatch one bubbling, composed sl:action event."
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
    "description": "Add or remove a second local card with a smooth overlap and connector reveal.",
    "motions": [
      "Card fan",
      "Connector reveal"
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
          "toggle() reverses the local state and setCompareState(value) silently accepts 'single' | 'compared'. state reports { compareState, index }. reset() and destroy() are repeat-safe. User changes call onChange and dispatch one bubbling, composed sl:action event."
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
    "description": "Create or remove a local folder preview while the tab opens and the plus becomes a check.",
    "motions": [
      "Folder open",
      "Plus-to-check"
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
    "name": "Add comment",
    "description": "Add or remove a local comment preview as its bubble unfolds without changing layout.",
    "motions": [
      "Bubble unfold",
      "Line reveal"
    ],
    "variants": [
      "buttons-comment-toggle-v11"
    ],
    "keywords": [
      "comment",
      "message",
      "note",
      "discussion",
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
          "toggle() reverses the local state and setCommentState(value) silently accepts 'none' | 'added'. state reports { commentState, index }. reset() and destroy() are repeat-safe. User changes call onChange and dispatch one bubbling, composed sl:action event."
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
    "description": "Attach or remove one local tag while the label slides neatly into its outline.",
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
    "description": "Add or clear a synthetic local photo preview with a soft frame-and-image reveal.",
    "motions": [
      "Image reveal",
      "Frame settle"
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
