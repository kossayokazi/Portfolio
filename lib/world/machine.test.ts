import { describe, expect, it } from "vitest";
import { initialPhase, nextPhase } from "./machine";

describe("nextPhase", () => {
  it("starts the intro from the gate", () => expect(nextPhase("gate", "START")).toBe("intro"));
  it("skips straight to explore from the gate", () => expect(nextPhase("gate", "SKIP")).toBe("explore"));

  it("goes intro, reveal, explore", () => {
    expect(nextPhase("intro", "INTRO_DONE")).toBe("reveal");
    expect(nextPhase("reveal", "REVEAL_DONE")).toBe("explore");
  });

  it("lets the visitor skip during intro and reveal", () => {
    expect(nextPhase("intro", "SKIP")).toBe("explore");
    expect(nextPhase("reveal", "SKIP")).toBe("explore");
  });

  it("ignores events that don't apply", () => {
    expect(nextPhase("gate", "INTRO_DONE")).toBe("gate");
    expect(nextPhase("explore", "START")).toBe("explore");
  });
});

describe("initialPhase", () => {
  it("shows the gate on a first visit", () => expect(initialPhase(false)).toBe("gate"));
  it("goes straight to explore after the intro was seen", () => expect(initialPhase(true)).toBe("explore"));
});