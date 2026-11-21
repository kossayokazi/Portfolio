export type ContactConfig = { apiKey: string; to: string };

export function readContactConfig(env: Record<string, string | undefined> = process.env): ContactConfig {
  const required = { RESEND_API_KEY: env.RESEND_API_KEY, CONTACT_EMAIL: env.CONTACT_EMAIL };
  const missing = Object.entries(required).filter(([, v]) => !v).map(([k]) => k);
  if (missing.length) throw new Error(`Missing environment variables: ${missing.join(", ")}`);
  return { apiKey: required.RESEND_API_KEY!, to: required.CONTACT_EMAIL! };
}