import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Soft Reset — รีเซ็ตใจเบา ๆ";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#FAFAF8",
          fontFamily: "serif",
          position: "relative",
        }}
      >
        {/* Background blobs */}
        <div
          style={{
            position: "absolute",
            width: 420,
            height: 420,
            borderRadius: "50%",
            backgroundColor: "#F5DDD0",
            filter: "blur(80px)",
            opacity: 0.5,
            top: -80,
            left: -80,
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 320,
            height: 320,
            borderRadius: "50%",
            backgroundColor: "#D4E8EC",
            filter: "blur(80px)",
            opacity: 0.45,
            bottom: -60,
            right: -60,
            display: "flex",
          }}
        />

        {/* Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 20px",
            borderRadius: 999,
            backgroundColor: "rgba(255,255,255,0.8)",
            border: "1px solid #EBE5DD",
            marginBottom: 32,
            fontSize: 16,
            color: "#A8A29E",
            letterSpacing: "0.15em",
          }}
        >
          ✦  Soft Reset  ✦
        </div>

        {/* Title */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            marginBottom: 28,
          }}
        >
          <div
            style={{
              fontSize: 64,
              fontWeight: 300,
              color: "#44403C",
              letterSpacing: "0.04em",
            }}
          >
            รีเซ็ตใจเบา ๆ
          </div>
          <div
            style={{
              fontSize: 28,
              fontWeight: 300,
              color: "#A8A29E",
              letterSpacing: "0.06em",
            }}
          >
            Soft Reset
          </div>
        </div>

        {/* Description */}
        <div
          style={{
            fontSize: 22,
            color: "#78716C",
            fontWeight: 300,
            letterSpacing: "0.02em",
            textAlign: "center",
            maxWidth: 640,
            lineHeight: 1.7,
          }}
        >
          เลือกความรู้สึก แล้วรับข้อความกอดใจ
        </div>
      </div>
    ),
    { ...size }
  );
}
