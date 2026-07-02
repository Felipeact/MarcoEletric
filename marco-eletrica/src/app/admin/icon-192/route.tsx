import { ImageResponse } from "next/og";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#2563eb",
        }}
      >
        <svg width="104" height="104" viewBox="0 0 61 102" fill="none">
          <path
            d="M59.1767 0.372294L1.00713 52.5193L21.8174 58.4865L0.470136 101.092L59.2022 49.1066L38.9543 43.3006L59.1767 0.372294Z"
            fill="#FCD34D"
          />
        </svg>
      </div>
    ),
    { width: 192, height: 192 },
  );
}
