# Check status snapshot

This records observed results, not a waiver for failing tests. Re-run the
commands after code or content changes, compare the exact failures, and update
the snapshot only with results actually observed. Fix every newly introduced
failure before committing; disclose any unchanged baseline failure in the
handoff and continue working toward a green submission.

Snapshot: 18 September 2026, code baseline `427522a` (documentation edits
uncommitted when checked).

| Command | Observed result |
| --- | --- |
| `pnpm check` | Failed: 2 of 5 spec tests failed. Astro type checking had 0 errors and the production build generated 42 pages; accessibility, base-path and internal-link checks passed. |
| `pnpm check:evidence` | Failed: starter content and assets remain. |

The two `pnpm check` failures are in `spec/assignment-2.test.ts`: only dated
sessions for Weeks 1 and 2 exist instead of all twelve, and the linked Week 1
deck remains a starter placeholder. Do not weaken or edit the spec tests to
make these failures disappear.

The evidence gate reports `STARTER_CONTENT` in both people entries, both
session entries and `src/decks/week-01.deck.mdx`. It also identifies the
unchanged starter assets `src/assets/images/card.png`,
`src/assets/images/hero-home.avif`, and both person images in
`src/content/people/`. Replace the content and assets deliberately; removing
markers or changing hashes alone is not completion.

There is no configured automated browser test for the camera/navigation flow.
Use the manual matrix in [homepage-contract.md](homepage-contract.md) for now.
