# Working with SL UI Library

This repository contains 110 approved components and a portable agent toolkit. Use `plugins/sl-ui-library/scripts/library.mjs` to search, inspect and retrieve actual component source. Read `docs/agents.md` for its contract.

For library edits, `public/packages/` and `public/catalog-data.js` are the source of truth. Run `npm run build` and `npm run check`; commit tracked generated previews and plugin data with source changes. ZIP exports are generated on build/start and ignored by Git. Preserve English interface labels, project-owned inline SVGs, reversible motion, keyboard/focus behavior and reduced-motion support. User input may be Unicode and must remain literal text.

Feedback and Data display intentionally remain empty in this release. Do not add placeholder components or change the library's category scope without a user request.

Demo actions only change preview state. Do not claim a server operation succeeded merely because a demo confirmation appeared. Integration work must connect the real operation explicitly.

The repository is in private review. Do not change visibility, deploy Pages, publish packages, install plugins into personal configuration or grant a code license unless the owner requests it.
