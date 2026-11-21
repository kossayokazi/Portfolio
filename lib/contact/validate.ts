export type ContactInput = { name: string; email: string; message: string };
export type ValidationResult =
  | { ok: true; data: ContactInput }
  | { ok: false; reason: "invalid" | "bot" };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const clean = (v: unknown) => (typeof v === "string" ? v.trim() : "");

export function validateContact(body: unknown): ValidationResult {
  if (typeof body !== "object" || body === null) return { ok: false, reason: "invalid" };
  const b = body as Record<string, unknown>;

  // Honeypot: real visitors never see or fill this field.
  if (clean(b.hp_check) !== "") return { ok: false, reason: "bot" };

  const name = clean(b.name).replace(/[\r\n]+/g, " "); // no line breaks in the email subject
  const email = clean(b.email);
  const message = clean(b.message);

  if (!name || name.length > 100) return { ok: false, reason: "invalid" };
  if (!EMAIL.test(email) || email.length > 254) return { ok: false, reason: "invalid" };
  if (!message || message.length > 5000) return { ok: false, reason: "invalid" };

  return { ok: true, data: { name, email, message } };
}