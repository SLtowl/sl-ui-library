// Local review batch. Owned by the feedback task.
export default [
  {
    "id": "matte-feedback-errors-v11",
    "category": "feedback",
    "name": "Form error summary",
    "description": "Check a name and email format, follow error links to invalid fields, and see an explicit confirmation after both pass.",
    "motions": [
      "Soft press"
    ],
    "variants": [
      "feedback-errors-v11"
    ],
    "keywords": [
      "validation",
      "form",
      "errors",
      "summary",
      "focus"
    ],
    "page": "./component.html?component=matte-feedback-errors-v11",
    "preview": "./packages/feedback-errors-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "feedback-errors-v11": "./downloads/matte-feedback-errors-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "Serve the complete folder locally. example.js runs an explicitly labeled, offline demonstration. Replace mountPreview(root) with SLComponent.mount(root, options) when integrating."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "validate() checks a nonblank workspace name and an email with a dotted domain. It returns true on format success and otherwise focuses the first error link. state is { status, errors }. Editing clears ready until the next explicit check. reset() empties both fields. The checked label and icon confirm format only, not mailbox existence; no form is submitted.",
          "All methods are scoped to this instance. A pending callback receives an AbortSignal; reset, destroy and Escape abort pending work. Repeated mount replaces the prior instance. No custom application events are emitted."
        ]
      },
      {
        "title": "Appearance",
        "paragraphs": [
          "Use --fb-surface, --fb-raised, --fb-border, --fb-text, --fb-muted, --fb-accent, --fb-on-accent, --fb-danger, --fb-warning, --fb-focus and --fb-outside to adapt the palette. Controls retain visible keyboard focus and text labels. CSS responds immediately to reduced-motion preference changes. Layout fits a 226–320px root, with bounded inner result scrolling."
        ]
      }
    ]
  },
  {
    "id": "matte-feedback-draft-v11",
    "category": "feedback",
    "name": "Unsaved draft",
    "description": "An editable draft with an explicit save checkpoint, cancellation and local discard.",
    "motions": [
      "Soft press"
    ],
    "variants": [
      "feedback-draft-v11"
    ],
    "keywords": [
      "draft",
      "unsaved",
      "checkpoint",
      "save",
      "discard"
    ],
    "page": "./component.html?component=matte-feedback-draft-v11",
    "preview": "./packages/feedback-draft-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "feedback-draft-v11": "./downloads/matte-feedback-draft-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "Serve the complete folder locally. example.js runs an explicitly labeled, offline demonstration. Replace mountPreview(root) with SLComponent.mount(root, options) when integrating."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "Options: initialText and onAction(\"save\", { text, signal }). Resolve only after persistence succeeds; reject on failure. save() returns Promise<boolean>; discard() restores the last confirmed checkpoint, cancel() aborts the callback, and state exposes { status, dirty, text, saved }. reset() returns to initialText; destroy() aborts and detaches.",
          "All methods are scoped to this instance. A pending callback receives an AbortSignal; reset, destroy and Escape abort pending work. Repeated mount replaces the prior instance. No custom application events are emitted."
        ]
      },
      {
        "title": "Appearance",
        "paragraphs": [
          "Use --fb-surface, --fb-raised, --fb-border, --fb-text, --fb-muted, --fb-accent, --fb-on-accent, --fb-danger, --fb-warning, --fb-focus and --fb-outside to adapt the palette. Controls retain visible keyboard focus and text labels. CSS responds immediately to reduced-motion preference changes. Layout fits a 226–320px root, with bounded inner result scrolling."
        ]
      }
    ]
  },
  {
    "id": "matte-feedback-session-v11",
    "category": "feedback",
    "name": "Session expiry",
    "description": "A deadline warning with a real clock, a cancelable renewal and a recoverable expired state.",
    "motions": [
      "Soft press"
    ],
    "variants": [
      "feedback-session-v11"
    ],
    "keywords": [
      "session",
      "deadline",
      "expiry",
      "renew",
      "countdown"
    ],
    "page": "./component.html?component=matte-feedback-session-v11",
    "preview": "./packages/feedback-session-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "feedback-session-v11": "./downloads/matte-feedback-session-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "Serve the complete folder locally. example.js runs an explicitly labeled, offline demonstration. Replace mountPreview(root) with SLComponent.mount(root, options) when integrating."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "Options: durationSeconds (1–86400; default 90) and onAction(\"renew\", { signal }). Renewal must return { expiresAt } with a future Unix timestamp in milliseconds. renew() returns Promise<boolean>. state exposes { status, expiresAt, expired }. The clock continues during pending renewal and uses wall time after a suspended tab. reset() creates a fresh local duration; destroy() clears the interval.",
          "All methods are scoped to this instance. A pending callback receives an AbortSignal; reset, destroy and Escape abort pending work. Repeated mount replaces the prior instance. No custom application events are emitted."
        ]
      },
      {
        "title": "Appearance",
        "paragraphs": [
          "Use --fb-surface, --fb-raised, --fb-border, --fb-text, --fb-muted, --fb-accent, --fb-on-accent, --fb-danger, --fb-warning, --fb-focus and --fb-outside to adapt the palette. Controls retain visible keyboard focus and text labels. CSS responds immediately to reduced-motion preference changes. Layout fits a 226–320px root, with bounded inner result scrolling."
        ]
      }
    ]
  },
  {
    "id": "matte-feedback-capacity-v11",
    "category": "feedback",
    "name": "Capacity guard",
    "description": "A storage threshold preview that rejects oversized additions and recovers when space is freed.",
    "motions": [
      "Soft press",
      "Capacity transition"
    ],
    "variants": [
      "feedback-capacity-v11"
    ],
    "keywords": [
      "quota",
      "storage",
      "capacity",
      "threshold",
      "recovery"
    ],
    "page": "./component.html?component=matte-feedback-capacity-v11",
    "preview": "./packages/feedback-capacity-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "feedback-capacity-v11": "./downloads/matte-feedback-capacity-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "Serve the complete folder locally. example.js runs an explicitly labeled, offline demonstration. Replace mountPreview(root) with SLComponent.mount(root, options) when integrating."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "Pure local capacity model: stage() adds the selected 4, 8 or 18 MB file only when it fits within 100 MB; release() frees the fixed 20 MB cache once; remove() clears all staged files. Each returns boolean. state is { status, used, staged, available }. No storage API or upload is implied. reset() restores the 86 MB baseline.",
          "All methods are scoped to this instance. A pending callback receives an AbortSignal; reset, destroy and Escape abort pending work. Repeated mount replaces the prior instance. No custom application events are emitted."
        ]
      },
      {
        "title": "Appearance",
        "paragraphs": [
          "Use --fb-surface, --fb-raised, --fb-border, --fb-text, --fb-muted, --fb-accent, --fb-on-accent, --fb-danger, --fb-warning, --fb-focus and --fb-outside to adapt the palette. Controls retain visible keyboard focus and text labels. CSS responds immediately to reduced-motion preference changes. Layout fits a 226–320px root, with bounded inner result scrolling."
        ]
      }
    ]
  },
  {
    "id": "matte-feedback-conflict-v11",
    "category": "feedback",
    "name": "Version conflict",
    "description": "A two-version comparison with an explicit choice and cancelable conflict resolution.",
    "motions": [
      "Soft press"
    ],
    "variants": [
      "feedback-conflict-v11"
    ],
    "keywords": [
      "conflict",
      "version",
      "compare",
      "resolve",
      "sync"
    ],
    "page": "./component.html?component=matte-feedback-conflict-v11",
    "preview": "./packages/feedback-conflict-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "feedback-conflict-v11": "./downloads/matte-feedback-conflict-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "Serve the complete folder locally. example.js runs an explicitly labeled, offline demonstration. Replace mountPreview(root) with SLComponent.mount(root, options) when integrating."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "Options: localText, remoteText and onAction(\"resolve\", { choice, text, signal }). User text is rendered literally. choose(\"local\"|\"remote\") selects a version; resolve() returns Promise<boolean> and freezes the choice only after callback fulfillment. cancel() leaves both versions intact. state exposes { status, choice, resolved, localText, remoteText }; reset() reopens the original conflict.",
          "All methods are scoped to this instance. A pending callback receives an AbortSignal; reset, destroy and Escape abort pending work. Repeated mount replaces the prior instance. No custom application events are emitted."
        ]
      },
      {
        "title": "Appearance",
        "paragraphs": [
          "Use --fb-surface, --fb-raised, --fb-border, --fb-text, --fb-muted, --fb-accent, --fb-on-accent, --fb-danger, --fb-warning, --fb-focus and --fb-outside to adapt the palette. Controls retain visible keyboard focus and text labels. CSS responds immediately to reduced-motion preference changes. Layout fits a 226–320px root, with bounded inner result scrolling."
        ]
      }
    ]
  },
  {
    "id": "matte-feedback-batch-v11",
    "category": "feedback",
    "name": "Partial completion receipt",
    "description": "A per-item result receipt that retries only unsuccessful items and retains confirmed results.",
    "motions": [
      "Soft press"
    ],
    "variants": [
      "feedback-batch-v11"
    ],
    "keywords": [
      "batch",
      "partial",
      "receipt",
      "failed",
      "results"
    ],
    "page": "./component.html?component=matte-feedback-batch-v11",
    "preview": "./packages/feedback-batch-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "feedback-batch-v11": "./downloads/matte-feedback-batch-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "Serve the complete folder locally. example.js runs an explicitly labeled, offline demonstration. Replace mountPreview(root) with SLComponent.mount(root, options) when integrating."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "Options: results mapping notes, map and interview to \"done\", \"failed\" or \"skipped\"; onAction(\"retry\", { id, signal }) performs one unfinished item. retry() processes those items sequentially and stops at the first error or cancellation, retaining confirmed successes. dismiss() marks the receipt reviewed locally. state is { status, results, reviewed }. reset() restores supplied results.",
          "All methods are scoped to this instance. A pending callback receives an AbortSignal; reset, destroy and Escape abort pending work. Repeated mount replaces the prior instance. No custom application events are emitted."
        ]
      },
      {
        "title": "Appearance",
        "paragraphs": [
          "Use --fb-surface, --fb-raised, --fb-border, --fb-text, --fb-muted, --fb-accent, --fb-on-accent, --fb-danger, --fb-warning, --fb-focus and --fb-outside to adapt the palette. Controls retain visible keyboard focus and text labels. CSS responds immediately to reduced-motion preference changes. Layout fits a 226–320px root, with bounded inner result scrolling."
        ]
      }
    ]
  },
  {
    "id": "matte-feedback-access-v11",
    "category": "feedback",
    "name": "Access request feedback",
    "description": "A blocked feature with a request reason and distinct waiting, denied and granted outcomes.",
    "motions": [
      "Soft press"
    ],
    "variants": [
      "feedback-access-v11"
    ],
    "keywords": [
      "permission",
      "access",
      "request",
      "approval",
      "denied"
    ],
    "page": "./component.html?component=matte-feedback-access-v11",
    "preview": "./packages/feedback-access-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "feedback-access-v11": "./downloads/matte-feedback-access-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "Serve the complete folder locally. example.js runs an explicitly labeled, offline demonstration. Replace mountPreview(root) with SLComponent.mount(root, options) when integrating."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "Provide onAction(\"request\"|\"check\", { reason, signal }) returning { status: \"pending\"|\"denied\"|\"granted\" }. request() validates a nonempty reason and switches to checking once pending. Rejection preserves access state; cancel() aborts work. state is { status, access, reason }. reset() returns to access required. No browser or operating-system permission is requested automatically.",
          "All methods are scoped to this instance. A pending callback receives an AbortSignal; reset, destroy and Escape abort pending work. Repeated mount replaces the prior instance. No custom application events are emitted."
        ]
      },
      {
        "title": "Appearance",
        "paragraphs": [
          "Use --fb-surface, --fb-raised, --fb-border, --fb-text, --fb-muted, --fb-accent, --fb-on-accent, --fb-danger, --fb-warning, --fb-focus and --fb-outside to adapt the palette. Controls retain visible keyboard focus and text labels. CSS responds immediately to reduced-motion preference changes. Layout fits a 226–320px root, with bounded inner result scrolling."
        ]
      }
    ]
  },
  {
    "id": "matte-feedback-empty-v11",
    "category": "feedback",
    "name": "No results recovery",
    "description": "A zero-results state that explains active constraints and recovers by widening the local search.",
    "motions": [
      "Soft press"
    ],
    "variants": [
      "feedback-empty-v11"
    ],
    "keywords": [
      "empty",
      "no results",
      "search",
      "filters",
      "recovery"
    ],
    "page": "./component.html?component=matte-feedback-empty-v11",
    "preview": "./packages/feedback-empty-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "feedback-empty-v11": "./downloads/matte-feedback-empty-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "Serve the complete folder locally. example.js runs an explicitly labeled, offline demonstration. Replace mountPreview(root) with SLComponent.mount(root, options) when integrating."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "This component searches three bundled sample files entirely locally. clear() removes the text constraint and widen() includes active files, with focus returned to the search field. Native search and checkbox controls support keyboard input. state exposes { status, query, archivedOnly, matches }. Adapt the local files array to your data or wire real search explicitly. reset() restores the zero-results example.",
          "All methods are scoped to this instance. A pending callback receives an AbortSignal; reset, destroy and Escape abort pending work. Repeated mount replaces the prior instance. No custom application events are emitted."
        ]
      },
      {
        "title": "Appearance",
        "paragraphs": [
          "Use --fb-surface, --fb-raised, --fb-border, --fb-text, --fb-muted, --fb-accent, --fb-on-accent, --fb-danger, --fb-warning, --fb-focus and --fb-outside to adapt the palette. Controls retain visible keyboard focus and text labels. CSS responds immediately to reduced-motion preference changes. Layout fits a 226–320px root, with bounded inner result scrolling."
        ]
      }
    ]
  },
  {
    "id": "matte-feedback-incident-v11",
    "category": "feedback",
    "name": "Incident timeline",
    "description": "A service incident history with scoped details and a reversible local acknowledgement.",
    "motions": [
      "Soft press",
      "Reversible disclosure"
    ],
    "variants": [
      "feedback-incident-v11"
    ],
    "keywords": [
      "incident",
      "status",
      "timeline",
      "acknowledge",
      "service"
    ],
    "page": "./component.html?component=matte-feedback-incident-v11",
    "preview": "./packages/feedback-incident-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "feedback-incident-v11": "./downloads/matte-feedback-incident-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "Serve the complete folder locally. example.js runs an explicitly labeled, offline demonstration. Replace mountPreview(root) with SLComponent.mount(root, options) when integrating."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "update({ phase, title, detail, label, time }) accepts investigating, identified or resolved and keeps the three latest history entries. Supply actual incident data from your application; this view never polls. acknowledge() toggles a local acknowledgement, disclosure(boolean) controls affected-service details, and Escape closes them. state exposes { status, phase, acknowledged, expanded, history }. reset() restores the sample incident.",
          "All methods are scoped to this instance. A pending callback receives an AbortSignal; reset, destroy and Escape abort pending work. Repeated mount replaces the prior instance. No custom application events are emitted."
        ]
      },
      {
        "title": "Appearance",
        "paragraphs": [
          "Use --fb-surface, --fb-raised, --fb-border, --fb-text, --fb-muted, --fb-accent, --fb-on-accent, --fb-danger, --fb-warning, --fb-focus and --fb-outside to adapt the palette. Controls retain visible keyboard focus and text labels. CSS responds immediately to reduced-motion preference changes. Layout fits a 226–320px root, with bounded inner result scrolling."
        ]
      }
    ]
  },
  {
    "id": "matte-feedback-readiness-v11",
    "category": "feedback",
    "name": "Readiness checklist",
    "description": "A cancelable preflight checklist with explicit pass and blocked results for each requirement.",
    "motions": [
      "Soft press"
    ],
    "variants": [
      "feedback-readiness-v11"
    ],
    "keywords": [
      "preflight",
      "readiness",
      "requirements",
      "validation",
      "checklist"
    ],
    "page": "./component.html?component=matte-feedback-readiness-v11",
    "preview": "./packages/feedback-readiness-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "feedback-readiness-v11": "./downloads/matte-feedback-readiness-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "Serve the complete folder locally. example.js runs an explicitly labeled, offline demonstration. Replace mountPreview(root) with SLComponent.mount(root, options) when integrating."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "Provide onAction(\"check\", { id, signal }) for details, access and storage; return { ok: boolean }. check() runs checks sequentially and returns Promise<boolean> for all passed. A blocked check remains visible while the remaining checks run; rejection or cancellation stops the sequence. state is { status, checks }. cancel() keeps finished results; reset() clears all checks. No sharing operation occurs.",
          "All methods are scoped to this instance. A pending callback receives an AbortSignal; reset, destroy and Escape abort pending work. Repeated mount replaces the prior instance. No custom application events are emitted."
        ]
      },
      {
        "title": "Appearance",
        "paragraphs": [
          "Use --fb-surface, --fb-raised, --fb-border, --fb-text, --fb-muted, --fb-accent, --fb-on-accent, --fb-danger, --fb-warning, --fb-focus and --fb-outside to adapt the palette. Controls retain visible keyboard focus and text labels. CSS responds immediately to reduced-motion preference changes. Layout fits a 226–320px root, with bounded inner result scrolling."
        ]
      }
    ]
  }
];
