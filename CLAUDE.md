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
- Record accepted structural and interaction decisions here when they become
  stable. Do not wait until final handoff and try to reconstruct the design
  history from a diff.
- For homepage work, use the real base-path URL
  `http://localhost:4321/comp4020-ass2-lyclccylcq/`. A root-path preview is not
  evidence that the deployed route works.
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

### Current homepage direction

The camera-to-gallery homepage is now the accepted design direction (established
across `4b82232` through `75eb717`). Extend it deliberately; do not restore the
starter homepage sections or replace it with a generic card grid.

- `src/pages/index.astro` intentionally uses `CameraRevealSequence` as the
  homepage body. Course, assessment and policy material remains available on
  its dedicated routes through the navigation.
- The opening is its own full-height section with the official light-on-dark
  SlopU logo and the real course title over an original photograph of one
  partner photographing the other. A single bottom-aligned strip previews all
  twelve weeks and moves continuously from left to right. Its square photographs
  are staggered into an editorial wall rather than a grid. The left side must
  begin with useful density rather than a large dead zone; spacing may vary, but
  the stream should feel continuous across the viewport. Each photograph enters
  at roughly 62% scale and grows smoothly according to horizontal viewport
  position, reaching full scale only near the far-right edge. The size gradient
  is positional, not a set of permanently different card sizes, and images use
  `object-fit: cover` so the squares never stretch.
  The strip's lowest edge forms the true bottom of the Home section. Do not add
  a spacer, oversized section height, or negative-margin overlap between it and
  the following course-intent section.
  The visitor must scroll beyond that complete section before reaching the
  separate camera sequence below it: the camera must never overlap or replace
  the opening strip. The first frame of the camera section already shows the
  complete line-art camera centred and occupying most of the viewport. Do not
  animate the camera upward from below; scrolling begins by materialising that
  registered drawing in place.
- A dedicated course-intent statement sits between the opening photo stream and
  the camera sequence. Preserve that breathing space rather than joining the two
  interactive sections directly.
- `CameraIllustration.astro` contains one registered SVG camera. Its complete
  line-art and rendered-colour layers share the same geometry. Scroll reveals
  material, shading, leather grain and a moving materialisation highlight on
  that registered camera: do not animate the drawing as an assembly, swap to a
  different camera, or introduce a stock camera photograph. Its rendered state
  is a strict rear elevation of a compact mirrorless body: no exaggerated top
  perspective or visible elliptical dial faces. Use restrained realistic cues
  instead—low knurled dial edges, gunmetal shell gradients, a layered central
  EVF housing, soft rubber eyecup, recessed glass, inset controls, leather grain
  and proportionate strap lugs. Top and rear command dials must read as mechanical
  controls, not vents, sliders or controls floating in an extra casing. The red
  record control stays inside the body silhouette. The body engraving contains
  only `SLOP 1810`; do not restore a plus mark, location slogan or the full
  course title there.
- The illustrated LCD opening is intentionally centred at
  `420/385/760/420` inside the camera's `1600×1000` SVG viewBox. The invisible
  `.monitor-anchor` in `StickyCameraStage.astro` must remain registered to
  `26.25%/38.5%/47.5%/42%`. This shared centre is an interaction invariant: it
  prevents visible lateral drift while the monitor interpolates from the camera
  to the viewport. If the monitor geometry ever changes, update the SVG opening,
  anchor and `MonitorFrame` documentation together, then verify intermediate
  scroll positions rather than only the endpoints.
- The rear monitor progresses from dark to illuminated, opens from the centre
  with left/right shutters, and then expands into the viewport. The camera body
  scales up strongly with the expanding monitor before fading beyond the frame,
  leaving the course wall full-screen. The same gallery instance lives inside
  the monitor throughout; there is no second gallery crossfaded in after
  expansion.
- `FullscreenLectureGallery.astro` is the real twelve-week navigation. Its
  three seamless horizontal streams alternate direction and continue moving
  while a photograph is selected. Hover or keyboard focus reveals a centred
  detailed preview; both the photograph and preview lead to the correct week
  using the configured base path.
- The twelve original gallery images live in
  `src/assets/images/gallery/week-01.png` through `week-12.png`. Preserve the
  one-image-per-week mapping when changing layout or motion.
- The homepage's expanded menu is a two-column composition: navigation on the
  left and an original front-view line-art camera on the right. The camera and
  its lens respond quickly with a clearly visible but controlled pointer-driven
  tilt, return to neutral when the menu closes or the pointer leaves, never
  intercept link clicks, and remain static under `prefers-reduced-motion`.
  The closed toggle visibly says `MENU` beside its icon and changes to `CLOSE`
  while expanded; do not regress it to an unexplained icon-only control.
- Motion remains native-scroll-driven and reversible. Do not intercept wheel
  input or add a second scroll system. `prefers-reduced-motion` must retain a
  useful static state, and all twelve unique week links must remain reachable
  by keyboard even though visual clones are used for seamless looping.
- Astro uses client-side route transitions. Homepage animation modules must be
  safe to mount, unmount and mount again: initialise immediately and on
  `astro:page-load`, guard against duplicate setup, and clean up rAF work,
  observers and window/document listeners on `astro:before-swap`. Re-measure on
  `pageshow`, resize and observed layout changes. Never repair navigation or
  Back-button bugs with a full-page reload. The required regression paths are a
  fresh Home load, Home → internal page → logo → Home, Home → internal
  page → browser Back → Home, repeated round trips, direct refresh and resize
  after returning.

## The checks

`pnpm check` runs them, and `pnpm check:evidence` is the extra gate before you
ship. CI runs the same plus links, secrets and the deploy.

For the homepage, a green compiler is not sufficient. Visually check these
states at the base-path URL before pushing a camera/gallery change:

1. background photograph, course identity and one continuously moving preview
   strip, with the camera still completely below the viewport;
2. complete line-art camera already centred in its section with no geometry
   jump or upward entrance;
3. leather grain and materialisation highlight resolving into the rendered
   camera;
4. fully rendered camera with a dark monitor;
5. monitor powering on;
6. left/right shutters opening onto the moving gallery;
7. camera body and monitor enlarging together, with the monitor remaining
   horizontally centred, before the body disappears;
8. full-screen course wall with three continuously looping, alternating rows;
9. hover and keyboard-focus previews, including a second week to prove the
   image, title and link update together;
10. reverse scrolling, a narrow/mobile viewport and reduced motion;
11. logo navigation, internal navigation, browser Back, repeated return trips,
    refresh and resize without duplicate animation, blank content or console
    errors.

As of `75eb717`, Astro type checking reports no errors, and the production
build, accessibility audit, base-path check and internal-link check pass across
42 generated pages. `pnpm check` still reports two content-contract gaps
outside the homepage implementation: only sessions for Weeks 1–2 exist, and
the linked Week 1 deck is still recognised as starter placeholder content.
These are outstanding course-content tasks, not reasons to weaken or edit the
spec tests. Separately, `pnpm check:evidence` still rejects tracked
`STARTER_CONTENT` markers in both people entries, both session entries and the
Week 1 deck, plus unchanged starter card, hero and people images. Replace those
assets and entries deliberately; do not remove markers or change hashes merely
to silence the gate.

`spec/README.md`, `PROCESS.md` and `reflections/README.md` are in this repo and
say what they are for.

## This file is yours

A starting point, not a rulebook: what you add to it is the harness, and the
harness is assessed. This file and the sensors you wire into `check` carry
across the course --- both come with you into next week's repo.
