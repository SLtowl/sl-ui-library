// Local review batch. Owned by the menus task.
export default [
  {
    "id": "matte-menus-resource-picker-v11",
    "category": "menus",
    "name": "Grouped resource picker",
    "description": "Search projects and documents in labeled groups and inspect the selected resource.",
    "motions": [
      "Reversible panel reveal",
      "Soft selection"
    ],
    "variants": [
      "menus-resource-picker-v11"
    ],
    "keywords": [
      "menu",
      "local",
      "resource",
      "picker"
    ],
    "page": "./component.html?component=matte-menus-resource-picker-v11",
    "preview": "./packages/menus-resource-picker-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "menus-resource-picker-v11": "./downloads/matte-menus-resource-picker-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "Read value (atlas, field, brief or guide) and query from onChange. Selection changes only the local resource summary.",
          "Copy all seven package files. Keep the complete .sl-component markup and mount one instance per root. No remote assets or application operations are included."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "SLComponent.mount(root, { onChange(state) }) and mountPreview(root) return open(last = false), close(restoreFocus = true), reset(), destroy() and a copied state getter with open. Repeated mount returns the existing controller; destroy before changing options. Reset and destroy are repeat-safe and restore the initial local state.",
          "Local commits invoke onChange with a copy and dispatch a bubbling, composed sl-menu-change event whose detail is a separate state copy. Draft browsing and reset do not emit changes. External persistence must be wired by the application."
        ]
      },
      {
        "title": "Appearance and accessibility",
        "paragraphs": [
          "Override --sl-surface, --sl-panel, --sl-text, --sl-muted, --sl-accent, --sl-accent-ink, --sl-border, --sl-hover, --sl-focus, --sl-caption and --sl-shadow on the root. Instrument Sans is bundled locally.",
          "Enter, Space and arrow keys open the panel. Arrows, Home, End and first-letter navigation move among buttons. Form controls retain native editing keys. Escape returns focus; Tab and outside click dismiss without trapping another preview. Closed panels are inert. CSS respects live changes to prefers-reduced-motion. Long panels scroll within the root."
        ]
      }
    ]
  },
  {
    "id": "matte-menus-nested-topic-v11",
    "category": "menus",
    "name": "Nested topic menu",
    "description": "Navigate topic branches with a breadcrumb and Back, then assign a leaf topic.",
    "motions": [
      "Reversible panel reveal",
      "Soft selection"
    ],
    "variants": [
      "menus-nested-topic-v11"
    ],
    "keywords": [
      "menu",
      "local",
      "nested",
      "topic"
    ],
    "page": "./component.html?component=matte-menus-nested-topic-v11",
    "preview": "./packages/menus-nested-topic-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "menus-nested-topic-v11": "./downloads/matte-menus-nested-topic-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "value is the complete leaf path; path is the current browsing path. ArrowRight enters a branch; ArrowLeft and Back move to its parent.",
          "Copy all seven package files. Keep the complete .sl-component markup and mount one instance per root. No remote assets or application operations are included."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "SLComponent.mount(root, { onChange(state) }) and mountPreview(root) return open(last = false), close(restoreFocus = true), reset(), destroy() and a copied state getter with open. Repeated mount returns the existing controller; destroy before changing options. Reset and destroy are repeat-safe and restore the initial local state.",
          "Local commits invoke onChange with a copy and dispatch a bubbling, composed sl-menu-change event whose detail is a separate state copy. Draft browsing and reset do not emit changes. External persistence must be wired by the application."
        ]
      },
      {
        "title": "Appearance and accessibility",
        "paragraphs": [
          "Override --sl-surface, --sl-panel, --sl-text, --sl-muted, --sl-accent, --sl-accent-ink, --sl-border, --sl-hover, --sl-focus, --sl-caption and --sl-shadow on the root. Instrument Sans is bundled locally.",
          "Enter, Space and arrow keys open the panel. Arrows, Home, End and first-letter navigation move among buttons. Form controls retain native editing keys. Escape returns focus; Tab and outside click dismiss without trapping another preview. Closed panels are inert. CSS respects live changes to prefers-reduced-motion. Long panels scroll within the root."
        ]
      }
    ]
  },
  {
    "id": "matte-menus-recent-actions-v11",
    "category": "menus",
    "name": "Recent action menu",
    "description": "Run local canvas actions and repeat them from a deduplicated recent-action list.",
    "motions": [
      "Reversible panel reveal",
      "Soft selection"
    ],
    "variants": [
      "menus-recent-actions-v11"
    ],
    "keywords": [
      "menu",
      "local",
      "recent",
      "actions"
    ],
    "page": "./component.html?component=matte-menus-recent-actions-v11",
    "preview": "./packages/menus-recent-actions-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "menus-recent-actions-v11": "./downloads/matte-menus-recent-actions-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "zoom is clamped to 50–150; pinned is a boolean; recent contains up to three unique action IDs. Clear recents preserves the canvas state.",
          "Copy all seven package files. Keep the complete .sl-component markup and mount one instance per root. No remote assets or application operations are included."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "SLComponent.mount(root, { onChange(state) }) and mountPreview(root) return open(last = false), close(restoreFocus = true), reset(), destroy() and a copied state getter with open. Repeated mount returns the existing controller; destroy before changing options. Reset and destroy are repeat-safe and restore the initial local state.",
          "Local commits invoke onChange with a copy and dispatch a bubbling, composed sl-menu-change event whose detail is a separate state copy. Draft browsing and reset do not emit changes. External persistence must be wired by the application."
        ]
      },
      {
        "title": "Appearance and accessibility",
        "paragraphs": [
          "Override --sl-surface, --sl-panel, --sl-text, --sl-muted, --sl-accent, --sl-accent-ink, --sl-border, --sl-hover, --sl-focus, --sl-caption and --sl-shadow on the root. Instrument Sans is bundled locally.",
          "Enter, Space and arrow keys open the panel. Arrows, Home, End and first-letter navigation move among buttons. Form controls retain native editing keys. Escape returns focus; Tab and outside click dismiss without trapping another preview. Closed panels are inert. CSS respects live changes to prefers-reduced-motion. Long panels scroll within the root."
        ]
      }
    ]
  },
  {
    "id": "matte-menus-tag-workbench-v11",
    "category": "menus",
    "name": "Tag assignment menu",
    "description": "Search, create and toggle tags in a cancellable draft before applying the assignment.",
    "motions": [
      "Reversible panel reveal",
      "Soft selection"
    ],
    "variants": [
      "menus-tag-workbench-v11"
    ],
    "keywords": [
      "menu",
      "local",
      "tag",
      "workbench"
    ],
    "page": "./component.html?component=matte-menus-tag-workbench-v11",
    "preview": "./packages/menus-tag-workbench-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "menus-tag-workbench-v11": "./downloads/matte-menus-tag-workbench-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "tags and selected are committed strings; draftTags and draft are temporary. Cancel, Escape, blur and outside click discard the draft. Creation permits eight tags, 24 Unicode characters each, and ignores case-insensitive duplicates.",
          "Copy all seven package files. Keep the complete .sl-component markup and mount one instance per root. No remote assets or application operations are included."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "SLComponent.mount(root, { onChange(state) }) and mountPreview(root) return open(last = false), close(restoreFocus = true), reset(), destroy() and a copied state getter with open. Repeated mount returns the existing controller; destroy before changing options. Reset and destroy are repeat-safe and restore the initial local state.",
          "Local commits invoke onChange with a copy and dispatch a bubbling, composed sl-menu-change event whose detail is a separate state copy. Draft browsing and reset do not emit changes. External persistence must be wired by the application."
        ]
      },
      {
        "title": "Appearance and accessibility",
        "paragraphs": [
          "Override --sl-surface, --sl-panel, --sl-text, --sl-muted, --sl-accent, --sl-accent-ink, --sl-border, --sl-hover, --sl-focus, --sl-caption and --sl-shadow on the root. Instrument Sans is bundled locally.",
          "Enter, Space and arrow keys open the panel. Arrows, Home, End and first-letter navigation move among buttons. Form controls retain native editing keys. Escape returns focus; Tab and outside click dismiss without trapping another preview. Closed panels are inert. CSS respects live changes to prefers-reduced-motion. Long panels scroll within the root."
        ]
      }
    ]
  },
  {
    "id": "matte-menus-branch-picker-v11",
    "category": "menus",
    "name": "Branch and tag menu",
    "description": "Filter branches and release tags, select a revision and inspect its comparison with main.",
    "motions": [
      "Reversible panel reveal",
      "Soft selection"
    ],
    "variants": [
      "menus-branch-picker-v11"
    ],
    "keywords": [
      "menu",
      "local",
      "branch",
      "picker"
    ],
    "page": "./component.html?component=matte-menus-branch-picker-v11",
    "preview": "./packages/menus-branch-picker-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "menus-branch-picker-v11": "./downloads/matte-menus-branch-picker-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "value is a branch or tag ID. tab and query control browsing, while compare displays fixed sample ahead/behind counts. No checkout or repository operation is performed.",
          "Copy all seven package files. Keep the complete .sl-component markup and mount one instance per root. No remote assets or application operations are included."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "SLComponent.mount(root, { onChange(state) }) and mountPreview(root) return open(last = false), close(restoreFocus = true), reset(), destroy() and a copied state getter with open. Repeated mount returns the existing controller; destroy before changing options. Reset and destroy are repeat-safe and restore the initial local state.",
          "Local commits invoke onChange with a copy and dispatch a bubbling, composed sl-menu-change event whose detail is a separate state copy. Draft browsing and reset do not emit changes. External persistence must be wired by the application."
        ]
      },
      {
        "title": "Appearance and accessibility",
        "paragraphs": [
          "Override --sl-surface, --sl-panel, --sl-text, --sl-muted, --sl-accent, --sl-accent-ink, --sl-border, --sl-hover, --sl-focus, --sl-caption and --sl-shadow on the root. Instrument Sans is bundled locally.",
          "Enter, Space and arrow keys open the panel. Arrows, Home, End and first-letter navigation move among buttons. Form controls retain native editing keys. Escape returns focus; Tab and outside click dismiss without trapping another preview. Closed panels are inert. CSS respects live changes to prefers-reduced-motion. Long panels scroll within the root."
        ]
      }
    ]
  },
  {
    "id": "matte-menus-weekly-window-v11",
    "category": "menus",
    "name": "Weekly delivery menu",
    "description": "Combine weekday presets, individual days and a 24-hour time in a cancellable weekly preference.",
    "motions": [
      "Reversible panel reveal",
      "Soft selection"
    ],
    "variants": [
      "menus-weekly-window-v11"
    ],
    "keywords": [
      "menu",
      "local",
      "weekly",
      "window"
    ],
    "page": "./component.html?component=matte-menus-weekly-window-v11",
    "preview": "./packages/menus-weekly-window-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "menus-weekly-window-v11": "./downloads/matte-menus-weekly-window-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "days contains Monday-based indices 0–6 and time is HH:MM in local 24-hour time. Apply requires at least one day and a valid time. Dismissal discards draftDays and draftTime; scheduling remains the host application’s responsibility.",
          "Copy all seven package files. Keep the complete .sl-component markup and mount one instance per root. No remote assets or application operations are included."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "SLComponent.mount(root, { onChange(state) }) and mountPreview(root) return open(last = false), close(restoreFocus = true), reset(), destroy() and a copied state getter with open. Repeated mount returns the existing controller; destroy before changing options. Reset and destroy are repeat-safe and restore the initial local state.",
          "Local commits invoke onChange with a copy and dispatch a bubbling, composed sl-menu-change event whose detail is a separate state copy. Draft browsing and reset do not emit changes. External persistence must be wired by the application."
        ]
      },
      {
        "title": "Appearance and accessibility",
        "paragraphs": [
          "Override --sl-surface, --sl-panel, --sl-text, --sl-muted, --sl-accent, --sl-accent-ink, --sl-border, --sl-hover, --sl-focus, --sl-caption and --sl-shadow on the root. Instrument Sans is bundled locally.",
          "Enter, Space and arrow keys open the panel. Arrows, Home, End and first-letter navigation move among buttons. Form controls retain native editing keys. Escape returns focus; Tab and outside click dismiss without trapping another preview. Closed panels are inert. CSS respects live changes to prefers-reduced-motion. Long panels scroll within the root."
        ]
      }
    ]
  },
  {
    "id": "matte-menus-sort-recipe-v11",
    "category": "menus",
    "name": "Sort recipe menu",
    "description": "Sort sample tasks by date or name, with an optional High-to-Low priority-first mode.",
    "motions": [
      "Reversible panel reveal",
      "Soft selection"
    ],
    "variants": [
      "menus-sort-recipe-v11"
    ],
    "keywords": [
      "menu",
      "local",
      "sort",
      "recipe"
    ],
    "page": "./component.html?component=matte-menus-sort-recipe-v11",
    "preview": "./packages/menus-sort-recipe-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "menus-sort-recipe-v11": "./downloads/matte-menus-sort-recipe-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "field is due or name and direction is 1 or -1. When priority is true, tasks are grouped High, Medium, Low first; field and direction sort within equal-priority groups. Switching it off restores ordinary field sorting.",
          "Copy all seven package files. Keep the complete .sl-component markup and mount one instance per root. No remote assets or application operations are included."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "SLComponent.mount(root, { onChange(state) }) and mountPreview(root) return open(last = false), close(restoreFocus = true), reset(), destroy() and a copied state getter with open. Repeated mount returns the existing controller; destroy before changing options. Reset and destroy are repeat-safe and restore the initial local state.",
          "Local commits invoke onChange with a copy and dispatch a bubbling, composed sl-menu-change event whose detail is a separate state copy. Draft browsing and reset do not emit changes. External persistence must be wired by the application."
        ]
      },
      {
        "title": "Appearance and accessibility",
        "paragraphs": [
          "Override --sl-surface, --sl-panel, --sl-text, --sl-muted, --sl-accent, --sl-accent-ink, --sl-border, --sl-hover, --sl-focus, --sl-caption and --sl-shadow on the root. Instrument Sans is bundled locally.",
          "Enter, Space and arrow keys open the panel. Arrows, Home, End and first-letter navigation move among buttons. Form controls retain native editing keys. Escape returns focus; Tab and outside click dismiss without trapping another preview. Closed panels are inert. CSS respects live changes to prefers-reduced-motion. Long panels scroll within the root."
        ]
      }
    ]
  },
  {
    "id": "matte-menus-column-visibility-v11",
    "category": "menus",
    "name": "Column visibility menu",
    "description": "Toggle optional table columns or apply compact and complete presets while retaining the required task name.",
    "motions": [
      "Reversible panel reveal",
      "Soft selection"
    ],
    "variants": [
      "menus-column-visibility-v11"
    ],
    "keywords": [
      "menu",
      "local",
      "column",
      "visibility"
    ],
    "page": "./component.html?component=matte-menus-column-visibility-v11",
    "preview": "./packages/menus-column-visibility-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "menus-column-visibility-v11": "./downloads/matte-menus-column-visibility-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "columns contains ordered IDs name, status, owner and due. name is required and cannot be removed. Compact restores name and status; Show all reveals all four columns.",
          "Copy all seven package files. Keep the complete .sl-component markup and mount one instance per root. No remote assets or application operations are included."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "SLComponent.mount(root, { onChange(state) }) and mountPreview(root) return open(last = false), close(restoreFocus = true), reset(), destroy() and a copied state getter with open. Repeated mount returns the existing controller; destroy before changing options. Reset and destroy are repeat-safe and restore the initial local state.",
          "Local commits invoke onChange with a copy and dispatch a bubbling, composed sl-menu-change event whose detail is a separate state copy. Draft browsing and reset do not emit changes. External persistence must be wired by the application."
        ]
      },
      {
        "title": "Appearance and accessibility",
        "paragraphs": [
          "Override --sl-surface, --sl-panel, --sl-text, --sl-muted, --sl-accent, --sl-accent-ink, --sl-border, --sl-hover, --sl-focus, --sl-caption and --sl-shadow on the root. Instrument Sans is bundled locally.",
          "Enter, Space and arrow keys open the panel. Arrows, Home, End and first-letter navigation move among buttons. Form controls retain native editing keys. Escape returns focus; Tab and outside click dismiss without trapping another preview. Closed panels are inert. CSS respects live changes to prefers-reduced-motion. Long panels scroll within the root."
        ]
      }
    ]
  },
  {
    "id": "matte-menus-checkpoint-menu-v11",
    "category": "menus",
    "name": "Document checkpoint menu",
    "description": "Inspect document checkpoints, restore a chosen version to the sample and undo the restore.",
    "motions": [
      "Reversible panel reveal",
      "Soft selection"
    ],
    "variants": [
      "menus-checkpoint-menu-v11"
    ],
    "keywords": [
      "menu",
      "local",
      "checkpoint",
      "menu"
    ],
    "page": "./component.html?component=matte-menus-checkpoint-menu-v11",
    "preview": "./packages/menus-checkpoint-menu-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "menus-checkpoint-menu-v11": "./downloads/matte-menus-checkpoint-menu-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "current and draft identify v1, v2 or v3; previous supports one undo. Choosing a checkpoint only previews it. Use version changes the sample text and Undo restore reverses that change.",
          "Copy all seven package files. Keep the complete .sl-component markup and mount one instance per root. No remote assets or application operations are included."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "SLComponent.mount(root, { onChange(state) }) and mountPreview(root) return open(last = false), close(restoreFocus = true), reset(), destroy() and a copied state getter with open. Repeated mount returns the existing controller; destroy before changing options. Reset and destroy are repeat-safe and restore the initial local state.",
          "Local commits invoke onChange with a copy and dispatch a bubbling, composed sl-menu-change event whose detail is a separate state copy. Draft browsing and reset do not emit changes. External persistence must be wired by the application."
        ]
      },
      {
        "title": "Appearance and accessibility",
        "paragraphs": [
          "Override --sl-surface, --sl-panel, --sl-text, --sl-muted, --sl-accent, --sl-accent-ink, --sl-border, --sl-hover, --sl-focus, --sl-caption and --sl-shadow on the root. Instrument Sans is bundled locally.",
          "Enter, Space and arrow keys open the panel. Arrows, Home, End and first-letter navigation move among buttons. Form controls retain native editing keys. Escape returns focus; Tab and outside click dismiss without trapping another preview. Closed panels are inert. CSS respects live changes to prefers-reduced-motion. Long panels scroll within the root."
        ]
      }
    ]
  },
  {
    "id": "matte-menus-variable-insert-v11",
    "category": "menus",
    "name": "Inline variable menu",
    "description": "Filter template variables and insert a literal token at the editor selection, with one-step undo.",
    "motions": [
      "Reversible panel reveal",
      "Soft selection"
    ],
    "variants": [
      "menus-variable-insert-v11"
    ],
    "keywords": [
      "menu",
      "local",
      "variable",
      "insert"
    ],
    "page": "./component.html?component=matte-menus-variable-insert-v11",
    "preview": "./packages/menus-variable-insert-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "menus-variable-insert-v11": "./downloads/matte-menus-variable-insert-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "text holds literal editor content; start and end are UTF-16 selection offsets used by textarea. A token replaces that selection. previous supports one undo and manual edits clear undo. Account ID is intentionally unavailable.",
          "Copy all seven package files. Keep the complete .sl-component markup and mount one instance per root. No remote assets or application operations are included."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "SLComponent.mount(root, { onChange(state) }) and mountPreview(root) return open(last = false), close(restoreFocus = true), reset(), destroy() and a copied state getter with open. Repeated mount returns the existing controller; destroy before changing options. Reset and destroy are repeat-safe and restore the initial local state.",
          "Local commits invoke onChange with a copy and dispatch a bubbling, composed sl-menu-change event whose detail is a separate state copy. Draft browsing and reset do not emit changes. External persistence must be wired by the application."
        ]
      },
      {
        "title": "Appearance and accessibility",
        "paragraphs": [
          "Override --sl-surface, --sl-panel, --sl-text, --sl-muted, --sl-accent, --sl-accent-ink, --sl-border, --sl-hover, --sl-focus, --sl-caption and --sl-shadow on the root. Instrument Sans is bundled locally.",
          "Enter, Space and arrow keys open the panel. Arrows, Home, End and first-letter navigation move among buttons. Form controls retain native editing keys. Escape returns focus; Tab and outside click dismiss without trapping another preview. Closed panels are inert. CSS respects live changes to prefers-reduced-motion. Long panels scroll within the root."
        ]
      }
    ]
  }
];
