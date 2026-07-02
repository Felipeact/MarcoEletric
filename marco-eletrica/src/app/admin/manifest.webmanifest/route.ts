import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    {
      name: "Marco Elétrica — Painel Administrativo",
      short_name: "Marco Admin",
      description:
        "Painel administrativo da Marco Elétrica: clientes, orçamentos, tabela de preços e financeiro.",
      start_url: "/admin",
      scope: "/admin",
      id: "/admin",
      display: "standalone",
      orientation: "portrait",
      background_color: "#0f172a",
      theme_color: "#2563eb",
      lang: "pt-BR",
      icons: [
        {
          src: "/admin/icon-192",
          sizes: "192x192",
          type: "image/png",
          purpose: "any",
        },
        {
          src: "/admin/icon-192",
          sizes: "192x192",
          type: "image/png",
          purpose: "maskable",
        },
        {
          src: "/admin/icon-512",
          sizes: "512x512",
          type: "image/png",
          purpose: "any",
        },
        {
          src: "/admin/icon-512",
          sizes: "512x512",
          type: "image/png",
          purpose: "maskable",
        },
      ],
    },
    { headers: { "Content-Type": "application/manifest+json" } },
  );
}
