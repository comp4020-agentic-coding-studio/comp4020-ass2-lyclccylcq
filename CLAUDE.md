# Your harness

Nothing about the starter is recorded here. The platform under you is fixed and
documented in `README.md`, and the
[course website](https://comp.anu.edu.au/courses/comp4020-agentic-coding-studio/)
publishes this deliverable's brief and spec. Read both before you plan or build;
what the agent needs to carry from either is your call.

## How to work in here

- Keep the dev server running (`pnpm dev`) so you see changes as you make them.
- Run `pnpm check` before you push.
- Open the page in a browser and look at it. The rendered page is the truth;
  your mental model of it isn't.
- When a check fails, read its output before you change anything.
- Never commit a red state.
- Never edit a spec test to make it pass. A red test names a contract the
  implementation hasn't met yet; fix the implementation.
- Explain before departing. If a substantial decision moves away from the
  agreed direction, say why before implementing it, not after.

## Assignment design constraints (fixed vs. student-controlled)

Source of truth (external, authoritative — check this if this section and the
live brief ever disagree):
<https://comp.anu.edu.au/courses/comp4020-agentic-coding-studio/assessments/assignment-2/>

Confirmed wording from that brief, "The brief" section: "The university is
fixed and the course is yours: SlopU's name, marks and palette, the content
collections and the generated API stay as they arrived, and everything a
course gets to decide — the pages, slide decks, components, navigation,
artwork, styling and every word of content — is up to you." `README.md`
elaborates the same split in template-file terms.

**Fixed — must remain as provided:**

- SlopU's name ("Slop University" / SlopU) — the institution's name is fixed,
  not a course-level choice, even though the literal string is set in this
  repo's `src/site-config.ts` (`name: "Slop University"`).
- SlopU's marks — the crest/logo assets and favicon (`astro-theme-slop`'s
  `slopBranding` export: `logo`, `logoDark`, `logoCompact`, `favicon`).
- SlopU's palette — the brand colour tokens (`astro-theme-slop/slop.css`:
  `--at-primary`/`--at-secondary`/`--at-tertiary`), wired into
  `src/site-config.ts` and `astro.config.ts`.
- The content collections — `sessions`, `assessments`, `lectures`, `people`
  (declared in `src/content.config.ts`) and their keys; collection key, page
  URL and generated JSON path agree by construction, so renaming one means
  renaming all.
- The generated API (`dist/api/**`, built by the pipeline in
  `astro.config.ts`) — platform plumbing, not an API-design exercise.

**Student-controlled — redesign freely:** the course itself, the pages,
slide decks, components, navigation, artwork, styling and every word of
content. `README.md`'s more granular gloss on the same freedom: page
composition, navigation presentation, components, artwork/imagery,
typography, spacing, section layouts, visual hierarchy, responsive
presentation, styling, and how course content is presented.

The starter's current layout and component structure are a starting point,
not a constraint — neither the brief nor the README asks you to preserve
them. Only the fixed items above, plus required content, functionality,
routes and technical contracts (the spec in `spec/README.md` and the course
website's published spec), need to survive a redesign.

**On "visual redesign" requests:** don't treat a redesign request as
satisfied by only changing colours, border-radius, shadows, or CSS custom
properties. Consider the whole visual system — layout, composition,
typography, imagery, spacing, component anatomy, section rhythm, navigation
treatment, and responsive behaviour — while preserving SlopU's name, marks
and palette, the content collections, and the generated API untouched.
Before a substantial structural or visual change, re-read the brief (URL
above) and `README.md`, and check the current implementation, to confirm
what's actually fixed vs. student-controlled, rather than assuming the
starter's present shape — or a prior redesign pass's shape — is a
requirement.

## The checks

`pnpm check` runs them, and `pnpm check:evidence` is the extra gate before you
ship. CI runs the same plus links, secrets and the deploy.

`spec/README.md`, `PROCESS.md` and `reflections/README.md` are in this repo and
say what they are for.

## This file is yours

A starting point, not a rulebook: what you add to it is the harness, and the
harness is assessed. This file and the sensors you wire into `check` carry
across the course --- both come with you into next week's repo.
