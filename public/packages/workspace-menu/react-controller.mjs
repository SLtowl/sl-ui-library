import{retainFont as X}from"./react-font.mjs";const T="workspace-menu";const F='<div class="menu-demo menu-study" data-menu="workspace" data-motion="rise"><button type="button" class="menu-trigger" data-trigger aria-expanded="false" aria-haspopup="menu" aria-controls="study-workspace"><i class="menu-glyph " data-icon="folder" aria-hidden="true"><svg viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg" focusable="false" aria-hidden="true"><path d="M4.5 9a2 2 0 0 1 2-2h5l2.5 3h7.5a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-15a2 2 0 0 1-2-2Z"/></svg></i><span class="menu-trigger-label" data-trigger-label>Studio workspace</span><i class="menu-glyph menu-chevron" data-icon="chevron" aria-hidden="true"><svg viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg" focusable="false" aria-hidden="true"><path d="m8 11 6 6 6-6"/></svg></i></button><div class="menu-panel" id="study-workspace" role="menu" aria-label="Workspace switcher" aria-hidden="true" inert><div class="menu-overline">YOUR SPACES</div><button type="button" class="menu-item" data-value="studio" data-label="Studio workspace" role="menuitemradio" aria-checked="true" tabindex="-1" ><i class="menu-glyph " data-icon="folder" aria-hidden="true"><svg viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg" focusable="false" aria-hidden="true"><path d="M4.5 9a2 2 0 0 1 2-2h5l2.5 3h7.5a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-15a2 2 0 0 1-2-2Z"/></svg></i><span class="choice-copy"><strong>Studio workspace</strong><small>Design and prototyping</small></span><i class="menu-glyph menu-check" data-icon="check" aria-hidden="true"><svg viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg" focusable="false" aria-hidden="true"><path d="m5 14 6 6L23 8"/></svg></i></button><button type="button" class="menu-item" data-value="personal" data-label="Personal space" role="menuitemradio" aria-checked="false" tabindex="-1" ><i class="menu-glyph " data-icon="folder" aria-hidden="true"><svg viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg" focusable="false" aria-hidden="true"><path d="M4.5 9a2 2 0 0 1 2-2h5l2.5 3h7.5a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-15a2 2 0 0 1-2-2Z"/></svg></i><span class="choice-copy"><strong>Personal space</strong><small>Your private projects</small></span><i class="menu-glyph menu-check" data-icon="check" aria-hidden="true"><svg viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg" focusable="false" aria-hidden="true"><path d="m5 14 6 6L23 8"/></svg></i></button><button type="button" class="menu-item" data-value="shared" data-label="Shared projects" role="menuitemradio" aria-checked="false" tabindex="-1" ><i class="menu-glyph " data-icon="copy" aria-hidden="true"><svg viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg" focusable="false" aria-hidden="true"><rect x="5" y="8" width="13" height="16" rx="2.5"/><path d="M10 8V6.5A2.5 2.5 0 0 1 12.5 4h8A2.5 2.5 0 0 1 23 6.5v11a2.5 2.5 0 0 1-2.5 2.5H18"/></svg></i><span class="choice-copy"><strong>Shared projects</strong><small>Work together</small></span><i class="menu-glyph menu-check" data-icon="check" aria-hidden="true"><svg viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg" focusable="false" aria-hidden="true"><path d="m5 14 6 6L23 8"/></svg></i></button></div><p class="menu-feedback" data-feedback role="status" aria-live="polite">Choose a workspace. This preview stays on the page.</p></div>';const V=`@font-face{font-family:'Instrument Sans';src:url('./instrument-sans-variable.woff2') format('woff2');font-weight:400 700;font-display:swap}
.menu-demo {
  --menu-ink: #222222; --menu-panel: #282828; --menu-text: #efefef; --menu-muted: #b5b5b5;
  --menu-ease: cubic-bezier(.22,.61,.36,1);
  position: relative; width: min(288px,100%); height: 326px; padding-top: 24px;
  color: var(--menu-text); font-family: 'Instrument Sans',sans-serif; text-align: left;
}
.menu-demo, .menu-demo * { box-sizing: border-box; }
.menu-demo button, .menu-demo input { font: inherit; }
.menu-demo button { cursor: pointer; }
.menu-demo svg { width: 20px; height: 20px; flex: none; fill: none; stroke: currentColor; stroke-width: 1.4; stroke-linecap: round; stroke-linejoin: round; }
.menu-trigger { display: flex; align-items: center; gap: 12px; width: 100%; min-height: 52px; padding: 14px 16px; border: 1px solid #ffffff10; border-radius: 14px; background: var(--menu-ink); color: var(--menu-text); box-shadow: inset 0 1px #ffffff0c,0 2px 4px #0001; transition: background-color 180ms ease; }
.menu-trigger { transition: background-color 180ms ease,border-radius 280ms var(--menu-ease),border-color 220ms ease; }
.menu-trigger:hover { background: #2e2e2e; }
.menu-trigger-label { flex: 1; text-align: left; font-size: 14px; }
.menu-chevron { width: 16px !important; height: 16px !important; color: var(--menu-muted); transition: transform 240ms var(--menu-ease); }
[data-open="true"] .menu-chevron { transform: rotate(180deg); }
.menu-panel { position: absolute; top: 86px; left: 0; width: 100%; padding: 7px; border: 1px solid #ffffff13; border-radius: 16px; background: var(--menu-panel); box-shadow: 0 8px 20px #0002,inset 0 1px #ffffff08; opacity: 0; visibility: hidden; transform: translateY(-6px) scale(.985); transform-origin: top center; pointer-events: none; transition: opacity 170ms ease,transform 240ms var(--menu-ease),visibility 0s 240ms; }
[data-open="true"] .menu-panel { opacity: 1; visibility: visible; transform: none; pointer-events: auto; transition-delay: 0s; }
.menu-overline { padding: 8px 10px 10px; color: var(--menu-muted); font-size: 11px; letter-spacing: .025em; }
.menu-item { display: flex; align-items: center; gap: 10px; width: 100%; min-height: 39px; padding: 9px 10px; border: 0; border-radius: 9px; background: transparent; color: var(--menu-text); text-align: left; font-size: 13px !important; transition: background-color 160ms ease; }
.menu-item:hover, .menu-item:focus-visible { background: #ffffff0a; }
.menu-item > span:not(.menu-dot) { flex: 1; }
.menu-item svg { color: #c7c7c7; width: 18px; height: 18px; }
.menu-rule { height: 1px; margin: 5px 9px; background: #ffffff12; }
.menu-check { opacity: 0; transition: opacity 180ms ease; }
[aria-checked="true"] .menu-check { opacity: 1; }
[aria-checked="true"] { color: #f6f6f6; }
.menu-hint { margin: 16px 4px 0; color: #606060; font-size: 12px; line-height: 1.5; }
.menu-feedback { position: absolute; bottom: 0; left: 4px; right: 4px; margin: 0; min-height: 18px; color: #505050; font-size: 12px; line-height: 1.5; }
[data-open="true"] .menu-feedback { visibility: hidden; }
.menu-trigger kbd { font: 11px 'Instrument Sans',sans-serif; padding: 3px 7px; border: 1px solid #ffffff22; border-radius: 5px; color: var(--menu-muted); }
.menu-badge { display: grid; place-items: center; min-width: 22px; height: 22px; padding-inline: 5px; border-radius: 7px; background: #ffffff13; color: #eaeaea; font-size: 11px; font-variant-numeric: tabular-nums; }
.menu-dot { width: 8px; height: 8px; border-radius: 50%; background: #d2d2d2; box-shadow: 0 0 0 4px #ffffff06; margin: 0 6px 0 4px; }
.menu-item:nth-of-type(2) .menu-dot { background: #b3b3b3; }
.menu-item:nth-of-type(3) .menu-dot { background: #8f8f8f; }
.menu-done { justify-content: center; background: #e9e9e9; color: #222222; margin-top: 4px; min-height: 34px; }
.menu-done:hover, .menu-done:focus-visible { background: #f4f4f4; }
.context-target { display: flex; align-items: center; gap: 12px; padding: 20px 14px; background: var(--menu-ink); border: 1px solid #ffffff10; border-radius: 15px; }
.context-target > svg { width: 28px; height: 32px; color: #cfcfcf; }
.context-title { flex: 1; min-width: 0; }
.context-title strong { font-size: 14px; font-weight: 500; display: block; }
.context-title small { display: block; margin-top: 5px; color: var(--menu-muted); font-size: 11px; }
.context-target .menu-trigger { width: 32px; min-height: 32px; padding: 6px; border: 0; border-radius: 8px; box-shadow: none; }
[data-menu="context"] .menu-panel { width: min(232px,100%); top: var(--menu-y,116px); left: clamp(0px,var(--menu-x,28px),max(0px,calc(100% - 232px))); }
.menu-search { display: flex; align-items: center; gap: 9px; margin: 3px 4px 7px; padding: 8px 6px 11px; border-bottom: 1px solid #ffffff15; color: #b6b6b6; }
.menu-search svg { width: 18px; height: 18px; }
.menu-search input { width: 100%; min-width: 0; padding: 0; border: 0; outline: 0; color: var(--menu-text); background: transparent; font-size: 13px; }
.menu-search:focus-within { border-bottom-color: #b1b1b1; }
.menu-search input::placeholder { color: #b6b6b6; opacity: 1; }
.command-list { max-height: 144px; overflow: auto; scrollbar-width: thin; scrollbar-color: #757575 transparent; }
.command-list .menu-item { min-height: 36px; padding-block: 7px; }
.command-empty { margin: 0; padding: 18px 10px; color: var(--menu-muted); font-size: 12px; }
.command-foot { margin: 4px 5px 0; padding: 6px 4px 2px; color: #b0b0b0; font-size: 10px; line-height: 14px; border-top: 1px solid #ffffff10; }
.menu-demo button:focus-visible { outline: 2px solid #b9b9b9; outline-offset: 2px; }
.menu-demo [hidden] { display: none !important; }
.menu-review .toggle-stage { min-height: 402px; }
.menu-review .toggle-heading h2 { font-size: 21px; }
/* Each menu has its own opening structure, rather than one shared popover. */
/* Actions: a translated sheet passes under the fixed trigger.
   The clipping window and all corner radii remain static during motion. */
.action-surface { border-radius: 14px; isolation: isolate; }
.action-reveal { overflow: hidden; border-radius: 0 0 14px 14px; margin-top: -14px; }
[data-menu="actions"] .menu-trigger { position: relative; z-index: 1; height: 52px; border-radius: 14px; border-bottom-color: transparent; box-shadow: inset 0 1px #ffffff0c; transition: background-color 180ms ease; }
[data-menu="actions"] .menu-trigger:focus-visible { outline: none; }
[data-menu="actions"] .menu-trigger:focus-visible::after { content: ""; position: absolute; inset: 3px; border: 2px solid #b9b9b9; border-radius: 11px; pointer-events: none; }
[data-menu="actions"] .menu-panel { position: relative; top: auto; padding-top: 21px; border-top: 0; border-radius: 0 0 14px 14px; background: var(--menu-ink); box-shadow: none; transform: translateY(-100%); opacity: 1; visibility: hidden; transition: transform 280ms var(--menu-ease),visibility 0s 280ms; }
[data-menu="actions"][data-open="true"] .menu-panel { transform: none; visibility: visible; transition-delay: 0s; }
/* Sort: a small separate sheet rises into place. */
[data-menu="sort"] .menu-panel { transform: translateY(16px); transition: transform 280ms var(--menu-ease),opacity 200ms ease,visibility 0s 280ms; }
[data-menu="sort"][data-open="true"] .menu-panel { transform: none; transition-delay: 0s; }
/* Labels: stationary surface, with choices entering left to right in sequence. */
[data-menu="labels"] .menu-panel { transform: none; transition: opacity 180ms ease,visibility 0s 280ms; }
[data-menu="labels"][data-open="true"] .menu-panel { transition-delay: 0s; }
[data-menu="labels"] .menu-item { opacity: 0; transform: translateX(-12px); transition: transform 280ms var(--menu-ease),opacity 180ms ease,background-color 160ms ease; }
[data-menu="labels"][data-open="true"] .menu-item { opacity: 1; transform: none; }
[data-menu="labels"][data-open="true"] .menu-item:nth-of-type(2) { transition-delay: 35ms,35ms,0s; }
[data-menu="labels"][data-open="true"] .menu-item:nth-of-type(3) { transition-delay: 70ms,70ms,0s; }
[data-menu="labels"][data-open="true"] .menu-done { transition-delay: 100ms,100ms,0s; }
/* Context: expands from the point where the user opened it. */
[data-menu="context"] .menu-panel { transform: scale(.82); transform-origin: var(--origin-x,85%) 0; transition: transform 270ms var(--menu-ease),opacity 160ms ease,visibility 0s 270ms; }
[data-menu="context"][data-open="true"] .menu-panel { transform: none; transition-delay: 0s; }
/* Commands: trigger and search expand as one connected container. */
[data-menu="commands"][data-open="true"] .menu-trigger { border-radius: 14px 14px 0 0; border-bottom-color: transparent; box-shadow: inset 0 1px #ffffff0c; }
[data-menu="commands"] .menu-panel { display: grid; grid-template-rows: 0fr; top: 75px; padding: 0; border-top: 0; border-radius: 0 0 14px 14px; background: var(--menu-ink); transform: none; transition: grid-template-rows 340ms var(--menu-ease),opacity 200ms ease,visibility 0s 340ms; }
[data-menu="commands"][data-open="true"] .menu-panel { grid-template-rows: 1fr; transition-delay: 0s; }
.command-body { min-height: 0; overflow: hidden; }
.command-content { padding: 7px; }
/* Inline project-owned contours: no bitmap decoding, masks or backdrop blending. */
.menu-glyph { display: inline-flex; flex: 0 0 auto; width: 28px; height: 28px; align-items: center; justify-content: center; vertical-align: middle; pointer-events: none; }
.menu-glyph > svg { display: block; width: 100%; height: 100%; flex: none; fill: none; stroke: currentColor; stroke-width: 1.5; stroke-linecap: round; stroke-linejoin: round; overflow: visible; }
.menu-item .menu-glyph { width: 24px; height: 24px; margin-block: -3px; }
.menu-trigger .menu-glyph:not(.menu-chevron) { margin-block: -3px; }
.menu-glyph.menu-chevron { width: 20px !important; height: 20px !important; }
.menu-glyph.menu-check { transition: opacity 160ms ease; }
.context-target > .menu-glyph { width: 36px; height: 36px; }
.context-target .menu-trigger .menu-glyph { width: 22px; height: 22px; }
.menu-search .menu-glyph { width: 24px; height: 24px; margin-block: -3px; }
.menu-review .toggle-reset .menu-glyph { width: 27px; height: 27px; }
.menu-review .navigation .menu-glyph { width: 22px; height: 22px; }
@media(prefers-reduced-motion:reduce) { .menu-demo *, .menu-demo *::before, .menu-demo *::after { transition: none !important; } }
@media(forced-colors:active) { .menu-trigger,.menu-panel,.context-target { border: 1px solid CanvasText; } .menu-item[aria-checked="true"] { outline: 1px solid Highlight; } }

.menu-study { height: 366px; --study-ease: cubic-bezier(.22,.61,.36,1); }
.menu-review:has(.menu-study) .toggle-stage { min-height: 440px; }
.menu-study .menu-trigger-label { font-size: 14px; }
.menu-study .menu-panel { z-index: 2; }
.choice-copy strong { display: block; font-weight: 450; font-size: 13px; }
.choice-copy small { display: block; margin-top: 4px; color: var(--menu-muted); font-size: 11px; line-height: 1.4; }
.menu-study .menu-item { min-height: 41px; }
.menu-study .menu-item:has(small) { min-height: 57px; }
.menu-study .menu-panel { transform: none; transition: opacity 180ms ease,visibility 0s 280ms; }
.menu-study[data-open="true"] .menu-panel { transition-delay: 0s; }
.menu-study[data-motion="rise"] .menu-panel { transform: translateY(12px); transition: transform 260ms var(--study-ease),opacity 170ms ease,visibility 0s 260ms; }
.menu-study[data-motion="corner"] .menu-panel { left: auto; right: 0; width: min(228px,100%); transform: scale(.94); transform-origin: top right; transition: transform 220ms var(--study-ease),opacity 160ms ease,visibility 0s 220ms; }
.menu-study[data-motion="sequence"] .menu-item { transform: translateY(7px); opacity: 0; transition: transform 240ms var(--study-ease),opacity 150ms ease,background-color 160ms ease; }
.menu-study[data-motion="sequence"][data-open="true"] .menu-item { transform: none; opacity: 1; }
.menu-study[data-motion="sequence"][data-open="true"] .menu-item:nth-child(2) { transition-delay: 25ms,25ms,0s; }
.menu-study[data-motion="sequence"][data-open="true"] .menu-item:nth-child(3) { transition-delay: 50ms,50ms,0s; }
.menu-study[data-motion="sequence"][data-open="true"] .menu-item:nth-child(4) { transition-delay: 75ms,75ms,0s; }
.study-scroll { max-height: 244px; overflow: auto; scrollbar-width: thin; scrollbar-color: #7e7e7e transparent; }
.menu-study[data-motion="side"] .menu-panel { transform: translateX(14px); transition: transform 260ms var(--study-ease),opacity 180ms ease,visibility 0s 260ms; }
.menu-study[data-motion="up"],.menu-study[data-motion="lift"] { padding-top: 278px; }
.menu-study[data-motion="up"] .menu-panel { top: auto; bottom: 100px; transform: translateY(12px); transition: transform 250ms var(--study-ease),opacity 180ms ease,visibility 0s 250ms; }
.menu-study[data-motion="lift"] .menu-panel { top: auto; bottom: 100px; transform: translateY(8px) scale(.98); transform-origin: bottom center; transition: transform 280ms var(--study-ease),opacity 190ms ease,visibility 0s 280ms; }
.menu-study[data-motion="hinge"] .menu-panel { transform: translateX(-8px) scale(.98); transform-origin: top left; transition: transform 250ms var(--study-ease),opacity 180ms ease,visibility 0s 250ms; }
.menu-study[data-motion="drill"] .menu-panel { transform: translateY(-8px); transition: transform 230ms var(--study-ease),opacity 180ms ease,visibility 0s 230ms; }
.menu-study[data-motion="fan"] .menu-panel { transform: translateY(10px) scale(.96); transform-origin: top center; transition: transform 260ms var(--study-ease),opacity 160ms ease,visibility 0s 260ms; }
.menu-study[data-open="true"] .menu-panel { transform: none; transition-delay: 0s; }
.study-joined { isolation: isolate; }
.study-joined .menu-trigger { position: relative; z-index: 3; height: 52px; transition: background-color 180ms ease; }
.study-reveal { overflow: hidden; border-radius: 0 0 14px 14px; margin-top: -14px; }
.menu-study[data-motion="joined"] .menu-panel { position: relative; top: auto; padding-top: 21px; opacity: 1; border-top: 0; border-radius: 0 0 14px 14px; box-shadow: none; transform: translateY(-100%); transition: transform 280ms var(--study-ease),visibility 0s 280ms; }
.menu-study[data-motion="joined"][data-open="true"] .menu-panel { transform: none; transition-delay: 0s; }
.surface-options { display: grid; grid-template-columns: repeat(3,1fr); gap: 6px; padding: 3px; }
.surface-option { display: grid; grid-template-rows: 53px 18px 20px; align-content: start; align-items: center; gap: 8px; min-width: 0; }
.surface-option,.format-option,.insert-option { position: relative; border: 1px solid transparent; color: var(--menu-text); background: transparent; border-radius: 10px; padding: 10px 5px; cursor: pointer; font-size: 12px!important; }
.surface-option:hover,.format-option:hover,.insert-option:hover { background: transparent; }
.surface-option[aria-checked="true"],.format-option[aria-checked="true"],.insert-option[aria-current="true"] { border-color: #c4c4c466; background: transparent; }
.surface-sample { display: block; width: 100%; height: 53px; border-radius: 9px; background: #383838; }
.sample-outline { border: 1px solid #a7a7a7; background: transparent; }
.sample-raised { box-shadow: inset 0 1px #ffffff30,0 4px 6px #0005; background: linear-gradient(#4a4a4a,#2b2b2b); }
.surface-option .menu-check { display: block; margin: 0 auto; width: 20px; height: 20px; }
[data-appearance="outline"] > .menu-trigger { background: #191919; border-color: #a7a7a7; }
[data-appearance="raised"] > .menu-trigger { background: linear-gradient(#454545,#292929); box-shadow: inset 0 1px #ffffff30,0 5px 8px #0003; }
.density-sample { width: 29px; display: grid; gap: 3px; margin-right: 8px; }
.menu-item > .density-sample { flex: none; }
.density-sample b { height: 2px; background: #cfcfcf; border-radius: 2px; }
.spacing-1 { gap: 5px; }.spacing-2 { gap: 7px; }
.format-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 5px; padding: 0 3px; }
.format-option { display: grid; justify-items: start; padding: 9px 13px; gap: 4px; }
.format-option .menu-check { position: absolute; top: 10px; right: 7px; width: 20px; height: 20px; }
.format-option strong { font-size: 13px; font-weight: 500; }.format-option small { color: var(--menu-muted); font-size: 10px; }
.custom-time { padding: 9px 10px; }
.custom-time > label { font-size: 11px; color: var(--menu-muted); }
.custom-time > div { display: flex; gap: 8px; margin-top: 8px; }
.custom-time input { min-width: 0; width: 100%; border: 1px solid #ffffff22; border-radius: 8px; color: #efefef; background: #1c1c1c; padding: 9px; color-scheme: dark; font-size: 13px; }
.custom-time button,.folder-toolbar button { display: grid; place-items: center; flex: none; border: 0; border-radius: 8px; background: transparent; color: #efefef; padding: 5px; }
.folder-toolbar { display: flex; align-items: center; min-height: 41px; gap: 8px; padding: 2px 9px 8px; border-bottom: 1px solid #ffffff10; }
.folder-toolbar strong { font-size: 12px; font-weight: 450; }
.folder-toolbar button .menu-glyph { width: 21px; height: 21px; transform: rotate(90deg); }
.folder-next { transform: rotate(-90deg); width: 18px; height: 18px; }
.folder-pages { position: relative; height: 176px; overflow: hidden; margin-top: 6px; }
.folder-pages > div { position: absolute; inset: 0; transition: transform 260ms var(--study-ease),opacity 180ms ease,visibility 0s 260ms; }
[data-folder-child] { transform: translateX(24px); opacity: 0; visibility: hidden; }
[data-depth="child"] [data-folder-child] { transform: none; opacity: 1; visibility: visible; transition-delay: 0s; }
[data-depth="child"] [data-folder-root] { transform: translateX(-24px); opacity: 0; visibility: hidden; }
[data-depth="root"] [data-folder-root] { visibility: visible; transition-delay: 0s; }
.folder-description { display: grid; justify-items: center; padding: 8px 0 13px; gap: 7px; }
.folder-description > .menu-glyph { width: 38px; height: 38px; }
.folder-description strong { font-size: 14px; font-weight: 450; }.folder-description small { color: var(--menu-muted); font-size: 11px; }
.insert-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 4px; }
.insert-option { display: grid; justify-items: center; gap: 9px; padding: 13px 5px; }
.insert-option:active { border-color: #c4c4c466; }
.menu-study button:focus-visible { outline: 2px solid #c0c0c0; outline-offset: -2px; }
.menu-study button { -webkit-tap-highlight-color: transparent; }
.menu-study .menu-item:not(.menu-done):is(:hover,:active,:focus-visible) { background: transparent; }
.menu-study .menu-item:not(.menu-done):hover { color: #ffffff; }
.menu-item > .person-initials { display: grid; place-items: center; flex: none!important; width: 29px; height: 29px; border: 1px solid #cbcbcb2b; border-radius: 50%; color: #d2d2d2; font: 10px/1 'Instrument Sans',sans-serif; letter-spacing: .02em; }
@media(prefers-reduced-motion:reduce) { .menu-study *, .menu-study *::before,.menu-study *::after { transition: none!important; } }
.menu-demo .menu-panel .menu-item:not(.menu-done){margin-block:0 4px}
`;function W(){return(()=>{const s=new WeakMap;function C(t,{onSelect:l}={}){if(s.has(t))return s.get(t);const x=new AbortController,i=x.signal,b=t.ownerDocument,y=b.defaultView;const d=t.querySelector("[data-trigger]"),c=t.querySelector(".menu-panel"),r=t.querySelector("[data-feedback]"),p=t.querySelector("[data-trigger-label]"),o=t.querySelector('input[type="search"]');const f=t.dataset.menu,u=[...t.querySelectorAll("[data-value]")],N=p.textContent,R=r.textContent;const P=u.map(e=>e.getAttribute("aria-checked"));const Y=u.filter(e=>e.getAttribute("aria-checked")==="true").map(e=>e.dataset.value);let v=[...Y],g=false,M=false,w,k="";const E=()=>[...c.querySelectorAll("button")].filter(e=>!e.disabled&&!e.hidden&&!e.closest("[inert],[hidden]"));function z(e){u.forEach(n=>{if(n.hasAttribute("aria-checked"))n.setAttribute("aria-checked",String(e.includes(n.dataset.value)))})}function m(e=false){g=false;t.dataset.open="false";d.setAttribute("aria-expanded","false");c.inert=true;c.setAttribute("aria-hidden","true");if(t.dataset.confirm)z(v);if(e)d.focus({preventScroll:true})}function L(e=false,n=false){if(M||d.disabled)return;g=true;t.dataset.open="true";d.setAttribute("aria-expanded","true");c.inert=false;c.setAttribute("aria-hidden","false");if(e)(o||(n?E().at(-1):E()[0]))?.focus({preventScroll:true})}function S(e,n,a,D=false){v=[e];z(v);if(f==="appearance")t.dataset.appearance=e;if(!["move","snooze","insert","export"].includes(f))p.textContent=n;r.textContent=a||n+" selected in this preview.";if(f==="insert"){u.forEach(U=>U.setAttribute("aria-current",String(U.dataset.value===e)));p.textContent="Insert "+n.toLowerCase()}if(D)m(true);t.dispatchEvent(new y.CustomEvent("menuselect",{bubbles:true,detail:{value:e,values:[e]}}));l?.([e])}d.addEventListener("click",e=>g?m():L(e.detail===0||!!o),{signal:i});d.addEventListener("keydown",e=>{if(["ArrowDown","ArrowUp"].includes(e.key)){e.preventDefault();L(true,e.key==="ArrowUp")}},{signal:i});u.forEach(e=>e.addEventListener("click",()=>{const n=e.dataset.value,a=e.dataset.label;if(t.dataset.confirm){z([n]);return}S(n,a,f==="insert"?a+" block inserted in this preview.":f==="snooze"?a+" selected. No reminder is scheduled.":void 0)},{signal:i}));t.querySelector("[data-apply]")?.addEventListener("click",()=>{const e=u.find(n=>n.getAttribute("aria-checked")==="true");if(!e)return;S(e.dataset.value,e.dataset.label,f==="export"?e.dataset.label+" export preview complete. Nothing downloaded.":e.dataset.label+" applied in this preview only.",true)},{signal:i});o?.addEventListener("input",()=>{const e=o.value.trim().toLowerCase();u.forEach(n=>n.hidden=!n.textContent.toLowerCase().includes(e));t.querySelector("[data-empty]").hidden=u.some(n=>!n.hidden)},{signal:i});const q=t.querySelector("[data-folder-root]"),I=t.querySelector("[data-folder-child]"),j=t.querySelector("[data-back]");function A(e,n=true){const a=Boolean(e);t.dataset.depth=a?"child":"root";q.inert=a;q.setAttribute("aria-hidden",String(a));I.inert=!a;I.setAttribute("aria-hidden",String(!a));j.hidden=!a;t.querySelector("[data-path]").textContent=a?"Projects / "+e:"Projects";if(a)t.querySelector("[data-folder-name]").textContent=e;if(n)(a?j:q.querySelector("button")).focus({preventScroll:true})}t.querySelectorAll("[data-folder]").forEach(e=>e.addEventListener("click",()=>A(e.dataset.folder),{signal:i}));j?.addEventListener("click",()=>A(null),{signal:i});t.querySelector("[data-move]")?.addEventListener("click",()=>{const e=t.querySelector("[data-folder-name]").textContent;S(e.toLowerCase(),e,"Sample moved to "+e+". No real file changed.",true)},{signal:i});const h=t.querySelector('input[type="time"]');t.querySelector("[data-time-apply]")?.addEventListener("click",()=>{if(!h.reportValidity())return;S(h.value,h.value,"Time set to "+h.value+" in this preview. No reminder is scheduled.",true)},{signal:i});t.addEventListener("keydown",e=>{if(!g)return;if(e.key==="Escape"){e.preventDefault();e.stopPropagation();m(true);return}if(e.target===d)return;if(e.key==="ArrowLeft"&&f==="move"&&t.dataset.depth==="child"&&e.target.tagName!=="INPUT"){e.preventDefault();A(null);return}if(e.target===h)return;if(e.target===o&&!["ArrowDown","Enter"].includes(e.key))return;const n=E();if(!n.length)return;if(e.target===o&&e.key==="Enter"){e.preventDefault();n[0].click();return}if(["ArrowDown","ArrowUp","Home","End"].includes(e.key)){e.preventDefault();const a=n.indexOf(e.target),D=e.key==="Home"?0:e.key==="End"?n.length-1:(a+(e.key==="ArrowDown"?1:-1)+n.length)%n.length;n[D]?.focus({preventScroll:true})}else if(!o&&e.key.length===1&&e.key!==" "&&!e.ctrlKey&&!e.metaKey){k+=e.key.toLowerCase();clearTimeout(w);n.find(a=>a.textContent.trim().toLowerCase().startsWith(k))?.focus({preventScroll:true});w=setTimeout(()=>k="",600)}},{signal:i});b.addEventListener("pointerdown",e=>{if(g&&!e.composedPath().includes(t))m()},{signal:i});t.addEventListener("focusout",()=>queueMicrotask(()=>{if(g&&!t.matches(":focus-within"))m()}),{signal:i});function H(){m(t.matches(":focus-within"));v=[...Y];u.forEach((e,n)=>{e.hidden=false;e.removeAttribute("aria-current");if(P[n]!==null)e.setAttribute("aria-checked",P[n])});p.textContent=N;r.textContent=R;delete t.dataset.appearance;if(o){o.value="";t.querySelector("[data-empty]").hidden=true}if(h)h.value="15:00";if(q)A(null,false);clearTimeout(w);k=""}m();const B={open:L,close:m,reset:H,destroy(){m();M=true;clearTimeout(w);x.abort();s.delete(t)}};s.set(t,B);return B}return{mount:C}})()}function Z(s,C={},{preview:t=false}={}){if(!s||typeof s.attachShadow!=="function")throw new TypeError("A DOM host is required");const l=s.shadowRoot||s.attachShadow({mode:"open"});l.innerHTML=F;const x=s.ownerDocument.createElement("style");const i=new URL("./instrument-sans-variable.woff2",import.meta.url).href;x.textContent=V.replaceAll("./instrument-sans-variable.woff2",i)+':host{display:block;min-width:0;max-width:100%;font-family:"Instrument Sans",sans-serif}[hidden]{display:none!important}';l.prepend(x);const b=l.querySelector(".menu-demo");if(!b){l.replaceChildren();throw new Error("Missing component root")}const y=X(s.ownerDocument,i);let d,c=false;try{const r=W(),p={};if(T==="upload")p.input=l.querySelector('input[type="file"]');if(["like","copy","download","bookmark","playback","delete","upload","share","follow"].includes(T))p.feedback=l.querySelector("."+T+"-feedback");if(t&&typeof r.mountPreview!=="function")throw new Error("This source has no preview adapter; supply its documented application callbacks.");d=(t?r.mountPreview:r.mount)(b,{...p,...C});if(typeof d?.destroy!=="function")throw new Error("Missing source cleanup contract")}catch(r){y();l.replaceChildren();throw r}return new Proxy(d,{get(r,p){if(p==="destroy")return()=>{if(c)return;c=true;try{r.destroy()}finally{y();l.replaceChildren()}};const o=Reflect.get(r,p,r);return typeof o==="function"?o.bind(r):o}})}export{Z as mountInto,T as variant};
