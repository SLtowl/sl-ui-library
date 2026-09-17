// Sixth local Buttons batch for owner review. Not imported into the released catalog.
export default [
  {
    "id": "matte-buttons-close-item-v11",
    "category": "buttons",
    "name": "Close item",
    "description": "Close or reopen one local item as a clean cross gives way to a return arrow.",
    "motions": [
      "Cross retract",
      "Return draw"
    ],
    "variants": [
      "buttons-close-item-v11"
    ],
    "keywords": [
      "close",
      "reopen",
      "dismiss",
      "item",
      "basic",
      "animated icon",
      "everyday action"
    ],
    "page": "./component.html?component=matte-buttons-close-item-v11",
    "preview": "./packages/buttons-close-item-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "buttons-close-item-v11": "./downloads/matte-buttons-close-item-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "Serve the extracted package over HTTP. The bundled demonstration changes local preview state only. Replace mountPreview with mount when connecting application state."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "toggle() reverses the local state and setCloseState(value) silently accepts 'open' | 'closed'. state reports { closeState, index }. reset() and destroy() are repeat-safe. User changes call onChange and dispatch one bubbling, composed sl:action event."
        ]
      },
      {
        "title": "Appearance and accessibility",
        "paragraphs": [
          "Override the --action-* variables on .sl-component to adapt the neutral palette. Keep the native button, visible focus and live status. Icon motion respects prefers-reduced-motion; forced colors remain legible."
        ]
      }
    ]
  },
  {
    "id": "matte-buttons-open-external-v11",
    "category": "buttons",
    "name": "Open externally",
    "description": "Move a local preview out of its frame and return it with one continuous diagonal gesture.",
    "motions": [
      "Diagonal launch",
      "Frame settle"
    ],
    "variants": [
      "buttons-open-external-v11"
    ],
    "keywords": [
      "external",
      "open",
      "window",
      "launch",
      "basic",
      "animated icon",
      "everyday action"
    ],
    "page": "./component.html?component=matte-buttons-open-external-v11",
    "preview": "./packages/buttons-open-external-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "buttons-open-external-v11": "./downloads/matte-buttons-open-external-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "Serve the extracted package over HTTP. The bundled demonstration changes local preview state only. Replace mountPreview with mount when connecting application state."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "toggle() reverses the local state and setOpenState(value) silently accepts 'inline' | 'external'. state reports { openState, index }. reset() and destroy() are repeat-safe. User changes call onChange and dispatch one bubbling, composed sl:action event."
        ]
      },
      {
        "title": "Appearance and accessibility",
        "paragraphs": [
          "Override the --action-* variables on .sl-component to adapt the neutral palette. Keep the native button, visible focus and live status. Icon motion respects prefers-reduced-motion; forced colors remain legible."
        ]
      }
    ]
  },
  {
    "id": "matte-buttons-read-toggle-v11",
    "category": "buttons",
    "name": "Read status",
    "description": "Mark one local message read or unread as the envelope settles and a centered check draws inside it.",
    "motions": [
      "Envelope settle",
      "Inner check draw"
    ],
    "variants": [
      "buttons-read-toggle-v11"
    ],
    "keywords": [
      "read",
      "unread",
      "message",
      "mail",
      "basic",
      "animated icon",
      "everyday action"
    ],
    "page": "./component.html?component=matte-buttons-read-toggle-v11",
    "preview": "./packages/buttons-read-toggle-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "buttons-read-toggle-v11": "./downloads/matte-buttons-read-toggle-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "Serve the extracted package over HTTP. The bundled demonstration changes local preview state only. Replace mountPreview with mount when connecting application state."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "toggle() reverses the local state and setReadState(value) silently accepts 'unread' | 'read'. state reports { readState, index }. reset() and destroy() are repeat-safe. User changes call onChange and dispatch one bubbling, composed sl:action event."
        ]
      },
      {
        "title": "Appearance and accessibility",
        "paragraphs": [
          "Override the --action-* variables on .sl-component to adapt the neutral palette. Keep the native button, visible focus and live status. Icon motion respects prefers-reduced-motion; forced colors remain legible."
        ]
      }
    ]
  },
  {
    "id": "matte-buttons-flag-toggle-v11",
    "category": "buttons",
    "name": "Flag item",
    "description": "Flag or clear one local item as the empty fabric contour fills cleanly without an extra badge.",
    "motions": [
      "Flag unfurl",
      "Fabric fill"
    ],
    "variants": [
      "buttons-flag-toggle-v11"
    ],
    "keywords": [
      "flag",
      "mark",
      "priority",
      "item",
      "basic",
      "animated icon",
      "everyday action"
    ],
    "page": "./component.html?component=matte-buttons-flag-toggle-v11",
    "preview": "./packages/buttons-flag-toggle-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "buttons-flag-toggle-v11": "./downloads/matte-buttons-flag-toggle-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "Serve the extracted package over HTTP. The bundled demonstration changes local preview state only. Replace mountPreview with mount when connecting application state."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "toggle() reverses the local state and setFlagState(value) silently accepts 'clear' | 'flagged'. state reports { flagState, index }. reset() and destroy() are repeat-safe. User changes call onChange and dispatch one bubbling, composed sl:action event."
        ]
      },
      {
        "title": "Appearance and accessibility",
        "paragraphs": [
          "Override the --action-* variables on .sl-component to adapt the neutral palette. Keep the native button, visible focus and live status. Icon motion respects prefers-reduced-motion; forced colors remain legible."
        ]
      }
    ]
  },
  {
    "id": "matte-buttons-snooze-toggle-v11",
    "category": "buttons",
    "name": "Snooze item",
    "description": "Snooze or resume one local item as alarm-clock hands resolve into a centered pause mark.",
    "motions": [
      "Alarm settle",
      "Pause resolve"
    ],
    "variants": [
      "buttons-snooze-toggle-v11"
    ],
    "keywords": [
      "snooze",
      "later",
      "clock",
      "resume",
      "basic",
      "animated icon",
      "everyday action"
    ],
    "page": "./component.html?component=matte-buttons-snooze-toggle-v11",
    "preview": "./packages/buttons-snooze-toggle-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "buttons-snooze-toggle-v11": "./downloads/matte-buttons-snooze-toggle-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "Serve the extracted package over HTTP. The bundled demonstration changes local preview state only. Replace mountPreview with mount when connecting application state."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "toggle() reverses the local state and setSnoozeState(value) silently accepts 'active' | 'snoozed'. state reports { snoozeState, index }. reset() and destroy() are repeat-safe. User changes call onChange and dispatch one bubbling, composed sl:action event."
        ]
      },
      {
        "title": "Appearance and accessibility",
        "paragraphs": [
          "Override the --action-* variables on .sl-component to adapt the neutral palette. Keep the native button, visible focus and live status. Icon motion respects prefers-reduced-motion; forced colors remain legible."
        ]
      }
    ]
  },
  {
    "id": "matte-buttons-publish-toggle-v11",
    "category": "buttons",
    "name": "Publish item",
    "description": "Move one local draft into a published state while its arrow resolves into a check.",
    "motions": [
      "Arrow rise",
      "Check resolve"
    ],
    "variants": [
      "buttons-publish-toggle-v11"
    ],
    "keywords": [
      "publish",
      "draft",
      "release",
      "document",
      "basic",
      "animated icon",
      "everyday action"
    ],
    "page": "./component.html?component=matte-buttons-publish-toggle-v11",
    "preview": "./packages/buttons-publish-toggle-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "buttons-publish-toggle-v11": "./downloads/matte-buttons-publish-toggle-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "Serve the extracted package over HTTP. The bundled demonstration changes local preview state only. Replace mountPreview with mount when connecting application state."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "toggle() reverses the local state and setPublishState(value) silently accepts 'draft' | 'published'. state reports { publishState, index }. reset() and destroy() are repeat-safe. User changes call onChange and dispatch one bubbling, composed sl:action event."
        ]
      },
      {
        "title": "Appearance and accessibility",
        "paragraphs": [
          "Override the --action-* variables on .sl-component to adapt the neutral palette. Keep the native button, visible focus and live status. Icon motion respects prefers-reduced-motion; forced colors remain legible."
        ]
      }
    ]
  },
  {
    "id": "matte-buttons-sync-toggle-v11",
    "category": "buttons",
    "name": "Sync item",
    "description": "Include or remove one local item from sync with two continuous opposing arrows.",
    "motions": [
      "Arrow exchange",
      "Sync check"
    ],
    "variants": [
      "buttons-sync-toggle-v11"
    ],
    "keywords": [
      "sync",
      "refresh",
      "cloud",
      "item",
      "basic",
      "animated icon",
      "everyday action"
    ],
    "page": "./component.html?component=matte-buttons-sync-toggle-v11",
    "preview": "./packages/buttons-sync-toggle-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "buttons-sync-toggle-v11": "./downloads/matte-buttons-sync-toggle-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "Serve the extracted package over HTTP. The bundled demonstration changes local preview state only. Replace mountPreview with mount when connecting application state."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "toggle() reverses the local state and setSyncState(value) silently accepts 'local' | 'synced'. state reports { syncState, index }. reset() and destroy() are repeat-safe. User changes call onChange and dispatch one bubbling, composed sl:action event."
        ]
      },
      {
        "title": "Appearance and accessibility",
        "paragraphs": [
          "Override the --action-* variables on .sl-component to adapt the neutral palette. Keep the native button, visible focus and live status. Icon motion respects prefers-reduced-motion; forced colors remain legible."
        ]
      }
    ]
  },
  {
    "id": "matte-buttons-report-toggle-v11",
    "category": "buttons",
    "name": "Report issue",
    "description": "Select or cancel one local report draft as an alert resolves into confirmation.",
    "motions": [
      "Alert retract",
      "Confirmation draw"
    ],
    "variants": [
      "buttons-report-toggle-v11"
    ],
    "keywords": [
      "report",
      "issue",
      "alert",
      "moderation",
      "basic",
      "animated icon",
      "everyday action"
    ],
    "page": "./component.html?component=matte-buttons-report-toggle-v11",
    "preview": "./packages/buttons-report-toggle-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "buttons-report-toggle-v11": "./downloads/matte-buttons-report-toggle-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "Serve the extracted package over HTTP. The bundled demonstration changes local preview state only. Replace mountPreview with mount when connecting application state."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "toggle() reverses the local state and setReportState(value) silently accepts 'clear' | 'reporting'. state reports { reportState, index }. reset() and destroy() are repeat-safe. User changes call onChange and dispatch one bubbling, composed sl:action event."
        ]
      },
      {
        "title": "Appearance and accessibility",
        "paragraphs": [
          "Override the --action-* variables on .sl-component to adapt the neutral palette. Keep the native button, visible focus and live status. Icon motion respects prefers-reduced-motion; forced colors remain legible."
        ]
      }
    ]
  },
  {
    "id": "matte-buttons-power-toggle-v11",
    "category": "buttons",
    "name": "Power control",
    "description": "Turn one local control on or off with a stable power-button glyph and a restrained press pulse.",
    "motions": [
      "Power pulse",
      "Ring settle"
    ],
    "variants": [
      "buttons-power-toggle-v11"
    ],
    "keywords": [
      "power",
      "on",
      "off",
      "control",
      "basic",
      "animated icon",
      "everyday action"
    ],
    "page": "./component.html?component=matte-buttons-power-toggle-v11",
    "preview": "./packages/buttons-power-toggle-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "buttons-power-toggle-v11": "./downloads/matte-buttons-power-toggle-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "Serve the extracted package over HTTP. The bundled demonstration changes local preview state only. Replace mountPreview with mount when connecting application state."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "toggle() reverses the local state and setPowerState(value) silently accepts 'off' | 'on'. state reports { powerState, index }. reset() and destroy() are repeat-safe. User changes call onChange and dispatch one bubbling, composed sl:action event."
        ]
      },
      {
        "title": "Appearance and accessibility",
        "paragraphs": [
          "Override the --action-* variables on .sl-component to adapt the neutral palette. Keep the native button, visible focus and live status. Icon motion respects prefers-reduced-motion; forced colors remain legible."
        ]
      }
    ]
  },
  {
    "id": "matte-buttons-group-toggle-v11",
    "category": "buttons",
    "name": "Group items",
    "description": "Group or ungroup local items as two cards meet inside one shared boundary and separate along the same path.",
    "motions": [
      "Card convergence",
      "Boundary draw"
    ],
    "variants": [
      "buttons-group-toggle-v11"
    ],
    "keywords": [
      "group",
      "ungroup",
      "items",
      "editor",
      "basic",
      "animated icon",
      "everyday action"
    ],
    "page": "./component.html?component=matte-buttons-group-toggle-v11",
    "preview": "./packages/buttons-group-toggle-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "buttons-group-toggle-v11": "./downloads/matte-buttons-group-toggle-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "Serve the extracted package over HTTP. The bundled demonstration changes local preview state only. Replace mountPreview with mount when connecting application state."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "toggle() reverses the local state and setGroupState(value) silently accepts 'separate' | 'grouped'. state reports { groupState, index }. reset() and destroy() are repeat-safe. User changes call onChange and dispatch one bubbling, composed sl:action event."
        ]
      },
      {
        "title": "Appearance and accessibility",
        "paragraphs": [
          "Override the --action-* variables on .sl-component to adapt the neutral palette. Keep the native button, visible focus and live status. Icon motion respects prefers-reduced-motion; forced colors remain legible."
        ]
      }
    ]
  }
];
