# Check status snapshot

This records observed results, not a waiver for failing tests. Re-run both
commands after code or content changes and update this file only with results
actually observed.

Snapshot: 21 September 2026, based on `74995a6` plus the current Week 1 deck
asset fix.

| Command | Observed result |
| --- | --- |
| `pnpm check` | Passed. Astro type checking reported 0 errors and one existing unused-type hint in `MetaLine.astro`; the production build generated 54 pages; all 16 spec tests passed, including resolution of every Week 1 deck background URL; accessibility, base-path, internal-link and deck checks passed. |
| `pnpm check:evidence` | Passed. No starter text or unchanged starter assets remain, and every commit cited by `PROCESS.md` resolves. |

Manual browser verification uses the real base-path URL at the two marking
viewports, 1920×1080 and 390×844. The exercised matrix covers fresh Home load,
the complete scroll sequence, reverse scroll, keyboard and reduced-motion
states, logo return, browser Back, repeated route trips, direct refresh and
resize after return. The site is intentionally fixed to its designed dark
scheme; the theme toggle is absent.

There is no configured automated browser-navigation test for the
camera/gallery lifecycle. The manual matrix in
[homepage-contract.md](homepage-contract.md) remains required for any change to
that interaction; do not describe it as automated coverage.
