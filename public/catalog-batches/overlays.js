// Local review batch. Owned by the overlays task.
export default [
  {
    "id": "matte-overlays-workspace-settings-v11",
    "category": "overlays",
    "name": "Workspace settings",
    "description": "Stage workspace density and guidance preferences, then apply or discard the local draft.",
    "motions": [
      "Soft local reveal",
      "Reversible fade"
    ],
    "variants": [
      "overlays-workspace-settings-v11"
    ],
    "keywords": [
      "settings",
      "preferences",
      "density",
      "draft"
    ],
    "page": "./component.html?component=matte-overlays-workspace-settings-v11",
    "preview": "./packages/overlays-workspace-settings-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "overlays-workspace-settings-v11": "./downloads/matte-overlays-workspace-settings-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "Serve the complete package folder locally. Mount its .sl-component root with SLComponent.mount(root, { onChange(detail) {} }). Stage workspace density and guidance preferences, then apply or discard the local draft. This is an offline local workflow; persistence belongs to the host application."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "The controller provides open(), close({restoreFocus:true}), reset(), destroy() and a fresh state snapshot. Repeated mounting of one root returns the same controller. State includes open plus density, hints, labels and draft. Apply commits the three local preferences; Cancel, Escape and backdrop discard the draft.",
          "Local changes emit bubbling, composed overlaychange events and call onChange with {kind, action, value}. Search and uncommitted drafts do not emit committed changes. mountPreview(root) delegates to mount(root)."
        ]
      },
      {
        "title": "Appearance and keyboard",
        "paragraphs": [
          "The default palette is neutral gray. Theme with --ov-surface, --ov-field, --ov-text, --ov-muted, --ov-accent, --ov-on-accent, --ov-border, --ov-focus, --ov-ink and --ov-backdrop. Instrument Sans and original inline SVG are bundled. The local panel fits a 226–320 px root and a 510 px preview. Body content scrolls internally when necessary; close and footer controls remain available. Clicking text or padding inside the panel keeps it open. Escape closes and returns focus; Tab cycles only in the active panel, focus leaving the component closes it. CSS respects reduced-motion changes immediately."
        ]
      }
    ]
  },
  {
    "id": "matte-overlays-date-picker-v11",
    "category": "overlays",
    "name": "Calendar date picker",
    "description": "Browse months and choose a calendar date with arrow keys, month shortcuts and a reversible draft.",
    "motions": [
      "Soft local reveal",
      "Reversible fade"
    ],
    "variants": [
      "overlays-date-picker-v11"
    ],
    "keywords": [
      "calendar",
      "date",
      "month",
      "schedule"
    ],
    "page": "./component.html?component=matte-overlays-date-picker-v11",
    "preview": "./packages/overlays-date-picker-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "overlays-date-picker-v11": "./downloads/matte-overlays-date-picker-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "Serve the complete package folder locally. Mount its .sl-component root with SLComponent.mount(root, { onChange(detail) {} }). Browse months and choose a calendar date with arrow keys, month shortcuts and a reversible draft. This is an offline local workflow; persistence belongs to the host application."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "The controller provides open(), close({restoreFocus:true}), reset(), destroy() and a fresh state snapshot. Repeated mounting of one root returns the same controller. State includes open plus date (ISO YYYY-MM-DD), draft, month and cursor. The calendar is bounded to 1900–2099. Home/End moves to week edges; Page Up/Down moves months. Use date commits locally.",
          "Local changes emit bubbling, composed overlaychange events and call onChange with {kind, action, value}. Search and uncommitted drafts do not emit committed changes. mountPreview(root) delegates to mount(root)."
        ]
      },
      {
        "title": "Appearance and keyboard",
        "paragraphs": [
          "The default palette is neutral gray. Theme with --ov-surface, --ov-field, --ov-text, --ov-muted, --ov-accent, --ov-on-accent, --ov-border, --ov-focus, --ov-ink and --ov-backdrop. Instrument Sans and original inline SVG are bundled. The local panel fits a 226–320 px root and a 510 px preview. Body content scrolls internally when necessary; close and footer controls remain available. Clicking text or padding inside the panel keeps it open. Escape closes and returns focus; Tab cycles only in the active panel, focus leaving the component closes it. CSS respects reduced-motion changes immediately."
        ]
      }
    ]
  },
  {
    "id": "matte-overlays-notification-inbox-v11",
    "category": "overlays",
    "name": "Notification inbox",
    "description": "Filter a local notification inbox, mark items read, and reverse individual read state.",
    "motions": [
      "Soft local reveal",
      "Reversible fade"
    ],
    "variants": [
      "overlays-notification-inbox-v11"
    ],
    "keywords": [
      "notifications",
      "inbox",
      "unread",
      "activity"
    ],
    "page": "./component.html?component=matte-overlays-notification-inbox-v11",
    "preview": "./packages/overlays-notification-inbox-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "overlays-notification-inbox-v11": "./downloads/matte-overlays-notification-inbox-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "Serve the complete package folder locally. Mount its .sl-component root with SLComponent.mount(root, { onChange(detail) {} }). Filter a local notification inbox, mark items read, and reverse individual read state. This is an offline local workflow; persistence belongs to the host application."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "The controller provides open(), close({restoreFocus:true}), reset(), destroy() and a fresh state snapshot. Repeated mounting of one root returns the same controller. State includes open plus read (three booleans), filter and unread count. Mark all read and per-item actions affect only the local inbox. Switching to Unread retains keyboard focus when an item disappears.",
          "Local changes emit bubbling, composed overlaychange events and call onChange with {kind, action, value}. Search and uncommitted drafts do not emit committed changes. mountPreview(root) delegates to mount(root)."
        ]
      },
      {
        "title": "Appearance and keyboard",
        "paragraphs": [
          "The default palette is neutral gray. Theme with --ov-surface, --ov-field, --ov-text, --ov-muted, --ov-accent, --ov-on-accent, --ov-border, --ov-focus, --ov-ink and --ov-backdrop. Instrument Sans and original inline SVG are bundled. The local panel fits a 226–320 px root and a 510 px preview. Body content scrolls internally when necessary; close and footer controls remain available. Clicking text or padding inside the panel keeps it open. Escape closes and returns focus; Tab cycles only in the active panel, focus leaving the component closes it. CSS respects reduced-motion changes immediately."
        ]
      }
    ]
  },
  {
    "id": "matte-overlays-plan-compare-v11",
    "category": "overlays",
    "name": "Plan comparison",
    "description": "Compare two example plans, switch billing periods and hide equal features before selecting locally.",
    "motions": [
      "Soft local reveal",
      "Reversible fade"
    ],
    "variants": [
      "overlays-plan-compare-v11"
    ],
    "keywords": [
      "compare",
      "plans",
      "billing",
      "differences"
    ],
    "page": "./component.html?component=matte-overlays-plan-compare-v11",
    "preview": "./packages/overlays-plan-compare-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "overlays-plan-compare-v11": "./downloads/matte-overlays-plan-compare-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "Serve the complete package folder locally. Mount its .sl-component root with SLComponent.mount(root, { onChange(detail) {} }). Compare two example plans, switch billing periods and hide equal features before selecting locally. This is an offline local workflow; persistence belongs to the host application."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "The controller provides open(), close({restoreFocus:true}), reset(), destroy() and a fresh state snapshot. Repeated mounting of one root returns the same controller. State includes open plus billing, differences and selected. Selection emits {plan, billing}; prices are illustrative, annual values are full-year totals, and this component performs no checkout.",
          "Local changes emit bubbling, composed overlaychange events and call onChange with {kind, action, value}. Search and uncommitted drafts do not emit committed changes. mountPreview(root) delegates to mount(root)."
        ]
      },
      {
        "title": "Appearance and keyboard",
        "paragraphs": [
          "The default palette is neutral gray. Theme with --ov-surface, --ov-field, --ov-text, --ov-muted, --ov-accent, --ov-on-accent, --ov-border, --ov-focus, --ov-ink and --ov-backdrop. Instrument Sans and original inline SVG are bundled. The local panel fits a 226–320 px root and a 510 px preview. Body content scrolls internally when necessary; close and footer controls remain available. Clicking text or padding inside the panel keeps it open. Escape closes and returns focus; Tab cycles only in the active panel, focus leaving the component closes it. CSS respects reduced-motion changes immediately."
        ]
      }
    ]
  },
  {
    "id": "matte-overlays-style-inspector-v11",
    "category": "overlays",
    "name": "Compact style inspector",
    "description": "Inspect and adjust a sample element’s corner radius and opacity, with a live text-safe label and CSS readout.",
    "motions": [
      "Soft local reveal",
      "Reversible fade"
    ],
    "variants": [
      "overlays-style-inspector-v11"
    ],
    "keywords": [
      "inspector",
      "style",
      "radius",
      "opacity"
    ],
    "page": "./component.html?component=matte-overlays-style-inspector-v11",
    "preview": "./packages/overlays-style-inspector-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "overlays-style-inspector-v11": "./downloads/matte-overlays-style-inspector-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "Serve the complete package folder locally. Mount its .sl-component root with SLComponent.mount(root, { onChange(detail) {} }). Inspect and adjust a sample element’s corner radius and opacity, with a live text-safe label and CSS readout. This is an offline local workflow; persistence belongs to the host application."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "The controller provides open(), close({restoreFocus:true}), reset(), destroy() and a fresh state snapshot. Repeated mounting of one root returns the same controller. State includes open plus label, radius (0–24 px) and opacity (25–100%). Changes immediately update the local sample and emit the values. Reset style restores the sample without closing.",
          "Local changes emit bubbling, composed overlaychange events and call onChange with {kind, action, value}. Search and uncommitted drafts do not emit committed changes. mountPreview(root) delegates to mount(root)."
        ]
      },
      {
        "title": "Appearance and keyboard",
        "paragraphs": [
          "The default palette is neutral gray. Theme with --ov-surface, --ov-field, --ov-text, --ov-muted, --ov-accent, --ov-on-accent, --ov-border, --ov-focus, --ov-ink and --ov-backdrop. Instrument Sans and original inline SVG are bundled. The local panel fits a 226–320 px root and a 510 px preview. Body content scrolls internally when necessary; close and footer controls remain available. Clicking text or padding inside the panel keeps it open. Escape closes and returns focus; Tab cycles only in the active panel, focus leaving the component closes it. CSS respects reduced-motion changes immediately."
        ]
      }
    ]
  },
  {
    "id": "matte-overlays-shortcut-guide-v11",
    "category": "overlays",
    "name": "Keyboard shortcut guide",
    "description": "Search a keyboard reference and switch between Windows and Mac key notation without executing commands.",
    "motions": [
      "Soft local reveal",
      "Reversible fade"
    ],
    "variants": [
      "overlays-shortcut-guide-v11"
    ],
    "keywords": [
      "keyboard",
      "shortcuts",
      "help",
      "reference"
    ],
    "page": "./component.html?component=matte-overlays-shortcut-guide-v11",
    "preview": "./packages/overlays-shortcut-guide-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "overlays-shortcut-guide-v11": "./downloads/matte-overlays-shortcut-guide-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "Serve the complete package folder locally. Mount its .sl-component root with SLComponent.mount(root, { onChange(detail) {} }). Search a keyboard reference and switch between Windows and Mac key notation without executing commands. This is an offline local workflow; persistence belongs to the host application."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "The controller provides open(), close({restoreFocus:true}), reset(), destroy() and a fresh state snapshot. Repeated mounting of one root returns the same controller. State includes open plus platform, query and visible result count. Platform controls change reference notation only; no listed shortcut is installed or executed.",
          "Local changes emit bubbling, composed overlaychange events and call onChange with {kind, action, value}. Search and uncommitted drafts do not emit committed changes. mountPreview(root) delegates to mount(root)."
        ]
      },
      {
        "title": "Appearance and keyboard",
        "paragraphs": [
          "The default palette is neutral gray. Theme with --ov-surface, --ov-field, --ov-text, --ov-muted, --ov-accent, --ov-on-accent, --ov-border, --ov-focus, --ov-ink and --ov-backdrop. Instrument Sans and original inline SVG are bundled. The local panel fits a 226–320 px root and a 510 px preview. Body content scrolls internally when necessary; close and footer controls remain available. Clicking text or padding inside the panel keeps it open. Escape closes and returns focus; Tab cycles only in the active panel, focus leaving the component closes it. CSS respects reduced-motion changes immediately."
        ]
      }
    ]
  },
  {
    "id": "matte-overlays-filter-builder-v11",
    "category": "overlays",
    "name": "Project filter overlay",
    "description": "Build project filters with a live matching count, then apply or discard the local result set.",
    "motions": [
      "Soft local reveal",
      "Reversible fade"
    ],
    "variants": [
      "overlays-filter-builder-v11"
    ],
    "keywords": [
      "filter",
      "projects",
      "facets",
      "results"
    ],
    "page": "./component.html?component=matte-overlays-filter-builder-v11",
    "preview": "./packages/overlays-filter-builder-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "overlays-filter-builder-v11": "./downloads/matte-overlays-filter-builder-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "Serve the complete package folder locally. Mount its .sl-component root with SLComponent.mount(root, { onChange(detail) {} }). Build project filters with a live matching count, then apply or discard the local result set. This is an offline local workflow; persistence belongs to the host application."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "The controller provides open(), close({restoreFocus:true}), reset(), destroy() and a fresh state snapshot. Repeated mounting of one root returns the same controller. State includes open plus filters, draft and matching title strings. Search, status and ownership combine with AND. Show commits locally and emits {filters, results}; Escape and backdrop discard the draft.",
          "Local changes emit bubbling, composed overlaychange events and call onChange with {kind, action, value}. Search and uncommitted drafts do not emit committed changes. mountPreview(root) delegates to mount(root)."
        ]
      },
      {
        "title": "Appearance and keyboard",
        "paragraphs": [
          "The default palette is neutral gray. Theme with --ov-surface, --ov-field, --ov-text, --ov-muted, --ov-accent, --ov-on-accent, --ov-border, --ov-focus, --ov-ink and --ov-backdrop. Instrument Sans and original inline SVG are bundled. The local panel fits a 226–320 px root and a 510 px preview. Body content scrolls internally when necessary; close and footer controls remain available. Clicking text or padding inside the panel keeps it open. Escape closes and returns focus; Tab cycles only in the active panel, focus leaving the component closes it. CSS respects reduced-motion changes immediately."
        ]
      }
    ]
  },
  {
    "id": "matte-overlays-color-mixer-v11",
    "category": "overlays",
    "name": "RGB color mixer",
    "description": "Mix an RGB color with bounded channels and a validated hexadecimal input before applying the local choice.",
    "motions": [
      "Soft local reveal",
      "Reversible fade"
    ],
    "variants": [
      "overlays-color-mixer-v11"
    ],
    "keywords": [
      "color",
      "rgb",
      "hex",
      "mixer"
    ],
    "page": "./component.html?component=matte-overlays-color-mixer-v11",
    "preview": "./packages/overlays-color-mixer-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "overlays-color-mixer-v11": "./downloads/matte-overlays-color-mixer-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "Serve the complete package folder locally. Mount its .sl-component root with SLComponent.mount(root, { onChange(detail) {} }). Mix an RGB color with bounded channels and a validated hexadecimal input before applying the local choice. This is an offline local workflow; persistence belongs to the host application."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "The controller provides open(), close({restoreFocus:true}), reset(), destroy() and a fresh state snapshot. Repeated mounting of one root returns the same controller. State includes open plus hex (committed), draft, valid and draft rgb channels. Invalid hex input disables Use color. Channels stay in 0–255; Cancel discards the draft. Only the swatch changes color.",
          "Local changes emit bubbling, composed overlaychange events and call onChange with {kind, action, value}. Search and uncommitted drafts do not emit committed changes. mountPreview(root) delegates to mount(root)."
        ]
      },
      {
        "title": "Appearance and keyboard",
        "paragraphs": [
          "The default palette is neutral gray. Theme with --ov-surface, --ov-field, --ov-text, --ov-muted, --ov-accent, --ov-on-accent, --ov-border, --ov-focus, --ov-ink and --ov-backdrop. Instrument Sans and original inline SVG are bundled. The local panel fits a 226–320 px root and a 510 px preview. Body content scrolls internally when necessary; close and footer controls remain available. Clicking text or padding inside the panel keeps it open. Escape closes and returns focus; Tab cycles only in the active panel, focus leaving the component closes it. CSS respects reduced-motion changes immediately."
        ]
      }
    ]
  },
  {
    "id": "matte-overlays-focus-timer-v11",
    "category": "overlays",
    "name": "Focus timer overlay",
    "description": "Run, pause and restart a real local countdown; closing keeps time and reset or destroy clears the timer.",
    "motions": [
      "Soft local reveal",
      "Reversible fade"
    ],
    "variants": [
      "overlays-focus-timer-v11"
    ],
    "keywords": [
      "timer",
      "focus",
      "countdown",
      "pause"
    ],
    "page": "./component.html?component=matte-overlays-focus-timer-v11",
    "preview": "./packages/overlays-focus-timer-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "overlays-focus-timer-v11": "./downloads/matte-overlays-focus-timer-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "Serve the complete package folder locally. Mount its .sl-component root with SLComponent.mount(root, { onChange(detail) {} }). Run, pause and restart a real local countdown; closing keeps time and reset or destroy clears the timer. This is an offline local workflow; persistence belongs to the host application."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "The controller provides open(), close({restoreFocus:true}), reset(), destroy() and a fresh state snapshot. Repeated mounting of one root returns the same controller. State includes open plus minutes, remaining seconds and running. Start/Pause/Resume uses a deadline-based local timer; Restart returns to the chosen length. Closing keeps time. reset() and destroy() clear the interval. Completion emits once.",
          "Local changes emit bubbling, composed overlaychange events and call onChange with {kind, action, value}. Search and uncommitted drafts do not emit committed changes. mountPreview(root) delegates to mount(root)."
        ]
      },
      {
        "title": "Appearance and keyboard",
        "paragraphs": [
          "The default palette is neutral gray. Theme with --ov-surface, --ov-field, --ov-text, --ov-muted, --ov-accent, --ov-on-accent, --ov-border, --ov-focus, --ov-ink and --ov-backdrop. Instrument Sans and original inline SVG are bundled. The local panel fits a 226–320 px root and a 510 px preview. Body content scrolls internally when necessary; close and footer controls remain available. Clicking text or padding inside the panel keeps it open. Escape closes and returns focus; Tab cycles only in the active panel, focus leaving the component closes it. CSS respects reduced-motion changes immediately."
        ]
      }
    ]
  },
  {
    "id": "matte-overlays-version-history-v11",
    "category": "overlays",
    "name": "Version history overlay",
    "description": "Inspect three text revisions and load a chosen version into a local draft, with a one-step undo.",
    "motions": [
      "Soft local reveal",
      "Reversible fade"
    ],
    "variants": [
      "overlays-version-history-v11"
    ],
    "keywords": [
      "history",
      "versions",
      "revision",
      "undo"
    ],
    "page": "./component.html?component=matte-overlays-version-history-v11",
    "preview": "./packages/overlays-version-history-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "overlays-version-history-v11": "./downloads/matte-overlays-version-history-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "Serve the complete package folder locally. Mount its .sl-component root with SLComponent.mount(root, { onChange(detail) {} }). Inspect three text revisions and load a chosen version into a local draft, with a one-step undo. This is an offline local workflow; persistence belongs to the host application."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "The controller provides open(), close({restoreFocus:true}), reset(), destroy() and a fresh state snapshot. Repeated mounting of one root returns the same controller. State includes open plus current, selected, previous and current draft text. Use version updates only the local draft; Undo restores the immediately previous version once. No server restore is implied.",
          "Local changes emit bubbling, composed overlaychange events and call onChange with {kind, action, value}. Search and uncommitted drafts do not emit committed changes. mountPreview(root) delegates to mount(root)."
        ]
      },
      {
        "title": "Appearance and keyboard",
        "paragraphs": [
          "The default palette is neutral gray. Theme with --ov-surface, --ov-field, --ov-text, --ov-muted, --ov-accent, --ov-on-accent, --ov-border, --ov-focus, --ov-ink and --ov-backdrop. Instrument Sans and original inline SVG are bundled. The local panel fits a 226–320 px root and a 510 px preview. Body content scrolls internally when necessary; close and footer controls remain available. Clicking text or padding inside the panel keeps it open. Escape closes and returns focus; Tab cycles only in the active panel, focus leaving the component closes it. CSS respects reduced-motion changes immediately."
        ]
      }
    ]
  }
];
