# Process overview

## Defining the course

**Partner Photography** teaches students to take photographs their partner—in
the course's framing, their girlfriend—actually likes. It does not train
professional portrait photographers: planning, communication and camera
technique are tools for that goal, and for making the shoot something both
people enjoy.

I take a good course to develop one central idea across the semester rather
than twelve disconnected topics. So the weeks move from why partner photos
disappoint, through preparation and equipment, into craft, direction, joint
selection and restrained editing. I set that skeleton early
([`17d0279`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-lyclccylcq/commit/17d0279),
[`31c68e7`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-lyclccylcq/commit/31c68e7)),
but only the final content pass made it specific, pairing each topic with a
recognisable failure and its correction
([`488a02b`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-lyclccylcq/commit/488a02b)).
The assessments follow the same arc
([`c4e267e...2e007d8`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-lyclccylcq/compare/c4e267e...2e007d8)).

## Designing the site as part of the argument

Pastel, editorial and image-led layouts improved hierarchy but still read as
interchangeable course templates
([`f1be349...07daada`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-lyclccylcq/compare/f1be349...07daada)).
The turn came from letting the interface express its subject: scrolling
materialises a camera, powers its monitor and opens into the twelve weeks as a
moving contact sheet
([`d3417c8`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-lyclccylcq/commit/d3417c8)).
Browser testing then forced structural fixes: shared geometry, idempotent
setup and lifecycle cleanup in place of visual offsets
([`1d6b932...75eb717`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-lyclccylcq/compare/1d6b932...75eb717)).
That photographic language now carries through the Week 1 deck, the week cards
and the 404 page.

## Turning judgement into a harness

Two things carry decisions between sessions, and they do different work.
`CLAUDE.md` holds the durable ones—one course argument, one dark visual system,
fixed branding, base-path-safe routing, shared geometry and the exact marking
viewports—so a new session starts from the current direction instead of
relitigating it. Splitting it into a harness plus linked contract documents
([`fd2c7c9`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-lyclccylcq/commit/fd2c7c9))
kept it a working instrument rather than a static instruction file.

The checks do what a document cannot: they make a requirement enforceable.
Widening the suite from eight to fifteen
([`07a55dc`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-lyclccylcq/commit/07a55dc))
pinned down the assessment titles and dates, the ten two-mark tutorials, the
shape of every practical, the ANU and AI policy boundaries, and one descriptive
heading per index page. Each was something I had been restating in prompts and
checking by hand; as a test, the build either agrees or fails.

I left the subjective decisions—whether the writing feels caring, whether the
camera motion feels coherent, whether the examples serve ordinary partners—to
manual review. Those cannot be reduced honestly to string assertions.

## Comparing agents, not just models

While designing the site I worked the same problems through two assistants, and
GPT-5.6 consistently produced better results than Claude Sonnet 5 from
comparable prompts. My first reading was the obvious one: a difference in model
capability.

Looking more closely, the gap showed up in specific behaviours. The stronger
runs held vague design intent instead of narrowing it to the nearest literal
instruction; connected a visual judgement—this feels sparse, this drifts on
scroll—to the code that produced it; reasoned across several files rather than
editing the first that matched; traced a fault past the component where it
surfaced; inspected the rendered result instead of assuming the edit worked;
and kept iterating past the first plausible fix.

The homepage work shows both. Sparse composition and drift could only be fixed
by holding four interacting components to one geometry
([`75eb717`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-lyclccylcq/commit/75eb717)).
And the Home link that stayed active on every page was not a navigation bug at
all: the theme's own nav treated the deployment base path as an ordinary
section, so the fix spanned the build config, a component override and a spec
test
([`01a9938`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-lyclccylcq/commit/01a9938)).

These behaviours cannot be attributed to the model alone. They also depend on
what context is gathered and kept, how the project is navigated, which tools
are reached for, whether rendered output is inspected rather than trusted, and
how long the loop runs before declaring success—so I was comparing two agentic
systems, not two models. It was not a controlled benchmark: different prompts,
different sessions, no held-out tasks. I treat it as evidence about workflow
and agentic system design, not proof that one model is inherently better.
`CLAUDE.md` has a real but bounded role here—it can say what the project has
already decided; it cannot navigate the repository, run the build, look at the
page or try again.

## Acceptance

I tested fresh load, reverse scroll, logo return, browser Back, refresh, resize,
keyboard navigation and reduced motion at both marking viewports. The site
builds 54 pages and passes all fifteen automated tests plus the evidence gate. I
accepted it only when the checks were green **and** the curriculum, interaction,
failure states and assessment story still felt like one course.
