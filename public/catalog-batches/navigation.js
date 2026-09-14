// Ten navigation components for local owner review.
export default [
  {
    "id": "matte-navigation-overflow-tabs-v11",
    "category": "navigation",
    "name": "Project section tabs",
    "description": "Six always-visible section tabs that wrap to fit their container and share one content panel.",
    "motions": [
      "Soft selection"
    ],
    "variants": [
      "navigation-overflow-tabs-v11"
    ],
    "keywords": [
      "navigation",
      "project",
      "tabs",
      "sections",
      "destinations"
    ],
    "page": "./component.html?component=matte-navigation-overflow-tabs-v11",
    "preview": "./packages/navigation-overflow-tabs-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "navigation-overflow-tabs-v11": "./downloads/matte-navigation-overflow-tabs-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "Select any of the six visible tabs. The group wraps to fit narrow containers without scrolling, arrows or a duplicate menu. Left/Right and Home/End navigate by keyboard. Copy the complete package and mount its .sl-component root. All content and navigation are local; connect application routes explicitly through onNavigate or sl-navigate."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "SLComponent.mount(root, { onNavigate(detail) }) and mountPreview(root) return reset(), destroy(), state and navigate(index). navigate(index) selects one of six zero-based destinations and returns false for invalid input. state contains selected. This component has no disclosure or scrolling state.",
          "reset() silently restores initial content, controls and ARIA state. destroy() removes all listeners and stops scrolling; later method calls do nothing. Remounting the same root destroys the previous controller. sl-navigate bubbles across Shadow DOM and supplies { kind, ...state }; onNavigate receives the same local navigation data. State arrays and objects are copied."
        ]
      },
      {
        "title": "Appearance",
        "paragraphs": [
          "Override --nav-surface, --nav-raised, --nav-text, --nav-muted, --nav-accent, --nav-accent-ink, --nav-border and --nav-focus on the root. Set --nav-color-scheme to light for a light native-control palette. Buttons use a single visible focus outline and selected text or markers in addition to color. Instrument Sans and original inline SVG are bundled. CSS transitions honor reduced motion; scroll-based components also react to preference changes while mounted."
        ]
      }
    ]
  },
  {
    "id": "matte-navigation-drill-down-v11",
    "category": "navigation",
    "name": "Drill-down navigator",
    "description": "Nested destination screens replace the current level and Back restores the exact parent choice.",
    "motions": [
      "Soft selection",
      "Reversible disclosure"
    ],
    "variants": [
      "navigation-drill-down-v11"
    ],
    "keywords": [
      "navigation",
      "drill",
      "down",
      "drill-down",
      "navigator"
    ],
    "page": "./component.html?component=matte-navigation-drill-down-v11",
    "preview": "./packages/navigation-drill-down-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "navigation-drill-down-v11": "./downloads/matte-navigation-drill-down-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "Nested destination screens replace the current level and Back restores the exact parent choice. Copy the complete package and mount its .sl-component root. All content and navigation are local; connect application routes explicitly through onNavigate or sl-navigate."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "SLComponent.mount(root, { onNavigate(detail) }) and mountPreview(root) return reset(), destroy(), state and the methods below. navigate(index) opens an immediate child screen and returns false for invalid or unrelated destinations. back() returns to the previous screen and its opener. state contains selected and a copied trail array. Escape and Alt + Left also go back.",
          "reset() silently restores initial content, controls and ARIA state. destroy() removes all listeners and stops scrolling; later method calls do nothing. Remounting the same root destroys the previous controller. sl-navigate bubbles across Shadow DOM and supplies { kind, ...state }; onNavigate receives the same local navigation data. State arrays and objects are copied."
        ]
      },
      {
        "title": "Appearance",
        "paragraphs": [
          "Override --nav-surface, --nav-raised, --nav-text, --nav-muted, --nav-accent, --nav-accent-ink, --nav-border and --nav-focus on the root. Set --nav-color-scheme to light for a light native-control palette. Buttons use a single visible focus outline and selected text or markers in addition to color. Instrument Sans and original inline SVG are bundled. CSS transitions honor reduced motion; scroll-based components also react to preference changes while mounted."
        ]
      }
    ]
  },
  {
    "id": "matte-navigation-history-v11",
    "category": "navigation",
    "name": "Navigation history",
    "description": "Local Back and Forward controls preserve visited destinations and discard a forward branch after a new visit.",
    "motions": [
      "Soft selection"
    ],
    "variants": [
      "navigation-history-v11"
    ],
    "keywords": [
      "navigation",
      "history",
      "navigation",
      "history"
    ],
    "page": "./component.html?component=matte-navigation-history-v11",
    "preview": "./packages/navigation-history-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "navigation-history-v11": "./downloads/matte-navigation-history-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "Local Back and Forward controls preserve visited destinations and discard a forward branch after a new visit. Copy the complete package and mount its .sl-component root. All content and navigation are local; connect application routes explicitly through onNavigate or sl-navigate."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "SLComponent.mount(root, { onNavigate(detail) }) and mountPreview(root) return reset(), destroy(), state and the methods below. navigate(index) visits a route, truncating the forward branch and suppressing duplicate current visits. back() and forward() return whether travel occurred. state contains selected, entries and cursor. History is bounded to twenty local visits and never changes browser history.",
          "reset() silently restores initial content, controls and ARIA state. destroy() removes all listeners and stops scrolling; later method calls do nothing. Remounting the same root destroys the previous controller. sl-navigate bubbles across Shadow DOM and supplies { kind, ...state }; onNavigate receives the same local navigation data. State arrays and objects are copied."
        ]
      },
      {
        "title": "Appearance",
        "paragraphs": [
          "Override --nav-surface, --nav-raised, --nav-text, --nav-muted, --nav-accent, --nav-accent-ink, --nav-border and --nav-focus on the root. Set --nav-color-scheme to light for a light native-control palette. Buttons use a single visible focus outline and selected text or markers in addition to color. Instrument Sans and original inline SVG are bundled. CSS transitions honor reduced motion; scroll-based components also react to preference changes while mounted."
        ]
      }
    ]
  },
  {
    "id": "matte-navigation-context-rail-v11",
    "category": "navigation",
    "name": "Contextual navigation rail",
    "description": "The destination rail adapts to the chosen object and remembers the last section for each context.",
    "motions": [
      "Soft selection"
    ],
    "variants": [
      "navigation-context-rail-v11"
    ],
    "keywords": [
      "navigation",
      "context",
      "rail",
      "contextual",
      "navigation",
      "rail"
    ],
    "page": "./component.html?component=matte-navigation-context-rail-v11",
    "preview": "./packages/navigation-context-rail-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "navigation-context-rail-v11": "./downloads/matte-navigation-context-rail-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "The destination rail adapts to the chosen object and remembers the last section for each context. Copy the complete package and mount its .sl-component root. All content and navigation are local; connect application routes explicitly through onNavigate or sl-navigate."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "SLComponent.mount(root, { onNavigate(detail) }) and mountPreview(root) return reset(), destroy(), state and the methods below. setContext(index) changes between Document (0) and Collection (1). navigate(index) selects one of that object’s three sections. Both return whether a change occurred. state contains context, selected and remembered (a copy of the per-context selections).",
          "reset() silently restores initial content, controls and ARIA state. destroy() removes all listeners and stops scrolling; later method calls do nothing. Remounting the same root destroys the previous controller. sl-navigate bubbles across Shadow DOM and supplies { kind, ...state }; onNavigate receives the same local navigation data. State arrays and objects are copied."
        ]
      },
      {
        "title": "Appearance",
        "paragraphs": [
          "Override --nav-surface, --nav-raised, --nav-text, --nav-muted, --nav-accent, --nav-accent-ink, --nav-border and --nav-focus on the root. Set --nav-color-scheme to light for a light native-control palette. Buttons use a single visible focus outline and selected text or markers in addition to color. Instrument Sans and original inline SVG are bundled. CSS transitions honor reduced motion; scroll-based components also react to preference changes while mounted."
        ]
      }
    ]
  },
  {
    "id": "matte-navigation-landmark-jump-v11",
    "category": "navigation",
    "name": "Landmark jump and return",
    "description": "A compact landmark chooser moves focus inside a reading pane and returns to the exact previous reading position.",
    "motions": [
      "Bounded scroll",
      "Reversible disclosure"
    ],
    "variants": [
      "navigation-landmark-jump-v11"
    ],
    "keywords": [
      "navigation",
      "landmark",
      "jump",
      "landmark",
      "jump",
      "and",
      "return"
    ],
    "page": "./component.html?component=matte-navigation-landmark-jump-v11",
    "preview": "./packages/navigation-landmark-jump-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "navigation-landmark-jump-v11": "./downloads/matte-navigation-landmark-jump-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "A compact landmark chooser moves focus inside a reading pane and returns to the exact previous reading position. Copy the complete package and mount its .sl-component root. All content and navigation are local; connect application routes explicitly through onNavigate or sl-navigate."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "SLComponent.mount(root, { onNavigate(detail) }) and mountPreview(root) return reset(), destroy(), state and the methods below. jump(index) focuses one of three landmark headings and stores the current inner scroll position. back() restores that position and the Jump to trigger. A second jump replaces the return position. state contains selected, open and returnPosition. Escape closes the chooser or returns after a jump; no page-wide scrolling is used.",
          "reset() silently restores initial content, controls and ARIA state. destroy() removes all listeners and stops scrolling; later method calls do nothing. Remounting the same root destroys the previous controller. sl-navigate bubbles across Shadow DOM and supplies { kind, ...state }; onNavigate receives the same local navigation data. State arrays and objects are copied."
        ]
      },
      {
        "title": "Appearance",
        "paragraphs": [
          "Override --nav-surface, --nav-raised, --nav-text, --nav-muted, --nav-accent, --nav-accent-ink, --nav-border and --nav-focus on the root. Set --nav-color-scheme to light for a light native-control palette. Buttons use a single visible focus outline and selected text or markers in addition to color. Instrument Sans and original inline SVG are bundled. CSS transitions honor reduced motion; scroll-based components also react to preference changes while mounted."
        ]
      }
    ]
  },
  {
    "id": "matte-navigation-route-finder-v11",
    "category": "navigation",
    "name": "Searchable route finder",
    "description": "Filter destination names and paths, open a real local detail view, then return with the query and result focus preserved.",
    "motions": [
      "Soft selection"
    ],
    "variants": [
      "navigation-route-finder-v11"
    ],
    "keywords": [
      "navigation",
      "route",
      "finder",
      "searchable",
      "route",
      "finder"
    ],
    "page": "./component.html?component=matte-navigation-route-finder-v11",
    "preview": "./packages/navigation-route-finder-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "navigation-route-finder-v11": "./downloads/matte-navigation-route-finder-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "Filter destination names and paths, open a real local detail view, then return with the query and result focus preserved. Copy the complete package and mount its .sl-component root. All content and navigation are local; connect application routes explicitly through onNavigate or sl-navigate."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "SLComponent.mount(root, { onNavigate(detail) }) and mountPreview(root) return reset(), destroy(), state and the methods below. setQuery(value) accepts literal text, including Unicode, and filters names and paths without HTML interpolation. navigate(index) opens one of five local destinations. back() restores the search query and matching opener focus. state contains selected (null while searching), query and matching result indices.",
          "reset() silently restores initial content, controls and ARIA state. destroy() removes all listeners and stops scrolling; later method calls do nothing. Remounting the same root destroys the previous controller. sl-navigate bubbles across Shadow DOM and supplies { kind, ...state }; onNavigate receives the same local navigation data. State arrays and objects are copied."
        ]
      },
      {
        "title": "Appearance",
        "paragraphs": [
          "Override --nav-surface, --nav-raised, --nav-text, --nav-muted, --nav-accent, --nav-accent-ink, --nav-border and --nav-focus on the root. Set --nav-color-scheme to light for a light native-control palette. Buttons use a single visible focus outline and selected text or markers in addition to color. Instrument Sans and original inline SVG are bundled. CSS transitions honor reduced motion; scroll-based components also react to preference changes while mounted."
        ]
      }
    ]
  },
  {
    "id": "matte-navigation-alphabet-jump-v11",
    "category": "navigation",
    "name": "Alphabet jump navigator",
    "description": "Letter shortcuts and keyboard navigation move through a local directory with a return point for the previous group.",
    "motions": [
      "Bounded scroll",
      "Soft selection"
    ],
    "variants": [
      "navigation-alphabet-jump-v11"
    ],
    "keywords": [
      "navigation",
      "alphabet",
      "jump",
      "alphabet",
      "jump",
      "navigator"
    ],
    "page": "./component.html?component=matte-navigation-alphabet-jump-v11",
    "preview": "./packages/navigation-alphabet-jump-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "navigation-alphabet-jump-v11": "./downloads/matte-navigation-alphabet-jump-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "Letter shortcuts and keyboard navigation move through a local directory with a return point for the previous group. Copy the complete package and mount its .sl-component root. All content and navigation are local; connect application routes explicitly through onNavigate or sl-navigate."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "SLComponent.mount(root, { onNavigate(detail) }) and mountPreview(root) return reset(), destroy(), state and the methods below. jump(index) moves to one of four alphabetical groups and stores the previous inner scroll position. back() restores that position and letter focus. Scroll tracking updates the current group. state contains selected and previous (a copied return position or null). Arrow Left/Right and Home/End work from the letter navigation.",
          "reset() silently restores initial content, controls and ARIA state. destroy() removes all listeners and stops scrolling; later method calls do nothing. Remounting the same root destroys the previous controller. sl-navigate bubbles across Shadow DOM and supplies { kind, ...state }; onNavigate receives the same local navigation data. State arrays and objects are copied."
        ]
      },
      {
        "title": "Appearance",
        "paragraphs": [
          "Override --nav-surface, --nav-raised, --nav-text, --nav-muted, --nav-accent, --nav-accent-ink, --nav-border and --nav-focus on the root. Set --nav-color-scheme to light for a light native-control palette. Buttons use a single visible focus outline and selected text or markers in addition to color. Instrument Sans and original inline SVG are bundled. CSS transitions honor reduced motion; scroll-based components also react to preference changes while mounted."
        ]
      }
    ]
  },
  {
    "id": "matte-navigation-reference-return-v11",
    "category": "navigation",
    "name": "Reference jump and return",
    "description": "Inline references reveal their notes within the same reading pane and restore the exact source link on return.",
    "motions": [
      "Bounded scroll"
    ],
    "variants": [
      "navigation-reference-return-v11"
    ],
    "keywords": [
      "navigation",
      "reference",
      "return",
      "reference",
      "jump",
      "and",
      "return"
    ],
    "page": "./component.html?component=matte-navigation-reference-return-v11",
    "preview": "./packages/navigation-reference-return-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "navigation-reference-return-v11": "./downloads/matte-navigation-reference-return-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "Inline references reveal their notes within the same reading pane and restore the exact source link on return. Copy the complete package and mount its .sl-component root. All content and navigation are local; connect application routes explicitly through onNavigate or sl-navigate."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "SLComponent.mount(root, { onNavigate(detail) }) and mountPreview(root) return reset(), destroy(), state and the methods below. jump(sourceIndex) activates one of the three reference buttons; two distinct source buttons point to reference 1. back() restores that exact source button and its reading position. state contains selected note, sourceIndex and returnPosition (null outside reference navigation). The references are local explanatory content, not external citations.",
          "reset() silently restores initial content, controls and ARIA state. destroy() removes all listeners and stops scrolling; later method calls do nothing. Remounting the same root destroys the previous controller. sl-navigate bubbles across Shadow DOM and supplies { kind, ...state }; onNavigate receives the same local navigation data. State arrays and objects are copied."
        ]
      },
      {
        "title": "Appearance",
        "paragraphs": [
          "Override --nav-surface, --nav-raised, --nav-text, --nav-muted, --nav-accent, --nav-accent-ink, --nav-border and --nav-focus on the root. Set --nav-color-scheme to light for a light native-control palette. Buttons use a single visible focus outline and selected text or markers in addition to color. Instrument Sans and original inline SVG are bundled. CSS transitions honor reduced motion; scroll-based components also react to preference changes while mounted."
        ]
      }
    ]
  },
  {
    "id": "matte-navigation-reading-queue-v11",
    "category": "navigation",
    "name": "Reading queue navigator",
    "description": "Move through a reading queue, mark documents read or unread, and undo reading changes in sequence.",
    "motions": [
      "Soft selection"
    ],
    "variants": [
      "navigation-reading-queue-v11"
    ],
    "keywords": [
      "navigation",
      "reading",
      "queue",
      "reading",
      "queue",
      "navigator"
    ],
    "page": "./component.html?component=matte-navigation-reading-queue-v11",
    "preview": "./packages/navigation-reading-queue-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "navigation-reading-queue-v11": "./downloads/matte-navigation-reading-queue-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "Read & next marks the selected document read and opens the next unread document. For a read document the action becomes Mark unread. Undo reverses reading changes in sequence, even after visiting other documents. Copy the complete package and mount its .sl-component root. All content and navigation are local; connect application routes explicitly through onNavigate or sl-navigate."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "SLComponent.mount(root, { onNavigate(detail) }) and mountPreview(root) return reset(), destroy(), state and the methods below. navigate(index) opens a queued document. complete() marks an unread document read locally and moves to the next unread item, wrapping once; it returns false for an already-read document. markUnread() reverses the selected document's read status without navigating. undo() reverses the latest reading change, including selection and history, with up to twenty snapshots. Navigation does not clear this stack. back() returns to the prior document. state contains selected, read, trail, canUndo and undoCount. No read status is persisted or sent to a server.",
          "reset() silently restores initial content, controls and ARIA state. destroy() removes all listeners and stops scrolling; later method calls do nothing. Remounting the same root destroys the previous controller. sl-navigate bubbles across Shadow DOM and supplies { kind, ...state }; onNavigate receives the same local navigation data. State arrays and objects are copied."
        ]
      },
      {
        "title": "Appearance",
        "paragraphs": [
          "Override --nav-surface, --nav-raised, --nav-text, --nav-muted, --nav-accent, --nav-accent-ink, --nav-border and --nav-focus on the root. Set --nav-color-scheme to light for a light native-control palette. Buttons use a single visible focus outline and selected text or markers in addition to color. Instrument Sans and original inline SVG are bundled. CSS transitions honor reduced motion; scroll-based components also react to preference changes while mounted."
        ]
      }
    ]
  },
  {
    "id": "matte-navigation-spatial-map-v11",
    "category": "navigation",
    "name": "Spatial destination map",
    "description": "Navigate an original compact floor plan with spatial arrow keys and return through the visited rooms.",
    "motions": [
      "Soft room highlight"
    ],
    "variants": [
      "navigation-spatial-map-v11"
    ],
    "keywords": [
      "navigation",
      "spatial",
      "map",
      "spatial",
      "destination",
      "map"
    ],
    "page": "./component.html?component=matte-navigation-spatial-map-v11",
    "preview": "./packages/navigation-spatial-map-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "navigation-spatial-map-v11": "./downloads/matte-navigation-spatial-map-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "Navigate an original compact floor plan with spatial arrow keys and return through the visited rooms. Copy the complete package and mount its .sl-component root. All content and navigation are local; connect application routes explicitly through onNavigate or sl-navigate."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "SLComponent.mount(root, { onNavigate(detail) }) and mountPreview(root) return reset(), destroy(), state and the methods below. navigate(index) selects Entrance (0), Studio (1) or Library (2). back() returns through a bounded twenty-room visit history and restores room focus. Arrow keys follow adjacent rooms; Home and End select the entrance or library. state contains selected and a copied trail. This is a static schematic, not a live location service.",
          "reset() silently restores initial content, controls and ARIA state. destroy() removes all listeners and stops scrolling; later method calls do nothing. Remounting the same root destroys the previous controller. sl-navigate bubbles across Shadow DOM and supplies { kind, ...state }; onNavigate receives the same local navigation data. State arrays and objects are copied."
        ]
      },
      {
        "title": "Appearance",
        "paragraphs": [
          "Override --nav-surface, --nav-raised, --nav-text, --nav-muted, --nav-accent, --nav-accent-ink, --nav-border and --nav-focus on the root. Set --nav-color-scheme to light for a light native-control palette. Buttons use a single visible focus outline and selected text or markers in addition to color. Instrument Sans and original inline SVG are bundled. CSS transitions honor reduced motion; scroll-based components also react to preference changes while mounted."
        ]
      }
    ]
  }
];
