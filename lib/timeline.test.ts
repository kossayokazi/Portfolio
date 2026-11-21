import { describe, expect, it } from "vitest";
import { sortNewestFirst } from "./timeline";

describe("sortNewestFirst", () => {
  it("puts the newest end date first", () => {
    const out = sortNewestFirst([{ end: "2025-02" }, { end: "2026-09" }, { end: "2025-08" }]);
    expect(out.map((i) => i.end)).toEqual(["2026-09", "2025-08", "2025-02"]);
  });

  it("keeps the original order for equal dates", () => {
    const out = sortNewestFirst([{ end: "2026-06", id: "pfe" }, { end: "2026-06", id: "degree" }]);
    expect(out.map((i) => i.id)).toEqual(["pfe", "degree"]);
  });

  it("does not mutate its input", () => {
    const input = [{ end: "2025-01" }, { end: "2026-01" }];
    sortNewestFirst(input);
    expect(input[0].end).toBe("2025-01");
  });
});