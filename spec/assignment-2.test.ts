import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

interface MarkingCriterion {
  name: string;
  weight: number;
}

interface MarkingModel {
  mode: "holistic" | "weighted";
  criteria?: MarkingCriterion[];
}

interface ApiNode {
  id: string;
  type: string;
  title?: string;
  spec?: string[];
  meta?: {
    week?: number;
    date?: string;
    slides?: string;
    release?: string;
    due?: string;
    weight?: number;
    marking?: MarkingModel;
    [key: string]: unknown;
  };
}

interface ApiEntry extends ApiNode {
  body: string;
}

interface CourseApi {
  course: { code: string };
  nodes: ApiNode[];
}

const api = JSON.parse(readFileSync(resolve("dist/api/index.json"), "utf8")) as CourseApi;
const expectedWeeks = Array.from({ length: 12 }, (_, index) => index + 1);

// Assigned when this repo was provisioned ("course code: SLOP1810", commit
// b6f794d) -- the brief requires keeping these three digits no matter which
// level digit the finished course chooses.
const PROVISIONED_DIGITS = "810";

const nodesOfType = (type: string) => api.nodes.filter((node) => node.type === type);

const readBuiltPage = (...segments: string[]) =>
  readFileSync(resolve("dist", ...segments, "index.html"), "utf8");

const readApiEntry = (id: string) =>
  JSON.parse(readFileSync(resolve("dist/api", `${id}.json`), "utf8")) as ApiEntry;

const headingText = (html: string, level: number) =>
  Array.from(html.matchAll(new RegExp(`<h${level}[^>]*>([\\s\\S]*?)</h${level}>`, "g")), (match) =>
    match[1].replace(/<[^>]+>/g, "").replace(/\\s+/g, " ").trim(),
  );

const assessment = (id: string) => {
  const found = api.nodes.find((node) => node.id === `assessments/${id}`);
  expect(found, `missing assessment ${id}`).toBeDefined();
  return found!;
};

