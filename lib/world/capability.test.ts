import { describe, expect, it } from "vitest";
import { canRunWorld } from "./capability";

describe("canRunWorld", () => {
  const ok = { webgl: true, reducedMotion: false, saveData: false };
  it("runs when everything is supported", () => expect(canRunWorld(ok)).toBe(true));
  it("falls back without WebGL", () => expect(canRunWorld({ ...ok, webgl: false })).toBe(false));
  it("falls back for reduced motion", () => expect(canRunWorld({ ...ok, reducedMotion: true })).toBe(false));
  it("falls back when the visitor asked to save data", () => expect(canRunWorld({ ...ok, saveData: true })).toBe(false));
});