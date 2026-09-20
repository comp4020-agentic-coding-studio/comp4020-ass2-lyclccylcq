# Process overview

## What I decided a good course should be

I built **Partner Photography**, a twelve-week course about photographing with,
rather than merely of, another person. Its argument is that a photograph the
subject feels loved in matters more than one that only demonstrates the
photographer's artistry. The first framework and course routes arrived in
[`17d0279`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-lyclccylcq/commit/17d0279);
the teaching arc in
[`31c68e7`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-lyclccylcq/commit/31c68e7)
moves from consent and planning through direction, body language, light,
selection and a final partner shoot. Coherence became my acceptance criterion:
every page had to advance that relationship, not merely fill a schema.

## Directing the artefact

I tested pastel, asymmetric editorial and image-led layouts across
[`f1be349...07daada`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-lyclccylcq/compare/f1be349...07daada).
They improved hierarchy but still felt like interchangeable course templates.
The rear-camera prototype in
[`d3417c8`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-lyclccylcq/commit/d3417c8)
made the interface itself express the subject: scrolling materialises a camera,
powers its monitor and opens twelve weeks as a moving contact sheet.

Browser testing changed what I accepted. The first photo stream was sparse on
the left, later tiles stretched, the monitor shifted during expansion, and
returning through the logo or browser Back could duplicate state. Across
[`1d6b932...75eb717`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-lyclccylcq/compare/1d6b932...75eb717)
I replaced visual guesses with geometry: square tiles follow a positional scale
ramp; the SVG LCD and DOM anchor share one centre; setup is idempotent; rAF,
observers and listeners clean up before Astro swaps. Exact 1920×1080 and
390×844 checks also exposed a second class of failure: a composition could look
correct in my browser while fixed widths, intrinsic grid sizing or independently
scaled layers clipped on the phone. The 404 composition repeated that mistake;
I put its layers on one responsive canvas in
[`01c3698`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-lyclccylcq/commit/01c3698).
I encoded those diagnoses, not one-off offsets, in
[`8cb6800`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-lyclccylcq/commit/8cb6800)
and the [homepage contract](docs/homepage-contract.md).

The final content pass made the visual promise real. Course branding and four
teaching-team profiles landed in
[`c51aabe`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-lyclccylcq/commit/c51aabe),
the Week 1 deck in
[`619f885`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-lyclccylcq/commit/619f885),
and twelve practical sessions plus original sharing artwork in
[`01c3698`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-lyclccylcq/commit/01c3698).
An illustrated, base-path-safe recovery page
[`66c8b8a`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-lyclccylcq/commit/66c8b8a)
extended the same voice beyond the happy path; I then locked the single designed
dark scheme in
[`67e74b7`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-lyclccylcq/commit/67e74b7)
instead of pretending an untested light theme was a feature.

## Model capability or agent framework?

This work made me question whether agent quality comes from the base model or
its surrounding framework. GPT-5.6 often reached a layout after one prompt,
while my Sonnet setup needed repeated clarification that I wanted structural,
not cosmetic, change. This was not a controlled benchmark: tools, context and
browser feedback differed. The useful conclusion was operational. A capable
model proposes; a harness preserves judgement. In
[`b4f4d6d...fd2c7c9`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-lyclccylcq/compare/b4f4d6d...fd2c7c9)
I turned feedback into durable rules for lifecycle cleanup, shared geometry,
responsive media and verification, so later agents did not relearn the same
failure.

## How I knew it was ready

I repeated fresh load, reverse scroll, logo return, browser Back, refresh and
resize at both marking viewports, including keyboard and reduced-motion paths.
The final observed state builds 54 pages; all five spec tests, accessibility,
base-path, link and evidence checks pass. The dated commands and remaining
manual boundary are recorded in
[`8cb6800`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-lyclccylcq/commit/8cb6800)
and the [verification snapshot](docs/check-status.md). Green checks established the
floor; I accepted the result only when the course's voice, interaction and
failure states remained coherent under real navigation.
