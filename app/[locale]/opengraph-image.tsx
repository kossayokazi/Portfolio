import { ImageResponse } from "next/og";
import { locales } from "@/lib/i18n";

export const generateStaticParams = () => locales.map((locale) => ({ locale }));
export const alt = "Kossay | Full-Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center",
          background: "radial-gradient(circle at 20% 20%, #c7cbff 0%, transparent 55%), radial-gradient(circle at 85% 80%, #fbc7ea 0%, transparent 50%), radial-gradient(circle at 80% 15%, #a5eef5 0%, transparent 45%), #f1f2ff",
        }}
      >
        <div
          style={{
            display: "flex", flexDirection: "column", padding: "64px 88px", borderRadius: 40,
            background: "rgba(255,255,255,0.55)", border: "2px solid rgba(255,255,255,0.9)",
            boxShadow: "0 30px 80px -30px rgba(79,70,229,0.45)",
          }}
        >
          <div style={{ display: "flex", fontSize: 128, fontWeight: 800, color: "#0f172a", letterSpacing: -4 }}>
            Kossay<span style={{ color: "#4f46e5" }}>.</span>
          </div>
          <div style={{ display: "flex", fontSize: 44, color: "#475569", marginTop: 8 }}>Full-Stack Developer</div>
          <div style={{ display: "flex", fontSize: 28, color: "#4f46e5", marginTop: 28 }}>React · TypeScript · Node.js · AI</div>
        </div>
      </div>
    ),
    { ...size }
  );
}