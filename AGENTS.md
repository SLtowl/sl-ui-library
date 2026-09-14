# Working with SL UI Library

Version 1.1 contains 234 owner-reviewed components and a portable agent toolkit. Use `plugins/sl-ui-library/scripts/library.mjs` to search, inspect and retrieve actual component source. Read `docs/agents.md` for its contract.

For library edits, `public/packages/` and `public/catalog-data.js` are the source of truth. Run `npm run build` and `npm run check`; commit tracked generated previews and plugin data with source changes. ZIP exports are generated on build/start and ignored by Git. Preserve English interface labels, project-owned inline SVGs, reversible motion, keyboard/focus behavior and reduced-motion support. User input may be Unicode and must remain literal text.

The version 1.1 review is complete, including Feedback and Data display. Future batches require local owner review before release. Read `docs/development/parallel-batches.md` before implementing a batch. Follow its file ownership boundaries; the coordinator integrates and verifies all categories. Do not publish unreviewed components or change the category scope without a user request.

Demo actions only change preview state. Do not claim a server operation succeeded merely because a demo confirmation appeared. Integration work must connect the real operation explicitly.

The repository is public. Deploy only the static public/ directory through the approved Pages workflow. Do not change repository visibility, publish packages, install plugins into personal configuration or grant a code license unless the owner requests it.
