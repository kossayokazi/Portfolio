import { describe, expect, it } from "vitest";
import { STATIONS, STATION_BY_ID, STATION_IDS, positionOf, stationFromHash } from "./stations";

describe("stations", () => {
  it("has one unique station per id", () => {
    expect(STATIONS).toHaveLength(STATION_IDS.length);
    expect(new Set(STATIONS.map((s) => s.id)).size).toBe(STATION_IDS.length);
    for (const id of STATION_IDS) expect(STATION_BY_ID[id].id).toBe(id);
  });

  it("keeps every pair of stations well apart on the sphere", () => {
    for (const a of STATIONS) {
      for (const b of STATIONS) {
        if (a.id === b.id) continue;
        const [ax, ay, az] = positionOf(a.lat, a.lon, 1);
        const [bx, by, bz] = positionOf(b.lat, b.lon, 1);
        const angle = (Math.acos(ax * bx + ay * by + az * bz) * 180) / Math.PI;
        expect(angle).toBeGreaterThan(40);
      }
    }
  });
});

describe("positionOf", () => {
  it("puts lat 0 / lon 0 facing the camera", () => {
    const [x, y, z] = positionOf(0, 0, 2);
    expect(x).toBeCloseTo(0);
    expect(y).toBeCloseTo(0);
    expect(z).toBeCloseTo(2);
  });

  it("always lands on the sphere", () => {
    for (const s of STATIONS) {
      const [x, y, z] = positionOf(s.lat, s.lon, 1.62);
      expect(Math.hypot(x, y, z)).toBeCloseTo(1.62);
    }
  });
});

describe("stationFromHash", () => {
  it("reads known places with or without #", () => {
    expect(stationFromHash("#projects")).toBe("projects");
    expect(stationFromHash("about")).toBe("about");
  });

  it("ignores everything else", () => {
    for (const h of ["", "#", "#nope", "#blog", "#PROJECTS"]) expect(stationFromHash(h)).toBeNull();
  });
});