describe("assignment 2 spec", () => {
  it.each([
    ["index.html", "/comp4020-ass2-lyclccylcq/"],
    ["course/index.html", "/comp4020-ass2-lyclccylcq/course/"],
    ["weeks/01/index.html", "/comp4020-ass2-lyclccylcq/weeks/"],
  ])("marks only the current navigation section on %s", (page, expectedHref) => {
    const html = readFileSync(resolve("dist", page), "utf8");
    const nav = html.match(/<nav class="at-nav"[\s\S]*?<\/nav>/)?.[0];
    expect(nav, `navigation not found in ${page}`).toBeDefined();

    const currentLinks = Array.from(
      nav!.matchAll(/<a href="([^"]+)" aria-current="page">/g),
      (match) => match[1],
    );
    expect(currentLinks).toEqual([expectedHref]);
  });

  it("keeps the SLOP code's provisioned three digits", () => {
    expect(api.course.code).toMatch(/^SLOP\d{4}$/);
    expect(api.course.code.slice(-3)).toBe(PROVISIONED_DIGITS);
  });

  it("keeps one lecture and one practical aligned across all twelve weeks", () => {
    const schedule = (type: string) =>
      nodesOfType(type)
        .map((node) => ({ week: node.meta?.week, date: node.meta?.date }))
        .sort((a, b) => Number(a.week) - Number(b.week));

    const lectures = schedule("lectures");
    const practicals = schedule("sessions");
    expect(lectures.map(({ week }) => week)).toEqual(expectedWeeks);
    expect(practicals.map(({ week }) => week)).toEqual(expectedWeeks);
    expect(lectures).toEqual(practicals);
  });

  it("has at least one lecture linking to a real, non-placeholder deck", () => {
    const withSlides = nodesOfType("lectures").filter(
      (node) => typeof node.meta?.slides === "string",
    );
    expect(withSlides.length, "no lecture has a slides: link").toBeGreaterThan(0);

    const real = withSlides.filter((node) => {
      const slug = (node.meta!.slides as string).replace(/^\/decks\//, "").replace(/\/$/, "");
      const deckPath = resolve("src/decks", `${slug}.deck.mdx`);
      return existsSync(deckPath) && !readFileSync(deckPath, "utf8").includes("STARTER_CONTENT");
    });
    expect(real.length, "every linked deck is still the starter placeholder").toBeGreaterThan(0);
  });

  it("preserves the accepted assessment titles, timing and 20/20/40/20 weighting", () => {
    const summary = nodesOfType("assessments")
      .map((node) => ({
        id: node.id,
        title: node.title,
        week: node.meta?.week,
        release: node.meta?.release,
        due: node.meta?.due,
        weight: node.meta?.weight,
      }))
      .sort((a, b) => a.id.localeCompare(b.id));

    expect(summary).toEqual([
      {
        id: "assessments/assessment-01",
        title: "Assessment 01: Critical Analysis",
        week: 2,
        release: "2027-03-01T00:00:00+11:00",
        due: "2027-03-15T23:59:00+11:00",
        weight: 20,
      },
      {
        id: "assessments/assessment-02",
        title: "Assessment 02: Unedited Partner Shoot",
        week: 4,
        release: "2027-03-15T00:00:00+11:00",
        due: "2027-04-05T23:59:00+10:00",
        weight: 20,
      },
      {
        id: "assessments/final-assessment",
        title: "Assessment 03: Final Partner Portrait Series",
        week: 8,
        release: "2027-04-12T00:00:00+10:00",
        due: "2027-05-14T23:59:00+10:00",
        weight: 40,
      },
      {
        id: "assessments/tutorial-participation",
        title: "Tutorial Participation",
        week: 2,
        release: "2027-03-01T00:00:00+11:00",
        due: "2027-05-03T23:59:00+10:00",
        weight: 20,
      },
    ]);
  });

  it("protects the promised marking split for the practical assessments", () => {
    expect(assessment("assessment-01").meta?.marking?.mode).toBe("holistic");
    expect(assessment("assessment-02").meta?.marking).toEqual({
      mode: "weighted",
      criteria: [
        { name: "Original unedited photographs", weight: 50 },
        { name: "Planning and photographic rationale report", weight: 50 },
      ],
    });
    expect(assessment("final-assessment").meta?.marking).toEqual({
      mode: "weighted",
      criteria: [
        { name: "Final partner portrait series", weight: 80 },
        { name: "Partner feedback and self-reflection", weight: 20 },
      ],
    });
  });

  it("keeps ten two-mark tutorials from Week 2 through Week 11", () => {
    const tutorial = readApiEntry("assessments/tutorial-participation");
    const scheduledWeeks = Array.from(
      tutorial.body.matchAll(/^\| Week (\d+) \| [^|]+ \| 2 \|$/gm),
      (match) => Number(match[1]),
    );

    expect(scheduledWeeks).toEqual(Array.from({ length: 10 }, (_, index) => index + 2));
    expect(tutorial.spec).toEqual(
      expect.arrayContaining([
        "each tutorial awards one mark for attendance and participation",
        "each tutorial awards one mark for a photograph submitted during that tutorial",
      ]),
    );
  });

  it("keeps every practical structured around preparation, action and review", () => {
    for (const node of nodesOfType("sessions")) {
      const practical = readApiEntry(node.id);
      expect(practical.spec?.length, `${node.id} needs observable outcomes`).toBeGreaterThanOrEqual(3);
      expect(practical.body, `${node.id} needs preparation`).toContain("## Before the session");
      expect(practical.body, `${node.id} needs in-class practice`).toContain("## In the session");
      expect(practical.body, `${node.id} needs a review step`).toContain("## Afterwards");
    }
  });

  it.each([
    ["assessments", "Assessments"],
    ["lectures", "Lectures"],
    ["people", "Teaching Team"],
  ])("renders one descriptive page title on /%s/", (page, expectedTitle) => {
    expect(headingText(readBuiltPage(page), 1)).toEqual([expectedTitle]);
  });

  it("keeps the course-specific ANU and AI policy boundaries visible", () => {
    const policies = readBuiltPage("policies");

    expect(policies).toContain('href="https://policies.anu.edu.au/ppl/document/ANUP_6477101"');
    expect(policies).toContain('href="https://www.legislation.gov.au/Details/F2021L00997"');
    expect(policies).toContain(
      'href="https://www.anu.edu.au/students/program-administration/assessments-exams/extenuating-circumstances-application"',
    );
    expect(policies).toContain('href="https://policies.anu.edu.au/ppl/document/ANUP_6097481"');
    expect(policies).toContain("AI-assisted photo editing is permitted");
    expect(policies).toContain("image generated from scratch by AI");
    expect(policies).toContain("fabricate or alter camera settings, capture parameters or EXIF");
  });
});
