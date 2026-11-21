import { NextResponse } from "next/server";
import { readContactConfig } from "@/lib/contact/config";
import { validateContact } from "@/lib/contact/validate";
import { sendContactMail } from "@/lib/contact/mail";
import { isRateLimited } from "@/lib/contact/rate-limit";

const json = (body: object, status = 200) => NextResponse.json(body, { status });

export async function POST(req: Request) {
  try {
    if (await isRateLimited(req)) return json({ error: "Too many requests" }, 429);

    const result = validateContact(await req.json().catch(() => null));
    if (!result.ok) {
      // Bots get a fake success so they don't adapt; real users get a clear 400.
      return result.reason === "bot" ? json({ ok: true }) : json({ error: "Invalid input" }, 400);
    }

    const mail = await sendContactMail(readContactConfig(), result.data);
    if (!mail.ok) {
      console.error("Resend error:", mail.error);
      return json({ error: "Email failed" }, 502);
    }
    return json({ ok: true });
  } catch (err) {
    // A missing env var lands here, and the log names it.
    console.error("Contact route error:", err);
    return json({ error: "Something went wrong" }, 500);
  }
}