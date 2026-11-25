import { describe, expect, it } from "vitest";
import { PLANET_RADIUS, buildPlanetGeometry } from "./planet";

describe("buildPlanetGeometry", () => {
  const geo = buildPlanetGeometry();
  const pos = geo.attributes.position;

  it("has finite vertices within the planet radius band", () => {
    for (let i = 0; i < pos.count; i++) {
      const r = Math.hypot(pos.getX(i), pos.getY(i), pos.getZ(i));
      expect(Number.isFinite(r)).toBe(true);
      expect(r).toBeGreaterThan(PLANET_RADIUS - 0.1);
      expect(r).toBeLessThan(PLANET_RADIUS + 0.1);
    }
  });

  it("has one valid colour per vertex", () => {
    const color = geo.attributes.color;
    expect(color.count).toBe(pos.count);
    for (let i = 0; i < color.array.length; i++) {
      expect(color.array[i]).toBeGreaterThanOrEqual(0);
      expect(color.array[i]).toBeLessThanOrEqual(1);
    }
  });

  it("stays light enough for phones", () => {
    expect(pos.count / 3).toBeLessThan(4000); // triangles
  });
});