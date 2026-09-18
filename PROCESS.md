# Process overview

## What I built

I built **Partner Photography**, a twelve-week Slop University course on
photographing with, rather than merely of, another person. Its dark editorial
homepage turns a rear-view camera into navigation:
a twelve-image stream introduces the weeks, then a line drawing gains material
as the visitor scrolls. Its monitor powers on, opens and becomes the full-screen
course wall. The persistent gallery makes the visual concept the information
architecture.

## How I got here

I separated SlopU's fixed name, marks, palette, collections and generated API
from course-level design freedom. I recorded this boundary in `CLAUDE.md`.
The first implementation added the
course, assessments, policies, resources and week routes in
[`17d0279`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-lyclccylcq/commit/17d0279).
I developed the twelve-week teaching arc in
[`31c68e7`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-lyclccylcq/commit/31c68e7): from collaboration and planning through direction, body language and
light to selection and a partner shoot.

I tested pastel, asymmetric editorial and image-led lecture layouts across
[`36c12ca...07daada`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-lyclccylcq/compare/36c12ca...07daada).
They established typography and sequencing but remained conventional pages.
A camera monitor finally connected identity to
navigation. The first prototype arrived in
[`d3417c8`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-lyclccylcq/commit/d3417c8).
I rebuilt it in
[`4b82232...b4f4d6d`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-lyclccylcq/compare/4b82232...b4f4d6d),
producing one registered SVG camera and three seamless alternating gallery
streams. Later iterations added the interactive menu camera and photographic
opening; browser inspection exposed sparse composition, stretched tiles and
unstable return navigation. Translated feedback highlighted:

> "The photo stream looks sparse on the left... Home breaks after I click the logo or return from another page."

> "The screen visibly shifts during scrolling... The camera monitor should be centred from the start."

Across
[`8d02c5a...75eb717`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-lyclccylcq/compare/8d02c5a...75eb717),
I made the stream dense, square and bottom-aligned, with a positional scale ramp
that peaks only at the right edge. Animation setup became idempotent across
Astro transitions, with rAF, observers and listeners cleaned on
`astro:before-swap`. The rear camera uses a strict elevation, layered EVF,
rubber eyecup and proportionate controls. Its LCD and DOM anchor share an exact
horizontal centre, removing lateral drift during expansion. Finally,
[`427522a`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-lyclccylcq/commit/427522a)
refined the viewfinder and hot shoe; the menu camera became line art with
stronger pointer tilt.

## Model capability or agent framework?

This project made me question whether agent quality comes from the base model
or its surrounding framework. In my A2 work, GPT-5.6 often reached the intended
layout after one prompt, while my Sonnet setup needed repeated clarification
that I wanted structural rather than colour or style changes. This was not a
controlled benchmark: context, tools, instructions and browser feedback
differed, so I cannot attribute the difference to the model alone.

The lesson was to stop treating `CLAUDE.md` as a generic prompt. In
[`1d6b932`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-lyclccylcq/commit/1d6b932),
I turned it into persistent project memory: fixed constraints, visual rules,
lifecycle invariants and verification routes. Feedback became reusable rules:
an exactly centred LCD, one gallery instance and cleanup before Astro page
swaps. The model proposes solutions; the framework preserves decisions and
avoids relearning. Now `CLAUDE.md` holds durable rules,
`docs/homepage-contract.md` the accepted design and browser checks, and
`docs/check-status.md` dated verification results.

## How I verified it

I tested the real base-path URL through every scroll state, reverse scrolling,
fresh load, logo return, browser Back, repeated trips, refresh and resize. After
[`427522a`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-lyclccylcq/commit/427522a),
type checking and the 42-page build passed accessibility, base-path and link
checks. Spec tests still found only two dated sessions and a placeholder deck;
the evidence gate flagged starter people, sessions and images. I left those
failures visible rather than weakening checks. The process taught me to treat
browser observation and
critical feedback as engineering evidence: a strong concept succeeds only when
its geometry, lifecycle and navigation contracts are explicit.
