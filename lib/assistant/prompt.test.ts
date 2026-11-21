import { describe, expect, it } from "vitest";
import { LIMITS } from "./config";
import { buildSystemPrompt, sanitizeMessages } from "./prompt";

describe("sanitizeMessages", () => {
  it("accepts a user question", () => {
    expect(sanitizeMessages([{ role: "user", content: " Hi " }])).toEqual([{ role: "user", content: "Hi" }]);
  });

  it("truncates long messages", () => {
    const out = sanitizeMessages([{ role: "user", content: "x".repeat(LIMITS.maxChars + 50) }]);
    expect(out?.[0].content).toHaveLength(LIMITS.maxChars);
  });

  it("keeps only the most recent messages", () => {
    const many = Array.from({ length: 20 }, (_, i) => ({ role: i % 2 ? "assistant" : "user", content: `m${i}` }));
    many.push({ role: "user", content: "last" });
    const out = sanitizeMessages(many);
    expect(out).toHaveLength(LIMITS.maxMessages);
    expect(out?.at(-1)?.content).toBe("last");
  });

  it("rejects bad shapes", () => {
    for (const bad of [null, "text", [], [{ role: "system", content: "x" }], [{ role: "user", content: 5 }], [{ role: "assistant", content: "x" }]]) {
      expect(sanitizeMessages(bad)).toBeNull();
    }
  });
});

describe("buildSystemPrompt", () => {
  it("contains the grounding rule and the facts", () => {
    const p = buildSystemPrompt("en");
    expect(p).toContain("ONLY from the FACTS");
    expect(p).toContain("Iterum");
  });

  it("defaults to French on the French site", () => {
    expect(buildSystemPrompt("fr")).toContain("defaulting to French");
  });
});