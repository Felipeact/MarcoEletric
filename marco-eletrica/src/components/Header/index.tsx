"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Logo } from "../ui/Logo";
import { WhatsAppButton } from "../WhatsAppButton";

const navItems = [
  { label: "Início", href: "#inicio" },
  { label: "Serviços", href: "#servicos" },
  { label: "Sobre", href: "#sobre" },
  { label: "Certificados", href: "#certificados" },
  { label: "Galeria", href: "#galeria" },
  { label: "Contato", href: "#contato" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  // Bloqueia o scroll do corpo quando o menu mobile está aberto
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Esconde ao rolar para baixo, mostra ao rolar para cima
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      setHidden(y > lastScrollY.current && y > 120);
      lastScrollY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Barra fixa do topo (com transform para esconder/mostrar) */}
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
          hidden ? "-translate-y-full" : "translate-y-0"
        } ${
          scrolled
            ? "bg-brand-950/95 shadow-lg shadow-brand-950/20 backdrop-blur-md"
            : "bg-gradient-to-b from-brand-950/80 to-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          <Logo />

          {/* Navegação desktop */}
          <nav className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-blue-100 transition-colors hover:bg-white/10 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:block">
            <WhatsAppButton
              label="Orçamento grátis"
              className="px-5 py-2.5 text-sm"
            />
          </div>

          {/* Botão menu mobile */}
          <button
            className="rounded-lg p-2 text-white transition-colors hover:bg-white/10 lg:hidden"
            onClick={() => setMenuOpen(true)}
            aria-label="Abrir menu"
          >
            <Menu className="h-7 w-7" />
          </button>
        </div>
      </header>

      {/*
        Menu mobile (overlay) — renderizado FORA do <header> de propósito.
        O header usa `transform` (esconder/mostrar), o que quebraria o
        `position: fixed` deste overlay se ele fosse um descendente.
      */}
      <div
        className={`fixed inset-0 z-50 bg-brand-950 transition-opacity duration-300 lg:hidden ${
          menuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-4 sm:px-6">
          <Logo onClick={() => setMenuOpen(false)} />
          <button
            className="rounded-lg p-2 text-white transition-colors hover:bg-white/10"
            onClick={() => setMenuOpen(false)}
            aria-label="Fechar menu"
          >
            <X className="h-7 w-7" />
          </button>
        </div>

        <nav className="flex flex-col items-center gap-2 px-6 pt-10">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="w-full rounded-xl px-4 py-4 text-center text-xl font-semibold text-white transition-colors hover:bg-white/10"
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-6">
            <WhatsAppButton label="Solicitar orçamento" />
          </div>
        </nav>
      </div>
    </>
  );
}
