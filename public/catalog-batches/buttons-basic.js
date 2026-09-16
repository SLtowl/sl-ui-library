// Second local Buttons batch for owner review. Not imported into the released catalog until approved.
export default [
  {
    "id": "matte-buttons-add-item-v11",
    "category": "buttons",
    "name": "Add item",
    "description": "Add or remove one local item with a plus that resolves into a drawn check.",
    "motions": [
      "Plus to check",
      "Soft press"
    ],
    "variants": [
      "buttons-add-item-v11"
    ],
    "keywords": [
      "add",
      "create",
      "plus",
      "check",
      "basic",
      "animated icon"
    ],
    "page": "./component.html?component=matte-buttons-add-item-v11",
    "preview": "./packages/buttons-add-item-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "buttons-add-item-v11": "./downloads/matte-buttons-add-item-v11.zip"
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
          "toggle() and setAdded(value) update local state. state is { added }. reset() and destroy() are repeat-safe. User-triggered changes dispatch a bubbling, composed sl:action event."
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
    "id": "matte-buttons-send-message-v11",
    "category": "buttons",
    "name": "Send message",
    "description": "Run a message action with a paper plane departure and confirmed check state.",
    "motions": [
      "Plane departure",
      "Check draw"
    ],
    "variants": [
      "buttons-send-message-v11"
    ],
    "keywords": [
      "send",
      "message",
      "paper plane",
      "action",
      "basic",
      "animated icon"
    ],
    "page": "./component.html?component=matte-buttons-send-message-v11",
    "preview": "./packages/buttons-send-message-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "buttons-send-message-v11": "./downloads/matte-buttons-send-message-v11.zip"
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
          "Pass onSend({ signal }) and resolve only after the real send action succeeds. start() returns Promise<boolean>; cancel(), reset() and destroy() are repeat-safe. state is { phase }. User-triggered changes dispatch a bubbling, composed sl:action event."
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
    "id": "matte-buttons-edit-mode-v11",
    "category": "buttons",
    "name": "Edit mode",
    "description": "Enter or leave a local editing mode while the pencil resolves into a check.",
    "motions": [
      "Pencil settle",
      "Check draw"
    ],
    "variants": [
      "buttons-edit-mode-v11"
    ],
    "keywords": [
      "edit",
      "done",
      "pencil",
      "mode",
      "basic",
      "animated icon"
    ],
    "page": "./component.html?component=matte-buttons-edit-mode-v11",
    "preview": "./packages/buttons-edit-mode-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "buttons-edit-mode-v11": "./downloads/matte-buttons-edit-mode-v11.zip"
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
          "toggle() and setEditing(value) update local state. state is { editing }. reset() and destroy() are repeat-safe. User-triggered changes dispatch a bubbling, composed sl:action event."
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
    "id": "matte-buttons-link-toggle-v11",
    "category": "buttons",
    "name": "Link or unlink",
    "description": "Connect or separate two items with animated chain halves and explicit pressed state.",
    "motions": [
      "Chain connect",
      "Soft press"
    ],
    "variants": [
      "buttons-link-toggle-v11"
    ],
    "keywords": [
      "link",
      "unlink",
      "chain",
      "connect",
      "basic",
      "animated icon"
    ],
    "page": "./component.html?component=matte-buttons-link-toggle-v11",
    "preview": "./packages/buttons-link-toggle-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "buttons-link-toggle-v11": "./downloads/matte-buttons-link-toggle-v11.zip"
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
          "toggle() and setLinked(value) update local state. state is { linked }. reset() and destroy() are repeat-safe. User-triggered changes dispatch a bubbling, composed sl:action event."
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
    "id": "matte-buttons-lock-toggle-v11",
    "category": "buttons",
    "name": "Lock or unlock",
    "description": "Toggle a local lock state while the shackle opens and settles into place.",
    "motions": [
      "Shackle close",
      "Soft press"
    ],
    "variants": [
      "buttons-lock-toggle-v11"
    ],
    "keywords": [
      "lock",
      "unlock",
      "secure",
      "privacy",
      "basic",
      "animated icon"
    ],
    "page": "./component.html?component=matte-buttons-lock-toggle-v11",
    "preview": "./packages/buttons-lock-toggle-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "buttons-lock-toggle-v11": "./downloads/matte-buttons-lock-toggle-v11.zip"
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
          "toggle() and setLocked(value) update local state. state is { locked }. reset() and destroy() are repeat-safe. User-triggered changes dispatch a bubbling, composed sl:action event."
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
    "id": "matte-buttons-details-disclosure-v11",
    "category": "buttons",
    "name": "Details disclosure",
    "description": "Reveal compact supporting content with a rotating chevron and reversible height motion.",
    "motions": [
      "Chevron rotate",
      "Reversible reveal"
    ],
    "variants": [
      "buttons-details-disclosure-v11"
    ],
    "keywords": [
      "details",
      "expand",
      "collapse",
      "disclosure",
      "basic",
      "animated icon"
    ],
    "page": "./component.html?component=matte-buttons-details-disclosure-v11",
    "preview": "./packages/buttons-details-disclosure-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "buttons-details-disclosure-v11": "./downloads/matte-buttons-details-disclosure-v11.zip"
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
          "toggle() and setExpanded(value) update the local disclosure. state is { expanded }. reset() and destroy() are repeat-safe. User-triggered changes dispatch a bubbling, composed sl:action event."
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
    "id": "matte-buttons-filter-toggle-v11",
    "category": "buttons",
    "name": "Filter toggle",
    "description": "Apply or clear a local filter with a funnel that tightens into an active marker.",
    "motions": [
      "Funnel tighten",
      "Marker pop"
    ],
    "variants": [
      "buttons-filter-toggle-v11"
    ],
    "keywords": [
      "filter",
      "funnel",
      "clear",
      "toggle",
      "basic",
      "animated icon"
    ],
    "page": "./component.html?component=matte-buttons-filter-toggle-v11",
    "preview": "./packages/buttons-filter-toggle-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "buttons-filter-toggle-v11": "./downloads/matte-buttons-filter-toggle-v11.zip"
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
          "toggle() and setActive(value) update local state. state is { active }. reset() and destroy() are repeat-safe. User-triggered changes dispatch a bubbling, composed sl:action event."
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
    "id": "matte-buttons-sort-direction-v11",
    "category": "buttons",
    "name": "Sort direction",
    "description": "Switch between ascending and descending order while the arrow and rows exchange direction.",
    "motions": [
      "Arrow flip",
      "Row reorder"
    ],
    "variants": [
      "buttons-sort-direction-v11"
    ],
    "keywords": [
      "sort",
      "ascending",
      "descending",
      "order",
      "basic",
      "animated icon"
    ],
    "page": "./component.html?component=matte-buttons-sort-direction-v11",
    "preview": "./packages/buttons-sort-direction-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "buttons-sort-direction-v11": "./downloads/matte-buttons-sort-direction-v11.zip"
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
          "toggle() and setDirection('ascending' | 'descending') update local order. state is { direction }. reset() and destroy() are repeat-safe. User-triggered changes dispatch a bubbling, composed sl:action event."
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
    "id": "matte-buttons-pin-toggle-v11",
    "category": "buttons",
    "name": "Pin item",
    "description": "Pin or unpin one local item with a thumbtack that rotates into its resting position.",
    "motions": [
      "Pin settle",
      "Soft press"
    ],
    "variants": [
      "buttons-pin-toggle-v11"
    ],
    "keywords": [
      "pin",
      "unpin",
      "item",
      "keep",
      "basic",
      "animated icon"
    ],
    "page": "./component.html?component=matte-buttons-pin-toggle-v11",
    "preview": "./packages/buttons-pin-toggle-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "buttons-pin-toggle-v11": "./downloads/matte-buttons-pin-toggle-v11.zip"
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
          "toggle() and setPinned(value) update local state. state is { pinned }. reset() and destroy() are repeat-safe. User-triggered changes dispatch a bubbling, composed sl:action event."
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
    "id": "matte-buttons-print-document-v11",
    "category": "buttons",
    "name": "Print document",
    "description": "Run a print callback while a page feeds through the printer and resolves to a check.",
    "motions": [
      "Paper feed",
      "Check draw"
    ],
    "variants": [
      "buttons-print-document-v11"
    ],
    "keywords": [
      "print",
      "document",
      "printer",
      "action",
      "basic",
      "animated icon"
    ],
    "page": "./component.html?component=matte-buttons-print-document-v11",
    "preview": "./packages/buttons-print-document-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "buttons-print-document-v11": "./downloads/matte-buttons-print-document-v11.zip"
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
          "Pass onPrint({ signal }) and resolve only after the real print action succeeds. start() returns Promise<boolean>; cancel(), reset() and destroy() are repeat-safe. state is { phase }. User-triggered changes dispatch a bubbling, composed sl:action event."
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
