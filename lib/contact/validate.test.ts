import { describe, expect, it } from "vitest";
import { validateContact } from "./validate";

const valid = { name: "Ada", email: "ada@example.com", message: "Hello" };

describe("validateContact", () => {
  it("accepts a valid message and trims values", () => {
    const r = validateContact({ name: "  Ada ", email: "ada@example.com", message: " Hello " });
    expect(r).toEqual({ ok: true, data: valid });
  });

  it("rejects missing fields", () => {
    for (const key of ["name", "email", "message"] as const) {
      expect(validateContact({ ...valid, [key]: "" })).toEqual({ ok: false, reason: "invalid" });
    }
  });

  it("rejects invalid emails", () => {
    for (const email of ["nope", "a@b", "a b@c.com", "@c.com"]) {
      expect(validateContact({ ...valid, email })).toEqual({ ok: false, reason: "invalid" });
    }
  });

  it("rejects oversized input", () => {
    expect(validateContact({ ...valid, name: "x".repeat(101) }).ok).toBe(false);
    expect(validateContact({ ...valid, message: "x".repeat(5001) }).ok).toBe(false);
  });

  it("removes line breaks from the name", () => {
    const r = validateContact({ ...valid, name: "Ada\r\nBcc: spam@example.com" });
    expect(r.ok && r.data.name).not.toMatch(/[\r\n]/);
  });

  it("flags bots through the honeypot", () => {
    expect(validateContact({ ...valid, hp_check: "http://spam.example" })).toEqual({ ok: false, reason: "bot" });
  });

  it("rejects non-object bodies", () => {
    for (const body of [null, undefined, "text", 42]) {
      expect(validateContact(body)).toEqual({ ok: false, reason: "invalid" });
    }
  });
});