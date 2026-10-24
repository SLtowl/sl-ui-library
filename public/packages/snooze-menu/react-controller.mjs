import{retainFont as X}from"./react-font.mjs";const Y="snooze-menu";const F='<div class="menu-demo menu-study" data-menu="snooze" data-motion="lift"><button type="button" class="menu-trigger" data-trigger aria-expanded="false" aria-haspopup="dialog" aria-controls="study-snooze"><i class="menu-glyph " data-icon="clock" aria-hidden="true"><svg viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg" focusable="false" aria-hidden="true"><circle cx="14" cy="14" r="9"/><path d="M14 8v6l4 3"/></svg></i><span class="menu-trigger-label" data-trigger-label>Remind me</span><i class="menu-glyph menu-chevron" data-icon="chevron" aria-hidden="true"><svg viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg" focusable="false" aria-hidden="true"><path d="m8 11 6 6 6-6"/></svg></i></button><div class="menu-panel" id="study-snooze" role="dialog" aria-label="Reminder menu" aria-hidden="true" inert><div class="menu-overline">REMIND ME LATER</div><button type="button" class="menu-item" data-value="hour" data-label="In one hour" role="menuitemradio" aria-checked="false" tabindex="-1" ><i class="menu-glyph " data-icon="clock" aria-hidden="true"><svg viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg" focusable="false" aria-hidden="true"><circle cx="14" cy="14" r="9"/><path d="M14 8v6l4 3"/></svg></i><span class="choice-copy"><strong>In one hour</strong></span><i class="menu-glyph menu-check" data-icon="check" aria-hidden="true"><svg viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg" focusable="false" aria-hidden="true"><path d="m5 14 6 6L23 8"/></svg></i></button><button type="button" class="menu-item" data-value="tomorrow" data-label="Tomorrow morning" role="menuitemradio" aria-checked="false" tabindex="-1" ><i class="menu-glyph " data-icon="flag" aria-hidden="true"><svg viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg" focusable="false" aria-hidden="true"><path d="M6 24V5m0 3c5-5 11 4 16-1v11c-5 5-11-4-16 1"/></svg></i><span class="choice-copy"><strong>Tomorrow morning</strong></span><i class="menu-glyph menu-check" data-icon="check" aria-hidden="true"><svg viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg" focusable="false" aria-hidden="true"><path d="m5 14 6 6L23 8"/></svg></i></button><div class="menu-rule"></div><div class="custom-time"><label for="reminder-time">Choose a time</label><div><span class="sl-time-control"><input type="text" class="sl-time-field" inputmode="numeric" maxlength="5" pattern="([01][0-9]|2[0-3]):[0-5][0-9]" placeholder="HH:MM" id="reminder-time" value="15:00" required><button class="sl-time-open" type="button" aria-label="Open time picker"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 6v6l4 2"/></svg></button></span><button type="button" data-time-apply aria-label="Use selected time"><i class="menu-glyph " data-icon="check" aria-hidden="true"><svg viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg" focusable="false" aria-hidden="true"><path d="m5 14 6 6L23 8"/></svg></i></button></div></div></div><p class="menu-feedback" data-feedback role="status" aria-live="polite">Preview only. No notification is scheduled.</p></div>';const W=`@font-face{font-family:'Instrument Sans';src:url('./instrument-sans-variable.woff2') format('woff2');font-weight:400 700;font-display:swap}
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

.menu-demo.menu-demo .sl-time-list { scrollbar-width: none; }
.menu-demo .sl-time-list::-webkit-scrollbar { display: none; }

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
.menu-demo { --field-surface: var(--menu-panel); --field-hover: #343434; --field-active: #424242; --field-text: var(--menu-text); --field-muted: var(--menu-muted); --field-accent: #e0e0e0; --field-border: #5a5a5a; --field-focus: #e0e0e0; --field-ease: var(--menu-ease); }

.menu-demo { position: relative; }
.menu-demo .sl-field-control { display: flex; align-items: stretch; gap: 6px; }
.menu-demo .sl-field-control input { flex: 1; width: 0; }
.menu-demo .sl-icon-button { display: grid; place-items: center; flex: 0 0 38px; padding: 6px; min-height: 44px; background: var(--field-hover); }
.menu-demo .sl-icon-button svg { width: 18px; height: 18px; }
.menu-demo .sl-picker-panel { position: absolute; z-index: 3; inset: 8px; display: flex; flex-direction: column; gap: 12px; min-width: 0; padding: 12px; border: 1px solid var(--field-border); border-radius: 12px; background: var(--field-surface); box-shadow: 0 6px 18px #0003; visibility: hidden; opacity: 0; transform: translateY(4px) scale(.985); pointer-events: none; transition: opacity 180ms var(--field-ease), transform 180ms var(--field-ease), visibility 0s 180ms; }
.menu-demo .sl-picker-panel[data-open="true"] { visibility: visible; opacity: 1; transform: none; pointer-events: auto; transition-delay: 0s; }
.menu-demo .sl-picker-header { display: flex; align-items: center; justify-content: space-between; gap: 8px; flex: none; }
.menu-demo .sl-picker-header strong { font-size: 14px; font-weight: 550; }
.menu-demo .sl-picker-header button { flex: 0 0 30px; min-height: 30px; padding: 0; font-size: 22px; line-height: 1; border-color: transparent; }
.menu-demo .sl-picker-body { min-height: 0; flex: 1; overflow: auto; overscroll-behavior: contain; scrollbar-width: thin; scrollbar-color: var(--field-border) transparent; }
.menu-demo .sl-picker-footer { display: flex; justify-content: space-between; align-items: center; gap: 8px; flex: none; }
.menu-demo .sl-picker-footer:empty { display: none; }
.menu-demo .sl-picker-panel button[aria-pressed="true"], .menu-demo .sl-picker-panel button[aria-selected="true"] { background: var(--field-accent); color: var(--field-surface); border-color: var(--field-accent); }
@media (prefers-reduced-motion: reduce) { .menu-demo .sl-picker-panel { transition: none; transform: none; } }

.menu-demo .sl-time-control { display: flex; align-items: stretch; gap: 6px; min-width: 0; flex: 1; margin-top: 4px; }
.menu-demo .sl-time-control input { width: 0; flex: 1; min-width: 0; min-height: 36px; }
.menu-demo .sl-time-open { display: grid; place-items: center; flex: 0 0 34px; padding: 4px; min-height: 36px; border: 1px solid var(--field-border); border-radius: 7px; background: var(--field-hover); color: var(--field-text); }
.menu-demo .sl-time-open svg { width: 18px; height: 18px; }
.menu-demo .sl-picker-panel button { font: inherit; cursor: pointer; border: 1px solid var(--field-border); border-radius: 7px; background: transparent; color: var(--field-text); min-height: 28px; }
.menu-demo .sl-picker-panel button:hover { background: var(--field-active); }
.menu-demo .sl-picker-panel button:is([aria-pressed="true"],[aria-selected="true"]):is(:hover,:focus-visible) { background: var(--field-accent); color: var(--field-surface); }
.menu-demo .sl-picker-panel button:focus-visible { outline: 2px solid var(--field-focus); outline-offset: -2px; }
.menu-demo .sl-picker-panel { padding: 10px; gap: 8px; }
.menu-demo .sl-time-columns { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; }
.menu-demo .sl-time-columns > div > span { display: block; margin-bottom: 4px; font-size: 11px; color: var(--field-muted); }
.menu-demo .sl-time-list { position: relative; height: 102px; overflow-y: auto; overscroll-behavior: contain; scrollbar-width: thin; scrollbar-color: var(--field-border) transparent; padding: 4px; border: 1px solid var(--field-border); border-radius: 7px; }
.menu-demo .sl-time-list button { display: block; width: 100%; min-height: 29px; padding: 4px; margin-bottom: 3px; font-size: 12px; border-color: transparent; }
.menu-demo .sl-time-draft { font-size: 16px; color: var(--field-accent); font-variant-numeric: tabular-nums; }
.menu-demo .sl-picker-footer .sl-time-confirm { padding: 6px 10px; background: var(--field-accent); color: var(--field-surface); font-size: 12px; }

.menu-demo .custom-time [data-time-apply] { width: 32px; height: 36px; padding: 6px; }
.menu-demo .custom-time [data-time-apply] .menu-glyph,.menu-demo .custom-time [data-time-apply] svg { display: block; width: 20px; height: 20px; }
.menu-demo .menu-panel .menu-item:not(.menu-done){margin-block:0 4px}
`;function $(){return(()=>{function D(t,h,k,d){const p=t.ownerDocument;const o=p.createElement("div"),s=p.createElement("div"),l=p.createElement("strong"),b=p.createElement("button");o.className="sl-picker-panel";o.id="picker-"+p.defaultView.crypto.randomUUID();o.setAttribute("role","dialog");o.setAttribute("aria-label",h);o.setAttribute("aria-hidden","true");o.inert=true;s.className="sl-picker-header";l.textContent=h;b.type="button";b.textContent="×";b.setAttribute("aria-label","Close picker");s.append(l,b);const S=p.createElement("div"),m=p.createElement("div");S.className="sl-picker-body";m.className="sl-picker-footer";o.append(s,S,m);t.append(o);let y=false,g=null,E=[];const z=new Set;function w(n=true){if(!y)return;y=false;o.dataset.open="false";o.inert=true;o.setAttribute("aria-hidden","true");E.forEach(([c,a])=>{c.inert=a});E=[];g?.setAttribute("aria-expanded","false");if(n&&g?.isConnected&&!g.disabled)g.focus()}function C(n){z.add(n);n.setAttribute("aria-haspopup","dialog");n.setAttribute("aria-expanded","false");n.setAttribute("aria-controls",o.id)}function r(n,c){if(d||n.disabled)return;w(false);g=n;C(n);y=true;o.dataset.open="true";o.inert=false;o.setAttribute("aria-hidden","false");n.setAttribute("aria-expanded","true");(c||b).focus({preventScroll:true});E=[...t.children].filter(a=>a!==o).map(a=>[a,a.inert]);E.forEach(([a])=>{a.inert=true})}k(b,"click",()=>w());k(o,"keydown",n=>{if(n.key==="Escape"){n.preventDefault();n.stopPropagation();w()}if(n.key!=="Tab")return;const c=[...o.querySelectorAll("button, input, [tabindex]")].filter(x=>!x.disabled&&x.tabIndex>=0&&x.checkVisibility());const a=c[0],u=c[c.length-1],v=t.getRootNode().activeElement;if(n.shiftKey&&v===a){n.preventDefault();u?.focus()}else if(!n.shiftKey&&v===u){n.preventDefault();a?.focus()}});k(p,"pointerdown",n=>{if(y&&!n.composedPath().includes(t))w(false)});return{body:S,footer:m,panel:o,heading:l,bind:C,open:r,close:w,get isOpen(){return y},destroy(){w();z.forEach(n=>{n.removeAttribute("aria-controls");n.setAttribute("aria-expanded","false")});o.remove()}}}function N(t,h,k,d){const p=t.ownerDocument,o=p.defaultView,s=t.querySelector(".sl-time-open");const l=D(k,"Choose time",d,false);l.bind(s);const b=h.value,S=r=>/^([01]\d|2[0-3]):[0-5]\d$/.test(r);let m=b;const y=p.createElement("div");y.className="sl-time-columns";const g=["Hours","Minutes"].map((r,n)=>{const c=p.createElement("div"),a=p.createElement("span"),u=p.createElement("div");a.textContent=r;u.className="sl-time-list";u.setAttribute("role","listbox");u.setAttribute("aria-label",r);for(let v=0;v<(n?60:24);v++){const x=p.createElement("button");x.type="button";x.setAttribute("role","option");x.dataset.part=String(n);x.dataset.number=String(v).padStart(2,"0");x.textContent=x.dataset.number;u.append(x)}c.append(a,u);y.append(c);return u});l.body.append(y);const E=p.createElement("span"),z=p.createElement("button");E.className="sl-time-draft";E.setAttribute("aria-live","polite");z.type="button";z.className="sl-time-confirm";z.textContent="Use time";l.footer.append(E,z);function w(r){const n=m.split(":");E.textContent=m;g.forEach((c,a)=>{[...c.children].forEach(v=>{const x=v.dataset.number===n[a];v.setAttribute("aria-selected",String(x));v.tabIndex=x?0:-1});const u=c.querySelector('[aria-selected="true"]');if(r===a)u?.focus({preventScroll:true});if(u)c.scrollTop=u.offsetTop-c.clientHeight/2+u.clientHeight/2})}function C(){if(h.disabled||h.readOnly)return;m=S(h.value)?h.value:b;w();l.open(s,g[0].querySelector('[aria-selected="true"]'));w()}d(s,"click",r=>{r.preventDefault();C()});d(s,"keydown",r=>{if(["ArrowDown","ArrowUp"].includes(r.key)){r.preventDefault();r.stopPropagation();C()}});d(h,"keydown",r=>{if(r.altKey&&r.key==="ArrowDown"){r.preventDefault();r.stopPropagation();C()}});g.forEach((r,n)=>{function c(a){if(!a||a.disabled||h.disabled)return;const u=m.split(":");u[n]=a.dataset.number;m=u.join(":");w(n)}d(r,"click",a=>c(a.target.closest("[data-number]")));d(r,"keydown",a=>{if(!["ArrowDown","ArrowUp","Home","End"].includes(a.key))return;a.preventDefault();a.stopPropagation();const u=[...r.children].indexOf(a.target);const v=a.key==="Home"?0:a.key==="End"?r.children.length-1:Math.max(0,Math.min(r.children.length-1,u+(a.key==="ArrowDown"?1:-1)));c(r.children[v])})});d(z,"click",r=>{r.preventDefault();if(h.disabled||h.readOnly)return;const n=h.value!==m;h.value=m;if(n)h.dispatchEvent(new o.Event("input",{bubbles:true,composed:true}));l.close()});return{close:()=>l.close(false),destroy:()=>l.destroy()}}const T=new WeakMap;function A(t,{onSelect:h}={}){if(T.has(t))return T.get(t);const k=new AbortController,d=k.signal,p=t.ownerDocument,o=p.defaultView;const s=t.querySelector("[data-trigger]"),l=t.querySelector(".menu-panel"),b=t.querySelector("[data-feedback]"),S=t.querySelector("[data-trigger-label]"),m=t.querySelector('input[type="search"]');const y=t.dataset.menu,g=[...t.querySelectorAll("[data-value]")],E=S.textContent,z=b.textContent;const w=g.map(e=>e.getAttribute("aria-checked"));const C=g.filter(e=>e.getAttribute("aria-checked")==="true").map(e=>e.dataset.value);let r=[...C],n=false,c=false,a,u="";const v=()=>[...l.querySelectorAll("button")].filter(e=>!e.disabled&&!e.hidden&&!e.closest("[inert],[hidden]"));function x(e){g.forEach(i=>{if(i.hasAttribute("aria-checked"))i.setAttribute("aria-checked",String(e.includes(i.dataset.value)))})}function q(e=false){B.close();n=false;t.dataset.open="false";s.setAttribute("aria-expanded","false");l.inert=true;l.setAttribute("aria-hidden","true");if(t.dataset.confirm)x(r);if(e)s.focus({preventScroll:true})}function P(e=false,i=false){if(c||s.disabled)return;n=true;t.dataset.open="true";s.setAttribute("aria-expanded","true");l.inert=false;l.setAttribute("aria-hidden","false");if(e)(m||(i?v().at(-1):v()[0]))?.focus({preventScroll:true})}function M(e,i,f,H=false){r=[e];x(r);if(y==="appearance")t.dataset.appearance=e;if(!["move","snooze","insert","export"].includes(y))S.textContent=i;b.textContent=f||i+" selected in this preview.";if(y==="insert"){g.forEach(V=>V.setAttribute("aria-current",String(V.dataset.value===e)));S.textContent="Insert "+i.toLowerCase()}if(H)q(true);t.dispatchEvent(new o.CustomEvent("menuselect",{bubbles:true,detail:{value:e,values:[e]}}));h?.([e])}s.addEventListener("click",e=>n?q():P(e.detail===0||!!m),{signal:d});s.addEventListener("keydown",e=>{if(["ArrowDown","ArrowUp"].includes(e.key)){e.preventDefault();P(true,e.key==="ArrowUp")}},{signal:d});g.forEach(e=>e.addEventListener("click",()=>{const i=e.dataset.value,f=e.dataset.label;if(t.dataset.confirm){x([i]);return}M(i,f,y==="insert"?f+" block inserted in this preview.":y==="snooze"?f+" selected. No reminder is scheduled.":void 0)},{signal:d}));t.querySelector("[data-apply]")?.addEventListener("click",()=>{const e=g.find(i=>i.getAttribute("aria-checked")==="true");if(!e)return;M(e.dataset.value,e.dataset.label,y==="export"?e.dataset.label+" export preview complete. Nothing downloaded.":e.dataset.label+" applied in this preview only.",true)},{signal:d});m?.addEventListener("input",()=>{const e=m.value.trim().toLowerCase();g.forEach(i=>i.hidden=!i.textContent.toLowerCase().includes(e));t.querySelector("[data-empty]").hidden=g.some(i=>!i.hidden)},{signal:d});const j=t.querySelector("[data-folder-root]"),R=t.querySelector("[data-folder-child]"),U=t.querySelector("[data-back]");function I(e,i=true){const f=Boolean(e);t.dataset.depth=f?"child":"root";j.inert=f;j.setAttribute("aria-hidden",String(f));R.inert=!f;R.setAttribute("aria-hidden",String(!f));U.hidden=!f;t.querySelector("[data-path]").textContent=f?"Projects / "+e:"Projects";if(f)t.querySelector("[data-folder-name]").textContent=e;if(i)(f?U:j.querySelector("button")).focus({preventScroll:true})}t.querySelectorAll("[data-folder]").forEach(e=>e.addEventListener("click",()=>I(e.dataset.folder),{signal:d}));U?.addEventListener("click",()=>I(null),{signal:d});t.querySelector("[data-move]")?.addEventListener("click",()=>{const e=t.querySelector("[data-folder-name]").textContent;M(e.toLowerCase(),e,"Sample moved to "+e+". No real file changed.",true)},{signal:d});const L=t.querySelector(".sl-time-field");const B=N(t,L,l,(e,i,f)=>e.addEventListener(i,f,{signal:d}));t.querySelector("[data-time-apply]")?.addEventListener("click",()=>{if(!L.reportValidity())return;M(L.value,L.value,"Time set to "+L.value+" in this preview. No reminder is scheduled.",true)},{signal:d});t.addEventListener("keydown",e=>{if(!n)return;if(e.key==="Escape"){e.preventDefault();e.stopPropagation();q(true);return}if(e.target===s)return;if(e.key==="ArrowLeft"&&y==="move"&&t.dataset.depth==="child"&&e.target.tagName!=="INPUT"){e.preventDefault();I(null);return}if(e.target===L)return;if(e.target===m&&!["ArrowDown","Enter"].includes(e.key))return;const i=v();if(!i.length)return;if(e.target===m&&e.key==="Enter"){e.preventDefault();i[0].click();return}if(["ArrowDown","ArrowUp","Home","End"].includes(e.key)){e.preventDefault();const f=i.indexOf(e.target),H=e.key==="Home"?0:e.key==="End"?i.length-1:(f+(e.key==="ArrowDown"?1:-1)+i.length)%i.length;i[H]?.focus({preventScroll:true})}else if(!m&&e.key.length===1&&e.key!==" "&&!e.ctrlKey&&!e.metaKey){u+=e.key.toLowerCase();clearTimeout(a);i.find(f=>f.textContent.trim().toLowerCase().startsWith(u))?.focus({preventScroll:true});a=setTimeout(()=>u="",600)}},{signal:d});p.addEventListener("pointerdown",e=>{if(n&&!e.composedPath().includes(t))q()},{signal:d});t.addEventListener("focusout",()=>queueMicrotask(()=>{if(n&&!t.matches(":focus-within"))q()}),{signal:d});function K(){q(t.matches(":focus-within"));r=[...C];g.forEach((e,i)=>{e.hidden=false;e.removeAttribute("aria-current");if(w[i]!==null)e.setAttribute("aria-checked",w[i])});S.textContent=E;b.textContent=z;delete t.dataset.appearance;if(m){m.value="";t.querySelector("[data-empty]").hidden=true}if(L)L.value="15:00";if(j)I(null,false);clearTimeout(a);u=""}q();const O={open:P,close:q,reset:K,destroy(){q();B.destroy();c=true;clearTimeout(a);k.abort();T.delete(t)}};T.set(t,O);return O}return{mount:A}})()}function J(D,N={},{preview:T=false}={}){if(!D||typeof D.attachShadow!=="function")throw new TypeError("A DOM host is required");const A=D.shadowRoot||D.attachShadow({mode:"open"});A.innerHTML=F;const t=D.ownerDocument.createElement("style");const h=new URL("./instrument-sans-variable.woff2",import.meta.url).href;t.textContent=W.replaceAll("./instrument-sans-variable.woff2",h)+':host{display:block;min-width:0;max-width:100%;font-family:"Instrument Sans",sans-serif}[hidden]{display:none!important}';A.prepend(t);const k=A.querySelector(".menu-demo");if(!k){A.replaceChildren();throw new Error("Missing component root")}const d=X(D.ownerDocument,h);let p,o=false;try{const s=$(),l={};if(Y==="upload")l.input=A.querySelector('input[type="file"]');if(["like","copy","download","bookmark","playback","delete","upload","share","follow"].includes(Y))l.feedback=A.querySelector("."+Y+"-feedback");if(T&&typeof s.mountPreview!=="function")throw new Error("This source has no preview adapter; supply its documented application callbacks.");p=(T?s.mountPreview:s.mount)(k,{...l,...N});if(typeof p?.destroy!=="function")throw new Error("Missing source cleanup contract")}catch(s){d();A.replaceChildren();throw s}return new Proxy(p,{get(s,l){if(l==="destroy")return()=>{if(o)return;o=true;try{s.destroy()}finally{d();A.replaceChildren()}};const b=Reflect.get(s,l,s);return typeof b==="function"?b.bind(s):b}})}export{J as mountInto,Y as variant};
