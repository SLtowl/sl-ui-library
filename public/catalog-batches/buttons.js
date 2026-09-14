// Local review batch. Owned by the buttons task.
export default [
  {
    "id": "matte-buttons-split-action-v11",
    "category": "buttons",
    "name": "Split export action",
    "description": "Choose an export format from a keyboard menu, then run or cancel the selected action.",
    "motions": [
      "Soft press",
      "Reversible reveal"
    ],
    "variants": [
      "buttons-split-action-v11"
    ],
    "keywords": [
      "split",
      "action",
      "action",
      "local review"
    ],
    "page": "./component.html?component=matte-buttons-split-action-v11",
    "preview": "./packages/buttons-split-action-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "buttons-split-action-v11": "./downloads/matte-buttons-split-action-v11.zip"
    },
    "usage": [
      {
        "title": "Connect the action",
        "paragraphs": [
          "Pass onExport({ format, signal }); resolve only after export creation or handoff succeeds. Reject on failure. The preview creates no file."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "start() returns Promise<boolean>; open(), close(), cancel(), reset(), destroy(). state is { phase, format, open }. sl:action reports format selection and action outcomes.",
          "All controllers expose reset() and destroy(); both are repeat-safe. Remounting the same root disposes its previous controller. Async callbacks accept an AbortSignal; return { status: \"canceled\" } or throw AbortError for cancellation. Reset cannot undo a completed external action."
        ]
      },
      {
        "title": "Appearance and accessibility",
        "paragraphs": [
          "Override --action-ink, --action-surface, --action-hover, --action-text, --action-muted, --action-accent, --action-on-accent, --action-danger, --action-border, --action-focus and --action-track on .sl-component. Keep foreground/background contrast after recoloring. Instrument Sans and its license are bundled. Native keyboard controls, visible focus and live reduced-motion preferences are supported."
        ]
      }
    ]
  },
  {
    "id": "matte-buttons-cancellable-process-v11",
    "category": "buttons",
    "name": "Cancellable processing",
    "description": "Run a cancelable action with callback-driven progress and a retryable error state.",
    "motions": [
      "Soft press",
      "State transition"
    ],
    "variants": [
      "buttons-cancellable-process-v11"
    ],
    "keywords": [
      "cancellable",
      "process",
      "action",
      "local review"
    ],
    "page": "./component.html?component=matte-buttons-cancellable-process-v11",
    "preview": "./packages/buttons-cancellable-process-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "buttons-cancellable-process-v11": "./downloads/matte-buttons-cancellable-process-v11.zip"
    },
    "usage": [
      {
        "title": "Connect the action",
        "paragraphs": [
          "Pass onProcess({ signal, onProgress }). Report finite fractions from 0 to 1. Progress is clamped, monotonic within one request and ignores stale reports after cancellation. The preview simulates progress."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "start() returns Promise<boolean>; cancel(), reset(), destroy(). state is { phase, progress } where progress is 0–100. sl:action reports completion, failure or cancellation.",
          "All controllers expose reset() and destroy(); both are repeat-safe. Remounting the same root disposes its previous controller. Async callbacks accept an AbortSignal; return { status: \"canceled\" } or throw AbortError for cancellation. Reset cannot undo a completed external action."
        ]
      },
      {
        "title": "Appearance and accessibility",
        "paragraphs": [
          "Override --action-ink, --action-surface, --action-hover, --action-text, --action-muted, --action-accent, --action-on-accent, --action-danger, --action-border, --action-focus and --action-track on .sl-component. Keep foreground/background contrast after recoloring. Instrument Sans and its license are bundled. Native keyboard controls, visible focus and live reduced-motion preferences are supported."
        ]
      }
    ]
  },
  {
    "id": "matte-buttons-hold-confirm-v11",
    "category": "buttons",
    "name": "Hold to confirm",
    "description": "Hold a pointer to confirm, or use an untimed two-step keyboard confirmation.",
    "motions": [
      "Soft press",
      "Hold progress"
    ],
    "variants": [
      "buttons-hold-confirm-v11"
    ],
    "keywords": [
      "hold",
      "confirm",
      "action",
      "local review"
    ],
    "page": "./component.html?component=matte-buttons-hold-confirm-v11",
    "preview": "./packages/buttons-hold-confirm-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "buttons-hold-confirm-v11": "./downloads/matte-buttons-hold-confirm-v11.zip"
    },
    "usage": [
      {
        "title": "Connect the action",
        "paragraphs": [
          "Pass onConfirm({ signal }); resolve only after the archive succeeds. holdMs defaults to 1200 and accepts 500–5000 ms. Releasing early or leaving the button cancels the hold. Keyboard activation opens an untimed confirmation."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "confirm() returns Promise<boolean> and bypasses the UI confirmation for trusted application code; open(), close(), cancel(), reset(), destroy(). state is { phase, open, holding }. sl:action reports operation outcomes.",
          "All controllers expose reset() and destroy(); both are repeat-safe. Remounting the same root disposes its previous controller. Async callbacks accept an AbortSignal; return { status: \"canceled\" } or throw AbortError for cancellation. Reset cannot undo a completed external action."
        ]
      },
      {
        "title": "Appearance and accessibility",
        "paragraphs": [
          "Override --action-ink, --action-surface, --action-hover, --action-text, --action-muted, --action-accent, --action-on-accent, --action-danger, --action-border, --action-focus and --action-track on .sl-component. Keep foreground/background contrast after recoloring. Instrument Sans and its license are bundled. Native keyboard controls, visible focus and live reduced-motion preferences are supported."
        ]
      }
    ]
  },
  {
    "id": "matte-buttons-action-queue-v11",
    "category": "buttons",
    "name": "Action queue",
    "description": "Queue up to three jobs, remove waiting jobs and run them serially with cancellation.",
    "motions": [
      "Soft press",
      "State transition"
    ],
    "variants": [
      "buttons-action-queue-v11"
    ],
    "keywords": [
      "action",
      "queue",
      "action",
      "local review"
    ],
    "page": "./component.html?component=matte-buttons-action-queue-v11",
    "preview": "./packages/buttons-action-queue-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "buttons-action-queue-v11": "./downloads/matte-buttons-action-queue-v11.zip"
    },
    "usage": [
      {
        "title": "Connect the action",
        "paragraphs": [
          "Pass onRun({ id, label, signal }) for each job. Jobs run serially; successful jobs leave the queue. Cancellation or failure retains the current and waiting jobs for retry. Additions during processing are appended. Preview jobs are simulated."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "add(label?) and remove(zeroBasedIndex) return booleans. Labels are literal text. start() returns Promise<boolean>; cancel(), reset(), destroy(). state contains phase, a copied items array, completed and activeId. The queue holds at most three jobs.",
          "All controllers expose reset() and destroy(); both are repeat-safe. Remounting the same root disposes its previous controller. Async callbacks accept an AbortSignal; return { status: \"canceled\" } or throw AbortError for cancellation. Reset cannot undo a completed external action."
        ]
      },
      {
        "title": "Appearance and accessibility",
        "paragraphs": [
          "Override --action-ink, --action-surface, --action-hover, --action-text, --action-muted, --action-accent, --action-on-accent, --action-danger, --action-border, --action-focus and --action-track on .sl-component. Keep foreground/background contrast after recoloring. Instrument Sans and its license are bundled. Native keyboard controls, visible focus and live reduced-motion preferences are supported."
        ]
      }
    ]
  },
  {
    "id": "matte-buttons-record-take-v11",
    "category": "buttons",
    "name": "Record a take",
    "description": "Start and stop a recording session with elapsed time, cancellation and device cleanup.",
    "motions": [
      "Soft press",
      "State transition"
    ],
    "variants": [
      "buttons-record-take-v11"
    ],
    "keywords": [
      "record",
      "take",
      "action",
      "local review"
    ],
    "page": "./component.html?component=matte-buttons-record-take-v11",
    "preview": "./packages/buttons-record-take-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "buttons-record-take-v11": "./downloads/matte-buttons-record-take-v11.zip"
    },
    "usage": [
      {
        "title": "Connect the action",
        "paragraphs": [
          "Pass onStart({ signal }) returning a session object with an idempotent synchronous dispose(), and onStop({ session, signal }). dispose() must stop all device tracks. The start signal stays active until session cleanup. A late session is disposed if start was canceled. Resolve onStop only when stopping succeeds."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "start() and stop() return Promise<boolean>; cancel() aborts only the pending request, so a canceled stop leaves the session recording. reset() and destroy() always dispose the session and abort its lifetime signal. state is { phase, recording, elapsed } in seconds. sl:action reports outcomes; the preview never accesses a microphone.",
          "All controllers expose reset() and destroy(); both are repeat-safe. Remounting the same root disposes its previous controller. Async callbacks accept an AbortSignal; return { status: \"canceled\" } or throw AbortError for cancellation. Reset cannot undo a completed external action."
        ]
      },
      {
        "title": "Appearance and accessibility",
        "paragraphs": [
          "Override --action-ink, --action-surface, --action-hover, --action-text, --action-muted, --action-accent, --action-on-accent, --action-danger, --action-border, --action-focus and --action-track on .sl-component. Keep foreground/background contrast after recoloring. Instrument Sans and its license are bundled. Native keyboard controls, visible focus and live reduced-motion preferences are supported."
        ]
      }
    ]
  },
  {
    "id": "matte-buttons-review-decision-v11",
    "category": "buttons",
    "name": "Approve or reject",
    "description": "Make a reversible local review decision, with explicit selection and undo.",
    "motions": [
      "Soft press",
      "State transition"
    ],
    "variants": [
      "buttons-review-decision-v11"
    ],
    "keywords": [
      "review",
      "decision",
      "action",
      "local review"
    ],
    "page": "./component.html?component=matte-buttons-review-decision-v11",
    "preview": "./packages/buttons-review-decision-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "buttons-review-decision-v11": "./downloads/matte-buttons-review-decision-v11.zip"
    },
    "usage": [
      {
        "title": "Connect the action",
        "paragraphs": [
          "This component selects a local decision only. Listen for sl:action and read event.detail.decision (approve, reject or null) to connect the next workflow step. setDecision(value) silently restores application state."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "choose(value), undo(), setDecision(value) return booleans; reset(), destroy(). state is { phase, decision }. Approve and Reject are native buttons with aria-pressed. Undo restores one previous decision.",
          "All controllers expose reset() and destroy(); both are repeat-safe. Remounting the same root disposes its previous controller. Async callbacks accept an AbortSignal; return { status: \"canceled\" } or throw AbortError for cancellation. Reset cannot undo a completed external action."
        ]
      },
      {
        "title": "Appearance and accessibility",
        "paragraphs": [
          "Override --action-ink, --action-surface, --action-hover, --action-text, --action-muted, --action-accent, --action-on-accent, --action-danger, --action-border, --action-focus and --action-track on .sl-component. Keep foreground/background contrast after recoloring. Instrument Sans and its license are bundled. Native keyboard controls, visible focus and live reduced-motion preferences are supported."
        ]
      }
    ]
  },
  {
    "id": "matte-buttons-refresh-snapshot-v11",
    "category": "buttons",
    "name": "Refresh snapshot",
    "description": "Refresh a data snapshot while keeping the previous value available during work or failure.",
    "motions": [
      "Soft press",
      "State transition"
    ],
    "variants": [
      "buttons-refresh-snapshot-v11"
    ],
    "keywords": [
      "refresh",
      "snapshot",
      "action",
      "local review"
    ],
    "page": "./component.html?component=matte-buttons-refresh-snapshot-v11",
    "preview": "./packages/buttons-refresh-snapshot-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "buttons-refresh-snapshot-v11": "./downloads/matte-buttons-refresh-snapshot-v11.zip"
    },
    "usage": [
      {
        "title": "Connect the action",
        "paragraphs": [
          "Pass onRefresh({ count, version, signal }) returning { count, label? }. count must be a non-negative safe integer; label is literal status text. initialCount defaults to 24. A failed or canceled refresh retains the previous snapshot."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "start() returns Promise<boolean>; cancel(), reset(), destroy(). state is { phase, count, version, updatedAt }; updatedAt is a local success timestamp in milliseconds or null. sl:action reports outcomes.",
          "All controllers expose reset() and destroy(); both are repeat-safe. Remounting the same root disposes its previous controller. Async callbacks accept an AbortSignal; return { status: \"canceled\" } or throw AbortError for cancellation. Reset cannot undo a completed external action."
        ]
      },
      {
        "title": "Appearance and accessibility",
        "paragraphs": [
          "Override --action-ink, --action-surface, --action-hover, --action-text, --action-muted, --action-accent, --action-on-accent, --action-danger, --action-border, --action-focus and --action-track on .sl-component. Keep foreground/background contrast after recoloring. Instrument Sans and its license are bundled. Native keyboard controls, visible focus and live reduced-motion preferences are supported."
        ]
      }
    ]
  },
  {
    "id": "matte-buttons-duplicate-item-v11",
    "category": "buttons",
    "name": "Duplicate item",
    "description": "Create a copy without changing the original, with confirmed results, cancellation and retry.",
    "motions": [
      "Soft press",
      "Reversible reveal"
    ],
    "variants": [
      "buttons-duplicate-item-v11"
    ],
    "keywords": [
      "duplicate",
      "copy item",
      "action",
      "local review"
    ],
    "page": "./component.html?component=matte-buttons-duplicate-item-v11",
    "preview": "./packages/buttons-duplicate-item-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "buttons-duplicate-item-v11": "./downloads/matte-buttons-duplicate-item-v11.zip"
    },
    "usage": [
      {
        "title": "Connect the action",
        "paragraphs": [
          "Pass item: { id, label } and onDuplicate({ source, copyNumber, signal }). Resolve only after your app creates a copy, returning a new { id, label }; reject on failure. Both strings must be non-empty and at most 160 characters. Labels render as literal text. copyNumber is a local display count, not a backend identifier. The preview creates no files."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "start() returns Promise<boolean>; cancel() returns boolean; reset(), destroy(). state is { phase, copies, source, lastCreated }. sl:action reports phase, copies and the last confirmed item. Repeated clicks during one request do not create extra copies. Escape cancels and returns focus from Cancel.",
          "Reset clears local state, not existing copies. Destroy and remount dispose listeners and abort pending work; late results are ignored. Cancellation is best-effort: your app must reconcile an operation that completed despite abort. Return { status: \"canceled\" } or throw AbortError to report cancellation."
        ]
      },
      {
        "title": "Appearance and accessibility",
        "paragraphs": [
          "Override --action-ink, --action-surface, --action-hover, --action-text, --action-muted, --action-accent, --action-on-accent, --action-danger, --action-border, --action-focus and --action-track on .sl-component. Keep foreground/background contrast after recoloring. Instrument Sans and its license are bundled. Native keyboard controls, visible focus and live reduced-motion preferences are supported."
        ]
      }
    ]
  },
  {
    "id": "matte-buttons-repeat-stepper-v11",
    "category": "buttons",
    "name": "Press and repeat",
    "description": "Adjust a bounded quantity with single presses, pointer hold repeat and keyboard shortcuts.",
    "motions": [
      "Soft press",
      "State transition"
    ],
    "variants": [
      "buttons-repeat-stepper-v11"
    ],
    "keywords": [
      "repeat",
      "stepper",
      "action",
      "local review"
    ],
    "page": "./component.html?component=matte-buttons-repeat-stepper-v11",
    "preview": "./packages/buttons-repeat-stepper-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "buttons-repeat-stepper-v11": "./downloads/matte-buttons-repeat-stepper-v11.zip"
    },
    "usage": [
      {
        "title": "Connect the action",
        "paragraphs": [
          "Pass integer min, max and value. Defaults are 1, 12 and 3; range limits are 0–999. Listen for sl:action and read event.detail.value. Holding begins repetition after 400 ms and stops on release, leaving the button, blur or a boundary."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "setValue(integer, notify = false) clamps to the range and returns whether the value changed. reset(), destroy(). state is { phase, value, min, max }. Native keyboard clicks change once; arrows change by one, Home/End reach limits, Escape stops repeat.",
          "All controllers expose reset() and destroy(); both are repeat-safe. Remounting the same root disposes its previous controller. Async callbacks accept an AbortSignal; return { status: \"canceled\" } or throw AbortError for cancellation. Reset cannot undo a completed external action."
        ]
      },
      {
        "title": "Appearance and accessibility",
        "paragraphs": [
          "Override --action-ink, --action-surface, --action-hover, --action-text, --action-muted, --action-accent, --action-on-accent, --action-danger, --action-border, --action-focus and --action-track on .sl-component. Keep foreground/background contrast after recoloring. Instrument Sans and its license are bundled. Native keyboard controls, visible focus and live reduced-motion preferences are supported."
        ]
      }
    ]
  },
  {
    "id": "matte-buttons-shuffle-choice-v11",
    "category": "buttons",
    "name": "Shuffle and undo",
    "description": "Pick a different local suggestion without immediate repeats, then undo the last pick.",
    "motions": [
      "Soft press",
      "State transition"
    ],
    "variants": [
      "buttons-shuffle-choice-v11"
    ],
    "keywords": [
      "shuffle",
      "choice",
      "action",
      "local review"
    ],
    "page": "./component.html?component=matte-buttons-shuffle-choice-v11",
    "preview": "./packages/buttons-shuffle-choice-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "buttons-shuffle-choice-v11": "./downloads/matte-buttons-shuffle-choice-v11.zip"
    },
    "usage": [
      {
        "title": "Connect the action",
        "paragraphs": [
          "Pass 2–20 distinct non-empty choices. All values render as literal text, including Unicode. Optional random() must return a finite number in [0, 1). The algorithm always picks a different index, then offers one-level undo."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "shuffle() and undo() return booleans; reset(), destroy(). state is { phase, index, choice, canUndo }. sl:action reports index and choice. No requests or content generation occur.",
          "All controllers expose reset() and destroy(); both are repeat-safe. Remounting the same root disposes its previous controller. Async callbacks accept an AbortSignal; return { status: \"canceled\" } or throw AbortError for cancellation. Reset cannot undo a completed external action."
        ]
      },
      {
        "title": "Appearance and accessibility",
        "paragraphs": [
          "Override --action-ink, --action-surface, --action-hover, --action-text, --action-muted, --action-accent, --action-on-accent, --action-danger, --action-border, --action-focus and --action-track on .sl-component. Keep foreground/background contrast after recoloring. Instrument Sans and its license are bundled. Native keyboard controls, visible focus and live reduced-motion preferences are supported."
        ]
      }
    ]
  }
];
