# Homepage contract and visual verification

This is the current, student-controlled design baseline, not an immutable brief.
The latest explicit user direction may change it within the fixed assignment
constraints. After a change is accepted, update the affected rule here and
record the reasoning in `PROCESS.md` when relevant; do not leave competing old
and new directions in the same contract.

## Composition and motion

- `src/pages/index.astro` uses `CameraRevealSequence` as the homepage body.
  Course, assessment and policy content remains available through its own
  routes and the navigation.
- The full-height photographic opening carries the official light-on-dark
  SlopU logo and course title over an original partner-photography image. Use a
  clean, softly lit daytime scene with open space behind the title; keep the
  dark editorial tone through targeted gradients, not an underexposed night
  street or a heavy full-frame black overlay. Its single twelve-week preview
  strip sits at the true bottom of the section, with
  no spacer, oversized section height or negative-margin overlap below it.
  Square photographs form a staggered editorial stream, not a grid. The left
  side must not be sparse; gaps can vary while the stream stays continuous.
  Each image enters at roughly 62% scale and grows with horizontal viewport
  position, reaching full scale only near the far-right edge. Use
  `object-fit: cover`; never stretch the photographs.
- A separate course-intent statement follows the complete opening. Its message
  frames photographing a girlfriend or partner as an act of care and love: make
  photographs they feel at home in and genuinely want to keep, with technique
  serving the person rather than the photographer's artistic ambition.
  Preserve its breathing space before the camera sequence. The camera must not
  overlap the opening strip or rise into view from below: its first frame is
  already a complete, centred line drawing occupying most of the viewport.
- Motion follows native scroll and reverses cleanly. Do not intercept wheel
  input or create a second scroll system. Reduced motion and no-JS states must
  remain useful.

## Registered camera and course wall

- `CameraIllustration.astro` contains one registered rear-view SVG camera.
  Line-art and material layers share its geometry; scrolling adds shading,
  leather grain and a materialisation highlight in place. Do not assemble a
  different camera, swap in a stock photograph or introduce exaggerated top
  perspective and elliptical dial faces.
- Render the compact mirrorless body with restrained physical cues: low
  knurled dial edges, gunmetal shell gradients, a layered central EVF, rubber
  eyecup, recessed glass, inset controls, leather grain and proportionate strap
  lugs. Dials should read as mechanical controls, not vents or floating sliders.
  Keep the red record control inside the silhouette. The only body engraving
  is `SLOP 1810`.
- The illustrated LCD opening is `420/385/760/420` in the `1600×1000` SVG
  viewBox. `.monitor-anchor` in `StickyCameraStage.astro` is
  `26.25%/38.5%/47.5%/42%`. Their shared centre prevents lateral drift while
  the monitor expands. If the screen geometry changes, update the SVG,
  anchor and `MonitorFrame` together and inspect intermediate scroll positions.
- The monitor goes dark to lit, opens with left/right shutters and expands to
  fill the viewport. The camera grows with it before fading past the frame.
  Keep one live `FullscreenLectureGallery` instance inside the monitor rather
  than crossfading to a second gallery.
- The twelve original images in `src/assets/images/gallery/week-01.png`
  through `week-12.png` keep their one-image-per-week mapping. The three
  seamless rows alternate direction and continue moving while an image is
  selected. Hover and keyboard focus reveal a centred preview; both image and
  preview link to the correct week using the configured base path. All twelve
  unique links stay keyboard-reachable despite visual clones.

## Menu and route lifecycle

- The six primary links end with Teaching Team (`/people/`), not Policies.
  Keep the Policies page at `/policies/` reachable from Course Details; it is
  supporting course information rather than a primary menu destination.
- The expanded menu places navigation on the left and an original front-view
  line-art camera on the right. Keep restrained outlines, an open background
  and small amber details. Its body follows the pointer up to 12 degrees
  vertically and 18 degrees horizontally; the lens moves independently at a
  smaller range. Both return to neutral when the pointer leaves or the menu
  closes, never intercept links, and remain static under reduced motion.
  The toggle reads `MENU` when closed and `CLOSE` when expanded.
- Astro client-side transitions must permit mount, unmount and mount again.
  Initialise immediately and on `astro:page-load`, guard duplicate setup,
  cancel rAF work and disconnect observers/listeners on `astro:before-swap`,
  and re-measure on `pageshow`, resize and observed layout changes. Never use a
  full-page reload to hide a navigation or browser-Back bug.

## Browser acceptance matrix

Use the real base-path URL, not a root-path preview. For camera/gallery
changes, inspect these states in the rendered page:

1. Photographic opening, course identity and one moving bottom preview strip;
   the camera remains below the viewport.
2. Complete centred camera line art, with no geometry jump or upward entrance.
3. Materialisation highlight and leather grain resolving into the rendered
   camera, then the fully rendered body with a dark monitor.
4. Monitor power-on, shutters opening onto the moving gallery, and expansion
   without horizontal drift; body and monitor enlarge together.
5. Full-screen wall with three continuously looping alternating rows; hover
   and keyboard previews for at least two different weeks update image, title
   and link together.
6. Reverse scroll, narrow/mobile viewport and reduced-motion state.
7. Fresh Home load; Home to an internal page and back via logo; Home to an
   internal page and back via browser Back; repeated round trips; direct
   refresh; and resize after returning. Check for duplicate animation, blank
   content, missing photographs, bad spacing and console errors.

No automated browser navigation suite is currently configured. This matrix
is a manual verification requirement until one exists; do not report it as
passed unless those paths were actually exercised.
