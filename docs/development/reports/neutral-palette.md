# Neutral palette audit — September 15, 2026

The owner approved Overlays and requested removal of the unintended sage tint throughout the other component groups before reviewing the ten new Feedback components. This is a local change, not a publication.

## Scope and checks

- Audit every one of the 236 export variants, including the 130-component baseline and the new batches. Remove green-tinted UI surfaces, text, accents, borders, focus rings and shadows. The primary chart tone is also neutral gray; distinct secondary series retain their colors.
- Preserve relative luminance and alpha when neutralizing colors. Keep actual color-picker values, gradient-stop data, semantic validation success/error colors, avatar identities and labeled status indicators.
- Verify package diffs contain only color-literal replacements, with no markup, layout or controller changes. Rebuild preview, source-view, plugin bundle and ZIP output from the same source.
- Check all ten Feedback primary flows in the real compiled Shadow DOM gallery: validation, saving, session renewal, capacity changes, conflict choice, partial retry, access request, empty recovery, incident updates and readiness checks. Demo messages are local simulation results, not real server operations.
- Explore an empty/invalid form followed by correction, a failed save that retains the draft, an expired session followed by restoration, and an over-capacity file followed by cache release and a smaller sample choice.
- Visually review all ten Feedback after interaction, and representative new components from every other category. Inspect selected, disabled and failure states separately from source checks. Check all ten Feedback roots at 320, 768, 1024 and 1440 px viewport widths.

## Results

The migration changed 288 CSS/HTML files across 226 variants; the other ten variants were already neutral after the Overlays correction. One code-input animation start color was aligned with its CSS; success and error endpoints stayed unchanged. The package diff check found no non-color changes in these 289 source files.

The new palette regression suite checks all export styles, luminance/alpha preservation, meaningful color exceptions and actual Feedback token contrast. Existing export tests now use the new default gray values when testing a violet customization; no security or behavior assertions were removed.

`npm run build` and `npm run check` passed: 234 catalog components, 236 exports, 1,101 source files; 157 passing tests, zero failures, 87 optional browser tests skipped. The separate interactive browser pass exercised all ten Feedback flows listed above and recorded no page errors. All 40 Feedback viewport/root checks stayed inside their previews without horizontal overflow; maximum observed root height was 443 px.

Screenshots confirmed neutral text, surfaces and controls across the category samples and all ten Feedback. Verification uses Chromium and reduced motion; it is not an exhaustive rerun of every interaction in all 234 components, a screen-reader session, or cross-browser certification. English source and export checks passed. Nothing was pushed, published or installed into personal configuration.
