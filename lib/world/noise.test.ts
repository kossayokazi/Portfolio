import { describe, expect, it } from "vitest";
import { fbm3, noise3, smoothstep } from "./noise";

describe("noise", () => {
  it("is deterministic and stays in [0, 1]", () => {
    for (let i = 0; i < 200; i++) {
      const x = i * 0.37, y = i * 0.61, z = i * 0.13;
      const n = noise3(x, y, z);
      expect(n).toBeGreaterThanOrEqual(0);
      expect(n).toBeLessThanOrEqual(1);
      expect(noise3(x, y, z)).toBe(n);
      const f = fbm3(x, y, z);
      expect(f).toBeGreaterThanOrEqual(0);
      expect(f).toBeLessThanOrEqual(1);
    }
  });

  it("smoothstep clamps and is monotonic", () => {
    expect(smoothstep(0, 1, -5)).toBe(0);
    expect(smoothstep(0, 1, 5)).toBe(1);
    expect(smoothstep(0, 1, 0.25)).toBeLessThan(smoothstep(0, 1, 0.75));
  });
});