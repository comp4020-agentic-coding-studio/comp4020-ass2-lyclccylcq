# Your harness

This file holds durable decisions and working rules, not a running status log.
The fixed platform is documented in `README.md`, and the
[course website](https://comp.anu.edu.au/courses/comp4020-agentic-coding-studio/)
publishes this deliverable's brief and spec. Read both before substantial work.
For homepage geometry and visual acceptance use
[`docs/homepage-contract.md`](docs/homepage-contract.md); for the latest
observed test baseline use [`docs/check-status.md`](docs/check-status.md).

## Decision order and working loop

- The assignment brief, `README.md` and `spec/README.md` define fixed platform
  and required contracts. Within that boundary, the latest explicit user
  direction supersedes an earlier student-controlled design decision. Do not
  defend an outdated aesthetic rule against new feedback; explain any genuine
  conflict with a fixed requirement before changing direction.
- For each change: identify whether the request concerns structure, appearance,
  behaviour or content; reproduce the current state at the real base-path URL
  and write down the observable success condition; fix the underlying cause in
  the smallest relevant scope; then inspect the rendered result and regression
  paths. For a reported bug, reproduce the failing path before the edit and
  repeat that same path afterward. A root-path preview is insufficient.
- Keep `pnpm dev` running while designing. Use screenshots or browser states as
  evidence, not a mental model of the DOM. Reproduce the two marking viewports
  exactly (1920×1080 desktop and 390×844 phone); a resized browser window or a
  screenshot cropped to phone width is not equivalent to device emulation.
  Check reverse motion, keyboard access, reduced motion and route returns when
  the change touches them.
- Once a structural or interaction decision is accepted, update the relevant
  contract document with the new rule, rationale and verification path. Keep
  `PROCESS.md` as the retrospective account, not a duplicate rulebook. Do not
  reconstruct decisions from a final diff.
- Run `pnpm check` before every push and `pnpm check:evidence` before submission.
  Read the actual failures and compare them with `docs/check-status.md`. New
  failures caused by the current work block a commit. An unchanged, unrelated
  baseline failure is not a pass: document it and disclose it in the handoff.
  Never alter a spec test, marker or asset hash solely to silence a check.

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

### Current homepage direction

The current baseline is a photographic opening and bottom week stream, a
separate course-intent statement, then one rear-camera reveal whose monitor
becomes the twelve-week gallery. The expanded menu uses a front-view line-art
camera. This direction replaced earlier stacked course layouts, but it remains
student-controlled: a later explicit user request can revise it. Read
[`docs/homepage-contract.md`](docs/homepage-contract.md) before homepage,
camera, gallery or menu work; update that contract when a new direction is
accepted.

The intent statement is deliberately paced in two beats: the second begins on
a new line with “Across twelve weeks”. The standalone Weeks index extends the
same image-led language by filling Week 01–12 cards with the corresponding
`src/assets/images/gallery/week-01.png` through `week-12.png` photographs.
Keep the dark overlays, visible week labels and base-path-safe card links when
changing that grid; the photograph may crop, but its text and focus state must
remain legible.

### Responsive geometry and media

- A clean desktop render is never evidence that a page fits on a phone. At both
  marking viewports inspect the first screen and the entire scroll path, then
  verify `document.documentElement.scrollWidth === clientWidth`. Text, cards,
  navigation and controls must reflow without horizontal clipping; do not hide
  overflow to conceal an oversized child.
- Diagnose narrow-screen failures structurally. Check fixed widths,
  `min-width`/`min-height`, grid intrinsic sizing, absolute layers, long
  unbreakable text and viewport units before adjusting individual offsets.
  Prefer fluid tracks such as `minmax(0, 1fr)`, bounded `clamp()` sizing and an
  explicit single-column breakpoint over a desktop composition scaled down as
  one object.
- Layered artwork must share one coordinate system. A still background, GIF or
  overlay that forms one composition uses the same intrinsic canvas, aspect
  ratio, positioning origin and `contain`/`cover` rule at every viewport. When
  a figure and its surrounding photographs change size, scale their common
  wrapper so their spatial relationship does not drift. Recheck after image
  decode, refresh and resize.
- Use `cover` only where cropping is intentional, such as photographic hero
  backgrounds. Use `contain` for transparent character art, camera drawings,
  wordmarks and other assets whose full silhouette matters. Optimise ordinary
  raster assets through `astro:assets`; keep an animated GIF outside transforms
  that would flatten it, and provide a useful reduced-motion fallback.

### Course voice and site-wide presentation

- The course's central claim is that a successful partner portrait reflects
  care and the subject's wishes before the photographer's artistic ambition.
  Keep all twelve weeks distinct while carrying that claim through lectures,
  sessions, assessments and the Week 1 deck. Reject generic “content-shaped”
  filler even when it satisfies a schema.
- The accepted visual system is dark-only. `siteConfig.colorScheme` stays
  `dark`; do not restore the theme toggle or introduce an unreviewed light
  palette. SlopU's fixed gold brand colour remains an accent rather than a new
  page background.
- Navigation exposes Teaching Team as a primary destination and keeps Policies
  reachable from Course. Supporting experiences—the social card, people pages
  and 404 recovery actions—must use the same voice, base-path-safe links,
  responsive checks and accessible labels as the core course pages.

### Current teaching, assessment and policy decisions

- Week 1 opens on its deck's question, “Does Your Girlfriend Like Your
  Photos?”, and uses questions to distinguish a technically sound photograph, a
  photograph the subject likes, and an artistic image from a useful everyday
  image. It treats
  failed composition or editing, mismatched viewpoints, fatigue and disruption
  to the date as one connected experience rather than isolated camera errors.
- The Week 1 page remains a readable lesson while its deck is the live teaching
  version. Keep the **Open the slides** action near the start of the week page.
  Deck background images stay under `src/decks/assets/` and use paths relative
  to the deck file: Astromotion only copies deck-local assets into the published
  build. The course spec test resolves every built Week 1 background URL to a
  real output file so a green build cannot hide missing slide images.
  The deck's “a portrait needs three things: a good-looking person, a
  good-looking person, and a good-looking person” line is a joke that opens a
  serious comparison: professional models already manage expression and body
  position, while an ordinary partner and photographer need to improve
  together. Observation—including asking which side of the partner's face they
  prefer—is a core relationship skill, not a beauty rule.
- Assessment weights are fixed by the accepted course design: Assessment 01 is
  20%, Assessment 02 is 20%, Assessment 03 is 40%, and ten marked tutorials
  contribute the remaining 20%. Each Week 2–11 tutorial awards one mark for
  participation and one for the photograph submitted during that tutorial.
- Assessment 01 releases on the Monday of Week 2 and is due Monday of Week 4 at
  23:59; Assessment 02 releases Monday of Week 4 and is due Monday of Week 7 at
  23:59; Assessment 03 releases Monday of Week 8 and is due Friday of Week 12 at
  23:59. Keep front matter, cards, detail pages and prose consistent when any
  date changes. All assessment grading language uses the official ANU grade
  bands linked from the assessment index.
- The Resources route was intentionally removed because it was not required by
  the brief and duplicated teaching material. Do not restore it as placeholder
  navigation; add a resource surface only when it has a distinct course task.
- Policies must link to the current authoritative ANU source rather than
  inventing a local university process. Academic integrity cites the ANU
  Student Academic Integrity Policy and Academic Integrity Rule; extension
  guidance links to ANU's Extenuating Circumstances page; respectful practice
  links to the ANU Student Code of Conduct.
- AI-assisted editing of a photograph the student captured is permitted. The
  prohibited boundary is generating the submitted photograph from scratch or
  fabricating/changing capture settings, parameters or EXIF metadata. Preserve
  that distinction across policy and assessment copy; Assessment 02 still
  separately requires unedited original captures because that is the task.

## The checks

`pnpm check` runs Astro type checking, the production build and the spec tests;
`pnpm check:evidence` is the extra submission gate. CI also checks links,
secrets and deployment. A green compiler alone does not validate the homepage:
use the browser acceptance matrix in
[`docs/homepage-contract.md`](docs/homepage-contract.md). No browser navigation
test command exists yet, so do not claim automated coverage for those paths.

[`docs/check-status.md`](docs/check-status.md) holds the latest observed
results and outstanding baseline failures. It is a dated snapshot, not
permission to ignore them. Re-run checks and update it with evidence rather
than copying an old result forward. `spec/README.md`, `PROCESS.md` and
`reflections/README.md` describe the other assessment artefacts.

## This file is yours

Keep this assessed harness current as decisions mature. Prefer a short durable
rule and a link to its detailed contract over repeating a stale status report
here; the harness and the checks both carry into the next week's repository.
