# Toggles — second batch

Status: owner-approved on 2026-09-18 and integrated into the shared catalog for the static release.

| Component | Package | Interaction |
| --- | --- | --- |
| Line wrap | selection-line-wrap-v11 | Boolean switch with switch travel and line reflow. |
| Sticky header | selection-sticky-header-v11 | Boolean switch with switch travel and header docking. |
| Grid overlay | selection-grid-overlay-v11 | Boolean switch with switch travel and grid reveal. |
| Hide balances | selection-hide-balances-v11 | Boolean switch with switch travel and value mask. |
| Link previews | selection-link-previews-v11 | Boolean switch with switch travel and preview expansion. |
| Completed items | selection-completed-items-v11 | Boolean switch with switch travel and row collapse. |
| Autoplay previews | selection-autoplay-previews-v11 | Boolean switch with switch travel and playback cue. |
| Text direction | selection-text-direction-v11 | Two-way radio segment with segment selection and text realignment. |
| Link destination | selection-link-target-v11 | Two-way radio segment with segment selection and tab reveal. |
| Sidebar labels | selection-sidebar-labels-v11 | Two-way radio segment with segment selection and sidebar expansion. |

All ten packages are self-contained, English-only public exports. Each controller exposes mount/mountPreview, setState, reset, destroy and a copied state getter. Demo interactions only update local preview state. Keyboard focus, radio arrow navigation, reduced motion and forced colors are supported.
