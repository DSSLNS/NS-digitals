import { ImageResponse } from "next/og";

/** Branded social share image: /og?title=… (1200×630). */
export function GET(request: Request) {
  const title = (new URL(request.url).searchParams.get("title") ?? "Build Better. Perform Better.").slice(0, 110);
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#FFF9F1", padding: 72, position: "relative" }}>
        <div style={{ position: "absolute", right: -120, top: -120, width: 520, height: 520, borderRadius: 9999, background: "#FF715B" }} />
        <div style={{ position: "absolute", right: 260, bottom: -90, width: 220, height: 220, borderRadius: 56, background: "#E7DDF8" }} />
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ width: 64, height: 64, borderRadius: 18, background: "#492653", display: "flex", alignItems: "center", justifyContent: "center", color: "#FFF9F1", fontSize: 30, fontWeight: 700 }}>
            NS
          </div>
          <div style={{ fontSize: 30, fontWeight: 700, color: "#492653" }}>NS Digital Solutions</div>
        </div>
        <div style={{ display: "flex", fontSize: 68, fontWeight: 700, lineHeight: 1.05, color: "#492653", maxWidth: 900, letterSpacing: -2 }}>{title}</div>
        <div style={{ display: "flex", fontSize: 26, color: "#5F5866" }}>Web development · QA · Performance</div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
