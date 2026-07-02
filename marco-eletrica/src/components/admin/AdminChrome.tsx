import { LogOut } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { NavLinks } from "./NavLinks";
import { BottomNav } from "./BottomNav";
import { PageTransition } from "./PageTransition";

export function AdminChrome({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex min-h-screen">
        <aside className="hidden w-64 flex-col border-r border-slate-200 bg-white px-4 py-6 sm:flex">
          <div className="px-2">
            <Logo href="/admin" className="text-slate-900" />
          </div>
          <div className="mt-8 flex-1">
            <NavLinks />
          </div>
          <form action="/api/admin/logout" method="post">
            <button
              type="submit"
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
            >
              <LogOut className="h-[18px] w-[18px] text-slate-400" />
              Sair
            </button>
          </form>
        </aside>

        <div className="min-w-0 flex-1">
          <header className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 sm:hidden">
            <Logo href="/admin" className="text-base text-slate-900" />
            <form action="/api/admin/logout" method="post">
              <button
                type="submit"
                aria-label="Sair"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100"
              >
                <LogOut className="h-[18px] w-[18px]" />
              </button>
            </form>
          </header>
          <main className="min-w-0 p-4 pb-24 sm:p-8 sm:pb-8">
            <PageTransition>{children}</PageTransition>
          </main>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
