import { afterEach, describe, expect, it, vi } from "vitest";
import { introSeen, markIntroSeen, worldEnabled } from "./flag";

function stubBrowser(search: string) {
  const store = new Map<string, string>();
  vi.stubGlobal("sessionStorage", {
    getItem: (k: string) => store.get(k) ?? null,
    setItem: (k: string, v: string) => void store.set(k, v),
    removeItem: (k: string) => void store.delete(k),
  });
  vi.stubGlobal("location", { search });
}
const visit = (search: string) => vi.stubGlobal("location", { search });

afterEach(() => vi.unstubAllGlobals());

describe("worldEnabled", () => {
  it("is off by default", () => {
    stubBrowser("");
    expect(worldEnabled()).toBe(false);
  });

  it("turns on with ?world=1 and remembers it for the session", () => {
    stubBrowser("?world=1");
    expect(worldEnabled()).toBe(true);
    visit("");
    expect(worldEnabled()).toBe(true);
  });

  it("turns off again with ?world=0", () => {
    stubBrowser("?world=1");
    worldEnabled();
    visit("?world=0");
    expect(worldEnabled()).toBe(false);
  });

  it("stays off when storage is unavailable", () => {
    vi.stubGlobal("location", { search: "?world=1" });
    vi.stubGlobal("sessionStorage", { getItem: () => { throw new Error("blocked"); }, setItem: () => { throw new Error("blocked"); }, removeItem: () => {} });
    expect(worldEnabled()).toBe(false);
  });
});

describe("intro seen", () => {
  it("is false until marked, then true", () => {
    stubBrowser("");
    expect(introSeen()).toBe(false);
    markIntroSeen();
    expect(introSeen()).toBe(true);
  });

  it("never throws when storage is unavailable", () => {
    vi.stubGlobal("sessionStorage", { getItem: () => { throw new Error("blocked"); }, setItem: () => { throw new Error("blocked"); } });
    expect(() => markIntroSeen()).not.toThrow();
    expect(introSeen()).toBe(false);
  });
});