import type { Metadata } from "next";
import { Logo } from "@/components/ui/Logo";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = {
  title: "Login administrativo",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <Logo href="/admin" className="text-slate-900" />
        <h1 className="mt-6 text-xl font-semibold text-slate-900">
          Painel administrativo
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Entre com suas credenciais para continuar.
        </p>
        <LoginForm />
      </div>
    </main>
  );
}
