import { ImageResponse } from "next/og";
import { site } from "@/config/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #07070d 0%, #12121f 60%, #1a1030 100%)",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 20,
              background: "linear-gradient(135deg, #7c5cff, #22d3ee)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: 40,
              fontWeight: 800,
            }}
          >
            {"</>"}
          </div>
          <div style={{ color: "white", fontSize: 40, fontWeight: 800 }}>{site.name}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ color: "white", fontSize: 66, fontWeight: 800, lineHeight: 1.1, maxWidth: 980 }}>
            Учим детей создавать технологии
          </div>
          <div style={{ color: "#a2a3c0", fontSize: 34, maxWidth: 900 }}>
            Индивидуальные онлайн-занятия по программированию для детей и школьников
          </div>
        </div>

        <div style={{ display: "flex", gap: 16 }}>
          {["Игры", "Сайты", "Python", "IT-проекты"].map((t) => (
            <div
              key={t}
              style={{
                color: "#22d3ee",
                fontSize: 28,
                border: "2px solid #23233a",
                borderRadius: 999,
                padding: "10px 28px",
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}
