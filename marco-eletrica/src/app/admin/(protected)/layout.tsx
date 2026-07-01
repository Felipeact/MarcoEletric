import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AdminChrome } from "@/components/admin/AdminChrome";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth/session";

// Todas as páginas do painel leem dados do banco a cada requisição
// (clientes, orçamentos, preços, despesas, dashboard) — nunca devem ser
// pré-renderizadas estaticamente no build.
export const dynamic = "force-dynamic";

export default async function AdminProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const isValid = await verifySessionToken(cookieStore.get(SESSION_COOKIE)?.value);
  if (!isValid) {
    redirect("/admin/login");
  }

  return <AdminChrome>{children}</AdminChrome>;
}
