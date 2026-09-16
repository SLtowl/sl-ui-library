// Third local Buttons batch for owner review. Not imported into the released catalog until approved.
export default [
  {
    "id": "matte-buttons-search-toggle-v11",
    "category": "buttons",
    "name": "Search toggle",
    "description": "Open or close a local search mode while the magnifier resolves into a close mark.",
    "motions": [
      "Magnifier to close",
      "Soft press"
    ],
    "variants": [
      "buttons-search-toggle-v11"
    ],
    "keywords": [
      "search",
      "find",
      "close",
      "magnifier",
      "basic",
      "animated icon"
    ],
    "page": "./component.html?component=matte-buttons-search-toggle-v11",
    "preview": "./packages/buttons-search-toggle-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "buttons-search-toggle-v11": "./downloads/matte-buttons-search-toggle-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "Serve the extracted package over HTTP. The preview is local and offline. Replace mountPreview with mount when wiring application behavior."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "toggle() and setOpen(value) update local state. state is { open }. reset() and destroy() are repeat-safe. User-triggered changes dispatch a bubbling, composed sl:action event."
        ]
      },
      {
        "title": "Appearance and accessibility",
        "paragraphs": [
          "Override --action-ink, --action-surface, --action-hover, --action-text, --action-muted, --action-stage, --action-edge, --action-focus and --action-feedback on .sl-component. Keep contrast after recoloring. The native button supports keyboard activation and visible focus; motion respects prefers-reduced-motion."
        ]
      }
    ]
  },
  {
    "id": "matte-buttons-visibility-toggle-v11",
    "category": "buttons",
    "name": "Visibility toggle",
    "description": "Show or hide local content with an eye that opens and removes its diagonal stroke.",
    "motions": [
      "Eye reveal",
      "Slash dissolve"
    ],
    "variants": [
      "buttons-visibility-toggle-v11"
    ],
    "keywords": [
      "show",
      "hide",
      "visibility",
      "eye",
      "basic",
      "animated icon"
    ],
    "page": "./component.html?component=matte-buttons-visibility-toggle-v11",
    "preview": "./packages/buttons-visibility-toggle-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "buttons-visibility-toggle-v11": "./downloads/matte-buttons-visibility-toggle-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "Serve the extracted package over HTTP. The preview is local and offline. Replace mountPreview with mount when wiring application behavior."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "toggle() and setVisible(value) update local state. state is { visible }. reset() and destroy() are repeat-safe. User-triggered changes dispatch a bubbling, composed sl:action event."
        ]
      },
      {
        "title": "Appearance and accessibility",
        "paragraphs": [
          "Override --action-ink, --action-surface, --action-hover, --action-text, --action-muted, --action-stage, --action-edge, --action-focus and --action-feedback on .sl-component. Keep contrast after recoloring. The native button supports keyboard activation and visible focus; motion respects prefers-reduced-motion."
        ]
      }
    ]
  },
  {
    "id": "matte-buttons-sound-toggle-v11",
    "category": "buttons",
    "name": "Sound toggle",
    "description": "Mute or restore local sound state while waves retract and a slash is drawn.",
    "motions": [
      "Wave retract",
      "Mute slash draw"
    ],
    "variants": [
      "buttons-sound-toggle-v11"
    ],
    "keywords": [
      "sound",
      "mute",
      "audio",
      "speaker",
      "basic",
      "animated icon"
    ],
    "page": "./component.html?component=matte-buttons-sound-toggle-v11",
    "preview": "./packages/buttons-sound-toggle-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "buttons-sound-toggle-v11": "./downloads/matte-buttons-sound-toggle-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "Serve the extracted package over HTTP. The preview is local and offline. Replace mountPreview with mount when wiring application behavior."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "toggle() and setMuted(value) update local state. state is { muted }. reset() and destroy() are repeat-safe. User-triggered changes dispatch a bubbling, composed sl:action event."
        ]
      },
      {
        "title": "Appearance and accessibility",
        "paragraphs": [
          "Override --action-ink, --action-surface, --action-hover, --action-text, --action-muted, --action-stage, --action-edge, --action-focus and --action-feedback on .sl-component. Keep contrast after recoloring. The native button supports keyboard activation and visible focus; motion respects prefers-reduced-motion."
        ]
      }
    ]
  },
  {
    "id": "matte-buttons-expand-toggle-v11",
    "category": "buttons",
    "name": "Expand or collapse",
    "description": "Switch a local display mode with four corner strokes that move continuously outward and inward.",
    "motions": [
      "Corner travel",
      "Soft press"
    ],
    "variants": [
      "buttons-expand-toggle-v11"
    ],
    "keywords": [
      "expand",
      "collapse",
      "fullscreen",
      "corners",
      "basic",
      "animated icon"
    ],
    "page": "./component.html?component=matte-buttons-expand-toggle-v11",
    "preview": "./packages/buttons-expand-toggle-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "buttons-expand-toggle-v11": "./downloads/matte-buttons-expand-toggle-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "Serve the extracted package over HTTP. The preview is local and offline. Replace mountPreview with mount when wiring application behavior."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "toggle() and setExpanded(value) update local state. state is { expanded }. reset() and destroy() are repeat-safe. User-triggered changes dispatch a bubbling, composed sl:action event."
        ]
      },
      {
        "title": "Appearance and accessibility",
        "paragraphs": [
          "Override --action-ink, --action-surface, --action-hover, --action-text, --action-muted, --action-stage, --action-edge, --action-focus and --action-feedback on .sl-component. Keep contrast after recoloring. The native button supports keyboard activation and visible focus; motion respects prefers-reduced-motion."
        ]
      }
    ]
  },
  {
    "id": "matte-buttons-view-switch-v11",
    "category": "buttons",
    "name": "Grid or list view",
    "description": "Switch between grid and list presentation with cells that flow into aligned rows.",
    "motions": [
      "Grid to list",
      "Cell flow"
    ],
    "variants": [
      "buttons-view-switch-v11"
    ],
    "keywords": [
      "grid",
      "list",
      "view",
      "layout",
      "basic",
      "animated icon"
    ],
    "page": "./component.html?component=matte-buttons-view-switch-v11",
    "preview": "./packages/buttons-view-switch-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "buttons-view-switch-v11": "./downloads/matte-buttons-view-switch-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "Serve the extracted package over HTTP. The preview is local and offline. Replace mountPreview with mount when wiring application behavior."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "toggle() and setView('grid' | 'list') update local state. state is { view }. reset() and destroy() are repeat-safe. User-triggered changes dispatch a bubbling, composed sl:action event."
        ]
      },
      {
        "title": "Appearance and accessibility",
        "paragraphs": [
          "Override --action-ink, --action-surface, --action-hover, --action-text, --action-muted, --action-stage, --action-edge, --action-focus and --action-feedback on .sl-component. Keep contrast after recoloring. The native button supports keyboard activation and visible focus; motion respects prefers-reduced-motion."
        ]
      }
    ]
  },
  {
    "id": "matte-buttons-sidebar-toggle-v11",
    "category": "buttons",
    "name": "Sidebar toggle",
    "description": "Open or close a local sidebar state while a panel slides inside a stable frame.",
    "motions": [
      "Panel slide",
      "Divider reveal"
    ],
    "variants": [
      "buttons-sidebar-toggle-v11"
    ],
    "keywords": [
      "sidebar",
      "panel",
      "open",
      "close",
      "basic",
      "animated icon"
    ],
    "page": "./component.html?component=matte-buttons-sidebar-toggle-v11",
    "preview": "./packages/buttons-sidebar-toggle-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "buttons-sidebar-toggle-v11": "./downloads/matte-buttons-sidebar-toggle-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "Serve the extracted package over HTTP. The preview is local and offline. Replace mountPreview with mount when wiring application behavior."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "toggle() and setOpen(value) update local state. state is { open }. reset() and destroy() are repeat-safe. User-triggered changes dispatch a bubbling, composed sl:action event."
        ]
      },
      {
        "title": "Appearance and accessibility",
        "paragraphs": [
          "Override --action-ink, --action-surface, --action-hover, --action-text, --action-muted, --action-stage, --action-edge, --action-focus and --action-feedback on .sl-component. Keep contrast after recoloring. The native button supports keyboard activation and visible focus; motion respects prefers-reduced-motion."
        ]
      }
    ]
  },
  {
    "id": "matte-buttons-notifications-toggle-v11",
    "category": "buttons",
    "name": "Notifications toggle",
    "description": "Enable or silence local alerts with a bell that settles as its diagonal stroke disappears.",
    "motions": [
      "Bell settle",
      "Slash dissolve"
    ],
    "variants": [
      "buttons-notifications-toggle-v11"
    ],
    "keywords": [
      "notification",
      "bell",
      "alert",
      "mute",
      "basic",
      "animated icon"
    ],
    "page": "./component.html?component=matte-buttons-notifications-toggle-v11",
    "preview": "./packages/buttons-notifications-toggle-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "buttons-notifications-toggle-v11": "./downloads/matte-buttons-notifications-toggle-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "Serve the extracted package over HTTP. The preview is local and offline. Replace mountPreview with mount when wiring application behavior."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "toggle() and setEnabled(value) update local state. state is { enabled }. reset() and destroy() are repeat-safe. User-triggered changes dispatch a bubbling, composed sl:action event."
        ]
      },
      {
        "title": "Appearance and accessibility",
        "paragraphs": [
          "Override --action-ink, --action-surface, --action-hover, --action-text, --action-muted, --action-stage, --action-edge, --action-focus and --action-feedback on .sl-component. Keep contrast after recoloring. The native button supports keyboard activation and visible focus; motion respects prefers-reduced-motion."
        ]
      }
    ]
  },
  {
    "id": "matte-buttons-attachment-toggle-v11",
    "category": "buttons",
    "name": "Attachment toggle",
    "description": "Attach or remove one local draft file with a paperclip that settles and gains a check.",
    "motions": [
      "Paperclip settle",
      "Check draw"
    ],
    "variants": [
      "buttons-attachment-toggle-v11"
    ],
    "keywords": [
      "attach",
      "file",
      "paperclip",
      "remove",
      "basic",
      "animated icon"
    ],
    "page": "./component.html?component=matte-buttons-attachment-toggle-v11",
    "preview": "./packages/buttons-attachment-toggle-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "buttons-attachment-toggle-v11": "./downloads/matte-buttons-attachment-toggle-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "Serve the extracted package over HTTP. The preview is local and offline. Replace mountPreview with mount when wiring application behavior."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "toggle() and setAttached(value) update local state. state is { attached }. reset() and destroy() are repeat-safe. User-triggered changes dispatch a bubbling, composed sl:action event."
        ]
      },
      {
        "title": "Appearance and accessibility",
        "paragraphs": [
          "Override --action-ink, --action-surface, --action-hover, --action-text, --action-muted, --action-stage, --action-edge, --action-focus and --action-feedback on .sl-component. Keep contrast after recoloring. The native button supports keyboard activation and visible focus; motion respects prefers-reduced-motion."
        ]
      }
    ]
  },
  {
    "id": "matte-buttons-undo-action-v11",
    "category": "buttons",
    "name": "Undo action",
    "description": "Run a real undo callback while a curved arrow travels backward and resolves to a check.",
    "motions": [
      "Arrow rewind",
      "Check draw"
    ],
    "variants": [
      "buttons-undo-action-v11"
    ],
    "keywords": [
      "undo",
      "reverse",
      "history",
      "action",
      "basic",
      "animated icon"
    ],
    "page": "./component.html?component=matte-buttons-undo-action-v11",
    "preview": "./packages/buttons-undo-action-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "buttons-undo-action-v11": "./downloads/matte-buttons-undo-action-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "Serve the extracted package over HTTP. The preview is local and offline. Replace mountPreview with mount when wiring application behavior."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "Pass onUndo({ signal }) and resolve only after the real undo action succeeds. start() returns Promise<boolean>; cancel(), reset() and destroy() are repeat-safe. state is { phase }. User-triggered changes dispatch a bubbling, composed sl:action event."
        ]
      },
      {
        "title": "Appearance and accessibility",
        "paragraphs": [
          "Override --action-ink, --action-surface, --action-hover, --action-text, --action-muted, --action-stage, --action-edge, --action-focus and --action-feedback on .sl-component. Keep contrast after recoloring. The native button supports keyboard activation and visible focus; motion respects prefers-reduced-motion."
        ]
      }
    ]
  },
  {
    "id": "matte-buttons-move-item-v11",
    "category": "buttons",
    "name": "Move item",
    "description": "Run a real move callback while an item follows its arrow and resolves to a check.",
    "motions": [
      "Item travel",
      "Check draw"
    ],
    "variants": [
      "buttons-move-item-v11"
    ],
    "keywords": [
      "move",
      "item",
      "arrow",
      "action",
      "basic",
      "animated icon"
    ],
    "page": "./component.html?component=matte-buttons-move-item-v11",
    "preview": "./packages/buttons-move-item-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "buttons-move-item-v11": "./downloads/matte-buttons-move-item-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "Serve the extracted package over HTTP. The preview is local and offline. Replace mountPreview with mount when wiring application behavior."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "Pass onMove({ signal }) and resolve only after the real move action succeeds. start() returns Promise<boolean>; cancel(), reset() and destroy() are repeat-safe. state is { phase }. User-triggered changes dispatch a bubbling, composed sl:action event."
        ]
      },
      {
        "title": "Appearance and accessibility",
        "paragraphs": [
          "Override --action-ink, --action-surface, --action-hover, --action-text, --action-muted, --action-stage, --action-edge, --action-focus and --action-feedback on .sl-component. Keep contrast after recoloring. The native button supports keyboard activation and visible focus; motion respects prefers-reduced-motion."
        ]
      }
    ]
  }
];
