import type { Metadata, Viewport } from "next";
import { AdminServiceWorkerRegister } from "@/components/admin/AdminServiceWorkerRegister";

export const metadata: Metadata = {
  title: "Marco Admin",
  manifest: "/admin/manifest.webmanifest",
  icons: {
    icon: "/admin/icon-192",
    apple: "/admin/icon-192",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Marco Admin",
  },
};

export const viewport: Viewport = {
  themeColor: "#2563eb",
};

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <AdminServiceWorkerRegister />
      {children}
    </>
  );
}
