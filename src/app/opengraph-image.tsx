import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt =
  "Kaos Ekaitza - Ska-Punk Antifascista | Música Consciente y Cambio Social";
export const contentType = "image/png";
export const size = {
  width: 1200,
  height: 630,
};

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #000000 0%, #DC2626 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px",
          position: "relative",
        }}
      >
        {/* Patrón ska decorativo */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255,255,255,0.1) 20px, rgba(255,255,255,0.1) 40px)",
            opacity: 0.3,
          }}
        />

        {/* Logo principal */}
        <div
          style={{
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            background: "#DC2626",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "30px",
            border: "8px solid #ffffff",
            boxShadow: "0 20px 40px rgba(220, 38, 38, 0.4)",
          }}
        >
          <span
            style={{
              fontSize: "80px",
              fontWeight: "bold",
              color: "#ffffff",
              fontFamily: "Inter, system-ui, sans-serif",
            }}
          >
            KE
          </span>
        </div>

        {/* Título principal */}
        <h1
          style={{
            fontSize: "72px",
            fontWeight: "900",
            color: "#ffffff",
            textAlign: "center",
            margin: "0 0 20px 0",
            fontFamily: "Inter, system-ui, sans-serif",
            textShadow: "0 4px 8px rgba(0,0,0,0.5)",
            lineHeight: 1.1,
          }}
        >
          KAOS EKAITZA
        </h1>

        {/* Subtítulo */}
        <p
          style={{
            fontSize: "32px",
            fontWeight: "600",
            color: "#DC2626",
            textAlign: "center",
            margin: "0 0 30px 0",
            fontFamily: "Inter, system-ui, sans-serif",
            textShadow: "0 2px 4px rgba(0,0,0,0.5)",
            textTransform: "uppercase",
            letterSpacing: "2px",
          }}
        >
          Ska-Punk Antifascista
        </p>

        {/* Descripción */}
        <p
          style={{
            fontSize: "24px",
            fontWeight: "400",
            color: "#ffffff",
            textAlign: "center",
            margin: "0",
            fontFamily: "Inter, system-ui, sans-serif",
            maxWidth: "800px",
            lineHeight: 1.4,
            opacity: 0.9,
          }}
        >
          Música consciente y cambio social a través del ska-punk
        </p>

        {/* Banda ska decorativa inferior */}
        <div
          style={{
            position: "absolute",
            bottom: "0",
            left: "0",
            right: "0",
            height: "20px",
            background:
              "repeating-linear-gradient(0deg, #000000, #000000 4px, #ffffff 4px, #ffffff 8px)",
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
