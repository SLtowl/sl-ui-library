// Local review batch: nine retained editors and five everyday website controls.
export default [
  {
    "id": "matte-sliders-loop-v11",
    "category": "sliders",
    "name": "Loop selection",
    "description": "Trim a loop to half-second boundaries or lock its duration and move the complete interval without crossing clip edges.",
    "motions": [
      "Immediate range tracking",
      "Soft press"
    ],
    "variants": [
      "sliders-loop-v11"
    ],
    "keywords": [
      "loop",
      "range",
      "keyboard"
    ],
    "page": "./component.html?component=matte-sliders-loop-v11",
    "preview": "./packages/sliders-loop-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "sliders-loop-v11": "./downloads/matte-sliders-loop-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "Copy the complete package and mount its .sl-component root. values are [start, end] in seconds, rounded to 0.5 s, within 0–120 s and at least 1 s apart. state.duration and state.locked report the interval. Lock length keeps duration fixed during user edits; setValues replaces the interval explicitly."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "SLComponent.mount(root, { values, disabled, onChange }) returns state, setValues(array), setDisabled(boolean), reset() and destroy(). Finite numeric arrays are rounded and clamped to the documented bounds. setValues and reset are silent; reset restores mount-time values, disabled state and default toggles. User edits invoke onChange(state) and emit sliderchange with a fresh state snapshot in event.detail; the event bubbles across Shadow DOM. mountPreview(root) runs the same local editor. Remounting the same root disposes its previous listeners. No external operation is simulated."
        ]
      },
      {
        "title": "Appearance",
        "paragraphs": [
          "Set --sl-ink, --sl-surface, --sl-edge, --sl-text, --sl-muted, --sl-accent, --sl-secondary, --sl-track and --sl-focus on the root. Native range controls support arrows, Home, End and Page Up/Down (ten steps). Labels announce real units through aria-valuetext. Tracks follow values immediately; button motion respects prefers-reduced-motion. All styles are scoped and the root shrinks to 226px."
        ]
      }
    ]
  },
  {
    "id": "matte-sliders-crossfade-v11",
    "category": "sliders",
    "name": "Source crossfade",
    "description": "Crossfade between two sources using linear or equal-power curves and inspect the resulting amplitude and decibel values.",
    "motions": [
      "Immediate range tracking",
      "Soft press"
    ],
    "variants": [
      "sliders-crossfade-v11"
    ],
    "keywords": [
      "crossfade",
      "range",
      "keyboard"
    ],
    "page": "./component.html?component=matte-sliders-crossfade-v11",
    "preview": "./packages/sliders-crossfade-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "sliders-crossfade-v11": "./downloads/matte-sliders-crossfade-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "Copy the complete package and mount its .sl-component root. values is [mixPercent], from 0 (source A) to 100 (source B). state.gains contains linear amplitude factors; state.equalPower selects sine/cosine or linear interpolation. Connect gains to your own audio graph."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "SLComponent.mount(root, { values, disabled, onChange }) returns state, setValues(array), setDisabled(boolean), reset() and destroy(). Finite numeric arrays are rounded and clamped to the documented bounds. setValues and reset are silent; reset restores mount-time values, disabled state and default toggles. User edits invoke onChange(state) and emit sliderchange with a fresh state snapshot in event.detail; the event bubbles across Shadow DOM. mountPreview(root) runs the same local editor. Remounting the same root disposes its previous listeners. No external operation is simulated."
        ]
      },
      {
        "title": "Appearance",
        "paragraphs": [
          "Set --sl-ink, --sl-surface, --sl-edge, --sl-text, --sl-muted, --sl-accent, --sl-secondary, --sl-track and --sl-focus on the root. Native range controls support arrows, Home, End and Page Up/Down (ten steps). Labels announce real units through aria-valuetext. Tracks follow values immediately; button motion respects prefers-reduced-motion. All styles are scoped and the root shrinks to 226px."
        ]
      }
    ]
  },
  {
    "id": "matte-sliders-gain-v11",
    "category": "sliders",
    "name": "Logarithmic gain",
    "description": "Adjust gain in 0.1 dB steps with its true logarithmic amplitude multiplier, a unity shortcut and reversible mute.",
    "motions": [
      "Immediate range tracking",
      "Soft press"
    ],
    "variants": [
      "sliders-gain-v11"
    ],
    "keywords": [
      "gain",
      "range",
      "keyboard"
    ],
    "page": "./component.html?component=matte-sliders-gain-v11",
    "preview": "./packages/sliders-gain-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "sliders-gain-v11": "./downloads/matte-sliders-gain-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "Copy the complete package and mount its .sl-component root. values is [gainDb], from −60 to +12 in 0.1 dB steps. state.amplitude is 10^(gainDb/20), or zero when state.muted is true. Mute preserves the chosen gain; no audio engine is included."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "SLComponent.mount(root, { values, disabled, onChange }) returns state, setValues(array), setDisabled(boolean), reset() and destroy(). Finite numeric arrays are rounded and clamped to the documented bounds. setValues and reset are silent; reset restores mount-time values, disabled state and default toggles. User edits invoke onChange(state) and emit sliderchange with a fresh state snapshot in event.detail; the event bubbles across Shadow DOM. mountPreview(root) runs the same local editor. Remounting the same root disposes its previous listeners. No external operation is simulated."
        ]
      },
      {
        "title": "Appearance",
        "paragraphs": [
          "Set --sl-ink, --sl-surface, --sl-edge, --sl-text, --sl-muted, --sl-accent, --sl-secondary, --sl-track and --sl-focus on the root. Native range controls support arrows, Home, End and Page Up/Down (ten steps). Labels announce real units through aria-valuetext. Tracks follow values immediately; button motion respects prefers-reduced-motion. All styles are scoped and the root shrinks to 226px."
        ]
      }
    ]
  },
  {
    "id": "matte-sliders-allocation-v11",
    "category": "sliders",
    "name": "Bounded allocation",
    "description": "Allocate design and engineering hours while reserving at least ten hours for each discipline and calculating QA from the remainder.",
    "motions": [
      "Immediate range tracking",
      "Soft press"
    ],
    "variants": [
      "sliders-allocation-v11"
    ],
    "keywords": [
      "allocation",
      "range",
      "keyboard"
    ],
    "page": "./component.html?component=matte-sliders-allocation-v11",
    "preview": "./packages/sliders-allocation-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "sliders-allocation-v11": "./downloads/matte-sliders-allocation-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "Copy the complete package and mount its .sl-component root. values is [designHours, engineeringHours] in 1-hour steps. Each discipline and the remaining QA allocation keep at least 10 hours. state.hours contains all three allocations and state.total is always 100."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "SLComponent.mount(root, { values, disabled, onChange }) returns state, setValues(array), setDisabled(boolean), reset() and destroy(). Finite numeric arrays are rounded and clamped to the documented bounds. setValues and reset are silent; reset restores mount-time values, disabled state and default toggles. User edits invoke onChange(state) and emit sliderchange with a fresh state snapshot in event.detail; the event bubbles across Shadow DOM. mountPreview(root) runs the same local editor. Remounting the same root disposes its previous listeners. No external operation is simulated."
        ]
      },
      {
        "title": "Appearance",
        "paragraphs": [
          "Set --sl-ink, --sl-surface, --sl-edge, --sl-text, --sl-muted, --sl-accent, --sl-secondary, --sl-track and --sl-focus on the root. Native range controls support arrows, Home, End and Page Up/Down (ten steps). Labels announce real units through aria-valuetext. Tracks follow values immediately; button motion respects prefers-reduced-motion. All styles are scoped and the root shrinks to 226px."
        ]
      }
    ]
  },
  {
    "id": "matte-sliders-gradient-stops-v11",
    "category": "sliders",
    "name": "Gradient stops",
    "description": "Position shade, sage and light stops on a real CSS gradient while preserving their order and a five-percent minimum gap.",
    "motions": [
      "Immediate range tracking",
      "Soft press"
    ],
    "variants": [
      "sliders-gradient-stops-v11"
    ],
    "keywords": [
      "gradient",
      "stops",
      "range",
      "keyboard"
    ],
    "page": "./component.html?component=matte-sliders-gradient-stops-v11",
    "preview": "./packages/sliders-gradient-stops-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "sliders-gradient-stops-v11": "./downloads/matte-sliders-gradient-stops-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "Copy the complete package and mount its .sl-component root. values contains the three ordered percentages. Stops retain a 5% gap. state.gradient is a CSS linear-gradient referencing --sl-stop-shade, --sl-stop-sage and --sl-stop-light; define the same variables wherever the gradient is used."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "SLComponent.mount(root, { values, disabled, onChange }) returns state, setValues(array), setDisabled(boolean), reset() and destroy(). Finite numeric arrays are rounded and clamped to the documented bounds. setValues and reset are silent; reset restores mount-time values, disabled state and default toggles. User edits invoke onChange(state) and emit sliderchange with a fresh state snapshot in event.detail; the event bubbles across Shadow DOM. mountPreview(root) runs the same local editor. Remounting the same root disposes its previous listeners. No external operation is simulated."
        ]
      },
      {
        "title": "Appearance",
        "paragraphs": [
          "Set --sl-ink, --sl-surface, --sl-edge, --sl-text, --sl-muted, --sl-accent, --sl-secondary, --sl-track and --sl-focus on the root. The gradient also uses --sl-stop-shade, --sl-stop-sage and --sl-stop-light. Native range controls support arrows, Home, End and Page Up/Down (ten steps). Labels announce real units through aria-valuetext. Tracks follow values immediately; button motion respects prefers-reduced-motion. All styles are scoped and the root shrinks to 226px."
        ]
      }
    ]
  },
  {
    "id": "matte-sliders-frequency-band-v11",
    "category": "sliders",
    "name": "Log frequency band",
    "description": "Select frequency cutoffs on a logarithmic scale with a constant ratio per step and display the band width in octaves.",
    "motions": [
      "Immediate range tracking",
      "Soft press"
    ],
    "variants": [
      "sliders-frequency-band-v11"
    ],
    "keywords": [
      "frequency",
      "band",
      "range",
      "keyboard"
    ],
    "page": "./component.html?component=matte-sliders-frequency-band-v11",
    "preview": "./packages/sliders-frequency-band-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "sliders-frequency-band-v11": "./downloads/matte-sliders-frequency-band-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "Copy the complete package and mount its .sl-component root. values contains logarithmic positions 0–120, in steps of 1. Frequency in Hz is 20 × 1000^(position/120); state.frequenciesHz exposes unrounded frequencies and state.octaves the interval. Native accessible value text always announces Hz. Cutoffs retain one logarithmic step of separation."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "SLComponent.mount(root, { values, disabled, onChange }) returns state, setValues(array), setDisabled(boolean), reset() and destroy(). Finite numeric arrays are rounded and clamped to the documented bounds. setValues and reset are silent; reset restores mount-time values, disabled state and default toggles. User edits invoke onChange(state) and emit sliderchange with a fresh state snapshot in event.detail; the event bubbles across Shadow DOM. mountPreview(root) runs the same local editor. Remounting the same root disposes its previous listeners. No external operation is simulated."
        ]
      },
      {
        "title": "Appearance",
        "paragraphs": [
          "Set --sl-ink, --sl-surface, --sl-edge, --sl-text, --sl-muted, --sl-accent, --sl-secondary, --sl-track and --sl-focus on the root. Native range controls support arrows, Home, End and Page Up/Down (ten steps). Labels announce real units through aria-valuetext. Tracks follow values immediately; button motion respects prefers-reduced-motion. All styles are scoped and the root shrinks to 226px."
        ]
      }
    ]
  },
  {
    "id": "matte-sliders-envelope-v11",
    "category": "sliders",
    "name": "ADSR envelope",
    "description": "Edit attack, decay, sustain and release with a proportionally scaled envelope graph and two reversible sound-shape presets.",
    "motions": [
      "Immediate range tracking",
      "Soft press"
    ],
    "variants": [
      "sliders-envelope-v11"
    ],
    "keywords": [
      "envelope",
      "range",
      "keyboard"
    ],
    "page": "./component.html?component=matte-sliders-envelope-v11",
    "preview": "./packages/sliders-envelope-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "sliders-envelope-v11": "./downloads/matte-sliders-envelope-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "Copy the complete package and mount its .sl-component root. values is [attackMs, decayMs, sustainPercent, releaseMs]. Time stages step by 10 ms. state.sustain is the 0–1 amplitude. The graph includes a fixed, explicitly labelled 500 ms hold; no audio or playback timer is included."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "SLComponent.mount(root, { values, disabled, onChange }) returns state, setValues(array), setDisabled(boolean), reset() and destroy(). Finite numeric arrays are rounded and clamped to the documented bounds. setValues and reset are silent; reset restores mount-time values, disabled state and default toggles. User edits invoke onChange(state) and emit sliderchange with a fresh state snapshot in event.detail; the event bubbles across Shadow DOM. mountPreview(root) runs the same local editor. Remounting the same root disposes its previous listeners. No external operation is simulated."
        ]
      },
      {
        "title": "Appearance",
        "paragraphs": [
          "Set --sl-ink, --sl-surface, --sl-edge, --sl-text, --sl-muted, --sl-accent, --sl-secondary, --sl-track and --sl-focus on the root. Native range controls support arrows, Home, End and Page Up/Down (ten steps). Labels announce real units through aria-valuetext. Tracks follow values immediately; button motion respects prefers-reduced-motion. All styles are scoped and the root shrinks to 226px."
        ]
      }
    ]
  },
  {
    "id": "matte-sliders-dead-zone-v11",
    "category": "sliders",
    "name": "Axis dead zone",
    "description": "Calibrate inner dead zone and outer saturation, then test the signed input against the rescaled output response.",
    "motions": [
      "Immediate range tracking",
      "Soft press"
    ],
    "variants": [
      "sliders-dead-zone-v11"
    ],
    "keywords": [
      "dead",
      "zone",
      "range",
      "keyboard"
    ],
    "page": "./component.html?component=matte-sliders-dead-zone-v11",
    "preview": "./packages/sliders-dead-zone-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "sliders-dead-zone-v11": "./downloads/matte-sliders-dead-zone-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "Copy the complete package and mount its .sl-component root. values is [innerPercent, outerPercent, signedTestPercent]. Inner is 0–40%, outer 60–100%, test −100–100%. state.response is signed output from −1 to 1 after dead-zone removal and rescaling; integration with a device is application-owned."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "SLComponent.mount(root, { values, disabled, onChange }) returns state, setValues(array), setDisabled(boolean), reset() and destroy(). Finite numeric arrays are rounded and clamped to the documented bounds. setValues and reset are silent; reset restores mount-time values, disabled state and default toggles. User edits invoke onChange(state) and emit sliderchange with a fresh state snapshot in event.detail; the event bubbles across Shadow DOM. mountPreview(root) runs the same local editor. Remounting the same root disposes its previous listeners. No external operation is simulated."
        ]
      },
      {
        "title": "Appearance",
        "paragraphs": [
          "Set --sl-ink, --sl-surface, --sl-edge, --sl-text, --sl-muted, --sl-accent, --sl-secondary, --sl-track and --sl-focus on the root. Native range controls support arrows, Home, End and Page Up/Down (ten steps). Labels announce real units through aria-valuetext. Tracks follow values immediately; button motion respects prefers-reduced-motion. All styles are scoped and the root shrinks to 226px."
        ]
      }
    ]
  },
  {
    "id": "matte-sliders-tolerance-v11",
    "category": "sliders",
    "name": "Symmetric tolerance",
    "description": "Set a nominal measurement and symmetric tolerance, then compare a sample with the accepted band and its signed deviation.",
    "motions": [
      "Immediate range tracking",
      "Soft press"
    ],
    "variants": [
      "sliders-tolerance-v11"
    ],
    "keywords": [
      "tolerance",
      "range",
      "keyboard"
    ],
    "page": "./component.html?component=matte-sliders-tolerance-v11",
    "preview": "./packages/sliders-tolerance-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "sliders-tolerance-v11": "./downloads/matte-sliders-tolerance-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "Copy the complete package and mount its .sl-component root. values is [nominalMm, toleranceMm, sampleMm] in 0.1 mm steps. User edits preserve the tolerance while clamping the nominal; setValues clamps the requested tolerance to the new nominal. state.lower, upper, deviation and accepted describe the inclusive test."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "SLComponent.mount(root, { values, disabled, onChange }) returns state, setValues(array), setDisabled(boolean), reset() and destroy(). Finite numeric arrays are rounded and clamped to the documented bounds. setValues and reset are silent; reset restores mount-time values, disabled state and default toggles. User edits invoke onChange(state) and emit sliderchange with a fresh state snapshot in event.detail; the event bubbles across Shadow DOM. mountPreview(root) runs the same local editor. Remounting the same root disposes its previous listeners. No external operation is simulated."
        ]
      },
      {
        "title": "Appearance",
        "paragraphs": [
          "Set --sl-ink, --sl-surface, --sl-edge, --sl-text, --sl-muted, --sl-accent, --sl-secondary, --sl-track and --sl-focus on the root. Native range controls support arrows, Home, End and Page Up/Down (ten steps). Labels announce real units through aria-valuetext. Tracks follow values immediately; button motion respects prefers-reduced-motion. All styles are scoped and the root shrinks to 226px."
        ]
      }
    ]
  },
  {
    "id": "matte-sliders-quantity-v11",
    "category": "sliders",
    "name": "Cart quantity",
    "description": "Choose 1–20 items, adjust one at a time and see the example subtotal update.",
    "motions": [
      "Immediate range tracking",
      "Soft press"
    ],
    "variants": [
      "sliders-quantity-v11"
    ],
    "keywords": [
      "quantity",
      "cart",
      "quantity",
      "website",
      "settings"
    ],
    "page": "./component.html?component=matte-sliders-quantity-v11",
    "preview": "./packages/sliders-quantity-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "sliders-quantity-v11": "./downloads/matte-sliders-quantity-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "values is [quantity], an integer from 1 to 20. state.quantity mirrors it; state.unitPriceCents is the fixed demonstration price 1200 and subtotalCents is quantity × 1200, currency USD. Use your own prices and real checkout separately. No order is submitted."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "SLComponent.mount(root, { values, disabled, onChange }) returns state, setValues(array), setDisabled(boolean), reset() and destroy(). Finite numeric arrays are rounded and clamped to the documented bounds. setValues and reset are silent; reset restores mount-time values, disabled state and default toggles. User edits invoke onChange(state) and emit sliderchange with a fresh state snapshot in event.detail; the event bubbles across Shadow DOM. mountPreview(root) runs the same local editor. Remounting the same root disposes its previous listeners. No external operation is simulated."
        ]
      },
      {
        "title": "Appearance",
        "paragraphs": [
          "Set --sl-ink, --sl-surface, --sl-edge, --sl-text, --sl-muted, --sl-accent, --sl-secondary, --sl-track and --sl-focus on the root. Native range controls support arrows, Home, End and Page Up/Down (ten steps). Labels announce real units through aria-valuetext. Tracks follow values immediately; button motion respects prefers-reduced-motion. All styles are scoped and the root shrinks to 226px."
        ]
      }
    ]
  },
  {
    "id": "matte-sliders-line-height-v11",
    "category": "sliders",
    "name": "Reading spacing",
    "description": "Adjust paragraph line spacing with an immediately updated reading sample and a default shortcut.",
    "motions": [
      "Immediate range tracking",
      "Soft press"
    ],
    "variants": [
      "sliders-line-height-v11"
    ],
    "keywords": [
      "line-height",
      "reading",
      "spacing",
      "website",
      "settings"
    ],
    "page": "./component.html?component=matte-sliders-line-height-v11",
    "preview": "./packages/sliders-line-height-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "sliders-line-height-v11": "./downloads/matte-sliders-line-height-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "values is [lineHeight], a unitless CSS line-height from 1.2 to 2 in 0.1 steps. state.lineHeight is directly usable on the target paragraph; typography outside this component is not changed. The paragraph is ordinary text, not an image."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "SLComponent.mount(root, { values, disabled, onChange }) returns state, setValues(array), setDisabled(boolean), reset() and destroy(). Finite numeric arrays are rounded and clamped to the documented bounds. setValues and reset are silent; reset restores mount-time values, disabled state and default toggles. User edits invoke onChange(state) and emit sliderchange with a fresh state snapshot in event.detail; the event bubbles across Shadow DOM. mountPreview(root) runs the same local editor. Remounting the same root disposes its previous listeners. No external operation is simulated."
        ]
      },
      {
        "title": "Appearance",
        "paragraphs": [
          "Set --sl-ink, --sl-surface, --sl-edge, --sl-text, --sl-muted, --sl-accent, --sl-secondary, --sl-track and --sl-focus on the root. Native range controls support arrows, Home, End and Page Up/Down (ten steps). Labels announce real units through aria-valuetext. Tracks follow values immediately; button motion respects prefers-reduced-motion. All styles are scoped and the root shrinks to 226px."
        ]
      }
    ]
  },
  {
    "id": "matte-sliders-content-width-v11",
    "category": "sliders",
    "name": "Content width",
    "description": "Set a centered content column to 50–100% of its container and preview actual text reflow.",
    "motions": [
      "Immediate range tracking",
      "Soft press"
    ],
    "variants": [
      "sliders-content-width-v11"
    ],
    "keywords": [
      "content-width",
      "content",
      "width",
      "website",
      "settings"
    ],
    "page": "./component.html?component=matte-sliders-content-width-v11",
    "preview": "./packages/sliders-content-width-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "sliders-content-width-v11": "./downloads/matte-sliders-content-width-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "values is [widthPercent], 50–100 in steps of 5. state.widthCss is a percentage width for a centered column in its own parent. The demo changes an actual text column without changing font size. Apply margin-inline:auto to your target column."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "SLComponent.mount(root, { values, disabled, onChange }) returns state, setValues(array), setDisabled(boolean), reset() and destroy(). Finite numeric arrays are rounded and clamped to the documented bounds. setValues and reset are silent; reset restores mount-time values, disabled state and default toggles. User edits invoke onChange(state) and emit sliderchange with a fresh state snapshot in event.detail; the event bubbles across Shadow DOM. mountPreview(root) runs the same local editor. Remounting the same root disposes its previous listeners. No external operation is simulated."
        ]
      },
      {
        "title": "Appearance",
        "paragraphs": [
          "Set --sl-ink, --sl-surface, --sl-edge, --sl-text, --sl-muted, --sl-accent, --sl-secondary, --sl-track and --sl-focus on the root. Native range controls support arrows, Home, End and Page Up/Down (ten steps). Labels announce real units through aria-valuetext. Tracks follow values immediately; button motion respects prefers-reduced-motion. All styles are scoped and the root shrinks to 226px."
        ]
      }
    ]
  },
  {
    "id": "matte-sliders-card-gap-v11",
    "category": "sliders",
    "name": "Card spacing",
    "description": "Adjust the exact pixel gap between list cards without changing their content or size.",
    "motions": [
      "Immediate range tracking",
      "Soft press"
    ],
    "variants": [
      "sliders-card-gap-v11"
    ],
    "keywords": [
      "card-gap",
      "card",
      "spacing",
      "website",
      "settings"
    ],
    "page": "./component.html?component=matte-sliders-card-gap-v11",
    "preview": "./packages/sliders-card-gap-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "sliders-card-gap-v11": "./downloads/matte-sliders-card-gap-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "values is [gapPx], from 4 to 24 in steps of 2. state.gapCss is a CSS gap value for a grid or flex container. Each preview card keeps its own padding and font size; only space between cards changes."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "SLComponent.mount(root, { values, disabled, onChange }) returns state, setValues(array), setDisabled(boolean), reset() and destroy(). Finite numeric arrays are rounded and clamped to the documented bounds. setValues and reset are silent; reset restores mount-time values, disabled state and default toggles. User edits invoke onChange(state) and emit sliderchange with a fresh state snapshot in event.detail; the event bubbles across Shadow DOM. mountPreview(root) runs the same local editor. Remounting the same root disposes its previous listeners. No external operation is simulated."
        ]
      },
      {
        "title": "Appearance",
        "paragraphs": [
          "Set --sl-ink, --sl-surface, --sl-edge, --sl-text, --sl-muted, --sl-accent, --sl-secondary, --sl-track and --sl-focus on the root. Native range controls support arrows, Home, End and Page Up/Down (ten steps). Labels announce real units through aria-valuetext. Tracks follow values immediately; button motion respects prefers-reduced-motion. All styles are scoped and the root shrinks to 226px."
        ]
      }
    ]
  },
  {
    "id": "matte-sliders-thumbnails-v11",
    "category": "sliders",
    "name": "Thumbnail size",
    "description": "Resize six gallery thumbnails in pixels while preserving their aspect ratio and wrapping them inside the container.",
    "motions": [
      "Immediate range tracking",
      "Soft press"
    ],
    "variants": [
      "sliders-thumbnails-v11"
    ],
    "keywords": [
      "thumbnails",
      "thumbnail",
      "size",
      "website",
      "settings"
    ],
    "page": "./component.html?component=matte-sliders-thumbnails-v11",
    "preview": "./packages/sliders-thumbnails-v11/index.html?embed=1",
    "packageRoot": "./packages/",
    "downloads": {
      "sliders-thumbnails-v11": "./downloads/matte-sliders-thumbnails-v11.zip"
    },
    "usage": [
      {
        "title": "Use the component",
        "paragraphs": [
          "values is [thumbnailPx], from 48 to 88 in steps of 4. state.thumbnailCss is a CSS width. The local gallery keeps a 4:3 aspect ratio and wraps using flexbox; the sample illustrations are inline SVG. Replace them with your own images and meaningful alt text."
        ]
      },
      {
        "title": "Controller",
        "paragraphs": [
          "SLComponent.mount(root, { values, disabled, onChange }) returns state, setValues(array), setDisabled(boolean), reset() and destroy(). Finite numeric arrays are rounded and clamped to the documented bounds. setValues and reset are silent; reset restores mount-time values, disabled state and default toggles. User edits invoke onChange(state) and emit sliderchange with a fresh state snapshot in event.detail; the event bubbles across Shadow DOM. mountPreview(root) runs the same local editor. Remounting the same root disposes its previous listeners. No external operation is simulated."
        ]
      },
      {
        "title": "Appearance",
        "paragraphs": [
          "Set --sl-ink, --sl-surface, --sl-edge, --sl-text, --sl-muted, --sl-accent, --sl-secondary, --sl-track and --sl-focus on the root. Native range controls support arrows, Home, End and Page Up/Down (ten steps). Labels announce real units through aria-valuetext. Tracks follow values immediately; button motion respects prefers-reduced-motion. All styles are scoped and the root shrinks to 226px."
        ]
      }
    ]
  }
];
