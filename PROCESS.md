# Process overview

## Defining the course

I decided that a good course needs more than accurate content. It needs a clear
purpose, visible progression, assessments aligned with practice, and concrete
cases that show why a choice fails and how to improve it. I built **Partner
Photography**, a twelve-week course about photographing with, rather than merely
of, another person. It does not train professional portrait photographers; it
helps students plan, communicate and photograph an ordinary partner to produce
better images and a comfortable shared experience. A technically correct
portrait is not successful if the subject dislikes it or the process damages
the day. Technical knowledge serves that relationship rather than replacing it.
The early structure in
[`17d0279`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-lyclccylcq/commit/17d0279)
and teaching arc in
[`31c68e7`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-lyclccylcq/commit/31c68e7)
established that direction, but later revisions made it much more specific.

Week 1 now begins with “Does she like the photos you take?”, separating
technical quality, artistic ambition and a partner's everyday preferences
([`7afaa5f`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-lyclccylcq/commit/7afaa5f)).
Weeks 2–3 turn care into preparation: researching locations, pacing a date,
choosing equipment that will actually be carried, and matching lenses to the
intended feeling
([`5b33274`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-lyclccylcq/commit/5b33274)).
The final curriculum pass rebuilt Weeks 4–12 around perspective, light,
composition, exposure, style, communication, movement, collaborative
selection and restrained editing. It also aligned every practical with that
progression. Each topic pairs theory with recognisable failures and a practical
correction: bad distance, harsh overhead light, cluttered backgrounds, vague
directions or blame. Students compare the
outcomes and practise a better response instead of only memorising rules. Week
10's contrasting “photography bibles” use humour to expose blame and show how
short, genuine encouragement builds confidence
([`488a02b`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-lyclccylcq/commit/488a02b)).

The assessments test the same arc: analysis (20%), an unedited planned shoot
(20%), a complete portrait project with partner feedback (40%), and ten
tutorials combining participation with submitted photographs (20%). Their
dates and marking logic were made explicit across
[`c4e267e...2e007d8`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-lyclccylcq/compare/c4e267e...2e007d8).
Policies were also made course-specific: ANU guidance anchors integrity,
extensions and respectful practice, while AI-assisted retouching is
distinguished from generating a submitted image or falsifying capture data
([`cbf2171...44a47c2`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-lyclccylcq/compare/cbf2171...44a47c2)).

## Designing the site as part of the argument

Pastel, editorial and image-led experiments improved hierarchy but still felt
like interchangeable course templates
([`f1be349...07daada`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-lyclccylcq/compare/f1be349...07daada)).
The rear-camera prototype made the interface express the subject: scrolling
materialises a camera, powers its monitor and reveals the twelve weeks as a
moving contact sheet
([`d3417c8`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-lyclccylcq/commit/d3417c8)).
Browser testing then exposed sparse composition, stretched tiles, shifted
alignment and duplicated navigation state. I replaced visual offsets with
shared geometry, idempotent setup and lifecycle cleanup across
[`1d6b932...75eb717`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-lyclccylcq/compare/1d6b932...75eb717).
The same course voice now continues through the Week 1 deck, photographic week
cards and responsive 404 page rather than stopping at the homepage.

## Turning judgement into a harness

I encoded stable decisions in `CLAUDE.md`: one course argument, one dark visual
system, fixed branding, base-path-safe routing, shared responsive geometry and
exact 1920×1080 and 390×844 review sizes. Automated checks protect the floor:
course-code digits, twelve week routes, the lecture deck, navigation, assessment
weighting, accessibility, internal links and base-path behaviour. Widening that
suite from eight checks to fifteen
([`07a55dc`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-lyclccylcq/commit/07a55dc))
pinned down the assessment titles and dates, the ten two-mark tutorials, the
preparation/action/review shape of every practical, the ANU and AI policy
boundaries, and one descriptive heading per index page. The count mattered less
than the act of writing them down: each check turns an expectation I had been
restating in prompts into something the build enforces, so the work depends less
on a model reading the same requirement the same way twice. I deliberately
left subjective decisions—whether the writing feels caring, the camera motion
feels coherent, and the examples serve ordinary partners—to manual review;
those cannot be reduced honestly to string assertions.

## Comparing agents, not just models

Working the same design problems through two assistants, I consistently got
stronger results from GPT-5.6 than from Claude Sonnet 5 on comparable prompts.
I first read that as raw model capability. Comparing their behaviour more
carefully suggested something narrower: the better runs were better at holding
vague design intent, connecting a visual judgement to the code that actually
produced it, reasoning across several files at once, and tracing a fault past
the component where it first appeared.

Those are habits of the agentic system as much as of the model underneath it—how
context is gathered and kept, how the project is navigated, which tools get
used and when, whether the rendered result is inspected rather than assumed, and
how willingly the loop iterates instead of stopping at the first plausible edit.
`CLAUDE.md` supports all of that by supplying context, but a document cannot
navigate, inspect or retry on its own; it can only tell an agent what to care
about once it does.

## Acceptance

I tested fresh load, reverse scroll, logo return, browser Back, refresh, resize,
keyboard navigation and reduced motion at both marking viewports. The current
site builds 54 pages and passes all fifteen automated tests plus the evidence
gate. I accepted it only when the checks were green **and** the curriculum,
interaction, failure states and assessment story still felt like one course.
