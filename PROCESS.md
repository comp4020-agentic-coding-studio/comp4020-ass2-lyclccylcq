# Process overview

## Defining the course

**Partner Photography** teaches students to take photographs their partner—in
the course's framing, their girlfriend—actually likes. It does not train
professional portrait photographers: planning, communication and camera
technique are tools for that one goal, and for making the shoot itself
something both people enjoy.

The twelve weeks move from why partner photos disappoint, through preparation
and equipment, into core craft, and then into direction, joint selection and
restrained editing. I set that skeleton early
([`17d0279`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-lyclccylcq/commit/17d0279),
[`31c68e7`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-lyclccylcq/commit/31c68e7)),
but only the final content pass made it specific, pairing each topic with a
recognisable failure and a practical correction rather than a rule to memorise
([`488a02b`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-lyclccylcq/commit/488a02b)).
The assessments follow the same arc, and their dates and marking logic were
settled across
[`c4e267e...2e007d8`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-lyclccylcq/compare/c4e267e...2e007d8).

## Designing the site as part of the argument

Pastel, editorial and image-led layouts improved hierarchy but still read as
interchangeable course templates
([`f1be349...07daada`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-lyclccylcq/compare/f1be349...07daada)).
The turn came from letting the interface express its subject: scrolling
materialises a camera, powers its monitor, and opens it into the twelve weeks
as a moving contact sheet
([`d3417c8`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-lyclccylcq/commit/d3417c8)).
Browser testing then exposed what the idea had hidden—sparse composition,
drifting alignment, duplicated navigation state—so I replaced visual offsets
with shared geometry, idempotent setup and lifecycle cleanup
([`1d6b932...75eb717`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-lyclccylcq/compare/1d6b932...75eb717)).
That photographic language now carries through the Week 1 deck, the week cards
and the 404 page.

## Turning judgement into a harness

Two things carry decisions between sessions, and they do different work.
`CLAUDE.md` holds the stable ones—one course argument, one dark visual system,
fixed branding, base-path-safe routing, shared responsive geometry, the exact
1920×1080 and 390×844 review sizes—so a new session starts from the current
direction instead of relitigating it.

The automated checks do something `CLAUDE.md` cannot: they make a requirement
enforceable. Widening the suite from eight checks to fifteen
([`07a55dc`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-lyclccylcq/commit/07a55dc))
pinned down the assessment titles and dates, the ten two-mark tutorials, the
preparation/action/review shape of every practical, the ANU and AI policy
boundaries, and one descriptive heading per index page. Each of those was
something I had been restating in prompts and then re-checking by hand. Written
as a test, it no longer depends on a model reading the same sentence the same
way on a different day, in a different run, with different context in view; the
build either agrees or fails.

I deliberately left the subjective decisions—whether the writing feels caring,
whether the camera motion feels coherent, whether the examples serve ordinary
partners—to manual review. Those cannot be reduced honestly to string
assertions.

## Comparing agents, not just models

While designing the site I worked the same problems through two assistants, and
GPT-5.6 consistently produced better results than Claude Sonnet 5 from
comparable prompts. My first reading was the obvious one: a difference in model
capability.

Looking more closely, the gap showed up in particular behaviours rather than in
general fluency. The stronger runs held onto vague design intent instead of
narrowing it to the nearest literal instruction. They connected a visual
judgement—this feels sparse, this drifts on scroll—to the code that actually
produced it. They reasoned across several files at once rather than editing the
first one that matched. They traced a fault past the component where it
surfaced to the one causing it. They looked at the rendered result instead of
assuming the edit had worked, and they kept iterating rather than stopping at
the first plausible fix.

Listed like that, most of those are not really properties of a model. They are
properties of the system around it: what context gets gathered and kept, how the
project is navigated, which tools are reached for and when, whether output is
inspected or trusted, and how long the loop runs before it declares success. So
I was not comparing two models. I was comparing two complete agentic coding
systems, and attributing the whole difference to the weights inside them was the
wrong inference. `CLAUDE.md` matters here, but its role is bounded: it can tell
an agent what this project has already decided and what to care about. It cannot
navigate the repository, run the build, look at the page or try again—those are
things an agent either does or does not do.

## Acceptance

I tested fresh load, reverse scroll, logo return, browser Back, refresh, resize,
keyboard navigation and reduced motion at both marking viewports. The site
builds 54 pages and passes all fifteen automated tests plus the evidence gate. I
accepted it only when the checks were green **and** the curriculum, interaction,
failure states and assessment story still felt like one course.
