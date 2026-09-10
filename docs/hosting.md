# GitHub repository and website

The repository is the complete product, not a link to its author's local computer.

## Boundaries

- `public/`: static website, interactive previews, component sources, bundled fonts and generated component ZIPs. This is the only directory uploaded as the Pages artifact.
- `plugins/sl-ui-library/`: portable agent skill, catalog, source tools and update policy. Repository content, not a browser-side agent service.
- `docs/`: documentation, generated studio images and interaction film for the README.
- `tests/`, `build.mjs`, `verify.mjs`: repeatable build and consistency checks.
- Personal Russian review, clipboard attachments, working audit files and local development configuration are outside this release directory and are not part of the repository.

The website runs in the visitor's browser. It needs no application backend, database, account login or access to the author's machine. Example archive, rename and create operations change only preview state. An exported component needs the adopter's own application logic for real operations.

## Build once, host the result

Run `npm run build`, then `npm run check`. Build regenerates the shared preview data, displayed source, 112 downloadable exports and the agent source bundle from the same component sources. Commit source and tracked generated data together; ZIPs are generated in CI rather than stored in Git history.

The manual workflow at `.github/workflows/pages.yml` runs the same build and checks, then uploads only `public/`. Relative resource paths support a repository subpath; a local test has exercised `/sl-ui-library/`, including a mobile overlay, source tabs and a ZIP download.

## Owner-controlled publication

The repository is currently private and the site is not deployed. The workflow deliberately skips deployment while the repository is private. This is our review safeguard, not a statement that GitHub never supports private-repository Pages.

After the owner approves publication:

1. Confirm repository visibility and code licensing separately. Do not infer a code license from public visibility.
2. In repository Settings → Pages, select GitHub Actions as the publishing source.
3. Run the **Deploy static library** workflow on the reviewed branch.
4. Use the successful deployment's reported URL. Check the catalog, interactive previews, source tabs and downloads at that URL before announcing it.
5. Replace README localhost demo links with the verified hosted URLs. Keep localhost only in local-development instructions.

No remote deployment has been verified yet. GitHub hosting can process visitor request information under its own policies; absence of library analytics is not a promise of no host-side logging.

Official reference: [GitHub Pages custom workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

