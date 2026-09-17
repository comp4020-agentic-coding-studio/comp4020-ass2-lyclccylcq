# Process overview

## What I built

I built **Partner Photography**, a twelve-week Slop University course about
making photographs with another person rather than merely taking photographs
of them. Its dark editorial homepage turns a rear-view camera into navigation:
a twelve-image stream introduces the weeks, then a line drawing gains material
as the visitor scrolls. Its monitor powers on, opens and becomes the full-screen
course wall. The same gallery remains present throughout, so the visual concept
also serves the information architecture.

## How I got here

I first separated SlopU's fixed name, marks, palette, collections and generated
API from the course-level freedom to redesign pages, artwork and language. I
recorded this boundary in `CLAUDE.md`. The first implementation established the
course record, assessments, policy, resources and week routes in
[`17d0279`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-lyclccylcq/commit/17d0279).
I then developed the twelve-week teaching arc in
[`31c68e7`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-lyclccylcq/commit/31c68e7): beginning with collaboration and planning, moving through direction,
body language and light, and ending with selection and a partner shoot.

I tested a pastel system, an asymmetric editorial layout and an image-led
lecture wall across
[`36c12ca...07daada`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-lyclccylcq/compare/36c12ca...07daada).
They established typography and photographic sequencing, but still behaved like
conventional stacked course pages. The breakthrough was using a camera monitor
as the transition from identity to navigation. The first prototype arrived in
[`d3417c8`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-lyclccylcq/commit/d3417c8).
I rebuilt rather than merely polished it in
[`4b82232...b4f4d6d`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-lyclccylcq/compare/4b82232...b4f4d6d),
producing one registered SVG camera and three seamless alternating gallery
streams. The next iterations added the interactive menu camera and full-height
photographic opening, but browser inspection exposed sparse composition,
stretched tiles and unstable return navigation. The final direction responded
to feedback including:

> “照片流左侧目前明显显得稀疏……点击logo或者进入其他页面然后回退到home的时候home会出现问题。”

> “滚动的时候屏幕发生了肉眼可见的偏移……相机屏幕在初始状态就应该在屏幕中央。”

Across
[`8d02c5a...75eb717`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-lyclccylcq/compare/8d02c5a...75eb717),
I made the stream dense, square and bottom-aligned, with a positional scale ramp
that peaks only at the right edge. Animation setup became idempotent across
Astro transitions, with rAF, observers and listeners cleaned on
`astro:before-swap`. The final camera uses a strict rear elevation, layered EVF,
rubber eyecup, recessed glass and proportionate controls. Its LCD and DOM anchor
share an exact horizontal centre, removing lateral drift during expansion.

## Model capability or agent framework?

This project made me question whether agent quality comes from the base model
or its surrounding framework. In my A2 work, GPT-5.6 often reached the intended
layout after one prompt, while my Sonnet setup needed repeated clarification
that I wanted structural rather than colour or style changes. This was not a
controlled benchmark: context, tools, instructions and browser feedback
differed, so I cannot attribute the difference to the model alone.

The practical lesson was to stop treating `CLAUDE.md` as a generic prompt. In
[`1d6b932`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-lyclccylcq/commit/1d6b932),
I turned it into persistent project memory: fixed constraints, visual rules,
lifecycle invariants and verification routes. Feedback became reusable rules:
an exactly centred LCD, one gallery instance and cleanup before Astro page
swaps. The model proposes solutions; the framework preserves decisions and
avoids relearning. For a larger project, I would separate design, architecture,
testing and verification into focused modules instead of one universal file.

## How I verified it

I tested the real base-path URL through every scroll state, reverse scrolling,
fresh load, logo return, browser Back, repeated trips, refresh and resize. At
[`75eb717`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-lyclccylcq/commit/75eb717),
type checking reports no errors; the build generates 42 pages and passes its
accessibility, base-path and internal-link checks. The evidence gate still
identifies starter people entries/images, two session entries, the Week 1 deck
and starter card/hero assets. I have left those failures visible rather than
weakening checks. The process taught me to treat browser observation and
critical feedback as engineering evidence: a strong concept succeeds only when
its geometry, lifecycle and navigation contracts are explicit.
