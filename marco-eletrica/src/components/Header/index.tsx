'use client'

import { useState, useEffect, useRef } from "react";
import Image from 'next/image';
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { WhatsAppButton } from "../WhatsAppButton";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();

  // Lock scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  // Hide while scrolling, show after stop
  useEffect(() => {
    const onScroll = () => {
      setVisible(false);

      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }

      scrollTimeout.current = setTimeout(() => {
        setVisible(true);
      }, 300);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinkClasses = (href: string) =>
    `mx-4 transition-colors hover:text-blue-600 ${
      pathname === href ? 'font-bold text-blue-600' : 'text-black'
    }`;

  return (
    <header
      className={`
        fixed top-4 left-1/2 -translate-x-1/2
        w-[90vw] md:w-[97vw]
        z-50 rounded-2xl
        bg-white/80 backdrop-blur-md
        shadow-lg
        transition-transform duration-300
        ${visible ? 'translate-y-0' : '-translate-y-24'}
        dark:bg-blue-600/80 dark:text-white
      `}
    >
      {!menuOpen && (
        <div className="flex items-center justify-between px-6 py-4">
          {/* Logo */}
          <Link href="/" className="flex items-cente gap-1">
            
            <span className="sm:block text-xl font-bold">
              Marc
            </span>

            <Image
              src="/raio-logo.svg"
              alt="Logo"
              width={20}
              height={20}
              priority
            />

             <span className="sm:block text-xl font-bold">
              Eletrica
            </span>

          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center">
            <Link href="/" className={navLinkClasses("/projects")}>Home</Link>
            <Link href="/" className={navLinkClasses("/blog")}>Sobre Nós</Link>
            <Link href="/" className="mx-4 hover:text-blue-600">Serviços</Link>
          </nav>

          {/* Mobile button */}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <svg
              className="w-7 h-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>
      )}

      {/* Mobile Menu */}
      {menuOpen && (
        <nav className="md:hidden h-[90vh] flex flex-col items-center justify-center gap-8 relative">
          <button
            className="absolute top-6 right-6"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            <svg
              className="w-7 h-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <Link href="/" className="flex items-cente gap-1">
            
            <span className="sm:block text-xl font-bold">
              Marc
            </span>

            <Image
              src="/raio-logo.svg"
              alt="Logo"
              width={20}
              height={20}
              priority
            />

             <span className="sm:block text-xl font-bold">
              Eletrica
            </span>

          </Link>

          <Link href="/" onClick={() => setMenuOpen(false)} className="text-2xl font-semibold dark:text-white">Home</Link>
          <Link href="/" onClick={() => setMenuOpen(false)} className="text-2xl font-semibold dark:text-white">Sobre Nós</Link>
          <Link href="/" onClick={() => setMenuOpen(false)} className="text-2xl font-semibold dark:text-white">Serviços</Link>  
          
          
          <WhatsAppButton bgColor="bg-blue-500" hoverBgColor="bg-blue-600" textColor="text-white"/>
        </nav>


      )}
    </header>
  );
}