import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

interface ApiNode {
  id: string;
  type: string;
  meta?: Record<string, unknown>;
}

interface CourseApi {
  course: { code: string };
  nodes: ApiNode[];
}

const api = JSON.parse(readFileSync(resolve("dist/api/index.json"), "utf8")) as CourseApi;

// Assigned when this repo was provisioned ("course code: SLOP1810", commit
// b6f794d) -- the brief requires keeping these three digits no matter which
// level digit the finished course chooses.
const PROVISIONED_DIGITS = "810";

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

  it("runs across all twelve dated teaching weeks", () => {
    const weeks = api.nodes
      .filter((node) => node.type === "sessions")
      .map((node) => node.meta?.week as number)
      .sort((a, b) => a - b);
    expect(weeks).toEqual(Array.from({ length: 12 }, (_, i) => i + 1));
  });

  it("has at least one lecture linking to a real, non-placeholder deck", () => {
    const withSlides = api.nodes.filter(
      (node) => node.type === "lectures" && typeof node.meta?.slides === "string",
    );
    expect(withSlides.length, "no lecture has a slides: link").toBeGreaterThan(0);

    const real = withSlides.filter((node) => {
      const slug = (node.meta!.slides as string).replace(/^\/decks\//, "").replace(/\/$/, "");
      const deckPath = resolve("src/decks", `${slug}.deck.mdx`);
      return existsSync(deckPath) && !readFileSync(deckPath, "utf8").includes("STARTER_CONTENT");
    });
    expect(real.length, "every linked deck is still the starter placeholder").toBeGreaterThan(0);
  });

  it("adds assessment weights up to 100%", () => {
    const total = api.nodes
      .filter((node) => node.type === "assessments")
      .reduce((sum, node) => sum + (node.meta?.weight as number), 0);
    expect(total).toBe(100);
  });
});
