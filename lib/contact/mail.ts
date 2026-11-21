import { Resend } from "resend";
import type { ContactConfig } from "./config";
import type { ContactInput } from "./validate";

export async function sendContactMail(cfg: ContactConfig, { name, email, message }: ContactInput) {
  const resend = new Resend(cfg.apiKey);
  const { error } = await resend.emails.send({
    from: "Portfolio <onboarding@resend.dev>",
    to: cfg.to,
    replyTo: email,
    subject: `New message from ${name}`,
    text: `From: ${name} <${email}>\n\n${message}`,
  });
  return error ? ({ ok: false, error } as const) : ({ ok: true } as const);
}