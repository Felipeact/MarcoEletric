import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth/session";

const ADMIN_SUBDOMAIN_PREFIX = "admin.";
const PUBLIC_ADMIN_PATHS = ["/admin/login"];

export async function proxy(request: NextRequest) {
  const host = request.headers.get("host") ?? "";
  const originalPathname = request.nextUrl.pathname;

  // 1. Reescreve o subdomínio admin.* para a árvore de rotas /admin,
  // preparando o terreno para quando o DNS/domínio estiver configurado.
  const isAdminSubdomain = host.startsWith(ADMIN_SUBDOMAIN_PREFIX);
  const effectivePathname =
    isAdminSubdomain && !originalPathname.startsWith("/admin")
      ? `/admin${originalPathname === "/" ? "" : originalPathname}`
      : originalPathname;

  // 2. Guarda de autenticação — roda tanto no domínio principal (/admin
  // funcionando desde já, sem DNS) quanto no subdomínio já reescrito.
  if (isAdminRouteProtected(effectivePathname)) {
    const sessionCookie = request.cookies.get(SESSION_COOKIE)?.value;
    const isValid = await verifySessionToken(sessionCookie);
    if (!isValid) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = isAdminSubdomain ? "/login" : "/admin/login";
      return NextResponse.redirect(loginUrl);
    }
  }

  if (effectivePathname !== originalPathname) {
    const rewrittenUrl = request.nextUrl.clone();
    rewrittenUrl.pathname = effectivePathname;
    return NextResponse.rewrite(rewrittenUrl);
  }

  return NextResponse.next();
}

function isAdminRouteProtected(pathname: string): boolean {
  const isAdminPath =
    pathname.startsWith("/admin") || pathname.startsWith("/api/admin");
  if (!isAdminPath) return false;
  return !PUBLIC_ADMIN_PATHS.some((path) => pathname.startsWith(path));
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|.*\\..*).*)"],
};
